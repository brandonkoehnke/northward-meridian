#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const help = args.includes('--help');
const dryRun = args.includes('--dry-run');
const guideAt = args.indexOf('--guide');
const guide = guideAt >= 0 ? args[guideAt + 1] : null;
const allowed = new Set(['--help', '--dry-run', '--guide']);
if (args.some(a => a.startsWith('--') && !allowed.has(a)) || (guideAt >= 0 && (!guide || guide.startsWith('--')))) {
  console.error('Usage: node scripts/check-guide-links.mjs [--guide slug] [--dry-run]');
  process.exit(2);
}
if (help) { console.log('Usage: node scripts/check-guide-links.mjs [--guide slug] [--dry-run]'); process.exit(0); }

async function collect(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const nested = await Promise.all(entries.map(async e => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return collect(p);
      return e.isFile() && /\.(?:tsx|ts|jsx|js|mdx)$/.test(e.name) ? [p] : [];
    }));
    return nested.flat();
  } catch (err) { if (err.code === 'ENOENT') return []; throw err; }
}

const roots = [path.join(root, 'app', 'guides'), path.join(root, 'app', 'es', 'guides')];
const files = (await Promise.all(roots.map(collect))).flat().filter(f => !guide || f.split(path.sep).includes(guide));
if (guide && !files.length) { console.error(`No files found for guide: ${guide}`); process.exit(2); }
if (!files.length) { console.error('No guide source files found. Run from the NM project root.'); process.exit(2); }

const references = new Map();
for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  // Literal URLs only. Dynamically assembled URLs must be manually reviewed.
  const urls = source.match(/https?:\/\/[^\s"'`<>\\}]+/g) ?? [];
  for (const candidate of urls) {
    const raw = candidate.replace(/[),;]+$/, '').replace(/&amp;/g, '&');
    let url;
    try { url = new URL(raw); } catch { continue; }
    if (!['http:', 'https:'].includes(url.protocol)) continue;
    if (/[${}]/.test(raw) || url.hostname === 'schema.org') continue;
    if (/(^|\.)northwardmeridian\.com$/i.test(url.hostname)) continue;
    const key = url.href;
    if (!references.has(key)) references.set(key, new Set());
    references.get(key).add(path.relative(root, file));
  }
}
console.log(`Scanned ${files.length} source files; found ${references.size} unique external literal URLs.`);
if (dryRun) {
  for (const [url, locations] of references) console.log(`${url}\n  ${[...locations].join(', ')}`);
  console.log('DRY RUN: no network requests made.');
  process.exit(0);
}

const items = [...references];
let failures = 0, warnings = 0, ok = 0;
async function check([url, locations]) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    // GET rather than HEAD: many documentation sites reject HEAD requests.
    const response = await fetch(url, {
      method: 'GET', redirect: 'follow', signal: controller.signal,
      headers: { 'user-agent': 'NorthwardMeridianLinkCheck/1.0 (manual editorial QA)' },
    });
    // Consume no body; cancel the stream after receiving headers.
    await response.body?.cancel().catch(() => {});
    const location = [...locations].join(', ');
    if ([404, 410].includes(response.status)) {
      failures++;
      console.error(`FAIL ${response.status} ${url}\n  ${location}`);
    } else if (response.ok) {
      ok++;
      console.log(`OK ${response.status} ${url}${response.url !== url ? ` -> ${response.url}` : ''}`);
    } else {
      warnings++;
      console.warn(`WARN HTTP ${response.status} ${url}\n  ${location} (verify manually)`);
    }
  } catch (err) {
    warnings++;
    console.warn(`WARN ${err.name === 'AbortError' ? 'timeout' : err.message} ${url}\n  ${[...locations].join(', ')} (verify manually)`);
  } finally { clearTimeout(timer); }
}
// Limit parallel requests to avoid overloading official sites.
const workers = Array.from({ length: Math.min(3, items.length) }, async (_, worker) => {
  for (let i = worker; i < items.length; i += Math.min(3, items.length)) await check(items[i]);
});
await Promise.all(workers);
console.log(`Summary: ${ok} OK, ${warnings} warnings, ${failures} confirmed HTTP 404/410 failures.`);
if (failures) process.exitCode = 1;
