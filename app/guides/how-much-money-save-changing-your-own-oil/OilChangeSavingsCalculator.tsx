"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const numeric = (v: string) => v.trim() === "" ? NaN : Number(v);
const positive = (n: number) => Number.isFinite(n) && n >= 0;

function NumberField({ label, value, onChange, suffix = "$", step = "1" }: { label: string; value: string; onChange: (v: string) => void; suffix?: string; step?: string }) {
  return <label className="flex h-full flex-col justify-end gap-2">
    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</span>
    <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-3">
      {suffix === "$" && <span className="text-[var(--muted)]">$</span>}
      <input className="w-full min-w-0 bg-transparent p-3 outline-none" type="number" inputMode="decimal" min="0" step={step} value={value} onChange={(e) => onChange(e.target.value)} />
      {suffix !== "$" && <span className="shrink-0 text-sm text-[var(--muted)]">{suffix}</span>}
    </div>
  </label>;
}
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-xl border border-[var(--border)] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p></div>;
}
export default function OilChangeSavingsCalculator() {
  const [shopPrice, setShopPrice] = useState("95");
  const [oilPrice, setOilPrice] = useState("32");
  const [filterPrice, setFilterPrice] = useState("10");
  const [otherCost, setOtherCost] = useState("3");
  const [equipment, setEquipment] = useState("80");
  const [changes, setChanges] = useState("3");
  const [minutes, setMinutes] = useState("45");
  const [timeValue, setTimeValue] = useState("0");
  const started = useRef(false);
  const mark = () => { if (!started.current) { started.current = true; trackEvent("oil_change_savings_calculator_started", { tool: "oil_change_savings_calculator" }); } };
  const vals = [shopPrice, oilPrice, filterPrice, otherCost, equipment, changes, minutes, timeValue].map(numeric);
  const valid = vals.every(positive) && Number.isInteger(vals[5]) && vals[5] <= 100 && vals[6] <= 1440;
  const [shop, oil, filter, supplies, tools, annualCount, duration, hourlyValue] = vals;
  const diy = oil + filter + supplies;
  const savings = shop - diy;
  const annual = savings * annualCount;
  const firstYear = annual - tools;
  const payback = savings > 0 ? Math.ceil(tools / savings) : null;
  const hours = duration / 60;
  const timeAdjusted = savings - hours * hourlyValue;
  const annualTime = hours * annualCount;
  return <section id="oil-change-savings-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"><div className="border-t border-[var(--border)] pt-12">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">DIY Oil Change Savings Calculator</p>
    <h2 className="mt-5 text-3xl font-semibold tracking-tight">How much could you save changing your own oil?</h2>
    <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Compare a like-for-like shop service with your oil, filter, supplies, and equipment costs. The default prices are illustrative, not local quotes.</p>
    <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-7 md:p-9">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Cost per oil change</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <NumberField label="Shop oil change (total price including tax)" value={shopPrice} onChange={(value) => { mark(); setShopPrice(value); }} />
        <NumberField label="DIY motor oil (total quantity required)" value={oilPrice} onChange={(value) => { mark(); setOilPrice(value); }} />
        <NumberField label="DIY oil filter" value={filterPrice} onChange={(value) => { mark(); setFilterPrice(value); }} />
        <NumberField label="Other supplies and disposal fees" value={otherCost} onChange={(value) => { mark(); setOtherCost(value); }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Use the full amount you spend, including any extra oil needed for your vehicle. Do not compare a shop package that includes tire rotation with DIY oil-only costs unless you account for the additional service.</p>
      <div className="mt-9 border-t border-[var(--border)] pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Frequency and equipment</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <NumberField label="One-time equipment you still need to buy" value={equipment} onChange={(value) => { mark(); setEquipment(value); }} />
          <NumberField label="Oil changes per year" value={changes} onChange={(value) => { mark(); setChanges(value); }} suffix="changes" step="1" />
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Include only equipment you do not already own: drain pan, filter wrench, ramps or stands if required, and other suitable tools. Treat reusable equipment as a one-time cost.</p>
      </div>
      <div className="mt-9 border-t border-[var(--border)] pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Optional: your time</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <NumberField label="Hands-on time per DIY change" value={minutes} onChange={(value) => { mark(); setMinutes(value); }} suffix="minutes" step="5" />
          <NumberField label="Your chosen value per hour" value={timeValue} onChange={(value) => { mark(); setTimeValue(value); }} />
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">This is your personal valuation, not an assumed wage loss. Consider travel and waiting time at a shop separately if you want a full time comparison.</p>
      </div>
      <div className="mt-9 border-t border-[var(--border)] pt-8" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Your results</p>
        {valid ? <>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Metric label="DIY cost per change" value={money(diy)} detail="Oil + filter + other recurring supplies and fees." />
            <Metric label="Cash saved per change" value={money(savings)} detail="Shop price minus DIY recurring cost; may be negative." />
            <Metric label="Annual cash savings" value={money(annual)} detail="Before equipment purchases or the value of your time." />
            <Metric label="First-year net cash savings" value={money(firstYear)} detail="Annual savings minus one-time equipment purchases." />
            <Metric label="Equipment payback" value={payback === null ? "Not reached" : `${payback} ${payback === 1 ? "change" : "changes"}`} detail="Number of oil changes needed to recover equipment costs, assuming constant prices." />
            <Metric label="Annual DIY time" value={`${annualTime.toFixed(1)} hours`} detail="Your estimated time per change multiplied by changes per year." />
            <Metric label="Time-adjusted savings per change" value={money(timeAdjusted)} detail="Cash savings minus your optional personal time valuation." />
            <Metric label="Cash savings after 3 years" value={money(annual * 3 - tools)} detail="Assumes the same prices and frequency, and no replacement equipment purchases." />
          </div>
          <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">What the numbers suggest</p>
            <h3 className="mt-3 text-xl font-semibold">{savings > 0 ? `DIY saves about ${money(savings)} in cash per change before equipment.` : savings === 0 ? "DIY and shop service cost about the same before equipment." : `DIY costs about ${money(-savings)} more per change before equipment.`}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{savings > 0 ? `At ${annualCount} changes per year, that is ${money(annual)} annually before equipment. ${payback === 0 ? "You have no equipment cost to recover." : `Your ${money(tools)} equipment purchase would break even after ${payback} changes.`}` : "At these prices, equipment purchases increase the cost of doing it yourself. Check that you are comparing equivalent services."}</p>
          </div>
        </> : <p className="mt-5 rounded-xl border border-[var(--border)] p-5 text-sm">Enter valid nonnegative amounts, a whole number of changes per year (0–100), and 0–1,440 minutes per change.</p>}
      </div>
      <p className="mt-6 text-sm leading-6 text-[var(--muted)]">This calculator compares out-of-pocket costs, not repair quality, safety, warranty coverage, shop convenience, or the value of included inspections. Follow the vehicle maintenance schedule and dispose of used oil responsibly.</p>
    </div>
  </div></section>;
}
