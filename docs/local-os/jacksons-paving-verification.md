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
