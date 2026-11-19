# Northward Meridian — Chat Handoff

**Snapshot: November 19, 2026 — Guide #52 local build and PDF review.** This replaces the outdated October 28 / Guide #43 handoff. The current checked-out repository and fresh validator results always take precedence over historical prose.

## Read first

1. `AGENTS.md` (preserve its Next.js-managed block), then `README.md`, `STYLE_GUIDE.md`, and `CONTENT_STRATEGY.md`.
2. `CLAUDE.md` remains an `@AGENTS.md` pointer.
3. Inspect `lib/guides.ts` and current routes before modifying or regenerating the registry. **Never replace it from an older snapshot.**

## Current project state

- **52 registered guides: 49 English, 3 Spanish.** Guide #52: `/guides/portable-power-station-shuts-off-with-battery-left`. Guide #51: `/guides/ethernet-stuck-at-100-mbps`.
- Guide #52 is **locally validated and visually reviewed**; production publication, sitemap appearance, and IndexNow acceptance have **not been confirmed in this handoff**. Do not claim 52 are live until verified.
- User ran `npm run validate-guides`, `npm run lint`, `npm run build`, and `npm run check-guide-links -- --guide portable-power-station-shuts-off-with-battery-left`: all passed. Three source URLs returned HTTP 200; guide route was included in static build. PDF reviewed (9 pages). Interactive branch and clipboard behavior still require browser confirmation before publishing.
- Cluster memberships from latest validation: automotive-efficiency 6; career-compensation 6; home-energy 5; home-selling 5; purchase-financing 4; technology-connectivity 4; auto-buying-financing 3; data-storage-backup 3; home-backup 3; household-cost-decisions 2. Singleton warnings may occur; don't force unrelated guides together.
- English routes: `app/guides/<slug>/page.tsx`. Spanish: `app/es/guides/<slug>/page.tsx`. Registry `lib/guides.ts` is authoritative for metadata, `clusters`, and `lastModified`; related guides are cluster-driven.
- Next.js 16.3, React 19, TypeScript, Tailwind, Vercel; canonical host `https://www.northwardmeridian.com`; Cloudflare is DNS-only.
- Keep substantive revision dates accurate. In particular, **idling** (`idle-or-turn-car-off-fuel-efficiency`) and **changing jobs** (`how-much-raise-changing-jobs-worth-it`) were revised November 18, 2026; don't revert their `lastModified` to earlier dates.

## Publishing / validation (required)

1. Research actual search intent, existing SERPs/tools, overlap, authoritative evidence, maintenance burden, and a differentiated user task before creating a guide. Do not mistake Reddit interest for measured Google demand.
2. Implement guide and optional client-side checker; preserve all registry entries and dates. Use meaningful existing clusters or introduce a new one only with a clear relationship.
3. Test calculations/diagnostic branches, default/unknown states, warnings, critical scenarios, accessibility, clipboard behavior, and mobile layout; review a complete rendered page/PDF.
4. Run `npm run validate-guides`, `npm run lint`, `npm run build`.
5. Run `npm run check-guide-links -- --guide <slug>` before publication. Follow redirects; **404/410** are definite failures to investigate; **403/timeouts** require manual browser checks; **200 does not prove factual support**. Confirm source-to-claim fit. When repairing a URL, search all page and calculator files for duplicates. Run full `npm run check-guide-links` periodically, especially before handoffs.
6. Review `git status`; stage only intended files, commit and push. Verify Vercel production page, tool functionality, canonical URL, and `/sitemap.xml` **after deployment**.
7. Submit new or substantively revised canonical URLs to IndexNow **after deployment**: `npm run indexnow -- --url /guides/<slug>` (or Spanish equivalent). Use `--dry-run` first if needed. HTTP 200/202 means accepted, **not indexed**. Do not routinely resubmit the entire sitemap.
8. Track Search Console page/query impressions, clicks, CTR, positions, indexing, and GA4 engagement. Small samples do not establish success; privacy-sensitive tool inputs should not be sent to analytics.

## Lessons and preferences

- Prefer narrow problems that can be *resolved* with a concise decision tree, compatibility reference, or tested calculator rather than a generic long article. No obligation to publish another guide if evidence is weak.
- Technical checkers should distinguish measured facts from hypotheses; don't promise diagnosis or override equipment protections. For battery equipment, warn against opening packs, bypassing protections, or relying on unsupported critical-load configurations.
- Client-side copied diagnostic summaries should be visible before copying, user-initiated, and free of identifying information. Verify clipboard failure behavior.
- Avoid unescaped apostrophes/quotes in JSX text (`react/no-unescaped-entities`); avoid `react-hooks/refs` violations. Test text entry, dependent constraints, and responsive cards.
- `scripts/validate-guides.mjs` dynamically discovers clusters; **do not invent a cluster allowlist**. Singleton warnings are informational. Run the actual validator instead of estimating guide counts.
- Historical IndexNow TLS issue on Windows Node 24 was addressed with `NODE_USE_SYSTEM_CA=1`; never disable TLS verification.

## Immediate next task

If Guide #52 is not yet published, confirm browser diagnostic branches and Copy Diagnostic Summary, then commit/push the intended guide and registry files, verify production and sitemap, and submit its canonical URL via IndexNow. After that, verify the six handoff docs are committed. Guide #53 should be selected using competitive evidence and existing search performance, not automatically generated.
