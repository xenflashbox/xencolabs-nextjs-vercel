# Presentation UX acceptance (founder gate, 2026-10-08)

A Lane-A deck (motion player) or Lane-B brief (static) may not reach approval until these pass on production.

```bash
npm i --no-save playwright-core@1.56.1      # uses the cached Playwright Chromium (rev 1194)
# 1) viewport matrix: final slide fully visible at 16:9, controls visible, CTA >= 48px above the fold, no vertical scroll
node scripts/presentation-qa/viewports.js <motion-qa-token> <static-qa-token> ./shots
# 2) end state + telemetry: plays the final slide to completion, captures the end state, clicks the CTA and Replay,
#    prints the beacon sequence (expect: view, cta_impression, start, slide_start, slide_complete, complete, cta_click,
#    presentation_replay)
node scripts/presentation-qa/endstate.js <motion-qa-token> ./shots
```

Viewports: 1366x768, 1440x900, 1512x982, 1920x1080, 390x844, 430x932. Use **preview** QA tokens
(`POST /v1/lead-intelligence/pitch/decks/{id}/tracking-token {"preview": true}`) so test traffic never counts as
prospect engagement (headless runs are also bot-flagged).

**Codec note:** Playwright's open-source Chromium cannot decode H.264 (`canPlayType` is empty, media error 4), so
the slide area renders blank in headless screenshots although real Chrome/Safari/Firefox play it. For representative
screenshots, transcode the final slide's MP4 to WebM and set `FINAL_SLIDE_WEBM=/path/s10.webm` and
`FINAL_SLIDE_MP4_GLOB='**/pm/shared/<sha16>.mp4'`; the layout/telemetry assertions do not depend on it.
