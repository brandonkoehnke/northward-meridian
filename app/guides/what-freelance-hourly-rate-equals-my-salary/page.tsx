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
import FreelanceRateCalculator from "./FreelanceRateCalculator";

const guide = (() => {
    const found = getGuideBySlug("what-freelance-hourly-rate-equals-my-salary");
    if (!found) throw new Error("Guide not found: what-freelance-hourly-rate-equals-my-salary");
    return found;
})();
const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;
const sections = [
    { id: "freelance-rate-calculator", label: "Freelance rate calculator" },
    { id: "short-answer", label: "The short answer" },
    { id: "salary-equivalence", label: "What salary equivalence means" },
    { id: "benefits", label: "Replacing employer benefits" },
    { id: "billable-time", label: "Billable vs. working hours" },
    { id: "business-expenses", label: "Business expenses" },
    { id: "taxes", label: "Self-employment taxes" },
    { id: "market-rate", label: "Required rate vs. market rate" },
    { id: "risks", label: "Income variability and risk" },
    { id: "examples", label: "Practical scenarios" },
    { id: "checklist", label: "Decision checklist" },
    { id: "questions", label: "Questions to ask" },
    { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
    { id: "employee", title: "I have a salary and want to freelance full time.", summary: "Estimate the revenue and billable rate needed to replace your current employment economics.", guidance: "Start with your current salary and employer-funded benefits, then estimate business costs and billable time.", destinationId: "freelance-rate-calculator", destinationLabel: "Freelance Rate Calculator" },
    { id: "utilization", title: "I am unsure how many hours I can bill.", summary: "Test how client work, admin, and gaps between projects change your required rate.", guidance: "Review billable utilization, then compare the calculator scenarios at 50% through 80% billable time.", destinationId: "billable-time", destinationLabel: "Billable Time" },
    { id: "quote", title: "Clients are offering less than the rate I need.", summary: "Separate your economic revenue target from the rate your market supports.", guidance: "Start with the market-rate section to consider scope, positioning, utilization, and whether the freelance plan is viable.", destinationId: "market-rate", destinationLabel: "Market Rate" },
] as const;
export const metadata: Metadata = {
    title: `${guide.title} | Northward Meridian`, description: guide.description,
    alternates: { canonical: canonicalUrl },
    openGraph: { type: "article", url: canonicalUrl, siteName: "Northward Meridian", title: guide.title, description: guide.description, publishedTime: "2026-10-09", modifiedTime: "2026-10-09" },
    twitter: { card: "summary", title: guide.title, description: guide.description },
};
const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description,
    datePublished: "2026-10-09", dateModified: "2026-10-09", mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Northward Meridian", url: `${siteUrl}/about` },
    publisher: { "@type": "Organization", name: "Northward Meridian", url: siteUrl },
};
export default function FreelanceSalaryEquivalentGuide() {
    return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} structuredData={articleJsonLd} sections={sections} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
        <FreelanceRateCalculator />
        <WhyThisMatters id="short-answer">
            <p>Your employee hourly equivalent is not your freelance billing rate. An employee can be paid for time spent in meetings, training, and other non-client work, while an independent professional must generate enough revenue from billable work to support the entire business.</p>
            <p>Start by replacing your salary and the employer benefits you would lose. Add annual business costs, then divide by the hours you realistically expect to invoice. The result is a <strong>pre-tax revenue target per billable hour</strong>, not a guarantee of equivalent take-home pay.</p>
        </WhyThisMatters>
        <GuideSection id="salary-equivalence" eyebrow="The Core Question" title="A salary-equivalent freelance rate is a financial threshold, not a market price.">
            <p>Dividing a $90,000 salary by 2,080 hours produces about $43.27 per hour. But a freelancer generally cannot invoice every hour spent working and may need to replace employer contributions and cover operating expenses.</p>
            <InformationCard title="The basic calculation"><p><strong>Required revenue = salary to replace + employer benefits to replace + annual freelance expenses.</strong> Then divide required revenue by estimated annual billable hours.</p><p className="mt-3">This simplified model compares economic amounts before personal taxes. It does not model the value of guaranteed pay, employer-provided unemployment coverage, or the risk of unpaid invoices.</p></InformationCard>
        </GuideSection>
        <GuideSection id="benefits" eyebrow="Compensation" title="Replace the employer benefits that matter to your situation.">
            <p>Employer retirement contributions, health coverage, HSA contributions, disability coverage, and other benefits may disappear when you become independent. Compare the actual amounts and coverage you would lose, not an assumed percentage of salary.</p>
            <p>Employee benefits can be difficult to value precisely. For example, an employer health plan may have a different network and deductible from a self-purchased plan. Estimate the replacement cost you realistically expect, and do not count the same expense twice.</p>
            <InformationCard title="Avoid a common double count"><p>If you enter the cost of replacement health insurance under employer benefits, do not also enter that same premium as an additional business expense. The same rule applies to retirement contributions and other costs.</p></InformationCard>
        </GuideSection>
        <GuideSection id="billable-time" eyebrow="Utilization" title="The hours you work and the hours you can invoice are not the same.">
            <p>Freelancers may spend time finding clients, writing proposals, communicating with prospects, invoicing, bookkeeping, marketing, and improving their skills. Some weeks have little client work even when you are available full time.</p>
            <p>At 40 hours per week for 48 weeks, you work 1,920 hours. If 65% is billable, you can invoice 1,248 hours. At 50%, you can invoice only 960 hours. That difference substantially changes the hourly rate needed to produce the same annual revenue.</p>
            <InformationCard title="Billable utilization is an assumption, not a guarantee"><p>Use a conservative utilization estimate when planning a transition. Track actual hours and client demand over time. A calendar full of available hours does not mean clients will purchase them.</p></InformationCard>
        </GuideSection>
        <GuideSection id="business-expenses" eyebrow="Operating Costs" title="Your client revenue must also support the cost of running the business.">
            <p>Depending on the work, expenses can include software, tools, equipment, insurance, professional licenses, bookkeeping, payment processing, travel, subcontractors, and marketing. Some costs are recurring; others should be spread across the period in which you expect to use the purchase.</p>
            <p>Enter reasonable annual expenses, including a provision for equipment replacement where relevant. Avoid treating the entire amount of a deductible expense as if the tax deduction makes it free.</p>
        </GuideSection>
        <GuideSection id="taxes" eyebrow="Taxes" title="Freelance revenue equivalence is not identical to take-home-pay equivalence.">
            <p>In the United States, self-employed workers generally calculate self-employment tax on qualifying net earnings, subject to Social Security and Medicare rules. Employees already pay employee-side payroll taxes, while employers generally pay the employer-side portion.</p>
            <p>Income taxes, deductions, retirement contributions, state taxes, business structure, and the Social Security wage base can change the result. A flat surcharge applied to revenue would create false precision, so the calculator deliberately does not estimate your tax-equivalent rate.</p>
            <InformationCard title="When the decision is close"><p>Use a tax professional or a detailed tax model to compare after-tax income under your actual circumstances. The calculator is best used to understand the revenue and utilization needed before that tax analysis.</p></InformationCard>
        </GuideSection>
        <GuideSection id="market-rate" eyebrow="Market Reality" title="The rate you need and the rate clients will pay are two different numbers.">
            <p>If the calculator produces $90 per hour but comparable clients will pay only $60, the result does not make $90 a market price. It shows that your current plan may not reproduce the economics of employment at the expected workload.</p>
            <p>Possible responses include improving your specialization, increasing billable utilization, reducing overhead, changing service packages, targeting different clients, or maintaining employment while testing demand. Conversely, if clients will pay more than your economic floor, you do not need to cap your price at that floor.</p>
        </GuideSection>
        <GuideSection id="risks" eyebrow="Uncertainty" title="Revenue is not guaranteed income.">
            <p>A freelance rate is only useful when supported by sufficient paying work. Late payments, cancellations, unpaid revisions, client concentration, illness, and seasonal demand can all reduce realized revenue.</p>
            <p>Consider cash reserves and the time required to build a reliable client pipeline. The calculator does not quantify these risks or convert them into a recommended price premium.</p>
        </GuideSection>
        <GuideSection id="examples" eyebrow="Practical Scenarios" title="Different freelance businesses can require very different rates.">
            <div className="space-y-6">
                <InformationCard title="Steady contract work"><p>A professional with long-term clients and predictable hours may achieve relatively high billable utilization. Their required rate can be lower than that of someone who spends much of the week finding new projects.</p></InformationCard>
                <InformationCard title="Project-based consulting"><p>Complex projects can justify higher prices but create more unpaid proposal, scoping, and revision time. Use realistic billable hours rather than assuming every hour is invoiceable.</p></InformationCard>
                <InformationCard title="Part-time transition"><p>Keeping employment while testing freelance demand can reduce income risk, but it also limits available hours. Model the hours you can actually deliver rather than a hypothetical full-time schedule.</p></InformationCard>
            </div>
        </GuideSection>
        <DecisionChecklist id="checklist" title="A Practical Decision Checklist" items={[
            "Record the salary and recurring cash compensation you want to replace.",
            "Estimate the actual employer-funded benefits you would lose.",
            "Estimate replacement coverage and avoid counting the same cost twice.",
            "List recurring business expenses and reasonable equipment replacement costs.",
            "Choose realistic working weeks and hours, including unpaid time off.",
            "Estimate the share of hours you can reliably bill to clients.",
            "Compare required rates under multiple billable utilization assumptions.",
            "Research what clients in your market pay for comparable work.",
            "Evaluate taxes separately using your actual circumstances.",
            "Consider payment delays, client concentration, and a cash reserve.",
            "Test client demand before assuming you can sell every available hour.",
        ]} />
        <QuestionsToAsk id="questions" title="Questions to Ask Before Going Freelance" subtitle="Check the business assumptions before treating the calculated rate as achievable." questions={[
            "What employer benefits would I need to replace, and what would comparable coverage cost?",
            "How many working weeks do I realistically expect each year?",
            "What percentage of my time will clients actually pay for?",
            "How will I find clients and how long might the sales process take?",
            "What expenses will continue even when revenue is low?",
            "What rate can I verify through real client conversations or paid projects?",
            "How much cash would I need to cover slow months or late payments?",
            "How would my taxes and retirement savings change?",
            "Could I test freelancing part time before leaving my job?",
        ]} />
        <KeyTakeaways id="takeaways" items={[
            "Employee salary divided by 2,080 hours is not a reliable freelance billing-rate target.",
            "Include the employer-funded benefits you would need to replace and the costs of running the business.",
            "Divide the annual revenue target by billable hours, not every hour you work.",
            "Utilization is often the most important sensitivity in the calculation.",
            "Avoid double-counting replacement benefits and operating expenses.",
            "A pre-tax revenue target does not establish equal after-tax take-home pay.",
            "Your required rate is not necessarily the rate clients will pay.",
            "Client demand, income variability, and cash reserves remain important even when the math works.",
        ]} />
        <Sources sources={[
            { title: "Employer Costs for Employee Compensation", publisher: "U.S. Bureau of Labor Statistics", href: "https://www.bls.gov/news.release/ecec.toc.htm" },
            { title: "Self-Employment Tax (Social Security and Medicare Taxes)", publisher: "Internal Revenue Service", href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
            { title: "Tax Topic 554: Self-Employment Tax", publisher: "Internal Revenue Service", href: "https://www.irs.gov/taxtopics/tc554" },
            { title: "Self-Employed Individuals Tax Center", publisher: "Internal Revenue Service", href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center" },
        ]} />
        <RelatedDecisions currentSlug="what-freelance-hourly-rate-equals-my-salary" />
    </GuideLayout>;
}
