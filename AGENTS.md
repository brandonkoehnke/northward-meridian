<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Northward Meridian repository guidance (maintained)

Before changing guide architecture or generating a new guide, read `README.md`, `STYLE_GUIDE.md`, `CONTENT_STRATEGY.md`, and the current `HANDOFF.md`. The existing Next.js-managed block above must remain intact; consult installed Next.js documentation as instructed there.

- `lib/guides.ts` is the guide metadata source of truth. English routes use `/guides/`; Spanish routes use `/es/guides/`. Respect locale-aware validation and meaningful cluster relationships.
- Keep one-off calculators with their guide; use shared article components for common layout.
- Avoid ref reads captured by field arrays during render (`react-hooks/refs`); keep input state editable and apply dependent caps on blur, not every keystroke.
- Run `npm run validate-guides`, `npm run lint`, and `npm run build`; check external sources and test calculator scenarios and layout before committing.
- Deployment is via Vercel. IndexNow notifications are manual **after** deployment, via `npm run indexnow -- --url /guides/<slug>` (or `/es/guides/<slug>`). Do not notify pre-deployment or resubmit all URLs routinely.
- Do not infer search success from impressions or IndexNow HTTP 200 alone. Current strategy prioritizes researched, specific underserved decisions and avoids duplicating existing guides.

## Current release guardrails (November 2026)

- As of the latest local validation: **52 registered guides (49 English, 3 Spanish)**. Verify the registry before each edit; do not overwrite `lib/guides.ts` from an old generated file or revert existing `lastModified` dates.
- Before publishing run `npm run check-guide-links -- --guide <slug>` in addition to validation, lint, and build. HTTP 404/410 needs repair; HTTP 403/timeouts need manual review; HTTP 200 alone does not validate the claim. Periodically run `npm run check-guide-links` across all guides.
- Inspect and test interactive diagnostic branches, copied summaries, and mobile layout; verify deployed page/sitemap before manual IndexNow submission.
