// Product-deck acceptance (api-xencolabs #76): viewport matrix + slide screenshots + end state + CTA + telemetry.
//   node scripts/presentation-qa/product.js <baseUrl> <path> <outDir> [webmDir]
// Telemetry beacons are intercepted and answered 204 (QA traffic never reaches production counts); CTA popups are
// captured, not followed. webmDir: VP9 copies of the slide MP4s, served in place of H.264 because Playwright's
// open-source Chromium cannot decode H.264 (real Chrome/Safari/Firefox play the MP4s).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const [base, route, outDir, webmDir] = process.argv.slice(2);
const VPS = [[1366, 768], [1440, 900], [1920, 1080], [390, 844], [430, 932]];
const FULL = new Set(['1366x768', '390x844']);

(async () => {
  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const results = [];
  for (const [w, h] of VPS) {
    const vp = `${w}x${h}`;
    const mobile = w < 600;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
    const beacons = [];
    await ctx.route('**/product-decks/*/events', (r) => { beacons.push(JSON.parse(r.request().postData() || '{}')); r.fulfill({ status: 204 }); });
    await ctx.route(/calendly\.com|sonomawashco\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: 'ok' }));
    if (webmDir) {
      await ctx.route('**/presentations/**/*.mp4', (r) => {
        const f = path.join(webmDir, path.basename(new URL(r.request().url()).pathname).replace(/\.mp4$/, '.webm'));
        return fs.existsSync(f) ? r.fulfill({ status: 200, contentType: 'video/webm', body: fs.readFileSync(f) }) : r.continue();
      });
    }
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1500);
    const bars = page.locator('button[aria-label^="Go to slide"]');
    const shot = async (name) => page.screenshot({ path: `${outDir}/${name}-${vp}.png` });
    await shot('slide1');
    for (const n of [4, 7]) { await bars.nth(n - 1).click(); await page.waitForTimeout(1500); await shot(`slide${n}`); }
    await bars.nth((await bars.count()) - 1).click();
    await page.waitForTimeout(2000);
    await shot('final-cta');
    const m = await page.evaluate(() => {
      const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right), h: Math.round(b.height) }; };
      const stage = document.querySelector('main > div');
      const cta = [...document.querySelectorAll('a')].filter((a) => /book a build consultation/i.test(a.textContent))[0];
      const next = document.querySelector('button[aria-label^="Next"]');
      return { vw: innerWidth, vh: innerHeight, scrollH: document.documentElement.scrollHeight, stage: r(stage), cta: r(cta), ctaHref: cta && cta.href,
               controls: r(next), ratio: stage ? +(stage.getBoundingClientRect().width / stage.getBoundingClientRect().height).toFixed(3) : null };
    });
    const inView = (b) => b && b.top >= 0 && b.left >= 0 && b.bottom <= m.vh && b.right <= m.vw;
    const res = { vp, stageInView: inView(m.stage), ratio: m.ratio, ctaInView: inView(m.cta), ctaH: m.cta && m.cta.h, ctaHref: m.ctaHref,
                  controlsInView: inView(m.controls), noVScroll: m.scrollH <= m.vh };
    res.layoutPass = res.stageInView && Math.abs(res.ratio - 16 / 9) < 0.01 && res.ctaInView && res.ctaH >= 48 && res.controlsInView && res.noVScroll;
    if (FULL.has(vp)) {
      await bars.nth(0).click();                       // full run: all eight MP4/MP3 pairs, narration-clocked
      await page.getByRole('button', { name: /start/i }).first().click();
      await page.evaluate(() => setInterval(() => document.querySelectorAll('audio').forEach((a) => { a.playbackRate = 8; }), 100));
      const dlg = page.getByRole('dialog', { name: 'Presentation complete' }).filter({ visible: true }).first();
      await dlg.waitFor({ timeout: 90000 });
      await page.waitForTimeout(800);
      await shot('endstate');
      const popups = [];
      for (const name of [/book a build consultation/i, /see sonoma wash co/i]) {
        const pop = ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null);
        await dlg.getByRole('link', { name }).click();
        const p2 = await pop; if (p2) { popups.push(p2.url()); await p2.close(); }
      }
      await page.waitForTimeout(400);
      await dlg.getByRole('button', { name: /replay/i }).click();
      await page.waitForTimeout(2500);
      res.popups = popups;
      res.beacons = beacons.map((b) => [b.event, b.slide || '', b.cta || ''].filter(Boolean).join(':'));
      res.session = [...new Set(beacons.map((b) => b.session))];
      const ev = new Set(beacons.map((b) => b.event));
      res.telemetryPass = ['view', 'start', 'slide_start', 'slide_complete', 'complete', 'cta_impression', 'cta_click', 'presentation_replay'].every((e) => ev.has(e))
        && beacons.some((b) => b.cta === 'secondary') && res.session.length === 1 && !!res.session[0];
    }
    results.push(res);
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
