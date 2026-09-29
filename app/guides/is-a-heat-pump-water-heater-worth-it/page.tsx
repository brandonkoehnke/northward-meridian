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

import HeatPumpWaterHeaterPaybackCheck from "./HeatPumpWaterHeaterPaybackCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-heat-pump-water-heater-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-heat-pump-water-heater-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "hpwh-payback-calculator",
        label: "Heat-pump water heater payback check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "how-it-works",
        label: "How a heat-pump water heater works",
    },
    {
        id: "replacement-type",
        label: "What you are replacing matters",
    },
    {
        id: "financial-case",
        label: "The financial case",
    },
    {
        id: "upfront-cost",
        label: "Upfront and installation cost",
    },
    {
        id: "incentives",
        label: "Rebates and incentives",
    },
    {
        id: "sizing",
        label: "Tank size and hot-water demand",
    },
    {
        id: "location",
        label: "Where you install it matters",
    },
    {
        id: "climate",
        label: "Cold climates and surrounding temperature",
    },
    {
        id: "operating-characteristics",
        label: "Noise and operating characteristics",
    },
    {
        id: "when-weaker",
        label: "When the economics are weaker",
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
        id: "electric-resistance",
        title: "I have an electric water heater",
        summary:
            "See whether switching from electric resistance to a heat-pump model could reduce your annual water-heating cost.",
        guidance:
            "Start with the calculator using your current annual water-heating cost, the proposed HPWH energy use, and both installed costs. This is usually the cleanest operating-cost comparison because both systems use electricity.",
        destinationId: "hpwh-payback-calculator",
        destinationLabel:
            "Heat-Pump Water Heater Payback Check",
    },
    {
        id: "gas",
        title: "I currently use natural gas",
        summary:
            "Understand why fuel prices and installation costs can change the payback.",
        guidance:
            "Enter the actual annual cost of your current water heater rather than assuming an average. Gas-to-electric comparisons can depend heavily on local electricity and gas prices and the cost of changing the installation.",
        destinationId: "replacement-type",
        destinationLabel:
            "What You Are Replacing Matters",
    },
    {
        id: "quote",
        title: "I already have an installation quote",
        summary:
            "Use the real project cost instead of a generic national average.",
        guidance:
            "Enter the full installed HPWH price, the conventional replacement you would otherwise buy, and any verified incentive. The incremental cost is more useful for payback than the full HPWH sticker price.",
        destinationId: "upfront-cost",
        destinationLabel:
            "Upfront and Installation Cost",
    },
    {
        id: "sizing",
        title: "I am worried about hot-water capacity",
        summary:
            "See how tank size and recovery rate affect the practical decision.",
        guidance:
            "Do not evaluate efficiency without checking whether the system can meet your household's hot-water demand. Manufacturer First Hour Rating and tank size are important sizing inputs.",
        destinationId: "sizing",
        destinationLabel:
            "Tank Size and Hot-Water Demand",
    },
    {
        id: "location",
        title: "I would install it in a basement, garage, or utility space",
        summary:
            "See how installation location can affect performance and the surrounding space.",
        guidance:
            "Look at available space, condensate drainage, temperature, airflow, noise, and interactions with the room before treating the equipment price as the whole project.",
        destinationId: "location",
        destinationLabel:
            "Where You Install It Matters",
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
        publishedTime: "2026-09-29",
        modifiedTime: "2026-09-29",
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
    datePublished: "2026-09-29",
    dateModified: "2026-09-29",
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

export default function HeatPumpWaterHeaterGuide() {
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
            <HeatPumpWaterHeaterPaybackCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A heat-pump water heater can use substantially less energy
                    than a conventional electric-resistance water heater, but
                    the financial result depends on what you are replacing,
                    what the project costs, and what you pay for energy.
                </p>

                <p>
                    The cleanest comparison is not the price of a new heat-pump
                    water heater against zero. It is the heat-pump system against
                    the replacement you would otherwise buy when your current
                    water heater reaches the end of its useful life.
                </p>

                <p>
                    That distinction becomes especially important when comparing
                    a heat-pump water heater with natural gas, propane, or oil.
                    Differences in fuel prices, installation requirements, and
                    electrical work can materially change the result.
                </p>

                <p>
                    The calculator therefore focuses on the incremental project
                    cost and annual operating-cost difference rather than treating
                    energy efficiency as an automatic financial win.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="how-it-works"
                eyebrow="The Technology"
                title="A heat-pump water heater moves heat instead of creating all of it directly."
            >
                <p>
                    A heat-pump water heater extracts heat from surrounding air
                    and transfers that heat into the tank. That is fundamentally
                    different from an electric-resistance heater, which converts
                    electrical energy directly into heat.
                </p>

                <p>
                    Many modern units are hybrid systems that can use heat-pump
                    operation together with electric-resistance elements when
                    demand is higher. The exact operating modes, efficiency, and
                    recovery performance depend on the model.
                </p>

                <p>
                    ENERGY STAR says certified heat-pump water heaters can use
                    substantially less energy than standard electric-resistance
                    models. The amount you save in dollars still depends on your
                    actual hot-water use and electricity price.
                </p>

                <InformationCard title="Efficiency is not the same thing as payback">
                    <p>
                        A more efficient appliance can still take years to recover
                        a higher purchase and installation cost. The useful
                        calculation compares the additional upfront cost with
                        the annual operating-cost difference.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="replacement-type"
                eyebrow="What You Have Now"
                title="The type of water heater you are replacing changes the economics."
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Electric resistance">
                        <p>
                            Usually the simplest comparison. Both systems use
                            electricity, so the key variables are energy use,
                            electricity price, installed cost, and incentives.
                        </p>
                    </InformationCard>

                    <InformationCard title="Natural gas">
                        <p>
                            Savings depend on both gas and electricity prices,
                            as well as the installed cost of moving to an
                            electric water-heating system.
                        </p>
                    </InformationCard>

                    <InformationCard title="Propane or oil">
                        <p>
                            Fuel prices can vary substantially, so use your actual
                            annual water-heating cost rather than a generic
                            national assumption.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The practical comparison should also include the replacement
                    you would otherwise install. If your current water heater is
                    failing, the relevant incremental cost is often the difference
                    between the HPWH project and the conventional replacement
                    you would have chosen.
                </p>
            </GuideSection>

            <GuideSection
                id="financial-case"
                eyebrow="The Math"
                title="The financial case depends on three numbers: incremental cost, annual savings, and useful life."
            >
                <p>
                    Suppose a conventional replacement would cost $1,800 installed,
                    while the heat-pump water heater project would cost $3,500 after
                    accounting for any applicable incentive. The incremental cost
                    is $1,700.
                </p>

                <p>
                    If your current water heater costs $650 per year to operate and
                    the proposed HPWH would cost $200 per year, annual operating
                    savings would be $450.
                </p>

                <p>
                    The simple payback would therefore be about 3.8 years:
                </p>

                <InformationCard title="Simple payback">
                    <p>
                        <strong>Incremental upfront cost ÷ annual operating savings</strong>
                    </p>

                    <p>
                        In this example: $1,700 ÷ $450 ≈ 3.8 years.
                    </p>
                </InformationCard>

                <p>
                    That calculation is intentionally simple. It does not predict
                    future energy prices or assign a monetary value to convenience,
                    noise, installation disruption, or other non-energy factors.
                </p>
            </GuideSection>

            <GuideSection
                id="upfront-cost"
                eyebrow="Project Cost"
                title="The installation can matter as much as the water heater."
            >
                <p>
                    The equipment price is only one component of a replacement
                    project. Depending on the home and existing setup, you may also
                    encounter electrical work, condensate drainage, plumbing changes,
                    disposal of the old unit, permits, or other installation work.
                </p>

                <p>
                    That is why the calculator asks for the installed cost of both
                    the heat-pump system and the conventional replacement. The
                    comparison should reflect the project you would realistically
                    complete.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Electrical work">
                        <p>
                            Verify whether the existing electrical service and
                            circuit arrangement are suitable for the planned
                            equipment.
                        </p>
                    </InformationCard>

                    <InformationCard title="Condensate">
                        <p>
                            Heat-pump operation can produce condensate that needs
                            an appropriate drain or other approved disposal method.
                        </p>
                    </InformationCard>

                    <InformationCard title="Space">
                        <p>
                            The unit needs adequate clearance and surrounding
                            conditions for its heat-pump system to operate properly.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="incentives"
                eyebrow="Incentives"
                title="Treat rebates as a project-specific reduction in cost."
            >
                <p>
                    Federal incentives for heat-pump water heaters have changed
                    over time, and state and utility programs can have their own
                    eligibility rules and deadlines.
                </p>

                <p>
                    ENERGY STAR currently identifies the previous federal tax-credit
                    period for qualifying heat-pump water heaters as covering purchases
                    and installations from January 1, 2023 through December 31, 2025.
                    That historical credit should not be assumed for a 2026 project.
                </p>

                <p>
                    The Department of Energy&apos;s Home Electrification and Appliances
                    Rebate program can provide substantial assistance for eligible
                    households in participating states, but eligibility and
                    implementation depend on the applicable state program.
                </p>

                <InformationCard title="Use a verified incentive">
                    <p>
                        Enter only an incentive you can reasonably expect to receive.
                        Do not build the payback around a generic national rebate or
                        an expired federal tax credit.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="sizing"
                eyebrow="Performance"
                title="A highly efficient water heater still has to make enough hot water."
            >
                <p>
                    Efficiency is only useful if the equipment can meet your
                    household&apos;s demand. Tank capacity and recovery performance
                    therefore belong in the purchase decision.
                </p>

                <p>
                    ENERGY STAR recommends using the manufacturer&apos;s First Hour
                    Rating when comparing water-heater capacity. A larger tank or
                    different operating mode can provide more usable hot water,
                    particularly during periods of high demand.
                </p>

                <p>
                    Consider your household&apos;s actual pattern: simultaneous showers,
                    large tubs, dishwashers, laundry, guests, and other high-demand
                    periods can all matter.
                </p>

                <InformationCard title="Do not size from household size alone">
                    <p>
                        Two four-person households can have very different hot-water
                        demand. Use the manufacturer&apos;s capacity information and your
                        actual usage pattern rather than treating household size as
                        a complete sizing calculation.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="location"
                eyebrow="Installation Location"
                title="Where the unit sits affects both the installation and the surrounding space."
            >
                <p>
                    Heat-pump water heaters need adequate surrounding air and
                    clearance. The unit can also affect the room around it by
                    moving heat out of the air while it operates.
                </p>

                <p>
                    In a conditioned basement or utility room, this can interact
                    with the home&apos;s heating and cooling system. In a garage or
                    other unconditioned space, ambient temperature can become more
                    important.
                </p>

                <p>
                    Condensate management, access for service, water connections,
                    and the path for the electrical supply should be considered
                    before installation.
                </p>
            </GuideSection>

            <GuideSection
                id="climate"
                eyebrow="Climate"
                title="Ambient temperature can affect heat-pump operation."
            >
                <p>
                    Because a heat-pump water heater draws heat from its surrounding
                    air, the available heat in that air matters. Extremely cold
                    conditions can affect how the heat-pump portion of the system
                    operates, depending on the model and installation location.
                </p>

                <p>
                    This does not mean that heat-pump water heaters are automatically
                    unsuitable for cold climates. Modern units can have operating
                    ranges and backup resistance elements designed to accommodate
                    different conditions.
                </p>

                <p>
                    Check the manufacturer&apos;s published operating range and installation
                    requirements for the specific model rather than relying on a
                    generic climate rule.
                </p>
            </GuideSection>

            <GuideSection
                id="operating-characteristics"
                eyebrow="Beyond the Payback"
                title="Energy cost is not the only difference you will notice."
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Noise">
                        <p>
                            Heat-pump operation uses a compressor and fan, so the
                            unit can produce more audible operating noise than a
                            conventional electric-resistance tank.
                        </p>
                    </InformationCard>

                    <InformationCard title="Cooling and dehumidification">
                        <p>
                            The unit can move heat out of the surrounding room.
                            Depending on the installation space, that can be either
                            useful or a consideration.
                        </p>
                    </InformationCard>

                    <InformationCard title="Recovery">
                        <p>
                            Operating modes can trade efficiency for faster recovery.
                            Review the specific model&apos;s controls and performance
                            information before assuming one mode is always used.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-weaker"
                eyebrow="Lower Financial Value"
                title="The economics can be weaker when the incremental cost is high or energy savings are small."
            >
                <p>
                    A low electricity rate can reduce the dollar value of the
                    energy savings. A high installation cost can increase the
                    payback period. Replacing a relatively inexpensive fuel source
                    can also change the comparison.
                </p>

                <p>
                    The same is true when your household uses relatively little hot
                    water. Lower energy consumption leaves less operating cost to
                    eliminate, reducing the annual savings available to recover the
                    added equipment cost.
                </p>

                <p>
                    In these cases, nonfinancial benefits can still matter, but they
                    should be considered separately from the payback calculation.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same HPWH can produce very different economics in different homes."
            >
                <div className="space-y-6">
                    <InformationCard title="Electric resistance replacement">
                        <p>
                            A household paying substantial electric rates with an
                            aging resistance tank may have a relatively straightforward
                            operating-cost comparison.
                        </p>
                    </InformationCard>

                    <InformationCard title="Gas water heater with low fuel cost">
                        <p>
                            Lower fuel costs can reduce the annual savings from
                            switching to electricity, while electrical and installation
                            costs can increase the incremental project cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="High hot-water household">
                        <p>
                            A household with substantial hot-water demand can use more
                            energy, increasing the potential value of a more efficient
                            system if the equipment is sized appropriately.
                        </p>
                    </InformationCard>

                    <InformationCard title="Low hot-water household">
                        <p>
                            A household using relatively little hot water may have
                            fewer annual dollars available to save, making a high
                            incremental installation cost harder to recover.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "Determine what type of water heater you are replacing.",
                    "Estimate the annual energy cost of your current water heater.",
                    "Get a realistic installed quote for the heat-pump model.",
                    "Price the conventional replacement you would otherwise install.",
                    "Check current state and utility incentives before relying on the payback.",
                    "Use the manufacturer's estimated annual energy consumption when available.",
                    "Verify the unit's First Hour Rating and tank size for your household.",
                    "Check clearance, condensate drainage, electrical requirements, and service access.",
                    "Review the manufacturer's operating-temperature requirements for the installation location.",
                    "Consider noise, room cooling, and recovery behavior separately from the financial calculation.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying"
                subtitle="The specific model and installation matter more than the label on the box."
                questions={[
                    "What is the First Hour Rating of the model?",
                    "What is the estimated annual energy use?",
                    "What are the published operating-temperature limits?",
                    "What electrical circuit or service does the unit require?",
                    "How will condensate be drained?",
                    "How much clearance does the manufacturer require?",
                    "Will the installation require plumbing changes?",
                    "Will the unit make the surrounding space noticeably cooler or drier?",
                    "How loud is the unit during heat-pump operation?",
                    "What warranty applies to the tank, compressor, and other major components?",
                    "What rebates or utility incentives are available for this specific installation?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A heat-pump water heater can substantially reduce energy use, especially compared with electric resistance.",
                    "The financial decision depends on what you are replacing, your actual energy prices, installed costs, and incentives.",
                    "Compare the HPWH against the conventional replacement you would otherwise buy, not against zero cost.",
                    "The incremental upfront cost is more useful for payback than the full HPWH purchase price.",
                    "Gas, propane, and oil replacements require more careful local fuel-versus-electricity comparisons.",
                    "Tank size and First Hour Rating matter because efficiency does not help if the system cannot meet household demand.",
                    "Installation location affects space, condensate, electrical work, temperature, and potentially the surrounding room.",
                    "Federal tax-credit assumptions from earlier years should not be automatically applied to a 2026 project.",
                    "The calculator models operating-cost economics; noise, cooling, recovery behavior, and other practical factors should be evaluated separately.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Heat Pump Water Heaters",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/heat_pump_water_heaters",
                    },
                    {
                        title: "Benefits and Savings",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/heat_pump_water_heaters/benefits-savings",
                    },
                    {
                        title: "How It Works",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/heat_pump_water_heaters/how-it-works",
                    },
                    {
                        title: "Heat Pump Water Heater Guide",
                        publisher:
                            "ENERGY STAR",
                        href: "https://www.energystar.gov/partner-resources/residential_new/educational_resources/sup_program_guidance/heat_pump_water_heater_guide",
                    },
                    {
                        title: "Home Energy Rebates Program",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/cmei/scep/home-energy-rebates-program",
                    },
                    {
                        title: "Tax Credits, Rebates, Savings",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/topics/tax-credits-rebates-savings",
                    },
                    {
                        title: "Home Electrification and Appliances Rebates",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/scep/home-energy-rebates",
                    },
                    {
                        title: "Federal Tax Credits for Heat Pump Water Heaters",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/about/federal-tax-credits/heat-pump-water-heaters",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-a-heat-pump-water-heater-worth-it"
            />
        </GuideLayout>
    );
}