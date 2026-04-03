import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Participant from "@/models/Participant";
import { requireAdminAuth } from "@/lib/adminAuth";

const ALL_EVENTS = [
  "technoseek",
  "typemaster",
  "clash_royale",
  "coding_relay",
  "dsa_smackdown",
  "pitch_perfect",
];

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdminAuth(req);
    if (response) return response;

    await dbConnect();

    const total = await Participant.countDocuments();

    const eventCounts = await Promise.all(
      ALL_EVENTS.map(async (event) => ({
        event,
        count: await Participant.countDocuments({ event }),
      }))
    );



    const recentRegistrations = await Participant.find()
      .sort({ registeredAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(
      {
        total,
        eventCounts,
        recentRegistrations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
