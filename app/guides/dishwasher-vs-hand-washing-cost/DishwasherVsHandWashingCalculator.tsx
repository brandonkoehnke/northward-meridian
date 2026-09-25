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

export default function DishwasherVsHandWashingCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [loadsPerWeek, setLoadsPerWeek] = useState("5");

    const [dishwasherGallons, setDishwasherGallons] =
        useState("3.2");

    const [dishwasherKwh, setDishwasherKwh] =
        useState("1.12");

    const [dishwasherDetergent, setDishwasherDetergent] =
        useState("0.25");

    const [handWashMinutes, setHandWashMinutes] =
        useState("8");

    const [faucetFlow, setFaucetFlow] =
        useState("1.8");

    const [handWashHotShare, setHandWashHotShare] =
        useState("60");

    const [handDetergent, setHandDetergent] =
        useState("0.10");

    const [waterCostPerThousand, setWaterCostPerThousand] =
        useState("12");

    const [electricityPrice, setElectricityPrice] =
        useState("0.20");

    const [waterHeatingKwhPerGallon, setWaterHeatingKwhPerGallon] =
        useState("0.183");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("dishwasher_vs_hand_washing_started", {
                tool: "dishwasher_vs_hand_washing",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const weeklyLoads = Math.max(
            parseNumber(loadsPerWeek),
            0,
        );

        const annualLoads = weeklyLoads * 52;

        const dwGallons = Math.max(
            parseNumber(dishwasherGallons),
            0,
        );

        const dwKwh = Math.max(
            parseNumber(dishwasherKwh),
            0,
        );

        const dwDetergent = Math.max(
            parseNumber(dishwasherDetergent),
            0,
        );

        const handMinutes = Math.max(
            parseNumber(handWashMinutes),
            0,
        );

        const flowRate = Math.max(
            parseNumber(faucetFlow),
            0,
        );

        const hotShare =
            Math.min(
                Math.max(parseNumber(handWashHotShare), 0),
                100,
            ) / 100;

        const handSoap = Math.max(
            parseNumber(handDetergent),
            0,
        );

        const waterRate =
            Math.max(
                parseNumber(waterCostPerThousand),
                0,
            ) / 1000;

        const electricRate = Math.max(
            parseNumber(electricityPrice),
            0,
        );

        const heatingEnergy = Math.max(
            parseNumber(waterHeatingKwhPerGallon),
            0,
        );

        const dishwasherAnnualWater =
            dwGallons * annualLoads;

        const dishwasherAnnualMachineEnergy =
            dwKwh * annualLoads;

        const dishwasherAnnualWaterCost =
            dishwasherAnnualWater * waterRate;

        const dishwasherAnnualElectricityCost =
            dishwasherAnnualMachineEnergy * electricRate;

        const dishwasherAnnualDetergent =
            dwDetergent * annualLoads;

        const dishwasherAnnualCost =
            dishwasherAnnualWaterCost +
            dishwasherAnnualElectricityCost +
            dishwasherAnnualDetergent;

        const handGallonsPerSession =
            handMinutes * flowRate;

        const handAnnualWater =
            handGallonsPerSession * annualLoads;

        const handHotGallons =
            handAnnualWater * hotShare;

        const handAnnualHeatingEnergy =
            handHotGallons * heatingEnergy;

        const handAnnualWaterCost =
            handAnnualWater * waterRate;

        const handAnnualHeatingCost =
            handAnnualHeatingEnergy * electricRate;

        const handAnnualDetergent =
            handSoap * annualLoads;

        const handAnnualCost =
            handAnnualWaterCost +
            handAnnualHeatingCost +
            handAnnualDetergent;

        const annualDifference =
            handAnnualCost - dishwasherAnnualCost;

        const annualWaterDifference =
            handAnnualWater - dishwasherAnnualWater;

        const fiveYearDifference =
            annualDifference * 5;

        const handWashingCostPerLoad =
            handGallonsPerSession * waterRate +
            handHotGallons / Math.max(annualLoads, 1) *
            heatingEnergy *
            electricRate +
            handSoap;

        const dishwasherCostPerLoad =
            dwGallons * waterRate +
            dwKwh * electricRate +
            dwDetergent;

        const breakEvenHandGallons =
            waterRate + hotShare * heatingEnergy * electricRate > 0
                ? (
                    dishwasherCostPerLoad - handSoap
                ) /
                (
                    waterRate +
                    hotShare *
                    heatingEnergy *
                    electricRate
                )
                : null;

        const breakEvenMinutes =
            breakEvenHandGallons !== null &&
                breakEvenHandGallons >= 0 &&
                flowRate > 0
                ? breakEvenHandGallons / flowRate
                : null;

        return {
            annualLoads,
            dishwasherAnnualWater,
            dishwasherAnnualMachineEnergy,
            dishwasherAnnualCost,
            handGallonsPerSession,
            handAnnualWater,
            handAnnualHeatingEnergy,
            handAnnualCost,
            annualDifference,
            annualWaterDifference,
            fiveYearDifference,
            handWashingCostPerLoad,
            dishwasherCostPerLoad,
            breakEvenHandGallons,
            breakEvenMinutes,
        };
    }, [
        dishwasherDetergent,
        dishwasherGallons,
        dishwasherKwh,
        electricityPrice,
        faucetFlow,
        handDetergent,
        handWashHotShare,
        handWashMinutes,
        loadsPerWeek,
        waterCostPerThousand,
        waterHeatingKwhPerGallon,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("dishwasher_vs_hand_washing_changed", {
            tool: "dishwasher_vs_hand_washing",
        });
    }, [
        dishwasherDetergent,
        dishwasherGallons,
        dishwasherKwh,
        electricityPrice,
        faucetFlow,
        handDetergent,
        handWashHotShare,
        handWashMinutes,
        loadsPerWeek,
        waterCostPerThousand,
        waterHeatingKwhPerGallon,
    ]);

    return (
        <section
            id="dishwasher-vs-hand-washing-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Dishwasher vs. Hand-Washing Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Which method costs less in your household?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare water, energy, and detergent costs using your dishwasher,
                    faucet, utility rates, and hand-washing habits.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        How often do you wash dishes?
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Equivalent loads per week"
                            value={loadsPerWeek}
                            suffix="/week"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setLoadsPerWeek(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Dishwasher
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Water per cycle"
                                value={dishwasherGallons}
                                suffix="gal"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setDishwasherGallons(value);
                                }}
                            />

                            <NumberField
                                label="Estimated energy per cycle"
                                value={dishwasherKwh}
                                suffix="kWh"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setDishwasherKwh(value);
                                }}
                            />

                            <NumberField
                                label="Detergent per cycle"
                                value={dishwasherDetergent}
                                prefix="$"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setDishwasherDetergent(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Use your dishwasher&apos;s EnergyGuide number when possible
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The 3.2-gallon default matches the current maximum water use
                                for a standard-size ENERGY STAR certified dishwasher. The
                                energy default is a derived per-cycle estimate based on
                                240 kWh/year across ENERGY STAR&apos;s 215 annual test cycles;
                                it is not a measured value for every dishwasher. For a
                                specific model, use its EnergyGuide information or manufacturer
                                data when available.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Hand Washing
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Faucet running time per equivalent load"
                                value={handWashMinutes}
                                suffix="min"
                                step="0.5"
                                onChange={(value) => {
                                    markStarted();
                                    setHandWashMinutes(value);
                                }}
                            />

                            <NumberField
                                label="Faucet flow rate"
                                value={faucetFlow}
                                suffix="gal/min"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setFaucetFlow(value);
                                }}
                            />

                            <NumberField
                                label="Share of hand-washing water that is hot"
                                value={handWashHotShare}
                                suffix="%"
                                step="5"
                                onChange={(value) => {
                                    markStarted();
                                    setHandWashHotShare(value);
                                }}
                            />

                            <NumberField
                                label="Dish soap per equivalent load"
                                value={handDetergent}
                                prefix="$"
                                step="0.01"
                                onChange={(value) => {
                                    markStarted();
                                    setHandDetergent(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Faucet-running time is the critical hand-washing input
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                If you fill a basin and turn the faucet off, enter only the
                                actual time water is flowing. Leaving a 1.8-gallon-per-minute
                                faucet running for eight minutes uses 14.4 gallons.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Utilities
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Water + sewer cost"
                                value={waterCostPerThousand}
                                prefix="$"
                                suffix="/1,000 gal"
                                step="0.50"
                                onChange={(value) => {
                                    markStarted();
                                    setWaterCostPerThousand(value);
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
                                label="Energy to heat one gallon of water"
                                value={waterHeatingKwhPerGallon}
                                suffix="kWh/gal"
                                step="0.001"
                                onChange={(value) => {
                                    markStarted();
                                    setWaterHeatingKwhPerGallon(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                The hot-water input is an estimate
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The 0.183 kWh/gallon default represents the thermal energy
                                required to raise one gallon of water by about 75°F. Actual
                                water-heating cost depends on incoming water temperature,
                                heater type, efficiency, fuel, and hot-water temperature.
                            </p>
                        </div>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Dishwashing Comparison
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Dishwasher annual cost"
                                value={formatCurrency(
                                    result.dishwasherAnnualCost,
                                )}
                                detail={`${formatNumber(
                                    result.dishwasherAnnualWater,
                                    0,
                                )} gallons and ${formatNumber(
                                    result.dishwasherAnnualMachineEnergy,
                                    0,
                                )} kWh per year under your assumptions`}
                            />

                            <ResultMetric
                                label="Hand-washing annual cost"
                                value={formatCurrency(
                                    result.handAnnualCost,
                                )}
                                detail={`${formatNumber(
                                    result.handAnnualWater,
                                    0,
                                )} gallons and about ${formatNumber(
                                    result.handAnnualHeatingEnergy,
                                    0,
                                )} kWh of water-heating energy per year`}
                            />

                            <ResultMetric
                                label="Annual cost difference"
                                value={formatCurrency(
                                    Math.abs(result.annualDifference),
                                )}
                                detail={
                                    result.annualDifference > 0
                                        ? "Estimated annual savings from using the dishwasher"
                                        : result.annualDifference < 0
                                            ? "Estimated annual savings from hand washing"
                                            : "The two methods are approximately equal under these assumptions"
                                }
                            />

                            <ResultMetric
                                label="Annual water difference"
                                value={`${formatNumber(
                                    Math.abs(result.annualWaterDifference),
                                    0,
                                )} gal`}
                                detail={
                                    result.annualWaterDifference > 0
                                        ? "Estimated water saved by using the dishwasher"
                                        : result.annualWaterDifference < 0
                                            ? "Estimated water saved by hand washing"
                                            : "Estimated water use is approximately equal"
                                }
                            />

                            <ResultMetric
                                label="5-year cost difference"
                                value={formatCurrency(
                                    Math.abs(result.fiveYearDifference),
                                )}
                                detail={
                                    result.fiveYearDifference > 0
                                        ? "Estimated five-year savings from using the dishwasher"
                                        : result.fiveYearDifference < 0
                                            ? "Estimated five-year savings from hand washing"
                                            : "No meaningful difference under these assumptions"
                                }
                            />

                            <ResultMetric
                                label="Hand-washing water per load"
                                value={`${formatNumber(
                                    result.handGallonsPerSession,
                                    1,
                                )} gal`}
                                detail="Faucet running time multiplied by faucet flow rate"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Your approximate hand-washing break-even point
                            </p>

                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                {result.breakEvenHandGallons === null ||
                                    result.breakEvenMinutes === null
                                    ? "A useful break-even point cannot be calculated from these assumptions."
                                    : `At your utility and detergent assumptions, hand washing would need to use about ${formatNumber(
                                        result.breakEvenHandGallons,
                                        1,
                                    )} gallons or less per equivalent dishwasher load to match the dishwasher's estimated operating cost. At your entered faucet flow, that is about ${formatNumber(
                                        result.breakEvenMinutes,
                                        1,
                                    )} minutes of total faucet-running time.`}
                            </p>
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                This is an operating-cost comparison
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                It does not include the purchase price, repair cost, or
                                replacement cost of the dishwasher, and it does not assign a
                                dollar value to your time.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Dishwasher vs. Hand-Washing Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your dishwashing habits to compare the two methods.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at least one
                            field before using the result for your household.
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