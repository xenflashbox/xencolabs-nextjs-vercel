// Run: npm run test:local-os   (Node >= 22.18 strips the types from theme.ts)
import test from 'node:test';
import assert from 'node:assert/strict';
import { PALETTES, contrast, parseHex, resolveTheme, fallbackPalette, MIN_TEXT_CONTRAST } from './theme.ts';

const WHITE = [255, 255, 255];
const FAMILIES = ['exterior', 'property', 'route'];

test('curated palette: 8-10 Xenco palettes, every family has at least two, every accent carries white text at AA', () => {
  assert.ok(PALETTES.length >= 8 && PALETTES.length <= 10);
  for (const f of FAMILIES) assert.ok(PALETTES.filter((p) => p.families.includes(f)).length >= 2, f);
  for (const p of PALETTES) {
    assert.ok(contrast(parseHex(p.accent), WHITE) >= MIN_TEXT_CONTRAST, `${p.name} accent`);
    assert.ok(contrast(parseHex(p.deep), WHITE) >= 12, `${p.name} deep`);
  }
});

test('a usable business color is kept as-is', () => {
  const t = resolveTheme('#0d6818', 'exterior', 'tok');   // East Bay Solar Cleaning's public theme-color
  assert.equal(t.source, 'business');
  assert.equal(t.accent, '#0d6818');
  assert.equal(t.adjusted, false);
});

test('a too-light brand color is darkened until white text passes AA, keeping its hue', () => {
  const t = resolveTheme('#7dd3fc', 'route', 'tok');
  assert.equal(t.source, 'business');
  assert.equal(t.adjusted, true);
  assert.ok(contrast(parseHex(t.accent), WHITE) >= MIN_TEXT_CONTRAST);
  const [r, g, b] = parseHex(t.accent);
  assert.ok(b > r && b > g * 0.9, 'still blue');
});

test('short and alpha hex forms parse', () => {
  assert.deepEqual(parseHex('#fff'), [255, 255, 255]);
  assert.deepEqual(parseHex('#0d6818cc'), [13, 104, 24]);
});

for (const [input, reason] of [[null, 'missing'], ['', 'missing'], ['red', 'invalid'], ['rgb(1,2,3)', 'invalid'], ['#ffffff', 'neutral'],
  ['#000000', 'neutral'], ['#777777', 'neutral'], ['#fbfdff', 'neutral']]) {
  test(`fallback for ${JSON.stringify(input)} (${reason})`, () => {
    const t = resolveTheme(input, 'property', 'seed-1');
    assert.equal(t.source, 'xenco');
    assert.equal(t.reason, reason);
    assert.ok(PALETTES.some((p) => p.name === t.palette && p.families.includes('property')));
  });
}

test('fallback palette is deterministic per token and spreads across tokens', () => {
  assert.equal(fallbackPalette('exterior', 'abc').name, fallbackPalette('exterior', 'abc').name);
  const seen = new Set(Array.from({ length: 40 }, (_, i) => fallbackPalette('exterior', `token-${i}`).name));
  assert.ok(seen.size >= 3);
});

test('every resolved accent, from any input, carries white text at AA', () => {
  for (let i = 0; i < 4096; i += 7) {
    const hex = '#' + [(i * 37) % 256, (i * 91) % 256, (i * 13) % 256].map((v) => v.toString(16).padStart(2, '0')).join('');
    for (const f of FAMILIES) {
      const t = resolveTheme(hex, f, hex);
      assert.ok(contrast(parseHex(t.accent), WHITE) >= MIN_TEXT_CONTRAST, `${hex} -> ${t.accent}`);
    }
  }
});
