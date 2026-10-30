"use client";

import { useState } from "react";

const dollars = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const nonnegative = (s: string) => { const n = Number(s); return Number.isFinite(n) ? Math.max(0, n) : 0; };
const signed = (s: string) => { const n = Number(s); return Number.isFinite(n) ? n : 0; };
function Field({ label, value, set, note, allowNegative = false }: { label: string; value: string; set: (v: string) => void; note?: string; allowNegative?: boolean }) {
  return <label className="flex flex-col gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span><input aria-label={label} type="number" min={allowNegative ? undefined : "0"} step="any" value={value} onChange={e => set(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3" />{note && <span className="text-xs text-[var(--muted)]">{note}</span>}</label>;
}
export default function TuitionExitCalculator() {
  const [total, setTotal] = useState("6000");
  const [repaymentNow, setRepaymentNow] = useState("6000");
  const [repaymentLater, setRepaymentLater] = useState("0");
  const [waitMonths, setWaitMonths] = useState("6");
  const [raise, setRaise] = useState("10000");
  const [benefits, setBenefits] = useState("0");
  const [bonus, setBonus] = useState("0");
  const [tax, setTax] = useState("25");
  const [horizon, setHorizon] = useState("24");
  const now = nonnegative(repaymentNow), later = nonnegative(repaymentLater);
  const wait = Math.min(120, nonnegative(waitMonths));
  const months = Math.min(240, Math.max(1, nonnegative(horizon)));
  const netRate = 1 - Math.min(100, nonnegative(tax)) / 100;
  // Salary and signing bonus are cash income; benefit differences are entered as estimated after-tax value.
  const monthlyGain = (signed(raise) * netRate + signed(benefits)) / 12;
  const oneTimeBonus = nonnegative(bonus) * netRate;
  const leaveNow = monthlyGain * months + oneTimeBonus - now;
  const delayedDepartureOccurs = wait < months;
  const waitThenLeave = delayedDepartureOccurs ? monthlyGain * (months - wait) + oneTimeBonus - later : 0;
  const difference = leaveNow - waitThenLeave;
  const repaymentRecovery = monthlyGain > 0 ? Math.max(0, (now - oneTimeBonus) / monthlyGain) : null;
  const valid = Number(horizon) > 0 && Number(waitMonths) >= 0 && Number(tax) >= 0 && Number(tax) <= 100 && Number.isFinite(Number(horizon));
  return <section id="leave-now-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-12"><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Decision calculator</p>
    <h2 className="mt-3 text-3xl font-semibold">Leave now or wait?</h2>
    <p className="mt-3 text-[var(--muted)]">Enter repayment amounts from your written agreement or employer. These are assumptions, not a determination of what you legally owe. Example values are prefilled.</p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2">
      <Field label="Assistance received ($) — reference only" value={total} set={setTotal} note="Used for a plausibility warning, not to calculate repayment." />
      <Field label="Repayment if leaving now ($)" value={repaymentNow} set={setRepaymentNow} />
      <Field label="Months until proposed departure" value={waitMonths} set={setWaitMonths} />
      <Field label="Repayment if leaving after waiting ($)" value={repaymentLater} set={setRepaymentLater} />
      <Field label="Annual gross salary difference ($)" value={raise} set={setRaise} allowNegative note="New job minus current job. Enter a negative number for a pay cut." />
      <Field label="Annual benefits and other cost difference ($)" value={benefits} set={setBenefits} allowNegative note="Estimated after-tax annual value: positive if the new job is better, negative if worse. Include recurring commuting or insurance costs here." />
      <Field label="One-time signing bonus ($)" value={bonus} set={setBonus} />
      <Field label="Estimated marginal tax rate on cash income (%)" value={tax} set={setTax} />
      <Field label="Compare total financial impact over the next (months)" value={horizon} set={setHorizon} note="Both choices are measured over the same period, starting today. The default is two years." />
    </div>
    {now > nonnegative(total) && <p role="status" className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><strong>Check the repayment amount:</strong> The amount due now exceeds assistance received by {dollars(now - nonnegative(total))}. Verify any additional charges and whether they apply under your agreement and applicable law.</p>}
    {later > now && <p role="status" className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><strong>Check the later repayment:</strong> The amount after waiting exceeds the amount due today. Confirm whether new assistance, interest, or other charges explain the increase.</p>}
    {!valid ? <p role="alert" className="mt-6 text-sm font-semibold text-red-700">Enter a comparison period above zero, a nonnegative waiting period, and a tax rate between 0% and 100%.</p> : <>
      <div
        className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-white p-6"
        aria-live="polite"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          Primary comparison result
        </p>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {difference > 0
            ? "Modeled advantage of leaving now"
            : difference < 0
              ? "Modeled advantage of waiting"
              : "Modeled difference between choices"}
        </p>

        <p className="mt-2 text-3xl font-semibold">
          {dollars(Math.abs(difference))}
        </p>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {difference === 0
            ? "The two choices are equal under these assumptions."
            : `Over ${months} months, ${difference > 0 ? "leaving now" : "waiting"
            } has the higher modeled financial value.`}
        </p>

        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <p className="text-sm leading-relaxed text-amber-800">
            <strong>Important assumption:</strong> This comparison assumes
            the new job offer will still be available after waiting.
            Confirm that the employer can accommodate your proposed
            start date before relying on the result.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5"><p className="text-sm text-[var(--muted)]">Leave now: incremental value</p><p className="mt-2 text-2xl font-semibold">{dollars(leaveNow)}</p></div>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5"><p className="text-sm text-[var(--muted)]">Wait, then leave: incremental value</p><p className="mt-2 text-2xl font-semibold">{dollars(waitThenLeave)}</p></div>
      </div>
      <p className="mt-5 text-sm leading-6"><strong>Time for the raise to offset repayment:</strong> {repaymentRecovery === null ? "Not reached through recurring compensation gains because the modeled monthly gain is zero or negative." : `${repaymentRecovery.toFixed(1)} months of additional compensation after leaving now, after accounting for the assumed signing bonus.`} This is not the same as the leave-now-versus-wait comparison.</p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Both options are measured against staying in the current job throughout the comparison period. The model assumes the same new-job offer and signing bonus remain available after waiting, no raises at the current job, and no unemployment gap. If the comparison period ends on or before the planned delayed departure, the wait option assumes no departure, repayment, or signing bonus within that period.</p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Limitations: This is not a legal enforceability or tax-return calculation. Repayment is treated as an out-of-pocket amount with no assumed tax adjustment. Cash salary differences and bonuses use the estimated marginal tax rate; benefits and recurring cost differences are treated as after-tax equivalents. The model excludes investment returns, vesting, moving costs, and the probability that the future offer remains available. Confirm the contract and seek qualified legal or tax advice when needed.</p>
    </>}
  </div></section>;
}
