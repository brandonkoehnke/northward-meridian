import type { Metadata } from "next";

import CashVsZeroPercentCalculator from "./CashVsZeroPercentCalculator";
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
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "zero-percent-financing-vs-cash",
    );

    if (!found) {
        throw new Error(
            "Guide not found: zero-percent-financing-vs-cash",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "cash-vs-zero-percent-calculator",
        label: "Cash vs. 0% financing calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "true-zero-apr",
        label: "What 0% APR really means",
    },
    {
        id: "cash-discount",
        label: "The cash-price difference",
    },
    {
        id: "opportunity-cost",
        label: "The opportunity cost of paying cash",
    },
    {
        id: "financing-fees",
        label: "Fees and financing costs",
    },
    {
        id: "monthly-payment",
        label: "The payment you actually need",
    },
    {
        id: "deferred-interest",
        label: "Deferred interest is different",
    },
    {
        id: "retained-cash",
        label: "What should you do with retained cash?",
    },
    {
        id: "when-cash-makes-sense",
        label: "When paying cash makes sense",
    },
    {
        id: "when-financing-makes-sense",
        label: "When 0% financing may make sense",
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
        id: "compare",
        title: "I have a 0% financing offer",
        summary:
            "Compare the financed price with the price you would pay in cash.",
        guidance:
            "Start with the calculator. Enter the actual cash price, financed price, financing fees, promotional period, and the return you could realistically earn on money you keep available.",
        destinationId: "cash-vs-zero-percent-calculator",
        destinationLabel: "Cash vs. 0% Financing Calculator",
    },
    {
        id: "cash-discount",
        title: "I get a discount for paying cash",
        summary:
            "Determine whether keeping your cash is worth giving up the discount.",
        guidance:
            "The discount is a real cost of choosing financing. Compare it with the earnings you could generate on the retained cash.",
        destinationId: "cash-vs-zero-percent-calculator",
        destinationLabel: "Cash vs. 0% Financing Calculator",
    },
    {
        id: "deferred-interest",
        title: "The offer says 'no interest if paid in full'",
        summary:
            "Make sure you understand whether this is deferred interest rather than true 0% APR.",
        guidance:
            "Read the promotional terms carefully. Deferred-interest offers can impose interest attributable to the promotional period when their conditions are not satisfied.",
        destinationId: "deferred-interest",
        destinationLabel: "Deferred Interest Is Different",
    },
    {
        id: "keep-cash",
        title: "I want to keep my cash available",
        summary:
            "Consider the value of liquidity separately from the investment return.",
        guidance:
            "The calculator models financial earnings on retained cash, but maintaining an emergency reserve or avoiding a liquidity problem can matter even when the modeled dollar difference is small.",
        destinationId: "retained-cash",
        destinationLabel: "What Should You Do With Retained Cash?",
    },
    {
        id: "monthly-payment",
        title: "I'm worried about the monthly payment",
        summary:
            "Calculate what payment is required to finish the promotion on time.",
        guidance:
            "Divide the promotional balance by the number of months only as a starting point. Check the lender's actual billing terms and give yourself enough margin to avoid missing the payoff deadline.",
        destinationId: "monthly-payment",
        destinationLabel: "The Payment You Actually Need",
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

export default function ZeroPercentFinancingVsCashGuide() {
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
            <CashVsZeroPercentCalculator />

            <WhyThisMatters id="short-answer">
                <p>
                    A genuine 0% financing offer can change the economics of a purchase
                    because it lets you delay payments without charging interest during
                    the promotional period. But &ldquo;0% interest&ldquo; does not automatically mean
                    financing is cheaper than paying cash.
                </p>

                <p>
                    The comparison depends on the price you pay under each option, any
                    financing fees, and what you could realistically earn or preserve by
                    keeping the cash instead of spending it immediately.
                </p>

                <p>
                    There is also an important distinction between a true 0% APR
                    promotion and a deferred-interest offer. Those structures can look
                    similar in advertisements but have different consequences if the
                    promotional requirements are not satisfied.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="true-zero-apr"
                eyebrow="Start With The Offer"
                title="Make sure you know what kind of promotion you are getting."
            >
                <p>
                    A true 0% APR purchase promotion means interest is not charged on the
                    promotional balance during the stated promotional period, subject to
                    the terms of the offer. If a balance remains afterward, interest can
                    begin accruing on that remaining balance according to the card or
                    financing agreement.
                </p>

                <p>
                    A deferred-interest promotion works differently. CFPB describes these
                    offers as arrangements where interest can accrue during the
                    promotional period but is not owed if the qualifying balance is paid
                    in full by the specified deadline. If the requirements are not met,
                    previously deferred interest may become payable.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="True 0% APR">
                        <ul className="space-y-3">
                            <GuideBullet>
                                No interest is charged during the promotional period under the
                                promotion&apos;s terms.
                            </GuideBullet>
                            <GuideBullet>
                                A remaining balance can begin accruing interest after the
                                promotional period ends.
                            </GuideBullet>
                            <GuideBullet>
                                You still need to understand the required payments and other
                                account terms.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Deferred interest">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Interest can accrue during the promotional period.
                            </GuideBullet>
                            <GuideBullet>
                                The accrued interest may be waived when the applicable
                                requirements are satisfied.
                            </GuideBullet>
                            <GuideBullet>
                                Failing to satisfy the promotion can create a substantially
                                different final cost.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Read the actual promotional disclosure before entering the calculator.
                    The calculator can compare the basic economics, but it should not be
                    treated as a substitute for the financing agreement.
                </p>
            </GuideSection>

            <GuideSection
                id="cash-discount"
                eyebrow="The First Comparison"
                title="A cash discount is a real financing cost."
            >
                <p>
                    Suppose a seller offers two prices:
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Pay cash">
                        <p>
                            You pay the lower cash price immediately and give up the
                            opportunity to keep that money available.
                        </p>
                    </InformationCard>

                    <InformationCard title="Use financing">
                        <p>
                            You retain the cash, but you may pay a higher purchase price,
                            financing fee, or other cost for the ability to delay payment.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    A $200 financing premium is not automatically overcome by the fact
                    that the financing has a 0% promotional rate. The retained cash has to
                    generate enough economic value to compensate for that $200 difference.
                </p>

                <p>
                    This is why the calculator asks for both the cash price and the
                    financed purchase price instead of assuming that the two are always
                    identical.
                </p>
            </GuideSection>

            <GuideSection
                id="opportunity-cost"
                eyebrow="The Economic Tradeoff"
                title="Paying cash has an opportunity cost."
            >
                <p>
                    When you pay $5,000 in cash, the purchase is complete, but you no
                    longer have that $5,000 available for another purpose. With 0%
                    financing, some of that cash can remain available while you make the
                    required payments over time.
                </p>

                <p>
                    The potential value of that retained money is the opportunity cost
                    that matters in this comparison.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        The basic idea
                    </p>

                    <p className="mt-5 text-xl font-semibold leading-8">
                        Value of retained cash
                        <br />
                        compared with
                        <br />
                        additional cost of financing
                    </p>

                    <p className="mt-5 text-[var(--muted)]">
                        Financing becomes more attractive when the economic value of the
                        retained cash exceeds the additional price, fees, and other costs
                        associated with financing.
                    </p>
                </div>

                <p>
                    The return assumption should be realistic. Cash that remains in a
                    checking account may earn little or nothing. Money placed in a
                    savings or investment vehicle may earn more, but the return can vary
                    and may involve taxes or investment risk.
                </p>
            </GuideSection>

            <GuideSection
                id="financing-fees"
                eyebrow="Look Beyond APR"
                title="A 0% APR does not necessarily mean $0 financing cost."
            >
                <p>
                    The promotional interest rate is only one part of the comparison.
                    Financing can also involve fees or a higher purchase price.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Higher purchase price">
                        <p>
                            A seller may offer a lower cash price and a higher price when you
                            choose financing.
                        </p>
                    </InformationCard>

                    <InformationCard title="Financing fee">
                        <p>
                            An upfront or account-level fee increases the effective cost of
                            using the promotion.
                        </p>
                    </InformationCard>

                    <InformationCard title="Lost discount">
                        <p>
                            A rebate or cash discount available only without financing is
                            economically equivalent to an added financing cost.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Put every known cost into the calculator rather than looking only at
                    the advertised APR.
                </p>
            </GuideSection>

            <GuideSection
                id="monthly-payment"
                eyebrow="The Deadline Matters"
                title="Calculate the payment you need—not just the minimum payment."
            >
                <p>
                    A promotional financing offer works best when the balance is paid
                    according to a deliberate schedule rather than left to the minimum
                    payment.
                </p>

                <p>
                    CFPB specifically cautions that minimum payments on deferred-interest
                    promotions may not be enough to eliminate the promotional balance by
                    the deadline.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Starting point
                    </p>

                    <p className="mt-5 text-xl font-semibold">
                        Promotional balance ÷ promotional months
                    </p>

                    <p className="mt-4 leading-7 text-[var(--muted)]">
                        For a simple true-0% purchase with no fees or additional balances,
                        dividing the promotional balance by the number of months provides a
                        useful starting point for the required payment.
                    </p>
                </div>

                <p>
                    The actual agreement can have different billing dates, minimum
                    payment rules, and allocation provisions. Use the lender&apos;s terms to
                    determine the payment schedule that keeps the promotion in compliance.
                </p>
            </GuideSection>

            <GuideSection
                id="deferred-interest"
                eyebrow="Important Distinction"
                title="Deferred interest deserves its own decision."
            >
                <p>
                    An offer that says &ldquo;no interest if paid in full&ldquo; should not be treated
                    as interchangeable with a straightforward 0% APR promotion. CFPB
                    explains that deferred-interest plans can result in interest going
                    back to the original purchase date when the balance is not paid as
                    required.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8">
                    <p className="font-semibold">
                        Read the promotion before calculating the return.
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            Find the exact date the promotional period ends.
                        </GuideBullet>
                        <GuideBullet>
                            Determine the balance that must be paid to satisfy the promotion.
                        </GuideBullet>
                        <GuideBullet>
                            Identify the APR associated with the deferred balance.
                        </GuideBullet>
                        <GuideBullet>
                            Understand how other balances and payments are treated.
                        </GuideBullet>
                        <GuideBullet>
                            Do not assume the minimum payment will satisfy the promotion.
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    The calculator intentionally does not estimate retroactive deferred
                    interest. The terms vary by promotion, so a generic assumption could
                    give a false sense of precision.
                </p>
            </GuideSection>

            <GuideSection
                id="retained-cash"
                eyebrow="What Happens To The Cash?"
                title="The value of retained cash depends on what you do with it."
            >
                <p>
                    Financing only creates an opportunity if the money you keep actually
                    remains available or earns something useful. The calculator therefore
                    models the cash balance declining as you make the monthly payments.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Keep it liquid">
                        <p>
                            The money remains available for emergencies or other near-term
                            needs. The financial return may be modest, but liquidity itself
                            can have practical value.
                        </p>
                    </InformationCard>

                    <InformationCard title="Save it">
                        <p>
                            Money held in an interest-bearing savings vehicle can generate a
                            measurable return without taking the same market risk as an
                            investment portfolio.
                        </p>
                    </InformationCard>

                    <InformationCard title="Invest it">
                        <p>
                            A higher expected return may be possible, but investment returns
                            are uncertain. A stock-market return should not be treated as a
                            guaranteed financing benefit.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    For a conservative comparison, use a return assumption that reflects
                    where you would genuinely keep the money rather than selecting an
                    optimistic investment return simply to make financing look attractive.
                </p>
            </GuideSection>

            <GuideSection
                id="when-cash-makes-sense"
                eyebrow="Pay Cash"
                title="Paying cash becomes more attractive when the financing premium is large."
            >
                <div className="space-y-6">
                    <InformationCard title="There is a meaningful cash discount">
                        <p>
                            A substantial price difference can outweigh the earnings
                            available from retaining the money during the promotional period.
                        </p>
                    </InformationCard>

                    <InformationCard title="You would not earn much on the retained cash">
                        <p>
                            When the money would otherwise sit in a low-yield account, there
                            may be little opportunity value from keeping it.
                        </p>
                    </InformationCard>

                    <InformationCard title="The payment obligation would strain your budget">
                        <p>
                            Even an economically attractive promotion may not fit your
                            household cash flow. The required payment should be sustainable
                            throughout the promotional period.
                        </p>
                    </InformationCard>

                    <InformationCard title="The promotion is complicated">
                        <p>
                            Complex terms, deferred interest, or a high risk of missing the
                            payoff deadline deserve additional scrutiny.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-financing-makes-sense"
                eyebrow="Use Financing"
                title="0% financing becomes more attractive when the terms are genuinely favorable."
            >
                <div className="space-y-6">
                    <InformationCard title="The cash and financed prices are identical">
                        <p>
                            With no fees and no price premium, the financing option can let
                            you retain cash without an explicit financing charge during the
                            promotional period.
                        </p>
                    </InformationCard>

                    <InformationCard title="Your retained cash earns a meaningful return">
                        <p>
                            The higher the realistic after-tax return on the declining cash
                            balance, the greater the potential economic benefit from delaying
                            payment.
                        </p>
                    </InformationCard>

                    <InformationCard title="You have the cash available">
                        <p>
                            A 0% offer is most useful when the purchase is already financially
                            supported by available cash rather than being used to stretch
                            beyond what you can afford.
                        </p>
                    </InformationCard>

                    <InformationCard title="The payoff schedule is manageable">
                        <p>
                            You can make the required payments throughout the promotional
                            period without depending on an uncertain future source of income.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="Small changes in the assumptions can change the result."
            >
                <div className="space-y-6">
                    <InformationCard title="Same price, no return">
                        <p>
                            A $5,000 cash price and $5,000 true-0% financed price with no
                            earnings on retained cash are approximately equal economically,
                            assuming the promotional balance is fully paid on time.
                        </p>
                    </InformationCard>

                    <InformationCard title="Same price, positive return">
                        <p>
                            If the financed price and cash price are identical and the
                            retained cash earns a positive after-tax return, financing can
                            produce an economic advantage because the payments occur over
                            time.
                        </p>
                    </InformationCard>

                    <InformationCard title="Cash price is $200 lower">
                        <p>
                            A $4,800 cash price versus a $5,000 financed price creates a
                            $200 financing premium. The retained cash must generate enough
                            value during the promotional period to overcome that difference.
                        </p>
                    </InformationCard>

                    <InformationCard title="Deferred-interest promotion">
                        <p>
                            Even when the basic price comparison looks attractive, the
                            consequences of failing to satisfy the promotional terms can be
                            materially different from a true 0% APR offer.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Confirm whether the offer is true 0% APR or deferred interest.",
                    "Compare the actual cash price with the actual financed price.",
                    "Include financing fees, lost rebates, and other costs.",
                    "Use a realistic after-tax return for the cash you would retain.",
                    "Model the retained cash declining as you make the required payments.",
                    "Make sure the required monthly payment fits comfortably within your cash flow.",
                    "Know the exact date the promotional period ends.",
                    "Do not rely on a promotional minimum payment without confirming that it will satisfy the offer.",
                    "Treat investment returns as uncertain rather than guaranteed financing savings.",
                    "Keep enough liquid cash for your other financial obligations and emergencies.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Choosing 0% Financing"
                subtitle="The answers should come from the actual financing offer and your own financial situation."
                questions={[
                    "Is this a true 0% APR promotion or a deferred-interest offer?",
                    "What is the cash price?",
                    "What is the financed purchase price?",
                    "Are there financing, origination, account, or other fees?",
                    "Do I lose a cash discount, rebate, or other incentive by financing?",
                    "How long does the promotional period last?",
                    "What monthly payment will fully eliminate the balance before the deadline?",
                    "What happens if a balance remains when the promotion ends?",
                    "Where would the retained cash realistically be kept?",
                    "What after-tax return should I reasonably expect from that cash?",
                    "Could I make every required payment even if my income or expenses changed?",
                    "Would using the retained cash for this purpose interfere with my emergency reserve or another financial goal?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A 0% APR offer is not automatically cheaper than paying cash.",
                    "Compare the actual cash price with the actual financed price.",
                    "Financing fees and lost cash discounts can make a nominally interest-free offer expensive.",
                    "The value of retained cash is an opportunity-cost calculation, not free money.",
                    "The calculator models retained cash month by month rather than assuming the entire amount earns a return for the full promotional period.",
                    "Use a realistic after-tax return assumption and recognize that investment returns are uncertain.",
                    "A true 0% APR promotion and a deferred-interest promotion are different structures.",
                    "The promotional payoff deadline matters just as much as the advertised interest rate.",
                    "A financing strategy only works when the required payments fit your actual cash flow.",
                    "Read the specific financing agreement before relying on the calculator's result.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title:
                            "I got a credit card promising no interest for a purchase if I pay in full within 12 months. How does this work?",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/ask-cfpb/i-got-a-credit-card-promising-no-interest-for-a-purchase-if-i-pay-in-full-within-12-months-how-does-this-work-en-40/",
                    },
                    {
                        title:
                            "How to understand special promotional financing offers on credit cards",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/archive/blog/how-understand-special-promotional-financing-offers-credit-cards/",
                    },
                    {
                        title:
                            "Appendix M1 to Part 1026 — Repayment Disclosures",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/rules-policy/regulations/1026/m1/",
                    },
                    {
                        title: "§ 1026.16 Advertising",
                        publisher:
                            "Consumer Financial Protection Bureau",
                        href:
                            "https://www.consumerfinance.gov/rules-policy/regulations/1026/16/",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}