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

import TravelInsuranceCoverageCheck from "./TravelInsuranceCoverageCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "is-travel-insurance-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-travel-insurance-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "travel-insurance-coverage-gap",
        label: "Travel insurance coverage gap check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "trip-cost",
        label: "How much could you actually lose?",
    },
    {
        id: "coverage-types",
        label: "What travel insurance can cover",
    },
    {
        id: "existing-coverage",
        label: "Coverage you may already have",
    },
    {
        id: "international",
        label: "Why international travel changes the decision",
    },
    {
        id: "cruises",
        label: "Cruises and remote destinations",
    },
    {
        id: "when-less-value",
        label: "When travel insurance may have less value",
    },
    {
        id: "cfar",
        label: "Cancel For Any Reason coverage",
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
        id: "expensive-trip",
        title: "My trip is expensive or mostly nonrefundable",
        summary:
            "Estimate how much money you could lose if you cannot take the trip.",
        guidance:
            "Start with the calculator and enter the amount you could actually recover without insurance. The relevant exposure is usually the nonrecoverable portion, not simply the total trip price.",
        destinationId: "travel-insurance-coverage-gap",
        destinationLabel:
            "Travel Insurance Coverage Gap Check",
    },
    {
        id: "international",
        title: "I am traveling internationally",
        summary:
            "Check whether your existing health and evacuation coverage follows you abroad.",
        guidance:
            "Your regular health insurance may have limited or no coverage abroad, and medical evacuation is a separate concern. Verify the actual benefits before assuming you are protected.",
        destinationId: "international",
        destinationLabel:
            "Why International Travel Changes the Decision",
    },
    {
        id: "credit-card",
        title: "I have travel protection through a credit card",
        summary:
            "Find out what the card may cover before buying overlapping protection.",
        guidance:
            "Review the card's Guide to Benefits, including which expenses must be charged to the card and which cancellation, interruption, delay, baggage, and medical benefits are included.",
        destinationId: "existing-coverage",
        destinationLabel:
            "Coverage You May Already Have",
    },
    {
        id: "cruise",
        title: "I am taking a cruise",
        summary:
            "Look at cancellation, medical, and evacuation exposure separately.",
        guidance:
            "Cruises can combine substantial prepaid costs with international or remote destinations. Start by separating trip cancellation exposure from medical and evacuation coverage.",
        destinationId: "cruises",
        destinationLabel:
            "Cruises and Remote Destinations",
    },
    {
        id: "low-risk",
        title: "My trip is inexpensive and flexible",
        summary:
            "See whether the amount you could lose is small enough to change the calculation.",
        guidance:
            "Start with your actual nonrefundable exposure rather than the total vacation price. Refundable bookings and flexible reservations can materially reduce the amount insurance would need to protect.",
        destinationId: "when-less-value",
        destinationLabel:
            "When Travel Insurance May Have Less Value",
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

export default function TravelInsuranceGuide() {
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
            <TravelInsuranceCoverageCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    Travel insurance is not one type of protection. A policy can
                    combine trip cancellation, trip interruption, emergency medical,
                    medical evacuation, baggage, delay, and other benefits, but the
                    specific coverage depends on the policy.
                </p>

                <p>
                    The U.S. Department of State separates travel health insurance,
                    medical evacuation insurance, and trip cancellation insurance in
                    its travel guidance. It also notes that the U.S. government does
                    not pay medical costs for U.S. citizens traveling abroad.
                </p>

                <p>
                    That means the useful question is not simply whether your vacation
                    is expensive enough to justify insurance. You should first identify
                    the risks you are trying to transfer and determine how much of that
                    risk is already covered by your bookings, credit cards, health
                    insurance, or other policies.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="trip-cost"
                eyebrow="Trip-Cost Exposure"
                title="Start with the money you could actually lose."
            >
                <p>
                    A $5,000 vacation is not necessarily a $5,000 insurance exposure.
                    You may be able to cancel a hotel for a full refund, change a
                    flight for a credit, or recover part of a cruise fare through the
                    supplier&apos;s policies.
                </p>

                <p>
                    What matters for the cancellation decision is the portion of your
                    prepaid trip cost that is genuinely nonrefundable or otherwise
                    difficult to recover.
                </p>

                <p>
                    The calculator separates total trip cost from recoverable amounts
                    for that reason. Entering the full vacation price as your exposure
                    can make the insurance comparison look larger than it really is.
                </p>

                <InformationCard title="Use today's cancellation terms">
                    <p>
                        Check your airline, hotel, cruise, tour, and rental
                        cancellation policies before entering your recoverable amount.
                        A booking that is refundable today may become nonrefundable
                        later.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="coverage-types"
                eyebrow="What You Are Buying"
                title="Trip cancellation, medical, evacuation, and delay coverage solve different problems."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Trip cancellation">
                        <p>
                            Helps protect eligible prepaid trip costs when you cancel
                            for a covered reason. It generally does not mean you can
                            cancel for any reason and receive a full refund.
                        </p>
                    </InformationCard>

                    <InformationCard title="Trip interruption">
                        <p>
                            Applies after a trip has begun when a covered event causes
                            you to cut the trip short or otherwise changes the original
                            itinerary.
                        </p>
                    </InformationCard>

                    <InformationCard title="Emergency medical">
                        <p>
                            Helps address eligible medical costs that occur during
                            travel. International travelers should verify whether their
                            existing health insurance provides meaningful coverage abroad.
                        </p>
                    </InformationCard>

                    <InformationCard title="Medical evacuation">
                        <p>
                            Covers or helps arrange transportation when you need medical
                            evacuation under the policy. This can be financially
                            significant in remote destinations or when specialized
                            transportation is required.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="existing-coverage"
                eyebrow="Check Before You Buy"
                title="You may already have some travel protection."
            >
                <p>
                    Certain credit cards provide trip cancellation, trip interruption,
                    travel delay, baggage, or other travel protections. Those benefits
                    vary significantly by card and commonly depend on how the trip was
                    purchased.
                </p>

                <p>
                    Chase states that credit-card travel insurance typically applies
                    only to eligible expenses charged to the specific card and that
                    card benefits vary by product. Its guidance also recommends reviewing
                    the card&apos;s full Guide to Benefits rather than assuming a general
                    travel-protection label tells you what is covered.
                </p>

                <p>
                    Your airline, hotel, cruise line, or tour operator may also provide
                    refunds, credits, or rebooking options. Homeowners or renters
                    insurance can sometimes provide other forms of protection, such as
                    baggage coverage, although those policies have their own conditions
                    and limits.
                </p>

                <InformationCard title="Build a coverage inventory">
                    <p>
                        Before comparing travel insurance, write down what each existing
                        source covers, what it excludes, the applicable limits, and what
                        you must do to qualify for reimbursement.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="international"
                eyebrow="International Travel"
                title="Leaving the U.S. can make medical and evacuation coverage much more important."
            >
                <p>
                    The Department of State recommends checking with your health
                    insurer before traveling to determine whether emergency and
                    routine care abroad is covered. Original Medicare generally
                    does not cover healthcare outside the United States, although
                    Medicare lists limited exceptions. Some supplemental coverage
                    may also provide foreign-travel benefits.
                </p>

                <p>
                    Medical evacuation is a separate consideration. The Department of
                    State estimates that an air-ambulance evacuation back to the United
                    States can cost roughly $20,000 to $200,000 depending on location
                    and circumstances.
                </p>

                <p>
                    For an international trip, therefore, the cancellation premium may
                    not be the most important number. A traveler with a modestly priced
                    trip can still have substantial medical or evacuation exposure.
                </p>
            </GuideSection>

            <GuideSection
                id="cruises"
                eyebrow="Cruises and Remote Destinations"
                title="Cruises can combine high trip-cost exposure with medical and evacuation considerations."
            >
                <p>
                    Cruises frequently involve prepaid, date-specific expenses along
                    with travel between multiple destinations. Some itineraries also
                    take travelers well away from their normal healthcare system.
                </p>

                <p>
                    That does not automatically make cruise insurance necessary. The
                    useful approach is to separate the risks: determine how much of
                    the fare and associated travel costs are nonrefundable, then verify
                    medical and evacuation coverage for the itinerary.
                </p>

                <p>
                    The same framework applies to remote land trips, expedition travel,
                    and destinations where obtaining appropriate medical care may require
                    transportation.
                </p>
            </GuideSection>

            <GuideSection
                id="when-less-value"
                eyebrow="Lower Exposure"
                title="Travel insurance has less financial work to do when your trip is flexible."
            >
                <p>
                    A traveler with fully refundable reservations and inexpensive
                    transportation may have little trip-cancellation exposure.
                </p>

                <p>
                    The same can be true when you have enough financial reserves to
                    comfortably absorb a loss and already carry appropriate medical and
                    evacuation coverage.
                </p>

                <p>
                    That does not make insurance automatically unnecessary. It means the
                    cancellation portion of the decision may be less important, while
                    medical, evacuation, delay, or baggage benefits could still matter.
                </p>

                <InformationCard title="Do not confuse trip price with trip exposure">
                    <p>
                        The total vacation price is only a starting point. What matters
                        is how much of that money would remain at risk after refunds,
                        credits, existing benefits, and other protections.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                id="cfar"
                eyebrow="An Important Distinction"
                title="Cancel For Any Reason is different from standard cancellation coverage."
            >
                <p>
                    Standard trip-cancellation coverage generally applies only to
                    reasons listed in the policy. Cancel For Any Reason, or CFAR,
                    broadens the eligible reasons but is typically an optional upgrade
                    rather than a standard benefit.
                </p>

                <p>
                    Current consumer guidance from NerdWallet says CFAR commonly costs
                    an additional portion of the trip price and generally reimburses
                    only a percentage of eligible nonrefundable expenses rather than
                    returning the entire amount.
                </p>

                <p>
                    That means CFAR should be compared against the amount of flexibility
                    you are buying, not simply treated as &quot;better&quot; travel insurance.
                    Check the purchase deadline and the policy&apos;s reimbursement rules
                    before relying on it.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same policy can have very different value depending on the trip."
            >
                <div className="space-y-6">
                    <InformationCard title="Expensive cruise">
                        <p>
                            A large nonrefundable cruise balance plus international or
                            remote destinations can create both financial and medical
                            exposure. Evaluate those separately.
                        </p>
                    </InformationCard>

                    <InformationCard title="Short domestic weekend">
                        <p>
                            A low-cost trip with refundable hotels and flexible
                            transportation may leave little cancellation exposure.
                            Existing health and other insurance may also handle much of
                            the remaining risk.
                        </p>
                    </InformationCard>

                    <InformationCard title="International trip with weak health coverage">
                        <p>
                            The trip itself may be inexpensive, but limited medical or
                            evacuation coverage can create a much larger potential
                            exposure than the cancellation cost alone suggests.
                        </p>
                    </InformationCard>

                    <InformationCard title="Trip purchased on a premium credit card">
                        <p>
                            Some card benefits can overlap with a commercial travel
                            policy. Review the card&apos;s terms before paying for protection
                            you may already have.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="A Practical Decision Checklist"
                items={[
                    "List the prepaid expenses that would actually be nonrefundable if you canceled today.",
                    "Check the cancellation and refund rules for every major booking.",
                    "Review travel protections on the credit card used to purchase the trip.",
                    "Ask your health insurer whether you have emergency medical coverage at the destination.",
                    "Determine whether you have medical evacuation or repatriation coverage.",
                    "Check whether the policy covers your specific destination and activities.",
                    "Review exclusions, covered reasons, benefit limits, and documentation requirements.",
                    "Compare the insurance premium with the amount of trip-cost exposure it would protect.",
                    "Treat trip cancellation, medical, and evacuation protection as separate questions.",
                    "Check any purchase deadlines before assuming you can add coverage later.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Buying"
                subtitle="The useful answers are in the policy details, not the marketing label."
                questions={[
                    "How much of my trip is genuinely nonrefundable?",
                    "Which cancellation reasons are covered?",
                    "Does the policy cover trip interruption as well as cancellation?",
                    "Does my health insurance cover emergencies at my destination?",
                    "Does the policy include emergency medical and medical evacuation?",
                    "What are the medical and evacuation coverage limits?",
                    "Are pre-existing medical conditions excluded or subject to a waiver?",
                    "Does my credit card already provide trip cancellation or interruption coverage?",
                    "Which expenses must be purchased with my credit card for those benefits to apply?",
                    "What does Cancel For Any Reason cover, and how much does it reimburse?",
                    "What purchase deadline applies to the coverage I want?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Travel insurance is a bundle of different protections, not a single benefit.",
                    "Start with the money you could actually lose rather than the total price of the trip.",
                    "Refundable bookings and existing credit-card benefits can materially reduce your cancellation exposure.",
                    "International travel creates a separate question about emergency medical coverage.",
                    "Medical evacuation is distinct from ordinary medical coverage and can involve very large costs.",
                    "Review your existing coverage before buying another policy.",
                    "Cruises and remote destinations can combine significant cancellation and medical/evacuation exposure.",
                    "Cancel For Any Reason is a separate, broader form of cancellation protection and typically does not reimburse 100% of eligible costs.",
                    "The calculator identifies exposure and coverage gaps; it does not predict whether an insured event will occur.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Travel Insurance",
                        publisher:
                            "U.S. Department of State",
                        href: "https://travel.state.gov/en/international-travel/planning/guidance/insurance.html",
                    },
                    {
                        title: "Medicine and Health",
                        publisher:
                            "U.S. Department of State",
                        href: "https://travel.state.gov/en/international-travel/planning/guidance/medicine-health.html",
                    },
                    {
                        title: "How Does Travel Insurance Work on a Credit Card?",
                        publisher: "Chase",
                        href: "https://www.chase.com/personal/credit-cards/education/basics/how-does-credit-card-travel-insurance-work",
                    },
                    {
                        title: "Travel and Purchase Protection Benefits for Chase Credit Cards",
                        publisher: "Chase",
                        href: "https://www.chase.com/personal/credit-cards/education/basics/travel-and-purchase-protection-benefits-frequently-asked-questions",
                    },
                    {
                        title: "What Does Travel Insurance Cover?",
                        publisher: "NerdWallet",
                        href: "https://www.nerdwallet.com/travel/learn/what-does-travel-insurance-cover",
                    },
                    {
                        title: "How Travel Medical Insurance Works",
                        publisher: "NerdWallet",
                        href: "https://www.nerdwallet.com/travel/learn/travel-medical-insurance-emergency-coverage-travel-internationally",
                    },
                    {
                        title: "How Cancel For Any Reason Travel Insurance Works",
                        publisher: "NerdWallet",
                        href: "https://www.nerdwallet.com/travel/learn/cancel-for-any-reason-cfar-travel-insurance-explained",
                    },
                    {
                        title: "Travel Outside the U.S.",
                        publisher: "Medicare.gov",
                        href: "https://www.medicare.gov/coverage/travel-outside-the-u.s.",
                    },
                ]}
            />

            <RelatedDecisions
                currentSlug="is-travel-insurance-worth-it"
            />
        </GuideLayout>
    );
}