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
import PhotoDateTroubleshooter from "./PhotoDateTroubleshooter";

const slug = "why-do-my-photos-show-todays-date";
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
  { id: "photo-date-checker", label: "Photo date troubleshooter" },
  { id: "why-it-matters", label: "Why the dates differ" },
  { id: "date-types", label: "Four kinds of dates" },
  { id: "platforms", label: "Where to check dates" },
  { id: "takeout", label: "Google Takeout and JSON" },
  { id: "examples", label: "Worked scenarios" },
  { id: "checklist", label: "Before fixing dates" },
  { id: "questions", label: "Questions to verify" },
  { id: "takeaways", label: "Key takeaways" },
] as const;
const scenarios = [
  { id: "windows", title: "My downloaded photos all say they were created today.", summary: "A new filesystem date may not mean the original capture date was lost.", guidance: "Compare Date created with embedded Date taken before changing files.", destinationId: "photo-date-checker", destinationLabel: "Photo date troubleshooter" },
  { id: "takeout", title: "My Google Takeout photos have JSON files next to them.", summary: "Additional library information can be exported separately from image metadata.", guidance: "Inspect both the image metadata and its associated JSON sidecar.", destinationId: "takeout", destinationLabel: "Google Takeout explanation" },
  { id: "library", title: "The dates in Apple Photos or Google Photos differ from my files.", summary: "Photo apps may display a date stored separately from the exported file.", guidance: "Compare the library date with an original file and account for time zones.", destinationId: "platforms", destinationLabel: "Where to check dates" },
] as const;

export default function PhotoDateGuide() {
  return <GuideLayout category={guide.category} title={guide.title} description={guide.description} updated={guide.updated} readingTime={guide.readingTime} recommendedFor={guide.recommendedFor} bottomLine={guide.bottomLine} sections={sections} structuredData={structuredData} guidedEntry={<GuidedEntry scenarios={scenarios} />}>
    <PhotoDateTroubleshooter />
    <WhyThisMatters id="why-it-matters"><p>Downloading, copying, or importing a photo can create a new file timestamp. That does not automatically erase the date the camera recorded when the picture was taken. A photo library may also display its own edited or imported date, which can differ from the metadata in the downloaded file.</p><p>Before running a bulk repair, check a small sample. You may only need to change how the files are sorted. In other cases, the original file, library, or export sidecar may be needed to investigate the date.</p></WhyThisMatters>
    <GuideSection id="date-types" eyebrow="Date Types" title="Four different dates can describe one photo."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="File created"><p>The operating system may assign this when the file is saved, downloaded, or copied to a new location. It is not necessarily the capture date.</p></InformationCard>
      <InformationCard title="File modified"><p>This records a file modification timestamp. Export, conversion, or editing can affect it; it should not be treated as a reliable camera timestamp.</p></InformationCard>
      <InformationCard title="Date taken / DateTimeOriginal"><p>Many camera images contain an embedded capture date, often in EXIF metadata. Not every format or shared image contains this field, and it may lack time-zone information.</p></InformationCard>
      <InformationCard title="Photo library date"><p>Apple Photos and Google Photos can show dates maintained or adjusted in their libraries. An edited library date does not necessarily become the embedded timestamp of a downloaded file.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="platforms" eyebrow="Where to Check" title="Inspect one photo before changing thousands."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="Windows File Explorer"><p>For a supported image, right-click the file, open Properties, and check Details for Date taken. Compare it with Date created and Date modified. Missing Date taken does not prove that all capture information is gone.</p></InformationCard>
      <InformationCard title="Mac and Apple Photos"><p>In Apple Photos on Mac, select a photo and open the Info panel (Command-I) to inspect the library date and camera details. If comparing exports, keep an unmodified original when available; Finder file timestamps can differ.</p></InformationCard>
      <InformationCard title="Google Photos"><p>Inspect the photo information in the library and compare it with the downloaded file. Google explains that a date adjusted in Photos may not match the original camera date shown by another app after download.</p></InformationCard>
      <InformationCard title="iPhone or camera transfer"><p>Check the original photo in its source app before assuming the transfer removed metadata. Messaging apps, screenshots, edited exports, and some video formats may preserve different date information.</p></InformationCard>
    </div></GuideSection>
    <GuideSection id="takeout" eyebrow="Google Takeout" title="A JSON sidecar is not the same as an embedded photo date."><p className="leading-7">Google states that downloaded files can receive new operating-system timestamps while embedded original timestamps remain. Additional Google Photos information, such as certain edits or comments, may be provided in separate JSON files. <strong>Do not delete those sidecars</strong> until you understand whether they contain information needed for your archive.</p><p className="mt-4 leading-7">A JSON file next to an image does not automatically prove the image lacks its capture date. First inspect the image metadata, then compare the sidecar with the date shown in Google Photos. Some videos, screenshots, and exported images do not use the same EXIF fields as camera JPEGs. For large collections, test any local reconciliation tool on a copy of a small representative sample before processing the full archive.</p></GuideSection>
    <GuideSection id="examples" eyebrow="Worked Scenarios" title="Similar date problems require different next steps."><div className="grid gap-4 md:grid-cols-2">
      <InformationCard title="Downloaded today; Date taken is correct"><p>The capture timestamp may still be intact. Sort by Date taken in a compatible application rather than overwriting the file metadata to match the original date.</p></InformationCard>
      <InformationCard title="Google Photos date differs from downloaded file"><p>The library may have an adjusted date while the exported file retains the original camera timestamp. Compare both before deciding which should be used for organization.</p></InformationCard>
      <InformationCard title="Takeout includes JSON files"><p>Preserve both the photos and their sidecars. Inspect a few pairs for additional date information before considering any metadata synchronization.</p></InformationCard>
      <InformationCard title="No capture date found"><p>Check original devices, cloud libraries, and other backups. A missing EXIF field does not guarantee the date is recoverable, and filenames or folder dates may only be clues.</p></InformationCard>
    </div><p className="mt-6 leading-7">If you are reorganizing an archive, see <Link href="/guides/do-i-need-cloud-backup-if-i-use-onedrive-icloud-google-drive" className="font-semibold text-[var(--accent)] underline underline-offset-4">Do I Need Cloud Backup if I Use OneDrive, iCloud, or Google Drive?</Link>. A synced library alone may not provide a separate recoverable backup.</p></GuideSection>
    <DecisionChecklist id="checklist" title="Before Changing Photo Dates" items={["Preserve the original export and a separate backup; do not overwrite the only copy.", "Choose two or three representative photos, including one that appears correct.", "Compare file creation, file modification, and embedded capture dates where available.", "Check the date displayed in the original photo library and consider time zones.", "For Google Takeout, keep matching JSON sidecars and inspect their contents before deleting anything.", "Try sorting by capture date before rewriting image metadata.", "If a repair is needed, test it on copies and confirm the results in your intended photo app."]}/>
    <QuestionsToAsk id="questions" title="Questions to Verify" subtitle="A correct diagnosis starts by identifying which timestamp changed." questions={["Is the wrong date the filesystem creation date or the photo's actual capture date?", "Does the original file still contain an embedded DateTimeOriginal field?", "Does the date displayed in Google Photos or Apple Photos differ from the exported file?", "Were the affected photos shared through a messaging app or converted to another format?", "Does the Google Takeout export include related JSON sidecars?", "Could a time-zone offset explain a one-day discrepancy?", "Have I preserved an untouched backup before attempting a bulk change?"]}/>
    <KeyTakeaways id="takeaways" items={["A new file creation date does not automatically mean the original photo capture date is gone.", "Date created, Date modified, embedded Date taken, and a library's displayed date are different fields.", "Google Takeout may include additional metadata in separate JSON sidecars; preserve them.", "Not every image or video contains EXIF DateTimeOriginal, and recovery is not guaranteed.", "Compare a few original files and library records before running any bulk metadata tool.", "Always preserve originals and verify changes on copies first."]}/>
    <Sources sources={[{ title: "How to download your Google data — photo metadata", publisher: "Google Photos Help", href: "https://support.google.com/photos/answer/3024190?hl=en" }, { title: "Edit your photos — change date and timestamps", publisher: "Google Photos Help", href: "https://support.google.com/photos/answer/6128850" }, { title: "See photo and video information in Photos on Mac", publisher: "Apple Support", href: "https://support.apple.com/guide/photos/see-photo-and-video-information-phta8b25fa42/mac" }, { title: "Export photos, videos, slideshows, and memories on Mac", publisher: "Apple Support", href: "https://support.apple.com/guide/photos/pht6e157c5f/mac" }]}/>
    <RelatedDecisions currentSlug={slug}/>
  </GuideLayout>;
}
