import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Participant from "@/models/Participant";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { response } = await requireAdminAuth(req);
    if (response) return response;

    await dbConnect();
    const { id } = await params;

    const deleted = await Participant.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { response } = await requireAdminAuth(req);
    if (response) return response;

    await dbConnect();
    const { id } = await params;
    const updateData = await req.json();

    const allowedUpdates = {
      team_name: updateData.team_name,
      event: updateData.event,
      member1: updateData.member1,
      member2: updateData.member2,
      member3: updateData.member3,
    };

    const updated = await Participant.findByIdAndUpdate(
      id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, participant: updated }, { status: 200 });
  } catch (error: unknown) {
    console.error("Admin update error:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
