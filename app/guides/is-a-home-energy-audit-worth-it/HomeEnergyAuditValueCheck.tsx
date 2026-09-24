"use client";

import { useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
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

function formatMonths(value: number | null) {
    if (value === null || !Number.isFinite(value)) {
        return "No payback";
    }

    if (value < 1) {
        return "Less than 1 month";
    }

    if (value < 24) {
        return `${Math.ceil(value)} months`;
    }

    return `${formatNumber(value / 12)} years`;
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

export default function HomeEnergyAuditValueCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [auditCost, setAuditCost] =
        useState("400");

    const [incentive, setIncentive] =
        useState("0");

    const [annualEnergyCost, setAnnualEnergyCost] =
        useState("3000");

    const [projectCost, setProjectCost] =
        useState("8000");

    const [estimatedAnnualSavings, setEstimatedAnnualSavings] =
        useState("300");

    const [comparisonYears, setComparisonYears] =
        useState("10");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("home_energy_audit_value_check_started", {
                tool: "home_energy_audit_value_check",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const grossAuditCost =
            nonNegative(parseNumber(auditCost));

        const incentiveAmount =
            nonNegative(parseNumber(incentive));

        const currentAnnualEnergyCost =
            nonNegative(parseNumber(annualEnergyCost));

        const contemplatedProjectCost =
            nonNegative(parseNumber(projectCost));

        const annualSavings =
            nonNegative(
                parseNumber(estimatedAnnualSavings),
            );

        const years = Math.max(
            nonNegative(parseNumber(comparisonYears)),
            1,
        );

        const netAuditCost = Math.max(
            grossAuditCost - incentiveAmount,
            0,
        );

        const auditCostAsProjectPercent =
            contemplatedProjectCost > 0
                ? (netAuditCost /
                    contemplatedProjectCost) *
                100
                : null;

        const auditCostAsAnnualEnergyPercent =
            currentAnnualEnergyCost > 0
                ? (netAuditCost /
                    currentAnnualEnergyCost) *
                100
                : null;

        const annualSavingsNeeded =
            netAuditCost / years;

        const energySavingsRateNeeded =
            currentAnnualEnergyCost > 0
                ? (annualSavingsNeeded /
                    currentAnnualEnergyCost) *
                100
                : null;

        const simplePaybackMonths =
            annualSavings > 0
                ? (netAuditCost / annualSavings) *
                12
                : null;

        const totalEnteredSavings =
            annualSavings * years;

        const totalNetValue =
            totalEnteredSavings -
            netAuditCost;

        return {
            grossAuditCost,
            incentiveAmount,
            currentAnnualEnergyCost,
            contemplatedProjectCost,
            annualSavings,
            years,
            netAuditCost,
            auditCostAsProjectPercent,
            auditCostAsAnnualEnergyPercent,
            annualSavingsNeeded,
            energySavingsRateNeeded,
            simplePaybackMonths,
            totalEnteredSavings,
            totalNetValue,
        };
    }, [
        annualEnergyCost,
        auditCost,
        comparisonYears,
        estimatedAnnualSavings,
        incentive,
        projectCost,
    ]);

    return (
        <section
            id="home-energy-audit-value-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Home Energy Audit Value Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    How much value would the audit need to create?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    An energy audit does not save energy by itself. Its value
                    comes from helping you identify improvements or avoid
                    spending money on the wrong project. Enter the audit cost,
                    any incentive, your annual energy spending, and the project
                    you are considering to see how large the required payoff
                    would be.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Professional audit cost"
                            value={auditCost}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setAuditCost(value);
                            }}
                        />

                        <NumberField
                            label="Audit incentive or rebate"
                            value={incentive}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setIncentive(value);
                            }}
                        />

                        <NumberField
                            label="Current annual energy spending"
                            value={annualEnergyCost}
                            prefix="$"
                            suffix="/year"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAnnualEnergyCost(value);
                            }}
                        />

                        <NumberField
                            label="Major project you are considering"
                            value={projectCost}
                            prefix="$"
                            step="500"
                            onChange={(value) => {
                                markStarted();
                                setProjectCost(value);
                            }}
                        />

                        <NumberField
                            label="Estimated annual savings"
                            value={estimatedAnnualSavings}
                            prefix="$"
                            suffix="/year"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setEstimatedAnnualSavings(value);
                            }}
                        />

                        <NumberField
                            label="Comparison period"
                            value={comparisonYears}
                            suffix="years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setComparisonYears(value);
                            }}
                        />
                    </div>

                    {hasInteracted ? (
                        <>
                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <ResultCard
                                    label="Net audit cost"
                                    value={formatCurrency(
                                        result.netAuditCost,
                                    )}
                                    detail={`${formatCurrency(
                                        result.grossAuditCost,
                                    )} audit price less ${formatCurrency(
                                        result.incentiveAmount,
                                    )} of entered incentives.`}
                                />

                                <ResultCard
                                    label="Audit cost vs. project"
                                    value={
                                        result.auditCostAsProjectPercent ===
                                            null
                                            ? "N/A"
                                            : `${formatPercent(
                                                result.auditCostAsProjectPercent,
                                            )}%`
                                    }
                                    detail={
                                        result.auditCostAsProjectPercent ===
                                            null
                                            ? "Enter a project cost to compare the audit price with the spending decision it may help inform."
                                            : `${formatCurrency(
                                                result.netAuditCost,
                                            )} audit cost compared with the ${formatCurrency(
                                                result.contemplatedProjectCost,
                                            )} project you entered.`
                                    }
                                />

                                <ResultCard
                                    label="Annual savings needed"
                                    value={formatCurrency(
                                        result.annualSavingsNeeded,
                                    )}
                                    detail={`Over ${formatNumber(
                                        result.years,
                                    )} years, the audit would need this much annual savings to recover its own net cost.`}
                                />

                                <ResultCard
                                    label="Energy savings needed"
                                    value={
                                        result.energySavingsRateNeeded ===
                                            null
                                            ? "N/A"
                                            : `${formatPercent(
                                                result.energySavingsRateNeeded,
                                            )}%`
                                    }
                                    detail={
                                        result.energySavingsRateNeeded ===
                                            null
                                            ? "Enter annual energy spending to calculate the equivalent percentage."
                                            : `Percentage of your current ${formatCurrency(
                                                result.currentAnnualEnergyCost,
                                            )} annual energy spending needed to recover the audit cost over the comparison period.`
                                    }
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    Your net audit cost is{" "}
                                    {formatCurrency(
                                        result.netAuditCost,
                                    )}
                                    . Over{" "}
                                    {formatNumber(result.years)} years,
                                    the audit itself would need to lead to
                                    about{" "}
                                    {formatCurrency(
                                        result.annualSavingsNeeded,
                                    )}{" "}
                                    per year of real financial benefit to
                                    recover that cost.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    That is equivalent to about{" "}
                                    {result.energySavingsRateNeeded === null
                                        ? "an uncalculated share"
                                        : `${formatPercent(
                                            result.energySavingsRateNeeded,
                                        )}%`}{" "}
                                    of the annual energy spending you entered.
                                </p>

                                {result.contemplatedProjectCost >
                                    0 ? (
                                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                        The audit also represents about{" "}
                                        {formatPercent(
                                            result.auditCostAsProjectPercent ??
                                            0,
                                        )}
                                        % of the{" "}
                                        {formatCurrency(
                                            result.contemplatedProjectCost,
                                        )}{" "}
                                        project you are considering.
                                    </p>
                                ) : null}

                                {result.simplePaybackMonths !==
                                    null ? (
                                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                        Using your entered estimate of{" "}
                                        {formatCurrency(
                                            result.annualSavings,
                                        )}{" "}
                                        in annual savings, the modeled
                                        payback for the audit itself is{" "}
                                        {formatMonths(
                                            result.simplePaybackMonths,
                                        )}
                                        .
                                    </p>
                                ) : (
                                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                        No audit payback is modeled because
                                        the entered annual savings are zero.
                                    </p>
                                )}

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    Over the full comparison period, the
                                    entered savings total{" "}
                                    {formatCurrency(
                                        result.totalEnteredSavings,
                                    )}
                                    , leaving a modeled net{" "}
                                    {result.totalNetValue >= 0
                                        ? "benefit"
                                        : "cost"}{" "}
                                    of{" "}
                                    {formatCurrency(
                                        Math.abs(
                                            result.totalNetValue,
                                        ),
                                    )}{" "}
                                    after the audit cost.
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>Important:</strong> The calculator
                                does not predict energy savings from an audit.
                                The annual-savings input is your own scenario.
                                An audit may also have value by helping you
                                avoid an ineffective project or identify a
                                problem before spending on improvements. Those
                                benefits are not automatically assigned a
                                dollar value here.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to estimate the audit value
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any input above to compare the audit cost
                                with your potential project, current energy
                                spending, and your own savings estimate.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        This is a planning model. It does not estimate the
                        probability that an audit will identify a successful
                        project, the future price of energy, or the value of
                        nonfinancial benefits such as improved comfort.
                    </p>
                </div>
            </div>
        </section>
    );
}