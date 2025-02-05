import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/chat(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Check if it's a request to the chat endpoint from another origin
  const isChatRequest = request.nextUrl.pathname.startsWith("/chat");
  const isExternalRequest =
    request.headers.get("origin") &&
    request.headers.get("origin") !== request.headers.get("host");

  // Allow external chat requests to pass through without protection
  if (isChatRequest && isExternalRequest) {
    return;
  }

  // For all other routes, apply the usual protection
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
