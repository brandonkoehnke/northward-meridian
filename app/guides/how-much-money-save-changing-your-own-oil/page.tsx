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
import OilChangeSavingsCalculator from "./OilChangeSavingsCalculator";

const guide = (() => {
  const found = getGuideBySlug("how-much-money-save-changing-your-own-oil");
  if (!found) throw new Error("Guide not found: how-much-money-save-changing-your-own-oil");
  return found;
})();
const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;
const sections = [
  { id: "oil-change-savings-calculator", label: "Oil change savings calculator" },
  { id: "short-answer", label: "The short answer" },
  { id: "true-cost", label: "The true DIY cost" },
  { id: "shop-comparison", label: "Compare equivalent services" },
  { id: "equipment-payback", label: "Equipment break-even" },
  { id: "time", label: "Is the time worth it?" },
  { id: "intervals", label: "Oil change frequency" },
  { id: "safe-disposal", label: "Safety and disposal" },
  { id: "records-warranty", label: "Records and warranty" },
  { id: "scenarios", label: "Practical scenarios" },
  { id: "checklist", label: "Decision checklist" },
  { id: "questions", label: "Questions to ask" },
  { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
  { id: "price", title: "I want to know how much money DIY oil changes save.", summary: "Compare shop pricing with the actual cost of oil, filter, and supplies.", guidance: "Enter a real shop quote and the prices of materials that meet your vehicle specifications.", destinationId: "oil-change-savings-calculator", destinationLabel: "Oil Change Savings Calculator" },
  { id: "equipment", title: "I would have to buy tools to get started.", summary: "Find how many oil changes it takes to recover the upfront purchase.", guidance: "Enter the equipment you still need to buy, then check the equipment break-even result.", destinationId: "equipment-payback", destinationLabel: "Equipment Break-Even" },
  { id: "convenience", title: "I am not sure doing it myself is worth the hassle.", summary: "Keep cash savings separate from time, convenience, and service quality.", guidance: "Read the time and service-comparison sections before deciding.", destinationId: "time", destinationLabel: "Time and Convenience" },
] as const;
export const metadata: Metadata = {
  title: `${guide.title} | Northward Meridian`, description: guide.description,
  alternates: { canonical: canonicalUrl },
  openGraph: { type: "article", url: canonicalUrl, siteName: "Northward Meridian", title: guide.title, description: guide.description, publishedTime: "2026-10-13", modifiedTime: "2026-10-13" },
  twitter: { card: "summary", title: guide.title, description: guide.description },
};
const articleJsonLd = {
  "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description,
  datePublished: "2026-10-13", dateModified: "2026-10-13", mainEntityOfPage: canonicalUrl,
  author: { "@type": "Organization", name: "Northward Meridian", url: `${siteUrl}/about` },
  publisher: { "@type": "Organization", name: "Northward Meridian", url: siteUrl },
};
export default function OilChangeSavingsGuide() {
  return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} structuredData={articleJsonLd} sections={sections} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
    <OilChangeSavingsCalculator />
    <WhyThisMatters id="short-answer">
      <p><strong>DIY oil changes can save money, but the difference is not always large.</strong> Compare what a shop actually charges with the cost of the correct oil, filter, and supplies. Then account for equipment purchases and how often you will change the oil.</p>
      <p>DIY is most compelling when you already own the equipment, buy suitable supplies at good prices, and expect to repeat the work. A discounted shop service may be competitive, particularly if it includes inspections or tire rotation you would otherwise pay for.</p>
    </WhyThisMatters>
    <GuideSection id="true-cost" eyebrow="DIY Costs" title="Count the complete cost of a do-it-yourself oil change.">
      <p>Start with the exact oil grade and specification required by your vehicle, the correct quantity, and a compatible oil filter. Add a drain-plug gasket or washer when specified, disposable gloves, absorbent materials, and any disposal fees. Prices for five-quart jugs can be misleading when your engine needs more than five quarts.</p>
      <p>Reusable tools are different from recurring supplies. A drain pan or filter wrench might be purchased once and used for years; oil and filters are purchased again each service.</p>
      <InformationCard title="Example: recurring cost"><p>Suppose the oil costs $32, the filter $10, and other consumables $3. Your recurring DIY cost is $45. Against a comparable $95 shop service, that is $50 in cash savings per change before buying equipment or valuing your time.</p></InformationCard>
    </GuideSection>
    <GuideSection id="shop-comparison" eyebrow="Fair Comparison" title="Make sure the shop and DIY prices cover the same work.">
      <p>Get the out-the-door shop price, including taxes and shop fees. Ask whether the quote includes synthetic oil that meets your vehicle specification, the correct oil quantity, a filter, tire rotation, fluid checks, or other inspections. Avoid comparing an oil-only DIY cost with a shop package that provides additional services you need.</p>
      <p>A coupon price may apply only to a particular oil type or quantity. Confirm the price for your specific vehicle before using it in the calculator.</p>
    </GuideSection>
    <GuideSection id="equipment-payback" eyebrow="Upfront Investment" title="The first DIY change may not be the cheapest one.">
      <p>Some owners already have suitable tools. Others need a drain pan, filter wrench, torque wrench, and safe access equipment. The calculator subtracts your one-time equipment purchase from first-year savings and shows the number of changes needed to recover it.</p>
      <p>For example, $80 of equipment divided by $50 savings per change requires two changes to recover the purchase, assuming prices remain the same. If DIY materials cost as much as or more than the shop service, there is no positive cash payback.</p>
      <InformationCard title="Buy equipment for safe access, not only payback"><p>Never go under a vehicle supported only by a jack. Use the vehicle manufacturer&apos;s lifting instructions and properly rated supports or ramps where needed. If you cannot access the drain plug and filter safely, professional service may be the better choice.</p></InformationCard>
    </GuideSection>
    <GuideSection id="time" eyebrow="Your Time" title="Keep cash savings and the value of your time separate.">
      <p>Changing oil takes time to gather supplies, perform the service, clean up, and take used oil to a collection point. A shop visit also takes time to drive, wait, and return. Which is more convenient depends on your location and schedule.</p>
      <p>The calculator optionally subtracts your own chosen hourly value from DIY cash savings. That is a personal tradeoff, not a claim that every hour of leisure has the same value as an hour of paid work.</p>
    </GuideSection>
    <GuideSection id="intervals" eyebrow="Maintenance Schedule" title="Do not assume everyone needs the same number of oil changes.">
      <p>Follow the maintenance schedule and oil specifications for your model, engine, driving conditions, and warranty requirements. Oil-change intervals vary, and severe-service conditions can require different maintenance. More changes per year increase potential savings, but unnecessary oil changes also add cost.</p>
      <p>Estimate your annual count from your actual driving and manufacturer guidance rather than automatically assuming every vehicle needs service every 3,000 miles.</p>
    </GuideSection>
    <GuideSection id="safe-disposal" eyebrow="Environmental Responsibility" title="Plan for safe oil handling and recycling.">
      <p>Used motor oil should not go into household trash, storm drains, soil, or waterways. Collect it in a clean, leakproof container and take it to a participating collection or recycling facility. Keep it separate from antifreeze, solvents, and other chemicals. Check local rules for used filters and containers.</p>
      <p>Spills, stripped drain-plug threads, wrong oil, loose filters, and incorrect fill levels can turn a low-cost service into an expensive problem. Follow the service instructions for your specific vehicle and verify for leaks and the correct oil level after the change.</p>
      <InformationCard title="EPA guidance"><p>The U.S. Environmental Protection Agency explains why used oil should be handled carefully and recycled through appropriate collection systems. Confirm a collection location and its acceptance requirements before starting.</p></InformationCard>
    </GuideSection>
    <GuideSection id="records-warranty" eyebrow="Documentation" title="Keep receipts and maintenance records when servicing your own vehicle.">
      <p>In the United States, performing routine maintenance yourself does not automatically void a vehicle warranty. However, warranty coverage can depend on the cause of a failure, and damage from improper maintenance may not be covered. Follow the manufacturer&apos;s instructions and retain evidence of the work.</p>
      <p>Save oil and filter receipts and record the date, mileage, product specifications, and work performed. These records can also help when selling the vehicle or tracking maintenance intervals.</p>
    </GuideSection>
    <GuideSection id="scenarios" eyebrow="Examples" title="Three situations where the decision changes.">
      <div className="space-y-6">
        <InformationCard title="High-mileage driver with tools already owned"><p>Several oil changes per year can make modest per-change savings meaningful. Equipment costs are already sunk, so the recurring comparison matters most.</p></InformationCard>
        <InformationCard title="Low-mileage driver starting from scratch"><p>One annual oil change and $150 of new equipment may take years to pay back. A reasonably priced shop service can be more practical.</p></InformationCard>
        <InformationCard title="Shop package includes a tire rotation"><p>If the shop includes a rotation you need, compare DIY oil plus the cost or effort of getting the tires rotated elsewhere. The oil-only difference may overstate savings.</p></InformationCard>
      </div>
    </GuideSection>
    <DecisionChecklist id="checklist" title="Before You Decide" items={[
      "Confirm the exact oil specification, capacity, filter, and maintenance interval for your vehicle.",
      "Get an out-the-door shop quote for equivalent oil and services.",
      "Price all DIY oil, filter, gasket, and consumable purchases.",
      "Separate reusable equipment purchases from per-change costs.",
      "Estimate how many oil changes you will actually do each year.",
      "Check whether the shop includes tire rotation or other services you value.",
      "Make sure you can safely access the filter and drain plug.",
      "Find an approved used-oil recycling location before beginning.",
      "Consider your time and convenience separately from cash savings.",
      "Keep receipts and a dated maintenance log.",
    ]} />
    <QuestionsToAsk id="questions" title="Questions to Ask Before Changing Your Own Oil" subtitle="Use these questions to avoid comparing incomplete costs or overlooking maintenance requirements." questions={[
      "What oil grade, approval specification, and capacity does my engine require?",
      "Does the shop quote include taxes, fees, additional oil, or a tire rotation?",
      "What tools do I already own, and what would I need to buy?",
      "How many changes per year does my maintenance schedule actually require?",
      "Where can I take used oil and filters for recycling?",
      "Can I access the service points safely and follow the correct procedure?",
      "How much time will the DIY job and cleanup take compared with a shop visit?",
      "How will I document the maintenance for warranty and resale records?",
    ]} />
    <KeyTakeaways id="takeaways" items={[
      "DIY oil-change savings equal the shop price minus oil, filter, and other recurring DIY costs.",
      "Account for equipment purchases separately and calculate how many changes recover that cost.",
      "A discounted shop package can be competitive, especially when it includes other useful services.",
      "Follow your vehicle manufacturer specifications and actual maintenance schedule.",
      "Your time is a personal tradeoff; do not confuse time-adjusted savings with cash savings.",
      "Use safe access methods, recycle used oil properly, and retain maintenance records.",
    ]} />
    <Sources sources={[
      { title: "Managing, Reusing, and Recycling Used Oil", publisher: "U.S. Environmental Protection Agency", href: "https://www.epa.gov/recycle/managing-reusing-and-recycling-used-oil" },
      { title: "Auto Warranties and Auto Service Contracts", publisher: "Federal Trade Commission", href: "https://consumer.ftc.gov/articles/auto-warranties-and-auto-service-contracts" },
      { title: "Car Care and Maintenance", publisher: "AAA", href: "https://www.aaa.com/autorepair/articles" },
    ]} />
    <RelatedDecisions currentSlug="how-much-money-save-changing-your-own-oil" />
  </GuideLayout>;
}
