import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Participant, { TEAM_EVENTS } from "@/models/Participant";

//emailServiceCode - Import the service and create a mapping for readable event names
import { sendRegistrationEmail } from "@/lib/emailService";

const EVENT_NAMES: Record<string, string> = {
  pitch_perfect: "Ideathon",
  typemaster: "Typemaster",
  clash_royale: "Clash Royale",
  coding_relay: "Coding Relay",
  dsa_smackdown: "DSA Smackdown",
  technoseek: "Technoseek",
  prompt_wars: "Prompt Wars",
};

//emailServiceCode

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { event, team_name, member1, member2, member3 } = body;

    // 1. Basic Presence Check
    if (!event || !member1?.usn) {
      return NextResponse.json({ error: "Lead member USN is required." }, { status: 400 });
    }
    // 2. Extract and Normalize USNs
    const m1_usn = member1.usn.trim().toUpperCase();
    const m2_usn = member2?.usn?.trim().toUpperCase() || "";
    const m3_usn = member3?.usn?.trim().toUpperCase() || "";

    const activeUsns = [m1_usn, m2_usn, m3_usn].filter(u => u !== "");

    // 3. LOOPHOLE 1: Check for duplicates within this single registration
    // This prevents Member 1 and Member 2 from using the same USN
    const uniqueUsnsInRequest = new Set(activeUsns);
    if (uniqueUsnsInRequest.size !== activeUsns.length) {
      return NextResponse.json({
        error: "Duplicate USNs detected in the same team. Each member must be unique."
      }, { status: 400 });
    }

    // 4. Team Event Specific Validation
    const isTeam = TEAM_EVENTS.includes(event);
    if (isTeam) {
      if (!team_name || team_name.trim().length < 2) {
        return NextResponse.json({ error: "Team name is required for team events." }, { status: 400 });
      }
      if (activeUsns.length < 2) {
        return NextResponse.json({ error: "Team events require at least two unique participants." }, { status: 400 });
      }
    }

    // 5. Database Logic Engine (Checks for Every Participant)
    for (const usn of activeUsns) {

      // LOOPHOLE 2: Check if this USN is ALREADY in this event (any slot)
      const alreadyInEvent = await Participant.findOne({
        event,
        $or: [
          { "member1.usn": usn },
          { "member2.usn": usn },
          { "member3.usn": usn }
        ]
      });

      if (alreadyInEvent) {
        return NextResponse.json({
          error: `Participant (${usn}) is already registered for this event.`
        }, { status: 409 });
      }

      // LOOPHOLE 3: Check Global 5-Event Limit
      const totalEvents = await Participant.countDocuments({
        $or: [
          { "member1.usn": usn },
          { "member2.usn": usn },
          { "member3.usn": usn }
        ]
      });

      if (totalEvents >= 5) {
        return NextResponse.json({
          error: `Participant (${usn}) has reached the maximum limit of 5 events.`
        }, { status: 403 });
      }
    }

    // 6. Data Sanitization (Ensures data is clean in DB)
    const sanitizedMember1 = { ...member1, usn: m1_usn };
    const sanitizedMember2 = member2?.usn ? { ...member2, usn: m2_usn } : {};
    const sanitizedMember3 = member3?.usn ? { ...member3, usn: m3_usn } : {};

    // 7. Save to Database
    await Participant.create({
      event,
      team_name: isTeam ? team_name.trim() : "",
      member1: sanitizedMember1,
      member2: sanitizedMember2,
      member3: sanitizedMember3,
    });

    //emailServiceCode - Send confirmation ONLY to the Lead (Member 1)
    try {
      const readableEventName = EVENT_NAMES[event] || event;
      if (sanitizedMember1?.email) {
        await sendRegistrationEmail({
          to: sanitizedMember1.email,
          name: sanitizedMember1.name,
          eventName: readableEventName,
          teamName: isTeam ? team_name.trim() : undefined,
        });
      }
    } catch (emailError) {
      console.error("Email Service Error (Lead Only):", emailError);
      // We log the error but don't throw, ensuring the user still sees the success screen.
    }
    //emailServiceCode

    return NextResponse.json({ message: "Registration successful!" }, { status: 201 });

  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json({ error: "Internal Server Error. Please contact support." }, { status: 500 });
  }
}