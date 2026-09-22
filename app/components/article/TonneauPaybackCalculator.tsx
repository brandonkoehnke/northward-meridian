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

export default function TonneauPaybackCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [baselineMpg, setBaselineMpg] = useState("20");
    const [annualMiles, setAnnualMiles] = useState("15000");
    const [highwayPercent, setHighwayPercent] = useState("70");
    const [fuelPrice, setFuelPrice] = useState("3.50");
    const [mpgGain, setMpgGain] = useState("2");
    const [coverPrice, setCoverPrice] = useState("800");
    const [years, setYears] = useState("5");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("tonneau_payback_calculator_started", {
                tool: "tonneau_payback",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const mpg = Math.max(parseNumber(baselineMpg), 0);
        const miles = Math.max(parseNumber(annualMiles), 0);
        const highwayShare =
            Math.min(Math.max(parseNumber(highwayPercent), 0), 100) / 100;
        const price = Math.max(parseNumber(fuelPrice), 0);
        const gain =
            Math.min(Math.max(parseNumber(mpgGain), 0), 100) / 100;
        const coverCost = Math.max(parseNumber(coverPrice), 0);
        const comparisonYears = Math.max(parseNumber(years), 0);

        const highwayMiles = miles * highwayShare;
        const otherMiles = miles - highwayMiles;

        const improvedHighwayMpg = mpg * (1 + gain);

        const baselineGallons = mpg > 0 ? miles / mpg : 0;

        const gallonsWithCover =
            mpg > 0 && improvedHighwayMpg > 0
                ? otherMiles / mpg + highwayMiles / improvedHighwayMpg
                : 0;

        const gallonsSaved = Math.max(
            baselineGallons - gallonsWithCover,
            0,
        );

        const annualSavings = gallonsSaved * price;

        const paybackYears =
            annualSavings > 0 ? coverCost / annualSavings : null;

        const multiYearSavings =
            annualSavings * comparisonYears;

        const netAfterPeriod =
            multiYearSavings - coverCost;

        return {
            highwayMiles,
            improvedHighwayMpg,
            baselineGallons,
            gallonsWithCover,
            gallonsSaved,
            annualSavings,
            paybackYears,
            multiYearSavings,
            netAfterPeriod,
            comparisonYears,
        };
    }, [
        annualMiles,
        baselineMpg,
        coverPrice,
        fuelPrice,
        highwayPercent,
        mpgGain,
        years,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("tonneau_payback_calculator_changed", {
            tool: "tonneau_payback",
        });
    }, [
        annualMiles,
        baselineMpg,
        coverPrice,
        fuelPrice,
        highwayPercent,
        mpgGain,
        years,
    ]);

    return (
        <section
            id="tonneau-payback-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Tonneau Cover Payback Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Could the fuel savings ever recover the cost of the cover?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Enter your truck, driving, fuel price, cover cost, and an assumed
                    highway MPG improvement. The calculator estimates the fuel-only
                    payback.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Truck fuel economy"
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
                            label="Highway share"
                            value={highwayPercent}
                            suffix="%"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setHighwayPercent(value);
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
                            label="Assumed highway MPG gain"
                            value={mpgGain}
                            suffix="%"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setMpgGain(value);
                            }}
                        />

                        <NumberField
                            label="Tonneau cover price"
                            value={coverPrice}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setCoverPrice(value);
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
                            Quick MPG assumptions
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            {[
                                ["1", "1%"],
                                ["2", "2%"],
                                ["5", "5%"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        markStarted();
                                        setMpgGain(value);
                                    }}
                                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${mpgGain === value
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
                            The MPG improvement is an assumption
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Aerodynamic testing can show that a bed cover changes drag, but
                            that does not establish one universal MPG improvement for every
                            truck. Use this field to test different scenarios rather than
                            treating the default as a prediction.
                        </p>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Fuel-Only Payback
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Estimated highway MPG with cover"
                                value={`${formatNumber(
                                    result.improvedHighwayMpg,
                                    1,
                                )} mpg`}
                                detail="Based on your assumed MPG improvement"
                            />

                            <ResultMetric
                                label="Highway miles per year"
                                value={`${formatNumber(
                                    result.highwayMiles,
                                    0,
                                )} mi`}
                                detail="Miles where the assumed highway benefit is applied"
                            />

                            <ResultMetric
                                label="Fuel saved per year"
                                value={`${formatNumber(
                                    result.gallonsSaved,
                                    1,
                                )} gal`}
                                detail={`${formatCurrency(
                                    result.annualSavings,
                                )} in estimated annual fuel savings`}
                            />

                            <ResultMetric
                                label="Fuel-only payback"
                                value={
                                    result.paybackYears === null
                                        ? "No payback"
                                        : `${formatNumber(
                                            result.paybackYears,
                                            1,
                                        )} years`
                                }
                                detail="Cover price divided by estimated annual fuel savings"
                            />

                            <ResultMetric
                                label={`${formatNumber(
                                    result.comparisonYears,
                                    0,
                                )}-year fuel savings`}
                                value={formatCurrency(
                                    result.multiYearSavings,
                                )}
                                detail="Before subtracting the purchase price"
                            />

                            <ResultMetric
                                label={`Net after ${formatNumber(
                                    result.comparisonYears,
                                    0,
                                )} years`}
                                value={formatCurrency(
                                    result.netAfterPeriod,
                                )}
                                detail={
                                    result.netAfterPeriod >= 0
                                        ? "Estimated fuel savings exceed the cover price"
                                        : "The cover has not paid for itself through fuel savings"
                                }
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Fuel is only one reason to own a tonneau cover
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                This calculation assigns no value to cargo security, weather
                                protection, bed organization, appearance, or convenience. If
                                you already want those benefits, even modest fuel savings can
                                be useful without needing to justify the entire purchase.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Tonneau Cover Payback Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your truck and driving to estimate payback.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at least one
                            field to calculate a fuel-only payback for your situation.
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