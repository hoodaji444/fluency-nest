import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { TestSuite, PROJECT_ROOT, SRC_DIR, readFile, loadConfig } from './test_helpers.mjs';

const suite = new TestSuite('Challenger M2-2: Structured Data Schemas & Canonical URLs Adversarial Audit');
const config = loadConfig();

const CANONICAL_OFFLINE_ADDRESS = "Sonipat, Haryana — 131001 (Offline Centre Coming Soon)";
const EXPECTED_DOMAIN = "https://www.fluencynest.in";

const HTML_ROUTES = [
  { route: '/', file: '.next/server/app/index.html', canonical: 'https://www.fluencynest.in' },
  { route: '/german-classes-sonipat', file: '.next/server/app/german-classes-sonipat.html', canonical: 'https://www.fluencynest.in/german-classes-sonipat' },
  { route: '/french-classes-sonipat', file: '.next/server/app/french-classes-sonipat.html', canonical: 'https://www.fluencynest.in/french-classes-sonipat' },
  { route: '/spoken-english-classes-sonipat', file: '.next/server/app/spoken-english-classes-sonipat.html', canonical: 'https://www.fluencynest.in/spoken-english-classes-sonipat' },
  { route: '/privacy-policy', file: '.next/server/app/privacy-policy.html', canonical: 'https://www.fluencynest.in/privacy-policy' },
  { route: '/terms', file: '.next/server/app/terms.html', canonical: 'https://www.fluencynest.in/terms' },
];

/**
 * Helper to recursively collect all values for a given key in an object/graph
 */
function collectKeyValues(obj, targetKey, collected = []) {
  if (!obj || typeof obj !== 'object') return collected;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      collectKeyValues(item, targetKey, collected);
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (key === targetKey) {
        collected.push(value);
      }
      collectKeyValues(value, targetKey, collected);
    }
  }
  return collected;
}

/**
 * Helper to recursively collect all objects matching an @type in a graph
 */
function collectByType(obj, targetType, collected = []) {
  if (!obj || typeof obj !== 'object') return collected;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      collectByType(item, targetType, collected);
    }
  } else {
    const types = Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']];
    if (types.includes(targetType)) {
      collected.push(obj);
    }
    for (const value of Object.values(obj)) {
      collectByType(value, targetType, collected);
    }
  }
  return collected;
}

/**
 * Extract all ld+json blocks from an HTML file
 */
function extractLdJsonFromHtml(htmlContent) {
  const scripts = [];
  const regex = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    scripts.push(match[1]);
  }
  return scripts;
}

/**
 * Extract canonical link tag from HTML
 */
function extractCanonicalFromHtml(htmlContent) {
  const match = htmlContent.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i) ||
                htmlContent.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i);
  return match ? match[1] : null;
}

// ============================================================================
// SUITE 1: CANONICAL TAG PRODUCTION VERIFICATION (ALL 6 ROUTES)
// ============================================================================

suite.test('1.1 Canonical tag is strictly present and matches target in all 6 prerendered HTML routes', () => {
  for (const { route, file, canonical } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    assert.ok(fs.existsSync(fullPath), `Prerendered HTML file missing for ${route}: ${file}`);
    const html = fs.readFileSync(fullPath, 'utf8');
    const extracted = extractCanonicalFromHtml(html);
    assert.ok(extracted, `Route ${route} in ${file} has no <link rel="canonical"> tag`);
    assert.equal(
      extracted,
      canonical,
      `Route ${route} canonical mismatch: got "${extracted}", expected "${canonical}"`
    );
  }
});

suite.test('1.2 Source code metadata declares correct alternates.canonical across all 6 route files', () => {
  const sourceChecks = [
    { file: 'src/app/page.tsx', expected: 'https://www.fluencynest.in' },
    { file: 'src/app/german-classes-sonipat/page.tsx', expected: 'https://www.fluencynest.in/german-classes-sonipat' },
    { file: 'src/app/french-classes-sonipat/page.tsx', expected: 'https://www.fluencynest.in/french-classes-sonipat' },
    { file: 'src/app/spoken-english-classes-sonipat/page.tsx', expected: 'https://www.fluencynest.in/spoken-english-classes-sonipat' },
    { file: 'src/app/privacy-policy/page.tsx', expected: 'https://www.fluencynest.in/privacy-policy' },
    { file: 'src/app/terms/page.tsx', expected: 'https://www.fluencynest.in/terms' },
  ];

  for (const { file, expected } of sourceChecks) {
    const code = readFile(file);
    assert.ok(code.includes(expected), `${file} does not contain expected canonical string ${expected}`);
  }

  // Root layout fallback
  const layout = readFile('src/app/layout.tsx');
  assert.match(layout, /alternates:\s*\{\s*canonical:\s*["']\/["']/, 'Root layout missing fallback canonical "/"');
  assert.match(layout, /metadataBase:\s*new\s*URL\(SITE_CONFIG\.siteUrl\)/, 'Root layout missing metadataBase initialization');
});

// ============================================================================
// SUITE 2: PRODUCTION JSON-LD PARSING AND SYNTAX INTEGRITY
// ============================================================================

suite.test('2.1 Every application/ld+json tag across all production HTML files parses as valid JSON', () => {
  let totalScripts = 0;
  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);
    totalScripts += scripts.length;

    for (let i = 0; i < scripts.length; i++) {
      try {
        const parsed = JSON.parse(scripts[i]);
        assert.ok(parsed && typeof parsed === 'object', `Parsed JSON is not an object in ${route} script #${i}`);
      } catch (err) {
        assert.fail(`Invalid JSON-LD in ${route} script #${i}: ${err.message}`);
      }
    }
  }
  // Layout injects 1 schema on all routes, plus pillar pages inject local schemas (1 + 1 = 2 on 3 pillar pages)
  // Total expected scripts >= 6 (at least 1 per route)
  assert.ok(totalScripts >= 6, `Expected at least 6 JSON-LD script blocks, found ${totalScripts}`);
});

// ============================================================================
// SUITE 3: STRICT STREETADDRESS RESOLUTION ACROSS ALL SCHEMAS
// ============================================================================

suite.test('3.1 Every streetAddress across all production JSON-LD schemas strictly resolves to canonical string', () => {
  let totalStreetAddressesFound = 0;

  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    for (const scriptContent of scripts) {
      const parsed = JSON.parse(scriptContent);
      const addresses = collectKeyValues(parsed, 'streetAddress');
      for (const addr of addresses) {
        totalStreetAddressesFound++;
        assert.equal(
          addr,
          CANONICAL_OFFLINE_ADDRESS,
          `In route ${route}, found non-standard streetAddress: "${addr}"`
        );
      }
    }
  }

  // Layout has 5 instances:
  // 1 (Organization) + 4 (CourseInstance OFFLINE locations for German A1, German B1, French A1, English Speaking)
  // Each course page has:
  // German: 1 (LanguageSchool) + 3 (CourseInstance OFFLINE for A1, B1, B2) = 4
  // French: 1 (LanguageSchool) + 3 (CourseInstance OFFLINE for A1, B1, Canada PR) = 4
  // Spoken English: 1 (LanguageSchool) + 3 (CourseInstance OFFLINE for Foundation, Advanced, Corporate) = 4
  // Across the 6 HTML pages:
  // Layout appears on 6 pages -> 5 * 6 = 30 layout streetAddresses
  // Course page local schemas appear on 3 pages -> 4 * 3 = 12 course streetAddresses
  // Total in prerendered HTML = 42 streetAddress occurrences!
  assert.ok(
    totalStreetAddressesFound >= 16,
    `Expected at least 16 streetAddress instances, but verified ${totalStreetAddressesFound}`
  );
  console.log(`    ℹ Verified ${totalStreetAddressesFound} streetAddress instances in production HTML — all 100% canonical.`);
});

suite.test('3.2 Source code schemas declare streetAddress using SITE_CONFIG.address.full with zero hardcoded deviations', () => {
  const schemaFiles = [
    'src/app/layout.tsx',
    'src/app/german-classes-sonipat/page.tsx',
    'src/app/french-classes-sonipat/page.tsx',
    'src/app/spoken-english-classes-sonipat/page.tsx',
  ];

  let sourceStreetAddressCount = 0;
  for (const file of schemaFiles) {
    const code = readFile(file);
    // Find streetAddress entries
    const matches = code.match(/"streetAddress":\s*SITE_CONFIG\.address\.full/g);
    assert.ok(matches, `${file} missing "streetAddress": SITE_CONFIG.address.full`);
    sourceStreetAddressCount += matches.length;

    // Check for any hardcoded strings in streetAddress
    const hardcoded = code.match(/"streetAddress":\s*["'][^"']+["']/g);
    assert.equal(
      hardcoded,
      null,
      `${file} contains hardcoded streetAddress instead of SITE_CONFIG.address.full: ${JSON.stringify(hardcoded)}`
    );
  }

  // layout: 5 + german: 4 + french: 4 + english: 4 = exactly 17 source instances
  assert.equal(sourceStreetAddressCount, 17, `Expected exactly 17 source streetAddress declarations, found ${sourceStreetAddressCount}`);
});

// ============================================================================
// SUITE 4: SCHEMA.ORG VOCABULARY, ENTITY TYPES & GRAPH CONFORMANCE
// ============================================================================

suite.test('4.1 EducationalOrganization / LanguageSchool schemas conform to Schema.org standards', () => {
  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    for (const scriptContent of scripts) {
      const parsed = JSON.parse(scriptContent);
      assert.equal(parsed['@context'], 'https://schema.org', `Invalid @context in ${route}`);

      const orgs = collectByType(parsed, 'EducationalOrganization');
      for (const org of orgs) {
        assert.ok(org.name, `EducationalOrganization in ${route} missing name`);
        if (org.address) {
          assert.equal(org.address['@type'], 'PostalAddress', `Address missing @type PostalAddress in ${route}`);
          assert.equal(org.address.streetAddress, CANONICAL_OFFLINE_ADDRESS);
          assert.equal(org.address.addressLocality, 'Sonipat');
          assert.equal(org.address.addressRegion, 'Haryana');
          assert.equal(org.address.postalCode, '131001');
          assert.equal(org.address.addressCountry, 'IN');
        }
        if (org.telephone) {
          assert.equal(org.telephone, config.SITE_CONFIG.phone);
        }
        if (org.geo) {
          assert.equal(org.geo['@type'], 'GeoCoordinates');
          assert.equal(typeof org.geo.latitude, 'number');
          assert.equal(typeof org.geo.longitude, 'number');
        }
      }
    }
  }
});

suite.test('4.2 Course schemas define valid educationalLevel, workload, provider, and instances', () => {
  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    for (const scriptContent of scripts) {
      const parsed = JSON.parse(scriptContent);
      const courses = collectByType(parsed, 'Course');
      for (const c of courses) {
        assert.ok(c.name, `Course in ${route} missing name`);
        assert.ok(c.description, `Course in ${route} missing description`);
        assert.ok(c.educationalLevel, `Course in ${route} missing educationalLevel`);
        assert.match(c.courseWorkload, /^PT\d+H$/, `Course in ${route} has invalid ISO duration workload: ${c.courseWorkload}`);
        assert.ok(c.provider, `Course in ${route} missing provider`);
        assert.ok(Array.isArray(c.hasCourseInstance), `Course ${c.name} in ${route} missing hasCourseInstance array`);
        assert.ok(c.hasCourseInstance.length >= 2, `Course ${c.name} in ${route} has fewer than 2 instances (expected online + offline)`);

        const onlineInstance = c.hasCourseInstance.find(inst => inst.courseMode === 'ONLINE');
        const offlineInstance = c.hasCourseInstance.find(inst => inst.courseMode === 'OFFLINE');

        assert.ok(onlineInstance, `Course ${c.name} missing ONLINE CourseInstance`);
        assert.ok(offlineInstance, `Course ${c.name} missing OFFLINE CourseInstance`);
        assert.ok(offlineInstance.location, `Course ${c.name} OFFLINE instance missing location`);
        assert.equal(offlineInstance.location['@type'], 'Place');
        assert.equal(offlineInstance.location.address.streetAddress, CANONICAL_OFFLINE_ADDRESS);
      }
    }
  }
});

suite.test('4.3 FAQPage schemas validate Question/Answer structure without empty strings', () => {
  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    for (const scriptContent of scripts) {
      const parsed = JSON.parse(scriptContent);
      const faqs = collectByType(parsed, 'FAQPage');
      for (const f of faqs) {
        assert.ok(Array.isArray(f.mainEntity), `FAQPage in ${route} missing mainEntity array`);
        assert.ok(f.mainEntity.length > 0, `FAQPage in ${route} has empty mainEntity`);
        for (const q of f.mainEntity) {
          assert.equal(q['@type'], 'Question', `Item in FAQPage mainEntity is not Question`);
          assert.ok(q.name && q.name.trim().length > 0, `FAQ Question has empty name`);
          assert.ok(q.acceptedAnswer, `FAQ Question has no acceptedAnswer`);
          assert.equal(q.acceptedAnswer['@type'], 'Answer');
          assert.ok(q.acceptedAnswer.text && q.acceptedAnswer.text.trim().length > 0, `FAQ Answer has empty text`);
        }
      }
    }
  }
});

suite.test('4.4 BreadcrumbList schemas define sequential 1-indexed ListItem entries', () => {
  const courseRoutes = HTML_ROUTES.filter(r => r.route.includes('-classes-sonipat'));
  for (const { route, file } of courseRoutes) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    let foundBreadcrumb = false;
    for (const scriptContent of scripts) {
      const parsed = JSON.parse(scriptContent);
      const breadcrumbs = collectByType(parsed, 'BreadcrumbList');
      if (breadcrumbs.length > 0) {
        foundBreadcrumb = true;
        for (const bc of breadcrumbs) {
          assert.ok(Array.isArray(bc.itemListElement), `BreadcrumbList missing itemListElement`);
          assert.equal(bc.itemListElement.length, 2, `Expected 2 breadcrumb items (Home -> Course Page)`);
          assert.equal(bc.itemListElement[0].position, 1);
          assert.equal(bc.itemListElement[0].item, EXPECTED_DOMAIN);
          assert.equal(bc.itemListElement[1].position, 2);
          assert.equal(bc.itemListElement[1].item, `${EXPECTED_DOMAIN}${route}`);
        }
      }
    }
    assert.ok(foundBreadcrumb, `BreadcrumbList schema missing on course route ${route}`);
  }
});

// ============================================================================
// SUITE 5: ZERO FORBIDDEN CONTENT / BRAND CONTAMINATION IN SCHEMAS
// ============================================================================

suite.test('5.1 Exactly zero occurrences of "Murthal" or "Eldeco County" in any schema across all pages', () => {
  for (const { route, file } of HTML_ROUTES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const html = fs.readFileSync(fullPath, 'utf8');
    const scripts = extractLdJsonFromHtml(html);

    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      assert.doesNotMatch(script, /Murthal/i, `Forbidden string "Murthal" found in ${route} schema #${i}`);
      assert.doesNotMatch(script, /Eldeco/i, `Forbidden string "Eldeco" found in ${route} schema #${i}`);
    }
  }
});

// ============================================================================
// SUITE 6: RUN SUITE
// ============================================================================

export async function run() {
  return await suite.run();
}

if (process.argv[1] && process.argv[1].endsWith('challenger_m2_2_schema_audit.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
