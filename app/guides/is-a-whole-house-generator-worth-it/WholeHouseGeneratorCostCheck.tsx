"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type FuelType = "natural-gas" | "propane";

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

function formatNumber(value: number, digits = 1) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

export default function WholeHouseGeneratorCostCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [ratedOutput, setRatedOutput] =
        useState("22");

    const [expectedLoadPercent, setExpectedLoadPercent] =
        useState("50");

    const [fuelType, setFuelType] =
        useState<FuelType>("natural-gas");

    const [naturalGasUse, setNaturalGasUse] =
        useState("228");

    const [naturalGasPrice, setNaturalGasPrice] =
        useState("15");

    const [propaneUse, setPropaneUse] =
        useState("2");

    const [propanePrice, setPropanePrice] =
        useState("2.50");

    const [outagesPerYear, setOutagesPerYear] =
        useState("3");

    const [typicalOutageHours, setTypicalOutageHours] =
        useState("6");

    const [longOutageHours, setLongOutageHours] =
        useState("48");

    const [installedCost, setInstalledCost] =
        useState("14000");

    const [ownershipYears, setOwnershipYears] =
        useState("15");

    const [annualMaintenance, setAnnualMaintenance] =
        useState("250");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "whole_house_generator_check_started",
                {
                    tool: "whole_house_generator_cost_check",
                },
            );
        }

        setHasInteracted(true);
    };

    const generatorKw = Math.max(
        parseNumber(ratedOutput),
        0,
    );

    const loadPercent = Math.min(
        Math.max(
            parseNumber(expectedLoadPercent),
            0,
        ),
        100,
    );

    const expectedLoadKw =
        generatorKw * (loadPercent / 100);

    const ngUse = Math.max(
        parseNumber(naturalGasUse),
        0,
    );

    const ngPrice = Math.max(
        parseNumber(naturalGasPrice),
        0,
    );

    const lpUse = Math.max(
        parseNumber(propaneUse),
        0,
    );

    const lpPrice = Math.max(
        parseNumber(propanePrice),
        0,
    );

    const hourlyFuelUse =
        fuelType === "natural-gas"
            ? ngUse
            : lpUse;

    const hourlyFuelCost =
        fuelType === "natural-gas"
            ? (ngUse / 1000) * ngPrice
            : lpUse * lpPrice;

    const outageCount = Math.max(
        parseNumber(outagesPerYear),
        0,
    );

    const typicalHours = Math.max(
        parseNumber(typicalOutageHours),
        0,
    );

    const longHours = Math.max(
        parseNumber(longOutageHours),
        0,
    );

    const expectedAnnualRuntime =
        outageCount * typicalHours;

    const typicalOutageFuel =
        hourlyFuelUse * typicalHours;

    const longOutageFuel =
        hourlyFuelUse * longHours;

    const annualFuelUse =
        hourlyFuelUse * expectedAnnualRuntime;

    const typicalOutageFuelCost =
        hourlyFuelCost * typicalHours;

    const longOutageFuelCost =
        hourlyFuelCost * longHours;

    const annualFuelCost =
        hourlyFuelCost * expectedAnnualRuntime;

    const projectCost = Math.max(
        parseNumber(installedCost),
        0,
    );

    const years = Math.max(
        parseNumber(ownershipYears),
        0,
    );

    const maintenancePerYear = Math.max(
        parseNumber(annualMaintenance),
        0,
    );

    const maintenanceOverOwnership =
        maintenancePerYear * years;

    const fuelOverOwnership =
        annualFuelCost * years;

    const estimatedOwnershipCost =
        projectCost +
        maintenanceOverOwnership +
        fuelOverOwnership;

    const annualizedOwnershipCost =
        years > 0
            ? estimatedOwnershipCost / years
            : null;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "whole_house_generator_check_changed",
            {
                tool: "whole_house_generator_cost_check",
            },
        );
    }, [
        ratedOutput,
        expectedLoadPercent,
        fuelType,
        naturalGasUse,
        naturalGasPrice,
        propaneUse,
        propanePrice,
        outagesPerYear,
        typicalOutageHours,
        longOutageHours,
        installedCost,
        ownershipYears,
        annualMaintenance,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (
        generatorKw <= 0 ||
        loadPercent <= 0
    ) {
        resultHeading =
            "Add a generator output and expected operating load.";

        resultDescription =
            "The calculator needs both values to describe the amount of generator capacity represented by your operating-load assumption.";
    } else if (
        hourlyFuelUse <= 0 ||
        hourlyFuelCost <= 0
    ) {
        resultHeading =
            "Add the generator's fuel-use specification and your fuel price.";

        resultDescription =
            "Fuel consumption varies by generator model and operating load. Use a manufacturer fuel-consumption figure that corresponds as closely as possible to the load assumption you entered.";
    } else if (
        outageCount <= 0 ||
        typicalHours <= 0
    ) {
        resultHeading =
            "Your outage assumptions do not produce an annual fuel-cost estimate.";

        resultDescription =
            "The calculator can still show fuel use for the long-outage scenario, but estimated annual fuel cost requires both an outage frequency and a typical outage duration.";
    } else {
        resultHeading =
            "Your inputs show the estimated cost of owning and operating this backup system.";

        resultDescription =
            "Use the outage-cost results to understand fuel exposure during short and prolonged outages, then compare the estimated ownership cost with how much you value automatic backup for your home.";
    }

    const fuelUseUnit =
        fuelType === "natural-gas"
            ? "ft³"
            : "gal";

    const fuelRateUnit =
        fuelType === "natural-gas"
            ? "ft³/hr"
            : "gal/hr";

    return (
        <section
            id="whole-house-generator-cost-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Whole-House Generator Ownership &amp; Outage Cost Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What will automatic backup cost to own and operate?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Estimate fuel cost for typical and prolonged
                    outages, then combine installation, maintenance,
                    and expected fuel use into a long-term ownership
                    estimate.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Generator
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Generator rated output"
                            value={ratedOutput}
                            suffix="kW"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setRatedOutput(value);
                            }}
                        />

                        <NumberField
                            label="Expected operating load"
                            value={expectedLoadPercent}
                            suffix="%"
                            step="5"
                            max="100"
                            onChange={(value) => {
                                markStarted();
                                setExpectedLoadPercent(
                                    value,
                                );
                            }}
                            onBlur={() => {
                                const normalized =
                                    Math.min(
                                        Math.max(
                                            parseNumber(
                                                expectedLoadPercent,
                                            ),
                                            0,
                                        ),
                                        100,
                                    );

                                setExpectedLoadPercent(
                                    String(normalized),
                                );
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            This is not a generator-sizing tool
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            The load percentage is used to describe the
                            fuel-consumption assumption you enter below.
                            It does not verify starting loads, transfer
                            equipment, load-management requirements,
                            electrical-code requirements, or whether a
                            generator is correctly sized for your home.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Fuel
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <SelectField
                                label="Fuel type"
                                value={fuelType}
                                options={[
                                    {
                                        value:
                                            "natural-gas",
                                        label:
                                            "Natural gas",
                                    },
                                    {
                                        value:
                                            "propane",
                                        label:
                                            "Propane",
                                    },
                                ]}
                                onChange={(value) => {
                                    markStarted();
                                    setFuelType(
                                        value as FuelType,
                                    );
                                }}
                            />

                            {fuelType ===
                                "natural-gas" ? (
                                <>
                                    <NumberField
                                        label="Fuel use at expected load"
                                        value={
                                            naturalGasUse
                                        }
                                        suffix="ft³/hr"
                                        step="1"
                                        onChange={(
                                            value,
                                        ) => {
                                            markStarted();
                                            setNaturalGasUse(
                                                value,
                                            );
                                        }}
                                    />

                                    <NumberField
                                        label="Natural gas price"
                                        value={
                                            naturalGasPrice
                                        }
                                        prefix="$"
                                        suffix="/1,000 ft³"
                                        step="0.50"
                                        onChange={(
                                            value,
                                        ) => {
                                            markStarted();
                                            setNaturalGasPrice(
                                                value,
                                            );
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <NumberField
                                        label="Fuel use at expected load"
                                        value={
                                            propaneUse
                                        }
                                        suffix="gal/hr"
                                        step="0.1"
                                        onChange={(
                                            value,
                                        ) => {
                                            markStarted();
                                            setPropaneUse(
                                                value,
                                            );
                                        }}
                                    />

                                    <NumberField
                                        label="Propane price"
                                        value={
                                            propanePrice
                                        }
                                        prefix="$"
                                        suffix="/gal"
                                        step="0.10"
                                        onChange={(
                                            value,
                                        ) => {
                                            markStarted();
                                            setPropanePrice(
                                                value,
                                            );
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Use the manufacturer&apos;s fuel-consumption data
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Fuel use varies by generator model,
                                fuel, and load. Enter a published
                                consumption figure that corresponds as
                                closely as possible to the expected-load
                                percentage above. Do not treat these
                                example inputs as specifications for a
                                particular generator.
                            </p>

                            {fuelType ===
                                "natural-gas" ? (
                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    This version uses a natural-gas
                                    price per 1,000 cubic feet so the
                                    price unit matches the cubic-feet
                                    consumption input directly. If your
                                    bill uses another unit, convert your
                                    rate before entering it.
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Outages
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <NumberField
                                label="Outages per year"
                                value={outagesPerYear}
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setOutagesPerYear(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Typical outage"
                                value={
                                    typicalOutageHours
                                }
                                suffix="hours"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setTypicalOutageHours(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Long outage"
                                value={longOutageHours}
                                suffix="hours"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setLongOutageHours(
                                        value,
                                    );
                                }}
                            />
                        </div>

                        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                            The annual estimate assumes the typical
                            outage duration for each outage. The long
                            outage is shown separately as a stress
                            scenario and is not added to the annual
                            estimate.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Ownership
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <NumberField
                                label="Installed project cost"
                                value={installedCost}
                                prefix="$"
                                step="500"
                                onChange={(value) => {
                                    markStarted();
                                    setInstalledCost(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Expected ownership"
                                value={ownershipYears}
                                suffix="years"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setOwnershipYears(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Annual maintenance"
                                value={annualMaintenance}
                                prefix="$"
                                suffix="/yr"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setAnnualMaintenance(
                                        value,
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your results
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Expected generator load"
                                value={`${formatNumber(
                                    expectedLoadKw,
                                    1,
                                )} kW`}
                                detail={`${formatNumber(
                                    loadPercent,
                                    0,
                                )}% of the rated generator output you entered.`}
                            />

                            <ResultMetric
                                label="Estimated hourly fuel cost"
                                value={formatCurrency(
                                    hourlyFuelCost,
                                    2,
                                )}
                                detail={`Based on ${formatNumber(
                                    hourlyFuelUse,
                                    fuelType ===
                                        "natural-gas"
                                        ? 0
                                        : 1,
                                )} ${fuelRateUnit} at the fuel price you entered.`}
                            />

                            <ResultMetric
                                label="Typical outage fuel use"
                                value={`${formatNumber(
                                    typicalOutageFuel,
                                    fuelType ===
                                        "natural-gas"
                                        ? 0
                                        : 1,
                                )} ${fuelUseUnit}`}
                                detail={`${formatNumber(
                                    typicalHours,
                                    1,
                                )} hours at the entered fuel-consumption rate.`}
                            />

                            <ResultMetric
                                label="Typical outage fuel cost"
                                value={formatCurrency(
                                    typicalOutageFuelCost,
                                    2,
                                )}
                                detail="Estimated fuel cost for one typical outage."
                            />

                            <ResultMetric
                                label="Long outage fuel use"
                                value={`${formatNumber(
                                    longOutageFuel,
                                    fuelType ===
                                        "natural-gas"
                                        ? 0
                                        : 1,
                                )} ${fuelUseUnit}`}
                                detail={`${formatNumber(
                                    longHours,
                                    1,
                                )} hours at the entered fuel-consumption rate.`}
                            />

                            <ResultMetric
                                label="Long outage fuel cost"
                                value={formatCurrency(
                                    longOutageFuelCost,
                                    2,
                                )}
                                detail="Estimated fuel cost for the long-outage scenario."
                            />

                            <ResultMetric
                                label="Estimated annual runtime"
                                value={`${formatNumber(
                                    expectedAnnualRuntime,
                                    1,
                                )} hours`}
                                detail="Outages per year multiplied by the typical outage duration."
                            />

                            <ResultMetric
                                label="Estimated annual fuel use"
                                value={`${formatNumber(
                                    annualFuelUse,
                                    fuelType ===
                                        "natural-gas"
                                        ? 0
                                        : 1,
                                )} ${fuelUseUnit}`}
                                detail="Estimated annual runtime multiplied by the entered fuel-consumption rate."
                            />

                            <ResultMetric
                                label="Estimated annual fuel cost"
                                value={formatCurrency(
                                    annualFuelCost,
                                    2,
                                )}
                                detail="Estimated annual runtime multiplied by hourly fuel cost."
                            />

                            <ResultMetric
                                label="Maintenance over ownership"
                                value={formatCurrency(
                                    maintenanceOverOwnership,
                                )}
                                detail="Annual maintenance multiplied by the ownership period."
                            />

                            <ResultMetric
                                label="Estimated fuel over ownership"
                                value={formatCurrency(
                                    fuelOverOwnership,
                                )}
                                detail="Estimated annual outage fuel cost multiplied by the ownership period."
                            />

                            <ResultMetric
                                label="Estimated ownership cost"
                                value={formatCurrency(
                                    estimatedOwnershipCost,
                                )}
                                detail="Installed cost plus estimated maintenance and outage fuel over the ownership period."
                            />

                            <ResultMetric
                                label="Annualized ownership cost"
                                value={
                                    annualizedOwnershipCost !==
                                        null
                                        ? `${formatCurrency(
                                            annualizedOwnershipCost,
                                        )}/yr`
                                        : "Not available"
                                }
                                detail="Estimated ownership cost divided by the ownership period."
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
                                This estimate does not assign a
                                dollar value to avoiding an outage.
                                It shows the cost of providing backup
                                under the assumptions you entered so
                                you can decide whether that resilience
                                is worth paying for.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Replace the example assumptions with your generator, fuel, and outage data.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                Generator fuel consumption,
                                installation cost, maintenance, fuel
                                price, and outage history can all
                                materially change the result.
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