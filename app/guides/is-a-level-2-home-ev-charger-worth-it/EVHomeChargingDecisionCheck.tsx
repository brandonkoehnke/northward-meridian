"use client";

import { useEffect, useRef, useState } from "react";

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

function formatNumber(value: number, digits = 1) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

export default function EVHomeChargingDecisionCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [milesPerDay, setMilesPerDay] = useState("35");
    const [vehicleEfficiency, setVehicleEfficiency] = useState("0.30");

    const [overnightHours, setOvernightHours] = useState("10");
    const [level1MilesPerHour, setLevel1MilesPerHour] =
        useState("4");
    const [level2MilesPerHour, setLevel2MilesPerHour] =
        useState("25");

    const [publicChargingShare, setPublicChargingShare] =
        useState("25");
    const [homeElectricityRate, setHomeElectricityRate] =
        useState("0.20");
    const [publicChargingRate, setPublicChargingRate] =
        useState("0.45");

    const [installationCost, setInstallationCost] =
        useState("1700");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "level_2_home_charger_decision_started",
                {
                    tool: "level_2_home_charger_decision",
                },
            );
        }

        setHasInteracted(true);
    };

    const dailyMiles = Math.max(
        parseNumber(milesPerDay),
        0,
    );

    const efficiency = Math.max(
        parseNumber(vehicleEfficiency),
        0,
    );

    const parkingHours = Math.max(
        parseNumber(overnightHours),
        0,
    );

    const level1Rate = Math.max(
        parseNumber(level1MilesPerHour),
        0,
    );

    const level2Rate = Math.max(
        parseNumber(level2MilesPerHour),
        0,
    );

    const publicShare = Math.min(
        Math.max(parseNumber(publicChargingShare), 0),
        100,
    ) / 100;

    const homeRate = Math.max(
        parseNumber(homeElectricityRate),
        0,
    );

    const publicRate = Math.max(
        parseNumber(publicChargingRate),
        0,
    );

    const installCost = Math.max(
        parseNumber(installationCost),
        0,
    );

    const level1HoursRequired =
        level1Rate > 0
            ? dailyMiles / level1Rate
            : Infinity;

    const level2HoursRequired =
        level2Rate > 0
            ? dailyMiles / level2Rate
            : Infinity;

    const level1KeepsUp =
        level1HoursRequired <= parkingHours;

    const annualMiles =
        dailyMiles * 365;

    const annualEnergy =
        annualMiles * efficiency;

    const annualPublicEnergy =
        annualEnergy * publicShare;

    const costDifferencePerKwh =
        publicRate - homeRate;

    const annualChargingSavings =
        annualPublicEnergy * costDifferencePerKwh;

    const paybackYears =
        annualChargingSavings > 0
            ? installCost / annualChargingSavings
            : null;

    const paybackMonths =
        paybackYears !== null
            ? paybackYears * 12
            : null;

    const fiveYearNetSavings =
        annualChargingSavings * 5 - installCost;

    const annualHomeEnergy =
        annualEnergy * (1 - publicShare);

    const annualHomeChargingCost =
        annualHomeEnergy * homeRate;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "level_2_home_charger_decision_changed",
            {
                tool: "level_2_home_charger_decision",
            },
        );
    }, [
        milesPerDay,
        vehicleEfficiency,
        overnightHours,
        level1MilesPerHour,
        level2MilesPerHour,
        publicChargingShare,
        homeElectricityRate,
        publicChargingRate,
        installationCost,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (!level1KeepsUp && annualChargingSavings < 0) {
        resultHeading =
            "Level 2 addresses a charging-capacity problem, but your entered rates do not show charging-cost savings.";

        resultDescription =
            "Your estimated daily driving requires more Level 1 charging time than your available parking window. Level 2 would address that charging-speed constraint, but at the electricity prices you entered, shifting charging from public stations to home would increase energy cost rather than reduce it.";
    } else if (annualChargingSavings < 0) {
        resultHeading =
            "Your entered rates do not show a charging-cost savings case.";

        resultDescription =
            "At the electricity prices you entered, moving charging from public stations to home would increase energy cost rather than reduce it. Level 1 appears capable of covering your normal daily mileage, so the remaining case for Level 2 is primarily faster charging and flexibility.";
    } else if (
        !level1KeepsUp &&
        annualChargingSavings > 0 &&
        paybackMonths !== null &&
        paybackMonths <= 36
    ) {
        resultHeading =
            "You have both a charging-capacity case and a measurable financial case.";

        resultDescription =
            "Your normal driving appears to require more charging time than your stated Level 1 parking window provides, and replacing public charging with home charging creates a positive estimated payback under your assumptions.";
    } else if (!level1KeepsUp) {
        resultHeading =
            "Level 2 addresses a real charging-capacity problem.";

        resultDescription =
            "Your estimated daily driving requires more Level 1 charging time than your available parking window. The primary value of Level 2 in this scenario is faster replenishment and reduced dependence on public charging.";
    } else if (
        annualChargingSavings > 0 &&
        paybackMonths !== null
    ) {
        resultHeading =
            "Your Level 2 case is mainly about convenience; the simple payback is long.";

        resultDescription =
            "Level 1 appears capable of replacing your normal daily mileage during your stated parking window. Your assumptions do produce some annual savings by shifting public charging home, but the estimated payback is long relative to the five-year period modeled here.";
    } else {
        resultHeading =
            "Your Level 1 setup may already cover the practical need.";

        resultDescription =
            "Your estimated Level 1 charging time fits within your normal parking window, and the current assumptions do not show enough public-charging savings to establish a financial payback for the installation.";
    }

    return (
        <section
            id="level-2-home-charger-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Level 2 Home Charger Cost &amp; Charging Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Does Level 2 solve a real problem for you?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    This calculator separates the charging-speed question from
                    the financial question. Enter your normal driving, parking
                    window, charging rates, and estimated installation cost.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Your driving
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Miles driven per day"
                            value={milesPerDay}
                            suffix="mi/day"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setMilesPerDay(value);
                            }}
                        />

                        <NumberField
                            label="EV energy use"
                            value={vehicleEfficiency}
                            suffix="kWh/mi"
                            step="0.01"
                            onChange={(value) => {
                                markStarted();
                                setVehicleEfficiency(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Charging speed
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Normal overnight parking window"
                                value={overnightHours}
                                suffix="hr"
                                step="0.5"
                                onChange={(value) => {
                                    markStarted();
                                    setOvernightHours(value);
                                }}
                            />

                            <NumberField
                                label="Level 1 charging rate"
                                value={level1MilesPerHour}
                                suffix="mi/hr"
                                step="0.5"
                                onChange={(value) => {
                                    markStarted();
                                    setLevel1MilesPerHour(value);
                                }}
                            />

                            <NumberField
                                label="Level 2 charging rate"
                                value={level2MilesPerHour}
                                suffix="mi/hr"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setLevel2MilesPerHour(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Charging rates are estimates, not guarantees
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                DOE gives broad Level 1 and Level 2 range estimates.
                                Actual charging speed depends on the vehicle,
                                charging equipment, battery state, temperature,
                                electrical service, and other factors. Use your
                                vehicle manufacturer&apos;s figures when you have them.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Public charging
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Share of EV charging energy purchased publicly"
                                value={publicChargingShare}
                                suffix="%"
                                step="5"
                                min="0"
                                max="100"
                                onChange={(value) => {
                                    markStarted();

                                    const parsed = parseNumber(value);

                                    setPublicChargingShare(
                                        value === ""
                                            ? ""
                                            : String(
                                                Math.min(
                                                    Math.max(parsed, 0),
                                                    100,
                                                ),
                                            ),
                                    );
                                }}
                            />

                            <NumberField
                                label="Public charging price"
                                value={publicChargingRate}
                                prefix="$"
                                suffix="/kWh"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setPublicChargingRate(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Public charging is where the financial comparison changes
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Level 1 and Level 2 both use your home electricity rate.
                                The calculator therefore only assigns charging-cost
                                savings to the portion of energy that would otherwise
                                have been purchased publicly.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Home electricity and installation
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Home electricity price"
                                value={homeElectricityRate}
                                prefix="$"
                                suffix="/kWh"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setHomeElectricityRate(value);
                                }}
                            />

                            <NumberField
                                label="Installed Level 2 cost"
                                value={installationCost}
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setInstallationCost(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Use your quote, not a generic installation number
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Installation cost can vary substantially with panel
                                capacity, wiring distance, permits, and required
                                electrical upgrades. Enter the quote you would
                                realistically pay whenever you have one.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your numbers
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Level 1 charging time for your daily driving"
                                value={
                                    Number.isFinite(level1HoursRequired)
                                        ? `${formatNumber(level1HoursRequired, 1)} hr`
                                        : "N/A"
                                }
                                detail={
                                    level1KeepsUp
                                        ? "This fits within your stated parking window."
                                        : "This exceeds your stated parking window."
                                }
                            />

                            <ResultMetric
                                label="Level 2 charging time for your daily driving"
                                value={
                                    Number.isFinite(level2HoursRequired)
                                        ? `${formatNumber(level2HoursRequired, 1)} hr`
                                        : "N/A"
                                }
                                detail="This is an estimate based on the Level 2 rate you entered."
                            />

                            <ResultMetric
                                label="Estimated annual charging-cost difference"
                                value={formatCurrency(annualChargingSavings)}
                                detail="Estimated annual difference if the stated public-charging energy shifts to your home electricity rate."
                            />

                            <ResultMetric
                                label="Estimated installation payback"
                                value={
                                    paybackMonths !== null
                                        ? `${formatNumber(paybackMonths, 0)} months`
                                        : "No payback shown"
                                }
                                detail="This is a simple payback calculation and excludes financing, maintenance, rebates, and the value of your time."
                            />

                            <ResultMetric
                                label="5-year net charging savings"
                                value={formatCurrency(fiveYearNetSavings)}
                                detail="Five years of estimated charging-cost difference minus the installation cost."
                            />

                            <ResultMetric
                                label="Annual home charging cost"
                                value={formatCurrency(annualHomeChargingCost)}
                                detail="This estimates the cost of the charging energy that remains at home after the stated public-charging share."
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
                                Change the assumptions to reflect your actual vehicle,
                                utility rate, charging habits, and installation quote.
                                {hasInteracted
                                    ? " The result is based on the values you entered."
                                    : " These are example inputs; they are not personalized advice."}
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5">
                            <p className="font-semibold">
                                What this calculation does not assume
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                It does not assume that every public charging session
                                disappears, does not assign a value to convenience,
                                does not model demand charges or time-of-use tariffs,
                                and does not predict the exact charging speed of a
                                particular vehicle or charger.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Enter your own numbers before treating the result as a decision input.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                The defaults are there to demonstrate the calculation.
                                They should not be interpreted as a recommendation for
                                your household.
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
    max?: string;
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
    step,
    min = "0",
    max,
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
                    max={max}
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