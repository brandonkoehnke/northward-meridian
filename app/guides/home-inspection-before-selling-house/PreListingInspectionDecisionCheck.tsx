"use client";

import { useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type RecentInspection = "yes" | "no" | "unknown";
type KnownProblems = "none" | "minor" | "significant";
type SurpriseImportance = "low" | "moderate" | "high";
type SaleTimeline = "no" | "somewhat" | "yes";
type TargetedConcern = "broad" | "targeted";
type ChangePlan =
    | "repair"
    | "evaluate"
    | "pricing"
    | "documentation"
    | "no-change";

type ResultType =
    | "higher-information-value"
    | "moderate-information-value"
    | "lower-information-value"
    | "targeted-evaluation";

type ResultTone = "positive" | "neutral" | "warning";

type Result = {
    type: ResultType;
    tone: ResultTone;
    heading: string;
    description: string;
    reasons: string[];
};

const warningSignOptions = [
    ["water", "Water intrusion or staining"],
    ["electrical", "Electrical concerns"],
    ["plumbing", "Plumbing symptoms"],
    ["foundation", "Foundation or structural symptoms"],
    ["roof", "Roof concerns"],
    ["hvac", "HVAC concerns"],
    ["other", "Another unexplained condition"],
] as const;

const changePlanOptions: Array<[ChangePlan, string]> = [
    ["repair", "Repair significant findings before listing"],
    ["evaluate", "Get specialist evaluations or estimates"],
    ["pricing", "Adjust pricing or sale strategy"],
    ["documentation", "Prepare documentation or disclosures"],
    ["no-change", "Probably make no change"],
];

export default function PreListingInspectionDecisionCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [homeAge, setHomeAge] = useState("50");
    const [ownershipYears, setOwnershipYears] = useState("10");
    const [recentInspection, setRecentInspection] =
        useState<RecentInspection>("unknown");

    const [knownProblems, setKnownProblems] =
        useState<KnownProblems>("none");
    const [warningSigns, setWarningSigns] = useState<string[]>([]);
    const [changePlans, setChangePlans] = useState<ChangePlan[]>([]);
    const [surpriseImportance, setSurpriseImportance] =
        useState<SurpriseImportance>("moderate");
    const [tightTimeline, setTightTimeline] =
        useState<SaleTimeline>("no");
    const [wantsMultipleQuotes, setWantsMultipleQuotes] = useState(false);
    const [targetedConcern, setTargetedConcern] =
        useState<TargetedConcern>("broad");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("pre_listing_inspection_decision_started", {
                tool: "pre_listing_inspection_decision",
            });
        }

        setHasInteracted(true);
    };

    const toggleWarningSign = (value: string) => {
        markStarted();

        setWarningSigns((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
        );
    };

    const toggleChangePlan = (value: ChangePlan) => {
        markStarted();

        setChangePlans((current) => {
            if (value === "no-change") {
                return current.includes("no-change") ? [] : ["no-change"];
            }

            const withoutNoChange = current.filter(
                (item) => item !== "no-change",
            );

            return withoutNoChange.includes(value)
                ? withoutNoChange.filter((item) => item !== value)
                : [...withoutNoChange, value];
        });
    };

    const result: Result = (() => {
        const age = Math.max(Number(homeAge) || 0, 0);
        const ownership = Math.max(Number(ownershipYears) || 0, 0);

        const reasonCodes: string[] = [];

        const decisionUse = changePlans.filter(
            (item) => item !== "no-change",
        ).length;

        const hasRecentInformation = recentInspection === "yes";
        const hasNoRecentInspection = recentInspection === "no";

        const hasWarningSigns = warningSigns.length > 0;

        const hasMeaningfulUncertainty =
            knownProblems === "significant" ||
            hasWarningSigns ||
            recentInspection !== "yes";

        const hasStrongConditionUncertainty =
            knownProblems === "significant" ||
            hasWarningSigns;

        const highSurpriseConcern = surpriseImportance === "high";
        const moderateSurpriseConcern = surpriseImportance === "moderate";
        const hasTimelineValue = tightTimeline !== "no";

        const wouldActOnFindings = decisionUse > 0;
        const wouldSeekEstimates =
            wantsMultipleQuotes ||
            changePlans.includes("evaluate");

        const olderHome = age >= 50;
        const longerOwnership = ownership >= 10;

        if (
            targetedConcern === "targeted" &&
            (hasWarningSigns || knownProblems !== "none")
        ) {
            reasonCodes.push(
                "Your uncertainty is concentrated in a particular condition or system.",
            );

            reasonCodes.push(
                "A specialist evaluation may provide more useful information than a broad inspection.",
            );

            if (changePlans.includes("repair")) {
                reasonCodes.push(
                    "You would use the findings to decide whether additional repair work is warranted.",
                );
            }

            if (changePlans.includes("evaluate")) {
                reasonCodes.push(
                    "You would use the findings to decide whether a specialist evaluation or estimate is warranted.",
                );
            }

            if (changePlans.includes("pricing")) {
                reasonCodes.push(
                    "You would use the findings to inform your pricing or sale strategy.",
                );
            }

            if (changePlans.includes("documentation")) {
                reasonCodes.push(
                    "You would use the findings to prepare documentation or disclosures.",
                );
            }

            if (wantsMultipleQuotes) {
                reasonCodes.push(
                    "You would benefit from having time to obtain estimates before listing.",
                );
            }

            return {
                type: "targeted-evaluation",
                tone: "warning",
                heading: "A targeted evaluation may fit your situation better",
                description:
                    "Your answers suggest that the main uncertainty is concentrated in a specific condition. A specialist evaluation may answer that question more directly than paying for a broad pre-listing inspection.",
                reasons: reasonCodes,
            };
        }

        if (hasNoRecentInspection) {
            reasonCodes.push(
                "You do not have a recent whole-home inspection.",
            );
        }

        if (hasStrongConditionUncertainty) {
            reasonCodes.push(
                "You identified meaningful uncertainty about the home's condition.",
            );
        }

        if (hasWarningSigns) {
            reasonCodes.push(
                "You identified one or more unexplained condition concerns.",
            );
        }

        if (knownProblems === "significant") {
            reasonCodes.push(
                "You already know of significant unresolved problems.",
            );
        }

        if (wouldActOnFindings) {
            reasonCodes.push(
                "You would use new information to influence repairs, evaluations, pricing, or documentation.",
            );
        }

        if (highSurpriseConcern) {
            reasonCodes.push(
                "Avoiding a major surprise after accepting an offer is highly important to you.",
            );
        }

        if (moderateSurpriseConcern) {
            reasonCodes.push(
                "Avoiding a major surprise after accepting an offer is moderately important to you.",
            );
        }

        if (hasTimelineValue) {
            reasonCodes.push(
                "Your sale timeline creates some value in learning about problems earlier.",
            );
        }

        if (wouldSeekEstimates) {
            reasonCodes.push(
                "You would benefit from having time to investigate or obtain estimates before listing.",
            );
        }

        /*
         * HIGHER INFORMATION VALUE
         *
         * We want this branch reserved for situations where there is a
         * meaningful combination of uncertainty and practical decision value.
         *
         * Stronger signals:
         * - significant known problems or warning signs, OR
         * - actionable use of findings plus high surprise concern, OR
         * - multiple strong contextual signals around uncertainty and action.
         */
        const higherValue =
            !hasRecentInformation &&
            (
                hasStrongConditionUncertainty &&
                wouldActOnFindings
                ||
                hasStrongConditionUncertainty &&
                highSurpriseConcern
                ||
                wouldActOnFindings &&
                highSurpriseConcern &&
                (hasTimelineValue || wantsMultipleQuotes)
                ||
                knownProblems === "significant" &&
                wouldActOnFindings
            );

        if (higherValue) {
            return {
                type: "higher-information-value",
                tone: "positive",
                heading:
                    "A pre-listing inspection may have higher decision value",
                description:
                    "You have meaningful uncertainty about the home's condition and appear likely to use what you learn before listing. Getting information while you still control the timing can give you more opportunity to investigate, repair, document, price, or otherwise plan around material findings.",
                reasons:
                    reasonCodes.length > 0
                        ? reasonCodes
                        : [
                            "You have meaningful uncertainty about the home's condition.",
                            "You would use the findings to influence what happens before listing.",
                        ],
            };
        }

        /*
         * LOWER INFORMATION VALUE
         *
         * A recent inspection, no meaningful issues, and little reason to
         * change course is the strongest lower-value pattern.
         */
        const lowerValue =
            recentInspection === "yes" &&
            knownProblems === "none" &&
            !hasWarningSigns &&
            surpriseImportance === "low" &&
            changePlans.includes("no-change");

        if (lowerValue) {
            return {
                type: "lower-information-value",
                tone: "neutral",
                heading:
                    "A broad pre-listing inspection may add less incremental information",
                description:
                    "You already have recent condition information, have not identified meaningful warning signs, and place relatively low importance on avoiding a surprise after accepting an offer. A new broad inspection may still be useful, but the incremental decision value appears lower from these inputs.",
                reasons: [
                    "You already have a recent whole-home inspection.",
                    "You did not identify significant unresolved or unexplained problems.",
                    "Avoiding a major inspection surprise is currently a lower priority.",
                ],
            };
        }

        /*
         * MODERATE INFORMATION VALUE
         *
         * Everything that does not clearly belong in the higher or lower
         * categories lands here. This is intentionally the broad middle.
         */
        if (
            hasNoRecentInspection &&
            (
                wouldActOnFindings ||
                moderateSurpriseConcern ||
                hasMeaningfulUncertainty ||
                olderHome ||
                longerOwnership ||
                hasTimelineValue
            )
        ) {
            return {
                type: "moderate-information-value",
                tone: "neutral",
                heading:
                    "A pre-listing inspection could be useful",
                description:
                    "Your answers suggest that earlier information could have practical value, but the benefit depends on whether the findings would change your repairs, pricing, documentation, or sale strategy.",
                reasons:
                    reasonCodes.length > 0
                        ? reasonCodes
                        : [
                            "You do not have a recent whole-home inspection.",
                            "The practical value depends on how you would use the findings.",
                        ],
            };
        }

        if (
            recentInspection === "yes" &&
            (
                wouldActOnFindings ||
                moderateSurpriseConcern ||
                hasWarningSigns ||
                knownProblems !== "none"
            )
        ) {
            return {
                type: "moderate-information-value",
                tone: "neutral",
                heading:
                    "A pre-listing inspection could be useful",
                description:
                    "You already have some recent condition information, but your answers suggest that additional findings could still influence what you do before listing.",
                reasons:
                    reasonCodes.length > 0
                        ? reasonCodes
                        : [
                            "You already have some recent condition information.",
                            "Additional findings could still influence your preparation or sale strategy.",
                        ],
            };
        }

        return {
            type: "moderate-information-value",
            tone: "neutral",
            heading:
                "A pre-listing inspection could be useful",
            description:
                "The value of an inspection appears situational. Consider whether knowing more before listing would change your repairs, pricing, documentation, or preparation strategy.",
            reasons:
                reasonCodes.length > 0
                    ? reasonCodes
                    : [
                        "The inspection's value depends on what you would do with the findings.",
                        "Compare the cost of the inspection with the practical value of reducing uncertainty before listing.",
                    ],
        };
    })();

    const resultClasses: Record<ResultTone, string> = {
        positive: "border-[var(--accent)] bg-white",
        neutral: "border-[var(--border)] bg-white",
        warning: "border-amber-300 bg-amber-50",
    };

    return (
        <section
            id="pre-listing-inspection-decision-check"
            className="mx-auto max-w-4xl scroll-mt-24 px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Pre-Listing Inspection Decision Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Would knowing more about your house before listing change anything
                    you can still control?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    This free planning check helps you think through whether a broad
                    pre-listing inspection could provide useful information, whether a
                    targeted specialist may be more appropriate, or whether you already
                    know enough to move forward.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Approximate home age"
                            value={homeAge}
                            suffix="years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setHomeAge(value);
                            }}
                        />

                        <NumberField
                            label="How long have you owned it?"
                            value={ownershipYears}
                            suffix="years"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setOwnershipYears(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Current Information
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <SelectField
                                label="Do you have a recent whole-home inspection?"
                                value={recentInspection}
                                onChange={(value) => {
                                    markStarted();
                                    setRecentInspection(
                                        value as RecentInspection,
                                    );
                                }}
                                options={[
                                    ["no", "No"],
                                    ["yes", "Yes"],
                                    ["unknown", "Not sure / not recent enough"],
                                ]}
                            />

                            <SelectField
                                label="Known unresolved problems"
                                value={knownProblems}
                                onChange={(value) => {
                                    markStarted();
                                    setKnownProblems(
                                        value as KnownProblems,
                                    );
                                }}
                                options={[
                                    ["none", "None that I know of"],
                                    ["minor", "Minor or localized issues"],
                                    ["significant", "Significant or uncertain issues"],
                                ]}
                            />
                        </div>

                        <div className="mt-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                                Unexplained warning signs
                            </p>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {warningSignOptions.map(([value, label]) => (
                                    <CheckboxField
                                        key={value}
                                        label={label}
                                        checked={warningSigns.includes(value)}
                                        onChange={() => toggleWarningSign(value)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            What Would You Do With New Information?
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Select every realistic use. This is one of the most important
                            parts of the check.
                        </p>

                        <div className="mt-5 space-y-3">
                            {changePlanOptions.map(([value, label]) => (
                                <CheckboxField
                                    key={value}
                                    label={label}
                                    checked={changePlans.includes(value)}
                                    onChange={() => toggleChangePlan(value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Sale Timing and Surprise Risk
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <SelectField
                                label="How important is avoiding a major surprise after accepting an offer?"
                                value={surpriseImportance}
                                onChange={(value) => {
                                    markStarted();
                                    setSurpriseImportance(
                                        value as SurpriseImportance,
                                    );
                                }}
                                options={[
                                    ["low", "Low"],
                                    ["moderate", "Moderate"],
                                    ["high", "High"],
                                ]}
                            />

                            <SelectField
                                label="Is your sale timeline tight?"
                                value={tightTimeline}
                                onChange={(value) => {
                                    markStarted();
                                    setTightTimeline(value as SaleTimeline);
                                }}
                                options={[
                                    ["no", "No"],
                                    ["somewhat", "Somewhat"],
                                    ["yes", "Yes"],
                                ]}
                            />
                        </div>

                        <div className="mt-6">
                            <CheckboxField
                                label="I would like time to obtain multiple repair or specialist estimates before listing"
                                checked={wantsMultipleQuotes}
                                onChange={(checked) => {
                                    markStarted();
                                    setWantsMultipleQuotes(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Broad or Targeted?
                        </p>

                        <div className="mt-6">
                            <SelectField
                                label="Where is most of your uncertainty?"
                                value={targetedConcern}
                                onChange={(value) => {
                                    markStarted();
                                    setTargetedConcern(
                                        value as TargetedConcern,
                                    );
                                }}
                                options={[
                                    [
                                        "broad",
                                        "I want a broad review of the house",
                                    ],
                                    [
                                        "targeted",
                                        "One particular system or condition concerns me most",
                                    ],
                                ]}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                A general inspection is not always the highest-value next
                                step
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                A known roof, septic, structural, plumbing, electrical, or
                                HVAC concern may call for a specialist evaluation rather than
                                another broad inspection.
                            </p>
                        </div>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className={`mt-8 rounded-2xl border p-8 ${resultClasses[result.tone]}`}
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Planning Result
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            {result.heading}
                        </h3>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            {result.description}
                        </p>

                        <div className="mt-7">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                                Why this result
                            </p>

                            <ul className="mt-4 space-y-3">
                                {result.reasons.map((reason) => (
                                    <li
                                        key={reason}
                                        className="flex gap-3 leading-7"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                                        />

                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">Disclosure check</p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Learning about a condition can affect what you need to
                                disclose during a sale. Requirements vary by jurisdiction.
                                Check the rules that apply to your transaction before ordering
                                an inspection specifically to uncover unknown conditions.
                            </p>
                        </div>

                        <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
                            This is a planning aid, not a property inspection, legal
                            opinion, defect diagnosis, or guarantee that an inspection will
                            identify every condition.
                        </p>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Pre-Listing Inspection Decision Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Start with your actual situation.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The result is based on whether a new inspection is likely to
                            provide information you can still use before listing.
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
    step?: string;
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
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
                <input
                    type="number"
                    min="0"
                    step={step}
                    inputMode="numeric"
                    value={value}
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
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
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