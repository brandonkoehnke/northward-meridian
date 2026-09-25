import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import {
    GuideBullet,
    InformationCard,
} from "@/app/components/article/GuidePrimitives";
import IdleVsShutdownCalculator from "./IdleVsShutdownCalculator";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "idle-or-turn-car-off-fuel-efficiency",
    );

    if (!found) {
        throw new Error(
            "Guide not found: idle-or-turn-car-off-fuel-efficiency",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "idle-calculator",
        label: "Idle fuel calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "fuel-use",
        label: "How much fuel idling uses",
    },
    {
        id: "ten-seconds",
        label: "The 10-second rule",
    },
    {
        id: "restart",
        label: "What happens when you restart",
    },
    {
        id: "traffic-vs-parked",
        label: "Traffic vs. parked waiting",
    },
    {
        id: "start-stop",
        label: "Automatic start-stop",
    },
    {
        id: "wear",
        label: "Starter and battery wear",
    },
    {
        id: "warm-up",
        label: "Warming up the engine",
    },
    {
        id: "hvac",
        label: "Heat and air conditioning",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "myths",
        label: "Common myths",
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
        id: "waiting",
        title: "I'm parked and waiting for someone",
        summary:
            "Estimate what several minutes of stationary idling costs and when shutting down may make sense.",
        guidance:
            "If the vehicle is safely parked and does not need to remain running for HVAC, visibility, equipment, or another operational reason, unnecessary idling consumes fuel without moving you.",
        destinationId: "idle-calculator",
        destinationLabel: "Idle Fuel Calculator",
    },
    {
        id: "traffic-light",
        title: "I'm thinking about red lights and traffic",
        summary:
            "Separate ordinary traffic stops from voluntary parked idling.",
        guidance:
            "Do not treat every traffic light as a reason to manually cycle a conventional vehicle. Normal traffic operation and manufacturer-designed automatic start-stop systems are different from voluntarily idling while parked.",
        destinationId: "traffic-vs-parked",
        destinationLabel: "Traffic vs. Parked Waiting",
    },
    {
        id: "restart-wear",
        title: "I'm worried restarting will wear out my car",
        summary:
            "Look at the starter and battery question separately from the fuel calculation.",
        guidance:
            "Repeated starts do create component cycles, but the economics depend on the vehicle and stopping pattern. Factory start-stop vehicles are specifically engineered around frequent restarting.",
        destinationId: "wear",
        destinationLabel: "Starter and Battery Wear",
    },
    {
        id: "warm-up",
        title: "I idle to warm up the engine",
        summary:
            "Understand why normal driving generally warms a modern vehicle faster than extended stationary idling.",
        guidance:
            "Long warm-up idling is generally unnecessary for modern vehicles. Start the vehicle, allow enough time for safe operation and visibility, and follow the manufacturer's cold-weather guidance.",
        destinationId: "warm-up",
        destinationLabel: "Warming Up the Engine",
    },
    {
        id: "auto-start-stop",
        title: "My car has automatic start-stop",
        summary:
            "Understand why a factory system is not the same as manually switching a conventional vehicle off repeatedly.",
        guidance:
            "Automatic start-stop systems are designed to eliminate selected periods of idling while managing restart, battery, HVAC, and operating conditions through the vehicle's control system.",
        destinationId: "start-stop",
        destinationLabel: "Automatic Start-Stop",
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
        url: "https://northwardmeridian.com/about",
    },
    publisher: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: "https://northwardmeridian.com",
    },
};

export default function IdleOrTurnCarOffGuide() {
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
            <IdleVsShutdownCalculator />

            <WhyThisMatters id="short-answer">
                <p>
                    If a warmed-up gasoline vehicle is sitting still with its engine
                    running, it is consuming fuel while covering zero miles. Turning the
                    engine off stops that idle fuel consumption.
                </p>

                <p>
                    Restarting the engine also requires some fuel, so the interesting
                    question is how long the vehicle has to remain off before the avoided
                    idling exceeds the fuel associated with restarting.
                </p>

                <p>
                    Testing supported by the U.S. Department of Energy found that, under
                    the conditions evaluated, idling for more than roughly 10 seconds
                    used more fuel than shutting the engine off and restarting it.
                    However, that result should be treated as a fuel-use finding rather
                    than an instruction to manually shut off a conventional vehicle at
                    every traffic light.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="fuel-use"
                eyebrow="Fuel Has to Keep the Engine Running"
                title="An idling engine is still doing work."
            >
                <p>
                    Even though the vehicle is not moving, the engine must overcome its
                    own friction and pumping losses while powering accessories and other
                    systems. That requires fuel.
                </p>

                <p>
                    Argonne National Laboratory testing cited by DOE measured idle fuel
                    consumption of approximately 0.2 to 0.5 gallons per hour across the
                    passenger vehicles evaluated. The exact rate varies with vehicle
                    size, engine speed, accessory load, temperature, and other operating
                    conditions.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Lower idle consumption">
                        <ul className="space-y-3">
                            <GuideBullet>Smaller or more efficient engine</GuideBullet>
                            <GuideBullet>Moderate ambient temperature</GuideBullet>
                            <GuideBullet>Low accessory load</GuideBullet>
                            <GuideBullet>Engine already at normal operating temperature</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Higher idle consumption">
                        <ul className="space-y-3">
                            <GuideBullet>Larger engine</GuideBullet>
                            <GuideBullet>Higher idle speed</GuideBullet>
                            <GuideBullet>Heavy heating or air-conditioning demand</GuideBullet>
                            <GuideBullet>Other significant accessory loads</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    That variation is why the calculator above lets you change the idle
                    fuel rate rather than hard-coding one number for every vehicle.
                </p>
            </GuideSection>

            <GuideSection
                id="ten-seconds"
                eyebrow="The Often-Quoted Threshold"
                title="Where does the 10-second rule come from?"
            >
                <p>
                    Argonne researchers directly compared the fuel used while a
                    late-model passenger car idled with the fuel associated with stopping
                    and restarting the engine. Under the test conditions, the cumulative
                    fuel used by idling exceeded the restart penalty after roughly 10
                    seconds.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        What the result means
                    </p>

                    <p className="mt-4 leading-7">
                        A warm modern engine does not require minutes of extra idling to
                        compensate for the fuel used in a normal restart. For voluntary
                        parked waits, shutting down can begin saving fuel surprisingly
                        quickly.
                    </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        What the result does not mean
                    </p>

                    <p className="mt-4 leading-7">
                        Ten seconds is not a universal instruction to shut every vehicle
                        off whenever it stops moving. The study conditions do not represent
                        every engine, temperature, battery, traffic situation, HVAC demand,
                        or manufacturer recommendation.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="restart"
                eyebrow="Restart Fuel"
                title="Restarting does use fuel—but much less than many drivers assume."
            >
                <p>
                    A restart briefly requires additional fuel as the engine transitions
                    from stopped to running. The old idea that restarting consumes
                    several minutes worth of idling fuel does not describe the warm
                    modern passenger vehicle tested by Argonne.
                </p>

                <p>
                    The relevant comparison is cumulative. Idling uses a relatively
                    small amount of fuel continuously. Restarting creates a brief fuel
                    penalty. Once enough idle time accumulates, the continuous fuel use
                    overtakes that restart penalty.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="font-semibold">Think of it as two curves</p>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="font-semibold text-[var(--accent)]">Leave it idling</p>
                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                Fuel use continues accumulating for every second the engine
                                remains running.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-[var(--accent)]">Shut it down</p>
                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                Fuel flow stops during the wait, followed by a brief restart
                                penalty when the engine starts again.
                            </p>
                        </div>
                    </div>
                </div>
            </GuideSection>

            <GuideSection
                id="traffic-vs-parked"
                eyebrow="Context Matters"
                title="Waiting in a parking lot is not the same as stopping in traffic."
            >
                <p>
                    This distinction matters more than the exact break-even second.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Parked and waiting">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Waiting several minutes for a passenger
                            </GuideBullet>
                            <GuideBullet>
                                Sitting in a parking lot while using a phone
                            </GuideBullet>
                            <GuideBullet>
                                Waiting outside a store or appointment
                            </GuideBullet>
                            <GuideBullet>
                                Other voluntary stationary waits
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Normal traffic">
                        <ul className="space-y-3">
                            <GuideBullet>Red lights</GuideBullet>
                            <GuideBullet>Stop-and-go traffic</GuideBullet>
                            <GuideBullet>Stop signs</GuideBullet>
                            <GuideBullet>Situations requiring immediate vehicle readiness</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    DOE guidance specifically distinguishes unnecessary parked idling
                    from situations such as waiting in traffic, where keeping the vehicle
                    operating can be necessary for safe normal operation.
                </p>
            </GuideSection>

            <GuideSection
                id="start-stop"
                eyebrow="Factory Start-Stop"
                title="Automatic start-stop is designed around repeated engine shutdowns."
            >
                <p>
                    A factory automatic start-stop system monitors vehicle conditions and
                    shuts the engine off during selected stops, then restarts it when the
                    driver is ready to move.
                </p>

                <p>
                    That is not equivalent to a driver manually switching every
                    conventional vehicle off at every opportunity. A factory system can
                    consider battery state, engine temperature, HVAC demand, driver
                    inputs, and other operating conditions before allowing a shutdown.
                </p>

                <p>
                    Oak Ridge National Laboratory tested four vehicles with their
                    automatic start-stop systems enabled and disabled across several
                    driving cycles. The fuel-economy benefit varied substantially with
                    the amount of time each cycle spent idling, illustrating a simple
                    principle: start-stop saves the most fuel when it eliminates more
                    idling.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Important distinction
                    </p>

                    <p className="mt-4 leading-7">
                        If your vehicle has factory automatic start-stop, allowing the
                        vehicle to manage that feature according to the owner&apos;s manual is
                        different from inventing your own manual start-stop strategy.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="wear"
                eyebrow="Mechanical Wear"
                title="What about the starter and battery?"
            >
                <p>
                    Starting an engine creates a starter cycle, so concern about
                    component wear is reasonable. But fuel savings and component wear
                    should be treated as separate questions rather than assuming that
                    every restart causes significant damage.
                </p>

                <p>
                    DOE&apos;s Alternative Fuels Data Center summarizes research conducted for
                    Argonne that examined starter-motor and battery wear associated with
                    reducing idling. It concluded that drivers can generally save money
                    by shutting the engine off during short voluntary stops, while also
                    distinguishing those stops from normal traffic situations.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Conventional vehicle">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Follow the manufacturer&apos;s normal operating guidance
                            </GuideBullet>
                            <GuideBullet>
                                Do not manually cycle the engine at every traffic stop solely
                                because of a fuel rule of thumb
                            </GuideBullet>
                            <GuideBullet>
                                Battery and starter condition still matter
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Factory start-stop vehicle">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Designed specifically for repeated stop-start operation
                            </GuideBullet>
                            <GuideBullet>
                                Vehicle decides when operating conditions allow shutdown
                            </GuideBullet>
                            <GuideBullet>
                                May use components and control strategies selected for the
                                additional cycling
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="warm-up"
                eyebrow="Cold Starts"
                title="Extended stationary warm-up is generally not the efficient way to warm a modern car."
            >
                <p>
                    DOE guidance notes that modern vehicles generally do not need
                    extended idling to warm up before driving. Driving the vehicle
                    normally warms the engine and other components faster than leaving it
                    sitting stationary for an extended period.
                </p>

                <p>
                    That does not mean immediately demanding maximum power from a
                    stone-cold engine. It means that several minutes of routine
                    stationary warm-up generally should not be treated as a fuel-saving
                    necessity.
                </p>

                <p>
                    Cold weather can still create legitimate reasons to run the vehicle,
                    particularly when defrosting or defogging is necessary for safe
                    visibility. Follow the owner&apos;s manual and prioritize safe operation.
                </p>
            </GuideSection>

            <GuideSection
                id="hvac"
                eyebrow="Comfort Changes the Calculation"
                title="Sometimes the engine is idling because you need something from it."
            >
                <p>
                    A pure fuel comparison assumes the only purpose of running the engine
                    is keeping the engine running. Real vehicles may also be providing
                    cabin heat, air conditioning, window defrosting, electrical power, or
                    other functions.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Reasons shutdown may be practical">
                        <ul className="space-y-3">
                            <GuideBullet>Mild weather</GuideBullet>
                            <GuideBullet>Short parked wait</GuideBullet>
                            <GuideBullet>No need for significant accessory power</GuideBullet>
                            <GuideBullet>Safe location away from traffic</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Reasons the engine may need to remain on">
                        <ul className="space-y-3">
                            <GuideBullet>Defrosting for safe visibility</GuideBullet>
                            <GuideBullet>Extreme heat or cold</GuideBullet>
                            <GuideBullet>Necessary vehicle or auxiliary equipment</GuideBullet>
                            <GuideBullet>Traffic or another operational requirement</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    These are reasons the fuel-optimal answer may not be the
                    operationally appropriate answer.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same fuel science produces different practical answers."
            >
                <div className="space-y-6">
                    <InformationCard title="Waiting ten minutes for someone">
                        <p>
                            The vehicle is safely parked in mild weather and the driver does
                            not need HVAC or auxiliary equipment. Leaving the engine running
                            consumes fuel for the entire wait. Shutting down avoids most of
                            that idle consumption.
                        </p>
                    </InformationCard>

                    <InformationCard title="Thirty-second red light">
                        <p>
                            A conventional vehicle without factory automatic start-stop is
                            stopped as part of normal traffic. The driver should operate the
                            vehicle normally rather than treating the fuel break-even study
                            as an instruction to manually switch the ignition off at every
                            signal.
                        </p>
                    </InformationCard>

                    <InformationCard title="Vehicle with factory automatic start-stop">
                        <p>
                            The engine shuts down at a traffic light because the vehicle&apos;s
                            control system determines that operating conditions permit it.
                            This is exactly the kind of unnecessary idle period the
                            technology is intended to reduce.
                        </p>
                    </InformationCard>

                    <InformationCard title="Winter windshield defrosting">
                        <p>
                            The driver needs heat and defrosting to maintain safe visibility.
                            Fuel consumption is no longer the only relevant variable.
                            Necessary safe operation takes priority over minimizing every
                            second of idle time.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="myths"
                eyebrow="Common Myths"
                title="Several idling rules are based on older assumptions."
            >
                <div className="space-y-6">
                    <InformationCard title="Myth: Restarting uses several minutes of idling fuel">
                        <p>
                            DOE-supported testing of a warm modern passenger vehicle found a
                            much shorter fuel break-even point—roughly 10 seconds under the
                            conditions evaluated.
                        </p>
                    </InformationCard>

                    <InformationCard title="Myth: A modern car needs to idle for several minutes before driving">
                        <p>
                            Extended stationary warm-up is generally unnecessary. Normal
                            driving warms the vehicle more quickly, although cold-weather
                            visibility and manufacturer guidance still matter.
                        </p>
                    </InformationCard>

                    <InformationCard title="Myth: If shutting down saves fuel, I should turn the car off at every red light">
                        <p>
                            The fuel comparison does not override safe vehicle operation.
                            Normal traffic stops are different from voluntary parked idling,
                            and factory start-stop systems are specifically engineered to
                            manage repeated traffic-stop shutdowns.
                        </p>
                    </InformationCard>

                    <InformationCard title="Myth: Automatic start-stop cannot save meaningful fuel">
                        <p>
                            Its benefit depends heavily on the driving cycle. ORNL testing
                            found larger fuel-economy improvements in driving cycles with
                            greater amounts of idle time.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Do not manually shut the engine off while moving.",
                    "Do not treat normal traffic operation as the same thing as voluntary parked idling.",
                    "When safely parked for a meaningful wait, unnecessary idling consumes fuel without moving the vehicle.",
                    "Use the calculator to estimate how much your own idling habit costs.",
                    "Allow a factory automatic start-stop system to operate according to the owner's manual.",
                    "Follow manufacturer guidance for cold-weather operation and starting.",
                    "Keep the engine running when needed for safe visibility, traffic conditions, HVAC, or necessary equipment.",
                    "Treat fuel savings, starter wear, battery condition, comfort, and safety as separate considerations.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions That Change the Answer"
                subtitle="The fuel calculation is simple; the operating context is not."
                questions={[
                    "Am I safely parked, or am I stopped as part of normal traffic?",
                    "How long do I realistically expect to remain stopped?",
                    "Does the vehicle need to remain running for defrosting, HVAC, or equipment?",
                    "Does my vehicle have factory automatic start-stop?",
                    "What does the owner's manual say about start-stop and cold-weather operation?",
                    "Is the battery and starting system in normal condition?",
                    "What is a realistic idle fuel-consumption rate for my vehicle?",
                    "How frequently do I make this kind of stop?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "An idling internal-combustion engine consumes fuel while the vehicle covers zero miles.",
                    "DOE-supported testing found that idling beyond roughly 10 seconds used more fuel than stopping and restarting under the conditions evaluated.",
                    "The 10-second result is a fuel-use finding, not a universal instruction to manually shut off a conventional vehicle at every stop.",
                    "Passenger-vehicle idle consumption varies substantially with vehicle design, engine size, temperature, idle speed, and accessory load.",
                    "Voluntary parked idling should be distinguished from normal traffic operation.",
                    "Factory automatic start-stop systems are designed and controlled specifically for repeated shutdown and restart operation.",
                    "Modern vehicles generally do not require several minutes of stationary warm-up before normal driving.",
                    "Safety, visibility, HVAC needs, vehicle condition, and manufacturer guidance can matter more than minimizing a small amount of fuel.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title:
                            "FOTW #1239: Idling an Engine for as Little as 10 Seconds Will Use More Fuel than Stopping and Restarting the Vehicle",
                        publisher: "U.S. Department of Energy",
                        href: "https://www.energy.gov/cmei/vehicles/articles/fotw-1239-may-23-2022-idling-engine-little-10-seconds-will-use-more-fuel",
                    },
                    {
                        title: "Which Is Greener: Idle, or Stop and Restart?",
                        publisher:
                            "Argonne National Laboratory / U.S. Department of Energy",
                        href: "https://afdc.energy.gov/files/u/publication/which_is_greener.pdf",
                    },
                    {
                        title: "Idle Reduction Research and Development",
                        publisher:
                            "U.S. Department of Energy Alternative Fuels Data Center",
                        href: "https://afdc.energy.gov/conserve/idle-reduction-research",
                    },
                    {
                        title: "Idle Reduction",
                        publisher:
                            "U.S. Department of Energy Alternative Fuels Data Center",
                        href: "https://afdc.energy.gov/conserve/idle-reduction-basics",
                    },
                    {
                        title: "Auto Stop-Start Fuel Consumption Benefits",
                        publisher: "Oak Ridge National Laboratory",
                        href: "https://www.ornl.gov/publication/auto-stop-start-fuel-consumption-benefits",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="idle-or-turn-car-off-fuel-efficiency" />
        </GuideLayout>
    );
}