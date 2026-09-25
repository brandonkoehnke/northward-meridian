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
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import { getGuideBySlug } from "@/lib/guides";

import BackupCoverageCheck from "./BackupCoverageCheck";

const guide = (() => {
    const found = getGuideBySlug(
        "do-i-need-cloud-backup-if-i-use-onedrive-icloud-google-drive",
    );

    if (!found) {
        throw new Error(
            "Guide not found: do-i-need-cloud-backup-if-i-use-onedrive-icloud-google-drive",
        );
    }

    return found;
})();

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}${guide.href}`;

const guideSections = [
    {
        id: "backup-coverage-check",
        label: "Backup coverage check",
    },
    {
        id: "short-answer",
        label: "The short answer",
    },
    {
        id: "sync-storage-backup",
        label: "Sync vs. storage vs. backup",
    },
    {
        id: "what-cloud-sync-protects",
        label: "What cloud sync already protects",
    },
    {
        id: "deletion",
        label: "What happens when you delete a file",
    },
    {
        id: "version-history",
        label: "Version history and recovery",
    },
    {
        id: "ransomware",
        label: "Ransomware and corrupted files",
    },
    {
        id: "independent-copy",
        label: "What an independent copy means",
    },
    {
        id: "three-two-one",
        label: "The 3-2-1 principle",
    },
    {
        id: "backup-options",
        label: "External drive vs. cloud backup vs. NAS",
    },
    {
        id: "existing-setup-enough",
        label: "When your current setup may be enough",
    },
    {
        id: "another-layer",
        label: "When another backup layer makes sense",
    },
    {
        id: "important-files",
        label: "Which files deserve stronger protection",
    },
    {
        id: "scenarios",
        label: "Real-world scenarios",
    },
    {
        id: "checklist",
        label: "Backup checklist",
    },
    {
        id: "questions",
        label: "Questions to answer",
    },
    {
        id: "takeaways",
        label: "Key takeaways",
    },
] as const;

const guidedEntryScenarios = [
    {
        id: "cloud-sync-only",
        title: "My files are already in OneDrive, iCloud, or Google Drive",
        summary:
            "Find out what synchronization already protects and where recovery may still depend on the service.",
        guidance:
            "Start with the coverage check. Cloud synchronization gives you another copy of many files and may include useful recovery features, but the important question is which failures you can recover from and for how long.",
        destinationId: "backup-coverage-check",
        destinationLabel: "Backup Coverage Check",
    },
    {
        id: "deleted-file",
        title: "I am mainly worried about accidentally deleting files",
        summary:
            "Check recycle-bin, version-history, and restore capabilities.",
        guidance:
            "A synchronized deletion can affect multiple devices, but cloud services may provide deleted-file or version recovery. Verify the actual recovery features and retention period for your service.",
        destinationId: "deletion",
        destinationLabel: "What Happens When You Delete a File",
    },
    {
        id: "ransomware",
        title: "I am worried about ransomware or file corruption",
        summary:
            "Understand why synchronization and historical recovery are different protections.",
        guidance:
            "If unwanted file changes synchronize to the cloud, recovery depends on features such as version history, point-in-time restoration, or another independent copy.",
        destinationId: "ransomware",
        destinationLabel: "Ransomware and Corrupted Files",
    },
    {
        id: "external-drive",
        title: "I also have an external hard drive",
        summary:
            "Determine whether it creates a genuinely independent recovery path.",
        guidance:
            "An external drive can add another copy, but its protection depends on how often it is updated, where it is stored, and whether it remains connected to the computer.",
        destinationId: "backup-options",
        destinationLabel: "External Drive vs. Cloud Backup vs. NAS",
    },
    {
        id: "nas",
        title: "I already have or am considering a NAS",
        summary:
            "Separate local storage and redundancy from independent backup.",
        guidance:
            "A NAS can provide useful local storage and recovery, but it should be evaluated as one part of the backup architecture rather than assumed to solve every failure mode.",
        destinationId: "backup-options",
        destinationLabel: "External Drive vs. Cloud Backup vs. NAS",
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

export default function CloudBackupGuide() {
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
            <BackupCoverageCheck />

            <WhyThisMatters id="short-answer">
                <p>
                    OneDrive, iCloud, and Google Drive can provide meaningful
                    protection because important files may exist somewhere
                    other than the original device. These services can also
                    provide recovery features such as deleted-file recovery or
                    version history.
                </p>

                <p>
                    But synchronization and independent backup are not the same
                    thing. A change made to a synchronized file can propagate
                    to other synchronized locations, and recovery may depend on
                    the provider&apos;s retention period, version history,
                    account access, and restore tools.
                </p>

                <p>
                    The useful question is therefore not simply whether your
                    files are in the cloud. It is whether you have a recovery
                    path for the failures you care about.
                </p>
            </WhyThisMatters>

            <GuideSection
                id="sync-storage-backup"
                eyebrow="Start With The Terms"
                title="Synchronization, cloud storage, and backup solve overlapping but different problems."
            >
                <p>
                    The words sync, storage, and backup are often used as if
                    they mean the same thing. They do not necessarily provide
                    the same recovery behavior.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="Synchronization">
                        <p>
                            Keeps selected files or changes aligned across
                            devices or locations.
                        </p>
                    </InformationCard>

                    <InformationCard title="Cloud storage">
                        <p>
                            Stores files on infrastructure operated by a cloud
                            provider and makes them available through the
                            service.
                        </p>
                    </InformationCard>

                    <InformationCard title="Backup">
                        <p>
                            Maintains a recoverable copy intended to restore
                            data after loss, unwanted change, corruption, or
                            another failure.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    A single service can provide features from more than one of
                    these categories. That is why labeling a service as
                    &quot;sync&quot; or &quot;backup&quot; is less useful than
                    asking what you can recover from.
                </p>
            </GuideSection>

            <GuideSection
                id="what-cloud-sync-protects"
                eyebrow="Real Protection Already Exists"
                title="Cloud synchronization can protect you from several common forms of data loss."
            >
                <p>
                    If a laptop fails but the important files have already
                    synchronized successfully to a cloud service, the hardware
                    failure does not necessarily destroy the cloud copy.
                </p>

                <p>
                    An off-site cloud copy can also remain available after a
                    local event such as theft or physical damage to the
                    computer, assuming the cloud account and synchronized files
                    remain accessible.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Cloud sync can help with">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Loss or failure of the original device.
                            </GuideBullet>
                            <GuideBullet>
                                Accessing synchronized files from another
                                device.
                            </GuideBullet>
                            <GuideBullet>
                                Local theft or damage when the cloud copy
                                remains available.
                            </GuideBullet>
                            <GuideBullet>
                                Some accidental changes when version or restore
                                features are available.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Protection still depends on">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Successful synchronization.
                            </GuideBullet>
                            <GuideBullet>
                                Provider recovery features.
                            </GuideBullet>
                            <GuideBullet>
                                Retention periods.
                            </GuideBullet>
                            <GuideBullet>
                                Continued account access.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="deletion"
                eyebrow="Deletion Can Synchronize Too"
                title="Deleting a synchronized file does not necessarily leave an untouched cloud copy."
            >
                <p>
                    Synchronization is designed to propagate changes. Depending
                    on the service and configuration, deleting a synchronized
                    file can also remove it from synchronized locations.
                </p>

                <p>
                    That does not mean the file is immediately unrecoverable.
                    Major cloud services provide various deleted-file and
                    recovery features, but those features have rules and
                    retention periods that should be verified before you depend
                    on them.
                </p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        The practical question
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        If you discovered an important deletion several days,
                        weeks, or months later, would you still know how to
                        recover the file?
                    </p>
                </div>
            </GuideSection>

            <GuideSection
                id="version-history"
                eyebrow="Historical Recovery Matters"
                title="A second copy is more useful when you can recover an earlier state."
            >
                <p>
                    Version history can help when the current synchronized copy
                    is not the copy you want. That might happen after an
                    accidental edit, corruption, unwanted overwrite, or other
                    file change.
                </p>

                <p>
                    Microsoft documents version history and recovery
                    capabilities for OneDrive, including the ability for
                    eligible users to restore OneDrive to an earlier point
                    following events such as accidental deletion, corruption,
                    or ransomware. Exact availability and retention depend on
                    the product and account.{" "}
                    <a
                        href="https://support.microsoft.com/en-us/office/restore-your-onedrive-3bd43b2b-be98-48a8-a866-878e91263d01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        Microsoft Support
                    </a>
                </p>

                <p>
                    Do not assume every cloud service, account tier, file type,
                    or configuration provides identical recovery. Verify the
                    service you actually use.
                </p>
            </GuideSection>

            <GuideSection
                id="ransomware"
                eyebrow="Synchronization Cuts Both Ways"
                title="Corrupted or encrypted files can make historical recovery especially important."
            >
                <p>
                    A synchronized system is useful because changes propagate
                    automatically. That same behavior means an unwanted change
                    may also propagate.
                </p>

                <p>
                    Recovery from ransomware or widespread corruption can
                    therefore depend on whether clean historical versions,
                    point-in-time restore capabilities, or another independent
                    copy remain available.
                </p>

                <p>
                    CISA recommends maintaining backups and protecting backup
                    data from the systems being backed up as part of ransomware
                    resilience.{" "}
                    <a
                        href="https://www.cisa.gov/stopransomware/ransomware-guide"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4"
                    >
                        CISA StopRansomware Guide
                    </a>
                </p>
            </GuideSection>

            <GuideSection
                id="independent-copy"
                eyebrow="Independence Matters"
                title="Another copy is strongest when the same failure cannot easily destroy both copies."
            >
                <p>
                    Two copies can still share the same failure mode.
                </p>

                <p>
                    A computer and an external drive permanently connected to
                    it may both be exposed to the same theft, electrical event,
                    malware, or local disaster. Likewise, two copies that both
                    depend entirely on the same cloud account may share an
                    account-access failure.
                </p>

                <p>
                    Independence means designing copies so that one problem is
                    less likely to eliminate every recovery path at once.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="More independent">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Copy stored in another physical location.
                            </GuideBullet>
                            <GuideBullet>
                                Backup normally disconnected or isolated from
                                the primary system.
                            </GuideBullet>
                            <GuideBullet>
                                Recovery copy not dependent on the same single
                                device.
                            </GuideBullet>
                            <GuideBullet>
                                Another usable recovery path outside the primary
                                cloud account.
                            </GuideBullet>
                        </ul>
                    </InformationCard>

                    <InformationCard title="Less independent">
                        <ul className="space-y-3">
                            <GuideBullet>
                                Two folders on the same drive.
                            </GuideBullet>
                            <GuideBullet>
                                External drive always attached to the same
                                computer.
                            </GuideBullet>
                            <GuideBullet>
                                Multiple devices synchronizing the same unwanted
                                change.
                            </GuideBullet>
                            <GuideBullet>
                                Every usable copy requiring the same account.
                            </GuideBullet>
                        </ul>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="three-two-one"
                eyebrow="A Useful Backup Principle"
                title="The 3-2-1 approach reduces the chance that one failure eliminates every copy."
            >
                <p>
                    CISA describes the 3-2-1 backup approach as keeping three
                    copies of important data, using two different types of
                    storage media, with one copy stored off-site.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    <InformationCard title="3 copies">
                        <p>
                            The working copy plus additional recoverable copies.
                        </p>
                    </InformationCard>

                    <InformationCard title="2 media types">
                        <p>
                            Avoid depending on a single storage mechanism for
                            every copy.
                        </p>
                    </InformationCard>

                    <InformationCard title="1 off-site">
                        <p>
                            Keep at least one copy away from the original
                            physical location.
                        </p>
                    </InformationCard>
                </div>

                <p>
                    The rule is a useful resilience framework, not a reason to
                    buy unnecessary hardware. The level of protection should
                    reflect how difficult the data would be to replace.
                </p>
            </GuideSection>

            <GuideSection
                id="backup-options"
                eyebrow="Different Tools Cover Different Gaps"
                title="External drives, independent cloud backup, and NAS systems each solve different parts of the problem."
            >
                <div className="space-y-6">
                    <InformationCard title="External drive">
                        <p>
                            Can provide an inexpensive local copy and fast
                            restores. Protection is stronger when the drive is
                            not permanently connected and when another copy
                            exists off-site.
                        </p>
                    </InformationCard>

                    <InformationCard title="Independent cloud backup">
                        <p>
                            Can provide an automated off-site recovery layer
                            separate from the primary device. Verify retention,
                            versioning, restore procedures, exclusions, and
                            pricing for the service being considered.
                        </p>
                    </InformationCard>

                    <InformationCard title="NAS">
                        <p>
                            Can provide substantial local storage, local backup,
                            and fast recovery. A NAS in the same building does
                            not by itself provide protection from every local
                            disaster and should not automatically be treated as
                            the entire backup strategy.
                        </p>
                    </InformationCard>

                    <InformationCard title="Cloud sync with recovery features">
                        <p>
                            May already provide meaningful protection from
                            device loss, deletion, and unwanted changes. Verify
                            the actual recovery features before deciding that
                            another paid service is necessary.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="existing-setup-enough"
                eyebrow="Avoid Buying Redundant Protection"
                title="Your existing cloud setup may already provide enough recovery for some files."
            >
                <p>
                    Not every file needs the maximum possible backup
                    architecture.
                </p>

                <p>
                    If a file is easily replaceable, exists on several devices,
                    has usable cloud recovery, and would create little
                    consequence if lost, adding another paid backup layer may
                    provide limited incremental value.
                </p>

                <p>
                    The decision should reflect the consequence of permanent
                    loss, not a rule that every byte of data must receive the
                    same protection.
                </p>
            </GuideSection>

            <GuideSection
                id="another-layer"
                eyebrow="When Redundancy Has Value"
                title="Another backup layer becomes more compelling when permanent loss would be difficult or impossible to undo."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <InformationCard title="Irreplaceable files">
                        <p>
                            Family photos, original creative work, personal
                            records, or other unique files can justify stronger
                            recovery protection.
                        </p>
                    </InformationCard>

                    <InformationCard title="One account controls everything">
                        <p>
                            Another independent copy can reduce reliance on one
                            account or provider as the only recovery path.
                        </p>
                    </InformationCard>

                    <InformationCard title="Recovery windows worry you">
                        <p>
                            If an important deletion might not be discovered
                            quickly, limited retention can create a meaningful
                            gap.
                        </p>
                    </InformationCard>

                    <InformationCard title="You have never tested recovery">
                        <p>
                            A successful restore test can reveal whether the
                            system provides the protection you assume it does.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <GuideSection
                id="important-files"
                eyebrow="Protect By Consequence"
                title="Start with the files that would hurt most to lose permanently."
            >
                <p>
                    Backup strategy does not need to begin with terabytes,
                    hardware, or subscriptions. Begin by identifying the data
                    that cannot simply be downloaded or recreated.
                </p>

                <ul className="space-y-4">
                    <GuideBullet>
                        Original family photos and videos.
                    </GuideBullet>
                    <GuideBullet>
                        Personal documents and records that would be difficult
                        to reconstruct.
                    </GuideBullet>
                    <GuideBullet>
                        Original creative or professional work.
                    </GuideBullet>
                    <GuideBullet>
                        Important local files that are not currently
                        synchronized anywhere.
                    </GuideBullet>
                    <GuideBullet>
                        Data needed to recover another important system.
                    </GuideBullet>
                </ul>

                <p>
                    Protecting a small amount of irreplaceable data very well
                    can be more important than creating an elaborate backup
                    system for a large library of replaceable files.
                </p>
            </GuideSection>

            <GuideSection
                id="scenarios"
                eyebrow="Put It Together"
                title="The same cloud-sync service can be enough for one file and insufficient for another."
            >
                <div className="space-y-8">
                    <InformationCard title="Scenario 1: Replaceable documents synchronized across devices">
                        <p>
                            The files are stored locally and in the cloud,
                            version history is available, and permanent loss
                            would be inconvenient rather than catastrophic.
                        </p>

                        <p className="mt-4">
                            Existing synchronization and recovery features may
                            provide enough protection for the homeowner&apos;s
                            needs.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 2: A lifetime of family photos in one cloud account">
                        <p>
                            The files exist on a computer and in cloud sync, but
                            every usable copy depends on the same account and no
                            independent recovery copy exists.
                        </p>

                        <p className="mt-4">
                            The consequence of permanent loss is high, so an
                            additional independent copy becomes easier to
                            justify.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 3: External drive permanently connected">
                        <p>
                            The user has a cloud-synced copy and a local
                            external drive, but the drive remains attached to
                            the same computer continuously.
                        </p>

                        <p className="mt-4">
                            There are more copies, but some failure modes remain
                            shared. Periodically disconnecting or otherwise
                            isolating a backup can improve independence.
                        </p>
                    </InformationCard>

                    <InformationCard title="Scenario 4: NAS plus independent off-site copy">
                        <p>
                            The user keeps working files locally, uses a NAS for
                            local storage or backup, and maintains another
                            recoverable copy off-site.
                        </p>

                        <p className="mt-4">
                            The system has multiple recovery paths, but those
                            paths should still be tested rather than assumed to
                            work.
                        </p>
                    </InformationCard>
                </div>
            </GuideSection>

            <DecisionChecklist
                id="checklist"
                title="Backup Checklist"
                items={[
                    "Identify the files that would be difficult or impossible to replace.",
                    "Confirm that important files actually exist somewhere other than the original device.",
                    "Check the deleted-file retention period for the cloud service you use.",
                    "Check whether important file types have usable version history.",
                    "Determine whether you can restore many files after a widespread unwanted change.",
                    "Make sure at least one important recovery path is outside the original physical location.",
                    "Consider whether every usable copy depends on the same cloud account.",
                    "If you use an external drive, decide whether keeping it permanently connected creates a shared failure mode.",
                    "Test restoring at least one important file before assuming the backup works.",
                ]}
            />

            <QuestionsToAsk
                id="questions"
                title="Questions to Answer About Your Current Setup"
                subtitle="You should be able to answer these before deciding whether another backup service is necessary."
                questions={[
                    "Where are my irreplaceable files stored right now?",
                    "If this computer failed today, where would I retrieve them?",
                    "If I accidentally deleted a file, how long would I have to recover it?",
                    "Can I restore an older version after an unwanted change or corruption?",
                    "What happens if many synchronized files are changed at once?",
                    "Does at least one usable copy exist outside my home or office?",
                    "Would another copy remain accessible if my primary cloud account became unavailable?",
                    "Have I successfully restored a real file from the system I call my backup?",
                ]}
            />

            <KeyTakeaways
                id="takeaways"
                items={[
                    "OneDrive, iCloud, and Google Drive can provide meaningful data protection; cloud synchronization should not be dismissed as providing no backup value.",
                    "Synchronization, cloud storage, version history, and independent backup are different recovery mechanisms.",
                    "A synchronized deletion or unwanted file change can propagate, so recovery features and retention periods matter.",
                    "Version history and point-in-time restore capabilities can make cloud services substantially more resilient than simple file mirroring.",
                    "An independent copy is valuable because it reduces the chance that one device, location, account, or unwanted change eliminates every recovery path.",
                    "CISA recommends multiple copies of important data, including an off-site copy, as part of resilient backup practices.",
                    "Not every file needs the same level of protection. Focus strongest protection on data that would be difficult or impossible to replace.",
                    "The most important backup test is not whether a system says it is backing up; it is whether you can successfully restore the data you need.",
                ]}
            />

            <Sources
                id="sources"
                sources={[
                    {
                        title: "Ransomware Guide",
                        publisher:
                            "Cybersecurity and Infrastructure Security Agency",
                        href:
                            "https://www.cisa.gov/stopransomware/ransomware-guide",
                    },
                    {
                        title: "Restore Your OneDrive",
                        publisher: "Microsoft Support",
                        href:
                            "https://support.microsoft.com/en-us/office/restore-your-onedrive-3bd43b2b-be98-48a8-a866-878e91263d01",
                    },
                    {
                        title:
                            "SharePoint and OneDrive Data Resiliency",
                        publisher: "Microsoft Learn",
                        href:
                            "https://learn.microsoft.com/en-us/compliance/assurance/assurance-sharepoint-onedrive-data-resiliency",
                    },
                    {
                        title: "Recover Deleted Files on iCloud.com",
                        publisher: "Apple Support",
                        href:
                            "https://support.apple.com/guide/icloud/recover-deleted-files-mmae56ea1ca5/icloud",
                    },
                    {
                        title:
                            "Recover a Deleted File in Google Drive",
                        publisher: "Google Drive Help",
                        href:
                            "https://support.google.com/drive/answer/1716222",
                    },
                ]}
            />

            <RelatedDecisions currentSlug={guide.slug} />
        </GuideLayout>
    );
}