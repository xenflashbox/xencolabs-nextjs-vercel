# Nemesis Fire preview: verification (PR #30, commit 957ec97)

Run 2026-10-11 on xenco2 against a local production build (`next build` + `next start`), plus
the Vercel preview deployment of the same commit. Clerk keys for the local build were read from the
vault (`xencolabs-fe-site` → `/frontend`) into the process environment only, never printed.
Helper scripts used: `verify.mjs` (Playwright, below) and plain `curl`.

## 1. Build

```
$ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<vault> CLERK_SECRET_KEY=<vault> npx next build   # filtered to /os routes
 ✓ Compiled successfully
├ ƒ /os/[tenant]                         5.07 kB         116 kB
├ ƒ /os/[tenant]/estimate/[id]           2.73 kB         109 kB
├ ƒ /os/[tenant]/invoice/[id]            148 B           109 kB
├ ƒ /os/[tenant]/office                  3.73 kB         110 kB
├ ƒ /os/[tenant]/office/intake           2.01 kB         108 kB
├ ƒ /os/[tenant]/office/invoices/[id]    147 B           109 kB
├ ƒ /os/[tenant]/office/jobs/[id]        2.51 kB         108 kB
├ ƒ /os/[tenant]/office/quotes/[id]      2.84 kB         109 kB
├ ƒ /os/[tenant]/office/reports/[id]     147 B           110 kB
├ ƒ /os/[tenant]/office/requests         2.19 kB         108 kB
├ ƒ /os/[tenant]/report/[id]             147 B           110 kB
├ ƒ /os/[tenant]/request                 4.49 kB         110 kB
├ ƒ /os/[tenant]/services/[slug]         2.88 kB         114 kB
├ ƒ /os/[tenant]/status/[id]             2.85 kB         109 kB
├ ƒ /os/[tenant]/tech/[id]               2.95 kB         109 kB
rc 0
```
`rc 0` = exit code. `next build` includes the type-check and lint passes.

## 2. All frontend routes load · responsive overflow · noindex · AI tel link · document notice

```
$ node verify.mjs http://127.0.0.1:3311
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=3 docNotice=0 OK  /os/nemesis-fire
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/fire-sprinkler-systems
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/backflow-testing
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/extinguisher-service
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/emergency-repairs
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=2 docNotice=0 OK  /os/nemesis-fire/request
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/status/L-107
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/estimate/Q-203
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/report/R-501
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/report/R-503
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/invoice/I-403
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=2 docNotice=0 OK  /os/nemesis-fire/office
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/requests
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/intake
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/quotes/Q-201
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/jobs/J-304
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/office/reports/R-502
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/office/invoices/I-401
390px  200 width= 390 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/tech/J-301
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=3 docNotice=0 OK  /os/nemesis-fire
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/fire-sprinkler-systems
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/backflow-testing
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/extinguisher-service
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/services/emergency-repairs
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=2 docNotice=0 OK  /os/nemesis-fire/request
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/status/L-107
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/estimate/Q-203
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/report/R-501
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/report/R-503
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/invoice/I-403
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=2 docNotice=0 OK  /os/nemesis-fire/office
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/requests
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/intake
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/quotes/Q-201
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/office/jobs/J-304
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/office/reports/R-502
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=2 OK  /os/nemesis-fire/office/invoices/I-401
1440px 200 width=1440 robots="noindex, nofollow, nocache" visibleAiTel=1 docNotice=0 OK  /os/nemesis-fire/tech/J-301
RESULT: all routes OK
```
For each route at 390 px and 1440 px:
- HTTP status is 200.
- `scrollWidth` does not exceed the viewport.
- `<meta name="robots">` contains `noindex`.
- At least one **visible** `<a href="tel:+14153389949">` is present.
- There are no uncaught page errors.

`docNotice=2` means the exact text "Sample preview — not an official report, certification, invoice, or filing." appears above and below the document.

## 3. No production route exposure (production gate)

```
$ VERCEL_ENV=production (LOCAL_OS_TENANT_PREVIEWS unset) next start -p 3312
404 /os/nemesis-fire
404 /os/nemesis-fire/services/fire-sprinkler-systems
404 /os/nemesis-fire/request
404 /os/nemesis-fire/status/L-107
404 /os/nemesis-fire/estimate/Q-203
404 /os/nemesis-fire/report/R-501
404 /os/nemesis-fire/invoice/I-403
404 /os/nemesis-fire/office
404 /os/nemesis-fire/office/requests
404 /os/nemesis-fire/tech/J-301
200 / (rest of site unaffected)

$ curl -s http://127.0.0.1:3311/robots.txt
User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /sign-in
Disallow: /sign-up
Disallow: /api/
Disallow: /lp/
Disallow: /os/
Disallow: /p/
Disallow: /admin

Sitemap: https://xencolabs.com/sitemap.xml


$ curl -s https://www.xencolabs.com/os/nemesis-fire -o /dev/null -w "%{http_code}"  (live production)
307
$ curl -sL https://nemesisfire.com/ -o /dev/null -w "%{http_code}"  (live Nemesis site, read-only check)
200
$ git -C ~/nemesisfire.com status --short | wc -l; git -C ~/nemesisfire.com log -1 --format="%h %ad" --date=short
0
5c6ed08 2026-03-03
$ curl -s http://127.0.0.1:3311/os/nemesis-fire | grep -o "tel:+14153389949" | sort | uniq -c
      1 tel:+14153389949
```
- **Production gate:** with `VERCEL_ENV=production` and `LOCAL_OS_TENANT_PREVIEWS` unset (the production default), every `/os/*` route is 404 and the rest of the site is unaffected.
- **Live production:** `www.xencolabs.com/os/nemesis-fire` is not served (307, Clerk redirect on the deployed build without these routes).
- **Crawlers:** `robots.txt` disallows `/os/`.

## 4. Preview-only protection (Vercel preview of commit 957ec97)

```
$ for r in ...; do curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://xencolabs-bf5mc575k-xenophons-projects-9d1bd86b.vercel.app$r; done
302 -> Vercel login /os/nemesis-fire
302 -> Vercel login /os/nemesis-fire/request
302 -> Vercel login /os/nemesis-fire/office
302 -> Vercel login /os/nemesis-fire/tech/J-301
302 -> Vercel login /os/nemesis-fire/media/hero-pump-room.jpg
```
Every preview route, including media files, redirects to Vercel login (team-only).

## 5. Media import checks

```
field-equipment-loop: stream|codec_name=h264|codec_type=video|width=720|height=720 
riser-service-loop: stream|codec_name=h264|codec_type=video|width=720|height=720 
sprinkler-inspection-loop: stream|codec_name=h264|codec_type=video|width=720|height=720 
jpg files with EXIF: 0 of 14
```
- Videos are H.264, square 720×720, with **no audio stream**.
- Photos carry no EXIF (GPS removed).
- Container metadata was stripped with `-map_metadata -1`.

## 6. Live Nemesis systems untouched

- **Repository and live site:** `xenflashbox/nemesisfire.com` has no local changes (last commit 5c6ed08, 2026-03-03), and `https://nemesisfire.com/` still answers 200 (read-only check).
- **Everything else:** no Nemesis form, DNS, email, billing, calendar, phone number or customer data was touched. All preview records are fictional and browser-only (localStorage).
- **Reference documents:** the client's reference emails (invoices, inspection and backflow reports, certificates) were read in a private scratch folder for structure only. **No reference file or value is in this repository** (checked: no `.eml`/`.pdf`, no reference addresses, names, phone numbers, prices or certificate numbers in the diff).

## Known local-only noise

On `localhost`, the site-wide Clerk script logs two `400` responses from `clerk.xencolabs.com`, because the production publishable key is bound to the xencolabs.com domain. These are not requests made by the preview pages.

## Appendix: verify.mjs

```js
// Usage: node verify.mjs <base>   — overflow, page errors, tel links (visible), noindex meta, per route
import { chromium } from 'playwright-core';
const BASE = process.argv[2] || 'http://127.0.0.1:3311';
const T = '/os/nemesis-fire';
const routes = ['', '/services/fire-sprinkler-systems', '/services/backflow-testing', '/services/extinguisher-service', '/services/emergency-repairs',
  '/request', '/status/L-107', '/estimate/Q-203', '/report/R-501', '/report/R-503', '/invoice/I-403',
  '/office', '/office/requests', '/office/intake', '/office/quotes/Q-201', '/office/jobs/J-304', '/office/reports/R-502', '/office/invoices/I-401', '/tech/J-301'];
const b = await chromium.launch();
let fail = 0;
for (const [label, vp, mob] of [['390px', { width: 390, height: 844 }, true], ['1440px', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  for (const r of routes) {
    const res = await p.goto(BASE + T + r, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
    const w = await p.evaluate(() => document.documentElement.scrollWidth);
    const robots = await p.$eval('meta[name="robots"]', (m) => m.content).catch(() => 'MISSING');
    const ai = await p.$$eval('a[href="tel:+14153389949"]', (as) => as.filter((a) => { const r = a.getBoundingClientRect(); const cs = getComputedStyle(a); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden'; }).length);
    const docNotice = await p.getByText('Sample preview — not an official report, certification, invoice, or filing.').count();
    const ok = res.status() === 200 && w <= vp.width && robots.includes('noindex') && ai > 0 && errs.length === 0;
    if (!ok) fail++;
    console.log(`${label.padEnd(6)} ${String(res.status())} width=${String(w).padStart(4)} robots="${robots}" visibleAiTel=${ai} docNotice=${docNotice} ${ok ? 'OK' : 'FAIL'}  ${T}${r}`);
    errs.length = 0;
  }
  await ctx.close();
}
console.log(fail ? `RESULT: ${fail} FAILURES` : 'RESULT: all routes OK');
await b.close();
```
