// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// The middleware runs on all routes except public files and API routes (see config below)
export function middleware(request: NextRequest) {
  // Read the access_token cookie
  const token = request.cookies.get("access_token")?.value;
  console.log("token->", token)
  // The current path user is trying to access
  const { pathname } = request.nextUrl;

  // If token is present and user is on /login, redirect to /dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If token is missing and user is NOT on /login, redirect to /login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

// Optional: Adjust this matcher to exclude static files and API routes as needed
export const config = {
  matcher: [
    /*
      Exclude Next.js internals and static files:
      _next/static
      _next/image
      favicon.ico
      api/*
    */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
