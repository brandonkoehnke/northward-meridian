"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type TimeshareResaleComparisonProps = {
    id?: string;
};

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function calculateFutureMaintenance(
    annualFee: number,
    annualIncrease: number,
    years: number,
) {
    let total = 0;
    let currentFee = annualFee;

    for (let year = 0; year < years; year += 1) {
        total += currentFee;
        currentFee *= 1 + annualIncrease / 100;
    }

    return total;
}

function calculateLoanPayment(
    principal: number,
    annualRate: number,
    years: number,
) {
    if (principal <= 0 || years <= 0) {
        return 0;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) {
        return principal / months;
    }

    return (
        (principal * monthlyRate * (1 + monthlyRate) ** months) /
        ((1 + monthlyRate) ** months - 1)
    );
}

function calculateLoanTotal(
    principal: number,
    annualRate: number,
    years: number,
) {
    if (principal <= 0 || years <= 0) {
        return 0;
    }

    return calculateLoanPayment(principal, annualRate, years) * years * 12;
}

export default function TimeshareResaleComparison({
    id = "comparison",
}: TimeshareResaleComparisonProps) {
    const [developerPrice, setDeveloperPrice] = useState("30000");
    const [developerFinanced, setDeveloperFinanced] = useState("25000");
    const [developerApr, setDeveloperApr] = useState("15");
    const [developerLoanYears, setDeveloperLoanYears] = useState("10");
    const [developerMaintenance, setDeveloperMaintenance] = useState("1500");

    const [resalePrice, setResalePrice] = useState("5000");
    const [resaleFees, setResaleFees] = useState("800");
    const [resaleMaintenance, setResaleMaintenance] = useState("1500");

    const [maintenanceIncrease, setMaintenanceIncrease] = useState("4");
    const [ownershipYears, setOwnershipYears] = useState("15");
    const [nightsPerYear, setNightsPerYear] = useState("7");
    const [hotelNightlyCost, setHotelNightlyCost] = useState("350");

    const [sameBookingRights, setSameBookingRights] = useState(false);
    const [sameExchangeRights, setSameExchangeRights] = useState(false);
    const [benefitsVerified, setBenefitsVerified] = useState(false);
    const [assessmentsChecked, setAssessmentsChecked] = useState(false);
    const [transferRulesChecked, setTransferRulesChecked] = useState(false);

    const [hasInteracted, setHasInteracted] = useState(false);
    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("timeshare_comparison_started", {
                tool: "timeshare_developer_vs_resale",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const developerPriceValue = parseNumber(developerPrice);
        const developerFinancedValue = parseNumber(developerFinanced);
        const developerAprValue = parseNumber(developerApr);
        const developerLoanYearsValue = parseNumber(developerLoanYears);
        const developerMaintenanceValue = parseNumber(developerMaintenance);

        const resalePriceValue = parseNumber(resalePrice);
        const resaleFeesValue = parseNumber(resaleFees);
        const resaleMaintenanceValue = parseNumber(resaleMaintenance);

        const maintenanceIncreaseValue = parseNumber(maintenanceIncrease);
        const ownershipYearsValue = Math.max(1, parseNumber(ownershipYears));
        const nightsPerYearValue = Math.max(1, parseNumber(nightsPerYear));
        const hotelNightlyCostValue = parseNumber(hotelNightlyCost);

        const financedAmount = Math.min(
            Math.max(0, developerFinancedValue),
            Math.max(0, developerPriceValue),
        );

        const developerDownPayment = Math.max(
            0,
            developerPriceValue - financedAmount,
        );

        const developerLoanTotal = calculateLoanTotal(
            financedAmount,
            developerAprValue,
            developerLoanYearsValue,
        );

        const developerMaintenanceTotal = calculateFutureMaintenance(
            developerMaintenanceValue,
            maintenanceIncreaseValue,
            ownershipYearsValue,
        );

        const resaleMaintenanceTotal = calculateFutureMaintenance(
            resaleMaintenanceValue,
            maintenanceIncreaseValue,
            ownershipYearsValue,
        );

        const developerTotal =
            developerDownPayment +
            developerLoanTotal +
            developerMaintenanceTotal;

        const resaleTotal =
            resalePriceValue + resaleFeesValue + resaleMaintenanceTotal;

        const developerNights = ownershipYearsValue * nightsPerYearValue;
        const resaleNights = developerNights;

        const developerCostPerNight =
            developerNights > 0 ? developerTotal / developerNights : 0;

        const resaleCostPerNight =
            resaleNights > 0 ? resaleTotal / resaleNights : 0;

        const hotelAlternative =
            developerNights * hotelNightlyCostValue;

        let recommendation =
            "Compare the rights before treating the options as equivalent.";

        if (resaleTotal + 1000 < developerTotal) {
            recommendation =
                "The resale has a substantial cost advantage under these assumptions, but verify the ownership rights before treating the savings as real value.";
        } else if (developerTotal + 1000 < resaleTotal) {
            recommendation =
                "The developer option is not more expensive under these assumptions. Verify what additional rights or benefits explain the difference before deciding.";
        }

        const verifiedCount = [
            sameBookingRights,
            sameExchangeRights,
            benefitsVerified,
            assessmentsChecked,
            transferRulesChecked,
        ].filter(Boolean).length;

        return {
            developerTotal,
            resaleTotal,
            difference: developerTotal - resaleTotal,
            developerCostPerNight,
            resaleCostPerNight,
            hotelAlternative,
            recommendation,
            verifiedCount,
        };
    }, [
        assessmentsChecked,
        benefitsVerified,
        developerApr,
        developerFinanced,
        developerLoanYears,
        developerMaintenance,
        developerPrice,
        hotelNightlyCost,
        maintenanceIncrease,
        nightsPerYear,
        ownershipYears,
        resaleFees,
        resaleMaintenance,
        resalePrice,
        sameBookingRights,
        sameExchangeRights,
        transferRulesChecked,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("timeshare_comparison_result_changed", {
            tool: "timeshare_developer_vs_resale",
            developer_total_cost: Math.round(result.developerTotal),
            resale_total_cost: Math.round(result.resaleTotal),
            cost_difference: Math.round(result.difference),
            rights_verified_count: result.verifiedCount,
        });
    }, [
        result.developerTotal,
        result.resaleTotal,
        result.difference,
        result.verifiedCount,
    ]);

    return (
        <section
            id={id}
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Developer vs. Resale Comparison
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Compare the ownership you would actually pay for.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    This comparison estimates total ownership cost under the assumptions
                    you enter. It does not determine whether two timeshare memberships
                    provide equivalent rights or benefits.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Developer purchase
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Purchase price"
                                value={developerPrice}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setDeveloperPrice(value);
                                }}
                            />

                            <NumberField
                                label="Financed amount"
                                value={developerFinanced}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setDeveloperFinanced(value);
                                }}
                            />

                            <NumberField
                                label="Financing APR"
                                value={developerApr}
                                suffix="%"
                                onChange={(value) => {
                                    markStarted();
                                    setDeveloperApr(value);
                                }}
                            />

                            <NumberField
                                label="Loan term"
                                value={developerLoanYears}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setDeveloperLoanYears(value);
                                }}
                            />

                            <NumberField
                                label="Annual maintenance fee"
                                value={developerMaintenance}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setDeveloperMaintenance(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Resale purchase
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Purchase price"
                                value={resalePrice}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setResalePrice(value);
                                }}
                            />

                            <NumberField
                                label="Transfer / closing costs"
                                value={resaleFees}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setResaleFees(value);
                                }}
                            />

                            <NumberField
                                label="Annual maintenance fee"
                                value={resaleMaintenance}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setResaleMaintenance(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Ownership assumptions
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Expected annual maintenance increase"
                                value={maintenanceIncrease}
                                suffix="%"
                                onChange={(value) => {
                                    markStarted();
                                    setMaintenanceIncrease(value);
                                }}
                            />

                            <NumberField
                                label="Expected ownership period"
                                value={ownershipYears}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setOwnershipYears(value);
                                }}
                            />

                            <NumberField
                                label="Expected nights used each year"
                                value={nightsPerYear}
                                suffix=" nights"
                                onChange={(value) => {
                                    markStarted();
                                    setNightsPerYear(value);
                                }}
                            />

                            <NumberField
                                label="Comparable hotel / rental cost"
                                value={hotelNightlyCost}
                                prefix="$"
                                suffix=" / night"
                                onChange={(value) => {
                                    markStarted();
                                    setHotelNightlyCost(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Verify the ownership rights
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            These questions are not included in the cost calculation. They
                            help prevent you from comparing two memberships as though they
                            were identical when they may not be.
                        </p>

                        <div className="mt-5 space-y-4">
                            <CheckboxField
                                label="Same booking and reservation rights confirmed"
                                checked={sameBookingRights}
                                onChange={(checked) => {
                                    markStarted();
                                    setSameBookingRights(checked);
                                }}
                            />

                            <CheckboxField
                                label="Same exchange-program eligibility confirmed"
                                checked={sameExchangeRights}
                                onChange={(checked) => {
                                    markStarted();
                                    setSameExchangeRights(checked);
                                }}
                            />

                            <CheckboxField
                                label="Developer or club benefits that transfer have been verified"
                                checked={benefitsVerified}
                                onChange={(checked) => {
                                    markStarted();
                                    setBenefitsVerified(checked);
                                }}
                            />

                            <CheckboxField
                                label="Current maintenance fees and outstanding assessments have been checked"
                                checked={assessmentsChecked}
                                onChange={(checked) => {
                                    markStarted();
                                    setAssessmentsChecked(checked);
                                }}
                            />

                            <CheckboxField
                                label="Transfer rules, fees, and any right of first refusal have been checked"
                                checked={transferRulesChecked}
                                onChange={(checked) => {
                                    markStarted();
                                    setTransferRulesChecked(checked);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Comparison Result
                        </p>

                        <p className="mt-5 text-lg font-medium leading-8">
                            {result.recommendation}
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <ResultMetric
                                label="Developer"
                                value={formatCurrency(result.developerTotal)}
                                detail="Estimated total ownership cost"
                            />

                            <ResultMetric
                                label="Resale"
                                value={formatCurrency(result.resaleTotal)}
                                detail="Estimated total ownership cost"
                            />

                            <ResultMetric
                                label="Difference"
                                value={formatCurrency(Math.abs(result.difference))}
                                detail={
                                    result.difference >= 0
                                        ? "Estimated resale savings"
                                        : "Estimated developer cost advantage"
                                }
                            />
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <ResultMetric
                                label="Developer cost / night"
                                value={formatCurrency(result.developerCostPerNight)}
                                detail="Based on your usage assumption"
                            />

                            <ResultMetric
                                label="Resale cost / night"
                                value={formatCurrency(result.resaleCostPerNight)}
                                detail="Based on your usage assumption"
                            />

                            <ResultMetric
                                label="Hotel comparison"
                                value={formatCurrency(result.hotelAlternative)}
                                detail="Estimated lodging cost over the same nights"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">Rights verified</p>
                            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                {result.verifiedCount} of 5 key ownership questions checked.
                            </p>
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">Before treating the comparison as final</p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>• Confirm the exact ownership being transferred.</li>
                                <li>• Verify booking and exchange rights.</li>
                                <li>• Confirm which benefits transfer to resale.</li>
                                <li>• Check maintenance fees and outstanding assessments.</li>
                                <li>• Review transfer fees and restrictions.</li>
                                <li>• Read the actual contract and transfer documents.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Comparison Result
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your numbers to compare developer and resale ownership.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            Adjust the example assumptions above using the offers you&apos;re
                            considering. We&apos;ll compare estimated total ownership cost and cost
                            per night, while keeping ownership rights and benefits separate from the
                            math.
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
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
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

type CheckboxFieldProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

function CheckboxField({
    label,
    checked,
    onChange,
}: CheckboxFieldProps) {
    return (
        <label className="flex cursor-pointer items-start gap-3 leading-7">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="mt-1 h-5 w-5 accent-[var(--accent)]"
            />

            <span>{label}</span>
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