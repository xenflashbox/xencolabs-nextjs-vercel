# Nemesis Fire presentation: preview.xencolabs.com/nemesis-fire

Public, unlisted, no password. A Xenco Labs sales presentation, not a Nemesis Fire site.
Verified 2026-10-11 against live deployment `7a8b576` of Vercel project **xenco-preview**.

## Domain diagnosis

- **Cloudflare (zone xencolabs.com):** one record, `CNAME preview.xencolabs.com →
  3eab2c9c3f82731e.vercel-dns-016.com`, **DNS-only (not proxied)**, TTL auto. It was last
  modified 2026-10-11 22:56Z, before this work. There are no duplicate A/AAAA/CNAME records.
- **Vercel-required target:** `3eab2c9c3f82731e.vercel-dns-016.com` (rank 1; the fallback is
  `cname.vercel-dns.com`). The domain config reports `misconfigured: false`. **No Cloudflare
  change was needed or made.**
- **Why visitors hit sign-in or errors:** `preview.xencolabs.com` was attached to the general
  `xencolabs` project. That project serves the normal Xenco site under its Clerk policy, so
  `/nemesis-fire` redirected to `/sign-in`. The domain was moved to the dedicated project.
  `xencolabs.com`, `www` and `baytech` stay on `xencolabs`.
- **TLS:** Let's Encrypt certificate, CN `preview.xencolabs.com`, valid to 2027-01-09.

## Deployment

- **Project:** `xenco-preview` (prj_aNC31ooQH1GnJT7QnJE3qLcbDAWn). It is git-connected to this
  repo with production branch `feat/local-os-tenant-nemesis-fire`. It builds only production
  deployments; the ignore step skips all others.
- **PR #30:** not merged. The general `xencolabs` project and its auth policy are unchanged.
- **Vercel Authentication:** `all_except_custom_domains`. The custom domain is public, and the
  project's `*.vercel.app` URLs still require a Vercel login. Behind that login they 404 anyway,
  because of the host gate below.
- **Project env:**
  - `NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT=nemesis-fire`
  - `LOCAL_OS_TENANT_PREVIEWS=on`
  - Clerk keys, copied from the vault
  - `R2_TENANT_MEDIA_ACCOUNT_ID` and `R2_TENANT_MEDIA_BUCKET`
  - The R2 read key pair is **not set yet** (see Media).

## Routing (middleware, presentation deployment only)

These public paths are answered **before Clerk protection runs**, and only on an allowed host
(`LOCAL_OS_PRESENTATION_HOSTS`, default `preview.xencolabs.com`):

| Request | Result |
|---|---|
| `/` | 302 → `/nemesis-fire` |
| `/nemesis-fire`, `/nemesis-fire/*` | internal rewrite to `/os/nemesis-fire/*`; the browser stays on the clean URL |
| `/os/nemesis-fire/*` | 308 → clean path |
| `/os-media/nemesis-fire/<configured key>` | gated media route (host + tenant + allowlist checked in the route) |
| anything else (other tenants, `/about`, `/dashboard`, `/sitemap.xml`, …) | 404 |
| any path on a host that is not allowed | 404 |

Every response carries `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`. Pages also
carry meta robots `noindex, nofollow, noarchive, noimageindex`. robots.txt lists no sitemap. All
in-preview links go through `osBase`/`osHref`, so they stay on the clean path.

## Live validation (signed-out, no cookies)

```
== preview.xencolabs.com (signed-out curl, no cookies) — deployment 7a8b576
/                                                  302 https://preview.xencolabs.com/nemesis-fire | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire                                      200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/request                              200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/status/L-107                         200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/estimate/Q-203                       200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/report/R-501                         200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/invoice/I-403                        200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/office                               200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/office/reports/R-502                 200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/nemesis-fire/tech/J-301                           200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/os/nemesis-fire/office                            308 https://preview.xencolabs.com/nemesis-fire/office | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/os/other-tenant                                   404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/about                                             404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/dashboard                                         404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/sitemap.xml                                       404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/robots.txt                                        200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/os-media/nemesis-fire/media/hero-pump-room.jpg    503  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/os-media/nemesis-fire/media/not-in-config.jpg     404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
/os-media/other/x.jpg                              404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex 
== Clerk sign-in ever reached? (follow redirects from /nemesis-fire)
final=https://preview.xencolabs.com/nemesis-fire code=200 redirects=0
== deployment URL (SSO)
302 -> vercel sso: https://vercel.com/sso-api?url=https%3A%2
== general production host (live, unchanged)
www.xencolabs.com/                                   200 
www.xencolabs.com/os/nemesis-fire                    307 https://www.xencolabs.com/sign-in
www.xencolabs.com/os/nemesis-fire/office             307 https://www.xencolabs.com/sign-in
www.xencolabs.com/os/other-tenant                    307 https://www.xencolabs.com/sign-in
www.xencolabs.com/nemesis-fire                       307 https://www.xencolabs.com/sign-in
www.xencolabs.com/os-media/nemesis-fire/media/hero-pump-room.jpg 404 
== R2 bucket public access
unsigned S3 GET of object: 400
unsigned bucket list: 400
r2.dev public URL enabled: False | custom domains: 0 | CORS rules: none

desktop home      200 url=/nemesis-fire clerk=false
desktop request   200 url=/nemesis-fire/request clerk=false
desktop status    200 url=/nemesis-fire/status/L-107 clerk=false
desktop estimate  200 url=/nemesis-fire/estimate/Q-203 clerk=false
desktop report    200 url=/nemesis-fire/report/R-501 clerk=false
desktop invoice   200 url=/nemesis-fire/invoice/I-403 clerk=false
desktop office    200 url=/nemesis-fire/office clerk=false
desktop tech      200 url=/nemesis-fire/tech/J-301 clerk=false
desktop root -> /nemesis-fire
desktop click Request service -> /nemesis-fire/request
desktop click Office -> /nemesis-fire/office
desktop click Technician -> /nemesis-fire/tech/J-301
desktop AI tel links on tech page: 1
phone   home      200 url=/nemesis-fire clerk=false
phone   request   200 url=/nemesis-fire/request clerk=false
phone   status    200 url=/nemesis-fire/status/L-107 clerk=false
phone   estimate  200 url=/nemesis-fire/estimate/Q-203 clerk=false
phone   report    200 url=/nemesis-fire/report/R-501 clerk=false
phone   invoice   200 url=/nemesis-fire/invoice/I-403 clerk=false
phone   office    200 url=/nemesis-fire/office clerk=false
phone   tech      200 url=/nemesis-fire/tech/J-301 clerk=false
phone   root -> /nemesis-fire
phone   click Request service -> /nemesis-fire/request
phone   click Office -> /nemesis-fire/office
phone   click Technician -> /nemesis-fire/tech/J-301
phone   AI tel links on tech page: 1
```

Full browser crawl, 19 routes × 390 px and 1440 px (fresh context): **38/38 OK**. Each route
returned 200, with no horizontal overflow and no page errors. Every route had the meta noindex
and the X-Robots `noarchive` header, at least one visible `tel:+14153389949` link, the persistent
label "Private Xenco Labs concept preview for Nemesis Fire", and **0 links leaving
`/nemesis-fire`**. The sample-document notice appears on estimate, report and invoice pages
(office and customer).

## General-site regression (local production build without presentation env)

```
general-prod /                                       200 
general-prod /about                                  200 
general-prod /os/nemesis-fire                        404 
general-prod /os/nemesis-fire/office                 404 
general-prod /os/other-tenant                        404 
general-prod /nemesis-fire                           307 https://accounts.xencolabs.com/sign-in?redirect_url=http%3A%2F%2Fwww.xencolabs.com%2Fnemesis-fire
general-prod /os-media/nemesis-fire/media/hero-pump-room.jpg 404 
general-prod /dashboard                              307 https://accounts.xencolabs.com/sign-in?redirect_url=http%3A%2F%2Fwww.xencolabs.com%2Fdashboard
```

Live `www.xencolabs.com` is unchanged: PR #30 is unmerged and Clerk still redirects `/os/*` and
`/nemesis-fire` to sign-in. Once PR #30 merges, those paths return 404, as the regression above
shows.

Host-gate test on the presentation build (`verify-host-gate`): on `preview.xencolabs.com` the
presentation answers. On a `*.vercel.app` host or `www.xencolabs.com`, every path returns 404,
media included.

## Media

- **Bucket:** R2 `xenco-tenant-media` stays private.
  - r2.dev public URL disabled, 0 custom domains, no CORS.
  - An unsigned object GET or bucket list returns 400.
  - Media is reachable only through `/os-media/nemesis-fire/<key>`: config-referenced keys only,
    a 300 s presigned redirect, no-store, no-referrer.
- **Not yet working live:** the route returns 503 because no bucket-scoped read-only key is
  configured. No vaulted Cloudflare token can create API tokens; all were tested and none can
  reach the token permission groups. Until the key is set, the logo, photos and clips render as
  broken images. **Do not share the link before this is done.**
- **Founder step:**
  1. In Cloudflare, go to R2 → Manage API tokens → Create. Choose Object Read only, applied to
     the `xenco-tenant-media` bucket only.
  2. Store the Access Key ID and Secret in the vault (`xencolabs-fe-site` → `/frontend`) as
     `R2_TENANT_MEDIA_ACCESS_KEY_ID` and `R2_TENANT_MEDIA_SECRET_ACCESS_KEY`.
  3. Then the admin adds them to the **xenco-preview** project env and redeploys. They do not go
     in the general project.
- Provenance and inventory of all 20 served objects: `nemesis-media-hardening.md`.

## Not touched

- No merge of PR #30.
- No change to the general Xenco auth policy or its routes.
- No change to Cloudflare DNS.
- No change to `xencolabs.com`, `www.xencolabs.com` or `nemesisfire.com`.
- No Nemesis live site, form, email, booking or customer data.
