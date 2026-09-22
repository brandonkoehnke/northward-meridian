"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type InspectionHistory =
    | "recent"
    | "one-to-three"
    | "over-three"
    | "never-unknown";

type RecordsQuality =
    | "complete"
    | "partial"
    | "minimal";

type Recommendation =
    | "check-requirements"
    | "inspect"
    | "documentation"
    | "evaluate-problem";

export default function SepticSaleDecisionCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [systemAge, setSystemAge] = useState("20");
    const [inspectionHistory, setInspectionHistory] =
        useState<InspectionHistory>("never-unknown");
    const [lastPumpedYears, setLastPumpedYears] = useState("3");
    const [recordsQuality, setRecordsQuality] =
        useState<RecordsQuality>("partial");

    const [backupSymptoms, setBackupSymptoms] = useState(false);
    const [odorSymptoms, setOdorSymptoms] = useState(false);
    const [drainfieldSymptoms, setDrainfieldSymptoms] = useState(false);
    const [slowDrains, setSlowDrains] = useState(false);

    const [requirementKnown, setRequirementKnown] = useState(false);
    const [inspectionRequired, setInspectionRequired] = useState(false);
    const [monthsUntilListing, setMonthsUntilListing] = useState("3");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("septic_sale_check_started", {
                tool: "septic_before_selling",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const age = Number(systemAge) || 0;
        const yearsSincePumping = Number(lastPumpedYears) || 0;
        const months = Number(monthsUntilListing) || 0;

        const symptoms = [
            backupSymptoms,
            odorSymptoms,
            drainfieldSymptoms,
            slowDrains,
        ].filter(Boolean).length;

        const factors: string[] = [];

        if (!requirementKnown) {
            factors.push(
                "You have not yet confirmed the inspection requirements for the sale",
            );
        }

        if (inspectionRequired) {
            factors.push(
                "You indicated that an inspection is required for the transaction",
            );
        }

        if (symptoms > 0) {
            factors.push(
                `${symptoms} possible septic warning ${symptoms === 1 ? "sign is" : "signs are"
                } present`,
            );
        }

        if (inspectionHistory === "never-unknown") {
            factors.push(
                "The system has no known recent professional inspection",
            );
        }

        if (inspectionHistory === "over-three") {
            factors.push(
                "The last known inspection was more than three years ago",
            );
        }

        if (inspectionHistory === "recent") {
            factors.push(
                "A professional inspection was completed within roughly the last year",
            );
        }

        if (recordsQuality === "complete") {
            factors.push(
                "You have relatively complete septic records",
            );
        }

        if (recordsQuality === "minimal") {
            factors.push(
                "Septic maintenance and system records are limited",
            );
        }

        if (age >= 25) {
            factors.push(
                "The system is approximately 25 years old or older",
            );
        }

        if (yearsSincePumping >= 5) {
            factors.push(
                "The entered pumping interval is relatively long",
            );
        }

        if (months > 0 && months <= 2) {
            factors.push(
                "The listing timeline is relatively short",
            );
        }

        let recommendation: Recommendation;
        let heading: string;
        let description: string;

        if (symptoms > 0) {
            recommendation = "evaluate-problem";
            heading = "Have the possible septic problem evaluated.";
            description =
                "Your answers include one or more warning signs. The priority is understanding the system's actual condition rather than deciding whether a routine pre-sale inspection is worthwhile.";
        } else if (!requirementKnown) {
            recommendation = "check-requirements";
            heading = "Check the sale requirements before scheduling anything.";
            description =
                "Inspection requirements vary by jurisdiction and transaction. Confirm whether a specific inspection, certification, report age, or inspector qualification applies before paying for voluntary work.";
        } else if (
            inspectionRequired ||
            inspectionHistory === "never-unknown" ||
            inspectionHistory === "over-three" ||
            recordsQuality === "minimal"
        ) {
            recommendation = "inspect";
            heading = "A pre-sale inspection deserves consideration.";
            description =
                "Your answers indicate enough uncertainty that learning the system's condition before buyer due diligence may be useful. Confirm the required inspection scope before scheduling it.";
        } else {
            recommendation = "documentation";
            heading = "Your existing documentation may be a useful starting point.";
            description =
                "Your answers indicate relatively recent information and no reported warning signs. Gather the existing report and maintenance records, then confirm whether the transaction requires anything newer or different.";
        }

        return {
            recommendation,
            heading,
            description,
            factors,
        };
    }, [
        backupSymptoms,
        drainfieldSymptoms,
        inspectionHistory,
        inspectionRequired,
        lastPumpedYears,
        monthsUntilListing,
        odorSymptoms,
        recordsQuality,
        requirementKnown,
        slowDrains,
        systemAge,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("septic_sale_check_result_changed", {
            tool: "septic_before_selling",
            recommendation: result.recommendation,
        });
    }, [result.recommendation]);

    return (
        <section
            id="septic-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Pre-Sale Septic Decision Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Decide whether an inspection would reduce useful uncertainty.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Start with what you know about the system, its maintenance history,
                    any warning signs, and the requirements that may apply to the sale.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            System history
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Approximate system age"
                                value={systemAge}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setSystemAge(value);
                                }}
                            />

                            <SelectField
                                label="Last professional inspection"
                                value={inspectionHistory}
                                onChange={(value) => {
                                    markStarted();
                                    setInspectionHistory(value as InspectionHistory);
                                }}
                                options={[
                                    ["recent", "Within the last year"],
                                    ["one-to-three", "1–3 years ago"],
                                    ["over-three", "More than 3 years ago"],
                                    ["never-unknown", "Never / not sure"],
                                ]}
                            />

                            <NumberField
                                label="Years since last pumping"
                                value={lastPumpedYears}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setLastPumpedYears(value);
                                }}
                            />

                            <SelectField
                                label="Quality of your septic records"
                                value={recordsQuality}
                                onChange={(value) => {
                                    markStarted();
                                    setRecordsQuality(value as RecordsQuality);
                                }}
                                options={[
                                    ["complete", "Good / mostly complete"],
                                    ["partial", "Some records"],
                                    ["minimal", "Very limited records"],
                                ]}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Warning signs
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="Sewage has backed up into the home"
                                checked={backupSymptoms}
                                onChange={(checked) => {
                                    markStarted();
                                    setBackupSymptoms(checked);
                                }}
                            />

                            <CheckboxField
                                label="There are persistent sewage odors"
                                checked={odorSymptoms}
                                onChange={(checked) => {
                                    markStarted();
                                    setOdorSymptoms(checked);
                                }}
                            />

                            <CheckboxField
                                label="The drainfield has wet, spongy, or suspicious areas"
                                checked={drainfieldSymptoms}
                                onChange={(checked) => {
                                    markStarted();
                                    setDrainfieldSymptoms(checked);
                                }}
                            />

                            <CheckboxField
                                label="Drains are persistently slow"
                                checked={slowDrains}
                                onChange={(checked) => {
                                    markStarted();
                                    setSlowDrains(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Sale requirements
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="I have checked the septic inspection requirements for this sale"
                                checked={requirementKnown}
                                onChange={(checked) => {
                                    markStarted();
                                    setRequirementKnown(checked);

                                    if (!checked) {
                                        setInspectionRequired(false);
                                    }
                                }}
                            />

                            {requirementKnown ? (
                                <CheckboxField
                                    label="A septic inspection or certification is required"
                                    checked={inspectionRequired}
                                    onChange={(checked) => {
                                        markStarted();
                                        setInspectionRequired(checked);
                                    }}
                                />
                            ) : null}
                        </div>

                        <div className="mt-6 max-w-md">
                            <NumberField
                                label="Months until listing"
                                value={monthsUntilListing}
                                suffix=" months"
                                onChange={(value) => {
                                    markStarted();
                                    setMonthsUntilListing(value);
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
                            Pre-Sale Septic Check
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
                                    {result.factors.slice(0, 7).map((factor) => (
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
                            <p className="font-semibold">Before scheduling an inspection</p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>• Confirm state and local requirements.</li>
                                <li>• Check any applicable lender or contract requirements.</li>
                                <li>• Ask what inspection scope is required.</li>
                                <li>• Gather pumping, maintenance, and repair records.</li>
                                <li>• Confirm whether an existing report is still acceptable.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Pre-Sale Septic Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your situation to see what deserves attention.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example values above are starting assumptions. Replace them
                            with what you know about your septic system and sale before using
                            the result.
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
    suffix?: string;
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    suffix,
    onChange,
}: NumberFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
                <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full bg-transparent py-3 text-[var(--foreground)] outline-none"
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