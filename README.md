# Northward Meridian

Northward Meridian is a decision-guide website designed to help people make complicated everyday decisions using evidence, math, practical frameworks, and decision tools.

The site is not a traditional chronological blog.

Each guide is built around a concrete decision or question such as:

- Is X worth it?
- Should I do X or Y?
- Does X actually save money?
- Should I repair or replace X?
- Should I pay for X?
- When does X make financial sense?
- Does X actually improve Y?

The subject matter can span multiple sectors. The unifying niche is the type of query: a person has a real decision, meaningful tradeoffs exist, and research or analysis can help them make it.

---

## Tech Stack

Northward Meridian currently uses:

- Next.js 16
- TypeScript
- React
- Tailwind CSS
- Vercel
- Cloudflare
- Google Analytics / GA4
- Google Search Console
- Bing Webmaster Tools
- IndexNow

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Guide Architecture

Published guides live under:

```text
app/guides/
```

Shared article components live under:

```text
app/components/article/
```

The canonical guide metadata registry is:

```text
lib/guides.ts
```

Guide-level metadata belongs in `lib/guides.ts`, including:

- slug
- title
- description
- category
- href
- tags
- published
- relatedSlugs
- updated
- readingTime
- recommendedFor
- bottomLine

Do not duplicate these values inside individual `page.tsx` files.

Page-specific content remains inside the guide page, including:

- article copy
- guide sections
- scenarios
- calculator assumptions
- checklist items
- questions
- sources
- structured content

Guide pages should retrieve their registry entry with `getGuideBySlug()` rather than defining a second local guide metadata object.

---

## Current Guide System

Newer Northward Meridian guides generally use components such as:

- `GuideLayout`
- `GuidedEntry`
- `GuideSection`
- `GuidePrimitives`
- `WhyThisMatters`
- `DecisionChecklist`
- `QuestionsToAsk`
- `KeyTakeaways`
- `Sources`
- `RelatedDecisions`

Custom calculators or decision checks are added when they materially improve the decision.

Older article components still exist and may remain in use by older pages. Do not remove or refactor them simply because a newer architecture exists.

Publishing useful guides currently takes priority over broad architecture cleanup.

---

## Typical Guide Flow

A recent Northward Meridian guide will often follow this general structure:

```text
GuideLayout
↓
GuidedEntry
↓
Calculator or decision check, when useful
↓
WhyThisMatters / short answer
↓
Research-backed GuideSections
↓
Real-world scenarios
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

This is not a rigid template.

The structure should serve the decision rather than forcing every guide into an identical format.

---

## The Meridian Framework

The Meridian Framework is Northward Meridian's general approach to helping a reader move from uncertainty toward a decision.

The exact implementation may vary by guide, but the underlying process is:

1. Understand the decision.
2. Identify the variables that matter.
3. Evaluate the evidence and tradeoffs.
4. Determine which conditions favor each option.
5. Give the reader a practical path to act.

Calculators, decision checks, scenarios, questions, and checklists are tools used within this broader framework.

The framework should not force a predetermined recommendation. Its purpose is to expose the variables that change the answer.

---

## Calculators and Decision Tools

Calculators are an important Northward Meridian differentiation strategy.

Do not create a calculator merely because a topic can technically support one.

A calculator should expose variables that materially change the decision.

A useful calculator generally contains:

```text
Inputs
↓
Result metrics
↓
Interpretation
↓
Break-even point or decision threshold, when useful
↓
Important caveats
```

Calculators should not imply greater precision than the underlying evidence supports.

Decision checks, scorecards, comparison tools, and decision trees may be more appropriate than numeric calculators for some guides.

---

## Related Guides

Related-guide relationships are controlled by:

```text
relatedSlugs
```

inside:

```text
lib/guides.ts
```

Only link genuinely related decisions.

Do not create placeholder or future slugs simply to populate the related-guides section.

When two published guides have a meaningful relationship, make the relationship reciprocal when appropriate.

---

## Creating a New Guide

Do not begin with:

> What article should we write?

Begin by identifying candidate decisions.

The standard workflow is:

1. Research several candidate decision queries.
2. Examine actual search intent and current search results.
3. Compare competition and the quality of existing answers.
4. Determine whether Northward Meridian can provide meaningful additional value.
5. Verify that authoritative sources are available.
6. Determine whether a calculator, check, scorecard, comparison, or decision tree would improve the answer.
7. Select the strongest opportunity.
8. Research the topic using authoritative sources.
9. Design and test the calculator or decision tool, if applicable.
10. Add the guide metadata to `lib/guides.ts`.
11. Build the guide using the existing article architecture.
12. Add legitimate `relatedSlugs` relationships.
13. Add the guide to `app/sitemap.ts`.
14. Run project validation.
15. Review the rendered guide.
16. Deploy.
17. Confirm the live page and sitemap.
18. Submit/request indexing when appropriate.
19. Monitor Search Console data after publication.

See `CONTENT_STRATEGY.md` for the guide-selection methodology.

---

## Validation

Before committing or deploying guide changes, run:

```bash
npm run validate-guides
npm run lint
npm run build
```

All three should pass.

The guide validator checks relationships between the guide registry and route structure, including duplicate slugs/hrefs, unresolved related guides, and missing routes.

Do not bypass validation simply to publish faster.

---

## Sitemap

The sitemap is currently maintained separately from `lib/guides.ts`.

Every new guide therefore requires an entry in:

```text
app/sitemap.ts
```

Do not assume registering a guide in `lib/guides.ts` automatically adds it to the sitemap.

This may eventually be automated, but it is currently part of the publishing checklist.

---

## Sources

Northward Meridian prioritizes authoritative primary sources.

Examples include:

- government agencies
- regulators
- manufacturers
- official documentation
- research organizations
- academic research
- technical standards
- original datasets

Secondary sources can provide useful context but should not replace stronger primary evidence when primary sources are available.

Never fabricate sources or URLs.

Research current information before making claims that can change over time.

---

## Code Quality Notes

### Guide Metadata

Do not reintroduce duplicated guide metadata inside individual pages.

Use the central registry.

### TSX Quotation Marks

Pay particular attention to apostrophes, contractions, possessives, and quoted phrases inside TypeScript/TSX strings.

Do not solve apostrophe problems by replacing them with incorrect quotation marks.

### Citation Artifacts

Never paste ChatGPT/internal citation markup into source code.

Source files should never contain artifacts such as:

```text
:contentReference
oaicite
{index = ...}
```

Sources displayed on the site should use normal verified URLs through the site's source components.

---

## Editorial Documentation

Three documents govern different parts of Northward Meridian:

### `README.md`

Technical architecture, development workflow, and publishing process.

### `STYLE_GUIDE.md`

How Northward Meridian guides should be researched, written, structured, and presented.

### `CONTENT_STRATEGY.md`

How guide opportunities, sectors, topic clusters, Search Console signals, and future localization should be evaluated.

Keep these responsibilities separate so that implementation details, editorial standards, and portfolio strategy do not become conflated.

---

## Current Development Philosophy

Prefer publishing useful, differentiated decision guides over unnecessary infrastructure work.

Refactor when there is a concrete reason.

Do not redesign working systems merely because a cleaner abstraction is possible.

The long-term advantage of Northward Meridian should come primarily from:

- useful decision-focused search intent
- strong research
- primary sourcing
- transparent reasoning
- original calculations
- practical decision tools
- interconnected topic clusters
- continuous improvement using real search data