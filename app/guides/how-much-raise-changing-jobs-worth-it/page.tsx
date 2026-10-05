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
import BreakEvenRaiseCalculator from "./BreakEvenRaiseCalculator";

const guide = (() => {
    const found = getGuideBySlug("how-much-raise-changing-jobs-worth-it");
    if (!found) throw new Error("Guide not found: how-much-raise-changing-jobs-worth-it");
    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    { id: "break-even-raise-calculator", label: "Break-even raise calculator" },
    { id: "short-answer", label: "The short answer" },
    { id: "salary-is-not-total-comp", label: "Salary vs. total compensation" },
    { id: "recurring-differences", label: "Recurring differences" },
    { id: "one-time-costs", label: "One-time switching costs" },
    { id: "commute", label: "Commute cost and time" },
    { id: "taxes", label: "Taxes and take-home pay" },
    { id: "benefits", label: "Benefits that deserve a closer look" },
    { id: "nonfinancial", label: "What the calculator cannot price" },
    { id: "scenarios", label: "Real-world scenarios" },
    { id: "checklist", label: "Decision checklist" },
    { id: "questions", label: "Questions to ask" },
    { id: "takeaways", label: "Key takeaways" },
] as const;

const guidedEntryScenarios = [
    {
        id: "offer",
        title: "I have a new offer and want to know the minimum salary I should compare against.",
        summary: "Convert recurring differences and one-time switching costs into a break-even salary.",
        guidance: "Start with the calculator. Enter your current salary and only the compensation and cost differences that would change if you switch.",
        destinationId: "break-even-raise-calculator",
        destinationLabel: "Break-Even Raise Calculator",
    },
    {
        id: "benefits",
        title: "The new salary is higher, but the benefits are worse.",
        summary: "Separate salary from employer contributions, premiums, bonuses, and paid time.",
        guidance: "Start with the benefits section, then use the calculator to enter differences you can reasonably express in annual dollars.",
        destinationId: "benefits",
        destinationLabel: "Benefits to Compare",
    },
    {
        id: "commute",
        title: "The new job pays more but adds a longer commute.",
        summary: "Separate the cash cost of commuting from the additional time commitment.",
        guidance: "Start with the commute section. The calculator can include your estimated annual commuting cost and reports added commute hours separately.",
        destinationId: "commute",
        destinationLabel: "Commute Cost and Time",
    },
] as const;

export const metadata: Metadata = {
    title: `${guide.title} | Northward Meridian`,
    description: guide.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
        type: "article",
        url: canonicalUrl,
        siteName: "Northward Meridian",
        title: guide.title,
        description: guide.description,
        publishedTime: "2026-10-02",
        modifiedTime: "2026-10-02",
    },
    twitter: { card: "summary", title: guide.title, description: guide.description },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Northward Meridian", url: `${siteUrl}/about` },
    publisher: { "@type": "Organization", name: "Northward Meridian", url: siteUrl },
};

export default function BreakEvenRaiseGuide() {
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
            <BreakEvenRaiseCalculator />
            <WhyThisMatters id="short-answer">
                <p>A higher salary does not automatically mean a financially better job. A new role can change bonuses, retirement contributions, health premiums, commuting costs, and other recurring expenses. It can also create one-time costs such as relocation or compensation you forfeit by leaving.</p>
                <p>A useful starting point is therefore the <strong>break-even salary</strong>: the new salary that offsets the measurable financial disadvantages of switching jobs over the period you expect to stay.</p>
                <p>That number is not a recommendation to accept or reject an offer. Career growth, management, flexibility, stability, workload, and the value of your time can matter even when they cannot be priced reliably.</p>
            </WhyThisMatters>
            <GuideSection id="salary-is-not-total-comp" eyebrow="Compensation" title="Salary is only one part of what an employer provides.">
                <p>The Bureau of Labor Statistics measures employer compensation as wages and salaries plus employee benefits. Benefits can include paid leave, supplemental pay, insurance, retirement and savings contributions, and legally required benefits.</p>
                <p>In June 2026, BLS estimated that wages and salaries made up about 70% of private-industry employer compensation costs, with benefits accounting for about 30%. That does not mean your benefits equal 30% of your salary; it shows why comparing salary alone can miss meaningful differences.</p>
                <InformationCard title="Compare the benefits that actually change"><p>Do not try to assign a dollar value to every line in an employer benefits brochure. Focus on differences that affect you: employer retirement contributions, health premiums you pay, bonuses you realistically expect, paid time you value, and other compensation that changes between the two jobs.</p></InformationCard>
            </GuideSection>
            <GuideSection id="recurring-differences" eyebrow="Annual Differences" title="Recurring differences determine how much additional salary you need each year.">
                <p>Suppose a new job costs $1,500 more per year in health premiums, reduces employer retirement contributions by $2,000, and adds $2,500 of annual commuting expense. Those differences create a $6,000 annual disadvantage before considering any other compensation changes.</p>
                <p>The calculator treats benefits or compensation you lose as additional salary that the new job must replace. Benefits you gain reduce the salary increase required to reach financial break-even.</p>
            </GuideSection>
            <GuideSection id="one-time-costs" eyebrow="Switching Costs" title="One-time costs matter, but their importance depends on how long you stay.">
                <p>Changing jobs can involve relocation, a forfeited bonus, unvested compensation, licensing or equipment expenses, or unpaid time between jobs. These are different from costs that repeat every year.</p>
                <p>The calculator spreads one-time costs across the expected time at the new job. A $6,000 switching cost represents $6,000 per year if you stay one year, but $2,000 per year when viewed across three years.</p>
                <InformationCard title="Keep recurring costs separate"><p>A longer commute, higher insurance premiums, or a lower employer match continues to matter every year. Keep recurring differences separate from costs that happen only because you make the transition.</p></InformationCard>
            </GuideSection>
            <GuideSection id="commute" eyebrow="Commute" title="Treat commuting money and commuting time as two different costs.">
                <p>If the new job requires more driving, transit fares, parking, tolls, or other recurring expenses, estimate the annual cash difference and include it in the calculator. Use your own expected cost rather than treating a tax mileage rate as the universal cost of commuting.</p>
                <p>Time is different. The calculator reports additional commute hours separately instead of multiplying those hours by your salary and calling the result a financial loss. An extra 200 hours per year may matter greatly to one person and much less to another.</p>
                <InformationCard title="Ordinary commuting is generally a personal expense"><p>IRS guidance generally treats travel between home and a regular workplace as personal commuting rather than a deductible business expense. Your specific tax circumstances can differ, so do not assume a longer commute creates an offsetting tax deduction.</p></InformationCard>
            </GuideSection>
            <GuideSection id="taxes" eyebrow="Taxes" title="A gross break-even salary is not the same as identical take-home pay.">
                <p>The calculator works in gross annual dollars. Taxes can change when salary, bonuses, benefits, filing circumstances, location, or payroll deductions change.</p>
                <p>That makes the result a compensation-planning threshold, not a tax projection. If two offers are close to your break-even point, compare actual payroll deductions and tax effects before treating the result as exact take-home equivalence.</p>
            </GuideSection>
            <GuideSection id="benefits" eyebrow="Benefits" title="Some benefit differences are straightforward to price; others are not.">
                <div className="space-y-6">
                    <InformationCard title="Employer retirement contributions"><p>Compare the employer dollars you realistically expect to receive, including match eligibility and vesting rules. Do not compare headline match percentages without checking how they apply to your pay and contributions.</p></InformationCard>
                    <InformationCard title="Health insurance"><p>Employee premiums are easy to compare, but plan value also depends on deductibles, copays, coinsurance, networks, employer HSA contributions, and the care your household expects to use.</p></InformationCard>
                    <InformationCard title="Bonus and variable compensation"><p>Use an amount you reasonably expect rather than the maximum possible payout. A guaranteed salary dollar and a highly uncertain bonus dollar are not necessarily equivalent.</p></InformationCard>
                    <InformationCard title="Paid time off"><p>PTO has economic and personal value, but converting every lost vacation day into salary can imply more precision than the decision deserves. Compare the actual policies and decide how much the time matters to you.</p></InformationCard>
                </div>
            </GuideSection>
            <GuideSection id="nonfinancial" eyebrow="Beyond the Calculator" title="A financially break-even offer can still be a better or worse career move.">
                <p>The calculator deliberately leaves several factors outside the break-even salary because their value is personal or uncertain.</p>
                <div className="mt-6 space-y-6">
                    <InformationCard title="Career trajectory"><p>A role can provide stronger experience, a better title, a new industry, management exposure, or a clearer promotion path even when the immediate raise is modest.</p></InformationCard>
                    <InformationCard title="Flexibility and location"><p>Remote work, schedule control, travel requirements, and where you are expected to work can materially change daily life without fitting cleanly into a salary calculation.</p></InformationCard>
                    <InformationCard title="Manager, culture, and stability"><p>Management quality, workload, organizational health, layoff risk, and job satisfaction can dominate a decision while remaining difficult to quantify.</p></InformationCard>
                </div>
            </GuideSection>
            <GuideSection id="scenarios" eyebrow="Examples" title="The same headline raise can mean very different things.">
                <div className="space-y-6">
                    <InformationCard title="Higher salary, more expensive commute"><p>A $10,000 raise may look substantial until a longer commute, parking, tolls, and higher insurance costs consume several thousand dollars per year. The remaining raise may still be worthwhile, but the relevant number is smaller than the headline raise.</p></InformationCard>
                    <InformationCard title="Similar salary, substantially better benefits"><p>A modest salary increase can still improve financial compensation when the new employer contributes more to retirement, charges lower health premiums, or provides other benefits you will actually use.</p></InformationCard>
                    <InformationCard title="Large raise with a one-time sacrifice"><p>Giving up a bonus or paying relocation costs can make the first year less attractive even when the new job is financially stronger over several years. This is why the expected time horizon matters.</p></InformationCard>
                </div>
            </GuideSection>
            <DecisionChecklist id="checklist" title="A Practical Decision Checklist" items={[
                "Record your current base salary.",
                "Estimate bonuses or other recurring cash compensation you realistically expect to gain or lose.",
                "Compare employer retirement contributions you realistically expect to receive.",
                "Compare the employee share of health premiums and other recurring benefit costs.",
                "Estimate the annual cash difference in commuting, parking, tolls, transit, or similar work-related costs.",
                "Separate recurring differences from one-time switching costs.",
                "Choose a realistic time horizon for spreading one-time costs.",
                "Compare additional commute time separately from commuting dollars.",
                "Review PTO, schedule flexibility, remote-work expectations, travel, and workload.",
                "Consider career trajectory, management, stability, and advancement separately from financial break-even.",
                "If the offers are close, compare taxes and payroll deductions using your actual circumstances.",
            ]} />
            <QuestionsToAsk id="questions" title="Questions to Ask Before Accepting a New Job" subtitle="Get the details needed to compare the offer rather than relying on the headline salary." questions={[
                "Is the stated salary guaranteed, and when is the next compensation review?",
                "How is any bonus calculated, and what has the typical payout been?",
                "What retirement contribution or match does the employer provide, and when does it vest?",
                "What will I pay for the health plan I would actually choose?",
                "Does the employer contribute to an HSA or other benefit account?",
                "How much PTO will I receive, and are there restrictions on using or carrying it over?",
                "How many days am I expected to be on-site?",
                "What travel or after-hours expectations come with the role?",
                "Are there relocation, sign-on, repayment, or clawback provisions?",
                "What compensation or benefits will I forfeit by leaving my current employer now?",
                "What does advancement from this role typically look like?",
            ]} />
            <KeyTakeaways id="takeaways" items={[
                "The raise that makes a job change financially break even can be larger than the difference in base salary.",
                "Compare recurring compensation and cost differences separately from one-time switching costs.",
                "Employer retirement contributions, health premiums, bonuses, and commuting expenses can materially change the comparison.",
                "Spread one-time switching costs over a realistic expected time at the new job.",
                "Keep commute time separate from commute dollars unless you deliberately choose your own value for that time.",
                "The calculator works in gross dollars and is not a tax or take-home-pay model.",
                "A break-even salary is a financial reference point, not a recommendation to change jobs.",
                "Career trajectory, flexibility, management, stability, workload, and quality of life still require judgment.",
            ]} />
            <Sources sources={[
                { title: "Employer Costs for Employee Compensation — June 2026", publisher: "U.S. Bureau of Labor Statistics", href: "https://www.bls.gov/charts/employer-costs-for-employee-compensation/costs-per-hour.htm" },
                { title: "Average Hourly Employer Costs for Employee Benefits — June 2026", publisher: "U.S. Bureau of Labor Statistics", href: "https://www.bls.gov/charts/employer-costs-for-employee-compensation/benefits-per-hour.htm" },
                { title: "Employee Benefits in the United States — March 2026", publisher: "U.S. Bureau of Labor Statistics", href: "https://www.bls.gov/ebs/publications/employee-benefits-in-the-united-states-march-2026.htm" },
                { title: "Publication 463 — Travel, Gift, and Car Expenses", publisher: "Internal Revenue Service", href: "https://www.irs.gov/publications/p463" },
            ]} />
            <RelatedDecisions currentSlug="how-much-raise-changing-jobs-worth-it" />
        </GuideLayout>
    );
}
