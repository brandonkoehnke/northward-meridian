# Northward Meridian

Northward Meridian is a decision-guide website designed to help people make practical real-world decisions using research, evidence, math, and useful decision tools.

The site is not organized around a single subject such as homeownership, automotive, technology, travel, or personal finance.

The unifying niche is the type of question:

- Is X worth it?
- Should I do X or Y?
- Does X actually save money?
- Should I repair or replace X?
- Should I pay for X?
- When does X make financial sense?
- Does X actually improve Y?

A Northward Meridian guide should address a concrete decision with meaningful tradeoffs and provide a useful framework for making that decision.

---

## Tech Stack

Northward Meridian currently uses:

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Vercel
- Cloudflare
- Google Analytics / GA4
- Google Search Console
- Bing Webmaster Tools
- IndexNow

---

## Project Structure

Important project locations:

```text
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
└── validate-guides.mjs
```

### Shared article components

Components intended for use across many guides belong in:

```text
app/components/article/
```

Examples include:

- `GuideLayout`
- `GuidedEntry`
- `GuideSection`
- `DecisionChecklist`
- `QuestionsToAsk`
- `KeyTakeaways`
- `Sources`
- `RelatedDecisions`

### Guide-specific components

New components that exist only for one guide should generally be colocated with that guide.

Example:

```text
app/guides/is-a-water-softener-worth-it/
├── page.tsx
└── WaterSoftenerPaybackCheck.tsx
```

The page can then import the component locally:

```tsx
import WaterSoftenerPaybackCheck from "./WaterSoftenerPaybackCheck";
```

All current guide-specific calculators and decision checks are colocated with their owning guide.

The convention is:

> Shared across guides → `app/components/article/`  
> Specific to one guide → colocate with that guide

---

## Guide Registry

The canonical guide metadata registry is:

```text
lib/guides.ts
```

Guide-level metadata belongs there rather than being duplicated inside individual `page.tsx` files.

Current guide metadata includes fields such as:

- `slug`
- `title`
- `description`
- `category`
- `href`
- `tags`
- `published`
- `relatedSlugs`
- `updated`
- `lastModified`
- `readingTime`
- `recommendedFor`
- `bottomLine`

Guide pages retrieve their metadata from the registry.

Typical pattern:

```tsx
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

Do not reintroduce separate guide metadata objects inside individual guide pages.

---

## What Stays Inside Each Guide

Content specific to an individual decision belongs in that guide's `page.tsx`.

Examples include:

- section definitions
- Guided Entry scenarios
- article copy
- decision scenarios
- checklist items
- questions to ask
- sources
- structured data
- guide-specific explanations

The registry contains shared metadata, not the entire article.

---

## Standard Guide Architecture

Recent guides generally follow this progression:

```text
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

Every current published guide includes a purpose-built interactive tool. Use a Calculator when quantitative modeling is appropriate and a Decision Check when conditional assessment is more appropriate.

A guide should not include an article section merely because another guide includes one.

---

## Calculators and Decision Tools

Interactive tools are an important part of Northward Meridian's differentiation.

A calculator should expose variables that materially affect the decision.

Useful calculator patterns include:

```text
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

Calculators should not imply more precision than the underlying evidence supports.

When a variable cannot be estimated responsibly, either:

1. allow the reader to enter their own assumption,
2. present it separately as a qualitative factor, or
3. leave it out of the model.

Do not invent precise assumptions simply to make a calculator more complete.

---

## Sources

Prefer authoritative primary sources whenever practical.

Examples include:

- government agencies
- regulators
- universities and extension programs
- manufacturers for product specifications
- technical standards organizations
- academic research
- official program documentation

Secondary sources can be useful for:

- identifying questions consumers are asking
- understanding the existing search landscape
- finding potential research directions
- providing context

Core factual claims should use stronger sources when those sources are available.

---

## Related Decisions

Related-guide relationships are controlled by:

```text
relatedSlugs
```

in:

```text
lib/guides.ts
```

Only create relationships that are genuinely useful to the reader.

Do not add unrelated guides simply to populate the Related Decisions section.

When no meaningful related guide exists, the site can fall back to directing the reader to the broader guide library.

---

## Sitemap

The sitemap is generated by:

```text
app/sitemap.ts
```

Published guide entries are derived automatically from:

```text
lib/guides.ts
```

Do not manually duplicate individual guide URLs in `app/sitemap.ts`.

When adding or materially updating a guide, maintain its `lastModified` value in the guide registry. Published guides are then included automatically in the sitemap.

---

## Guide Validation

Northward Meridian includes:

```text
scripts/validate-guides.mjs
```

The validator checks important registry and routing relationships, including:

- registered guide count
- duplicate slugs
- duplicate hrefs
- href/slug consistency
- whether `relatedSlugs` resolve
- whether registered guides have corresponding route folders
- whether guide route folders are represented in the registry

The validator intentionally uses plain JavaScript / ESM and does not require additional TypeScript execution dependencies.

---

## Required Checks

Before committing guide or architecture changes, run:

```bash
npm run validate-guides
npm run lint
npm run build
```

All three should pass.

For guides with calculators or other interactive tools, also test representative scenarios manually before publishing.

For substantial new guides, visual review of the complete rendered page is part of the normal QA process.

---

## New Guide Workflow

The normal publishing workflow is:

```text
1. Research candidate decisions
2. Evaluate search intent and competition
3. Select the decision
4. Research authoritative sources
5. Design the calculator or decision check
6. Build and test the tool inside the guide directory
7. Build the guide
8. Register the guide in lib/guides.ts, including lastModified
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

---

## Deployment

The production site is:

```text
https://northwardmeridian.com
```

The application is deployed through Vercel.

Code is maintained in Git, and pushing the production branch triggers the deployment workflow.

Cloudflare is also part of the site's infrastructure.

After deployment, verify the live page rather than assuming a successful Git push means the production page is correct.

---

## Search and Analytics

Northward Meridian currently uses:

- Google Search Console
- Google Analytics / GA4
- Bing Webmaster Tools
- IndexNow

Search Console data should increasingly inform guide selection as the site accumulates impressions and query data.

The long-term feedback loop is:

```text
publish
→ index
→ collect query data
→ identify signals
→ improve winners
→ build adjacent guides
→ strengthen internal links
→ repeat
```

See `CONTENT_STRATEGY.md` for the broader explore-vs.-exploit strategy and long-term sector and multilingual plans.

---

## Editorial Documentation

The main project documents serve different purposes:

### `README.md`

How the project is structured and operated.

### `STYLE_GUIDE.md`

How Northward Meridian guides should be written and presented.

### `CONTENT_STRATEGY.md`

How topics, sectors, clusters, and future expansion should be selected.

### Meridian framework documentation

The underlying decision methodology used to turn a real-world question into a useful evidence-backed decision guide.

These documents should complement one another rather than duplicate the same instructions.

---

## Current Development Principle

Northward Meridian should prioritize publishing high-quality decision guides over unnecessary architectural work.

Refactor when there is a concrete benefit to:

- maintainability
- reliability
- consistency
- performance
- search visibility
- reader experience

Do not refactor working systems solely because a different structure would be marginally cleaner.

The project should become more systematic as it scales without allowing architecture work to replace the core objective:

> Build genuinely useful decision resources, measure what earns search visibility, and expand intelligently from the evidence.