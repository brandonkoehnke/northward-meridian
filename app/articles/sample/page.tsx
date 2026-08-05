import ArticleHero from "@/app/components/article/ArticleHero";
import DecisionSnapshot from "@/app/components/article/DecisionSnapshot";
import LearningObjectives from "@/app/components/article/LearningObjectives";

export default function SampleArticle() {
    return (
        <main className="min-h-screen bg-[var(--background)]">

            <ArticleHero
                category="Personal Finance"
                title="How to Evaluate Whether a Premium Credit Card Is Worth the Annual Fee"
                description="A practical framework for deciding whether to keep, downgrade, or cancel a premium credit card."
            />

            <DecisionSnapshot
                recommendedFor="Professionals considering premium travel credit cards"
                readingTime="8 min"
                updated="August 2026"
                bottomLine="If you consistently use the monthly credits and spend heavily on dining and groceries, the annual fee is likely justified. Otherwise, consider a lower-fee alternative."
            />
            <LearningObjectives
                items={[
                    "How to calculate the real annual value of a premium credit card",
                    "Which benefits people commonly overestimate",
                    "When downgrading makes more sense than cancelling",
                    "A reusable framework for evaluating any premium card",
                ]}
            />

        </main>
    );
}