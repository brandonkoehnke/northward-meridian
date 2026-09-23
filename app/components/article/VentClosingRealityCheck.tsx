"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type SystemType =
    | "forced-air-furnace"
    | "central-heat-pump"
    | "mini-split"
    | "boiler"
    | "unknown";

type Goal =
    | "save-energy"
    | "redirect-air"
    | "unused-room"
    | "uneven-temperatures";

type ClosedVentCount =
    | "none"
    | "one"
    | "few"
    | "many";

type Symptom =
    | "noise"
    | "weak-airflow"
    | "uneven"
    | "frequent-cycling"
    | "none";

type ResultType =
    | "forced-air-energy"
    | "forced-air-balance"
    | "mini-split"
    | "boiler"
    | "diagnose"
    | "identify-system";

export default function VentClosingRealityCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [systemType, setSystemType] =
        useState<SystemType>("forced-air-furnace");

    const [goal, setGoal] =
        useState<Goal>("save-energy");

    const [closedVentCount, setClosedVentCount] =
        useState<ClosedVentCount>("few");

    const [symptoms, setSymptoms] =
        useState<Symptom[]>(["none"]);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("vent_closing_reality_check_started", {
                tool: "vent_closing_reality_check",
            });
        }

        setHasInteracted(true);
    };

    const toggleSymptom = (symptom: Symptom) => {
        markStarted();

        setSymptoms((current) => {
            if (symptom === "none") {
                return ["none"];
            }

            const withoutNone = current.filter(
                (item) => item !== "none",
            );

            if (withoutNone.includes(symptom)) {
                const next = withoutNone.filter(
                    (item) => item !== symptom,
                );

                return next.length ? next : ["none"];
            }

            return [...withoutNone, symptom];
        });
    };

    const result = useMemo(() => {
        const factors: string[] = [];

        if (systemType === "forced-air-furnace") {
            factors.push(
                "You selected a central forced-air furnace",
            );
        }

        if (systemType === "central-heat-pump") {
            factors.push(
                "You selected a central ducted heat pump",
            );
        }

        if (systemType === "mini-split") {
            factors.push(
                "You selected a ductless or mini-split system",
            );
        }

        if (systemType === "boiler") {
            factors.push(
                "You selected a boiler or radiator system",
            );
        }

        if (systemType === "unknown") {
            factors.push(
                "The type of heating and cooling system is uncertain",
            );
        }

        if (closedVentCount === "one") {
            factors.push(
                "You are considering closing one supply vent",
            );
        }

        if (closedVentCount === "few") {
            factors.push(
                "You are considering closing several supply vents",
            );
        }

        if (closedVentCount === "many") {
            factors.push(
                "You are considering closing many vents in part of the house",
            );
        }

        if (symptoms.includes("noise")) {
            factors.push(
                "You reported whistling or unusually noisy airflow",
            );
        }

        if (symptoms.includes("weak-airflow")) {
            factors.push(
                "You reported weak airflow at some registers",
            );
        }

        if (symptoms.includes("uneven")) {
            factors.push(
                "You reported uneven room temperatures",
            );
        }

        if (symptoms.includes("frequent-cycling")) {
            factors.push(
                "You reported unusually frequent system cycling",
            );
        }

        const hasSystemSymptoms =
            symptoms.includes("noise") ||
            symptoms.includes("weak-airflow") ||
            symptoms.includes("frequent-cycling");

        let resultType: ResultType;
        let heading: string;
        let description: string;

        if (systemType === "unknown") {
            resultType = "identify-system";
            heading =
                "Identify the system before changing airflow.";
            description =
                "Closing a supply register means something different on a central ducted system than controlling an individual mini-split or radiator zone. Start by identifying how your home distributes heating and cooling.";
        } else if (systemType === "mini-split") {
            resultType = "mini-split";
            heading =
                "Closing central-air vents is not the relevant strategy for this system.";
            description =
                "Ductless mini-splits are designed around individual indoor units or zones rather than a shared network of supply registers. Use the manufacturer's room or zone controls instead of applying central forced-air advice.";
        } else if (systemType === "boiler") {
            resultType = "boiler";
            heading =
                "This is a zoning question, not a supply-vent question.";
            description =
                "Boiler and radiator systems do not distribute conditioned air through central supply vents. Room-by-room control depends on the specific radiator, valve, thermostat, and zoning design.";
        } else if (hasSystemSymptoms) {
            resultType = "diagnose";
            heading =
                "The airflow symptoms deserve attention before you close more vents.";
            description =
                "Noise, weak airflow, or unusual cycling can indicate that the duct system is already operating under conditions worth evaluating. Closing additional supply registers may increase airflow resistance rather than solve the underlying problem.";
        } else if (
            goal === "redirect-air" ||
            goal === "uneven-temperatures"
        ) {
            resultType = "forced-air-balance";
            heading =
                "You may have an airflow-balancing problem rather than an energy-saving opportunity.";
            description =
                "Closing room registers can change airflow, but it is a crude way to balance a central forced-air system. Uneven temperatures can also result from duct design, leakage, insulation, return-air limitations, equipment sizing, or balancing issues.";
        } else {
            resultType = "forced-air-energy";
            heading =
                "Closing vents is not a reliable energy-saving strategy for this system.";
            description =
                "A central forced-air furnace or ducted heat pump does not simply reduce its energy use in proportion to the number of registers you close. Closing supply vents changes airflow and pressure in the duct system, so the expected savings are not as simple as conditioning fewer rooms.";
        }

        return {
            resultType,
            heading,
            description,
            factors,
        };
    }, [
        closedVentCount,
        goal,
        symptoms,
        systemType,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("vent_closing_reality_check_changed", {
            tool: "vent_closing_reality_check",
            result: result.resultType,
        });
    }, [result.resultType]);

    return (
        <section
            id="vent-closing-reality-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Vent Closing Reality Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Will closing vents help with what you are trying to do?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Start with the type of system you have. Advice about central
                    forced-air registers does not automatically apply to mini-splits,
                    boilers, radiators, or properly designed zoning systems.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <SelectField
                            label="Heating and cooling system"
                            value={systemType}
                            onChange={(value) => {
                                markStarted();
                                setSystemType(value as SystemType);
                            }}
                            options={[
                                [
                                    "forced-air-furnace",
                                    "Central forced-air furnace",
                                ],
                                [
                                    "central-heat-pump",
                                    "Central ducted heat pump",
                                ],
                                [
                                    "mini-split",
                                    "Ductless / mini-split",
                                ],
                                [
                                    "boiler",
                                    "Boiler / radiators",
                                ],
                                ["unknown", "Not sure"],
                            ]}
                        />

                        <SelectField
                            label="What are you trying to do?"
                            value={goal}
                            onChange={(value) => {
                                markStarted();
                                setGoal(value as Goal);
                            }}
                            options={[
                                ["save-energy", "Save energy or money"],
                                [
                                    "redirect-air",
                                    "Send more air to another room",
                                ],
                                [
                                    "unused-room",
                                    "Stop conditioning an unused room",
                                ],
                                [
                                    "uneven-temperatures",
                                    "Fix uneven room temperatures",
                                ],
                            ]}
                        />

                        <SelectField
                            label="How many supply vents?"
                            value={closedVentCount}
                            onChange={(value) => {
                                markStarted();
                                setClosedVentCount(
                                    value as ClosedVentCount,
                                );
                            }}
                            options={[
                                ["none", "None yet"],
                                ["one", "One vent"],
                                ["few", "A few vents"],
                                [
                                    "many",
                                    "Many vents in part of the house",
                                ],
                            ]}
                        />
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            What are you noticing?
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="Whistling or unusually noisy vents"
                                checked={symptoms.includes("noise")}
                                onChange={() => toggleSymptom("noise")}
                            />

                            <CheckboxField
                                label="Weak airflow at some registers"
                                checked={symptoms.includes(
                                    "weak-airflow",
                                )}
                                onChange={() =>
                                    toggleSymptom("weak-airflow")
                                }
                            />

                            <CheckboxField
                                label="Some rooms are consistently too hot or too cold"
                                checked={symptoms.includes("uneven")}
                                onChange={() => toggleSymptom("uneven")}
                            />

                            <CheckboxField
                                label="The system seems to cycle unusually often"
                                checked={symptoms.includes(
                                    "frequent-cycling",
                                )}
                                onChange={() =>
                                    toggleSymptom("frequent-cycling")
                                }
                            />

                            <CheckboxField
                                label="None of these"
                                checked={symptoms.includes("none")}
                                onChange={() => toggleSymptom("none")}
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
                                Closing a register is not the same as true HVAC zoning
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Proper zoning is designed around the equipment, ductwork,
                                controls, airflow, and pressure requirements of the system.
                                Manually shutting room registers does not automatically
                                reproduce that behavior.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Vent Closing Reality Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Tell us about your HVAC system.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example selections above describe a central forced-air
                            furnace where several vents might be closed to save energy.
                            Change at least one answer before using the result.
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