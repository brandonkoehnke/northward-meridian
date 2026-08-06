import type { Metadata } from "next";
import type { ReactNode } from "react";

import ArticleHero from "@/app/components/article/ArticleHero";
import ContinueExploring from "@/app/components/article/ContinueExploring";
import DecisionFramework from "@/app/components/article/DecisionFramework";
import DecisionSnapshot from "@/app/components/article/DecisionSnapshot";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import LearningObjectives from "@/app/components/article/LearningObjectives";
import OptionsAndTradeoffs from "@/app/components/article/OptionsAndTradeoffs";
import Recommendation from "@/app/components/article/Recommendation";
import Sources from "@/app/components/article/Sources";
import WaterHeaterScorecard from "@/app/components/article/WaterHeaterScorecard";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import type { Guide } from "@/lib/guide";

const canonicalUrl =
  "https://northwardmeridian.com/guides/repair-or-replace-water-heater";

const guide: Guide = {
  title: "Should You Repair or Replace Your Water Heater?",
  category: "Home",
  description:
    "A practical framework based on safety, failure type, age, warranty, repair history, installed cost, household needs, and potential efficiency improvements.",
  updated: "August 2026",
  readingTime: "15 min",
  recommendedFor:
    "Homeowners deciding whether to authorize a water-heater repair or obtain replacement quotes.",
  bottomLine:
    "Repair generally makes sense when the tank is sound, the failure is isolated and serviceable, the unit remains reliable, and the repair cost is modest compared with complete installed replacement. Replacement becomes more compelling when the tank itself has failed, safety is uncertain, repairs are recurring, the unit no longer meets household needs, or a major repair would preserve an aging and inefficient system.",
  learningObjectives: [
    "Which safety conditions should stop an ordinary repair-versus-replacement comparison",
    "How to distinguish a serviceable component problem from probable tank failure",
    "How to compare repair cost with complete installed replacement cost",
    "When age, warranty, recurring repairs, capacity, and efficiency should affect the decision",
  ],
  tags: [
    "water heaters",
    "home repair",
    "homeownership",
    "energy efficiency",
    "repair or replace",
  ],
};

export const metadata: Metadata = {
  title: `${guide.title} | Meridian`,
  description: guide.description,

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "article",
    url: canonicalUrl,
    siteName: "Meridian",
    title: guide.title,
    description: guide.description,
    publishedTime: "2026-08-06",
    modifiedTime: "2026-08-06",
  },

  twitter: {
    card: "summary",
    title: guide.title,
    description: guide.description,
  },

  /*
   * Leave this in place while reviewing the draft.
   * Delete the robots block before public launch.
   */
  robots: {
    index: false,
    follow: false,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: guide.description,
  datePublished: "2026-08-06",
  dateModified: "2026-08-06",
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

export default function RepairOrReplaceWaterHeaterGuide() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <ArticleHero
        category={guide.category}
        title={guide.title}
        description={guide.description}
        updated={guide.updated}
        readingTime={guide.readingTime}
      />

      <DecisionSnapshot
        recommendedFor={guide.recommendedFor}
        readingTime={guide.readingTime}
        updated={guide.updated}
        bottomLine={guide.bottomLine}
      />

      <SafetyCallout />

      <LearningObjectives items={guide.learningObjectives} />

      <WhyThisMatters>
        <p>
          A failed water heater creates two pressures at once: the practical
          need to restore hot water and the risk of spending money on the wrong
          solution. A low repair quote can be wasteful when the tank is failing,
          while replacing a sound, relatively young unit over an isolated
          component problem can also be unnecessary.
        </p>

        <p>
          The decision is more reliable when it begins with the location and
          nature of the failure. Age, repair cost, warranty, corrosion, service
          history, household demand, and potential energy savings should then
          modify the decision rather than replace a proper diagnosis.
        </p>

        <p>
          Avoid making the decision from one rule alone. “It is ten years old,”
          “the repair is half the replacement price,” or “there is water near
          the tank” may be useful observations, but none independently proves
          what should be done.
        </p>
      </WhyThisMatters>

      <GuideSection
        eyebrow="First Diagnosis"
        title="Find the source of the problem before pricing the solution."
      >
        <p>
          A puddle near a water heater does not automatically mean that the
          pressure vessel has failed. Water may come from a plumbing
          connection, drain valve, relief-system discharge, nearby equipment,
          or condensation. The repair decision changes substantially once the
          source is confirmed.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <InformationCard title="Problems that may be serviceable">
            <ul className="space-y-3">
              <Bullet>Loose or failed external plumbing connection</Bullet>
              <Bullet>Replaceable drain valve</Bullet>
              <Bullet>Electric heating element or thermostat</Bullet>
              <Bullet>Ignition, sensor, or control component</Bullet>
              <Bullet>Some anode-rod or maintenance-related conditions</Bullet>
              <Bullet>Properly diagnosed relief or expansion-system issue</Bullet>
            </ul>
          </InformationCard>

          <InformationCard title="Conditions that favor replacement">
            <ul className="space-y-3">
              <Bullet>Confirmed leakage through the tank body</Bullet>
              <Bullet>Leakage from a nonserviceable welded vessel area</Bullet>
              <Bullet>Severe corrosion or physical deformation</Bullet>
              <Bullet>Multiple failures on an aging system</Bullet>
              <Bullet>A system that remains inadequate after repair</Bullet>
              <Bullet>
                Major repair with weak remaining-life economics
              </Bullet>
            </ul>
          </InformationCard>
        </div>

        <p>
          Ask the professional to identify the failed part or leak location in
          writing. “The water heater is leaking” is not as useful as “the drain
          valve is leaking,” “the relief system is discharging,” or “the tank
          body is leaking.”
        </p>
      </GuideSection>

      <OptionsAndTradeoffs
        options={[
          {
            title: "Repair the Existing Unit",
            summary:
              "Repair preserves the current installation and can be the most economical choice when the vessel is sound and the failure is isolated.",
            pros: [
              "Lower immediate cost for many component failures",
              "Avoids unnecessary disposal of a serviceable unit",
              "May preserve meaningful warranty value",
              "Can restore service quickly when parts are available",
            ],
            cons: [
              "Does not reset the age of the tank or other components",
              "May postpone rather than eliminate near-term replacement",
              "Can be poor value when failures are recurring",
              "Does not correct inadequate capacity or an inefficient system",
            ],
          },
          {
            title: "Replace With a Similar Storage Unit",
            summary:
              "A like-for-like replacement can minimize redesign while providing a new tank, controls, and warranty.",
            pros: [
              "Familiar operating characteristics",
              "Often simpler than changing technologies",
              "Restores a complete system rather than one failed component",
              "Allows capacity and efficiency to be reconsidered",
            ],
            cons: [
              "Higher immediate installed cost",
              "Permit, disposal, venting, plumbing, or electrical work may apply",
              "A rushed replacement can lead to poor sizing",
              "Like-for-like replacement may miss a worthwhile upgrade",
            ],
          },
          {
            title: "Change Water-Heating Technology",
            summary:
              "Replacement may create an opportunity to consider heat-pump, tankless, indirect, or another system better suited to the home.",
            pros: [
              "May materially reduce energy use in the right application",
              "Can improve capacity, recovery, space use, or operating cost",
              "May qualify for available incentives",
              "Can align with future electrification or renovation plans",
            ],
            cons: [
              "May require electrical, plumbing, venting, or condensate changes",
              "Installed cost can be substantially higher",
              "Performance depends on climate, space, fuel, and usage",
              "Savings estimates require local utility rates and realistic demand",
            ],
          },
        ]}
      />

      <WaterHeaterScorecard />

      <DecisionFramework
        introduction="Use these six steps after addressing any immediate safety or water-damage concern."
        steps={[
          {
            title: "Confirm the failure and its location",
            description:
              "Obtain a diagnosis that identifies the failed part, leak source, safety condition, and whether the pressure vessel remains sound.",
          },
          {
            title: "Record the unit's age, model, and warranty",
            description:
              "Locate the data plate, serial number, installation date, proof of purchase, and model-specific warranty terms before authorizing work.",
          },
          {
            title: "Obtain itemized repair and replacement quotes",
            description:
              "The replacement quote should include equipment, labor, removal, permits, inspections, disposal, and any plumbing, gas, venting, electrical, drain, or code-related work.",
          },
          {
            title: "Evaluate reliability and household suitability",
            description:
              "Consider recent repairs, corrosion, hot-water shortages, changing household demand, installation conditions, and the consequences of another unexpected outage.",
          },
          {
            title: "Compare alternatives using local operating costs",
            description:
              "If replacement is credible, compare properly sized options using local energy prices, expected usage, installation requirements, maintenance, warranties, and available incentives.",
          },
          {
            title: "Choose based on total value—not only today's invoice",
            description:
              "Repair when it restores a sound and suitable system economically. Replace when the existing system has failed structurally, has weak reliability, no longer fits the home, or offers poor remaining value.",
          },
        ]}
      />

      <GuideSection
        eyebrow="Cost Comparison"
        title="Compare the complete decision cost on both sides."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormulaCard
            title="Repair-side cost"
            lines={[
              "Diagnostic or service fee",
              "Repair parts",
              "Repair labor",
              "Expected near-term additional repairs",
              "Cost and disruption of another outage",
            ]}
          />

          <FormulaCard
            title="Replacement-side cost"
            lines={[
              "New equipment",
              "Installation and removal",
              "Permit and inspection",
              "Plumbing, gas, venting, electrical, or drain changes",
              "Less warranty credits, rebates, or incentives",
            ]}
          />
        </div>

        <p>
          Do not compare a repair quote with the retail price of an uninstalled
          water heater. Compare the repair with the complete installed
          replacement cost for a properly sized, code-compliant system.
        </p>

        <p>
          Also avoid treating an efficiency estimate as guaranteed savings.
          Operating cost depends on fuel, local rates, water use, inlet-water
          temperature, equipment performance, maintenance, and installation.
        </p>
      </GuideSection>

      <GuideSection
        eyebrow="Worked Examples"
        title="See how the framework changes with the facts."
      >
        <div className="space-y-6">
          <ExampleCard
            label="Example 1"
            title="Young electric tank with a failed heating element"
            facts={[
              "The unit is four years old",
              "A professional confirms the tank is sound",
              "The heating element is replaceable",
              "There is no recent repair history",
              "The unit adequately serves the household",
            ]}
            result="Lean toward repair, subject to the quote and model-specific warranty."
          />

          <ExampleCard
            label="Example 2"
            title="Older tank with confirmed vessel leakage"
            facts={[
              "The unit is approximately twelve years old",
              "The leak is confirmed through the tank body",
              "Corrosion is visible",
              "The unit has required prior service",
            ]}
            result="Lean strongly toward replacement. A tank-body failure is not an ordinary component repair."
          />

          <ExampleCard
            label="Example 3"
            title="Middle-aged unit with an expensive control repair"
            facts={[
              "The unit is eight years old",
              "The tank is currently sound",
              "The warranty has expired",
              "The repair is a substantial share of complete replacement",
              "The homeowner expects to remain in the property",
            ]}
            result="Mixed decision. Compare remaining-life risk, local replacement options, operating costs, and the consequences of another failure."
          />

          <ExampleCard
            label="Example 4"
            title="A puddle with no confirmed source"
            facts={[
              "The unit is seven years old",
              "Water is visible near the base",
              "No one has identified the source",
              "There are no known combustion or electrical symptoms",
            ]}
            result="Diagnose first. Do not assume that visible water proves either a repairable valve problem or a failed tank."
          />
        </div>
      </GuideSection>

      <GuideSection
        eyebrow="Replacement Choice"
        title="A replacement decision is not automatically a technology decision."
      >
        <p>
          If replacement is warranted, first determine what the household
          requires. Storage capacity, first-hour performance, peak simultaneous
          use, fuel availability, electrical service, installation space,
          airflow, drainage, venting, noise, climate, and utility rates can all
          affect the best choice.
        </p>

        <p>
          Heat-pump water heaters can use substantially less electricity than
          conventional electric-resistance units in appropriate installations.
          They also require consideration of space, ambient conditions, sound,
          condensate drainage, recovery behavior, electrical requirements, and
          local economics.
        </p>

        <p>
          Tankless systems can reduce standby losses and provide continuous hot
          water within their flow capability, but they are not automatically
          inexpensive upgrades. Gas supply, venting, electrical needs,
          temperature rise, simultaneous demand, maintenance, and installation
          modifications must be evaluated.
        </p>

        <p>
          Ask for more than one properly scoped option when changing
          technologies. The least expensive appliance is not necessarily the
          least expensive installed system or the best lifetime value.
        </p>
      </GuideSection>

      <Recommendation
        summary="Repair a sound, suitable system when the failure is isolated and the economics are reasonable. Replace when the vessel has failed, safety or reliability is compromised, repairs are recurring, the system no longer meets household needs, or the complete long-term comparison favors a new installation."
        items={[
          {
            heading: "Repair when the pressure vessel remains sound",
            description:
              "Repair is strongest when the unit is relatively young, the problem is confined to a serviceable component, warranty coverage remains, prior reliability is good, and the repair restores appropriate performance.",
          },
          {
            heading: "Replace when the tank or system has reached a practical endpoint",
            description:
              "Replacement is strongest with confirmed vessel leakage, severe corrosion, repeated failures, inadequate capacity, poor remaining-life economics, or a major repair on an aging installation.",
          },
          {
            heading: "Diagnose before deciding when the evidence is incomplete",
            description:
              "An uncertain leak source, vague service description, missing warranty information, or nonitemized quote is a reason to gather better information—not to force an immediate repair-or-replace conclusion.",
          },
        ]}
      />

      <KeyTakeaways
        items={[
          "Possible gas, combustion, carbon-monoxide, electrical, pressure, overheating, or flooding hazards override the normal economic comparison.",
          "Visible water near a heater does not by itself confirm tank failure; identify the source.",
          "A confirmed tank-body or nonserviceable welded-vessel leak generally favors replacement.",
          "Age should modify the decision, but it should not replace diagnosis, warranty review, and cost analysis.",
          "Compare an itemized repair quote with complete installed replacement cost—not appliance retail price.",
          "Recurring repairs, corrosion, inadequate capacity, and outage risk can make a seemingly inexpensive repair poor value.",
          "Efficiency upgrades should be evaluated with local rates, realistic use, installation requirements, and available incentives.",
        ]}
      />

      <Sources
        sources={[
          {
            title: "Carbon Monoxide Information and Safety Guidance",
            publisher: "U.S. Consumer Product Safety Commission",
            href: "https://www.cpsc.gov/safety-education/neighborhood-safety-network/toolkits/carbon-monoxide-invisible-killer",
          },
          {
            title: "Home Heating Equipment and Carbon Monoxide Safety",
            publisher: "U.S. Consumer Product Safety Commission",
            href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center/Home-Heating-Equipment",
          },
          {
            title: "Selecting a New Water Heater",
            publisher: "U.S. Department of Energy",
            href: "https://www.energy.gov/energysaver/articles/selecting-new-water-heater",
          },
          {
            title: "Water Heating",
            publisher: "U.S. Department of Energy",
            href: "https://www.energy.gov/energysaver/heat-and-cool/water-heating",
          },
          {
            title: "Heat Pump Water Heaters: Benefits and Savings",
            publisher: "ENERGY STAR",
            href: "https://www.energystar.gov/products/heat_pump_water_heaters/benefits-savings",
          },
          {
            title: "Water-Heater Technical Bulletins",
            publisher: "A. O. Smith",
            href: "https://www.hotwater.com/info-center/technical-bulletins.html",
          },
          {
            title: "Water-Heater Support, Manuals, and Product Literature",
            publisher: "A. O. Smith",
            href: "https://www.hotwater.com/support.html",
          },
        ]}
      />

      <ContinueExploring
        guides={[
          {
            title: "Browse All Meridian Guides",
            description:
              "Explore decision-focused guides for home, business, technology, finance, and everyday choices.",
            href: "/guides",
            category: "Meridian",
          },
        ]}
      />
    </main>
  );
}

function SafetyCallout() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-4 pb-12">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-800">
          Stop and Address Safety First
        </p>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Do not begin with a cost comparison when there may be an immediate
          hazard.
        </h2>

        <p className="mt-4 leading-8 text-red-950">
          Leave the area and contact emergency services or the appropriate
          utility when you suspect a gas leak or carbon-monoxide exposure.
          Arrange qualified evaluation for abnormal combustion, blocked or
          damaged venting, scorching, damaged wiring, repeated breaker trips,
          uncontrolled overheating, relief-system problems, or rapidly
          expanding leakage.
        </p>

        <p className="mt-4 text-sm leading-6 text-red-900">
          Never plug, cap, or disable a temperature-and-pressure relief device.
          Follow the appliance manufacturer’s instructions and local emergency
          guidance.
        </p>
      </div>
    </section>
  );
}

type GuideSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

function GuideSection({
  eyebrow,
  title,
  children,
}: GuideSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          {title}
        </h2>

        <div className="mt-8 space-y-6 text-lg leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}

type InformationCardProps = {
  title: string;
  children: ReactNode;
};

function InformationCard({
  title,
  children,
}: InformationCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <div className="mt-6 text-base leading-7 text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
      />

      <span>{children}</span>
    </li>
  );
}

type FormulaCardProps = {
  title: string;
  lines: string[];
};

function FormulaCard({ title, lines }: FormulaCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <ul className="mt-6 space-y-3">
        {lines.map((line) => (
          <Bullet key={line}>{line}</Bullet>
        ))}
      </ul>
    </div>
  );
}

type ExampleCardProps = {
  label: string;
  title: string;
  facts: string[];
  result: string;
};

function ExampleCard({
  label,
  title,
  facts,
  result,
}: ExampleCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        {label}
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      <ul className="mt-6 space-y-3 text-base leading-7 text-[var(--muted)]">
        {facts.map((fact) => (
          <Bullet key={fact}>{fact}</Bullet>
        ))}
      </ul>

      <div className="mt-7 border-l-4 border-[var(--accent)] pl-5">
        <p className="font-semibold">Planning result</p>
        <p className="mt-2 text-base leading-7 text-[var(--muted)]">
          {result}
        </p>
      </div>
    </article>
  );
}