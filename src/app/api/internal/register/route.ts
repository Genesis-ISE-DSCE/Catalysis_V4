// src/app/api/internal/register/route.ts (NEW FILE)
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { dbConnect } from "@/lib/dbConnect";
import Participant, { TEAM_EVENTS } from "@/models/Participant";
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

export async function POST(req: Request) {
  // 1. Require admin authentication (NO rate limiting)
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
  }
  
  try {
    await dbConnect();
    const body = await req.json();
    const { event, team_name, member1, member2, member3 } = body;

    // Same validation logic as your public API (copy from your route.ts)
    if (!event || !member1?.usn) {
      return NextResponse.json({ error: "Lead member USN is required." }, { status: 400 });
    }
    
    const m1_usn = member1.usn.trim().toUpperCase();
    const m2_usn = member2?.usn?.trim().toUpperCase() || "";
    const m3_usn = member3?.usn?.trim().toUpperCase() || "";

    const activeUsns = [m1_usn, m2_usn, m3_usn].filter(u => u !== "");

    const uniqueUsnsInRequest = new Set(activeUsns);
    if (uniqueUsnsInRequest.size !== activeUsns.length) {
      return NextResponse.json({
        error: "Duplicate USNs detected in the same team."
      }, { status: 400 });
    }

    const isTeam = TEAM_EVENTS.includes(event);
    if (isTeam) {
      if (!team_name || team_name.trim().length < 2) {
        return NextResponse.json({ error: "Team name is required for team events." }, { status: 400 });
      }
      if (activeUsns.length < 2) {
        return NextResponse.json({ error: "Team events require at least two participants." }, { status: 400 });
      }
    }

    // Database checks
    for (const usn of activeUsns) {
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

    // Save to Database
    const sanitizedMember1 = { ...member1, usn: m1_usn };
    const sanitizedMember2 = member2?.usn ? { ...member2, usn: m2_usn } : {};
    const sanitizedMember3 = member3?.usn ? { ...member3, usn: m3_usn } : {};

    await Participant.create({
      event,
      team_name: isTeam ? team_name.trim() : "",
      member1: sanitizedMember1,
      member2: sanitizedMember2,
      member3: sanitizedMember3,
    });

    // Send email (don't await)
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
      console.error("Email Service Error:", emailError);
    }

    return NextResponse.json({ message: "Registration successful!" }, { status: 201 });

  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}