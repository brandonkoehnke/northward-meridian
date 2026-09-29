"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function formatNumber(value: number, digits = 0) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

type CurrentHeaterType =
    | "electric-resistance"
    | "natural-gas"
    | "propane"
    | "oil"
    | "other";

function heaterTypeLabel(type: CurrentHeaterType) {
    switch (type) {
        case "electric-resistance":
            return "Electric resistance";
        case "natural-gas":
            return "Natural gas";
        case "propane":
            return "Propane";
        case "oil":
            return "Oil";
        default:
            return "Other";
    }
}

export default function HeatPumpWaterHeaterPaybackCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [currentHeaterType, setCurrentHeaterType] =
        useState<CurrentHeaterType>("electric-resistance");

    const [currentAnnualCost, setCurrentAnnualCost] =
        useState("650");

    const [hpwhAnnualEnergyUse, setHpwhAnnualEnergyUse] =
        useState("1000");

    const [electricityRate, setElectricityRate] =
        useState("0.20");

    const [hpwhInstalledCost, setHpwhInstalledCost] =
        useState("3500");

    const [alternativeInstalledCost, setAlternativeInstalledCost] =
        useState("1800");

    const [incentive, setIncentive] =
        useState("0");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "hpwh_payback_decision_started",
                {
                    tool: "hpwh_payback_check",
                },
            );
        }

        setHasInteracted(true);
    };

    const currentCost = Math.max(
        parseNumber(currentAnnualCost),
        0,
    );

    const hpwhEnergy = Math.max(
        parseNumber(hpwhAnnualEnergyUse),
        0,
    );

    const electricRate = Math.max(
        parseNumber(electricityRate),
        0,
    );

    const hpwhCost = Math.max(
        parseNumber(hpwhInstalledCost),
        0,
    );

    const alternativeCost = Math.max(
        parseNumber(alternativeInstalledCost),
        0,
    );

    const availableIncentive = Math.min(
        Math.max(parseNumber(incentive), 0),
        hpwhCost,
    );

    const netHpwhCost =
        hpwhCost - availableIncentive;

    const incrementalUpfrontCost =
        netHpwhCost - alternativeCost;

    const hpwhAnnualOperatingCost =
        hpwhEnergy * electricRate;

    const annualOperatingSavings =
        currentCost - hpwhAnnualOperatingCost;

    const paybackYears =
        incrementalUpfrontCost > 0 &&
            annualOperatingSavings > 0
            ? incrementalUpfrontCost /
            annualOperatingSavings
            : null;

    const fiveYearNetSavings =
        annualOperatingSavings * 5 -
        incrementalUpfrontCost;

    const tenYearNetSavings =
        annualOperatingSavings * 10 -
        incrementalUpfrontCost;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "hpwh_payback_decision_changed",
            {
                tool: "hpwh_payback_check",
            },
        );
    }, [
        currentHeaterType,
        currentAnnualCost,
        hpwhAnnualEnergyUse,
        electricityRate,
        hpwhInstalledCost,
        alternativeInstalledCost,
        incentive,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (
        incrementalUpfrontCost <= 0 &&
        annualOperatingSavings > 0
    ) {
        resultHeading =
            "Your inputs show no additional upfront cost and lower annual operating cost.";

        resultDescription =
            "After the incentive you entered, the heat-pump water heater costs no more than the alternative replacement and also has a lower estimated annual operating cost. Verify that the installation quotes and incentive eligibility are comparable before relying on the result.";
    } else if (
        annualOperatingSavings > 0 &&
        paybackYears !== null &&
        paybackYears <= 5
    ) {
        resultHeading =
            "Your inputs show a relatively short simple payback.";

        resultDescription =
            "The estimated annual operating savings recover the additional upfront cost of the heat-pump water heater within five years under the assumptions you entered.";
    } else if (
        annualOperatingSavings > 0 &&
        paybackYears !== null
    ) {
        resultHeading =
            "Your inputs show operating savings, but the simple payback is longer.";

        resultDescription =
            "The heat-pump water heater has a lower estimated annual operating cost, but the additional upfront cost takes more than five years to recover under your assumptions.";
    } else if (
        annualOperatingSavings <= 0 &&
        incrementalUpfrontCost > 0
    ) {
        resultHeading =
            "Your inputs do not show a financial payback.";

        resultDescription =
            "The heat-pump water heater costs more upfront than the alternative replacement and does not produce annual operating savings with the energy prices and usage you entered.";
    } else {
        resultHeading =
            "Your inputs do not establish a simple operating-cost advantage.";

        resultDescription =
            "The upfront comparison may still favor the heat-pump water heater, but the annual operating-cost assumptions do not show positive savings. Review the energy-use and utility-rate inputs before drawing a conclusion.";
    }

    return (
        <section
            id="hpwh-payback-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Heat-Pump Water Heater Payback Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Does the efficiency gain justify the additional cost?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare the installed cost and estimated operating cost of
                    a heat-pump water heater with the replacement you would
                    otherwise buy. Use your actual quotes and utility rates
                    whenever possible.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        What you have now
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <SelectField
                            label="Current water-heater type"
                            value={currentHeaterType}
                            options={[
                                {
                                    value: "electric-resistance",
                                    label: "Electric resistance",
                                },
                                {
                                    value: "natural-gas",
                                    label: "Natural gas",
                                },
                                {
                                    value: "propane",
                                    label: "Propane",
                                },
                                {
                                    value: "oil",
                                    label: "Oil",
                                },
                                {
                                    value: "other",
                                    label: "Other",
                                },
                            ]}
                            onChange={(value) => {
                                markStarted();
                                setCurrentHeaterType(
                                    value as CurrentHeaterType,
                                );
                            }}
                        />

                        <NumberField
                            label="Current annual water-heating cost"
                            value={currentAnnualCost}
                            prefix="$"
                            suffix="/yr"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setCurrentAnnualCost(value);
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use water-heating cost, not your entire utility bill
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Enter the estimated annual energy cost attributable
                            to your current water heater. If you do not know it,
                            use a manufacturer estimate, energy label, utility
                            analysis, or another reasonable estimate rather than
                            your household&apos;s full annual energy bill.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Heat-pump water heater
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Estimated HPWH annual energy use"
                                value={hpwhAnnualEnergyUse}
                                suffix="kWh/yr"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setHpwhAnnualEnergyUse(value);
                                }}
                            />

                            <NumberField
                                label="Electricity price"
                                value={electricityRate}
                                prefix="$"
                                suffix="/kWh"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setElectricityRate(value);
                                }}
                            />

                            <NumberField
                                label="HPWH installed cost"
                                value={hpwhInstalledCost}
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setHpwhInstalledCost(value);
                                }}
                                onBlur={() => {
                                    const parsedHpwhCost = Math.max(
                                        parseNumber(hpwhInstalledCost),
                                        0,
                                    );

                                    setHpwhInstalledCost(
                                        String(parsedHpwhCost),
                                    );

                                    setIncentive((current) =>
                                        String(
                                            Math.min(
                                                Math.max(
                                                    parseNumber(current),
                                                    0,
                                                ),
                                                parsedHpwhCost,
                                            ),
                                        ),
                                    );
                                }}
                            />

                            <NumberField
                                label="Alternative replacement installed cost"
                                value={alternativeInstalledCost}
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setAlternativeInstalledCost(value);
                                }}
                            />

                            <NumberField
                                label="Rebate or incentive"
                                value={incentive}
                                prefix="$"
                                step="100"
                                max={String(hpwhCost)}
                                onChange={(value) => {
                                    markStarted();
                                    setIncentive(value);
                                }}
                                onBlur={() => {
                                    const parsedIncentive = Math.max(
                                        parseNumber(incentive),
                                        0,
                                    );

                                    setIncentive(
                                        String(
                                            Math.min(
                                                parsedIncentive,
                                                hpwhCost,
                                            ),
                                        ),
                                    );
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Compare against the replacement you would actually buy
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The relevant upfront cost is usually the difference
                                between the heat-pump water heater and the conventional
                                replacement you would otherwise install, not the full
                                heat-pump water-heater price.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your numbers
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Current annual operating cost"
                                value={formatCurrency(
                                    currentCost,
                                )}
                                detail={`Based on the annual water-heating cost you entered for your ${heaterTypeLabel(
                                    currentHeaterType,
                                ).toLowerCase()} system.`}
                            />

                            <ResultMetric
                                label="Estimated HPWH annual operating cost"
                                value={formatCurrency(
                                    hpwhAnnualOperatingCost,
                                )}
                                detail="Estimated annual HPWH energy use multiplied by your electricity price."
                            />

                            <ResultMetric
                                label="Annual operating savings"
                                value={formatCurrency(
                                    annualOperatingSavings,
                                )}
                                detail="Current annual water-heating cost minus estimated HPWH annual operating cost."
                            />

                            <ResultMetric
                                label="Net HPWH installed cost"
                                value={formatCurrency(
                                    netHpwhCost,
                                )}
                                detail="HPWH installed cost minus the rebate or incentive you entered."
                            />

                            <ResultMetric
                                label="Incremental upfront cost"
                                value={formatCurrency(
                                    incrementalUpfrontCost,
                                )}
                                detail="Net HPWH cost minus the installed cost of the alternative replacement."
                            />

                            <ResultMetric
                                label="Simple payback"
                                value={
                                    paybackYears !== null
                                        ? `${formatNumber(
                                            paybackYears,
                                            1,
                                        )} years`
                                        : "No payback shown"
                                }
                                detail="Incremental upfront cost divided by estimated annual operating savings."
                            />

                            <ResultMetric
                                label="5-year net savings"
                                value={formatCurrency(
                                    fiveYearNetSavings,
                                )}
                                detail="Five years of estimated operating savings minus the incremental upfront cost."
                            />

                            <ResultMetric
                                label="10-year net savings"
                                value={formatCurrency(
                                    tenYearNetSavings,
                                )}
                                detail="Ten years of estimated operating savings minus the incremental upfront cost."
                            />
                        </div>

                        <div
                            className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                            aria-live="polite"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                What the numbers suggest
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                {resultHeading}
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                {resultDescription}
                            </p>

                            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                                Change the assumptions to reflect your actual
                                installation quotes, utility rates, and expected
                                energy use.
                                {hasInteracted
                                    ? " The result is based on the values you entered."
                                    : " These are example inputs and are not a recommendation."}
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5">
                            <p className="font-semibold">
                                What this calculation does not include
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The calculation does not assign a dollar value to
                                noise, dehumidification, cooling of the surrounding
                                space, recovery time, maintenance differences, or
                                future changes in utility rates. It also assumes the
                                energy-use estimate you entered is representative of
                                your household.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Enter your own quotes and energy costs before using the result.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                The defaults demonstrate the calculation. Installed
                                cost, incentives, hot-water use, and local utility
                                prices can materially change the result.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

type NumberFieldProps = {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
    step?: string;
    min?: string;
    max?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
    step,
    min = "0",
    max,
    onChange,
    onBlur,
}: NumberFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
                {prefix ? (
                    <span className="text-[var(--muted)]">
                        {prefix}
                    </span>
                ) : null}

                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    inputMode="decimal"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    onBlur={onBlur}
                    className="w-full bg-transparent px-2 py-3 text-[var(--foreground)] outline-none"
                />

                {suffix ? (
                    <span className="whitespace-nowrap text-sm text-[var(--muted)]">
                        {suffix}
                    </span>
                ) : null}
            </div>
        </label>
    );
}

type SelectOption = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    label: string;
    value: string;
    options: readonly SelectOption[];
    onChange: (value: string) => void;
};

function SelectField({
    label,
    value,
    options,
    onChange,
}: SelectFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

type ResultMetricProps = {
    label: string;
    value: string;
    detail: string;
};

function ResultMetric({
    label,
    value,
    detail,
}: ResultMetricProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {detail}
            </p>
        </div>
    );
}