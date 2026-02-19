import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/apps',
  '/apps/(.*)',
  '/services',
  '/api/health',
  '/entrepreneurs',
  '/agencies',
  '/enterprise',
  '/about',
  '/contact',
  '/blog',
  '/consulting',
  '/support',
  '/terms',
  '/privacy',
  '/sitemap.xml',
  '/robots.txt',
])

// Primary domain middleware configuration
export default clerkMiddleware((auth, req) => {
  // For public routes, allow access
  if (isPublicRoute(req)) {
    return
  }
  
  // For protected routes, check authentication
  const { userId } = auth()
  if (!userId) {
    // Redirect to sign-in if not authenticated
    return auth().redirectToSignIn()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}