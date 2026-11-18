"use client";

import { useState } from "react";

type Speed = "unknown" | "0.48" | "5" | "10" | "20" | "40";
type Workload = "large" | "small" | "benchmark";
type Pattern = "steady" | "drops" | "variable";
type Direction = "read" | "write";
const fieldStyle = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm";
const speedOptions: { value: Speed; label: string }[] = [
  { value: "unknown", label: "Unknown / not verified" },
  { value: "0.48", label: "USB 2.0 (480 Mbps)" },
  { value: "5", label: "USB 5Gbps" },
  { value: "10", label: "USB 10Gbps" },
  { value: "20", label: "USB 20Gbps (verify protocol)" },
  { value: "40", label: "USB4 / Thunderbolt 40Gbps (verify compatibility)" },
];
export type SsdInputs = { advertised: number; observed: number; direction: Direction; host: Speed; cable: Speed; enclosure: Speed; hub: Speed; throughHub: boolean; workload: Workload; pattern: Pattern; advertisedDirection: "read" | "write" | "unknown" };
export type SsdResult = { kind: "invalid" | "known-limit" | "investigate" | "plausible"; title: string; summary: string; steps: string[]; limitGbps: number | null; limitingParts: string[] };
export function diagnoseSsd(x: SsdInputs): SsdResult {
  if (!Number.isFinite(x.advertised) || !Number.isFinite(x.observed) || x.advertised <= 0 || x.observed <= 0 || x.advertised > 100000 || x.observed > 100000) {
    return { kind: "invalid", title: "Enter valid positive speeds", summary: "Both speeds must be greater than zero and within the supported input range.", steps: ["Enter advertised and measured speeds in MB/s (not Mbps)."], limitGbps: null, limitingParts: [] };
  }
  const parts: [string, Speed][] = [["Computer port", x.host], ["Cable", x.cable], ["SSD or enclosure", x.enclosure]];
  if (x.throughHub) parts.push(["Hub or dock", x.hub]);
  const known = parts.filter((p): p is [string, Exclude<Speed, "unknown">] => p[1] !== "unknown");
  const unknown = parts.filter(p => p[1] === "unknown").map(p => p[0]);
  const limitGbps = known.length ? Math.min(...known.map(p => Number(p[1]))) : null;
  const limitingParts = limitGbps === null ? [] : known.filter(p => Number(p[1]) === limitGbps).map(p => p[0]);
  const rawMBps = limitGbps === null ? null : limitGbps * 1000 / 8;
  const steps: string[] = [];
  if (unknown.length) steps.push(`Verify the actual data capability of: ${unknown.join(", ")}. Charging wattage and connector shape are not enough.`);
  if (x.advertisedDirection === "unknown" || x.advertisedDirection !== x.direction) steps.push("Check whether the advertised number is a peak read speed while you measured writes (or vice versa).");
  if (x.workload === "small") steps.push("Retest with one large file or a sequential benchmark; many small files are limited by per-file overhead.");
  if (x.pattern === "drops") steps.push("Test short and sustained writes separately; cache exhaustion, temperature and drive fill level may cause slowdowns.");
  if (x.throughHub) steps.push("Test directly without the hub/dock, then compare the same workload and cable.");
  if (x.host === "20" || x.cable === "20" || x.enclosure === "20" || x.hub === "20") steps.push("USB 20Gbps can refer to different link modes. Verify whether both ends support the same mode, including USB 3.2 Gen 2x2 where applicable.");
  if ([x.host, x.cable, x.enclosure, ...(x.throughHub ? [x.hub] : [])].includes("40")) steps.push("A 40Gbps label does not guarantee a particular USB 20Gbps mode or SSD throughput; verify negotiated protocol and device support.");
  steps.push("Check negotiated USB link speed using the OS or a USB inspection utility; compare a known-good port and cable.");
  steps.push("Measure using the same test, direction and file size; interface ratings are raw signaling speeds, not guaranteed file throughput.");
  const definite = rawMBps !== null && rawMBps < x.advertised;
  const ratio = x.observed / x.advertised;
  if (definite) return { kind: "known-limit", title: "A documented interface limit is below the advertised speed", summary: `${limitingParts.join(" and ")} has the lowest stated link rating (${limitGbps} Gbps). Its raw signaling ceiling is ${Math.round(rawMBps!)} MB/s before protocol overhead. Actual transfer rates will be lower; this does not prove it is the only cause of your result.`, steps, limitGbps, limitingParts };
  if (unknown.length || ratio < 0.65 || x.pattern === "drops" || x.workload === "small" || x.advertisedDirection !== x.direction) {
    return { kind: "investigate", title: "More testing is needed to isolate the slowdown", summary: "The inputs do not establish a single cause. Observed speed alone cannot identify a defective cable or drive.", steps, limitGbps, limitingParts };
  }
  return { kind: "plausible", title: "No obvious bottleneck identified from the entered ratings", summary: "Your observed transfer rate is reasonably close to the advertised number, but this is not a certification of the connection or a performance guarantee.", steps, limitGbps, limitingParts };
}
function NumberField({ label, value, set, note }: { label: string; value: string; set: (s: string) => void; note?: string }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold">{label}<input className={fieldStyle} type="number" min="0" step="any" value={value} onChange={e => set(e.target.value)} />{note && <span className="text-xs font-normal text-[var(--muted)]">{note}</span>}</label>;
}
function SelectField<T extends string>({ label, value, set, options }: { label: string; value: T; set: (s: T) => void; options: { value: T; label: string }[] }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold">{label}<select className={fieldStyle} value={value} onChange={e => set(e.target.value as T)}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;
}
export default function SsdBottleneckChecker() {
  const [advertised, setAdvertised] = useState("1050");
  const [observed, setObserved] = useState("40");
  const [direction, setDirection] = useState<Direction>("write");
  const [advertisedDirection, setAdvertisedDirection] = useState<"read" | "write" | "unknown">("write");
  const [host, setHost] = useState<Speed>("unknown");
  const [cable, setCable] = useState<Speed>("unknown");
  const [enclosure, setEnclosure] = useState<Speed>("10");
  const [throughHub, setThroughHub] = useState(false);
  const [hub, setHub] = useState<Speed>("unknown");
  const [workload, setWorkload] = useState<Workload>("large");
  const [pattern, setPattern] = useState<Pattern>("steady");
  const result = diagnoseSsd({ advertised: Number(advertised), observed: Number(observed), direction, advertisedDirection, host, cable, enclosure, throughHub, hub, workload, pattern });
  return <section id="ssd-checker" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-12"><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Diagnostic calculator</p>
    <h2 className="mt-3 text-3xl font-semibold">Find your external SSD bottleneck</h2>
    <p className="mt-3 leading-7 text-[var(--muted)]">Enter the speeds and specifications you can verify. Unknown is an acceptable answer. The tool identifies stated interface ceilings and useful next tests; it cannot measure the negotiated link automatically.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <NumberField label="Advertised SSD speed (MB/s)" value={advertised} set={setAdvertised} note="Peak sequential speed; verify read vs. write." />
      <NumberField label="Observed speed (MB/s)" value={observed} set={setObserved} note="Use the same units, test type and direction." />
      <SelectField label="What did you measure?" value={direction} set={setDirection} options={[{value:"read",label:"Read from SSD"},{value:"write",label:"Write to SSD"}]} />
      <SelectField label="Advertised speed describes" value={advertisedDirection} set={setAdvertisedDirection} options={[{value:"read",label:"Peak read"},{value:"write",label:"Peak write"},{value:"unknown",label:"Unknown"}]} />
      <SelectField label="Computer port data rating" value={host} set={setHost} options={speedOptions} />
      <SelectField label="Cable data rating" value={cable} set={setCable} options={speedOptions} />
      <SelectField label="SSD/enclosure USB interface" value={enclosure} set={setEnclosure} options={speedOptions} />
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={throughHub} onChange={e => setThroughHub(e.target.checked)} />Connected through a hub or dock</label>
      {throughHub && <SelectField label="Hub/dock data rating" value={hub} set={setHub} options={speedOptions} />}
      <SelectField label="Workload" value={workload} set={setWorkload} options={[{value:"large",label:"One large file"},{value:"small",label:"Many small files"},{value:"benchmark",label:"Sequential benchmark"}]} />
      <SelectField label="Speed pattern" value={pattern} set={setPattern} options={[{value:"steady",label:"Consistently slow"},{value:"drops",label:"Starts fast, then drops"},{value:"variable",label:"Varies unpredictably"}]} />
    </div>
    <div className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-white p-6" aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Diagnostic result · {result.kind === "known-limit" ? "Interface ceiling" : result.kind === "invalid" ? "Invalid input" : result.kind === "plausible" ? "No obvious limit" : "Investigation needed"}</p>
      <h3 className="mt-3 text-xl font-semibold">{result.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{result.summary}</p>
      {result.kind !== "invalid" && <p className="mt-3 text-sm">Observed speed is <strong>{(Number(observed) / Number(advertised) * 100).toFixed(0)}%</strong> of the advertised figure. This percentage is not a pass/fail score.</p>}
      <h4 className="mt-5 font-semibold">What to check next</h4><ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6">{result.steps.map(s => <li key={s}>{s}</li>)}</ol>
    </div>
    <p className="mt-4 text-xs leading-6 text-[var(--muted)]">Important: Gbps is gigabits per second; MB/s is megabytes per second. Dividing raw Gbps by eight gives a signaling ceiling before USB overhead, not a predicted file-copy speed. USB4, Thunderbolt, and USB 3.2 Gen 2x2 modes are not interchangeable solely because a number matches.</p>
  </div></section>;
}
