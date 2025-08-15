import { authMiddleware } from "@clerk/nextjs/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/apps",
    "/services",
    // "/labs/c1", - temporarily removed
    "/api/health"
  ],
});

// Stop Middleware from running on static files and API routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};