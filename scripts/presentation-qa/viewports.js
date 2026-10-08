const { chromium } = require('playwright-core');
const [tokMotion, tokStatic, outDir] = process.argv.slice(2);
const VPS = [[1366,768],[1440,900],[1512,982],[1920,1080],[390,844],[430,932]];
(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const [kind, tok] of [['motion', tokMotion], ['static', tokStatic]]) {
    for (const [w, h] of VPS) {
      const mobile = w < 600;
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
      await ctx.route('**calendly.com/**', r => r.abort());
      const page = await ctx.newPage();
      await page.goto(`https://www.xencolabs.com/p/${tok}`, { waitUntil: 'networkidle', timeout: 60000 });
      const bars = page.locator('button[aria-label^="Go to "]');
      await bars.nth((await bars.count()) - 1).click();
      await page.waitForTimeout(4000);
      const m = await page.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height) }; };
        const stage = document.querySelector('main > div');
        const cta = [...document.querySelectorAll('a')].filter(a => /book a strategy review/i.test(a.textContent)).sort((x, y) => y.getBoundingClientRect().height - x.getBoundingClientRect().height)[0];
        const next = document.querySelector('button[aria-label^="Next"]');
        return { vw: innerWidth, vh: innerHeight, scrollH: document.documentElement.scrollHeight, stage: r(stage), cta: r(cta), controls: r(next),
                 ratio: stage ? +(stage.getBoundingClientRect().width / stage.getBoundingClientRect().height).toFixed(3) : null };
      });
      const inView = (b) => b && b.top >= 0 && b.left >= 0 && b.bottom <= m.vh && b.right <= m.vw;
      const res = { kind, vp: `${w}x${h}`, stageInView: inView(m.stage), ratio: m.ratio, ctaInView: inView(m.cta), ctaH: m.cta && m.cta.h,
                    controlsInView: inView(m.controls), noVScroll: m.scrollH <= m.vh, stage: m.stage, cta: m.cta };
      res.pass = res.stageInView && Math.abs(res.ratio - 16/9) < 0.01 && res.ctaInView && res.ctaH >= 48 && res.controlsInView && res.noVScroll;
      results.push(res);
      await page.screenshot({ path: `${outDir}/${kind}-final-${w}x${h}.png` });
      await ctx.close();
    }
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
