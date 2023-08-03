import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAuthenticated } from "./helper/authentication";

export function middleware(NextRequest) {
  const token = NextRequest.cookies.get("token");
  if (!token)
    return NextResponse.redirect(new URL("/signin/#signin", NextRequest.url));
}

export const config = {
  matcher: ["/createblog/:path*", "/edittag"],
};
