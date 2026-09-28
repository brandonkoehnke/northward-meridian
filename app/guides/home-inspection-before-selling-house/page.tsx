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

import PreListingInspectionDecisionCheck from "./PreListingInspectionDecisionCheck";

import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "home-inspection-before-selling-house",
    );

    if (!found) {
        throw new Error(
            "Guide not found: home-inspection-before-selling-house",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "pre-listing-inspection-decision-check",
        label: "Pre-listing inspection decision check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-inspection-can-do",
        label: "What an inspection can tell you",
    },
    {
        id: "what-inspection-cannot-do",
        label: "What an inspection cannot tell you",
    },
    {
        id: "when-information-value-high",
        label: "When information has more value",
    },
    {
        id: "repair-price-disclosure",
        label: "Repair, price, or document",
    },
    {
        id: "disclosure",
        label: "Disclosure implications",
    },
    {
        id: "targeted-evaluation",
        label: "When a targeted evaluation fits better",
    },
    {
        id: "cost-and-timing",
        label: "Cost and timing",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Before you order an inspection",
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
        id: "selling-soon",
        title: "I am listing soon",
        summary:
            "Think through whether discovering problems before listing would change what you can still control.",
        guidance:
            "The value of earlier information tends to increase when you have time to repair, investigate, document, or price around findings before buyers are negotiating over them.",
        destinationId:
            "pre-listing-inspection-decision-check",
        destinationLabel: "Run the Decision Check",
    },
    {
        id: "unknown-condition",
        title: "I am not sure what condition the house is in",
        summary:
            "Separate general uncertainty from a known problem that may need a specialist.",
        guidance:
            "A broad inspection can provide useful information about readily accessible systems and components, but it is not an exhaustive search for concealed defects.",
        destinationId: "what-inspection-can-do",
        destinationLabel: "What an Inspection Can Tell You",
    },
    {
        id: "known-problem",
        title: "I already know about a specific problem",
        summary:
            "Consider whether a targeted evaluation would answer the question more directly.",
        guidance:
            "A known roof, septic, structural, electrical, plumbing, or HVAC concern may call for a qualified specialist rather than another broad inspection.",
        destinationId: "targeted-evaluation",
        destinationLabel: "Targeted Evaluations",
    },
    {
        id: "recent-inspection",
        title: "I already have a recent inspection",
        summary:
            "Evaluate whether a new inspection would add meaningful information.",
        guidance:
            "A recent inspection can reduce the incremental value of another broad inspection unless conditions have changed or important concerns remain unresolved.",
        destinationId: "when-information-value-high",
        destinationLabel: "When Information Has More Value",
    },
    {
        id: "as-is",
        title: "I am selling as-is",
        summary:
            "Selling as-is does not make the information question disappear.",
        guidance:
            "You may still value an inspection for pricing, planning, documentation, or understanding the issues buyers are likely to raise. Disclosure requirements can still apply.",
        destinationId: "repair-price-disclosure",
        destinationLabel: "Repair, Price, or Document",
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
        publishedTime: "2026-09-28",
        modifiedTime: "2026-09-28",
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
    datePublished: "2026-09-28",
    dateModified: "2026-09-28",
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

export default function HomeInspectionBeforeSellingHouseGuide() {
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
                <GuidedEntry scenarios={guidedEntryScenarios} />
            }
        >
            <PreListingInspectionDecisionCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    You do not generally need to have a home inspection before
                    listing a property. The more useful question is whether
                    learning more about the property <strong>before</strong>{" "}
                    listing would change something you can still control.
                    NAR&apos;s current seller guidance describes a pre-sale
                    inspection as optional and notes that it can help identify
                    potential issues before showings, give the seller time to
                    consider repairs, and inform the asking-price decision.
                </p>

                <p>
                    That makes a pre-listing inspection primarily an
                    information decision, not a universal preparation step. A
                    seller with an older house, little recent condition
                    information, unresolved concerns, and time to act may get
                    substantial value from learning more. A seller with a
                    recent inspection, few known issues, and no intention of
                    changing the plan may get less incremental value from
                    another broad inspection.
                </p>

                <p>
                    The result also depends on what kind of uncertainty you
                    have. A general inspection can review many readily
                    accessible systems and components. A known concern about a
                    roof, septic system, structural condition, electrical
                    system, plumbing, or HVAC may be better answered by a
                    qualified specialist.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-inspection-can-do"
                eyebrow="What You Learn"
                title="A pre-listing inspection can turn uncertainty into a more concrete list of issues."
            >
                <p>
                    A professional home inspection can provide a broad review of
                    the home&apos;s condition before buyers begin doing their own
                    due diligence. NAR describes pre-sale inspections as a way
                    to identify potential issues that sellers can consider
                    repairing before showing the property and to prepare for
                    conditions that may come up during a buyer&apos;s inspection.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Information that can help">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Identify potentially significant deficiencies
                            </GuideBullet>
                            <GuideBullet>
                                Surface issues you may not have noticed
                            </GuideBullet>
                            <GuideBullet>
                                Prioritize repairs or specialist evaluations
                            </GuideBullet>
                            <GuideBullet>
                                Support a more informed pricing strategy
                            </GuideBullet>
                            <GuideBullet>
                                Prepare for issues buyers may raise later
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Why timing matters">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You can obtain estimates before negotiations begin
                            </GuideBullet>
                            <GuideBullet>
                                You can decide whether to repair or leave the issue in place
                            </GuideBullet>
                            <GuideBullet>
                                You can organize records and documentation
                            </GuideBullet>
                            <GuideBullet>
                                You may have more control over the sequence of work
                            </GuideBullet>
                            <GuideBullet>
                                You can account for known conditions in the sale strategy
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The practical advantage is often not that the inspection
                    makes the house “good.” It is that you learn about
                    potential problems while you still have time and options.
                </p>
            </GuideSection>

            <GuideSection
                id="what-inspection-cannot-do"
                eyebrow="Inspection Limits"
                title="A home inspection is useful information, not a guarantee that every defect will be found."
            >
                <p>
                    ASHI&apos;s current Standard of Practice describes a home
                    inspection as an examination of readily accessible,
                    visually observable, installed systems and components. It
                    also sets specific exclusions and limits on what an
                    inspector is required to determine.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="What it may identify">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Visible deficiencies in inspected systems
                            </GuideBullet>
                            <GuideBullet>
                                Conditions that appear unsafe or significantly deficient
                            </GuideBullet>
                            <GuideBullet>
                                Items that warrant monitoring or further evaluation
                            </GuideBullet>
                            <GuideBullet>
                                Components that were inspected and documented in the report
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="What it does not guarantee">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Discovery of concealed or inaccessible conditions
                            </GuideBullet>
                            <GuideBullet>
                                Prediction of future system failures
                            </GuideBullet>
                            <GuideBullet>
                                Engineering or architectural analysis
                            </GuideBullet>
                            <GuideBullet>
                                Exact repair methods or repair costs
                            </GuideBullet>
                            <GuideBullet>
                                Compliance with every code, law, or regulation
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    That limitation matters when interpreting the report. A
                    finding that says a component needs further evaluation is
                    not the same thing as a diagnosis or a contractor proposal.
                    ASHI specifically identifies further evaluation as work
                    beyond the scope of a standard home inspection.
                </p>
            </GuideSection>

            <GuideSection
                id="when-information-value-high"
                eyebrow="Decision Value"
                title="The inspection becomes more valuable when the information can still change your plan."
            >
                <p>
                    A useful way to think about a pre-listing inspection is as
                    an information purchase. The inspection costs money, but
                    the information can be useful when it changes a decision
                    that would otherwise be made with less certainty.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="More information value">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You do not have a recent inspection
                            </GuideBullet>
                            <GuideBullet>
                                You have unresolved or unexplained concerns
                            </GuideBullet>
                            <GuideBullet>
                                You would repair or investigate material findings
                            </GuideBullet>
                            <GuideBullet>
                                Avoiding a late surprise matters to you
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Situational value">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You have some condition uncertainty
                            </GuideBullet>
                            <GuideBullet>
                                You might adjust pricing or sale strategy
                            </GuideBullet>
                            <GuideBullet>
                                You want better information before listing
                            </GuideBullet>
                            <GuideBullet>
                                The house has a history of repairs
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Less incremental value">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You already have recent inspection information
                            </GuideBullet>
                            <GuideBullet>
                                No meaningful warning signs are present
                            </GuideBullet>
                            <GuideBullet>
                                You do not expect new findings to change anything
                            </GuideBullet>
                            <GuideBullet>
                                Your primary goal is reassurance rather than action
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The point is not to treat an inspection as inherently good
                    or bad. It is to ask whether the information has enough
                    practical value to justify its cost and the consequences
                    of learning it.
                </p>
            </GuideSection>

            <GuideSection
                id="repair-price-disclosure"
                eyebrow="After the Inspection"
                title="A finding does not leave you with only one possible response."
            >
                <p>
                    Once you know about an issue, the useful next step depends
                    on the condition, the cost, the timing of the sale, and how
                    you plan to position the property. NAR&apos;s seller guidance
                    recommends establishing likely repair costs even when the
                    seller does not plan to complete the repair.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Repair it">
                        <p>
                            This can make sense when the issue is clear, the
                            repair is practical, and addressing it before
                            listing is likely to improve the home&apos;s condition
                            or reduce a predictable negotiation issue.
                        </p>
                    </InformationCard>

                    <InformationCard title="Price around it">
                        <p>
                            You may decide that the repair does not justify the
                            cost or time. A realistic estimate can still help
                            you account for the issue in your pricing and sale
                            strategy.
                        </p>
                    </InformationCard>

                    <InformationCard title="Document and disclose">
                        <p>
                            Some issues may remain unresolved. In that case,
                            preserve the report, estimates, invoices, and other
                            relevant records and determine what must be
                            disclosed under the rules that apply to your sale.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    Buyers may still perform their own inspection. A pre-listing
                    inspection therefore does not eliminate buyer due
                    diligence. It changes the timing of when the seller learns
                    about potential issues.
                </p>
            </GuideSection>

            <GuideSection
                id="disclosure"
                eyebrow="Disclosure"
                title="Learning about a defect can create an important disclosure question."
            >
                <p>
                    Disclosure obligations are not uniform across the United
                    States. They vary by state and transaction, and specific
                    rules can apply to particular property conditions.
                    Northward Meridian therefore does not treat a pre-listing
                    inspection as a generic way to “avoid” or “solve”
                    disclosure obligations.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        What to verify
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            Which seller disclosures are required in your jurisdiction
                        </GuideBullet>
                        <GuideBullet>
                            Whether the transaction has special disclosure rules
                        </GuideBullet>
                        <GuideBullet>
                            Whether known or newly discovered conditions must be reported
                        </GuideBullet>
                        <GuideBullet>
                            Whether completed repairs change the disclosure treatment
                        </GuideBullet>
                        <GuideBullet>
                            Whether your agent or attorney recommends providing inspection documentation
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    For example, New York&apos;s current Property Condition Disclosure
                    Statement instructs sellers to answer based on their actual
                    knowledge and states that the disclosure form is not a
                    substitute for inspections. Federal law separately imposes
                    lead-based-paint disclosure requirements on most housing
                    built before 1978. These examples illustrate why a national
                    guide should not collapse every disclosure rule into one
                    formula.
                </p>

                <p>
                    The practical rule is simple: before ordering an inspection
                    for a property about to be sold, understand what receiving
                    new information could mean for your disclosure obligations.
                </p>
            </GuideSection>

            <GuideSection
                id="targeted-evaluation"
                eyebrow="Use the Right Professional"
                title="A broad inspection is not always the most direct answer."
            >
                <p>
                    If the uncertainty is concentrated in one system, a
                    specialist may be able to answer the decision more directly.
                    A standard home inspector can identify conditions that
                    warrant further evaluation, but the follow-up professional
                    may be the person who can diagnose the issue and provide the
                    repair information you need.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Examples">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Roof concern → qualified roofing professional
                            </GuideBullet>
                            <GuideBullet>
                                Septic concern → septic professional
                            </GuideBullet>
                            <GuideBullet>
                                Structural concern → qualified structural professional
                            </GuideBullet>
                            <GuideBullet>
                                Electrical concern → licensed electrician where required
                            </GuideBullet>
                            <GuideBullet>
                                Plumbing concern → qualified plumbing professional
                            </GuideBullet>
                            <GuideBullet>
                                HVAC concern → qualified HVAC professional
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Why this can matter">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You already know where the uncertainty lies
                            </GuideBullet>
                            <GuideBullet>
                                A diagnosis matters more than a broad screening
                            </GuideBullet>
                            <GuideBullet>
                                You need a repair estimate or specific recommendation
                            </GuideBullet>
                            <GuideBullet>
                                The issue is outside the practical scope of a general inspection
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If you have both broad uncertainty and a known major
                    concern, it can be reasonable to consider both paths. The
                    important thing is not to pay for two evaluations that
                    answer essentially the same question without a clear
                    reason.
                </p>
            </GuideSection>

            <GuideSection
                id="cost-and-timing"
                eyebrow="Cost and Timing"
                title="The inspection cost is only one part of the decision."
            >
                <p>
                    Inspection prices vary by property size, location, scope,
                    and additional services. NAR notes that inspection costs
                    vary and that additional tests can change the total.
                    Rather than treating a national average as your decision
                    threshold, compare the actual quote with the value of the
                    information you expect to receive.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Costs to consider">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Inspection fee
                            </GuideBullet>
                            <GuideBullet>
                                Optional specialist tests or inspections
                            </GuideBullet>
                            <GuideBullet>
                                Follow-up evaluations
                            </GuideBullet>
                            <GuideBullet>
                                Repairs you choose to make
                            </GuideBullet>
                            <GuideBullet>
                                Time and disruption from pre-listing work
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Value you may receive">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Earlier knowledge of potential defects
                            </GuideBullet>
                            <GuideBullet>
                                More time to obtain competing estimates
                            </GuideBullet>
                            <GuideBullet>
                                Better preparation for buyer questions
                            </GuideBullet>
                            <GuideBullet>
                                More informed pricing and sale planning
                            </GuideBullet>
                            <GuideBullet>
                                Better organization of repair documentation
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The inspection is often easiest to justify when time has
                    real value. A seller who can investigate and act before
                    listing has more options than a seller who discovers a
                    material issue after accepting an offer.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same inspection can have very different value for different sellers."
            >
                <div className="space-y-6">
                    <InformationCard title="Older home with limited recent information">
                        <p>
                            The seller has owned the property for many years,
                            has no recent whole-home inspection, and has noticed
                            several unresolved concerns. They intend to obtain
                            estimates and make decisions before listing. The
                            information is likely to have meaningful practical
                            value because there are both uncertainties and
                            planned uses for the findings.
                        </p>
                    </InformationCard>

                    <InformationCard title="House recently inspected with no meaningful concerns">
                        <p>
                            The seller has a recent report, has not noticed new
                            warning signs, and does not expect a new inspection
                            to change the sale plan. Another broad inspection
                            may still provide reassurance, but its incremental
                            decision value is lower.
                        </p>
                    </InformationCard>

                    <InformationCard title="Known roof problem">
                        <p>
                            The seller already knows the roof is questionable
                            and wants a repair estimate before listing. A
                            qualified roofing professional may provide more
                            actionable information than relying on a general
                            inspection to answer a roof-specific question.
                        </p>
                    </InformationCard>

                    <InformationCard title="As-is seller with strong disclosure discipline">
                        <p>
                            The seller does not intend to make repairs but wants
                            to understand the home&apos;s condition, document known
                            issues, and prepare for buyer questions. The
                            inspection may still provide useful information,
                            but the seller should understand applicable
                            disclosure requirements before ordering it.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Order an Inspection"
                items={[
                    "Ask whether learning about new problems would change anything you can still control before listing.",
                    "Check whether you already have a recent whole-home inspection or useful specialist reports.",
                    "Identify known warning signs before choosing a broad inspection.",
                    "Decide in advance how you would respond to a significant finding: repair, investigate further, change the pricing strategy, document it, or leave it unresolved.",
                    "Ask what the inspection scope includes and what it specifically excludes.",
                    "Verify whether additional specialist tests are likely to be needed.",
                    "Understand the disclosure rules that apply where the property is being sold.",
                    "Preserve the inspection report, photographs, estimates, invoices, and other relevant documentation.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Hiring an Inspector"
                subtitle="The goal is to understand what information you will receive and how useful it will be for your particular sale."
                questions={[
                    "What standards of practice do you use for the inspection?",
                    "What systems and components are included in the scope?",
                    "What important components or conditions are excluded?",
                    "Which issues would cause you to recommend further evaluation by a specialist?",
                    "Do you provide a written report with photographs?",
                    "What additional testing or specialist services might be appropriate for this property?",
                    "How do you document items that were inaccessible or not inspected?",
                    "Can you explain the difference between a visible deficiency and a condition requiring further evaluation?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A pre-listing home inspection is optional in the general U.S. selling process; its value depends on what the information can change before listing.",
                    "The strongest case for an inspection combines meaningful uncertainty with a realistic plan to use the findings.",
                    "A recent inspection and low uncertainty can reduce the incremental value of another broad inspection.",
                    "A standard inspection is not an exhaustive search for concealed defects and does not guarantee future performance.",
                    "Known system-specific concerns may be better addressed with a qualified specialist.",
                    "An inspection can help inform repairs, pricing, documentation, and preparation for buyer questions.",
                    "Learning about a condition can affect disclosure obligations, which vary by jurisdiction.",
                    "The most useful question is not simply whether you should inspect, but whether earlier information is worth paying for in your particular sale.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Consumer Guide: Preparing to Sell Your Home",
                        publisher:
                            "National Association of REALTORS®",
                        href:
                            "https://www.nar.realtor/the-facts/consumer-guide-preparing-to-sell-your-home",
                    },
                    {
                        title: "Consumer Guide: Seller Disclosures",
                        publisher:
                            "National Association of REALTORS®",
                        href:
                            "https://www.nar.realtor/the-facts/consumer-guide-seller-disclosures",
                    },
                    {
                        title: "Standard of Practice",
                        publisher:
                            "American Society of Home Inspectors",
                        href:
                            "https://www.homeinspector.org/resources/standard-of-practice/",
                    },
                    {
                        title: "Property Condition Disclosure Statement",
                        publisher:
                            "New York State Department of State",
                        href:
                            "https://dos.ny.gov/system/files/documents/2025/05/dos-1614-f-property-condition-disclosure-statement_04.2025-eff.-07.2025.pdf",
                    },
                    {
                        title:
                            "Lead-Based Paint Disclosure Rule (Section 1018 of Title X)",
                        publisher: "U.S. Environmental Protection Agency",
                        href:
                            "https://www.epa.gov/lead/lead-based-paint-disclosure-rule-section-1018-title-x",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="home-inspection-before-selling-house" />
        </GuideLayout>
    );
}