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
import PTOComparisonCheck from "./PTOComparisonCheck";

const guide = (() => {
    const found = getGuideBySlug("is-unlimited-pto-better-than-fixed-pto");
    if (!found) throw new Error("Guide not found: is-unlimited-pto-better-than-fixed-pto");
    return found;
})();
const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;
const sections = [
    { id: "pto-comparison-check", label: "PTO decision check" },
    { id: "short-answer", label: "The short answer" },
    { id: "what-unlimited-means", label: "What unlimited PTO means" },
    { id: "actual-days", label: "Actual days taken" },
    { id: "approval-culture", label: "Approval and workplace culture" },
    { id: "accrual-payout", label: "Accrual, carryover, and payout" },
    { id: "leave-categories", label: "Sick leave and holidays" },
    { id: "offer-comparison", label: "Comparing job offers" },
    { id: "scenarios", label: "Practical scenarios" },
    { id: "checklist", label: "Decision checklist" },
    { id: "questions", label: "Questions to ask" },
    { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
    { id: "offer", title: "I am comparing an unlimited policy with a fixed number of days.", summary: "Compare the days you can realistically use rather than the advertised policy names.", guidance: "Start with the decision check and ask about actual leave taken by employees in similar roles.", destinationId: "pto-comparison-check", destinationLabel: "PTO Decision Check" },
    { id: "payout", title: "I might lose unused vacation pay by switching.", summary: "Check how accrued leave, carryover, and separation payouts work.", guidance: "Review the written policy and the applicable rules in your state; unlimited and accrued PTO policies can work differently.", destinationId: "accrual-payout", destinationLabel: "Accrual and Payout" },
    { id: "culture", title: "I worry that unlimited PTO will be difficult to take.", summary: "Look for approval rules, actual usage, and coverage expectations.", guidance: "Ask how many days comparable employees take, how leave requests are approved, and what happens during busy periods.", destinationId: "approval-culture", destinationLabel: "Approval Culture" },
] as const;
export const metadata: Metadata = {
    title: `${guide.title} | Northward Meridian`,
    description: guide.description,
    alternates: { canonical: canonicalUrl },
    openGraph: { type: "article", url: canonicalUrl, siteName: "Northward Meridian", title: guide.title, description: guide.description, publishedTime: "2026-10-09", modifiedTime: "2026-10-09" },
    twitter: { card: "summary", title: guide.title, description: guide.description },
};
const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: guide.title,
    description: guide.description, datePublished: "2026-10-09", dateModified: "2026-10-09",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Northward Meridian", url: `${siteUrl}/about` },
    publisher: { "@type": "Organization", name: "Northward Meridian", url: siteUrl },
};
export default function UnlimitedPTOGuide() {
    return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} structuredData={articleJsonLd} sections={sections} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
        <PTOComparisonCheck />
        <WhyThisMatters id="short-answer">
            <p><strong>Unlimited PTO is not automatically better than 15, 20, or 25 fixed days.</strong> What matters is how much time you can actually take, how approvals work, and what you give up by changing policies.</p>
            <p>A fixed allowance gives a defined number of days, often with accrual and carryover rules. An unlimited or flexible policy generally does not promise an unlimited number of approved days. Employers may still impose scheduling, workload, and performance requirements.</p>
        </WhyThisMatters>
        <GuideSection id="what-unlimited-means" eyebrow="Policy Basics" title="Unlimited PTO means no fixed annual allotment, not unrestricted leave.">
            <p>Many unlimited PTO policies let eligible employees request paid time off without a set yearly bank of vacation days. Approval still depends on the written policy, staffing, business needs, and the manager.</p>
            <InformationCard title="Read the actual policy"><p>Ask whether there are minimum days, blackout periods, notice requirements, tenure restrictions, maximum consecutive absences, and separate rules for extended leave. A policy can be flexible while still having important limitations.</p></InformationCard>
        </GuideSection>
        <GuideSection id="actual-days" eyebrow="Usable Time" title="Compare actual days taken with the fixed allowance.">
            <p>A fixed 20-day policy can be more valuable than an unlimited policy under which people feel able to take only 12 days. Conversely, a supportive unlimited policy might let someone take 25 days when a comparable fixed offer allows 15.</p>
            <p>The decision check compares an estimated number of usable days, but it does not forecast approval or employee behavior. Ask for actual usage in similar roles and teams, rather than companywide averages alone.</p>
        </GuideSection>
        <GuideSection id="approval-culture" eyebrow="Workplace Reality" title="Manager support and workload can matter more than the written limit.">
            <p>Ask whether coworkers take meaningful breaks, whether leaders model time off, and whether there is coverage when someone is away. An unlimited policy with no practical coverage can lead employees to postpone leave indefinitely.</p>
            <p>Look for concrete examples: recent two-week vacations, time off during busy seasons, and how requests are handled when deadlines overlap.</p>
            <InformationCard title="A useful interview question"><p>Ask: <strong>How many vacation days did people in this role typically take last year?</strong> Then ask what happens when someone wants a full week or two consecutive weeks off.</p></InformationCard>
        </GuideSection>
        <GuideSection id="accrual-payout" eyebrow="Financial Details" title="Accrual, carryover, and payout can change the value of the offer.">
            <p>Some fixed PTO plans accrue a balance that can carry over or be paid out when employment ends. Some unlimited policies do not accrue a defined vacation bank. Whether a payout is owed depends on the policy, the jurisdiction, and the facts.</p>
            <p>Do not assume that every fixed plan guarantees a payout, or that every unlimited plan eliminates payout obligations. State rules vary and the legal treatment of a nominally unlimited policy can depend on how it operates in practice.</p>
            <InformationCard title="Do not treat unused PTO as automatic cash"><p>For a financial comparison, count an expected payout only after checking the written policy and applicable law. An unused balance that expires or is forfeited is not equivalent to guaranteed wages.</p></InformationCard>
        </GuideSection>
        <GuideSection id="leave-categories" eyebrow="What Counts" title="Compare holidays, sick leave, parental leave, and protected absences separately.">
            <p>One employer may offer 20 vacation days plus separate paid holidays and sick time. Another may advertise unlimited PTO but define sick time, holidays, and other leave differently. Compare the complete policy rather than only the vacation label.</p>
            <p>Protected leave and legally required sick leave can have separate eligibility and legal rules. An employer&apos;s unlimited vacation policy does not replace those obligations.</p>
        </GuideSection>
        <GuideSection id="offer-comparison" eyebrow="Whole Offer" title="PTO is one component of compensation, not the whole job decision.">
            <p>Salary, employer retirement contributions, health benefits, schedule control, remote-work expectations, and workload can outweigh a difference of a few vacation days. If the new role has more travel or longer hours, nominal PTO may be harder to use.</p>
            <p>Use the PTO check to understand leave quality, then compare the overall offer. Northward Meridian&apos;s job-change raise guide can help with measurable compensation differences, while leaving the personal value of time to your judgment.</p>
        </GuideSection>
        <GuideSection id="scenarios" eyebrow="Examples" title="Three situations illustrate why the policy label is not enough.">
            <div className="space-y-6">
                <InformationCard title="20 fixed days versus 12 realistically usable unlimited days"><p>The fixed policy provides eight more usable days in this example. Check holidays, carryover, and payout before deciding how much that difference matters.</p></InformationCard>
                <InformationCard title="15 fixed days versus 25 realistically usable unlimited days"><p>The unlimited policy may offer substantially more time if managers approve it and workload allows it. Verify that employees actually take that amount.</p></InformationCard>
                <InformationCard title="Same time off, different payout terms"><p>Even when employees take 20 days under either policy, an accrued balance or separation payout may create an additional financial difference. The outcome depends on policy and law.</p></InformationCard>
            </div>
        </GuideSection>
        <DecisionChecklist id="checklist" title="Before You Decide" items={[
            "Get both written PTO policies and identify eligibility and approval rules.",
            "Compare the days you realistically expect to take, not just advertised allowances.",
            "Ask employees in comparable roles how many days they actually took.",
            "Check how the team covers work when someone is away.",
            "Check carryover, accrual, caps, and payout at separation.",
            "Compare sick leave, paid holidays, parental leave, and other absences separately.",
            "Review restrictions on consecutive weeks, busy seasons, and notice periods.",
            "Compare salary, benefits, workload, and flexibility as part of the full offer.",
        ]} />
        <QuestionsToAsk id="questions" title="Questions to Ask About Unlimited PTO" subtitle="Use specific questions to learn how the policy works in practice." questions={[
            "How many days did people in this role take last year?",
            "Is there a minimum amount of vacation employees are encouraged to take?",
            "Who approves leave and how far ahead must requests be submitted?",
            "Are there blackout periods or limits on consecutive days?",
            "Who covers my responsibilities while I am away?",
            "How are sick leave, holidays, and parental leave treated?",
            "Does any vacation accrue, carry over, or get paid out at separation?",
            "Can I review the complete written policy before accepting?",
        ]} />
        <KeyTakeaways id="takeaways" items={[
            "Unlimited PTO is not a guarantee of unlimited approved vacation.",
            "Actual usable days and approval culture are often more important than the policy label.",
            "Fixed PTO can have accrual, carryover, or payout features worth checking.",
            "Legal treatment of unused leave varies by jurisdiction and policy details.",
            "Compare holidays, sick leave, and protected leave separately.",
            "Use the decision check to identify questions, not to assign a universal score to an employer.",
            "Evaluate PTO as one part of the overall job offer.",
        ]} />
        <Sources sources={[
            { title: "Vacation Leave", publisher: "U.S. Department of Labor", href: "https://www.dol.gov/general/topic/workhours/vacation_leave" },
            { title: "Paid Sick Leave", publisher: "U.S. Department of Labor", href: "https://www.dol.gov/agencies/whd/government-contracts/sick-leave" },
            { title: "Employee Benefits in the United States", publisher: "U.S. Bureau of Labor Statistics", href: "https://www.bls.gov/ebs/" },
            { title: "Unpaid/Withheld Wages and Wage Supplements", publisher: "New York State Department of Labor", href: "https://dol.ny.gov/unpaidwithheld-wages-and-wage-supplements" },
        ]} />
        <RelatedDecisions currentSlug="is-unlimited-pto-better-than-fixed-pto" />
    </GuideLayout>;
}
