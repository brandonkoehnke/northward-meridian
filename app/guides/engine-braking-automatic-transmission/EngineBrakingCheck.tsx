"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type TransmissionType =
    | "automatic"
    | "cvt"
    | "manual";

type DrivingSituation =
    | "steep-descent"
    | "normal-driving"
    | "towing"
    | "slippery";

type ControlMethod =
    | "automatic"
    | "manual-mode"
    | "paddles"
    | "lower-range";

type Recommendation =
    | "appropriate"
    | "normal-operation"
    | "towing-guidance"
    | "traction-caution";

export default function EngineBrakingCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [transmission, setTransmission] =
        useState<TransmissionType>("automatic");

    const [situation, setSituation] =
        useState<DrivingSituation>("steep-descent");

    const [controlMethod, setControlMethod] =
        useState<ControlMethod>("automatic");

    const [longDescent, setLongDescent] = useState(true);
    const [towing, setTowing] = useState(false);
    const [slipperyRoad, setSlipperyRoad] = useState(false);
    const [highRpmConcern, setHighRpmConcern] = useState(false);
    const [warningLight, setWarningLight] = useState(false);
    const [unusualBehavior, setUnusualBehavior] = useState(false);
    const [manualMentionsEngineBraking, setManualMentionsEngineBraking] =
        useState(false);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("engine_braking_check_started", {
                tool: "engine_braking_check",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const factors: string[] = [];

        if (transmission === "automatic") {
            factors.push(
                "You selected a conventional automatic transmission",
            );
        }

        if (transmission === "cvt") {
            factors.push(
                "You selected a continuously variable transmission",
            );
        }

        if (transmission === "manual") {
            factors.push(
                "You selected a manual transmission",
            );
        }

        if (longDescent) {
            factors.push(
                "You indicated a long or sustained descent",
            );
        }

        if (towing || situation === "towing") {
            factors.push(
                "Towing increases the importance of speed control and vehicle-specific guidance",
            );
        }

        if (slipperyRoad || situation === "slippery") {
            factors.push(
                "The road may be slippery, so traction is a more important concern",
            );
        }

        if (highRpmConcern) {
            factors.push(
                "You are concerned that the selected range may be producing unusually high engine speed",
            );
        }

        if (warningLight) {
            factors.push(
                "A transmission or powertrain warning light is present",
            );
        }

        if (unusualBehavior) {
            factors.push(
                "You reported unusual shifting, noise, vibration, or other behavior",
            );
        }

        if (manualMentionsEngineBraking) {
            factors.push(
                "Your owner's manual specifically describes an engine-braking or lower-range procedure",
            );
        }

        if (
            controlMethod === "manual-mode" ||
            controlMethod === "paddles" ||
            controlMethod === "lower-range"
        ) {
            factors.push(
                "You are using a driver-selectable transmission range or shift control",
            );
        }

        let recommendation: Recommendation;
        let heading: string;
        let description: string;

        if (slipperyRoad || situation === "slippery") {
            recommendation = "traction-caution";
            heading = "Traction is the bigger concern here.";
            description =
                "Engine braking can change the torque acting at the driven wheels. On snow, ice, or another low-traction surface, abrupt downshifting or strong engine braking can contribute to loss of grip. Use the vehicle's recommended slippery-road procedure rather than maximizing engine braking.";
        } else if (towing || situation === "towing") {
            recommendation = "towing-guidance";
            heading = "Use the vehicle's towing and downhill guidance.";
            description =
                "Engine braking can be useful while towing on a descent because it can reduce continuous reliance on the friction brakes. The appropriate gear, range, tow mode, speed, and load limits are vehicle-specific, so the owner's manual should control the strategy.";
        } else if (
            situation === "steep-descent" ||
            longDescent
        ) {
            recommendation = "appropriate";
            heading = "This is a normal use case for engine braking.";
            description =
                "Manufacturers commonly provide lower ranges, manual modes, or other transmission controls for downhill speed management. The goal is to supplement the friction brakes and avoid excessive brake heating—not to force an inappropriate gear or excessive engine speed.";
        } else {
            recommendation = "normal-operation";
            heading = "Normal automatic operation is usually enough.";
            description =
                "For ordinary driving, the transmission and friction brakes can generally manage routine deceleration without the driver deliberately selecting a lower range every time. Engine braking is a tool, not a requirement for every stop.";
        }

        return {
            recommendation,
            heading,
            description,
            factors,
        };
    }, [
        controlMethod,
        highRpmConcern,
        longDescent,
        manualMentionsEngineBraking,
        situation,
        slipperyRoad,
        towing,
        transmission,
        unusualBehavior,
        warningLight,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("engine_braking_check_result_changed", {
            tool: "engine_braking_check",
            recommendation: result.recommendation,
        });
    }, [result.recommendation]);

    return (
        <section
            id="engine-braking-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Engine Braking Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Is engine braking appropriate for what you are doing?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Engine braking is not one single maneuver. Tell us what transmission
                    and driving situation you are dealing with, and the tool will
                    highlight the factors that matter.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Vehicle
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <SelectField
                                label="Transmission type"
                                value={transmission}
                                onChange={(value) => {
                                    markStarted();
                                    setTransmission(value as TransmissionType);
                                }}
                                options={[
                                    ["automatic", "Automatic"],
                                    ["cvt", "CVT"],
                                    ["manual", "Manual"],
                                ]}
                            />

                            <SelectField
                                label="How are you controlling it?"
                                value={controlMethod}
                                onChange={(value) => {
                                    markStarted();
                                    setControlMethod(value as ControlMethod);
                                }}
                                options={[
                                    ["automatic", "Letting the transmission shift itself"],
                                    ["manual-mode", "Manual / sport shift mode"],
                                    ["paddles", "Paddle shifters"],
                                    ["lower-range", "Selecting a lower range"],
                                ]}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Situation
                        </p>

                        <div className="mt-6">
                            <SelectField
                                label="What are you doing?"
                                value={situation}
                                onChange={(value) => {
                                    markStarted();

                                    const nextSituation = value as DrivingSituation;
                                    setSituation(nextSituation);

                                    if (nextSituation === "towing") {
                                        setTowing(true);
                                    }

                                    if (nextSituation === "slippery") {
                                        setSlipperyRoad(true);
                                    }
                                }}
                                options={[
                                    ["steep-descent", "Driving down a steep hill"],
                                    ["normal-driving", "Normal everyday driving"],
                                    ["towing", "Towing or carrying a heavy load"],
                                    ["slippery", "Driving on snow, ice, or another slippery surface"],
                                ]}
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="This is a long or sustained descent"
                                checked={longDescent}
                                onChange={(checked) => {
                                    markStarted();
                                    setLongDescent(checked);
                                }}
                            />

                            <CheckboxField
                                label="I am towing or carrying a heavy load"
                                checked={towing}
                                onChange={(checked) => {
                                    markStarted();
                                    setTowing(checked);
                                }}
                            />

                            <CheckboxField
                                label="The road is slippery"
                                checked={slipperyRoad}
                                onChange={(checked) => {
                                    markStarted();
                                    setSlipperyRoad(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Things worth checking
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="The engine speed seems unusually high"
                                checked={highRpmConcern}
                                onChange={(checked) => {
                                    markStarted();
                                    setHighRpmConcern(checked);
                                }}
                            />

                            <CheckboxField
                                label="A transmission or powertrain warning light is on"
                                checked={warningLight}
                                onChange={(checked) => {
                                    markStarted();
                                    setWarningLight(checked);
                                }}
                            />

                            <CheckboxField
                                label="I notice unusual shifting, noise, vibration, or other behavior"
                                checked={unusualBehavior}
                                onChange={(checked) => {
                                    markStarted();
                                    setUnusualBehavior(checked);
                                }}
                            />

                            <CheckboxField
                                label="My owner's manual describes using a lower range or engine braking"
                                checked={manualMentionsEngineBraking}
                                onChange={(checked) => {
                                    markStarted();
                                    setManualMentionsEngineBraking(checked);
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
                            Engine Braking Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            {result.heading}
                        </h3>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            {result.description}
                        </p>

                        {result.factors.length > 0 ? (
                            <div className="mt-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                                    Factors affecting the result
                                </p>

                                <ul className="mt-4 space-y-3">
                                    {result.factors.slice(0, 8).map((factor) => (
                                        <li
                                            key={factor}
                                            className="flex items-start gap-3 leading-7"
                                        >
                                            <span
                                                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                                                aria-hidden="true"
                                            />

                                            <span>{factor}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {(warningLight ||
                            unusualBehavior ||
                            highRpmConcern) ? (
                            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Do not use this tool to diagnose a transmission problem
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    A warning light, abnormal behavior, or concern about excessive
                                    engine speed calls for vehicle-specific information. Check
                                    the owner&apos;s manual and obtain appropriate mechanical
                                    diagnosis when needed.
                                </p>
                            </div>
                        ) : null}

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                The owner&apos;s manual wins
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Automatic transmissions, CVTs, hybrids, towing modes, and
                                manual-shift systems behave differently. Use the ranges and
                                procedures specified for your vehicle rather than assuming a
                                gear or RPM target from another model applies to yours.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Engine Braking Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your driving situation to see what matters.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example selections above describe a conventional automatic
                            on a long downhill grade. Change at least one answer before using
                            the result.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

type SelectFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<[string, string]>;
};

function SelectField({
    label,
    value,
    onChange,
    options,
}: SelectFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                ))}
            </select>
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