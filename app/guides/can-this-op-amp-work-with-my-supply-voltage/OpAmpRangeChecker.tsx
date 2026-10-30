"use client";

import { useState } from "react";

type Part = "LM741" | "LM358" | "TL072";
type Check = { label: string; status: "Within checked limits" | "Outside limit" | "Insufficient data"; detail: string };
const devices: Record<Part, { min: number; max: number; source: string; note: string }> = {
  LM741: { min: 10, max: 44, source: "https://www.ti.com/product/LM741", note: "TI LM741 product specification: total supply 10–44 V. Input and output headroom values on the product page are typical, not guaranteed across arbitrary conditions." },
  LM358: { min: 3, max: 30, source: "https://www.ti.com/lit/ds/symlink/lm358.pdf", note: "TI SLOS068AB, LM358 (not LM358B): common-mode electrical characteristics specified at VS = 5 V, with additional conditions. Output swing depends on load." },
  TL072: { min: 7, max: 30, source: "https://www.ti.com/lit/ds/symlink/tl072.pdf", note: "TI SLOS080W, original TL072 (not TL072H). Many input and output characteristics are specified at ±15 V, not at arbitrary supplies." },
};
const fmt = (n: number) => Number.isFinite(n) ? `${Number(n.toFixed(3))} V` : "—";
function NumberField({ label, value, set }: { label: string; value: string; set: (s: string) => void }) {
  return <label className="flex flex-col gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span><input className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3" type="number" step="any" value={value} onChange={e => set(e.target.value)} /></label>;
}
function VoltageEnvelope({ vp, vn, inputLow, inputHigh, outputLow, outputHigh }: { vp: number; vn: number; inputLow: number; inputHigh: number; outputLow: number; outputHigh: number }) {
  // This graphic represents user-entered voltages only; it does not imply device-specific common-mode or output-swing guarantees.
  const span = vp - vn;
  const position = (v: number) => Math.max(0, Math.min(100, ((v - vn) / span) * 100));
  const rows = [
    { name: "Input signal", low: inputLow, high: inputHigh, color: "bg-sky-600" },
    { name: "Required output", low: outputLow, high: outputHigh, color: "bg-amber-700" },
  ];
  return <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5" aria-label="Voltage envelope of entered supply rails and signal ranges">
    <h3 className="text-base font-semibold">Your voltage ranges</h3>
    <p className="mt-1 text-sm text-[var(--muted)]">The horizontal scale runs from V− to V+. Colored bars show your entered signal ranges, not the op-amp&apos;s guaranteed operating limits. Portions outside the rails are clipped in this illustration.</p>
    <div className="mt-5 flex justify-between gap-3 text-xs font-semibold text-[var(--muted)]"><span>V− {fmt(vn)}</span><span>V+ {fmt(vp)}</span></div>
    <div className="mt-2 space-y-5">
      {rows.map(row => {
        const left = position(row.low);
        const right = position(row.high);
        const outside = row.low < vn || row.high > vp;
        return <div key={row.name}>
          <div className="mb-2 flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm"><span className="font-medium">{row.name}</span><span className="text-[var(--muted)]">{fmt(row.low)} to {fmt(row.high)}</span></div>
          <div className="relative h-5 overflow-hidden rounded-md bg-[var(--surface)] ring-1 ring-inset ring-[var(--border)]">
            <div className="absolute inset-y-0 left-0 w-px bg-[var(--muted)]" />
            <div className="absolute inset-y-0 right-0 w-px bg-[var(--muted)]" />
            <div className={`absolute inset-y-1 rounded-sm ${row.color}`} style={{ left: `${left}%`, width: `${Math.max(0, right - left)}%`, minWidth: left === right && !outside ? "3px" : undefined }} />
          </div>
          {outside && <p className="mt-1 text-xs text-red-700">Part of this range is outside the selected supply rails.</p>}
        </div>;
      })}
    </div>
    <p className="mt-4 text-xs text-[var(--muted)]">Scale spans {fmt(span)}. The visualization does not establish input common-mode compatibility or output swing under load.</p>
  </div>;
}
export default function OpAmpRangeChecker() {
  const [part, setPart] = useState<Part>("LM741");
  const [positive, setPositive] = useState("5");
  const [negative, setNegative] = useState("0");
  const [inputMin, setInputMin] = useState("1");
  const [inputMax, setInputMax] = useState("2");
  const [outputMin, setOutputMin] = useState("1");
  const [outputMax, setOutputMax] = useState("2");
  const [configuration, setConfiguration] = useState<"follower" | "noninverting">("follower");
  const [gain, setGain] = useState("2");
  const [load, setLoad] = useState("10");
  const vals = [positive, negative, inputMin, inputMax, outputMin, outputMax, load, gain].map(Number);
  const [vp, vn, vi0, vi1, vo0, vo1, rl, g] = vals;
  const valid = [positive, negative, inputMin, inputMax, outputMin, outputMax, load, gain].every(s => s.trim() !== "" && Number.isFinite(Number(s))) && vp > vn && vi0 <= vi1 && vo0 <= vo1 && rl > 0 && (configuration === "follower" || g >= 1);
  const supply = vp - vn;
  const spec = devices[part];
  const checks: Check[] = [];
  if (valid) {
    checks.push({ label: "Supply voltage", status: supply < spec.min || supply > spec.max ? "Outside limit" : "Within checked limits", detail: `Total supply ${fmt(supply)}; TI-listed operating range ${spec.min}–${spec.max} V. This is not an absolute-maximum-rating check.` });
    const theoreticalMin = configuration === "follower" ? vi0 : vn + g * (vi0 - vn);
    const theoreticalMax = configuration === "follower" ? vi1 : vn + g * (vi1 - vn);
    checks.push({ label: "Ideal closed-loop output", status: theoreticalMin < vn || theoreticalMax > vp || vo0 < vn || vo1 > vp ? "Outside limit" : "Within checked limits", detail: `Ideal ${configuration === "follower" ? "follower" : "non-inverting"} output: ${fmt(theoreticalMin)} to ${fmt(theoreticalMax)}. Desired output: ${fmt(vo0)} to ${fmt(vo1)}. The ideal calculation ignores output headroom and saturation.` });
    const cmPossible = part === "LM358" && supply >= 5 && supply <= 30;
    if (cmPossible) {
      const upper = vp - 2;
      checks.push({ label: "Input common-mode", status: vi0 < vn || vi1 > upper ? "Outside limit" : "Within checked limits", detail: `For original LM358 at VS = 5–30 V, the datasheet lists V− to V+ − 2 V over TA = 0–70°C. Entered non-inverting input range: ${fmt(vi0)} to ${fmt(vi1)}. This checks that input only; actual input-pin behavior depends on the circuit.` });
    } else {
      checks.push({ label: "Input common-mode", status: "Insufficient data", detail: part === "LM358" ? "The selected supply is outside the LM358 5–30 V common-mode specification conditions used by this checker." : "The available device-specific limits cannot be safely generalized to the entered supply and temperature. Consult the relevant electrical-characteristics table." });
    }
    checks.push({ label: "Output swing under load", status: "Insufficient data", detail: `Requested ${fmt(vo0)} to ${fmt(vo1)} at ${rl} kΩ nominal load. The checker does not extrapolate guaranteed output swing across different supplies, loads, temperatures or variants. Verify the datasheet test conditions.` });
  }
  const supplyFails = valid && (supply < spec.min || supply > spec.max);
  const idealFails = valid && checks.some(c => c.label === "Ideal closed-loop output" && c.status === "Outside limit");
  const commonModeFails = valid && checks.some(c => c.label === "Input common-mode" && c.status === "Outside limit");
  const fail = supplyFails || idealFails || commonModeFails;

  return <section id="op-amp-checker" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-12"><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Engineering reality check</p>
    <h2 className="mt-3 text-3xl font-semibold">Op-amp operating-range checker</h2>
    <p className="mt-3 text-[var(--muted)]">Choose an original Texas Instruments part, then enter your DC circuit conditions. This is a screening tool, not a circuit simulation or design approval.</p>
    <label className="mt-7 flex flex-col gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Device family — original TI variant only</span><select className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3" value={part} onChange={e => setPart(e.target.value as Part)}>{Object.keys(devices).map(p => <option key={p} value={p}>{p}</option>)}</select></label>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><NumberField label="Positive rail V+ (V)" value={positive} set={setPositive}/><NumberField label="Negative rail V− (V)" value={negative} set={setNegative}/><NumberField label="Minimum non-inverting input (V)" value={inputMin} set={setInputMin}/><NumberField label="Maximum non-inverting input (V)" value={inputMax} set={setInputMax}/><NumberField label="Required output minimum (V)" value={outputMin} set={setOutputMin}/><NumberField label="Required output maximum (V)" value={outputMax} set={setOutputMax}/></div>
    <label className="mt-5 flex flex-col gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Idealized circuit</span><select className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3" value={configuration} onChange={e => setConfiguration(e.target.value as "follower" | "noninverting")}><option value="follower">Voltage follower (gain 1)</option><option value="noninverting">Non-inverting, referenced to V−</option></select></label>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">{configuration === "noninverting" && <NumberField label="Ideal closed-loop gain (≥ 1)" value={gain} set={setGain}/>}<NumberField label="Output load resistance (kΩ)" value={load} set={setLoad}/></div>
    {!valid ? <p role="alert" className="mt-6 text-sm font-semibold text-red-700">Check your entries: all fields must contain finite numbers, V+ must exceed V−, input and output ranges must be ordered, load must be positive, and non-inverting gain must be at least 1.</p> : <div className="mt-8" aria-live="polite">
      <VoltageEnvelope vp={vp} vn={vn} inputLow={vi0} inputHigh={vi1} outputLow={vo0} outputHigh={vo1} />
      <div className="mt-5 rounded-2xl border-2 border-[var(--accent)] bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Assessment</p>
        <h3 className="mt-2 text-xl font-semibold">{supplyFails ? "Supply voltage is outside this device's listed operating range" : fail ? "One or more checked limits are violated" : "No violation found in checked limits — other limits remain unverified"}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{supplyFails ? `Your supply is ${fmt(supply)}, but the original TI ${part} lists ${spec.min}–${spec.max} V total. Changing the input or output signal will not resolve this supply limitation. Select a specified supply or a different amplifier before proceeding.` : idealFails ? "The idealized output or requested output exceeds a supply rail. Adjust the circuit requirements before checking device-specific output headroom." : commonModeFails ? "The input range exceeds the checked common-mode limit for this device under the stated conditions. Review the datasheet and circuit configuration." : "These checks do not establish full device compatibility. Output swing under the actual load remains unverified without matching datasheet conditions."}</p>
      </div>
      <div className="mt-4 grid gap-3">{checks.map(c => <div key={c.label} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-semibold">{c.label}: <span className={c.status === "Outside limit" ? "text-red-700" : "text-[var(--muted)]"}>{c.status}</span></p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{c.detail}</p></div>)}</div>
    </div>}
    <p className="mt-6 text-sm leading-6 text-[var(--muted)]">{spec.note} <a className="underline underline-offset-4" href={spec.source} target="_blank" rel="noopener noreferrer">Read the manufacturer specification</a>. This tool does not check input differential voltage, power dissipation, frequency response, phase reversal, offset, stability, capacitive loading or safe operation outside recommended conditions.</p>
  </div></section>;
}
