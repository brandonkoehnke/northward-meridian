"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type VehicleEra =
    | "modern"
    | "carbureted"
    | "unknown";

type Symptom =
    | "mpg"
    | "acceleration"
    | "both"
    | "maintenance";

type FilterCondition =
    | "normal"
    | "dirty"
    | "severe"
    | "unknown";

type OtherFactor =
    | "tire-pressure"
    | "cold-weather"
    | "short-trips"
    | "roof-cargo"
    | "warning-light"
    | "none";

type ResultType =
    | "modern-mpg"
    | "modern-performance"
    | "carbureted"
    | "maintenance"
    | "diagnose";

export default function AirFilterRealityCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [vehicleEra, setVehicleEra] =
        useState<VehicleEra>("modern");

    const [symptom, setSymptom] =
        useState<Symptom>("mpg");

    const [filterCondition, setFilterCondition] =
        useState<FilterCondition>("dirty");

    const [otherFactors, setOtherFactors] = useState<OtherFactor[]>([
        "none",
    ]);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("air_filter_reality_check_started", {
                tool: "air_filter_reality_check",
            });
        }

        setHasInteracted(true);
    };

    const toggleFactor = (factor: OtherFactor) => {
        markStarted();

        setOtherFactors((current) => {
            if (factor === "none") {
                return ["none"];
            }

            const withoutNone = current.filter(
                (item) => item !== "none",
            );

            if (withoutNone.includes(factor)) {
                const next = withoutNone.filter(
                    (item) => item !== factor,
                );

                return next.length ? next : ["none"];
            }

            return [...withoutNone, factor];
        });
    };

    const result = useMemo(() => {
        const factors: string[] = [];

        if (vehicleEra === "modern") {
            factors.push(
                "You selected a modern fuel-injected vehicle",
            );
        }

        if (vehicleEra === "carbureted") {
            factors.push(
                "You selected an older carbureted vehicle",
            );
        }

        if (vehicleEra === "unknown") {
            factors.push(
                "The vehicle's fuel-system type is uncertain",
            );
        }

        if (filterCondition === "severe") {
            factors.push(
                "You described the filter as severely restricted or damaged",
            );
        }

        if (filterCondition === "dirty") {
            factors.push(
                "You described the filter as visibly dirty",
            );
        }

        if (otherFactors.includes("tire-pressure")) {
            factors.push(
                "Tire pressure has changed or may be low",
            );
        }

        if (otherFactors.includes("cold-weather")) {
            factors.push(
                "Cold weather or seasonal temperature change may affect fuel economy",
            );
        }

        if (otherFactors.includes("short-trips")) {
            factors.push(
                "More short-trip driving can change fuel consumption",
            );
        }

        if (otherFactors.includes("roof-cargo")) {
            factors.push(
                "Roof-mounted cargo or equipment can increase aerodynamic drag",
            );
        }

        if (otherFactors.includes("warning-light")) {
            factors.push(
                "A warning light is present and deserves vehicle-specific diagnosis",
            );
        }

        let resultType: ResultType;
        let heading: string;
        let description: string;

        if (otherFactors.includes("warning-light")) {
            resultType = "diagnose";
            heading =
                "Do not assume the air filter explains the problem.";
            description =
                "A warning light means the vehicle has information that should be diagnosed directly. A dirty filter may still need replacement, but it should not be used as a substitute explanation for a powertrain fault.";
        } else if (vehicleEra === "carbureted") {
            resultType = "carbureted";
            heading =
                "The old fuel-economy advice is more relevant to this vehicle.";
            description =
                "Research comparing older carbureted technology with modern closed-loop fuel injection found that severe air-filter restriction could affect fuel economy on the carbureted vehicle. Older fuel systems do not compensate for restricted airflow in the same way modern electronic systems can.";
        } else if (
            vehicleEra === "modern" &&
            (symptom === "acceleration" || symptom === "both")
        ) {
            resultType = "modern-performance";
            heading =
                "Performance is more plausible than a large MPG penalty.";
            description =
                "On the modern fuel-injected vehicles evaluated in DOE-supported research, severe filter restriction affected acceleration more clearly than fuel economy. The engine-management system can adjust fuel delivery as airflow changes, but a restricted filter can still limit the air available when the engine demands more power.";
        } else if (
            vehicleEra === "modern" &&
            symptom === "mpg"
        ) {
            resultType = "modern-mpg";
            heading =
                "A dirty air filter is not the strongest explanation for your MPG drop.";
            description =
                "DOE-supported testing found no significant fuel-economy effect from severe air-filter restriction on the modern fuel-injected gasoline vehicles evaluated. Other changes such as temperature, trip length, tire pressure, speed, and aerodynamic load may deserve attention too.";
        } else {
            resultType = "maintenance";
            heading =
                "Treat this primarily as a maintenance question.";
            description =
                "An engine air filter still has an important job even when replacing it does not produce a measurable MPG improvement. Follow the vehicle manufacturer';s inspection and replacement guidance and replace a damaged or excessively restricted filter when appropriate.";
        }

        return {
            resultType,
            heading,
            description,
            factors,
        };
    }, [
        filterCondition,
        otherFactors,
        symptom,
        vehicleEra,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("air_filter_reality_check_changed", {
            tool: "air_filter_reality_check",
            result: result.resultType,
        });
    }, [result.resultType]);

    return (
        <section
            id="air-filter-reality-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Air Filter Reality Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Is the air filter a likely explanation for what you are noticing?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    The answer changes substantially between older carbureted
                    engines and modern electronically controlled fuel-injected
                    vehicles.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <SelectField
                            label="Vehicle type"
                            value={vehicleEra}
                            onChange={(value) => {
                                markStarted();
                                setVehicleEra(value as VehicleEra);
                            }}
                            options={[
                                [
                                    "modern",
                                    "Modern fuel-injected gasoline vehicle",
                                ],
                                [
                                    "carbureted",
                                    "Older carbureted gasoline vehicle",
                                ],
                                ["unknown", "Not sure"],
                            ]}
                        />

                        <SelectField
                            label="What are you noticing?"
                            value={symptom}
                            onChange={(value) => {
                                markStarted();
                                setSymptom(value as Symptom);
                            }}
                            options={[
                                ["mpg", "Fuel economy has dropped"],
                                ["acceleration", "Sluggish acceleration"],
                                ["both", "Both MPG and acceleration"],
                                [
                                    "maintenance",
                                    "No symptom — routine maintenance",
                                ],
                            ]}
                        />

                        <SelectField
                            label="Filter condition"
                            value={filterCondition}
                            onChange={(value) => {
                                markStarted();
                                setFilterCondition(
                                    value as FilterCondition,
                                );
                            }}
                            options={[
                                ["normal", "Looks normal"],
                                ["dirty", "Visibly dirty"],
                                [
                                    "severe",
                                    "Severely restricted or damaged",
                                ],
                                ["unknown", "I have not checked"],
                            ]}
                        />
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            What else has changed?
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="Tire pressure may be lower"
                                checked={otherFactors.includes(
                                    "tire-pressure",
                                )}
                                onChange={() =>
                                    toggleFactor("tire-pressure")
                                }
                            />

                            <CheckboxField
                                label="Weather has become colder"
                                checked={otherFactors.includes(
                                    "cold-weather",
                                )}
                                onChange={() =>
                                    toggleFactor("cold-weather")
                                }
                            />

                            <CheckboxField
                                label="I am making more short trips"
                                checked={otherFactors.includes(
                                    "short-trips",
                                )}
                                onChange={() =>
                                    toggleFactor("short-trips")
                                }
                            />

                            <CheckboxField
                                label="I added roof cargo, crossbars, or another aerodynamic load"
                                checked={otherFactors.includes(
                                    "roof-cargo",
                                )}
                                onChange={() =>
                                    toggleFactor("roof-cargo")
                                }
                            />

                            <CheckboxField
                                label="A check-engine or other warning light is on"
                                checked={otherFactors.includes(
                                    "warning-light",
                                )}
                                onChange={() =>
                                    toggleFactor("warning-light")
                                }
                            />

                            <CheckboxField
                                label="None of these"
                                checked={otherFactors.includes("none")}
                                onChange={() => toggleFactor("none")}
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
                            Your Reality Check
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
                                    Factors affecting the answer
                                </p>

                                <ul className="mt-4 space-y-3">
                                    {result.factors.map((factor) => (
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

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                A filter can still need replacement even when MPG is
                                unaffected
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Fuel economy is only one possible consequence of
                                restriction. The filter&apos;s primary job is supplying
                                adequately filtered air to the engine. Follow the
                                manufacturer&apos;s inspection and replacement guidance.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Air Filter Reality Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Tell us what you are noticing.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example selections above describe a modern
                            fuel-injected vehicle with lower MPG and a visibly dirty
                            filter. Change at least one answer before using the
                            result.
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
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option
                        key={optionValue}
                        value={optionValue}
                    >
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
    onChange: () => void;
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
                onChange={onChange}
                className="mt-1 h-5 w-5 accent-[var(--accent)]"
            />

            <span>{label}</span>
        </label>
    );
}