"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FieldProps = { label: string; value: string; onChange: (value: string) => void; unit?: string; prefix?: string; note?: string };
function Field({ label, value, onChange, unit, prefix, note }: FieldProps) {
  return <label className="flex flex-col justify-start gap-2">
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span>
    <span className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-3">
      {prefix && <span className="text-sm text-[var(--muted)]">{prefix}</span>}
      <input aria-label={label} type="number" min="0" step="any" value={value} onChange={(e) => onChange(e.target.value)} className="w-full min-w-0 bg-transparent py-3 pl-2 outline-none" />
      {unit && <span className="whitespace-nowrap text-xs text-[var(--muted)]">{unit}</span>}
    </span>
    {note && <span className="text-xs leading-5 text-[var(--muted)]">{note}</span>}
  </label>;
}
const dollars = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const number = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
const parse = (s: string) => s.trim() === "" ? NaN : Number(s);
export default function RemoteWorkValueCalculator() {
  const [officeDays, setOfficeDays] = useState("5");
  const [remoteDays, setRemoteDays] = useState("0");
  const [weeks, setWeeks] = useState("48");
  const [miles, setMiles] = useState("30");
  const [mileCost, setMileCost] = useState("0.25");
  const [parking, setParking] = useState("0");
  const [tolls, setTolls] = useState("0");
  const [otherOffice, setOtherOffice] = useState("5");
  const [homeExtra, setHomeExtra] = useState("600");
  const [minutes, setMinutes] = useState("60");
  const [taxRate, setTaxRate] = useState("25");
  const [salaryDifference, setSalaryDifference] = useState("0");
  const started = useRef(false);
  const mark = () => { if (!started.current) { started.current = true; trackEvent("remote_work_value_calculator_started", { tool: "remote_work_value_calculator" }); } };
  const update = (setter: (value: string) => void, value: string) => { mark(); setter(value); };
  const vals = [officeDays, remoteDays, weeks, miles, mileCost, parking, tolls, otherOffice, homeExtra, minutes, taxRate, salaryDifference].map(parse);
  const valid = vals.every(Number.isFinite) && vals.every((v) => v >= 0) && vals[0] <= 7 && vals[1] <= 7 && vals[2] <= 52 && vals[10] < 100 && vals[10] <= 60 && vals[11] <= 1000000;
  const [a, b, w, distance, costMile, park, toll, other, extra, commute, tax, payCut] = vals;
  const daysAvoided = valid ? (a - b) * w : 0;
  const dailyCost = valid ? distance * costMile + park + toll + other : 0;
  const cashSavings = valid ? daysAvoided * dailyCost - extra : 0;
  const hoursSaved = valid ? daysAvoided * commute / 60 : 0;
  const grossEquivalent = valid ? cashSavings / (1 - tax / 100) : 0;
  const afterTaxPayCut = valid ? payCut * (1 - tax / 100) : 0;
  const netAdvantage = valid ? cashSavings - afterTaxPayCut : 0;
  return <section id="remote-work-value-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
    <div className="border-t border-[var(--border)] pt-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Remote Work Value Calculator</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight">What does working from home save you?</h2>
      <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Compare your current office schedule with a proposed remote or hybrid schedule. Enter incremental costs only: spending that changes because of where you work.</p>
      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-7 md:p-9">
        <div className="space-y-9">
          <div><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Work schedules</h3>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <Field label="Current office days per week" value={officeDays} onChange={(v) => update(setOfficeDays, v)} unit="days" />
              <Field label="Proposed office days per week" value={remoteDays} onChange={(v) => update(setRemoteDays, v)} unit="days" />
              <Field label="Working weeks per year" value={weeks} onChange={(v) => update(setWeeks, v)} unit="weeks" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Count weeks you would normally commute, excluding vacation and other weeks off. Hybrid schedules are supported.</p>
          </div>
          <div className="border-t border-[var(--border)] pt-8"><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Cost per office day</h3>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Round-trip commute distance" value={miles} onChange={(v) => update(setMiles, v)} unit="miles" />
              <Field label="Vehicle cost per mile" value={mileCost} onChange={(v) => update(setMileCost, v)} prefix="$" note="Use an incremental cost estimate, not a tax deduction rate by default." />
              <Field label="Parking per office day" value={parking} onChange={(v) => update(setParking, v)} prefix="$" />
              <Field label="Tolls per office day" value={tolls} onChange={(v) => update(setTolls, v)} prefix="$" />
              <Field label="Other extra office-day spending" value={otherOffice} onChange={(v) => update(setOtherOffice, v)} prefix="$" note="Only the extra cost of meals, clothing, transit, or similar items compared with home." />
              <Field label="Round-trip commute time" value={minutes} onChange={(v) => update(setMinutes, v)} unit="minutes" />
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8"><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Remote-work expenses and salary</h3>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Extra annual home-work expenses" value={homeExtra} onChange={(v) => update(setHomeExtra, v)} prefix="$" note="Additional electricity, heating, internet upgrades, equipment, or coworking costs not reimbursed." />
              <Field label="Estimated marginal tax rate" value={taxRate} onChange={(v) => update(setTaxRate, v)} unit="%" note="Illustrative combined tax impact on additional wages, not your average tax rate." />
              <Field label="Annual gross salary reduction (optional)" value={salaryDifference} onChange={(v) => update(setSalaryDifference, v)} prefix="$" note="Enter 0 if comparing costs only. For a remote offer with lower salary, enter the annual reduction." />
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8" aria-live="polite"><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Your results</h3>
            {!valid || b > a ? <p className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 text-sm">Enter valid nonnegative values, a tax rate below 60%, and a proposed schedule with no more office days than your current schedule.</p> : <>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["Annual cash savings", dollars(cashSavings), "Expenses avoided minus extra annual home-work costs."],
                  ["Commute hours recovered", `${number(hoursSaved)} hours`, "Time recovered annually; no dollar value assigned."],
                  ["Approximate gross salary offset", dollars(grossEquivalent), "Cash savings converted to gross wages using your estimated marginal tax rate."],
                  ["Net annual advantage after pay cut", dollars(netAdvantage), "Cash savings minus the estimated after-tax impact of the entered salary reduction."],
                ].map(([label, value, description]) => <div key={label} className="rounded-xl border border-[var(--border)] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p></div>)}
              </div>
              <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">What the numbers suggest</p><p className="mt-3 text-lg font-semibold">{cashSavings >= 0 ? `The proposed schedule saves about ${dollars(cashSavings)} in annual out-of-pocket expenses.` : `The proposed schedule adds about ${dollars(-cashSavings)} in annual out-of-pocket expenses.`}</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">You would avoid {number(daysAvoided)} office days and recover approximately {number(hoursSaved)} commute hours per year. The salary comparison is an estimate, not an after-tax payroll calculation.</p></div>
            </>}
          </div>
          <p className="border-t border-[var(--border)] pt-6 text-sm leading-6 text-[var(--muted)]"><strong>Limitations:</strong> This calculator excludes employer benefit changes, relocation, childcare differences, changes in vehicle ownership, tax deductions, and job quality. Vehicle cost per mile must reflect costs that truly change with commuting; fixed payments and insurance do not always disappear when driving less. Compare the full job offers separately.</p>
        </div>
      </div>
    </div>
  </section>;
}
