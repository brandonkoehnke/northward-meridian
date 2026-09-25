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
import WhyThisMatters from "@/app/components/article/WhyThisMatters";

import ThermostatSetbackSavingsCalculator from "./ThermostatSetbackSavingsCalculator";

import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "does-turning-the-thermostat-down-at-night-save-money",
    );

    if (!found) {
        throw new Error(
            "Guide not found: does-turning-the-thermostat-down-at-night-save-money",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "thermostat-setback-savings-calculator",
        label: "Thermostat setback savings calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "why-setback-works",
        label: "Why thermostat setback can save energy",
    },
    {
        id: "how-much-setback",
        label: "How much should you turn it down?",
    },
    {
        id: "hours-matter",
        label: "Why the number of hours matters",
    },
    {
        id: "heat-pumps",
        label: "Why heat pumps are different",
    },
    {
        id: "summer-cooling",
        label: "What about air conditioning?",
    },
    {
        id: "common-mistakes",
        label: "Common thermostat mistakes",
    },
    {
        id: "smart-thermostats",
        label: "Do smart thermostats change the answer?",
    },
    {
        id: "savings-expectations",
        label: "What savings should you expect?",
    },
    {
        id: "when-to-use-setback",
        label: "When setback is most useful",
    },
    {
        id: "when-to-be-careful",
        label: "When to be careful",
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
        id: "sleep",
        title: "I want to turn the thermostat down while I sleep",
        summary:
            "See how much the setback schedule could matter over the course of a year.",
        guidance:
            "Enter your normal temperature, nighttime temperature, hours, days, and estimated savings rate in the calculator. For conventional heating systems, DOE describes a 7 to 10 degree Fahrenheit setback for eight hours per day as a potentially meaningful energy-saving strategy.",
        destinationId: "thermostat-setback-savings-calculator",
        destinationLabel: "Thermostat Setback Savings Calculator",
    },
    {
        id: "away",
        title: "I want to lower the temperature when nobody is home",
        summary:
            "Compare the time spent away with the potential benefit of using a lower or higher setpoint.",
        guidance:
            "A longer period away can make temperature adjustment more meaningful, but the appropriate strategy depends on the heating or cooling system and the conditions inside the home.",
        destinationId: "hours-matter",
        destinationLabel: "Why the Number of Hours Matters",
    },
    {
        id: "heat-pump",
        title: "I have a heat pump",
        summary:
            "Find out why conventional thermostat setback advice may not apply to your system.",
        guidance:
            "Heat pumps can operate differently during temperature recovery. ENERGY STAR currently recommends a steady temperature for air-source heat pumps rather than conventional setbacks.",
        destinationId: "heat-pumps",
        destinationLabel: "Why Heat Pumps Are Different",
    },
    {
        id: "ac",
        title: "I am thinking about summer cooling",
        summary:
            "See how thermostat adjustment can apply to air conditioning as well as heating.",
        guidance:
            "Raising the temperature during periods when a home is unoccupied can reduce cooling demand. The same basic idea applies, but actual savings depend on the home, climate, equipment, and schedule.",
        destinationId: "summer-cooling",
        destinationLabel: "What About Air Conditioning?",
    },
    {
        id: "smart",
        title: "I am considering a smart thermostat",
        summary:
            "Determine whether automatic scheduling changes the practical value of setback.",
        guidance:
            "A smart thermostat can automate temperature changes and may use scheduling or occupancy features, but the value comes from the settings and HVAC system rather than the connectivity itself.",
        destinationId: "smart-thermostats",
        destinationLabel: "Do Smart Thermostats Change the Answer?",
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
        modifiedTime: "2026-09-25",
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
    dateModified: "2026-09-25",
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

export default function ThermostatSetbackGuide() {
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
            <ThermostatSetbackSavingsCalculator />

            <WhyThisMatters id="short-answer">
                <p>
                    Yes, lowering a thermostat during periods when a home is
                    unoccupied or people are asleep can reduce heating and
                    cooling energy use. The basic reason is straightforward:
                    when the indoor temperature is closer to the outdoor
                    temperature, the home generally loses or gains heat more
                    slowly.
                </p>

                <p>
                    The amount you save depends on more than the number shown on
                    the thermostat. The size of the setback, how long it lasts,
                    how many days you use it, the climate, the building
                    envelope, and the heating or cooling system all matter.
                </p>

                <p>
                    DOE says a conventional thermostat setback of 7 to 10
                    degrees Fahrenheit for eight hours per day can save as much
                    as about 10% per year on heating and cooling. That is a
                    general reference point rather than a prediction for your
                    home.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="why-setback-works"
                eyebrow="The Basic Physics"
                title="A lower heating setpoint reduces the rate at which the home loses heat."
            >
                <p>
                    In winter, heat naturally moves from the warmer indoor
                    environment toward the colder outdoors. The larger the
                    temperature difference, the greater the rate of heat loss
                    through the building envelope.
                </p>

                <p>
                    Lowering the thermostat reduces that indoor-outdoor
                    temperature difference during the setback period. The home
                    can therefore lose less heat while the thermostat is set
                    lower.
                </p>

                <p>
                    When the thermostat returns to its normal setting, the
                    system has to bring the home back to the desired
                    temperature. The energy used during recovery does not erase
                    the heat-loss reduction that occurred while the home was
                    cooler.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        The key idea
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        You are not saving energy because the thermostat setting
                        has a special efficiency property. You are saving
                        because the home spends less time being kept at the
                        higher temperature.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="how-much-setback"
                eyebrow="How Far Should You Go?"
                title="The size of the setback matters, but bigger is not automatically better."
            >
                <p>
                    DOE uses a 7 to 10 degree Fahrenheit setback for eight hours
                    per day as a general reference for conventional systems.
                </p>

                <p>
                    A smaller setback can still reduce energy use. A larger
                    setback can reduce heat loss further, but comfort, recovery
                    time, plumbing concerns, and equipment behavior may place
                    practical limits on how far you should go.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="A modest setback">
                        <p>
                            A smaller temperature change is easier to tolerate
                            and can still reduce heating or cooling demand when
                            used consistently.
                        </p>
                    </InformationCard>

                    <InformationCard title="A larger setback">
                        <p>
                            A larger change may provide more savings during the
                            setback period, but system type, recovery behavior,
                            and comfort become more important.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The right question is not simply how low you can set the
                    thermostat. It is how much adjustment produces useful
                    savings without creating a new problem.
                </p>
            </GuideSection>

            <GuideSection
                id="hours-matter"
                eyebrow="Time Is A Major Variable"
                title="A thermostat setback only helps during the hours when you use it."
            >
                <p>
                    A two-hour setback and an eight-hour setback are not
                    equivalent. A schedule used every night throughout the
                    heating season is also very different from an occasional
                    weekend change.
                </p>

                <p>
                    This is why the calculator asks for both the number of hours
                    and the number of days per year.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Hours per day">
                        <p>
                            Determines how long the home spends at the lower
                            heating or higher cooling setpoint.
                        </p>
                    </InformationCard>

                    <InformationCard title="Days per year">
                        <p>
                            Determines how often the schedule is actually used.
                        </p>
                    </InformationCard>

                    <InformationCard title="Annual energy cost">
                        <p>
                            Determines the dollar value of a given percentage
                            reduction.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    A useful schedule is one you can apply consistently. A
                    theoretical maximum setback that residents routinely
                    override is less useful than a comfortable schedule that
                    operates automatically.
                </p>
            </GuideSection>

            <GuideSection
                id="heat-pumps"
                eyebrow="Important Exception"
                title="Heat pumps can require a different thermostat strategy."
            >
                <p>
                    Conventional advice about lowering a furnace thermostat
                    does not automatically transfer to an air-source heat pump.
                </p>

                <p>
                    ENERGY STAR currently recommends sticking with a steady
                    temperature for air-source heat pumps rather than turning
                    the temperature down when people are away or asleep.
                </p>

                <p>
                    One reason is that heat-pump recovery can behave differently
                    from conventional furnace or boiler operation. Depending on
                    the system and controls, a large recovery can also interact
                    with supplemental or auxiliary heat.
                </p>

                <div className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Practical rule
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        If you have an air-source heat pump, follow the
                        thermostat strategy recommended for your specific system
                        before applying conventional setback advice.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="summer-cooling"
                eyebrow="Cooling Works The Other Way"
                title="For air conditioning, increasing the setpoint during unoccupied periods can reduce cooling demand."
            >
                <p>
                    The same basic principle applies during hot weather, but in
                    reverse. A higher indoor temperature generally reduces the
                    temperature difference between the house and the outdoor
                    environment.
                </p>

                <p>
                    DOE describes programmable thermostat scheduling as a way to
                    adjust heating or air-conditioning operation based on when
                    the home is occupied.
                </p>

                <p>
                    Actual savings vary with climate, humidity, insulation, air
                    leakage, equipment efficiency, and how much cooling the home
                    would otherwise require.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Heating">
                        <p>
                            Lower the setpoint during appropriate unoccupied or
                            sleeping periods.
                        </p>
                    </InformationCard>

                    <InformationCard title="Cooling">
                        <p>
                            Raise the setpoint during appropriate unoccupied
                            periods.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="common-mistakes"
                eyebrow="What Can Go Wrong?"
                title="The most common thermostat mistakes are usually about the system, not the math."
            >
                <ul className="space-y-4">
                    <GuideBullet>
                        Applying conventional setback advice to a heat pump
                        without checking the equipment guidance.
                    </GuideBullet>
                    <GuideBullet>
                        Using a setback so aggressive that occupants routinely
                        override it.
                    </GuideBullet>
                    <GuideBullet>
                        Ignoring indoor humidity or other comfort conditions in
                        cooling season.
                    </GuideBullet>
                    <GuideBullet>
                        Assuming a thermostat schedule produces a fixed savings
                        percentage in every home.
                    </GuideBullet>
                    <GuideBullet>
                        Treating thermostat adjustment as a substitute for
                        fixing major insulation, air-leakage, or equipment
                        problems.
                    </GuideBullet>
                </ul>

                <p>
                    Thermostat scheduling is a relatively simple operating
                    change. It should not distract from larger efficiency
                    problems that may dominate a home&apos;s energy use.
                </p>
            </GuideSection>

            <GuideSection
                id="smart-thermostats"
                eyebrow="Automation Can Help"
                title="A smart thermostat can make a useful schedule easier to maintain."
            >
                <p>
                    A smart thermostat does not automatically create savings
                    simply because it is connected to the internet.
                </p>

                <p>
                    Its practical value can come from making a consistent
                    schedule easier to use. ENERGY STAR notes that certified
                    smart thermostats can provide scheduling, feedback about
                    energy consequences, and occupancy-based features such as
                    geofencing.
                </p>

                <p>
                    That can be useful for households whose schedule changes
                    frequently, but it does not eliminate the need to use a
                    compatible control strategy for the HVAC system.
                </p>
            </GuideSection>

            <GuideSection
                id="savings-expectations"
                eyebrow="Do Not Overestimate The Number"
                title="A 10% reference does not mean every home will save exactly 10%."
            >
                <p>
                    DOE&apos;s published 7 to 10 degree Fahrenheit, eight-hour
                    setback reference is useful because it establishes that
                    thermostat scheduling can materially affect heating and
                    cooling energy use.
                </p>

                <p>
                    It is not a universal calculator input. Actual savings
                    depend on factors such as outdoor temperature, the building
                    envelope, HVAC equipment, thermostat behavior, occupancy,
                    and the amount of time spent at the setback temperature.
                </p>

                <p>
                    That is why the calculator leaves the savings rate editable.
                    Enter a conservative scenario that you can defend rather
                    than assuming the maximum published reference applies to
                    your home.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Better question
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        How much of your current heating and cooling spending
                        would have to disappear for your chosen thermostat
                        schedule to make a meaningful difference?
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="when-to-use-setback"
                eyebrow="Where It Tends To Fit"
                title="Thermostat adjustment is most useful when the home is routinely unoccupied or people are asleep for several hours."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Consistent nighttime schedule">
                        <p>
                            A predictable sleep schedule makes automatic
                            thermostat adjustment easy to maintain.
                        </p>
                    </InformationCard>

                    <InformationCard title="Regular daytime absence">
                        <p>
                            Homes that are empty for much of the day have more
                            opportunities to use a different temperature
                            setting.
                        </p>
                    </InformationCard>

                    <InformationCard title="High heating or cooling costs">
                        <p>
                            A percentage reduction is more valuable in dollars
                            when annual HVAC spending is high.
                        </p>
                    </InformationCard>

                    <InformationCard title="Automatic scheduling">
                        <p>
                            Programmable or smart controls can remove the need
                            to remember the change manually.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-to-be-careful"
                eyebrow="Know The Limits"
                title="There are situations where the simple thermostat-setback rule deserves more scrutiny."
            >
                <ul className="space-y-4">
                    <GuideBullet>
                        Air-source heat pumps and other systems with
                        specialized control strategies.
                    </GuideBullet>
                    <GuideBullet>
                        Homes where temperature changes create plumbing or
                        moisture concerns.
                    </GuideBullet>
                    <GuideBullet>
                        Households where comfort requirements make the proposed
                        setback impractical.
                    </GuideBullet>
                    <GuideBullet>
                        Systems that use supplemental heat during recovery.
                    </GuideBullet>
                    <GuideBullet>
                        Situations where another building or equipment problem
                        is much larger than the potential thermostat savings.
                    </GuideBullet>
                </ul>

                <p>
                    When the equipment or building has unusual characteristics,
                    manufacturer or professional guidance should take priority
                    over a generic schedule.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same six-degree setback can have very different value in different homes."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: Conventional furnace, $2,000 annual HVAC cost">
                        <p>
                            A homeowner lowers the temperature from 70°F to 64°F
                            for eight hours every night and uses a conservative
                            5% savings scenario.
                        </p>

                        <p className="mt-4">
                            The calculator would model about $100 of annual
                            savings under that assumption. The number is a
                            scenario, not a prediction.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: Same home, but only two hours of setback">
                        <p>
                            The temperature change is identical, but the home
                            spends much less time at the lower setting.
                        </p>

                        <p className="mt-4">
                            That illustrates why hours of setback are an
                            important input rather than treating the temperature
                            difference alone as the savings driver.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: Air-source heat pump">
                        <p>
                            A homeowner wants to apply the same 70°F to 64°F
                            nighttime setback.
                        </p>

                        <p className="mt-4">
                            The conventional savings calculation should not be
                            treated as a recommendation. ENERGY STAR currently
                            advises a steadier temperature for air-source heat
                            pumps.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: High annual HVAC spending">
                        <p>
                            Two homes use the same setback schedule and assume
                            the same percentage savings.
                        </p>

                        <p className="mt-4">
                            The household with higher annual heating and cooling
                            spending receives the larger dollar benefit because
                            the same percentage reduction applies to a larger
                            baseline.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before Changing Your Thermostat Schedule"
                items={[
                    "Identify your heating and cooling system type.",
                    "Check whether the manufacturer recommends a particular thermostat strategy.",
                    "Determine how many hours your home is routinely unoccupied or occupied by sleeping residents.",
                    "Choose a setback or setup temperature that remains practical and comfortable.",
                    "Use a programmable or smart thermostat when automation would make the schedule easier to follow consistently.",
                    "Estimate your annual heating and cooling spending from actual bills when possible.",
                    "Use a conservative savings scenario instead of assuming a maximum published benchmark.",
                    "Watch for unusual recovery behavior, comfort problems, or supplemental heat use.",
                    "Revisit larger insulation, air-leakage, or equipment problems if thermostat changes have only a small effect.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Use these questions when your HVAC system or home does not fit a simple thermostat schedule."
                questions={[
                    "Does my heating or cooling system have a recommended setback strategy?",
                    "Does my heat pump use auxiliary or supplemental heat during recovery?",
                    "How long does my system normally take to recover from a setback?",
                    "Would a programmable or smart thermostat be compatible with my equipment?",
                    "Could the proposed schedule create humidity, comfort, or plumbing concerns?",
                    "Which temperatures and schedules does the equipment manufacturer recommend?",
                    "Are there larger insulation, air-leakage, or equipment problems that should be addressed first?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Thermostat setback can reduce heating and cooling energy use because the home spends less time being maintained at a high heating or low cooling setpoint.",
                    "DOE says a 7 to 10 degree Fahrenheit setback for eight hours per day can save as much as about 10% per year on heating and cooling in a general conventional-system context.",
                    "The size of the setback, duration, number of days used, climate, building envelope, and HVAC system all affect actual savings.",
                    "The calculator keeps the savings rate editable because a published benchmark is not a prediction for an individual home.",
                    "Air-source heat pumps are an important exception to generic setback advice; ENERGY STAR currently recommends a steady temperature for these systems.",
                    "Smart thermostats can make useful schedules easier to maintain, but the thermostat itself does not guarantee savings.",
                    "Thermostat scheduling is an operating strategy, not a substitute for addressing major building-envelope or equipment problems.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Home Upgrades",
                        publisher:
                            "U.S. Department of Energy",
                        href:
                            "https://www.energy.gov/save/home-upgrades",
                    },
                    {
                        title:
                            "Six Simple Steps To Save Energy and Money This Winter",
                        publisher:
                            "U.S. Department of Energy",
                        href:
                            "https://www.energy.gov/indianenergy/articles/six-simple-steps-save-energy-and-money-winter",
                    },
                    {
                        title: "Air-Source Heat Pumps",
                        publisher: "ENERGY STAR",
                        href:
                            "https://www.energystar.gov/products/air_source_heat_pumps",
                    },
                    {
                        title: "Smart Thermostats",
                        publisher: "ENERGY STAR",
                        href:
                            "https://www.energystar.gov/products/smart_thermostats",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}