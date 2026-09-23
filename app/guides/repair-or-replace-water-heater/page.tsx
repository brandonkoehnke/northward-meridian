import type { Metadata } from "next";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import {
    ExampleCard,
    FormulaCard,
    GuideBullet,
    InformationCard,
} from "@/app/components/article/GuidePrimitives";
import GuideSection from "@/app/components/article/GuideSection";
import SafetyCallout from "@/app/components/article/SafetyCallout";
import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import DecisionFramework from "@/app/components/article/DecisionFramework";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import OptionsAndTradeoffs from "@/app/components/article/OptionsAndTradeoffs";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import Recommendation from "@/app/components/article/Recommendation";
import Sources from "@/app/components/article/Sources";
import WaterHeaterScorecard from "@/app/components/article/WaterHeaterScorecard";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "repair-or-replace-water-heater",
    );

    if (!found) {
        throw new Error(
            "Guide not found: repair-or-replace-water-heater",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "safety",
        label: "Secure the situation",
        stage: "Secure",
    },
    {
        id: "why-it-matters",
        label: "Why this decision matters",
    },
    {
        id: "diagnosis",
        label: "Diagnose the problem",
        stage: "Diagnose",
    },
    {
        id: "options",
        label: "Evaluate your options",
        stage: "Evaluate",
    },
    {
        id: "scorecard",
        label: "Score the decision",
        stage: "Decide",
    },
    {
        id: "framework",
        label: "Decision framework",
    },
    {
        id: "cost-comparison",
        label: "Compare total cost",
    },
    {
        id: "worked-examples",
        label: "Worked examples",
    },
    {
        id: "replacement-options",
        label: "Replacement options",
    },
    {
        id: "recommendation",
        label: "Recommendation",
    },
    {
        id: "checklist",
        label: "Take action",
        stage: "Act",
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
        id: "leaking",
        title: "My water heater is leaking",
        summary:
            "Find out whether the leak points toward an external repair or probable tank failure.",
        guidance:
            "Start by identifying exactly where the water is coming from. A leak through the tank body usually points toward replacement, while a fitting, valve, or nearby source may still be repairable.",
        destinationId: "diagnosis",
        destinationLabel: "Diagnosis",
    },
    {
        id: "no-hot-water",
        title: "I do not have hot water",
        summary:
            "Determine whether the problem may be a replaceable component or a broader system failure.",
        guidance:
            "Loss of hot water does not automatically mean the tank needs replacement. Start with the diagnosis section and identify what has actually failed.",
        destinationId: "diagnosis",
        destinationLabel: "Diagnosis",
    },
    {
        id: "replacement-recommended",
        title: "A plumber recommended replacement",
        summary:
            "Evaluate whether the recommendation is supported by the actual condition of the system.",
        guidance:
            "A replacement recommendation should be evaluated against the failure source, tank condition, age, warranty, repair history, and complete installed cost.",
        destinationId: "scorecard",
        destinationLabel: "Decision Scorecard",
    },
    {
        id: "comparing-costs",
        title: "I am comparing repair and replacement costs",
        summary:
            "Compare complete installed costs rather than a repair quote against appliance price alone.",
        guidance:
            "The useful comparison includes repair labor and parts on one side and equipment, labor, permits, removal, disposal, and required modifications on the other.",
        destinationId: "cost-comparison",
        destinationLabel: "Cost Comparison",
    },
    {
        id: "planning-ahead",
        title: "I am planning ahead",
        summary:
            "Explore replacement options before you're dealing with an emergency.",
        guidance:
            "Planning ahead gives you time to compare capacity, fuel type, efficiency, installation requirements, and different water-heating technologies.",
        destinationId: "replacement-options",
        destinationLabel: "Replacement Options",
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
        publishedTime: "2026-08-06",
        modifiedTime: "2026-08-06",
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
    datePublished: "2026-08-06",
    dateModified: "2026-08-06",
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

export default function RepairOrReplaceWaterHeaterGuide() {
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

            <SafetyCallout />

            <WhyThisMatters id="why-it-matters">
                <p>
                    A failed water heater creates two pressures at once: the practical
                    need to restore hot water and the risk of spending money on the wrong
                    solution. A low repair quote can be wasteful when the tank is failing,
                    while replacing a sound, relatively young unit over an isolated
                    component problem can also be unnecessary.
                </p>

                <p>
                    The decision is more reliable when it begins with the location and
                    nature of the failure. Age, repair cost, warranty, corrosion, service
                    history, household demand, and potential energy savings should then
                    modify the decision rather than replace a proper diagnosis.
                </p>

                <p>
                    Avoid making the decision from one rule alone. “It is ten years old,”
                    “the repair is half the replacement price,” or “there is water near
                    the tank” may be useful observations, but none independently proves
                    what should be done.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="diagnosis"
                eyebrow="First Diagnosis"
                title="Find the source of the problem before pricing the solution."
            >
                <p>
                    A puddle near a water heater does not automatically mean that the
                    pressure vessel has failed. Water may come from a plumbing
                    connection, drain valve, relief-system discharge, nearby equipment,
                    or condensation. The repair decision changes substantially once the
                    source is confirmed.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Problems that may be serviceable">
                        <ul className="space-y-3">
                            <GuideBullet>Loose or failed external plumbing connection</GuideBullet>
                            <GuideBullet>Replaceable drain valve</GuideBullet>
                            <GuideBullet>Electric heating element or thermostat</GuideBullet>
                            <GuideBullet>Ignition, sensor, or control component</GuideBullet>
                            <GuideBullet>Some anode-rod or maintenance-related conditions</GuideBullet>
                            <GuideBullet>Properly diagnosed relief or expansion-system issue</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Conditions that favor replacement">
                        <ul className="space-y-3">
                            <GuideBullet>Confirmed leakage through the tank body</GuideBullet>
                            <GuideBullet>Leakage from a nonserviceable welded vessel area</GuideBullet>
                            <GuideBullet>Severe corrosion or physical deformation</GuideBullet>
                            <GuideBullet>Multiple failures on an aging system</GuideBullet>
                            <GuideBullet>A system that remains inadequate after repair</GuideBullet>
                            <GuideBullet>
                                Major repair with weak remaining-life economics
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Ask the professional to identify the failed part or leak location in
                    writing. “The water heater is leaking” is not as useful as “the drain
                    valve is leaking,” “the relief system is discharging,” or “the tank
                    body is leaking.”
                </p>
            </GuideSection>

            <OptionsAndTradeoffs
                id="options"
                options={[
                    {
                        title: "Repair the Existing Unit",
                        summary:
                            "Repair preserves the current installation and can be the most economical choice when the vessel is sound and the failure is isolated.",
                        pros: [
                            "Lower immediate cost for many component failures",
                            "Avoids unnecessary disposal of a serviceable unit",
                            "May preserve meaningful warranty value",
                            "Can restore service quickly when parts are available",
                        ],
                        cons: [
                            "Does not reset the age of the tank or other components",
                            "May postpone rather than eliminate near-term replacement",
                            "Can be poor value when failures are recurring",
                            "Does not correct inadequate capacity or an inefficient system",
                        ],
                    },
                    {
                        title: "Replace With a Similar Storage Unit",
                        summary:
                            "A like-for-like replacement can minimize redesign while providing a new tank, controls, and warranty.",
                        pros: [
                            "Familiar operating characteristics",
                            "Often simpler than changing technologies",
                            "Restores a complete system rather than one failed component",
                            "Allows capacity and efficiency to be reconsidered",
                        ],
                        cons: [
                            "Higher immediate installed cost",
                            "Permit, disposal, venting, plumbing, or electrical work may apply",
                            "A rushed replacement can lead to poor sizing",
                            "Like-for-like replacement may miss a worthwhile upgrade",
                        ],
                    },
                    {
                        title: "Change Water-Heating Technology",
                        summary:
                            "Replacement may create an opportunity to consider heat-pump, tankless, indirect, or another system better suited to the home.",
                        pros: [
                            "May materially reduce energy use in the right application",
                            "Can improve capacity, recovery, space use, or operating cost",
                            "May qualify for available incentives",
                            "Can align with future electrification or renovation plans",
                        ],
                        cons: [
                            "May require electrical, plumbing, venting, or condensate changes",
                            "Installed cost can be substantially higher",
                            "Performance depends on climate, space, fuel, and usage",
                            "Savings estimates require local utility rates and realistic demand",
                        ],
                    },
                ]}
            />

            <WaterHeaterScorecard id="scorecard" />

            <DecisionFramework
                id="framework"
                introduction="Use these six steps after addressing any immediate safety or water-damage concern."
                steps={[
                    {
                        title: "Confirm the failure and its location",
                        description:
                            "Obtain a diagnosis that identifies the failed part, leak source, safety condition, and whether the pressure vessel remains sound.",
                    },
                    {
                        title: "Record the unit's age, model, and warranty",
                        description:
                            "Locate the data plate, serial number, installation date, proof of purchase, and model-specific warranty terms before authorizing work.",
                    },
                    {
                        title: "Obtain itemized repair and replacement quotes",
                        description:
                            "The replacement quote should include equipment, labor, removal, permits, inspections, disposal, and any plumbing, gas, venting, electrical, drain, or code-related work.",
                    },
                    {
                        title: "Evaluate reliability and household suitability",
                        description:
                            "Consider recent repairs, corrosion, hot-water shortages, changing household demand, installation conditions, and the consequences of another unexpected outage.",
                    },
                    {
                        title: "Compare alternatives using local operating costs",
                        description:
                            "If replacement is credible, compare properly sized options using local energy prices, expected usage, installation requirements, maintenance, warranties, and available incentives.",
                    },
                    {
                        title: "Choose based on total value—not only today's invoice",
                        description:
                            "Repair when it restores a sound and suitable system economically. Replace when the existing system has failed structurally, has weak reliability, no longer fits the home, or offers poor remaining value.",
                    },
                ]}
            />

            <GuideSection
                id="cost-comparison"
                eyebrow="Cost Comparison"
                title="Compare the complete decision cost on both sides."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <FormulaCard
                        title="Repair-side cost"
                        lines={[
                            "Diagnostic or service fee",
                            "Repair parts",
                            "Repair labor",
                            "Expected near-term additional repairs",
                            "Cost and disruption of another outage",
                        ]}
                    />

                    <FormulaCard
                        title="Replacement-side cost"
                        lines={[
                            "New equipment",
                            "Installation and removal",
                            "Permit and inspection",
                            "Plumbing, gas, venting, electrical, or drain changes",
                            "Less warranty credits, rebates, or incentives",
                        ]}
                    />
                </div>

                <p>
                    Do not compare a repair quote with the retail price of an uninstalled
                    water heater. Compare the repair with the complete installed
                    replacement cost for a properly sized, code-compliant system.
                </p>

                <p>
                    Also avoid treating an efficiency estimate as guaranteed savings.
                    Operating cost depends on fuel, local rates, water use, inlet-water
                    temperature, equipment performance, maintenance, and installation.
                </p>
            </GuideSection>

            <GuideSection
                id="worked-examples"
                eyebrow="Worked Examples"
                title="See how the framework changes with the facts."
            >
                <div className="space-y-6">
                    <ExampleCard
                        label="Example 1"
                        title="Young electric tank with a failed heating element"
                        facts={[
                            "The unit is four years old",
                            "A professional confirms the tank is sound",
                            "The heating element is replaceable",
                            "There is no recent repair history",
                            "The unit adequately serves the household",
                        ]}
                        result="Lean toward repair, subject to the quote and model-specific warranty."
                    />

                    <ExampleCard
                        label="Example 2"
                        title="Older tank with confirmed vessel leakage"
                        facts={[
                            "The unit is approximately twelve years old",
                            "The leak is confirmed through the tank body",
                            "Corrosion is visible",
                            "The unit has required prior service",
                        ]}
                        result="Lean strongly toward replacement. A tank-body failure is not an ordinary component repair."
                    />

                    <ExampleCard
                        label="Example 3"
                        title="Middle-aged unit with an expensive control repair"
                        facts={[
                            "The unit is eight years old",
                            "The tank is currently sound",
                            "The warranty has expired",
                            "The repair is a substantial share of complete replacement",
                            "The homeowner expects to remain in the property",
                        ]}
                        result="Mixed decision. Compare remaining-life risk, local replacement options, operating costs, and the consequences of another failure."
                    />

                    <ExampleCard
                        label="Example 4"
                        title="A puddle with no confirmed source"
                        facts={[
                            "The unit is seven years old",
                            "Water is visible near the base",
                            "No one has identified the source",
                            "There are no known combustion or electrical symptoms",
                        ]}
                        result="Diagnose first. Do not assume that visible water proves either a repairable valve problem or a failed tank."
                    />
                </div>
            </GuideSection>

            <GuideSection
                id="replacement-options"
                eyebrow="Replacement Choice"
                title="A replacement decision is not automatically a technology decision."
            >
                <p>
                    If replacement is warranted, first determine what the household
                    requires. Storage capacity, first-hour performance, peak simultaneous
                    use, fuel availability, electrical service, installation space,
                    airflow, drainage, venting, noise, climate, and utility rates can all
                    affect the best choice.
                </p>

                <p>
                    Heat-pump water heaters can use substantially less electricity than
                    conventional electric-resistance units in appropriate installations.
                    They also require consideration of space, ambient conditions, sound,
                    condensate drainage, recovery behavior, electrical requirements, and
                    local economics.
                </p>

                <p>
                    Tankless systems can reduce standby losses and provide continuous hot
                    water within their flow capability, but they are not automatically
                    inexpensive upgrades. Gas supply, venting, electrical needs,
                    temperature rise, simultaneous demand, maintenance, and installation
                    modifications must be evaluated.
                </p>

                <p>
                    Ask for more than one properly scoped option when changing
                    technologies. The least expensive appliance is not necessarily the
                    least expensive installed system or the best lifetime value.
                </p>
            </GuideSection>

            <Recommendation
                id="recommendation"
                summary="Repair a sound, suitable system when the failure is isolated and the economics are reasonable. Replace when the vessel has failed, safety or reliability is compromised, repairs are recurring, the system no longer meets household needs, or the complete long-term comparison favors a new installation."
                items={[
                    {
                        heading: "Repair when the pressure vessel remains sound",
                        description:
                            "Repair is strongest when the unit is relatively young, the problem is confined to a serviceable component, warranty coverage remains, prior reliability is good, and the repair restores appropriate performance.",
                    },
                    {
                        heading: "Replace when the tank or system has reached a practical endpoint",
                        description:
                            "Replacement is strongest with confirmed vessel leakage, severe corrosion, repeated failures, inadequate capacity, poor remaining-life economics, or a major repair on an aging installation.",
                    },
                    {
                        heading: "Diagnose before deciding when the evidence is incomplete",
                        description:
                            "An uncertain leak source, vague service description, missing warranty information, or nonitemized quote is a reason to gather better information—not to force an immediate repair-or-replace conclusion.",
                    },
                ]}
            />

            <DecisionChecklist
                id="checklist"
                items={[
                    "Identify the exact source of the leak before authorizing replacement.",
                    "Verify the unit's age and warranty coverage.",
                    "Request an itemized repair quote.",
                    "Request an itemized installed replacement quote.",
                    "Ask whether a different water-heater type is worth considering.",
                    "Review any available rebates or incentives before deciding.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Your Plumber"
                subtitle="These questions can help you understand the recommendation and compare quotes more confidently."
                questions={[
                    "Can you identify exactly where the leak or failure is occurring?",
                    "Is the pressure vessel itself damaged, or is it a replaceable component?",
                    "Would you repair this unit if it were in your own home?",
                    "Does this quote include permits, disposal, and any required code upgrades?",
                    "Is the unit or failed component still covered by the manufacturer's warranty?",
                    "Would a heat-pump or tankless water heater make sense for my household?",
                    "What maintenance can help extend the life of the replacement?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Possible gas, combustion, carbon-monoxide, electrical, pressure, overheating, or flooding hazards override the normal economic comparison.",
                    "Visible water near a heater does not by itself confirm tank failure; identify the source.",
                    "A confirmed tank-body or nonserviceable welded-vessel leak generally favors replacement.",
                    "Age should modify the decision, but it should not replace diagnosis, warranty review, and cost analysis.",
                    "Compare an itemized repair quote with complete installed replacement cost—not appliance retail price.",
                    "Recurring repairs, corrosion, inadequate capacity, and outage risk can make a seemingly inexpensive repair poor value.",
                    "Efficiency upgrades should be evaluated with local rates, realistic use, installation requirements, and available incentives.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Carbon Monoxide Information and Safety Guidance",
                        publisher: "U.S. Consumer Product Safety Commission",
                        href: "https://www.cpsc.gov/safety-education/neighborhood-safety-network/toolkits/carbon-monoxide-invisible-killer",
                    },
                    {
                        title: "Home Heating Equipment and Carbon Monoxide Safety",
                        publisher: "U.S. Consumer Product Safety Commission",
                        href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center/Home-Heating-Equipment",
                    },
                    {
                        title: "Selecting a New Water Heater",
                        publisher: "U.S. Department of Energy",
                        href: "https://www.energy.gov/energysaver/articles/selecting-new-water-heater",
                    },
                    {
                        title: "Water Heating",
                        publisher: "U.S. Department of Energy",
                        href: "https://www.energy.gov/energysaver/heat-and-cool/water-heating",
                    },
                    {
                        title: "Heat Pump Water Heaters: Benefits and Savings",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/heat_pump_water_heaters/benefits-savings",
                    },
                    {
                        title: "Water-Heater Technical Bulletins",
                        publisher: "A. O. Smith",
                        href: "https://www.hotwater.com/info-center/technical-bulletins.html",
                    },
                    {
                        title: "Water-Heater Support, Manuals, and Product Literature",
                        publisher: "A. O. Smith",
                        href: "https://www.hotwater.com/support.html",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="repair-or-replace-water-heater" />
        </GuideLayout>
    );
}
