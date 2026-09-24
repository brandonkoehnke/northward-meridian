import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import NasVsCloudRealityCheck from "@/app/components/article/NasVsCloudRealityCheck";
import {
    GuideBullet,
    InformationCard,
} from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

const guide = (() => {
    const found = getGuideBySlug(
        "should-i-buy-a-nas-or-use-cloud-storage",
    );

    if (!found) {
        throw new Error(
            "Guide not found: should-i-buy-a-nas-or-use-cloud-storage",
        );
    }

    return found;
})();

const siteUrl = "https://northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "nas-vs-cloud-reality-check",
        label: "NAS vs. cloud reality check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "what-you-are-buying",
        label: "What you are really buying",
    },
    {
        id: "local-vs-cloud",
        label: "Local storage vs. cloud storage",
    },
    {
        id: "backup-is-different",
        label: "Storage is not the same as backup",
    },
    {
        id: "nas-costs",
        label: "The real cost of a NAS",
    },
    {
        id: "cloud-costs",
        label: "The real cost of cloud storage",
    },
    {
        id: "break-even",
        label: "Where the break-even point comes from",
    },
    {
        id: "capacity-and-growth",
        label: "Capacity and future growth",
    },
    {
        id: "convenience-and-control",
        label: "Convenience vs. control",
    },
    {
        id: "when-nas-makes-sense",
        label: "When a NAS can make sense",
    },
    {
        id: "when-cloud-makes-sense",
        label: "When cloud storage can make sense",
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
        id: "photos-and-files",
        title: "I mostly need storage for photos and documents",
        summary:
            "Compare simple cloud storage with the cost and responsibility of running a NAS.",
        guidance:
            "Start with the calculator using the cloud plan you would realistically buy and a realistic NAS configuration. For relatively modest storage needs, recurring cloud pricing and convenience may matter more than raw local capacity.",
        destinationId: "nas-vs-cloud-reality-check",
        destinationLabel: "NAS vs. Cloud Reality Check",
    },
    {
        id: "large-library",
        title: "I have a large media library",
        summary:
            "See how recurring cloud costs compare when the amount of data gets large.",
        guidance:
            "Large local media collections can make storage economics very different from a small document library. Include the actual drive capacity and replacement assumptions rather than comparing only the NAS enclosure price.",
        destinationId: "nas-vs-cloud-reality-check",
        destinationLabel: "NAS vs. Cloud Reality Check",
    },
    {
        id: "backup",
        title: "I mainly want a backup system",
        summary:
            "Separate local storage from independent off-site backup.",
        guidance:
            "A NAS can be useful as one layer of a backup system, but do not assume that a second copy on the same device or in the same room provides complete protection against theft, fire, or other local disasters.",
        destinationId: "backup-is-different",
        destinationLabel: "Storage Is Not the Same as Backup",
    },
    {
        id: "low-maintenance",
        title: "I do not want another piece of hardware to manage",
        summary:
            "Account for maintenance and administration, not just the purchase price.",
        guidance:
            "A NAS gives you control, but you become responsible for hardware, software, updates, drives, configuration, and recovery procedures. Compare that responsibility with the convenience of a hosted service.",
        destinationId: "convenience-and-control",
        destinationLabel: "Convenience vs. Control",
    },
    {
        id: "privacy-control",
        title: "I want maximum control over my files",
        summary:
            "Understand what you gain by keeping data locally.",
        guidance:
            "A NAS can provide local control over where your primary files live and how they are accessed. That can matter independently of the financial break-even point.",
        destinationId: "convenience-and-control",
        destinationLabel: "Convenience vs. Control",
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

export default function NasVsCloudStorageGuide() {
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
            <NasVsCloudRealityCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    A NAS can be cheaper than paying for cloud storage forever,
                    especially when you need a large amount of local capacity.
                    But the purchase price is only part of the comparison. A
                    NAS also requires drives, electricity, maintenance, and
                    eventually replacement hardware.
                </p>

                <p>
                    Cloud storage has the opposite cost structure. You generally
                    avoid buying and maintaining the local hardware, but you
                    continue paying for storage as long as you use the service.
                    Cloud plans can also include features that make them more
                    convenient than a self-managed NAS.
                </p>

                <p>
                    The most important distinction is between <strong>
                        storage
                    </strong>{" "}
                    and <strong>backup</strong>. A NAS can store your files
                    locally, but a local NAS alone is not an independent
                    off-site backup. CISA recommends keeping three copies of
                    important data, using two different media types, with one
                    copy stored off-site.{" "}
                    <a
                        href="https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CISA backup guidance
                    </a>
                </p>
            </WhyThisMatters>

            <GuideSection
                id="what-you-are-buying"
                eyebrow="Start With The Decision"
                title="A NAS and a cloud subscription solve overlapping but different problems."
            >
                <p>
                    Buying a NAS means purchasing and operating computing and
                    storage hardware in your own home or office. You get local
                    capacity and control, but you also take responsibility for
                    the system.
                </p>

                <p>
                    Paying for cloud storage means renting capacity from a
                    provider that operates the infrastructure for you. The
                    recurring subscription is the obvious cost, but the
                    provider also handles much of the physical infrastructure
                    and service delivery.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="A NAS gives you">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Local storage capacity.
                            </GuideBullet>
                            <GuideBullet>
                                Control over your hardware and configuration.
                            </GuideBullet>
                            <GuideBullet>
                                Fast local access on your network.
                            </GuideBullet>
                            <GuideBullet>
                                The ability to expand or replace drives as
                                needed.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Cloud storage gives you">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Hosted infrastructure.
                            </GuideBullet>
                            <GuideBullet>
                                Recurring capacity without buying local drives.
                            </GuideBullet>
                            <GuideBullet>
                                Remote access without operating your own
                                server.
                            </GuideBullet>
                            <GuideBullet>
                                Provider-managed infrastructure and service
                                availability.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="local-vs-cloud"
                eyebrow="The Core Tradeoff"
                title="The financial comparison is mostly upfront ownership vs. recurring service."
            >
                <p>
                    The simplest cloud calculation is straightforward:
                    monthly price multiplied by the number of months you expect
                    to use the service.
                </p>

                <p>
                    The NAS calculation is more complicated because the
                    upfront hardware cost is followed by operating and
                    replacement costs. Electricity is usually not the biggest
                    cost, but it should still be included when comparing a
                    system over several years.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Simplified model
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <InformationCard title="Cloud">
                            <p>
                                Monthly subscription × months used
                            </p>
                        </InformationCard>

                        <InformationCard title="NAS">
                            <p>
                                Enclosure + drives + electricity + maintenance
                            </p>
                        </InformationCard>
                    </div>
                </div>

                <p>
                    Neither formula captures every possible cost. The point is
                    to make the major recurring and upfront components visible
                    rather than comparing a one-time NAS purchase against an
                    indefinitely recurring cloud payment without context.
                </p>
            </GuideSection>

            <GuideSection
                id="backup-is-different"
                eyebrow="Critical Distinction"
                title="A NAS can be part of a backup strategy without being the entire backup strategy."
            >
                <p>
                    A storage device and a backup system are not identical.
                    If your computer synchronizes files to a NAS, you may have
                    two copies, but both copies can still be exposed to the
                    same physical disaster or other failure.
                </p>

                <p>
                    CISA&apos;s backup guidance describes the 3-2-1 approach as
                    maintaining three copies of important data, on two different
                    media types, with one copy stored off-site.{" "}
                    <a
                        href="https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CISA
                    </a>
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Primary copy">
                        <p>
                            The files you use day to day.
                        </p>
                    </InformationCard>

                    <InformationCard title="Local backup">
                        <p>
                            A second copy that can provide fast local recovery.
                        </p>
                    </InformationCard>

                    <InformationCard title="Off-site copy">
                        <p>
                            An independent copy that can survive a local
                            disaster.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    This is why the calculator includes an optional off-site
                    backup cost. Comparing cloud storage against a NAS plus
                    independent backup is often a more meaningful comparison
                    than comparing cloud storage against a NAS alone.
                </p>
            </GuideSection>

            <GuideSection
                id="nas-costs"
                eyebrow="Ownership Cost"
                title="The NAS purchase price is only the beginning."
            >
                <p>
                    A realistic NAS budget can include more than the enclosure
                    and initial drives.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        NAS enclosure and included hardware.
                    </GuideBullet>
                    <GuideBullet>
                        Storage drives.
                    </GuideBullet>
                    <GuideBullet>
                        Electricity over the system&apos;s life.
                    </GuideBullet>
                    <GuideBullet>
                        Replacement drives as hardware ages or fails.
                    </GuideBullet>
                    <GuideBullet>
                        Network equipment or upgrades if your existing network
                        cannot support the workload.
                    </GuideBullet>
                    <GuideBullet>
                        Optional UPS, cooling, or other supporting hardware.
                    </GuideBullet>
                    <GuideBullet>
                        Off-site backup if the NAS is intended to be part of a
                        resilient backup system.
                    </GuideBullet>
                    <GuideBullet>
                        Your time spent maintaining and troubleshooting it.
                    </GuideBullet>
                </ul>

                <p>
                    The calculator includes the major financial components that
                    can be reasonably modeled without pretending to know every
                    user&apos;s hardware configuration.
                </p>
            </GuideSection>

            <GuideSection
                id="cloud-costs"
                eyebrow="Subscription Cost"
                title="Cloud storage is simple to price, but the tier you need matters."
            >
                <p>
                    Cloud storage services commonly sell several capacity tiers,
                    so the correct comparison starts with the plan you would
                    realistically use rather than an arbitrary price per
                    terabyte.
                </p>

                <p>
                    For example, Google currently lists U.S. plans including
                    100 GB at $1.99 per month, 2 TB at $9.99 per month, and 5 TB
                    at $19.99 per month. Apple currently lists U.S. iCloud+
                    plans including 2 TB at $9.99 per month, 6 TB at $29.99,
                    and 12 TB at $59.99. Pricing and included features can
                    change, so treat provider pricing as a current reference
                    rather than a permanent assumption.{" "}
                    <a
                        href="https://one.google.com/about/plans"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Google One
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://www.apple.com/icloud/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Apple iCloud+
                    </a>
                </p>

                <p>
                    Cloud services can also bundle features beyond storage.
                    Family sharing, photo organization, device backups,
                    productivity tools, or other included features can have
                    value that a raw storage-price comparison does not capture.
                </p>
            </GuideSection>

            <GuideSection
                id="break-even"
                eyebrow="Do The Math"
                title="A break-even point only answers the financial part of the decision."
            >
                <p>
                    When the modeled NAS hardware cost is large but the ongoing
                    NAS operating cost is low, a break-even point can show when
                    avoided cloud payments have recovered the upfront
                    investment.
                </p>

                <p>
                    That number should not be treated as a universal answer.
                    It depends on the cloud tier, NAS hardware, energy cost,
                    maintenance assumptions, and comparison period you enter.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Think in total cost
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        A NAS may cross the financial break-even point while
                        still requiring you to operate and back up the hardware
                        yourself.
                    </p>

                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                        Conversely, a cloud service may cost more over a long
                        period while eliminating substantial maintenance and
                        hardware responsibilities.
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="capacity-and-growth"
                eyebrow="Capacity Planning"
                title="The cheapest option today can become the wrong comparison when your storage needs grow."
            >
                <p>
                    Storage requirements rarely stay perfectly fixed. Photos,
                    videos, backups, games, projects, and other files can grow
                    over time.
                </p>

                <p>
                    Cloud providers often let you move to a larger storage tier
                    when needed. A NAS can also expand, but the path depends on
                    the enclosure, number of drive bays, RAID or redundancy
                    configuration, and how you chose to build the system.
                </p>

                <p>
                    That is why the calculator intentionally asks for a usable
                    NAS capacity and a comparison period rather than pretending
                    that every NAS can grow indefinitely without another capital
                    purchase.
                </p>
            </GuideSection>

            <GuideSection
                id="convenience-and-control"
                eyebrow="Beyond The Math"
                title="You are also paying for convenience, control, and responsibility."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="NAS: more control">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You control the local hardware.
                            </GuideBullet>
                            <GuideBullet>
                                You choose drives and system configuration.
                            </GuideBullet>
                            <GuideBullet>
                                Local access can be very fast.
                            </GuideBullet>
                            <GuideBullet>
                                You can run additional services on suitable
                                hardware.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="NAS: more responsibility">
                        <ul className="space-y-3">
                            <GuideBullet>
                                You maintain the hardware.
                            </GuideBullet>
                            <GuideBullet>
                                You manage software and updates.
                            </GuideBullet>
                            <GuideBullet>
                                You are responsible for recovery planning.
                            </GuideBullet>
                            <GuideBullet>
                                You need an independent backup for strong
                                disaster protection.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Cloud: more convenience">
                        <ul className="space-y-3">
                            <GuideBullet>
                                No local storage server to build.
                            </GuideBullet>
                            <GuideBullet>
                                Capacity can often be changed through the
                                provider.
                            </GuideBullet>
                            <GuideBullet>
                                Remote access is generally part of the service.
                            </GuideBullet>
                            <GuideBullet>
                                Physical infrastructure is operated by the
                                provider.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Cloud: less control">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Your access depends on the service and account.
                            </GuideBullet>
                            <GuideBullet>
                                Pricing and features can change.
                            </GuideBullet>
                            <GuideBullet>
                                Service-specific policies and limits apply.
                            </GuideBullet>
                            <GuideBullet>
                                Your data is stored on infrastructure operated
                                by someone else.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-nas-makes-sense"
                eyebrow="When Local Ownership Fits"
                title="A NAS can make more sense when you need substantial local capacity and are comfortable operating it."
            >
                <p>
                    The financial case for a NAS becomes more interesting as
                    the amount of storage increases and the system is used for
                    several years.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Large local storage needs">
                        <p>
                            A large media or file collection can make recurring
                            cloud storage expensive over a long period.
                        </p>
                    </InformationCard>

                    <InformationCard title="Fast local access">
                        <p>
                            Local network access can be valuable for large files,
                            media libraries, and other workloads where local
                            transfers matter.
                        </p>
                    </InformationCard>

                    <InformationCard title="You enjoy managing hardware">
                        <p>
                            Some people value the control and flexibility enough
                            to make the maintenance burden part of the appeal.
                        </p>
                    </InformationCard>

                    <InformationCard title="You want local ownership">
                        <p>
                            Keeping a primary copy under your own control can
                            matter independently of the long-term dollar cost.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="when-cloud-makes-sense"
                eyebrow="When Service Fits"
                title="Cloud storage can make more sense when convenience and low maintenance matter most."
            >
                <p>
                    A recurring subscription can be reasonable when you do not
                    want to buy, configure, and maintain local storage hardware.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Smaller storage needs">
                        <p>
                            A modest amount of data may not justify a dedicated
                            NAS and its supporting hardware.
                        </p>
                    </InformationCard>

                    <InformationCard title="Low maintenance">
                        <p>
                            Cloud storage avoids much of the physical hardware
                            management required by a NAS.
                        </p>
                    </InformationCard>

                    <InformationCard title="Remote access">
                        <p>
                            Cloud services can make access across locations and
                            devices straightforward.
                        </p>
                    </InformationCard>

                    <InformationCard title="Bundled services">
                        <p>
                            The storage subscription may include other features
                            that have value to you.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same storage choice can make sense for one household and not another."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: 500 GB of family photos and documents">
                        <p>
                            Your storage needs are relatively small and mostly
                            involve files you want available across phones and
                            computers.
                        </p>

                        <p className="mt-4">
                            A cloud plan may be easier to manage because the
                            hardware alternative introduces an entire server
                            system for a modest amount of data.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: Several terabytes of media">
                        <p>
                            You have a large collection of photos, videos, or
                            other files and expect to keep it for many years.
                        </p>

                        <p className="mt-4">
                            A NAS can become more interesting because the
                            recurring cloud cost compounds over time. The
                            comparison should still include replacement drives,
                            maintenance, and independent backup.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: NAS plus off-site backup">
                        <p>
                            You want the speed and control of a local NAS but
                            also want protection against a local disaster.
                        </p>

                        <p className="mt-4">
                            The correct comparison is now against a cloud plan
                            that provides the level of off-site protection you
                            are trying to achieve, not merely against a cheap
                            cloud storage tier.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: You do not want another system to manage">
                        <p>
                            You value having storage that works without
                            administering a server, replacing drives, or
                            maintaining another device.
                        </p>

                        <p className="mt-4">
                            The cloud subscription is buying more than capacity.
                            It is also buying convenience and shifting much of
                            the infrastructure responsibility away from you.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Before You Choose"
                items={[
                    "Estimate how much storage you need today and what you are likely to need over the next several years.",
                    "Get the actual cloud price for the storage tier you would realistically use.",
                    "Price the complete NAS system, including the enclosure and drives.",
                    "Estimate electricity and future drive or hardware replacement costs.",
                    "Decide whether the NAS would be primary storage, backup storage, or both.",
                    "Plan an independent off-site backup if losing the NAS would also mean losing the only backup copy.",
                    "Consider your tolerance for software updates, troubleshooting, and hardware maintenance.",
                    "Account for useful bundled cloud features rather than comparing storage capacity alone.",
                    "Run the comparison over a realistic ownership period rather than judging the decision from the first-year cost.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Ask"
                subtitle="Use these questions before buying a NAS or committing to a cloud storage plan."
                questions={[
                    "How much storage do I actually need today, and how quickly is it likely to grow?",
                    "What cloud tier would I realistically use rather than the cheapest advertised tier?",
                    "What is the complete cost of the NAS, including all required drives?",
                    "How much will electricity and replacement drives cost over the time I expect to own it?",
                    "If the NAS fails, where is my independent backup?",
                    "Would I still have my important files after a fire, theft, or other local disaster?",
                    "How much time am I willing to spend maintaining the NAS?",
                    "What useful features are bundled with the cloud service that I would otherwise need to provide myself?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "A NAS can have a lower long-term storage cost than a recurring cloud subscription, but the comparison needs to include hardware, drives, electricity, maintenance, and replacement costs.",
                    "The cloud option is primarily a recurring service cost, while the NAS option shifts more of the infrastructure responsibility to you.",
                    "Storage and backup are different problems. A NAS located in your home does not by itself provide an independent off-site backup.",
                    "CISA recommends a 3-2-1 backup approach: three copies, two different media types, and one copy off-site.",
                    "Large storage requirements and long ownership periods can change the economics substantially.",
                    "Convenience, remote access, local speed, privacy preferences, and willingness to maintain hardware can matter even when the raw storage math points in one direction.",
                    "The calculator is a planning model, not a complete cost-of-ownership forecast. It intentionally leaves out costs that vary too much between setups to model reliably.",
                    "Compare the actual system you would build with the actual cloud plan you would buy. Generic NAS and cloud price comparisons can be misleading.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Data Backup Options",
                        publisher:
                            "Cybersecurity and Infrastructure Security Agency",
                        href:
                            "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
                    },
                    {
                        title: "Google One Plans",
                        publisher: "Google",
                        href:
                            "https://one.google.com/about/plans",
                    },
                    {
                        title: "iCloud+",
                        publisher: "Apple",
                        href:
                            "https://www.apple.com/icloud/",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}