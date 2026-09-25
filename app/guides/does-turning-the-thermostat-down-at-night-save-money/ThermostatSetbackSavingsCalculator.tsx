"use client";

import { useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type SystemType =
    | "conventional"
    | "heat-pump"
    | "unknown";

function parseNumber(value: string) {
    const parsed = Number(
        value.replace(/[^0-9.-]/g, ""),
    );

    return Number.isFinite(parsed) ? parsed : 0;
}

function nonNegative(value: number) {
    return Math.max(value, 0);
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function formatPercent(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
    }).format(value);
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
    }).format(value);
}

type NumberFieldProps = {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
    step?: string;
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
    step,
    onChange,
}: NumberFieldProps) {
    return (
        <label className="block text-sm font-medium">
            {label}

            <div className="mt-2 flex items-center rounded-xl border border-[var(--border)] bg-white px-4 py-3 focus-within:border-[var(--accent)]">
                {prefix ? (
                    <span className="text-[var(--muted)]">
                        {prefix}
                    </span>
                ) : null}

                <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step={step}
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 text-base outline-none"
                />

                {suffix ? (
                    <span className="text-[var(--muted)]">
                        {suffix}
                    </span>
                ) : null}
            </div>
        </label>
    );
}

type ResultCardProps = {
    label: string;
    value: string;
    detail: string;
};

function ResultCard({
    label,
    value,
    detail,
}: ResultCardProps) {
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-tight">
                {value}
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {detail}
            </p>
        </div>
    );
}

export default function ThermostatSetbackSavingsCalculator() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [annualHvacCost, setAnnualHvacCost] =
        useState("2000");

    const [normalTemperature, setNormalTemperature] =
        useState("70");

    const [setbackTemperature, setSetbackTemperature] =
        useState("64");

    const [hoursPerDay, setHoursPerDay] =
        useState("8");

    const [daysPerYear, setDaysPerYear] =
        useState("180");

    const [estimatedSavingsRate, setEstimatedSavingsRate] =
        useState("5");

    const [comparisonYears, setComparisonYears] =
        useState("5");

    const [systemType, setSystemType] =
        useState<SystemType>("conventional");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "thermostat_setback_savings_calculator_started",
                {
                    tool:
                        "thermostat_setback_savings_calculator",
                },
            );
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const hvacCost = nonNegative(
            parseNumber(annualHvacCost),
        );

        const normalTemp = parseNumber(
            normalTemperature,
        );

        const setbackTemp = parseNumber(
            setbackTemperature,
        );

        const dailyHours = Math.min(
            nonNegative(parseNumber(hoursPerDay)),
            24,
        );

        const annualDays = Math.min(
            nonNegative(parseNumber(daysPerYear)),
            365,
        );

        const savingsRate = nonNegative(
            parseNumber(estimatedSavingsRate),
        );

        const years = Math.max(
            nonNegative(parseNumber(comparisonYears)),
            1,
        );

        const setbackDegrees = Math.abs(
            normalTemp - setbackTemp,
        );

        const annualSetbackHours =
            dailyHours * annualDays;

        const annualSavings =
            hvacCost * (savingsRate / 100);

        const comparisonSavings =
            annualSavings * years;

        const referenceHours =
            8 * 365;

        const scheduleIntensity =
            referenceHours > 0
                ? annualSetbackHours /
                referenceHours
                : 0;

        return {
            hvacCost,
            normalTemp,
            setbackTemp,
            dailyHours,
            annualDays,
            savingsRate,
            years,
            setbackDegrees,
            annualSetbackHours,
            annualSavings,
            comparisonSavings,
            scheduleIntensity,
        };
    }, [
        annualHvacCost,
        comparisonYears,
        daysPerYear,
        estimatedSavingsRate,
        hoursPerDay,
        normalTemperature,
        setbackTemperature,
    ]);

    const conventionalSystem =
        systemType === "conventional";

    return (
        <section
            id="thermostat-setback-savings-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Thermostat Setback Savings Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    How much could your setback schedule save?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Use this free calculator to translate an
                    estimated heating and cooling savings rate
                    into dollars. The savings rate remains
                    visible and editable because actual savings
                    depend on climate, equipment, the home, and
                    the setback schedule.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-medium">
                            Heating and cooling system
                        </p>

                        <div className="mt-3 grid gap-3 md:grid-cols-3">
                            <button
                                type="button"
                                aria-pressed={
                                    systemType ===
                                    "conventional"
                                }
                                onClick={() => {
                                    markStarted();
                                    setSystemType(
                                        "conventional",
                                    );
                                }}
                                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${systemType ===
                                    "conventional"
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                    : "border-[var(--border)] bg-white hover:border-[var(--accent)]"
                                    }`}
                            >
                                Furnace, boiler, or conventional AC
                            </button>

                            <button
                                type="button"
                                aria-pressed={
                                    systemType ===
                                    "heat-pump"
                                }
                                onClick={() => {
                                    markStarted();
                                    setSystemType(
                                        "heat-pump",
                                    );
                                }}
                                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${systemType ===
                                    "heat-pump"
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                    : "border-[var(--border)] bg-white hover:border-[var(--accent)]"
                                    }`}
                            >
                                Heat pump
                            </button>

                            <button
                                type="button"
                                aria-pressed={
                                    systemType ===
                                    "unknown"
                                }
                                onClick={() => {
                                    markStarted();
                                    setSystemType(
                                        "unknown",
                                    );
                                }}
                                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${systemType ===
                                    "unknown"
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                    : "border-[var(--border)] bg-white hover:border-[var(--accent)]"
                                    }`}
                            >
                                Other or unsure
                            </button>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Annual heating and cooling cost"
                            value={annualHvacCost}
                            prefix="$"
                            suffix="/year"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAnnualHvacCost(
                                    value,
                                );
                            }}
                        />

                        <NumberField
                            label="Estimated savings rate"
                            value={estimatedSavingsRate}
                            suffix="%"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setEstimatedSavingsRate(
                                    value,
                                );
                            }}
                        />

                        <NumberField
                            label="Normal temperature"
                            value={normalTemperature}
                            suffix="°F"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setNormalTemperature(
                                    value,
                                );
                            }}
                        />

                        <NumberField
                            label="Setback temperature"
                            value={setbackTemperature}
                            suffix="°F"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setSetbackTemperature(
                                    value,
                                );
                            }}
                        />

                        <NumberField
                            label="Hours per day at setback"
                            value={hoursPerDay}
                            suffix="hours"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setHoursPerDay(value);
                            }}
                        />

                        <NumberField
                            label="Days per year used"
                            value={daysPerYear}
                            suffix="days"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setDaysPerYear(value);
                            }}
                        />

                        <NumberField
                            label="Comparison period"
                            value={comparisonYears}
                            suffix="years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setComparisonYears(
                                    value,
                                );
                            }}
                        />
                    </div>

                    <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 text-sm leading-6 text-[var(--muted)]">
                        <strong>
                            How this calculator works:
                        </strong>{" "}
                        The savings rate is an assumption you
                        enter. Your temperature setback, hours
                        per day, and days per year describe the
                        schedule you are evaluating, but they do
                        not automatically change the savings
                        percentage. There is no single reliable
                        formula that converts a thermostat
                        schedule into an exact savings rate for
                        every home.
                    </div>

                    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 text-sm leading-6 text-[var(--muted)]">
                        <strong>
                            DOE reference:
                        </strong>{" "}
                        DOE says a conventional thermostat
                        setback of 7–10°F for eight hours per
                        day can save as much as about 10% per
                        year on heating and cooling. Use that as
                        context for your assumption, not as a
                        guaranteed savings rate for your home.
                    </div>

                    {systemType === "heat-pump" ? (
                        <div className="mt-5 rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] p-5 text-sm leading-6">
                            <strong>
                                Heat-pump note:
                            </strong>{" "}
                            ENERGY STAR currently recommends a
                            steady temperature for air-source
                            heat pumps rather than conventional
                            nighttime setbacks. Recovery can
                            behave differently from a furnace or
                            boiler, especially when auxiliary
                            resistance heat is involved. The
                            calculator will show your entered
                            savings scenario, but do not treat
                            the DOE conventional-system
                            reference as a heat-pump savings
                            prediction.
                        </div>
                    ) : null}

                    {systemType === "unknown" ? (
                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 text-sm leading-6 text-[var(--muted)]">
                            <strong>
                                System type matters:
                            </strong>{" "}
                            Verify how your heating and cooling
                            equipment responds to setbacks
                            before relying on a generic savings
                            assumption.
                        </div>
                    ) : null}

                    {hasInteracted ? (
                        <>
                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <ResultCard
                                    label="Temperature setback"
                                    value={`${formatNumber(
                                        result.setbackDegrees,
                                    )}°F`}
                                    detail={`${formatNumber(
                                        result.normalTemp,
                                    )}°F normal setting compared with ${formatNumber(
                                        result.setbackTemp,
                                    )}°F during the setback period.`}
                                />

                                <ResultCard
                                    label="Annual setback time"
                                    value={`${formatNumber(
                                        result.annualSetbackHours,
                                    )} hours`}
                                    detail={`${formatNumber(
                                        result.dailyHours,
                                    )} hours per day for ${formatNumber(
                                        result.annualDays,
                                    )} days per year.`}
                                />

                                <ResultCard
                                    label="Modeled annual savings"
                                    value={formatCurrency(
                                        result.annualSavings,
                                    )}
                                    detail={`${formatPercent(
                                        result.savingsRate,
                                    )}% of the ${formatCurrency(
                                        result.hvacCost,
                                    )} annual heating and cooling cost you entered.`}
                                />

                                <ResultCard
                                    label={`${formatNumber(
                                        result.years,
                                    )}-year modeled savings`}
                                    value={formatCurrency(
                                        result.comparisonSavings,
                                    )}
                                    detail="Simple cumulative savings using your entered annual savings rate. Future energy-price changes are not modeled."
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    You entered a{" "}
                                    {formatNumber(
                                        result.setbackDegrees,
                                    )}
                                    °F setback for{" "}
                                    {formatNumber(
                                        result.dailyHours,
                                    )}{" "}
                                    hours per day on{" "}
                                    {formatNumber(
                                        result.annualDays,
                                    )}{" "}
                                    days per year.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    At your entered{" "}
                                    {formatPercent(
                                        result.savingsRate,
                                    )}
                                    % savings assumption,{" "}
                                    {formatCurrency(
                                        result.hvacCost,
                                    )}{" "}
                                    of annual heating and cooling
                                    spending produces about{" "}
                                    {formatCurrency(
                                        result.annualSavings,
                                    )}{" "}
                                    in modeled annual savings. The
                                    calculator does not derive that
                                    percentage from the setback
                                    temperature or schedule.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    Over{" "}
                                    {formatNumber(
                                        result.years,
                                    )}{" "}
                                    years, that is about{" "}
                                    {formatCurrency(
                                        result.comparisonSavings,
                                    )}{" "}
                                    before accounting for future
                                    energy-price changes.
                                </p>

                                {conventionalSystem ? (
                                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                        Your entered schedule can
                                        be compared with the DOE
                                        reference of a 7–10°F
                                        setback for eight hours
                                        per day. The DOE reference
                                        describes potential
                                        savings under a general
                                        conventional setback
                                        strategy; it does not
                                        determine the exact
                                        savings rate for this
                                        calculation.
                                    </p>
                                ) : null}

                                {systemType ===
                                    "heat-pump" ? (
                                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                        Because you selected a
                                        heat pump, verify the
                                        control strategy
                                        recommended for your
                                        equipment before using
                                        this modeled savings
                                        scenario as a planning
                                        assumption.
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>
                                    Important:
                                </strong>{" "}
                                This calculator does not predict
                                the exact savings from changing
                                your thermostat. The savings
                                rate is an assumption you can
                                edit. Actual results depend on
                                weather, building envelope,
                                equipment, thermostat controls,
                                occupancy, comfort preferences,
                                and energy prices.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to estimate
                                thermostat setback savings
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any input above to model
                                your schedule and translate your
                                savings assumption into annual
                                and long-term dollars.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        The DOE benchmark is a general reference,
                        not a prediction for an individual home.
                        ENERGY STAR recommends different
                        operating guidance for air-source heat
                        pumps, including maintaining a steadier
                        temperature.
                    </p>
                </div>
            </div>
        </section>
    );
}