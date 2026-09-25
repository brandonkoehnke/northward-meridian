import type { Metadata } from "next";

import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import ServiceLineCoverageCheck from "./ServiceLineCoverageCheck";
import {
  GuideBullet,
  InformationCard,
} from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
  const found = getGuideBySlug(
    "is-service-line-coverage-worth-it",
  );

  if (!found) {
    throw new Error(
      "Guide not found: is-service-line-coverage-worth-it",
    );
  }

  return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
  {
    id: "coverage-check",
    label: "Coverage check",
  },
  {
    id: "what-it-covers",
    label: "What service-line coverage covers",
  },
  {
    id: "coverage-types",
    label: "Service line vs. water backup",
  },
  {
    id: "when-worth-it",
    label: "When coverage becomes more valuable",
  },
  {
    id: "when-less-useful",
    label: "When coverage may be less useful",
  },
  {
    id: "cost",
    label: "Compare the real cost",
  },
  {
    id: "policy",
    label: "What to check in the policy",
  },
  {
    id: "scenarios",
    label: "Real-world scenarios",
  },
  {
    id: "checklist",
    label: "Before you buy",
  },
  {
    id: "questions",
    label: "Questions to ask",
  },
  {
    id: "takeaways",
    label: "Key takeaways",
  },
] as const;

const guidedEntryScenarios = [
  {
    id: "utility-offer",
    title: "My utility sent me an offer",
    summary:
      "Compare a utility or service-company plan with the protection already available through your homeowners policy.",
    guidance:
      "Before paying for a separate plan, check whether your homeowners policy already offers a service-line endorsement and compare the actual limits, deductible, covered causes, and exclusions.",
    destinationId: "coverage-types",
    destinationLabel: "Coverage Types",
  },
  {
    id: "older-home",
    title: "I have an older house",
    summary:
      "See how age, infrastructure, and property layout can change the value of additional coverage.",
    guidance:
      "Older infrastructure can create more uncertainty, but age alone does not establish that coverage is worthwhile. The material, condition, routing, and potential repair cost matter too.",
    destinationId: "when-worth-it",
    destinationLabel: "When Coverage Becomes More Valuable",
  },
  {
    id: "sewer-problem",
    title: "I have a sewer-line problem",
    summary:
      "Understand whether you are dealing with damage to the line, damage inside the home, or both.",
    guidance:
      "First determine whether the problem is the buried line itself or water/sewage entering the house. Those risks can fall under different types of coverage.",
    destinationId: "coverage-types",
    destinationLabel: "Service Line vs. Water Backup",
  },
  {
    id: "reviewing-policy",
    title: "I'm reviewing my homeowners policy",
    summary:
      "Use the guide to identify the coverage terms that deserve attention before you add anything.",
    guidance:
      "Start with your current declarations and endorsements. Look for service-line limits, deductibles, covered causes, restoration provisions, and exclusions.",
    destinationId: "policy",
    destinationLabel: "Policy Details",
  },
  {
    id: "just-wondering",
    title: "I'm just wondering if I need it",
    summary:
      "Start with the factors that determine whether the risk is worth transferring.",
    guidance:
      "The basic question is not whether a service-line failure is possible. It is whether the financial exposure you face is large enough, uncertain enough, and difficult enough to absorb that the coverage provides meaningful value.",
    destinationId: "when-worth-it",
    destinationLabel: "When Coverage Becomes More Valuable",
  },
] as const;

export const metadata: Metadata = {
  title: `${guide.title} | Northward Meridian`,
  description: guide.description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    siteName: "Northward Meridian",
    title: guide.title,
    description: guide.description,
    publishedTime: "2026-09-21",
    modifiedTime: "2026-09-21",
  },
  twitter: {
    card: "summary",
    title: guide.title,
    description: guide.description,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: guide.description,
  datePublished: "2026-09-21",
  dateModified: "2026-09-21",
  mainEntityOfPage: canonicalUrl,
  author: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://www.northwardmeridian.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://www.northwardmeridian.com",
  },
};

export default function ServiceLineCoverageGuide() {
  return (
    <GuideLayout
      category={guide.category}
      title={guide.title}
      description={guide.description}
      updated={guide.updated}
      readingTime={guide.readingTime}
      recommendedFor={guide.recommendedFor}
      bottomLine={guide.bottomLine}
      structuredData={articleJsonLd}
      sections={guideSections}
      guidedEntry={<GuidedEntry scenarios={guidedEntryScenarios} />}
    >
      <ServiceLineCoverageCheck />

      <WhyThisMatters id="what-it-covers">
        <p>
          Service-line coverage is an optional insurance endorsement that can
          help pay for repairs to certain underground utility lines serving
          your property. Depending on the insurer and policy, covered lines
          may include water, sewer, gas, electric, telephone, or cable lines.
        </p>

        <p>
          The important detail is that the coverage is policy-specific. The
          lines covered, causes of damage, limits, deductible, excavation
          benefits, restoration provisions, and exclusions can vary
          significantly between policies.
        </p>

        <p>
          The right question is not simply whether service-line coverage is
          &quot;worth it.&quot; The useful question is whether the financial
          risk you are transferring is meaningful relative to the cost and
          quality of the coverage you are buying.
        </p>
      </WhyThisMatters>

      <GuideSection
        id="coverage-types"
        eyebrow="Coverage Types"
        title="Service-line coverage and water-backup coverage protect different risks."
      >
        <p>
          This is one of the easiest places to buy the wrong coverage for the
          problem you are trying to solve.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Service-line coverage">
            <ul className="space-y-3">
              <GuideBullet>
                Focuses on the buried utility line itself
              </GuideBullet>
              <GuideBullet>
                May cover repair or replacement of qualifying lines
              </GuideBullet>
              <GuideBullet>
                May include excavation and some restoration costs
              </GuideBullet>
              <GuideBullet>
                May cover multiple utility types, depending on the policy
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Water-backup coverage">
            <ul className="space-y-3">
              <GuideBullet>
                Focuses on water or sewage backing up into the home
              </GuideBullet>
              <GuideBullet>
                May address resulting damage to covered property
              </GuideBullet>
              <GuideBullet>
                Can apply to sewer backups and, depending on the endorsement,
                sump-pump failures
              </GuideBullet>
              <GuideBullet>
                Does not necessarily pay to replace the buried sewer line
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          New York&apos;s Department of Financial Services specifically
          describes water-backup coverage as an endorsement addressing sewer
          backups and related water damage. That is different from protecting
          the buried line itself. Review both coverages separately when
          evaluating your policy.
        </p>
      </GuideSection>

      <GuideSection
        id="when-worth-it"
        eyebrow="When It Becomes More Valuable"
        title="Coverage becomes more useful when the potential loss would be difficult to absorb."
      >
        <p>
          Several factors can make a service-line failure more financially
          significant. None of them proves that insurance is worthwhile by
          itself, but together they can change the calculation.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Property exposure">
            <ul className="space-y-3">
              <GuideBullet>
                Older buried infrastructure or an uncertain service-line
                history
              </GuideBullet>
              <GuideBullet>
                Mature trees near the likely path of underground lines
              </GuideBullet>
              <GuideBullet>
                Long runs between the house and the public connection
              </GuideBullet>
              <GuideBullet>
                Lines beneath driveways, patios, sidewalks, or other
                expensive-to-restore surfaces
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Financial exposure">
            <ul className="space-y-3">
              <GuideBullet>
                A large unexpected repair would materially affect your budget
              </GuideBullet>
              <GuideBullet>
                You do not have a substantial emergency reserve
              </GuideBullet>
              <GuideBullet>
                Excavation and restoration could make a routine repair much
                more expensive
              </GuideBullet>
              <GuideBullet>
                You value transferring an unpredictable repair cost even when
                the long-run expected cost may not favor insurance
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          Current consumer guidance commonly points to older homes, mature
          trees, and limited ability to absorb an unexpected utility-line
          repair as factors that can make service-line coverage more
          attractive. Those are risk indicators, not guarantees of a claim.
        </p>
      </GuideSection>

      <GuideSection
        id="when-less-useful"
        eyebrow="When It May Be Less Useful"
        title="The case for coverage is weaker when your exposure is already limited."
      >
        <p>
          The opposite conditions can make the additional premium harder to
          justify.
        </p>

        <ul className="space-y-4">
          <GuideBullet>
            Your home and service lines are relatively new and in known good
            condition.
          </GuideBullet>
          <GuideBullet>
            You have little underground infrastructure exposed to the types of
            failures covered by the endorsement.
          </GuideBullet>
          <GuideBullet>
            You already have equivalent protection through another policy or
            contract.
          </GuideBullet>
          <GuideBullet>
            The deductible is high relative to the likely repair expense.
          </GuideBullet>
          <GuideBullet>
            The coverage limit is low compared with the potential excavation,
            repair, and restoration cost.
          </GuideBullet>
          <GuideBullet>
            You could comfortably pay for a major repair from your emergency
            reserves.
          </GuideBullet>
        </ul>

        <p>
          There is nothing wrong with choosing to self-insure a risk you can
          comfortably absorb. The point is to make that choice deliberately
          rather than paying for overlapping or unsuitable coverage.
        </p>
      </GuideSection>

      <GuideSection
        id="cost"
        eyebrow="Cost Comparison"
        title="Compare the premium with the loss you are transferring."
      >
        <p>
          Service-line coverage is usually inexpensive compared with a major
          home repair, but the premium alone does not tell you whether it is a
          good purchase.
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Compare these numbers
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Your coverage</h3>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li>• Annual premium</li>
                <li>• Deductible</li>
                <li>• Coverage limit</li>
                <li>• Covered causes</li>
                <li>• Excavation/restoration provisions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Your potential exposure</h3>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li>• Approximate line length</li>
                <li>• Access and excavation difficulty</li>
                <li>• Pipe condition and material</li>
                <li>• Surface restoration</li>
                <li>• Your available emergency reserves</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          Current 2026 estimates put professional sewer-line replacement at
          roughly $3,319 on average, with a broad range depending on pipe
          length, material, access, excavation, and restoration. Use published
          cost figures only as context; a real contractor estimate is much
          more useful for your property.
        </p>

        <p>
          Also remember that a coverage limit can be reached before a difficult
          repair is finished. A line under a driveway, for example, can create
          restoration costs that are very different from a line accessible
          through an open lawn.
        </p>
      </GuideSection>

      <GuideSection
        id="policy"
        eyebrow="Read the Fine Print"
        title="The quality of the coverage matters as much as the price."
      >
        <p>
          Before adding an endorsement or signing a separate service contract,
          get the actual terms. A low annual price is not useful if the event
          you are worried about is excluded.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Ask what is covered">
            <ul className="space-y-3">
              <GuideBullet>Which utility lines qualify?</GuideBullet>
              <GuideBullet>Which causes of damage are covered?</GuideBullet>
              <GuideBullet>
                Are wear, corrosion, roots, freezing, or blockage covered?
              </GuideBullet>
              <GuideBullet>
                Are excavation and landscaping restoration included?
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Ask what is excluded">
            <ul className="space-y-3">
              <GuideBullet>
                Are wells, septic systems, or fuel tanks excluded?
              </GuideBullet>
              <GuideBullet>Are above-ground lines excluded?</GuideBullet>
              <GuideBullet>
                Are there age, condition, or inspection requirements?
              </GuideBullet>
              <GuideBullet>
                Are there contractor or authorization requirements?
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          If you are comparing an insurer&apos;s endorsement with a utility or
          third-party service plan, compare them using the same categories.
          The legal structure and terms can be different, so do not assume that
          two products with similar marketing language provide equivalent
          protection.
        </p>
      </GuideSection>

      <GuideSection
        id="scenarios"
        eyebrow="Real-World Scenarios"
        title="The same coverage can make sense for one homeowner and not another."
      >
        <div className="space-y-6">
          <InformationCard title="Older home, mature trees, limited reserves">
            <p>
              The buried infrastructure is uncertain, tree-root exposure is
              meaningful, and a large repair would be difficult to absorb.
              Service-line coverage deserves a close review, especially if the
              endorsement covers the causes of failure that concern the
              homeowner.
            </p>
          </InformationCard>

          <InformationCard title="Newer home, known-good lines, strong emergency fund">
            <p>
              The homeowner has relatively little exposure and can comfortably
              absorb an unexpected repair. Additional coverage may offer less
              practical value, particularly if the deductible and exclusions
              leave substantial risk with the homeowner.
            </p>
          </InformationCard>

          <InformationCard title="Sewer backup is the main concern">
            <p>
              The homeowner&apos;s primary worry is sewage entering the
              basement rather than the buried line failing. Water-backup
              coverage may be the more relevant coverage to investigate, while
              service-line coverage addresses a different part of the risk.
            </p>
          </InformationCard>

          <InformationCard title="Utility plan offered by mail">
            <p>
              The homeowner should compare the plan with the service-line
              endorsement already available through the homeowners insurer.
              Look at annual cost, deductible or service fee, coverage limit,
              qualifying lines, covered causes, exclusions, and restoration
              provisions before choosing either one.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      <DecisionChecklist
        id="checklist"
        title="Before You Buy"
        items={[
          "Check your current homeowners policy for an existing service-line endorsement.",
          "Check separately for water-backup or sewer-backup coverage.",
          "Identify which buried utility lines you are responsible for.",
          "Ask about the deductible and maximum coverage limit.",
          "Confirm which causes of damage are covered.",
          "Ask whether excavation and surface restoration are covered.",
          "Compare a utility or service-company plan against your insurer's option.",
          "Decide whether you could comfortably self-insure the risk instead.",
        ]}
      />

      <QuestionsToAsk
        id="questions"
        title="Questions to Ask Your Insurer"
        subtitle="Get the actual coverage details before deciding."
        questions={[
          "Does my current policy already include service-line coverage?",
          "Which buried utility lines are covered?",
          "What causes of damage are covered or excluded?",
          "What is the deductible?",
          "What is the coverage limit per occurrence?",
          "Are excavation and landscaping restoration covered?",
          "Are there age, condition, inspection, or contractor requirements?",
          "Do I also have water-backup coverage, and what does it cover?",
          "How does this endorsement compare with any service plan offered by my utility?",
        ]}
      />

      <KeyTakeaways
        id="takeaways"
        items={[
          "Service-line coverage generally addresses the buried utility line itself; water-backup coverage addresses a different risk involving water or sewage entering the home.",
          "The value of service-line coverage depends on your potential loss, the quality of the coverage, and your ability to absorb the cost yourself.",
          "Older infrastructure, mature trees, difficult excavation, and limited emergency reserves can increase the value of transferring the risk.",
          "A low premium does not make coverage useful if the deductible, limit, exclusions, or covered causes do not match the risk you are worried about.",
          "Check your existing homeowners policy before buying a separate utility or service-company plan.",
          "Read the actual endorsement or contract before deciding.",
        ]}
      />

      <Sources
        sources={[
          {
            title: "Homeowners Insurance: Basic Coverage and Adding Coverage",
            publisher: "New York State Department of Financial Services",
            href: "https://www.dfs.ny.gov/consumers/help_for_homeowners/insurance/basic_coverage",
          },
          {
            title: "What Is Service Line Coverage, and Do You Need It?",
            publisher: "NerdWallet",
            href: "https://www.nerdwallet.com/insurance/homeowners/learn/service-line-coverage",
          },
          {
            title: "What Is Service Line Coverage?",
            publisher: "Progressive",
            href: "https://www.progressive.com/answers/service-line-coverage/",
          },
          {
            title: "What Is Water Backup Coverage for Homeowners and Renters?",
            publisher: "NerdWallet",
            href: "https://www.nerdwallet.com/insurance/homeowners/learn/water-backup-coverage",
          },
          {
            title: "What Does Sewer Line Replacement Cost? [2026 Data]",
            publisher: "Angi",
            href: "https://www.angi.com/articles/how-much-does-sewer-line-replacement-or-repair-cost.htm",
          },
        ]}
      />

      <RelatedDecisions currentSlug="is-service-line-coverage-worth-it" />
    </GuideLayout>
  );
}