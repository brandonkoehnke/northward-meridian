import ArticleHero from "@/app/components/article/ArticleHero";
import ContinueExploring from "@/app/components/article/ContinueExploring";
import DecisionSnapshot from "@/app/components/article/DecisionSnapshot";
import LearningObjectives from "@/app/components/article/LearningObjectives";
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