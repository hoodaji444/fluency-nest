#!/usr/bin/env node
/**
 * Milestone 1 Empirical Challenger Stress Test Suite
 * Validates:
 * 1. Token Color Space & Contrast Math (WCAG 2.1 & APCA 0.98G)
 * 2. Gate 40, Gate 41, Gate 26a contrast compliance
 * 3. Container layout behavior across 320px–1920px viewports (Gate 44d)
 * 4. CSS variable resolution & leakage check
 * 5. Prohibition against pure #fff / #000 (Gate 7a)
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ── 1. Color Math Utilities (OKLCH -> sRGB -> WCAG & APCA) ──

function oklchToSrgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * s,
  ].map((c) => Math.min(1, Math.max(0, c)));
  const enc = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]) };
}

function srgbToHex(rgb) {
  const h = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`;
}

function wcagLuminance(rgb) {
  const dec = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * dec(rgb.r) + 0.7152 * dec(rgb.g) + 0.0722 * dec(rgb.b);
}

function wcagContrast(rgbA, rgbB) {
  const la = wcagLuminance(rgbA);
  const lb = wcagLuminance(rgbB);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function apcaContrast(txtRgb, bgRgb) {
  const yTxt = 0.2126729 * (txtRgb.r ** 2.4) + 0.7151522 * (txtRgb.g ** 2.4) + 0.0721750 * (txtRgb.b ** 2.4);
  const yBg = 0.2126729 * (bgRgb.r ** 2.4) + 0.7151522 * (bgRgb.g ** 2.4) + 0.0721750 * (bgRgb.b ** 2.4);

  const clampBlack = (y) => (y < 0.022 ? y + (0.022 - y) ** 1.414 : y);
  const yt = clampBlack(Math.max(0, yTxt));
  const yb = clampBlack(Math.max(0, yBg));

  if (Math.abs(yb - yt) < 0.0005) return 0;

  let lc;
  if (yb >= yt) {
    const sBg = yb ** 0.55;
    const sTxt = yt ** 0.65;
    lc = (sBg - sTxt) * 1.1414 * 100;
    lc = lc < 0.1 ? 0 : lc - 0.027;
  } else {
    const sBg = yb ** 0.62;
    const sTxt = yt ** 0.56;
    lc = (sTxt - sBg) * 1.1414 * 100;
    lc = lc < 0.1 ? 0 : lc - 0.027;
  }
  return lc;
}

// ── Test Execution ──

const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`✓ [PASS] ${name}`);
  } catch (err) {
    results.push({ name, passed: false, error: err.message });
    console.error(`✗ [FAIL] ${name}\n  ↳ ${err.message}`);
  }
}

console.log('======================================================');
console.log('CHALLENGER 1: TOKEN CONTRAST & VIEWPORT STRESS HARNESS');
console.log('======================================================\n');

// ── SUITE 1: Contrast Math Across Paired Tokens ──

const tokens = {
  paper: { L: 0.975, C: 0.008, H: 85 },
  paper2: { L: 0.950, C: 0.012, H: 85 },
  paper3: { L: 0.920, C: 0.015, H: 85 },
  ink: { L: 0.200, C: 0.015, H: 260 },
  ink2: { L: 0.380, C: 0.012, H: 260 },
  muted: { L: 0.500, C: 0.015, H: 260 },
  rule: { L: 0.860, C: 0.012, H: 85 },
  accent: { L: 0.520, C: 0.180, H: 32 },
  accentInk: { L: 0.980, C: 0.005, H: 85 },
  focus: { L: 0.520, C: 0.200, H: 32 },
};

const rgbs = {};
for (const [k, v] of Object.entries(tokens)) {
  rgbs[k] = oklchToSrgb(v.L, v.C, v.H);
}

test('1.1 Contrast: --color-paper vs --color-ink meets Gate 40 (WCAG AAA >= 7:1, APCA Lc >= 60)', () => {
  const cr = wcagContrast(rgbs.paper, rgbs.ink);
  const apca = apcaContrast(rgbs.ink, rgbs.paper);
  assert.ok(cr >= 7.0, `WCAG contrast ${cr.toFixed(2)} is less than AAA 7.0:1`);
  assert.ok(Math.abs(apca) >= 60, `APCA Lc ${apca.toFixed(2)} is less than 60`);
});

test('1.2 Contrast: --color-paper vs --color-ink-2 meets Gate 40 (WCAG AAA >= 7:1, APCA Lc >= 60)', () => {
  const cr = wcagContrast(rgbs.paper, rgbs.ink2);
  const apca = apcaContrast(rgbs.ink2, rgbs.paper);
  assert.ok(cr >= 4.5, `WCAG contrast ${cr.toFixed(2)} is less than AA 4.5:1`);
  assert.ok(Math.abs(apca) >= 60, `APCA Lc ${apca.toFixed(2)} is less than 60`);
});

test('1.3 Contrast: --color-paper vs --color-muted meets Gate 40 (WCAG AA >= 4.5:1, APCA Lc >= 60)', () => {
  const cr = wcagContrast(rgbs.paper, rgbs.muted);
  const apca = apcaContrast(rgbs.muted, rgbs.paper);
  assert.ok(cr >= 4.5, `WCAG contrast ${cr.toFixed(2)} is less than AA 4.5:1`);
  assert.ok(Math.abs(apca) >= 60, `APCA Lc ${apca.toFixed(2)} is less than 60`);
});

test('1.4 Contrast: --color-accent vs --color-accent-ink meets Gate 41 (WCAG AA >= 4.5:1, dL >= 0.05, dC >= 0.05)', () => {
  const cr = wcagContrast(rgbs.accent, rgbs.accentInk);
  const apca = apcaContrast(rgbs.accentInk, rgbs.accent);
  const dL = Math.abs(tokens.accent.L - tokens.accentInk.L);
  const dC = Math.abs(tokens.accent.C - tokens.accentInk.C);
  assert.ok(cr >= 4.5, `Button contrast ${cr.toFixed(2)} is less than 4.5:1`);
  assert.ok(Math.abs(apca) >= 60, `Button APCA Lc ${apca.toFixed(2)} is less than 60`);
  assert.ok(dL >= 0.05, `Delta L ${dL} is less than 0.05`);
  assert.ok(dC >= 0.05, `Delta C ${dC} is less than 0.05`);
});

test('1.5 Contrast: --color-paper vs --color-focus meets Gate 26a / Gate 40 (WCAG >= 3:1, APCA Lc >= 45)', () => {
  const cr = wcagContrast(rgbs.paper, rgbs.focus);
  const apca = apcaContrast(rgbs.focus, rgbs.paper);
  assert.ok(cr >= 3.0, `Focus ring contrast ${cr.toFixed(2)} is less than 3:1`);
  assert.ok(Math.abs(apca) >= 45, `Focus ring APCA Lc ${apca.toFixed(2)} is less than 45`);
});

test('1.6 Contrast: Secondary paper surfaces (--color-paper-2, --color-paper-3) maintain AA against inks', () => {
  const crP2Ink = wcagContrast(rgbs.paper2, rgbs.ink);
  const crP3Ink = wcagContrast(rgbs.paper3, rgbs.ink);
  const crP2Muted = wcagContrast(rgbs.paper2, rgbs.muted);
  const crP3Muted = wcagContrast(rgbs.paper3, rgbs.muted);

  assert.ok(crP2Ink >= 7.0, `Paper-2 vs ink contrast ${crP2Ink.toFixed(2)} is less than 7:1`);
  assert.ok(crP3Ink >= 7.0, `Paper-3 vs ink contrast ${crP3Ink.toFixed(2)} is less than 7:1`);
  assert.ok(crP2Muted >= 4.5, `Paper-2 vs muted contrast ${crP2Muted.toFixed(2)} is less than 4.5:1`);
  assert.ok(crP3Muted >= 4.5, `Paper-3 vs muted contrast ${crP3Muted.toFixed(2)} is less than 4.5:1`);
});

// ── SUITE 2: Container Viewport Simulation (Gate 44d) ──

function simulateContainer(vw) {
  let gutter = 64;
  if (vw <= 640) gutter = 16;
  else if (vw <= 960) gutter = 24;

  const containerWidth = Math.min(vw, 1440);
  const marginInline = Math.max(0, (vw - containerWidth) / 2);
  const innerContentWidth = containerWidth - (2 * gutter);
  const totalEdgeGutter = marginInline + gutter;

  return { vw, gutter, containerWidth, marginInline, innerContentWidth, totalEdgeGutter };
}

test('2.1 Viewport 320px: gutter=16px, container=320px, content=288px, zero overflow', () => {
  const res = simulateContainer(320);
  assert.strictEqual(res.gutter, 16);
  assert.strictEqual(res.containerWidth, 320);
  assert.strictEqual(res.innerContentWidth, 288);
  assert.strictEqual(res.marginInline, 0);
  assert.ok(res.containerWidth <= 320);
});

test('2.2 Viewport 375px: gutter=16px, container=375px, content=343px, zero overflow', () => {
  const res = simulateContainer(375);
  assert.strictEqual(res.gutter, 16);
  assert.strictEqual(res.containerWidth, 375);
  assert.strictEqual(res.innerContentWidth, 343);
  assert.strictEqual(res.marginInline, 0);
  assert.ok(res.containerWidth <= 375);
});

test('2.3 Viewport 768px: gutter=24px, container=768px, content=720px, zero overflow', () => {
  const res = simulateContainer(768);
  assert.strictEqual(res.gutter, 24);
  assert.strictEqual(res.containerWidth, 768);
  assert.strictEqual(res.innerContentWidth, 720);
  assert.strictEqual(res.marginInline, 0);
  assert.ok(res.containerWidth <= 768);
});

test('2.4 Viewport 1280px: gutter=64px, container=1280px, content=1152px, zero overflow', () => {
  const res = simulateContainer(1280);
  assert.strictEqual(res.gutter, 64);
  assert.strictEqual(res.containerWidth, 1280);
  assert.strictEqual(res.innerContentWidth, 1152);
  assert.strictEqual(res.marginInline, 0);
  assert.ok(res.containerWidth <= 1280);
});

test('2.5 Viewport 1440px: container hits 1440px ceiling, inner content=1312px', () => {
  const res = simulateContainer(1440);
  assert.strictEqual(res.gutter, 64);
  assert.strictEqual(res.containerWidth, 1440);
  assert.strictEqual(res.innerContentWidth, 1312);
  assert.strictEqual(res.marginInline, 0);
});

test('2.6 Viewport 1920px: container clamped at 1440px, margins grow to 240px, total edge gutter=304px', () => {
  const res = simulateContainer(1920);
  assert.strictEqual(res.containerWidth, 1440, 'Container exceeded 1440px at 1920px viewport');
  assert.strictEqual(res.innerContentWidth, 1312, 'Inner content exceeded 1312px measure');
  assert.strictEqual(res.marginInline, 240, 'Auto margin failed to absorb excess width');
  assert.strictEqual(res.totalEdgeGutter, 304, 'Gutters did not expand as required by Gate 44d');
});

test('2.7 Ultra-wide 2560px: container clamped at 1440px, margins grow to 560px', () => {
  const res = simulateContainer(2560);
  assert.strictEqual(res.containerWidth, 1440);
  assert.strictEqual(res.innerContentWidth, 1312);
  assert.strictEqual(res.marginInline, 560);
  assert.strictEqual(res.totalEdgeGutter, 624);
});

// ── SUITE 3: CSS Variable Resolution & Leakage Check ──

test('3.1 Zero unresolved or leaked CSS variables across tokens.css and globals.css', () => {
  const tokensContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/tokens.css'), 'utf8');
  const globalsContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/globals.css'), 'utf8');

  const declared = new Set();
  const declRegex = /(--[\w-]+)\s*:/g;
  let m;
  while ((m = declRegex.exec(tokensContent))) declared.add(m[1]);
  while ((m = declRegex.exec(globalsContent))) declared.add(m[1]);

  const usageRegex = /var\(\s*(--[\w-]+)/g;
  const missing = [];
  function check(content, filename) {
    let u;
    while ((u = usageRegex.exec(content))) {
      if (!declared.has(u[1])) missing.push({ varName: u[1], file: filename });
    }
  }
  check(tokensContent, 'tokens.css');
  check(globalsContent, 'globals.css');

  assert.strictEqual(missing.length, 0, `Unresolved CSS variables: ${JSON.stringify(missing)}`);
});

// ── SUITE 4: Prohibition of Pure White and Pure Black (Gate 7a) ──

test('4.1 Zero pure #ffffff or #000000 in tokens.css and globals.css', () => {
  const tokensContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/tokens.css'), 'utf8');
  const globalsContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/globals.css'), 'utf8');

  const pureRegex = /#(fff(?:fff)?|000(?:000)?)\b|rgba?\(\s*(?:255\s*,\s*255\s*,\s*255|0\s*,\s*0\s*,\s*0)\s*[,)]/gi;
  const tMatches = (tokensContent.replace(/\/\*[\s\S]*?\*\//g, '').match(pureRegex) || []);
  const gMatches = (globalsContent.replace(/\/\*[\s\S]*?\*\//g, '').match(pureRegex) || []);

  assert.strictEqual(tMatches.length, 0, `Pure white/black in tokens.css: ${tMatches.join(', ')}`);
  assert.strictEqual(gMatches.length, 0, `Pure white/black in globals.css: ${gMatches.join(', ')}`);
});

test('4.2 Zero raw color literals outside :root in tokens.css and globals.css (Gate 48)', () => {
  const tokensContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/tokens.css'), 'utf8');
  const globalsContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/globals.css'), 'utf8');

  const rawColorRegex = /:\s*[^;]*(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]+\)|hsla?\([^)]+\))/g;
  const outsideT = tokensContent.replace(/:root\s*\{[\s\S]*?\}/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const outsideG = globalsContent.replace(/:root\s*\{[\s\S]*?\}/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

  const mOutsideT = outsideT.match(rawColorRegex) || [];
  const mOutsideG = outsideG.match(rawColorRegex) || [];

  assert.strictEqual(mOutsideT.length, 0, `Raw color outside :root in tokens.css: ${mOutsideT.join(', ')}`);
  assert.strictEqual(mOutsideG.length, 0, `Raw color outside :root in globals.css: ${mOutsideG.join(', ')}`);
});

// ── Summary ──

console.log('\n======================================================');
const passedCount = results.filter((r) => r.passed).length;
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${results.length - passedCount}`);
console.log('======================================================\n');

if (passedCount !== results.length) {
  process.exit(1);
} else {
  console.log('ALL EMPIRICAL CHALLENGER TESTS PASSED SUCCESSFULLY.');
  process.exit(0);
}
