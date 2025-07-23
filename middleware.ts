import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("token")?.value || request.headers.get("Authorization");

  const protectedRoutes = ["/dashboard", "/activities", "/schedule", "/gym-map"];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/activities", "/schedule", "/gym-map", "/mockActivities"],
};
