import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Participant, { IParticipant } from "@/models/Participant";
import { requireAdminAuth } from "@/lib/adminAuth";

function escapeCsv(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function participantToRows(p: IParticipant): string[] {
  const rows: string[] = [];
  const base = [
    p._id?.toString() ?? "",
    p.event,
    p.team_name || "",
    new Date(p.registeredAt).toLocaleString("en-IN"),
  ];

  const members = [p.member1, p.member2, p.member3].filter(
    (m) => m && m.name
  );

  members.forEach((member, idx) => {
    if (!member) return;
    rows.push(
      [
        ...base,
        `Member ${idx + 1}`,
        member.name ?? "",
        member.usn ?? "",
        member.email ?? "",
        member.phone ?? "",
        member.semester ?? "",
        member.branch ?? "",
      ]
        .map(escapeCsv)
        .join(",")
    );
  });

  return rows;
}

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdminAuth(req);
    if (response) return response;

    await dbConnect();

    const event = req.nextUrl.searchParams.get("event");
    const query =
      event && event !== "all" ? { event } : {};

    const participants = await Participant.find(query)
      .sort({ registeredAt: -1 })
      .lean<IParticipant[]>();

    const headers = [
      "ID",
      "Event",
      "Team Name",
      "Registered At",
      "Member Role",
      "Name",
      "USN",
      "Email",
      "Phone",
      "Semester",
      "Branch",
    ].join(",");

    const rows = participants.flatMap((p) =>
      participantToRows(p as IParticipant)
    );

    const csv = [headers, ...rows].join("\n");
    const filename =
      event && event !== "all"
        ? `catalysis_${event}.csv`
        : "catalysis_all_participants.csv";

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
