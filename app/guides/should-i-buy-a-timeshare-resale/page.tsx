import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import {
  GuideBullet,
  InformationCard,
} from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import TimeshareResaleComparison from "@/app/components/article/TimeshareResaleComparison";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
  const found = getGuideBySlug(
    "should-i-buy-a-timeshare-resale",
  );

  if (!found) {
    throw new Error(
      "Guide not found: should-i-buy-a-timeshare-resale",
    );
  }

  return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
  {
    id: "comparison",
    label: "Developer vs. resale comparison",
  },
  {
    id: "what-resale-means",
    label: "What buying resale means",
  },
  {
    id: "price-difference",
    label: "Why resale prices can be so different",
  },
  {
    id: "what-may-not-transfer",
    label: "What may not transfer",
  },
  {
    id: "ownership-cost",
    label: "Compare total ownership cost",
  },
  {
    id: "verify",
    label: "What to verify before buying",
  },
  {
    id: "scams",
    label: "Scams and red flags",
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
    id: "presentation",
    title: "I'm at a developer presentation",
    summary:
      "Slow the decision down and identify what you need to verify before comparing today's offer with resale.",
    guidance:
      "Get the full purchase terms in writing, ask about rescission rights, and compare the complete ownership cost with actual resale opportunities before treating the developer offer as your only option.",
    destinationId: "verify",
    destinationLabel: "What to Verify",
  },
  {
    id: "developer-offer",
    title: "I already have a developer offer",
    summary:
      "Compare the offer against a resale rather than evaluating the developer price by itself.",
    guidance:
      "Enter the purchase and recurring-cost assumptions into the comparison tool, then separately verify whether the developer purchase includes rights or benefits that would not transfer to resale.",
    destinationId: "comparison",
    destinationLabel: "Developer vs. Resale Comparison",
  },
  {
    id: "resale-listing",
    title: "I found a resale listing",
    summary:
      "Check whether the low acquisition price is accompanied by restrictions or additional obligations.",
    guidance:
      "A low resale price is only useful if the ownership provides the booking, exchange, usage, and transfer rights you actually want.",
    destinationId: "what-may-not-transfer",
    destinationLabel: "What May Not Transfer",
  },
  {
    id: "comparing",
    title: "I'm comparing developer and resale options",
    summary:
      "Put both options on the same ownership-cost basis.",
    guidance:
      "Compare acquisition cost, financing, maintenance fees, fee growth, transfer costs, usage, and any meaningful program differences rather than focusing on the upfront sales price.",
    destinationId: "ownership-cost",
    destinationLabel: "Total Ownership Cost",
  },
  {
    id: "legitimacy",
    title: "I'm wondering whether resale is legitimate",
    summary:
      "Learn what to verify before sending money or signing a transfer agreement.",
    guidance:
      "Treat unsolicited claims, guaranteed returns, pressure to act immediately, and large upfront fees with caution. Verify the seller, contract, ownership rights, and transfer process independently.",
    destinationId: "scams",
    destinationLabel: "Scams and Red Flags",
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
    publishedTime: "2026-09-22",
    modifiedTime: "2026-09-22",
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
  datePublished: "2026-09-22",
  dateModified: "2026-09-22",
  mainEntityOfPage: canonicalUrl,
  author: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://northwardmeridian.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://northwardmeridian.com",
  },
};

export default function TimeshareResaleGuide() {
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
      <TimeshareResaleComparison id="comparison" />

      <WhyThisMatters id="what-resale-means">
        <p>
          Buying a timeshare resale means acquiring an existing ownership
          interest or usage right from a current owner rather than purchasing
          directly from the developer. The exact legal structure varies by
          timeshare, including deeded interests and points-based arrangements.
        </p>

        <p>
          The lower resale price can be significant, but price is only one
          part of the decision. The specific ownership can have different
          booking rules, exchange privileges, program benefits, transfer
          requirements, or other restrictions.
        </p>

        <p>
          The Federal Trade Commission recommends calculating the true cost of
          ownership, including the initial payment, recurring fees, taxes,
          travel costs, and other charges, before committing to a timeshare.
          It also recommends understanding exchange and points systems and
          knowing what happens if you later want to get out.{" "}
        </p>
      </WhyThisMatters>

      <GuideSection
        id="price-difference"
        eyebrow="Why the Prices Differ"
        title="A low resale price does not automatically mean you found the same product for less."
      >
        <p>
          Developer pricing and resale pricing can represent very different
          markets. The developer controls the price of a new sale, while a
          resale seller is trying to transfer an existing ownership interest.
        </p>

        <p>
          A resale buyer may therefore encounter a large gap between the
          original developer price and the current asking price. The existence
          of that gap should prompt investigation rather than a conclusion
          about whether the resale is a bargain.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Developer purchase">
            <ul className="space-y-3">
              <GuideBullet>
                Usually involves a higher acquisition price
              </GuideBullet>
              <GuideBullet>
                Financing may be offered as part of the sale
              </GuideBullet>
              <GuideBullet>
                May include program-specific benefits
              </GuideBullet>
              <GuideBullet>
                Contract terms come directly from the developer
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Resale purchase">
            <ul className="space-y-3">
              <GuideBullet>
                Acquisition price may be substantially lower
              </GuideBullet>
              <GuideBullet>
                Transfer and closing costs may still apply
              </GuideBullet>
              <GuideBullet>
                Existing maintenance obligations generally need review
              </GuideBullet>
              <GuideBullet>
                Program-specific rights and benefits must be verified
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>
      </GuideSection>

      <GuideSection
        id="what-may-not-transfer"
        eyebrow="Program Rights"
        title="Treat the resale and developer ownership as two different products until you verify otherwise."
      >
        <p>
          The biggest mistake in a resale comparison is assuming that every
          benefit attached to a developer purchase automatically transfers with
          the ownership.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Verify booking rights">
            <ul className="space-y-3">
              <GuideBullet>
                Reservation windows and priority periods
              </GuideBullet>
              <GuideBullet>
                Access to specific resorts or inventory
              </GuideBullet>
              <GuideBullet>
                Whether the same points or weeks can be used
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Verify program benefits">
            <ul className="space-y-3">
              <GuideBullet>
                Exchange-program eligibility
              </GuideBullet>
              <GuideBullet>
                Developer or club membership benefits
              </GuideBullet>
              <GuideBullet>
                Discounts, status, or other ancillary benefits
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          These features can vary by resort and program. Do not rely on a
          salesperson, listing, or informal online description to establish
          what transfers. Get the specific rights in writing from the developer
          or program administrator.
        </p>
      </GuideSection>

      <GuideSection
        id="ownership-cost"
        eyebrow="Total Cost"
        title="Compare the ownership you will actually pay for—not the price on the listing."
      >
        <p>
          The FTC recommends considering the initial payment, recurring fees,
          taxes, travel costs, and other yearly charges when evaluating a
          timeshare. Maintenance fees may increase over time, and you can owe
          them even when you do not use the property.
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Compare these numbers
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Developer</h3>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li>• Purchase price</li>
                <li>• Financing cost</li>
                <li>• Maintenance fees</li>
                <li>• Annual fee increases</li>
                <li>• Transfer or closing costs</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Resale</h3>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li>• Purchase price</li>
                <li>• Transfer and closing costs</li>
                <li>• Maintenance fees</li>
                <li>• Annual fee increases</li>
                <li>• Assessment or outstanding-balance risk</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          Then compare both options with the way you would otherwise vacation.
          If you expect to travel seven nights a year, the useful comparison is
          not simply the purchase price. It is the complete ownership cost per
          usable night versus what comparable travel would cost.
        </p>

        <p>
          The same logic applies to points-based programs. The number of points
          required can vary with destination, property type, stay length, and
          timing, so a nominal number of points is not enough to establish the
          value of the ownership.
        </p>
      </GuideSection>

      <GuideSection
        id="verify"
        eyebrow="Before You Sign"
        title="Verify the ownership before you send money."
      >
        <p>
          A resale transaction should be treated like a significant purchase,
          not an informal vacation booking. Obtain the actual ownership and
          transfer documents and review them independently.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Verify the ownership">
            <ul className="space-y-3">
              <GuideBullet>
                Exact resort, week, points, or usage interest
              </GuideBullet>
              <GuideBullet>
                Current maintenance-fee amount and payment status
              </GuideBullet>
              <GuideBullet>
                Any outstanding assessment or balance
              </GuideBullet>
              <GuideBullet>
                Transfer requirements and fees
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Verify the rights">
            <ul className="space-y-3">
              <GuideBullet>
                Booking and reservation rules
              </GuideBullet>
              <GuideBullet>
                Exchange-program eligibility
              </GuideBullet>
              <GuideBullet>
                Benefits that transfer to the buyer
              </GuideBullet>
              <GuideBullet>
                Restrictions that apply specifically to resale owners
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          If someone makes a verbal promise about the ownership, ask for it in
          writing. The FTC specifically advises prospective timeshare buyers to
          study the paperwork independently and get promises in writing before
          committing.
        </p>
      </GuideSection>

      <GuideSection
        id="scams"
        eyebrow="Consumer Protection"
        title="Be especially cautious when someone promises easy money or a guaranteed outcome."
      >
        <p>
          The resale market attracts scams because owners may be motivated to
          get rid of a difficult-to-sell asset. The FTC warns about companies
          that claim they already have buyers, promise quick sales or large
          returns, or demand substantial fees before performing meaningful
          work.
        </p>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-700">
            Warning signs
          </p>

          <ul className="mt-5 space-y-3">
            <GuideBullet>
              An unsolicited offer claiming a buyer is already lined up
            </GuideBullet>
            <GuideBullet>
              A guarantee that your timeshare will sell quickly
            </GuideBullet>
            <GuideBullet>
              A promise of a large return above market value
            </GuideBullet>
            <GuideBullet>
              Large upfront fees for a promised resale
            </GuideBullet>
            <GuideBullet>
              Pressure to wire money before you can independently verify the
              transaction
            </GuideBullet>
          </ul>
        </div>

        <p>
          The FTC&apos;s current guidance recommends researching the company,
          checking complaints, understanding fees, verifying licensing where
          applicable, and getting the entire agreement in writing.
        </p>
      </GuideSection>

      <GuideSection
        id="scenarios"
        eyebrow="Real-World Scenarios"
        title="The same resale price can produce very different decisions."
      >
        <div className="space-y-6">
          <InformationCard title="Large developer premium, similar usable rights">
            <p>
              The resale has a dramatically lower acquisition cost and appears
              to provide the same practical usage. The next step is to verify
              booking, exchange, and transfer rights before treating the two
              options as economically comparable.
            </p>
          </InformationCard>

          <InformationCard title="Low resale price, weak usage fit">
            <p>
              The purchase price is attractive, but the buyer&apos;s preferred
              travel dates are expensive in points and the program offers less
              flexibility than expected. A cheap acquisition price does not
              necessarily create a cheap vacation.
            </p>
          </InformationCard>

          <InformationCard title="Developer purchase with financing">
            <p>
              The upfront payment looks manageable, but financing can materially
              increase the total acquisition cost. Compare the financed amount,
              interest, maintenance fees, and expected usage over the ownership
              period rather than focusing on the monthly payment.
            </p>
          </InformationCard>

          <InformationCard title="Resale with unclear paperwork">
            <p>
              The price looks unusually attractive, but the seller cannot
              clearly establish ownership, current fees, or the exact rights
              that transfer. Pause the transaction and verify the ownership
              independently before sending money.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      <DecisionChecklist
        id="checklist"
        title="Before You Buy"
        items={[
          "Compare the developer offer with at least one real resale opportunity.",
          "Calculate the complete acquisition and ownership cost.",
          "Verify current maintenance fees and how they have changed.",
          "Confirm booking and exchange rights.",
          "Confirm which developer or club benefits transfer.",
          "Check for outstanding assessments, balances, or transfer fees.",
          "Read the actual contract and transfer documents.",
          "Confirm any rescission or cancellation rights that apply.",
          "Avoid unsolicited guarantees of a fast resale or large return.",
        ]}
      />

      <QuestionsToAsk
        id="questions"
        title="Questions to Ask Before Buying"
        subtitle="Get the answers in writing before committing."
        questions={[
          "What exactly am I purchasing: a deeded week, points, or another usage right?",
          "What are the current annual maintenance fees?",
          "How have those fees changed over time?",
          "What booking window and reservation rights transfer to a resale owner?",
          "Which exchange programs and benefits transfer?",
          "Are there any resale-specific restrictions?",
          "Are there outstanding assessments, balances, or transfer fees?",
          "What is the complete cost if I finance the developer purchase?",
          "What is the applicable cancellation or rescission period?",
        ]}
      />

      <KeyTakeaways
        id="takeaways"
        items={[
          "A resale timeshare can have a much lower acquisition cost than a developer purchase, but price alone does not establish value.",
          "Compare the complete ownership cost, including financing, maintenance fees, taxes, travel, transfer costs, and other recurring charges.",
          "Do not assume developer benefits, booking rights, exchange privileges, or other program features transfer to resale ownership.",
          "Get the exact rights, fees, restrictions, and transfer terms in writing.",
          "The FTC warns consumers about timeshare resale scams involving guaranteed sales, quick-sale promises, and substantial upfront fees.",
          "Treat a timeshare as a vacation-use decision rather than assuming it will behave like a conventional investment.",
        ]}
      />

      <Sources
        sources={[
          {
            title: "Timeshares, Vacation Clubs, and Related Scams",
            publisher: "Federal Trade Commission",
            href: "https://consumer.ftc.gov/articles/timeshares-vacation-clubs-and-related-scams",
          },
          {
            title: "Thinking about selling your timeshare? Key steps to avoid scams",
            publisher: "Federal Trade Commission",
            href: "https://consumer.ftc.gov/consumer-alerts/2025/09/thinking-about-selling-your-timeshare-key-steps-avoid-scams",
          },
        ]}
      />

      <RelatedDecisions currentSlug="should-i-buy-a-timeshare-resale" />
    </GuideLayout>
  );
}