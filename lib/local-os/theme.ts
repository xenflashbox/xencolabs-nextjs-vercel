// Owned theme resolver for Local OS private previews. No imports, so `node --test` can load it directly.
//
// A business's public <meta name="theme-color"> is used when it is a real, usable color. It is darkened (or lightened)
// just enough to carry white button text at WCAG AA (4.5:1). Neutral, near-white, near-black or malformed colors fall
// back to one of the curated Xenco-owned palettes below, picked deterministically from the preview token so a
// prospect always sees the same look.

export type FamilyKey = 'exterior' | 'property' | 'route';

export type Palette = { name: string; accent: string; deep: string; highlight: string; families: FamilyKey[] };

export const PALETTES: Palette[] = [
  { name: 'Harbor', accent: '#0f5f8a', deep: '#0b2233', highlight: '#f2b33d', families: ['exterior', 'route'] },
  { name: 'Signal', accent: '#b93a0b', deep: '#1c1410', highlight: '#fbbf24', families: ['exterior'] },
  { name: 'Slate & Brass', accent: '#36556b', deep: '#141f28', highlight: '#c9a227', families: ['exterior', 'property'] },
  { name: 'Redwood', accent: '#a23b1f', deep: '#2a120b', highlight: '#e9c46a', families: ['exterior', 'property'] },
  { name: 'Fieldstone', accent: '#3f6b3a', deep: '#17251a', highlight: '#d9a441', families: ['property'] },
  { name: 'Clay', accent: '#9c4a2c', deep: '#2b1710', highlight: '#8fbf6f', families: ['property'] },
  { name: 'Evergreen', accent: '#146c43', deep: '#0c2117', highlight: '#f4d35e', families: ['property', 'route'] },
  { name: 'Tidewater', accent: '#0b6f78', deep: '#08262a', highlight: '#ffd166', families: ['route', 'exterior'] },
  { name: 'Deep End', accent: '#0a5fb4', deep: '#071d36', highlight: '#5eead4', families: ['route'] },
];

/** Highlight used with a business's own color: a family default that sits well next to most brand hues. */
const FAMILY_HIGHLIGHT: Record<FamilyKey, string> = { exterior: '#f5c518', property: '#d9a441', route: '#5eead4' };

export type Theme = {
  accent: string;
  accentSoft: string;
  deep: string;
  highlight: string;
  source: 'business' | 'xenco';
  palette: string;
  adjusted: boolean;
  reason?: 'missing' | 'invalid' | 'neutral' | 'unreachable';
};

type RGB = [number, number, number];

export function parseHex(input: string | null | undefined): RGB | null {
  if (!input) return null;
  const m = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(input.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length <= 4) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = ([r, g, b]: RGB) => '#' + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');

export function luminance([r, g, b]: RGB): number {
  const c = [r, g, b].map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

export function contrast(a: RGB, b: RGB): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

function toHsl([r, g, b]: RGB): [number, number, number] {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B), min = Math.min(R, G, B), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === R ? (G - B) / d + (G < B ? 6 : 0) : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return [h / 6, s, l];
}

function fromHsl(h: number, s: number, l: number): RGB {
  if (s === 0) return [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  // Rounded here so the contrast check runs on exactly the color that is emitted.
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

const WHITE: RGB = [255, 255, 255];
const INK: RGB = [11, 15, 20];
export const MIN_TEXT_CONTRAST = 4.5;
/** A color this close to body ink reads as black, not as a brand color. */
const MIN_INK_SEPARATION = 1.6;

const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function fallbackPalette(family: FamilyKey, seed: string): Palette {
  const pool = PALETTES.filter((p) => p.families.includes(family));
  return pool[hash(seed) % pool.length];
}

/** Bring a brand color into the band where white text passes AA and it is still visibly a color, or null. */
function fitAccent(rgb: RGB): { rgb: RGB; adjusted: boolean } | null {
  const ok = (c: RGB) => contrast(c, WHITE) >= MIN_TEXT_CONTRAST && contrast(c, INK) >= MIN_INK_SEPARATION;
  if (ok(rgb)) return { rgb, adjusted: false };
  const [h, s, l] = toHsl(rgb);
  const dir = contrast(rgb, WHITE) < MIN_TEXT_CONTRAST ? -1 : 1;
  for (let L = l; L >= 0 && L <= 1; L += dir * 0.01) {
    const c = fromHsl(h, s, L);
    if (ok(c)) return { rgb: c, adjusted: true };
  }
  return null;
}

export function resolveTheme(themeColor: string | null | undefined, family: FamilyKey, seed: string): Theme {
  const fallback = (reason: Theme['reason']): Theme => {
    const p = fallbackPalette(family, seed);
    return { accent: p.accent, accentSoft: toHex(mix(parseHex(p.accent)!, WHITE, 0.9)), deep: p.deep, highlight: p.highlight,
      source: 'xenco', palette: p.name, adjusted: false, reason };
  };
  if (!themeColor) return fallback('missing');
  const rgb = parseHex(themeColor);
  if (!rgb) return fallback('invalid');
  const [h, s, l] = toHsl(rgb);
  if (s < 0.15 || l < 0.06 || l > 0.96) return fallback('neutral');
  const fit = fitAccent(rgb);
  if (!fit) return fallback('unreachable');
  return {
    accent: toHex(fit.rgb),
    accentSoft: toHex(mix(fit.rgb, WHITE, 0.9)),
    deep: toHex(fromHsl(h, Math.min(s, 0.55), 0.11)),
    highlight: FAMILY_HIGHLIGHT[family],
    source: 'business',
    palette: 'Business theme color',
    adjusted: fit.adjusted,
  };
}
