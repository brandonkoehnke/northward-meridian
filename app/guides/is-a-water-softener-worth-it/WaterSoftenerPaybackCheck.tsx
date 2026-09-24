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

export default function WaterSoftenerPaybackCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [waterHardness, setWaterHardness] =
        useState("12");

    const [householdSize, setHouseholdSize] =
        useState("3");

    const [dailyWaterUse, setDailyWaterUse] =
        useState("60");

    const [softenerCost, setSoftenerCost] =
        useState("1500");

    const [saltCostPerBag, setSaltCostPerBag] =
        useState("8");

    const [saltBagWeight, setSaltBagWeight] =
        useState("40");

    const [saltEfficiency, setSaltEfficiency] =
        useState("3500");

    const [regenWaterUse, setRegenWaterUse] =
        useState("5");

    const [waterUtilityCost, setWaterUtilityCost] =
        useState("8");

    const [annualMaintenance, setAnnualMaintenance] =
        useState("50");

    const [annualSavings, setAnnualSavings] =
        useState("200");

    const [comparisonYears, setComparisonYears] =
        useState("10");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("water_softener_payback_check_started", {
                tool: "water_softener_payback_check",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const hardness =
            nonNegative(parseNumber(waterHardness));

        const people = Math.max(
            Math.round(
                nonNegative(parseNumber(householdSize)),
            ),
            1,
        );

        const gallonsPerPerson =
            nonNegative(parseNumber(dailyWaterUse));

        const purchaseCost =
            nonNegative(parseNumber(softenerCost));

        const bagCost =
            nonNegative(parseNumber(saltCostPerBag));

        const bagWeight =
            nonNegative(parseNumber(saltBagWeight));

        const grainsPerPound = Math.max(
            nonNegative(parseNumber(saltEfficiency)),
            1,
        );

        const gallonsPerThousandGrains = nonNegative(
            parseNumber(regenWaterUse),
        );

        const utilityCost =
            nonNegative(parseNumber(waterUtilityCost));

        const maintenance =
            nonNegative(parseNumber(annualMaintenance));

        const savings =
            nonNegative(parseNumber(annualSavings));

        const years = Math.max(
            nonNegative(parseNumber(comparisonYears)),
            1,
        );

        const annualHouseholdGallons =
            people *
            gallonsPerPerson *
            365;

        const annualHardnessGrains =
            annualHouseholdGallons *
            hardness;

        const annualSaltPounds =
            annualHardnessGrains /
            grainsPerPound;

        const annualSaltCost =
            bagWeight > 0
                ? (annualSaltPounds / bagWeight) *
                bagCost
                : 0;

        const annualRegenerationWater =
            (annualHardnessGrains / 1000) *
            gallonsPerThousandGrains;

        const annualWaterCost =
            (annualRegenerationWater / 1000) *
            utilityCost;

        const annualOperatingCost =
            annualSaltCost +
            annualWaterCost +
            maintenance;

        const annualNetSavings =
            savings -
            annualOperatingCost;

        const paybackMonths =
            annualNetSavings > 0
                ? (purchaseCost / annualNetSavings) *
                12
                : null;

        const totalGrossSavings =
            savings * years;

        const totalOperatingCost =
            annualOperatingCost * years;

        const totalCostOfOwnership =
            purchaseCost +
            totalOperatingCost;

        const totalNetSavings =
            totalGrossSavings -
            totalCostOfOwnership;

        const annualWaterCostShare =
            annualOperatingCost > 0
                ? (annualWaterCost /
                    annualOperatingCost) *
                100
                : 0;

        return {
            people,
            annualHouseholdGallons,
            annualHardnessGrains,
            annualSaltPounds,
            annualSaltCost,
            annualRegenerationWater,
            annualWaterCost,
            annualOperatingCost,
            annualNetSavings,
            annualSavings: savings,
            paybackMonths,
            years,
            totalGrossSavings,
            totalOperatingCost,
            totalCostOfOwnership,
            totalNetSavings,
            annualWaterCostShare,
            hardness,
        };
    }, [
        annualMaintenance,
        annualSavings,
        dailyWaterUse,
        householdSize,
        regenWaterUse,
        saltBagWeight,
        saltCostPerBag,
        saltEfficiency,
        softenerCost,
        waterHardness,
        waterUtilityCost,
        comparisonYears,
    ]);

    return (
        <section
            id="water-softener-payback-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Water Softener Payback Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Can the savings justify the softener?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Enter your water hardness, household use, softener cost,
                    operating costs, and your own estimate of annual savings.
                    The tool models salt and regeneration water use, then
                    estimates operating cost, simple payback, and long-term
                    net cost.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Water hardness"
                            value={waterHardness}
                            suffix="grains/gal"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setWaterHardness(value);
                            }}
                        />

                        <NumberField
                            label="People in household"
                            value={householdSize}
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setHouseholdSize(value);
                            }}
                        />

                        <NumberField
                            label="Daily water use per person"
                            value={dailyWaterUse}
                            suffix="gal/day"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setDailyWaterUse(value);
                            }}
                        />

                        <NumberField
                            label="Softener and installation"
                            value={softenerCost}
                            prefix="$"
                            step="50"
                            onChange={(value) => {
                                markStarted();
                                setSoftenerCost(value);
                            }}
                        />

                        <NumberField
                            label="Salt cost"
                            value={saltCostPerBag}
                            prefix="$"
                            suffix="per bag"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setSaltCostPerBag(value);
                            }}
                        />

                        <NumberField
                            label="Bag weight"
                            value={saltBagWeight}
                            suffix="lb"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setSaltBagWeight(value);
                            }}
                        />

                        <NumberField
                            label="Salt efficiency"
                            value={saltEfficiency}
                            suffix="grains/lb"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setSaltEfficiency(value);
                            }}
                        />

                        <NumberField
                            label="Regeneration water use"
                            value={regenWaterUse}
                            suffix="gal / 1,000 grains"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setRegenWaterUse(value);
                            }}
                        />

                        <NumberField
                            label="Water and sewer cost"
                            value={waterUtilityCost}
                            prefix="$"
                            suffix="per 1,000 gal"
                            step="0.50"
                            onChange={(value) => {
                                markStarted();
                                setWaterUtilityCost(value);
                            }}
                        />

                        <NumberField
                            label="Annual maintenance"
                            value={annualMaintenance}
                            prefix="$"
                            suffix="/year"
                            step="10"
                            onChange={(value) => {
                                markStarted();
                                setAnnualMaintenance(value);
                            }}
                        />

                        <NumberField
                            label="Estimated annual savings"
                            value={annualSavings}
                            prefix="$"
                            suffix="/year"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setAnnualSavings(value);
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
                                    label="Annual salt use"
                                    value={`${formatNumber(
                                        result.annualSaltPounds,
                                    )} lb`}
                                    detail={`${formatCurrency(
                                        result.annualSaltCost,
                                    )} modeled annual salt cost.`}
                                />

                                <ResultCard
                                    label="Annual regeneration water"
                                    value={`${formatNumber(
                                        result.annualRegenerationWater,
                                    )} gal`}
                                    detail={`${formatCurrency(
                                        result.annualWaterCost,
                                    )} modeled annual water and sewer cost.`}
                                />

                                <ResultCard
                                    label="Annual softener operating cost"
                                    value={formatCurrency(
                                        result.annualOperatingCost,
                                    )}
                                    detail="Salt, regeneration water, and the maintenance amount you entered."
                                />

                                <ResultCard
                                    label="Simple payback"
                                    value={formatMonths(
                                        result.paybackMonths,
                                    )}
                                    detail={
                                        result.paybackMonths === null
                                            ? "The entered annual savings do not currently cover the modeled annual operating cost."
                                            : "Time required for modeled net annual savings to recover the purchase and installation cost."
                                    }
                                />
                            </div>

                            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the model says
                                </p>

                                <p className="mt-4 text-lg leading-8">
                                    Your modeled household use creates about{" "}
                                    {formatNumber(
                                        result.annualHardnessGrains /
                                        1000000,
                                    )}{" "}
                                    million grains of hardness to remove each
                                    year. At the efficiency settings entered,
                                    that corresponds to about{" "}
                                    {formatNumber(
                                        result.annualSaltPounds,
                                    )}{" "}
                                    pounds of salt and{" "}
                                    {formatNumber(
                                        result.annualRegenerationWater,
                                    )}{" "}
                                    gallons of regeneration water per year.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    Your modeled annual softener operating cost
                                    is about{" "}
                                    {formatCurrency(
                                        result.annualOperatingCost,
                                    )}
                                    . You entered{" "}
                                    {formatCurrency(
                                        result.annualSavings,
                                    )}{" "}
                                    leaving a modeled net annual{" "}
                                    {result.annualNetSavings >= 0
                                        ? "savings"
                                        : "cost"}{" "}
                                    of{" "}
                                    {formatCurrency(
                                        Math.abs(result.annualNetSavings),
                                    )}
                                    .
                                </p>

                                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                                    Over{" "}
                                    {formatNumber(result.years)} years, the
                                    modeled total cost of ownership is about{" "}
                                    {formatCurrency(
                                        result.totalCostOfOwnership,
                                    )}
                                    . Against{" "}
                                    {formatCurrency(
                                        result.totalGrossSavings,
                                    )}{" "}
                                    of entered savings, the model shows a net{" "}
                                    {result.totalNetSavings >= 0
                                        ? "savings"
                                        : "cost"}{" "}
                                    of{" "}
                                    {formatCurrency(
                                        Math.abs(
                                            result.totalNetSavings,
                                        ),
                                    )}
                                    .
                                </p>

                                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                    Water regeneration represents about{" "}
                                    {formatNumber(
                                        result.annualWaterCostShare,
                                    )}
                                    % of the modeled annual operating cost.
                                    Actual regeneration frequency and resource
                                    use depend on the softener, incoming water
                                    hardness, household demand, and control
                                    settings.
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>Important:</strong> This is a planning
                                model, not a prediction of future savings. The
                                annual savings input is supplied by you and can
                                include only benefits you consider financially
                                realistic. The model does not assign a dollar
                                value to comfort, water feel, appliance life,
                                or other benefits unless you include them in
                                your own savings estimate.
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Enter your numbers to estimate the payback
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                Adjust any input above to model annual resource
                                use, operating cost, simple payback, and
                                long-term net cost.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        The model uses hardness, household water use, salt
                        efficiency, regeneration water efficiency, local water
                        cost, maintenance, and your estimated annual savings.
                        EPA recommends demand-initiated regeneration and
                        efficient water and salt use when selecting and
                        operating a water softener.
                    </p>
                </div>
            </div>
        </section>
    );
}