# Northward Meridian

Northward Meridian is a decision-guide website designed to help people
make practical real-world decisions using research, evidence, math, and
useful decision tools.

The site is not organized around a single subject such as homeownership,
automotive, technology, travel, or personal finance.

The unifying niche is the type of question:

-   Is X worth it?
-   Should I do X or Y?
-   Does X actually save money?
-   Should I repair or replace X?
-   Should I pay for X?
-   When does X make financial sense?
-   Does X actually improve Y?

A Northward Meridian guide should address a concrete decision with
meaningful tradeoffs and provide a useful framework for making that
decision.

------------------------------------------------------------------------

## Tech Stack

Northward Meridian currently uses:

-   Next.js 16
-   React
-   TypeScript
-   Tailwind CSS
-   Vercel
-   Cloudflare (DNS only; Vercel serves site)
-   Google Analytics / GA4
-   Google Search Console
-   Bing Webmaster Tools
-   IndexNow

------------------------------------------------------------------------

## Project Structure

Important project locations:

``` text
app/
├── components/
│   └── article/
│       ├── GuideLayout.tsx
│       ├── GuidedEntry.tsx
│       ├── GuideSection.tsx
│       ├── GuidePrimitives.tsx
│       ├── DecisionChecklist.tsx
│       ├── QuestionsToAsk.tsx
│       ├── KeyTakeaways.tsx
│       ├── Sources.tsx
│       ├── RelatedDecisions.tsx
│       └── WhyThisMatters.tsx
│
├── guides/
│   ├── [guide-slug]/
│   │   ├── page.tsx
│   │   └── [guide-specific components when appropriate]
│   └── ...
│
└── sitemap.ts

lib/
└── guides.ts

scripts/
├── validate-guides.mjs
├── check-source-links.mjs   # if present in checkout
└── submit-indexnow.mjs
```

### Shared article components

Components intended for use across many guides belong in:

``` text
app/components/article/
```

Examples include:

-   `GuideLayout`
-   `GuidedEntry`
-   `GuideSection`
-   `DecisionChecklist`
-   `QuestionsToAsk`
-   `KeyTakeaways`
-   `Sources`
-   `RelatedDecisions`

### Guide-specific components

New components that exist only for one guide should generally be
colocated with that guide.

Example:

``` text
app/guides/is-a-water-softener-worth-it/
├── page.tsx
└── WaterSoftenerPaybackCheck.tsx
```

The page can then import the component locally:

``` tsx
import WaterSoftenerPaybackCheck from "./WaterSoftenerPaybackCheck";
```

All current guide-specific calculators and decision checks are colocated
with their owning guide.

The convention is:

> Shared across guides → `app/components/article/`\
> Specific to one guide → colocate with that guide

------------------------------------------------------------------------

## Guide Registry

The canonical guide metadata registry is:

``` text
lib/guides.ts
```

Guide-level metadata belongs there rather than being duplicated inside
individual `page.tsx` files.

Current guide metadata includes fields such as:

-   `slug`
-   `title`
-   `description`
-   `category`
-   `href`
-   `tags`
-   `published`
-   `clusters`
-   `updated`
-   `lastModified`
-   `readingTime`
-   `recommendedFor`
-   `bottomLine`

Guide pages retrieve their metadata from the registry.

Typical pattern:

``` tsx
const guide = (() => {
    const found = getGuideBySlug(
        "guide-slug",
    );

    if (!found) {
        throw new Error(
            "Guide not found: guide-slug",
        );
    }

    return found;
})();
```

Do not reintroduce separate guide metadata objects inside individual
guide pages.

------------------------------------------------------------------------

## What Stays Inside Each Guide

Content specific to an individual decision belongs in that guide's
`page.tsx`.

Examples include:

-   section definitions
-   Guided Entry scenarios
-   article copy
-   decision scenarios
-   checklist items
-   questions to ask
-   sources
-   structured data
-   guide-specific explanations

The registry contains shared metadata, not the entire article.

------------------------------------------------------------------------

## Standard Guide Architecture

Recent guides generally follow this progression:

``` text
GuideLayout
↓
GuidedEntry
↓
guide-specific calculator or decision check
↓
WhyThisMatters
↓
research-backed GuideSections
↓
real-world scenarios
↓
DecisionChecklist
↓
QuestionsToAsk
↓
KeyTakeaways
↓
Sources
↓
RelatedDecisions
```

This is a useful default, not a rigid template.

The structure should serve the decision.

Every current published guide includes a purpose-built interactive tool.
Use a Calculator when quantitative modeling is appropriate and a
Decision Check when conditional assessment is more appropriate.

A guide should not include an article section merely because another
guide includes one.

------------------------------------------------------------------------

## Calculators and Decision Tools

Interactive tools are an important part of Northward Meridian's
differentiation.

A calculator should expose variables that materially affect the
decision.

Useful calculator patterns include:

``` text
Inputs
↓
Result metrics
↓
Interpretation
↓
Break-even / decision threshold when appropriate
↓
Important caveats
```

Calculators should not imply more precision than the underlying evidence
supports.

When a variable cannot be estimated responsibly, either:

1.  allow the reader to enter their own assumption,
2.  present it separately as a qualitative factor, or
3.  leave it out of the model.

Do not invent precise assumptions simply to make a calculator more
complete.

------------------------------------------------------------------------

## Sources

Prefer authoritative primary sources whenever practical.

Examples include:

-   government agencies
-   regulators
-   universities and extension programs
-   manufacturers for product specifications
-   technical standards organizations
-   academic research
-   official program documentation

Secondary sources can be useful for:

-   identifying questions consumers are asking
-   understanding the existing search landscape
-   finding potential research directions
-   providing context

Core factual claims should use stronger sources when those sources are
available.

------------------------------------------------------------------------

## Related Decisions

Related-guide relationships are controlled by:

``` text
clusters
```

in:

``` text
lib/guides.ts
```

A guide can belong to one or more clusters.

`getRelatedGuides()` automatically returns other published guides that
share at least one cluster with the current guide and excludes the
current guide itself. Reciprocal relationships therefore do not need to
be maintained manually.

Example:

``` ts
clusters: ["home-selling"],
```

Every published guide in the `home-selling` cluster can automatically
surface the other published guides in that cluster.

Use:

``` ts
clusters: [],
```

when a guide does not currently have a meaningful cluster relationship.

Only create clusters that represent genuine editorial relationships. Do
not create a generic `misc` cluster merely to populate Related
Decisions, and do not group guides together simply because they share a
broad category.

A guide may belong to multiple clusters when there is a genuine overlap.

Current cluster names include:

-   `purchase-financing`
-   `home-selling`
-   `automotive-efficiency`
-   `home-energy`
-   `data-storage-backup`

When no meaningful related guide exists, the site can direct the reader
to the broader guide library.

------------------------------------------------------------------------

## Sitemap

The sitemap is generated by:

``` text
app/sitemap.ts
```

Published guide entries are derived automatically from:

``` text
lib/guides.ts
```

Do not manually duplicate individual guide URLs in `app/sitemap.ts`.

When adding or materially updating a guide, maintain its `lastModified`
value in the guide registry. Published guides are then included
automatically in the sitemap.

------------------------------------------------------------------------

## Guide Validation

Northward Meridian includes:

``` text
scripts/validate-guides.mjs
```

The validator checks important registry and routing relationships,
including:

-   registered guide count
-   duplicate slugs
-   duplicate hrefs
-   href/slug consistency
-   whether every guide has a valid `clusters` array
-   duplicate cluster assignments within a guide
-   whether legacy `relatedSlugs` references are absent
-   whether registered guides have corresponding route folders
-   whether guide route folders are represented in the registry

The validator intentionally uses plain JavaScript / ESM and does not
require additional TypeScript execution dependencies.

------------------------------------------------------------------------

## Required Checks

Before committing guide or architecture changes, run:

``` bash
npm run validate-guides
npm run lint
npm run build
```

All three should pass.

For guides with calculators or other interactive tools, also test
representative scenarios manually before publishing.

For substantial new guides, visual review of the complete rendered page
is part of the normal QA process.

------------------------------------------------------------------------

## New Guide Workflow

The normal publishing workflow is:

``` text
1. Research candidate decisions
2. Evaluate search intent and competition
3. Select the decision
4. Research authoritative sources
5. Design the calculator or decision check
6. Build and test the tool inside the guide directory
7. Build the guide
8. Register the guide in lib/guides.ts, including `clusters` and `lastModified`
9. Run validate-guides
10. Run lint
11. Run build
12. Perform visual QA
13. Test calculator/check scenarios
14. Commit and push
15. Verify the production deployment
16. Verify the live sitemap
17. Allow search engines to discover/index the page
```

Do not sacrifice research or QA merely to increase guide count.

------------------------------------------------------------------------

## Deployment

The production site is:

``` text
https://www.northwardmeridian.com
```

The application is deployed through Vercel.

Code is maintained in Git, and pushing the production branch triggers
the deployment workflow.

Cloudflare is also part of the site's infrastructure.

After deployment, verify the live page rather than assuming a successful
Git push means the production page is correct.

------------------------------------------------------------------------

## Search and Analytics

Northward Meridian currently uses:

-   Google Search Console
-   Google Analytics / GA4
-   Bing Webmaster Tools
-   IndexNow

Search Console data should increasingly inform guide selection as the
site accumulates impressions and query data.

The long-term feedback loop is:

``` text
publish
→ index
→ collect query data
→ identify signals
→ improve winners
→ build adjacent guides
→ strengthen internal links
→ repeat
```

See `CONTENT_STRATEGY.md` for the broader explore-vs.-exploit strategy
and long-term sector and multilingual plans.

------------------------------------------------------------------------

## Editorial Documentation

The main project documents serve different purposes:

### `README.md`

How the project is structured and operated.

### `STYLE_GUIDE.md`

How Northward Meridian guides should be written and presented.

### `CONTENT_STRATEGY.md`

How topics, sectors, clusters, and future expansion should be selected.

### Meridian framework documentation

The underlying decision methodology used to turn a real-world question
into a useful evidence-backed decision guide.

These documents should complement one another rather than duplicate the
same instructions.

------------------------------------------------------------------------



---

## Current implementation snapshot (October 28, 2026)

The last confirmed production inventory is **43 guides: 40 English and 3 Spanish**. Guide #43 is **Is a Professional Certification Worth It?**; the next guide has not been selected. Do not treat this snapshot as a substitute for checking `lib/guides.ts` and the current validator output.

### Language-aware guide routing

- English guide pages: `app/guides/<slug>/page.tsx`, with href `/guides/<slug>`.
- Spanish guide pages: `app/es/guides/<slug>/page.tsx`, with href `/es/guides/<slug>`.
- Spanish index/home: `/es`; the three existing Spanish guides form an auto-buying/financing family.
- `scripts/validate-guides.mjs` was updated to accept and check locale-aware hrefs and route directories. It verifies registry-to-route consistency separately for English and Spanish. Do not revert to an English-only expected-href rule.
- Related Decisions use meaningful shared `clusters`; locale boundaries must be respected in displayed recommendations. Verify actual locale filtering in the current code before changing it.
- Spanish source links should preferably be accessible and useful to Spanish-language readers; an English-language primary source is acceptable when necessary, but do not silently imply it is Spanish.

### Newer guide and tool conventions

Recent additions include Career decision guides on job-change raises, freelance hourly rates, fixed vs. unlimited PTO, remote-work value, and certification ROI; Automotive Maintenance includes DIY oil-change savings. Confirm exact cluster IDs from the current registry rather than inferring them from editorial categories.

- Use top-aligned grid fields (`items-start` and field wrappers without `justify-end`) when some inputs have notes; check multiline-label alignment visually.
- Do not put ref-reading functions in a field descriptor array mapped during render: React `react-hooks/refs` may reject the pattern. Use event-only handlers and lint-compatible analytics tracking. For the certification tool, `useState` replaced `useRef` for one-time-start tracking.
- For dependent numeric limits (such as employer reimbursement <= initial expenses), allow uninterrupted typing; normalize on `onBlur`, while calculations use a safe effective capped value. Test retyping, blank values, negative/zero values, and changing parent values.
- Separate cash savings from optional valuation of time. Label conditional payback and probability-weighted scenarios explicitly; do not treat them as forecasts.
- Verify calculator output *and wording* against independently calculated scenarios, including adverse cases. Lint/build do not replace visual and functional QA.

### Source-link checking

A `scripts/check-source-links.mjs` utility was introduced during Guide #43 development. Confirm that the file exists in the local repository before using it. When present, run:

```bash
node scripts/check-source-links.mjs
```

Treat 403, rate limits, and timeouts as review items rather than proof of a dead link. Open external sources manually, particularly links that redirect or have moved. A broken IRS URL in the remote-work guide was corrected during development.

### IndexNow — operational, manual

Cloudflare currently provides **DNS only** for both apex and `www` CNAMEs; Vercel serves the site. Do not enable Cloudflare proxying merely for IndexNow.

- `public/64fdde9787544aa88891e8d479a801ad.txt` contains the matching key and is hosted at the canonical `www` domain.
- `scripts/submit-indexnow.mjs` and npm script `indexnow` support `--url`, `--all`, and `--dry-run`.
- On Windows, Node v24.19.0 needed `NODE_USE_SYSTEM_CA=1` to trust the certificate chain when fetching the deployed key/sitemap. This was set as a **User** environment variable; restart terminal/VS Code if it is not inherited. Never use `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- On October 28, 2026, `npm run indexnow -- --all` retrieved the live sitemap and the IndexNow API returned **HTTP 200 for 48 URLs**, including 43 guides and five non-guide pages. A single-guide submission previously returned HTTP 202.
- HTTP 200/202 confirms acceptance of a notification, **not crawling, indexing, ranking, or clicks**. Verify those independently in Bing Webmaster Tools.
- The script is **manual**, not automatically triggered by Vercel. After a successful production deployment, notify only new or materially changed URLs:

```bash
npm run indexnow -- --url /guides/your-new-guide --dry-run
npm run indexnow -- --url /guides/your-new-guide
```

For a Spanish page, use `/es/guides/<slug>`. Avoid routine `--all` resubmission after every deployment. Keep the sitemap as the primary complete URL inventory.

### Updated publishing checklist

1. Research a specific decision query and compare actual search results; check overlap with existing pages.
2. Build the guide, registry entry, and tool with credible sources and explicit assumptions.
3. Run `npm run validate-guides`, `npm run lint`, and `npm run build`.
4. Run source-link checks where available, manually inspect external links, and test calculator edge cases and rendered layout.
5. Commit and push; verify the **live** Vercel deployment and sitemap.
6. Submit the new or materially changed canonical URL through IndexNow **after** deployment.
7. Monitor GSC, Bing Webmaster Tools, and GA4 without treating small samples as proof of traction.

## Current Development Principle

Northward Meridian should prioritize publishing high-quality decision
guides over unnecessary architectural work.

Refactor when there is a concrete benefit to:

-   maintainability
-   reliability
-   consistency
-   performance
-   search visibility
-   reader experience

Do not refactor working systems solely because a different structure
would be marginally cleaner.

The project should become more systematic as it scales without allowing
architecture work to replace the core objective:

> Build genuinely useful decision resources, measure what earns search
> visibility, and expand intelligently from the evidence.
