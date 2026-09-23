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
import PremiumCardValueCalculator from "@/app/components/article/PremiumCardValueCalculator";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
  const found = getGuideBySlug(
    "premium-credit-card-annual-fee",
  );

  if (!found) {
    throw new Error(
      "Guide not found: premium-credit-card-annual-fee",
    );
  }

  return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
  {
    id: "premium-card-value-calculator",
    label: "Premium card value calculator",
  },
  {
    id: "short-answer",
    label: "The short answer",
  },
  {
    id: "realized-value",
    label: "Realized value vs. advertised value",
  },
  {
    id: "incremental-value",
    label: "Incremental value",
  },
  {
    id: "statement-credits",
    label: "Statement credits",
  },
  {
    id: "rewards",
    label: "Rewards",
  },
  {
    id: "benefits",
    label: "Travel and other benefits",
  },
  {
    id: "alternative",
    label: "Your alternative card",
  },
  {
    id: "keep-downgrade-cancel",
    label: "Keep, downgrade, or cancel",
  },
  {
    id: "annual-review",
    label: "Review the card every year",
  },
  {
    id: "scenarios",
    label: "Real-world scenarios",
  },
  {
    id: "checklist",
    label: "Practical rule of thumb",
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
    id: "calculate-value",
    title: "I want to know if the fee is worth it",
    summary:
      "Calculate usable credits, incremental rewards, benefits, and the fee difference.",
    guidance:
      "Start with the calculator and value each benefit based on what you would realistically use rather than its advertised maximum.",
    destinationId: "premium-card-value-calculator",
    destinationLabel: "Premium Card Value Calculator",
  },
  {
    id: "credits",
    title: "The card has lots of statement credits",
    summary:
      "Separate face value from the amount you would naturally use.",
    guidance:
      "A $200 credit is not necessarily worth $200 to you. Value only the portion that replaces spending you would make anyway.",
    destinationId: "statement-credits",
    destinationLabel: "Statement Credits",
  },
  {
    id: "rewards",
    title: "The card earns more points",
    summary:
      "Compare those rewards with what your existing card would earn.",
    guidance:
      "The relevant number is incremental rewards: the extra value from using the premium card instead of your alternative.",
    destinationId: "incremental-value",
    destinationLabel: "Incremental Value",
  },
  {
    id: "downgrade",
    title: "I am thinking about downgrading",
    summary:
      "Understand what you may preserve and what you may give up.",
    guidance:
      "A downgrade can reduce ongoing cost while preserving an existing account, but the available products and benefits depend on the issuer.",
    destinationId: "keep-downgrade-cancel",
    destinationLabel: "Keep, Downgrade, or Cancel",
  },
  {
    id: "travel",
    title: "I mostly care about travel benefits",
    summary:
      "Put a realistic dollar value on travel perks instead of using headline values.",
    guidance:
      "Consider how often you would independently purchase the benefit and what you would otherwise pay for the same convenience.",
    destinationId: "benefits",
    destinationLabel: "Travel and Other Benefits",
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
    publishedTime: "2026-09-23",
    modifiedTime: "2026-09-23",
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
  datePublished: "2026-09-23",
  dateModified: "2026-09-23",
  mainEntityOfPage: canonicalUrl,
  author: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: `${siteUrl}/about`,
  },
  publisher: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: siteUrl,
  },
};

export default function PremiumCreditCardAnnualFeeGuide() {
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
      guidedEntry={
        <GuidedEntry
          scenarios={guidedEntryScenarios}
        />
      }
    >
      <PremiumCardValueCalculator />

      <WhyThisMatters id="short-answer">
        <p>
          Premium credit cards often advertise hundreds of dollars in annual
          benefits, but advertised value and realized value are not the same.
          A card can look profitable on paper while providing little practical
          value to a particular cardholder.
        </p>

        <p>
          The useful calculation is not simply whether the card&apos;s benefits
          add up to more than the annual fee. You also need to ask whether you
          would use those benefits anyway and what rewards or benefits you
          could receive from another card with a lower fee.
        </p>

        <p>
          The result should be based on your current spending, travel, and
          redemption habits rather than on the maximum value printed in
          marketing materials.
        </p>
      </WhyThisMatters>

      <GuideSection
        id="realized-value"
        eyebrow="Start With Reality"
        title="A benefit only has full value if you would have used it anyway."
      >
        <p>
          Premium cards frequently advertise a collection of statement credits,
          travel benefits, and other perks. Adding all of those headline values
          together can make an expensive card appear easy to justify.
        </p>

        <p>
          The problem is that a credit you would not otherwise use is not worth
          its full face value to you. The same principle applies to travel
          benefits, subscriptions, upgrades, and other perks.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Advertised value">
            <p>
              The maximum dollar amount an issuer assigns to a credit or
              benefit.
            </p>
          </InformationCard>

          <InformationCard title="Realized value">
            <p>
              The amount of value you reasonably expect to receive from the
              benefit without changing your spending just to use it.
            </p>
          </InformationCard>
        </div>

        <p>
          A useful test is simple:{" "}
          <strong>
            Would I make this purchase or use this service if I did not have
            the card?
          </strong>
        </p>
      </GuideSection>

      <GuideSection
        id="incremental-value"
        eyebrow="The Most Important Concept"
        title="The premium card only gets credit for value you would not get from your alternative."
      >
        <p>
          This is the step most simple credit-card calculators miss. Suppose a
          premium card earns rewards worth $600 per year while a no-fee card
          you already own would earn $400 on the same spending.
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Example
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--muted)]">
                Premium-card rewards
              </p>

              <p className="mt-2 text-2xl font-semibold">
                $600
              </p>
            </div>

            <div className="flex items-center justify-center text-2xl text-[var(--accent)]">
              -
            </div>

            <div className="rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--muted)]">
                Alternative-card rewards
              </p>

              <p className="mt-2 text-2xl font-semibold">
                $400
              </p>
            </div>
          </div>

          <p className="mt-6 text-xl font-semibold">
            Incremental reward value = $200
          </p>
        </div>

        <p>
          The premium card did not create $600 of new value. The relevant
          comparison is the additional $200 you receive by using the premium
          card instead of the alternative.
        </p>

        <p>
          This is why the calculator asks for both cards&apos; reward rates and
          point values.
        </p>
      </GuideSection>

      <GuideSection
        id="statement-credits"
        eyebrow="Statement Credits"
        title="Value credits according to how naturally you use them."
      >
        <p>
          Statement credits are often the largest advertised component of a
          premium card&apos;s value. They are also among the easiest benefits to
          overvalue.
        </p>

        <p>
          Imagine a card advertises a $200 annual travel credit. If you
          regularly spend $200 on qualifying travel anyway, the credit may
          reasonably be worth close to its face value. If you would only use
          $100 of it, valuing the benefit at $200 overstates its contribution.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <InformationCard title="100% natural use">
            <p>
              The credit replaces spending you would make regardless of whether
              you held the card.
            </p>
          </InformationCard>

          <InformationCard title="Partial use">
            <p>
              You regularly use only part of the available credit, so its
              realized value should be reduced.
            </p>
          </InformationCard>

          <InformationCard title="Forced use">
            <p>
              You would have to change your purchasing behavior just to use the
              credit. Its value may be substantially lower than face value.
            </p>
          </InformationCard>
        </div>

        <p>
          The calculator handles this by multiplying each advertised credit by
          your estimated realistic utilization percentage.
        </p>
      </GuideSection>

      <GuideSection
        id="rewards"
        eyebrow="Rewards"
        title="A higher earning rate matters only on the spending where it applies."
      >
        <p>
          Premium cards often combine several earning rates. For this
          calculation, use the rate that applies to the spending you are
          comparing rather than the most attractive rate printed in the
          advertising.
        </p>

        <p>
          Then value the points according to how you actually redeem them. One
          point is not automatically worth one cent, and theoretical redemption
          values are not the same as the value you personally receive.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Questions about rewards">
            <ul className="space-y-3">
              <GuideBullet>
                What spending categories are actually relevant to me?
              </GuideBullet>
              <GuideBullet>
                What would my alternative card earn on the same purchases?
              </GuideBullet>
              <GuideBullet>
                What redemption value do I realistically get?
              </GuideBullet>
              <GuideBullet>
                Am I changing spending behavior to earn the higher rate?
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Watch for opportunity cost">
            <p>
              A premium card that earns 3x instead of 2x is not creating the
              entire 3x reward. The economically relevant difference is the
              additional value above the 2x alternative.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      <GuideSection
        id="benefits"
        eyebrow="Benefits Beyond Rewards"
        title="Assign a realistic value to benefits you would otherwise pay for."
      >
        <p>
          Lounge access, hotel status, travel protections, free checked bags,
          and similar benefits can be valuable. But the value depends on how
          frequently you use them and what you would otherwise spend.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Lounge access">
            <p>
              Consider how often you would visit a lounge and whether you would
              independently pay for another airport experience.
            </p>
          </InformationCard>

          <InformationCard title="Hotel benefits">
            <p>
              Consider whether status or credits change real purchases you were
              already going to make.
            </p>
          </InformationCard>

          <InformationCard title="Travel protections">
            <p>
              These benefits can have real value when you travel, but avoid
              assigning a large recurring value simply because the policy has a
              high theoretical coverage limit.
            </p>
          </InformationCard>

          <InformationCard title="Convenience benefits">
            <p>
              Estimate what a service is worth to you rather than automatically
              using the issuer&apos;s stated retail value.
            </p>
          </InformationCard>
        </div>

        <p>
          The calculator lets you enter these benefits directly so the total
          reflects your own valuation.
        </p>
      </GuideSection>

      <GuideSection
        id="alternative"
        eyebrow="Compare the Counterfactual"
        title="The right comparison is usually the card you would use instead."
      >
        <p>
          Saying that a premium card generates $900 of annual rewards is not
          enough. The relevant question is what happens if you do not keep the
          premium card.
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Think in terms of the incremental value
          </p>

          <p className="mt-5 text-xl font-semibold leading-8">
            Premium-card usable value
            <br />
            - Alternative-card value
            <br />
            - Additional annual fee
            <br />= Net premium-card value
          </p>
        </div>

        <p>
          The alternative might be a no-fee cash-back card, a lower-fee travel
          card, another premium card, or simply a different combination of
          cards.
        </p>

        <p>
          The simpler the alternative, the less opportunity cost you may have
          from giving up the premium card. The more competitive the alternative
          is, the more incremental value the premium card needs to create.
        </p>
      </GuideSection>

      <GuideSection
        id="keep-downgrade-cancel"
        eyebrow="Three Paths"
        title="Keep, downgrade, or cancel based on the role the account still plays."
      >
        <div className="space-y-6">
          <InformationCard title="Keep the card">
            <ul className="space-y-3">
              <GuideBullet>
                Your realistic usable value exceeds the additional annual fee
              </GuideBullet>
              <GuideBullet>
                The benefits match spending and travel you already do
              </GuideBullet>
              <GuideBullet>
                The premium rewards materially outperform your alternative
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Downgrade the card">
            <ul className="space-y-3">
              <GuideBullet>
                The premium benefits no longer justify the additional fee
              </GuideBullet>
              <GuideBullet>
                The underlying account or product family still has value to you
              </GuideBullet>
              <GuideBullet>
                A suitable lower-fee product is available
              </GuideBullet>
            </ul>
          </InformationCard>

          <InformationCard title="Cancel the card">
            <ul className="space-y-3">
              <GuideBullet>
                The account no longer provides useful value
              </GuideBullet>
              <GuideBullet>
                There is no worthwhile downgrade path
              </GuideBullet>
              <GuideBullet>
                You have considered the effect on your broader credit profile
              </GuideBullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          The available downgrade options and account-management rules vary by
          issuer. Check the issuer&apos;s current terms before acting.
        </p>
      </GuideSection>

      <GuideSection
        id="annual-review"
        eyebrow="This Decision Changes"
        title="A card that works this year may not work the next."
      >
        <p>
          Premium cards can change their annual fees, statement credits,
          earning categories, transfer partners, benefits, and redemption
          options. Your own travel and spending habits can also change.
        </p>

        <p>
          That means the decision should be revisited periodically rather than
          treated as permanent.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <InformationCard title="Fee changed">
            <p>
              Recalculate the fee difference using the card&apos;s current
              annual fee.
            </p>
          </InformationCard>

          <InformationCard title="Benefit changed">
            <p>
              Remove benefits you no longer use and add new benefits only at
              their realistic value.
            </p>
          </InformationCard>

          <InformationCard title="Habits changed">
            <p>
              Rebuild the calculation around your current spending and travel
              rather than last year&apos;s behavior.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      <GuideSection
        id="scenarios"
        eyebrow="Real-World Scenarios"
        title="The same annual fee can make sense for one person and not for another."
      >
        <div className="space-y-6">
          <InformationCard title="Frequent traveler with natural credit usage">
            <p>
              The cardholder routinely travels, uses most of the statement
              credits without changing behavior, and receives meaningful value
              from travel benefits. Incremental rewards over the alternative
              card add another layer of value.
            </p>
          </InformationCard>

          <InformationCard title="Occasional traveler with unused credits">
            <p>
              Many of the card&apos;s benefits sound useful but are rarely used.
              The advertised benefit total may look impressive while the
              realized value remains below the fee difference.
            </p>
          </InformationCard>

          <InformationCard title="Strong alternative card">
            <p>
              A lower-fee card already provides competitive rewards in the
              cardholder&apos;s largest spending categories. The premium card
              therefore needs to produce enough incremental rewards and benefits
              to cover its additional fee.
            </p>
          </InformationCard>

          <InformationCard title="Benefits are valuable but inconvenient">
            <p>
              A cardholder may technically use several credits but need to make
              purchases they otherwise would not make. Those credits should be
              valued below face value because the spending behavior changed.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      <DecisionChecklist
        id="checklist"
        title="A Practical Rule of Thumb"
        items={[
          "Value statement credits according to how much of them you would naturally use.",
          "Compare premium-card rewards with what your alternative card would earn on the same spending.",
          "Value points according to your realistic redemption value rather than a theoretical maximum.",
          "Assign dollar values to travel and lifestyle benefits based on what they are worth to you.",
          "Subtract the additional annual fee you are paying compared with your alternative.",
          "Do not count benefits that require spending you would not otherwise make as full-value savings.",
          "Consider whether a lower-fee product could preserve the account while removing the premium fee.",
          "Recalculate the decision when the card's fee, benefits, rewards, or your spending habits change.",
        ]}
      />

      <QuestionsToAsk
        id="questions"
        title="Questions to Ask Before Keeping a Premium Card"
        subtitle="The answers should describe your actual behavior, not the card's marketing."
        questions={[
          "Which statement credits would I use even if I did not have this card?",
          "How much of each credit would I realistically use?",
          "What card would I use instead if I did not keep this one?",
          "How much would that alternative earn on my actual spending?",
          "What is my realistic value per point or mile?",
          "How much do I personally value lounge access and other travel benefits?",
          "Would I pay for these benefits if the premium card did not provide them?",
          "Am I changing my normal spending just to use credits or earn rewards?",
          "Would a lower-fee version of the account still serve a useful purpose?",
          "Has anything about the card or my spending changed since the last time I evaluated it?",
        ]}
      />

      <KeyTakeaways
        id="takeaways"
        items={[
          "A premium card is worth its annual fee only when its realistic incremental value exceeds the additional cost compared with your alternative.",
          "Advertised benefit value and realized value are different things.",
          "Statement credits should be discounted when you would not naturally use the full amount.",
          "Rewards should be compared with what another card would earn on the same spending.",
          "Incremental rewards are more useful for decision-making than the premium card's gross rewards alone.",
          "Travel benefits should be valued according to what you would realistically pay for or use.",
          "Keep, downgrade, and cancel decisions depend on both the economics and the remaining role of the account.",
          "Premium card economics should be reviewed whenever fees, benefits, rewards, or your habits change.",
        ]}
      />

      <Sources
        sources={[
          {
            title: "Credit Card Annual Fees and Account Terms",
            publisher: "Consumer Financial Protection Bureau",
            href: "https://www.consumerfinance.gov/",
          },
          {
            title: "Understanding Credit Card Accounts and Credit History",
            publisher: "Federal Trade Commission",
            href: "https://consumer.ftc.gov/",
          },
        ]}
      />

      <RelatedDecisions currentSlug={guide.slug} />
    </GuideLayout>
  );
}