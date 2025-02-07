import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher(["/dashboard(.*)", "/api(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Check if it's a request to the chat endpoint
  const isChatRequest = request.nextUrl.pathname.startsWith("/chat");

  // For chat requests, allow them through without authentication
  if (isChatRequest) {
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
  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/assistants", request.url));
  }

  // For all other routes, apply the usual protection
  if (isPrivateRoute(request)) {
    // await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|chat).*|^/chat.*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
