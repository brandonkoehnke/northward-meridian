"use client";

import { useMemo, useState } from "react";

type Values = {
  months: number; currentRent: number; currentFees: number; smallRent: number;
  smallFees: number; annualIncrease: number; moveSmall: number; emptyCost: number;
  resaleEmpty: number; replaceEmpty: number; smallDisposal: number;
  smallResale: number; smallReplacement: number; exitCurrent: number;
  exitSmall: number;
};
const initial: Values = {
  months: 24, currentRent: 180, currentFees: 15, smallRent: 85,
  smallFees: 10, annualIncrease: 5, moveSmall: 250, emptyCost: 350,
  resaleEmpty: 600, replaceEmpty: 1500, smallDisposal: 0,
  smallResale: 0, smallReplacement: 0, exitCurrent: 0, exitSmall: 0,
};
const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const items: { key: keyof Values; label: string; hint?: string }[] = [
  { key: "currentRent", label: "Current unit rent ($/month)" },
  { key: "currentFees", label: "Current insurance and fees ($/month)" },
  { key: "smallRent", label: "Smaller unit rent ($/month)" },
  { key: "smallFees", label: "Smaller unit fees ($/month)" },
  { key: "months", label: "Compare the next (months)", hint: "All three choices use the same future period." },
  { key: "annualIncrease", label: "Annual rent increase (%)", hint: "Applied to rent every 12 completed months, not to fees." },
  { key: "moveSmall", label: "Cost to move to smaller unit ($)" },
  { key: "smallDisposal", label: "Disposal or sale expenses when downsizing ($)" },
  { key: "smallResale", label: "Resale proceeds from downsizing ($)" },
  { key: "smallReplacement", label: "Future replacement purchases after downsizing ($)" },
  { key: "emptyCost", label: "Cost to empty current unit ($)" },
  { key: "resaleEmpty", label: "Resale proceeds if emptied ($)" },
  { key: "replaceEmpty", label: "Future replacement purchases if emptied ($)" },
  { key: "exitCurrent", label: "End-of-period cost to clear current unit ($)", hint: "Set to zero if keeping it beyond the comparison period." },
  { key: "exitSmall", label: "End-of-period cost to clear smaller unit ($)", hint: "Set to zero if keeping it beyond the comparison period." },
];

function recurring(month: number, rent: number, fees: number, annualIncrease: number) {
  return rent * Math.pow(1 + annualIncrease / 100, Math.floor((month - 1) / 12)) + fees;
}
function totals(v: Values, smallAvailable: boolean, months: number) {
  let keep = 0;
  let downsize = v.moveSmall + v.smallDisposal + v.smallReplacement - v.smallResale;
  for (let m = 1; m <= months; m++) {
    keep += recurring(m, v.currentRent, v.currentFees, v.annualIncrease);
    downsize += recurring(m, v.smallRent, v.smallFees, v.annualIncrease);
  }
  const empty = v.emptyCost + v.replaceEmpty - v.resaleEmpty;
  return {
    keep: keep + (months === v.months ? v.exitCurrent : 0),
    downsize: smallAvailable ? downsize + (months === v.months ? v.exitSmall : 0) : null,
    empty,
  };
}

export default function StorageDecisionCalculator() {
  const [values, setValues] = useState<Values>(initial);
  const [smallAvailable, setSmallAvailable] = useState(true);
  const [includesSentimental, setIncludesSentimental] = useState(false);
  const valid = Object.values(values).every((n) => Number.isFinite(n) && n >= 0) &&
    Number.isInteger(values.months) && values.months >= 1 && values.months <= 240 && values.annualIncrease <= 100;
  const results = useMemo(() => valid ? totals(values, smallAvailable, values.months) : null, [values, smallAvailable, valid]);
  const ranking = results ? ([
    { name: "Keep current unit", value: results.keep },
    ...(results.downsize === null ? [] : [{ name: "Downsize", value: results.downsize }]),
    { name: "Empty now", value: results.empty },
  ].sort((a, b) => a.value - b.value)) : [];
  const winner = ranking[0];
  // Independently calculate the first crossing for each recurring scenario.
  const crossings = useMemo(() => {
    if (!valid) return { keep: null as number | null, downsize: null as number | null };
    const empty = values.emptyCost + values.replaceEmpty - values.resaleEmpty;
    let keep = 0;
    let down = values.moveSmall + values.smallDisposal + values.smallReplacement - values.smallResale;
    let keepMonth: number | null = null;
    let downMonth: number | null = null;
    for (let m = 1; m <= values.months; m++) {
      keep += recurring(m, values.currentRent, values.currentFees, values.annualIncrease);
      down += recurring(m, values.smallRent, values.smallFees, values.annualIncrease);
      if (keepMonth === null && keep >= empty) keepMonth = m;
      if (smallAvailable && downMonth === null && down >= empty) downMonth = m;
    }
    return { keep: keepMonth, downsize: downMonth };
  }, [values, smallAvailable, valid]);

  return <section id="storage-decision-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-12">
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Three-way cost calculator</p>
      <h2 className="mt-3 text-3xl font-semibold">Keep, downsize, or empty?</h2>
      <p className="mt-3 text-[var(--muted)] leading-7">Compare costs from today forward. Past storage payments and original purchase prices are sunk costs. All amounts are editable examples, not quotes or predictions.</p>
      <label className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-sm">
        <input type="checkbox" className="mt-1" checked={smallAvailable} onChange={(e) => setSmallAvailable(e.target.checked)} />
        <span>A suitable smaller unit is available and can hold the belongings I want to keep.</span>
      </label>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(({ key, label, hint }) => <label key={key} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span>
          <input aria-label={label} type="number" min="0" max={key === "months" ? "240" : key === "annualIncrease" ? "100" : undefined} step={key === "months" ? "1" : "any"} value={values[key]} onChange={(e) => setValues((old) => ({ ...old, [key]: e.target.value === "" ? NaN : Number(e.target.value) }))} className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3" />
          {hint && <span className="text-xs text-[var(--muted)]">{hint}</span>}
        </label>)}
      </div>
      <label className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-sm">
        <input type="checkbox" className="mt-1" checked={includesSentimental} onChange={(e) => setIncludesSentimental(e.target.checked)} />
        <span>Some belongings are irreplaceable or have important sentimental value.</span>
      </label>
      {!valid ? <p role="alert" className="mt-6 text-sm font-semibold text-red-700">Enter nonnegative finite costs, a whole-number period of 1–240 months, and an annual rent increase of 0–100%.</p> : results && winner && <div className="mt-8" aria-live="polite">
        <div className="rounded-2xl border-2 border-[var(--accent)] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Lowest modeled future cost</p>
          <h3 className="mt-2 text-2xl font-semibold">{winner.name}</h3>
          <p className="mt-2 text-3xl font-semibold">{money(winner.value)}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Over {values.months} months. Difference versus the most expensive eligible choice: {money(ranking[ranking.length - 1].value - winner.value)}. A negative cost means net cash recovered.</p>
          {includesSentimental && <p className="mt-4 text-sm font-semibold text-amber-900">Important: This financial ranking cannot value irreplaceable possessions. Do not treat the lowest-cost option as a recommendation to dispose of them.</p>}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {([ ["Keep", results.keep], ["Downsize", results.downsize], ["Empty", results.empty] ] as const).map(([label, amount]) => <div key={label} className="rounded-2xl border border-[var(--border)] bg-white p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-2xl font-semibold">{amount === null ? "Unavailable" : money(amount)}</p></div>)}
        </div>
        <div className="mt-5 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-7">
          <strong>When ongoing storage catches up to emptying:</strong>
          <p>Keep: {crossings.keep === null ? "Not within the selected period" : `Month ${crossings.keep}`}.</p>
          {smallAvailable && <p>Downsize: {crossings.downsize === null ? "Not within the selected period" : `Month ${crossings.downsize}`}.</p>}
          <p className="mt-2 text-[var(--muted)]">These crossings compare cumulative recurring costs (plus immediate downsizing costs) against the one-time net cost of emptying. They exclude optional end-of-period clearing costs. They do not mean the lowest-cost option changes at that month.</p>
        </div>
      </div>}
      <p className="mt-5 text-sm leading-6 text-[var(--muted)]">Assumptions: The current and smaller unit rents rise by the entered percentage after each 12 months; recurring fees remain constant. One-time costs and proceeds occur now; future replacement purchases are included at face value without discounting. End-of-period clearing costs apply only at the selected horizon. No probability of sale, inflation-adjusted replacement price, tax effect, storage damage, or value of convenience is modeled. If you retain possessions after emptying, include their future replacement costs only when you expect to repurchase them.</p>
    </div>
  </section>;
}
