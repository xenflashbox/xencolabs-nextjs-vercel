# Nemesis Fire preview: media provenance and privacy hardening (PR #30)

Run 2026-10-11 against a local production build (`next build` + `next start`, port 3311,
preview mode). The R2 read credentials were injected for this local test only and never printed.

## 1. Where the media lives now

- **Nothing in this public repository.** `public/os/nemesis-fire/**` (28 files: photos, clips,
  posters, logos) was removed. Tenant config holds only logical keys (`tenantAsset(slug, …)`).
- **Private bucket:** R2 `xenco-tenant-media`, objects at `tenants/nemesis-fire/<key>`.
  r2.dev access disabled, no custom domain, no CORS. An unsigned GET of an object returns **400**.
- **Gated route:** `/os-media/<slug>/<key>` → 404 in production, 404 for any key the tenant
  config does not reference, otherwise a 302 to a SigV4 presigned GET valid for **300 s**.
  Response headers: `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`,
  `Cache-Control: private, no-store`, `Referrer-Policy: no-referrer`.
- **Deployed previews need a bucket-scoped read-only token** in the Vercel Preview env as
  `R2_TENANT_MEDIA_ACCOUNT_ID` / `_BUCKET` / `_ACCESS_KEY_ID` / `_SECRET_ACCESS_KEY`.
  Until it is set, `/os-media` returns 503 and media does not render.

## 2. Source inventory (every object the preview serves: 20)

Sources are in the founder's local folder `nemesis-preview-assets/`. SHA-256 is of the served
bytes, fetched back through `/os-media`. Each fetched object matched the uploaded object.

| Bucket key (`tenants/nemesis-fire/…`) | Source | SHA-256 (served) | Dimensions / codec / audio | Config key |
|---|---|---|---|---|
| `brand/nemesis-shield-1c-black.svg` | `logos/nemesis-shield-1c-black.svg` | `41c76362104db31aad95bdd943b5f61289f7db2c2c6609611126f60fb088716b` | SVG (vector) | `branding.logos.shieldMonoBlack` |
| `brand/nemesis-shield-1c-white.svg` | `logos/nemesis-shield-1c-white.svg` | `ed4d1e3223da51a284eeed1b72724729057d3f8637a1f9460831c9afe9340071` | SVG (vector) | `branding.logos.shieldMonoWhite` |
| `brand/nemesis-shield-color-dark.svg` | `logos/nemesis-shield-color-dark.svg` | `77549f64fd1b3d43d13642cfccd0721beb355431a30e66e9c98c43f774180d95` | SVG (vector) | `branding.logos.shieldOnLight, favicon` |
| `brand/nemesis-shield-color-light.svg` | `logos/nemesis-shield-color-light.svg` | `074bb5585a5cbd19578321e93540ec739b7055548eabaa4ba533220b5f7175e9` | SVG (vector) | `branding.logos.shieldOnDark` |
| `brand/nemesis-wordmark-1c-black.svg` | `logos/nemesis-wordmark-1c-black.svg` | `e4fc2647541ce717e1c292fbb64bc51971f93773bbbd86e2309d17803af6a47b` | SVG (vector) | `branding.logos.wordmarkMonoBlack` |
| `brand/nemesis-wordmark-1c-white.svg` | `logos/nemesis-wordmark-1c-white.svg` | `52ed61323c97c0f353b5f12accceded1833565b372afa7d10aecf95dd474a9e3` | SVG (vector) | `branding.logos.wordmarkMonoWhite` |
| `brand/nemesis-wordmark-color-dark.svg` | `logos/nemesis-wordmark-color-dark.svg` | `a3a1b17e0b0414532242f4231c1ebdb4f274287dd9058a95791c6362b6d9a72e` | SVG (vector) | `branding.logos.wordmarkOnLight` |
| `brand/nemesis-wordmark-color-light.svg` | `logos/nemesis-wordmark-color-light.svg` | `4fce7c841476e4ee1412d00781ea55c03ea1f9dc19f8dcc964b0c209034317e6` | SVG (vector) | `branding.logos.wordmarkOnDark` |
| `media/field-equipment-loop.mp4` | `assets/field-equipment-loop.mp4` | `1d26577a8204c836489e14b3bc8063d18baf2bc56010fadca89f85a55503b7fd` | 1080×1080 · H.264 · 30 fps · 6.80 s · **0 audio tracks** | `media.proof[field-ready].video.src` |
| `media/field-equipment-poster.png` | `assets/field-equipment-poster.png` | `6ba47c20526a7c71cd8ba4eeabaf88ebab57c3f83eb79dd6fe5977b94d8fd6aa` | 1080×1080 PNG | `media.proof[field-ready].video.poster` |
| `media/sprinkler-inspection-loop.mp4` | `assets/sprinkler-inspection-loop.mp4` | `7fac2aa31f37d7a57596e231479f312a433c316e9c24b8a9ddf8660bbe4ab9b7` | 1080×1080 · H.264 · 30 fps · 6.73 s · **0 audio tracks** | `media.proof[sprinkler-inspection].video.src` |
| `media/sprinkler-inspection-poster.png` | `assets/sprinkler-inspection-poster.png` | `1ec80ecfe9f43fcf1d05e1665a4c973e614ddc7a4f981be2984188774ce2685c` | 1080×1080 PNG | `media.proof[sprinkler-inspection].video.poster` |
| `media/fire-riser-service-loop.mp4` | `assets/fire-riser-service-loop.mp4` | `7aa59e66f121bc4a4b13e1eb60e37ca473a3b093426771241847a7f364d50939` | 1080×1080 · H.264 · 30 fps · 9.87 s · **0 audio tracks** | `media.proof[riser-pump].video.src` |
| `media/fire-riser-service-poster.png` | `assets/fire-riser-service-poster.png` | `4a0fd1b0c3860722f58f7c7388780a8c2476d49b13eeaa94e3be721310292fe7` | 1080×1080 PNG | `media.proof[riser-pump].video.poster` |
| `media/hero-pump-room.jpg` | `photos/hero-pump-room.jpg` | `b26dc15dc03b86ac8cfe16bb04935455f0e55306bbd306f04be7b08b18ebbcc9` | 2400×1120 JPEG (src 3840×1792) | `media.hero` |
| `media/technician-sprinkler.jpg` | `photos/technician-sprinkler.jpg` | `5355f66e626e1d7b0b76cca3f611a54f3b4df18261ad165b8e62f557238944f1` | 862×1600 JPEG (src 1796×3332) | `media.about` |
| `media/pump-room-wide-01.jpg` | `photos/pump-room-wide-01.jpg` | `5a93c4f196e153775f02d5b6820a18ddbc13fda3db86a8589336a55603c93081` | 862×1600 JPEG (src 1796×3332) | `media.lanes.sprinkler` |
| `media/backflow-valve.jpg` | `photos/backflow-valve.jpg` | `8f537e6ab6ae8ffc5241b18f84147214c8eb3aa25e55127bde2527352fec1102` | 810×1080 JPEG (src 810×1080) | `media.lanes.backflow` |
| `media/extinguisher-truck-01.jpg` | `photos/extinguisher-truck-01.jpg` | `a324c094ba4f925db7a8f77788ad4266e7d9b342ef8a0afdecccc9fef5ae5fa1` | 753×1400 JPEG (src 896×1665) | `media.lanes.extinguisher` |
| `media/gallery-01.jpg` | `photos/gallery-01.jpg` | `e4547550847e30cdce3e27f42bf452810862af23ed5528245a7f522009cc61a8` | 900×1200 JPEG (src 1080×1440) | `media.lanes.emergency` |

**Provenance checks**

- **Logos:** byte-identical to `logos/*.svg`.
- **Clips:** these are the final supplied `assets/*.mp4`, not the earlier portrait/HEVC/with-audio
  raw exports in `video/`, which are no longer used anywhere.
  - The served files differ from the supplied files only by container metadata. The supplied files
    embedded a Premiere project path (`creatorAtom`). That was removed by a lossless remux
    (`-map 0 -c copy -map_metadata -1`).
  - Decoded framemd5 matches the supplied file for all three clips. No re-encode, re-crop or
    quality change.
- **Posters:** pixel-identical to `assets/*-poster.png`. Adobe XMP and Creator chunks removed.
- **Photos:** uniform downscale with the aspect ratio preserved, no re-crop. Sources carry 0 EXIF
  tags and no GPS; served files carry 0 EXIF tags.
- **Byte scan of all 20 served objects:** 0 hits for local paths, `creatorAtom`, XMP, GPS,
  personal names, property addresses or certificate numbers.

## 3. Verification

| Check | Result |
|---|---|
| Videos: `muted loop playsinline preload="metadata"`, matching poster, no `autoplay` attribute (play/pause by IntersectionObserver) | 3/3 OK at 390 px and 1440 px |
| `prefers-reduced-motion: reduce` | 0 `<video>` elements; 3 `<img>` posters, each the matching file, all loaded, at 390 px and 1440 px |
| Overflow, 19 routes × 390 px and 1440 px | all `scrollWidth ≤ viewport`, all 200 |
| noindex | meta `noindex, nofollow` on every route; `X-Robots-Tag` header on `/os/*` and `/os-media/*` (including 404s); robots.txt disallows `/os/` and `/os-media/` |
| Production gate (`VERCEL_ENV=production`, previews flag unset, R2 keys present) | 404 for `/os/nemesis-fire`, `/office`, `/tech/J-301`, `/report/R-501`, and both `/os-media` objects |
| Old public paths `/os/nemesis-fire/media/*`, `/brand/*` | 404 in preview and in production mode |
| Enumeration | non-referenced key, unknown tenant, `tenants/…` prefix, `../` escapes → 404; Next normalises `%2e%2e` to a referenced key, so only allowlisted objects are reachable |
| PII scan: repo files in scope + rendered HTML of all 19 routes + served media bytes | 0 hits (personal names, the reference property address, owner entity, certificate numbers, reference prices, local paths) |
| Build | `next build` rc 0; `/os-media/[tenant]/[...key]` present |

## 4. Git history (not rewritten)

Earlier commits on this branch still contain the media blobs (photos, raw clips, logos). The repo
is public, so they are reachable through those commits and `refs/pull/30/head`. History was
**not** rewritten. The cleanup plan is in the PR conversation and needs explicit approval.
