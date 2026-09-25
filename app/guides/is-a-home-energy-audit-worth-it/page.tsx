import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import {
    GuideBullet,
    InformationCard,
} from "@/app/components/article/GuidePrimitives";
import HomeEnergyAuditValueCheck from "./HomeEnergyAuditValueCheck";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "is-a-home-energy-audit-worth-it",
    );

    if (!found) {
        throw new Error(
            "Guide not found: is-a-home-energy-audit-worth-it",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "home-energy-audit-value-check",
        label: "Home energy audit value check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-an-audit-buys",
        label: "What an audit buys",
    },
    {
        id: "diy-first",
        label: "When DIY investigation may be enough",
    },
    {
        id: "professional-diagnosis",
        label: "When professional diagnosis becomes valuable",
    },
    {
        id: "audit-vs-project",
        label: "Audit cost vs. project cost",
    },
    {
        id: "audit-vs-energy-spending",
        label: "Audit cost vs. annual energy spending",
    },
    {
        id: "required-savings",
        label: "Savings required to recover the audit cost",
    },
    {
        id: "why-no-guaranteed-savings",
        label: "Why an audit cannot promise savings",
    },
    {
        id: "comfort-vs-bills",
        label: "Comfort problems vs. high energy bills",
    },
    {
        id: "what-audit-should-include",
        label: "What a professional assessment should include",
    },
    {
        id: "federal-credit",
        label: "The federal tax-credit change",
    },
    {
        id: "state-utility-incentives",
        label: "State and utility incentives",
    },
    {
        id: "when-it-makes-sense",
        label: "When an audit can make sense",
    },
    {
        id: "when-it-may-not",
        label: "When it may not",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Decision checklist",
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
        id: "large-project",
        title: "I am considering a major energy project",
        summary:
            "Compare the audit cost with the project before spending thousands of dollars.",
        guidance:
            "Enter the audit quote and the project you are considering in the value check. The audit does not need to save the entire project cost to have useful value; it may simply help you determine whether the project is solving the right problem.",
        destinationId: "audit-vs-project",
        destinationLabel: "Audit Cost vs. Project Cost",
    },
    {
        id: "high-bills",
        title: "My energy bills seem unusually high",
        summary:
            "Determine whether you need diagnosis before choosing an improvement.",
        guidance:
            "Start with recent utility bills and basic observations. A professional assessment becomes more useful when the cause of the problem is unclear or when potential fixes involve significant spending.",
        destinationId: "diy-first",
        destinationLabel: "When DIY Investigation May Be Enough",
    },
    {
        id: "comfort",
        title: "My house is uncomfortable",
        summary:
            "Separate comfort problems from the question of energy savings.",
        guidance:
            "Cold rooms, drafts, or temperature differences can have several causes. A professional assessment can help identify the underlying issue when the cause is not obvious.",
        destinationId: "comfort-vs-bills",
        destinationLabel: "Comfort Problems vs. High Energy Bills",
    },
    {
        id: "diy",
        title: "I want to investigate the problem myself first",
        summary:
            "Use available information before paying for professional diagnosis.",
        guidance:
            "Review utility bills, inspect obvious sources of air leakage or insulation problems, and use reputable DIY energy tools when appropriate. Escalate when the problem remains uncertain or the proposed solution becomes expensive.",
        destinationId: "diy-first",
        destinationLabel: "When DIY Investigation May Be Enough",
    },
    {
        id: "incentives",
        title: "I am looking for rebates or tax credits",
        summary:
            "Check current incentives rather than relying on older federal-credit claims.",
        guidance:
            "Federal tax-credit rules can change. Also check state, utility, and local programs before assuming the audit will receive an incentive.",
        destinationId: "state-utility-incentives",
        destinationLabel: "State and Utility Incentives",
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
        publishedTime: "2026-09-24",
        modifiedTime: "2026-09-24",
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
    datePublished: "2026-09-24",
    dateModified: "2026-09-24",
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

export default function HomeEnergyAuditGuide() {
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
            <HomeEnergyAuditValueCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A home energy audit is an information purchase. The audit
                    itself does not reduce energy use; its potential value
                    comes from identifying problems and helping you choose
                    improvements based on evidence rather than guesswork.
                </p>

                <p>
                    That makes the decision different from a normal
                    payback calculation. The relevant question is whether
                    better diagnosis could produce enough financial or
                    practical value to justify the audit cost.
                </p>

                <p>
                    The case becomes more compelling when you are considering a
                    major project and do not know whether it addresses the
                    underlying problem. It can be less compelling when the
                    problem is obvious, the likely fix is inexpensive, or the
                    audit would simply confirm something you already know.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-an-audit-buys"
                eyebrow="The Real Product"
                title="You are buying information, diagnosis, and a plan."
            >
                <p>
                    A professional energy assessment can help explain how the
                    home uses energy and identify opportunities for improvement.
                    The value is not the report itself; it is the quality of the
                    information you can use to decide what to do next.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="An audit can help you identify">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Major sources of energy loss.
                            </GuideBullet>
                            <GuideBullet>
                                Air-leakage and insulation opportunities.
                            </GuideBullet>
                            <GuideBullet>
                                Heating, cooling, or equipment issues worth
                                investigating.
                            </GuideBullet>
                            <GuideBullet>
                                Which improvements may deserve further
                                consideration.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="An audit does not automatically provide">
                        <ul className="space-y-3">
                            <GuideBullet>
                                A guaranteed reduction in energy bills.
                            </GuideBullet>
                            <GuideBullet>
                                A guarantee that one particular upgrade is the
                                best investment.
                            </GuideBullet>
                            <GuideBullet>
                                A universal payback period.
                            </GuideBullet>
                            <GuideBullet>
                                A substitute for every specialized inspection.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="diy-first"
                eyebrow="Start With What You Know"
                title="Sometimes the first step is free or inexpensive."
            >
                <p>
                    Before paying for professional diagnosis, gather the
                    information you already have.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Review at least 12 months of utility bills.
                    </GuideBullet>
                    <GuideBullet>
                        Note rooms with persistent drafts or temperature
                        differences.
                    </GuideBullet>
                    <GuideBullet>
                        Inspect obvious insulation and air-leakage locations
                        where it is safe to do so.
                    </GuideBullet>
                    <GuideBullet>
                        Check whether your utility or a reputable public
                        program provides a basic home-energy assessment tool.
                    </GuideBullet>
                </ul>

                <p>
                    ENERGY STAR&apos;s Home Energy Yardstick uses 12 months of
                    utility data to compare a home&apos;s energy use with
                    similar homes. ENERGY STAR explicitly describes it as a
                    starting point rather than a replacement for a professional
                    audit when you need to understand why energy use is high or
                    why the house is uncomfortable.{" "}
                    <a
                        href="https://www.energystar.gov/campaign/home-energy-yardstick/how-it-works"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        ENERGY STAR
                    </a>
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Escalate when the stakes increase
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        The more expensive the proposed project becomes, the
                        more valuable good diagnosis can become.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="professional-diagnosis"
                eyebrow="When Professional Help Helps"
                title="A professional assessment becomes more useful when the cause is unclear or the proposed solution is expensive."
            >
                <p>
                    A professional energy assessment is most useful when there
                    is uncertainty that you cannot reasonably resolve yourself.
                    That may be true when several possible causes could explain
                    the same symptom.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Good reasons to consider an audit">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You are considering a large energy-related
                                project.
                            </GuideBullet>
                            <GuideBullet>
                                The source of high energy use is unclear.
                            </GuideBullet>
                            <GuideBullet>
                                Comfort problems persist despite obvious fixes.
                            </GuideBullet>
                            <GuideBullet>
                                Several competing improvements could address
                                the problem.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Reasons to investigate first">
                        <ul className="space-y-3">
                            <GuideBullet>
                                The cause is already well established.
                            </GuideBullet>
                            <GuideBullet>
                                The likely fix is inexpensive.
                            </GuideBullet>
                            <GuideBullet>
                                You have already received reliable diagnostic
                                information.
                            </GuideBullet>
                            <GuideBullet>
                                The audit would not change the decision you plan
                                to make.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="audit-vs-project"
                eyebrow="Compare The Stakes"
                title="A few hundred dollars can look very different next to a $500 repair and an $8,000 upgrade."
            >
                <p>
                    The cost of an audit should be considered in relation to
                    the decision it may influence.
                </p>

                <p>
                    A $400 audit is a substantial expense if you are trying to
                    decide whether to spend $600 on a minor improvement. It is a
                    much smaller fraction of an $8,000 insulation, HVAC, or
                    window project.
                </p>

                <p>
                    That does not prove the audit is worthwhile. It simply
                    identifies the maximum scale of the decision the audit is
                    helping you make.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        A useful framing
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        Ask whether you would spend the same amount on a
                        professional diagnosis before committing to the larger
                        project.
                    </p>

                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                        The audit is easier to justify when the project is large
                        enough that avoiding one poor decision could matter.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="audit-vs-energy-spending"
                eyebrow="Another Baseline"
                title="Compare the audit with your current annual energy spending."
            >
                <p>
                    A second useful benchmark is the amount you currently spend
                    on energy each year.
                </p>

                <p>
                    If you spend $3,000 a year on electricity, natural gas, oil,
                    or other household energy, a $300 audit represents 10% of
                    one year&apos;s current energy spending.
                </p>

                <p>
                    That ratio does not predict the audit&apos;s return. It simply
                    shows the scale of the fee relative to the spending the
                    assessment is intended to help reduce.
                </p>
            </GuideSection>

            <GuideSection
                id="required-savings"
                eyebrow="Do The Math"
                title="The audit only needs to recover its own cost, not pay for every energy upgrade."
            >
                <p>
                    Suppose a net audit cost is $400 and you expect to remain in
                    the home for 10 years.
                </p>

                <p>
                    The audit would need to contribute an average of only
                    $40 per year in real financial value to recover its own
                    cost over that period.
                </p>

                <p>
                    That value could come from energy savings identified by the
                    audit, avoiding an ineffective project, or both. The
                    calculator lets you test a scenario rather than assuming
                    that any particular percentage of energy savings is
                    guaranteed.
                </p>
            </GuideSection>

            <GuideSection
                id="why-no-guaranteed-savings"
                eyebrow="Avoid False Precision"
                title="An energy audit cannot guarantee a specific energy-saving percentage."
            >
                <p>
                    Homes differ in age, construction, climate, equipment,
                    occupancy, maintenance, utility rates, and existing
                    efficiency measures.
                </p>

                <p>
                    Two homes that spend the same amount on energy can have
                    completely different causes and improvement opportunities.
                    That makes a universal rule such as &quot;an audit will save
                    15%&quot; inappropriate.
                </p>

                <p>
                    Northward Meridian therefore does not make the audit
                    calculator assume a generic savings percentage. Enter an
                    annual savings scenario only when you have a reasonable
                    basis for estimating it.
                </p>
            </GuideSection>

            <GuideSection
                id="comfort-vs-bills"
                eyebrow="Do Not Confuse The Problems"
                title="A comfortable home and a low-energy home are related but not identical goals."
            >
                <p>
                    A homeowner may seek an audit because a room is cold, a
                    bedroom overheats, floors feel drafty, or temperatures vary
                    around the house.
                </p>

                <p>
                    Those problems may or may not produce large changes in total
                    utility spending. Conversely, a home can have significant
                    energy waste without an obvious comfort problem.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Comfort question">
                        <p>
                            What is causing the room or area to feel
                            uncomfortable?
                        </p>
                    </InformationCard>

                    <InformationCard title="Energy question">
                        <p>
                            What is causing the home to use more energy than
                            necessary?
                        </p>
                    </InformationCard>
                </div>

                <p>
                    A professional assessment can help when the underlying
                    cause is uncertain, but the value of that diagnosis should
                    be judged against the problem you are trying to solve.
                </p>
            </GuideSection>

            <GuideSection
                id="what-audit-should-include"
                eyebrow="Before You Pay"
                title="Find out what the assessment actually includes."
            >
                <p>
                    &quot;Energy audit&quot; can describe different levels of service.
                    Before paying, ask what measurements, inspections,
                    diagnostics, recommendations, and reporting are included.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Ask whether the assessment is intended to identify
                        specific causes or simply provide general efficiency
                        recommendations.
                    </GuideBullet>
                    <GuideBullet>
                        Ask what equipment and diagnostic methods will be used.
                    </GuideBullet>
                    <GuideBullet>
                        Ask whether the final report identifies priorities or
                        simply lists possible upgrades.
                    </GuideBullet>
                    <GuideBullet>
                        Ask whether the auditor will estimate expected savings
                        for recommended measures.
                    </GuideBullet>
                    <GuideBullet>
                        Ask whether follow-up consultation is included.
                    </GuideBullet>
                </ul>

                <p>
                    The more expensive the audit, the more important it is to
                    understand exactly what information you are receiving.
                </p>
            </GuideSection>

            <GuideSection
                id="federal-credit"
                eyebrow="Current Incentives Matter"
                title="Do not assume an older federal energy-audit tax credit is still available."
            >
                <p>
                    The federal Energy Efficient Home Improvement Credit that
                    previously included a tax credit for qualifying home energy
                    audits ended for expenditures after December 31, 2025 under
                    current IRS guidance.
                </p>

                <p>
                    That means older articles promising a current federal audit
                    credit can be outdated for a 2026 purchase. Check current
                    IRS guidance before relying on a federal tax benefit.{" "}
                    <a
                        href="https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        IRS
                    </a>
                </p>
            </GuideSection>

            <GuideSection
                id="state-utility-incentives"
                eyebrow="Check Local Programs"
                title="State, utility, and local incentives may still affect the economics."
            >
                <p>
                    Federal tax rules are only one possible source of financial
                    assistance. Utilities, states, municipalities, and
                    individual programs can have their own requirements and
                    eligibility rules.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Verify before you count it
                    </p>

                    <ul className="mt-5 space-y-4">
                        <GuideBullet>
                            Confirm that the audit itself qualifies, rather than
                            assuming the incentive applies to every energy
                            service.
                        </GuideBullet>
                        <GuideBullet>
                            Check whether the auditor must be certified or
                            participate in a specific program.
                        </GuideBullet>
                        <GuideBullet>
                            Confirm application deadlines and required
                            documentation.
                        </GuideBullet>
                        <GuideBullet>
                            Check whether the incentive is a rebate, tax
                            benefit, discount, or another form of assistance.
                        </GuideBullet>
                    </ul>
                </div>
            </GuideSection>

            <GuideSection
                id="when-it-makes-sense"
                eyebrow="When Information Has Value"
                title="An audit can make sense when uncertainty could lead to an expensive mistake."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Large project ahead">
                        <p>
                            You are considering spending thousands of dollars
                            and do not know whether the proposed improvement
                            addresses the main problem.
                        </p>
                    </InformationCard>

                    <InformationCard title="Unclear cause">
                        <p>
                            High energy use or comfort problems persist, but
                            several different causes are plausible.
                        </p>
                    </InformationCard>

                    <InformationCard title="Long ownership horizon">
                        <p>
                            You expect to stay in the home long enough for
                            identified improvements to produce value.
                        </p>
                    </InformationCard>

                    <InformationCard title="Useful program support">
                        <p>
                            A qualifying state or utility program materially
                            reduces the audit cost.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-it-may-not"
                eyebrow="When Diagnosis Adds Little"
                title="An audit may be difficult to justify when the decision is already obvious."
            >
                <p>
                    If you already know what is wrong, have reliable evidence,
                    and are considering a modest fix, paying for another
                    diagnostic step may not add much value.
                </p>

                <p>
                    The same applies when the audit itself is expensive but the
                    project under consideration is small.
                </p>

                <p>
                    The key question is not whether audits are useful in
                    general. It is whether this audit can change a decision
                    enough to justify its own cost.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same $400 audit can be a very different decision in different homes."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: $400 audit before an $8,000 project">
                        <p>
                            The homeowner is considering a major insulation,
                            HVAC, or other energy project but is not certain
                            that it addresses the underlying problem.
                        </p>

                        <p className="mt-4">
                            The audit represents only 5% of the proposed
                            project cost. Avoiding one poor $8,000 decision
                            could be more consequential than modest annual
                            energy savings.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: $400 audit before a $600 repair">
                        <p>
                            The homeowner is considering a relatively small
                            project and already has a strong diagnosis.
                        </p>

                        <p className="mt-4">
                            The audit represents about two-thirds of the proposed
                            repair cost. Unless the additional information could
                            materially change the decision, the diagnostic fee
                            may be difficult to justify.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: High bills with an unclear cause">
                        <p>
                            Utility spending is consistently high, but the
                            homeowner cannot identify whether insulation,
                            air leakage, equipment, or another issue is mainly
                            responsible.
                        </p>

                        <p className="mt-4">
                            Professional diagnosis has more potential value
                            because the homeowner does not yet know which
                            improvement to pursue.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: Free or heavily discounted assessment">
                        <p>
                            A utility or local program significantly reduces the
                            audit cost.
                        </p>

                        <p className="mt-4">
                            The economics improve because less savings or avoided
                            spending is needed to recover the homeowner&apos;s
                            remaining out-of-pocket cost.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Pay for an Energy Audit"
                items={[
                    "Review your recent utility bills and identify the problem you are trying to solve.",
                    "Determine whether you are considering a major project that would benefit from better diagnosis.",
                    "Get the complete audit price and find out exactly what the service includes.",
                    "Check whether a state, utility, or local program can reduce the audit cost.",
                    "Verify whether any claimed federal incentive is current rather than relying on older articles.",
                    "Ask how the auditor will identify causes rather than simply recommend generic efficiency upgrades.",
                    "Find out whether the report includes prioritized recommendations and estimated savings.",
                    "Use the value check to compare the audit cost with the size of the decision it may influence.",
                    "Do not count comfort or convenience benefits as financial savings unless you have a defensible way to value them.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Use these questions before hiring an energy auditor."
                questions={[
                    "What exactly is included in the assessment?",
                    "What diagnostic equipment or tests will you perform?",
                    "Will the assessment identify likely causes of high energy use or comfort problems?",
                    "Will I receive prioritized recommendations rather than a generic list of upgrades?",
                    "Will you provide estimated savings for recommended measures?",
                    "What qualifications or certifications does the auditor have?",
                    "Is follow-up consultation included?",
                    "Are there state or utility programs that reduce the cost?",
                    "Does the incentive apply to the audit itself, and what documentation is required?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A home energy audit is primarily an information purchase. The audit does not save energy by itself.",
                    "The value of the audit comes from better diagnosis, better project selection, or avoiding an ineffective improvement.",
                    "A $300 or $400 audit can be easier to justify when it informs a several-thousand-dollar project than when it confirms a small repair you already understand.",
                    "Do not use a generic energy-savings percentage to predict an audit's return.",
                    "The calculator lets you model your own annual savings scenario while keeping the assumption visible.",
                    "Review utility bills and inexpensive diagnostic information before paying for professional assessment when the problem is straightforward.",
                    "Federal energy-audit tax-credit claims from older articles may be outdated for 2026; verify current IRS rules.",
                    "State, utility, and local programs can still affect the economics, so check current eligibility before counting an incentive.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Guide to Home Energy Assessments",
                        publisher:
                            "U.S. Department of Energy",
                        href:
                            "https://www.energy.gov/sites/default/files/guide_to_home_energy_assessments.pdf",
                    },
                    {
                        title: "Home Energy Assessments",
                        publisher:
                            "U.S. Department of Energy",
                        href:
                            "https://www.energy.gov/energysaver/home-energy-audits",
                    },
                    {
                        title: "Home Energy Yardstick",
                        publisher: "ENERGY STAR",
                        href:
                            "https://www.energystar.gov/campaign/home-energy-yardstick/how-it-works",
                    },
                    {
                        title:
                            "Energy Efficient Home Improvement Credit",
                        publisher: "Internal Revenue Service",
                        href:
                            "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}