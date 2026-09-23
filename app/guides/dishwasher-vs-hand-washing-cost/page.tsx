import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import DishwasherVsHandWashingCalculator from "@/app/components/article/DishwasherVsHandWashingCalculator";
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
        "dishwasher-vs-hand-washing-cost",
    );

    if (!found) {
        throw new Error(
            "Guide not found: dishwasher-vs-hand-washing-cost",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "dishwasher-vs-hand-washing-calculator",
        label: "Dishwasher vs. hand-washing calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "why-dishwashers-can-win",
        label: "Why dishwashers can use less",
    },
    {
        id: "hand-washing",
        label: "Hand-washing technique matters",
    },
    {
        id: "water",
        label: "Water use",
    },
    {
        id: "hot-water",
        label: "Hot-water energy",
    },
    {
        id: "detergent",
        label: "Detergent cost",
    },
    {
        id: "full-loads",
        label: "Why load size matters",
    },
    {
        id: "pre-rinsing",
        label: "What about pre-rinsing?",
    },
    {
        id: "drying",
        label: "Heated drying",
    },
    {
        id: "time",
        label: "What about your time?",
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
        id: "cheaper",
        title: "I want to know which costs less",
        summary:
            "Compare water, electricity, hot-water energy, and detergent.",
        guidance:
            "The answer depends heavily on how much water you use when washing by hand. Start with the calculator and enter your faucet-running time.",
        destinationId: "dishwasher-vs-hand-washing-calculator",
        destinationLabel: "Dishwasher vs. Hand-Washing Calculator",
    },
    {
        id: "save-water",
        title: "I mainly want to save water",
        summary:
            "See why faucet flow and running time can dominate the comparison.",
        guidance:
            "A modern efficient dishwasher can use only a few gallons per cycle. A running kitchen faucet can exceed that amount in only a few minutes.",
        destinationId: "water",
        destinationLabel: "Water Use",
    },
    {
        id: "efficient-hand-washing",
        title: "I wash dishes efficiently by hand",
        summary:
            "See why basin-style washing can produce a very different result.",
        guidance:
            "If you fill a sink or basin instead of leaving the faucet running, your water use can be far below the typical running-faucet comparison.",
        destinationId: "hand-washing",
        destinationLabel: "Hand-Washing Technique Matters",
    },
    {
        id: "prerinse",
        title: "I rinse everything before loading it",
        summary:
            "See how pre-rinsing can undermine some of the dishwasher's water advantage.",
        guidance:
            "Scraping food from dishes and following the dishwasher manufacturer's loading guidance can avoid unnecessary faucet use before the cycle even starts.",
        destinationId: "pre-rinsing",
        destinationLabel: "What About Pre-Rinsing?",
    },
    {
        id: "time",
        title: "I care about the time it takes",
        summary:
            "Separate operating cost from the value of your own time.",
        guidance:
            "The calculator intentionally does not assign a wage to household labor. Time can still be an important practical reason to prefer one method.",
        destinationId: "time",
        destinationLabel: "What About Your Time?",
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

export default function DishwasherVsHandWashingCostGuide() {
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
            <DishwasherVsHandWashingCalculator />

            <WhyThisMatters id="short-answer">
                <p>
                    For many households, a modern efficient dishwasher can use less water
                    than washing the same amount of dishes by hand with a continuously
                    running faucet.
                </p>

                <p>
                    But that does not mean a dishwasher automatically beats every
                    hand-washing method. Someone who fills a basin, turns the faucet off,
                    and uses only a few gallons can produce a much closer comparison than
                    someone who leaves the water running throughout the entire process.
                </p>

                <p>
                    That is why the useful question is not simply whether dishwashers are
                    cheaper. It is how much water, energy, and detergent each method uses
                    in your household for an equivalent amount of dishes.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="why-dishwashers-can-win"
                eyebrow="The Counterintuitive Part"
                title="A machine can use less water because it repeatedly recirculates a limited supply."
            >
                <p>
                    A dishwasher does not need a fresh stream of water flowing over every
                    dish for the entire cycle. It fills with a controlled amount of
                    water, pumps that water through spray arms, drains it at selected
                    points, and repeats the process as needed.
                </p>

                <p>
                    That makes a dishwasher fundamentally different from washing under a
                    continuously running faucet. The comparison is not machine time
                    versus faucet time; it is total water and energy consumed to clean an
                    equivalent load.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Controlled fill">
                        <p>
                            The dishwasher takes in a measured amount of water rather than
                            relying on continuous faucet flow.
                        </p>
                    </InformationCard>

                    <InformationCard title="Recirculation">
                        <p>
                            Pumps repeatedly move wash water through the spray system during
                            portions of the cycle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Full-load efficiency">
                        <p>
                            One cycle can clean many place settings while spreading the
                            cycle&apos;s water and energy use across the entire load.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Current ENERGY STAR criteria limit standard-size certified
                    dishwashers to no more than 3.2 gallons of water per cycle and 240
                    kWh of annual energy consumption under the program&apos;s test
                    assumptions.
                </p>
            </GuideSection>

            <GuideSection
                id="hand-washing"
                eyebrow="Hand Washing Is Not One Method"
                title="The faucet can be either the biggest disadvantage or a manageable one."
            >
                <p>
                    Statements such as &quot;hand washing uses more water&quot; can hide
                    an important variable: people wash dishes in very different ways.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Running-faucet method">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Faucet runs during much of washing and rinsing
                            </GuideBullet>
                            <GuideBullet>
                                Water use rises directly with flow rate and time
                            </GuideBullet>
                            <GuideBullet>
                                Hot-water energy can rise along with water use
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Basin-style method">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Sink or basin is filled with a limited amount of water
                            </GuideBullet>
                            <GuideBullet>
                                Faucet is turned off for much of the washing process
                            </GuideBullet>
                            <GuideBullet>
                                Total water use can be dramatically lower
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    This is why the calculator asks for total faucet-running time rather
                    than simply asking how long it takes you to wash the dishes. You
                    might spend 15 minutes washing while the faucet runs for only two
                    minutes.
                </p>
            </GuideSection>

            <GuideSection
                id="water"
                eyebrow="The Biggest Variable"
                title="A kitchen faucet can exceed a dishwasher's entire water use in only a few minutes."
            >
                <p>
                    Water use from a running faucet is straightforward:
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-xl font-semibold">
                        Gallons used = faucet flow rate × faucet-running time
                    </p>

                    <p className="mt-4 leading-7 text-[var(--muted)]">
                        A 1.8-gallon-per-minute faucet running for eight minutes uses 14.4
                        gallons of water.
                    </p>
                </div>

                <p>
                    Compare that with the 3.2-gallon-per-cycle maximum for a current
                    standard-size ENERGY STAR certified dishwasher. Under those
                    assumptions, the running faucet would use more than four times as
                    much water.
                </p>

                <p>
                    But reduce actual faucet-running time to two minutes and the same
                    faucet uses 3.6 gallons. Suddenly the comparison is much closer.
                </p>

                <p>
                    This is why faucet behavior is more useful than a universal claim
                    about hand washing.
                </p>
            </GuideSection>

            <GuideSection
                id="hot-water"
                eyebrow="Water Also Has an Energy Cost"
                title="Heating hand-washing water can matter as much as paying for the water itself."
            >
                <p>
                    Water from the utility has a direct cost, but warm or hot water also
                    requires energy. The amount depends on the incoming water
                    temperature, desired temperature, water-heater type, and efficiency.
                </p>

                <p>
                    The calculator uses an adjustable energy-per-gallon assumption for
                    hand washing. Its default of 0.183 kWh per gallon represents roughly
                    the thermal energy required to raise one gallon of water by 75°F.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Why the hot-water percentage matters
                    </p>

                    <p className="mt-4 leading-7">
                        If only part of the water flowing from the faucet is hot, only that
                        portion should be assigned a water-heating energy cost. The
                        calculator therefore asks what percentage of your hand-washing
                        water is hot.
                    </p>
                </div>

                <p>
                    If your water heater uses natural gas, propane, a heat pump, or another technology,
                    the calculator&apos;s electricity-based hot-water estimate will not directly represent
                    your actual water-heating cost. Treat it as an approximation unless you adjust the
                    input to reflect your effective cost.
                </p>
            </GuideSection>

            <GuideSection
                id="detergent"
                eyebrow="Small Costs Still Add Up"
                title="Detergent can change the comparison when the water and energy numbers are close."
            >
                <p>
                    Dishwasher detergent and hand dish soap are both recurring costs.
                    They are usually smaller than the water and energy differences in an
                    inefficient hand-washing scenario, but they can matter when the two
                    methods are otherwise close.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Dishwasher detergent">
                        <p>
                            Enter the cost of the pod, tablet, powder, or gel used for one
                            dishwasher cycle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Hand dish soap">
                        <p>
                            Estimate the amount of soap used to wash an equivalent
                            dishwasher-sized load rather than the cost of an entire bottle.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    If you are comparing methods for financial reasons, use what you
                    actually pay rather than assuming premium pods or bargain soap are
                    representative of everyone.
                </p>
            </GuideSection>

            <GuideSection
                id="full-loads"
                eyebrow="Utilization Matters"
                title="Dishwasher economics generally improve when you run reasonably full loads."
            >
                <p>
                    Much of a dishwasher&apos;s water and energy use occurs per cycle.
                    Running the machine for only a few dishes therefore spreads those
                    costs across fewer items.
                </p>

                <p>
                    Waiting for a reasonably full load makes the comparison more
                    favorable because the same cycle cleans more dishes.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Reasonably full">
                        <p>
                            Water, machine energy, and detergent are distributed across many
                            dishes in one cycle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Mostly empty">
                        <p>
                            Similar cycle-level costs are incurred for fewer dishes, reducing
                            the efficiency advantage per item.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Do not interpret &quot;full&quot; as overloaded. Follow the
                    manufacturer&apos;s rack-loading guidance so water can reach the
                    dishes properly.
                </p>
            </GuideSection>

            <GuideSection
                id="pre-rinsing"
                eyebrow="Before You Press Start"
                title="Pre-rinsing can quietly add faucet water back into the dishwasher side of the comparison."
            >
                <p>
                    If dishes are thoroughly washed under the faucet before being loaded,
                    some of the dishwasher&apos;s water advantage can disappear before
                    the cycle even begins.
                </p>

                <p>
                    ENERGY STAR advises scraping food scraps rather than rinsing dishes
                    before loading them and notes that unnecessary pre-rinsing wastes
                    water and energy.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="font-semibold">
                        Count the whole process.
                    </p>

                    <p className="mt-3 leading-7 text-[var(--muted)]">
                        A fair comparison includes water used before the dishwasher starts.
                        If you routinely run the faucet for several minutes while
                        pre-rinsing, add that behavior mentally to the dishwasher&apos;s
                        operating footprint.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="drying"
                eyebrow="After the Wash"
                title="Drying settings can change dishwasher energy use."
            >
                <p>
                    Dishwasher cycles can use energy for drying as well as washing.
                    ENERGY STAR recommends using an air-dry setting when available to
                    reduce energy use.
                </p>

                <p>
                    The calculator&apos;s dishwasher energy input is intended to capture
                    the energy use associated with the cycle figure you enter. If you are
                    comparing specific settings or measured energy use, replace the
                    default with a more representative number.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Heated drying">
                        <p>
                            Uses additional energy to accelerate drying after the wash and
                            rinse portions of the cycle.
                        </p>
                    </InformationCard>

                    <InformationCard title="Air drying">
                        <p>
                            Can reduce energy use when the machine and your routine allow
                            dishes to dry without added heat.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="time"
                eyebrow="The Calculator Leaves Something Out"
                title="Your time has value, but assigning it a dollar amount is a personal decision."
            >
                <p>
                    Hand washing requires active labor. Loading and unloading a
                    dishwasher also takes time, but much of the wash cycle itself happens
                    without your involvement.
                </p>

                <p>
                    We deliberately leave the value of your time out of the calculator.
                    Treating every minute of household work as though it could have been
                    sold at an hourly wage can overstate the financial cost, while
                    assigning it zero value can understate the convenience difference.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Operating-cost question">
                        <p>
                            Compare water, energy, and detergent. This is what the calculator
                            measures.
                        </p>
                    </InformationCard>

                    <InformationCard title="Lifestyle question">
                        <p>
                            Decide how much you personally value the active time and
                            convenience associated with each method.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The answer can flip when the washing method changes."
            >
                <div className="space-y-6">
                    <InformationCard title="Running faucet for the entire wash">
                        <p>
                            A household washes an equivalent dishwasher load while a
                            1.8-gallon-per-minute faucet runs for eight minutes. That is 14.4
                            gallons before considering the energy needed to heat much of the
                            water. An efficient dishwasher has a strong operating-cost and
                            water-use advantage under these assumptions.
                        </p>
                    </InformationCard>

                    <InformationCard title="Efficient basin washing">
                        <p>
                            Another household fills a small basin and only runs the faucet
                            briefly for filling and rinsing. Its total hand-washing water use
                            approaches the dishwasher&apos;s water use, making detergent,
                            hot-water energy, and local utility prices much more important.
                        </p>
                    </InformationCard>

                    <InformationCard title="Dishwasher run mostly empty">
                        <p>
                            The machine uses a cycle to clean a small number of dishes.
                            Hand washing those few items efficiently can make more sense than
                            treating every handful of dishes as a full dishwasher load.
                        </p>
                    </InformationCard>

                    <InformationCard title="Full dishwasher with heavy pre-rinsing">
                        <p>
                            The dishwasher itself may be efficient, but several minutes of
                            faucet pre-rinsing adds water and hot-water energy before the
                            cycle starts. Scraping rather than extensively rinsing improves
                            the comparison.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Rule of Thumb"
                items={[
                    "Compare equivalent amounts of dishes rather than one dishwasher cycle with an undefined hand-washing session.",
                    "Use your dishwasher's actual water and energy figures when they are available.",
                    "Measure or estimate actual faucet-running time rather than total time spent standing at the sink.",
                    "Multiply faucet flow by running time to understand how quickly hand-washing water use can grow.",
                    "Include the cost of heating hot hand-washing water as well as the water itself.",
                    "Run reasonably full dishwasher loads without overloading the racks.",
                    "Avoid unnecessary pre-rinsing when your dishwasher and manufacturer guidance do not require it.",
                    "Consider air drying or lower-energy drying settings when appropriate.",
                    "Treat your time and convenience as a separate personal factor rather than hiding them inside the utility-cost calculation.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask About How You Wash Dishes"
                subtitle="A few household-specific inputs can change the answer substantially."
                questions={[
                    "How many dishwasher-equivalent loads of dishes do we wash each week?",
                    "How many gallons does our dishwasher use per cycle?",
                    "How much energy does our dishwasher use per cycle?",
                    "How long is the faucet actually running when we wash an equivalent load by hand?",
                    "What is our kitchen faucet's flow rate?",
                    "How much of our hand-washing water is hot?",
                    "What do we pay for water, sewer, electricity, and detergent?",
                    "Do we extensively pre-rinse dishes before loading the dishwasher?",
                    "Do we normally run the dishwasher reasonably full?",
                    "How much do we value the time and convenience difference between the two methods?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A modern efficient dishwasher can use substantially less water than washing an equivalent load under a continuously running faucet.",
                    "Hand washing is not one fixed method; basin-style washing can use far less water than continuous-flow washing.",
                    "Faucet flow rate multiplied by actual running time is one of the most important inputs in the comparison.",
                    "Hot-water energy can materially increase the cost of hand washing.",
                    "Dishwasher efficiency per dish generally improves when the machine is run with reasonably full loads.",
                    "Unnecessary pre-rinsing can add significant faucet water to the dishwasher side of the comparison.",
                    "Detergent and drying settings matter more when water and energy use are already close.",
                    "The calculator compares operating costs and intentionally excludes dishwasher purchase price, repairs, replacement, and the value of household labor.",
                    "The most useful answer comes from measuring your own washing behavior rather than relying on a universal dishwasher-versus-hand-washing claim.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Dishwashers — Key Product Criteria",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/dishwashers/key_product_criteria",
                    },
                    {
                        title: "Dishwashers",
                        publisher: "ENERGY STAR",
                        href: "https://www.energystar.gov/products/dishwashers",
                    },
                    {
                        title:
                            "WaterSense at Work — Residential Kitchen and Laundry",
                        publisher:
                            "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/sites/production/files/2017-10/documents/ws-commercialbuildings-waterscore-residential-kitchen-laundry-guide.pdf",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="dishwasher-vs-hand-washing-cost" />
        </GuideLayout>
    );
}