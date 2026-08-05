import ArticleHero from "@/app/components/article/ArticleHero";
import ContinueExploring from "@/app/components/article/ContinueExploring";
import DecisionSnapshot from "@/app/components/article/DecisionSnapshot";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import LearningObjectives from "@/app/components/article/LearningObjectives";
import OptionsAndTradeoffs from "@/app/components/article/OptionsAndTradeoffs";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import Recommendation from "@/app/components/article/Recommendation";
import type { Guide } from "@/lib/guide";

const guide: Guide = {
  title:
    "How to Evaluate Whether a Premium Credit Card Is Worth the Annual Fee",
  category: "Personal Finance",
  description:
    "A practical framework for deciding whether to keep, downgrade, or cancel a premium credit card.",
  updated: "August 2026",
  readingTime: "8 min",
  recommendedFor:
    "Professionals considering premium travel credit cards",
  bottomLine:
    "If you consistently use the monthly credits and spend heavily on dining and groceries, the annual fee is likely justified. Otherwise, consider a lower-fee alternative.",
  learningObjectives: [
    "How to calculate the real annual value of a premium credit card",
    "Which benefits people commonly overestimate",
    "When downgrading makes more sense than cancelling",
    "A reusable framework for evaluating any premium card",
  ],
  tags: ["credit cards", "annual fees", "travel rewards"],
};

export default function PremiumCreditCardAnnualFeeGuide() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ArticleHero
        category={guide.category}
        title={guide.title}
        description={guide.description}
        updated={guide.updated}
        readingTime={guide.readingTime}
      />

      <DecisionSnapshot
        recommendedFor={guide.recommendedFor}
        readingTime={guide.readingTime}
        updated={guide.updated}
        bottomLine={guide.bottomLine}
      />

      <LearningObjectives items={guide.learningObjectives} />

      <WhyThisMatters>
        <p>
          Premium credit cards often advertise hundreds of dollars in annual
          benefits, but advertised value and realized value are not the same.
          A card can look profitable on paper while quietly costing you money
          each year.
        </p>

        <p>
          The decision is not simply whether the benefits exceed the annual
          fee. You also need to consider whether those benefits match spending
          you would make anyway, whether another card provides similar value at
          a lower cost, and whether downgrading would preserve your account
          history.
        </p>
      </WhyThisMatters>

      <Recommendation
        summary="Choose the option that best reflects the value you actually use, not the value the card advertises."
        items={[
          {
            heading: "Keep the card if you naturally use the benefits",
            description:
              "Keep the card when the credits, rewards, and travel benefits you would use anyway reliably exceed the annual fee.",
          },
          {
            heading: "Downgrade if the account still has strategic value",
            description:
              "Downgrading is often the best middle ground when you want to preserve account age and available credit without continuing to pay a premium annual fee.",
          },
          {
            heading: "Cancel if the card no longer serves a purpose",
            description:
              "Consider cancelling when the card delivers little realized value, no useful downgrade path exists, and closing it will not materially harm your broader credit profile.",
          },
        ]}
      />

      <OptionsAndTradeoffs
        options={[
          {
            title: "Keep the Card",
            summary:
              "Keeping the card makes sense when you consistently extract more value than the annual fee costs.",
            pros: [
              "Continue earning premium rewards",
              "Maintain premium travel benefits",
              "Keep account history intact",
            ],
            cons: [
              "Annual fee remains",
              "Requires consistent benefit usage",
            ],
          },
          {
            title: "Downgrade the Card",
            summary:
              "Downgrading lets you keep your credit history while reducing ongoing costs.",
            pros: [
              "Lower or no annual fee",
              "Preserve account age",
            ],
            cons: [
              "Lose premium benefits",
              "Reduced rewards earning",
            ],
          },
          {
            title: "Cancel the Card",
            summary:
              "Cancelling may be appropriate when the card no longer fits your spending and no useful downgrade path exists.",
            pros: [
              "Eliminate the annual fee",
              "Simplify your card portfolio",
            ],
            cons: [
              "May reduce total available credit",
              "Can affect account age over time",
            ],
          },
        ]}
      />

      <KeyTakeaways
        items={[
          "A premium card is only worthwhile when the value you actually use exceeds the annual fee.",
          "Statement credits should be valued based on natural spending, not their advertised maximum.",
          "Downgrading is often better than cancelling because it can preserve account history.",
          "Reevaluate the card annually because benefits, fees, and spending habits change.",
        ]}
      />

      <ContinueExploring
        guides={[
          {
            title: "How to Compare Premium Travel Cards",
            description:
              "A practical framework for comparing fees, credits, rewards, and travel benefits.",
            href: "/guides/compare-premium-travel-cards",
            category: "Personal Finance",
          },
          {
            title:
              "When to Downgrade a Credit Card Instead of Canceling",
            description:
              "How to preserve account history while reducing annual fees.",
            href: "/guides/downgrade-vs-cancel-credit-card",
            category: "Personal Finance",
          },
        ]}
      />
    </main>
  );
}