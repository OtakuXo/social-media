import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log(request.cookies.get("next-auth.session-token"));
  const sessionCookie = request.cookies.get("next-auth.session-token");
  if (sessionCookie === undefined) {
    return NextResponse.rewrite(new URL("/pages/unauthorized", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/pages/post/(.*)",
    "/pages/search/(.*)",
    "/pages/profile/(.*)",
    "/pages/friends/(.*)",
  ],
};
