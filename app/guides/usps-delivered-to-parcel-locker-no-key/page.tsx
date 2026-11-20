
import type { Metadata } from "next";

import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import { InformationCard } from "@/app/components/article/GuidePrimitives";
import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import Sources from "@/app/components/article/Sources";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";

import { getGuideBySlug } from "@/lib/guides";
import ParcelLockerChecker from "./ParcelLockerChecker";

// --------------------------------------------------
// Guide registry
// --------------------------------------------------

const slug = "usps-delivered-to-parcel-locker-no-key";

const guide = (() => {
  const found = getGuideBySlug(slug);

  if (!found) {
    throw new Error(`Guide not found: ${slug}`);
  }

  return found;
})();

// --------------------------------------------------
// SEO metadata
// --------------------------------------------------

const canonicalUrl = `https://www.northwardmeridian.com${guide.href}`;

const seoTitle =
  "USPS Says Delivered to Parcel Locker, but No Key?";

const seoDescription =
  "USPS says your package was delivered to a parcel locker, but you have no key or code? Follow a quick checklist for mailbox, management, and USPS next steps.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "article",
    title: seoTitle,
    description: seoDescription,
    url: canonicalUrl,
    siteName: "Northward Meridian",
    publishedTime: "2026-11-20",
    modifiedTime: guide.lastModified,
  },

  twitter: {
    card: "summary",
    title: seoTitle,
    description: seoDescription,
  },
};

// --------------------------------------------------
// Structured data
// --------------------------------------------------

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: seoDescription,
  datePublished: "2026-11-20",
  dateModified: guide.lastModified,
  mainEntityOfPage: canonicalUrl,

  author: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://www.northwardmeridian.com/about",
  },

  publisher: {
    "@type": "Organization",
    name: "Northward Meridian",
    url: "https://www.northwardmeridian.com",
  },
};

// --------------------------------------------------
// Page navigation
// --------------------------------------------------

const sections = [
  {
    id: "parcel-locker-checker",
    label: "What to do next",
  },
  {
    id: "why-it-happens",
    label: "What the status means",
  },
  {
    id: "first-checks",
    label: "Check the mailbox and locker",
  },
  {
    id: "who-to-contact",
    label: "Who to contact",
  },
  {
    id: "service-request",
    label: "When to contact USPS",
  },
  {
    id: "checklist",
    label: "Before reporting",
  },
  {
    id: "takeaways",
    label: "Key takeaways",
  },
] as const;

// --------------------------------------------------
// Guided entry scenarios
// --------------------------------------------------

const scenarios = [
  {
    id: "no-key",
    title: "USPS says parcel locker, but I have no key.",
    summary:
      "Check your regular mailbox, delivery notice, and mailroom.",
    guidance:
      "Do not assume a parcel-locker scan means you received a key or access code.",
    destinationId: "parcel-locker-checker",
    destinationLabel: "Delivery access checker",
  },
  {
    id: "wrong-key",
    title: "The parcel-locker key does not open the locker.",
    summary:
      "Record the locker number and contact the responsible party.",
    guidance:
      "Do not force the lock or try another resident&apos;s compartment.",
    destinationId: "who-to-contact",
    destinationLabel: "Who to contact",
  },
  {
    id: "missing",
    title: "The package is still missing after the delivery scan.",
    summary:
      "USPS provides a service-request process for eligible missing delivered items.",
    guidance:
      "First check the normal delivery locations, then follow USPS&apos;s timing guidance.",
    destinationId: "service-request",
    destinationLabel: "When to contact USPS",
  },
] as const;

// --------------------------------------------------
// Guide page
// --------------------------------------------------

export default function ParcelLockerGuide() {
  return (
    <GuideLayout
      category={guide.category}
      title={guide.title}
      description={guide.description}
      updated={guide.updated}
      readingTime={guide.readingTime}
      recommendedFor={guide.recommendedFor}
      bottomLine={guide.bottomLine}
      sections={sections}
      structuredData={structuredData}
      guidedEntry={<GuidedEntry scenarios={scenarios} />}
    >
      {/* Interactive checker */}

      <ParcelLockerChecker />

      {/* What the tracking status means */}

      <GuideSection
        id="why-it-happens"
        eyebrow="What the Scan Means"
        title="Delivered to a parcel locker does not mean the key reached you."
      >
        <p>
          USPS explains that a parcel-locker key may be left inside the
          recipient&apos;s regular mailbox in a multi-unit community
          mailbox. The key tag identifies the corresponding parcel
          locker.
        </p>

        <p>
          In some locations, access may instead involve a
          building-managed or electronic locker system.
        </p>

        <p>
          Start by identifying which locker system your address uses.
          The tracking scan alone does not prove that the package is
          in an accessible compartment or that you received the
          correct key.
        </p>
      </GuideSection>

      {/* First checks */}

      <GuideSection
        id="first-checks"
        eyebrow="First Five Minutes"
        title="Check the places most likely to resolve it quickly."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <InformationCard title="Regular mailbox">
            <p>
              Check for a small parcel-locker key, tag, or paper
              notice. Verify the locker number printed on the tag.
              Do not force a lock.
            </p>
          </InformationCard>

          <InformationCard title="Building mailroom">
            <p>
              If you live in an apartment or condominium, check
              whether building staff or the mailroom manages
              deliveries or electronic access.
            </p>
          </InformationCard>

          <InformationCard title="Household and delivery areas">
            <p>
              Ask household members and check the locations USPS
              lists for missing delivered items, including the
              normal mailbox and protected delivery spots.
            </p>
          </InformationCard>

          <InformationCard title="Electronic locker">
            <p>
              Check for an official access notification. Do not
              post pickup codes, tracking numbers, or account
              details publicly.
            </p>
          </InformationCard>
        </div>
      </GuideSection>

      {/* Who to contact */}

      <GuideSection
        id="who-to-contact"
        eyebrow="Choose the Right Contact"
        title="Building management and USPS handle different problems."
      >
        <p>
          If your building uses its own parcel lockers or staffed
          mailroom, management may be able to explain the access
          procedure or confirm whether it accepted the parcel.
        </p>

        <p>
          If a USPS parcel-locker key was not left, does not match,
          or the USPS delivery scan cannot be reconciled with the
          package, contact the delivering Post Office through
          official USPS channels.
        </p>

        <p>
          Do not assume a private locker provider, building
          manager, and USPS have interchangeable access to the
          same compartments.
        </p>
      </GuideSection>

      {/* USPS escalation */}

      <GuideSection
        id="service-request"
        eyebrow="USPS Escalation"
        title="When should you submit a missing-package request?"
      >
        <p>
          USPS&apos;s official{" "}
          <a
            className="font-semibold text-[var(--accent)] underline"
            href="https://faq.usps.com/articles/FAQ/Where-is-my-package"
          >
            Where Is My Package?
          </a>{" "}
          guidance advises checking likely delivery locations
          first.
        </p>

        <p>
          If the item is still missing and more than one postal
          business day has passed since the Delivered scan, USPS
          says eligible items can be reported using its
          service-request process.
        </p>

        <p>
          Explain that tracking says{" "}
          <strong>Delivered to parcel locker</strong> but the
          required key or access information was not provided,
          or that the key does not work.
        </p>

        <p>
          Include the scan date, locker number if known, and
          delivery address in the private USPS request. Do not
          post personal details in public forums.
        </p>

        <p>
          If a package is time-sensitive or contains something
          essential, contact the delivering Post Office promptly
          rather than relying only on a generic online checklist.
        </p>
      </GuideSection>

      {/* Checklist */}

      <DecisionChecklist
        id="checklist"
        title="Before Reporting a Missing Parcel-Locker Package"
        items={[
          "Confirm the USPS tracking status and delivery date.",
          "Check your regular mailbox for a locker key or notice.",
          "Look for the locker number on any key tag; do not force a lock.",
          "Check with building management or the mailroom when applicable.",
          "Ask household members and check ordinary delivery locations.",
          "Record the missing-key or access problem precisely for the delivering Post Office.",
          "Use USPS's official service-request process when eligible; keep the confirmation number.",
        ]}
      />

      {/* Key takeaways */}

      <KeyTakeaways
        id="takeaways"
        items={[
          "A Delivered scan does not guarantee you received a usable parcel-locker key.",
          "For community mailboxes, USPS may leave a numbered parcel-locker key in the regular mailbox.",
          "Check whether your building operates a separate mailroom or locker system.",
          "Do not force locks, try other compartments, or share access codes publicly.",
          "USPS provides an official service-request path for eligible missing delivered items after its stated waiting period.",
        ]}
      />

      {/* Sources */}

      <Sources
        sources={[
          {
            title: "Where is my package? Tracking Status Help",
            publisher: "United States Postal Service",
            href: "https://faq.usps.com/articles/FAQ/Where-is-my-package",
          },
          {
            title: "What is a Cluster Box?",
            publisher: "United States Postal Service",
            href: "https://faq.usps.com/s/article/What-is-a-Cluster-Box",
          },
        ]}
      />

      {/* Related guides */}

      <RelatedDecisions currentSlug={slug} />
    </GuideLayout>
  );
}
