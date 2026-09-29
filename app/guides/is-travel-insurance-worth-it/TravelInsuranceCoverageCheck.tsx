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

function formatPercent(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
    }).format(value);
}

type CoverageStatus = "yes" | "no" | "unknown";

function coverageLabel(status: CoverageStatus) {
    switch (status) {
        case "yes":
            return "Yes";
        case "no":
            return "No";
        default:
            return "I don't know";
    }
}

export default function TravelInsuranceCoverageCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [tripCost, setTripCost] = useState("5000");
    const [recoverableAmount, setRecoverableAmount] = useState("1500");
    const [existingTripCoverage, setExistingTripCoverage] =
        useState("0");
    const [insurancePremium, setInsurancePremium] =
        useState("300");

    const [international, setInternational] =
        useState<"yes" | "no">("yes");

    const [medicalCoverage, setMedicalCoverage] =
        useState<CoverageStatus>("unknown");

    const [evacuationCoverage, setEvacuationCoverage] =
        useState<CoverageStatus>("unknown");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "travel_insurance_decision_started",
                {
                    tool: "travel_insurance_coverage_gap",
                },
            );
        }

        setHasInteracted(true);
    };

    const totalTripCost = Math.max(
        parseNumber(tripCost),
        0,
    );

    const recoverable = Math.min(
        Math.max(parseNumber(recoverableAmount), 0),
        totalTripCost,
    );

    const existingCoverage = Math.min(
        Math.max(parseNumber(existingTripCoverage), 0),
        Math.max(totalTripCost - recoverable, 0),
    );

    const premium = Math.max(
        parseNumber(insurancePremium),
        0,
    );

    const nonrecoverableExposure = Math.max(
        totalTripCost - recoverable,
        0,
    );

    const remainingTripExposure = Math.max(
        nonrecoverableExposure - existingCoverage,
        0,
    );

    const premiumAsPercentOfExposure =
        remainingTripExposure > 0
            ? (premium / remainingTripExposure) * 100
            : null;

    const tripCostCoverageGap =
        remainingTripExposure > 0;

    const medicalGap =
        international === "yes" &&
        medicalCoverage !== "yes";

    const evacuationGap =
        international === "yes" &&
        evacuationCoverage !== "yes";

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "travel_insurance_decision_changed",
            {
                tool: "travel_insurance_coverage_gap",
            },
        );
    }, [
        tripCost,
        recoverableAmount,
        existingTripCoverage,
        insurancePremium,
        international,
        medicalCoverage,
        evacuationCoverage,
    ]);

    let resultHeading: string;
    let resultDescription: string;

    if (
        medicalGap &&
        evacuationGap &&
        tripCostCoverageGap
    ) {
        resultHeading =
            "You have several separate coverage gaps to investigate.";

        resultDescription =
            "Your trip has meaningful nonrecoverable financial exposure, and your current answers do not establish medical or evacuation coverage for international travel. The numbers do not determine whether insurance is worth buying, but they show several areas where a policy could provide protection.";
    } else if (medicalGap || evacuationGap) {
        resultHeading =
            "Your largest concern may be a coverage gap rather than the trip cost.";

        resultDescription =
            "Your answers indicate that at least one important international-travel coverage area is missing or uncertain. Review your existing health and evacuation benefits before comparing travel insurance policies.";
    } else if (
        remainingTripExposure > 0 &&
        premiumAsPercentOfExposure !== null
    ) {
        resultHeading =
            "You have measurable trip-cost exposure and existing coverage to compare.";

        resultDescription =
            "Your trip includes nonrecoverable expenses that are not fully covered by the protection you entered. Compare the policy premium and covered reasons for cancellation or interruption against this remaining exposure rather than the total trip price.";
    } else if (remainingTripExposure <= 0) {
        resultHeading =
            "Your entered trip-cost exposure is largely covered already.";

        resultDescription =
            "Based on the amounts you entered, the trip's nonrecoverable cost is fully offset by recoverable bookings and existing trip coverage. Additional insurance may still be relevant for medical, evacuation, delay, or other benefits, so review those separately.";
    } else {
        resultHeading =
            "Your trip has limited information available for a financial comparison.";

        resultDescription =
            "Enter your actual nonrecoverable costs, existing coverage, and policy premium. Travel insurance decisions depend heavily on what your current bookings and benefits already protect.";
    }

    return (
        <section
            id="travel-insurance-coverage-gap"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Travel Insurance Coverage Gap Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What could you actually lose, and what is already covered?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Start with your financial exposure, then check the medical and
                    evacuation coverage you already have. The tool does not estimate
                    the probability of an emergency; it shows the gaps that matter
                    before you compare policies.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Your trip
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Total prepaid trip cost"
                            value={tripCost}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setTripCost(value);
                            }}
                            onBlur={() => {
                                const parsedTripCost = Math.max(
                                    parseNumber(tripCost),
                                    0,
                                );

                                setTripCost(String(parsedTripCost));

                                setRecoverableAmount((current) =>
                                    String(
                                        Math.min(
                                            Math.max(parseNumber(current), 0),
                                            parsedTripCost,
                                        ),
                                    ),
                                );
                            }}
                        />

                        <NumberField
                            label="Amount you could recover without insurance"
                            value={recoverableAmount}
                            prefix="$"
                            step="100"
                            max={String(totalTripCost)}
                            onChange={(value) => {
                                markStarted();

                                const parsed = parseNumber(value);

                                setRecoverableAmount(
                                    value === ""
                                        ? ""
                                        : String(
                                            Math.min(
                                                Math.max(parsed, 0),
                                                totalTripCost,
                                            ),
                                        ),
                                );
                            }}
                        />

                        <NumberField
                            label="Existing trip cancellation/interruption coverage"
                            value={existingTripCoverage}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setExistingTripCoverage(value);
                            }}
                        />

                        <NumberField
                            label="Travel insurance premium"
                            value={insurancePremium}
                            prefix="$"
                            step="25"
                            onChange={(value) => {
                                markStarted();
                                setInsurancePremium(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Medical and evacuation coverage
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <SelectField
                                label="International travel?"
                                value={international}
                                options={[
                                    {
                                        value: "yes",
                                        label: "Yes",
                                    },
                                    {
                                        value: "no",
                                        label: "No",
                                    },
                                ]}
                                onChange={(value) => {
                                    markStarted();
                                    setInternational(
                                        value as "yes" | "no",
                                    );
                                }}
                            />

                            <SelectField
                                label="Does your health insurance cover care there?"
                                value={medicalCoverage}
                                options={[
                                    {
                                        value: "yes",
                                        label: "Yes",
                                    },
                                    {
                                        value: "no",
                                        label: "No",
                                    },
                                    {
                                        value: "unknown",
                                        label: "I don't know",
                                    },
                                ]}
                                onChange={(value) => {
                                    markStarted();
                                    setMedicalCoverage(
                                        value as CoverageStatus,
                                    );
                                }}
                            />

                            <SelectField
                                label="Do you have evacuation coverage?"
                                value={evacuationCoverage}
                                options={[
                                    {
                                        value: "yes",
                                        label: "Yes",
                                    },
                                    {
                                        value: "no",
                                        label: "No",
                                    },
                                    {
                                        value: "unknown",
                                        label: "I don't know",
                                    },
                                ]}
                                onChange={(value) => {
                                    markStarted();
                                    setEvacuationCoverage(
                                        value as CoverageStatus,
                                    );
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Existing coverage matters
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Different policies protect different risks. Your
                                regular health insurance may not cover care abroad,
                                while a credit card may provide trip cancellation,
                                interruption, or delay benefits only for eligible
                                expenses and circumstances. Review the actual terms
                                before entering an amount here.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your exposure
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Nonrecoverable trip exposure"
                                value={formatCurrency(
                                    nonrecoverableExposure,
                                )}
                                detail="Total prepaid trip cost minus the amount you could recover without insurance."
                            />

                            <ResultMetric
                                label="Remaining trip-cost exposure"
                                value={formatCurrency(
                                    remainingTripExposure,
                                )}
                                detail="Nonrecoverable exposure after the existing trip cancellation/interruption coverage you entered."
                            />

                            <ResultMetric
                                label="Insurance premium as % of remaining exposure"
                                value={
                                    premiumAsPercentOfExposure !== null
                                        ? `${formatPercent(
                                            premiumAsPercentOfExposure,
                                        )}%`
                                        : "N/A"
                                }
                                detail="A simple comparison of premium to the remaining trip-cost exposure. It is not an expected-value calculation."
                            />

                            <ResultMetric
                                label="Travel insurance premium"
                                value={formatCurrency(premium)}
                                detail="The quoted cost of the travel insurance policy you entered."
                            />
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <CoverageMetric
                                label="Trip-cost exposure"
                                value={
                                    remainingTripExposure > 0
                                        ? "Present"
                                        : "Limited"
                                }
                                detail={
                                    remainingTripExposure > 0
                                        ? "You have nonrecoverable costs that are not fully covered by the amounts entered."
                                        : "Your entered recoverable amounts and existing coverage offset the trip-cost exposure."
                                }
                            />

                            <CoverageMetric
                                label="Medical coverage"
                                value={
                                    international === "no"
                                        ? "Domestic trip"
                                        : coverageLabel(
                                            medicalCoverage,
                                        )
                                }
                                detail={
                                    international === "no"
                                        ? "Domestic trips may have different medical coverage considerations."
                                        : medicalGap
                                            ? "Verify whether your health insurance covers care at your destination."
                                            : "Your answer indicates medical coverage exists, but review the policy terms."
                                }
                            />

                            <CoverageMetric
                                label="Evacuation coverage"
                                value={
                                    international === "no"
                                        ? "Domestic trip"
                                        : coverageLabel(
                                            evacuationCoverage,
                                        )
                                }
                                detail={
                                    international === "no"
                                        ? "Consider whether your destination or activities create unusual evacuation exposure."
                                        : evacuationGap
                                            ? "You have not established emergency-evacuation coverage for international travel."
                                            : "Your answer indicates evacuation coverage exists, but review the limits and conditions."
                                }
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
                                Change the assumptions to reflect your actual
                                bookings and existing coverage.
                                {hasInteracted
                                    ? " The result is based on the values you entered."
                                    : " These are example inputs and are not a recommendation."}
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5">
                            <p className="font-semibold">
                                What this calculation does not measure
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                It does not estimate the probability of cancellation,
                                illness, injury, evacuation, or other events. It also
                                does not compare individual policies or guarantee that
                                a policy will reimburse a particular loss. Coverage
                                depends on the policy&apos;s definitions, exclusions,
                                limits, documentation requirements, and covered reasons.
                            </p>
                        </div>
                    </div>

                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Enter your own trip details before using the result.
                            </h3>

                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                The defaults demonstrate the framework. Your actual
                                cancellation exposure and existing coverage can look
                                very different.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </section >
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

type CoverageMetricProps = {
    label: string;
    value: string;
    detail: string;
};

function CoverageMetric({
    label,
    value,
    detail,
}: CoverageMetricProps) {
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