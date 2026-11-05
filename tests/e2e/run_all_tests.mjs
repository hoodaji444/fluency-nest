#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import individual tier runners
import { run as runTier1 } from './tier1_features.test.mjs';
import { run as runTier2 } from './tier2_boundaries.test.mjs';
import { run as runTier3 } from './tier3_pairwise.test.mjs';
import { run as runTier4 } from './tier4_workloads.test.mjs';
import { getProjectRoot } from './test_helpers.mjs';

const PROJECT_ROOT = getProjectRoot();
const SLOPLINT_PATH = '/Users/vishalhooda/.gemini/config/skills/hallmark/scripts/sloplint.mjs';

async function main() {
  const args = process.argv.slice(2);
  const skipSloplint = args.includes('--no-sloplint');
  const targetTier = args.find(a => a.startsWith('--tier='))?.split('=')[1] || 
                     (args.includes('--tier') ? args[args.indexOf('--tier') + 1] : null);

  console.log(`\n======================================================`);
  console.log(`FLUENCY NEST E2E MASTER TEST RUNNER`);
  console.log(`Root: ${PROJECT_ROOT}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================\n`);

  const results = [];
  const startTime = Date.now();

  // Tier 1
  if (!targetTier || targetTier === '1') {
    results.push(await runTier1());
  }

  // Tier 2
  if (!targetTier || targetTier === '2') {
    results.push(await runTier2());
  }

  // Tier 3
  if (!targetTier || targetTier === '3') {
    results.push(await runTier3());
  }

  // Tier 4
  if (!targetTier || targetTier === '4') {
    results.push(await runTier4());
  }

  // Sloplint verification
  let sloplintResult = null;
  if (!skipSloplint && fs.existsSync(SLOPLINT_PATH)) {
    console.log(`\n======================================================`);
    console.log(`RUNNING HALLMARK SLOPLINT AUDIT`);
    console.log(`======================================================`);
    const sloplintStart = Date.now();
    const slopProc = spawnSync(
      process.execPath,
      [SLOPLINT_PATH, path.join(PROJECT_ROOT, 'src'), '--genre', 'editorial'],
      { encoding: 'utf8', cwd: PROJECT_ROOT }
    );
    const slopDuration = Date.now() - sloplintStart;

    const stdout = slopProc.stdout || '';
    const stderr = slopProc.stderr || '';
    const fullOut = stdout + stderr;

    const summaryMatch = fullOut.match(/sloplint:\s*(\d+)\s*FAIL,\s*(\d+)\s*REFLEX,\s*(\d+)\s*WARN/i);
    const fails = summaryMatch ? parseInt(summaryMatch[1], 10) : (slopProc.status !== 0 ? 1 : 0);
    const reflexes = summaryMatch ? parseInt(summaryMatch[2], 10) : 0;
    const warns = summaryMatch ? parseInt(summaryMatch[3], 10) : 0;

    sloplintResult = {
      fails,
      reflexes,
      warns,
      duration: slopDuration,
      status: fails === 0 ? 'PASS' : 'FAIL'
    };

    console.log(`Sloplint Status: ${sloplintResult.status}`);
    console.log(`Gates: ${fails} FAIL | ${reflexes} REFLEX | ${warns} WARN (${slopDuration}ms)`);
  }

  // Print Consolidated Summary Table
  const totalDuration = Date.now() - startTime;
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  console.log(`\n======================================================`);
  console.log(`MASTER TEST SUITE EXECUTION SUMMARY`);
  console.log(`======================================================`);
  console.log(`Tier                                    Total  Pass  Fail  Duration`);
  console.log(`------------------------------------------------------------------`);

  for (const r of results) {
    totalTests += r.total;
    totalPassed += r.passed;
    totalFailed += r.failed;
    const tierPadded = r.suite.slice(0, 38).padEnd(38, ' ');
    const totalPadded = String(r.total).padStart(5, ' ');
    const passPadded = String(r.passed).padStart(5, ' ');
    const failPadded = String(r.failed).padStart(5, ' ');
    const durPadded = `${r.duration}ms`.padStart(9, ' ');
    console.log(`${tierPadded} ${totalPadded} ${passPadded} ${failPadded} ${durPadded}`);
  }

  console.log(`------------------------------------------------------------------`);
  console.log(`Total Tests Executed:                   ${String(totalTests).padStart(5, ' ')} ${String(totalPassed).padStart(5, ' ')} ${String(totalFailed).padStart(5, ' ')} ${String(totalDuration + 'ms').padStart(9, ' ')}`);

  if (sloplintResult) {
    console.log(`\nHallmark Sloplint: ${sloplintResult.fails === 0 ? '✓ PASS' : '✗ FAIL'} (${sloplintResult.fails} FAIL, ${sloplintResult.reflexes} REFLEX, ${sloplintResult.warns} WARN)`);
  }

  // Defect breakdown
  if (totalFailed > 0) {
    console.log(`\n------------------------------------------------------------------`);
    console.log(`DEFECT BREAKDOWN (Discovered Implementation Items to Escalate):`);
    console.log(`------------------------------------------------------------------`);
    let defectIdx = 1;
    for (const r of results) {
      for (const res of r.results) {
        if (res.status === 'FAIL') {
          console.log(`${defectIdx++}. [${r.suite.split(':')[0].trim()}] ${res.name}`);
          console.log(`   ↳ ${res.error}`);
        }
      }
    }
  }

  console.log(`======================================================\n`);

  const exitCode = (totalFailed > 0 || (sloplintResult && sloplintResult.fails > 0)) ? 1 : 0;
  process.exit(exitCode);
}

main().catch(err => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
