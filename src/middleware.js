import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(NextRequest) {
  return NextResponse.redirect(new URL("/signin", NextRequest.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/createblog/:path*", "/edittag"],
};
