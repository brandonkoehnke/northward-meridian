import type { Metadata } from "next";

import AirFilterRealityCheck from "./AirFilterRealityCheck";
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
        "dirty-engine-air-filter-gas-mileage",
    );

    if (!found) {
        throw new Error(
            "Guide not found: dirty-engine-air-filter-gas-mileage",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "air-filter-reality-check",
        label: "Air filter reality check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "old-advice",
        label: "Why the old advice existed",
    },
    {
        id: "modern-engines",
        label: "What changed in modern engines",
    },
    {
        id: "research",
        label: "What the research found",
    },
    {
        id: "performance",
        label: "MPG vs. performance",
    },
    {
        id: "filter-job",
        label: "What the filter actually does",
    },
    {
        id: "replace",
        label: "When to replace it",
    },
    {
        id: "mpg-drop",
        label: "If your MPG dropped",
    },
    {
        id: "performance-filters",
        label: "Performance air filters",
    },
    {
        id: "diesel-turbo",
        label: "Diesels and turbo engines",
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
        id: "mpg-dropped",
        title: "My gas mileage has dropped",
        summary:
            "See whether a dirty air filter is a strong explanation on a modern fuel-injected vehicle.",
        guidance:
            "On modern electronically controlled gasoline vehicles, research suggests severe filter restriction is more likely to affect performance than fuel economy. Consider other changes that can influence MPG too.",
        destinationId: "mpg-drop",
        destinationLabel: "If Your MPG Dropped",
    },
    {
        id: "sluggish",
        title: "My car feels sluggish",
        summary:
            "Understand why restricted airflow can affect acceleration even when MPG changes little.",
        guidance:
            "A severely restricted filter can limit the airflow available when the engine demands more power. Performance can therefore be affected even when the fuel-management system maintains the commanded mixture.",
        destinationId: "performance",
        destinationLabel: "MPG vs. Performance",
    },
    {
        id: "dirty-filter",
        title: "My filter looks dirty",
        summary:
            "Decide whether visible dirt alone tells you the filter should be replaced.",
        guidance:
            "Appearance is useful context, but restriction, damage, manufacturer guidance, operating environment, and service interval all matter.",
        destinationId: "replace",
        destinationLabel: "When to Replace It",
    },
    {
        id: "older-car",
        title: "I have an older carbureted vehicle",
        summary:
            "See why the traditional fuel-economy advice is more relevant to older fuel systems.",
        guidance:
            "Carbureted engines do not compensate for restricted airflow in the same way as modern closed-loop electronic fuel-injection systems.",
        destinationId: "old-advice",
        destinationLabel: "Why the Old Advice Existed",
    },
    {
        id: "routine",
        title: "I'm just doing routine maintenance",
        summary:
            "Understand why an air filter can need replacement even without an MPG benefit.",
        guidance:
            "The filter protects the engine from airborne contaminants while allowing adequate airflow. Fuel economy is only one possible consideration.",
        destinationId: "filter-job",
        destinationLabel: "What the Filter Actually Does",
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
        url: "https://northwardmeridian.com/about",
    },
    publisher: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: "https://northwardmeridian.com",
    },
};

export default function DirtyEngineAirFilterGasMileageGuide() {
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
            <AirFilterRealityCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    For a modern fuel-injected gasoline vehicle, a dirty engine air
                    filter does not necessarily reduce gas mileage the way traditional
                    maintenance advice suggests.
                </p>

                <p>
                    In testing supported by the U.S. Department of Energy, severely
                    restricted filters did not produce a significant fuel-economy change
                    on the modern fuel-injected vehicles evaluated. The restriction did,
                    however, affect acceleration performance.
                </p>

                <p>
                    An older carbureted vehicle behaved differently. In that case,
                    replacing the severely restricted filter improved fuel economy. The
                    old advice therefore had a legitimate technical basis; engine-control
                    technology changed the answer.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="old-advice"
                eyebrow="Why the Advice Used to Make Sense"
                title="Older fuel systems could respond differently to restricted airflow."
            >
                <p>
                    An engine needs air and fuel in an appropriate mixture for
                    combustion. Restricting the incoming air can change how an older
                    mechanically controlled fuel system behaves.
                </p>

                <p>
                    Carbureted engines do not have the same closed-loop electronic
                    controls found in modern vehicles. A severe intake restriction can
                    therefore affect the air-fuel mixture differently and contribute to
                    reduced fuel economy.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Older carbureted vehicle
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Dirty filter</p>
                        </div>

                        <div className="flex items-center justify-center text-2xl text-[var(--accent)]">
                            →
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Restricted airflow</p>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Fuel economy can suffer</p>
                        </div>
                    </div>
                </div>

                <p>
                    That history helps explain why the claim that a dirty air filter
                    wastes gasoline became such a common piece of automotive advice.
                </p>
            </GuideSection>

            <GuideSection
                id="modern-engines"
                eyebrow="What Changed"
                title="Modern engines measure and adjust fuel delivery electronically."
            >
                <p>
                    Modern gasoline engines use sensors and electronic engine controls to
                    manage fuel delivery. The system can respond to the amount of air
                    entering the engine rather than blindly supplying the same amount of
                    fuel when airflow changes.
                </p>

                <p>
                    That means restricting airflow does not necessarily make the engine
                    consume excess fuel for the same operating condition. Instead, the
                    engine-management system can reduce fuel delivery along with the
                    reduced airflow.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Simplified modern system
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <InformationCard title="Airflow changes">
                            <p>
                                A restricted filter reduces the amount of air the engine can
                                draw under demanding conditions.
                            </p>
                        </InformationCard>

                        <InformationCard title="ECU responds">
                            <p>
                                Electronic controls adjust fuel delivery based on measured
                                operating conditions.
                            </p>
                        </InformationCard>

                        <InformationCard title="Power can suffer">
                            <p>
                                Maximum available airflow and therefore performance can still
                                be limited even when the mixture remains controlled.
                            </p>
                        </InformationCard>
                    </div>
                </div>
            </GuideSection>

            <GuideSection
                id="research"
                eyebrow="What the Research Found"
                title="DOE-supported testing separated fuel economy from acceleration performance."
            >
                <p>
                    Oak Ridge National Laboratory researchers evaluated the effect of
                    clogged engine air filters on fuel economy and performance. The study
                    included modern fuel-injected gasoline vehicles as well as an older
                    carbureted vehicle for comparison.
                </p>

                <p>
                    On the modern closed-loop fuel-injected vehicles tested, severe
                    filter restriction did not significantly affect fuel economy. The
                    researchers did observe an effect on acceleration performance.
                </p>

                <p>
                    The older carbureted vehicle showed a measurable fuel-economy
                    improvement after the clogged filter was replaced, illustrating why
                    vehicle technology matters to the answer.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Modern fuel-injected vehicles">
                        <ul className="space-y-3">
                            <GuideBullet>
                                No significant fuel-economy effect in the vehicles tested
                            </GuideBullet>
                            <GuideBullet>
                                Acceleration performance could be affected
                            </GuideBullet>
                            <GuideBullet>
                                Electronic controls compensate for airflow changes
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Older carbureted vehicle">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Fuel economy was affected by severe restriction
                            </GuideBullet>
                            <GuideBullet>
                                Replacing the clogged filter improved fuel economy
                            </GuideBullet>
                            <GuideBullet>
                                Older fuel control behaves differently
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    This does not prove that every modern vehicle under every condition
                    will behave identically. It does show why a universal claim that a
                    dirty filter automatically causes poor MPG is too broad.
                </p>
            </GuideSection>

            <GuideSection
                id="performance"
                eyebrow="MPG Is Not the Same as Performance"
                title="A restricted filter can matter even when the fuel gauge barely notices."
            >
                <p>
                    An engine requires more airflow when it is producing more power.
                    Severe restriction can therefore become more noticeable during
                    acceleration or high-load operation than during gentle cruising.
                </p>

                <p>
                    This explains the apparently contradictory result: a modern engine
                    can maintain appropriate fuel control while still being unable to
                    produce as much maximum power because airflow is restricted.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Fuel economy">
                        <p>
                            Measures how much fuel is consumed to travel a given distance.
                            Modern fuel control can compensate for reduced airflow.
                        </p>
                    </InformationCard>

                    <InformationCard title="Performance">
                        <p>
                            Depends partly on how much air and fuel the engine can process
                            when additional power is demanded. Severe restriction can limit
                            that capacity.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="filter-job"
                eyebrow="The Filter Still Matters"
                title="The engine air filter is not primarily an MPG device."
            >
                <p>
                    The engine air filter exists to keep harmful airborne contaminants
                    from entering the engine while still allowing adequate airflow.
                </p>

                <p>
                    Dirt, dust, sand, debris, and other particles can contribute to wear
                    if they reach internal engine components. A filter therefore has
                    value even if replacing it does not improve fuel economy.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Filter contaminants">
                        <p>
                            Prevent abrasive material and debris from entering the intake
                            system and engine.
                        </p>
                    </InformationCard>

                    <InformationCard title="Allow airflow">
                        <p>
                            Supply the engine with enough filtered air across its intended
                            operating range.
                        </p>
                    </InformationCard>

                    <InformationCard title="Protect performance">
                        <p>
                            Avoid excessive restriction that can limit airflow when the
                            engine demands more power.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="replace"
                eyebrow="Maintenance"
                title="Replace the filter because it needs replacement, not because you expect free MPG."
            >
                <p>
                    The appropriate inspection and replacement interval depends on the
                    vehicle and operating environment. Driving regularly on dusty roads
                    or in unusually dirty conditions can require more frequent attention
                    than clean highway driving.
                </p>

                <p>
                    Follow the maintenance schedule and inspection procedure specified by
                    the vehicle manufacturer. Replace a damaged, excessively restricted,
                    improperly fitted, or otherwise unserviceable filter as appropriate.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Reasons to inspect or replace">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Manufacturer maintenance interval
                            </GuideBullet>
                            <GuideBullet>Severe contamination or restriction</GuideBullet>
                            <GuideBullet>Physical damage</GuideBullet>
                            <GuideBullet>Improper fit or sealing</GuideBullet>
                            <GuideBullet>Operation in unusually dusty conditions</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Weak reason by itself">
                        <p>
                            Expecting a substantial MPG improvement on a modern
                            fuel-injected vehicle solely because the replacement filter is
                            cleaner.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="mpg-drop"
                eyebrow="Diagnosing Lower Fuel Economy"
                title="If your MPG dropped, look beyond the air filter."
            >
                <p>
                    Fuel economy changes for many reasons, and several can produce a much
                    more noticeable effect than a moderately dirty air filter on a modern
                    vehicle.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Vehicle and maintenance">
                        <ul className="space-y-3">
                            <GuideBullet>Tire pressure</GuideBullet>
                            <GuideBullet>Wheel alignment or tire changes</GuideBullet>
                            <GuideBullet>Brake drag or mechanical problems</GuideBullet>
                            <GuideBullet>Warning lights or engine faults</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Driving and environment">
                        <ul className="space-y-3">
                            <GuideBullet>Cold weather</GuideBullet>
                            <GuideBullet>More short trips</GuideBullet>
                            <GuideBullet>Higher driving speed</GuideBullet>
                            <GuideBullet>Roof racks or cargo</GuideBullet>
                            <GuideBullet>Heavier loads or towing</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If the change is sudden, substantial, or accompanied by a warning
                    light or abnormal vehicle behavior, diagnose the vehicle rather than
                    assuming a routine filter replacement explains the problem.
                </p>
            </GuideSection>

            <GuideSection
                id="performance-filters"
                eyebrow="What About High-Flow Filters?"
                title="More airflow capacity does not automatically mean better fuel economy."
            >
                <p>
                    The same principle applies in the opposite direction. If a modern
                    engine already receives adequate airflow for the operating condition,
                    installing a less restrictive filter does not guarantee that the
                    vehicle will use less fuel.
                </p>

                <p>
                    A performance-oriented intake or filter may affect airflow capacity,
                    induction sound, service requirements, or maximum performance in some
                    applications. Those are separate questions from whether ordinary
                    fuel economy improves.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="font-semibold">
                        Avoid reversing the dirty-filter myth.
                    </p>

                    <p className="mt-3 leading-7 text-[var(--muted)]">
                        If severe restriction does not meaningfully reduce MPG on a modern
                        closed-loop engine, simply increasing filter airflow beyond what
                        the engine needs should not automatically be expected to create an
                        MPG gain either.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="diesel-turbo"
                eyebrow="Important Scope"
                title="Do not automatically extend the gasoline-vehicle study to every engine."
            >
                <p>
                    The DOE-supported research behind the central finding evaluated
                    specific gasoline vehicles. Diesel engines, turbocharged
                    applications, modified vehicles, and different engine-management
                    strategies can behave differently.
                </p>

                <p>
                    Turbocharged gasoline engines still use electronic engine controls,
                    but their airflow and boost-management systems add complexity. Diesel
                    engines also control combustion differently from gasoline engines.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Scope the conclusion correctly
                    </p>

                    <p className="mt-4 leading-7">
                        The strongest conclusion is about the modern fuel-injected gasoline
                        vehicles that were actually tested. Vehicle-specific manufacturer
                        guidance remains more useful than extending one study to every
                        engine design.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The right conclusion depends on what you are trying to fix."
            >
                <div className="space-y-6">
                    <InformationCard title="Modern car lost 2 MPG this winter">
                        <p>
                            The filter is somewhat dirty, but temperatures have also fallen
                            and the driver is making more short trips. Those changes deserve
                            consideration before attributing the MPG loss to the filter.
                        </p>
                    </InformationCard>

                    <InformationCard title="Modern car feels weak under hard acceleration">
                        <p>
                            A severely restricted filter is more plausible as a contributor
                            to performance loss. Inspect the filter and follow the
                            manufacturer&apos;s service guidance while also considering
                            other possible causes.
                        </p>
                    </InformationCard>

                    <InformationCard title="Older carbureted collector car">
                        <p>
                            The traditional fuel-economy advice is more relevant. Severe
                            intake restriction can affect mixture behavior differently than
                            it does on a modern electronically controlled vehicle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Routine maintenance with no symptoms">
                        <p>
                            Inspect or replace the filter according to the maintenance
                            schedule and actual condition. There is no need to promise
                            yourself an MPG improvement to justify normal maintenance.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Do not assume a dirty engine air filter is the cause of lower MPG on a modern fuel-injected gasoline vehicle.",
                    "Separate fuel economy from acceleration and maximum engine performance.",
                    "Follow the manufacturer's inspection and replacement guidance for the filter.",
                    "Replace damaged, excessively restricted, or improperly fitted filters when appropriate.",
                    "If MPG changes, consider tire pressure, weather, trip length, speed, cargo, and other vehicle conditions too.",
                    "Treat a warning light or abnormal engine behavior as a reason for vehicle-specific diagnosis.",
                    "Recognize that older carbureted vehicles can respond differently to intake restriction.",
                    "Do not assume a high-flow replacement filter automatically creates better MPG.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask About Your Air Filter"
                subtitle="Start by separating maintenance, performance, and fuel-economy concerns."
                questions={[
                    "Is my vehicle a modern fuel-injected gasoline vehicle or an older carbureted vehicle?",
                    "Am I noticing lower MPG, weaker acceleration, or both?",
                    "Is the filter merely dirty-looking, or is it actually damaged or severely restricted?",
                    "What inspection or replacement interval does the manufacturer specify?",
                    "Do I regularly drive in dusty or unusually dirty conditions?",
                    "Did tire pressure, weather, trip length, speed, or cargo change around the same time as my MPG?",
                    "Is a check-engine or other warning light present?",
                    "Am I expecting a filter replacement to solve a problem that needs broader diagnosis?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "DOE-supported testing found no significant fuel-economy effect from severe air-filter restriction on the modern fuel-injected gasoline vehicles evaluated.",
                    "The same research found that severe restriction could affect acceleration performance.",
                    "An older carbureted vehicle in the research did show a fuel-economy improvement after the clogged filter was replaced.",
                    "Modern electronic engine controls can adjust fuel delivery as airflow changes.",
                    "A dirty filter can still need replacement even when replacing it does not improve MPG.",
                    "The filter's primary jobs are protecting the engine from contaminants and allowing adequate airflow.",
                    "A drop in fuel economy can have many causes, including weather, tire pressure, driving pattern, speed, and aerodynamic load.",
                    "The research should not automatically be generalized to every diesel, turbocharged, modified, or otherwise different engine configuration.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title:
                            "Effect of Intake Air Filter Condition on Vehicle Fuel Economy",
                        publisher:
                            "Oak Ridge National Laboratory / U.S. Department of Energy",
                        href: "https://www.osti.gov/servlets/purl/939301",
                    },
                    {
                        title:
                            "Effect of Intake Air Filter Condition on Light-Duty Gasoline Vehicles",
                        publisher:
                            "Oak Ridge National Laboratory / U.S. Department of Energy",
                        href: "https://www.energy.gov/sites/default/files/2015/06/f24/ti057_west_2015_o.pdf",
                    },
                    {
                        title: "Engine Air Filters: What You Need to Know",
                        publisher: "CARFAX",
                        href: "https://www.carfax.com/maintenance/engine-air-filters",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="dirty-engine-air-filter-gas-mileage" />
        </GuideLayout>
    );
}