import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Updated to exclude webhooks from private routes
const isPrivateRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/(.*)", // match all API routes
]);

export default clerkMiddleware(async (auth, request) => {
  // Check if it's a request to the chat endpoint
  const isChatRequest = request.nextUrl.pathname.startsWith("/chat");
  // Check if it's a webhooks request
  const isWebhooksRequest =
    request.nextUrl.pathname.startsWith("/api/webhooks");

  // For chat or webhooks requests, allow them through without authentication
  if (isChatRequest || isWebhooksRequest) {
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
    // Skip authentication for webhook routes even though they match the API pattern

    if (!isWebhooksRequest) {
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
    // Match API routes except webhooks
    "/(api/(?!webhooks).*)",
    // Match trpc routes
    "/trpc/(.*)",
  ],
};
