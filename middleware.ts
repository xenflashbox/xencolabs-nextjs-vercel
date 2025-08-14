// middleware.ts
// Following the exact Clerk documentation
import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/apps",
  "/services",
  "/labs/c1",
  "/api/health"
]);

export default clerkMiddleware((auth, req) => {
  // For protected routes, require authentication
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Explicitly allow public routes without authentication
  if (isPublicRoute(req)) {
    return;
  }
});

export const config = {
  matcher: [
    // Skip static files and images
    "/((?!_next|.*\\..*).*)$",
    "/"
  ],
};
