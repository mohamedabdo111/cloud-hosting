import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Internationalization Middleware
const i18nMiddleware = createMiddleware(routing);

// Combined Middleware
export async function middleware(request: NextRequest) {
  // Authentication Logic
  const token = request.cookies.get("authToken")?.value as string;

  // Redirect logged-in users away from login/register pages
  if (token) {
    if (
      request.nextUrl.pathname === "/ar/login" ||
      request.nextUrl.pathname === "/ar/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Proceed to the i18n middleware
  return i18nMiddleware(request);
}

// Matcher Configuration
export const config = {
  // Match all paths except API routes and static files
  matcher: [
    "/",
    "/(ar|en)/:path*", // Internationalized paths
    "/login", // Login page
    "/register", // Register page
  ],
};

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/login", "/register"],
// };
