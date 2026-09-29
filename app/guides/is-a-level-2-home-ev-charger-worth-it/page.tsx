import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import { InformationCard, } from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

import EVHomeChargingDecisionCheck from "./EVHomeChargingDecisionCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-level-2-home-ev-charger-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-level-2-home-ev-charger-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "level-2-home-charger-calculator",
        label: "Level 2 home charger calculator",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "level-1-vs-level-2",
        label: "Level 1 vs. Level 2",
    },
    {
        id: "financial-case",
        label: "The financial case",
    },
    {
        id: "installation-cost",
        label: "Installation cost",
    },
    {
        id: "charging-bottleneck",
        label: "When Level 1 is not enough",
    },
    {
        id: "public-charging",
        label: "Replacing public charging",
    },
    {
        id: "electrical-panel",
        label: "Your electrical panel matters",
    },
    {
        id: "special-cases",
        label: "Special cases",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "incentives",
        label: "2026 tax and incentive detail",
    },
    {
        id: "checklist",
        label: "Practical decision checklist",
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
        id: "level1-enough",
        title: "I already charge from a normal outlet",
        summary:
            "Find out whether Level 1 can replenish your normal daily mileage overnight.",
        guidance:
            "Start with the calculator. The important comparison is your daily mileage divided by the actual Level 1 charging rate, compared with the number of hours your vehicle normally sits parked.",
        destinationId: "level-2-home-charger-calculator",
        destinationLabel:
            "Level 2 Home Charger Cost & Charging Check",
    },
    {
        id: "public-charging",
        title: "I rely on public charging",
        summary:
            "Estimate how much charging cost could move from public stations to home.",
        guidance:
            "Enter the percentage of your charging that you currently buy publicly and compare that cost with your home electricity price.",
        destinationId: "financial-case",
        destinationLabel: "The Financial Case",
    },
    {
        id: "slow-charging",
        title: "My Level 1 charging cannot keep up",
        summary:
            "See why charging speed can matter even when home electricity is cheap.",
        guidance:
            "When your normal driving exceeds what your parking window can replenish, Level 2 becomes a charging-capacity decision rather than simply a convenience upgrade.",
        destinationId: "charging-bottleneck",
        destinationLabel: "When Level 1 Is Not Enough",
    },
    {
        id: "installation",
        title: "I already got a charger quote",
        summary:
            "Understand which electrical factors can make the project expensive.",
        guidance:
            "A quote can vary substantially with panel capacity, circuit distance, permits, and required electrical upgrades. Use the actual quote in the calculator rather than a national average.",
        destinationId: "installation-cost",
        destinationLabel: "Installation Cost",
    },
    {
        id: "renting",
        title: "I rent or cannot install at home",
        summary:
            "See why installation economics are different when you do not control the parking or electrical service.",
        guidance:
            "A Level 2 charger only solves a home-charging problem when you have practical access to the electrical infrastructure and permission to use it.",
        destinationId: "special-cases",
        destinationLabel: "Special Cases",
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

export default function Level2HomeEVChargerGuide() {
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
            <EVHomeChargingDecisionCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A Level 2 charger can be one of those home upgrades where the
                    answer changes depending on what problem you are trying to solve.
                </p>

                <p>
                    If you already have a 120-volt outlet and your vehicle sits
                    overnight long enough to replace the miles you normally drive,
                    Level 1 may already meet the practical need. Level 2 mainly buys
                    you much faster charging.
                </p>

                <p>
                    The economics change when Level 1 cannot keep up and you are
                    compensating with public charging. In that situation, a home
                    Level 2 charger can potentially replace some of the more expensive
                    energy you would otherwise buy away from home.
                </p>

                <p>
                    The useful question is therefore not simply whether Level 2 is
                    &quot;worth it.&quot; It is whether faster home charging solves a real
                    constraint for you and whether that benefit justifies the installed
                    cost.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="level-1-vs-level-2"
                eyebrow="The Fundamental Difference"
                title="Level 2 changes charging speed, not the basic price of home electricity."
            >
                <p>
                    Level 1 charging uses a standard 120-volt household connection.
                    Level 2 residential charging uses 240-volt service. The U.S.
                    Department of Energy describes Level 1 as adding roughly 2–5
                    miles of range per hour and Level 2 as roughly 10–30 miles per
                    hour, with the exact result depending on the vehicle and charging
                    equipment.
                </p>

                <p>
                    That distinction is important because it changes how the financial
                    calculation should be framed. A Level 2 charger does not create a
                    lower electricity rate merely because it charges faster. If you
                    are already charging at home on Level 1, you are generally paying
                    the same residential electricity price for the energy.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Level 1">
                        <p>
                            Lowest installation burden. Often sufficient for lighter
                            daily driving when the vehicle remains parked for many hours.
                        </p>
                    </InformationCard>

                    <InformationCard title="Level 2">
                        <p>
                            Much faster charging and a dedicated 240-volt circuit,
                            making it easier to replenish substantial mileage overnight
                            or during shorter parking periods.
                        </p>
                    </InformationCard>

                    <InformationCard title="DC fast charging">
                        <p>
                            Designed for rapid public charging rather than ordinary
                            overnight home charging. It is a fundamentally different
                            infrastructure decision.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="financial-case"
                eyebrow="The Math"
                title="The strongest financial case usually comes from replacing public charging."
            >
                <p>
                    Suppose your EV consumes 0.30 kWh per mile, you drive 12,000
                    miles per year, 25% of your charging is currently purchased
                    publicly, home electricity costs $0.20 per kWh, and public
                    charging costs $0.45 per kWh.
                </p>

                <p>
                    In that example, the energy displaced from public charging is
                    about 900 kWh per year. The price difference is $0.25 per kWh,
                    producing about $225 of annual charging-cost savings before
                    considering the installation cost.
                </p>

                <p>
                    That is the point where the installation quote becomes important.
                    A $1,000 installation has a very different payback from a $4,500
                    project. The calculator lets you replace the assumptions with your
                    actual numbers.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Level 1 → Level 2">
                        <p>
                            If you are already charging entirely at home, the electricity
                            cost itself may not change. The primary benefit is faster
                            replenishment and flexibility.
                        </p>
                    </InformationCard>

                    <InformationCard title="Public → Home">
                        <p>
                            If Level 2 allows you to replace public charging with home
                            charging, the rate difference can create measurable operating
                            savings.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="installation-cost"
                eyebrow="Upfront Cost"
                title="The installation quote can matter more than the charger itself."
            >
                <p>
                    The charger hardware is only one part of the project. Installation
                    can involve a new 240-volt circuit, breaker, conduit, wiring,
                    permitting, and electrical-panel work.
                </p>

                <p>
                    EnergySage reports a roughly $800–$3,000 installation range for
                    home EV chargers based on Qmerit data. Qmerit currently advertises
                    home EV charger installation starting at $749. Those are planning
                    references, not substitutes for a site-specific quote.
                </p>

                <p>
                    The biggest variables are usually the available electrical capacity,
                    the distance between the panel and charger, the installation
                    location, permitting requirements, and whether the existing service
                    needs an upgrade.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Panel capacity">
                        <p>
                            A panel with limited available capacity can change the
                            project substantially.
                        </p>
                    </InformationCard>

                    <InformationCard title="Circuit distance">
                        <p>
                            Longer wiring runs generally require more material and labor.
                        </p>
                    </InformationCard>

                    <InformationCard title="Location">
                        <p>
                            A detached garage, difficult route, or exterior installation
                            can require additional work.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="charging-bottleneck"
                eyebrow="The Practical Question"
                title="Level 2 becomes much more valuable when Level 1 cannot replenish your normal driving."
            >
                <p>
                    Imagine driving 50 miles every day and parking at home for only
                    eight hours. At 4 miles of range per hour, Level 1 would theoretically
                    restore about 32 miles during that window. That leaves a gap of about
                    18 miles before considering real-world charging limitations.
                </p>

                <p>
                    Level 2 changes the size of that window dramatically. A charging rate
                    around 25 miles per hour would replace the same 50-mile daily drive in
                    about two hours under the calculator&apos;s simplified assumptions.
                </p>

                <p>
                    That does not mean the vehicle will always charge at exactly those
                    rates. DOE notes that charging time depends on the battery state of
                    charge, battery capacity, vehicle onboard charging capability,
                    charging equipment, and electrical service.
                </p>
            </GuideSection>

            <GuideSection
                id="public-charging"
                eyebrow="Public Charging"
                title="Public charging can turn a convenience upgrade into an economic decision."
            >
                <p>
                    Someone who already charges at home every night has little
                    electricity-cost reason to replace Level 1 with Level 2. Someone
                    without enough home charging capacity may be using public stations
                    to fill the gap.
                </p>

                <p>
                    The calculator therefore asks for the percentage of charging you
                    currently buy publicly. That lets the model estimate only the
                    portion of energy that could plausibly be shifted to your home.
                </p>

                <p>
                    This is deliberately different from assuming that every mile driven
                    will suddenly become home-charged. Your actual charging pattern may
                    still include road trips, workplace charging, destination charging,
                    or public charging when home charging is inconvenient.
                </p>
            </GuideSection>

            <GuideSection
                id="electrical-panel"
                eyebrow="Before You Order"
                title="Find out what your electrical system can support before buying the equipment."
            >
                <p>
                    An EV charger is a significant continuous electrical load. The
                    relevant question is not simply whether your panel physically has an
                    empty breaker position; an electrician may need to evaluate the
                    available service capacity and the rest of the home&apos;s electrical
                    load.
                </p>

                <p>
                    Qmerit says its installation process includes a main-panel load
                    calculation and evaluation of the wiring, breaker, permits, and
                    other requirements needed for a code-compliant installation.
                </p>

                <p>
                    Do not assume that a particular charger amperage will work with your
                    existing service because another homeowner installed the same model.
                    The electrical infrastructure is part of the project.
                </p>
            </GuideSection>

            <GuideSection
                id="special-cases"
                eyebrow="Cases That Change the Math"
                title="Some households have a different Level 2 decision entirely."
            >
                <div className="space-y-6">
                    <InformationCard title="You rent">
                        <p>
                            Installation permission, ownership of the equipment, and
                            your expected length of residence can dominate the economics.
                            A financially attractive installation can still be impractical
                            if you cannot modify the electrical system.
                        </p>
                    </InformationCard>

                    <InformationCard title="You own an apartment or condo">
                        <p>
                            Parking-space ownership, shared electrical infrastructure,
                            condominium rules, and electrical capacity can matter as
                            much as the charger price.
                        </p>
                    </InformationCard>

                    <InformationCard title="You drive a plug-in hybrid">
                        <p>
                            A plug-in hybrid may require substantially less daily energy
                            than a long-range battery EV. Level 1 may therefore cover its
                            typical charging need even when a full EV would benefit more
                            from Level 2.
                        </p>
                    </InformationCard>

                    <InformationCard title="You have workplace charging">
                        <p>
                            If you can regularly charge at work, the amount of energy
                            that needs to come from your home can be much smaller than
                            your annual driving would suggest.
                        </p>
                    </InformationCard>

                    <InformationCard title="You have solar or a special electricity tariff">
                        <p>
                            Your effective electricity cost may differ from the national
                            average. Use your actual marginal charging cost rather than
                            a generic residential rate.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same $1,700 installation can mean very different things to different drivers."
            >
                <div className="space-y-6">
                    <InformationCard title="Low-mileage driver with a dedicated outlet">
                        <p>
                            A driver who travels 15–20 miles per day and leaves the EV
                            parked overnight may already replenish the required range with
                            Level 1. Level 2 would primarily buy faster charging.
                        </p>
                    </InformationCard>

                    <InformationCard title="High-mileage commuter">
                        <p>
                            Someone driving 60–80 miles every weekday may find that Level 1
                            does not replace enough energy during the available parking
                            window. The value of faster charging becomes more concrete.
                        </p>
                    </InformationCard>

                    <InformationCard title="No reliable home charging">
                        <p>
                            A driver using public fast charging several times per week can
                            potentially create a meaningful financial case for installing
                            home charging, assuming the property and electrical system
                            support it.
                        </p>
                    </InformationCard>

                    <InformationCard title="Expensive electrical project">
                        <p>
                            A panel or service upgrade can push the installed cost far
                            above a straightforward charger installation. In that case,
                            the convenience benefit may still matter, but the simple
                            electricity-savings payback can become much longer.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "Measure how many miles you normally drive on an average day.",
                    "Determine how many hours the vehicle is normally parked at home with access to an outlet.",
                    "Check your vehicle manufacturer's actual Level 1 and Level 2 charging specifications when available.",
                    "Estimate how much charging you currently purchase from public stations.",
                    "Use your actual home electricity price rather than assuming the national average.",
                    "Use a realistic public-charging price based on the stations and charging networks you use.",
                    "Get an installation quote before relying on payback math.",
                    "Ask the electrician to evaluate available electrical capacity rather than assuming an empty breaker slot is sufficient.",
                    "Separate the financial payback from the value of faster charging and convenience.",
                    "Check available state or utility incentives before finalizing the project.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Installing Level 2"
                subtitle="The goal is to find the variables that materially change the decision."
                questions={[
                    "How many miles do I normally drive per day?",
                    "How many hours is my EV parked at home each day?",
                    "Can Level 1 replenish the range I normally use?",
                    "How much public charging am I currently paying for?",
                    "What is my actual marginal home electricity cost?",
                    "What does a realistic Level 2 installation quote look like?",
                    "Does my electrical panel have enough available capacity?",
                    "Would the charger location require a long wiring run or other unusual work?",
                    "Can I use workplace or destination charging instead?",
                    "What utility or state incentives are available today?",
                ]}
            />

            <GuideSection
                id="incentives"
                eyebrow="2026 Tax Detail"
                title="Do not build your calculation around an expired federal credit."
            >
                <p>
                    The federal Alternative Fuel Vehicle Refueling Property Credit
                    under Section 30C expired for property placed in service after
                    June 30, 2026. The IRS confirms the cutoff, and the Department
                    of Energy&apos;s Alternative Fuels Data Center now lists the credit as
                    expired.
                </p>

                <p>
                    State and utility incentives can still exist, but those programs
                    vary by location and can change independently of the federal credit.
                    Treat them as a separate reduction to your actual project cost
                    rather than baking a generic incentive into the calculator.
                </p>
            </GuideSection>

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Level 2 primarily improves charging speed; it does not inherently make home electricity cheaper than Level 1.",
                    "If Level 1 can replenish your normal daily mileage during your parking window, Level 2 is largely a convenience and flexibility decision.",
                    "If Level 1 cannot keep up, Level 2 can reduce dependence on public charging.",
                    "The strongest financial case often comes from replacing public charging with lower-cost home charging.",
                    "Installation cost can vary substantially depending on panel capacity, wiring distance, permits, and electrical upgrades.",
                    "Your actual vehicle, charging behavior, utility rate, and installation quote matter more than a generic payback example.",
                    "The value of faster charging and convenience is real but is separate from the electricity-cost calculation.",
                    "Federal Section 30C should not be assumed in a 2026 project unless the property was placed in service before the June 30, 2026 cutoff and otherwise qualified.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Electric Vehicles for Consumers",
                        publisher:
                            "U.S. Department of Energy — Alternative Fuels Data Center",
                        href: "https://afdc.energy.gov/vehicles/electric-consumers",
                    },
                    {
                        title: "Electric Vehicle Charging Stations",
                        publisher:
                            "U.S. Department of Energy — Alternative Fuels Data Center",
                        href: "https://afdc.energy.gov/fuels/electricity-stations",
                    },
                    {
                        title: "How Much Does an EV Charger Installation Cost?",
                        publisher: "EnergySage",
                        href: "https://www.energysage.com/ev-charging/how-much-does-ev-charger-installation-cost/",
                    },
                    {
                        title: "How Much Does EV Charging Station Installation Cost?",
                        publisher: "Qmerit",
                        href: "https://qmerit.com/faq/how-much-does-ev-charging-station-installation-cost/",
                    },
                    {
                        title: "What's Included in the EV Charger Installation Cost?",
                        publisher: "Qmerit",
                        href: "https://qmerit.com/faq/whats-included-in-the-installation-cost/",
                    },
                    {
                        title: "Section 30C — Alternative Fuel Vehicle Refueling Property Credit",
                        publisher:
                            "Internal Revenue Service",
                        href: "https://www.irs.gov/credits-deductions/alternative-fuel-vehicle-refueling-property-credit-for-tax-exempt-entities",
                    },
                    {
                        title: "Alternative Fuel Infrastructure Tax Credit",
                        publisher:
                            "U.S. Department of Energy — Alternative Fuels Data Center",
                        href: "https://afdc.energy.gov/laws/10513",
                    },
                    {
                        title: "Electric Power Monthly",
                        publisher:
                            "U.S. Energy Information Administration",
                        href: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_es1a",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-a-level-2-home-ev-charger-worth-it"
            />
        </GuideLayout>
    );
}