# Jackson's Paving presentation: verification (PR #30)

Public, unlisted, no password: **https://preview.xencolabs.com/jacksons-paving**
This is a Xenco Labs prospect demonstration with fictional sample data. It is not connected to
any Jackson's Paving system.

Verified 2026-10-12 against `xenco-preview` deployment `8995849` (Preview target, branch
`feat/local-os-tenant-nemesis-fire`). Checks were run signed-out in Google Chrome 155.

## Build

- `next build` rc 0, locally, with both presentation tenants.
- Vercel deployment READY.

## Platform reuse (no fork)

- **Trade module:** `lib/local-os/verticals/commercial-paving.ts`.
  - Lanes: commercial paving, repair/patching, sealcoat/crack seal, striping, milling.
  - Flow: `estimate-first`, so the customer sees Request → Site review & estimate → Approval →
    Crew scheduled → Field work & completion → Invoice.
- **Tenant:** `lib/local-os/tenants/jacksons-paving.ts`.
  - Facts come only from jacksonspavinginc.com and its public social profile. No licence, years in
    business, response time, financing, warranty or guarantee is claimed.
  - Media is held in the private R2 bucket (`tenants/jacksons-paving/`, 10 objects, hash-verified);
    none is committed to this repo.
  - Photos are the company's public website imagery, used as illustration and never captioned as a
    Jackson's project.
- **Shared screens:** unchanged, apart from new configuration hooks (terms, flow, links, logo aspect,
  grouped estimate lines, crew/equipment/materials/weather, site markup, request photo intake).
  The Nemesis regression passes 38/38.

## Routes (live, signed-out)

```
== live preview.xencolabs.com (deployment 559270e, signed-out curl)
/                                            302 https://preview.xencolabs.com/nemesis-fire | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/nemesis-fire                                200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving                             200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/request                     200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/status/L-701                200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/office                      200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/office/jobs/J-803           200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/tech/J-803                  200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/report/R-803                200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/jacksons-paving/invoice/I-903               200  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/os/jacksons-paving                          308 https://preview.xencolabs.com/jacksons-paving | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/os/other                                    404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/about                                       404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/dashboard                                   404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
/sitemap.xml                                 404  | x-robots-tag: noindex, nofollow, noarchive, noimageindex
```

## Desktop (1440 px) and phone (390 px): 20 routes × 2 widths

Each route was checked for: 200, no horizontal overflow, no page errors, meta + X-Robots `noindex`/`noarchive`, a visible `tel:+14153389949`, the persistent label, the document notice on every estimate / record / invoice, no broken images, and every link staying under `/jacksons-paving`.

```
390px  200 w= 390 noindex=true aiTel=3 label=1 notice=0 links=29 off=0 brokenImg=0 err=0 OK  /jacksons-paving
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/commercial-asphalt-paving
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/pavement-repair
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/sealcoating
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/parking-lot-striping
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/milling-and-paving
390px  200 w= 390 noindex=true aiTel=2 label=1 notice=0 links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/request
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=19 off=0 brokenImg=0 err=0 OK  /jacksons-paving/status/L-701
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=12 off=0 brokenImg=0 err=0 OK  /jacksons-paving/estimate/Q-703
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=12 off=0 brokenImg=0 err=0 OK  /jacksons-paving/report/R-801
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/report/R-803
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/invoice/I-903
390px  200 w= 390 noindex=true aiTel=2 label=1 notice=0 links=22 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=10 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/requests
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=9 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/intake
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=10 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/quotes/Q-701
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=13 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/jobs/J-803
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/reports/R-801
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/invoices/I-903
390px  200 w= 390 noindex=true aiTel=1 label=1 notice=0 links=5 off=0 brokenImg=0 err=0 OK  /jacksons-paving/tech/J-803
1440px 200 w=1440 noindex=true aiTel=3 label=1 notice=0 links=29 off=0 brokenImg=0 err=0 OK  /jacksons-paving
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/commercial-asphalt-paving
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/pavement-repair
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/sealcoating
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/parking-lot-striping
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=17 off=0 brokenImg=0 err=0 OK  /jacksons-paving/services/milling-and-paving
1440px 200 w=1440 noindex=true aiTel=2 label=1 notice=0 links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/request
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=19 off=0 brokenImg=0 err=0 OK  /jacksons-paving/status/L-701
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=12 off=0 brokenImg=0 err=0 OK  /jacksons-paving/estimate/Q-703
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=12 off=0 brokenImg=0 err=0 OK  /jacksons-paving/report/R-801
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/report/R-803
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/invoice/I-903
1440px 200 w=1440 noindex=true aiTel=2 label=1 notice=0 links=22 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=10 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/requests
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=9 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/intake
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=10 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/quotes/Q-701
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=13 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/jobs/J-803
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/reports/R-801
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=2(req) links=11 off=0 brokenImg=0 err=0 OK  /jacksons-paving/office/invoices/I-903
1440px 200 w=1440 noindex=true aiTel=1 label=1 notice=0 links=5 off=0 brokenImg=0 err=0 OK  /jacksons-paving/tech/J-803
RESULT: all 40 checks OK
```

## Click path (live, both widths)

Website → request a site review (submitted; sample stays in the browser) → customer status → office dashboard → estimator review → crew schedule → crew job (phone) → completion record → invoice → Xenco AI panel.

```
desktop 01-website             /jacksons-paving
desktop 02-request             /jacksons-paving/request
desktop 03-request-submitted   /jacksons-paving/request
desktop 04-customer-status     /jacksons-paving/status/L-701
desktop 05-office-dashboard    /jacksons-paving/office
desktop 06-estimator-review    /jacksons-paving/office/quotes/Q-701
desktop 07-crew-schedule       /jacksons-paving/office/jobs/J-803
desktop 08-crew-job            /jacksons-paving/tech/J-803
desktop 09-completion-record   /jacksons-paving/report/R-803
desktop 10-invoice             /jacksons-paving/invoice/I-903
desktop 11-ai-panel tel links: 3 · heading: true
desktop 11-ai-panel            /jacksons-paving
phone   01-website             /jacksons-paving
phone   02-request             /jacksons-paving/request
phone   03-request-submitted   /jacksons-paving/request
phone   04-customer-status     /jacksons-paving/status/L-701
phone   05-office-dashboard    /jacksons-paving/office
phone   06-estimator-review    /jacksons-paving/office/quotes/Q-701
phone   07-crew-schedule       /jacksons-paving/office/jobs/J-803
phone   08-crew-job            /jacksons-paving/tech/J-803
phone   09-completion-record   /jacksons-paving/report/R-803
phone   10-invoice             /jacksons-paving/invoice/I-903
phone   11-ai-panel tel links: 3 · heading: true
phone   11-ai-panel            /jacksons-paving
```

## Safeguards

- **Document notice:** every estimate, site review, completion record and invoice shows "Sample
  preview — not an official estimate, invoice, work order, or project record." (top and bottom
  bands plus a watermark).
- **Sample data only:** the project is fictional ("North Bay Office Center (sample)",
  1200 Sample Business Park Drive). Names are sample roles; the office coordinator is a sample
  role, not a named employee. Prices are placeholders.
  - None of Jackson's proposals, contracts, pricing, tenants, dates or payment terms appear.
  - The founder's own parking-lot address is not used.
- **AI panel:** "Try the live AI receptionist · (415) 338-9949" is labelled as a Xenco Labs
  demonstration, not Jackson's line.
- **Exposure:**
  - `/` still redirects to `/nemesis-fire`.
  - Other `/os/*` tenants, `/about`, `/dashboard` and `/sitemap.xml` return 404 on the preview host.
  - Every `*.vercel.app` URL of the project returns 404.
  - `www.xencolabs.com/os/*` and `/jacksons-paving` still go to Clerk sign-in, as before.
  - `/os-media` returns 404 on www.
- **Link preview:** `og:image` = `https://preview.xencolabs.com/jacksons-paving/share-image`
  (1200×630 JPEG, about 81 KB).
- **Not touched:** Jackson's live website, forms, email, DNS, calendar, customer data, billing
  and production systems, and the LeadIntel engine. Jackson's is not in the engine, so nothing can
  auto-email them.


---

## On-the-job video clips (2026-10-12)

**Source:** `/home/xen/docs/jacksons/jacksons-preview-assets/` (`video/` 5 × MP4, `images/` 5 × PNG
posters). No `Asphault` spelling appears in any file name. The files were still being copied when
first inspected; they were probed again after they stopped changing, and all five decode with
0 errors.

- **Format:** H.264, 1080×1080, 30 fps, no audio track.
- **Cleaning:** a lossless remux (`-c copy -map_metadata -1`) removed an embedded Premiere project
  path (`/Users/…/Jacksons Paving.prproj`). Decoded frames are identical to the supplied files.
- **Posters:** pixel-identical, with Adobe XMP removed.
- **Delivery:** the private bucket only (`tenants/jacksons-paving/media/`), served through the
  allowlisted `/os-media` route. Nothing is committed to the repo.

**Pairing by content.** Each poster was compared against frames from every full clip, at 2 frames
per second and by eye. The supplied `finished-road`/`rolling` clip labels are crossed relative to
their posters, so the published names follow what each loop and poster shows.

| Published key | Source clip | Poster | Length | Evidence | Placement |
|---|---|---|---|---|---|
| `jacksons-paving-asphalt-pouring.mp4` (sha256 `18b0c6abe8b4d5a8…`) | `jacksons-paving-asphalt-pouring.mp4` | `jacksons-paving-asphalt-pouring-poster.png` | 28.0 s | Dump truck delivering asphalt; poster frame appears at ~3 s | Homepage card 01 |
| `jacksons-paving-foreman.mp4` (sha256 `b6c8e1ab5d3184e2…`) | `jacksons-paving-foreman.mp4` | `jacksons-paving-foreman-poster.png` | 26.0 s | Crew lead at the LeeBoy paver, truck feeding the hopper; poster frame appears at ~15.5 s (near-identical) | Homepage card 02 |
| `jacksons-paving-rolling.mp4` (sha256 `b82ca0fb19ffae8d…`) | `jacksons-paving-finished-road.mp4` | `jacksons-paving-rolling-poster.png` | 65.5 s | Opens on a roller compacting toward camera beside a white barn: the rolling poster is this opening shot (~2 s) | Homepage card 03 |
| `jacksons-paving-finished-road.mp4` (sha256 `3813df5d041682ad…`) | `jacksons-paving-rolling.mp4` | `jacksons-paving-finished-road-poster.png` | 12.3 s | Roller on fresh mat, ending on a finished road beside vineyard rows; closest match to the finished-road poster (no exact frame) | Commercial asphalt paving page |
| `jacksons-paving-onthe-job.mp4` (sha256 `4407c3c5c31194dd…`) | `jacksons-paving-onthe-job.mp4` | `jacksons-paving-onthe-job-poster.png` | 22.7 s | Crew and roller on a shaded drive. Paired by elimination: the poster scene (crew at the paver) comes from the foreman footage | Pavement repair page |

**Copy safeguards.** Each clip carries this note: "Footage from Jackson’s Paving’s public channel,
shown as illustration. It does not depict the sample project or a specific customer." The sample
project, every sample-document notice and the AI-panel labels are unchanged. One poster shows
Jackson's own truck plate, as in their public footage; it was left unaltered.

**Player (shared `FieldVideo`).**
- muted, loop, `playsInline`, `preload="metadata"`, with the matching poster;
- nothing is fetched until the clip is within 400 px of the viewport;
- plays only while visible;
- under `prefers-reduced-motion` only the poster renders: no video element, no download.

### Clip checks (live, signed-out, Google Chrome 155)

```
desktop no-preference home       w=1440 videos=[asphalt-pouring.mp4 poster=asphalt-pouring-poster.png ready=4 1080px m1l1i1 metadata | foreman.mp4 poster=foreman-poster.png ready=4 1080px m1l1i1 metadata | rolling.mp4 poster=rolling-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=0 OK
desktop no-preference commercial w=1440 videos=[finished-road.mp4 poster=finished-road-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=1 OK
desktop no-preference repair     w=1440 videos=[onthe-job.mp4 poster=onthe-job-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=1 OK
desktop reduce        home       w=1440 posters=[asphalt-pouring-poster.png, foreman-poster.png, rolling-poster.png] mp4-requests=0 OK
desktop reduce        commercial w=1440 posters=[finished-road-poster.png] mp4-requests=0 OK
desktop reduce        repair     w=1440 posters=[onthe-job-poster.png] mp4-requests=0 OK
phone   no-preference home       w=390 videos=[asphalt-pouring.mp4 poster=asphalt-pouring-poster.png ready=4 1080px m1l1i1 metadata | foreman.mp4 poster=foreman-poster.png ready=4 1080px m1l1i1 metadata | rolling.mp4 poster=rolling-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=0 OK
phone   no-preference commercial w=390 videos=[finished-road.mp4 poster=finished-road-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=0 OK
phone   no-preference repair     w=390 videos=[onthe-job.mp4 poster=onthe-job-poster.png ready=4 1080px m1l1i1 metadata] mp4-at-load=0 OK
phone   reduce        home       w=390 posters=[asphalt-pouring-poster.png, foreman-poster.png, rolling-poster.png] mp4-requests=0 OK
phone   reduce        commercial w=390 posters=[finished-road-poster.png] mp4-requests=0 OK
phone   reduce        repair     w=390 posters=[onthe-job-poster.png] mp4-requests=0 OK
RESULT: all clip/poster/reduced-motion checks OK
```

### Routes, regression and exposure (live)

```
Jackson routes: RESULT: all 40 checks OK
Nemesis routes: RESULT: all 38 checks OK
Nemesis media:  RESULT: all media loaded through the private route
== allowlist / exposure (live)
/os-media/jacksons-paving/media/jacksons-paving-rolling.mp4        302
/os-media/jacksons-paving/media/not-configured.mp4                 404
/os-media/nemesis-fire/media/jacksons-paving-rolling.mp4           404
/os-media/jacksons-paving/media/field-equipment-loop.mp4           404
https://preview.xencolabs.com/                                     302 https://preview.xencolabs.com/nemesis-fire
https://preview.xencolabs.com/os/other                             404 
https://preview.xencolabs.com/about                                404 
www.xencolabs.com/os/jacksons-paving                               307 https://www.xencolabs.com/sign-in
www.xencolabs.com/jacksons-paving                                  307 https://www.xencolabs.com/sign-in
www.xencolabs.com/os-media/jacksons-paving/media/jacksons-paving-rolling.mp4 307 https://www.xencolabs.com/sign-in
```

- Non-configured keys, cross-tenant keys and Nemesis keys requested under Jackson's path return
  404. Production (`www`) does not serve `/os-media` or `/jacksons-paving`.
- No Nemesis asset, Nemesis copy or Xenco production route changed. Jackson's live website,
  forms, email, DNS, calendar, customer data and billing were not touched.
