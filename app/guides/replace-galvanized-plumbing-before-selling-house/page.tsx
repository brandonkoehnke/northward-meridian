import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GalvanizedPlumbingSaleCheck from "@/app/components/article/GalvanizedPlumbingSaleCheck";
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
    "https://northwardmeridian.com/guides/replace-galvanized-plumbing-before-selling-house";

const guide: Guide = {
    title: "Should I Replace Galvanized Plumbing Before Selling My House?",
    category: "Home",
    description:
        "A practical framework for deciding whether to repipe, repair, offer a credit, or sell a house with galvanized plumbing as-is.",
    updated: "September 2026",
    readingTime: "10 min",
    recommendedFor:
        "Homeowners preparing to sell an older house that still has some or all of its galvanized water-supply plumbing.",
    bottomLine:
        "Galvanized plumbing does not automatically need to be replaced simply because you are selling. A full repipe becomes more compelling when there are widespread condition problems such as poor flow, repeated leaks, visible corrosion, or other documented deficiencies. When the plumbing remains functional, repair, documentation, a buyer credit, or selling with the condition appropriately addressed may be more practical. Identify what piping remains and get its condition assessed before deciding.",
    learningObjectives: [
        "Distinguish galvanized plumbing age from actual plumbing condition",
        "Compare repiping, localized repair, buyer credit, and selling without a pre-sale repipe",
        "Separate interior galvanized plumbing from the water service line",
        "Understand why drinking-water concerns should be evaluated separately from the home-sale decision",
    ],
    tags: [
        "galvanized plumbing",
        "selling a house",
        "repiping",
        "home selling",
        "plumbing",
    ],
};

const guideSections = [
    {
        id: "plumbing-check",
        label: "Pre-sale plumbing check",
    },
    {
        id: "what-it-is",
        label: "What galvanized plumbing is",
    },
    {
        id: "condition-vs-age",
        label: "Condition matters more than age",
    },
    {
        id: "four-options",
        label: "Your four options",
    },
    {
        id: "warning-signs",
        label: "Signs that deserve assessment",
    },
    {
        id: "service-line",
        label: "Interior plumbing vs. service line",
    },
    {
        id: "lead-water",
        label: "Lead and drinking water",
    },
    {
        id: "economics",
        label: "Compare the economics",
    },
    {
        id: "transaction",
        label: "Inspection and transaction issues",
    },
    {
        id: "documentation",
        label: "What to document",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Before you list",
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
        id: "low-flow",
        title: "My water pressure or flow is poor",
        summary:
            "Determine whether the problem appears localized or could reflect broader restriction in the plumbing.",
        guidance:
            "Poor flow can have several causes. Identify how much galvanized plumbing remains and have the actual cause assessed before assuming a complete repipe is necessary.",
        destinationId: "warning-signs",
        destinationLabel: "Signs That Deserve Assessment",
    },
    {
        id: "leaks",
        title: "My galvanized pipes keep leaking",
        summary:
            "Repeated failures can change the economics of repairing versus repiping.",
        guidance:
            "A history of repeated leaks can indicate a broader condition problem. Document where failures have occurred and have a plumber assess whether localized repairs remain reasonable.",
        destinationId: "plumbing-check",
        destinationLabel: "Pre-Sale Plumbing Check",
    },
    {
        id: "still-galvanized",
        title: "My house still has galvanized plumbing",
        summary:
            "Separate the existence of galvanized pipe from evidence that the system is failing.",
        guidance:
            "Galvanized material alone does not tell you the current condition of the system. Determine what remains, whether it is functional, and whether there are signs of corrosion or restriction.",
        destinationId: "condition-vs-age",
        destinationLabel: "Condition vs. Age",
    },
    {
        id: "inspector",
        title: "An inspector flagged the plumbing",
        summary:
            "Find out exactly what was observed before committing to a complete repipe.",
        guidance:
            "Ask whether the concern is the pipe material itself, visible deterioration, leakage, poor flow, or another defect. Then obtain an appropriate plumbing assessment and written estimates.",
        destinationId: "transaction",
        destinationLabel: "Inspection and Transaction Issues",
    },
    {
        id: "preparing",
        title: "I'm preparing the house for sale",
        summary:
            "Compare the cost of repiping with repair, documentation, and buyer-credit alternatives.",
        guidance:
            "Start by identifying the plumbing materials and condition. Then compare the actual repipe cost with the likely effect of leaving the plumbing for the buyer.",
        destinationId: "four-options",
        destinationLabel: "Your Four Options",
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

export default function GalvanizedPlumbingBeforeSellingGuide() {
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
            <GalvanizedPlumbingSaleCheck />

            <WhyThisMatters id="what-it-is">
                <p>
                    Galvanized steel was widely used for residential water-supply piping
                    in older homes. Over time, steel piping can corrode internally and
                    externally, which can contribute to restriction, deterioration, or
                    leakage.
                </p>

                <p>
                    Finding galvanized plumbing in a house therefore deserves attention,
                    but the material alone does not establish the condition of every
                    section of pipe or prove that a complete repipe is immediately
                    necessary.
                </p>

                <p>
                    For a seller, the useful questions are how much galvanized plumbing
                    remains, what condition it is in, whether it is causing functional
                    problems, and how those facts are likely to affect the transaction.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="condition-vs-age"
                eyebrow="Condition vs. Age"
                title="The age of the plumbing is a reason to investigate, not a replacement order."
            >
                <p>
                    Older galvanized plumbing deserves closer evaluation because
                    corrosion develops over time. But age alone cannot tell you how
                    restricted, deteriorated, or serviceable the piping in a particular
                    house is.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="More reassuring signs">
                        <ul className="space-y-3">
                            <GuideBullet>Normal flow at multiple fixtures</GuideBullet>
                            <GuideBullet>No history of repeated leaks</GuideBullet>
                            <GuideBullet>No obvious exterior corrosion</GuideBullet>
                            <GuideBullet>
                                Only a limited amount of galvanized piping remains
                            </GuideBullet>
                            <GuideBullet>
                                Condition has been evaluated by a qualified plumber
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Reasons to investigate further">
                        <ul className="space-y-3">
                            <GuideBullet>Poor flow at multiple fixtures</GuideBullet>
                            <GuideBullet>Repeated pipe failures or leaks</GuideBullet>
                            <GuideBullet>Visible corrosion</GuideBullet>
                            <GuideBullet>Rust-colored or discolored water</GuideBullet>
                            <GuideBullet>
                                A substantial amount of galvanized piping remains
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    These observations still do not substitute for a plumbing
                    assessment. They help identify when obtaining one is especially
                    useful before committing to a major pre-sale project.
                </p>
            </GuideSection>

            <GuideSection
                id="four-options"
                eyebrow="Your Options"
                title="A full repipe is only one way to handle galvanized plumbing before a sale."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="1. Repipe before selling">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Addresses widespread deteriorated supply piping
                            </GuideBullet>
                            <GuideBullet>
                                Can remove a significant buyer concern
                            </GuideBullet>
                            <GuideBullet>
                                Provides documentation of newly installed piping
                            </GuideBullet>
                            <GuideBullet>
                                Requires substantial upfront cash and project coordination
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="2. Repair or partially replace">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Can address an isolated failure or limited problem
                            </GuideBullet>
                            <GuideBullet>
                                Costs less than a complete repipe in many situations
                            </GuideBullet>
                            <GuideBullet>
                                May be reasonable when the broader system remains serviceable
                            </GuideBullet>
                            <GuideBullet>
                                Should address the actual defect rather than simply mask a
                                broader problem
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="3. Offer a credit or adjust the price">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Leaves the project and material choices to the buyer
                            </GuideBullet>
                            <GuideBullet>
                                Preserves the seller&apos;s pre-sale cash
                            </GuideBullet>
                            <GuideBullet>
                                Can be compared with the cost of completing the work yourself
                            </GuideBullet>
                            <GuideBullet>
                                May not resolve every lender, insurer, or property-condition
                                concern
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="4. Sell without a pre-sale repipe">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Avoids undertaking a major project before listing
                            </GuideBullet>
                            <GuideBullet>
                                May be reasonable when the system remains functional
                            </GuideBullet>
                            <GuideBullet>
                                Buyers may still factor future replacement into their offers
                            </GuideBullet>
                            <GuideBullet>
                                Known material conditions still need to be handled
                                appropriately
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="warning-signs"
                eyebrow="Condition Indicators"
                title="Certain symptoms make a professional plumbing assessment more valuable."
            >
                <p>
                    The more symptoms that appear across the system, the less useful it
                    becomes to make the decision based only on pipe age or a generic
                    repiping estimate.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Weak flow at several fixtures rather than one faucet or shower.
                    </GuideBullet>
                    <GuideBullet>
                        Repeated leaks occurring in different sections of galvanized pipe.
                    </GuideBullet>
                    <GuideBullet>
                        Significant visible corrosion on accessible piping.
                    </GuideBullet>
                    <GuideBullet>
                        Rust-colored or persistently discolored water.
                    </GuideBullet>
                    <GuideBullet>
                        Prior repairs that have replaced multiple failed galvanized
                        sections.
                    </GuideBullet>
                </ul>

                <p>
                    A plumber can help distinguish a localized fixture, valve, or pipe
                    problem from broader deterioration that changes the case for
                    repiping.
                </p>
            </GuideSection>

            <GuideSection
                id="service-line"
                eyebrow="Do Not Confuse the Two"
                title="Interior galvanized plumbing and a galvanized service line are different questions."
            >
                <p>
                    The plumbing inside the house distributes water from the point where
                    the service enters the building. The service line carries water from
                    the public water system or other source to the home.
                </p>

                <p>
                    A house can therefore have galvanized plumbing inside while having a
                    different service-line material, or vice versa. Replacing the
                    interior plumbing does not automatically replace or resolve the
                    service line.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Interior plumbing">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Pipes distributing water throughout the house
                            </GuideBullet>
                            <GuideBullet>
                                Evaluated as part of the home&apos;s plumbing system
                            </GuideBullet>
                            <GuideBullet>
                                Can be partially or completely repiped
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Water service line">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Connects the building to the water supply
                            </GuideBullet>
                            <GuideBullet>
                                Material should be identified separately
                            </GuideBullet>
                            <GuideBullet>
                                Utility ownership and responsibility can vary
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If the service-line material is unknown, contact the water utility or
                    appropriate local professional to determine how it can be identified.
                </p>
            </GuideSection>

            <GuideSection
                id="lead-water"
                eyebrow="Drinking Water"
                title="Galvanized steel is not the same thing as lead pipe, but lead can still be relevant."
            >
                <p>
                    The U.S. Environmental Protection Agency explains that lead particles
                    can attach to the surface of galvanized pipes and later enter
                    drinking water. This is one reason galvanized plumbing can be
                    relevant when evaluating lead exposure.
                </p>

                <p>
                    That does not mean the presence of galvanized steel proves that the
                    water contains unsafe lead levels. If you are concerned about the
                    water in a particular home, testing the water provides more useful
                    information than assuming a result from the pipe material alone.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Keep these questions separate
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            What material is the interior supply plumbing?
                        </GuideBullet>
                        <GuideBullet>
                            What material is the water service line?
                        </GuideBullet>
                        <GuideBullet>
                            What condition is the plumbing in?
                        </GuideBullet>
                        <GuideBullet>
                            Does drinking-water testing identify a lead concern?
                        </GuideBullet>
                    </ul>
                </div>
            </GuideSection>

            <GuideSection
                id="economics"
                eyebrow="Compare the Economics"
                title="Compare the cost of repiping with the cost of leaving the project for the buyer."
            >
                <p>
                    A repiping quote tells you what the project may cost. It does not tell
                    you whether spending that money before listing produces an equivalent
                    improvement in sale price or transaction certainty.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="If you repipe">
                        <ul className="space-y-3">
                            <GuideBullet>Plumbing contract</GuideBullet>
                            <GuideBullet>Wall and ceiling access</GuideBullet>
                            <GuideBullet>Drywall or finish repairs</GuideBullet>
                            <GuideBullet>Permits where required</GuideBullet>
                            <GuideBullet>Project time and disruption</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="If you do not repipe">
                        <ul className="space-y-3">
                            <GuideBullet>Potential buyer credit</GuideBullet>
                            <GuideBullet>Possible price adjustment</GuideBullet>
                            <GuideBullet>Buyer inspection negotiations</GuideBullet>
                            <GuideBullet>Possible reduction in buyer interest</GuideBullet>
                            <GuideBullet>
                                Transaction-specific insurance or financing concerns
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Get written estimates even if you expect to leave the plumbing for
                    the buyer. Knowing the realistic repair and repipe costs gives you
                    better information for pricing and negotiations.
                </p>
            </GuideSection>

            <GuideSection
                id="transaction"
                eyebrow="Transaction Considerations"
                title="An inspection finding should identify the problem before it dictates the solution."
            >
                <p>
                    A home inspector may identify galvanized plumbing, visible
                    deterioration, leakage, weak flow, or another condition. Those are
                    not necessarily equivalent findings.
                </p>

                <p>
                    If the plumbing becomes important to financing, insurance, or
                    marketability, verify the requirement for the actual transaction.
                    Requirements can vary by lender, insurer, location, property
                    condition, and loan program.
                </p>

                <p>
                    Do not assume that the existence of galvanized plumbing automatically
                    makes a home uninsurable or unfinanceable. Likewise, do not assume
                    that a buyer will ignore it simply because the system is currently
                    functioning.
                </p>
            </GuideSection>

            <GuideSection
                id="documentation"
                eyebrow="Create Evidence"
                title="Document what plumbing remains and what work has already been completed."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Gather">
                        <ul className="space-y-3">
                            <GuideBullet>Previous plumbing invoices</GuideBullet>
                            <GuideBullet>Repiping records</GuideBullet>
                            <GuideBullet>Leak-repair history</GuideBullet>
                            <GuideBullet>Plumbing inspection reports</GuideBullet>
                            <GuideBullet>Water-quality test results if available</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Document">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Approximate extent of remaining galvanized pipe
                            </GuideBullet>
                            <GuideBullet>Known replacement materials</GuideBullet>
                            <GuideBullet>Location of recent repairs</GuideBullet>
                            <GuideBullet>Current functional concerns</GuideBullet>
                            <GuideBullet>Service-line material if known</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Documentation cannot turn deteriorated plumbing into good plumbing,
                    but it can help a buyer, inspector, plumber, and agent understand what
                    is actually present rather than making assumptions about the entire
                    system.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same pipe material can lead to very different pre-sale decisions."
            >
                <div className="space-y-6">
                    <InformationCard title="Galvanized remains, but no broad symptoms">
                        <p>
                            The home still contains some galvanized supply piping, but flow
                            is normal, there is no repeated leak history, and a plumber does
                            not identify a broad failure. A complete pre-sale repipe may not
                            be the only reasonable strategy. Documentation and realistic
                            estimates can help frame the issue for the sale.
                        </p>
                    </InformationCard>

                    <InformationCard title="Poor flow and repeated leaks">
                        <p>
                            Much of the home remains galvanized, several fixtures have poor
                            flow, and multiple sections have leaked over time. A full repipe
                            deserves serious consideration because the problem appears
                            broader than one isolated defect.
                        </p>
                    </InformationCard>

                    <InformationCard title="Inspector identifies galvanized plumbing">
                        <p>
                            The inspection report notes the pipe material but does not
                            establish widespread failure. The seller obtains a plumber&apos;s
                            assessment and repipe estimate before deciding whether to
                            complete the work or handle the issue through the transaction.
                        </p>
                    </InformationCard>

                    <InformationCard title="Seller cannot comfortably fund a repipe">
                        <p>
                            The plumbing will eventually need substantial work, but a repipe
                            would consume cash needed for the move. The seller compares a
                            buyer credit or pricing strategy with the likely effect on buyer
                            interest rather than assuming the project must be completed
                            before listing.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You List"
                items={[
                    "Identify how much galvanized supply plumbing remains.",
                    "Get a professional assessment if the condition is uncertain.",
                    "Document repeated leaks, low-flow areas, corrosion, or other symptoms.",
                    "Obtain a localized repair estimate where appropriate.",
                    "Obtain a full repipe estimate if repiping is a realistic option.",
                    "Verify the water service-line material separately.",
                    "Consider drinking-water testing if lead exposure is a concern.",
                    "Compare repiping with a buyer credit or price adjustment.",
                    "Gather invoices and records for previous plumbing work.",
                    "Discuss known conditions and applicable disclosure requirements with the appropriate property professional.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before You Repipe"
                subtitle="Understand the condition and project scope before committing to a major pre-sale expense."
                questions={[
                    "How much galvanized supply plumbing remains in the house?",
                    "Is the current problem localized or evidence of broader deterioration?",
                    "What is causing the poor flow or discoloration?",
                    "Would a localized repair leave the remaining system serviceable?",
                    "What exactly is included in the full repipe quote?",
                    "Are drywall, finish repairs, permits, and cleanup included?",
                    "What material would replace the galvanized piping?",
                    "What is the material of the water service line?",
                    "How might the existing plumbing affect buyers in this market?",
                    "Would a buyer credit be practical for this transaction?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "The existence or age of galvanized plumbing alone does not determine whether a full pre-sale repipe is warranted.",
                    "Poor flow, repeated leaks, visible corrosion, and widespread symptoms make a professional plumbing assessment more important.",
                    "Repiping, localized repair, buyer credit, and selling without a pre-sale repipe can all be legitimate strategies depending on the condition and transaction.",
                    "Interior galvanized plumbing and the water service line are separate components and should be identified separately.",
                    "Galvanized steel is not the same thing as lead pipe, but EPA notes that lead particles can attach to galvanized pipe surfaces and later enter drinking water.",
                    "If lead exposure is a concern, evaluate the actual drinking water rather than assuming the result from pipe material alone.",
                    "Get realistic repair and repipe estimates before deciding, even if you expect the buyer to handle the future work.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Sources of Lead in Drinking Water",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/ground-water-and-drinking-water/sources-lead-drinking-water-text-only",
                    },
                    {
                        title: "Know Your Plumbing",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/system/files/documents/2025-01/know-your-plumbing-factsheet_508.pdf",
                    },
                    {
                        title: "Lead and Copper Rule Improvements: Questions and Answers",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/ground-water-and-drinking-water/lcri-questions-and-answers",
                    },
                    {
                        title: "Consumer Guide: Preparing to Sell Your Home",
                        publisher: "National Association of REALTORS®",
                        href: "https://www.nar.realtor/the-facts/consumer-guide-preparing-to-sell-your-home",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="replace-galvanized-plumbing-before-selling-house" />
        </GuideLayout>
    );
}