"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type CurrentDryerType = "electric" | "gas";

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

function formatNumber(value: number, digits = 1) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

function currentDryerLabel(type: CurrentDryerType) {
    return type === "electric" ? "electric" : "gas";
}

export default function HeatPumpDryerPaybackCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [currentDryerType, setCurrentDryerType] =
        useState<CurrentDryerType>("electric");

    const [loadsPerWeek, setLoadsPerWeek] =
        useState("5");

    const [electricityRate, setElectricityRate] =
        useState("0.20");

    const [currentElectricKwhPerLoad, setCurrentElectricKwhPerLoad] =
        useState("3");

    const [currentGasThermsPerLoad, setCurrentGasThermsPerLoad] =
        useState("0.20");

    const [gasPrice, setGasPrice] =
        useState("1.50");

    const [heatPumpKwhPerLoad, setHeatPumpKwhPerLoad] =
        useState("1.5");

    const [conventionalInstalledCost, setConventionalInstalledCost] =
        useState("900");

    const [heatPumpInstalledCost, setHeatPumpInstalledCost] =
        useState("1500");

    const [rebate, setRebate] =
        useState("0");

    const [avoidedVentCost, setAvoidedVentCost] =
        useState("0");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "heat_pump_dryer_payback_started",
                {
                    tool: "heat_pump_dryer_payback_check",
                },
            );
        }

        setHasInteracted(true);
    };

    const loads = Math.max(
        parseNumber(loadsPerWeek),
        0,
    );

    const weeksPerYear = 52;

    const annualLoads = loads * weeksPerYear;

    const electricityPrice = Math.max(
        parseNumber(electricityRate),
        0,
    );

    const currentElectricEnergy = Math.max(
        parseNumber(currentElectricKwhPerLoad),
        0,
    );

    const currentGasEnergy = Math.max(
        parseNumber(currentGasThermsPerLoad),
        0,
    );

    const gasUnitPrice = Math.max(
        parseNumber(gasPrice),
        0,
    );

    const heatPumpEnergy = Math.max(
        parseNumber(heatPumpKwhPerLoad),
        0,
    );

    const conventionalCost = Math.max(
        parseNumber(conventionalInstalledCost),
        0,
    );

    const hpInstalledCost = Math.max(
        parseNumber(heatPumpInstalledCost),
        0,
    );

    const appliedRebate = Math.min(
        Math.max(parseNumber(rebate), 0),
        hpInstalledCost,
    );

    const ventSavings = Math.max(
        parseNumber(avoidedVentCost),
        0,
    );

    const annualCurrentOperatingCost =
        currentDryerType === "electric"
            ? annualLoads *
            currentElectricEnergy *
            electricityPrice
            : annualLoads *
            currentGasEnergy *
            gasUnitPrice;

    const annualHeatPumpOperatingCost =
        annualLoads *
        heatPumpEnergy *
        electricityPrice;

    const annualOperatingSavings =
        annualCurrentOperatingCost -
        annualHeatPumpOperatingCost;

    const netHeatPumpProjectCost =
        hpInstalledCost -
        appliedRebate -
        ventSavings;

    const incrementalProjectCost =
        netHeatPumpProjectCost -
        conventionalCost;

    const paybackYears =
        incrementalProjectCost > 0 &&
            annualOperatingSavings > 0
            ? incrementalProjectCost /
            annualOperatingSavings
            : null;

    const fiveYearNetSavings =
        annualOperatingSavings * 5 -
        incrementalProjectCost;

    const tenYearNetSavings =
        annualOperatingSavings * 10 -
        incrementalProjectCost;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "heat_pump_dryer_payback_changed",
            {
                tool: "heat_pump_dryer_payback_check",
            },
        );
    }, [
        currentDryerType,
        loadsPerWeek,
        electricityRate,
        currentElectricKwhPerLoad,
        currentGasThermsPerLoad,
        gasPrice,
        heatPumpKwhPerLoad,
        conventionalInstalledCost,
        heatPumpInstalledCost,
        rebate,
        avoidedVentCost,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (
        incrementalProjectCost <= 0 &&
        annualOperatingSavings > 0
    ) {
        resultHeading =
            "Your inputs show no additional project cost and lower annual operating cost.";

        resultDescription =
            "After the rebate and avoided vent cost you entered, the heat-pump dryer project costs no more than the conventional replacement and also has a lower estimated annual operating cost.";
    } else if (
        annualOperatingSavings > 0 &&
        paybackYears !== null &&
        paybackYears <= 5
    ) {
        resultHeading =
            "Your inputs show a relatively short simple payback.";

        resultDescription =
            "The estimated annual operating savings recover the additional project cost of the heat-pump dryer within five years under the assumptions you entered.";
    } else if (
        annualOperatingSavings > 0 &&
        paybackYears !== null
    ) {
        resultHeading =
            "Your inputs show operating savings, but the simple payback is longer.";

        resultDescription =
            "The heat-pump dryer has a lower estimated annual operating cost, but the additional project cost takes more than five years to recover under your assumptions.";
    } else if (
        annualOperatingSavings <= 0 &&
        incrementalProjectCost > 0
    ) {
        resultHeading =
            "Your inputs do not show a financial payback.";

        resultDescription =
            "The heat-pump dryer costs more to install than the conventional replacement and does not produce annual operating savings with the energy prices and usage you entered.";
    } else {
        resultHeading =
            "Your inputs do not establish an operating-cost advantage.";

        resultDescription =
            "The project may still make sense for installation or performance reasons, but the operating-cost assumptions you entered do not show positive annual savings.";
    }

    return (
        <section
            id="heat-pump-dryer-payback-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Heat-Pump Dryer Payback Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Do the energy savings justify the additional project cost?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare your current dryer with a heat-pump dryer using
                    your laundry volume, energy prices, installation costs,
                    and any verified rebate or avoided vent cost.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Your current dryer
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <SelectField
                            label="Current dryer type"
                            value={currentDryerType}
                            options={[
                                {
                                    value: "electric",
                                    label: "Electric",
                                },
                                {
                                    value: "gas",
                                    label: "Gas",
                                },
                            ]}
                            onChange={(value) => {
                                markStarted();
                                setCurrentDryerType(
                                    value as CurrentDryerType,
                                );
                            }}
                        />

                        <NumberField
                            label="Loads per week"
                            value={loadsPerWeek}
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setLoadsPerWeek(value);
                            }}
                        />

                        {currentDryerType === "electric" ? (
                            <NumberField
                                label="Current dryer energy use"
                                value={currentElectricKwhPerLoad}
                                suffix="kWh/load"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setCurrentElectricKwhPerLoad(
                                        value,
                                    );
                                }}
                            />
                        ) : (
                            <>
                                <NumberField
                                    label="Current dryer gas use"
                                    value={currentGasThermsPerLoad}
                                    suffix="therms/load"
                                    step="0.01"
                                    onChange={(value) => {
                                        markStarted();
                                        setCurrentGasThermsPerLoad(
                                            value,
                                        );
                                    }}
                                />

                                <NumberField
                                    label="Gas price"
                                    value={gasPrice}
                                    prefix="$"
                                    suffix="/therm"
                                    step="0.05"
                                    onChange={(value) => {
                                        markStarted();
                                        setGasPrice(value);
                                    }}
                                />
                            </>
                        )}

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
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use measured or model-specific energy use when available
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Dryer energy use varies by model, cycle, load
                            size, moisture level, and household habits.
                            Generic values are examples only. Use a
                            manufacturer estimate, energy label, or other
                            reasonable measurement when possible.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Heat-pump dryer
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="HP dryer energy use"
                                value={heatPumpKwhPerLoad}
                                suffix="kWh/load"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setHeatPumpKwhPerLoad(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Heat-pump dryer installed cost"
                                value={heatPumpInstalledCost}
                                prefix="$"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setHeatPumpInstalledCost(
                                        value,
                                    );
                                }}
                                onBlur={() => {
                                    const normalizedCost =
                                        Math.max(
                                            parseNumber(
                                                heatPumpInstalledCost,
                                            ),
                                            0,
                                        );

                                    setHeatPumpInstalledCost(
                                        String(normalizedCost),
                                    );

                                    setRebate((current) =>
                                        String(
                                            Math.min(
                                                Math.max(
                                                    parseNumber(
                                                        current,
                                                    ),
                                                    0,
                                                ),
                                                normalizedCost,
                                            ),
                                        ),
                                    );
                                }}
                            />

                            <NumberField
                                label="Conventional replacement installed cost"
                                value={conventionalInstalledCost}
                                prefix="$"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setConventionalInstalledCost(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Verified rebate"
                                value={rebate}
                                prefix="$"
                                step="50"
                                max={String(
                                    hpInstalledCost,
                                )}
                                onChange={(value) => {
                                    markStarted();
                                    setRebate(value);
                                }}
                                onBlur={() => {
                                    const normalized =
                                        Math.min(
                                            Math.max(
                                                parseNumber(
                                                    rebate,
                                                ),
                                                0,
                                            ),
                                            hpInstalledCost,
                                        );

                                    setRebate(
                                        String(normalized),
                                    );
                                }}
                            />

                            <NumberField
                                label="Avoided vent installation cost"
                                value={avoidedVentCost}
                                prefix="$"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setAvoidedVentCost(
                                        value,
                                    );
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Include avoided vent work only when it is a real project difference
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                A ventless heat-pump dryer can avoid a vent
                                installation in a location that does not
                                already have one. Use this field only when
                                the heat-pump project genuinely avoids a cost
                                you would otherwise incur.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your results
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Annual dryer loads"
                                value={formatNumber(
                                    annualLoads,
                                    0,
                                )}
                                detail="Loads per week multiplied by 52 weeks."
                            />

                            <ResultMetric
                                label="Current annual operating cost"
                                value={formatCurrency(
                                    annualCurrentOperatingCost,
                                )}
                                detail={`Estimated annual energy cost for your ${currentDryerLabel(
                                    currentDryerType,
                                )} dryer.`}
                            />

                            <ResultMetric
                                label="HP dryer annual operating cost"
                                value={formatCurrency(
                                    annualHeatPumpOperatingCost,
                                )}
                                detail="Estimated annual electricity cost for the heat-pump dryer."
                            />

                            <ResultMetric
                                label="Annual operating savings"
                                value={formatCurrency(
                                    annualOperatingSavings,
                                )}
                                detail="Current dryer operating cost minus HP dryer operating cost."
                            />

                            <ResultMetric
                                label="Net heat-pump project cost"
                                value={formatCurrency(
                                    netHeatPumpProjectCost,
                                )}
                                detail="HP dryer cost minus verified rebate and any entered avoided vent cost."
                            />

                            <ResultMetric
                                label="Incremental project cost"
                                value={formatCurrency(
                                    incrementalProjectCost,
                                )}
                                detail="Net heat-pump project cost minus the conventional replacement cost. A negative result means the heat-pump project costs less upfront."
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
                                detail="Estimated operating savings over this period minus the incremental project cost. A negative result means the additional upfront cost has not yet been recovered."
                            />

                            <ResultMetric
                                label="5-year net financial benefit"
                                value={formatCurrency(
                                    fiveYearNetSavings,
                                )}
                                detail="Estimated operating savings over this period minus the incremental project cost. A negative result means the additional upfront cost has not yet been recovered."
                            />

                            <ResultMetric
                                label="10-year net financial benefit"
                                value={formatCurrency(
                                    tenYearNetSavings,
                                )}
                                detail="Ten years of operating savings minus the incremental project cost."
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
                                The calculation uses the values you entered
                                and does not predict future energy prices,
                                maintenance costs, drying performance, or
                                resale value.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Replace the example assumptions with your own dryer and utility data.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                Laundry volume, energy prices, installed
                                costs, rebates, and vent requirements can
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