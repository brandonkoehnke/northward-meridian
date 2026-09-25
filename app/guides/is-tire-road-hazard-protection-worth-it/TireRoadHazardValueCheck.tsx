"use client";

import { useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function clampNonNegative(value: number) {
    return Math.max(value, 0);
}

function clampPercent(value: number) {
    return Math.min(Math.max(value, 0), 100);
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

export default function TireRoadHazardValueCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [tirePrice, setTirePrice] =
        useState("200");
    const [tireCount, setTireCount] =
        useState("4");
    const [protectionCost, setProtectionCost] =
        useState("60");
    const [coveragePercent, setCoveragePercent] =
        useState("100");
    const [replacementServiceCost, setReplacementServiceCost] =
        useState("50");
    const [repairCost, setRepairCost] =
        useState("40");
    const [repairCoverage, setRepairCoverage] =
        useState("40");
    const [expectedReplacementClaims, setExpectedReplacementClaims] =
        useState("0");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("tire_road_hazard_value_check_started", {
                tool: "tire_road_hazard_value_check",
            });
        }

        setHasInteracted(true);
    };

    const tirePriceValue = clampNonNegative(
        parseNumber(tirePrice),
    );

    const tireCountValue = Math.max(
        Math.round(parseNumber(tireCount)),
        1,
    );

    const totalTireCost =
        tirePriceValue * tireCountValue;

    const protectionCostValue =
        clampNonNegative(
            parseNumber(protectionCost),
        );

    const coveragePercentValue = clampPercent(
        parseNumber(coveragePercent),
    );

    const replacementServiceCostValue =
        clampNonNegative(
            parseNumber(replacementServiceCost),
        );

    const repairCostValue =
        clampNonNegative(
            parseNumber(repairCost),
        );

    const repairCoverageValue = Math.min(
        clampNonNegative(
            parseNumber(repairCoverage),
        ),
        repairCostValue,
    );

    const expectedClaimsValue = clampNonNegative(
        parseNumber(expectedReplacementClaims),
    );

    const replacementBenefit =
        tirePriceValue *
        (coveragePercentValue / 100);

    const replacementSavings =
        Math.max(
            replacementBenefit -
            replacementServiceCostValue,
            0,
        );

    const repairSavings =
        repairCoverageValue;

    const coverageCostPercentage =
        totalTireCost > 0
            ? (protectionCostValue / totalTireCost) * 100
            : 0;

    const replacementClaimsToBreakEven =
        replacementSavings > 0
            ? protectionCostValue /
            replacementSavings
            : null;

    const expectedReplacementSavings =
        expectedClaimsValue *
        replacementSavings;

    const modeledNetValue =
        expectedReplacementSavings -
        protectionCostValue;

    const annualRepairSavings =
        repairSavings;

    return (
        <section
            id="tire-road-hazard-value-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Tire Road Hazard Value Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What would the protection need to save you?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Enter the price of your tires, what the road-hazard plan
                    costs, and what a covered replacement or repair would
                    actually save you. The tool calculates the break-even
                    number of covered tire events rather than assuming that
                    every policy is automatically worthwhile.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Price per tire"
                            value={tirePrice}
                            prefix="$"
                            step="10"
                            onChange={(value) => {
                                markStarted();
                                setTirePrice(value);
                            }}
                        />

                        <NumberField
                            label="Number of tires"
                            value={tireCount}
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setTireCount(value);
                            }}
                        />

                        <NumberField
                            label="Road-hazard protection cost"
                            value={protectionCost}
                            prefix="$"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setProtectionCost(value);
                            }}
                        />

                        <NumberField
                            label="Replacement benefit"
                            value={coveragePercent}
                            suffix="% of tire price"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setCoveragePercent(value);
                            }}
                        />

                        <NumberField
                            label="Uncovered replacement services"
                            value={replacementServiceCost}
                            prefix="$"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setReplacementServiceCost(value);
                            }}
                        />

                        <NumberField
                            label="Typical repair cost"
                            value={repairCost}
                            prefix="$"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setRepairCost(value);
                            }}
                        />

                        <NumberField
                            label="Repair reimbursement"
                            value={repairCoverage}
                            prefix="$"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setRepairCoverage(value);
                            }}
                        />

                        <NumberField
                            label="Covered replacements during protection period"
                            value={expectedReplacementClaims}
                            suffix=" replacements"
                            step="0.1"
                            onChange={(value) => {
                                markStarted();
                                setExpectedReplacementClaims(value);
                            }}
                        />
                    </div>

                    {hasInteracted ? (
                        <>
                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <ResultCard
                                    label="Total tire purchase"
                                    value={formatCurrency(
                                        totalTireCost,
                                    )}
                                    detail={`${tireCountValue} tires at ${formatCurrency(tirePriceValue)} each.`}
                                />

                                <ResultCard
                                    label="Protection cost vs. tire set"
                                    value={`${formatPercent(
                                        coverageCostPercentage,
                                    )}%`}
                                    detail={`${formatCurrency(
                                        protectionCostValue,
                                    )} for protection on a ${formatCurrency(
                                        totalTireCost,
                                    )} tire purchase.`}
                                />

                                <ResultCard
                                    label="Savings from one covered replacement"
                                    value={formatCurrency(
                                        replacementSavings,
                                    )}
                                    detail={
                                        replacementSavings > 0
                                            ? `Estimated ${formatCurrency(
                                                replacementBenefit,
                                            )} tire benefit less ${formatCurrency(
                                                replacementServiceCostValue,
                                            )} of uncovered replacement services.`
                                            : "The entered coverage does not currently produce a positive replacement savings amount."
                                    }
                                />

                                <ResultCard
                                    label="Replacement claims to break even"
                                    value={
                                        replacementClaimsToBreakEven ===
                                            null
                                            ? "N/A"
                                            : formatNumber(
                                                replacementClaimsToBreakEven,
                                            )
                                    }
                                    detail={
                                        replacementClaimsToBreakEven ===
                                            null
                                            ? "No positive replacement savings are modeled, so the protection cannot break even through tire replacement alone."
                                            : "This is the modeled number of covered tire replacements needed for replacement savings to equal the protection cost."
                                    }
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    {protectionCostValue === 0
                                        ? "Your entered road-hazard protection is free, so the decision is not about whether to buy the protection. It is about understanding what the coverage actually provides."
                                        : replacementClaimsToBreakEven ===
                                            null
                                            ? `At ${formatCurrency(
                                                protectionCostValue,
                                            )}, the entered protection does not recover its cost through the modeled tire-replacement benefit alone.`
                                            : replacementClaimsToBreakEven <= 1
                                                ? `One covered tire replacement would be enough to recover the ${formatCurrency(
                                                    protectionCostValue,
                                                )} protection cost under these assumptions.`
                                                : `You would need about ${formatNumber(
                                                    replacementClaimsToBreakEven,
                                                )} covered tire replacements to recover the ${formatCurrency(
                                                    protectionCostValue,
                                                )} protection cost under these assumptions.`}
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    {expectedClaimsValue > 0
                                        ? `With ${formatNumber(
                                            expectedClaimsValue,
                                        )} covered replacement${expectedClaimsValue === 1
                                            ? ""
                                            : "s"
                                        } entered for the protection period, the modeled replacement savings are ${formatCurrency(
                                            expectedReplacementSavings,
                                        )}, leaving a net modeled ${modeledNetValue >= 0
                                            ? "benefit"
                                            : "cost"
                                        } of ${formatCurrency(
                                            Math.abs(modeledNetValue),
                                        )} after the protection price.`
                                        : "Enter an estimate for how many replacement claims you might reasonably expect during the coverage period to see the modeled replacement economics."}
                                </p>

                                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                    Repairs are a separate consideration.
                                    Under your inputs, one covered repair
                                    would save about{" "}
                                    {formatCurrency(
                                        annualRepairSavings,
                                    )}
                                    , up to the reimbursement amount you
                                    entered. A policy can therefore provide
                                    value even when a replacement claim is not
                                    needed.
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>Important:</strong> This is a comparison
                                tool, not an actuarial prediction. Actual
                                coverage depends on the specific road-hazard
                                contract, the cause of tire damage, tire
                                condition, remaining tread, claim procedures,
                                coverage limits, and costs that the contract
                                excludes.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to see the value of the
                                protection
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any input above to estimate the protection
                                cost, savings from a covered replacement, and
                                the number of claims needed to break even.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        The calculator assumes the replacement benefit is
                        measured as a percentage of the tire&apos;s price and
                        separately subtracts replacement services that are not
                        covered. Actual contracts may use different
                        reimbursement rules.
                    </p>
                </div>
            </div>
        </section>
    );
}