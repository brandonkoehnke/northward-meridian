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

import HomeBatteryBackupCoverageCheck from "./HomeBatteryBackupCoverageCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-home-battery-backup-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-home-battery-backup-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "home-battery-coverage-check",
        label: "Home battery backup coverage check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "kw-vs-kwh",
        label: "kW vs. kWh",
    },
    {
        id: "essential-loads",
        label: "Start with essential loads",
    },
    {
        id: "runtime",
        label: "How long will a battery last?",
    },
    {
        id: "whole-home",
        label: "Whole-home vs. essential-load backup",
    },
    {
        id: "motor-loads",
        label: "Motors, pumps, and starting power",
    },
    {
        id: "without-solar",
        label: "Battery backup without solar",
    },
    {
        id: "with-solar",
        label: "Battery backup with solar",
    },
    {
        id: "multi-day",
        label: "Multi-day outages",
    },
    {
        id: "financial-case",
        label: "The financial case",
    },
    {
        id: "tou",
        label: "Time-of-use savings",
    },
    {
        id: "utility-programs",
        label: "Utility and VPP programs",
    },
    {
        id: "cost-incentives",
        label: "Installed cost and incentives",
    },
    {
        id: "degradation",
        label: "Battery degradation and warranties",
    },
    {
        id: "when-weaker",
        label: "When a battery makes less sense",
    },
    {
        id: "battery-vs-generator",
        label: "Battery vs. generator",
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
        id: "outage-backup",
        title: "I mainly want backup during outages",
        summary:
            "Estimate how long a battery could support the loads you consider essential.",
        guidance:
            "Start with the coverage check. Enable only the equipment you actually need during an outage, replace the example wattages with realistic values, and compare the estimated runtime with the outages you experience.",
        destinationId: "home-battery-coverage-check",
        destinationLabel:
            "Home Battery Backup Coverage Check",
    },
    {
        id: "whole-home",
        title: "I want to keep most or all of my house running",
        summary:
            "Understand why whole-home backup can require substantially more energy and power capacity.",
        guidance:
            "Start by separating essential loads from convenience loads. Large electric appliances, HVAC equipment, pumps, and simultaneous loads can change both the battery-capacity and inverter-power requirements.",
        destinationId: "whole-home",
        destinationLabel:
            "Whole-Home vs. Essential-Load Backup",
    },
    {
        id: "solar",
        title: "I already have solar",
        summary:
            "See when solar can extend battery runtime during a prolonged outage.",
        guidance:
            "Solar can materially change the resilience calculation if your system is configured to operate and recharge the battery during a grid outage. Production still varies with weather, season, shading, and system design.",
        destinationId: "with-solar",
        destinationLabel:
            "Battery Backup With Solar",
    },
    {
        id: "no-solar",
        title: "I do not have solar",
        summary:
            "See what changes when the battery begins an outage with a finite amount of stored energy.",
        guidance:
            "Without an outage-capable recharge source, stored battery energy is a finite reserve. Focus on essential-load consumption and how the resulting runtime compares with your typical and longer outages.",
        destinationId: "without-solar",
        destinationLabel:
            "Battery Backup Without Solar",
    },
    {
        id: "bill-savings",
        title: "I am mainly interested in lowering my electric bill",
        summary:
            "Separate potential utility savings from the value of outage protection.",
        guidance:
            "Battery economics can depend on time-of-use rates, export compensation, demand charges, or utility programs. Calculate those financial benefits separately rather than assigning an invented dollar value to outage protection.",
        destinationId: "financial-case",
        destinationLabel:
            "The Financial Case",
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

export default function HomeBatteryBackupGuide() {
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
            <HomeBatteryBackupCoverageCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A home battery can provide useful backup power, but
                    &quot;How big is the battery?&quot; is only part of the
                    decision. You also need to know how much energy your
                    essential loads consume, how much power they require at
                    the same time, and whether the system can recharge during
                    a prolonged outage.
                </p>

                <p>
                    Those questions are different from financial payback.
                    A battery purchased primarily for resilience can provide
                    value during outages even when ordinary electric-bill
                    savings would not recover its installed cost quickly.
                </p>

                <p>
                    The useful approach is therefore to evaluate backup
                    capability first and financial benefits second rather
                    than forcing both into one return-on-investment number.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="kw-vs-kwh"
                eyebrow="Two Different Limits"
                title="kW and kWh answer different questions."
            >
                <p>
                    Battery capacity is commonly expressed in kilowatt-hours,
                    or kWh. This describes an amount of stored energy. If your
                    essential loads use 6 kWh per day, a battery with 12 kWh
                    of usable energy contains roughly two days of that
                    consumption before accounting for recharging and
                    real-world operating differences.
                </p>

                <p>
                    Power is expressed in kilowatts, or kW. This describes
                    how quickly the battery system can deliver energy. A
                    battery can contain enough total energy for an outage
                    while still having insufficient output to operate every
                    requested load simultaneously.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="kWh = stored energy">
                        <p>
                            Use kWh to think about how much energy is
                            available and how long your selected loads can
                            operate.
                        </p>
                    </InformationCard>

                    <InformationCard title="kW = power at a moment">
                        <p>
                            Use kW to determine whether the battery can
                            support the loads that may operate at the same
                            time.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="essential-loads"
                eyebrow="Load Planning"
                title="Start with what you actually need during an outage."
            >
                <p>
                    Whole-house electricity consumption is often the wrong
                    starting point for backup sizing. During an outage, many
                    households are willing to stop using discretionary loads
                    in order to preserve energy for refrigeration, heating
                    equipment, communications, lighting, pumps, medical
                    equipment, or other priorities.
                </p>

                <p>
                    Build the load list around the consequences of losing
                    each device. A refrigerator and internet equipment may
                    be easy choices. A well pump, sump pump, furnace blower,
                    boiler circulator, or medical device can be much more
                    important depending on the home.
                </p>

                <InformationCard title="Use actual equipment information">
                    <p>
                        Appliance power varies by model and operating state.
                        Treat generic wattage examples as starting points,
                        then replace them with equipment labels,
                        manufacturer specifications, measurements, or other
                        reasonable estimates when possible.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="runtime"
                eyebrow="Energy Capacity"
                title="Runtime depends on the loads, not just the battery."
            >
                <p>
                    A battery does not have one universal runtime. The same
                    system might support a small set of essential loads for
                    a long period or a heavily loaded home for a much shorter
                    period.
                </p>

                <p>
                    The calculator estimates daily energy use by multiplying
                    each enabled load&apos;s running watts by its expected
                    hours of operation. It then compares that consumption
                    with the usable battery capacity you enter.
                </p>

                <p>
                    Real performance will differ from a simplified estimate.
                    Equipment cycles on and off, battery controls reserve
                    energy, conversion losses occur, temperature can affect
                    performance, and battery capacity changes with age.
                </p>

                <InformationCard title="Use usable capacity">
                    <p>
                        When a manufacturer publishes both nominal and usable
                        capacity, the usable figure is the more appropriate
                        starting point for a backup-runtime calculation.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="whole-home"
                eyebrow="Backup Scope"
                title="Whole-home backup is a different sizing problem from essential-load backup."
            >
                <p>
                    Keeping a refrigerator, networking equipment, a few
                    lights, and heating controls operating is very different
                    from attempting to preserve normal household behavior.
                </p>

                <p>
                    Electric resistance heating, central air conditioning,
                    electric water heating, clothes dryers, ranges, EV
                    charging, large pumps, and other high-power loads can
                    rapidly increase both energy consumption and required
                    power output.
                </p>

                <p>
                    Some battery installations manage this by backing up only
                    selected circuits. Others use load-management equipment
                    that prevents certain loads from operating together.
                    Larger systems can use multiple batteries or higher-output
                    equipment.
                </p>

                <InformationCard title="Define what whole-home means to you">
                    <p>
                        &quot;Whole-home backup&quot; can mean that every
                        circuit is connected to the backup system, not
                        necessarily that every appliance can operate
                        simultaneously for an unlimited period. Review both
                        power limits and energy capacity.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="motor-loads"
                eyebrow="Starting Power"
                title="Pumps and compressors can require more power when they start."
            >
                <p>
                    Refrigerators, freezers, well pumps, sump pumps, air
                    conditioners, and other motor-driven equipment can
                    briefly draw more power when starting than they consume
                    during normal operation.
                </p>

                <p>
                    That is why the calculator&apos;s continuous-power check
                    is not a motor-starting guarantee. Passing the running
                    load calculation only establishes that the entered
                    running wattages fit within the continuous-output figure.
                </p>

                <p>
                    If a critical load has a motor or compressor, compare its
                    starting requirements with the battery or inverter
                    manufacturer&apos;s surge-output specifications and the
                    system designer&apos;s load calculations.
                </p>
            </GuideSection>

            <GuideSection
                id="without-solar"
                eyebrow="Standalone Battery"
                title="Without solar, stored energy is a finite outage reserve."
            >
                <p>
                    A battery can provide backup without solar. In that
                    configuration, the system can charge from the grid while
                    power is available and supply backed-up loads after the
                    grid fails.
                </p>

                <p>
                    The important limitation is prolonged outages. Without a
                    functioning recharge source during the outage, every
                    kilowatt-hour used reduces the remaining reserve.
                </p>

                <p>
                    That makes load reduction especially valuable. Turning
                    off nonessential equipment can extend runtime without
                    purchasing additional battery capacity.
                </p>
            </GuideSection>

            <GuideSection
                id="with-solar"
                eyebrow="Solar + Storage"
                title="Solar can change the multi-day backup calculation, but only if the system can operate during an outage."
            >
                <p>
                    A grid-connected solar array does not automatically mean
                    that solar panels can power the home when the grid is
                    down. The system must be designed and configured for
                    outage operation.
                </p>

                <p>
                    When an appropriately configured solar-plus-storage
                    system can recharge during an outage, daily solar
                    production can replace some of the energy consumed by
                    essential loads. That can substantially extend backup
                    duration.
                </p>

                <p>
                    Production is not constant. Weather, season, shading,
                    array orientation, system limits, and the timing of
                    household loads all affect how much solar energy is
                    available for battery charging.
                </p>

                <InformationCard title="Do not use array size as daily energy">
                    <p>
                        A 10 kW solar array does not produce 10 kWh every
                        hour. Use an estimate of actual daily energy
                        available during the outage rather than the
                        array&apos;s nameplate power rating.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="multi-day"
                eyebrow="Long Outages"
                title="Multi-day resilience depends on the energy balance each day."
            >
                <p>
                    During a prolonged outage, the useful question becomes
                    whether daily recharging can keep pace with daily
                    consumption.
                </p>

                <p>
                    If your essential loads use 8 kWh per day and the solar
                    system can provide 5 kWh per day for battery charging,
                    the battery still loses about 3 kWh of stored energy per
                    day under those assumptions.
                </p>

                <p>
                    If estimated solar energy equals or exceeds the selected
                    daily loads, the simple energy balance no longer produces
                    a finite runtime. That still does not mean unlimited
                    backup: poor weather, production timing, power limits,
                    reserve settings, and changing consumption can interrupt
                    the balance.
                </p>
            </GuideSection>

            <GuideSection
                id="financial-case"
                eyebrow="The Money"
                title="Backup value and financial payback are not the same calculation."
            >
                <p>
                    A battery purchased primarily for outage protection is
                    closer to a resilience investment than a conventional
                    efficiency upgrade. The avoided inconvenience or damage
                    from an outage can be meaningful, but assigning one
                    universal dollar value to that protection would require
                    assumptions about outage probability and consequences.
                </p>

                <p>
                    The calculator therefore does not invent an expected
                    outage-loss value. Its financial section uses only the
                    annual bill savings, utility payments, or other recurring
                    financial benefits you choose to enter.
                </p>

                <InformationCard title="A long financial payback does not mean zero backup value">
                    <p>
                        A battery can provide useful resilience even when
                        electric-bill savings alone do not repay the
                        installation quickly. Keep those two conclusions
                        separate.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="tou"
                eyebrow="Electric Rates"
                title="Time-of-use rates can create a bill-savings opportunity."
            >
                <p>
                    Some utilities charge different electricity prices at
                    different times of day. A battery may be able to charge
                    when electricity is less expensive and discharge when
                    grid electricity is more expensive.
                </p>

                <p>
                    Whether this creates meaningful savings depends on the
                    rate spread, battery efficiency, available capacity,
                    control strategy, and utility tariff. A small difference
                    between peak and off-peak prices may not create a large
                    annual benefit.
                </p>

                <p>
                    Use actual utility rates and a realistic estimate of
                    annual savings rather than assuming that every battery
                    installation benefits from arbitrage.
                </p>
            </GuideSection>

            <GuideSection
                id="utility-programs"
                eyebrow="Grid Programs"
                title="Some utilities pay customers for access to stored energy."
            >
                <p>
                    Certain utility or virtual-power-plant programs can
                    compensate battery owners for allowing the utility or
                    program operator to use stored energy during specified
                    grid events.
                </p>

                <p>
                    Program structures vary. Payments, event frequency,
                    required battery reserve, enrollment periods, eligible
                    equipment, and customer control can all differ.
                </p>

                <p>
                    If a program is available to you, use its actual expected
                    payment in the calculator rather than assuming a generic
                    national value.
                </p>
            </GuideSection>

            <GuideSection
                id="cost-incentives"
                eyebrow="Project Cost"
                title="Installed cost and incentives can materially change the financial comparison."
            >
                <p>
                    Battery pricing depends on usable capacity, power output,
                    equipment, electrical work, installation complexity,
                    permitting, integration with solar, and whether multiple
                    batteries are required.
                </p>

                <p>
                    Incentives are similarly location- and project-specific.
                    Federal, state, utility, and local programs can change
                    over time and can impose eligibility requirements.
                </p>

                <InformationCard title="Use current project-specific numbers">
                    <p>
                        Enter an installed quote rather than an equipment-only
                        price, and count an incentive only after verifying
                        that your project is eligible for it.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="degradation"
                eyebrow="Long-Term Performance"
                title="Battery capacity does not remain identical forever."
            >
                <p>
                    Rechargeable batteries gradually lose usable capacity as
                    they age and cycle. That means a runtime estimate based
                    on new-battery capacity should not be treated as a
                    lifetime guarantee.
                </p>

                <p>
                    Battery warranties commonly define coverage using some
                    combination of years, energy throughput, cycles, or
                    retained capacity. The exact structure varies by product.
                </p>

                <p>
                    Compare warranty terms alongside headline capacity and
                    price, especially if backup performance many years from
                    now is important to the purchase.
                </p>
            </GuideSection>

            <GuideSection
                id="when-weaker"
                eyebrow="Lower Value"
                title="A battery can make less sense when the problem it solves is small."
            >
                <p>
                    If outages are rare and brief, essential loads are easy
                    to live without, electric rates provide little
                    load-shifting opportunity, and no useful utility program
                    is available, the measurable benefits may be limited
                    relative to the installed cost.
                </p>

                <p>
                    The same can be true when the loads you want to back up
                    require a much larger system than expected. Whole-home
                    electric heating, central cooling, EV charging, and other
                    large loads can increase system requirements quickly.
                </p>

                <p>
                    In those cases, a smaller essential-load battery,
                    generator, portable power solution, or simply accepting
                    short outages may deserve comparison.
                </p>
            </GuideSection>

            <GuideSection
                id="battery-vs-generator"
                eyebrow="Alternative Backup"
                title="Batteries and generators solve the same outage problem differently."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Battery">
                        <p>
                            Stored energy is immediately available without
                            combustion at the home. Runtime is constrained by
                            stored energy unless the system can recharge, and
                            larger loads can require more battery and inverter
                            capacity.
                        </p>
                    </InformationCard>

                    <InformationCard title="Generator">
                        <p>
                            A generator can continue producing energy while
                            fuel is available, but introduces fuel storage or
                            supply, maintenance, noise, exhaust, and operating
                            considerations.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The comparison should therefore consider outage duration,
                    required loads, fuel availability, solar availability,
                    maintenance tolerance, installation constraints, and
                    project cost rather than treating the technologies as
                    interchangeable.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same battery can be ample in one home and undersized in another."
            >
                <div className="space-y-6">
                    <InformationCard title="Short outages with essential loads">
                        <p>
                            A household that needs refrigeration, networking,
                            lights, and a few small loads may get substantial
                            coverage from a modest battery because daily
                            consumption remains controlled.
                        </p>
                    </InformationCard>

                    <InformationCard title="Home with a well and sump pump">
                        <p>
                            Pumps add both energy demand and starting-power
                            considerations. Capacity alone is not enough;
                            inverter and surge capability need to be checked.
                        </p>
                    </InformationCard>

                    <InformationCard title="Solar home with multi-day outages">
                        <p>
                            Outage-capable solar recharging can extend
                            resilience substantially when daily production is
                            reasonably matched to essential-load consumption.
                        </p>
                    </InformationCard>

                    <InformationCard title="Whole-home electric lifestyle">
                        <p>
                            Central cooling, electric heat, water heating,
                            cooking, laundry, and EV charging can make normal
                            household operation much more demanding than an
                            essential-load backup plan.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "List the loads that truly need to operate during an outage.",
                    "Estimate the running watts and daily operating time of each essential load.",
                    "Identify motor and compressor loads that may have higher starting-power requirements.",
                    "Compare total daily energy use with the battery's usable kWh capacity.",
                    "Compare simultaneous running load with the battery system's continuous kW output.",
                    "Check surge or motor-start capability for critical pumps, compressors, and HVAC equipment.",
                    "Compare estimated runtime with both typical and longer outages in your area.",
                    "If you have solar, verify that the system can operate and recharge the battery while the grid is down.",
                    "Use realistic outage solar production rather than the array's nameplate kW rating.",
                    "Get an installed project quote and verify incentives before calculating financial payback.",
                    "Use actual utility rates and program payments when estimating recurring financial benefits.",
                    "Review battery warranty terms, retained-capacity provisions, and other long-term limitations.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying"
                subtitle="Capacity is only one specification in a backup-power system."
                questions={[
                    "What is the system's usable battery capacity?",
                    "What continuous power can the system deliver?",
                    "What short-duration or surge output is available?",
                    "Can it start my well pump, sump pump, refrigerator, or HVAC equipment?",
                    "Which circuits will be backed up?",
                    "Can the system manage or shed large loads automatically?",
                    "Can my solar array operate and recharge the battery when the grid is down?",
                    "How much solar charging should I realistically expect during poor weather?",
                    "What happens when the battery reaches its reserve level?",
                    "What utility rate or program could create recurring financial savings?",
                    "What incentives does this specific installation qualify for?",
                    "What does the warranty guarantee about retained battery capacity or throughput?",
                    "Can additional battery capacity be added later?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Battery energy capacity in kWh and power output in kW are separate constraints.",
                    "Runtime depends on the loads you choose to operate, not on battery capacity alone.",
                    "Essential-load backup can require substantially less battery capacity than maintaining normal whole-home operation.",
                    "Motor and compressor loads can have starting-power requirements that a simple running-watt calculation does not capture.",
                    "A battery can provide backup without solar, but stored energy becomes a finite reserve during a prolonged outage.",
                    "Outage-capable solar can extend runtime by replenishing some of the energy consumed each day.",
                    "Solar array nameplate power is not the same as daily energy available for battery charging.",
                    "Bill savings, utility payments, and outage protection should be evaluated separately.",
                    "A battery can provide meaningful resilience even when financial savings alone do not create a short payback.",
                    "Installed cost, incentives, utility rates, battery degradation, and warranty terms all affect the long-term decision.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Solar and Resilience Basics",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/cmei/systems/solar-and-resilience-basics",
                    },
                    {
                        title: "Solar Integration: Solar Energy and Storage Basics",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www.energy.gov/cmei/systems/solar-integration-solar-energy-and-storage-basics",
                    },
                    {
                        title: "Electric Power Annual — Reliability",
                        publisher:
                            "U.S. Energy Information Administration",
                        href: "https://www.eia.gov/electricity/annual/",
                    },
                    {
                        title: "Home Battery Backup Without Solar",
                        publisher: "EnergySage",
                        href: "https://www.energysage.com/energy-storage/home-battery-backup-without-solar-is-it-worth-it/",
                    },
                    {
                        title: "How Much Do Solar Batteries Cost?",
                        publisher: "EnergySage",
                        href: "https://www.energysage.com/energy-storage/how-much-do-batteries-cost/",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-a-home-battery-backup-worth-it"
            />
        </GuideLayout>
    );
}