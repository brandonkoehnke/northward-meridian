import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import { InformationCard } from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

import HeatPumpDryerPaybackCheck from "./HeatPumpDryerPaybackCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-heat-pump-dryer-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-heat-pump-dryer-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "heat-pump-dryer-payback-check",
        label: "Heat-pump dryer payback check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "how-it-works",
        label: "How a heat-pump dryer works",
    },
    {
        id: "energy-savings",
        label: "How much electricity can it save?",
    },
    {
        id: "laundry-volume",
        label: "Your laundry volume matters",
    },
    {
        id: "electricity-price",
        label: "Electricity price matters",
    },
    {
        id: "purchase-premium",
        label: "Purchase-price premium",
    },
    {
        id: "ventless",
        label: "The value of going ventless",
    },
    {
        id: "installation",
        label: "Drainage and installation",
    },
    {
        id: "drying-time",
        label: "Drying time",
    },
    {
        id: "capacity",
        label: "Capacity and large loads",
    },
    {
        id: "temperature",
        label: "Lower-temperature drying",
    },
    {
        id: "maintenance",
        label: "Maintenance",
    },
    {
        id: "when-weaker",
        label: "When the economics are weaker",
    },
    {
        id: "current-dryer",
        label: "Electric vs. gas replacement",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Practical decision checklist",
    },
    {
        id: "questions",
        label: "Questions to ask before buying",
    },
    {
        id: "takeaways",
        label: "Key takeaways",
    },
] as const;

const guidedEntryScenarios = [
    {
        id: "electric",
        title: "I have an electric dryer and want to know if the savings justify the upgrade",
        summary:
            "Compare your current electricity use, laundry volume, and purchase costs.",
        guidance:
            "Start with the payback check. Use your actual dryer energy use and electricity rate if available, then compare the heat-pump dryer's installed price with the conventional replacement you would otherwise buy.",
        destinationId: "heat-pump-dryer-payback-check",
        destinationLabel:
            "Heat-Pump Dryer Payback Check",
    },
    {
        id: "gas",
        title: "I currently have a gas dryer",
        summary:
            "See why a gas-to-heat-pump comparison needs different operating-cost assumptions.",
        guidance:
            "Start with the payback check and choose Gas as your current dryer type. The calculator compares your entered gas cost per load with the heat-pump dryer's electricity use rather than treating your existing dryer as an electric appliance.",
        destinationId: "heat-pump-dryer-payback-check",
        destinationLabel:
            "Heat-Pump Dryer Payback Check",
    },
    {
        id: "vent",
        title: "I do not have a dryer vent or need new vent work",
        summary:
            "See how ventless installation can change the project cost.",
        guidance:
            "Start with the calculator and consider the avoided cost of vent installation only when it is a real project expense you would otherwise pay. Then read the installation section for drainage and placement considerations.",
        destinationId: "ventless",
        destinationLabel:
            "The Value of Going Ventless",
    },
    {
        id: "performance",
        title: "I am mostly concerned about drying time or capacity",
        summary:
            "Review the practical differences before focusing on payback.",
        guidance:
            "Start with the performance sections. Energy savings are only one part of the decision; cycle time, temperature, capacity, and your laundry habits can matter just as much.",
        destinationId: "drying-time",
        destinationLabel:
            "Drying Time",
    },
    {
        id: "savings",
        title: "I mainly want to reduce my home's electricity use",
        summary:
            "See how laundry volume and the energy difference between dryers affect annual savings.",
        guidance:
            "Start with the energy-savings discussion, then use your own loads per week and electricity rate in the payback check.",
        destinationId: "energy-savings",
        destinationLabel:
            "How Much Electricity Can It Save?",
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
        publishedTime: "2026-09-30",
        modifiedTime: "2026-09-30",
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
    datePublished: "2026-09-30",
    dateModified: "2026-09-30",
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

export default function HeatPumpDryerGuide() {
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
            <HeatPumpDryerPaybackCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A heat-pump dryer can reduce electricity use substantially
                    compared with a conventional electric dryer, but the
                    financial value depends on how much laundry you dry, your
                    electricity price, and the additional cost of the
                    heat-pump model.
                </p>

                <p>
                    The comparison also changes when you are replacing a gas
                    dryer. A gas-to-electric comparison needs to account for
                    the gas price and gas consumed per load rather than
                    applying an electric kWh calculation to the existing
                    dryer.
                </p>

                <p>
                    Installation can matter too. Heat-pump dryers are
                    typically ventless, so a location without an existing
                    dryer vent may avoid some construction cost. That benefit
                    should be counted only when there is a real avoided
                    project expense.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="how-it-works"
                eyebrow="The Technology"
                title="A heat-pump dryer recycles heat instead of exhausting it."
            >
                <p>
                    A conventional vented dryer heats air, passes it through
                    wet clothing, and exhausts the resulting warm,
                    moisture-laden air outdoors. A heat-pump dryer instead
                    moves heat through a refrigeration system and recirculates
                    the drying air.
                </p>

                <p>
                    The process can recover and reuse heat that a conventional
                    dryer would send outside. That is a major reason heat-pump
                    dryers can use less electricity per load.
                </p>

                <InformationCard title="Ventless is a system characteristic, not just a convenience">
                    <p>
                        The lack of an exhaust vent changes installation
                        options, but it also means the dryer needs another way
                        to deal with the moisture removed from clothes.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="energy-savings"
                eyebrow="Energy Use"
                title="The electricity savings come from using less energy per load."
            >
                <p>
                    ENERGY STAR identifies heat-pump dryers as a lower-energy
                    alternative to conventional dryers. The exact savings
                    depend on the models and cycles being compared, so a
                    universal percentage is less useful for a household
                    calculation than the energy use of the specific dryers
                    under consideration.
                </p>

                <p>
                    The calculator therefore asks for electricity use per load
                    for both dryers rather than hard-coding a national savings
                    percentage.
                </p>

                <p>
                    That approach also makes the calculation useful when
                    comparing different dryer models with meaningfully
                    different energy consumption.
                </p>
            </GuideSection>

            <GuideSection
                id="laundry-volume"
                eyebrow="Usage"
                title="How often you dry clothes can matter as much as the dryer itself."
            >
                <p>
                    A household that runs the dryer twice a week has fewer
                    opportunities to save than a household that dries several
                    loads every day.
                </p>

                <p>
                    Annual savings are therefore driven by both the energy
                    saved per load and the number of loads you actually run.
                    Your own laundry habits are more useful than a generic
                    household average.
                </p>

                <InformationCard title="Use your real laundry frequency">
                    <p>
                        Estimate loads per week from a normal month or season
                        rather than an unusually busy week. Laundry volume can
                        also change between households and seasons.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="electricity-price"
                eyebrow="Utility Cost"
                title="Your electricity rate directly affects the value of each saved kilowatt-hour."
            >
                <p>
                    Saving 1 kWh has a larger dollar value where electricity
                    costs more. The same dryer efficiency difference can
                    therefore produce very different annual savings in
                    different locations.
                </p>

                <p>
                    Use the rate you actually pay for electricity when
                    possible. A blended household rate can be a useful
                    approximation if your utility has more complicated
                    billing.
                </p>

                <p>
                    Future electricity prices are uncertain, so the
                    calculator should be treated as an assumption-based
                    payback estimate rather than a forecast.
                </p>
            </GuideSection>

            <GuideSection
                id="purchase-premium"
                eyebrow="Purchase Cost"
                title="The important number is the additional cost, not the full dryer price."
            >
                <p>
                    Most households would need to buy a replacement dryer
                    anyway. The relevant financial comparison is therefore
                    usually the heat-pump dryer project cost minus the
                    conventional replacement you would otherwise purchase.
                </p>

                <p>
                    A $1,600 heat-pump dryer and a $900 conventional dryer
                    create a $700 technology premium, not a $1,600 incremental
                    cost, assuming the $900 replacement is a realistic
                    alternative.
                </p>

                <InformationCard title="Compare equivalent project scopes">
                    <p>
                        Use installed costs that reflect the same project
                        scope. An equipment-only heat-pump price should not be
                        compared against a fully installed conventional
                        replacement.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="ventless"
                eyebrow="Installation"
                title="Ventless installation can be valuable when a vent would otherwise need to be added."
            >
                <p>
                    A heat-pump dryer does not exhaust hot drying air through a
                    traditional exterior dryer vent. That can make placement
                    possible in locations where adding a vent would be
                    difficult or expensive.
                </p>

                <p>
                    The calculator allows you to enter an avoided vent
                    installation cost, but that input should represent a real
                    project difference. Do not treat a hypothetical future
                    vent installation as guaranteed savings.
                </p>

                <InformationCard title="Existing vent vs. new vent">
                    <p>
                        If you already have a functional dryer vent and can
                        reuse it for a conventional replacement, there may be
                        little or no avoided construction cost from going
                        ventless.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="installation"
                eyebrow="Placement"
                title="Ventless does not mean installation-free."
            >
                <p>
                    Heat-pump dryers still need electrical power, adequate
                    clearance, and a way to manage the moisture they remove
                    from clothing.
                </p>

                <p>
                    Depending on the model, condensate may collect in a tank
                    that must be emptied or drain through a hose. Confirm the
                    manufacturer&apos;s installation requirements before assuming
                    the dryer can go anywhere a conventional dryer cannot.
                </p>

                <p>
                    If you are building or remodeling a laundry area, compare
                    the complete installation requirements of both dryer
                    types rather than focusing only on whether an exhaust
                    vent is needed.
                </p>
            </GuideSection>

            <GuideSection
                id="drying-time"
                eyebrow="Performance"
                title="Cycle time can be a more important tradeoff than the energy savings."
            >
                <p>
                    Heat-pump dryers operate at lower temperatures than many
                    conventional dryers. That can reduce energy use and may
                    be gentler on fabrics, but cycle durations can differ
                    from the conventional dryer you are used to.
                </p>

                <p>
                    A household that frequently needs back-to-back loads
                    should pay attention to actual cycle times for the models
                    being considered rather than assuming every heat-pump
                    dryer performs the same way.
                </p>
            </GuideSection>

            <GuideSection
                id="capacity"
                eyebrow="Capacity"
                title="Make sure the dryer fits the way you do laundry."
            >
                <p>
                    Capacity is not just a specification to compare on a
                    product page. Large households, bulky bedding, and
                    frequent high-volume loads can make the usable drum size
                    and cycle behavior more important.
                </p>

                <p>
                    Compare the heat-pump model&apos;s capacity with the loads you
                    actually dry. A lower-energy dryer that requires more
                    separate cycles may change the practical calculation.
                </p>
            </GuideSection>

            <GuideSection
                id="temperature"
                eyebrow="Fabric Care"
                title="Lower drying temperatures can affect both fabric care and cycle behavior."
            >
                <p>
                    Heat-pump dryers generally dry at lower temperatures than
                    conventional dryers. Lower heat can be beneficial for
                    some fabrics, but it can also change how quickly clothes
                    dry.
                </p>

                <p>
                    Follow the garment-care instructions and compare the
                    drying performance of the specific models you are
                    considering.
                </p>
            </GuideSection>

            <GuideSection
                id="maintenance"
                eyebrow="Maintenance"
                title="The lower-energy design does not eliminate routine maintenance."
            >
                <p>
                    Heat-pump dryers use filters and heat-exchange components
                    that need to remain clean for the system to operate
                    properly.
                </p>

                <p>
                    Follow the manufacturer&apos;s cleaning and maintenance
                    schedule. Keeping airflow and heat-transfer surfaces
                    clear can matter for drying performance and energy use.
                </p>
            </GuideSection>

            <GuideSection
                id="when-weaker"
                eyebrow="Lower Value"
                title="The economics are weaker when the purchase premium is large and usage is low."
            >
                <p>
                    A household that dries only a few loads each week may not
                    generate enough annual energy savings to recover a large
                    upfront premium quickly.
                </p>

                <p>
                    The same can happen when electricity prices are low,
                    conventional replacement dryers are inexpensive, or an
                    existing vent can be reused without additional work.
                </p>

                <p>
                    A longer financial payback does not necessarily mean the
                    heat-pump model is a poor fit. Ventless installation,
                    lower-temperature drying, and energy use are separate
                    parts of the decision.
                </p>
            </GuideSection>

            <GuideSection
                id="current-dryer"
                eyebrow="Replacement Type"
                title="Replacing a gas dryer requires a different cost comparison."
            >
                <p>
                    An electric-to-electric comparison can estimate annual
                    operating cost directly from kWh per load and the
                    electricity rate.
                </p>

                <p>
                    A gas dryer has a different operating-cost structure. The
                    calculator therefore asks for therms per load and the
                    price you pay for natural gas or another gas fuel.
                </p>

                <p>
                    Installation can also differ. Converting a laundry area
                    from one appliance configuration to another may require
                    changes to electrical service, gas connections, or other
                    infrastructure. Compare the actual project quotes rather
                    than assuming the equipment price is the only difference.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same heat-pump dryer can make very different financial sense in different homes."
            >
                <div className="space-y-6">
                    <InformationCard title="High-volume electric-dryer household">
                        <p>
                            Frequent drying creates more opportunities to save
                            electricity, so the annual operating difference
                            can become large enough to recover a purchase
                            premium more quickly.
                        </p>
                    </InformationCard>

                    <InformationCard title="Low-volume laundry household">
                        <p>
                            With only a few loads each week, even meaningful
                            per-load energy savings may produce relatively
                            small annual dollar savings.
                        </p>
                    </InformationCard>

                    <InformationCard title="Laundry room without an existing vent">
                        <p>
                            The ability to install a ventless dryer without
                            exterior vent construction can materially change
                            the project&apos;s upfront comparison.
                        </p>
                    </InformationCard>

                    <InformationCard title="Gas-dryer replacement">
                        <p>
                            Compare the actual gas consumption and fuel price
                            with the heat-pump dryer&apos;s electricity use rather
                            than assuming that an electric replacement will
                            have the same operating economics as an
                            electric-to-electric upgrade.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "Estimate how many dryer loads your household runs in a normal week.",
                    "Use model-specific energy consumption per load when available.",
                    "Use your actual electricity price rather than a generic national average.",
                    "If replacing a gas dryer, compare therm use and gas cost separately from electric kWh use.",
                    "Compare the heat-pump dryer with the conventional replacement you would otherwise purchase.",
                    "Use installed project costs when comparing alternatives.",
                    "Count an avoided vent cost only when vent construction is a real alternative project expense.",
                    "Confirm how condensate will be drained or managed.",
                    "Check cycle times against the way your household does laundry.",
                    "Compare capacity for the types and sizes of loads you normally dry.",
                    "Review temperature and fabric-care differences that matter to you.",
                    "Check the manufacturer's cleaning and maintenance requirements.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying"
                subtitle="Energy efficiency is only one part of the dryer decision."
                questions={[
                    "What is the measured or rated energy use per load?",
                    "What dryer model and cycle were used for the energy comparison?",
                    "What is the actual drum capacity?",
                    "How long do the cycles take for the loads I normally dry?",
                    "How is condensate collected or drained?",
                    "Does this installation require a drain connection?",
                    "Can I install the dryer without adding or modifying an exterior vent?",
                    "What maintenance and filter cleaning does the manufacturer require?",
                    "What warranty coverage applies to the heat-pump system and compressor?",
                    "What is the installed cost compared with the conventional replacement I would otherwise buy?",
                    "Am I eligible for any current rebate or incentive?",
                    "If I currently use gas, what are my actual therm usage and gas costs?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A heat-pump dryer can use substantially less electricity than a conventional electric dryer.",
                    "The useful financial comparison is usually the additional project cost over the conventional replacement you would otherwise buy.",
                    "Laundry volume and electricity price determine how much annual energy savings are worth in dollars.",
                    "A gas-to-heat-pump comparison requires gas consumption and fuel-price inputs rather than an electric-only calculation.",
                    "Ventless installation can be valuable when a new exterior dryer vent would otherwise be required.",
                    "Ventless does not mean installation-free; drainage, electrical requirements, clearances, and maintenance still matter.",
                    "Lower drying temperatures can affect both fabric care and cycle time.",
                    "Capacity and cycle behavior should be evaluated using your actual laundry habits.",
                    "Use model-specific energy data when possible instead of assuming a universal savings percentage.",
                    "A long financial payback does not eliminate potential practical benefits such as lower energy use or easier installation.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Heat Pump Dryer",
                        publisher:
                            "ENERGY STAR",
                        href: "https://www.energystar.gov/products/clothes_dryers/heat-pump-dryer",
                    },
                    {
                        title: "Clothes Dryers",
                        publisher:
                            "ENERGY STAR",
                        href: "https://www.energystar.gov/products/clothes_dryers",
                    },
                    {
                        title: "Heat Pump Dryer Factsheet",
                        publisher:
                            "ENERGY STAR",
                        href: "https://www.energystar.gov/sites/default/files/2024-10/ES_Laundry_Factsheet_10-23-2024.pdf",
                    },
                    {
                        title: "Heat Pump Dryer Savings Calculator",
                        publisher:
                            "Lumen Calculator",
                        href: "https://lumencalculator.com/heat-pump-dryer-savings-calculator/",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-a-heat-pump-dryer-worth-it"
            />
        </GuideLayout>
    );
}