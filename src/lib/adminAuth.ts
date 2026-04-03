import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return undefined;

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return undefined;
  return token;
}

export async function requireAdminAuth(request: NextRequest) {
  const token = getBearerToken(request) ?? request.cookies.get("admin_session")?.value;
  const session = await decrypt(token);

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, response: null };
}
