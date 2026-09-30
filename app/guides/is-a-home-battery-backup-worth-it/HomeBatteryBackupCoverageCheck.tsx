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

type SolarStatus = "no" | "yes" | "unknown";

type Load = {
    id: string;
    label: string;
    enabled: boolean;
    watts: string;
    hoursPerDay: string;
};

const initialLoads: Load[] = [
    {
        id: "refrigerator",
        label: "Refrigerator",
        enabled: true,
        watts: "150",
        hoursPerDay: "8",
    },
    {
        id: "freezer",
        label: "Freezer",
        enabled: false,
        watts: "100",
        hoursPerDay: "8",
    },
    {
        id: "internet",
        label: "Internet / networking",
        enabled: true,
        watts: "25",
        hoursPerDay: "24",
    },
    {
        id: "lighting",
        label: "Essential lighting",
        enabled: true,
        watts: "100",
        hoursPerDay: "5",
    },
    {
        id: "heating",
        label: "Furnace / boiler equipment",
        enabled: true,
        watts: "600",
        hoursPerDay: "8",
    },
    {
        id: "sump-pump",
        label: "Sump pump",
        enabled: false,
        watts: "800",
        hoursPerDay: "1",
    },
    {
        id: "well-pump",
        label: "Well pump",
        enabled: false,
        watts: "1000",
        hoursPerDay: "1",
    },
    {
        id: "medical",
        label: "Medical equipment",
        enabled: false,
        watts: "0",
        hoursPerDay: "0",
    },
    {
        id: "other",
        label: "Other essential loads",
        enabled: false,
        watts: "0",
        hoursPerDay: "0",
    },
];

export default function HomeBatteryBackupCoverageCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [capacityPerBattery, setCapacityPerBattery] =
        useState("13.5");
    const [batteryCount, setBatteryCount] =
        useState("1");
    const [continuousOutput, setContinuousOutput] =
        useState("5");

    const [loads, setLoads] =
        useState<Load[]>(initialLoads);

    const [typicalOutageHours, setTypicalOutageHours] =
        useState("8");
    const [longOutageHours, setLongOutageHours] =
        useState("48");

    const [solarStatus, setSolarStatus] =
        useState<SolarStatus>("no");
    const [solarEnergyPerDay, setSolarEnergyPerDay] =
        useState("0");

    const [installedCost, setInstalledCost] =
        useState("15000");
    const [incentive, setIncentive] =
        useState("0");
    const [annualBillSavings, setAnnualBillSavings] =
        useState("0");
    const [annualProgramPayment, setAnnualProgramPayment] =
        useState("0");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "home_battery_backup_check_started",
                {
                    tool: "home_battery_backup_coverage_check",
                },
            );
        }

        setHasInteracted(true);
    };

    const updateLoad = (
        id: string,
        updates: Partial<Load>,
    ) => {
        markStarted();

        setLoads((current) =>
            current.map((load) =>
                load.id === id
                    ? { ...load, ...updates }
                    : load,
            ),
        );
    };

    const capacityEach = Math.max(
        parseNumber(capacityPerBattery),
        0,
    );

    const count = Math.max(
        Math.floor(parseNumber(batteryCount)),
        0,
    );

    const totalUsableCapacity =
        capacityEach * count;

    const outputKw = Math.max(
        parseNumber(continuousOutput),
        0,
    );

    const enabledLoads = loads.filter(
        (load) => load.enabled,
    );

    const dailyEssentialEnergy = enabledLoads.reduce(
        (total, load) => {
            const watts = Math.max(
                parseNumber(load.watts),
                0,
            );

            const hours = Math.min(
                Math.max(
                    parseNumber(load.hoursPerDay),
                    0,
                ),
                24,
            );

            return total + (watts * hours) / 1000;
        },
        0,
    );

    const simultaneousRunningLoadKw =
        enabledLoads.reduce(
            (total, load) =>
                total +
                Math.max(
                    parseNumber(load.watts),
                    0,
                ) /
                1000,
            0,
        );

    const typicalHours = Math.max(
        parseNumber(typicalOutageHours),
        0,
    );

    const longHours = Math.max(
        parseNumber(longOutageHours),
        0,
    );

    const solarDailyEnergy =
        solarStatus === "yes"
            ? Math.max(
                parseNumber(solarEnergyPerDay),
                0,
            )
            : 0;

    const netDailyBatteryUse =
        dailyEssentialEnergy - solarDailyEnergy;

    const runtimeWithoutSolar =
        dailyEssentialEnergy > 0
            ? (totalUsableCapacity /
                dailyEssentialEnergy) *
            24
            : null;

    const solarCanOffsetDailyUse =
        solarStatus === "yes" &&
        dailyEssentialEnergy > 0 &&
        solarDailyEnergy >= dailyEssentialEnergy;

    const estimatedRuntime =
        solarCanOffsetDailyUse
            ? null
            : netDailyBatteryUse > 0
                ? (totalUsableCapacity /
                    netDailyBatteryUse) *
                24
                : runtimeWithoutSolar;

    const typicalCoverageRatio =
        typicalHours > 0 &&
            estimatedRuntime !== null
            ? estimatedRuntime / typicalHours
            : null;

    const longCoverageRatio =
        longHours > 0 &&
            estimatedRuntime !== null
            ? estimatedRuntime / longHours
            : null;

    const powerWithinLimit =
        simultaneousRunningLoadKw <= outputKw;

    const projectCost = Math.max(
        parseNumber(installedCost),
        0,
    );

    const appliedIncentive = Math.min(
        Math.max(parseNumber(incentive), 0),
        projectCost,
    );

    const netInstalledCost =
        projectCost - appliedIncentive;

    const billSavings = Math.max(
        parseNumber(annualBillSavings),
        0,
    );

    const programPayment = Math.max(
        parseNumber(annualProgramPayment),
        0,
    );

    const annualFinancialBenefit =
        billSavings + programPayment;

    const financialPaybackYears =
        netInstalledCost > 0 &&
            annualFinancialBenefit > 0
            ? netInstalledCost /
            annualFinancialBenefit
            : null;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "home_battery_backup_check_changed",
            {
                tool: "home_battery_backup_coverage_check",
            },
        );
    }, [
        capacityPerBattery,
        batteryCount,
        continuousOutput,
        loads,
        typicalOutageHours,
        longOutageHours,
        solarStatus,
        solarEnergyPerDay,
        installedCost,
        incentive,
        annualBillSavings,
        annualProgramPayment,
    ]);

    let coverageHeading: string;
    let coverageDescription: string;

    if (dailyEssentialEnergy <= 0) {
        coverageHeading =
            "Add at least one essential load to estimate backup coverage.";

        coverageDescription =
            "Runtime depends on the amount of energy your selected loads use. Enable the equipment you expect to operate during an outage and enter realistic running-power and daily-use estimates.";
    } else if (!powerWithinLimit) {
        coverageHeading =
            "Your selected running loads exceed the battery's continuous-output estimate.";

        coverageDescription =
            "The battery may have enough stored energy for the outage but still lack enough continuous power to operate all of the selected loads at once. Reduce simultaneous loads or compare a system with greater power output.";
    } else if (solarCanOffsetDailyUse) {
        coverageHeading =
            "Your solar input meets or exceeds the estimated daily essential energy use.";

        coverageDescription =
            "Under the energy assumptions entered, daily solar production could replace at least as much energy as the selected loads consume. That does not guarantee indefinite backup because weather, production timing, battery limits, system configuration, and changing loads still matter.";
    } else if (
        estimatedRuntime !== null &&
        typicalHours > 0 &&
        estimatedRuntime >= typicalHours &&
        (longHours <= 0 ||
            estimatedRuntime >= longHours)
    ) {
        coverageHeading =
            "Your inputs show enough estimated energy for both outage scenarios.";

        coverageDescription =
            "The calculated runtime exceeds both the typical and long outage durations you entered. Real-world runtime can still vary with equipment cycling, conversion losses, temperature, battery age, and other operating conditions.";
    } else if (
        estimatedRuntime !== null &&
        typicalHours > 0 &&
        estimatedRuntime >= typicalHours
    ) {
        coverageHeading =
            "Your inputs cover the typical outage but not the longer outage.";

        coverageDescription =
            "The estimated battery energy is enough for the typical outage duration you entered, but prolonged outages would require lower consumption, additional battery capacity, recharging, or another backup source.";
    } else {
        coverageHeading =
            "Your selected loads use more energy than this battery can provide for the typical outage.";

        coverageDescription =
            "Consider reducing the loads you plan to run, increasing battery capacity, adding a reliable recharge source, or comparing another backup strategy.";
    }

    return (
        <section
            id="home-battery-coverage-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Home Battery Backup Coverage Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    How much of your outage can the battery actually cover?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Estimate the energy your essential loads use, compare
                    that demand with usable battery capacity, and separately
                    check whether the battery has enough continuous power
                    to operate those loads.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Battery system
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <NumberField
                            label="Usable capacity per battery"
                            value={capacityPerBattery}
                            suffix="kWh"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setCapacityPerBattery(value);
                            }}
                        />

                        <NumberField
                            label="Number of batteries"
                            value={batteryCount}
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setBatteryCount(value);
                            }}
                            onBlur={() => {
                                const normalized = Math.max(
                                    Math.floor(
                                        parseNumber(batteryCount),
                                    ),
                                    0,
                                );

                                setBatteryCount(
                                    String(normalized),
                                );
                            }}
                        />

                        <NumberField
                            label="Continuous output"
                            value={continuousOutput}
                            suffix="kW"
                            step="0.5"
                            onChange={(value) => {
                                markStarted();
                                setContinuousOutput(value);
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use usable capacity when possible
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Use the manufacturer&apos;s published usable
                            energy capacity rather than assuming the full
                            nominal battery capacity is available to your
                            home.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Essential loads
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                            The example wattages and hours are starting
                            points only. Replace them with equipment labels,
                            manufacturer specifications, measurements, or
                            other reasonable estimates for your home.
                        </p>

                        <div className="mt-6 space-y-4">
                            {loads.map((load) => (
                                <LoadRow
                                    key={load.id}
                                    load={load}
                                    onChange={(updates) =>
                                        updateLoad(
                                            load.id,
                                            updates,
                                        )
                                    }
                                />
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Running watts are not starting watts
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Motors and compressors can briefly require
                                more power when they start than they use
                                while running. The continuous-power check
                                below does not verify motor-starting or surge
                                capability. Check the battery and equipment
                                specifications for those loads.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Outage and solar
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Typical outage duration"
                                value={typicalOutageHours}
                                suffix="hours"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setTypicalOutageHours(value);
                                }}
                            />

                            <NumberField
                                label="Long outage duration"
                                value={longOutageHours}
                                suffix="hours"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setLongOutageHours(value);
                                }}
                            />

                            <SelectField
                                label="Can solar recharge during an outage?"
                                value={solarStatus}
                                options={[
                                    {
                                        value: "no",
                                        label: "No",
                                    },
                                    {
                                        value: "yes",
                                        label: "Yes",
                                    },
                                    {
                                        value: "unknown",
                                        label: "I don't know",
                                    },
                                ]}
                                onChange={(value) => {
                                    markStarted();
                                    setSolarStatus(
                                        value as SolarStatus,
                                    );
                                }}
                            />

                            {solarStatus === "yes" ? (
                                <NumberField
                                    label="Estimated solar energy available"
                                    value={solarEnergyPerDay}
                                    suffix="kWh/day"
                                    step="0.5"
                                    onChange={(value) => {
                                        markStarted();
                                        setSolarEnergyPerDay(value);
                                    }}
                                />
                            ) : null}
                        </div>

                        {solarStatus === "yes" ? (
                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Solar production is an estimate
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    Enter the energy you reasonably expect
                                    to be available for charging the battery
                                    during an outage, not your array&apos;s
                                    nameplate rating. Weather, season,
                                    shading, system configuration, and
                                    household consumption can change the
                                    amount available.
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Backup coverage
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Total usable battery capacity"
                                value={`${formatNumber(
                                    totalUsableCapacity,
                                    1,
                                )} kWh`}
                                detail="Usable capacity per battery multiplied by the number of batteries."
                            />

                            <ResultMetric
                                label="Estimated essential energy use"
                                value={`${formatNumber(
                                    dailyEssentialEnergy,
                                    1,
                                )} kWh/day`}
                                detail="Estimated daily energy use from the essential loads you enabled."
                            />

                            <ResultMetric
                                label="Estimated runtime"
                                value={
                                    solarCanOffsetDailyUse
                                        ? "Daily use offset"
                                        : estimatedRuntime !== null
                                            ? `${formatNumber(
                                                estimatedRuntime,
                                                1,
                                            )} hours`
                                            : "Not available"
                                }
                                detail={
                                    solarStatus === "yes"
                                        ? "Estimated from battery capacity, essential-load use, and the solar energy input you provided."
                                        : "Estimated from usable battery capacity and average daily essential-load energy."
                                }
                            />

                            <ResultMetric
                                label="Estimated simultaneous running load"
                                value={`${formatNumber(
                                    simultaneousRunningLoadKw,
                                    2,
                                )} kW`}
                                detail="The sum of the running watts for all enabled loads, assuming they operate at the same time."
                            />
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <StatusMetric
                                label="Typical outage"
                                value={
                                    solarCanOffsetDailyUse
                                        ? "Potentially covered"
                                        : coverageLabel(
                                            typicalCoverageRatio,
                                        )
                                }
                                detail={`${formatNumber(
                                    typicalHours,
                                    1,
                                )} hours entered`}
                            />

                            <StatusMetric
                                label="Long outage"
                                value={
                                    solarCanOffsetDailyUse
                                        ? "Potentially covered"
                                        : coverageLabel(
                                            longCoverageRatio,
                                        )
                                }
                                detail={`${formatNumber(
                                    longHours,
                                    1,
                                )} hours entered`}
                            />

                            <StatusMetric
                                label="Continuous power"
                                value={
                                    powerWithinLimit
                                        ? "Within limit"
                                        : "Over limit"
                                }
                                detail={`${formatNumber(
                                    simultaneousRunningLoadKw,
                                    2,
                                )} kW of ${formatNumber(
                                    outputKw,
                                    1,
                                )} kW entered`}
                            />
                        </div>

                        <div
                            className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                            aria-live="polite"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                What the coverage check suggests
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                {coverageHeading}
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                {coverageDescription}
                            </p>

                            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                                This is an energy and continuous-running-power
                                estimate, not a guarantee of backup performance.
                                {hasInteracted
                                    ? " The result is based on the values you entered."
                                    : " These are example inputs and are not a recommendation."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Financial comparison
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                            Keep outage protection separate from bill savings.
                            Enter only financial benefits you can reasonably
                            estimate, such as time-of-use savings or a utility
                            program payment.
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Installed battery cost"
                                value={installedCost}
                                prefix="$"
                                step="500"
                                onChange={(value) => {
                                    markStarted();
                                    setInstalledCost(value);
                                }}
                                onBlur={() => {
                                    const normalizedCost =
                                        Math.max(
                                            parseNumber(
                                                installedCost,
                                            ),
                                            0,
                                        );

                                    setInstalledCost(
                                        String(normalizedCost),
                                    );

                                    setIncentive((current) =>
                                        String(
                                            Math.min(
                                                Math.max(
                                                    parseNumber(
                                                        current,
                                                    ),
                                                    0,
                                                ),
                                                normalizedCost,
                                            ),
                                        ),
                                    );
                                }}
                            />

                            <NumberField
                                label="Verified incentive"
                                value={incentive}
                                prefix="$"
                                step="500"
                                max={String(projectCost)}
                                onChange={(value) => {
                                    markStarted();
                                    setIncentive(value);
                                }}
                                onBlur={() => {
                                    const normalized =
                                        Math.min(
                                            Math.max(
                                                parseNumber(
                                                    incentive,
                                                ),
                                                0,
                                            ),
                                            projectCost,
                                        );

                                    setIncentive(
                                        String(normalized),
                                    );
                                }}
                            />

                            <NumberField
                                label="Estimated annual bill savings"
                                value={annualBillSavings}
                                prefix="$"
                                suffix="/yr"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setAnnualBillSavings(value);
                                }}
                            />

                            <NumberField
                                label="Annual utility / VPP payment"
                                value={annualProgramPayment}
                                prefix="$"
                                suffix="/yr"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setAnnualProgramPayment(value);
                                }}
                            />
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Net installed cost"
                                value={formatCurrency(
                                    netInstalledCost,
                                )}
                                detail="Installed battery cost minus the verified incentive you entered."
                            />

                            <ResultMetric
                                label="Annual financial benefit"
                                value={formatCurrency(
                                    annualFinancialBenefit,
                                )}
                                detail="Entered annual bill savings plus utility or virtual-power-plant payments."
                            />

                            <ResultMetric
                                label="Payback from entered financial benefits"
                                value={
                                    financialPaybackYears !== null
                                        ? `${formatNumber(
                                            financialPaybackYears,
                                            1,
                                        )} years`
                                        : "No payback shown"
                                }
                                detail="Net installed cost divided by the annual financial benefits you entered."
                            />

                            <ResultMetric
                                label="10-year financial balance"
                                value={formatCurrency(
                                    annualFinancialBenefit *
                                    10 -
                                    netInstalledCost,
                                )}
                                detail="Ten years of entered financial benefits minus the net installed cost, before financing, degradation, or changing utility rates."
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5">
                            <p className="font-semibold">
                                Outage protection is not included in this payback
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                This financial calculation deliberately does
                                not assign a dollar value to avoiding an outage.
                                Backup power can still be valuable even when
                                bill savings alone do not recover the battery
                                cost.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Replace the example loads with your own equipment.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                Appliance wattage, duty cycle, battery
                                capacity, inverter output, solar production,
                                and outage duration can all materially change
                                the result.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

function coverageLabel(
    ratio: number | null,
) {
    if (ratio === null) {
        return "Not available";
    }

    if (ratio >= 1) {
        return "Full";
    }

    if (ratio > 0) {
        return "Partial";
    }

    return "None";
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
    onBlur?: () => void;
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
    onBlur,
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
                    onBlur={onBlur}
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

type SelectOption = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    label: string;
    value: string;
    options: readonly SelectOption[];
    onChange: (value: string) => void;
};

function SelectField({
    label,
    value,
    options,
    onChange,
}: SelectFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

type LoadRowProps = {
    load: Load;
    onChange: (
        updates: Partial<Load>,
    ) => void;
};

function LoadRow({
    load,
    onChange,
}: LoadRowProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] p-5">
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr] md:items-end">
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={load.enabled}
                        onChange={(event) =>
                            onChange({
                                enabled:
                                    event.target.checked,
                            })
                        }
                        className="h-4 w-4"
                    />

                    <span className="font-semibold">
                        {load.label}
                    </span>
                </label>

                <NumberField
                    label="Running watts"
                    value={load.watts}
                    suffix="W"
                    step="25"
                    onChange={(value) =>
                        onChange({
                            watts: value,
                        })
                    }
                />

                <NumberField
                    label="Hours per day"
                    value={load.hoursPerDay}
                    suffix="hr"
                    step="0.5"
                    max="24"
                    onChange={(value) =>
                        onChange({
                            hoursPerDay: value,
                        })
                    }
                    onBlur={() => {
                        const normalized =
                            Math.min(
                                Math.max(
                                    parseNumber(
                                        load.hoursPerDay,
                                    ),
                                    0,
                                ),
                                24,
                            );

                        onChange({
                            hoursPerDay:
                                String(normalized),
                        });
                    }}
                />
            </div>
        </div>
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

type StatusMetricProps = {
    label: string;
    value: string;
    detail: string;
};

function StatusMetric({
    label,
    value,
    detail,
}: StatusMetricProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </p>

            <p className="mt-3 text-xl font-semibold tracking-tight">
                {value}
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {detail}
            </p>
        </div>
    );
}