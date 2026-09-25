import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import {
    ExampleCard,
    GuideBullet,
    InformationCard,
} from "@/app/components/article/GuidePrimitives";
import GuideSection from "@/app/components/article/GuideSection";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

import ExtendedWarrantyValueCalculator from "./ExtendedWarrantyValueCalculator";

const guide = (() => {
    const found = getGuideBySlug(
        "is-an-extended-warranty-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-an-extended-warranty-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "extended-warranty-value-calculator",
        label: "Warranty value calculator",
    },
    {
        id: "why-it-matters",
        label: "Why this decision matters",
    },
    {
        id: "what-you-are-buying",
        label: "What you are buying",
    },
    {
        id: "existing-coverage",
        label: "Check existing coverage",
    },
    {
        id: "expected-value",
        label: "Expected value",
    },
    {
        id: "failure-probability",
        label: "Failure probability",
    },
    {
        id: "contract-terms",
        label: "Contract terms",
    },
    {
        id: "risk-transfer",
        label: "Expected value vs. risk",
    },
    {
        id: "worked-examples",
        label: "Worked examples",
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
        id: "checkout",
        title: "I'm being offered a warranty at checkout",
        summary:
            "Compare the plan price with the financial value of the additional coverage.",
        guidance:
            "Start with the calculator. Enter the plan price, additional coverage period, deductible, coverage limit, and a conservative estimate of the chance of a genuinely covered repair.",
        destinationId:
            "extended-warranty-value-calculator",
        destinationLabel:
            "Warranty Value Calculator",
    },
    {
        id: "expensive-repair",
        title: "I'm worried about an expensive repair",
        summary:
            "See how repair cost and coverage limits affect the value of the plan.",
        guidance:
            "A costly repair does not automatically make a protection plan valuable. Compare the amount the contract would actually cover after its deductible or service fee with what you pay for the plan.",
        destinationId: "expected-value",
        destinationLabel: "Expected Value",
    },
    {
        id: "coverage",
        title: "I don't understand what the plan covers",
        summary:
            "Separate genuinely additional protection from coverage you may already have.",
        guidance:
            "Start by identifying what coverage already comes with the product. Then verify when the optional plan begins, what failures qualify, what is excluded, and what limits apply.",
        destinationId: "existing-coverage",
        destinationLabel: "Check Existing Coverage",
    },
    {
        id: "self-insure",
        title: "I'm considering saving the money instead",
        summary:
            "Compare buying the plan with keeping the money available for future repairs.",
        guidance:
            "Expected value and risk tolerance are different questions. Compare the modeled economics first, then consider how difficult an uncovered repair would be for your household.",
        destinationId: "risk-transfer",
        destinationLabel: "Expected Value vs. Risk",
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
        publishedTime: "2026-09-25",
        modifiedTime: guide.lastModified,
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
    datePublished: "2026-09-25",
    dateModified: guide.lastModified,
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

export default function ExtendedWarrantyGuide() {
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
            <ExtendedWarrantyValueCalculator />

            <WhyThisMatters id="why-it-matters">
                <p>
                    Extended warranties are usually offered when you are
                    already focused on buying the product. That makes it easy
                    to compare the price of the plan with the full price of
                    the product rather than with the smaller financial risk
                    the plan actually covers.
                </p>

                <p>
                    The useful comparison is narrower. Ask what protection the
                    optional plan adds beyond coverage you already have, what
                    a qualifying repair would realistically cost, how much of
                    that repair the plan would pay, and how likely that
                    covered event is during the additional coverage period.
                </p>

                <p>
                    A plan can also provide risk-transfer benefits even when its
                    modeled expected value is negative. Someone who could
                    comfortably absorb a repair may evaluate the same contract
                    differently from someone for whom an unexpected repair
                    would create a serious cash-flow problem.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-you-are-buying"
                eyebrow="Start With the Contract"
                title="An optional service contract is not the same thing as the warranty that came with the product."
            >
                <p>
                    The word warranty is used loosely in everyday sales
                    conversations. For this decision, the distinction matters.
                    A manufacturer warranty may be included with the product,
                    while an optional extended warranty, protection plan, or
                    service contract generally costs extra and promises to
                    perform or pay for certain repairs or services under its
                    own terms.
                </p>

                <p>
                    That means the optional plan should not be valued as though
                    it protects the entire purchase from every possible
                    problem. Its economic value comes from the specific risks
                    it takes away from you that are not already covered
                    elsewhere.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Included warranty">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Usually comes with the product rather than
                                requiring a separate protection-plan purchase
                            </GuideBullet>
                            <GuideBullet>
                                Has its own duration, covered defects, remedies,
                                and limitations
                            </GuideBullet>
                            <GuideBullet>
                                May already cover some of the same problems
                                advertised by an optional plan
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Optional service contract">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Costs extra
                            </GuideBullet>
                            <GuideBullet>
                                May extend the coverage period or cover
                                additional risks
                            </GuideBullet>
                            <GuideBullet>
                                Can include deductibles, service fees, claim
                                limits, exclusions, or repair-network rules
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Read the actual contract rather than relying on the
                    checkout label. A plan marketed as extended coverage may
                    provide useful additional protection, duplicate existing
                    coverage, or add protection for only a narrow set of
                    failures.
                </p>
            </GuideSection>

            <GuideSection
                id="existing-coverage"
                eyebrow="Avoid Paying Twice"
                title="Determine what coverage you already have before pricing the optional plan."
            >
                <p>
                    Coverage overlap is one of the easiest ways to overvalue an
                    extended plan. If the optional contract starts immediately
                    but the manufacturer warranty already covers the same
                    failure for the first year, that first year may add little
                    or no incremental protection.
                </p>

                <p>
                    This is why the calculator separates the manufacturer
                    warranty from the additional coverage period. If you expect
                    to own a product for only two years and the included
                    warranty protects it for those same two years, a three-year
                    optional plan may provide no useful additional coverage
                    during your expected ownership period under that simplified
                    assumption.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Coverage Check
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            Manufacturer or seller warranty
                        </GuideBullet>
                        <GuideBullet>
                            Retailer protection already included with the
                            purchase
                        </GuideBullet>
                        <GuideBullet>
                            Applicable credit-card benefits
                        </GuideBullet>
                        <GuideBullet>
                            Insurance or another protection policy that may
                            cover the same loss
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    Do not assume another benefit applies merely because you
                    have a particular credit card or insurance policy. Verify
                    the current terms, eligible purchases, exclusions, claim
                    limits, and required payment method before treating another
                    benefit as existing coverage.
                </p>
            </GuideSection>

            <GuideSection
                id="expected-value"
                eyebrow="The Financial Model"
                title="Compare the price of the plan with the expected value of a genuinely covered claim."
            >
                <p>
                    Expected value is a way to compare an uncertain future
                    benefit with a certain cost today. It does not predict what
                    will happen to your individual product. It asks what the
                    plan is worth on average under the assumptions you enter.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Core Model
                    </p>

                    <div className="mt-5 space-y-4 leading-8">
                        <p>
                            <strong>Covered claim value</strong> = the smaller
                            of the typical repair cost or coverage limit, minus
                            the applicable deductible or service fee.
                        </p>

                        <p>
                            <strong>Expected claim benefit</strong> = covered
                            claim value × estimated probability of a covered
                            failure.
                        </p>

                        <p>
                            <strong>Expected net value</strong> = expected
                            claim benefit − plan price.
                        </p>

                        <p>
                            <strong>Break-even failure probability</strong> =
                            plan price ÷ covered claim value.
                        </p>
                    </div>
                </div>

                <p>
                    Suppose a plan costs $150 and a representative covered
                    repair would leave you with a $500 claim benefit after
                    limits and fees. The plan needs a 30% probability of that
                    modeled covered claim to reach financial break-even in
                    this simplified one-claim model.
                </p>

                <p>
                    That does not mean a 30% chance that anything goes wrong.
                    It means roughly a 30% chance of the kind of failure you
                    modeled actually occurring while the additional plan is
                    useful and qualifying for the modeled benefit.
                </p>
            </GuideSection>

            <GuideSection
                id="failure-probability"
                eyebrow="The Hardest Input"
                title="The chance of a covered failure matters more than the chance that something goes wrong."
            >
                <p>
                    Failure probability is usually the least certain input in
                    the calculator. Product reliability varies by category,
                    model, age, use, and failure type, and a protection plan
                    may cover only some of the problems a product can develop.
                </p>

                <p>
                    Look for reliability information specific to the product
                    category and, when available, the brand or model. Then
                    compare that information with the contract. A high failure
                    rate does not make a plan valuable if the common failures
                    are excluded or inexpensive to repair.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Useful evidence">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Product or brand reliability data
                            </GuideBullet>
                            <GuideBullet>
                                Common failure modes
                            </GuideBullet>
                            <GuideBullet>
                                Typical repair costs
                            </GuideBullet>
                            <GuideBullet>
                                Expected ownership period
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Easy mistakes">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Treating every product failure as a covered
                                claim
                            </GuideBullet>
                            <GuideBullet>
                                Using replacement price as the repair benefit
                            </GuideBullet>
                            <GuideBullet>
                                Ignoring the included warranty period
                            </GuideBullet>
                            <GuideBullet>
                                Assuming a plan covers the most expensive
                                possible failure
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If you cannot estimate the probability credibly, use the
                    calculator in reverse. The break-even probability tells
                    you how frequent the modeled covered repair would need to
                    be. You can then ask whether that threshold appears
                    plausible given the reliability evidence you can find.
                </p>
            </GuideSection>

            <GuideSection
                id="contract-terms"
                eyebrow="Fine Print Changes the Math"
                title="A low plan price does not help if the contract does not pay when you expect it to."
            >
                <p>
                    The plan price is only one cost. Some contracts charge a
                    deductible or service fee when you make a claim. Others
                    limit reimbursement, require particular repair providers,
                    impose maintenance requirements, exclude specific parts or
                    causes of damage, or require you to pay first and seek
                    reimbursement later.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Financial terms">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Upfront plan price
                            </GuideBullet>
                            <GuideBullet>
                                Deductible or service fee
                            </GuideBullet>
                            <GuideBullet>
                                Maximum claim or reimbursement limit
                            </GuideBullet>
                            <GuideBullet>
                                Shipping, diagnostic, transfer, or other fees
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Coverage terms">
                        <ul className="space-y-3">
                            <GuideBullet>
                                When coverage begins and ends
                            </GuideBullet>
                            <GuideBullet>
                                Covered parts and failure types
                            </GuideBullet>
                            <GuideBullet>
                                Accidental-damage treatment
                            </GuideBullet>
                            <GuideBullet>
                                Maintenance and repair-provider requirements
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Also identify who is responsible for fulfilling the
                    contract. The seller, manufacturer, administrator, and
                    company ultimately responsible for claims may not be the
                    same organization. A contract is less useful if the claims
                    process is difficult or the responsible company cannot
                    perform when you need it.
                </p>
            </GuideSection>

            <GuideSection
                id="risk-transfer"
                eyebrow="Expected Value vs. Risk"
                title="A financially unfavorable plan can still transfer a risk you do not want to carry."
            >
                <p>
                    Expected value answers an economic question. Risk tolerance
                    answers a household-finance question. They should not be
                    combined into one score.
                </p>

                <p>
                    Imagine a plan with a modeled expected value of negative
                    $80. Someone with a well-funded emergency reserve may
                    prefer to keep the plan price and self-insure. Someone who
                    could not absorb a qualifying $1,000 repair without taking
                    on expensive debt may place additional value on predictable
                    costs.
                </p>

                <p>
                    That does not turn negative expected value into positive
                    expected value. It means the household may willingly pay a
                    premium to transfer risk. The calculator therefore leaves
                    the financial result unchanged and presents repair
                    affordability as separate context.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="font-semibold">
                        The self-insurance alternative
                    </p>

                    <p className="mt-3 leading-8 text-[var(--muted)]">
                        Instead of buying protection plans for many individual
                        purchases, you can keep the money available in a
                        repair or emergency fund. You then retain the money
                        when products do not fail and use the fund when a
                        repair is needed.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="worked-examples"
                eyebrow="Worked Examples"
                title="The same plan price can produce very different decisions."
            >
                <div className="space-y-6">
                    <ExampleCard
                        label="Example 1"
                        title="A $1,000 product with a $150 protection plan"
                        facts={[
                            "Three years of genuinely additional coverage",
                            "$500 representative covered repair",
                            "No deductible",
                            "20% assumed probability of that covered repair",
                        ]}
                        result="The modeled expected claim benefit is $100, leaving expected net value of negative $50. The modeled claim would need about a 30% probability to reach break-even."
                    />

                    <ExampleCard
                        label="Example 2"
                        title="The same plan with a higher covered-failure assumption"
                        facts={[
                            "$150 plan price",
                            "$500 modeled covered claim",
                            "40% assumed probability of the covered repair",
                            "No deductible",
                        ]}
                        result="The expected claim benefit rises to $200, producing positive $50 modeled expected value. The break-even threshold remains 30% because the plan price and modeled claim value did not change."
                    />

                    <ExampleCard
                        label="Example 3"
                        title="A large repair limited by the contract"
                        facts={[
                            "$2,000 repair",
                            "$1,000 coverage limit",
                            "$150 plan price",
                            "20% assumed covered-failure probability",
                        ]}
                        result="The calculator caps the modeled claim at $1,000. Expected claim benefit is $200, not $400, because the contract limit matters more than the full repair bill."
                    />

                    <ExampleCard
                        label="Example 4"
                        title="A plan that outlasts your expected ownership"
                        facts={[
                            "Expected ownership period of two years",
                            "Manufacturer warranty of two years",
                            "Three years of optional coverage offered",
                            "You do not expect to keep the product beyond year two",
                        ]}
                        result="Under the calculator's simplified assumptions, the plan provides zero years of additional useful coverage during your expected ownership period. The modeled expected claim benefit is therefore zero."
                    />
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                items={[
                    "Read the actual protection-plan or service-contract terms before buying.",
                    "Confirm when the optional coverage begins and when it ends.",
                    "Compare the plan with the manufacturer warranty and any other existing protection.",
                    "Identify the deductible, service fee, reimbursement limit, and other claim costs.",
                    "Check which parts, failures, and causes of damage are excluded.",
                    "Find out who administers claims and who performs or authorizes repairs.",
                    "Estimate a realistic covered repair cost rather than automatically using the product price.",
                    "Use the calculator's break-even probability as a threshold when failure probability is uncertain.",
                    "Consider whether you could comfortably self-insure the repair risk.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying an Extended Warranty"
                subtitle="Get the answers from the actual contract or provider rather than relying only on the checkout pitch."
                questions={[
                    "When does this coverage begin, and does any part overlap the manufacturer warranty?",
                    "Exactly which failures, parts, and causes of damage are covered?",
                    "What are the most important exclusions?",
                    "Is there a deductible, service fee, diagnostic fee, shipping charge, or other claim cost?",
                    "Is there a maximum payout per claim or over the life of the plan?",
                    "Who administers the contract and makes the claim decision?",
                    "Can I choose the repair provider, or must I use an approved network?",
                    "Do I have to pay for the repair first and seek reimbursement?",
                    "What maintenance records or proof of purchase must I keep?",
                    "Can the contract be canceled or transferred, and are there fees?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "An optional extended warranty or service contract should be evaluated based on the additional protection it provides, not the full value of the product.",
                    "Check for overlap with the manufacturer warranty and other existing protection before assigning value to the optional plan.",
                    "Expected value depends on the plan price, genuinely covered repair value, deductible or service fee, coverage limits, and probability of a covered failure.",
                    "The calculator's break-even failure probability can be more useful than guessing whether a warranty is generally good or bad.",
                    "A common product failure does not help the plan's economics if that failure is excluded or inexpensive to repair.",
                    "Expected value and risk transfer are separate questions. A household may value predictable costs even when a plan has negative modeled expected value.",
                    "Self-insuring by keeping warranty money available for future repairs is a legitimate alternative to buying individual protection plans.",
                    "Read the contract and understand the claims process before paying for coverage.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title:
                            "Extended Warranties and Service Contracts",
                        publisher:
                            "Federal Trade Commission",
                        href:
                            "https://consumer.ftc.gov/articles/extended-warranties-and-service-contracts",
                    },
                    {
                        title: "Warranties",
                        publisher:
                            "Federal Trade Commission",
                        href:
                            "https://consumer.ftc.gov/articles/warranties",
                    },
                    {
                        title:
                            "Guide to Appliance Reliability",
                        publisher:
                            "Consumer Reports",
                        href:
                            "https://www.consumerreports.org/appliances/appliance-reliability-guide-a8931129914/",
                    },
                    {
                        title:
                            "Extended Warranty Buying Guide",
                        publisher:
                            "Consumer Reports",
                        href:
                            "https://www.consumerreports.org/cro/extended-warranties/buying-guide/index.htm",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="is-an-extended-warranty-worth-it" />
        </GuideLayout>
    );
}