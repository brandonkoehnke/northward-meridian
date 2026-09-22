import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import EngineBrakingCheck from "@/app/components/article/EngineBrakingCheck";
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
import type { Guide } from "@/lib/guide";

const canonicalUrl =
    "https://northwardmeridian.com/guides/engine-braking-automatic-transmission";

const guide: Guide = {
    title: "Is Engine Braking Bad for an Automatic Transmission?",
    category: "Automotive",
    description:
        "Understand how engine braking works in an automatic transmission, when manufacturers expect you to use it, and which situations can create real transmission or traction concerns.",
    updated: "September 2026",
    readingTime: "9 min",
    recommendedFor:
        "Drivers wondering whether using a lower gear or transmission range for engine braking can damage an automatic transmission.",
    bottomLine:
        "Engine braking is a normal operating function of many automatic transmissions, and manufacturers explicitly describe using lower ranges or manual modes for downhill speed control. The important questions are whether the selected range is appropriate for the vehicle, whether engine speed remains within the manufacturer's limits, and whether road conditions make additional engine braking unsafe. Engine braking should complement the friction brakes rather than replace them.",
    learningObjectives: [
        "Understand what engine braking actually does",
        "See why using a lower range can be normal transmission operation",
        "Recognize situations where engine braking is especially useful",
        "Identify when RPM, traction, or unusual transmission behavior is a bigger concern",
    ],
    tags: [
        "engine braking",
        "automatic transmission",
        "downshifting",
        "transmission wear",
        "driving",
    ],
};

const guideSections = [
    {
        id: "engine-braking-check",
        label: "Engine braking check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-it-does",
        label: "What engine braking does",
    },
    {
        id: "automatic-transmission",
        label: "How an automatic creates it",
    },
    {
        id: "manufacturer-guidance",
        label: "What manufacturers expect",
    },
    {
        id: "friction-brakes",
        label: "Engine vs. friction brakes",
    },
    {
        id: "actual-stress",
        label: "What creates real transmission stress",
    },
    {
        id: "rpm",
        label: "RPM and improper downshifts",
    },
    {
        id: "towing",
        label: "Towing and long descents",
    },
    {
        id: "slippery",
        label: "Slippery roads",
    },
    {
        id: "transmission-types",
        label: "Automatic vs. CVT vs. manual",
    },
    {
        id: "manual-downshift",
        label: "Should you manually downshift?",
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
        id: "steep-hill",
        title: "I'm going down a steep hill",
        summary:
            "Understand when engine braking can reduce the need for continuous friction-brake use.",
        guidance:
            "Long descents are one of the clearest situations where manufacturers describe using lower ranges or other transmission controls to manage speed.",
        destinationId: "manufacturer-guidance",
        destinationLabel: "What Manufacturers Expect",
    },
    {
        id: "towing",
        title: "I'm towing",
        summary:
            "Use the transmission's towing and downhill controls appropriately.",
        guidance:
            "Additional vehicle mass increases the importance of managing speed on long grades. Use the towing procedure, range, or mode specified by the vehicle manufacturer.",
        destinationId: "towing",
        destinationLabel: "Towing and Long Descents",
    },
    {
        id: "wear",
        title: "I'm worried about transmission wear",
        summary:
            "Separate normal engine braking from conditions that actually deserve mechanical concern.",
        guidance:
            "Engine braking itself is a normal operating function. Excessive engine speed, abnormal shifting, warning lights, overheating, or unusual behavior are more meaningful reasons to investigate.",
        destinationId: "actual-stress",
        destinationLabel: "What Creates Real Transmission Stress",
    },
    {
        id: "slippery",
        title: "I'm driving on snow or ice",
        summary:
            "Understand why extra engine braking can affect traction.",
        guidance:
            "On low-traction surfaces, abrupt drivetrain torque changes can contribute to wheel slip. Follow the vehicle's slippery-road guidance rather than maximizing engine braking.",
        destinationId: "slippery",
        destinationLabel: "Slippery Roads",
    },
    {
        id: "everyday",
        title: "I'm just curious about normal driving",
        summary:
            "See when engine braking is useful and when ordinary automatic operation is enough.",
        guidance:
            "For everyday deceleration, the transmission and friction brakes can generally handle normal operation without deliberate manual downshifting at every stop.",
        destinationId: "short-answer",
        destinationLabel: "The Short Answer",
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

export default function EngineBrakingAutomaticTransmissionGuide() {
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
            <EngineBrakingCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    Engine braking is not inherently bad for an automatic transmission.
                    In fact, vehicle manufacturers explicitly provide lower ranges,
                    manual modes, or other transmission controls for engine-braking and
                    downhill speed control.
                </p>

                <p>
                    The key is using the transmission in a way the vehicle was designed
                    to handle. Selecting an appropriate lower range can help control speed
                    on a long descent and reduce continuous reliance on the friction
                    brakes.
                </p>

                <p>
                    The situations that deserve more attention are different: excessive
                    engine speed, an inappropriate gear or range, unusual transmission
                    behavior, overheating, warning lights, or low-traction conditions
                    where additional drivetrain braking could affect grip.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-it-does"
                eyebrow="The Basic Physics"
                title="Engine braking turns the drivetrain into a source of resistance."
            >
                <p>
                    When you lift off the accelerator while the vehicle remains engaged
                    with the drivetrain, the engine is no longer producing the same
                    positive driving torque. Instead, the spinning engine and drivetrain
                    create resistance against the vehicle&apos;s motion.
                </p>

                <p>
                    That resistance is what drivers experience as engine braking. It can
                    slow the vehicle without requiring the brake pads and rotors to
                    provide all of the deceleration.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Accelerating">
                        <p>
                            Engine torque drives the wheels and increases vehicle speed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Coasting in gear">
                        <p>
                            The wheels keep turning the drivetrain while the engine creates
                            resistance.
                        </p>
                    </InformationCard>

                    <InformationCard title="Friction braking">
                        <p>
                            Brake pads and rotors convert vehicle kinetic energy into heat.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Engine braking and friction braking therefore do different jobs. On a
                    long descent, using both appropriately can help control speed without
                    placing all of the thermal load on the friction brakes.
                </p>
            </GuideSection>

            <GuideSection
                id="automatic-transmission"
                eyebrow="The Transmission Is Part of the System"
                title="An automatic transmission is designed to manage different operating ranges."
            >
                <p>
                    Automatic transmissions change gear ratios to keep the engine and
                    vehicle operating in an appropriate range. When a driver selects a
                    lower range or manual mode, the transmission can intentionally hold a
                    lower ratio instead of immediately shifting into a taller gear.
                </p>

                <p>
                    That changes the relationship between vehicle speed and engine speed,
                    which increases the amount of engine braking available.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Why lower gears increase engine braking
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <div>
                            <p className="font-semibold">Higher gear</p>
                            <p className="mt-2 leading-7 text-[var(--muted)]">
                                Lower engine speed relative to vehicle speed and generally less
                                engine-braking effect.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">Lower gear</p>
                            <p className="mt-2 leading-7 text-[var(--muted)]">
                                Higher engine speed relative to vehicle speed and generally
                                stronger engine braking.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">Too low / inappropriate</p>
                            <p className="mt-2 leading-7 text-[var(--muted)]">
                                Engine speed can become unnecessarily high, which is why the
                                vehicle&apos;s specified range matters.
                            </p>
                        </div>
                    </div>
                </div>
            </GuideSection>

            <GuideSection
                id="manufacturer-guidance"
                eyebrow="What the Manuals Say"
                title="Manufacturers explicitly describe engine braking as a normal tool."
            >
                <p>
                    Toyota owner documentation describes lower ranges and manual-shift
                    operation for controlling engine braking, including during downhill
                    driving. Subaru documentation similarly describes using engine
                    braking on steep hills and notes the loss of engine braking when the
                    transmission is placed in neutral.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Toyota">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Lower ranges can provide additional engine braking
                            </GuideBullet>
                            <GuideBullet>
                                Manual shifting can be used to control engine braking
                            </GuideBullet>
                            <GuideBullet>
                                Downhill speed control is a documented use case
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Subaru">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Engine braking is described for steep downhill driving
                            </GuideBullet>
                            <GuideBullet>
                                Neutral eliminates the normal engine-braking effect
                            </GuideBullet>
                            <GuideBullet>
                                Appropriate transmission operation remains vehicle-specific
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The practical lesson is not that every driver should force a lower
                    gear. It is that using a manufacturer-provided lower range or manual
                    mode for the intended purpose is not inherently abusive to the
                    transmission.
                </p>
            </GuideSection>

            <GuideSection
                id="friction-brakes"
                eyebrow="Two Different Tools"
                title="Engine braking supplements the friction brakes; it does not replace them."
            >
                <p>
                    Friction brakes are designed to convert kinetic energy into heat.
                    They are the primary tool when you need a predictable reduction in
                    speed or a complete stop.
                </p>

                <p>
                    Engine braking instead uses the powertrain to resist vehicle motion.
                    On a long descent, this can reduce how continuously the friction
                    brakes need to operate.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Engine braking is useful for">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Long or sustained downhill grades
                            </GuideBullet>
                            <GuideBullet>
                                Maintaining a controlled descent speed
                            </GuideBullet>
                            <GuideBullet>
                                Reducing continuous friction-brake use
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Use friction brakes for">
                        <ul className="space-y-3">
                            <GuideBullet>Normal stops</GuideBullet>
                            <GuideBullet>Emergency braking</GuideBullet>
                            <GuideBullet>
                                Any situation requiring the braking force needed to stop safely
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="actual-stress"
                eyebrow="What Actually Deserves Attention"
                title="Unusual transmission behavior matters more than engine braking itself."
            >
                <p>
                    The presence of engine braking is not a diagnosis of transmission
                    damage. Mechanical concern becomes more relevant when engine braking
                    is accompanied by abnormal behavior or an operating condition outside
                    the manufacturer&apos;s intended range.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Persistent abnormal shifting, slipping, banging, or vibration.
                    </GuideBullet>
                    <GuideBullet>
                        A transmission or powertrain warning light.
                    </GuideBullet>
                    <GuideBullet>
                        Unusually high engine speed relative to the vehicle&apos;s specified
                        operating limits.
                    </GuideBullet>
                    <GuideBullet>
                        Evidence of transmission overheating.
                    </GuideBullet>
                    <GuideBullet>
                        Use of a range or gear that the owner&apos;s manual does not permit at
                        the current speed.
                    </GuideBullet>
                </ul>

                <p>
                    If those conditions exist, the useful next step is vehicle-specific
                    diagnosis rather than guessing whether engine braking itself is the
                    cause.
                </p>
            </GuideSection>

            <GuideSection
                id="rpm"
                eyebrow="RPM Matters"
                title="The concern is not “lower gear” by itself; it is what the engine speed becomes."
            >
                <p>
                    Selecting a lower transmission range can raise engine speed because
                    the engine and wheels are more closely coupled. That is expected
                    within the vehicle&apos;s normal operating range.
                </p>

                <p>
                    The problem is selecting a range that causes engine speed to exceed
                    the limits or procedures specified by the manufacturer.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Better question
                    </p>

                    <p className="mt-4 text-xl font-semibold leading-8">
                        “Is the selected range appropriate for this vehicle, speed, and
                        road condition?”
                    </p>

                    <p className="mt-4 leading-7 text-[var(--muted)]">
                        That is much more useful than applying a generic RPM rule from
                        another vehicle.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="towing"
                eyebrow="Heavy Loads"
                title="Towing makes controlled downhill speed management more important."
            >
                <p>
                    A heavier vehicle combination has more kinetic and potential energy to
                    manage on a descent. Manufacturers therefore commonly provide towing,
                    downhill, or lower-range procedures to help maintain control.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Before the descent">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Select the manufacturer-recommended towing or lower-range mode
                            </GuideBullet>
                            <GuideBullet>Reduce speed before the grade gets steep</GuideBullet>
                            <GuideBullet>
                                Know the vehicle&apos;s towing and transmission limits
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="During the descent">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Use engine braking to help manage speed
                            </GuideBullet>
                            <GuideBullet>
                                Use the friction brakes when additional deceleration is needed
                            </GuideBullet>
                            <GuideBullet>
                                Avoid an unnecessarily high engine speed
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="slippery"
                eyebrow="Traction Changes the Answer"
                title="Engine braking deserves extra caution on snow, ice, and other slippery surfaces."
            >
                <p>
                    Engine braking transfers torque through the drivetrain just as
                    acceleration does, although in the opposite direction. On a surface
                    with limited traction, a sudden drivetrain torque change can
                    contribute to wheel slip.
                </p>

                <p>
                    This is why manufacturer guidance can caution against deliberately
                    maximizing engine braking on slippery roads. Maintaining predictable
                    traction is more important than extracting every possible amount of
                    drivetrain deceleration.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="font-semibold">
                        On low-traction surfaces
                    </p>

                    <p className="mt-3 leading-7 text-[var(--muted)]">
                        Follow the vehicle&apos;s winter-driving and transmission guidance, make
                        smooth inputs, and do not use aggressive downshifts simply to avoid
                        using the friction brakes.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="transmission-types"
                eyebrow="Not All Transmissions Behave Identically"
                title="Automatic, CVT, and manual transmissions create engine braking differently."
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Automatic">
                        <p>
                            Hydraulic and electronically controlled gear changes can select
                            or hold lower ratios to increase engine braking.
                        </p>
                    </InformationCard>

                    <InformationCard title="CVT">
                        <p>
                            A continuously variable transmission does not use conventional
                            fixed gears in the same way. Its control system determines the
                            effective ratio and engine speed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Manual">
                        <p>
                            The driver selects the gear directly. Downshifting can create
                            strong engine braking, making smooth and appropriate gear
                            selection particularly important.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Because the mechanisms differ, advice about a specific transmission
                    type should not automatically be transferred to another vehicle.
                </p>
            </GuideSection>

            <GuideSection
                id="manual-downshift"
                eyebrow="Everyday Driving"
                title="You do not need to manually downshift every time you brake."
            >
                <p>
                    For ordinary city driving, normal automatic transmission operation
                    and the friction brakes are generally sufficient. Manual downshifting
                    becomes more useful when there is a specific reason to manage a
                    sustained descent, towing load, or transmission range.
                </p>

                <p>
                    Manually forcing frequent downshifts solely because you believe engine
                    braking is inherently healthier or more fuel-efficient can create
                    unnecessary complexity without a corresponding benefit.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Good reasons to select a lower range">
                        <ul className="space-y-3">
                            <GuideBullet>Long downhill grade</GuideBullet>
                            <GuideBullet>Towing or heavy load</GuideBullet>
                            <GuideBullet>Manufacturer-recommended downhill procedure</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Poor reason">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Fear that ordinary automatic braking is “hurting” the
                                transmission
                            </GuideBullet>
                            <GuideBullet>
                                Applying a generic gear rule without checking the vehicle
                            </GuideBullet>
                            <GuideBullet>
                                Trying to eliminate every use of the friction brakes
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same transmission behavior can be sensible in one situation and unhelpful in another."
            >
                <div className="space-y-6">
                    <InformationCard title="Long mountain descent">
                        <p>
                            The driver faces several miles of downhill road. Selecting an
                            appropriate lower range can increase engine braking and reduce
                            continuous brake use. The exact range should follow the vehicle&apos;s
                            instructions.
                        </p>
                    </InformationCard>

                    <InformationCard title="Towing a trailer downhill">
                        <p>
                            The added mass makes speed management more important. The driver
                            uses the manufacturer&apos;s towing or downhill mode, monitors speed,
                            and supplements engine braking with the friction brakes as needed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Normal stop at a traffic light">
                        <p>
                            There is no sustained descent or unusual load. Normal automatic
                            transmission operation and the friction brakes are sufficient; a
                            deliberate manual downshift is generally unnecessary.
                        </p>
                    </InformationCard>

                    <InformationCard title="Snow-covered downhill road">
                        <p>
                            Strong engine braking could alter traction at the driven wheels.
                            Smooth operation and the vehicle&apos;s slippery-road guidance take
                            priority over maximizing drivetrain braking.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Treat engine braking as a normal vehicle function, not automatically as transmission abuse.",
                    "Use lower ranges, manual modes, or towing modes when your vehicle's manufacturer provides them for downhill control.",
                    "Keep engine speed within the vehicle's specified limits.",
                    "Use engine braking to supplement, not replace, the friction brakes.",
                    "Be especially cautious about abrupt engine braking on slippery surfaces.",
                    "Do not apply gear-selection rules from another vehicle to yours.",
                    "Treat warning lights, abnormal shifting, vibration, slipping, or overheating as reasons for vehicle-specific diagnosis.",
                    "When in doubt, follow the owner's manual for your exact transmission and model.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask About Your Vehicle"
                subtitle="The owner's manual is more useful than a generic transmission rule."
                questions={[
                    "Does the manufacturer describe a lower range or manual mode for downhill driving?",
                    "What transmission range or tow mode should be used on a long descent?",
                    "What engine-speed limits apply to manual or lower-range operation?",
                    "Does the manufacturer provide specific slippery-road guidance?",
                    "Does the vehicle automatically hold a lower gear on descents?",
                    "Does towing change the recommended transmission procedure?",
                    "Are there any warning lights or unusual shifting behaviors that need diagnosis?",
                    "Am I using engine braking to supplement the brakes rather than trying to avoid the brakes entirely?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Engine braking is a normal operating function of many automatic transmissions.",
                    "Manufacturers explicitly describe lower ranges and other transmission controls for downhill speed management.",
                    "The goal on long descents is often to supplement the friction brakes and control speed.",
                    "Selecting an appropriate lower range does not inherently mean the transmission is being damaged.",
                    "The important mechanical limit is whether engine speed and transmission operation remain within the vehicle's specified range.",
                    "Warning lights, abnormal shifting, slipping, vibration, or overheating are more meaningful reasons for mechanical investigation.",
                    "Engine braking requires additional caution on snow, ice, and other low-traction surfaces.",
                    "Vehicle-specific owner-manual guidance takes precedence over generic gear or RPM rules.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "2024 Grand Highlander Owner's Manual: Manual Mode",
                        publisher: "Toyota",
                        href: "https://www.toyota.com/owners/warranty-owners-manuals/digital/article/grand-highlander/2024/om0e126u/ch04se020402/",
                    },
                    {
                        title: "Owner's Manual",
                        publisher: "Subaru",
                        href: "https://techinfo.subaru.com/stis/doc/ownerManual/MSA5M1906A_STIS.pdf",
                    },
                    {
                        title: "Owner's Manual",
                        publisher: "Toyota",
                        href: "https://assets.sia.toyota.com/publications/en/om-s/OM12G38U/pdf/OM12G38U.pdf",
                    },
                    {
                        title:
                            "NHTSA Investigation Document: Transmission / Engine Braking Guidance",
                        publisher: "National Highway Traffic Safety Administration",
                        href: "https://static.nhtsa.gov/odi/inv/2019/INRD-PE19017-10043.pdf",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="engine-braking-automatic-transmission" />
        </GuideLayout>
    );
}