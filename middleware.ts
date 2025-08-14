// middleware.ts
// Following the exact Clerk documentation
import { authMiddleware } from "@clerk/nextjs";
 
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/apps",
    "/services", 
    "/labs/c1",
    "/api/health"
  ],
  
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.+\\..+)(.*)"],
});
 
export const config = {
  // Ensures the middleware is run on every request
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
