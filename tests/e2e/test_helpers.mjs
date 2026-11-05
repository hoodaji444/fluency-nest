import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect project root directory (fluent-nest)
export function getProjectRoot() {
  let curr = __dirname;
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'package.json')) && 
        fs.existsSync(path.join(curr, 'src'))) {
      return curr;
    }
    // Check if fluent-nest is a child directory
    if (fs.existsSync(path.join(curr, 'fluent-nest', 'package.json'))) {
      return path.join(curr, 'fluent-nest');
    }
    curr = path.dirname(curr);
  }
  return path.resolve(__dirname, '../..');
}

export const PROJECT_ROOT = getProjectRoot();
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

const require = createRequire(path.join(PROJECT_ROOT, 'package.json'));

/**
 * Read text content of a file relative to project root or src
 */
export function readFile(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

export function fileExists(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(PROJECT_ROOT, relPath);
  return fs.existsSync(fullPath);
}

/**
 * Recursively find files in a directory matching extensions
 */
export function findFiles(dir, extensions = ['.ts', '.tsx', '.css', '.mjs', '.json']) {
  const fullDir = path.isAbsolute(dir) ? dir : path.join(PROJECT_ROOT, dir);
  const results = [];
  if (!fs.existsSync(fullDir)) return results;

  function walk(current) {
    const list = fs.readdirSync(current, { withFileTypes: true });
    for (const item of list) {
      if (item.name === 'node_modules' || item.name === '.next' || item.name.startsWith('.')) {
        continue;
      }
      const itemPath = path.join(current, item.name);
      if (item.isDirectory()) {
        walk(itemPath);
      } else if (extensions.some(ext => item.name.endsWith(ext))) {
        results.push(itemPath);
      }
    }
  }
  walk(fullDir);
  return results;
}

/**
 * Search regex or literal across files
 */
export function searchOccurrences(pattern, files) {
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'g');
  const matches = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        matches.push({
          file: path.relative(PROJECT_ROOT, file),
          line: idx + 1,
          content: line.trim()
        });
      }
      // Reset regex state if global
      regex.lastIndex = 0;
    });
  }
  return matches;
}

/**
 * Load and transpile TypeScript config.ts
 */
export function loadConfig() {
  const configPath = path.join(SRC_DIR, 'lib', 'config.ts');
  const ts = require('typescript');
  const code = fs.readFileSync(configPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const m = { exports: {} };
  const fn = new Function('require', 'module', 'exports', result.outputText);
  fn(require, m, m.exports);
  return m.exports;
}

/**
 * Load and transpile Next.js API enquiry route
 */
export function loadEnquiryRoute() {
  const routePath = path.join(SRC_DIR, 'app', 'api', 'enquiry', 'route.ts');
  const ts = require('typescript');
  const nextServer = require('next/server');
  const code = fs.readFileSync(routePath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const m = { exports: {} };
  const fn = new Function('require', 'module', 'exports', result.outputText);
  fn((id) => {
    if (id === 'next/server') return nextServer;
    return require(id);
  }, m, m.exports);
  return { ...m.exports, NextRequest: nextServer.NextRequest, NextResponse: nextServer.NextResponse };
}

/**
 * WCAG 2.1 Color Luminance and Contrast Calculations
 */
export function parseOklch(str) {
  const m = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i);
  if (!m) return null;
  let L = parseFloat(m[1]);
  if (m[1].endsWith('%') || L > 1.0) L = L / 100;
  const C = parseFloat(m[2]);
  const H = parseFloat(m[3]);
  return { L, C, H };
}

export function parseHex(hex) {
  const cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    return [
      parseInt(cleaned[0] + cleaned[0], 16) / 255,
      parseInt(cleaned[1] + cleaned[1], 16) / 255,
      parseInt(cleaned[2] + cleaned[2], 16) / 255
    ];
  }
  if (cleaned.length === 6) {
    return [
      parseInt(cleaned.slice(0, 2), 16) / 255,
      parseInt(cleaned.slice(2, 4), 16) / 255,
      parseInt(cleaned.slice(4, 6), 16) / 255
    ];
  }
  return null;
}

export function getLuminanceFromRgb(r, g, b) {
  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(l1, l2) {
  const lum1 = Math.max(l1, l2);
  const lum2 = Math.min(l1, l2);
  return (lum1 + 0.05) / (lum2 + 0.05);
}

/**
 * Lightweight Test Harness
 */
export class TestSuite {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.results = [];
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log(`\n======================================================`);
    console.log(`RUNNING SUITE: ${this.name}`);
    console.log(`======================================================`);
    const startTime = Date.now();

    for (const t of this.tests) {
      const testStart = Date.now();
      try {
        await t.fn();
        const duration = Date.now() - testStart;
        this.passed++;
        this.results.push({ name: t.name, status: 'PASS', duration });
        console.log(`  ✓ [PASS] ${t.name} (${duration}ms)`);
      } catch (err) {
        const duration = Date.now() - testStart;
        this.failed++;
        this.results.push({ name: t.name, status: 'FAIL', duration, error: err.message, stack: err.stack });
        console.log(`  ✗ [FAIL] ${t.name} (${duration}ms)`);
        console.log(`    ↳ Error: ${err.message}`);
      }
    }

    const totalDuration = Date.now() - startTime;
    console.log(`------------------------------------------------------`);
    console.log(`SUITE SUMMARY: ${this.name}`);
    console.log(`Total: ${this.tests.length} | Passed: ${this.passed} | Failed: ${this.failed} | Duration: ${totalDuration}ms`);
    console.log(`======================================================\n`);

    return {
      suite: this.name,
      total: this.tests.length,
      passed: this.passed,
      failed: this.failed,
      duration: totalDuration,
      results: this.results
    };
  }
}
