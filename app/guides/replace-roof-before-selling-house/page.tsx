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
import RoofSaleDecisionCheck from "@/app/components/article/RoofSaleDecisionCheck";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "replace-roof-before-selling-house",
    );

    if (!found) {
        throw new Error(
            "Guide not found: replace-roof-before-selling-house",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "roof-check",
        label: "Pre-sale roof decision check",
    },
    {
        id: "age-vs-condition",
        label: "Age vs. condition",
    },
    {
        id: "four-options",
        label: "Your four options",
    },
    {
        id: "when-replace",
        label: "When replacement becomes more compelling",
    },
    {
        id: "when-repair",
        label: "When repair may be enough",
    },
    {
        id: "math",
        label: "Compare the economics",
    },
    {
        id: "inspection-insurance",
        label: "Inspection, insurance, and financing",
    },
    {
        id: "document",
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
        id: "leaking",
        title: "My roof is leaking",
        summary:
            "Determine whether you need a repair, broader assessment, or replacement before listing.",
        guidance:
            "Start by determining whether the leak is localized and repairable or evidence of broader deterioration. Do not use roof age alone to determine the answer.",
        destinationId: "roof-check",
        destinationLabel: "Pre-Sale Roof Decision Check",
    },
    {
        id: "old",
        title: "My roof is just old",
        summary:
            "Separate the age of the roof from its current condition and remaining serviceability.",
        guidance:
            "An older roof deserves closer inspection, but age is a screening factor rather than a diagnosis. Get a condition assessment before spending thousands on replacement.",
        destinationId: "age-vs-condition",
        destinationLabel: "Age vs. Condition",
    },
    {
        id: "inspection",
        title: "An inspector flagged my roof",
        summary:
            "Understand what an inspection finding means for your options as a seller.",
        guidance:
            "An inspection finding does not automatically mean you need a full replacement. Determine the actual defect, likely repair cost, and how a buyer is likely to treat the issue.",
        destinationId: "inspection-insurance",
        destinationLabel: "Inspection, Insurance, and Financing",
    },
    {
        id: "quote",
        title: "I received a replacement quote",
        summary:
            "Compare the replacement quote with repair and buyer-credit alternatives.",
        guidance:
            "A replacement quote tells you the cost of replacement, not whether replacement creates enough additional value or reduces enough negotiation risk to justify doing it before listing.",
        destinationId: "math",
        destinationLabel: "Compare the Economics",
    },
    {
        id: "preparing",
        title: "I'm preparing to sell",
        summary:
            "Use the framework to decide what roof work is worth doing before the house goes on the market.",
        guidance:
            "Consider the roof alongside your listing timeline, available cash, expected buyer pool, inspection risk, and other repairs competing for the same budget.",
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

export default function ReplaceRoofBeforeSellingGuide() {
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
            <RoofSaleDecisionCheck />

            <WhyThisMatters id="age-vs-condition">
                <p>
                    Roof age matters because roofing materials have finite service lives,
                    but age alone does not tell you whether a roof needs replacement.
                    Condition, material, installation quality, maintenance, weather
                    exposure, and the nature of the current problem all matter.
                </p>

                <p>
                    That distinction is especially important when selling. Replacing a
                    roof is a major capital expense, so the relevant question is whether
                    the work solves a meaningful problem in the sale rather than simply
                    whether the roof is old.
                </p>

                <p>
                    The National Association of REALTORS® recommends determining what a
                    significant repair such as a roof will cost even when a seller does
                    not plan to make the repair. Those estimates can help sellers
                    anticipate what buyers may consider during negotiations.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="four-options"
                eyebrow="Your Options"
                title="Replacing the roof is only one of four reasonable strategies."
            >
                <p>
                    Sellers often frame the decision as replace versus do nothing. A
                    better framework includes four distinct choices.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="1. Replace the roof">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Addresses broad deterioration or major defects
                            </GuideBullet>
                            <GuideBullet>
                                May reduce buyer concern and future negotiation
                            </GuideBullet>
                            <GuideBullet>
                                Creates a new roof with transferable documentation and
                                warranty information
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="2. Repair the roof">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Makes sense when damage is localized and the roof remains
                                serviceable
                            </GuideBullet>
                            <GuideBullet>
                                Preserves more of the seller&apos;s cash
                            </GuideBullet>
                            <GuideBullet>
                                Can be paired with documentation from a qualified roofer
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="3. Offer a credit or adjust the price">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Transfers the repair decision to the buyer
                            </GuideBullet>
                            <GuideBullet>
                                May be easier than coordinating replacement before listing
                            </GuideBullet>
                            <GuideBullet>
                                Lets the buyer choose the contractor and materials
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="4. Sell as-is">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Avoids spending money before sale
                            </GuideBullet>
                            <GuideBullet>
                                May narrow the buyer pool or increase negotiation pressure
                            </GuideBullet>
                            <GuideBullet>
                                Still requires appropriate disclosure of known material
                                conditions
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-replace"
                eyebrow="When Replacement Becomes More Compelling"
                title="Replacement becomes more reasonable when the roof creates a larger transaction problem."
            >
                <p>
                    Replacement deserves closer consideration when several of these
                    conditions are present at the same time.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        The roof has widespread deterioration rather than one isolated
                        defect.
                    </GuideBullet>
                    <GuideBullet>
                        There are active leaks, significant missing or damaged roofing, or
                        other conditions that undermine weather-tightness.
                    </GuideBullet>
                    <GuideBullet>
                        A qualified professional recommends replacement rather than
                        localized repair.
                    </GuideBullet>
                    <GuideBullet>
                        Your likely buyers are particularly sensitive to the roof condition
                        or may have difficulty obtaining acceptable financing or insurance.
                    </GuideBullet>
                    <GuideBullet>
                        You have enough time and cash to complete the work without creating
                        a rushed project immediately before listing.
                    </GuideBullet>
                    <GuideBullet>
                        A new roof addresses a problem that would otherwise become the
                        central negotiation issue.
                    </GuideBullet>
                </ul>

                <p>
                    NAR&apos;s seller guidance specifically identifies roofs as a
                    significant repair for which sellers should establish the likely
                    cost, even if they do not ultimately perform the work.
                </p>
            </GuideSection>

            <GuideSection
                id="when-repair"
                eyebrow="When Repair May Be Enough"
                title="A serviceable roof does not necessarily need to become a new roof before listing."
            >
                <p>
                    Repair may be the more appropriate strategy when the underlying roof
                    is still serviceable and the problem is limited.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Signs to investigate
                    </p>

                    <ul className="mt-5 space-y-3">
                        <GuideBullet>
                            One or a few localized leaks
                        </GuideBullet>
                        <GuideBullet>
                            Limited storm damage
                        </GuideBullet>
                        <GuideBullet>
                            A damaged flashing or penetration that can be repaired
                        </GuideBullet>
                        <GuideBullet>
                            A small number of missing or damaged shingles
                        </GuideBullet>
                        <GuideBullet>
                            Good overall roof condition confirmed by a qualified roofer
                        </GuideBullet>
                    </ul>
                </div>

                <p>
                    Current 2026 national cost estimates put professional roof repair at
                    about $1,173 on average, compared with about $9,609 for replacement,
                    although actual costs vary widely with the roof, materials,
                    accessibility, and location.
                </p>

                <p>
                    The numbers are useful for framing the decision, not for estimating
                    your specific property. A local written assessment and quote are much
                    more informative.
                </p>
            </GuideSection>

            <GuideSection
                id="math"
                eyebrow="Compare the Economics"
                title="The useful comparison is replacement cost versus the cost of leaving the problem for the buyer."
            >
                <p>
                    A $10,000 replacement is not automatically justified because buyers
                    dislike old roofs. The relevant comparison includes what happens if
                    you do not replace it.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Cost if you replace">
                        <ul className="space-y-3">
                            <GuideBullet>Replacement contract</GuideBullet>
                            <GuideBullet>Old-roof removal and disposal</GuideBullet>
                            <GuideBullet>Permits or inspections where required</GuideBullet>
                            <GuideBullet>Financing or opportunity cost of cash</GuideBullet>
                            <GuideBullet>Time and risk of completing the project</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Cost if you do not replace">
                        <ul className="space-y-3">
                            <GuideBullet>Potential buyer credit</GuideBullet>
                            <GuideBullet>Possible reduction in sale price</GuideBullet>
                            <GuideBullet>Longer time on market</GuideBullet>
                            <GuideBullet>Fewer interested buyers</GuideBullet>
                            <GuideBullet>Inspection-related renegotiation</GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    The challenge is that the second column is uncertain. A seller
                    generally cannot know in advance exactly what buyers will demand.
                    That is why condition evidence, comparable listings, your agent&apos;s
                    market knowledge, and realistic contractor estimates matter more than
                    a simple rule of thumb.
                </p>
            </GuideSection>

            <GuideSection
                id="inspection-insurance"
                eyebrow="Transaction Risk"
                title="Inspections, insurance, and financing can change the practical decision."
            >
                <p>
                    A roof issue can affect more than the seller&apos;s repair budget.
                    Buyers may discover problems during their inspection and use those
                    findings in negotiations. NAR notes that a pre-sale inspection can
                    give sellers time to identify and address issues before a buyer does.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Inspection">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Identifies visible roof deficiencies
                            </GuideBullet>
                            <GuideBullet>
                                Gives the seller advance information
                            </GuideBullet>
                            <GuideBullet>
                                Can reduce surprises during buyer negotiations
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Insurance and financing">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Roof condition can matter to some insurers
                            </GuideBullet>
                            <GuideBullet>
                                An aging or damaged roof can become relevant to a buyer&apos;s
                                financing and insurance process
                            </GuideBullet>
                            <GuideBullet>
                                Requirements vary by insurer, lender, location, and property
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Do not assume that a particular roof age automatically prevents
                    insurance or financing. Those requirements vary. When the issue is
                    material to the transaction, have the buyer, insurer, lender, or
                    listing professional confirm the applicable requirement.
                </p>
            </GuideSection>

            <GuideSection
                id="document"
                eyebrow="Create Evidence"
                title="Good documentation can make a repair more valuable without increasing the repair itself."
            >
                <p>
                    Whether you repair or replace the roof, preserve the evidence of what
                    you did.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Keep">
                        <ul className="space-y-3">
                            <GuideBullet>Written contractor assessment</GuideBullet>
                            <GuideBullet>Detailed estimates and invoices</GuideBullet>
                            <GuideBullet>Before-and-after photographs</GuideBullet>
                            <GuideBullet>Material specifications</GuideBullet>
                            <GuideBullet>Warranty documentation</GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Discuss with your agent">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Known material roof defects
                            </GuideBullet>
                            <GuideBullet>
                                Completed repairs and supporting documentation
                            </GuideBullet>
                            <GuideBullet>
                                Whether a pre-sale inspection makes sense
                            </GuideBullet>
                            <GuideBullet>
                                Applicable seller-disclosure requirements
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>

                <p>
                    Seller-disclosure rules are state-specific. NAR notes that sellers
                    generally have disclosure obligations for material property
                    conditions and recommends consulting the appropriate real estate
                    professional regarding the law where the property is located.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Real-World Scenarios"
                title="The right strategy depends on what the roof problem is doing to the transaction."
            >
                <div className="space-y-6">
                    <InformationCard title="Localized leak on an otherwise serviceable roof">
                        <p>
                            A roofer identifies one damaged flashing area and expects a
                            straightforward repair. Replacing the entire roof may add a
                            substantial expense without solving a broader transaction
                            problem. Repair, documentation, and disclosure discussions may be
                            more appropriate.
                        </p>
                    </InformationCard>

                    <InformationCard title="Widespread deterioration before listing">
                        <p>
                            The roof has multiple problem areas, the roofer recommends
                            replacement, and the seller has enough time to complete the
                            project. Replacement deserves serious consideration because
                            leaving the roof unresolved could shift the issue directly into
                            buyer negotiations.
                        </p>
                    </InformationCard>

                    <InformationCard title="Seller has limited cash">
                        <p>
                            The roof needs attention but a full replacement would consume
                            money needed for other sale preparations or the next home. A
                            repair or well-documented buyer credit may preserve more financial
                            flexibility.
                        </p>
                    </InformationCard>

                    <InformationCard title="Pre-sale inspection finds roof concerns">
                        <p>
                            The seller now has objective information before listing. That can
                            be used to obtain repair or replacement estimates, discuss the
                            issue with the listing agent, and choose a pricing or repair
                            strategy with fewer surprises.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You List"
                items={[
                    "Get a professional assessment of the roof condition.",
                    "Obtain a written repair estimate.",
                    "Obtain a replacement estimate if replacement is a realistic option.",
                    "Ask how the roof condition is likely to affect buyers in your market.",
                    "Consider whether a pre-sale inspection would provide useful information.",
                    "Compare replacement cost with the likely cost of a buyer credit or price adjustment.",
                    "Keep invoices, photographs, warranties, and contractor documentation.",
                    "Discuss known material conditions and disclosure requirements with your listing professional.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask Before You Spend the Money"
                subtitle="Get the facts before committing to a major pre-sale project."
                questions={[
                    "Does the roof need replacement, or is the problem localized and repairable?",
                    "How much useful service life does the roofer expect to remain?",
                    "What would a complete repair cost?",
                    "What would a complete replacement cost?",
                    "What problems would remain after the repair?",
                    "What warranty and documentation would I receive after the work?",
                    "How might the roof condition affect buyers or negotiations in this market?",
                    "Would a buyer likely prefer a credit and choose their own contractor?",
                    "Are there any known insurance or financing issues that could affect prospective buyers?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "Roof age is a screening factor, not a diagnosis. Condition and remaining serviceability matter.",
                    "Replacing, repairing, offering a credit, and selling as-is are all legitimate strategies.",
                    "Get both repair and replacement costs before deciding, even if you think you will not replace the roof.",
                    "The economics depend partly on what buyers are likely to do with the roof issue during negotiation.",
                    "A pre-sale inspection can give sellers information before buyer inspections and negotiations.",
                    "Document completed work carefully and discuss disclosure requirements with the appropriate real estate professional.",
                    "A new roof is a major project. Do it because it solves a meaningful transaction or property problem, not simply because the roof is old.",
                ]}
            />

            <Sources
                sources={[
                    {
                        title: "Consumer Guide: Preparing to Sell Your Home",
                        publisher: "National Association of REALTORS®",
                        href: "https://www.nar.realtor/the-facts/consumer-guide-preparing-to-sell-your-home",
                    },
                    {
                        title: "Consumer Guide: Home Inspections",
                        publisher: "National Association of REALTORS®",
                        href: "https://www.nar.realtor/the-facts/consumer-guide-home-inspections",
                    },
                    {
                        title: "Consumer Guide: Seller Disclosures",
                        publisher: "National Association of REALTORS®",
                        href: "https://www.nar.realtor/the-facts/consumer-guide-seller-disclosures",
                    },
                    {
                        title: "How Much Does Roof Repair Cost? [2026 Data]",
                        publisher: "Angi",
                        href: "https://www.angi.com/articles/how-much-do-roof-repairs-cost.htm",
                    },
                    {
                        title: "How Much Does Roof Replacement Cost? [2026 Data]",
                        publisher: "Angi",
                        href: "https://www.angi.com/articles/how-much-does-roof-replacement-cost.htm",
                    },
                ]}
            />

            <RelatedDecisions currentSlug="replace-roof-before-selling-house" />
        </GuideLayout>
    );
}