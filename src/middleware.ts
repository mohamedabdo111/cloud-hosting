import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Internationalization Middleware
const i18nMiddleware = createMiddleware(routing);

// Combined Middleware
export async function middleware(request: NextRequest) {
  // Add CORS headers to the response
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*"); // Adjust '*' to your allowed domains for better security
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle OPTIONS requests for preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }

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
  const i18nResponse = i18nMiddleware(request);
  i18nResponse.headers.set("Access-Control-Allow-Origin", "*");
  i18nResponse.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  i18nResponse.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return i18nResponse;
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
