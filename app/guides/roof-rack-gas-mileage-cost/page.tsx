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
import RoofRackFuelCalculator from "./RoofRackFuelCalculator";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "roof-rack-gas-mileage-cost",
    );

    if (!found) {
        throw new Error(
            "Guide not found: roof-rack-gas-mileage-cost",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "roof-rack-calculator",
        label: "Roof rack fuel calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "why-drag",
        label: "Why a roof rack uses more fuel",
    },
    {
        id: "how-much",
        label: "How much MPG can it cost?",
    },
    {
        id: "speed",
        label: "Why speed matters",
    },
    {
        id: "vehicle",
        label: "Why vehicle shape matters",
    },
    {
        id: "crossbars-vs-cargo",
        label: "Crossbars vs. loaded cargo",
    },
    {
        id: "what-to-remove",
        label: "What to remove",
    },
    {
        id: "economics",
        label: "Does removal pay for itself?",
    },
    {
        id: "evs",
        label: "What about EVs?",
    },
    {
        id: "testing",
        label: "How to test your own vehicle",
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
        id: "rarely-use",
        title: "I only use my roof rack a few times a year",
        summary:
            "Estimate whether leaving an unused rack installed has enough fuel cost to matter.",
        guidance:
            "Compare the amount of highway driving you do with the rack installed against the cost and inconvenience of removing and reinstalling it.",
        destinationId: "roof-rack-calculator",
        destinationLabel: "Roof Rack Fuel Calculator",
    },
    {
        id: "highway",
        title: "I do a lot of highway driving",
        summary:
            "See why aerodynamic drag becomes more important as speed increases.",
        guidance:
            "A rack that has little noticeable effect around town can have a larger effect at highway speed. Focus your estimate on the miles where the rack is exposed to higher-speed airflow.",
        destinationId: "speed",
        destinationLabel: "Why Speed Matters",
    },
    {
        id: "cargo",
        title: "I keep something mounted on the rack",
        summary:
            "Separate the aerodynamic penalty of bare crossbars from the effect of carrying cargo.",
        guidance:
            "A bike, ski rack, cargo box, basket, or other attachment changes the airflow differently from an empty set of bars.",
        destinationId: "crossbars-vs-cargo",
        destinationLabel: "Crossbars vs. Loaded Cargo",
    },
    {
        id: "remove",
        title: "I'm wondering whether I should take it off",
        summary:
            "Compare the potential fuel savings with how often you actually use the rack.",
        guidance:
            "The financial case depends on annual miles, highway share, gas price, rack penalty, and how many years you expect to keep the vehicle.",
        destinationId: "economics",
        destinationLabel: "Does Removal Pay for Itself?",
    },
    {
        id: "ev",
        title: "I drive an EV",
        summary:
            "Translate aerodynamic drag into range and energy consumption rather than gallons of fuel.",
        guidance:
            "The underlying aerodynamic effect still exists, but the way you experience the cost changes from gasoline consumption to electricity use and driving range.",
        destinationId: "evs",
        destinationLabel: "What About EVs?",
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
        publishedTime: "2026-09-22",
        modifiedTime: "2026-09-22",
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
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    mainEntityOfPage: canonicalUrl,
    author: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: "https://www.northwardmeridian.com/about",
    },
    publisher: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: "https://www.northwardmeridian.com",
    },
};

export default function RoofRackGasMileageCostGuide() {
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
            <RoofRackFuelCalculator />

            <WhyThisMatters id="short-answer">
                <p>
                    Yes, a roof rack can reduce fuel economy. The reason is aerodynamic
                    drag: adding bars, towers, boxes, bikes, skis, or other equipment
                    changes the airflow around the vehicle and requires additional energy
                    to maintain speed.
                </p>

                <p>
                    The size of the penalty varies. Published tests have found small
                    effects for some vehicles and much larger effects for others,
                    particularly at highway speed and when bulky cargo is mounted above
                    the roof.
                </p>

                <p>
                    That makes the useful question different from simply asking whether a
                    roof rack uses more gas. The useful question is whether the extra fuel
                    cost for your driving is large enough to make removing an unused rack
                    worthwhile.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="why-drag"
                eyebrow="The Physics"
                title="A roof rack changes the air the vehicle has to push through."
            >
                <p>
                    Aerodynamic drag is one of the forces resisting a vehicle as it moves
                    through the air. A roof rack adds objects and surfaces above the main
                    body of the vehicle, disturbing airflow and increasing drag.
                </p>

                <p>
                    The engine then has to produce additional power to maintain the same
                    road speed. At low speeds, rolling resistance and other losses can be
                    relatively more important. As speed rises, aerodynamic drag becomes
                    increasingly significant.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Simplified energy flow
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Engine</p>
                            <p className="mt-2 text-sm text-[var(--muted)]">
                                Produces power
                            </p>
                        </div>

                        <div className="flex items-center justify-center text-2xl text-[var(--accent)]">
                            →
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Vehicle</p>
                            <p className="mt-2 text-sm text-[var(--muted)]">
                                Moves forward
                            </p>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Air resistance</p>
                            <p className="mt-2 text-sm text-[var(--muted)]">
                                Removes energy
                            </p>
                        </div>
                    </div>
                </div>

                <p>
                    Adding a roof rack increases the aerodynamic work required to maintain
                    speed. That extra work ultimately appears as additional energy or
                    fuel consumption.
                </p>
            </GuideSection>

            <GuideSection
                id="how-much"
                eyebrow="The Numbers Vary"
                title="There is no single MPG penalty that applies to every roof rack."
            >
                <p>
                    Published testing demonstrates why blanket claims about a specific
                    percentage are misleading. Different vehicles, rack shapes,
                    crossbar positions, cargo loads, and test speeds produce different
                    results.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Empty racks">
                        <ul className="space-y-3">
                            <GuideBullet>Crossbars add exposed frontal area</GuideBullet>
                            <GuideBullet>
                                Towers and supports disrupt airflow
                            </GuideBullet>
                            <GuideBullet>
                                Low-profile designs can reduce the penalty
                            </GuideBullet>
                            <GuideBullet>
                                Vehicle shape determines how much the disturbance matters
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Loaded racks">
                        <ul className="space-y-3">
                            <GuideBullet>Roof boxes add substantial frontal area</GuideBullet>
                            <GuideBullet>Bikes create additional turbulence</GuideBullet>
                            <GuideBullet>
                                Skis, boards, baskets, and other cargo alter airflow
                            </GuideBullet>
                            <GuideBullet>
                                Cargo height and position can change the result
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Because the range is so wide, the calculator intentionally asks you
                    to enter an assumed penalty and shows what that assumption means
                    financially. It does not pretend to measure your vehicle.
                </p>
            </GuideSection>

            <GuideSection
                id="speed"
                eyebrow="Speed Matters"
                title="Highway driving is where an aerodynamic penalty tends to matter most."
            >
                <p>
                    Aerodynamic drag increases rapidly as vehicle speed rises. That means
                    an aerodynamic accessory can have a relatively small effect during
                    low-speed urban driving but a much larger effect during sustained
                    highway travel.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Around town">
                        <p>
                            Lower speeds and frequent acceleration and braking make the rack&apos;s
                            aerodynamic contribution a smaller part of the overall energy
                            picture.
                        </p>
                    </InformationCard>

                    <InformationCard title="Highway">
                        <p>
                            Sustained higher speeds increase the importance of aerodynamic
                            drag, making roof-mounted accessories more relevant to fuel
                            consumption.
                        </p>
                    </InformationCard>

                    <InformationCard title="Very high speed">
                        <p>
                            Aerodynamic effects become increasingly important as speed rises,
                            so a rack or cargo box can matter much more on fast highway trips
                            than during short local drives.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    This is why your annual highway miles are more informative than your
                    total mileage when estimating the practical cost of leaving an
                    aerodynamic accessory installed.
                </p>
            </GuideSection>

            <GuideSection
                id="vehicle"
                eyebrow="Vehicle Design"
                title="The same rack can affect different vehicles very differently."
            >
                <p>
                    A roof rack does not exist in isolation. The body&apos;s shape, roofline,
                    windshield angle, height, width, existing roof rails, and other
                    aerodynamic features all influence the resulting airflow.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Tall vehicles">
                        <p>
                            SUVs, vans, and crossovers already disturb a large amount of air,
                            but their roof geometry can still make roof-mounted equipment
                            significant.
                        </p>
                    </InformationCard>

                    <InformationCard title="Low-profile vehicles">
                        <p>
                            Sedans and other streamlined vehicles can be particularly
                            sensitive to changes in roof airflow because the roofline is an
                            important part of the vehicle&apos;s aerodynamic shape.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The practical consequence is that a fuel-economy result from one
                    vehicle should not automatically be applied to another.
                </p>
            </GuideSection>

            <GuideSection
                id="crossbars-vs-cargo"
                eyebrow="Configuration Matters"
                title="Empty crossbars and loaded roof equipment are not equivalent."
            >
                <p>
                    The simplest roof configuration is a set of crossbars with nothing
                    mounted to them. Adding equipment increases the amount of air the
                    vehicle has to move around.
                </p>

                <div className="space-y-5">
                    <InformationCard title="Crossbars only">
                        <p>
                            Usually a relatively modest aerodynamic addition, but one that
                            remains exposed whenever the bars are installed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Bike or ski rack">
                        <p>
                            Adds additional surfaces and often extends into the airflow above
                            and around the vehicle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Roof box">
                        <p>
                            Creates substantially more exposed surface area and can therefore
                            produce a larger aerodynamic penalty than bare crossbars.
                        </p>
                    </InformationCard>

                    <InformationCard title="Large or irregular cargo">
                        <p>
                            Bulky objects can create particularly strong airflow disruption.
                            The exact effect depends heavily on how the cargo is positioned
                            and shaped.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="what-to-remove"
                eyebrow="What Should You Remove?"
                title="Permanent rails are different from removable crossbars and accessories."
            >
                <p>
                    Not every visible roof component should be treated as something the
                    owner can or should remove. Factory roof rails may be integrated into
                    the vehicle&apos;s design, while aftermarket crossbars and accessories are
                    often removable.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Usually removable">
                        <ul className="space-y-3">
                            <GuideBullet>Aftermarket crossbars</GuideBullet>
                            <GuideBullet>Roof boxes</GuideBullet>
                            <GuideBullet>Bike and ski carriers</GuideBullet>
                            <GuideBullet>Cargo baskets</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Usually part of the vehicle">
                        <ul className="space-y-3">
                            <GuideBullet>Integrated factory roof rails</GuideBullet>
                            <GuideBullet>Fixed body components</GuideBullet>
                            <GuideBullet>Vehicle-specific aerodynamic trim</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Only remove equipment the manufacturer or accessory instructions
                    indicate is intended to be removable. Never modify structural or
                    safety-related vehicle components simply to chase a small fuel
                    savings.
                </p>
            </GuideSection>

            <GuideSection
                id="economics"
                eyebrow="The Real Decision"
                title="The question is whether the fuel savings justify the inconvenience."
            >
                <p>
                    Suppose removing your rack improved fuel economy by a modest amount.
                    That does not automatically mean you should remove it every time.
                    There is a time and convenience cost to taking it down, storing it,
                    and reinstalling it.
                </p>

                <p>
                    Your useful comparison is therefore:
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Keep it installed">
                        <p>
                            Pay the estimated fuel penalty but keep the rack immediately
                            available.
                        </p>
                    </InformationCard>

                    <InformationCard title="Remove it when unused">
                        <p>
                            Save the estimated fuel cost on the miles where the rack would
                            otherwise create additional drag.
                        </p>
                    </InformationCard>

                    <InformationCard title="Remove it permanently">
                        <p>
                            Make sense only if you rarely use the rack and the estimated
                            savings are meaningful relative to the equipment&apos;s usefulness.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The calculator gives you the annual and multi-year fuel cost so you
                    can make that comparison using your own driving rather than someone
                    else&apos;s MPG test.
                </p>
            </GuideSection>

            <GuideSection
                id="evs"
                eyebrow="Electric Vehicles"
                title="The aerodynamic penalty still exists; the way you measure it changes."
            >
                <p>
                    An EV still has to overcome aerodynamic drag. Instead of measuring the
                    penalty in gallons of gasoline, you experience it through additional
                    electricity consumption and reduced driving range.
                </p>

                <p>
                    The same physical questions still apply: vehicle shape, speed, rack
                    configuration, and cargo all influence the amount of aerodynamic
                    resistance.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Same physics, different metric
                    </p>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div>
                            <p className="font-semibold">Gasoline vehicle</p>
                            <p className="mt-2 text-[var(--muted)]">
                                Extra aerodynamic drag → additional fuel consumption
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">EV</p>
                            <p className="mt-2 text-[var(--muted)]">
                                Extra aerodynamic drag → additional electricity consumption /
                                reduced range
                            </p>
                        </div>
                    </div>
                </div>
            </GuideSection>

            <GuideSection
                id="testing"
                eyebrow="Your Vehicle"
                title="A controlled comparison can tell you more than a generic MPG claim."
            >
                <p>
                    If you want to estimate the actual penalty for your own vehicle, you
                    can compare fuel economy with and without the rack under as similar
                    conditions as practical.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="For a useful comparison">
                        <ul className="space-y-3">
                            <GuideBullet>Use the same vehicle and tires</GuideBullet>
                            <GuideBullet>Use similar fuel levels</GuideBullet>
                            <GuideBullet>Compare similar speeds</GuideBullet>
                            <GuideBullet>Use similar weather where practical</GuideBullet>
                            <GuideBullet>Run the comparison over enough distance</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Avoid over-interpreting">
                        <ul className="space-y-3">
                            <GuideBullet>One short trip</GuideBullet>
                            <GuideBullet>Different wind conditions</GuideBullet>
                            <GuideBullet>Different traffic patterns</GuideBullet>
                            <GuideBullet>Different driving styles</GuideBullet>
                            <GuideBullet>Small differences within normal measurement noise</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    A controlled test is especially valuable when the cost difference is
                    small and you want to know whether removing the rack is worth the
                    inconvenience for your particular vehicle.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The right answer depends on how you use the rack."
            >
                <div className="space-y-6">
                    <InformationCard title="Crossbars installed year-round">
                        <p>
                            A driver uses the bars only for a few trips each year but leaves
                            them installed all the time. The financial case for occasional
                            removal is stronger when highway mileage is high and the rack is
                            easy to remove.
                        </p>
                    </InformationCard>

                    <InformationCard title="Weekly bike transportation">
                        <p>
                            The driver uses the rack every weekend. Removing and reinstalling
                            the bars every week may save some fuel but adds recurring
                            inconvenience. The practical value of keeping them available may
                            outweigh a relatively modest fuel cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="Long highway commute with empty bars">
                        <p>
                            The driver rarely uses the rack but spends many hours each week
                            on the highway. Even a modest aerodynamic penalty can accumulate
                            into a noticeable annual fuel cost.
                        </p>
                    </InformationCard>

                    <InformationCard title="Roof box used for one road trip">
                        <p>
                            The owner mounts a large cargo box for an annual vacation and
                            removes it afterward. Because the box creates much more airflow
                            disruption than bare crossbars, leaving it on year-round is a
                            different question from temporarily mounting it for one trip.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "If you rarely use removable roof equipment, estimate its annual fuel cost before deciding whether to leave it installed.",
                    "Focus on highway miles because aerodynamic effects generally matter more as speed increases.",
                    "Do not apply a fuel-economy percentage from one vehicle directly to another.",
                    "Distinguish bare crossbars from bike racks, cargo baskets, and roof boxes.",
                    "Use your actual fuel price and annual mileage when evaluating the economics.",
                    "Consider the convenience of removing, storing, and reinstalling the equipment.",
                    "Only remove components intended to be removable.",
                    "For an EV, think in terms of energy consumption and range rather than gallons of gasoline.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask About Your Roof Rack"
                subtitle="The useful decision depends on your actual driving pattern."
                questions={[
                    "How many miles do I drive each year with the rack installed?",
                    "What percentage of those miles are highway miles?",
                    "Is the rack empty most of the time?",
                    "How often do I actually use it?",
                    "Is it easy to remove and reinstall?",
                    "What does my vehicle-specific testing or published testing suggest about the penalty?",
                    "Would the estimated annual fuel savings justify the inconvenience?",
                    "Would I be better served by a hitch-mounted or other cargo solution for occasional use?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Roof racks can reduce fuel economy by increasing aerodynamic drag.",
                    "The penalty varies substantially with vehicle shape, rack design, speed, and cargo.",
                    "Highway driving generally makes aerodynamic accessories more important to fuel consumption.",
                    "Bare crossbars typically create a different aerodynamic effect from a roof box or loaded cargo carrier.",
                    "A published MPG penalty from one vehicle should not be treated as a universal percentage.",
                    "The practical decision is whether the annual fuel cost is large enough to justify removing the rack when it is not needed.",
                    "A controlled comparison on your own vehicle can provide more useful information than a generic internet claim.",
                    "The same aerodynamic effect applies to EVs, where the consequence appears as additional electricity use and reduced range rather than gasoline consumption.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "How Rooftop Carriers Affect Fuel Economy",
                        publisher: "Consumer Reports",
                        href: "https://www.consumerreports.org/fuel-economy-efficiency/how-rooftop-carriers-affect-fuel-economy/",
                    },
                    {
                        title: "Tested: Roof Rails Affect Gas Mileage",
                        publisher: "Car and Driver",
                        href: "https://www.caranddriver.com/news/a42596866/tested-roof-rails-affect-gas-mileage/",
                    },
                    {
                        title:
                            "Investigating the Fuel Consumption Impacts of Vehicle Roof Racks",
                        publisher: "Energy Policy / ScienceDirect",
                        href: "https://www.sciencedirect.com/science/article/pii/S0301421516300714",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="roof-rack-gas-mileage-cost" />
        </GuideLayout>
    );
}