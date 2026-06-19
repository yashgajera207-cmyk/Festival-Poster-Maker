import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("accessToken")
      ?.value;

  const pathname =
    request.nextUrl.pathname;

  const protectedRoutes = [
    "/admin",
    "/user",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (
    isProtected &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
  ],
};