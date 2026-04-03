import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Participant from "@/models/Participant";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdminAuth(req);
    if (response) return response;

    await dbConnect();

    const { searchParams } = req.nextUrl;
    const event = searchParams.get("event");
    const search = searchParams.get("search")?.trim();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (event && event !== "all") {
      query.event = event;
    }

    if (search) {
      query["$or"] = [
        { "member1.name": { $regex: search, $options: "i" } },
        { "member1.usn": { $regex: search, $options: "i" } },
        { "member1.email": { $regex: search, $options: "i" } },
        { team_name: { $regex: search, $options: "i" } },
      ];
    }

    const participants = await Participant.find(query)
      .sort({ registeredAt: -1 })
      .lean();

    return NextResponse.json({ participants }, { status: 200 });
  } catch (error) {
    console.error("Admin participants fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
