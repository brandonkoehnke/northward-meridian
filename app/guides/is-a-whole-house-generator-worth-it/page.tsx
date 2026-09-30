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

import WholeHouseGeneratorCostCheck from "./WholeHouseGeneratorCostCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-whole-house-generator-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-whole-house-generator-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "whole-house-generator-cost-check",
        label: "Whole-house generator ownership & outage cost check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "how-standby-generators-work",
        label: "How standby generators work",
    },
    {
        id: "whole-house",
        label: "What does whole-house actually mean?",
    },
    {
        id: "sizing",
        label: "Generator sizing and starting loads",
    },
    {
        id: "fuel-use",
        label: "How much fuel will it use?",
    },
    {
        id: "fuel-type",
        label: "Natural gas vs. propane",
    },
    {
        id: "typical-outage",
        label: "What does a typical outage cost?",
    },
    {
        id: "long-outage",
        label: "What does a long outage cost?",
    },
    {
        id: "installation",
        label: "Installation and transfer equipment",
    },
    {
        id: "maintenance",
        label: "Maintenance",
    },
    {
        id: "fuel-availability",
        label: "Fuel availability",
    },
    {
        id: "safety",
        label: "Generator placement and safety",
    },
    {
        id: "battery-vs-generator",
        label: "Battery vs. generator",
    },
    {
        id: "when-weaker",
        label: "When a generator makes less sense",
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
        id: "frequent-outages",
        title: "I lose power frequently and want automatic backup",
        summary:
            "Estimate the ongoing cost of providing backup for your typical outages.",
        guidance:
            "Start with the cost check. Use your actual outage history and the fuel-consumption figure published for the generator you are considering.",
        destinationId:
            "whole-house-generator-cost-check",
        destinationLabel:
            "Whole-House Generator Ownership & Outage Cost Check",
    },
    {
        id: "long-outages",
        title: "I mainly care about long outages",
        summary:
            "See how fuel use changes when a generator operates for many hours or days.",
        guidance:
            "Start with the long-outage section and enter a realistic long-outage duration in the calculator. Fuel availability can become a more important constraint as the outage grows.",
        destinationId: "long-outage",
        destinationLabel:
            "What Does a Long Outage Cost?",
    },
    {
        id: "whole-home",
        title: "I want to keep my whole house running normally",
        summary:
            "Understand why backup scope and starting loads matter before choosing generator size.",
        guidance:
            "Start with the sizing section. The rated kW figure alone does not establish that a generator can start and operate every appliance simultaneously.",
        destinationId: "sizing",
        destinationLabel:
            "Generator Sizing and Starting Loads",
    },
    {
        id: "fuel-cost",
        title: "I mainly want to know what outages will cost in fuel",
        summary:
            "Estimate fuel consumption and cost for typical and prolonged outages.",
        guidance:
            "Start with the cost check. Use the manufacturer's fuel-use figure and your local fuel price rather than a generic gallons-per-hour assumption.",
        destinationId:
            "whole-house-generator-cost-check",
        destinationLabel:
            "Whole-House Generator Ownership & Outage Cost Check",
    },
    {
        id: "battery",
        title: "I am comparing a generator with a home battery",
        summary:
            "Compare two different approaches to backup power.",
        guidance:
            "Start with the battery comparison. The systems differ in fuel supply, maintenance, runtime, recharge options, installation, and operating characteristics.",
        destinationId: "battery-vs-generator",
        destinationLabel:
            "Battery vs. Generator",
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

export default function WholeHouseGeneratorGuide() {
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
            <WholeHouseGeneratorCostCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A whole-house generator can provide automatic backup when
                    the electric grid fails, but the purchase price is only
                    part of the cost. Fuel, maintenance, installation, and
                    the frequency and duration of your outages all affect
                    what the system will cost over time.
                </p>

                <p>
                    The useful financial question is not whether a generator
                    can mathematically &quot;pay for itself.&quot; Avoided outage
                    losses and convenience are difficult to price without
                    making assumptions that may not fit your household.
                </p>

                <p>
                    Instead, use the calculator to estimate what the backup
                    capability itself will cost under your outage and fuel
                    assumptions. Then compare that cost with the importance
                    of keeping your home operating when the grid is down.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="how-standby-generators-work"
                eyebrow="How It Works"
                title="A standby generator is designed to take over automatically when utility power fails."
            >
                <p>
                    A permanently installed standby generator works with an
                    automatic transfer switch. When the switch detects that
                    utility power is unavailable, it disconnects the home
                    from the grid and transfers the backed-up electrical load
                    to the generator.
                </p>

                <p>
                    This is different from a portable generator that must
                    generally be positioned, connected, fueled, and operated
                    manually.
                </p>

                <InformationCard title="Automatic does not mean unlimited">
                    <p>
                        The transfer system can automate the transition to
                        backup power, but generator capacity, load-management
                        equipment, fuel availability, and electrical
                        configuration still determine what the system can
                        support.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="whole-house"
                eyebrow="Backup Scope"
                title="Whole-house backup means the home's circuits can be connected to the backup system, not that every load can run without limits."
            >
                <p>
                    A home&apos;s total electrical demand can be much larger than
                    the demand of the loads that matter most during an
                    outage.
                </p>

                <p>
                    Refrigeration, heating equipment, pumps, lighting,
                    networking, and other essential loads may be relatively
                    modest. Electric resistance heat, central air
                    conditioning, ranges, dryers, water heaters, and EV
                    charging can add large loads.
                </p>

                <p>
                    Some installations use load-management equipment or
                    selected circuits to prevent certain loads from operating
                    simultaneously. A larger generator can provide more
                    capacity, but higher capacity also affects installation
                    and operating cost.
                </p>
            </GuideSection>

            <GuideSection
                id="sizing"
                eyebrow="Power Capacity"
                title="Generator sizing depends on both running demand and starting demand."
            >
                <p>
                    A generator&apos;s rated output is expressed in kilowatts. A
                    simple comparison between that rating and the sum of your
                    running loads can be useful as a first check, but it
                    cannot establish complete system sizing.
                </p>

                <p>
                    Motors and compressors can require more power when
                    starting than they use after they are running. Well
                    pumps, sump pumps, refrigerators, air conditioners, and
                    other equipment can therefore affect generator selection
                    differently from simple resistive loads.
                </p>

                <InformationCard title="Treat the calculator as a planning aid">
                    <p>
                        Use the generator manufacturer&apos;s specifications and
                        a qualified installer for final sizing. Starting
                        loads, transfer-switch configuration, local
                        requirements, and load-management equipment can all
                        change the appropriate system design.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="fuel-use"
                eyebrow="Operating Cost"
                title="Fuel consumption depends on the generator and the load."
            >
                <p>
                    Generator fuel use is not a universal gallons-per-hour
                    number. The same generator can consume more fuel at a
                    higher electrical load, and different generator models
                    can have materially different fuel requirements.
                </p>

                <p>
                    That is why the calculator asks you to enter a
                    manufacturer-published fuel-consumption figure that
                    corresponds as closely as possible to your expected
                    operating load.
                </p>

                <p>
                    This makes the estimate more transparent than using an
                    arbitrary fuel-consumption assumption for every generator.
                </p>

                <InformationCard title="Use the specification for the generator you are evaluating">
                    <p>
                        Record the fuel unit exactly as published by the
                        manufacturer where possible. Natural-gas specifications
                        may use cubic feet per hour, while propane
                        specifications commonly use gallons per hour.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="fuel-type"
                eyebrow="Fuel"
                title="Natural gas and propane have different operating considerations."
            >
                <p>
                    Natural gas can provide a continuous fuel supply when the
                    utility remains available, which can be useful during
                    prolonged outages. Propane can be stored on site, but the
                    available tank capacity limits how long the generator can
                    operate before refueling.
                </p>

                <p>
                    Fuel prices also vary by location and over time. Use the
                    price you actually pay rather than assuming the fuel cost
                    shown in a product advertisement.
                </p>

                <InformationCard title="Availability matters as much as price">
                    <p>
                        A low estimated fuel cost is not particularly useful
                        if fuel access is unreliable during the outages you
                        are preparing for.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="typical-outage"
                eyebrow="Typical Outages"
                title="Start with the outages you actually experience."
            >
                <p>
                    If your home experiences several short outages each year,
                    the generator may run for only a limited number of hours
                    annually.
                </p>

                <p>
                    The calculator estimates annual runtime by multiplying
                    your outage frequency by the typical outage duration.
                    That provides a straightforward baseline for annual fuel
                    use and cost.
                </p>

                <p>
                    A typical-outage estimate should not be treated as a
                    forecast. The grid can experience outages that are more
                    frequent or longer than your historical average.
                </p>
            </GuideSection>

            <GuideSection
                id="long-outage"
                eyebrow="Resilience"
                title="A long outage changes the fuel and logistics calculation."
            >
                <p>
                    A generator that runs for 48 hours consumes much more fuel
                    than one that operates for six hours. This can make fuel
                    storage, utility availability, service access, and
                    maintenance more important than they appear during short
                    outages.
                </p>

                <p>
                    The calculator keeps the long outage as a separate stress
                    scenario rather than adding it to your ordinary annual
                    outage estimate.
                </p>

                <InformationCard title="Plan for the outage you actually need to tolerate">
                    <p>
                        Consider the longest realistic outage for your
                        location and household. The right backup plan for a
                        four-hour interruption may be very different from the
                        right plan for a multi-day event.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="installation"
                eyebrow="Project Cost"
                title="Installation involves more than placing a generator beside the house."
            >
                <p>
                    A permanently installed standby system typically involves
                    the generator, an automatic transfer switch, electrical
                    connections, fuel connections, a suitable pad or
                    foundation arrangement, and installation work.
                </p>

                <p>
                    Site conditions can materially affect cost. Distance
                    between the generator and service equipment, fuel-line
                    work, electrical upgrades, site preparation, and local
                    permitting requirements can all change the project scope.
                </p>

                <p>
                    Get an installed quote rather than relying only on the
                    equipment price displayed on a product page.
                </p>
            </GuideSection>

            <GuideSection
                id="maintenance"
                eyebrow="Long-Term Cost"
                title="Standby generators require ongoing maintenance."
            >
                <p>
                    Generator maintenance can be triggered by both elapsed time and
                    runtime, depending on the model and manufacturer schedule. Routine
                    service can include items such as oil, filters, battery checks, and
                    other manufacturer-specified inspections.
                </p>

                <p>
                    A generator that rarely runs still requires periodic
                    maintenance. One that operates through a long outage may
                    also accumulate runtime quickly enough to trigger
                    additional service requirements.
                </p>

                <InformationCard title="Maintenance belongs in the ownership calculation">
                    <p>
                        The calculator includes annual maintenance so that the
                        equipment purchase price does not become the only cost
                        considered in the long-term estimate.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="fuel-availability"
                eyebrow="Resilience"
                title="A generator is only useful for as long as it can obtain fuel."
            >
                <p>
                    Natural-gas service can simplify refueling when the gas
                    utility continues operating. However, a generator that
                    depends on utility gas should still be evaluated in the
                    context of the outage and emergency conditions you are
                    preparing for.
                </p>

                <p>
                    Propane systems provide stored fuel capacity, but the
                    amount available depends on the tank size and starting
                    tank level.
                </p>

                <p>
                    Compare the likely duration of your outages with the
                    fuel supply you can realistically maintain.
                </p>
            </GuideSection>

            <GuideSection
                id="safety"
                eyebrow="Safety"
                title="Generator placement and exhaust are non-negotiable safety issues."
            >
                <p>
                    Portable generators produce carbon monoxide and must be
                    operated outdoors. CPSC advises operating them at least 20
                    feet from the house with the exhaust directed away from the
                    home and other buildings someone could enter. Never operate a
                    portable generator inside a home, garage, basement,
                    crawlspace, shed, or other enclosed space.
                </p>

                <p>
                    Permanently installed standby generators also require
                    proper installation and exhaust clearance. Follow the
                    manufacturer&apos;s installation requirements and local
                    electrical, fuel, and building requirements.
                </p>

                <InformationCard title="Never use a generator to improvise an electrical connection">
                    <p>
                        Use the transfer equipment and connection method
                        specified for the system. Do not backfeed a home&apos;s
                        wiring through a standard receptacle.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="battery-vs-generator"
                eyebrow="Alternative Backup"
                title="A generator and a battery provide resilience in different ways."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Generator">
                        <p>
                            A generator can continue producing electricity
                            while fuel is available. That makes fuel supply
                            especially important for long outages. Automatic
                            standby systems can also transfer the home&apos;s
                            backed-up loads without the homeowner manually
                            starting the equipment.
                        </p>
                    </InformationCard>

                    <InformationCard title="Battery">
                        <p>
                            A battery starts with a finite amount of stored
                            energy. It can provide quiet backup without
                            combustion at the home, and a solar-plus-storage
                            system may be able to recharge during an outage.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The two technologies can also be complementary. The
                    appropriate choice depends on outage duration, required
                    loads, fuel access, solar availability, maintenance
                    preferences, and the installed cost of each system.
                </p>
            </GuideSection>

            <GuideSection
                id="when-weaker"
                eyebrow="Lower Value"
                title="A whole-house generator can make less sense when the problem is small or another backup method fits better."
            >
                <p>
                    If outages are infrequent and short, household loads are
                    easy to reduce, and the cost of installation is high, a
                    permanent standby generator may provide more capacity
                    than you need.
                </p>

                <p>
                    A portable generator, smaller backup battery, or
                    essential-load battery system may address the problem
                    without the cost and maintenance of a whole-house
                    installation.
                </p>

                <p>
                    The important comparison is not simply which technology
                    is cheaper. Consider the type and duration of outages you
                    want to tolerate and the loads that truly need power.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same generator can have very different economics and usefulness in different homes."
            >
                <div className="space-y-6">
                    <InformationCard title="Frequent short outages">
                        <p>
                            A household with several outages each year may
                            place substantial value on automatic restoration,
                            even if individual outages are short.
                        </p>
                    </InformationCard>

                    <InformationCard title="Rare but multi-day outages">
                        <p>
                            Fuel supply, fuel storage, maintenance, and
                            long-runtime considerations become more important
                            when resilience needs extend beyond a single day.
                        </p>
                    </InformationCard>

                    <InformationCard title="Home with electric heat and cooling">
                        <p>
                            Large electrical loads can materially affect
                            generator sizing. Load management or a larger
                            generator may be required to support the desired
                            appliances.
                        </p>
                    </InformationCard>

                    <InformationCard title="Home with easy-to-back-up essential loads">
                        <p>
                            If the primary concern is refrigeration, heating
                            controls, networking, lighting, and a few pumps,
                            an essential-load strategy may require less
                            capacity than normal whole-home operation.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "Review your outage history and identify both typical and unusually long outages.",
                    "List the loads you need to support and distinguish essential loads from convenience loads.",
                    "Check the running and starting requirements of important motors and compressors.",
                    "Use the manufacturer's published fuel-consumption figure for the generator you are evaluating.",
                    "Use your actual local fuel price rather than a generic assumption.",
                    "Estimate fuel use and cost for both a typical outage and a prolonged outage.",
                    "Get an installed project quote that includes electrical, fuel, transfer-switch, site, and permitting costs.",
                    "Include routine maintenance in the long-term ownership estimate.",
                    "Consider how fuel will remain available during the outages you are preparing for.",
                    "Verify generator placement, exhaust clearance, and installation requirements.",
                    "Compare a standby generator with battery backup or a smaller essential-load solution where appropriate.",
                    "Use a qualified installer for final generator sizing and system design.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying"
                subtitle="The equipment specification is only one part of the backup-power decision."
                questions={[
                    "What is the generator's rated output on my chosen fuel?",
                    "What loads can it start simultaneously?",
                    "What fuel-consumption figure corresponds to the load I expect?",
                    "How much fuel will the system use during a prolonged outage?",
                    "What automatic transfer equipment is included?",
                    "Will my home need load-management equipment?",
                    "What electrical or fuel-service upgrades are required?",
                    "What site-preparation or permitting costs should I expect?",
                    "What maintenance is required by time and by runtime?",
                    "How long can my fuel supply support the generator?",
                    "What clearances and exhaust requirements apply to this installation?",
                    "How does the installed project compare with a battery-backup alternative?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A whole-house generator provides automatic backup, but the generator itself is only one part of the system.",
                    "Installation, transfer equipment, maintenance, and fuel are all part of ownership cost.",
                    "Fuel consumption depends on generator model, fuel type, and operating load.",
                    "Use manufacturer-published fuel-consumption data rather than a generic fuel-use assumption.",
                    "Typical outages and prolonged outages should be evaluated separately.",
                    "Fuel availability can become a major constraint during multi-day outages.",
                    "Generator sizing must account for starting loads as well as continuous running demand.",
                    "Whole-house backup does not mean every appliance can operate simultaneously without limits.",
                    "A generator can make sense as a resilience purchase even when avoided outage losses cannot be converted into a reliable payback calculation.",
                    "Battery backup and generators provide resilience through different mechanisms and should be compared on outage duration, loads, fuel, recharge capability, maintenance, and installed cost.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Standby Generators",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries",
                    },
                    {
                        title: "22 kW Standby Generator Specifications",
                        publisher: "Generac",
                        href: "https://www.generac.com/residential-products/standby-generators/gaseous/22kw-standby-generator-with-whole-house-switch-wifi-enabled-7043/",
                    },
                    {
                        title: "Where Can I Find the Maintenance Schedule for My Generac Home Standby Generator?",
                        publisher: "Generac",
                        href: "https://support.generac.com/s/article/Where-Can-I-Find-the-Maintenance-Schedule-for-My-Generac-Home-Standby-Generator",
                    },
                    {
                        title: "Continuous Use Maintenance for Home Standby Generators",
                        publisher: "Generac",
                        href: "https://support.generac.com/s/article/Continuous-use-maintenance-for-home-standby-generators",
                    },
                    {
                        title: "Carbon Monoxide Information Center",
                        publisher:
                            "U.S. Consumer Product Safety Commission",
                        href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-a-whole-house-generator-worth-it"
            />
        </GuideLayout>
    );
}