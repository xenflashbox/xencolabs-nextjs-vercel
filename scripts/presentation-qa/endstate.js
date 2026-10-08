const { chromium } = require('playwright-core');
const [tok, outDir] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of [[1366, 768], [390, 844]]) {
    const mobile = w < 600;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
    await ctx.route('**calendly.com/**', r => r.abort());
    const webmPath = process.env.FINAL_SLIDE_WEBM; const webm = webmPath ? require('fs').readFileSync(webmPath) : null;
    if (webm && process.env.FINAL_SLIDE_MP4_GLOB) await ctx.route(process.env.FINAL_SLIDE_MP4_GLOB, r => r.fulfill({ status: 200, contentType: 'video/webm', body: webm }));
    const page = await ctx.newPage();
    const beacons = [];
    page.on('request', r => { if (r.url().includes('/events')) beacons.push(r.postData()); });
    await page.goto(`https://www.xencolabs.com/p/${tok}`, { waitUntil: 'networkidle', timeout: 60000 });
    const bars = page.locator('button[aria-label^="Go to "]');
    await bars.nth((await bars.count()) - 1).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${outDir}/motion-final-${w}x${h}.png` });
    await page.getByRole('button', { name: /start/i }).first().click();
    await page.evaluate(() => setInterval(() => document.querySelectorAll('audio').forEach(a => { a.playbackRate = 8; }), 100));
    await page.getByRole('dialog', { name: 'Presentation complete' }).filter({ visible: true }).first().waitFor({ timeout: 90000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outDir}/motion-endstate-${w}x${h}.png` });
    const dlg = page.getByRole('dialog', { name: 'Presentation complete' }).filter({ visible: true }).first();
    const popup = ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null);
    await dlg.getByRole('link', { name: /book a strategy review/i }).click();
    const p2 = await popup; if (p2) await p2.close();
    await page.waitForTimeout(500);
    await dlg.getByRole('button', { name: /replay/i }).click();
    await page.waitForTimeout(2500);
    console.log(w + 'x' + h, JSON.stringify(beacons.map(b => JSON.parse(b))));
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
