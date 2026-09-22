"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatNumber(value: number, digits = 1) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

export default function RoofRackFuelCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [baselineMpg, setBaselineMpg] = useState("25");
    const [annualMiles, setAnnualMiles] = useState("15000");
    const [rackMilesPercent, setRackMilesPercent] = useState("70");
    const [fuelPrice, setFuelPrice] = useState("3.50");
    const [mpgPenalty, setMpgPenalty] = useState("5");
    const [years, setYears] = useState("5");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("roof_rack_fuel_calculator_started", {
                tool: "roof_rack_fuel_cost",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const mpg = parseNumber(baselineMpg);
        const miles = parseNumber(annualMiles);
        const rackShare = Math.min(
            Math.max(parseNumber(rackMilesPercent), 0),
            100,
        );
        const price = parseNumber(fuelPrice);
        const penalty = Math.min(
            Math.max(parseNumber(mpgPenalty), 0),
            95,
        );
        const ownershipYears = parseNumber(years);

        const milesWithRack = miles * (rackShare / 100);
        const milesWithoutRack = miles - milesWithRack;

        const rackMpg = mpg * (1 - penalty / 100);

        const baselineGallons =
            mpg > 0 ? miles / mpg : 0;

        const gallonsWithRack =
            mpg > 0 && rackMpg > 0
                ? milesWithoutRack / mpg + milesWithRack / rackMpg
                : 0;

        const extraGallons = Math.max(
            gallonsWithRack - baselineGallons,
            0,
        );

        const annualExtraCost = extraGallons * price;
        const multiYearCost = annualExtraCost * ownershipYears;

        const costPerThousandRackMiles =
            milesWithRack > 0
                ? (annualExtraCost / milesWithRack) * 1000
                : 0;

        return {
            milesWithRack,
            rackMpg,
            baselineGallons,
            gallonsWithRack,
            extraGallons,
            annualExtraCost,
            multiYearCost,
            costPerThousandRackMiles,
            ownershipYears,
        };
    }, [
        annualMiles,
        baselineMpg,
        fuelPrice,
        mpgPenalty,
        rackMilesPercent,
        years,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("roof_rack_fuel_calculator_changed", {
            tool: "roof_rack_fuel_cost",
        });
    }, [
        annualMiles,
        baselineMpg,
        fuelPrice,
        mpgPenalty,
        rackMilesPercent,
        years,
    ]);

    return (
        <section
            id="roof-rack-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Roof Rack Fuel Cost Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What could leaving your roof rack installed cost?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Enter your fuel economy, driving, fuel price, and an assumed MPG
                    penalty. The calculator estimates the additional fuel associated
                    with driving those miles with the rack installed.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Fuel economy without rack"
                            value={baselineMpg}
                            suffix=" mpg"
                            step="0.1"
                            onChange={(value) => {
                                markStarted();
                                setBaselineMpg(value);
                            }}
                        />

                        <NumberField
                            label="Miles driven per year"
                            value={annualMiles}
                            suffix=" miles"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAnnualMiles(value);
                            }}
                        />

                        <NumberField
                            label="Percent of miles driven with rack installed"
                            value={rackMilesPercent}
                            suffix="%"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setRackMilesPercent(value);
                            }}
                        />

                        <NumberField
                            label="Fuel price"
                            value={fuelPrice}
                            prefix="$"
                            suffix="/gal"
                            step="0.01"
                            onChange={(value) => {
                                markStarted();
                                setFuelPrice(value);
                            }}
                        />

                        <NumberField
                            label="Assumed MPG penalty"
                            value={mpgPenalty}
                            suffix="%"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setMpgPenalty(value);
                            }}
                        />

                        <NumberField
                            label="Years to compare"
                            value={years}
                            suffix=" years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setYears(value);
                            }}
                        />
                    </div>

                    <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Quick penalty assumptions
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            {[
                                ["2", "2%"],
                                ["5", "5%"],
                                ["10", "10%"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        markStarted();
                                        setMpgPenalty(value);
                                    }}
                                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${mpgPenalty === value
                                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                                        : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            The MPG penalty is an assumption, not a prediction
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Published testing has found substantially different fuel-economy
                            effects depending on the vehicle, rack design, speed, and cargo.
                            Use the percentage to explore scenarios rather than treating it
                            as a measured result for your vehicle.
                        </p>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Roof Rack Estimate
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Estimated MPG with rack"
                                value={`${formatNumber(result.rackMpg, 1)} mpg`}
                                detail="Based on your assumed percentage penalty"
                            />

                            <ResultMetric
                                label="Miles with rack"
                                value={`${formatNumber(result.milesWithRack, 0)} mi`}
                                detail="Based on your entered annual driving"
                            />

                            <ResultMetric
                                label="Extra fuel per year"
                                value={`${formatNumber(result.extraGallons, 1)} gal`}
                                detail={`${formatCurrency(
                                    result.annualExtraCost,
                                )} in additional annual fuel`}
                            />

                            <ResultMetric
                                label={`${formatNumber(
                                    result.ownershipYears,
                                    0,
                                )}-year extra fuel cost`}
                                value={formatCurrency(result.multiYearCost)}
                                detail="If the same assumptions continue"
                            />

                            <ResultMetric
                                label="Cost per 1,000 rack miles"
                                value={formatCurrency(
                                    result.costPerThousandRackMiles,
                                )}
                                detail="Additional fuel cost under your assumptions"
                            />

                            <ResultMetric
                                label="Annual gallons with rack pattern"
                                value={`${formatNumber(
                                    result.gallonsWithRack,
                                    1,
                                )} gal`}
                                detail={`${formatNumber(
                                    result.baselineGallons,
                                    1,
                                )} gal if all miles were at baseline MPG`}
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                This calculator does not know your vehicle&apos;s actual drag
                                penalty
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The most defensible way to estimate your own rack&apos;s effect
                                is controlled vehicle-specific testing. This tool instead shows
                                what different MPG penalties would mean financially.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Roof Rack Fuel Cost Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your driving to estimate the cost.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at least one
                            field to calculate the potential fuel impact for your driving.
                        </p>
                    </div>
                )}
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
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
                {prefix ? (
                    <span className="text-[var(--muted)]">{prefix}</span>
                ) : null}

                <input
                    type="number"
                    min="0"
                    step={step}
                    inputMode="decimal"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
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