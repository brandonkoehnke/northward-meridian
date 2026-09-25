import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GapInsuranceRealityCheck from "./GapInsuranceRealityCheck";
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
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "is-gap-insurance-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-gap-insurance-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "gap-insurance-reality-check",
        label: "GAP insurance reality check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-gap-covers",
        label: "What GAP insurance actually covers",
    },
    {
        id: "how-the-gap-works",
        label: "How the gap is created",
    },
    {
        id: "how-long-gap-lasts",
        label: "How long the gap can last",
    },
    {
        id: "what-grows-the-gap",
        label: "What can make the gap larger",
    },
    {
        id: "what-gap-does-not-mean",
        label: "What GAP does not mean",
    },
    {
        id: "where-you-buy-it",
        label: "Where you buy GAP matters",
    },
    {
        id: "financing-gap",
        label: "What happens when GAP is financed",
    },
    {
        id: "when-gap-can-make-sense",
        label: "When GAP may make sense",
    },
    {
        id: "when-gap-may-not",
        label: "When GAP may not be necessary",
    },
    {
        id: "policy-details",
        label: "Policy details that can change the answer",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Decision checklist",
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
        id: "buying",
        title: "I'm buying a car and the dealer offered GAP",
        summary:
            "Find out whether you have a meaningful gap before paying for the add-on.",
        guidance:
            "Start with the reality check. Enter the vehicle value, loan payoff, payment, APR, depreciation assumption, and the GAP price you were quoted. Then compare that exposure with alternatives such as an insurer-provided GAP option.",
        destinationId: "gap-insurance-reality-check",
        destinationLabel: "GAP Insurance Reality Check",
    },
    {
        id: "already-underwater",
        title: "I already owe more than my car is worth",
        summary:
            "Estimate how large the exposure is and how long it may last.",
        guidance:
            "Use your current loan payoff rather than the original amount financed. The important number is the balance relative to what the vehicle could reasonably be worth if a total loss occurred today.",
        destinationId: "gap-insurance-reality-check",
        destinationLabel: "GAP Insurance Reality Check",
    },
    {
        id: "small-gap",
        title: "My car is only a little underwater",
        summary:
            "See whether the gap is likely to disappear quickly.",
        guidance:
            "A small current gap does not necessarily mean you need years of coverage. Model how your loan balance and vehicle value could change over the next several months.",
        destinationId: "how-long-gap-lasts",
        destinationLabel: "How Long the Gap Can Last",
    },
    {
        id: "dealer-price",
        title: "The dealer quoted me a high GAP price",
        summary:
            "Separate the value of the coverage from the price of that particular contract.",
        guidance:
            "GAP prices can vary. Before deciding, compare the dealer's offer with coverage available through your insurer or lender and examine what each contract actually covers.",
        destinationId: "where-you-buy-it",
        destinationLabel: "Where You Buy GAP Matters",
    },
    {
        id: "lease",
        title: "I'm leasing rather than buying",
        summary:
            "Check the lease agreement before assuming separate GAP coverage is necessary.",
        guidance:
            "Some lease arrangements already address the gap amount. Read the lease terms and ask the leasing company what happens after a total loss before paying for another product.",
        destinationId: "policy-details",
        destinationLabel: "Policy Details That Can Change the Answer",
    },
] as const;

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-09-24",
    dateModified: "2026-09-24",
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
        publishedTime: "2026-09-24",
        modifiedTime: "2026-09-24",
    },
    twitter: {
        card: "summary",
        title: guide.title,
        description: guide.description,
    },
};

export default function GapInsuranceGuide() {
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
            <GapInsuranceRealityCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    GAP insurance can be valuable when your auto loan balance
                    is higher than the amount your auto insurer would pay for
                    the vehicle after a total loss. Standard auto insurance
                    generally pays based on the vehicle&apos;s value, not
                    whatever remains on the loan. GAP is intended to address
                    some or all of that difference.{" "}
                    <a
                        href="https://www.consumerfinance.gov/ask-cfpb/what-is-guaranteed-asset-protection-gap-insurance-en-797/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CFPB
                    </a>
                </p>

                <p>
                    That does not mean everyone who finances a car needs GAP.
                    The important question is how large the potential gap is,
                    how long you are likely to have one, what the GAP contract
                    actually covers, and what you are paying for the coverage.
                </p>

                <p>
                    A good decision starts with the exposure rather than the
                    sales pitch. If you owe less than the vehicle is worth,
                    there is no current loan-value gap. If you owe substantially
                    more, GAP can protect against a much larger out-of-pocket
                    obligation after a total loss.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-gap-covers"
                eyebrow="Understand The Product"
                title="GAP covers a financial gap, not damage to the vehicle."
            >
                <p>
                    GAP stands for Guaranteed Asset Protection. The basic
                    concept is straightforward: after a covered total loss,
                    your primary auto insurer determines the amount payable
                    under the physical-damage policy, while your lender still
                    expects the remaining loan balance to be paid. GAP is
                    designed to address the difference when the loan balance is
                    higher than the insurance settlement.
                </p>

                <p>
                    New York&apos;s Department of Financial Services describes
                    GAP coverage as protection for the difference between a
                    vehicle&apos;s actual cash value at the time of loss and
                    the amount owed on the lease or loan at that time.{" "}
                    <a
                        href="https://www.dfs.ny.gov/insurance/ogco2008/rg080320.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        New York DFS
                    </a>
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="What standard insurance does">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Pays according to the vehicle&apos;s covered
                                loss and applicable policy terms.
                            </GuideBullet>
                            <GuideBullet>
                                A total-loss settlement is generally based on
                                the vehicle&apos;s value at the time of loss.
                            </GuideBullet>
                            <GuideBullet>
                                Does not automatically pay whatever balance
                                remains on the auto loan.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="What GAP is intended to do">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Addresses some or all of the remaining gap
                                between the insurance payment and loan or lease
                                obligation.
                            </GuideBullet>
                            <GuideBullet>
                                Applies when the contract&apos;s covered-loss
                                conditions are satisfied.
                            </GuideBullet>
                            <GuideBullet>
                                May have limits, exclusions, deductibles, or
                                other conditions.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="how-the-gap-works"
                eyebrow="The Core Math"
                title="The gap is simply the difference between what you owe and what the car is worth."
            >
                <p>
                    Imagine that you owe $31,000 on a vehicle that an insurer
                    values at $26,000 immediately before a covered total loss.
                    The basic loan-value difference is $5,000.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Illustrative example
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <InformationCard title="Loan balance">
                            <p className="text-2xl font-semibold">
                                $31,000
                            </p>
                        </InformationCard>

                        <InformationCard title="Vehicle value">
                            <p className="text-2xl font-semibold">
                                $26,000
                            </p>
                        </InformationCard>

                        <InformationCard title="Basic gap">
                            <p className="text-2xl font-semibold">
                                $5,000
                            </p>
                        </InformationCard>
                    </div>
                </div>

                <p>
                    The real claim calculation can be more complicated than
                    this example. Your insurer&apos;s settlement and your GAP
                    contract determine what happens in an actual loss. The
                    calculator above is therefore a planning tool, not a
                    prediction of a future claim.
                </p>
            </GuideSection>

            <GuideSection
                id="how-long-gap-lasts"
                eyebrow="Time Matters"
                title="A gap can shrink over time, even when the vehicle keeps depreciating."
            >
                <p>
                    Your loan balance usually declines as you make payments,
                    while the vehicle can lose value as it ages and accumulates
                    mileage. The two lines move in opposite directions.
                </p>

                <p>
                    That means a vehicle can be substantially underwater at one
                    point and have little or no gap later. Conversely, a buyer
                    who starts with a large negative-equity balance can remain
                    underwater for a much longer period.
                </p>

                <p>
                    The exact crossover point cannot be known in advance because
                    both the loan balance and the vehicle&apos;s future market
                    value are uncertain. That is why the calculator uses
                    assumptions rather than presenting its projection as a
                    guaranteed result.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-lg font-semibold">
                        The useful question is not just:
                    </p>

                    <p className="mt-3 text-xl font-semibold tracking-tight">
                        &ldquo;Am I underwater today?&rdquo;
                    </p>

                    <p className="mt-6 text-lg font-semibold">
                        It is also:
                    </p>

                    <p className="mt-3 text-xl font-semibold tracking-tight">
                        &ldquo;How large could the exposure be, and how long is
                        it likely to matter?&rdquo;
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="what-grows-the-gap"
                eyebrow="Risk Factors"
                title="Certain financing choices can make a gap much larger."
            >
                <p>
                    GAP becomes more relevant when the loan balance is
                    substantially ahead of the vehicle&apos;s value. Several
                    purchase decisions can contribute to that situation.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Large upfront negative equity">
                        <p>
                            Rolling an existing loan shortfall into a new
                            vehicle loan can mean starting the new loan with
                            more debt than the new vehicle is worth.
                        </p>
                    </InformationCard>

                    <InformationCard title="Small or no down payment">
                        <p>
                            Financing most or all of the purchase price leaves
                            less equity available to absorb early depreciation.
                        </p>
                    </InformationCard>

                    <InformationCard title="Rapid early depreciation">
                        <p>
                            New vehicles can lose value quickly after purchase.
                            If the loan balance falls more slowly than the
                            vehicle&apos;s value, the gap can grow.
                        </p>
                    </InformationCard>

                    <InformationCard title="Long loan terms">
                        <p>
                            A longer term can slow the pace at which principal
                            is repaid, potentially leaving the borrower
                            underwater for longer.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    None of these factors automatically means GAP is necessary.
                    They simply make the potential exposure more important to
                    quantify.
                </p>
            </GuideSection>

            <GuideSection
                id="what-gap-does-not-mean"
                eyebrow="Important Distinction"
                title="Having a GAP policy does not mean every dollar of debt disappears after a total loss."
            >
                <p>
                    GAP products are contracts, and their definitions and
                    exclusions matter. CFPB notes that GAP products can have
                    eligibility restrictions and that coverage can vary.
                </p>

                <p>
                    A GAP contract may cover some or all of the covered gap,
                    subject to its terms. Items such as late payments, certain
                    fees, prior loan balances, exclusions, maximum benefits, and
                    deductibles can affect what ultimately gets paid.
                </p>

                <p>
                    The safest approach is to treat the contract itself as the
                    source of truth. The calculator can estimate your exposure;
                    it cannot determine whether a particular policy will cover
                    every component of a future claim.
                </p>
            </GuideSection>

            <GuideSection
                id="where-you-buy-it"
                eyebrow="Shop The Coverage"
                title="The same basic protection can come with very different prices."
            >
                <p>
                    GAP can be offered through a dealership, lender, or auto
                    insurer. CFPB specifically recommends comparing prices and
                    coverage because the price can vary substantially.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Dealer or lender">
                        <p>
                            Convenient, but the cost can be added to the auto
                            financing, increasing the amount financed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Auto insurer">
                        <p>
                            Some insurers offer GAP coverage as a policy option
                            or endorsement. Pricing and eligibility vary.
                        </p>
                    </InformationCard>

                    <InformationCard title="Lease or existing agreement">
                        <p>
                            Some lease or financing arrangements may already
                            address the gap. Check the agreement before buying
                            duplicate protection.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The relevant comparison is therefore not simply &ldquo;GAP
                    or no GAP.&rdquo; It can be &ldquo;which GAP product, at
                    what price, with what coverage, for how long?&rdquo;
                </p>
            </GuideSection>

            <GuideSection
                id="financing-gap"
                eyebrow="The Hidden Cost"
                title="Financing the GAP premium makes GAP more expensive than its sticker price."
            >
                <p>
                    If a $700 GAP charge is added to a financed purchase, you
                    are not necessarily paying only $700. You are borrowing the
                    $700 along with the vehicle.
                </p>

                <p>
                    CFPB warns that financing a GAP product into an auto loan
                    increases the total loan amount and therefore can increase
                    the total interest paid over time.{" "}
                    <a
                        href="https://www.consumerfinance.gov/ask-cfpb/what-is-guaranteed-asset-protection-gap-insurance-en-797/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CFPB
                    </a>
                </p>

                <p>
                    This matters because the amount shown by the salesperson
                    may not be the full economic cost. Ask to see the amount
                    financed with and without the GAP product, then compare the
                    resulting total cost.
                </p>
            </GuideSection>

            <GuideSection
                id="when-gap-can-make-sense"
                eyebrow="When The Exposure Is Meaningful"
                title="GAP becomes more compelling when a large financial shortfall could hurt you."
            >
                <p>
                    GAP is most relevant when a total loss could leave you with
                    a debt obligation that you would have difficulty paying
                    after the insurance settlement.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="A large current gap">
                        <p>
                            If your loan balance is substantially above the
                            vehicle&apos;s estimated value, a total loss could
                            create a sizable bill.
                        </p>
                    </InformationCard>

                    <InformationCard title="A long projected underwater period">
                        <p>
                            A larger or longer-lasting gap gives the coverage
                            more potential exposure to protect, although that
                            still does not determine whether the price is
                            worthwhile.
                        </p>
                    </InformationCard>

                    <InformationCard title="You cannot comfortably absorb a loss">
                        <p>
                            Even a temporary shortfall can be financially
                            disruptive if you do not have enough liquid savings
                            to cover it.
                        </p>
                    </InformationCard>

                    <InformationCard title="The alternative coverage is inexpensive">
                        <p>
                            A reasonably priced GAP option may be easier to
                            justify when the exposure is meaningful and the
                            contract provides broad, clearly defined coverage.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-gap-may-not"
                eyebrow="When The Exposure Is Small"
                title="GAP may be less useful when you have substantial equity or very little exposure."
            >
                <p>
                    If the vehicle is worth more than the amount owed, you do
                    not currently have a loan-value gap. You may therefore have
                    little reason to pay for protection against a gap that does
                    not exist.
                </p>

                <p>
                    The same logic can apply when a small gap is expected to
                    disappear quickly and the cost of coverage is high. The
                    calculator can help make that exposure visible, but the
                    final decision still depends on the policy terms and your
                    ability to absorb a loss.
                </p>

                <p>
                    This is one reason a dealer&apos;s statement that you have
                    GAP available is not enough information. The decision
                    requires the vehicle value, loan balance, policy price, and
                    contract terms.
                </p>
            </GuideSection>

            <GuideSection
                id="policy-details"
                eyebrow="Read The Contract"
                title="The fine print can matter as much as the price."
            >
                <p>
                    Before buying GAP, identify exactly what the contract
                    covers and what it excludes.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Does it cover the entire covered loan gap or only up to
                        a stated percentage or dollar limit?
                    </GuideBullet>
                    <GuideBullet>
                        Does it cover your physical-damage insurance
                        deductible?
                    </GuideBullet>
                    <GuideBullet>
                        Are there exclusions for certain fees, missed
                        payments, modifications, or other loan charges?
                    </GuideBullet>
                    <GuideBullet>
                        How long does the GAP coverage remain active?
                    </GuideBullet>
                    <GuideBullet>
                        What happens if you refinance, sell the vehicle, or
                        pay the loan off early?
                    </GuideBullet>
                    <GuideBullet>
                        Is unused premium or coverage refundable after an early
                        payoff or cancellation?
                    </GuideBullet>
                </ul>

                <p>
                    CFPB notes that consumers may be entitled to a refund in
                    some circumstances after selling, refinancing, or
                    prepaying an auto loan. The actual refund depends on the
                    applicable contract and circumstances, so do not assume a
                    particular refund formula without checking the paperwork.
                </p>

                <p>
                    GAP is also generally an optional add-on. CFPB says that
                    consumers generally cannot be required to buy GAP or an
                    extended warranty to obtain an auto loan.{" "}
                    <a
                        href="https://www.consumerfinance.gov/ask-cfpb/am-i-required-to-purchase-an-extended-warranty-or-guaranteed-asset-protection-gap-insurance-from-a-lender-or-dealer-to-get-an-auto-loan-en-807/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CFPB
                    </a>
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same GAP price can mean very different things for different buyers."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: Little or no negative equity">
                        <p>
                            You finance a vehicle with a substantial down
                            payment and the estimated vehicle value is close to
                            or above your loan payoff. Your potential gap is
                            small.
                        </p>

                        <p className="mt-4">
                            In this situation, the question may be less about
                            whether GAP is inherently valuable and more about
                            whether you want to pay for protection against a
                            relatively small exposure.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: Large amount financed">
                        <p>
                            You finance nearly the entire purchase price,
                            select a long term, and the vehicle depreciates
                            quickly.
                        </p>

                        <p className="mt-4">
                            The loan can remain above the vehicle&apos;s value
                            for a meaningful period. A reasonably priced GAP
                            policy could protect a much larger potential
                            shortfall.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: Existing negative equity is rolled into the new loan">
                        <p>
                            Your trade-in is worth less than its payoff amount,
                            and the difference is included in the new loan.
                        </p>

                        <p className="mt-4">
                            The new vehicle can begin its loan with a substantial
                            negative position. This is exactly the kind of
                            situation where quantifying the exposure before
                            declining or buying GAP is useful.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: The dealer quotes an expensive GAP product">
                        <p>
                            Your loan has a meaningful gap, but the dealer
                            offers GAP at a high one-time price and adds it to
                            the financing.
                        </p>

                        <p className="mt-4">
                            The correct comparison is not necessarily
                            &ldquo;GAP versus no GAP.&rdquo; Compare that offer
                            with other available GAP options and calculate the
                            additional financing cost.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Buy GAP"
                items={[
                    "Get the current loan payoff rather than relying on the original amount financed.",
                    "Estimate the vehicle's current value using a realistic source and understand that an actual insurance settlement can differ.",
                    "Use the reality check to see whether you currently have a gap and how long the modeled exposure lasts.",
                    "Ask for the total GAP price and the total amount you will pay if the GAP charge is financed.",
                    "Compare the dealer or lender offer with GAP coverage available through your auto insurer or another legitimate source.",
                    "Read the GAP contract for limits, exclusions, deductible treatment, duration, and cancellation or refund provisions.",
                    "Ask what happens to GAP if you sell, refinance, or pay off the loan early.",
                    "Decide whether the remaining potential shortfall is large enough that paying for protection would materially improve your financial position.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Bring these questions to the dealer, lender, insurer, or leasing company before you pay for GAP."
                questions={[
                    "What is the exact price of the GAP product before and after financing?",
                    "What portion of my loan balance is eligible for GAP coverage after a total loss?",
                    "Does the GAP contract cover my physical-damage insurance deductible?",
                    "Are there exclusions or maximum payout limits I should know about?",
                    "How long does the GAP coverage remain in force?",
                    "What happens to the GAP coverage if I refinance, sell the vehicle, or pay off the loan early?",
                    "Would my auto insurer offer comparable GAP coverage at a different price?",
                    "Is GAP optional under the financing agreement, and where is that shown in the paperwork?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "GAP insurance is designed to address the difference between an auto loan or lease obligation and the amount paid by primary insurance after a covered total loss.",
                    "The most important starting point is your actual current loan payoff compared with a realistic estimate of the vehicle's current value.",
                    "A current gap does not necessarily last for the entire loan. Loan amortization and depreciation can change the exposure over time.",
                    "A large down payment, rapid principal repayment, and substantial vehicle equity can reduce the potential need for GAP.",
                    "Rolling negative equity into a new loan, making a small down payment, and using a long loan term can increase the potential exposure.",
                    "The price and contract terms matter. Compare GAP offers rather than assuming the dealer's product is the only option.",
                    "Financing a GAP premium can increase its total cost because the premium becomes part of the amount borrowed.",
                    "The calculator estimates financial exposure; it does not predict the probability of a total loss or guarantee what a future GAP claim will pay.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "What is Guaranteed Asset Protection (GAP) insurance?",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/ask-cfpb/what-is-guaranteed-asset-protection-gap-insurance-en-797/",
                    },
                    {
                        title:
                            "Am I required to purchase an extended warranty, GAP insurance, or credit insurance to get an auto loan?",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/ask-cfpb/am-i-required-to-purchase-an-extended-warranty-or-guaranteed-asset-protection-gap-insurance-from-a-lender-or-dealer-to-get-an-auto-loan-en-807/",
                    },
                    {
                        title: "Auto loan key terms",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/consumer-tools/auto-loans/answers/key-terms/",
                    },
                    {
                        title:
                            "Auto Insurance Information for Consumers",
                        publisher:
                            "New York State Department of Financial Services",
                        href:
                            "https://www.dfs.ny.gov/consumers/auto_insurance/Auto_resource_center",
                    },
                    {
                        title:
                            "OGC Opinion No. 08-03-20: Gap Waivers and Gap Insurance",
                        publisher:
                            "New York State Department of Financial Services",
                        href:
                            "https://www.dfs.ny.gov/insurance/ogco2008/rg080320.htm",
                    },
                    {
                        title:
                            "Financing or Leasing a Car",
                        publisher:
                            "Federal Trade Commission",
                        href:
                            "https://consumer.ftc.gov/articles/financing-or-leasing-car",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}