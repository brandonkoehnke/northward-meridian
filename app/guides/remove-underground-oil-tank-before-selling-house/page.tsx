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
import UndergroundOilTankSaleCheck from "@/app/components/article/UndergroundOilTankSaleCheck";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "remove-underground-oil-tank-before-selling-house",
    );

    if (!found) {
        throw new Error(
            "Guide not found: remove-underground-oil-tank-before-selling-house",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "tank-check",
        label: "Pre-sale underground tank check",
    },
    {
        id: "what-it-is",
        label: "What counts as an underground oil tank",
    },
    {
        id: "known-vs-suspected",
        label: "Known vs. suspected tanks",
    },
    {
        id: "why-concern",
        label: "Why sellers get concerned",
    },
    {
        id: "options",
        label: "Your options",
    },
    {
        id: "when-investigate",
        label: "When investigation makes sense",
    },
    {
        id: "when-remove",
        label: "When removal deserves consideration",
    },
    {
        id: "leak",
        label: "If the tank leaked",
    },
    {
        id: "requirements",
        label: "Federal vs. state and local rules",
    },
    {
        id: "transaction",
        label: "Insurance, financing, and buyer concerns",
    },
    {
        id: "documentation",
        label: "What documentation matters",
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
        id: "suspected",
        title: "I think there may be an old tank",
        summary:
            "Confirm what is on the property before planning excavation or removal.",
        guidance:
            "Old fill pipes, vent pipes, heating records, or property history can create a reasonable suspicion, but suspicion is not confirmation. Start with records and an appropriate investigation.",
        destinationId: "known-vs-suspected",
        destinationLabel: "Known vs. Suspected Tanks",
    },
    {
        id: "abandoned",
        title: "I know there is an abandoned tank",
        summary:
            "Understand when removal or another approved closure process may deserve attention.",
        guidance:
            "Confirm the tank's status, documentation, local requirements, and whether there is evidence of leakage before choosing between removal and any permitted alternative.",
        destinationId: "when-remove",
        destinationLabel: "When Removal Deserves Consideration",
    },
    {
        id: "active",
        title: "I have an active underground tank",
        summary:
            "Separate ordinary pre-sale preparation from an active heating-oil system.",
        guidance:
            "An active tank is different from an abandoned tank. Focus on its current use, condition, applicable rules, and the timing of any planned heating-system change.",
        destinationId: "options",
        destinationLabel: "Your Options",
    },
    {
        id: "leak",
        title: "I found evidence of a leak",
        summary:
            "Treat a possible release as an environmental issue before treating it as a normal sale negotiation.",
        guidance:
            "Possible contamination can trigger investigation, reporting, cleanup, or other requirements. Obtain appropriately qualified professional guidance before deciding how to address the sale.",
        destinationId: "leak",
        destinationLabel: "If the Tank Leaked",
    },
    {
        id: "preparing",
        title: "I'm preparing to sell",
        summary:
            "Determine whether investigating the tank now would reduce a meaningful transaction risk.",
        guidance:
            "Start by determining whether the tank is confirmed, whether useful records exist, and what your local jurisdiction and transaction require.",
        destinationId: "tank-check",
        destinationLabel: "Pre-Sale Underground Tank Check",
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

export default function RemoveUndergroundOilTankBeforeSellingGuide() {
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
            <UndergroundOilTankSaleCheck />

            <WhyThisMatters id="what-it-is">
                <p>
                    An underground heating-oil tank is a storage tank installed below
                    grade to supply fuel to a heating system. Older properties may have
                    tanks that are still active, tanks that were abandoned when the
                    heating system changed, or tanks that are only suspected based on
                    older records or visible piping.
                </p>

                <p>
                    The practical problem for a seller is that an underground tank is
                    difficult to evaluate from the surface alone. A tank may be perfectly
                    serviceable, may require an approved closure or removal process, or
                    may have environmental concerns that require a completely different
                    response.
                </p>

                <p>
                    That is why the first question should be what is actually present and
                    what condition or regulatory status it has—not whether every old
                    property automatically needs excavation before sale.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="known-vs-suspected"
                eyebrow="Start With What You Know"
                title="A suspected tank and a known abandoned tank are different decisions."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Suspected tank">
                        <ul className="space-y-3">
                            <GuideBullet>Old fill or vent piping</GuideBullet>
                            <GuideBullet>Historical oil-heating records</GuideBullet>
                            <GuideBullet>Older property documents or photographs</GuideBullet>
                            <GuideBullet>
                                No confirmed tank location or documentation
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Known tank">
                        <ul className="space-y-3">
                            <GuideBullet>Tank location is established</GuideBullet>
                            <GuideBullet>Tank status is known</GuideBullet>
                            <GuideBullet>Existing removal or closure records</GuideBullet>
                            <GuideBullet>
                                Known installation or maintenance history
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    When a tank is only suspected, an appropriate detection or records
                    investigation can prevent an expensive project based on an incorrect
                    assumption. When a tank is confirmed, the decision becomes one of
                    status, condition, requirements, documentation, and transaction
                    timing.
                </p>
            </GuideSection>

            <GuideSection
                id="why-concern"
                eyebrow="Why Sellers Care"
                title="The concern is usually uncertainty—and the possibility of an expensive problem."
            >
                <p>
                    An underground oil tank can matter to a sale for several different
                    reasons. A buyer may want to know whether the tank exists, whether it
                    is active or abandoned, whether it was properly closed or removed,
                    and whether there is evidence of a release.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Property concerns">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Tank condition and remaining service life
                            </GuideBullet>
                            <GuideBullet>
                                Access for inspection or removal
                            </GuideBullet>
                            <GuideBullet>
                                Historical heating-system changes
                            </GuideBullet>
                            <GuideBullet>
                                Existing records and documentation
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Transaction concerns">
                        <ul className="space-y-3">
                            <GuideBullet>Buyer due diligence</GuideBullet>
                            <GuideBullet>Property-transfer requirements</GuideBullet>
                            <GuideBullet>Insurance or financing questions</GuideBullet>
                            <GuideBullet>
                                Environmental concerns if a release occurred
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    These concerns are not interchangeable. A buyer asking whether a tank
                    exists is a different issue from a known release or contamination
                    problem.
                </p>
            </GuideSection>

            <GuideSection
                id="options"
                eyebrow="Your Options"
                title="Removal is only one of several possible paths."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="1. Investigate first">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Confirm whether a suspected tank is present
                            </GuideBullet>
                            <GuideBullet>
                                Identify its location and status
                            </GuideBullet>
                            <GuideBullet>
                                Determine what records already exist
                            </GuideBullet>
                            <GuideBullet>
                                Avoid excavation based solely on an unverified assumption
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="2. Remove the tank">
                        <ul className="space-y-3">
                            <GuideBullet>Can eliminate the tank from the property</GuideBullet>
                            <GuideBullet>
                                May simplify future buyer questions
                            </GuideBullet>
                            <GuideBullet>
                                Requires appropriate excavation and disposal procedures
                            </GuideBullet>
                            <GuideBullet>
                                May require documentation, permits, or inspections
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="3. Document an approved closure">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Some jurisdictions may permit closure in place under specified
                                conditions
                            </GuideBullet>
                            <GuideBullet>
                                Documentation becomes particularly important
                            </GuideBullet>
                            <GuideBullet>
                                Requirements vary by location and tank circumstances
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="4. Address an environmental problem">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Investigate suspected leakage or contamination
                            </GuideBullet>
                            <GuideBullet>
                                Follow applicable reporting and cleanup requirements
                            </GuideBullet>
                            <GuideBullet>
                                Obtain appropriate environmental professional guidance
                            </GuideBullet>
                            <GuideBullet>
                                Treat this separately from an ordinary tank-removal decision
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-investigate"
                eyebrow="When Investigation Makes Sense"
                title="Investigate when the uncertainty itself could affect the sale."
            >
                <ul className="space-y-4">
                    <GuideBullet>
                        You have evidence that an old tank may still be present.
                    </GuideBullet>
                    <GuideBullet>
                        The property changed from oil heat to another heating system and
                        the old tank status is unclear.
                    </GuideBullet>
                    <GuideBullet>
                        You do not have reliable removal or closure documentation.
                    </GuideBullet>
                    <GuideBullet>
                        A buyer, inspector, lender, or insurer has raised a tank question.
                    </GuideBullet>
                    <GuideBullet>
                        The property is in an area where tank requirements are important to
                        the transaction.
                    </GuideBullet>
                    <GuideBullet>
                        There is enough lead time to investigate before listing.
                    </GuideBullet>
                </ul>

                <p>
                    The value of early investigation is that it gives the seller time to
                    understand the condition and requirements before a buyer is making
                    decisions under contract.
                </p>
            </GuideSection>

            <GuideSection
                id="when-remove"
                eyebrow="When Removal Deserves Consideration"
                title="A known abandoned tank with weak documentation deserves closer attention."
            >
                <p>
                    Removal becomes more compelling when the tank is confirmed, no longer
                    needed, documentation is poor, and applicable rules or transaction
                    requirements make the remaining tank a meaningful concern.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Questions to answer first
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            Is the tank still active or permanently out of service?
                        </GuideBullet>
                        <GuideBullet>
                            What does local law require for an unused tank?
                        </GuideBullet>
                        <GuideBullet>
                            Is removal required, or is another approved closure method
                            permitted?
                        </GuideBullet>
                        <GuideBullet>
                            What documentation will the transaction need?
                        </GuideBullet>
                        <GuideBullet>
                            Is there evidence suggesting a release?
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    Do not choose removal solely because it feels cleaner for the sale.
                    Compare the actual requirement, tank status, environmental risk, and
                    transaction timeline.
                </p>
            </GuideSection>

            <GuideSection
                id="leak"
                eyebrow="Environmental Issue"
                title="A possible release changes the problem completely."
            >
                <p>
                    If a tank has leaked, the issue may extend beyond the tank itself.
                    Petroleum released into soil or groundwater can create environmental
                    and property concerns that require professional investigation and,
                    depending on the circumstances, cleanup or reporting.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Potential indicators">
                        <ul className="space-y-3">
                            <GuideBullet>Documented tank leakage</GuideBullet>
                            <GuideBullet>Petroleum odor or stained soil</GuideBullet>
                            <GuideBullet>
                                Environmental testing indicating petroleum impacts
                            </GuideBullet>
                            <GuideBullet>Previous remediation records</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="What to do">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Obtain appropriately qualified environmental guidance
                            </GuideBullet>
                            <GuideBullet>
                                Determine what local and state requirements apply
                            </GuideBullet>
                            <GuideBullet>Preserve existing records</GuideBullet>
                            <GuideBullet>
                                Do not assume a routine buyer credit resolves the issue
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    EPA explains that releases from underground storage tanks can affect
                    soil and groundwater. Residential heating-oil tanks used to heat the
                    property are excluded from the federal underground-storage-tank
                    regulatory program, so applicable state and local rules matter.
                </p>
            </GuideSection>

            <GuideSection
                id="requirements"
                eyebrow="Rules Vary"
                title="Federal rules do not provide one universal answer for residential heating-oil tanks."
            >
                <p>
                    Federal EPA regulations for underground storage tanks do not apply to
                    certain residential heating-oil tanks used to heat the premises.
                    That does not mean the tank is unregulated. State and local
                    authorities can have their own requirements for tanks, closures,
                    releases, reporting, and property transfers.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Check government requirements">
                        <ul className="space-y-3">
                            <GuideBullet>State environmental agency</GuideBullet>
                            <GuideBullet>County or municipal requirements</GuideBullet>
                            <GuideBullet>Tank closure or removal requirements</GuideBullet>
                            <GuideBullet>
                                Release reporting or cleanup requirements
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Check the transaction">
                        <ul className="space-y-3">
                            <GuideBullet>Purchase-contract requirements</GuideBullet>
                            <GuideBullet>Buyer inspection requirements</GuideBullet>
                            <GuideBullet>Lender requirements</GuideBullet>
                            <GuideBullet>Insurance requirements</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The important point is not memorizing one nationwide rule. It is
                    confirming the rules that apply to the specific property and
                    transaction before committing to a costly project.
                </p>
            </GuideSection>

            <GuideSection
                id="transaction"
                eyebrow="Transaction Considerations"
                title="A tank can affect a transaction without automatically preventing one."
            >
                <p>
                    Buyers, lenders, and insurers can ask different questions about the
                    same property. One may care about documentation, another about
                    environmental risk, and another about the current condition of the
                    heating system.
                </p>

                <p>
                    Do not assume that an underground oil tank automatically makes a home
                    uninsurable, unfinanceable, or unsellable. Those outcomes depend on
                    the actual property, condition, transaction, and applicable
                    requirements.
                </p>

                <p>
                    Likewise, do not assume that a buyer will ignore an undocumented
                    abandoned tank just because no visible problem exists. Good records
                    can materially reduce uncertainty.
                </p>
            </GuideSection>

            <GuideSection
                id="documentation"
                eyebrow="Create Evidence"
                title="The best time to assemble tank documentation is before you need it."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Gather">
                        <ul className="space-y-3">
                            <GuideBullet>Heating-system records</GuideBullet>
                            <GuideBullet>Tank installation records</GuideBullet>
                            <GuideBullet>Removal or closure records</GuideBullet>
                            <GuideBullet>Inspection or sweep reports</GuideBullet>
                            <GuideBullet>
                                Environmental testing or remediation records
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Document">
                        <ul className="space-y-3">
                            <GuideBullet>Tank location if confirmed</GuideBullet>
                            <GuideBullet>
                                Active, abandoned, or removed status
                            </GuideBullet>
                            <GuideBullet>
                                Approximate tank size or installation information if known
                            </GuideBullet>
                            <GuideBullet>Relevant contractor names and dates</GuideBullet>
                            <GuideBullet>
                                Applicable approvals, permits, or certifications
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    If work is completed before listing, keep the invoices, reports,
                    photographs, and final documentation together so your agent and buyer
                    can review a coherent record rather than reconstructing the history
                    from memory.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The same old fill pipe can lead to very different decisions."
            >
                <div className="space-y-6">
                    <InformationCard title="Old piping suggests a tank, but no tank is confirmed">
                        <p>
                            The seller sees old fuel-related piping near the house but has no
                            records showing whether an underground tank remains. An
                            appropriate investigation is more useful than immediately
                            excavating the property.
                        </p>
                    </InformationCard>

                    <InformationCard title="Known abandoned tank with good records">
                        <p>
                            The tank was removed or properly closed in the past, and the
                            seller has documentation establishing what happened. The first
                            step is confirming that the records satisfy the current
                            transaction rather than assuming the property needs another
                            project.
                        </p>
                    </InformationCard>

                    <InformationCard title="Known abandoned tank with no documentation">
                        <p>
                            The seller knows an old tank exists but cannot establish its
                            status or closure history. Investigating the tank and local
                            requirements may substantially reduce uncertainty before the
                            property is listed.
                        </p>
                    </InformationCard>

                    <InformationCard title="Possible release or contamination">
                        <p>
                            Soil staining and petroleum odor raise a possible environmental
                            concern. The seller obtains qualified environmental guidance
                            instead of treating the situation as a simple pre-sale
                            landscaping or excavation decision.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You List"
                items={[
                    "Determine whether an underground heating-oil tank is confirmed or only suspected.",
                    "Gather heating, tank, removal, closure, and inspection records.",
                    "Determine whether the tank is active, abandoned, or previously removed.",
                    "Check state and local requirements before scheduling removal or closure work.",
                    "Determine whether any lender, insurer, buyer, or contract requirement applies.",
                    "Investigate any evidence of leakage or contamination separately.",
                    "Obtain written estimates for investigation or removal where appropriate.",
                    "Keep documentation for any tank work completed before listing.",
                    "Discuss known material conditions and applicable disclosure requirements with the appropriate property professional.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before Removing the Tank"
                subtitle="Confirm the status and requirements before committing to excavation."
                questions={[
                    "Is the tank confirmed, or is its presence only suspected?",
                    "Is the tank active, abandoned, or already removed?",
                    "What documentation exists for the tank?",
                    "What does the local jurisdiction require?",
                    "Is removal required, or is another approved closure method available?",
                    "What exactly will the investigation or removal contractor do?",
                    "What documentation will I receive when the work is complete?",
                    "Is there evidence that the tank has leaked?",
                    "Would the transaction require any particular inspection, report, or certification?",
                    "Are there insurance or financing considerations specific to this property?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Do not excavate simply because an old tank is suspected. Establish what is actually present first.",
                    "Known active, known abandoned, suspected, and previously removed tanks are different situations.",
                    "Federal EPA underground-storage-tank rules do not provide one universal residential heating-oil-tank requirement; state and local rules matter.",
                    "A known abandoned tank with weak documentation may deserve investigation or removal consideration before listing.",
                    "Evidence of leakage or contamination turns the issue into an environmental matter that should be evaluated separately.",
                    "Good tank, closure, removal, inspection, and remediation records can reduce uncertainty during a sale.",
                    "Verify the actual transaction requirements rather than assuming that a tank automatically prevents financing, insurance, or a sale.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Frequent Questions About Underground Storage Tanks",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/ust/frequent-questions-about-underground-storage-tanks",
                    },
                    {
                        title: "Releases from Underground Storage Tanks",
                        publisher: "U.S. Environmental Protection Agency",
                        href: "https://www.epa.gov/ust/releases-underground-storage-tanks",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="remove-underground-oil-tank-before-selling-house" />
        </GuideLayout>
    );
}