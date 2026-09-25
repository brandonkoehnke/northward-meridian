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

export default function ChestFreezerPaybackCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [purchasePrice, setPurchasePrice] = useState("400");
    const [annualKwh, setAnnualKwh] = useState("215");
    const [electricityPrice, setElectricityPrice] = useState("0.20");

    const [monthlyEligibleSpend, setMonthlyEligibleSpend] =
        useState("250");

    const [averageDiscount, setAverageDiscount] = useState("15");

    const [stockpileShare, setStockpileShare] = useState("50");

    const [annualExtraWaste, setAnnualExtraWaste] = useState("25");

    const [years, setYears] = useState("5");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("chest_freezer_payback_started", {
                tool: "chest_freezer_payback",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const freezerCost = Math.max(parseNumber(purchasePrice), 0);
        const kwh = Math.max(parseNumber(annualKwh), 0);
        const electricRate = Math.max(
            parseNumber(electricityPrice),
            0,
        );

        const monthlySpend = Math.max(
            parseNumber(monthlyEligibleSpend),
            0,
        );

        const discount =
            Math.min(Math.max(parseNumber(averageDiscount), 0), 100) /
            100;

        const stockpile =
            Math.min(Math.max(parseNumber(stockpileShare), 0), 100) /
            100;

        const waste = Math.max(parseNumber(annualExtraWaste), 0);
        const comparisonYears = Math.max(parseNumber(years), 0);

        const annualEligibleSpend = monthlySpend * 12;

        const annualStockpiledSpend =
            annualEligibleSpend * stockpile;

        const grossGrocerySavings =
            annualStockpiledSpend * discount;

        const annualElectricityCost =
            kwh * electricRate;

        const netAnnualSavings =
            grossGrocerySavings -
            annualElectricityCost -
            waste;

        const paybackYears =
            netAnnualSavings > 0
                ? freezerCost / netAnnualSavings
                : null;

        const multiYearOperatingSavings =
            netAnnualSavings * comparisonYears;

        const netAfterPeriod =
            multiYearOperatingSavings - freezerCost;

        const requiredAnnualGrossSavings =
            comparisonYears > 0
                ? freezerCost / comparisonYears +
                annualElectricityCost +
                waste
                : 0;

        const requiredMonthlyGrossSavings =
            requiredAnnualGrossSavings / 12;

        const requiredDiscount =
            annualStockpiledSpend > 0
                ? (requiredAnnualGrossSavings /
                    annualStockpiledSpend) *
                100
                : null;

        return {
            annualEligibleSpend,
            annualStockpiledSpend,
            grossGrocerySavings,
            annualElectricityCost,
            netAnnualSavings,
            paybackYears,
            multiYearOperatingSavings,
            netAfterPeriod,
            requiredAnnualGrossSavings,
            requiredMonthlyGrossSavings,
            requiredDiscount,
            comparisonYears,
        };
    }, [
        annualExtraWaste,
        annualKwh,
        averageDiscount,
        electricityPrice,
        monthlyEligibleSpend,
        purchasePrice,
        stockpileShare,
        years,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("chest_freezer_payback_changed", {
            tool: "chest_freezer_payback",
        });
    }, [
        annualExtraWaste,
        annualKwh,
        averageDiscount,
        electricityPrice,
        monthlyEligibleSpend,
        purchasePrice,
        stockpileShare,
        years,
    ]);

    return (
        <section
            id="chest-freezer-payback-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Chest Freezer Payback Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Could a chest freezer actually lower your grocery costs?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Estimate the value of buying freezer-friendly food at lower
                    prices, then subtract electricity and additional food waste to
                    see whether the freezer can recover its purchase price.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Freezer purchase price"
                            value={purchasePrice}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setPurchasePrice(value);
                            }}
                        />

                        <NumberField
                            label="Annual electricity use"
                            value={annualKwh}
                            suffix=" kWh/yr"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setAnnualKwh(value);
                            }}
                        />

                        <NumberField
                            label="Electricity price"
                            value={electricityPrice}
                            prefix="$"
                            suffix="/kWh"
                            step="0.01"
                            onChange={(value) => {
                                markStarted();
                                setElectricityPrice(value);
                            }}
                        />

                        <NumberField
                            label="Monthly freezer-friendly grocery spend"
                            value={monthlyEligibleSpend}
                            prefix="$"
                            suffix="/mo"
                            step="10"
                            onChange={(value) => {
                                markStarted();
                                setMonthlyEligibleSpend(value);
                            }}
                        />

                        <NumberField
                            label="Typical stock-up discount"
                            value={averageDiscount}
                            suffix="%"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setAverageDiscount(value);
                            }}
                        />

                        <NumberField
                            label="Share you could buy at stock-up prices"
                            value={stockpileShare}
                            suffix="%"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setStockpileShare(value);
                            }}
                        />

                        <NumberField
                            label="Extra food wasted per year"
                            value={annualExtraWaste}
                            prefix="$"
                            suffix="/yr"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setAnnualExtraWaste(value);
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

                    <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use the freezer&apos;s EnergyGuide number when possible
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            The 215 kWh/year default is a general ENERGY STAR reference
                            for a certified chest freezer, not a prediction for every
                            model. Enter the annual energy use printed on the freezer&apos;s
                            EnergyGuide label when you are evaluating a specific model.
                        </p>
                    </div>

                    <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Only count purchases you would have made anyway
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Buying more food because you own a freezer is not automatically
                            a saving. The calculator works best when the stock-up purchases
                            replace food you would otherwise buy later at a higher price.
                        </p>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Freezer Economics
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Gross grocery savings"
                                value={formatCurrency(
                                    result.grossGrocerySavings,
                                )}
                                detail="Estimated annual savings before electricity and waste"
                            />

                            <ResultMetric
                                label="Annual electricity cost"
                                value={formatCurrency(
                                    result.annualElectricityCost,
                                )}
                                detail="Annual kWh multiplied by your electricity price"
                            />

                            <ResultMetric
                                label="Net annual savings"
                                value={formatCurrency(
                                    result.netAnnualSavings,
                                )}
                                detail="Grocery savings minus electricity and additional waste"
                            />

                            <ResultMetric
                                label="Freezer payback"
                                value={
                                    result.paybackYears === null
                                        ? "No payback"
                                        : `${formatNumber(
                                            result.paybackYears,
                                            1,
                                        )} years`
                                }
                                detail={
                                    result.paybackYears === null
                                        ? "Current assumptions do not produce positive annual savings"
                                        : "Purchase price divided by estimated net annual savings"
                                }
                            />

                            <ResultMetric
                                label={`${formatNumber(
                                    result.comparisonYears,
                                    0,
                                )}-year net result`}
                                value={formatCurrency(
                                    result.netAfterPeriod,
                                )}
                                detail={
                                    result.netAfterPeriod >= 0
                                        ? "Estimated operating savings exceed the freezer purchase price"
                                        : "Estimated savings have not yet recovered the purchase price"
                                }
                            />

                            <ResultMetric
                                label="Required monthly savings"
                                value={formatCurrency(
                                    result.requiredMonthlyGrossSavings,
                                )}
                                detail={`Gross grocery savings needed each month to recover the freezer within ${formatNumber(
                                    result.comparisonYears,
                                    0,
                                )} years`}
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Your break-even discount
                            </p>

                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                {result.requiredDiscount === null
                                    ? "Enter some freezer-friendly grocery spending and a stock-up share to calculate a break-even discount."
                                    : `Under these assumptions, the purchases you shift to stock-up pricing would need to average about ${formatNumber(
                                        result.requiredDiscount,
                                        1,
                                    )}% below your normal price for the freezer to recover its purchase price within ${formatNumber(
                                        result.comparisonYears,
                                        0,
                                    )} years.`}
                            </p>
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Food waste can erase the economics quickly
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The calculator treats additional food that is purchased but
                                never eaten as a direct cost. Good organization, labeling,
                                rotation, and realistic buying habits matter just as much as
                                finding a sale.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Chest Freezer Payback Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your grocery habits to estimate payback.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at least one
                            field to calculate whether a freezer could make financial sense
                            for your household.
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
                    <span className="text-[var(--muted)]">
                        {prefix}
                    </span>
                ) : null}

                <input
                    type="number"
                    min="0"
                    step={step}
                    inputMode="decimal"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
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