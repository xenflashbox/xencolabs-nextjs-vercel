import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';

/**
 * Link-preview (Open Graph / Twitter) card for Local OS preview sites: 1200×630, the preview's own
 * brand colour, headline and (when available) its real photography and logo, with the amber
 * "private concept" ribbon every preview carries. Rendered on request, so it always matches the
 * current configuration. Fonts are OFL (Barlow, Barlow Condensed, IBM Plex Mono) bundled in ./fonts.
 */
export const SHARE_CARD_SIZE = { width: 1200, height: 630 } as const;

export interface ShareCard {
  /** Small field label above the headline, e.g. the service area. */
  eyebrow: string;
  /** Main headline (rendered uppercase, condensed). */
  title: string;
  subtitle?: string;
  /** Shown as text when there is no logo. */
  brandName: string;
  /** data: URL of a logo that reads on a dark background. */
  logo?: string | null;
  /** Light plate behind the logo, for artwork drawn only for light backgrounds. */
  logoPlate?: string;
  /** Width ÷ height of the logo (default 4). */
  logoAspect?: number;
  /** data: URL of a photo used full-bleed behind the text. */
  photo?: string | null;
  accent: string;
  /** Dark base colour. */
  surface: string;
  /** Short service or preview label displayed in the amber footer. */
  ribbon: string;
  /** Optional right side of the footer; defaults to Xenco Labs. */
  footerLabel?: string;
  /** Short bullets for a right-hand panel when there is no photo. */
  points?: string[];
}

const FONT_DIR = join(process.cwd(), 'lib/local-os/og/fonts');
let fonts: Promise<{ name: string; data: Buffer; weight: 500 | 700; style: 'normal' }[]> | null = null;
function loadFonts() {
  fonts ??= Promise.all([
    readFile(join(FONT_DIR, 'BarlowCondensed-Bold.ttf')).then((data) => ({ name: 'Display', data, weight: 700 as const, style: 'normal' as const })),
    readFile(join(FONT_DIR, 'Barlow-Medium.ttf')).then((data) => ({ name: 'Body', data, weight: 500 as const, style: 'normal' as const })),
    readFile(join(FONT_DIR, 'IBMPlexMono-Medium.ttf')).then((data) => ({ name: 'Mono', data, weight: 500 as const, style: 'normal' as const })),
  ]);
  return fonts;
}

/** Fetch a URL into a data: URL for embedding; null on any failure or timeout (the card still renders). */
export async function toDataUrl(url: string | null | undefined, timeoutMs = 4000): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' });
    if (!res.ok) return null;
    const type = res.headers.get('content-type')?.split(';')[0] || 'application/octet-stream';
    if (!/^image\//.test(type)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength > 4_000_000) return null;
    return `data:${type};base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/**
 * Renders the card and returns it as a progressive JPEG: photo cards are ~1 MB as PNG, while some
 * unfurlers (WhatsApp) skip images over ~300 KB.
 */
export async function renderShareCard(c: ShareCard, headers: Record<string, string> = {}): Promise<Response> {
  const title = clip(c.title, 90);
  const titleSize = title.length > 60 ? 64 : title.length > 40 ? 76 : 88;
  const points = (c.points ?? []).slice(0, 3).map((p) => clip(p, 64));
  const panel = !c.photo && points.length > 0;

  const png = new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: c.surface, color: '#fff', fontFamily: 'Body' }}>
        {c.photo ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={c.photo} width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover' }} />
        ) : null}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex',
            background: c.photo
              ? `linear-gradient(90deg, ${c.surface} 0%, ${c.surface}F2 42%, ${c.surface}99 68%, ${c.surface}33 100%)`
              : `linear-gradient(135deg, ${c.surface} 0%, ${c.surface} 60%, ${c.accent}33 100%)`,
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 630, background: c.accent, display: 'flex' }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: panel ? 760 : 820, height: 566, padding: '52px 0 0 70px' }}>
          {c.logo ? (
            <div style={{ display: 'flex', alignSelf: 'flex-start', padding: c.logoPlate ? '8px 14px' : 0, background: c.logoPlate ?? 'transparent', borderRadius: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={c.logo} width={Math.round(62 * (c.logoAspect ?? 4))} height={62} style={{ width: Math.round(62 * (c.logoAspect ?? 4)), height: 62, objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 44, textTransform: 'uppercase', letterSpacing: 1 }}>{clip(c.brandName, 40)}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 46, fontFamily: 'Mono', fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: '#d4d4d4' }}>
            <div style={{ width: 14, height: 14, background: c.accent, marginRight: 14, display: 'flex' }} />
            {clip(c.eyebrow, 56)}
          </div>
          <div style={{ display: 'flex', marginTop: 18, fontFamily: 'Display', fontSize: titleSize, lineHeight: 0.95, textTransform: 'uppercase' }}>{title}</div>
          {c.subtitle ? (
            <div style={{ display: 'flex', marginTop: 22, fontSize: 26, lineHeight: 1.3, color: '#d4d4d4' }}>{clip(c.subtitle, 120)}</div>
          ) : null}
        </div>

        {panel ? (
          <div style={{ position: 'absolute', top: 0, right: 0, width: 380, height: 566, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 44px', background: c.accent }}>
            {points.map((p, i) => (
              <div key={p} style={{ display: 'flex', alignItems: 'flex-start', marginTop: i ? 26 : 0 }}>
                <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 18, color: '#ffffffb3', width: 44, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ display: 'flex', flex: 1, fontSize: 26, lineHeight: 1.25 }}>{p}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          style={{
            position: 'absolute', left: 0, bottom: 0, width: 1200, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 70px', background: '#fcd34d', color: '#451a03', fontFamily: 'Mono', fontSize: 19, letterSpacing: 2, textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>{clip(c.ribbon, 70)}</div>
          <div style={{ display: 'flex' }}>{clip(c.footerLabel ?? 'Xenco Labs', 32)}</div>
        </div>
      </div>
    ),
    { ...SHARE_CARD_SIZE, fonts: await loadFonts() },
  );
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Length': String(jpeg.byteLength),
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
      ...headers,
    },
  });
}
