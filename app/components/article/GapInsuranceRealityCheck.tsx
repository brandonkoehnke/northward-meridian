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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function formatMonths(months: number) {
    if (months === 0) return "None";
    return `${months} month${months === 1 ? "" : "s"}`;
}

type ProjectionRow = {
    month: number;
    loanBalance: number;
    vehicleValue: number;
    gap: number;
};

export default function GapInsuranceRealityCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [loanBalance, setLoanBalance] = useState("30000");
    const [vehicleValue, setVehicleValue] = useState("26000");
    const [apr, setApr] = useState("6.5");
    const [monthlyPayment, setMonthlyPayment] = useState("650");
    const [annualDepreciation, setAnnualDepreciation] = useState("12");
    const [gapCost, setGapCost] = useState("700");
    const [deductible, setDeductible] = useState("500");
    const [coversDeductible, setCoversDeductible] = useState("no");
    const [monthsToModel, setMonthsToModel] = useState("60");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("gap_insurance_reality_check_started", {
                tool: "gap_insurance_reality_check",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const startingLoan = Math.max(parseNumber(loanBalance), 0);
        const startingValue = Math.max(parseNumber(vehicleValue), 0);
        const annualRate = Math.max(parseNumber(apr), 0) / 100;
        const payment = Math.max(parseNumber(monthlyPayment), 0);
        const depreciationRate =
            Math.max(parseNumber(annualDepreciation), 0) / 100;
        const quotedGapCost = Math.max(parseNumber(gapCost), 0);
        const physicalDamageDeductible = Math.max(parseNumber(deductible), 0);

        const coverageMonths = Math.min(
            Math.max(Math.round(parseNumber(monthsToModel)), 1),
            120,
        );

        const monthlyRate = annualRate / 12;

        const monthlyDepreciationFactor = Math.max(
            1 - depreciationRate,
            0,
        ) ** (1 / 12);

        const rows: ProjectionRow[] = [
            {
                month: 0,
                loanBalance: startingLoan,
                vehicleValue: startingValue,
                gap: Math.max(startingLoan - startingValue, 0),
            },
        ];

        for (let month = 1; month <= coverageMonths; month += 1) {
            const previous = rows[rows.length - 1];

            const interest = previous.loanBalance * monthlyRate;

            const nextLoanBalance = Math.max(
                previous.loanBalance + interest - payment,
                0,
            );

            const nextVehicleValue = Math.max(
                previous.vehicleValue * monthlyDepreciationFactor,
                0,
            );

            const nextGap = Math.max(
                nextLoanBalance - nextVehicleValue,
                0,
            );

            rows.push({
                month,
                loanBalance: nextLoanBalance,
                vehicleValue: nextVehicleValue,
                gap: nextGap,
            });

            if (nextLoanBalance === 0 && nextVehicleValue === 0) {
                break;
            }
        }

        const peak = rows.reduce((highest, row) =>
            row.gap > highest.gap ? row : highest,
        );

        const gapWindowStart =
            rows.find((row) => row.gap > 0)?.month ?? null;

        const gapWindowEnd =
            rows.find(
                (row, index) =>
                    index > 0 &&
                    row.gap === 0 &&
                    rows[index - 1].gap > 0,
            )?.month ?? null;

        let underwaterMonths = 0;

        for (const row of rows) {
            if (row.gap > 0) {
                underwaterMonths += 1;
            }
        }

        const currentGap = rows[0].gap;

        const currentOutOfPocket =
            currentGap +
            (coversDeductible === "yes"
                ? 0
                : physicalDamageDeductible);

        const peakOutOfPocket =
            peak.gap +
            (coversDeductible === "yes"
                ? 0
                : physicalDamageDeductible);

        const gapCostVsPeakExposure =
            peak.gap > 0
                ? (quotedGapCost / peak.gap) * 100
                : null;

        return {
            rows,
            currentGap,
            currentOutOfPocket,
            peak,
            peakOutOfPocket,
            gapWindowStart,
            gapWindowEnd,
            underwaterMonths,
            gapCostVsPeakExposure,
            quotedGapCost,
            physicalDamageDeductible,
            coversDeductible: coversDeductible === "yes",
            coverageMonths,
        };
    }, [
        annualDepreciation,
        apr,
        coversDeductible,
        deductible,
        gapCost,
        loanBalance,
        monthlyPayment,
        monthsToModel,
        vehicleValue,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("gap_insurance_reality_check_changed", {
            tool: "gap_insurance_reality_check",
        });
    }, [
        annualDepreciation,
        apr,
        coversDeductible,
        deductible,
        gapCost,
        loanBalance,
        monthlyPayment,
        monthsToModel,
        vehicleValue,
    ]);

    return (
        <section
            id="gap-insurance-reality-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    GAP Insurance Reality Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    How much could GAP coverage protect, and for how long?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Enter your current loan payoff, vehicle value, payment, APR,
                    estimated depreciation, and the GAP price you were quoted. The
                    calculator projects the loan-versus-value gap month by month so you
                    can see the exposure rather than judging coverage from a single
                    snapshot.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Current loan payoff"
                            value={loanBalance}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setLoanBalance(value);
                            }}
                        />

                        <NumberField
                            label="Estimated vehicle value today"
                            value={vehicleValue}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setVehicleValue(value);
                            }}
                        />

                        <NumberField
                            label="Loan APR"
                            value={apr}
                            suffix="%"
                            step="0.1"
                            onChange={(value) => {
                                markStarted();
                                setApr(value);
                            }}
                        />

                        <NumberField
                            label="Monthly loan payment"
                            value={monthlyPayment}
                            prefix="$"
                            step="10"
                            onChange={(value) => {
                                markStarted();
                                setMonthlyPayment(value);
                            }}
                        />

                        <NumberField
                            label="Estimated annual depreciation"
                            value={annualDepreciation}
                            suffix="%"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setAnnualDepreciation(value);
                            }}
                        />

                        <NumberField
                            label="GAP price"
                            value={gapCost}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setGapCost(value);
                            }}
                        />

                        <NumberField
                            label="Collision/comprehensive deductible"
                            value={deductible}
                            prefix="$"
                            step="50"
                            onChange={(value) => {
                                markStarted();
                                setDeductible(value);
                            }}
                        />

                        <label className="block text-sm font-medium">
                            Does your GAP contract cover the deductible?

                            <select
                                value={coversDeductible}
                                onChange={(event) => {
                                    markStarted();
                                    setCoversDeductible(event.target.value);
                                }}
                                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--accent)]"
                            >
                                <option value="no">
                                    No / I don&apos;t know
                                </option>
                                <option value="yes">
                                    Yes, the contract says it does
                                </option>
                            </select>
                        </label>

                        <NumberField
                            label="Months to project"
                            value={monthsToModel}
                            suffix=" months"
                            step="6"
                            onChange={(value) => {
                                markStarted();
                                setMonthsToModel(value);
                            }}
                        />
                    </div>

                    {hasInteracted ? (
                        <>
                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <ResultCard
                                    label="Loan-value gap today"
                                    value={formatCurrency(result.currentGap)}
                                    detail={
                                        result.currentGap > 0
                                            ? "This is the amount by which your current payoff exceeds the estimated vehicle value."
                                            : "Your estimated vehicle value currently covers the loan payoff."
                                    }
                                />

                                <ResultCard
                                    label="Peak modeled gap"
                                    value={formatCurrency(result.peak.gap)}
                                    detail={
                                        result.peak.gap > 0
                                            ? `Largest projected gap at month ${result.peak.month}.`
                                            : "No gap is projected under these assumptions."
                                    }
                                />

                                <ResultCard
                                    label="Modeled underwater window"
                                    value={formatMonths(result.underwaterMonths)}
                                    detail={
                                        result.gapWindowEnd !== null
                                            ? `The model reaches $0 gap again around month ${result.gapWindowEnd}.`
                                            : result.underwaterMonths > 0
                                                ? "A gap remains at the end of the projection."
                                                : "No modeled underwater period."
                                    }
                                />

                                <ResultCard
                                    label="GAP price vs. peak exposure"
                                    value={
                                        result.gapCostVsPeakExposure === null
                                            ? "N/A"
                                            : `${result.gapCostVsPeakExposure.toFixed(1)}%`
                                    }
                                    detail={
                                        result.gapCostVsPeakExposure === null
                                            ? "There is no modeled loan-value gap to compare with the quoted GAP price."
                                            : `${formatCurrency(result.quotedGapCost)} is about ${result.gapCostVsPeakExposure.toFixed(1)}% of the largest modeled ${formatCurrency(result.peak.gap)} loan-value gap.`
                                    }
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    {result.currentGap > 0
                                        ? `You are currently estimated to owe ${formatCurrency(result.currentGap)} more than the vehicle is worth.`
                                        : "You are not currently estimated to be underwater on the loan."}
                                </p>

                                <p className="mt-3 text-lg leading-8 text-[var(--muted)]">
                                    {result.peak.gap > 0
                                        ? `Under the depreciation and loan assumptions entered above, the largest modeled loan-value gap is ${formatCurrency(result.peak.gap)} at month ${result.peak.month}.`
                                        : "Under the assumptions entered above, the loan balance does not exceed the estimated vehicle value during the projection."}
                                </p>

                                {result.gapCostVsPeakExposure !== null ? (
                                    <p className="mt-3 text-lg leading-8 text-[var(--muted)]">
                                        Your {formatCurrency(result.quotedGapCost)} GAP price is
                                        about{" "}
                                        {result.gapCostVsPeakExposure.toFixed(1)}% of the largest
                                        modeled {formatCurrency(result.peak.gap)} loan-value gap.
                                        That percentage is a comparison of price and exposure, not
                                        the probability that GAP will pay a claim or an actuarial
                                        break-even point.
                                    </p>
                                ) : null}

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    A total-loss claim can involve your physical-damage
                                    deductible, and GAP contracts differ in whether and how they
                                    address that deductible.
                                    {result.coversDeductible
                                        ? " You selected a contract that says it covers your deductible."
                                        : " The calculator therefore assumes your deductible remains your responsibility."}
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                The projection is an estimate. Actual cash value is determined
                                by the primary insurer at the time of loss, and your GAP policy
                                may have limits, exclusions, cancellation rules, or a different
                                definition of the covered gap.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to see your GAP exposure
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any of the inputs above to estimate your current
                                loan-value gap, peak modeled gap, and how long you may remain
                                underwater.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        <strong>Important:</strong> This tool does not estimate the
                        probability of a total loss, so it does not produce an actuarial
                        &ldquo;worth it&rdquo; answer. It is designed to show the size and
                        duration of the financial exposure that GAP coverage is intended to
                        address.
                    </p>
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
                    <span className="text-[var(--muted)]">{prefix}</span>
                ) : null}

                <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step={step}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 text-base outline-none"
                />

                {suffix ? (
                    <span className="text-[var(--muted)]">{suffix}</span>
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