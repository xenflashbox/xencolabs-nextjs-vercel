import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Dedicated presentation deployment (its own Vercel project, served at preview.xencolabs.com).
 * When NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT is set, this deployment serves ONLY that tenant's
 * preview, at the clean path /<slug>: `/` → 302 /<slug>, /<slug>/* is rewritten to /os/<slug>/*,
 * /os/<slug>/* redirects to the clean path, /os-media/* passes through to its gated route, and
 * everything else is a noindex 404. The general Xenco project never sets it.
 */
const PRESENTATION_TENANT = process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || ''
const NOINDEX = 'noindex, nofollow, noarchive, noimageindex'

function presentation(req: NextRequest): NextResponse {
  const slug = PRESENTATION_TENANT
  const { pathname, search } = req.nextUrl
  const url = req.nextUrl.clone()
  let res: NextResponse
  if (pathname === '/') {
    url.pathname = `/${slug}`
    res = NextResponse.redirect(url, 302)
  } else if (pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)) {
    url.pathname = `/os${pathname}`
    res = NextResponse.rewrite(url)
  } else if (pathname === `/os/${slug}` || pathname.startsWith(`/os/${slug}/`)) {
    url.pathname = pathname.slice(3)
    url.search = search
    res = NextResponse.redirect(url, 308)
  } else if (pathname.startsWith(`/os-media/${slug}/`) || pathname === '/robots.txt') {
    res = NextResponse.next()
  } else {
    res = new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  }
  res.headers.set('X-Robots-Tag', NOINDEX)
  return res
}

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/apps',
  '/apps/(.*)',
  '/services',
  '/services/(.*)',
  '/portfolio',
  '/portfolio/(.*)',
  '/compareitad',
  '/api/health',
  '/api/upwork/callback',
  '/entrepreneurs',
  '/agencies',
  '/enterprise',
  '/about',
  '/contact',
  '/blog',
  '/blog/(.*)',
  '/api/blog/(.*)',
  '/api/media-url/(.*)',
  '/consulting',
  '/support',
  '/terms',
  '/privacy',
  '/api-integrations',
  '/growth',
  '/growth/(.*)',
  '/api/growth-audit',
  '/search-function-review',
  '/review/(.*)',
  '/p/(.*)', // per-recipient tracked presentations (opaque token, noindex)
  '/lp/(.*)', // Local OS private workflow previews (opaque token, noindex)
  '/os/(.*)', // Local OS tenant previews: 404 on production unless LOCAL_OS_TENANT_PREVIEWS=on
  '/os-media/(.*)', // gated tenant media (allowlisted keys → short-lived signed URL); 404 on production
  '/api/search-function-review',
  '/websites',
  '/websites/(.*)',
  '/api/checkout/websites',
  '/api/checkout/pitch-deck',
  '/api/website-intake',
  '/advisory',
  '/api/advisory-briefing',
  '/api/form-token',
  '/sitemap.xml',
  '/robots.txt',
  '/tools',
  '/tools/(.*)',
])

// Primary domain middleware configuration
export default clerkMiddleware((auth, req) => {
  if (PRESENTATION_TENANT) return presentation(req)

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
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|pdf|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
