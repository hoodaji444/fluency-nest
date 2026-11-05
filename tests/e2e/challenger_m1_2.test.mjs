import assert from 'node:assert/strict';
import path from 'node:path';
import {
  TestSuite,
  readFile,
  findFiles,
  PROJECT_ROOT,
  SRC_DIR
} from './test_helpers.mjs';

const suite = new TestSuite('Challenger M1-2: Adversarial Focus, Motion Collapse, Script Independence & Overflow Clip Invariants');

// Load target files
const tokensCss = readFile('src/app/tokens.css');
const globalsCss = readFile('src/app/globals.css');
const layoutTsx = readFile('src/app/layout.tsx');

// ============================================================================
// HELPER: Exact OKLCH to Relative Luminance and WCAG Contrast
// ============================================================================
function oklchToLinearSrgb(L, C, H) {
  const rad = (H * Math.PI) / 180;
  const a = C * Math.cos(rad);
  const b = C * Math.sin(rad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const r = +4.0767434036 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b_col = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [Math.max(0, Math.min(1, r)), Math.max(0, Math.min(1, g)), Math.max(0, Math.min(1, b_col))];
}

function linearToLuminance([r, g, b]) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateWcagContrast(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseOklchValues(cssContent, tokenName) {
  const regex = new RegExp(`${tokenName}:\\s*oklch\\(\\s*([\\d.]+)%?\\s+([\\d.]+)\\s+([\\d.]+)\\s*\\)`, 'i');
  const match = cssContent.match(regex);
  if (!match) throw new Error(`Token ${tokenName} not found or not in OKLCH format`);
  let L = parseFloat(match[1]);
  if (match[1].endsWith('%') || L > 1.0) L = L / 100;
  const C = parseFloat(match[2]);
  const H = parseFloat(match[3]);
  return { L, C, H };
}

// ============================================================================
// SUITE 1: FOCUS-VISIBLE BEHAVIOR & INSTANT APPEARANCE (Gates 15, 26a, 39a)
// ============================================================================

suite.test('1.1 globals.css declares :focus-visible outline as strictly 2px solid var(--color-focus)', () => {
  const focusVisibleBlock = globalsCss.match(/:focus-visible\s*\{([^}]+)\}/);
  assert.ok(focusVisibleBlock, ':focus-visible block must exist in globals.css');
  const declarations = focusVisibleBlock[1];
  assert.match(declarations, /outline:\s*2px\s+solid\s+var\(--color-focus\)/, 'outline must be 2px solid var(--color-focus)');
});

suite.test('1.2 globals.css declares :focus-visible outline-offset as strictly 2px', () => {
  const focusVisibleBlock = globalsCss.match(/:focus-visible\s*\{([^}]+)\}/);
  assert.ok(focusVisibleBlock, ':focus-visible block must exist');
  const declarations = focusVisibleBlock[1];
  assert.match(declarations, /outline-offset:\s*2px/, 'outline-offset must be 2px');
});

suite.test('1.3 tokens.css defines --color-focus in OKLCH space with adequate lightness and chroma', () => {
  const focusToken = parseOklchValues(tokensCss, '--color-focus');
  assert.ok(focusToken, '--color-focus must be declared in OKLCH');
  assert.ok(focusToken.L > 0.4 && focusToken.L < 0.6, `--color-focus lightness ${focusToken.L} should be in mid-tone range for high contrast`);
  assert.ok(focusToken.C >= 0.15, `--color-focus chroma ${focusToken.C} must be distinct`);
});

suite.test('1.4 Mathematical contrast of --color-focus vs --color-paper is strictly >= 3:1 (actual > 5.0:1)', () => {
  const focus = parseOklchValues(tokensCss, '--color-focus');
  const paper = parseOklchValues(tokensCss, '--color-paper');
  const focusLum = linearToLuminance(oklchToLinearSrgb(focus.L, focus.C, focus.H));
  const paperLum = linearToLuminance(oklchToLinearSrgb(paper.L, paper.C, paper.H));
  const ratio = calculateWcagContrast(focusLum, paperLum);
  assert.ok(ratio >= 3.0, `Contrast ratio ${ratio.toFixed(2)}:1 must be >= 3:1`);
  assert.ok(ratio >= 5.0, `Contrast ratio ${ratio.toFixed(2)}:1 against limewash parchment should exceed 5:1`);
});

suite.test('1.5 Mathematical contrast of --color-focus vs secondary paper surfaces is strictly >= 3:1', () => {
  const focus = parseOklchValues(tokensCss, '--color-focus');
  const focusLum = linearToLuminance(oklchToLinearSrgb(focus.L, focus.C, focus.H));

  const surfaces = ['--color-paper-2', '--color-paper-3', '--color-card'];
  for (const surfaceName of surfaces) {
    const surf = parseOklchValues(tokensCss, surfaceName);
    const surfLum = linearToLuminance(oklchToLinearSrgb(surf.L, surf.C, surf.H));
    const ratio = calculateWcagContrast(focusLum, surfLum);
    assert.ok(ratio >= 3.0, `Contrast ratio of focus vs ${surfaceName} is ${ratio.toFixed(2)}:1, must be >= 3:1`);
  }
});

suite.test('1.6 Zero transitions animate outline or outline properties in globals.css and tokens.css', () => {
  const css = tokensCss + '\n' + globalsCss;
  const transitionMatches = css.match(/transition[^;]+;/g) || [];
  for (const trans of transitionMatches) {
    assert.doesNotMatch(trans, /\boutline\b/i, `Forbidden outline transition found: ${trans}`);
    assert.doesNotMatch(trans, /\boutline-color\b/i, `Forbidden outline-color transition found: ${trans}`);
    assert.doesNotMatch(trans, /\boutline-width\b/i, `Forbidden outline-width transition found: ${trans}`);
    assert.doesNotMatch(trans, /\boutline-offset\b/i, `Forbidden outline-offset transition found: ${trans}`);
  }
});

suite.test('1.7 Focus rings appear with 0ms latency (instant appearance, no opacity transitions on focus)', () => {
  const focusBlocks = globalsCss.match(/[^}]*focus[^}]*\{[^}]*\}/gi) || [];
  for (const block of focusBlocks) {
    assert.doesNotMatch(block, /transition:\s*opacity/i, `Forbidden opacity transition in focus block: ${block}`);
    assert.doesNotMatch(block, /animation:/i, `Forbidden animation in focus block: ${block}`);
  }
});

suite.test('1.8 Form inputs retain 2px solid outline on focus-visible', () => {
  const formFocusBlock = globalsCss.match(/\.form-input:focus-visible[^{]*\{([^}]+)\}/);
  assert.ok(formFocusBlock, '.form-input:focus-visible block must exist in globals.css');
  const decl = formFocusBlock[1];
  assert.match(decl, /outline:\s*2px\s+solid\s+var\(--color-focus\)/, 'form input outline must be 2px solid var(--color-focus)');
});

suite.test('1.9 Zero unauthorized outline: none in globals.css and tokens.css', () => {
  assert.doesNotMatch(globalsCss, /outline:\s*none\b(?!\s*!important)/i, 'globals.css must not have outline: none');
  assert.doesNotMatch(globalsCss, /outline:\s*0\b/i, 'globals.css must not have outline: 0');
  assert.doesNotMatch(tokensCss, /outline:\s*none\b/i, 'tokens.css must not have outline: none');
});

// ============================================================================
// SUITE 2: MOTION REDUCTION COLLAPSE (Gate 27)
// ============================================================================

suite.test('2.1 globals.css declares @media (prefers-reduced-motion: reduce)', () => {
  assert.match(globalsCss, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/, 'prefers-reduced-motion media query must exist');
});

suite.test('2.2 Reduced motion block targets universal selector *:not(.keep-motion) and pseudo-elements', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mediaBlock, 'prefers-reduced-motion block must be extractable');
  const content = mediaBlock[1];
  assert.match(content, /\*:not\(\.keep-motion\)/, 'must target *:not(.keep-motion)');
  assert.match(content, /\*:not\(\.keep-motion\)::before/, 'must target ::before');
  assert.match(content, /\*:not\(\.keep-motion\)::after/, 'must target ::after');
});

suite.test('2.3 Reduced motion block collapses animation-duration to 0.01ms !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /animation-duration:\s*0\.01ms\s*!important/, 'animation-duration must collapse to 0.01ms !important');
});

suite.test('2.4 Reduced motion block restricts animation-iteration-count to 1 !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /animation-iteration-count:\s*1\s*!important/, 'animation-iteration-count must be 1 !important');
});

suite.test('2.5 Reduced motion block collapses transition-duration to 0.01ms !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /transition-duration:\s*0\.01ms\s*!important/, 'transition-duration must collapse to 0.01ms !important');
});

suite.test('2.6 Reduced motion block enforces scroll-behavior: auto !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /scroll-behavior:\s*auto\s*!important/, 'scroll-behavior must be auto !important');
});

suite.test('2.7 Reduced motion block preserves .reveal visibility with !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /\.reveal\s*\{[^}]*opacity:\s*1\s*!important/s, '.reveal must have opacity: 1 !important');
  assert.match(content, /\.reveal\s*\{[^}]*transform:\s*none\s*!important/s, '.reveal must have transform: none !important');
});

// ============================================================================
// SUITE 3: CONTENT VISIBILITY AT REST & SCRIPT INDEPENDENCE (Gate 62)
// ============================================================================

suite.test('3.1 globals.css declares .reveal with opacity: 1 at rest', () => {
  const revealMatch = globalsCss.match(/\.reveal\s*\{([^}]+)\}/);
  assert.ok(revealMatch, '.reveal class definition must exist');
  assert.match(revealMatch[1], /opacity:\s*1\b/, '.reveal must have opacity: 1 at rest');
});

suite.test('3.2 globals.css declares .reveal with transform: none at rest', () => {
  const revealMatch = globalsCss.match(/\.reveal\s*\{([^}]+)\}/);
  assert.ok(revealMatch, '.reveal class definition must exist');
  assert.match(revealMatch[1], /transform:\s*none\b/, '.reveal must have transform: none at rest');
});

suite.test('3.3 Zero declarations of opacity: 0 for .reveal in globals.css or tokens.css', () => {
  assert.doesNotMatch(globalsCss, /\.reveal\b[^{]*\{[^}]*opacity:\s*0\b/s, '.reveal must NEVER be initialized to opacity: 0');
  assert.doesNotMatch(tokensCss, /\.reveal\b[^{]*\{[^}]*opacity:\s*0\b/s, 'tokens.css must not hide .reveal');
});

suite.test('3.4 All .reveal-delay-* classes reset transition-delay to 0s at rest', () => {
  const delayBlock = globalsCss.match(/\.reveal-delay-1[^{]*\{([^}]+)\}/);
  assert.ok(delayBlock, '.reveal-delay-* block must exist');
  assert.match(delayBlock[1], /transition-delay:\s*0s/, 'transition-delay must be 0s at rest');
});

suite.test('3.5 Simulated no-JS visibility: no visibility: hidden or display: none on .reveal', () => {
  const revealMatch = globalsCss.match(/\.reveal\s*\{([^}]+)\}/);
  assert.doesNotMatch(revealMatch[1], /visibility:\s*hidden/i, '.reveal must not have visibility: hidden');
  assert.doesNotMatch(revealMatch[1], /display:\s*none/i, '.reveal must not have display: none');
});

// ============================================================================
// SUITE 4: OVERFLOW-X CLIP & POSITION STICKY COMPLIANCE (Gate 34)
// ============================================================================

suite.test('4.1 globals.css declares overflow-x: clip on html, body jointly', () => {
  const overflowMatch = globalsCss.match(/html,\s*body\s*\{([^}]+)\}/);
  assert.ok(overflowMatch, 'html, body block must exist in globals.css');
  assert.match(overflowMatch[1], /overflow-x:\s*clip;/, 'html, body must have overflow-x: clip;');
});

suite.test('4.2 Zero occurrences of overflow-x: hidden in globals.css and tokens.css', () => {
  assert.doesNotMatch(globalsCss, /overflow-x:\s*hidden/i, 'globals.css must NOT use overflow-x: hidden');
  assert.doesNotMatch(tokensCss, /overflow-x:\s*hidden/i, 'tokens.css must NOT use overflow-x: hidden');
});

suite.test('4.3 Zero occurrences of 100vw widths in globals.css and tokens.css', () => {
  assert.doesNotMatch(globalsCss, /width:\s*100vw/i, 'globals.css must NOT use 100vw widths');
  assert.doesNotMatch(tokensCss, /width:\s*100vw/i, 'tokens.css must NOT use 100vw widths');
});

suite.test('4.4 tokens.css declares sticky elevation layer tokens (--z-sticky and --z-sticky-nav)', () => {
  assert.match(tokensCss, /--z-sticky:\s*200;/, '--z-sticky token must be defined');
  assert.match(tokensCss, /--z-sticky-nav:\s*300;/, '--z-sticky-nav token must be defined with higher priority');
});

suite.test('4.5 Container element encapsulates max-width: var(--container) with margin-inline: auto', () => {
  const containerMatch = globalsCss.match(/\.container\s*\{([^}]+)\}/);
  assert.ok(containerMatch, '.container rule must exist in globals.css');
  const decl = containerMatch[1];
  assert.match(decl, /max-width:\s*var\(--container\)/, '.container must cap at var(--container)');
  assert.match(decl, /margin-inline:\s*auto/, '.container must center with margin-inline: auto');
  assert.match(decl, /padding-inline:\s*var\(--gutter\)/, '.container must apply var(--gutter) padding');
});

// Run the suite
const result = await suite.run();
if (result.failed > 0) {
  process.exit(1);
}
