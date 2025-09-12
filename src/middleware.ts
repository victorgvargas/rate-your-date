import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isLoggedIn = Boolean(request.cookies.get("auth-token"));
    // Replace with your real auth check (e.g. JWT, session)

    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // If user is not logged in and tries to access a protected route
    if (!isLoggedIn && !isPublicRoute && pathname === "/") {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}