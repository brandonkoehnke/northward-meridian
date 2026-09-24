# Northward Meridian Style Guide

This document defines how Northward Meridian decision guides should be researched, written, structured, and presented.

It is an editorial and UX guide.

For repository structure and development workflow, see `README.md`.

For topic selection, sector strategy, Search Console feedback, and multilingual strategy, see `CONTENT_STRATEGY.md`.

---

# 1. CORE EDITORIAL PURPOSE

Northward Meridian is a decision-guide website.

It does not primarily publish:

- general explainers
- news
- opinion pieces
- generic listicles
- product roundups
- keyword-driven filler
- articles written simply because a topic receives search volume

A Northward Meridian guide should help someone make a concrete real-world decision.

Typical questions include:

- Is X worth it?
- Should I do X or Y?
- Does X actually save money?
- Should I repair or replace X?
- Should I pay for X?
- When does X make financial sense?
- Does X actually improve Y?
- What variables determine whether X is worthwhile?

The central editorial question is:

> What would someone need to know, calculate, compare, or verify to make this decision intelligently?

---

# 2. THE DECISION COMES BEFORE THE ARTICLE

Do not begin by asking:

> What should this article say?

Begin by asking:

> What decision is the reader trying to make?

Identify:

1. the decision,
2. the variables that materially change it,
3. the evidence needed to evaluate those variables,
4. the important tradeoffs,
5. the assumptions that cannot be known universally,
6. the actions the reader can take next.

The article exists to support that decision.

Word count is not a goal.

A guide should be as long as necessary to resolve the decision well and no longer.

---

# 3. THE MERIDIAN APPROACH

A strong Northward Meridian guide generally moves through this reasoning:

```text
QUESTION
↓
DECISION
↓
VARIABLES
↓
EVIDENCE
↓
TRADEOFFS
↓
MODEL / TOOL when useful
↓
SCENARIOS
↓
ACTION
```

The reader should leave understanding:

- what matters,
- what does not matter as much,
- what information they still need,
- how the variables interact,
- what the evidence supports,
- where uncertainty remains,
- and what to do next.

Do not replace a decision with a generic yes/no answer when the answer genuinely depends on the reader's circumstances.

---

# 4. STANDARD GUIDE ARCHITECTURE

Recent Northward Meridian guides generally use:

```text
GuideLayout
↓
GuidedEntry
↓
calculator / reality check when useful
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

This is a default architecture, not a mandatory template.

A guide should not contain a component simply because other guides contain it.

The structure should serve the decision.

---

# 5. GUIDE HERO AND DECISION SNAPSHOT

The top of the guide should orient the reader quickly.

The guide metadata supplies:

- category
- title
- description
- recommended audience
- reading time
- last updated
- bottom line

The title should usually state the decision directly.

Good:

```text
Is a Water Softener Worth It?
```

```text
Should I Use 0% Financing or Pay Cash?
```

```text
Does a Tonneau Cover Save Enough Gas to Pay for Itself?
```

Avoid vague titles such as:

```text
Everything You Need to Know About Water Softeners
```

or:

```text
The Ultimate Guide to 0% Financing
```

Northward Meridian titles should reflect decision intent.

---

# 6. THE BOTTOM LINE

The Decision Snapshot should give the reader a useful answer immediately.

The bottom line should:

- answer the real question,
- identify the variables that change the answer,
- avoid unsupported certainty,
- avoid withholding the conclusion merely to force the reader to continue,
- remain useful even if the reader reads nothing else.

Good bottom lines often follow this pattern:

```text
X can make sense when A, B, and C are true.
It is less compelling when D or E applies.
Compare F before deciding.
```

Do not reduce a conditional decision to an absolute answer merely because a stronger statement sounds more confident.

---

# 7. GUIDED ENTRY

`GuidedEntry` helps readers identify which part of the decision applies to them.

Typical scenarios might include:

```text
I received a quote.
I already have a problem.
I am comparing two options.
I am worried about operating cost.
I am preparing to sell.
I have a specific type of vehicle/home/system.
```

Each Guided Entry option should:

1. describe a recognizable situation,
2. explain why that situation matters,
3. direct the reader to the relevant section.

Avoid creating scenarios merely to fill the component.

---

# 8. WHY THIS DECISION MATTERS

`WhyThisMatters` should establish the decision logic.

It should explain:

- why the answer is not universal,
- which variables matter most,
- what common oversimplification should be avoided,
- and what the reader should evaluate.

Avoid generic introductions such as:

> Water softeners have become increasingly popular with homeowners.

or:

> In today's world, choosing the right storage solution is more important than ever.

Begin with the actual decision.

---

# 9. CALCULATOR PHILOSOPHY

Calculators and interactive checks are a major Northward Meridian differentiation strategy.

But not every guide needs one.

A calculator should exist when quantitative variables materially affect the decision.

Typical structure:

```text
INPUTS
↓
RESULT METRICS
↓
INTERPRETATION
↓
BREAK-EVEN / DECISION THRESHOLD when useful
↓
IMPORTANT CAVEAT
```

A calculator should reveal the structure of the decision rather than merely generate a number.

---

# 10. DO NOT CREATE FALSE PRECISION

A calculator must not imply more certainty than the evidence supports.

Do not invent assumptions simply because the model needs another variable.

When a value cannot be responsibly generalized:

1. let the reader enter it,
2. present it as a qualitative consideration,
3. provide a range only when the evidence supports a range,
4. or leave it out.

For example, do not assume universally that:

```text
a water softener extends a water heater by X years
```

unless strong evidence supports that exact assumption.

Instead, allow the reader to enter appliance savings if they have a reasonable basis for estimating them.

The calculator should be transparent about what is:

- measured,
- entered by the reader,
- derived mathematically,
- estimated,
- or intentionally excluded.

---

# 11. CALCULATOR DEFAULTS

Defaults should make the calculator understandable without pretending to represent every reader.

Defaults should be:

- plausible,
- easy to interpret,
- neutral where possible,
- replaceable by the reader.

Do not choose defaults that quietly steer the calculator toward a predetermined conclusion.

When possible, explain what the reader should replace with actual values.

---

# 12. INITIAL CALCULATOR STATE

Recent Northward Meridian calculators generally display example inputs immediately but do not display a decision result until the reader interacts.

The initial result area should say something similar to:

```text
Enter your numbers to see the result.
```

or:

```text
Adjust any input above to compare your options.
```

This prevents example defaults from appearing to be personalized advice.

---

# 13. CALCULATOR INTERPRETATION

Do not make readers interpret raw numbers without context.

After presenting result metrics, explain what the model means.

For example:

```text
One covered replacement would recover the protection cost under these assumptions.
```

or:

```text
The modeled NAS operating cost is already higher than the cloud subscription, so the system does not reach a simple hardware break-even under these assumptions.
```

Interpretation should remain conditional on the inputs.

Use language such as:

- under these assumptions,
- based on the numbers entered,
- modeled,
- estimated,
- simple payback,
- planning comparison.

Avoid implying that the model predicts the future.

---

# 14. NEGATIVE VALUES AND WORDING

The language surrounding a number must match its sign.

Do not display:

```text
-$27 in net annual savings
```

Prefer:

```text
$27 in net annual cost
```

Likewise:

```text
net savings of $500
```

versus:

```text
net cost of $500
```

Result wording should make the economic meaning immediately clear.

---

# 15. BREAK-EVEN CALCULATIONS

Break-even calculations should use the same underlying model as the primary result whenever possible.

Do not use a simplified shortcut that contradicts the calculator's actual simulation.

If the model says no positive break-even exists, say:

```text
No break-even
```

rather than returning:

- negative years,
- infinity,
- an arbitrary maximum,
- or a misleading threshold.

---

# 16. FINANCIAL MODELS

For financing, investment, or opportunity-cost calculations, model cash flows realistically.

Do not assume money remains invested for an entire period if the reader is spending it gradually.

Do not double-count:

- fees,
- discounts,
- retained cash,
- financing shortfalls,
- or opportunity cost.

When a financial model contains an important assumption, state it.

For regulated financial products, use authoritative sources such as:

- CFPB
- FTC
- Federal Reserve
- IRS
- state regulators

when applicable.

---

# 17. REALITY CHECKS VS. CALCULATORS

Not every interactive tool needs to produce a financial answer.

Use a **calculator** when the decision depends primarily on quantitative relationships.

Use a **reality check**, scorecard, decision tree, or structured comparison when:

- contract terms matter,
- qualitative conditions dominate,
- diagnosis must occur before economics,
- the evidence does not support precise numerical modeling.

The tool type should follow the decision.

---

# 18. RESEARCH AND EVIDENCE

Northward Meridian should prefer authoritative primary sources.

Strong source categories include:

- federal agencies
- state agencies
- regulators
- universities
- extension programs
- technical standards organizations
- manufacturers for specifications
- official program documentation
- academic research

Examples include:

```text
EPA
DOE
FTC
CFPB
IRS
NHTSA
CISA
USDA
state environmental agencies
university extension programs
manufacturer technical documentation
```

Secondary sources can still be useful for:

- discovering common consumer questions,
- understanding the SERP,
- identifying possible variables,
- comparing how others frame the decision.

Do not rely on affiliate or commercial publishers for core factual claims when stronger sources are available.

---

# 19. DISTINGUISH EVIDENCE FROM ASSUMPTION

A guide should make clear whether a statement is:

- established by a source,
- calculated from entered numbers,
- an example,
- a user-supplied assumption,
- or a judgment that depends on circumstances.

Avoid turning correlations, anecdotes, marketing claims, or survey observations into universal probabilities.

For example:

```text
25% of surveyed purchasers reported using coverage
```

does not automatically mean:

```text
Every buyer has a 25% probability of filing a claim.
```

Preserve the distinction.

---

# 20. CURRENT PRICES AND PROGRAM TERMS

Prices, benefits, tax rules, insurance terms, subscription tiers, regulations, and program requirements can change.

When using current values:

- identify the source,
- avoid presenting them as permanent,
- use the guide's update date,
- and make the calculator user-editable when practical.

Do not hard-code a current commercial price into the calculator when the reader can easily enter the price they are actually being offered.

---

# 21. PRODUCT AND CONTRACT TERMS

When a decision depends on a contract, warranty, insurance policy, financing offer, or protection plan:

> The actual contract controls.

The guide should identify:

- exclusions,
- limits,
- deductibles,
- reimbursement rules,
- expiration conditions,
- eligibility requirements,
- and costs that remain with the reader.

Do not rely solely on marketing language.

---

# 22. SAFETY AND DIAGNOSIS

For home, automotive, electrical, plumbing, appliance, and similar decisions, diagnosis may need to precede economics.

Do not recommend spending based on an unconfirmed failure.

Examples:

```text
A puddle near a water heater does not automatically prove the tank failed.
```

```text
A tire puncture does not automatically require tire replacement.
```

```text
Water-quality symptoms do not automatically mean a softener is the correct treatment.
```

When appropriate, explain what must be diagnosed or measured first.

Safety-critical conditions should be clearly separated from normal economic tradeoffs.

---

# 23. REAL-WORLD SCENARIOS

Scenarios should demonstrate how changing circumstances change the decision.

Good scenarios vary meaningful inputs such as:

- price,
- usage,
- condition,
- time horizon,
- household size,
- contract terms,
- risk exposure,
- maintenance burden,
- expected ownership period.

Do not write four scenarios that all produce the same conclusion.

The point is to show why the answer changes.

---

# 24. DECISION CHECKLIST

The checklist should help the reader gather the information needed before deciding.

Good checklist items are actions:

```text
Get the written quote.
Measure the water hardness.
Check the contract deductible.
Find the current vehicle value.
Verify the manufacturer's requirement.
Compare the complete installed cost.
```

Avoid vague checklist items such as:

```text
Think carefully.
Do your research.
Consider your options.
```

The checklist should reduce uncertainty.

---

# 25. QUESTIONS TO ASK

`QuestionsToAsk` should prepare the reader for a better conversation with:

- a contractor,
- retailer,
- insurer,
- lender,
- mechanic,
- service provider,
- manufacturer,
- or other relevant party.

Questions should uncover variables that affect the decision.

Examples:

```text
What exactly is included in this quote?
```

```text
Is reimbursement prorated or capped?
```

```text
How much water does a regeneration cycle use?
```

```text
What happens after the promotional period?
```

Avoid questions whose answers do not materially affect the decision.

---

# 26. KEY TAKEAWAYS

Key Takeaways should summarize the decision logic rather than repeat section headings.

A reader who skips directly to this section should understand:

- the most important variables,
- the major caveats,
- what the evidence supports,
- and what they should verify.

Avoid introducing major new claims in Key Takeaways.

---

# 27. RELATED DECISIONS

Only link genuinely related guides.

A related guide should plausibly represent another decision the same reader may be making.

Do not link two guides merely because:

- they were published consecutively,
- they share a broad category,
- the Related Decisions component looks empty.

When no legitimate relationship exists, allow the site to direct the reader back to the broader decision-guide library.

As clusters develop, reciprocal relationships should be added where appropriate.

---

# 28. WRITING STYLE

Northward Meridian should sound:

- practical
- measured
- analytical
- clear
- evidence-oriented
- confident where evidence is strong
- appropriately conditional where evidence is limited

Avoid:

- hype
- clickbait
- filler
- exaggerated certainty
- generic AI phrasing
- repetitive summaries
- unnecessary rhetorical questions
- excessive exclamation points
- fake quotations
- sales language

Prefer concrete language.

Instead of:

> There are many important factors to consider when deciding whether a NAS is right for you.

Write:

> The comparison depends on storage capacity, hardware cost, electricity, maintenance, backup requirements, and how long you expect to use the system.

---

# 29. DO NOT BURY THE ANSWER

Do not force readers through thousands of words before answering the question.

The guide should provide an early Bottom Line and then explain:

- why,
- under what conditions,
- and how the reader can apply it.

Northward Meridian is not designed around artificially maximizing time on page.

---

# 30. AVOID GENERIC INTRODUCTIONS

Avoid openings such as:

> In today's fast-paced world...

> When it comes to making important decisions...

> Water is an essential part of everyday life...

> Cars are a major investment...

> Technology is constantly changing...

These sentences add little value.

Start with the actual problem.

---

# 31. USEFUL SPECIFICITY

Specificity is valuable when it improves the decision.

Examples:

```text
$1,500 installed cost
12 grains per gallon
$10 per month
5-year ownership period
$500 deductible
```

But specificity should come from:

- authoritative evidence,
- actual market terms,
- a clearly labeled example,
- or reader-entered values.

Do not manufacture precise numbers merely to sound authoritative.

---

# 32. UNITS AND TERMINOLOGY

Use units that match how consumers encounter the decision.

Examples:

- miles per gallon
- dollars per month
- dollars per year
- kWh
- gallons
- grains per gallon
- pounds
- terabytes
- APR
- percentage

Define unfamiliar terminology when first introduced.

Avoid unnecessary jargon when a simpler term communicates the same concept.

---

# 33. HEADINGS

Headings should communicate decision logic.

Good:

```text
The NAS purchase price is only the beginning.
```

```text
A damaged tire may not need to be replaced.
```

```text
Find out how hard your water is before pricing the solution.
```

Less useful:

```text
Costs
```

```text
Benefits
```

```text
More Information
```

Eyebrows can provide the category:

```text
DO THE MATH
```

while the heading explains the insight.

---

# 34. CARDS AND VISUAL STRUCTURE

Use cards when they help compare:

- alternatives,
- conditions,
- advantages and disadvantages,
- scenarios,
- decision factors.

Do not convert every paragraph into a card.

Cards should make the reasoning easier to scan, not fragment the article unnecessarily.

---

# 35. INTERNAL CONSISTENCY

Numbers and terminology must remain consistent across:

- calculator defaults,
- article examples,
- scenarios,
- checklist items,
- key takeaways,
- metadata.

If the calculator uses:

```text
covered replacements during protection period
```

do not later describe the same input as:

```text
predicted claims
```

unless the model genuinely predicts claims.

Language should reflect what the model actually does.

---

# 36. JSX TEXT AND QUOTES

Be careful with apostrophes and quotation marks in TSX.

Visible JSX text can trigger:

```text
react/no-unescaped-entities
```

Prefer HTML entities where necessary:

```tsx
<p>
    The manufacturer&apos;s requirements matter.
</p>
```

For quotation marks in visible JSX text, use appropriate entities when needed:

```tsx
&quot;example&quot;
```

Do not fix lint errors by replacing apostrophes with incorrect punctuation.

For JavaScript or TypeScript strings, normal string rules apply.

Before providing or committing a large TSX guide, check:

- contractions,
- possessives,
- quoted phrases,
- apostrophes,
- quotation marks.

---

# 37. GUIDE-SPECIFIC COMPONENTS

Shared components belong in:

```text
app/components/article/
```

New components used only by one guide should generally be colocated with that guide.

Example:

```text
app/guides/is-a-water-softener-worth-it/
├── page.tsx
└── WaterSoftenerPaybackCheck.tsx
```

Older guide-specific calculators may remain in `app/components/article/`.

Do not migrate existing working components merely to enforce directory consistency.

The convention applies primarily to new work.

---

# 38. VISUAL QA

A successful build does not prove that the guide looks correct.

Before publishing a substantial guide, inspect the complete rendered page.

Check:

- hero layout
- Guided Entry
- calculator initial state
- card alignment
- heading hierarchy
- line wrapping
- overflow
- Related Decisions
- footer
- source presentation
- unusual page breaks in PDF review when used

Visual problems should be corrected before publication.

---

# 39. CALCULATOR QA

Test calculators with known scenarios.

At minimum, test:

1. normal/default-like conditions,
2. a scenario strongly favoring one side,
3. a scenario strongly favoring the other side or producing no break-even,
4. important edge cases.

Calculate expected results independently before accepting the calculator output.

Check both:

- the math,
- and the wording used to describe the result.

A mathematically correct number with misleading language is still a bug.

---

# 40. FINAL TECHNICAL QA

Before committing guide changes, run:

```bash
npm run validate-guides
npm run lint
npm run build
```

All three should pass.

Do not treat warnings as automatically acceptable.

Remove dead code and unused calculations when practical.

After deployment, verify the production page and sitemap.

---

# 41. UPDATE DISCIPLINE

Guides should display a meaningful update date.

Update a guide when:

- important source material changes,
- regulations change,
- product/program terms change materially,
- calculator assumptions change,
- substantial editorial improvements are made.

Do not change the date merely to make an old article appear fresh.

---

# 42. SEARCH INTENT WITHOUT SEO FILLER

The guide should answer the search query directly.

Use terminology readers genuinely search for, but do not:

- repeat the keyword unnaturally,
- create filler sections for keyword variants,
- stuff headings,
- rewrite natural language purely for SEO.

Search visibility should come from being the strongest answer to the decision.

---

# 43. EVERGREEN BY DEFAULT

Prefer guides whose core reasoning remains useful over time.

When a guide includes changing information such as:

- prices,
- tax rules,
- subscription tiers,
- regulations,
- incentives,
- program benefits,

structure the guide so that the changing value can be updated without rewriting the entire decision framework.

User-entered calculator values are often preferable to hard-coded commercial prices.

---

# 44. THE QUALITY TEST

Before publishing, ask:

### Decision

Does this guide answer a real decision?

### Evidence

Are the important factual claims supported by strong sources?

### Variables

Does it identify what materially changes the answer?

### Tool

If there is a calculator or check, does it improve the decision rather than decorate the article?

### Precision

Does the guide avoid claiming more certainty than the evidence supports?

### Action

Does the reader know what information to gather or what to do next?

### Differentiation

Does Northward Meridian provide something meaningfully more useful than a generic search result?

If the answer to several of these is no, the guide is not finished.

---

# 45. NORTHWARD MERIDIAN STANDARD

A strong Northward Meridian guide should make the reader think:

> I understand what actually determines this decision now.

Not:

> I just read a long article about the topic.

The goal is clarity through:

- evidence,
- useful math,
- transparent assumptions,
- realistic tradeoffs,
- and practical next steps.

That standard matters more than article length, publishing frequency, category balance, or the number of components on the page.