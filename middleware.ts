import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/apps",
  "/services",
  "/labs/c1"
]);

export default clerkMiddleware((auth, req) => {
  try {
    // For protected routes, require authentication
    if (isProtectedRoute(req)) {
      auth().protect();
    }

    // Explicitly allow public routes without authentication
    if (isPublicRoute(req)) {
      return;
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // The error will be handled by Clerk middleware
    throw error;
  }
});

export const config = {
  matcher: [
    // Skip static files and images
    "/((?!_next|.*\..*).*)",
    "/"
  ],
};
