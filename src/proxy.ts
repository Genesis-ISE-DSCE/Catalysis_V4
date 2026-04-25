import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const CLOSED_PATH = "/closed";
const PROTECTED_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── 1. Always allow these paths through ── */
  // Allow the closed page itself
  if (pathname === CLOSED_PATH) {
    return NextResponse.next();
  }

  // Allow admin routes (handled separately below)
  if (pathname.startsWith(PROTECTED_PREFIX)) {
    // Admin login page — always accessible
    if (pathname === LOGIN_PATH) {
      return NextResponse.next();
    }

    // Other admin pages — require authentication
    const token = request.cookies.get("admin_session")?.value;
    const session = await decrypt(token);

    if (!session) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  /* ── 2. Registration is closed — redirect everything else to /closed ── */
  const closedUrl = new URL(CLOSED_PATH, request.url);
  return NextResponse.redirect(closedUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.png, sitemap.xml, robots.txt (metadata files)
     * - public assets (fonts, images, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|sitemap\\.xml|robots\\.txt|fonts|catalysis\\.png|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp3|mp4|woff|woff2|ttf|otf)$).*)",
  ],
};
