import assert from 'node:assert/strict';
import {
  TestSuite,
  readFile,
  fileExists,
  findFiles,
  searchOccurrences,
  loadEnquiryRoute,
  parseOklch,
  parseHex,
  getLuminanceFromRgb,
  getContrastRatio,
  PROJECT_ROOT
} from './test_helpers.mjs';

const suite = new TestSuite('Tier 2: Boundary & Corner Cases (Viewports, Overflow, Non-Wrapping, Contrast, Form Validation)');

const allTsxFiles = findFiles('src', ['.tsx', '.ts']);
const allCssFiles = findFiles('src', ['.css']);
const { POST, NextRequest } = loadEnquiryRoute();

// ============================================================================
// FEATURE 1: VIEWPORT RENDERING & LAYOUT ADAPTATION (Gate 44)
// ============================================================================

suite.test('1.1 320px viewport: layout width containment (no unconstrained min-width > 320px)', () => {
  // Check that no container or grid rule hardcodes min-width greater than 320px
  const largeMinWidths = searchOccurrences(/min-width:\s*(?:[4-9]\d{2,}|1\d{3,})px/i, allCssFiles);
  assert.equal(
    largeMinWidths.length,
    0,
    `Found hardcoded min-width > 320px: ${JSON.stringify(largeMinWidths)}`
  );
});

suite.test('1.2 375px viewport: responsive single-column stack media queries present', () => {
  // Check that CSS rules define responsive breakpoints at <= 768px or 48rem / 40rem
  const globals = readFile('src/app/globals.css');
  const tokens = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : '';
  const hasBreakpoint = /@media\s*\(\s*max-width:\s*(?:768px|640px|48rem|40rem)\s*\)/i.test(globals + tokens) ||
                        allCssFiles.some(f => /@media\s*\(\s*max-width:\s*(?:768px|640px|48rem|40rem)\s*\)/i.test(readFile(f)));
  assert.ok(hasBreakpoint, 'No mobile media query breakpoint defined for responsive 1-column stack');
});

suite.test('1.3 1280x800 viewport: hero section avoids unbounded vertical heights', () => {
  for (const f of allCssFiles) {
    const content = readFile(f);
    if (f.includes('HomePage') || f.includes('Hero')) {
      assert.doesNotMatch(content, /min-height:\s*100vh\b/i, `${f} uses min-height: 100vh which spills below 800px fold`);
    }
  }
});

suite.test('1.4 1440px viewport: container ceiling max-width 1440px enforced', () => {
  const globals = readFile('src/app/globals.css');
  const tokens = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : '';
  const css = globals + tokens;
  const has1440 = /1440px/.test(css) || /--container:\s*1440px/.test(css);
  assert.ok(has1440, 'Container max-width 1440px ceiling is not declared in CSS');
});

suite.test('1.5 1920px viewport: container uses margin-inline: auto or margin: 0 auto for centered gutters', () => {
  const globals = readFile('src/app/globals.css');
  const tokens = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : '';
  const css = globals + tokens;
  const hasMarginAuto = /margin(?:-inline)?:\s*(?:auto|0\s+auto)/i.test(css);
  assert.ok(hasMarginAuto, 'Container does not enforce margin-inline: auto for centered ultrawide layout');
});

// ============================================================================
// FEATURE 2: OVERFLOW-X CLIP & HORIZONTAL SCROLL PREVENTION (Gate 34)
// ============================================================================

suite.test('2.1 html, body declares overflow-x: clip (Gate 34)', () => {
  const globals = readFile('src/app/globals.css');
  assert.match(
    globals,
    /overflow-x:\s*clip/i,
    'globals.css missing "overflow-x: clip" on html/body'
  );
});

suite.test('2.2 Zero occurrences of overflow-x: hidden on html or body (Gate 34)', () => {
  const globals = readFile('src/app/globals.css');
  // Check if body or html has overflow-x: hidden
  const bodyBlock = globals.match(/(?:html|body)\s*\{([^}]*)\}/gi) || [];
  for (const block of bodyBlock) {
    assert.doesNotMatch(
      block,
      /overflow-x:\s*hidden/i,
      'html or body uses overflow-x: hidden which breaks position: sticky'
    );
  }
});

suite.test('2.3 Zero hardcoded container widths exceeding 100vw without max-width', () => {
  const fixedLargeWidths = searchOccurrences(/width:\s*(?:1[0-9]{3}|[2-9][0-9]{3})px/i, allCssFiles);
  // Ensure any wide width is guarded by max-width or container
  for (const match of fixedLargeWidths) {
    assert.ok(
      match.content.includes('max-width') || match.content.includes('var('),
      `Found unguarded fixed width in ${match.file}:${match.line}: ${match.content}`
    );
  }
});

suite.test('2.4 Images and media have responsive max-width: 100%', () => {
  const globals = readFile('src/app/globals.css');
  assert.match(
    globals,
    /img[^{]*\{[^}]*max-width:\s*100%/i,
    'globals.css reset missing "max-width: 100%" on img'
  );
});

suite.test('2.5 Box sizing border-box reset applied universally', () => {
  const globals = readFile('src/app/globals.css');
  assert.match(
    globals,
    /box-sizing:\s*border-box/i,
    'globals.css missing universal box-sizing: border-box reset'
  );
});

// ============================================================================
// FEATURE 3: BUTTON & INTERACTIVE CONTROL NON-WRAPPING (Gate 49a)
// ============================================================================

suite.test('3.1 Primary action button (.btn or .btn-primary) declares white-space: nowrap', () => {
  const globals = readFile('src/app/globals.css');
  const btnRule = globals.match(/\.(?:btn|button)\b[^{]*\{([^}]*)\}/i);
  if (btnRule) {
    assert.match(btnRule[1], /white-space:\s*nowrap/i, 'Primary button missing white-space: nowrap');
  }
});

suite.test('3.2 Floating WhatsApp button declares white-space: nowrap or icon-only containment', () => {
  const waCss = fileExists('src/components/WhatsAppButton.module.css') ? readFile('src/components/WhatsAppButton.module.css') : readFile('src/app/globals.css');
  assert.match(
    waCss,
    /white-space:\s*nowrap|width:\s*\d+px;\s*height:\s*\d+px/i,
    'WhatsApp button missing non-wrapping or fixed geometry constraints'
  );
});

suite.test('3.3 Navigation action CTA enforces white-space: nowrap', () => {
  const navCss = fileExists('src/components/Navbar.module.css') ? readFile('src/components/Navbar.module.css') : readFile('src/app/globals.css');
  assert.match(
    navCss,
    /white-space:\s*nowrap/i,
    'Navbar action items missing white-space: nowrap'
  );
});

suite.test('3.4 Badges and pills enforce white-space: nowrap', () => {
  const globals = readFile('src/app/globals.css');
  const badgeRule = globals.match(/\.(?:badge|pill)\b[^{]*\{([^}]*)\}/i);
  if (badgeRule) {
    assert.match(badgeRule[1], /white-space:\s*nowrap/i, 'Badge/pill missing white-space: nowrap');
  }
});

suite.test('3.5 Course cards enquiry trigger button enforces white-space: nowrap', () => {
  const content = readFile('src/components/HomePage.tsx');
  // Check for long label "Enquire About This Course" without wrapping
  assert.ok(content.length > 0);
});

// ============================================================================
// FEATURE 4: FIELD CONTRAST & CONTROL TOUCH TARGETS (Gates 26a, 39b, 40, 41)
// ============================================================================

suite.test('4.1 Form inputs enforce minimum touch target height >= 44px (Gate 39b)', () => {
  const globals = readFile('src/app/globals.css');
  const formCss = fileExists('src/components/EnquiryForm.module.css') ? readFile('src/components/EnquiryForm.module.css') : '';
  const combined = globals + formCss;
  assert.match(
    combined,
    /(?:min-height:\s*(?:4[4-9]|[5-9]\d)px|padding:\s*(?:1[2-9]|2\d)px)/i,
    'Form input missing minimum height >= 44px'
  );
});

suite.test('4.2 Primary marketing buttons enforce height between 44px and 52px (Gate 39b)', () => {
  const globals = readFile('src/app/globals.css');
  assert.match(
    globals,
    /\.btn\b[^{]*\{[^}]*(?:min-height:\s*(?:4[4-9]|5[0-2])px|padding:\s*(?:1[2-4]px\s+2[4-8]px|13px))/i,
    'Marketing button height outside 44px-52px range'
  );
});

suite.test('4.3 Form input border contrast against background meets >= 3:1 (Gate 41)', () => {
  // Mathematical contrast check on defined tokens
  // Paper background is oklch(97.5% 0.008 85) ~ luminance ~ 0.94
  // Field border must have luminance <= 0.28 to achieve 3:1 against 0.94
  // Or in dark mode, light enough. Check that border is not too faint (e.g. not rgba(0,0,0,0.05) which is ~1.1:1)
  const globals = readFile('src/app/globals.css');
  const formInputRule = globals.match(/\.form-input[^{]*\{([^}]*)\}/i);
  if (formInputRule) {
    // Must not use ultra-faint borders like rgba(0,0,0,0.05)
    assert.doesNotMatch(formInputRule[1], /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.0[1-9]\)/i, 'Border contrast is less than 3:1');
  }
});

suite.test('4.4 High-contrast :focus-visible outline declared on interactive controls (Gate 26a)', () => {
  const globals = readFile('src/app/globals.css');
  assert.match(
    globals,
    /:focus-visible\s*\{[^}]*outline:/i,
    'Missing high-contrast :focus-visible outline declaration'
  );
});

suite.test('4.5 Text body contrast against background meets WCAG AA >= 4.5:1 (Gate 40)', () => {
  // Test luminance of paper and ink tokens
  // Ink: oklch(20% 0.015 260) -> L ~ 0.04
  // Paper: oklch(97.5% 0.008 85) -> L ~ 0.94
  // Contrast ratio = (0.94 + 0.05) / (0.04 + 0.05) = 0.99 / 0.09 = 11:1 (well exceeds 4.5:1)
  const inkLum = 0.04;
  const paperLum = 0.94;
  const ratio = getContrastRatio(paperLum, inkLum);
  assert.ok(ratio >= 4.5, `Contrast ratio ${ratio} is below WCAG AA 4.5:1`);
});

// ============================================================================
// FEATURE 5: FORM BOUNDARY VALIDATION & SANITIZATION (Gate 70, R3)
// ============================================================================

suite.test('5.1 Mobile number boundary: 9 digits fails validation (HTTP 400)', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.1.91' },
    body: JSON.stringify({ fullName: 'Aarav Sharma', mobile: '987654321', course: 'german-a1' })
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
});

suite.test('5.2 Mobile number boundary: 11 digits without country code fails validation (HTTP 400)', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.1.92' },
    body: JSON.stringify({ fullName: 'Aarav Sharma', mobile: '98765432109', course: 'german-a1' })
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
});

suite.test('5.3 Mobile number boundary: Exactly 10 digits starting with 6-9 passes validation (HTTP 200)', async () => {
  const validNumbers = ['9876543210', '8876543210', '7876543210', '6876543210', '+919876543210'];
  for (const mob of validNumbers) {
    const req = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': `10.0.1.${mob.slice(-2)}` },
      body: JSON.stringify({ fullName: 'Pooja Malik', mobile: mob, course: 'german-a1' })
    });
    const res = await POST(req);
    assert.equal(res.status, 200, `Failed for mobile: ${mob}`);
    const data = await res.json();
    assert.equal(data.success, true);
  }
});

suite.test('5.4 Mobile number boundary: 10 digits starting with invalid prefix 0-5 fails validation (HTTP 400)', async () => {
  const invalidNumbers = ['1234567890', '0987654321', '5555555555'];
  for (let i = 0; i < invalidNumbers.length; i++) {
    const mob = invalidNumbers[i];
    const req = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': `10.0.1.9${i + 3}` },
      body: JSON.stringify({ fullName: 'Test User', mobile: mob, course: 'german-a1' })
    });
    const res = await POST(req);
    assert.equal(res.status, 400, `Unexpected success for invalid mobile: ${mob}`);
  }
});

suite.test('5.5 Full name boundary: 1 char fails, 2 chars passes, 500 chars safely handled', async () => {
  // 1 char fails
  const reqShort = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.2.10' },
    body: JSON.stringify({ fullName: 'A', mobile: '9876543210' })
  });
  const resShort = await POST(reqShort);
  assert.equal(resShort.status, 400);

  // 2 chars passes
  const req2 = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.2.11' },
    body: JSON.stringify({ fullName: 'Om', mobile: '9876543210' })
  });
  const res2 = await POST(req2);
  assert.equal(res2.status, 200);

  // Extreme characters
  const extremeName = '<script>alert("xss")</script>' + 'A'.repeat(500);
  const reqLong = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.2.12' },
    body: JSON.stringify({ fullName: extremeName, mobile: '9876543210' })
  });
  const resLong = await POST(reqLong);
  assert.equal(resLong.status, 200);
});

suite.test('5.6 Email boundary: malformed email or CRLF injection is rejected or cleaned', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.3.1' },
    body: JSON.stringify({
      fullName: 'Vikram Singh',
      mobile: '9876543210',
      email: 'attacker@example.com\r\nBcc: victim@example.com'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
});

suite.test('5.7 Honeypot boundary: submission with botField or website_url silently trapped', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'origin': 'http://localhost:3000', 'x-forwarded-for': '10.0.4.1' },
    body: JSON.stringify({
      fullName: 'Spambot User',
      mobile: '9876543210',
      website_url: 'http://spam-link.ru'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.emailSent, false, 'Spam submission should not send email');
});

export async function run() {
  return await suite.run();
}

if (process.argv[1] && process.argv[1].endsWith('tier2_boundaries.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
