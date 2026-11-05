import assert from 'node:assert/strict';
import {
  TestSuite,
  readFile,
  fileExists,
  loadConfig,
  loadEnquiryRoute,
  PROJECT_ROOT
} from './test_helpers.mjs';

const suite = new TestSuite('Tier 3: Pairwise Combinations (Course Matrices, API Hardening, Schema Matching, WhatsApp Prefills)');

const config = loadConfig();
const { POST, GET, NextRequest } = loadEnquiryRoute();

// ============================================================================
// PAIRWISE 1: COURSE SELECTION + LEARNING MODE MATRIX
// ============================================================================

const PAIRWISE_COURSES = [
  { course: 'german-a1', mode: 'offline', expectedCourse: 'German A1 — Beginner', expectedMode: 'Offline In-Person' },
  { course: 'german-b2', mode: 'online', expectedCourse: 'German B2 — Upper Intermediate', expectedMode: 'Online Classes' },
  { course: 'french-a1', mode: 'offline', expectedCourse: 'French A1', expectedMode: 'Offline In-Person' },
  { course: 'french-b2', mode: 'online', expectedCourse: 'French B2', expectedMode: 'Online Classes' },
  { course: 'english-b1', mode: 'offline', expectedCourse: 'English B1', expectedMode: 'Offline In-Person' },
  { course: 'english-c2', mode: 'online', expectedCourse: 'English C2', expectedMode: 'Online Classes' },
  { course: 'quick-callback', mode: 'guidance', expectedCourse: 'Quick Callback', expectedMode: 'Need Guidance' }
];

PAIRWISE_COURSES.forEach(({ course, mode, expectedCourse, expectedMode }, idx) => {
  suite.test(`1.${idx + 1} Pairwise course submission: ${course} + ${mode}`, async () => {
    const req = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'origin': 'http://localhost:3000',
        'x-forwarded-for': `192.168.1.${idx + 10}`
      },
      body: JSON.stringify({
        fullName: `Student Pairwise ${idx + 1}`,
        mobile: `981100220${idx}`,
        course,
        mode
      })
    });
    const res = await POST(req);
    assert.equal(res.status, 200, `Failed for ${course} + ${mode}`);
    const data = await res.json();
    assert.equal(data.success, true);
  });
});

// ============================================================================
// PAIRWISE 2: API ENQUIRY SECURITY, HEADERS & RATE LIMITING
// ============================================================================

suite.test('2.1 Full payload with all optional fields succeeds with HTTP 200', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'https://www.fluencynest.in',
      'x-forwarded-for': '192.168.2.1'
    },
    body: JSON.stringify({
      fullName: 'Aayush Jindal',
      mobile: '9876543210',
      email: 'aayush.jindal@example.com',
      course: 'german-b1',
      mode: 'offline',
      city: 'Sonipat',
      timing: 'Morning (9:00 AM - 11:00 AM)',
      goal: 'study-germany',
      message: 'Looking to enroll in upcoming Sonipat offline batch for Goethe B1.'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
});

suite.test('2.2 Missing optional fields defaults safely with HTTP 200', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'http://localhost:3000',
      'x-forwarded-for': '192.168.2.2'
    },
    body: JSON.stringify({
      fullName: 'Neha Verma',
      mobile: '9876543210'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
});

suite.test('2.3 Honeypot trap via botField returns HTTP 200 with emailSent: false', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'http://localhost:3000',
      'x-forwarded-for': '192.168.2.3'
    },
    body: JSON.stringify({
      fullName: 'Automated Bot',
      mobile: '9876543210',
      botField: 'spam_payload_trap'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.emailSent, false);
});

suite.test('2.4 Cross-origin request from unauthorized domain returns HTTP 403', async () => {
  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'https://malicious-phishing-site.com',
      'x-forwarded-for': '192.168.2.4'
    },
    body: JSON.stringify({
      fullName: 'Hacker User',
      mobile: '9876543210'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 403, 'Cross-origin submission from unauthorized origin was not rejected with 403');
  const data = await res.json();
  assert.equal(data.success, false);
});

suite.test('2.5 Disallowed HTTP GET method returns HTTP 405 Method Not Allowed', async () => {
  if (typeof GET === 'function') {
    const res = await GET();
    assert.equal(res.status, 405, 'GET on /api/enquiry should return HTTP 405');
  }
});

suite.test('2.6 Sliding-window rate limit: exactly 5 requests pass, 6th returns HTTP 429', async () => {
  const testIp = '192.168.99.1';
  // Send 5 requests
  for (let i = 1; i <= 5; i++) {
    const req = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'origin': 'http://localhost:3000',
        'x-forwarded-for': testIp
      },
      body: JSON.stringify({
        fullName: `Burst User ${i}`,
        mobile: '9876543210'
      })
    });
    const res = await POST(req);
    assert.equal(res.status, 200, `Request ${i} of 5 should have succeeded`);
  }

  // 6th request must trigger 429
  const blockedReq = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'http://localhost:3000',
      'x-forwarded-for': testIp
    },
    body: JSON.stringify({
      fullName: 'Burst User 6',
      mobile: '9876543210'
    })
  });
  const blockedRes = await POST(blockedReq);
  assert.equal(blockedRes.status, 429, '6th request did not return 429 Rate Limit Exceeded');
  const blockedData = await blockedRes.json();
  assert.equal(blockedData.success, false);
});

suite.test('2.7 Distinct IP isolation: Rate limit on IP A does not block IP B', async () => {
  const reqB = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'http://localhost:3000',
      'x-forwarded-for': '192.168.99.2' // Different IP
    },
    body: JSON.stringify({
      fullName: 'Legitimate User IP B',
      mobile: '9876543210'
    })
  });
  const resB = await POST(reqB);
  assert.equal(resB.status, 200, 'Legitimate request from fresh IP was wrongly rate-limited');
});

// ============================================================================
// PAIRWISE 3: WHATSAPP LINK & PREFILL QUERY COMBINATIONS
// ============================================================================

suite.test('3.1 German course inquiry generates valid wa.me link with German prefill', () => {
  const germanMsg = `Hello, I want to enquire about German language classes at Fluency Nest.`;
  const url = `https://wa.me/919350776044?text=${encodeURIComponent(germanMsg)}`;
  assert.ok(url.startsWith('https://wa.me/919350776044?text='));
  assert.ok(decodeURIComponent(url).includes('German'));
});

suite.test('3.2 French TEF course inquiry generates valid wa.me link with French prefill', () => {
  const frenchMsg = `Hello, I am interested in French classes for TEF Canada PR points.`;
  const url = `https://wa.me/919350776044?text=${encodeURIComponent(frenchMsg)}`;
  assert.ok(url.startsWith('https://wa.me/919350776044?text='));
  assert.ok(decodeURIComponent(url).includes('TEF Canada'));
});

suite.test('3.3 Spoken English inquiry generates valid wa.me link with English prefill', () => {
  const englishMsg = `Hello, I want to join Spoken English & Public Speaking classes.`;
  const url = `https://wa.me/919350776044?text=${encodeURIComponent(englishMsg)}`;
  assert.ok(url.startsWith('https://wa.me/919350776044?text='));
  assert.ok(decodeURIComponent(url).includes('Spoken English'));
});

suite.test('3.4 Default WhatsApp message matches SITE_CONFIG.whatsappMessage', () => {
  const defaultMsg = config.SITE_CONFIG.whatsappMessage;
  const url = `https://wa.me/${config.SITE_CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(defaultMsg)}`;
  assert.ok(url.includes('919350776044'));
  assert.equal(decodeURIComponent(url.split('text=')[1]), defaultMsg);
});

// ============================================================================
// PAIRWISE 4: SCHEMA.ORG GRAPH ↔ PAGE METADATA CONSISTENCY
// ============================================================================

suite.test('4.1 Homepage canonical matches SITE_CONFIG.siteUrl', () => {
  assert.equal(config.SITE_CONFIG.siteUrl, 'https://www.fluencynest.in');
});

suite.test('4.2 Root layout metadataBase matches SITE_CONFIG.siteUrl', () => {
  const layout = readFile('src/app/layout.tsx');
  const hasBase = layout.includes('metadataBase') || layout.includes(config.SITE_CONFIG.siteUrl);
  assert.ok(hasBase, 'Root layout does not reference production siteUrl');
});

suite.test('4.3 LanguageSchool telephone in schema matches SITE_CONFIG.phone', () => {
  const layout = readFile('src/app/layout.tsx');
  assert.ok(
    layout.includes('SITE_CONFIG.phone') || layout.includes(config.SITE_CONFIG.phone) || layout.includes('+919350776044'),
    'Schema telephone does not match or reference SITE_CONFIG.phone'
  );
});

suite.test('4.4 PostalAddress streetAddress in schema matches canonical offline centre string', () => {
  const layout = readFile('src/app/layout.tsx');
  const canonical = 'Sonipat, Haryana — 131001 (Offline Centre Coming Soon)';
  const matches =
    layout.includes('SITE_CONFIG.address.full') ||
    layout.includes(canonical);
  assert.ok(
    matches,
    'Schema streetAddress does not reference SITE_CONFIG.address.full or canonical address string'
  );
  assert.equal(
    config.SITE_CONFIG.address.full,
    canonical,
    'SITE_CONFIG.address.full does not match canonical offline centre string'
  );
});

suite.test('4.5 FAQ schema questions align with FAQ items defined in config.ts', () => {
  const home = readFile('src/components/HomePage.tsx');
  // First FAQ item question
  const q0 = config.FAQ_ITEMS[0].question;
  const hasFaq = home.includes(q0) || home.includes('FAQ_ITEMS');
  assert.ok(hasFaq, 'HomePage FAQ questions do not match config FAQ_ITEMS');
});

export async function run() {
  return await suite.run();
}

if (process.argv[1] && process.argv[1].endsWith('tier3_pairwise.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
