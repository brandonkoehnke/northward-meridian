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
import TakeoutFileChecker from "./TakeoutFileChecker";

const slug = "which-google-takeout-files-can-i-delete";
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
  { id: "takeout-file-checker", label: "File decision checker" },
  { id: "why-it-matters", label: "Why this matters" },
  { id: "patterns", label: "File patterns explained" },
  { id: "compare", label: "What counts as identical?" },
  { id: "workflow", label: "A safe review process" },
  { id: "examples", label: "Worked examples" },
  { id: "checklist", label: "Before removing files" },
  { id: "questions", label: "Questions to verify" },
  { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
  { id: "json", title: "I have a lot of JSON files beside my photos.", summary: "Metadata sidecars are not duplicate images.", guidance: "Preserve sidecars until you know what information they contain.", destinationId: "patterns", destinationLabel: "File patterns explained" },
  { id: "folders", title: "The same photo appears in year and album folders.", summary: "Repeated files may also carry important folder context.", guidance: "Compare content and preserve album relationships before consolidating.", destinationId: "takeout-file-checker", destinationLabel: "File decision checker" },
  { id: "edited", title: "I see original, edited, and numbered photo files.", summary: "Similar filenames do not prove identical content.", guidance: "Check versions and file contents on copies before removing anything.", destinationId: "examples", destinationLabel: "Worked examples" },
] as const;

export default function TakeoutFileGuide() {
  return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} sections={sections} structuredData={structuredData} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
    <TakeoutFileChecker />
    <WhyThisMatters id="why-it-matters"><p>Google Takeout exports can contain photographs, videos, edited versions, album folders, and separate metadata files. A folder with 50,000 files does not necessarily represent 50,000 unique photographs. Yet deleting files solely because their names or locations look repetitive can remove important versions or metadata.</p><p>Start by preserving the complete original archive. The goal is to understand what each file represents before making changes to a working copy.</p></WhyThisMatters>
    <GuideSection id="patterns" eyebrow="File Patterns" title="What are these Google Takeout files?"><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="IMG_1234.jpg or .heic"><p>An image file. Its name alone does not establish whether another copy exists, whether it has a unique capture date, or whether it is the original version.</p></InformationCard>
      <InformationCard title="IMG_1234-edited.jpg"><p>A possible edited version. Crops, color changes, and other adjustments may be intentional. Preserve the original and edited versions until you have compared them.</p></InformationCard>
      <InformationCard title="IMG_1234.jpg.supplemental-metadata.json"><p>A possible Google Photos metadata sidecar, not a second image. Names and suffixes vary. Sidecars may contain information absent from the media file and may not always sit beside their matching photo.</p></InformationCard>
      <InformationCard title="IMG_1234(1).jpg"><p>A numbered variant. The suffix alone cannot establish whether its bytes, edits, timestamps, or metadata match another file.</p></InformationCard>
      <InformationCard title="Same photo in album and year folders"><p>Potentially repeated media, but folder placement can represent album organization. Preserve original paths and any related metadata before consolidation.</p></InformationCard>
      <InformationCard title="Multiple ZIP archive parts"><p>A Takeout export can be split across several archives. Keep all parts together; a sidecar or matching file may be in a different part.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="compare" eyebrow="Compare Files" title="Matching filenames are not proof of identical photos."><p className="leading-7">Two files with the same SHA-256 hash have, for practical purposes, matching file content. This is stronger evidence than identical filenames, similar previews, or equal file sizes. However, hashes do not tell you whether an album location, folder path, or associated metadata file is important.</p><p className="mt-4 leading-7">For a small test on Windows, you can calculate a file hash in PowerShell using <code>Get-FileHash -Algorithm SHA256</code> on each file. On macOS or Linux, <code>shasum -a 256</code> can calculate SHA-256 hashes. Use only local files you already control. Hashes help compare bytes; they do not decide what you should delete.</p><p className="mt-4 leading-7">If hashes differ, the files are not byte-identical, but they may still show the same photo at different resolutions or with different metadata. That is a separate judgment. Do not infer that a different hash means a file is a unique photograph.</p></GuideSection>
    <GuideSection id="workflow" eyebrow="Safe Workflow" title="Review a sample before reorganizing your archive."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="1. Preserve the export"><p>Keep every original ZIP part and an independent recoverable backup. Extract to a separate working directory.</p></InformationCard>
      <InformationCard title="2. Identify file types"><p>Separate media files from JSON sidecars and note edited versions. Avoid blanket deletion based on extensions or suffixes.</p></InformationCard>
      <InformationCard title="3. Compare exact content"><p>Choose a small set of suspected duplicates. Compare local hashes, then check the associated folder and metadata context.</p></InformationCard>
      <InformationCard title="4. Verify a working copy"><p>Test any proposed consolidation on copies. Confirm dates, edits, and album organization remain understandable before making broader changes.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="examples" eyebrow="Worked Examples" title="Similar-looking files can serve different purposes."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="Two identical JPEGs in different albums"><p>Matching hashes suggest identical bytes, but both album locations may matter. Record the original paths before consolidating any working copy.</p></InformationCard>
      <InformationCard title="A JPEG and a JSON sidecar"><p>These are not duplicate files. The JSON may preserve photo-library information. Keep both and inspect the association.</p></InformationCard>
      <InformationCard title="Original and edited versions"><p>Keep both until you confirm whether the edits are valuable. Even a nearly identical preview may represent intentional changes.</p></InformationCard>
      <InformationCard title="A numbered copy with different hash"><p>The files differ in bytes. Compare visual content, resolution, edits, and metadata; do not delete based on the numbered suffix.</p></InformationCard>
    </div><p className="mt-6 leading-7">If photo dates also appear incorrect, see <Link href="/guides/why-do-my-photos-show-todays-date" className="font-semibold text-[var(--accent)] underline underline-offset-4">Why Do My Photos Show Today&apos;s Date After Downloading Them?</Link> before changing embedded metadata.</p></GuideSection>
    <DecisionChecklist id="checklist" title="Before Removing Google Takeout Files" items={["Keep all original Takeout ZIP parts and a separate verified backup.", "Identify whether each candidate is media, an edited version, or a JSON sidecar.", "Do not infer duplicates from filenames, suffixes, or year/album folders alone.", "Compare actual file content where appropriate and preserve original folder paths.", "Check associated metadata and album organization before consolidating.", "Test changes on a small working copy and verify photos, dates, and edits.", "Do not delete from the only copy or run automatic bulk cleanup without a restore plan."]}/>
    <QuestionsToAsk id="questions" title="Questions to Verify" subtitle="Content identity is only one part of preserving a photo archive." questions={["Do the two media files have identical hashes or merely similar names?", "Could one file be an edited or lower-resolution version?", "Does a JSON sidecar contain information missing from the photo?", "Does each folder represent an album membership worth retaining?", "Are all archive ZIP parts available and backed up?", "Can I restore a small sample after consolidating a working copy?"]}/>
    <KeyTakeaways id="takeaways" items={["A Google Takeout JSON sidecar is metadata, not a duplicate photograph.", "Edited versions and numbered filenames are not automatically redundant.", "Matching SHA-256 hashes support file-content identity, not permission to discard album context.", "Keep all ZIP parts and related metadata together before reorganizing.", "Never delete the only copy; verify a backup and test changes on a small working copy."]}/>
    <Sources sources={[{ title: "How to download your Google data", publisher: "Google Account Help", href: "https://support.google.com/accounts/answer/3024190?hl=en" }, { title: "Download photos or videos to your device", publisher: "Google Photos Help", href: "https://support.google.com/photos/answer/7652919?hl=en" }]}/>
    <RelatedDecisions currentSlug={slug}/>
  </GuideLayout>;
}
