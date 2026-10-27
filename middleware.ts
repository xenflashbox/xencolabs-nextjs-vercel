import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'
import { PRESENTATION_TENANT, isPresentationTenant, presentationHostAllowed, presentationTenantAllowedForHost } from '@/lib/local-os/presentation'
import { hasNemesisDemoAccess } from '@/lib/local-os/nemesis-fire/demo-access'

/**
 * Host-aware Xenco Labs presentations (see lib/local-os/presentation.ts). On an allowed host:
 * `/` → 302 /<slug>, /<slug>/* is rewritten to /os/<slug>/*, /os/<slug>/* redirects to the clean
 * path, /os-media/<slug>/* passes to its gated route, /lp/<token>/* (workflow-concept previews) passes
 * through, everything else is a noindex 404. Any other
 * host is a 404 for every path.
 */
const LEADINTEL_API = process.env.LEADINTEL_PUBLIC_API_BASE || 'https://api.xencolabs.com'
/** True when the prospect preview has a sourced profile (then it renders as a Local OS tenant). */
async function hasProfile(token: string): Promise<boolean> {
  try {
    const r = await fetch(`${LEADINTEL_API}/v1/lead-intelligence/local-preview/${encodeURIComponent(token)}`, { cache: 'no-store' })
    if (!r.ok) return false
    const m = (await r.json()) as { config?: { profile?: { version?: number } } }
    return m.config?.profile?.version === 1
  } catch {
    return false
  }
}

const NOINDEX = 'noindex, nofollow, noarchive, noimageindex'

async function presentation(req: NextRequest): Promise<NextResponse> {
  const { pathname, search } = req.nextUrl
  const url = req.nextUrl.clone()
  // Accept the customer-facing Nemesis URL regardless of capitalization, then keep every
  // internal route on the canonical lowercase slug. Preserve query parameters, including the
  // one-time demo token, through the redirect.
  const canonicalPath = pathname.replace(
    /^\/(?:(os|os-media|api)\/)?nemesis-fire(?=\/|$)/i,
    (_match, prefix: string | undefined) => '/' + (prefix ? prefix.toLowerCase() + '/' : '') + 'nemesis-fire',
  )
  if (canonicalPath !== pathname) {
    url.pathname = canonicalPath
    return NextResponse.redirect(url, 308)
  }
  const seg = pathname.split('/')
  // /<slug>/…  ·  /os/<slug>/…  ·  /os-media/<slug>/…
  const host = req.headers.get('host')
  const clean = presentationTenantAllowedForHost(seg[1] ?? '', host)
  const legacy = seg[1] === 'os' && presentationTenantAllowedForHost(seg[2] ?? '', host)
  const mediaSlug = seg[2] ?? ''
  const media = seg[1] === 'os-media'
    && (presentationTenantAllowedForHost(mediaSlug, host) || (mediaSlug.startsWith('lp-') && presentationHostAllowed(host)))
    && seg.length > 3
  // Public pages and share cards are customer-facing. Office and technician tools require the preview token.
  const publicMedia = media && presentationTenantAllowedForHost(mediaSlug, host)
  const publicTenantPage = (clean && !['office', 'tech', 'api'].includes(seg[2] ?? '')) || publicMedia
  // Local OS workflow-concept previews (/lp/<token>/…): token-addressed, noindex, sample data only.
  const lp = seg[1] === 'lp' && /^[A-Za-z0-9_-]{16,64}$/.test(seg[2] ?? '')
  let res: NextResponse
  if (!presentationHostAllowed(req.headers.get('host'))) {
    res = new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  } else if (!PRESENTATION_TENANT) {
    res = new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  } else if (!publicTenantPage && !hasNemesisDemoAccess(req.cookies.get('nemesis_demo_access')?.value) && !hasNemesisDemoAccess(url.searchParams.get('token'))) {
    // Office/report paths remain token-gated, but show a useful access message instead of a dead 404.
    const home = `/${PRESENTATION_TENANT}`
    res = new NextResponse(
      `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Private demo link required</title><body style="font:16px system-ui,sans-serif;max-width:42rem;margin:10vh auto;padding:0 1.25rem;color:#1f2937"><h1 style="font-size:1.7rem">This office demo needs its private link</h1><p>Open the original Nemesis Fire demo link first, then choose Office. The customer-facing site is still available below.</p><p><a href="${home}">Return to the customer site</a></p></body></html>`,
      { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
    )
  } else if (hasNemesisDemoAccess(url.searchParams.get('token'))) {
    // Redeem the share token once, then keep it in an HttpOnly cookie so internal links stay clean.
    const token = url.searchParams.get('token') as string
    url.searchParams.delete('token')
    res = NextResponse.redirect(url, 302)
    res.cookies.set('nemesis_demo_access', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
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
  } else if (lp) {
    // Prospect previews render as a Local OS tenant (slug lp-<token>) at the same /lp/<token> URL.
    // The earlier workflow-concept subpaths map onto their Local OS equivalents.
    const rest = seg.slice(3).join('/')
    if (rest === 'estimate' || rest === 'system') {
      url.pathname = `/lp/${seg[2]}/${rest === 'estimate' ? 'request' : 'office'}`
      res = NextResponse.redirect(url, 308)
    } else if (await hasProfile(seg[2] as string)) {
      url.pathname = `/os/lp-${seg[2]}${rest ? `/${rest}` : ''}`
      res = NextResponse.rewrite(url)
    } else {
      res = NextResponse.next() // not rebuilt yet: the earlier workflow-concept pages render as before
    }
  } else if (pathname === '/api/nemesis-fire/sprinkler-report' && ['GET', 'POST', 'OPTIONS'].includes(req.method)) {
    // Preview-only report generation route; host validation above still applies.
    res = NextResponse.next()
  } else if (media || pathname === '/robots.txt') {
    res = NextResponse.next()
  } else {
    res = new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  }
  if (!publicTenantPage) res.headers.set('X-Robots-Tag', NOINDEX)
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
  // Only the approved branded presentation hostname bypasses Clerk. The main Xenco Labs host keeps
  // the existing auth policy except for the isolated Nemesis share path.
  const host = (req.headers.get('host') || '').split(':')[0].toLowerCase()
  const path = req.nextUrl.pathname
  const dedicatedPreviewHost = host === 'preview.xencolabs.com'
  const nemesisSharePath = /^\/(?:nemesis-fire|os\/nemesis-fire|os-media\/nemesis-fire|api\/nemesis-fire)(?:\/|$)/i.test(path)
  if (PRESENTATION_TENANT && presentationHostAllowed(host) && (dedicatedPreviewHost || nemesisSharePath)) return presentation(req)

  const localOsRoute = /^\/(?:os|os-media|api\/nemesis-fire)(?:\/|$)/.test(path)

  // For public routes, allow access
  if (!localOsRoute && isPublicRoute(req)) {
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
