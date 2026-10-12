import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'
import { PRESENTATION_TENANT, isPresentationTenant, presentationHostAllowed } from '@/lib/local-os/presentation'

/**
 * Presentation deployment only (see lib/local-os/presentation.ts). On an allowed host:
 * `/` → 302 /<slug>, /<slug>/* is rewritten to /os/<slug>/*, /os/<slug>/* redirects to the clean
 * path, /os-media/<slug>/* passes to its gated route, /lp/<token>/* (workflow-concept previews) passes
 * through, everything else is a noindex 404. Any other
 * host is a 404 for every path.
 */
const NOINDEX = 'noindex, nofollow, noarchive, noimageindex'

function presentation(req: NextRequest): NextResponse {
  const { pathname, search } = req.nextUrl
  const url = req.nextUrl.clone()
  const seg = pathname.split('/')
  // /<slug>/…  ·  /os/<slug>/…  ·  /os-media/<slug>/…
  const clean = isPresentationTenant(seg[1] ?? '')
  const legacy = seg[1] === 'os' && isPresentationTenant(seg[2] ?? '')
  const media = seg[1] === 'os-media' && isPresentationTenant(seg[2] ?? '') && seg.length > 3
  // Local OS workflow-concept previews (/lp/<token>/…): token-addressed, noindex, sample data only.
  const lp = seg[1] === 'lp' && /^[A-Za-z0-9_-]{16,64}$/.test(seg[2] ?? '')
  let res: NextResponse
  if (!presentationHostAllowed(req.headers.get('host'))) {
    res = new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  } else if (pathname === '/') {
    url.pathname = `/${PRESENTATION_TENANT}`
    res = NextResponse.redirect(url, 302)
  } else if (clean) {
    url.pathname = `/os${pathname}`
    res = NextResponse.rewrite(url)
  } else if (legacy) {
    url.pathname = pathname.slice(3)
    url.search = search
    res = NextResponse.redirect(url, 308)
  } else if (media || lp || pathname === '/robots.txt') {
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
  // Public presentation paths are answered here, before any Clerk protection runs. This branch only
  // exists on the dedicated presentation deployment; the Xenco site's auth policy below is unchanged.
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
