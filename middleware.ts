import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public and private routes
const isPublicRoute = createRouteMatcher([
  "/chat(.*)",
  "/api/webhooks(.*)",
  "/api/ask(.*)",
  "/api/session/create(.*)",
]);

const isPrivateRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/(.*)", // match all API routes
]);

export default clerkMiddleware(async (auth, request) => {
  // Check if it's a public route
  if (isPublicRoute(request)) {
    const response = NextResponse.next();
    // Add CORS headers to support both direct browser and cross-origin requests
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }

  // Handle protected routes authentication
  if (isPrivateRoute(request)) {
    // Skip authentication for public routes even though they match the API pattern
    if (!isPublicRoute(request)) {
      // Ensure user is authenticated
      await auth.protect();
    }

    // Handle the specific /dashboard redirect after authentication
    if (request.nextUrl.pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL("/dashboard/assistants", request.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|chat).*|^/chat.*)",
    // Match API routes except webhooks, ask, and session/create endpoints
    "/(api/(?!webhooks|ask|session/create).*)",
    // Match trpc routes
    "/trpc/(.*)",
  ],
};
