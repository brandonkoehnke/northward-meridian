import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import TireRoadHazardValueCheck from "./TireRoadHazardValueCheck";
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
        "is-tire-road-hazard-protection-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-tire-road-hazard-protection-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "tire-road-hazard-value-check",
        label: "Tire road hazard value check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-road-hazard-covers",
        label: "What road hazard protection covers",
    },
    {
        id: "repair-vs-replace",
        label: "Repair vs. replace",
    },
    {
        id: "price-vs-protection",
        label: "Price vs. protection",
    },
    {
        id: "coverage-limits",
        label: "Coverage limits matter",
    },
    {
        id: "free-coverage",
        label: "When the protection is free",
    },
    {
        id: "awd-and-tire-matching",
        label: "AWD and tire matching",
    },
    {
        id: "when-it-can-make-sense",
        label: "When it can make sense",
    },
    {
        id: "when-it-may-not",
        label: "When it may not",
    },
    {
        id: "real-world-scenarios",
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
        id: "buying-tires",
        title: "I'm buying new tires and was offered road-hazard protection",
        summary:
            "Compare the protection cost with the price of the tires and a covered replacement.",
        guidance:
            "Start with the value check. Enter the price per tire, number of tires, protection cost, and the actual reimbursement terms in the plan you were offered.",
        destinationId: "tire-road-hazard-value-check",
        destinationLabel: "Tire Road Hazard Value Check",
    },
    {
        id: "free-protection",
        title: "The protection is included for free",
        summary:
            "Figure out what the free coverage really gives you.",
        guidance:
            "Free protection changes the decision because there is no premium to recover. The important question becomes whether the coverage has useful limits and exclusions.",
        destinationId: "free-coverage",
        destinationLabel: "When the Protection Is Free",
    },
    {
        id: "repair",
        title: "I have a puncture in one tire",
        summary:
            "Determine whether the tire should be repaired or replaced before thinking about coverage.",
        guidance:
            "Road-hazard protection does not automatically mean replacement. Many punctures can be repaired safely when the damage meets industry and manufacturer requirements.",
        destinationId: "repair-vs-replace",
        destinationLabel: "Repair vs. Replace",
    },
    {
        id: "expensive-plan",
        title: "The protection plan is expensive",
        summary:
            "See how many covered events you would need before the plan recovers its cost.",
        guidance:
            "A higher protection price needs more claims or greater savings to break even. Compare the plan cost with the amount the contract would realistically pay.",
        destinationId: "price-vs-protection",
        destinationLabel: "Price vs. Protection",
    },
    {
        id: "awd",
        title: "I have an AWD vehicle",
        summary:
            "Check whether replacing one tire could create additional tire-matching costs.",
        guidance:
            "AWD can introduce another consideration: the replacement tire may need to remain closely matched to the other tires. Check your vehicle and tire manufacturer's requirements.",
        destinationId: "awd-and-tire-matching",
        destinationLabel: "AWD and Tire Matching",
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
        publishedTime: "2026-09-24",
        modifiedTime: "2026-09-24",
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

export default function TireRoadHazardProtectionGuide() {
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
            <TireRoadHazardValueCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    Road-hazard protection can pay for some tire damage caused
                    by hazards such as punctures, bruises, or impacts, but
                    whether it is worth paying for depends on the contract,
                    the price of the protection, and how much a covered event
                    would save you.
                </p>

                <p>
                    The most useful comparison is not simply the plan price
                    versus the tire price. You need to know what the plan would
                    actually pay, what costs remain yours, how long coverage
                    lasts, and whether the damage would otherwise require a
                    repair or a replacement.
                </p>

                <p>
                    Some tires already come with road-hazard protection at no
                    additional charge. When that happens, there is no premium
                    to recover, so the decision shifts toward understanding the
                    coverage limits and exclusions.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-road-hazard-covers"
                eyebrow="Understand The Product"
                title="Road-hazard protection is different from a normal tire warranty."
            >
                <p>
                    Road-hazard protection is intended to address damage caused
                    by hazards encountered during ordinary driving, such as
                    nails, glass, and potholes. It is different from protection
                    for manufacturing defects or ordinary tread wear.
                </p>

                <p>
                    The exact definition depends on the contract. For example,
                    Tire Rack&apos;s current protection terms define a covered
                    loss around a tire becoming unserviceable because of impact
                    with a road hazard and specifically list numerous exclusions.
                    Other tire manufacturers and retailers can use different
                    terms.{" "}
                    <a
                        href="https://www.tirerack.com/tires/roadHazard/trhp_obligations.jsp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Tire Rack terms
                    </a>
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Typical road-hazard examples">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Nail or screw puncture.
                            </GuideBullet>
                            <GuideBullet>
                                Glass or other road debris.
                            </GuideBullet>
                            <GuideBullet>
                                Certain pothole or impact damage.
                            </GuideBullet>
                            <GuideBullet>
                                Other qualifying road hazards specified by the
                                contract.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Common exclusions">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Manufacturer defects or recalls.
                            </GuideBullet>
                            <GuideBullet>
                                Normal tread wear.
                            </GuideBullet>
                            <GuideBullet>
                                Improper maintenance or inflation.
                            </GuideBullet>
                            <GuideBullet>
                                Damage excluded by the particular contract,
                                such as certain collisions or commercial use.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="repair-vs-replace"
                eyebrow="The First Decision"
                title="A damaged tire may not need to be replaced."
            >
                <p>
                    One of the most important details in evaluating road-hazard
                    protection is whether the tire can be safely repaired.
                    Paying for a plan that primarily covers replacement is less
                    valuable when many of the problems you encounter would be
                    repairable anyway.
                </p>

                <p>
                    The U.S. Tire Manufacturers Association recommends
                    considering a puncture repair only when the damage is
                    confined to the repairable tread area and the puncture
                    injury is no larger than 1/4 inch (6 mm). The tire also has
                    to be removed and inspected, and the repair must follow
                    applicable procedures.{" "}
                    <a
                        href="https://www.ustires.org/tire-care-safety/tire-repair-basics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        USTMA
                    </a>
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        A useful sequence
                    </p>

                    <div className="mt-6 space-y-5">
                        <InformationCard title="1. Can the tire be safely repaired?">
                            <p>
                                A qualifying tread-area puncture may be
                                repairable.
                            </p>
                        </InformationCard>

                        <InformationCard title="2. If not, what would replacement cost?">
                            <p>
                                Compare the replacement tire and any mounting,
                                balancing, disposal, or other costs.
                            </p>
                        </InformationCard>

                        <InformationCard title="3. What would the protection actually pay?">
                            <p>
                                Use the contract&apos;s real reimbursement terms
                                rather than the sales description.
                            </p>
                        </InformationCard>
                    </div>
                </div>

                <p>
                    A plan can still have value through repairs. Some contracts
                    cover qualifying repairs up to a stated amount, which can
                    make the protection useful even when no replacement claim
                    occurs.
                </p>
            </GuideSection>

            <GuideSection
                id="price-vs-protection"
                eyebrow="Do The Math"
                title="The right comparison is the protection cost against the benefit you could realistically receive."
            >
                <p>
                    Suppose four tires cost $200 each and road-hazard protection
                    costs $60 for the set. The protection is 7.5% of the tire
                    purchase price.
                </p>

                <p>
                    But that 7.5% number does not tell you whether the plan is a
                    good purchase. You also need to know how much a covered
                    replacement would save after subtracting costs the plan
                    does not cover.
                </p>

                <p>
                    That is why the calculator asks for the replacement benefit
                    and uncovered service costs. A plan paying the full tire
                    price is economically different from a plan that reimburses
                    only part of the cost.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Lower protection cost">
                        <p>
                            Fewer covered events may be required before the plan
                            recovers its price.
                        </p>
                    </InformationCard>

                    <InformationCard title="Higher protection cost">
                        <p>
                            More covered events, larger savings per event, or
                            useful repair benefits may be needed to justify the
                            price.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The calculator&apos;s break-even result is deliberately
                    limited. It tells you how many modeled covered replacement
                    events would be needed to recover the protection cost. It
                    does not predict how many events you will actually have.
                </p>
            </GuideSection>

            <GuideSection
                id="coverage-limits"
                eyebrow="Read The Contract"
                title="A tire plan can cover less than the salesperson&apos;s headline suggests."
            >
                <p>
                    Coverage details vary considerably. A contract may pay the
                    cost of a replacement tire but leave mounting, balancing,
                    taxes, disposal, or other services to you.
                </p>

                <p>
                    Tire Rack&apos;s current terms, for example, specify
                    separate treatment for tire replacement and repair and list
                    several costs and circumstances that are not covered.
                    Coverage also ends based on the contract&apos;s time and
                    tread-depth rules.{" "}
                    <a
                        href="https://www.tirerack.com/tires/roadHazard/trhp_obligations.jsp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Tire Rack terms
                    </a>
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Check the protection period.
                    </GuideBullet>
                    <GuideBullet>
                        Check the tread-depth cutoff.
                    </GuideBullet>
                    <GuideBullet>
                        Check whether repairs are covered and up to what
                        amount.
                    </GuideBullet>
                    <GuideBullet>
                        Check whether the plan pays the full replacement tire
                        or only a prorated or capped amount.
                    </GuideBullet>
                    <GuideBullet>
                        Check mounting, balancing, disposal, taxes, and other
                        excluded charges.
                    </GuideBullet>
                    <GuideBullet>
                        Check whether the protection transfers with the
                        vehicle or tires.
                    </GuideBullet>
                </ul>

                <p>
                    The contract should control the decision. A generic
                    statement that a tire has &ldquo;road-hazard coverage&rdquo;
                    is not enough to determine its value.
                </p>
            </GuideSection>

            <GuideSection
                id="free-coverage"
                eyebrow="A Different Decision"
                title="When protection is included for free, the question changes."
            >
                <p>
                    Some tire brands, retailers, and purchases include road
                    hazard protection without a separate charge. Consumer
                    Reports has found that a meaningful share of surveyed tire
                    buyers received this type of protection free from a tire
                    maker, retailer, or manufacturer.
                </p>

                <p>
                    When the protection is free, there is no premium that needs
                    to be recovered. That makes the economic decision much
                    simpler: determine whether the coverage could provide useful
                    benefits and whether its restrictions make it practical to
                    use.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="If it is free">
                        <p>
                            Focus on coverage limits, repair benefits, eligible
                            tires, claim procedures, and exclusions.
                        </p>
                    </InformationCard>

                    <InformationCard title="If it costs extra">
                        <p>
                            Compare the premium with the realistic financial
                            benefit of covered repairs or replacements.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="awd-and-tire-matching"
                eyebrow="AWD Consideration"
                title="An AWD vehicle can make a single damaged tire more complicated."
            >
                <p>
                    Replacing a single tire is not always as simple on an
                    all-wheel-drive vehicle as it is on a two-wheel-drive
                    vehicle.
                </p>

                <p>
                    Tire diameter and rolling circumference can matter to the
                    drivetrain and vehicle systems. The exact allowable
                    difference depends on the vehicle manufacturer, tire
                    manufacturer, drivetrain, and tire condition.
                </p>

                <p>
                    That means an AWD owner should check the vehicle
                    manufacturer&apos;s requirements before assuming that a
                    covered replacement of one tire is the entire economic
                    consequence of the damage.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Ask first
                    </p>

                    <ul className="mt-5 space-y-4">
                        <GuideBullet>
                            Does the manufacturer specify a maximum allowable
                            tread-depth or circumference difference?
                        </GuideBullet>
                        <GuideBullet>
                            Does your tire dealer offer a matching or shaving
                            solution when only one tire is replaced?
                        </GuideBullet>
                        <GuideBullet>
                            Would another tire need replacement because of
                            tread-depth mismatch?
                        </GuideBullet>
                    </ul>
                </div>
            </GuideSection>

            <GuideSection
                id="when-it-can-make-sense"
                eyebrow="When The Exposure Is Meaningful"
                title="Paid road-hazard protection can make more sense when one tire failure would create a large bill."
            >
                <p>
                    The economics become more favorable when tires are
                    expensive, the protection price is relatively low, and the
                    contract would pay a substantial share of a replacement.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Expensive tires">
                        <p>
                            A single replacement can cost hundreds of dollars,
                            increasing the dollar value of useful coverage.
                        </p>
                    </InformationCard>

                    <InformationCard title="Low protection price">
                        <p>
                            A low premium means fewer successful claims are
                            needed to recover the cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="Good replacement benefit">
                        <p>
                            Coverage is more useful when it pays a large share
                            of the actual replacement cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="Useful repair coverage">
                        <p>
                            Repair reimbursement can provide value even when a
                            damaged tire does not need to be replaced.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-it-may-not"
                eyebrow="When The Exposure Is Small"
                title="Paid protection can be harder to justify when the plan is expensive or the covered benefit is small."
            >
                <p>
                    A plan becomes less attractive when its premium is high
                    relative to the benefit it would provide.
                </p>

                <p>
                    This can happen when the tires are inexpensive, the
                    protection is costly, reimbursement is capped or prorated,
                    repair claims are limited, or the coverage period is short.
                </p>

                <p>
                    The decision can also change when you already receive
                    equivalent protection from the tire manufacturer, retailer,
                    or another contract. Duplicate coverage is not automatically
                    additional value.
                </p>
            </GuideSection>

            <GuideSection
                id="real-world-scenarios"
                eyebrow="Put It Together"
                title="The same road-hazard plan can make sense for one tire purchase and not another."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: Four expensive tires with inexpensive protection">
                        <p>
                            A $1,200 set of tires comes with a relatively low
                            protection price and substantial replacement
                            benefits.
                        </p>

                        <p className="mt-4">
                            A single qualifying replacement could recover a
                            large share of the premium, especially if the plan
                            also provides repair benefits.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: Low-cost tires with expensive protection">
                        <p>
                            A less expensive tire set is offered with a
                            protection plan that costs a large percentage of
                            the purchase.
                        </p>

                        <p className="mt-4">
                            More covered events would be needed before the plan
                            recovers its price. Contract exclusions become
                            especially important.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: Free manufacturer coverage">
                        <p>
                            The retailer includes road-hazard protection at no
                            additional cost.
                        </p>

                        <p className="mt-4">
                            There is no premium to recover. The useful question
                            is whether the free coverage has meaningful limits
                            and whether you can realistically use it.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: AWD vehicle with one damaged tire">
                        <p>
                            The plan covers replacement of one tire, but your
                            AWD vehicle may have requirements about tread-depth
                            differences.
                        </p>

                        <p className="mt-4">
                            A single covered tire might therefore not represent
                            the full cost or decision. Check the vehicle and
                            tire requirements before assuming the claim solves
                            the entire problem.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Buy Road-Hazard Protection"
                items={[
                    "Find out whether the tires already include road-hazard coverage at no additional cost.",
                    "Enter the actual tire price and protection price into the value check.",
                    "Determine whether the contract covers repairable punctures or only certain replacement events.",
                    "Check whether replacement reimbursement is full, prorated, capped, or subject to a maximum dollar amount.",
                    "Identify costs that remain your responsibility, such as mounting, balancing, disposal, taxes, or other services.",
                    "Check the coverage period and tread-depth cutoff.",
                    "Ask what happens when you replace a covered tire or sell the vehicle.",
                    "For AWD vehicles, check the manufacturer's requirements for tread-depth or circumference differences before assuming one tire can be replaced by itself.",
                    "Compare the paid plan with any free manufacturer, retailer, insurer, or other coverage you already have.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Bring these questions to the tire retailer or plan administrator before paying for protection."
                questions={[
                    "Is road-hazard protection already included with these tires?",
                    "What exact damage qualifies as a covered road hazard?",
                    "Will you repair a qualifying puncture before replacing the tire?",
                    "How much will the plan pay for a replacement tire?",
                    "Is the replacement benefit prorated or subject to a dollar limit?",
                    "Which mounting, balancing, disposal, taxes, or other service charges are excluded?",
                    "How long does the protection last, and what tread-depth limit ends coverage?",
                    "What happens to the protection if I replace a covered tire or sell the vehicle?",
                    "Does my AWD vehicle have any tire-matching requirements that could affect a one-tire replacement?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Road-hazard protection can cover certain tire damage caused by hazards such as punctures and impacts, but the exact coverage depends on the contract.",
                    "A damaged tire may be repairable rather than replaceable. USTMA says repairability depends on factors such as damage location, size, and proper repair procedures.",
                    "The most useful economic comparison is the protection price versus the realistic benefit from covered repairs and replacements.",
                    "A plan that pays the full replacement tire is economically different from one with prorated reimbursement, caps, or significant excluded service costs.",
                    "Some tire purchases include road-hazard protection at no extra charge. In that case, focus on coverage quality rather than recovering a premium.",
                    "AWD vehicles can create additional tire-matching considerations when only one tire is damaged.",
                    "The calculator shows how many modeled replacement events would be needed to recover the protection cost; it does not predict how many claims you will have.",
                    "Read the actual contract. The coverage description at the point of sale may not include every important limitation.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Tire Repair Basics",
                        publisher:
                            "U.S. Tire Manufacturers Association",
                        href:
                            "https://www.ustires.org/tire-care-safety/tire-repair-basics",
                    },
                    {
                        title:
                            "Puncture Repair Procedures for Passenger and Light Truck Tires",
                        publisher:
                            "U.S. Tire Manufacturers Association",
                        href:
                            "https://www.ustires.org/resources/puncture-repair-procedures-passenger-and-light-truck-tires-0",
                    },
                    {
                        title:
                            "Tire Road Hazard Protection Terms and Conditions",
                        publisher: "Tire Rack",
                        href:
                            "https://www.tirerack.com/tires/roadHazard/trhp_obligations.jsp",
                    },
                    {
                        title:
                            "Tire Road Hazard Protection",
                        publisher: "Tire Rack",
                        href:
                            "https://www.tirerack.com/about/road-hazard-protection",
                    },
                    {
                        title:
                            "How to Save Money When Buying Replacement Tires",
                        publisher: "Consumer Reports",
                        href:
                            "https://www.consumerreports.org/cars/tire-buying-maintenance/how-to-save-money-when-buying-replacement-tires-a6799675738/",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}