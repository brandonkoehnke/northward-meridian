#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const HOST = 'www.northwardmeridian.com';
const ORIGIN = `https://${HOST}`;
const API = 'https://api.indexnow.org/indexnow';
const args = process.argv.slice(2);
const help = () => console.log(`Usage:
  npm run indexnow -- --url /guides/example --dry-run
  npm run indexnow -- --url /guides/example
  npm run indexnow -- --all --dry-run
  npm run indexnow -- --all
  npm run indexnow -- --sitemap https://www.northwardmeridian.com/sitemap.xml --dry-run

--url may be repeated. --all loads the live sitemap. Submissions require --all or --url.
Only URLs on https://${HOST} are accepted. Never submit before deployment.`);

function valueAfter(flag) {
  const at = args.indexOf(flag);
  if (at === -1) return null;
  if (!args[at + 1] || args[at + 1].startsWith('--')) throw new Error(`${flag} needs a value`);
  return args[at + 1];
}
function urlsAfter(flag) {
  const out = [];
  for (let i = 0; i < args.length; i++) if (args[i] === flag) {
    if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`${flag} needs a value`);
    out.push(args[++i]);
  }
  return out;
}
function canonical(input) {
  const u = new URL(input, ORIGIN);
  if (u.protocol !== 'https:' || u.hostname !== HOST || u.port || u.username || u.password) {
    throw new Error(`Refusing noncanonical or foreign URL: ${input}`);
  }
  if (u.search || u.hash) throw new Error(`Remove query parameters/fragments: ${input}`);
  return u.href;
}
async function sitemapUrls(location) {
  const sitemap = canonical(location);
  const res = await fetch(sitemap, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Sitemap request failed: HTTP ${res.status}`);
  const xml = await res.text();
  if (!/<urlset\b/i.test(xml)) throw new Error('Expected a URL sitemap, not a sitemap index');
  const found = [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((m) => m[1].trim()
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
  if (!found.length) throw new Error('No URLs found in sitemap');
  return found.map(canonical);
}
async function main() {
  if (args.includes('--help') || args.includes('-h')) { help(); return; }
  const permitted = new Set(['--help', '-h', '--dry-run', '--all', '--url', '--sitemap']);
  for (const a of args) if (a.startsWith('--') && !permitted.has(a)) throw new Error(`Unknown option: ${a}`);
  const dry = args.includes('--dry-run');
  const all = args.includes('--all');
  const selected = urlsAfter('--url');
  const sitemap = valueAfter('--sitemap') ?? `${ORIGIN}/sitemap.xml`;
  if (!all && !selected.length) { help(); process.exitCode = 1; return; }
  if (all && selected.length) throw new Error('Choose --all or one or more --url arguments, not both');
  const urlList = [...new Set((all ? await sitemapUrls(sitemap) : selected.map(canonical)))];
  if (urlList.length > 10000) throw new Error('IndexNow batch exceeds 10,000 URLs');
  const files = (await readdir(path.join(process.cwd(), 'public'))).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (files.length !== 1) throw new Error(`Expected exactly one 32-character hex IndexNow key file in public/; found ${files.length}`);
  const key = files[0].slice(0, -4);
  const contents = (await readFile(path.join(process.cwd(), 'public', files[0]), 'utf8')).trim();
  if (contents !== key) throw new Error('Key filename and contents do not match');
  const keyLocation = `${ORIGIN}/${files[0]}`;
  console.log(`Host: ${HOST}\nKey URL: ${keyLocation}\nURLs (${urlList.length}):\n${urlList.join('\n')}`);
  if (dry) { console.log('\nDRY RUN: nothing submitted.'); return; }
  console.log("Checking deployed IndexNow key file...");
  const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
    throw new Error('Deployed key file is not accessible or does not match. Deploy before submitting.');
  }
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  const responseBody = (await response.text()).slice(0, 500);
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}: ${responseBody}`);
  console.log(`IndexNow accepted the submission (HTTP ${response.status}). This does not guarantee indexing.`);
}
main().catch((err) => {
  console.error("IndexNow error:", err);

  if (err.cause) {
    console.error("Underlying cause:", err.cause);
  }

  process.exitCode = 1;
});
