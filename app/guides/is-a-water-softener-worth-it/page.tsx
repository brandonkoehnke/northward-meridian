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
import WaterSoftenerPaybackCheck from "./WaterSoftenerPaybackCheck";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-water-softener-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-water-softener-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "water-softener-payback-check",
        label: "Water softener payback check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "measure-hardness",
        label: "Measure your water hardness",
    },
    {
        id: "what-softening-does",
        label: "What a softener actually does",
    },
    {
        id: "what-it-does-not-do",
        label: "What a softener does not do",
    },
    {
        id: "financial-benefits",
        label: "Where savings can come from",
    },
    {
        id: "operating-cost",
        label: "What a softener costs to operate",
    },
    {
        id: "efficiency",
        label: "Efficiency matters",
    },
    {
        id: "sodium",
        label: "Sodium and drinking water",
    },
    {
        id: "when-it-can-make-sense",
        label: "When a softener can make sense",
    },
    {
        id: "when-it-may-not",
        label: "When it may not",
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
        id: "scale",
        title: "I have scale on fixtures and appliances",
        summary:
            "Start by confirming how hard your water actually is.",
        guidance:
            "Visible scale can be consistent with hard water, but the useful starting point is a measured hardness result. Once you know the hardness level, you can decide whether whole-house softening is proportionate to the problem.",
        destinationId: "measure-hardness",
        destinationLabel: "Measure Your Water Hardness",
    },
    {
        id: "quote",
        title: "I received a water-softener quote",
        summary:
            "Compare the installed price with realistic operating costs and savings.",
        guidance:
            "Use the payback check with the quoted installed cost, your measured hardness, household water use, and the efficiency specifications for the proposed softener.",
        destinationId: "water-softener-payback-check",
        destinationLabel: "Water Softener Payback Check",
    },
    {
        id: "well-water",
        title: "I have well water",
        summary:
            "Separate hardness from other possible water-quality issues.",
        guidance:
            "A softener is designed primarily to exchange hardness minerals. If your concern involves iron, manganese, odor, bacteria, sediment, acidity, or another water-quality issue, testing should identify the problem before you choose treatment equipment.",
        destinationId: "what-it-does-not-do",
        destinationLabel: "What a Softener Does Not Do",
    },
    {
        id: "cost",
        title: "I am worried about salt and operating cost",
        summary:
            "Model the recurring salt, water, and maintenance expense.",
        guidance:
            "Softener operating cost depends on household water use, incoming hardness, salt efficiency, regeneration water use, local utility rates, and maintenance.",
        destinationId: "operating-cost",
        destinationLabel: "What a Softener Costs to Operate",
    },
    {
        id: "drinking-water",
        title: "I am concerned about sodium in softened water",
        summary:
            "Understand how ion-exchange softening changes the water.",
        guidance:
            "Conventional cation-exchange softeners replace hardness minerals with sodium or potassium ions. If sodium intake is a concern, review the treatment configuration and drinking-water options with an appropriate professional.",
        destinationId: "sodium",
        destinationLabel: "Sodium and Drinking Water",
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

export default function WaterSoftenerGuide() {
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
            <WaterSoftenerPaybackCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A water softener can be useful when measured hardness is
                    high enough to create meaningful scale, cleaning, or
                    appliance problems. But hardness alone does not prove that
                    buying a softener will save money.
                </p>

                <p>
                    The financial decision depends on the installed price,
                    household water use, salt and regeneration efficiency,
                    maintenance, and the value of problems the softener can
                    realistically reduce.
                </p>

                <p>
                    Start with a water test rather than a sales pitch. Penn
                    State Extension classifies water above 10.5 grains per
                    gallon as very hard, while lower hardness levels may create
                    a less compelling case for whole-house softening.{" "}
                    <a
                        href="https://extension.psu.edu/water-softening"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Penn State Extension
                    </a>
                </p>
            </WhyThisMatters>

            <GuideSection
                id="measure-hardness"
                eyebrow="Start With Measurement"
                title="Find out how hard your water is before pricing the solution."
            >
                <p>
                    Hardness is primarily caused by dissolved calcium and
                    magnesium. It is commonly reported as milligrams per liter
                    or parts per million as calcium carbonate, or as grains per
                    gallon.
                </p>

                <p>
                    Penn State Extension uses the following general hardness
                    categories.{" "}
                    <a
                        href="https://extension.psu.edu/water-softening"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Penn State Extension
                    </a>
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Soft">
                        <p>
                            Less than 1 grain per gallon.
                        </p>
                    </InformationCard>

                    <InformationCard title="Slightly hard">
                        <p>
                            1 to 3.5 grains per gallon.
                        </p>
                    </InformationCard>

                    <InformationCard title="Moderately hard">
                        <p>
                            3.5 to 7 grains per gallon.
                        </p>
                    </InformationCard>

                    <InformationCard title="Hard">
                        <p>
                            7 to 10.5 grains per gallon.
                        </p>
                    </InformationCard>

                    <InformationCard title="Very hard">
                        <p>
                            More than 10.5 grains per gallon.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Use an actual water test when possible. If you have a public
                    water supply, your utility may also publish water-quality
                    information, but the hardness at your home is the number
                    that matters for sizing and evaluating treatment.
                </p>
            </GuideSection>

            <GuideSection
                id="what-softening-does"
                eyebrow="Understand The Treatment"
                title="A conventional softener exchanges hardness minerals for other ions."
            >
                <p>
                    The common residential water softener is a cation-exchange
                    system. Hard water passes through resin that exchanges
                    calcium and magnesium ions for sodium or potassium ions.
                    The resin periodically needs to be regenerated.
                </p>

                <p>
                    Regeneration is why a softener consumes salt and additional
                    water. Those operating costs belong in the economic
                    comparison rather than being treated as incidental.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Problems softening can address">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Mineral scale associated with hard water.
                            </GuideBullet>
                            <GuideBullet>
                                Soap and detergent performance affected by
                                hardness.
                            </GuideBullet>
                            <GuideBullet>
                                Hardness-related deposits on fixtures and
                                equipment.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="What the system consumes">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Regenerant salt or another regenerant specified
                                for the equipment.
                            </GuideBullet>
                            <GuideBullet>
                                Water during regeneration.
                            </GuideBullet>
                            <GuideBullet>
                                Maintenance and eventual equipment replacement.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="what-it-does-not-do"
                eyebrow="Do Not Overbuy"
                title="Hardness treatment is not a universal water-treatment solution."
            >
                <p>
                    A softener should be selected for a hardness problem, not
                    simply because the water has an unpleasant characteristic.
                    Other water-quality problems can require different
                    treatment.
                </p>

                <p>
                    If you use a private well, testing is especially important
                    because hardness may exist alongside iron, manganese,
                    sediment, acidity, microorganisms, or other constituents.
                    Treatment should be matched to the actual water-quality
                    problem.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Diagnose first
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        Do not assume that a water softener is the correct
                        treatment for taste, odor, staining, sediment, or a
                        health-related water concern without identifying the
                        cause.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="financial-benefits"
                eyebrow="Where Value Can Come From"
                title="The economic benefit comes from problems you no longer have to pay for."
            >
                <p>
                    Hard water can contribute to scale and can reduce the
                    effectiveness of soaps and detergents. Softening may
                    therefore reduce some cleaning, detergent, maintenance, or
                    equipment costs.
                </p>

                <p>
                    But the amount varies too much between households to assign
                    a universal savings percentage. That is why the calculator
                    asks you to enter your own annual savings estimate.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Potential hard-dollar savings">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Reduced spending on hardness-related cleaning
                                products.
                            </GuideBullet>
                            <GuideBullet>
                                Reduced scale-removal or maintenance expense.
                            </GuideBullet>
                            <GuideBullet>
                                Lower soap or detergent use if you can document
                                the difference.
                            </GuideBullet>
                            <GuideBullet>
                                Appliance or plumbing savings when you have a
                                reasonable basis for estimating them.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Benefits that are harder to monetize">
                        <ul className="space-y-3">
                            <GuideBullet>
                                How the water feels during bathing.
                            </GuideBullet>
                            <GuideBullet>
                                Personal preference for softened water.
                            </GuideBullet>
                            <GuideBullet>
                                Reduced visible spotting or scale when it does
                                not create a meaningful financial cost.
                            </GuideBullet>
                            <GuideBullet>
                                Convenience and reduced cleaning effort.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    A nonfinancial benefit can still matter. The important
                    distinction is not to convert every preference into an
                    unsupported dollar savings figure merely to make the
                    payback calculation look stronger.
                </p>
            </GuideSection>

            <GuideSection
                id="operating-cost"
                eyebrow="Recurring Cost"
                title="A softener keeps costing money after installation."
            >
                <p>
                    Operating cost depends heavily on how much hardness the
                    system needs to remove and how efficiently it regenerates.
                    A larger household using harder water generally creates
                    more treatment demand than a smaller household with
                    moderately hard water.
                </p>

                <p>
                    The calculator models three recurring costs:
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Salt based on annual hardness removal and the entered
                        salt efficiency.
                    </GuideBullet>
                    <GuideBullet>
                        Regeneration water based on the entered water efficiency.
                    </GuideBullet>
                    <GuideBullet>
                        An annual maintenance allowance supplied by you.
                    </GuideBullet>
                </ul>

                <p>
                    Your actual system may use different amounts. Manufacturer
                    specifications and real operating settings should replace
                    the calculator defaults when you are comparing a specific
                    softener.
                </p>
            </GuideSection>

            <GuideSection
                id="efficiency"
                eyebrow="Equipment Matters"
                title="Two softeners treating the same water can use different amounts of salt and water."
            >
                <p>
                    EPA recommends demand-initiated regeneration rather than
                    systems that regenerate only on a fixed schedule. A
                    demand-initiated system uses measured or estimated water
                    demand to determine when regeneration is needed.{" "}
                    <a
                        href="https://www.epa.gov/watersense/home-maintenance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        EPA WaterSense
                    </a>
                </p>

                <p>
                    EPA also recommends considering water and salt efficiency
                    when selecting equipment. Better efficiency reduces the
                    recurring resource cost that the calculator is designed to
                    expose.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="More efficient operation">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Demand-initiated regeneration.
                            </GuideBullet>
                            <GuideBullet>
                                Lower regeneration water use.
                            </GuideBullet>
                            <GuideBullet>
                                Higher hardness removal per pound of salt.
                            </GuideBullet>
                            <GuideBullet>
                                Correct sizing for actual household demand.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Questions for a quote">
                        <ul className="space-y-3">
                            <GuideBullet>
                                What is the rated salt efficiency?
                            </GuideBullet>
                            <GuideBullet>
                                How much water does regeneration use?
                            </GuideBullet>
                            <GuideBullet>
                                Is regeneration demand-initiated?
                            </GuideBullet>
                            <GuideBullet>
                                What hardness setting is being assumed?
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="sodium"
                eyebrow="Drinking Water"
                title="Ion-exchange softening can add sodium to the treated water."
            >
                <p>
                    Conventional cation-exchange softening commonly replaces
                    calcium and magnesium with sodium ions. The amount added
                    depends in part on how much hardness is removed.
                </p>

                <p>
                    Penn State Extension notes that people concerned about
                    sodium can consider options such as softening only the hot
                    water or leaving a separate unsoftened drinking-water tap.
                    Individual medical or dietary needs should be discussed
                    with an appropriate health professional.{" "}
                    <a
                        href="https://extension.psu.edu/water-softening"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Penn State Extension
                    </a>
                </p>

                <p>
                    Potassium chloride can be used with some systems instead of
                    sodium chloride, but equipment compatibility, cost, and
                    individual circumstances should be checked before making
                    that substitution.
                </p>
            </GuideSection>

            <GuideSection
                id="when-it-can-make-sense"
                eyebrow="When The Problem Is Meaningful"
                title="A softener can make more sense when measured hardness is high and the consequences are costly."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Very hard water">
                        <p>
                            Higher hardness creates more mineral load for the
                            household and can make scale-related problems more
                            pronounced.
                        </p>
                    </InformationCard>

                    <InformationCard title="Documented recurring costs">
                        <p>
                            Cleaning, maintenance, detergent, or equipment
                            expenses give you concrete savings to compare with
                            the softener cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="Efficient equipment">
                        <p>
                            Lower salt and regeneration-water requirements can
                            improve the operating economics.
                        </p>
                    </InformationCard>

                    <InformationCard title="Long ownership horizon">
                        <p>
                            A homeowner expecting to remain in the property for
                            many years has more time to recover the upfront
                            installation cost.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-it-may-not"
                eyebrow="When The Problem Is Small"
                title="A softener can be difficult to justify when hardness is modest or the benefits are mostly preference."
            >
                <p>
                    If measured hardness is relatively low and you have little
                    scale, minimal maintenance expense, and no meaningful
                    detergent or appliance costs attributable to hardness, the
                    financial case can be weak.
                </p>

                <p>
                    A high installation quote can also create a long payback
                    period even when the softener provides useful benefits.
                    The same is true for inefficient equipment with high salt
                    or regeneration-water consumption.
                </p>

                <p>
                    That does not mean the system has no value. It means the
                    purchase may be primarily about comfort or convenience
                    rather than financial return.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same softener can be worthwhile in one house and unnecessary in another."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: Very hard water and recurring scale problems">
                        <p>
                            Testing confirms very hard water, and the household
                            regularly spends money and time addressing scale on
                            fixtures and equipment.
                        </p>

                        <p className="mt-4">
                            A softener has a clearer problem to solve. Compare
                            the installed and operating cost with realistic
                            savings from the problems you already experience.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: Moderately hard water with few problems">
                        <p>
                            The water test shows some hardness, but the
                            household has little scale and few measurable
                            hardness-related expenses.
                        </p>

                        <p className="mt-4">
                            Whole-house softening may provide comfort or
                            convenience, but a strong financial payback is less
                            obvious.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: Expensive quote for inefficient equipment">
                        <p>
                            The proposed system has a high installed price and
                            relatively high salt or regeneration-water use.
                        </p>

                        <p className="mt-4">
                            Compare other properly sized systems before assuming
                            that the first quote represents the economics of
                            water softening in general.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: Well water with several symptoms">
                        <p>
                            You have hardness along with staining, odor, or
                            another water-quality concern.
                        </p>

                        <p className="mt-4">
                            Test the water and identify each problem before
                            buying equipment. A softener may be one part of the
                            treatment system rather than the entire solution.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Buy a Water Softener"
                items={[
                    "Measure the hardness of the water rather than relying only on visible symptoms.",
                    "If you use a private well, identify other water-quality problems that may require different treatment.",
                    "Get the complete installed price rather than comparing equipment prices alone.",
                    "Ask for the rated salt efficiency and regeneration water use of the proposed system.",
                    "Determine whether regeneration is demand-initiated.",
                    "Estimate household water use and use the payback check to model recurring salt, water, and maintenance costs.",
                    "Count only financial savings you can reasonably defend rather than assigning arbitrary values to comfort benefits.",
                    "Consider how long you expect to remain in the home.",
                    "If sodium is a concern, review drinking-water and plumbing configuration options before installation.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Bring these questions to a water-treatment contractor or equipment seller before committing to a system."
                questions={[
                    "What is my measured water hardness in grains per gallon?",
                    "What other water-quality results should affect the treatment recommendation?",
                    "Why is this particular softener capacity appropriate for my household?",
                    "Is regeneration demand-initiated?",
                    "What is the rated salt efficiency in grains removed per pound of salt?",
                    "How many gallons of water does a typical regeneration use?",
                    "What recurring maintenance does the system require?",
                    "What is included in the installed price and warranty?",
                    "How will the system affect drinking water, and are any fixtures left unsoftened?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Measure water hardness before deciding whether whole-house softening is warranted.",
                    "Penn State Extension classifies water above 10.5 grains per gallon as very hard.",
                    "Conventional cation-exchange softeners remove hardness minerals through ion exchange and require periodic regeneration.",
                    "Salt, regeneration water, maintenance, and the initial installation cost all belong in the economic comparison.",
                    "The calculator does not invent appliance-life or detergent savings. Enter only savings that you consider realistic for your household.",
                    "Efficient, demand-initiated equipment can reduce unnecessary salt and water consumption.",
                    "A water softener addresses hardness. Other well-water or water-quality problems may require different treatment.",
                    "Some benefits are about comfort and convenience rather than financial payback, and that distinction should remain explicit.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Water Softening",
                        publisher: "Penn State Extension",
                        href:
                            "https://extension.psu.edu/water-softening",
                    },
                    {
                        title: "Home Maintenance",
                        publisher:
                            "U.S. Environmental Protection Agency WaterSense",
                        href:
                            "https://www.epa.gov/watersense/home-maintenance",
                    },
                    {
                        title: "Cation Exchange Water Softeners",
                        publisher:
                            "U.S. Environmental Protection Agency",
                        href:
                            "https://www.epa.gov/watersense/cation-exchange-water-softeners",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}