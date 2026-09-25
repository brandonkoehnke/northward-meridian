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

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
    }).format(value);
}

function formatMonths(value: number) {
    if (!Number.isFinite(value)) {
        return "N/A";
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

export default function NasVsCloudRealityCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [cloudMonthlyCost, setCloudMonthlyCost] =
        useState("10");

    const [nasEnclosureCost, setNasEnclosureCost] =
        useState("300");

    const [driveCost, setDriveCost] =
        useState("150");

    const [driveCount, setDriveCount] =
        useState("2");

    const [usableCapacity, setUsableCapacity] =
        useState("4");

    const [powerWatts, setPowerWatts] =
        useState("20");

    const [electricityRate, setElectricityRate] =
        useState("0.20");

    const [annualMaintenance, setAnnualMaintenance] =
        useState("25");

    const [offsiteMonthlyCost, setOffsiteMonthlyCost] =
        useState("7");

    const [comparisonYears, setComparisonYears] =
        useState("5");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("nas_vs_cloud_reality_check_started", {
                tool: "nas_vs_cloud_reality_check",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const cloudMonthly =
            nonNegative(parseNumber(cloudMonthlyCost));

        const enclosure =
            nonNegative(parseNumber(nasEnclosureCost));

        const oneDrive =
            nonNegative(parseNumber(driveCost));

        const drives = Math.max(
            Math.round(parseNumber(driveCount)),
            1,
        );

        const capacity =
            nonNegative(parseNumber(usableCapacity));

        const watts =
            nonNegative(parseNumber(powerWatts));

        const kwhRate =
            nonNegative(parseNumber(electricityRate));

        const maintenance =
            nonNegative(parseNumber(annualMaintenance));

        const offsiteMonthly =
            nonNegative(parseNumber(offsiteMonthlyCost));

        const years = Math.max(
            nonNegative(parseNumber(comparisonYears)),
            1,
        );

        const months = years * 12;

        const nasHardwareCost =
            enclosure + oneDrive * drives;

        const annualElectricityKwh =
            (watts * 24 * 365) / 1000;

        const annualElectricityCost =
            annualElectricityKwh * kwhRate;

        const cloudTotal =
            cloudMonthly * months;

        const nasOperatingCost =
            (annualElectricityCost + maintenance) *
            years;

        const nasTotal =
            nasHardwareCost + nasOperatingCost;

        const offsiteTotal =
            offsiteMonthly * months;

        const nasWithOffsiteTotal =
            nasTotal + offsiteTotal;

        const nasMonthlyOperatingCost =
            (annualElectricityCost + maintenance) /
            12;

        const nasWithOffsiteMonthlyOperatingCost =
            nasMonthlyOperatingCost +
            offsiteMonthly;

        const nasBreakEvenDenominator =
            cloudMonthly -
            nasMonthlyOperatingCost;

        const nasBreakEvenMonths =
            nasBreakEvenDenominator > 0
                ? nasHardwareCost /
                nasBreakEvenDenominator
                : null;

        const protectedBreakEvenDenominator =
            cloudMonthly -
            nasWithOffsiteMonthlyOperatingCost;

        const protectedBreakEvenMonths =
            protectedBreakEvenDenominator > 0
                ? nasHardwareCost /
                protectedBreakEvenDenominator
                : null;

        const nasAnnualCostPerTb =
            capacity > 0 && years > 0
                ? nasTotal / years / capacity
                : null;

        const protectedNasAnnualCostPerTb =
            capacity > 0 && years > 0
                ? nasWithOffsiteTotal /
                years /
                capacity
                : null;

        return {
            years,
            capacity,
            nasHardwareCost,
            cloudTotal,
            nasTotal,
            offsiteTotal,
            nasWithOffsiteTotal,
            nasBreakEvenMonths,
            protectedBreakEvenMonths,
            nasAnnualCostPerTb,
            protectedNasAnnualCostPerTb,
        };
    }, [
        annualMaintenance,
        cloudMonthlyCost,
        comparisonYears,
        driveCost,
        driveCount,
        electricityRate,
        nasEnclosureCost,
        offsiteMonthlyCost,
        powerWatts,
        usableCapacity,
    ]);

    return (
        <section
            id="nas-vs-cloud-reality-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    NAS vs. Cloud Reality Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    When does owning your storage cost less than renting it?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare the recurring cost of cloud storage with the
                    hardware, electricity, maintenance, and optional off-site
                    backup costs of a NAS. The third comparison matters because
                    a local NAS and an off-site cloud copy solve different
                    parts of the backup problem.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Cloud storage cost"
                            value={cloudMonthlyCost}
                            prefix="$"
                            suffix="/month"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setCloudMonthlyCost(value);
                            }}
                        />

                        <NumberField
                            label="NAS enclosure cost"
                            value={nasEnclosureCost}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setNasEnclosureCost(value);
                            }}
                        />

                        <NumberField
                            label="Cost per hard drive"
                            value={driveCost}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setDriveCost(value);
                            }}
                        />

                        <NumberField
                            label="Number of drives"
                            value={driveCount}
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setDriveCount(value);
                            }}
                        />

                        <NumberField
                            label="Usable NAS capacity"
                            value={usableCapacity}
                            suffix="TB"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setUsableCapacity(value);
                            }}
                        />

                        <NumberField
                            label="Average NAS power draw"
                            value={powerWatts}
                            suffix="watts"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setPowerWatts(value);
                            }}
                        />

                        <NumberField
                            label="Electricity rate"
                            value={electricityRate}
                            prefix="$"
                            suffix="/kWh"
                            step="0.01"
                            onChange={(value) => {
                                markStarted();
                                setElectricityRate(value);
                            }}
                        />

                        <NumberField
                            label="Drive replacement / maintenance allowance"
                            value={annualMaintenance}
                            prefix="$"
                            suffix="/year"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setAnnualMaintenance(value);
                            }}
                        />

                        <NumberField
                            label="Optional off-site backup cost"
                            value={offsiteMonthlyCost}
                            prefix="$"
                            suffix="/month"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setOffsiteMonthlyCost(value);
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
                                    label={`${formatNumber(
                                        result.years,
                                    )}-year cloud cost`}
                                    value={formatCurrency(
                                        result.cloudTotal,
                                    )}
                                    detail="Recurring cloud-storage payments over the comparison period."
                                />

                                <ResultCard
                                    label={`${formatNumber(
                                        result.years,
                                    )}-year NAS cost`}
                                    value={formatCurrency(
                                        result.nasTotal,
                                    )}
                                    detail={`${formatCurrency(
                                        result.nasHardwareCost,
                                    )} upfront hardware plus modeled electricity and maintenance.`}
                                />

                                <ResultCard
                                    label="NAS + off-site backup"
                                    value={formatCurrency(
                                        result.nasWithOffsiteTotal,
                                    )}
                                    detail={`${formatCurrency(
                                        result.nasTotal,
                                    )} for the NAS plus ${formatCurrency(
                                        result.offsiteTotal,
                                    )} of modeled off-site backup.`}
                                />

                                <ResultCard
                                    label="NAS-only break-even"
                                    value={
                                        result.nasBreakEvenMonths ===
                                            null
                                            ? "No break-even"
                                            : formatMonths(
                                                result.nasBreakEvenMonths,
                                            )
                                    }
                                    detail={
                                        result.nasBreakEvenMonths ===
                                            null
                                            ? "Under these assumptions, the cloud subscription is no more expensive per month than the modeled NAS operating cost."
                                            : "Approximate time for avoided cloud payments to recover the NAS hardware cost."
                                    }
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    Over{" "}
                                    {formatNumber(result.years)} years,
                                    the entered cloud plan costs about{" "}
                                    {formatCurrency(result.cloudTotal)}.
                                    The modeled NAS costs about{" "}
                                    {formatCurrency(result.nasTotal)}.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    Adding the off-site backup amount you
                                    entered raises the NAS-based system to
                                    about{" "}
                                    {formatCurrency(
                                        result.nasWithOffsiteTotal,
                                    )}{" "}
                                    over the same period.
                                </p>

                                {result.protectedBreakEvenMonths !==
                                    null ? (
                                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                        Including off-site backup, the
                                        modeled NAS system reaches its
                                        hardware break-even against the
                                        entered cloud subscription after
                                        about{" "}
                                        {formatMonths(
                                            result.protectedBreakEvenMonths,
                                        )}
                                        .
                                    </p>
                                ) : (
                                    <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                        With the entered off-site backup cost,
                                        the NAS-based system does not reach a
                                        simple hardware break-even against the
                                        cloud subscription because its ongoing
                                        modeled cost is already as high as or
                                        higher than the cloud plan.
                                    </p>
                                )}

                                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                    The NAS provides{" "}
                                    {formatNumber(result.capacity)} TB of
                                    usable capacity under your input. Its
                                    modeled annual cost is about{" "}
                                    {result.nasAnnualCostPerTb === null
                                        ? "not available"
                                        : formatCurrency(
                                            result.nasAnnualCostPerTb,
                                        )}{" "}
                                    per usable TB per year, or about{" "}
                                    {result.protectedNasAnnualCostPerTb ===
                                        null
                                        ? "not available"
                                        : formatCurrency(
                                            result.protectedNasAnnualCostPerTb,
                                        )}{" "}
                                    per usable TB per year when the entered
                                    off-site backup is included.
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>Important:</strong> Cost is only one
                                part of the decision. A NAS can provide local
                                control, fast local access, and expandable
                                storage, but it also creates hardware,
                                maintenance, configuration, and backup
                                responsibilities. A local NAS by itself should
                                not be treated as equivalent to an independent
                                off-site backup.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to compare NAS and cloud
                                storage
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any input above to compare long-term
                                cloud cost, NAS ownership cost, and NAS cost
                                with an off-site backup.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        This is a planning model. It does not include every
                        possible cost, such as internet upgrades, UPS hardware,
                        data-recovery services, major NAS replacement, cloud
                        price changes, taxes, or the value of bundled cloud
                        features.
                    </p>
                </div>
            </div>
        </section>
    );
}