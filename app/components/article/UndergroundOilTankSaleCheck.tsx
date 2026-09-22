"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type TankKnowledge =
    | "suspected"
    | "known-active"
    | "known-abandoned"
    | "previously-removed";

type Documentation =
    | "good"
    | "partial"
    | "none";

type Recommendation =
    | "verify-first"
    | "check-requirements"
    | "removal-consideration"
    | "environmental-evaluation"
    | "documentation-review";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function UndergroundOilTankSaleCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [tankKnowledge, setTankKnowledge] =
        useState<TankKnowledge>("suspected");
    const [documentation, setDocumentation] =
        useState<Documentation>("none");

    const [fillPipePresent, setFillPipePresent] = useState(false);
    const [ventPipePresent, setVentPipePresent] = useState(false);
    const [priorSweep, setPriorSweep] = useState(false);

    const [leakEvidence, setLeakEvidence] = useState(false);
    const [contaminationKnown, setContaminationKnown] = useState(false);

    const [requirementsChecked, setRequirementsChecked] = useState(false);
    const [removalRequired, setRemovalRequired] = useState(false);

    const [monthsUntilListing, setMonthsUntilListing] = useState("3");
    const [removalQuote, setRemovalQuote] = useState("4000");
    const [investigationQuote, setInvestigationQuote] = useState("500");
    const [remediationQuote, setRemediationQuote] = useState("");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("underground_oil_tank_check_started", {
                tool: "underground_oil_tank_before_selling",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const removal = parseNumber(removalQuote);
        const investigation = parseNumber(investigationQuote);
        const remediation = parseNumber(remediationQuote);
        const months = parseNumber(monthsUntilListing);

        const factors: string[] = [];

        if (tankKnowledge === "suspected") {
            factors.push(
                "The presence and status of an underground tank have not yet been confirmed",
            );
        }

        if (tankKnowledge === "known-active") {
            factors.push(
                "A known underground tank is still active",
            );
        }

        if (tankKnowledge === "known-abandoned") {
            factors.push(
                "A known underground tank is no longer in use",
            );
        }

        if (tankKnowledge === "previously-removed") {
            factors.push(
                "The tank is reported to have been removed previously",
            );
        }

        if (documentation === "none") {
            factors.push(
                "You have little or no documentation about the tank",
            );
        }

        if (documentation === "partial") {
            factors.push(
                "Only partial tank documentation is available",
            );
        }

        if (documentation === "good") {
            factors.push(
                "You have relatively complete tank documentation",
            );
        }

        if (fillPipePresent || ventPipePresent) {
            factors.push(
                "Visible tank-related piping may warrant verification of what remains on the property",
            );
        }

        if (priorSweep) {
            factors.push(
                "A previous tank sweep or detection investigation has been performed",
            );
        }

        if (leakEvidence) {
            factors.push(
                "Possible leakage or release evidence has been reported",
            );
        }

        if (contaminationKnown) {
            factors.push(
                "Environmental contamination is already known or documented",
            );
        }

        if (!requirementsChecked) {
            factors.push(
                "Applicable state and local requirements have not yet been confirmed",
            );
        }

        if (removalRequired) {
            factors.push(
                "You indicated that an applicable requirement calls for tank removal",
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

        if (leakEvidence || contaminationKnown) {
            recommendation = "environmental-evaluation";
            heading = "Address the possible environmental issue first.";
            description =
                "Your answers indicate possible leakage or known contamination. This is no longer just a pre-sale tank decision. Determine the applicable reporting, investigation, cleanup, and professional requirements before relying on ordinary sale negotiations.";
        } else if (!requirementsChecked) {
            recommendation = "check-requirements";
            heading = "Check the applicable rules before deciding.";
            description =
                "Residential heating-oil tank requirements can vary by state and locality. Confirm what applies to this property before assuming that removal, abandonment in place, or existing documentation will satisfy the transaction.";
        } else if (tankKnowledge === "suspected") {
            recommendation = "verify-first";
            heading = "Verify whether a tank is present before planning removal.";
            description =
                "Your answers do not yet establish that an underground tank is present. An appropriate records review, tank sweep, or other qualified investigation may provide more useful information than immediately planning excavation.";
        } else if (
            tankKnowledge === "known-abandoned" &&
            (documentation === "none" ||
                documentation === "partial" ||
                removalRequired)
        ) {
            recommendation = "removal-consideration";
            heading = "Removal deserves serious consideration.";
            description =
                "You have a known inactive underground tank with limited documentation or an indicated removal requirement. Compare professional removal with any legally permitted alternative, and verify what documentation the sale will require.";
        } else if (
            tankKnowledge === "previously-removed" &&
            documentation === "good"
        ) {
            recommendation = "documentation-review";
            heading = "Your existing documentation may be the starting point.";
            description =
                "The tank is reported as previously removed and you have relatively complete records. Confirm that the documentation establishes what was done and remains acceptable for the current property and transaction.";
        } else {
            recommendation = "documentation-review";
            heading = "Confirm the tank status and documentation before choosing a project.";
            description =
                "Your answers do not establish that immediate removal is the only reasonable path. Verify the tank's status, applicable requirements, and available records before deciding how to handle it before sale.";
        }

        return {
            recommendation,
            heading,
            description,
            factors,
            removal,
            investigation,
            remediation,
        };
    }, [
        contaminationKnown,
        documentation,
        fillPipePresent,
        investigationQuote,
        leakEvidence,
        monthsUntilListing,
        priorSweep,
        remediationQuote,
        removalQuote,
        removalRequired,
        requirementsChecked,
        tankKnowledge,
        ventPipePresent,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("underground_oil_tank_check_result_changed", {
            tool: "underground_oil_tank_before_selling",
            recommendation: result.recommendation,
        });
    }, [result.recommendation]);

    return (
        <section
            id="tank-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Pre-Sale Underground Tank Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    First determine what is actually on the property.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Separate a suspected tank from a known tank, and a normal tank
                    decision from a possible environmental release.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Tank status
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <SelectField
                                label="What do you know about the tank?"
                                value={tankKnowledge}
                                onChange={(value) => {
                                    markStarted();
                                    setTankKnowledge(value as TankKnowledge);
                                }}
                                options={[
                                    ["suspected", "A tank is suspected"],
                                    ["known-active", "Known and still active"],
                                    ["known-abandoned", "Known but no longer used"],
                                    ["previously-removed", "Reported as previously removed"],
                                ]}
                            />

                            <SelectField
                                label="Available documentation"
                                value={documentation}
                                onChange={(value) => {
                                    markStarted();
                                    setDocumentation(value as Documentation);
                                }}
                                options={[
                                    ["none", "Little or none"],
                                    ["partial", "Some documentation"],
                                    ["good", "Good / relatively complete"],
                                ]}
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="An old fill pipe is visible"
                                checked={fillPipePresent}
                                onChange={(checked) => {
                                    markStarted();
                                    setFillPipePresent(checked);
                                }}
                            />

                            <CheckboxField
                                label="An old vent pipe is visible"
                                checked={ventPipePresent}
                                onChange={(checked) => {
                                    markStarted();
                                    setVentPipePresent(checked);
                                }}
                            />

                            <CheckboxField
                                label="A tank sweep or similar investigation has already been performed"
                                checked={priorSweep}
                                onChange={(checked) => {
                                    markStarted();
                                    setPriorSweep(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Environmental concerns
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="There is evidence suggesting the tank may have leaked"
                                checked={leakEvidence}
                                onChange={(checked) => {
                                    markStarted();
                                    setLeakEvidence(checked);
                                }}
                            />

                            <CheckboxField
                                label="Soil or groundwater contamination is already known or documented"
                                checked={contaminationKnown}
                                onChange={(checked) => {
                                    markStarted();
                                    setContaminationKnown(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Requirements
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="I have checked the applicable state and local tank requirements"
                                checked={requirementsChecked}
                                onChange={(checked) => {
                                    markStarted();
                                    setRequirementsChecked(checked);

                                    if (!checked) {
                                        setRemovalRequired(false);
                                    }
                                }}
                            />

                            {requirementsChecked ? (
                                <CheckboxField
                                    label="An applicable requirement calls for removal"
                                    checked={removalRequired}
                                    onChange={(checked) => {
                                        markStarted();
                                        setRemovalRequired(checked);
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Sale and cost
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Months until listing"
                                value={monthsUntilListing}
                                suffix=" months"
                                onChange={(value) => {
                                    markStarted();
                                    setMonthsUntilListing(value);
                                }}
                            />

                            <NumberField
                                label="Tank investigation / sweep quote"
                                value={investigationQuote}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setInvestigationQuote(value);
                                }}
                            />

                            <NumberField
                                label="Tank removal quote"
                                value={removalQuote}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setRemovalQuote(value);
                                }}
                            />

                            <NumberField
                                label="Known remediation estimate"
                                value={remediationQuote}
                                prefix="$"
                                placeholder="Leave blank if unknown"
                                onChange={(value) => {
                                    markStarted();
                                    setRemediationQuote(value);
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
                            Pre-Sale Tank Check
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

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <ResultMetric
                                label="Investigation"
                                value={formatCurrency(result.investigation)}
                                detail="Your entered investigation quote"
                            />

                            <ResultMetric
                                label="Removal"
                                value={formatCurrency(result.removal)}
                                detail="Your entered removal quote"
                            />

                            <ResultMetric
                                label="Remediation"
                                value={
                                    result.remediation > 0
                                        ? formatCurrency(result.remediation)
                                        : "Unknown"
                                }
                                detail="Your entered remediation estimate"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                This tool cannot determine environmental safety or compliance
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Tank detection, release investigation, soil or groundwater
                                evaluation, regulatory reporting, closure, and remediation
                                should be handled according to the requirements that apply to
                                the property and by appropriately qualified professionals.
                            </p>
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Before making the final decision
                            </p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>• Confirm whether a tank is actually present.</li>
                                <li>• Determine whether it is active, abandoned, or removed.</li>
                                <li>• Gather existing tank and heating-system records.</li>
                                <li>• Check applicable state and local requirements.</li>
                                <li>• Investigate any evidence of leakage separately.</li>
                                <li>• Obtain written professional estimates where appropriate.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Pre-Sale Tank Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter what you know about the tank first.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example costs above are starting assumptions. Replace them
                            with your information and actual estimates before using the
                            result.
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
    placeholder?: string;
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
    placeholder,
    onChange,
}: NumberFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
                {prefix ? (
                    <span className="text-[var(--muted)]">{prefix}</span>
                ) : null}

                <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
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