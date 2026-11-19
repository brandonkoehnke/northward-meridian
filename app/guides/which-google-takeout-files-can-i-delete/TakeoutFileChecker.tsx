"use client";

import { useState } from "react";

type FileKind = "unknown" | "media" | "json" | "edited" | "other";
type Location = "unknown" | "year" | "album" | "multiple" | "archive";
type Match = "unknown" | "none" | "name" | "visual" | "hash";
type Backup = "unknown" | "yes" | "no";
type Context = "unknown" | "preserved" | "needed" | "not-checked";
export type TakeoutInputs = { kind: FileKind; location: Location; match: Match; backup: Backup; context: Context };
export type TakeoutResult = { status: "preserve" | "review" | "not-ready"; title: string; explanation: string; steps: string[] };

const backupStep = "Keep the complete original Takeout export unchanged. Work on a separate copy and verify that you can restore files before considering any removal.";
export function diagnoseTakeoutFile(x: TakeoutInputs): TakeoutResult {
  if (x.kind === "json") return { status: "preserve", title: "Preserve this metadata sidecar", explanation: "A JSON sidecar is not a duplicate photograph. It may contain Google Photos information absent from the media file. Filename differences do not establish that a sidecar is orphaned.", steps: ["Keep JSON files with the complete export, including files in other archive parts.", "Inspect the sidecar and any associated media on a copy before attempting metadata reconciliation.", backupStep] };
  if (x.kind === "edited") return { status: "preserve", title: "Preserve the edited version and original", explanation: "An edited export may contain intentional changes even when it looks similar to the original. A similar name is not proof of duplicate content.", steps: ["Compare the edited and original versions visually and check their metadata.", "Keep both until you have decided whether you want the edits and original separately.", backupStep] };
  if (x.backup !== "yes") return { status: "not-ready", title: "Do not remove anything until a separate backup is verified", explanation: "Without a recoverable original archive, removing even a true duplicate could permanently discard metadata or album organization.", steps: ["Create and verify a separate, complete backup of the Takeout archives and extracted files.", "Do not delete media, JSON sidecars, or folders based only on their names.", "After verification, compare a small sample in a working copy."] };
  if (x.match === "hash") return { status: "review", title: "Identical content is a useful clue, not deletion permission", explanation: "Matching SHA-256 hashes provide strong evidence that the compared file bytes are identical. They do not establish that both locations, album memberships, sidecars, or archive copies are unnecessary.", steps: ["Confirm that the hash was calculated for the actual two files and not only their names.", x.context === "preserved" ? "Your folder and album context is reported preserved; verify that claim with a small restoration test." : "Record both original paths and preserve album/folder relationships and related JSON sidecars.", "If consolidating, make changes only in a working copy and confirm photos, dates, and album organization still work.", backupStep] };
  if (x.match === "visual" || x.match === "name") return { status: "review", title: "This is only a possible duplicate", explanation: "Matching names or similar-looking images do not prove identical bytes. Edited versions, different resolutions, metadata, and album copies can differ.", steps: ["Compare file sizes and use a local hash comparison for exact content identity if appropriate.", "Check whether either file is an edited version or has different metadata or album context.", backupStep] };
  if (x.kind === "media" && x.location === "multiple") return { status: "review", title: "Repeated folder locations need verification", explanation: "A photo appearing in a year folder and an album folder may represent export duplication or important album organization. Folder location alone cannot establish redundancy.", steps: ["Compare the actual file content; do not assume matching filenames are identical.", "Keep a record of each album and year folder location and associated JSON metadata.", backupStep] };
  return { status: "not-ready", title: "Not enough evidence to identify a redundant file", explanation: "Google Takeout filenames, folder names, and archive placement do not independently prove a file can be removed without losing content or context.", steps: ["Identify whether the file is media, an edited version, or a metadata sidecar.", "Compare a small representative sample and check for related metadata across archive parts.", backupStep] };
}

const selectClass = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm";
function Field<T extends string>({ label, value, set, options }: { label: string; value: T; set: (v: T) => void; options: { value: T; label: string }[] }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold">{label}<select className={selectClass} value={value} onChange={(e) => set(e.target.value as T)}>{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;
}
export default function TakeoutFileChecker() {
  const [kind, setKind] = useState<FileKind>("unknown");
  const [location, setLocation] = useState<Location>("unknown");
  const [match, setMatch] = useState<Match>("unknown");
  const [backup, setBackup] = useState<Backup>("unknown");
  const [context, setContext] = useState<Context>("unknown");
  const [copyStatus, setCopyStatus] = useState("");
  const result = diagnoseTakeoutFile({ kind, location, match, backup, context });
  const facts = [["File type", kind], ["Folder location", location], ["Comparison", match], ["Separate backup", backup], ["Album/metadata context", context]].filter(([, value]) => value !== "unknown");
  const summary = ["Northward Meridian — Google Takeout file review", ...facts.map(([key, value]) => `${key}: ${value}`), `Assessment: ${result.title}`, result.explanation, "Recommended next steps:", ...result.steps.map((s, i) => `${i + 1}. ${s}`), "https://www.northwardmeridian.com/guides/which-google-takeout-files-can-i-delete"].join("\n");
  async function copy() { try { await navigator.clipboard.writeText(summary); setCopyStatus("Summary copied."); } catch { setCopyStatus("Clipboard unavailable. Select the summary text and copy manually."); } }
  return <section id="takeout-file-checker" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-12"><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">File decision checker</p>
    <h2 className="mt-3 text-3xl font-semibold">What should you keep from Google Takeout?</h2>
    <p className="mt-3 leading-7 text-[var(--muted)]">Describe one file or pair of files. The checker does not access, upload, alter, or delete your files. It never certifies that a file is safe to delete.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <Field label="What kind of file is it?" value={kind} set={setKind} options={[{value:"unknown",label:"Not sure"},{value:"media",label:"Photo or video"},{value:"json",label:"JSON metadata sidecar"},{value:"edited",label:"Edited photo or video version"},{value:"other",label:"Other file"}]}/>
      <Field label="Where is it found?" value={location} set={setLocation} options={[{value:"unknown",label:"Not sure"},{value:"year",label:"Year folder"},{value:"album",label:"Album folder"},{value:"multiple",label:"Same-looking file in multiple folders"},{value:"archive",label:"Separate ZIP/archive part"}]}/>
      <Field label="How have you compared the two files?" value={match} set={setMatch} options={[{value:"unknown",label:"Not compared / unsure"},{value:"none",label:"No matching file found"},{value:"name",label:"Names look the same"},{value:"visual",label:"Images look the same"},{value:"hash",label:"SHA-256 hashes match exactly"}]}/>
      <Field label="Do you have a verified separate backup of the complete export?" value={backup} set={setBackup} options={[{value:"unknown",label:"Not sure"},{value:"no",label:"No"},{value:"yes",label:"Yes, complete and recoverable"}]}/>
      <Field label="Have you preserved album paths and related metadata?" value={context} set={setContext} options={[{value:"unknown",label:"Not sure"},{value:"not-checked",label:"Not checked yet"},{value:"needed",label:"Some album/metadata information is still needed"},{value:"preserved",label:"Recorded and checked on a working copy"}]}/>
    </div>
    <div className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-white p-6" aria-live="polite"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Assessment · {result.status === "preserve" ? "Preserve" : result.status === "review" ? "Further verification" : "Do not delete yet"}</p><h3 className="mt-3 text-xl font-semibold">{result.title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{result.explanation}</p><h4 className="mt-5 font-semibold">What to do next</h4><ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">{result.steps.map((s) => <li key={s}>{s}</li>)}</ol></div>
    <div className="mt-6"><label htmlFor="takeout-summary" className="block text-sm font-semibold">Diagnostic summary to copy</label><p className="mt-1 text-xs text-[var(--muted)]">Only answered fields are listed. The preview is identical to the copied text.</p><textarea id="takeout-summary" readOnly rows={8} value={summary} className="mt-3 w-full resize-y rounded-xl border border-[var(--border)] bg-white p-3 text-xs leading-5"/><button type="button" onClick={copy} className="mt-3 rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]">Copy diagnostic summary</button><p role="status" className="mt-2 text-sm">{copyStatus}</p></div>
    <p className="mt-5 text-xs leading-6 text-[var(--muted)]">Never delete the only copy. Matching hashes compare file bytes, not album context. Preserve all original ZIP files and JSON sidecars; experiment only on separate copies.</p>
  </div></section>;
}
