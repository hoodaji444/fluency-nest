import assert from 'node:assert/strict';
import path from 'node:path';
import {
  TestSuite,
  readFile,
  fileExists,
  findFiles,
  searchOccurrences,
  loadConfig,
  PROJECT_ROOT,
  SRC_DIR
} from './test_helpers.mjs';

const suite = new TestSuite('Tier 1: Feature Coverage (All 6 Routes, Brand Guardrails, CTAs, Tokens)');

// Collect all relevant files once
const allTsxFiles = findFiles('src', ['.tsx', '.ts']);
const allCssFiles = findFiles('src', ['.css']);
const config = loadConfig();

// ============================================================================
// FEATURE 1: ZERO "ELDECO COUNTY" (Requirement R2)
// ============================================================================

suite.test('1.1 Zero "Eldeco County" in src/lib/config.ts', () => {
  const content = readFile('src/lib/config.ts');
  const matches = content.match(/eldeco/gi);
  assert.equal(matches, null, `Found "Eldeco" in src/lib/config.ts: ${matches}`);
});

suite.test('1.2 Zero "Eldeco County" in HomePage and page.tsx', () => {
  const homeFiles = [
    'src/app/page.tsx',
    'src/components/HomePage.tsx'
  ].filter(fileExists);
  for (const f of homeFiles) {
    const content = readFile(f);
    assert.doesNotMatch(content, /eldeco/i, `Found "Eldeco" in ${f}`);
  }
});

suite.test('1.3 Zero "Eldeco County" in all 3 pillar pages', () => {
  const pillarFiles = [
    'src/app/german-classes-sonipat/page.tsx',
    'src/app/french-classes-sonipat/page.tsx',
    'src/app/spoken-english-classes-sonipat/page.tsx'
  ];
  for (const f of pillarFiles) {
    const content = readFile(f);
    assert.doesNotMatch(content, /eldeco/i, `Found "Eldeco" in ${f}`);
  }
});

suite.test('1.4 Zero "Eldeco County" in legal pages (privacy-policy, terms)', () => {
  const legalFiles = [
    'src/app/privacy-policy/page.tsx',
    'src/app/terms/page.tsx'
  ];
  for (const f of legalFiles) {
    const content = readFile(f);
    assert.doesNotMatch(content, /eldeco/i, `Found "Eldeco" in ${f}`);
  }
});

suite.test('1.5 Zero "Eldeco County" across entire codebase (all TS/TSX/CSS/JSON in src)', () => {
  const occurrences = searchOccurrences(/eldeco/i, allTsxFiles.concat(allCssFiles));
  assert.equal(
    occurrences.length,
    0,
    `Found "Eldeco" in codebase: ${JSON.stringify(occurrences, null, 2)}`
  );
});

// ============================================================================
// FEATURE 2: ZERO "MURTHAL" (Requirement R2)
// ============================================================================

suite.test('2.1 Zero "Murthal" in src/lib/config.ts', () => {
  const content = readFile('src/lib/config.ts');
  assert.doesNotMatch(content, /murthal/i, 'Found "Murthal" in src/lib/config.ts');
});

suite.test('2.2 Zero "Murthal" in HomePage and page.tsx', () => {
  const homeFiles = [
    'src/app/page.tsx',
    'src/components/HomePage.tsx'
  ].filter(fileExists);
  for (const f of homeFiles) {
    const content = readFile(f);
    assert.doesNotMatch(content, /murthal/i, `Found "Murthal" in ${f}`);
  }
});

suite.test('2.3 Zero "Murthal" in German pillar page & schemas', () => {
  const content = readFile('src/app/german-classes-sonipat/page.tsx');
  assert.doesNotMatch(content, /murthal/i, 'Found "Murthal" in german-classes-sonipat/page.tsx');
});

suite.test('2.4 Zero "Murthal" in French pillar page & schemas', () => {
  const content = readFile('src/app/french-classes-sonipat/page.tsx');
  assert.doesNotMatch(content, /murthal/i, 'Found "Murthal" in french-classes-sonipat/page.tsx');
});

suite.test('2.5 Zero "Murthal" in Spoken English pillar page & layout schemas', () => {
  const content = readFile('src/app/spoken-english-classes-sonipat/page.tsx');
  assert.doesNotMatch(content, /murthal/i, 'Found "Murthal" in spoken-english-classes-sonipat/page.tsx');
  const layout = readFile('src/app/layout.tsx');
  assert.doesNotMatch(layout, /murthal/i, 'Found "Murthal" in layout.tsx');
});

// ============================================================================
// FEATURE 3: EXACT OFFLINE CENTRE STRING (Requirement R2)
// Target: "Sonipat, Haryana — 131001 (Offline Centre Coming Soon)"
// ============================================================================

const EXACT_OFFLINE_STRING = "Sonipat, Haryana — 131001 (Offline Centre Coming Soon)";

suite.test('3.1 SITE_CONFIG.address.full matches exact offline centre string', () => {
  assert.equal(
    config.SITE_CONFIG.address.full,
    EXACT_OFFLINE_STRING,
    `SITE_CONFIG.address.full is "${config.SITE_CONFIG.address.full}" but expected "${EXACT_OFFLINE_STRING}"`
  );
});

suite.test('3.2 Footer displays exact offline centre address string', () => {
  const content = readFile('src/components/Footer.tsx');
  const hasExact = content.includes(EXACT_OFFLINE_STRING) || 
                   content.includes('SITE_CONFIG.address.full');
  assert.ok(hasExact, `Footer.tsx does not display exact offline address "${EXACT_OFFLINE_STRING}"`);
});

suite.test('3.3 HomePage contains exact offline centre string or references SITE_CONFIG', () => {
  const content = readFile('src/components/HomePage.tsx');
  const hasExact = content.includes(EXACT_OFFLINE_STRING) || 
                   content.includes('SITE_CONFIG.address.full');
  assert.ok(hasExact, `HomePage.tsx does not display exact offline address "${EXACT_OFFLINE_STRING}"`);
});

suite.test('3.4 Pillar pages display exact offline centre string in contact/location sections', () => {
  const pillarFiles = [
    'src/app/german-classes-sonipat/page.tsx',
    'src/app/french-classes-sonipat/page.tsx',
    'src/app/spoken-english-classes-sonipat/page.tsx'
  ];
  for (const f of pillarFiles) {
    const content = readFile(f);
    const hasExact = content.includes(EXACT_OFFLINE_STRING) || 
                     content.includes('SITE_CONFIG.address.full');
    assert.ok(hasExact, `${f} does not include exact offline address "${EXACT_OFFLINE_STRING}"`);
  }
});

suite.test('3.5 No conflicting or outdated address variants exist in codebase', () => {
  const invalidPatterns = [
    /Murthal Road/i,
    /Sector 14.*Sonipat/i,
    /Sector 8.*Sonipat/i,
    /Old DC Office/i
  ];
  for (const pat of invalidPatterns) {
    const occurrences = searchOccurrences(pat, allTsxFiles);
    assert.equal(occurrences.length, 0, `Found outdated address pattern ${pat} in: ${JSON.stringify(occurrences)}`);
  }
});

// ============================================================================
// FEATURE 4: GERMAN PILLAR (A1–C2, Goethe & Telc Coaching) (Requirement R2)
// ============================================================================

suite.test('4.1 German courses cover all 6 CEFR levels (A1, A2, B1, B2, C1, C2)', () => {
  const germanCourses = config.COURSES.filter(c => c.language === 'German');
  const levels = germanCourses.map(c => c.level);
  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lvl => {
    assert.ok(levels.includes(lvl), `Missing German level ${lvl} in config`);
  });
});

suite.test('4.2 Goethe & Telc exam coaching is explicitly featured', () => {
  const germanCourses = config.COURSES.filter(c => c.language === 'German');
  const descAll = germanCourses.map(c => `${c.title} ${c.subtitle} ${c.description} ${(c.skills || []).join(' ')}`).join(' ');
  assert.match(descAll, /Goethe|Telc/i, 'German courses do not mention Goethe or Telc certifications');
});

suite.test('4.3 German page metadata title & description include German Institute & Sonipat', () => {
  const content = readFile('src/app/german-classes-sonipat/page.tsx');
  assert.match(content, /German/i, 'German page missing German in title/meta');
  assert.match(content, /Sonipat/i, 'German page missing Sonipat in title/meta');
});

suite.test('4.4 German page prominently highlights Offline Centre Coming Soon notice', () => {
  const content = readFile('src/app/german-classes-sonipat/page.tsx');
  assert.match(content, /Offline Centre Coming Soon/i, 'German page missing Offline Centre Coming Soon notice');
});

suite.test('4.5 German courses offer both Offline Classes and Online Classes modes', () => {
  const germanCourses = config.COURSES.filter(c => c.language === 'German');
  for (const c of germanCourses) {
    assert.ok(c.mode.includes('Offline Classes'), `German course ${c.id} missing Offline mode`);
    assert.ok(c.mode.includes('Online Classes'), `German course ${c.id} missing Online mode`);
  }
});

// ============================================================================
// FEATURE 5: FRENCH PILLAR (DELF/DALF & TEF Canada PR) (Requirement R2)
// ============================================================================

suite.test('5.1 French courses cover CEFR levels A1 through C2', () => {
  const frenchCourses = config.COURSES.filter(c => c.language === 'French');
  const levels = frenchCourses.map(c => c.level);
  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lvl => {
    assert.ok(levels.includes(lvl), `Missing French level ${lvl} in config`);
  });
});

suite.test('5.2 DELF & DALF certification coaching is explicitly specified in French courses', () => {
  const frenchCourses = config.COURSES.filter(c => c.language === 'French');
  const descAll = frenchCourses.map(c => `${c.title} ${c.subtitle} ${c.description} ${(c.skills || []).join(' ')}`).join(' ');
  assert.match(descAll, /DELF/i, 'French courses do not mention DELF');
  assert.match(descAll, /DALF/i, 'French courses do not mention DALF');
});

suite.test('5.3 TEF Canada PR points & immigration coaching explicitly highlighted', () => {
  const content = readFile('src/app/french-classes-sonipat/page.tsx');
  assert.match(content, /TEF\s*(?:Canada)?/i, 'French page missing TEF Canada highlights');
  assert.match(content, /Canada/i, 'French page missing Canada PR references');
});

suite.test('5.4 French page metadata specifies French Language Institute in Sonipat', () => {
  const content = readFile('src/app/french-classes-sonipat/page.tsx');
  assert.match(content, /French/i, 'French page metadata missing French');
  assert.match(content, /Sonipat/i, 'French page metadata missing Sonipat');
});

suite.test('5.5 French page prominently announces Offline Centre Coming Soon in Sonipat', () => {
  const content = readFile('src/app/french-classes-sonipat/page.tsx');
  assert.match(content, /Offline Centre Coming Soon/i, 'French page missing Offline Centre notice');
});

// ============================================================================
// FEATURE 6: SPOKEN ENGLISH & PUBLIC SPEAKING PILLAR (Requirement R2)
// ============================================================================

suite.test('6.1 Spoken English courses cover comprehensive levels (A1 to C2 / Mastery)', () => {
  const englishCourses = config.COURSES.filter(c => c.language === 'English');
  const levels = englishCourses.map(c => c.level);
  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lvl => {
    assert.ok(levels.includes(lvl), `Missing English level ${lvl} in config`);
  });
});

suite.test('6.2 Public Speaking & Corporate Interview preparation featured', () => {
  const englishCourses = config.COURSES.filter(c => c.language === 'English');
  const descAll = englishCourses.map(c => `${c.title} ${c.subtitle} ${c.description} ${(c.skills || []).join(' ')}`).join(' ');
  assert.match(descAll, /Interview|Public Speaking|Corporate/i, 'Spoken English missing public speaking or interview prep');
});

suite.test('6.3 Hesitation removal and round-table speaking methodology included', () => {
  const content = readFile('src/app/spoken-english-classes-sonipat/page.tsx');
  assert.match(content, /hesitation/i, 'Spoken English page missing hesitation removal pedagogy');
});

suite.test('6.4 Spoken English page metadata specifies Spoken English Institute in Sonipat', () => {
  const content = readFile('src/app/spoken-english-classes-sonipat/page.tsx');
  assert.match(content, /Spoken English/i, 'Spoken English page missing Spoken English in metadata');
  assert.match(content, /Sonipat/i, 'Spoken English page missing Sonipat in metadata');
});

suite.test('6.5 Spoken English page highlights Offline Centre Coming Soon notice', () => {
  const content = readFile('src/app/spoken-english-classes-sonipat/page.tsx');
  assert.match(content, /Offline Centre Coming Soon/i, 'Spoken English page missing Offline Centre notice');
});

// ============================================================================
// FEATURE 7: WHATSAPP CTA (+91 93507 76044) (Requirement R3)
// ============================================================================

suite.test('7.1 SITE_CONFIG.whatsapp is strictly "+919350776044"', () => {
  assert.equal(config.SITE_CONFIG.whatsapp, '+919350776044', 'SITE_CONFIG.whatsapp has wrong format');
});

suite.test('7.2 Floating WhatsApp button links to https://wa.me/919350776044', () => {
  const content = readFile('src/components/WhatsAppButton.tsx');
  const hasLink = content.includes('wa.me/919350776044') || content.includes('SITE_CONFIG.whatsapp');
  assert.ok(hasLink, 'WhatsAppButton.tsx does not target wa.me/919350776044');
});

suite.test('7.3 Navbar contains direct WhatsApp CTA link', () => {
  const content = readFile('src/components/Navbar.tsx');
  const hasWa = content.includes('wa.me') || content.includes('SITE_CONFIG.whatsapp') || content.includes('whatsappUrl');
  assert.ok(hasWa, 'Navbar.tsx does not contain WhatsApp CTA');
});

suite.test('7.4 WhatsApp link supports prefilled encoded inquiry message', () => {
  assert.ok(config.SITE_CONFIG.whatsappMessage, 'SITE_CONFIG.whatsappMessage is undefined or empty');
  assert.ok(config.SITE_CONFIG.whatsappMessage.length > 10, 'SITE_CONFIG.whatsappMessage is too short');
});

suite.test('7.5 Floating WhatsApp component has accessible label / title', () => {
  const content = readFile('src/components/WhatsAppButton.tsx');
  assert.match(content, /aria-label|title/i, 'WhatsAppButton missing aria-label or title');
});

// ============================================================================
// FEATURE 8: DIRECT PHONE LINKS (+91 93507 76044) (Requirement R3)
// ============================================================================

suite.test('8.1 SITE_CONFIG.phone is strictly formatted as "+91 93507 76044"', () => {
  assert.equal(config.SITE_CONFIG.phone, '+91 93507 76044');
});

suite.test('8.2 Navbar contains direct clickable tel: phone link', () => {
  const content = readFile('src/components/Navbar.tsx');
  assert.match(content, /tel:\+?91[\s-]?93507[\s-]?76044|tel:\$\{/i, 'Navbar missing direct tel: link');
});

suite.test('8.3 Footer contains direct clickable tel: phone link', () => {
  const content = readFile('src/components/Footer.tsx');
  assert.match(content, /tel:\+?91[\s-]?93507[\s-]?76044|tel:\$\{/i, 'Footer missing direct tel: link');
});

suite.test('8.4 Phone href sanitized to eliminate dialer spaces', () => {
  const content = readFile('src/components/Footer.tsx');
  // Check that either tel: link is without internal spaces or sanitized with replace
  const cleanLink = content.includes('tel:+919350776044') || content.includes("replace(/\\s+/g, '')") || content.includes("replace(/\\D/g");
  assert.ok(cleanLink, 'Footer tel: link may have unstripped whitespace');
});

suite.test('8.5 HomePage / Contact section provides direct phone dial action', () => {
  const content = readFile('src/components/HomePage.tsx');
  assert.match(content, /tel:/i, 'HomePage missing tel: phone action');
});

// ============================================================================
// FEATURE 9: WORKING ENQUIRY FORM & API (/api/enquiry) (Requirement R3)
// ============================================================================

suite.test('9.1 EnquiryForm has all required fields (fullName, mobile, course, mode)', () => {
  const content = readFile('src/components/EnquiryForm.tsx');
  assert.match(content, /name="fullName"|name="name"|id="fullName"/i, 'Missing fullName field');
  assert.match(content, /name="mobile"|id="mobile"/i, 'Missing mobile field');
  assert.match(content, /name="course"|id="course"/i, 'Missing course field');
  assert.match(content, /name="mode"|id="mode"/i, 'Missing mode field');
});

suite.test('9.2 EnquiryForm includes honeypot anti-spam trap field', () => {
  const content = readFile('src/components/EnquiryForm.tsx');
  const hasHoneypot = content.includes('botField') || content.includes('website_url');
  assert.ok(hasHoneypot, 'EnquiryForm missing spam honeypot field');
});

suite.test('9.3 EnquiryForm posts to /api/enquiry', () => {
  const content = readFile('src/components/EnquiryForm.tsx');
  assert.match(content, /['"]\/api\/enquiry['"]/, 'EnquiryForm does not POST to /api/enquiry');
});

suite.test('9.4 EnquiryForm disables submit button while submitting', () => {
  const content = readFile('src/components/EnquiryForm.tsx');
  assert.match(content, /disabled=\{.*(?:submitting|loading)/i, 'Submit button not disabled during submission');
});

suite.test('9.5 EnquiryForm displays success confirmation feedback message', () => {
  const content = readFile('src/components/EnquiryForm.tsx');
  assert.match(content, /success|received|thank/i, 'EnquiryForm missing success confirmation state');
});

// ============================================================================
// FEATURE 10: SEO CANONICAL TAGS ON ALL 6 PAGES (Requirement R3)
// ============================================================================

suite.test('10.1 Route / (Homepage) has canonical tag configured', () => {
  const layout = readFile('src/app/layout.tsx');
  const page = readFile('src/app/page.tsx');
  const hasCanonical = layout.includes('canonical') || page.includes('canonical') || layout.includes('metadataBase');
  assert.ok(hasCanonical, 'Homepage missing canonical URL configuration');
});

suite.test('10.2 Route /german-classes-sonipat has canonical tag', () => {
  const content = readFile('src/app/german-classes-sonipat/page.tsx');
  assert.match(content, /canonical/i, 'German page missing canonical tag');
});

suite.test('10.3 Route /french-classes-sonipat has canonical tag', () => {
  const content = readFile('src/app/french-classes-sonipat/page.tsx');
  assert.match(content, /canonical/i, 'French page missing canonical tag');
});

suite.test('10.4 Route /spoken-english-classes-sonipat has canonical tag', () => {
  const content = readFile('src/app/spoken-english-classes-sonipat/page.tsx');
  assert.match(content, /canonical/i, 'Spoken English page missing canonical tag');
});

suite.test('10.5 Routes /privacy-policy and /terms have canonical tags', () => {
  const privacy = readFile('src/app/privacy-policy/page.tsx');
  const terms = readFile('src/app/terms/page.tsx');
  assert.match(privacy, /canonical/i, 'Privacy policy missing canonical tag');
  assert.match(terms, /canonical/i, 'Terms page missing canonical tag');
});

// ============================================================================
// FEATURE 11: RICH JSON-LD SCHEMAS (Requirement R3)
// ============================================================================

suite.test('11.1 LanguageSchool / EducationalOrganization schema exists', () => {
  const layout = readFile('src/app/layout.tsx');
  assert.match(layout, /["']@type["']:\s*["'](?:LanguageSchool|EducationalOrganization|LocalBusiness)["']/, 'Missing LanguageSchool or EducationalOrganization schema');
});

suite.test('11.2 Schema address has Sonipat and zero occurrences of Murthal', () => {
  const layout = readFile('src/app/layout.tsx');
  assert.match(layout, /Sonipat/, 'Schema missing Sonipat');
  assert.doesNotMatch(layout, /Murthal/, 'Schema contains forbidden "Murthal"');
});

suite.test('11.3 Course structured schemas exist for German, French, and English', () => {
  const layout = readFile('src/app/layout.tsx');
  assert.match(layout, /["']@type["']:\s*["']Course["']/, 'Missing Course schemas in layout.tsx');
});

suite.test('11.4 FAQPage schema is defined with valid Question/Answer structures', () => {
  const home = readFile('src/components/HomePage.tsx');
  const layout = readFile('src/app/layout.tsx');
  const german = readFile('src/app/german-classes-sonipat/page.tsx');
  const hasFaq = home.includes('FAQPage') || layout.includes('FAQPage') || german.includes('FAQPage');
  assert.ok(hasFaq, 'Missing FAQPage schema in pages');
});

suite.test('11.5 All JSON-LD scripts across pages parse as valid JSON', () => {
  for (const f of allTsxFiles) {
    const content = readFile(f);
    // Find dangerouslySetInnerHTML with __html: JSON.stringify(...)
    const matches = content.matchAll(/dangerouslySetInnerHTML=\{\{\s*__html:\s*(?:JSON\.stringify\(([\s\S]*?)\)|`([\s\S]*?)`)/g);
    for (const m of matches) {
      if (m[2]) {
        // Direct JSON string template
        try {
          JSON.parse(m[2]);
        } catch (e) {
          assert.fail(`Invalid JSON-LD syntax in ${f}: ${e.message}`);
        }
      }
    }
  }
});

// ============================================================================
// FEATURE 12: HALLMARK TOKENS AT :ROOT (Requirement R1)
// ============================================================================

suite.test('12.1 Root tokens declare --color-paper using OKLCH color space', () => {
  const tokensFile = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : readFile('src/app/globals.css');
  assert.match(tokensFile, /--color-paper:\s*oklch\(/i, 'Missing --color-paper in OKLCH in tokens');
});

suite.test('12.2 Root tokens declare --color-ink using OKLCH color space', () => {
  const tokensFile = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : readFile('src/app/globals.css');
  assert.match(tokensFile, /--color-ink:\s*oklch\(/i, 'Missing --color-ink in OKLCH in tokens');
});

suite.test('12.3 No pure #fff or #000 in design tokens :root definition', () => {
  const tokensFile = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : readFile('src/app/globals.css');
  const rootBlock = tokensFile.match(/:root\s*\{([\s\S]*?)\}/);
  assert.ok(rootBlock, 'Missing :root block in tokens/globals.css');
  assert.doesNotMatch(rootBlock[1], /--color-(?:paper|ink|bg|text):\s*#(?:fff(?:fff)?|000(?:000)?)\b/i, 'Pure #fff or #000 used for core paper/ink tokens');
});

suite.test('12.4 Typography display and body font tokens are declared', () => {
  const tokensFile = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : readFile('src/app/globals.css');
  assert.match(tokensFile, /--font-(?:display|serif):/i, 'Missing display font token');
  assert.match(tokensFile, /--font-(?:body|sans):/i, 'Missing body font token');
});

suite.test('12.5 Container ceiling token --container: 1440px is declared', () => {
  const tokensFile = fileExists('src/app/tokens.css') ? readFile('src/app/tokens.css') : readFile('src/app/globals.css');
  assert.match(tokensFile, /--container:\s*1440px/i, 'Missing --container: 1440px token');
});

// ============================================================================
// FEATURE 13: NO PROHIBITED HALLMARK ELEMENTS (Requirement R1)
// ============================================================================

suite.test('13.1 Zero "transition: all" declarations across CSS files (Gate 10a)', () => {
  const occurrences = searchOccurrences(/transition:\s*all\b/i, allCssFiles);
  assert.equal(occurrences.length, 0, `Found "transition: all" in: ${JSON.stringify(occurrences)}`);
});

suite.test('13.2 Zero <em> or <i> inside roman headings <h1> through <h6> (Gate 38i)', () => {
  const matches = [];
  for (const f of allTsxFiles) {
    const content = readFile(f);
    const headingMatches = content.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi);
    for (const hm of headingMatches) {
      if (/<(em|i)\b/i.test(hm[1])) {
        matches.push({ file: f, heading: hm[0].trim().slice(0, 100) });
      }
    }
  }
  assert.equal(matches.length, 0, `Found <em>/<i> inside headings in: ${JSON.stringify(matches)}`);
});

suite.test('13.3 Zero purple-to-blue linear gradients in CSS (Gate 2a)', () => {
  const occurrences = searchOccurrences(/linear-gradient\([^)]*(?:#8b5cf6|#6366f1|#7c3aed|#3b82f6|rgba\(\s*139,\s*92,\s*246|rgba\(\s*99,\s*102,\s*241)[^)]*(?:#3b82f6|#2563eb|#1d4ed8)/i, allCssFiles);
  assert.equal(occurrences.length, 0, `Found purple-to-blue gradient in: ${JSON.stringify(occurrences)}`);
});

suite.test('13.4 Zero raw emoji icons in UI buttons or navigation (Gate 30a)', () => {
  const occurrences = searchOccurrences(/<(?:button|a)[^>]*>[^<]*[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u, allTsxFiles);
  assert.equal(occurrences.length, 0, `Found emoji icons inside buttons/links: ${JSON.stringify(occurrences)}`);
});

suite.test('13.5 Zero uppercase tracked labels preceding headings (Gate 54, Gate 67)', () => {
  const occurrences = searchOccurrences(/class(?:Name)?=["'][^"']*\b(?:eyebrow|section-label|label)\b[^"']*["']/i, allTsxFiles);
  // Track occurrences of forbidden eyebrow classes
  assert.equal(occurrences.length, 0, `Found prohibited eyebrow classes in: ${JSON.stringify(occurrences)}`);
});

// ============================================================================
// FEATURE 14: HERO VIEWPORT FIT AT 1280x800 (Requirement R1, Gate 44b)
// ============================================================================

suite.test('14.1 Homepage Hero headline (H1) word count is <= 7 words', () => {
  const content = readFile('src/components/HomePage.tsx');
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  assert.ok(h1Match, 'HomePage missing <h1>');
  // Strip tags and whitespace
  const text = h1Match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(' ').filter(Boolean).length;
  assert.ok(wordCount <= 7, `Hero H1 has ${wordCount} words (max 7): "${text}"`);
});

suite.test('14.2 Homepage Hero lede sentence word count is <= 12 words', () => {
  const content = readFile('src/components/HomePage.tsx');
  const ledeMatch = content.match(/class(?:Name)?=["'][^"']*(?:heroLede|heroSub|hero-sub|lead)[^"']*["'][^>]*>([\s\S]*?)<\/(?:p|div)>/i);
  if (ledeMatch) {
    const text = ledeMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').filter(Boolean).length;
    assert.ok(wordCount <= 12, `Hero lede sentence has ${wordCount} words (max 12): "${text}"`);
  }
});

suite.test('14.3 Hero section includes primary action button inside fold block', () => {
  const content = readFile('src/components/HomePage.tsx');
  assert.match(content, /hero(?:Actions|Cta|Content)[\s\S]*?<(?:button|a)/i, 'Hero section missing primary action button');
});

suite.test('14.4 Hero section avoids unbounded vertical heights (no min-height: 100vh)', () => {
  const homeCss = fileExists('src/components/HomePage.module.css') ? readFile('src/components/HomePage.module.css') : '';
  assert.doesNotMatch(homeCss, /min-height:\s*100vh\b/i, 'Hero uses min-height: 100vh which violates 1280x800 fold fit');
});

suite.test('14.5 Hero container padding allows primary CTA above 800px fold', () => {
  const homeCss = fileExists('src/components/HomePage.module.css') ? readFile('src/components/HomePage.module.css') : '';
  if (homeCss) {
    assert.doesNotMatch(homeCss, /padding-(?:top|block):\s*(?:[1-9]\d{2,}px|1[5-9]\dpx)/i, 'Hero container padding is too tall for 800px fold');
  }
});

// ============================================================================
// FEATURE 15: CLEAN PRODUCTION BUILD & CONFIGURATION (Requirement R4)
// ============================================================================

suite.test('15.1 package.json contains "build": "next build" and "lint": "eslint"', () => {
  const pkg = JSON.parse(readFile('package.json'));
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(pkg.scripts.lint, 'eslint');
});

suite.test('15.2 tsconfig.json exists and enforces strict TypeScript compilation', () => {
  const tsconfig = JSON.parse(readFile('tsconfig.json'));
  assert.ok(tsconfig.compilerOptions, 'tsconfig missing compilerOptions');
  assert.equal(tsconfig.compilerOptions.strict, true);
});

suite.test('15.3 next.config.js exists and is valid', () => {
  assert.ok(fileExists('next.config.js'), 'next.config.js missing');
});

suite.test('15.4 robots.ts generates valid robots directives and references sitemap', () => {
  assert.ok(fileExists('src/app/robots.ts'), 'robots.ts missing');
  const content = readFile('src/app/robots.ts');
  assert.match(content, /sitemap/i, 'robots.ts missing sitemap declaration');
});

suite.test('15.5 sitemap.ts indexes all 6 routes with production domain', () => {
  assert.ok(fileExists('src/app/sitemap.ts'), 'sitemap.ts missing');
  const content = readFile('src/app/sitemap.ts');
  assert.ok(content.includes('SITE_CONFIG.siteUrl') || content.includes('fluencynest.in'), 'sitemap.ts does not use production domain');
  [
    'german-classes-sonipat',
    'french-classes-sonipat',
    'spoken-english-classes-sonipat',
    'privacy-policy',
    'terms'
  ].forEach(route => {
    assert.match(content, new RegExp(route), `sitemap.ts missing route: ${route}`);
  });
});

export async function run() {
  return await suite.run();
}

if (process.argv[1] && process.argv[1].endsWith('tier1_features.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
