import assert from 'node:assert/strict';
import {
  TestSuite,
  readFile
} from './test_helpers.mjs';

const suite = new TestSuite('Challenger M1-2: Stress Testing Adversarial Corner Cases');

const tokensCss = readFile('src/app/tokens.css');
const globalsCss = readFile('src/app/globals.css');
const layoutTsx = readFile('src/app/layout.tsx');

// ============================================================================
// STRESS TEST 1: FOCUS-VISIBLE SPECIFICITY AND CASCADE STRESS
// ============================================================================

suite.test('S1.1 :focus-visible rule has global root priority and applies to all interactive native tags', () => {
  // Ensure :focus-visible is NOT constrained to a specific sub-class (e.g. only .btn)
  const matches = globalsCss.match(/(^|\n):focus-visible\s*\{/g);
  assert.ok(matches && matches.length >= 1, ':focus-visible must be defined as an unconstrained pseudo-class');
});

suite.test('S1.2 Form controls :focus-visible rules cascade and reinforce 2px outline width', () => {
  const formMatch = globalsCss.match(/\.form-input:focus-visible,\s*\.form-select:focus-visible,\s*\.form-textarea:focus-visible\s*\{([^}]+)\}/);
  assert.ok(formMatch, 'Form focus-visible compound selector must exist');
  const decls = formMatch[1];
  assert.match(decls, /outline:\s*2px\s+solid\s+var\(--color-focus\)/, 'outline width must remain strictly 2px');
  assert.match(decls, /border-color:\s*var\(--color-focus\)/, 'border-color must align with focus color');
});

suite.test('S1.3 Buttons on active state do not destroy focus outline', () => {
  const activeMatch = globalsCss.match(/button:active,\s*\.btn:active\s*\{([^}]+)\}/);
  assert.ok(activeMatch, 'Button active rule must exist');
  assert.doesNotMatch(activeMatch[1], /outline:\s*none/, 'Button active state must NOT remove outline');
  assert.doesNotMatch(activeMatch[1], /outline:\s*0/, 'Button active state must NOT set outline: 0');
});

// ============================================================================
// STRESS TEST 2: REDUCED MOTION EXTREME CONDITIONS
// ============================================================================

suite.test('S2.1 Reduced motion media query uses 0.01ms non-zero duration to preserve JS transitionend events', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mediaBlock, 'Reduced motion block must exist');
  const content = mediaBlock[1];
  // 0.01ms is strictly better than 0s because 0s suppresses transitionend/animationend lifecycle events in DOM
  assert.match(content, /transition-duration:\s*0\.01ms\s*!important/, 'Must use 0.01ms duration');
  assert.match(content, /animation-duration:\s*0\.01ms\s*!important/, 'Must use 0.01ms duration');
});

suite.test('S2.2 Reduced motion media query overrides both element and pseudo-elements with !important', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.ok(content.includes('*:not(.keep-motion)::before'), 'Must include ::before');
  assert.ok(content.includes('*:not(.keep-motion)::after'), 'Must include ::after');
  assert.ok(content.includes('!important'), 'Must use !important for cascade suppression');
});

suite.test('S2.3 Escape hatch class .keep-motion is reserved and properly guarded in selector', () => {
  const mediaBlock = globalsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/);
  const content = mediaBlock[1];
  assert.match(content, /:not\(\.keep-motion\)/, 'Must provide .keep-motion escape hatch');
});

// ============================================================================
// STRESS TEST 3: SCRIPT INDEPENDENCE & SSR/SSG INTEGRITY
// ============================================================================

suite.test('S3.1 .reveal elements are unconditionally visible without depending on .visible class', () => {
  // If JS fails to run (or IntersectionObserver is not supported), .reveal elements must be visible
  const revealBase = globalsCss.match(/\.reveal\s*\{([^}]+)\}/);
  assert.ok(revealBase, 'Base .reveal selector must exist');
  assert.match(revealBase[1], /opacity:\s*1/, 'Base .reveal must be opacity: 1');
  assert.match(revealBase[1], /transform:\s*none/, 'Base .reveal must be transform: none');
});

suite.test('S3.2 .reveal.visible state maintains identical visibility (no flicker on hydration)', () => {
  const revealVisible = globalsCss.match(/\.reveal\.visible\s*\{([^}]+)\}/);
  assert.ok(revealVisible, '.reveal.visible must exist');
  assert.match(revealVisible[1], /opacity:\s*1/, '.reveal.visible must be opacity: 1');
  assert.match(revealVisible[1], /transform:\s*none/, '.reveal.visible must be transform: none');
});

suite.test('S3.3 Layout.tsx includes font stylesheets in head ahead of hydration to prevent layout shift', () => {
  assert.match(layoutTsx, /<link[^>]+api\.fontshare\.com/i, 'Fontshare stylesheet must be in <head>');
  assert.match(layoutTsx, /<link[^>]+fonts\.googleapis\.com/i, 'Google Fonts stylesheet must be in <head>');
});

// ============================================================================
// STRESS TEST 4: OVERFLOW CLIP & STICKY POSITIONING INVARIANTS
// ============================================================================

suite.test('S4.1 html and body simultaneously enforce overflow-x: clip (preventing dual-axis scrolling bugs)', () => {
  const match = globalsCss.match(/html,\s*body\s*\{([^}]+)\}/);
  assert.ok(match, 'Joint html, body block must exist');
  assert.match(match[1], /overflow-x:\s*clip;/, 'Must specify overflow-x: clip;');
});

suite.test('S4.2 Exactly one overflow-x rule exists in globals.css, strictly enforcing clip', () => {
  const overflowXMatches = globalsCss.match(/overflow-x:[^;]+;/g) || [];
  assert.equal(overflowXMatches.length, 1, `Expected exactly 1 overflow-x rule, found ${overflowXMatches.length}`);
  assert.equal(overflowXMatches[0].trim(), 'overflow-x: clip;', 'The single overflow-x rule must be overflow-x: clip;');
});

suite.test('S4.3 Z-index hierarchy preserves sticky positioning order (sticky-nav above sticky)', () => {
  const stickyMatch = tokensCss.match(/--z-sticky:\s*(\d+);/);
  const navMatch = tokensCss.match(/--z-sticky-nav:\s*(\d+);/);
  const modalMatch = tokensCss.match(/--z-modal:\s*(\d+);/);
  assert.ok(stickyMatch && navMatch && modalMatch, 'All layer elevation tokens must exist');
  const sticky = parseInt(stickyMatch[1], 10);
  const nav = parseInt(navMatch[1], 10);
  const modal = parseInt(modalMatch[1], 10);
  assert.ok(nav > sticky, `--z-sticky-nav (${nav}) must be greater than --z-sticky (${sticky})`);
  assert.ok(modal > nav, `--z-modal (${modal}) must be greater than --z-sticky-nav (${nav})`);
});

// Run stress suite
const res = await suite.run();
if (res.failed > 0) {
  process.exit(1);
}
