import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth(req);
  if (response) return response;

  await deleteSession();
  return NextResponse.json({ success: true }, { status: 200 });
}
