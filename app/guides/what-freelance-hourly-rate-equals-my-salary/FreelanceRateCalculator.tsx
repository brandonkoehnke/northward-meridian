"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const usd = (n: number, digits = 0) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
const num = (n: number, digits = 0) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(n);
const read = (s: string) => { const n = Number(s); return Number.isFinite(n) ? n : 0; };

type InputProps = { label: string; value: string; set: (s: string) => void; prefix?: string; suffix?: string; step?: string; max?: number };
function Field({ label, value, set, prefix, suffix, step = "1", max }: InputProps) {
    return <label className="flex h-full flex-col justify-end"><span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span><div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">{prefix && <span className="text-[var(--muted)]">{prefix}</span>}<input type="number" min="0" max={max} step={step} inputMode="decimal" value={value} onChange={e => set(e.target.value)} className="w-full min-w-0 bg-transparent px-2 py-3 text-[var(--foreground)] outline-none" />{suffix && <span className="whitespace-nowrap text-sm text-[var(--muted)]">{suffix}</span>}</div></label>;
}
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="rounded-xl border border-[var(--border)] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p></div>; }

export default function FreelanceRateCalculator() {
    const [salary, setSalary] = useState("90000");
    const [retirement, setRetirement] = useState("4500");
    const [benefits, setBenefits] = useState("9500");
    const [expenses, setExpenses] = useState("8000");
    const [extraCosts, setExtraCosts] = useState("0");
    const [hours, setHours] = useState("40");
    const [weeks, setWeeks] = useState("48");
    const [utilization, setUtilization] = useState("65");
    const [hasInteracted, setHasInteracted] = useState(false);
    const started = useRef(false);
    const change = (setter: (s: string) => void) => (v: string) => { if (!started.current) { started.current = true; trackEvent("freelance_rate_calculator_started", { tool: "freelance_rate_calculator" }); } setHasInteracted(true); setter(v); };
    useEffect(() => { if (started.current) trackEvent("freelance_rate_calculator_changed", { tool: "freelance_rate_calculator" }); }, [salary, retirement, benefits, expenses, extraCosts, hours, weeks, utilization]);

    const base = Math.max(0, read(salary));
    const employerValue = Math.max(0, read(retirement)) + Math.max(0, read(benefits));
    const costs = Math.max(0, read(expenses)) + Math.max(0, read(extraCosts));
    const revenue = base + employerValue + costs;
    const workingHours = Math.max(0, read(hours)) * Math.max(0, read(weeks));
    const share = Math.min(100, Math.max(0, read(utilization)));
    const billableHours = workingHours * share / 100;
    const rate = billableHours > 0 ? revenue / billableHours : null;
    const sensitivity = [50, 60, 65, 70, 80].map(p => ({ p, h: workingHours * p / 100, rate: workingHours > 0 ? revenue / (workingHours * p / 100) : null }));
    return <section id="freelance-rate-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"><div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Freelance Salary-Equivalent Rate Calculator</p>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight">What would you need to charge to replace your salary?</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">Replace the example numbers with your own salary, employer benefits, business costs, and realistic billable time. This is a pre-tax economic comparison, not an exact take-home-pay estimate.</p>
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Employment compensation to replace</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Annual employee salary" value={salary} set={change(setSalary)} prefix="$" suffix="/yr" step="1000" /><Field label="Employer retirement contributions" value={retirement} set={change(setRetirement)} prefix="$" suffix="/yr" step="100" /><Field label="Other benefits to replace" value={benefits} set={change(setBenefits)} prefix="$" suffix="/yr" step="100" /></div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Estimate the actual employer-funded value you would need to replace. Avoid counting employee-paid premiums twice or assuming every employer benefit is cash you could otherwise receive.</p>
            <div className="mt-10 border-t border-[var(--border)] pt-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Annual independent-work costs</p><div className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Business operating expenses" value={expenses} set={change(setExpenses)} prefix="$" suffix="/yr" step="100" /><Field label="Additional annual costs" value={extraCosts} set={change(setExtraCosts)} prefix="$" suffix="/yr" step="100" /></div><p className="mt-4 text-sm leading-6 text-[var(--muted)]">Include software, equipment, professional insurance, accounting, and other costs not already counted. Do not include the same health insurance or retirement replacement in two fields.</p></div>
            <div className="mt-10 border-t border-[var(--border)] pt-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Working time and billable utilization</p><div className="mt-6 grid gap-5 md:grid-cols-3"><Field label="Working hours per week" value={hours} set={change(setHours)} suffix="hr" max={168} /><Field label="Working weeks per year" value={weeks} set={change(setWeeks)} suffix="weeks" max={52} /><Field label="Billable share of working hours" value={utilization} set={change(setUtilization)} suffix="%" max={100} /></div><div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm leading-6 text-[var(--muted)]"><strong className="text-[var(--foreground)]">Example:</strong> At 40 hours per week for 48 weeks, a 65% billable share means 1,248 hours you can invoice. The remaining time goes to finding clients, proposals, admin, and other nonbillable work.</div></div>
            <div className="mt-10 border-t border-[var(--border)] pt-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Your results</p><div className="mt-6 grid gap-5 md:grid-cols-2"><Metric label="Target annual freelance revenue" value={usd(revenue)} detail="Employee salary plus employer benefits to replace and estimated annual independent-work costs." /><Metric label="Billable hours per year" value={num(billableHours)} detail="Working hours multiplied by the billable utilization percentage." /><Metric label="Salary-equivalent hourly rate" value={rate === null ? "Not available" : `${usd(rate, 2)}/hr`} detail="Revenue target divided by billable hours. This is a pre-tax planning rate, not a market quote." /><Metric label="Total annual work hours" value={num(workingHours)} detail="Hours per week multiplied by working weeks per year." /></div>
                <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6" aria-live="polite"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">What the numbers suggest</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{rate === null ? "Enter working hours and a billable share above zero." : `Your estimated pre-tax salary-equivalent rate is ${usd(rate, 2)} per billable hour.`}</h3><p className="mt-4 leading-8 text-[var(--muted)]">This is the rate needed to reach the revenue target under your assumptions. It does not establish what clients will pay, how many hours you can sell, or equivalent after-tax income.</p></div>
                <div className="mt-10 border-t border-[var(--border)] pt-10"><h3 className="text-xl font-semibold">How billable time changes the required rate</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">All scenarios hold annual revenue and working hours constant. Only the billable share changes.</p><div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-[var(--border)]"><th className="py-3 pr-3">Billable share</th><th className="py-3 pr-3">Billable hours/year</th><th className="py-3">Required rate</th></tr></thead><tbody>{sensitivity.map(row => <tr key={row.p} className="border-b border-[var(--border)]"><td className="py-3 pr-3">{row.p}%</td><td className="py-3 pr-3">{num(row.h)}</td><td className="py-3 font-semibold">{row.rate === null ? "—" : `${usd(row.rate, 2)}/hr`}</td></tr>)}</tbody></table></div></div>
                {!hasInteracted && <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Example only</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">These defaults are illustrative, not estimates of typical benefits, expenses, or utilization. Replace them with your own situation.</p></div>}
                <p className="mt-8 text-sm leading-6 text-[var(--muted)]"><strong>Tax limitation:</strong> This calculator does not calculate federal or state income tax, self-employment tax, payroll-tax differences, deductions, or entity-specific tax treatment. A pre-tax revenue equivalent is not necessarily a take-home-pay equivalent.</p>
            </div>
        </div>
    </div>
    </section>;
}
