"use client";

import { useState } from "react";

type Source = "unknown" | "icloud" | "google" | "takeout" | "phone" | "drive" | "message";
type Destination = "unknown" | "windows" | "mac" | "apple" | "google" | "other";
type DateField = "unknown" | "created" | "modified" | "taken" | "library";
type Scope = "unknown" | "all" | "some";
type Embedded = "unknown" | "correct" | "missing" | "wrong";
type Sidecar = "unknown" | "yes" | "no";
export type PhotoDateInputs = { source: Source; destination: Destination; field: DateField; scope: Scope; embedded: Embedded; sidecar: Sidecar };
export type PhotoDateDiagnosis = { kind: "likely-display" | "metadata-present" | "sidecar" | "missing" | "investigate"; title: string; explanation: string; steps: string[] };

export function diagnosePhotoDates(x: PhotoDateInputs): PhotoDateDiagnosis {
  const preserve = "Keep the original export and a separate backup unchanged. Test any metadata or sorting changes on copies of two or three photos first.";
  if (x.embedded === "correct") return {
    kind: "metadata-present", title: "The original capture date appears to be preserved",
    explanation: "If an independent metadata inspection shows the correct capture date inside the file, a newer filesystem creation date does not mean the photo's capture date was lost. Different apps may sort by different date fields.",
    steps: ["Compare the capture date in the file's metadata with the Date created/Date modified values.", "In your destination app, look for a Date taken or capture-date view or sorting option. Avoid rewriting EXIF solely to change a filesystem timestamp.", preserve],
  };
  if (x.source === "takeout" && x.sidecar === "yes") return {
    kind: "sidecar", title: "Your export may contain useful dates in separate JSON files",
    explanation: "Google Takeout can include additional Google Photos information in JSON sidecars. Their presence does not prove that the original capture timestamp is missing from the photo or that the sidecar contains the date you need.",
    steps: ["Inspect one image's embedded capture metadata first, then examine its associated JSON sidecar for date information.", "Compare the dates with the same photo in Google Photos. Keep the image and its associated sidecar together.", "If you need to reconcile a large archive, test a reputable local metadata workflow on copies and check time zones before bulk changes.", preserve],
  };
  if (x.embedded === "missing" || x.embedded === "wrong") return {
    kind: "missing", title: x.embedded === "missing" ? "The capture date is not present in the field you checked" : "The embedded capture date may be incorrect",
    explanation: "A missing or incorrect EXIF capture date does not prove the date is permanently unrecoverable. Other copies, photo-library records, sidecar files, or contextual evidence may contain useful information; none is guaranteed.",
    steps: ["Check an original file or another backup, not just a downloaded or shared copy.", x.source === "takeout" || x.source === "google" ? "If using Google Photos, compare the date displayed in the library and inspect any Takeout JSON sidecars." : "Check the date shown in the original photo library and any available export metadata.", "Do not assign today's date to the entire collection or overwrite originals. If a correct date is found, verify it on copies before making changes.", preserve],
  };
  if ((x.field === "created" || x.field === "modified") && x.embedded === "unknown") return {
    kind: "likely-display", title: "You may be seeing the file's download or copy date",
    explanation: "File creation and modification timestamps describe filesystem events and can change when files are copied or downloaded. They are not necessarily the original camera capture time.",
    steps: ["Inspect a sample photo for its embedded Date taken / DateTimeOriginal field, if that file format provides one.", x.destination === "windows" ? "On Windows, right-click a sample image, choose Properties > Details, and look for Date taken when available." : x.destination === "mac" || x.destination === "apple" ? "On Mac, inspect the photo's Info details in Photos; for a standalone file, use a metadata inspector that can show capture fields." : "Compare the file timestamp with the photo's capture metadata in your photo app or a trusted metadata viewer.", preserve],
  };
  if (x.source === "takeout") return {
    kind: "investigate", title: "Check both the exported photo and its Google Takeout metadata",
    explanation: "Google says operating systems may assign a new file timestamp on download while original embedded photo metadata remains. Additional Google Photos metadata can be exported separately as JSON.",
    steps: ["Check the embedded capture date in one exported image or video.", "Look for an associated JSON sidecar and compare its fields with the date shown in Google Photos.", "Do not assume that a JSON sidecar automatically fixes the embedded date or that all files have EXIF.", preserve],
  };
  if (x.field === "library") return {
    kind: "investigate", title: "Check whether the photo app is showing an adjusted or imported date",
    explanation: "Photo libraries can store or display dates separately from embedded camera metadata. An app's date and a downloaded file's date may differ without proving either is corrupted.",
    steps: ["Inspect the date in the original library and compare it with an exported original file.", "Determine whether the app is displaying capture time, an edited library date, or date added/imported.", "Check time zone differences for photos taken near midnight and avoid bulk date changes until the discrepancy is understood.", preserve],
  };
  return {
    kind: "investigate", title: "First identify which date changed",
    explanation: "A displayed date can refer to file creation, last modification, embedded capture time, or a photo library's own date. The current answers do not establish which information is missing.",
    steps: ["Choose two or three affected files and note where they came from and where the wrong date appears.", "Compare file creation/modified dates with embedded capture metadata and the original photo library, when available.", x.scope === "some" ? "Compare one affected photo with one unaffected photo; different formats or sharing paths may explain the difference." : "Avoid bulk repairs until you know which field is wrong.", preserve],
  };
}

const fieldClass = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm";
function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold">{label}<select className={fieldClass} value={value} onChange={e => onChange(e.target.value as T)}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;
}
export default function PhotoDateTroubleshooter() {
  const [source, setSource] = useState<Source>("unknown");
  const [destination, setDestination] = useState<Destination>("unknown");
  const [field, setField] = useState<DateField>("unknown");
  const [scope, setScope] = useState<Scope>("unknown");
  const [embedded, setEmbedded] = useState<Embedded>("unknown");
  const [sidecar, setSidecar] = useState<Sidecar>("unknown");
  const [copyStatus, setCopyStatus] = useState("");
  const diagnosis = diagnosePhotoDates({ source, destination, field, scope, embedded, sidecar });
  const summary = ["Northward Meridian — Photo date troubleshooting", `Source: ${source}`, `Where dates look wrong: ${destination}`, `Date field: ${field}`, `Affected files: ${scope}`, `Embedded capture date: ${embedded}`, `JSON sidecar: ${sidecar}`, `Assessment: ${diagnosis.title}`, diagnosis.explanation, ...diagnosis.steps.map((s, i) => `${i + 1}. ${s}`), "https://www.northwardmeridian.com/guides/why-do-my-photos-show-todays-date"].join("\n");
  async function copySummary() { try { await navigator.clipboard.writeText(summary); setCopyStatus("Diagnostic summary copied."); } catch { setCopyStatus("Clipboard unavailable. Select the summary text and copy it manually."); } }
  return <section id="photo-date-checker" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-12"><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Guided diagnostic</p>
    <h2 className="mt-3 text-3xl font-semibold">Find out which photo date changed</h2>
    <p className="mt-3 leading-7 text-[var(--muted)]">Answer what you know. No photos are uploaded or inspected; the checker provides a safe next step based on your observations.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <Select label="Where did the photos come from?" value={source} onChange={setSource} options={[{value:"unknown",label:"Not sure"},{value:"icloud",label:"iCloud Photos"},{value:"google",label:"Google Photos download"},{value:"takeout",label:"Google Takeout export"},{value:"phone",label:"Phone or camera transfer"},{value:"drive",label:"External drive or backup"},{value:"message",label:"Message or social app"}]}/>
      <Select label="Where does the date look wrong?" value={destination} onChange={setDestination} options={[{value:"unknown",label:"Not sure"},{value:"windows",label:"Windows File Explorer"},{value:"mac",label:"Mac Finder"},{value:"apple",label:"Apple Photos"},{value:"google",label:"Google Photos"},{value:"other",label:"Other app or device"}]}/>
      <Select label="Which date looks incorrect?" value={field} onChange={setField} options={[{value:"unknown",label:"Not sure"},{value:"created",label:"Date created / added"},{value:"modified",label:"Date modified"},{value:"taken",label:"Date taken / capture date"},{value:"library",label:"Date displayed in a photo library"}]}/>
      <Select label="How many photos are affected?" value={scope} onChange={setScope} options={[{value:"unknown",label:"Not sure"},{value:"all",label:"All or nearly all"},{value:"some",label:"Only some"}]}/>
      <Select label="Have you checked the embedded capture date?" value={embedded} onChange={setEmbedded} options={[{value:"unknown",label:"No / not sure"},{value:"correct",label:"Yes, it shows the original date"},{value:"missing",label:"Yes, the capture field is missing"},{value:"wrong",label:"Yes, the capture field is wrong"}]}/>
      <Select label="Does the export include JSON sidecar files?" value={sidecar} onChange={setSidecar} options={[{value:"unknown",label:"Not sure"},{value:"yes",label:"Yes"},{value:"no",label:"No"}]}/>
    </div>
    <div className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-white p-6" aria-live="polite"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Diagnostic result · {diagnosis.kind === "metadata-present" ? "Capture date found" : diagnosis.kind === "likely-display" ? "Likely timestamp difference" : "Investigation needed"}</p><h3 className="mt-3 text-xl font-semibold">{diagnosis.title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{diagnosis.explanation}</p><h4 className="mt-5 font-semibold">What to check next</h4><ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">{diagnosis.steps.map(s => <li key={s}>{s}</li>)}</ol></div>
    <div className="mt-6"><label htmlFor="photo-date-summary" className="block text-sm font-semibold">Diagnostic summary to copy</label><p className="mt-1 text-xs text-[var(--muted)]">Review the summary before copying. It contains only your selected answers and the suggested next steps.</p><textarea id="photo-date-summary" readOnly rows={8} value={summary} className="mt-3 w-full resize-y rounded-xl border border-[var(--border)] bg-white p-3 text-xs leading-5"/><button type="button" onClick={copySummary} className="mt-3 rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]">Copy diagnostic summary</button><p role="status" className="mt-2 text-sm">{copyStatus}</p></div>
    <p className="mt-5 text-xs leading-6 text-[var(--muted)]">Do not overwrite original photos, discard JSON sidecars, or run bulk metadata repairs before making a verified backup. The tool does not access your files or send your answers to a server.</p>
  </div></section>;
}
