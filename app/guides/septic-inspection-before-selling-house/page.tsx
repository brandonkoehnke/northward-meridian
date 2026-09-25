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
import SepticSaleDecisionCheck from "./SepticSaleDecisionCheck";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "septic-inspection-before-selling-house",
    );

    if (!found) {
        throw new Error(
            "Guide not found: septic-inspection-before-selling-house",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "septic-check",
        label: "Pre-sale septic decision check",
    },
    {
        id: "why-inspect",
        label: "Why inspect before selling",
    },
    {
        id: "requirements",
        label: "Check local requirements first",
    },
    {
        id: "what-inspection-covers",
        label: "What an inspection can tell you",
    },
    {
        id: "when-useful",
        label: "When inspection becomes more useful",
    },
    {
        id: "when-less-useful",
        label: "When another inspection may add less",
    },
    {
        id: "warning-signs",
        label: "Warning signs",
    },
    {
        id: "records",
        label: "Gather your records",
    },
    {
        id: "failed-system",
        label: "If the system has a problem",
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
        id: "never-inspected",
        title: "I do not know when the system was last inspected",
        summary:
            "Determine whether reducing uncertainty before listing is worth the inspection.",
        guidance:
            "An unknown inspection history creates uncertainty for both you and a future buyer. Start by gathering maintenance records and checking whether your sale will require a specific inspection.",
        destinationId: "when-useful",
        destinationLabel: "When Inspection Becomes More Useful",
    },
    {
        id: "recent-inspection",
        title: "My septic system was recently inspected",
        summary:
            "Determine whether your existing documentation may already answer the important questions.",
        guidance:
            "A recent inspection and complete maintenance history may reduce the value of ordering another voluntary inspection, unless local rules or the transaction require a newer or differently scoped report.",
        destinationId: "when-less-useful",
        destinationLabel: "When Another Inspection May Add Less",
    },
    {
        id: "symptoms",
        title: "My septic system may have a problem",
        summary:
            "Treat symptoms as a system-condition question before treating them as a selling strategy.",
        guidance:
            "Backups, odors, slow drains, or unusually wet areas around the drainfield deserve professional evaluation. Identifying the actual problem is more useful than guessing how a buyer may react.",
        destinationId: "warning-signs",
        destinationLabel: "Warning Signs",
    },
    {
        id: "required",
        title: "I was told an inspection is required",
        summary:
            "Confirm exactly which rule or transaction requirement applies.",
        guidance:
            "Requirements can come from state or local government, a lender, or another part of the transaction. Confirm the required inspection type, timing, documentation, and who is responsible for arranging it.",
        destinationId: "requirements",
        destinationLabel: "Check Local Requirements First",
    },
    {
        id: "preparing",
        title: "I'm just preparing the house for sale",
        summary:
            "Decide whether learning the system's condition now would improve your sale preparation.",
        guidance:
            "Consider the age and maintenance history of the system, any warning signs, the quality of your records, and whether the sale will already trigger an inspection requirement.",
        destinationId: "septic-check",
        destinationLabel: "Pre-Sale Septic Decision Check",
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

export default function SepticInspectionBeforeSellingGuide() {
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
            <SepticSaleDecisionCheck />

            <WhyThisMatters id="why-inspect">
                <p>
                    A septic system is largely out of sight, which makes its condition
                    easy to ignore until a problem appears. During a home sale, that
                    uncertainty can become important because a buyer may want evidence
                    that the system is functioning and properly maintained.
                </p>

                <p>
                    Inspecting before listing can give the seller information before the
                    buyer&apos;s due diligence begins. That may provide time to gather
                    records, investigate a problem, obtain estimates, or decide how the
                    system&apos;s condition should be handled in the sale.
                </p>

                <p>
                    The purpose of a voluntary pre-sale inspection is therefore not to
                    guarantee that the property will sell without negotiation. It is to
                    replace uncertainty with better information when that information is
                    likely to affect your decisions.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="requirements"
                eyebrow="Requirements First"
                title="Before ordering an inspection, find out whether the transaction already requires one."
            >
                <p>
                    Septic inspection requirements are not uniform nationwide. Depending
                    on the property and transaction, requirements may come from state or
                    local government, a mortgage lender, or another applicable rule.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Check locally">
                        <ul className="space-y-3">
                            <GuideBullet>State environmental or health agency</GuideBullet>
                            <GuideBullet>County or municipal health department</GuideBullet>
                            <GuideBullet>Local property-transfer requirements</GuideBullet>
                            <GuideBullet>
                                Rules for repair permits or system certifications
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Check the transaction">
                        <ul className="space-y-3">
                            <GuideBullet>Buyer&apos;s loan program</GuideBullet>
                            <GuideBullet>Lender requirements</GuideBullet>
                            <GuideBullet>Purchase-contract requirements</GuideBullet>
                            <GuideBullet>
                                Whether an existing report satisfies the requirement
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Do not pay for a voluntary inspection first and assume it will
                    satisfy every later requirement. Confirm the required scope,
                    inspector qualifications, report age, and timing before scheduling
                    duplicate work.
                </p>
            </GuideSection>

            <GuideSection
                id="what-inspection-covers"
                eyebrow="What You Learn"
                title="A septic inspection can provide information that maintenance records alone cannot."
            >
                <p>
                    The exact scope varies, but a professional evaluation may consider
                    the system&apos;s records, physical components, evidence of leakage
                    or backup, and the condition of the treatment and dispersal areas.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Records and history">
                        <ul className="space-y-3">
                            <GuideBullet>System design or permit records</GuideBullet>
                            <GuideBullet>Pumping history</GuideBullet>
                            <GuideBullet>Maintenance and repair records</GuideBullet>
                            <GuideBullet>Previous inspection reports</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Physical condition">
                        <ul className="space-y-3">
                            <GuideBullet>Tank and accessible components</GuideBullet>
                            <GuideBullet>Sludge and scum levels where applicable</GuideBullet>
                            <GuideBullet>Signs of leakage or sewage backup</GuideBullet>
                            <GuideBullet>Drainfield condition</GuideBullet>
                            <GuideBullet>
                                Distribution components where accessible
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Inspection methods differ by system type and jurisdiction. Ask what
                    the inspector will evaluate before assuming that two inspection
                    quotes cover the same work.
                </p>
            </GuideSection>

            <GuideSection
                id="when-useful"
                eyebrow="When Inspection Becomes More Useful"
                title="A pre-sale inspection is most useful when it resolves meaningful uncertainty."
            >
                <p>
                    Inspection deserves closer consideration when several of these
                    conditions apply.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        You do not know when the system was last professionally inspected.
                    </GuideBullet>
                    <GuideBullet>
                        Maintenance or pumping records are incomplete.
                    </GuideBullet>
                    <GuideBullet>
                        The system is older and its condition is uncertain.
                    </GuideBullet>
                    <GuideBullet>
                        You have noticed slow drains, odors, backups, or wet areas near the
                        system.
                    </GuideBullet>
                    <GuideBullet>
                        You want time to investigate an issue before buyer due diligence.
                    </GuideBullet>
                    <GuideBullet>
                        A significant septic problem would materially affect your sale
                        strategy or available cash.
                    </GuideBullet>
                </ul>

                <p>
                    The value of inspecting early is primarily informational: you learn
                    about a potentially consequential property condition while you still
                    have time to decide what to do about it.
                </p>
            </GuideSection>

            <GuideSection
                id="when-less-useful"
                eyebrow="When Another Inspection May Add Less"
                title="Recent documentation can reduce the value of repeating a voluntary inspection."
            >
                <p>
                    Another pre-sale inspection may provide less incremental information
                    when the system has already been evaluated recently and the relevant
                    documentation is available.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Factors that reduce uncertainty
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>A recent professional inspection</GuideBullet>
                        <GuideBullet>Complete pumping and maintenance records</GuideBullet>
                        <GuideBullet>No known operating symptoms</GuideBullet>
                        <GuideBullet>Known system design and permit records</GuideBullet>
                        <GuideBullet>
                            Confirmation that the existing report remains acceptable for the
                            transaction
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    The key distinction is between having useful documentation and simply
                    assuming the system is fine because it has not caused an obvious
                    problem.
                </p>
            </GuideSection>

            <GuideSection
                id="warning-signs"
                eyebrow="System Warning Signs"
                title="Known symptoms should be investigated as septic problems, not just selling problems."
            >
                <p>
                    Certain symptoms deserve professional evaluation regardless of
                    whether you are preparing to sell.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Inside the home">
                        <ul className="space-y-3">
                            <GuideBullet>Slow or repeatedly clogged drains</GuideBullet>
                            <GuideBullet>Sewage backing up into plumbing fixtures</GuideBullet>
                            <GuideBullet>Persistent sewage odors</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Around the system">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Unusually wet or spongy areas near the drainfield
                            </GuideBullet>
                            <GuideBullet>Strong sewage odors outside</GuideBullet>
                            <GuideBullet>
                                Unusual vegetation growth over the dispersal area
                            </GuideBullet>
                            <GuideBullet>Visible surfacing wastewater</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If symptoms are present, the useful next step is identifying the
                    actual condition and repair scope. A generic pre-sale strategy cannot
                    substitute for a professional diagnosis.
                </p>
            </GuideSection>

            <GuideSection
                id="records"
                eyebrow="Create a Property Record"
                title="Good septic documentation can answer questions before they become negotiation problems."
            >
                <p>
                    Start gathering records before the property goes on the market,
                    whether or not you order another inspection.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Gather">
                        <ul className="space-y-3">
                            <GuideBullet>Original system permit or design</GuideBullet>
                            <GuideBullet>Pumping receipts</GuideBullet>
                            <GuideBullet>Maintenance records</GuideBullet>
                            <GuideBullet>Repair invoices</GuideBullet>
                            <GuideBullet>Previous inspection reports</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Document">
                        <ul className="space-y-3">
                            <GuideBullet>Approximate system age</GuideBullet>
                            <GuideBullet>Tank and system type if known</GuideBullet>
                            <GuideBullet>Location of system components</GuideBullet>
                            <GuideBullet>Known repairs or alterations</GuideBullet>
                            <GuideBullet>Current operating concerns</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Records do not prove that a system is currently functioning
                    correctly, but they give inspectors, buyers, and property
                    professionals a much clearer starting point.
                </p>
            </GuideSection>

            <GuideSection
                id="failed-system"
                eyebrow="If You Find a Problem"
                title="A failed inspection does not automatically answer who should repair the system."
            >
                <p>
                    If an inspection identifies a problem, the decision changes from
                    whether to inspect into how to handle a known property condition.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Investigate the scope">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Determine whether the issue is maintenance, repair, or system
                                failure
                            </GuideBullet>
                            <GuideBullet>Obtain written professional recommendations</GuideBullet>
                            <GuideBullet>Get realistic repair or replacement estimates</GuideBullet>
                            <GuideBullet>
                                Determine whether permits or approvals are required
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Then evaluate the sale">
                        <ul className="space-y-3">
                            <GuideBullet>Repair before listing</GuideBullet>
                            <GuideBullet>Adjust the price</GuideBullet>
                            <GuideBullet>
                                Negotiate an appropriate buyer credit where feasible
                            </GuideBullet>
                            <GuideBullet>
                                Consider how the condition affects financing or closing
                            </GuideBullet>
                            <GuideBullet>
                                Address applicable disclosure obligations
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Some septic failures can become regulatory, health, financing, or
                    habitability issues rather than ordinary cosmetic negotiations.
                    Follow the requirements that apply to the property rather than
                    assuming a credit can resolve every situation.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The value of inspecting before listing depends on what you already know."
            >
                <div className="space-y-6">
                    <InformationCard title="Older system with little documentation">
                        <p>
                            The seller has lived in the home for years but has incomplete
                            pumping records and no recent inspection. Learning the
                            system&apos;s condition before listing may be valuable because a
                            major finding could affect pricing, timing, or repair decisions.
                        </p>
                    </InformationCard>

                    <InformationCard title="Recently inspected and well documented">
                        <p>
                            The system was professionally inspected recently, pumping and
                            maintenance records are available, and no warning signs are
                            present. Another voluntary inspection may add relatively little
                            unless the transaction requires a newer or differently scoped
                            report.
                        </p>
                    </InformationCard>

                    <InformationCard title="Seller notices drainfield symptoms">
                        <p>
                            The seller notices persistent odors and wet soil around the
                            drainfield. The immediate question is no longer whether a
                            pre-sale inspection is worthwhile. The system needs professional
                            evaluation so the seller can understand the condition and
                            available remedies.
                        </p>
                    </InformationCard>

                    <InformationCard title="Local transfer inspection is required">
                        <p>
                            The seller learns that the jurisdiction requires a particular
                            septic inspection during property transfer. The seller should
                            follow that process rather than paying for an unrelated voluntary
                            inspection that may not satisfy the requirement.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You List"
                items={[
                    "Determine whether a septic inspection or certification is required for the sale.",
                    "Gather permits, system-design records, pumping receipts, and maintenance history.",
                    "Find the date and scope of the most recent professional inspection.",
                    "Note any backups, odors, slow drains, or drainfield concerns.",
                    "Confirm whether an existing inspection report is still acceptable.",
                    "If you inspect, understand exactly what the inspector will evaluate.",
                    "If a problem is found, obtain a written diagnosis and realistic repair estimates.",
                    "Discuss known conditions and applicable disclosure requirements with the appropriate property professional.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Scheduling an Inspection"
                subtitle="Know what information you need before paying for duplicate or unnecessary work."
                questions={[
                    "Is a septic inspection required for this property transfer?",
                    "Who is qualified or authorized to perform the required inspection?",
                    "Will my existing inspection report satisfy the requirement?",
                    "What components will the inspector evaluate?",
                    "Does the tank need to be pumped or uncovered for the inspection?",
                    "What records should I provide to the inspector?",
                    "What happens if the system does not pass the applicable inspection?",
                    "Would a known septic issue affect the likely buyer's financing or closing process?",
                    "What permits or approvals would be required for a repair or replacement?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A pre-sale septic inspection is most useful when it reduces meaningful uncertainty about the system before buyer due diligence.",
                    "Inspection and property-transfer requirements vary by jurisdiction and transaction, so check the applicable rules first.",
                    "A recent professional inspection and complete maintenance history may reduce the value of repeating voluntary work.",
                    "Backups, odors, slow drains, and drainfield symptoms deserve professional evaluation rather than a generic selling strategy.",
                    "Gather permits, pumping history, maintenance records, repair invoices, and previous inspection reports before listing.",
                    "If an inspection identifies a problem, determine the actual repair scope before deciding how to handle it in the sale.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Frequent Questions on Septic Systems",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/septic/frequent-questions-septic-systems",
                    },
                    {
                        title: "A Homebuyer's Guide to Septic Systems",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TCQ1.txt",
                    },
                    {
                        title: "How to Care for Your Septic System",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/septic/how-care-your-septic-system",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="septic-inspection-before-selling-house" />
        </GuideLayout>
    );
}