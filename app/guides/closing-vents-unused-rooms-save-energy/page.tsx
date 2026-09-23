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
import VentClosingRealityCheck from "@/app/components/article/VentClosingRealityCheck";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import type { Guide } from "@/lib/guide";

const canonicalUrl =
    "https://northwardmeridian.com/guides/closing-vents-unused-rooms-save-energy";

const guide: Guide = {
    title: "Does Closing Vents in Unused Rooms Actually Save Energy?",
    category: "Home",
    description:
        "Understand what happens when you close HVAC vents, why central forced-air systems do not simply use proportionally less energy, and what to do instead.",
    updated: "September 2026",
    readingTime: "9 min",
    recommendedFor:
        "Homeowners wondering whether closing supply vents in unused rooms can lower heating and cooling costs.",
    bottomLine:
        "For a central forced-air system, closing supply vents in unused rooms is not a reliable way to save energy. DOE guidance says this practice can reduce airflow through the air handler, create pressure imbalances, stress duct connections, and affect air quality when the air handler provides ventilation. Proper zoning uses system-level controls rather than simply closing room registers. Other HVAC systems, such as boilers and ductless heat pumps, work differently.",
    learningObjectives: [
        "Understand why closing a register does not simply make the HVAC system condition less space",
        "See how supply-air restrictions can change pressure and airflow",
        "Distinguish manual register closing from properly designed HVAC zoning",
        "Identify better approaches for unused rooms and uneven temperatures",
    ],
    tags: [
        "HVAC",
        "closing vents",
        "energy savings",
        "heating and cooling",
        "home energy",
    ],
};

const guideSections = [
    {
        id: "vent-closing-reality-check",
        label: "Vent closing reality check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "how-system-works",
        label: "How central HVAC works",
    },
    {
        id: "why-closing-changes-things",
        label: "Why closing vents changes the system",
    },
    {
        id: "pressure",
        label: "Pressure and airflow",
    },
    {
        id: "zoning",
        label: "Closing vents vs. zoning",
    },
    {
        id: "unused-rooms",
        label: "What to do with unused rooms",
    },
    {
        id: "uneven-temperatures",
        label: "When rooms are too hot or cold",
    },
    {
        id: "system-types",
        label: "Different HVAC systems",
    },
    {
        id: "winter",
        label: "Cold-weather considerations",
    },
    {
        id: "energy-efficiency",
        label: "Better energy-saving strategies",
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
        id: "save-money",
        title: "I want to save money",
        summary:
            "See whether shutting registers is likely to produce the savings you expect.",
        guidance:
            "For central forced-air systems, manually closing supply registers is not a reliable proportional energy-saving strategy because it changes system airflow and pressure.",
        destinationId: "short-answer",
        destinationLabel: "The Short Answer",
    },
    {
        id: "unused-room",
        title: "I have an unused room",
        summary:
            "Find out what matters before trying to stop conditioning the room.",
        guidance:
            "An unused room still affects the thermal behavior of the rest of the home. Avoid assuming that closing its register creates a separate HVAC zone.",
        destinationId: "unused-rooms",
        destinationLabel: "What to Do With Unused Rooms",
    },
    {
        id: "uneven",
        title: "One room is too hot or too cold",
        summary:
            "Determine whether register closing is treating the symptom rather than the cause.",
        guidance:
            "Uneven temperatures can come from duct design, leakage, insulation, return-air limitations, balancing, equipment sizing, or other factors.",
        destinationId: "uneven-temperatures",
        destinationLabel: "When Rooms Are Too Hot or Cold",
    },
    {
        id: "zoning",
        title: "I want true room-by-room control",
        summary:
            "Understand why proper HVAC zoning is different from closing vents.",
        guidance:
            "Designed zoning uses controls and dampers that account for airflow, pressure, equipment operation, and the intended zones.",
        destinationId: "zoning",
        destinationLabel: "Closing Vents vs. Zoning",
    },
    {
        id: "different-system",
        title: "I have a boiler or mini-split",
        summary:
            "Avoid applying central forced-air advice to a different heating system.",
        guidance:
            "Boilers, radiators, and ductless heat pumps use different distribution methods and controls.",
        destinationId: "system-types",
        destinationLabel: "Different HVAC Systems",
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

export default function ClosingVentsUnusedRoomsSaveEnergyGuide() {
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
            <VentClosingRealityCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    For a central forced-air furnace or ducted heat pump, closing a
                    supply vent in an unused room does not simply tell the system to
                    stop heating or cooling that room.
                </p>

                <p>
                    The HVAC system is still moving air through a connected duct network.
                    Restricting supply registers changes the amount and distribution of
                    air the system can move, which can change duct pressure and airflow.
                </p>

                <p>
                    The U.S. Department of Energy specifically says homeowners should
                    not shut vents and close doors in unused rooms as an energy-saving
                    strategy for forced-air systems. It notes that doing so can reduce
                    airflow through the air handler, create pressure imbalances, stress
                    duct connections, and affect air quality when the system is used for
                    ventilation.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="how-system-works"
                eyebrow="Start With the HVAC System"
                title="A central forced-air system is designed to move air through a connected network."
            >
                <p>
                    In a typical central forced-air system, a blower moves conditioned
                    air through supply ducts into rooms. Air then needs a path back to
                    the central equipment through return ducts or other designed return
                    paths.
                </p>

                <p>
                    That means the system is not simply a collection of independent
                    room-level heaters and coolers. Changing one part of the distribution
                    network can affect the rest of the system.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Supply">
                        <p>
                            Conditioned air is delivered from the central equipment into
                            rooms through registers or diffusers.
                        </p>
                    </InformationCard>

                    <InformationCard title="Room">
                        <p>
                            The conditioned space absorbs or releases heat while air
                            continues to circulate through the home.
                        </p>
                    </InformationCard>

                    <InformationCard title="Return">
                        <p>
                            Air needs a return path back to the central equipment so the
                            system can recirculate it.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    DOE building-science guidance also emphasizes the importance of
                    maintaining balanced return-air pathways in forced-air homes.
                </p>
            </GuideSection>

            <GuideSection
                id="why-closing-changes-things"
                eyebrow="The Intuition Is Misleading"
                title="Closing a vent reduces an opening; it does not automatically reduce the system's workload by the same amount."
            >
                <p>
                    It is reasonable to think that a room receiving less conditioned air
                    must require less energy. The problem is that the energy used by a
                    central HVAC system depends on the operation of the equipment and the
                    entire air-distribution system, not simply on how many registers are
                    open.
                </p>

                <p>
                    If several supply registers are closed, the blower still has to move
                    air through the remaining portions of the system. The resulting
                    pressure and airflow can change instead of producing a clean,
                    proportional reduction in heating or cooling demand.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        The incorrect mental model
                    </p>

                    <div className="mt-5 grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Close a room</p>
                        </div>

                        <div className="flex items-center justify-center text-2xl text-[var(--accent)]">
                            →
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">
                                HVAC does less work
                            </p>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] p-5 text-center">
                            <p className="font-semibold">Save proportionally</p>
                        </div>
                    </div>

                    <p className="mt-6 leading-7 text-[var(--muted)]">
                        A central forced-air system is more complicated than this.
                        Restricting supply airflow can alter system pressure and balance
                        instead of simply shrinking the conditioned area.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="pressure"
                eyebrow="What Changes Inside the Ductwork"
                title="Closing multiple registers can increase resistance and change pressure."
            >
                <p>
                    A blower creates airflow by establishing a pressure difference across
                    the air-distribution system. The ducts, filters, coils, dampers,
                    registers, and return paths all contribute to the system&apos;s total
                    resistance.
                </p>

                <p>
                    When a homeowner closes several supply registers, the available
                    airflow paths change. The blower therefore operates against a
                    different system condition than it did before.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Possible consequences">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Reduced airflow through the air handler
                            </GuideBullet>
                            <GuideBullet>
                                Higher or differently distributed duct pressure
                            </GuideBullet>
                            <GuideBullet>Stress on duct connections</GuideBullet>
                            <GuideBullet>
                                Changes in room-to-room pressure
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Why this matters">
                        <ul className="space-y-3">
                            <GuideBullet>
                                The HVAC system may become less balanced
                            </GuideBullet>
                            <GuideBullet>
                                Airflow problems can affect comfort
                            </GuideBullet>
                            <GuideBullet>
                                Return-air limitations can become more important
                            </GuideBullet>
                            <GuideBullet>
                                The expected energy savings may not materialize
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    DOE specifically identifies reduced air-handler airflow and pressure
                    imbalance among the reasons it does not recommend this practice for
                    forced-air homes.
                </p>
            </GuideSection>

            <GuideSection
                id="zoning"
                eyebrow="A Different Concept"
                title="Proper HVAC zoning is more than closing registers."
            >
                <p>
                    True zoning is designed around the HVAC equipment and air-distribution
                    system. In a central forced-air system, zoning can use dampers and
                    controls in the ductwork to direct conditioned air to different
                    zones.
                </p>

                <p>
                    That does not mean every zoned system operates at maximum efficiency
                    under every condition. The important distinction is that the system
                    is intentionally designed and balanced for the zones rather than
                    relying on occupants to close arbitrary registers.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Closing a register">
                        <ul className="space-y-3">
                            <GuideBullet>Manual</GuideBullet>
                            <GuideBullet>
                                Changes only one airflow opening
                            </GuideBullet>
                            <GuideBullet>
                                Does not automatically change equipment control
                            </GuideBullet>
                            <GuideBullet>
                                May alter pressure and balance
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Designed zoning">
                        <ul className="space-y-3">
                            <GuideBullet>System-level control</GuideBullet>
                            <GuideBullet>
                                Designed around ductwork and equipment
                            </GuideBullet>
                            <GuideBullet>
                                Uses controlled dampers or separate equipment
                            </GuideBullet>
                            <GuideBullet>
                                Intended for deliberate zone operation
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    DOE notes that central forced-air zoning can use damper controls
                    installed in ducts and that larger homes can sometimes be more
                    effectively zoned with separate systems.
                </p>
            </GuideSection>

            <GuideSection
                id="unused-rooms"
                eyebrow="Unused Rooms"
                title="An unused room is not necessarily a room you should stop conditioning completely."
            >
                <p>
                    Even when a room is seldom occupied, it remains part of the building
                    envelope. Heat moves between that room and adjacent spaces, and
                    extremely large temperature differences can affect the condition of
                    the surrounding building materials.
                </p>

                <p>
                    DOE guidance specifically warns against completely shutting off heat
                    in an unused portion of a home during winter because cold interior
                    surfaces can contribute to condensation and mold. It recommends
                    keeping rooms at a minimum temperature of 50°F in winter to help
                    prevent water pipes from freezing.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Better approach">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Reduce the thermostat setting appropriately
                            </GuideBullet>
                            <GuideBullet>
                                Keep unused rooms within safe temperature limits
                            </GuideBullet>
                            <GuideBullet>
                                Keep doors and building-envelope conditions in mind
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Avoid assuming">
                        <ul className="space-y-3">
                            <GuideBullet>
                                A closed register creates a separate HVAC zone
                            </GuideBullet>
                            <GuideBullet>
                                A completely unheated room is always harmless
                            </GuideBullet>
                            <GuideBullet>
                                Fewer open registers automatically mean proportionally less
                                energy
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="uneven-temperatures"
                eyebrow="When Comfort Is the Real Problem"
                title="A hot or cold room may be telling you something about the system."
            >
                <p>
                    If one room is consistently too hot or too cold, closing registers is
                    tempting because it immediately changes the amount of supply air. But
                    it may only mask the reason the room behaves differently.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Possible causes">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Duct leakage or poor duct connections
                            </GuideBullet>
                            <GuideBullet>
                                Inadequate insulation or air sealing
                            </GuideBullet>
                            <GuideBullet>Return-air limitations</GuideBullet>
                            <GuideBullet>
                                Poor duct sizing or distribution
                            </GuideBullet>
                            <GuideBullet>
                                Equipment sizing or balancing issues
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="A better diagnostic question">
                        <p>
                            Instead of asking only, &quot;How do I get less air into this
                            room?&quot; ask, &quot;Why does this room require a different
                            amount of heating or cooling than the system is delivering?&quot;
                        </p>
                    </InformationCard>
                </div>

                <p>
                    ENERGY STAR notes that poorly performing ducts can contribute to
                    rooms that are difficult to heat or cool and higher energy use.
                </p>
            </GuideSection>

            <GuideSection
                id="system-types"
                eyebrow="Not Every HVAC System Uses Vents"
                title="The answer changes when you change the heating and cooling system."
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Central forced air">
                        <p>
                            Supply registers and return paths are part of a connected air
                            distribution system. Closing multiple registers can affect
                            airflow and pressure.
                        </p>
                    </InformationCard>

                    <InformationCard title="Ductless / mini-split">
                        <p>
                            Individual indoor units provide zone-level control without the
                            same central supply-register network. Use the system&apos;s own
                            room or zone controls.
                        </p>
                    </InformationCard>

                    <InformationCard title="Boiler / radiators">
                        <p>
                            Heat is distributed through water and radiators or baseboards
                            rather than central air registers. Room control depends on
                            valves, thermostats, and zoning design.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The DOE guidance specifically identifies ductless heat pumps as a
                    zoning option and notes that hydronic systems can use piping and
                    valves for zones.
                </p>
            </GuideSection>

            <GuideSection
                id="winter"
                eyebrow="Winter Considerations"
                title="An unused room can still affect the rest of the house."
            >
                <p>
                    Closing a register and closing a room off completely are not the same
                    thing, but both can become problematic when they create large
                    temperature and pressure differences.
                </p>

                <p>
                    In cold weather, an unused part of the home should not simply be
                    allowed to become extremely cold without considering moisture,
                    insulation, plumbing, and building-envelope conditions.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="font-semibold">DOE&apos;s winter warning</p>

                    <p className="mt-3 leading-7 text-[var(--muted)]">
                        DOE guidance says not to shut off heat entirely in an unused part of
                        the home during winter because condensation can form on cold
                        interior wall surfaces. It recommends keeping rooms at a minimum of
                        50°F in winter to help prevent pipes from freezing.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="energy-efficiency"
                eyebrow="Better Energy Strategies"
                title="Target the source of energy loss rather than restricting the distribution system."
            >
                <p>
                    If the goal is lower heating and cooling costs, there are generally
                    more direct ways to attack energy use than closing supply registers.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Start with the building">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Air-seal obvious leakage paths
                            </GuideBullet>
                            <GuideBullet>
                                Improve insulation where appropriate
                            </GuideBullet>
                            <GuideBullet>
                                Inspect ductwork for accessible leaks and poor connections
                            </GuideBullet>
                            <GuideBullet>
                                Address rooms with persistent comfort problems
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Use the controls">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Use appropriate thermostat setbacks
                            </GuideBullet>
                            <GuideBullet>
                                Use equipment-specific zoning when available
                            </GuideBullet>
                            <GuideBullet>
                                Avoid unnecessary heating or cooling of unoccupied spaces
                            </GuideBullet>
                            <GuideBullet>
                                Maintain equipment and filters according to manufacturer
                                guidance
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    ENERGY STAR identifies duct leakage as a significant source of
                    energy loss in typical forced-air homes and recommends sealing and
                    insulating accessible ducts where appropriate.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The right solution depends on what you are trying to accomplish."
            >
                <div className="space-y-6">
                    <InformationCard title="Guest bedroom used twice a year">
                        <p>
                            The homeowner closes the bedroom register and expects the furnace
                            to consume substantially less energy. For a central forced-air
                            system, that is not a reliable assumption. A reasonable
                            temperature setback may make more sense than manually restricting
                            the distribution system.
                        </p>
                    </InformationCard>

                    <InformationCard title="One bedroom is always too warm">
                        <p>
                            Closing the register reduces airflow but does not explain why the
                            room receives more heat than needed. Duct balancing, return-air
                            paths, insulation, leakage, or equipment design may deserve
                            investigation.
                        </p>
                    </InformationCard>

                    <InformationCard title="Basement is barely used in winter">
                        <p>
                            Completely eliminating heat without considering plumbing,
                            condensation, and building-envelope conditions can create other
                            problems. DOE recommends keeping unused areas above a minimum
                            temperature in winter.
                        </p>
                    </InformationCard>

                    <InformationCard title="Home has ductless mini-splits">
                        <p>
                            The central-register strategy does not apply in the same way.
                            Individual indoor units already provide a form of room-level
                            control, so use the equipment&apos;s intended settings.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Do not assume that closing a supply register creates a proportional energy saving.",
                    "For central forced-air systems, recognize that closing multiple registers can change airflow and pressure.",
                    "Do not use manual register closing as a substitute for properly designed HVAC zoning.",
                    "If one room is too hot or cold, investigate the distribution system rather than only restricting airflow.",
                    "Consider return-air pathways, duct leakage, insulation, equipment sizing, and balancing when diagnosing comfort problems.",
                    "Do not completely shut off heat to an unused winter room without considering condensation and frozen-pipe risks.",
                    "Use the controls and zoning strategy designed for your specific HVAC system.",
                    "Target air leakage, insulation, duct losses, equipment maintenance, and thermostat strategy for broader energy savings.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask About Your HVAC System"
                subtitle="Start by identifying the system before changing how it distributes air."
                questions={[
                    "Do I have a central forced-air furnace, ducted heat pump, mini-split, boiler, or another system?",
                    "Am I trying to save energy, solve a comfort problem, or create a true HVAC zone?",
                    "How many supply registers am I considering closing?",
                    "Does the system already have designed zoning or variable airflow controls?",
                    "Does the affected room have a suitable return-air path?",
                    "Could duct leakage, insulation, or air sealing explain the temperature difference?",
                    "Could closing registers be increasing pressure or reducing airflow through the air handler?",
                    "What temperature should an unused room maintain during winter?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Closing supply vents in unused rooms is not a reliable proportional energy-saving strategy for central forced-air systems.",
                    "DOE guidance says closing vents can reduce airflow through the air handler, create pressure imbalances, stress duct connections, and affect air quality when the system provides ventilation.",
                    "Manual register closing is different from a properly designed HVAC zoning system.",
                    "Uneven room temperatures can point to duct, return-air, insulation, air-sealing, balancing, or equipment issues.",
                    "Unused rooms still interact thermally with the rest of the building.",
                    "DOE warns against completely shutting off heat in unused winter areas because condensation and frozen-pipe problems can result.",
                    "Boilers, radiators, and ductless heat pumps require different approaches because they distribute heat differently.",
                    "For broad energy savings, improving the building envelope, duct performance, equipment maintenance, and control strategy is generally more direct than closing registers.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title:
                            "Energy Renovations HVAC Guide — Zoning",
                        publisher:
                            "U.S. Department of Energy, Building America",
                        href: "https://www.energy.gov/cmei/buildings/articles/building-america-best-practices-series-vol-14-energy-renovations-hvac-guide",
                    },
                    {
                        title:
                            "Can You Save Money by Closing HVAC Vents in Unused Rooms?",
                        publisher:
                            "U.S. Department of Energy, Building Science Education",
                        href: "https://bsesc.energy.gov/sources/can-you-save-money-closing-hvac-vents-unused-rooms",
                    },
                    {
                        title:
                            "HVAC Ducted Returns",
                        publisher:
                            "U.S. Department of Energy, Building Science Education",
                        href: "https://bsesc.energy.gov/energy-basics/hvac-ducted-returns",
                    },
                    {
                        title:
                            "Duct Sealing",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/saveathome/heating-cooling/duct-sealing",
                    },
                    {
                        title:
                            "Improving the Efficiency of Your Duct System",
                        publisher:
                            "U.S. Department of Energy",
                        href: "https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/27630.pdf",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="closing-vents-unused-rooms-save-energy" />
        </GuideLayout>
    );
}