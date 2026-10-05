"use client";



import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";



function parseNumber(value: string) {

    const parsed = Number(value.replace(/[^0-9.-]/g, ""));

    return Number.isFinite(parsed) ? parsed : 0;

}

function formatCurrency(value: number, digits = 0) {

    return new Intl.NumberFormat("en-US", {

        style: "currency",

        currency: "USD",

        minimumFractionDigits: digits,

        maximumFractionDigits: digits,

    }).format(value);

}

function formatNumber(value: number, digits = 0) {

    return new Intl.NumberFormat("en-US", {

        maximumFractionDigits: digits,

    }).format(value);

}

function formatSignedCurrency(value: number) {

    if (value > 0) return `+${formatCurrency(value)}`;

    if (value < 0) return `-${formatCurrency(Math.abs(value))}`;

    return "$0";

}



export default function BreakEvenRaiseCalculator() {

    const [hasInteracted, setHasInteracted] = useState(false);

    const [currentSalary, setCurrentSalary] = useState("90000");

    const [bonusDifference, setBonusDifference] = useState("-2000");

    const [retirementDifference, setRetirementDifference] = useState("-1800");

    const [healthCostDifference, setHealthCostDifference] = useState("1200");

    const [commuteCostDifference, setCommuteCostDifference] = useState("3000");

    const [otherRecurringCostDifference, setOtherRecurringCostDifference] = useState("1000");

    const [oneTimeSwitchingCosts, setOneTimeSwitchingCosts] = useState("4000");

    const [expectedYears, setExpectedYears] = useState("3");

    const [extraCommuteMinutesPerDay, setExtraCommuteMinutesPerDay] = useState("45");

    const [commuteDaysPerWeek, setCommuteDaysPerWeek] = useState("5");

    const [workWeeksPerYear, setWorkWeeksPerYear] = useState("48");

    const hasStarted = useRef(false);



    const markStarted = () => {

        if (!hasStarted.current) {

            hasStarted.current = true;

            trackEvent("break_even_raise_calculator_started", {

                tool: "break_even_raise_calculator",

            });

        }

        setHasInteracted(true);

    };



    const salary = Math.max(parseNumber(currentSalary), 0);

    const annualBonusDifference = parseNumber(bonusDifference);

    const annualRetirementDifference = parseNumber(retirementDifference);

    const annualHealthCostDifference = parseNumber(healthCostDifference);

    const annualCommuteCostDifference = parseNumber(commuteCostDifference);

    const annualOtherCostDifference = parseNumber(otherRecurringCostDifference);

    const switchingCosts = Math.max(parseNumber(oneTimeSwitchingCosts), 0);

    const years = Math.max(parseNumber(expectedYears), 0);

    const extraMinutes = Math.max(parseNumber(extraCommuteMinutesPerDay), 0);

    const commuteDays = Math.max(parseNumber(commuteDaysPerWeek), 0);

    const workWeeks = Math.max(parseNumber(workWeeksPerYear), 0);



    const recurringCompensationDifference =

        annualBonusDifference + annualRetirementDifference;

    const recurringCostDifference =

        annualHealthCostDifference +

        annualCommuteCostDifference +

        annualOtherCostDifference;

    const recurringFinancialDisadvantage =

        recurringCostDifference - recurringCompensationDifference;

    const annualizedSwitchingCosts =

        years > 0 ? switchingCosts / years : 0;

    const requiredAnnualRaise =

        recurringFinancialDisadvantage + annualizedSwitchingCosts;

    const breakEvenSalary = salary + requiredAnnualRaise;

    const breakEvenRaisePercent =

        salary > 0 ? (requiredAnnualRaise / salary) * 100 : null;

    const extraCommuteHoursPerYear =

        (extraMinutes * commuteDays * workWeeks) / 60;

    const totalSwitchingBurdenOverHorizon =

        years > 0

            ? recurringFinancialDisadvantage * years + switchingCosts

            : switchingCosts;



    useEffect(() => {

        if (!hasStarted.current) return;

        trackEvent("break_even_raise_calculator_changed", {

            tool: "break_even_raise_calculator",

        });

    }, [

        currentSalary,

        bonusDifference,

        retirementDifference,

        healthCostDifference,

        commuteCostDifference,

        otherRecurringCostDifference,

        oneTimeSwitchingCosts,

        expectedYears,

        extraCommuteMinutesPerDay,

        commuteDaysPerWeek,

        workWeeksPerYear,

    ]);



    let resultHeading =

        "Enter your current salary to calculate a break-even raise.";

    let resultDescription =

        "The calculator compares the recurring compensation and cost differences you entered and spreads one-time switching costs across your expected time at the new job.";



    if (salary > 0 && years <= 0) {

        resultHeading = "Add an expected time at the new job.";

        resultDescription =

            "A time horizon is needed to spread one-time switching costs into an annual break-even amount.";

    } else if (salary > 0 && years > 0 && requiredAnnualRaise > 0) {

        resultHeading =

            `The new salary would need to be about ${formatCurrency(breakEvenSalary)} to offset the financial differences entered.`;

        resultDescription =

            `That is approximately ${formatCurrency(requiredAnnualRaise)} more than your current salary before considering taxes and nonfinancial factors.`;

    } else if (salary > 0 && years > 0 && requiredAnnualRaise < 0) {

        resultHeading =

            "The recurring financial differences entered favor the new job before any salary increase.";

        resultDescription =

            `Under these assumptions, the new job could pay about ${formatCurrency(Math.abs(requiredAnnualRaise))} less in salary and still reach the modeled financial break-even point.`;

    } else if (salary > 0 && years > 0) {

        resultHeading =

            "The financial differences entered are approximately neutral.";

        resultDescription =

            "Under these assumptions, your current salary is approximately the modeled break-even salary.";

    }



    return (

        <section id="break-even-raise-calculator" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">

            <div className="border-t border-[var(--border)] pt-12">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Break-Even Raise Calculator</p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">How much would the new job need to pay?</h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">Start with your current salary, then enter only the compensation and cost differences created by changing jobs. The calculator estimates the salary that would offset those measurable differences.</p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">

                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Current job</p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                        <NumberField label="Current base salary" value={currentSalary} prefix="$" suffix="/yr" step="1000" onChange={(value) => { markStarted(); setCurrentSalary(value); }} />

                    </div>

                    <CalculatorSection title="Recurring compensation differences" description="Enter the difference as new job minus current job. Use a positive number if the new job provides more and a negative number if it provides less.">
                        <div className="mt-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 md:col-span-2">
                            <p className="text-sm leading-6 text-[var(--muted)]">
                                <strong className="text-[var(--foreground)]">Example:</strong>{" "}
                                If your current employer contributes $4,000 per year to retirement and the new employer contributes $2,000, enter -$2,000.
                            </p>
                        </div>

                        <NumberField label="Annual bonus difference (new − current)" value={bonusDifference} prefix="$" suffix="/yr" step="100" allowNegative onChange={(value) => { markStarted(); setBonusDifference(value); }} />

                        <NumberField label="Retirement contribution difference (new − current)" value={retirementDifference} prefix="$" suffix="/yr" step="100" allowNegative onChange={(value) => { markStarted(); setRetirementDifference(value); }} />

                    </CalculatorSection>

                    <CalculatorSection title="Recurring cost differences" description="Enter new job cost minus current job cost. Positive means the new job costs you more; negative means it costs less.">

                        <NumberField label="Health / benefit cost difference (new − current)" value={healthCostDifference} prefix="$" suffix="/yr" step="100" allowNegative onChange={(value) => { markStarted(); setHealthCostDifference(value); }} />

                        <NumberField label="Commute cost difference (new − current)" value={commuteCostDifference} prefix="$" suffix="/yr" step="100" allowNegative onChange={(value) => { markStarted(); setCommuteCostDifference(value); }} />

                        <NumberField label="Other recurring cost difference (new − current)" value={otherRecurringCostDifference} prefix="$" suffix="/yr" step="100" allowNegative onChange={(value) => { markStarted(); setOtherRecurringCostDifference(value); }} />

                    </CalculatorSection>

                    <CalculatorSection title="One-time switching costs" description="Examples include relocation, a forfeited bonus, unvested compensation, or other costs that occur because you switch.">

                        <NumberField label="One-time costs or compensation forfeited" value={oneTimeSwitchingCosts} prefix="$" step="100" onChange={(value) => { markStarted(); setOneTimeSwitchingCosts(value); }} />

                        <NumberField label="Expected time at new job" value={expectedYears} suffix="years" step="0.5" onChange={(value) => { markStarted(); setExpectedYears(value); }} />

                    </CalculatorSection>

                    <CalculatorSection title="Commute time" description="Time is shown separately and is not assigned an automatic dollar value." columns="md:grid-cols-3">

                        <NumberField label="Extra commute time" value={extraCommuteMinutesPerDay} suffix="min/day" step="5" onChange={(value) => { markStarted(); setExtraCommuteMinutesPerDay(value); }} />

                        <NumberField label="Commute days" value={commuteDaysPerWeek} suffix="/week" step="1" onChange={(value) => { markStarted(); setCommuteDaysPerWeek(value); }} />

                        <NumberField label="Work weeks" value={workWeeksPerYear} suffix="/yr" step="1" onChange={(value) => { markStarted(); setWorkWeeksPerYear(value); }} />

                    </CalculatorSection>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">

                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Your results</p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">

                            <ResultMetric label="Recurring compensation difference" value={formatSignedCurrency(recurringCompensationDifference)} detail="Positive means the new job provides more recurring bonus/retirement compensation in the fields entered." />

                            <ResultMetric label="Recurring cost difference" value={formatSignedCurrency(recurringCostDifference)} detail="Positive means the new job creates more annual out-of-pocket cost in the fields entered." />

                            <ResultMetric label="Annualized one-time switching cost" value={years > 0 ? formatCurrency(annualizedSwitchingCosts) : "Add time horizon"} detail="One-time switching costs divided by the expected years at the new job." />

                            <ResultMetric label="Break-even new salary" value={salary > 0 && years > 0 ? formatCurrency(breakEvenSalary) : "Not available"} detail="Current salary plus the modeled annual financial disadvantage of switching." />

                            <ResultMetric label="Raise needed to break even" value={salary > 0 && years > 0 ? formatSignedCurrency(requiredAnnualRaise) : "Not available"} detail="Positive means the new salary must be higher by this amount. Negative means the modeled financial differences already favor the new job." />

                            <ResultMetric label="Break-even raise percentage" value={breakEvenRaisePercent !== null && years > 0 ? `${formatNumber(breakEvenRaisePercent, 1)}%` : "Not available"} detail="Raise needed to break even divided by current base salary." />

                            <ResultMetric label="Additional commute time" value={`${formatNumber(extraCommuteHoursPerYear, 0)} hr/yr`} detail="Extra minutes per commute day multiplied by commute days and work weeks. No dollar value is assigned." />

                            <ResultMetric label="Modeled financial burden over time horizon" value={years > 0 ? formatCurrency(totalSwitchingBurdenOverHorizon) : "Not available"} detail="Recurring financial disadvantage over the selected years plus one-time switching costs, before any salary increase." />

                        </div>

                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6" aria-live="polite">

                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">What the numbers suggest</p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{resultHeading}</h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">{resultDescription}</p>

                            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">This is a gross-dollar comparison, not a tax calculation or career recommendation. It does not price PTO, flexibility, management quality, career growth, job security, workload, or your personal value of commute time.</p>

                        </div>

                    </div>

                    {!hasInteracted ? (

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">

                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Example only</p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Replace the example assumptions with the differences between your actual jobs.</h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">The default example assumes a $90,000 current salary, lower bonus and retirement compensation at the new job, higher benefit and commuting costs, $4,000 of one-time switching costs, and a three-year time horizon.</p>

                        </div>

                    ) : null}

                </div>

            </div>

        </section>

    );

}



function CalculatorSection({ title, description, columns = "md:grid-cols-2", children }: { title: string; description: string; columns?: string; children: React.ReactNode }) {

    return (

        <div className="mt-10 border-t border-[var(--border)] pt-10">

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{title}</p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">{description}</p>

            <div className={`mt-6 grid gap-5 ${columns}`}>{children}</div>

        </div>

    );

}



type NumberFieldProps = {

    label: string;

    value: string;

    prefix?: string;

    suffix?: string;

    step?: string;

    allowNegative?: boolean;

    onChange: (value: string) => void;

};

function NumberField({ label, value, prefix, suffix, step, allowNegative = false, onChange }: NumberFieldProps) {

    return (

        <label className="block">

            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span>

            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">

                {prefix ? <span className="text-[var(--muted)]">{prefix}</span> : null}

                <input type="number" min={allowNegative ? undefined : "0"} step={step} inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent px-2 py-3 text-[var(--foreground)] outline-none" />

                {suffix ? <span className="whitespace-nowrap text-sm text-[var(--muted)]">{suffix}</span> : null}

            </div>

        </label>

    );

}

type ResultMetricProps = { label: string; value: string; detail: string };

function ResultMetric({ label, value, detail }: ResultMetricProps) {

    return (

        <div className="rounded-xl border border-[var(--border)] p-5">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>

        </div>

    );

}
