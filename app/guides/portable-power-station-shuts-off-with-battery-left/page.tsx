import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import GuideSection from "@/app/components/article/GuideSection";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { InformationCard } from "@/app/components/article/GuidePrimitives";
import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import Sources from "@/app/components/article/Sources";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import { getGuideBySlug } from "@/lib/guides";
import PowerStationShutdownChecker from "./PowerStationShutdownChecker";

const slug = "portable-power-station-shuts-off-with-battery-left";
const guide = (() => { const found = getGuideBySlug(slug); if (!found) throw new Error(`Missing guide: ${slug}`); return found; })();
const url = `https://www.northwardmeridian.com${guide.href}`;
export const metadata: Metadata = {
  title: `${guide.title} | Northward Meridian`, description: guide.description,
  alternates: { canonical: url },
  openGraph: { type: "article", title: guide.title, description: guide.description, url, siteName: "Northward Meridian", publishedTime: "2026-11-19", modifiedTime: guide.lastModified },
  twitter: { card: "summary", title: guide.title, description: guide.description },
};
const structuredData = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: "2026-11-19", dateModified: guide.lastModified, mainEntityOfPage: url, author: { "@type": "Organization", name: "Northward Meridian", url: "https://www.northwardmeridian.com/about" }, publisher: { "@type": "Organization", name: "Northward Meridian", url: "https://www.northwardmeridian.com" } };
const sections = [
  { id: "shutdown-checker", label: "Shutdown checker" },
  { id: "why-it-matters", label: "Battery left vs output on" },
  { id: "causes", label: "Common shutdown causes" },
  { id: "test", label: "Safe troubleshooting" },
  { id: "examples", label: "Worked scenarios" },
  { id: "checklist", label: "Before changing settings" },
  { id: "questions", label: "Questions to verify" },
  { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
  { id: "quiet", title: "My router or small device stops receiving power after a while.", summary: "Low-load ECO or output timeout may be involved.", guidance: "Check the exact model's output timeout setting and the device's normal idle demand.", destinationId: "shutdown-checker", destinationLabel: "Shutdown checker" },
  { id: "fridge", title: "My refrigerator shuts off even though the battery is not empty.", summary: "Intermittent loads can trigger timeouts; startup surge is a separate issue.", guidance: "Record whether it stops after an idle period or as the compressor starts.", destinationId: "examples", destinationLabel: "Worked scenarios" },
  { id: "warning", title: "I see an overload, temperature, or battery warning.", summary: "Warnings take priority over guessing at ECO settings.", guidance: "Stop repeated tests and follow the exact model's warning instructions.", destinationId: "shutdown-checker", destinationLabel: "Shutdown checker" },
] as const;
export default function PortablePowerStationGuide() {
  return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} sections={sections} structuredData={structuredData} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
    <PowerStationShutdownChecker />
    <WhyThisMatters id="why-it-matters"><p>A portable power station can show battery charge while its AC or DC output is off. The percentage display estimates stored energy; it does not tell you whether an output timer, ECO mode, overload protection, temperature protection, or a fault has disabled a connection.</p><p>Identify whether the entire station shut down or only one output stopped. Note any warning icon and the exact timing. A refrigerator cycling on and off creates a different diagnostic problem from a heater that trips an overload immediately.</p></WhyThisMatters>
    <GuideSection id="causes" eyebrow="Shutdown Causes" title="The same symptom can have several explanations."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="Low-load ECO mode"><p>Some models shut off AC or DC output after a period of low or no demand. The BLUETTI Apex 300 documentation describes separate ECO settings. These settings and defaults vary by model and manual revision.</p></InformationCard>
      <InformationCard title="AC output timeout"><p>EcoFlow documents AC-output timeouts on certain DELTA models, including cases where intermittent loads such as refrigerators can trigger shutdown. Check the manual for your exact model before changing an app setting.</p></InformationCard>
      <InformationCard title="Overload and startup surge"><p>A compressor or motor may briefly demand more power at startup than during steady running. An overload indicator is a reason to inspect rated output and appliance requirements, not to repeatedly reset protection.</p></InformationCard>
      <InformationCard title="Temperature, battery, and system faults"><p>High or low temperature, battery warnings, and system fault codes require model-specific instructions. An abrupt percentage change is a clue, not proof of a defective battery.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="test" eyebrow="Step by Step" title="Troubleshoot without defeating safety protections."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="1. Record what stopped"><p>Did the screen go dark, or only the AC or DC output? Record the displayed charge, warning symbols, and whether the shutdown happened at startup or after an idle period.</p></InformationCard>
      <InformationCard title="2. Identify the exact model"><p>Look up the manufacturer manual for your full model designation. ECO thresholds, output timeouts, and supported operating modes are not universal across brands.</p></InformationCard>
      <InformationCard title="3. Compare the load and rating"><p>Check the appliance&apos;s running and starting requirements against the station&apos;s documented continuous and surge ratings. Do not infer suitability from watt-hours alone.</p></InformationCard>
      <InformationCard title="4. Test only when appropriate"><p>With no fault warnings and no critical equipment depending on the station, follow the manufacturer&apos;s supported checks using an appropriate noncritical load. Stop if the warning returns or damage is suspected.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="examples" eyebrow="Worked Scenarios" title="Timing and warning indicators change the next step."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="Router shuts off after hours"><p>With a low continuous load and no warning, review the model&apos;s low-load ECO or no-load timeout behavior. Do not assume every station has the same threshold.</p></InformationCard>
      <InformationCard title="Refrigerator stops between cycles"><p>Intermittent demand may be interpreted as inactivity by certain models. Compare the timeout setting and separately investigate compressor startup requirements.</p></InformationCard>
      <InformationCard title="Overload when a motor starts"><p>The startup demand may exceed supported output. Stop repeated overload attempts, check specifications, and seek manufacturer guidance when uncertain.</p></InformationCard>
      <InformationCard title="Battery display suddenly drops"><p>Record the charge reading and error indicators. Follow only the manufacturer&apos;s documented battery diagnostic or calibration guidance; never open the pack.</p></InformationCard>
    </div><p className="mt-6 leading-7">For more on choosing backup equipment, see <Link href="/guides/is-a-home-battery-backup-worth-it" className="font-semibold text-[var(--accent)] underline underline-offset-4">Is a Home Battery Backup Worth It?</Link>. That guide addresses backup economics; this one focuses on unexpected portable-station shutdowns.</p></GuideSection>
    <DecisionChecklist id="checklist" title="Before Changing Settings or Buying a Replacement" items={["Record the exact model and current firmware version if available.", "Identify whether the entire unit or only AC/DC output stopped.", "Note warnings, battery percentage, connected load, and shutdown timing.", "Check the model manual for ECO, output timeout, charge limits, and protection indications.", "Verify continuous and starting-power requirements for connected appliances.", "Keep critical equipment on a verified appropriate power arrangement; do not rely on a settings change alone.", "Stop repeated testing and contact support if a fault warning persists."]}/>
    <QuestionsToAsk id="questions" title="Questions to Verify" subtitle="Manufacturer-specific instructions matter more than generic shutdown thresholds." questions={["Does my model have separate unit, AC, and DC auto-off settings?", "What ECO thresholds and timeouts are documented for this exact model?", "Was the output idle, or did an appliance start when the shutdown happened?", "Did a warning icon or error code appear?", "Are the load's startup requirements within the station's documented output limits?", "Does the station support the intended backup or medical use case?", "Does the manufacturer recommend contacting support for this warning pattern?"]}/>
    <KeyTakeaways id="takeaways" items={["Battery percentage does not guarantee that AC or DC output remains enabled.", "ECO modes and timeouts can turn off low or intermittent loads on certain models.", "Overload, temperature, battery, and system-fault warnings take priority over routine timeout troubleshooting.", "Startup surge and continuous wattage are different specifications.", "Use the exact manufacturer manual; do not apply another model's settings or thresholds.", "Do not bypass protective circuits or assume a timeout adjustment makes critical backup power reliable."]}/>
    <Sources sources={[{ title: "DELTA 3 Portable Power Station User Manual", publisher: "EcoFlow", href: "https://manuals.ecoflow.com/us/product/delta-3-portable-power-station?lang=en_US" }, { title: "Apex 300 User Manual (US)", publisher: "BLUETTI", href: "https://s4.bluettipower.com/bluetti/purchasePageBiz/2025/12/Apex%20300%20User%20Manual%20US%20EN-FR-1766559036434-ebae.pdf" }, { title: "DELTA 2 App User Manual — Auto Timeout", publisher: "EcoFlow", href: "https://websiteoss.ecoflow.com/cms/upload/2023/8/29/EcoFlow%20DELTA%202%20-%20App%20User%20Manual%20V1.0_1693295643575.pdf" }]}/>
    <RelatedDecisions currentSlug={slug}/>
  </GuideLayout>;
}
