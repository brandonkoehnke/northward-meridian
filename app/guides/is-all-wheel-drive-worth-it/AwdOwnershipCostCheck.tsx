"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(
        value.replace(/[^0-9.-]/g, ""),
    );

    return Number.isFinite(parsed)
        ? parsed
        : 0;
}

function formatCurrency(
    value: number,
    digits = 0,
) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

function formatNumber(
    value: number,
    digits = 1,
) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

export default function AwdOwnershipCostCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [awdPremium, setAwdPremium] =
        useState("1500");

    const [fwdMpg, setFwdMpg] =
        useState("30");

    const [awdMpg, setAwdMpg] =
        useState("28");

    const [annualMiles, setAnnualMiles] =
        useState("12000");

    const [fuelPrice, setFuelPrice] =
        useState("3.50");

    const [ownershipYears, setOwnershipYears] =
        useState("7");

    const [
        additionalMaintenance,
        setAdditionalMaintenance,
    ] = useState("200");

    const [
        expectedResaleAdvantage,
        setExpectedResaleAdvantage,
    ] = useState("800");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "awd_ownership_cost_check_started",
                {
                    tool:
                        "awd_ownership_cost_check",
                },
            );
        }

        setHasInteracted(true);
    };

    const purchasePremium = Math.max(
        parseNumber(awdPremium),
        0,
    );

    const fwdEfficiency = Math.max(
        parseNumber(fwdMpg),
        0,
    );

    const awdEfficiency = Math.max(
        parseNumber(awdMpg),
        0,
    );

    const milesPerYear = Math.max(
        parseNumber(annualMiles),
        0,
    );

    const gasPrice = Math.max(
        parseNumber(fuelPrice),
        0,
    );

    const years = Math.max(
        parseNumber(ownershipYears),
        0,
    );

    const maintenanceDifference =
        Math.max(
            parseNumber(
                additionalMaintenance,
            ),
            0,
        );

    const resaleRecovery = Math.max(
        parseNumber(
            expectedResaleAdvantage,
        ),
        0,
    );

    const fwdAnnualGallons =
        fwdEfficiency > 0
            ? milesPerYear / fwdEfficiency
            : null;

    const awdAnnualGallons =
        awdEfficiency > 0
            ? milesPerYear / awdEfficiency
            : null;

    const fwdAnnualFuelCost =
        fwdAnnualGallons !== null
            ? fwdAnnualGallons * gasPrice
            : null;

    const awdAnnualFuelCost =
        awdAnnualGallons !== null
            ? awdAnnualGallons * gasPrice
            : null;

    const additionalAnnualFuelCost =
        fwdAnnualFuelCost !== null &&
            awdAnnualFuelCost !== null
            ? awdAnnualFuelCost -
            fwdAnnualFuelCost
            : null;

    const additionalFuelOverOwnership =
        additionalAnnualFuelCost !== null
            ? additionalAnnualFuelCost *
            years
            : null;

    const netAwdOwnershipPremium =
        additionalFuelOverOwnership !== null
            ? purchasePremium +
            additionalFuelOverOwnership +
            maintenanceDifference -
            resaleRecovery
            : null;

    const annualizedAwdPremium =
        netAwdOwnershipPremium !== null &&
            years > 0
            ? netAwdOwnershipPremium /
            years
            : null;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "awd_ownership_cost_check_changed",
            {
                tool:
                    "awd_ownership_cost_check",
            },
        );
    }, [
        awdPremium,
        fwdMpg,
        awdMpg,
        annualMiles,
        fuelPrice,
        ownershipYears,
        additionalMaintenance,
        expectedResaleAdvantage,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (
        fwdEfficiency <= 0 ||
        awdEfficiency <= 0
    ) {
        resultHeading =
            "Add fuel-economy estimates for both versions.";

        resultDescription =
            "The calculator needs MPG values for the two vehicles to estimate their annual fuel-cost difference.";
    } else if (years <= 0) {
        resultHeading =
            "Add an expected ownership period.";

        resultDescription =
            "The calculator can show annual fuel use, but the long-term AWD ownership premium requires an ownership period.";
    } else if (
        netAwdOwnershipPremium !== null &&
        netAwdOwnershipPremium > 0
    ) {
        resultHeading =
            "Your inputs show an additional cost for choosing AWD.";

        resultDescription =
            "Under the assumptions you entered, the AWD version costs more overall after accounting for purchase price, fuel, maintenance, and expected resale value.";
    } else if (
        netAwdOwnershipPremium !== null &&
        netAwdOwnershipPremium < 0
    ) {
        resultHeading =
            "Your inputs show AWD costing less over the ownership period.";
        resultDescription =
            "Under the assumptions you entered, the AWD version costs less overall after accounting for purchase price, fuel, maintenance, and expected resale value. Verify any large resale or maintenance assumptions before relying on this result.";

    } else {
        resultHeading =
            "Your inputs show little or no net ownership-cost difference.";

        resultDescription =
            "The financial comparison is approximately even under the assumptions you entered. Traction needs and other practical differences may therefore carry more weight in the decision.";
    }

    return (
        <section
            id="awd-ownership-cost-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    AWD Ownership Cost &amp; Use-Case Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What does AWD cost over the time you own the vehicle?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare the purchase price, fuel use,
                    maintenance difference, and resale value
                    of otherwise comparable AWD and
                    front-wheel-drive vehicles.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Vehicle comparison
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="AWD purchase premium"
                            value={awdPremium}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAwdPremium(value);
                            }}
                        />

                        <NumberField
                            label="Expected ownership"
                            value={ownershipYears}
                            suffix="years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setOwnershipYears(
                                    value,
                                );
                            }}
                        />

                        <NumberField
                            label="FWD / 2WD fuel economy"
                            value={fwdMpg}
                            suffix="MPG"
                            step="0.1"
                            onChange={(value) => {
                                markStarted();
                                setFwdMpg(value);
                            }}
                        />

                        <NumberField
                            label="AWD fuel economy"
                            value={awdMpg}
                            suffix="MPG"
                            step="0.1"
                            onChange={(value) => {
                                markStarted();
                                setAwdMpg(value);
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Compare equivalent versions of the same vehicle when possible
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            AWD may be bundled with a different
                            trim, engine, wheel size, or other
                            equipment. Use prices and fuel-economy
                            figures that isolate the drivetrain
                            difference as closely as your vehicle
                            choices allow.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Driving
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Miles driven per year"
                                value={annualMiles}
                                suffix="miles"
                                step="1000"
                                onChange={(value) => {
                                    markStarted();
                                    setAnnualMiles(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Fuel price"
                                value={fuelPrice}
                                prefix="$"
                                suffix="/gal"
                                step="0.10"
                                onChange={(value) => {
                                    markStarted();
                                    setFuelPrice(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Other ownership differences
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Additional AWD maintenance"
                                value={
                                    additionalMaintenance
                                }
                                prefix="$"
                                suffix="total"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setAdditionalMaintenance(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Expected AWD resale advantage"
                                value={
                                    expectedResaleAdvantage
                                }
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setExpectedResaleAdvantage(
                                        value,
                                    );
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Treat maintenance and resale as user assumptions
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                AWD maintenance requirements and
                                resale values vary by vehicle. Use
                                the specific maintenance schedules,
                                market values, or reasonable
                                estimates for the vehicles you are
                                comparing. Enter zero when you do
                                not have evidence for a difference.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your results
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="FWD annual fuel use"
                                value={
                                    fwdAnnualGallons !==
                                        null
                                        ? `${formatNumber(
                                            fwdAnnualGallons,
                                            0,
                                        )} gal`
                                        : "Not available"
                                }
                                detail="Annual miles divided by the FWD / 2WD fuel economy you entered."
                            />

                            <ResultMetric
                                label="AWD annual fuel use"
                                value={
                                    awdAnnualGallons !==
                                        null
                                        ? `${formatNumber(
                                            awdAnnualGallons,
                                            0,
                                        )} gal`
                                        : "Not available"
                                }
                                detail="Annual miles divided by the AWD fuel economy you entered."
                            />

                            <ResultMetric
                                label="FWD annual fuel cost"
                                value={
                                    fwdAnnualFuelCost !==
                                        null
                                        ? formatCurrency(
                                            fwdAnnualFuelCost,
                                        )
                                        : "Not available"
                                }
                                detail="Estimated annual FWD / 2WD fuel use multiplied by your fuel price."
                            />

                            <ResultMetric
                                label="AWD annual fuel cost"
                                value={
                                    awdAnnualFuelCost !==
                                        null
                                        ? formatCurrency(
                                            awdAnnualFuelCost,
                                        )
                                        : "Not available"
                                }
                                detail="Estimated annual AWD fuel use multiplied by your fuel price."
                            />

                            <ResultMetric
                                label="Additional AWD fuel cost per year"
                                value={
                                    additionalAnnualFuelCost !==
                                        null
                                        ? formatCurrency(
                                            additionalAnnualFuelCost,
                                        )
                                        : "Not available"
                                }
                                detail="AWD annual fuel cost minus FWD / 2WD annual fuel cost. A negative result means AWD uses less fuel under your inputs."
                            />

                            <ResultMetric
                                label="Additional fuel cost over ownership"
                                value={
                                    additionalFuelOverOwnership !==
                                        null
                                        ? formatCurrency(
                                            additionalFuelOverOwnership,
                                        )
                                        : "Not available"
                                }
                                detail="Annual fuel-cost difference multiplied by your ownership period."
                            />

                            <ResultMetric
                                label="AWD purchase premium"
                                value={formatCurrency(
                                    purchasePremium,
                                )}
                                detail="The additional upfront price you entered for the AWD version."
                            />

                            <ResultMetric
                                label="Additional AWD maintenance"
                                value={formatCurrency(
                                    maintenanceDifference,
                                )}
                                detail="Your estimated maintenance-cost difference over the full ownership period."
                            />

                            <ResultMetric
                                label="Expected resale value recovered"
                                value={formatCurrency(
                                    resaleRecovery,
                                )}
                                detail="The amount of the AWD premium you expect to recover through higher resale value."
                            />

                            <ResultMetric
                                label="Net AWD ownership cost difference"
                                value={
                                    netAwdOwnershipPremium !==
                                        null
                                        ? formatCurrency(
                                            netAwdOwnershipPremium,
                                        )
                                        : "Not available"
                                }
                                detail="Purchase-price difference plus fuel and maintenance differences, minus the expected resale advantage. Positive means AWD costs more; negative means AWD costs less."
                            />

                            <ResultMetric
                                label="Annualized AWD cost difference"
                                value={
                                    annualizedAwdPremium !==
                                        null
                                        ? `${formatCurrency(
                                            annualizedAwdPremium,
                                        )}/yr`
                                        : "Not available"
                                }
                                detail="Net AWD ownership cost difference divided by your expected ownership period. Positive means AWD costs more per year; negative means AWD costs less."
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
                                This calculation estimates the
                                financial difference between the
                                vehicles you entered. It does not
                                assign a dollar value to additional
                                traction or determine whether AWD
                                is appropriate for your driving
                                conditions.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Replace the example assumptions with the vehicles you are comparing.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                AWD pricing, fuel economy,
                                maintenance, resale value, annual
                                mileage, and fuel prices can all
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
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
    step,
    min = "0",
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
                    min={min}
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