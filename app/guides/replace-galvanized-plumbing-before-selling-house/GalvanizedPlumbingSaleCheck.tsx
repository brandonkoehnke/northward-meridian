"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type GalvanizedExtent =
    | "unknown"
    | "small"
    | "substantial"
    | "most-all";

type WaterFlow =
    | "normal"
    | "somewhat-weak"
    | "poor";

type FinancialCapacity =
    | "comfortable"
    | "would-stretch"
    | "cannot-fund";

type Recommendation =
    | "assess-first"
    | "repair-document"
    | "repipe"
    | "credit-or-price";

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

export default function GalvanizedPlumbingSaleCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [homeAge, setHomeAge] = useState("80");
    const [galvanizedExtent, setGalvanizedExtent] =
        useState<GalvanizedExtent>("unknown");
    const [waterFlow, setWaterFlow] =
        useState<WaterFlow>("normal");

    const [discoloredWater, setDiscoloredWater] = useState(false);
    const [repeatedLeaks, setRepeatedLeaks] = useState(false);
    const [visibleCorrosion, setVisibleCorrosion] = useState(false);
    const [professionalAssessment, setProfessionalAssessment] =
        useState(false);
    const [inspectorFlagged, setInspectorFlagged] = useState(false);

    const [salePrice, setSalePrice] = useState("350000");
    const [repipeQuote, setRepipeQuote] = useState("12000");
    const [repairQuote, setRepairQuote] = useState("1500");
    const [buyerCredit, setBuyerCredit] = useState("10000");
    const [monthsUntilListing, setMonthsUntilListing] = useState("3");

    const [financialCapacity, setFinancialCapacity] =
        useState<FinancialCapacity>("would-stretch");

    const [serviceLineUnknown, setServiceLineUnknown] = useState(true);
    const [leadConcern, setLeadConcern] = useState(false);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("galvanized_plumbing_check_started", {
                tool: "galvanized_plumbing_before_selling",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const repipe = parseNumber(repipeQuote);
        const repair = parseNumber(repairQuote);
        const credit = parseNumber(buyerCredit);
        const sale = parseNumber(salePrice);
        const age = parseNumber(homeAge);
        const months = parseNumber(monthsUntilListing);

        const factors: string[] = [];

        if (galvanizedExtent === "unknown") {
            factors.push(
                "The extent of the remaining galvanized plumbing is not yet known",
            );
        }

        if (galvanizedExtent === "substantial") {
            factors.push(
                "A substantial portion of the supply plumbing is reported to be galvanized",
            );
        }

        if (galvanizedExtent === "most-all") {
            factors.push(
                "Most or all of the supply plumbing is reported to be galvanized",
            );
        }

        if (waterFlow === "somewhat-weak") {
            factors.push(
                "Water flow is reported to be somewhat weak",
            );
        }

        if (waterFlow === "poor") {
            factors.push(
                "Poor water flow is reported at multiple fixtures",
            );
        }

        if (discoloredWater) {
            factors.push(
                "Rust-colored or discolored water has been observed",
            );
        }

        if (repeatedLeaks) {
            factors.push(
                "The plumbing has a history of repeated leaks",
            );
        }

        if (visibleCorrosion) {
            factors.push(
                "Visible corrosion is present on accessible piping",
            );
        }

        if (!professionalAssessment) {
            factors.push(
                "A plumber has not yet assessed the remaining galvanized plumbing",
            );
        }

        if (inspectorFlagged) {
            factors.push(
                "A home inspector has already flagged the galvanized plumbing",
            );
        }

        if (serviceLineUnknown) {
            factors.push(
                "The material of the water service line is unknown or still needs verification",
            );
        }

        if (leadConcern) {
            factors.push(
                "You have a drinking-water lead concern that should be evaluated separately from the home-sale decision",
            );
        }

        if (age >= 70) {
            factors.push(
                "The home is older, making identification of the actual plumbing materials especially useful",
            );
        }

        if (months > 0 && months <= 2) {
            factors.push(
                "The listing timeline is relatively short",
            );
        }

        if (sale > 0 && repipe / sale >= 0.04) {
            factors.push(
                "The repipe quote represents a meaningful share of the expected sale price",
            );
        }

        let recommendation: Recommendation;
        let heading: string;
        let description: string;

        const widespreadSymptoms =
            waterFlow === "poor" &&
            (repeatedLeaks || discoloredWater || visibleCorrosion);

        if (
            !professionalAssessment &&
            galvanizedExtent === "unknown"
        ) {
            recommendation = "assess-first";
            heading = "Identify and assess the plumbing before deciding.";
            description =
                "The biggest missing information is how much galvanized supply plumbing remains and what condition it is in. A repipe quote alone does not establish that a full repipe is necessary before selling.";
        } else if (
            widespreadSymptoms &&
            (galvanizedExtent === "substantial" ||
                galvanizedExtent === "most-all") &&
            financialCapacity !== "cannot-fund"
        ) {
            recommendation = "repipe";
            heading = "A full repipe deserves serious consideration.";
            description =
                "Your answers indicate widespread symptoms together with a significant amount of galvanized plumbing. Compare the repipe cost with likely buyer concessions and transaction effects, but confirm the condition and scope with a qualified plumber first.";
        } else if (
            repair > 0 &&
            repipe > 0 &&
            repipe >= repair * 3 &&
            !repeatedLeaks &&
            waterFlow !== "poor"
        ) {
            recommendation = "repair-document";
            heading = "Repair and document may be worth comparing with a full repipe.";
            description =
                "The repair quote is substantially lower than the repipe quote, and your answers do not indicate repeated failures or poor flow. Confirm that the proposed repair addresses the actual defect rather than temporarily masking a broader problem.";
        } else if (
            credit > 0 &&
            repipe > 0 &&
            credit < repipe &&
            financialCapacity !== "comfortable"
        ) {
            recommendation = "credit-or-price";
            heading = "A buyer credit or price adjustment may be worth comparing.";
            description =
                "Funding a full repipe before sale may not be the only reasonable strategy. Compare a documented buyer credit or price adjustment with the effect the existing plumbing may have on buyer interest and the transaction.";
        } else {
            recommendation = "assess-first";
            heading = "Use the plumbing condition—not age alone—to compare your options.";
            description =
                "Your answers do not establish that a full repipe is clearly preferable to repair, documentation, a buyer credit, or selling with the condition appropriately addressed in the transaction.";
        }

        return {
            recommendation,
            heading,
            description,
            factors,
            repipe,
            repair,
            credit,
            difference:
                repipe > 0 && repair > 0 ? repipe - repair : 0,
        };
    }, [
        buyerCredit,
        discoloredWater,
        financialCapacity,
        galvanizedExtent,
        homeAge,
        inspectorFlagged,
        leadConcern,
        monthsUntilListing,
        professionalAssessment,
        repairQuote,
        repeatedLeaks,
        repipeQuote,
        salePrice,
        serviceLineUnknown,
        visibleCorrosion,
        waterFlow,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("galvanized_plumbing_check_result_changed", {
            tool: "galvanized_plumbing_before_selling",
            recommendation: result.recommendation,
        });
    }, [result.recommendation]);

    return (
        <section
            id="plumbing-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Pre-Sale Galvanized Plumbing Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Compare the plumbing problem with the sale problem.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Use the condition and extent of the remaining galvanized plumbing,
                    written estimates, and your sale constraints to compare repiping,
                    repair, a buyer credit, and selling without a pre-sale repipe.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Plumbing condition
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Approximate home age"
                                value={homeAge}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setHomeAge(value);
                                }}
                            />

                            <SelectField
                                label="How much galvanized supply plumbing remains?"
                                value={galvanizedExtent}
                                onChange={(value) => {
                                    markStarted();
                                    setGalvanizedExtent(value as GalvanizedExtent);
                                }}
                                options={[
                                    ["unknown", "Not sure"],
                                    ["small", "A small amount"],
                                    ["substantial", "A substantial amount"],
                                    ["most-all", "Most or all"],
                                ]}
                            />

                            <SelectField
                                label="Water flow at multiple fixtures"
                                value={waterFlow}
                                onChange={(value) => {
                                    markStarted();
                                    setWaterFlow(value as WaterFlow);
                                }}
                                options={[
                                    ["normal", "Normal"],
                                    ["somewhat-weak", "Somewhat weak"],
                                    ["poor", "Poor"],
                                ]}
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="Rust-colored or discolored water has been observed"
                                checked={discoloredWater}
                                onChange={(checked) => {
                                    markStarted();
                                    setDiscoloredWater(checked);
                                }}
                            />

                            <CheckboxField
                                label="The plumbing has had repeated leaks"
                                checked={repeatedLeaks}
                                onChange={(checked) => {
                                    markStarted();
                                    setRepeatedLeaks(checked);
                                }}
                            />

                            <CheckboxField
                                label="Visible corrosion is present on accessible galvanized piping"
                                checked={visibleCorrosion}
                                onChange={(checked) => {
                                    markStarted();
                                    setVisibleCorrosion(checked);
                                }}
                            />

                            <CheckboxField
                                label="A qualified plumber has assessed the galvanized plumbing"
                                checked={professionalAssessment}
                                onChange={(checked) => {
                                    markStarted();
                                    setProfessionalAssessment(checked);
                                }}
                            />

                            <CheckboxField
                                label="A home inspector has already flagged the plumbing"
                                checked={inspectorFlagged}
                                onChange={(checked) => {
                                    markStarted();
                                    setInspectorFlagged(checked);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Sale economics
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Expected sale price"
                                value={salePrice}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setSalePrice(value);
                                }}
                            />

                            <NumberField
                                label="Full repipe quote"
                                value={repipeQuote}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setRepipeQuote(value);
                                }}
                            />

                            <NumberField
                                label="Localized repair quote"
                                value={repairQuote}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setRepairQuote(value);
                                }}
                            />

                            <NumberField
                                label="Potential buyer credit"
                                value={buyerCredit}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setBuyerCredit(value);
                                }}
                            />

                            <NumberField
                                label="Months until listing"
                                value={monthsUntilListing}
                                suffix=" months"
                                onChange={(value) => {
                                    markStarted();
                                    setMonthsUntilListing(value);
                                }}
                            />

                            <SelectField
                                label="How comfortable are you funding a repipe?"
                                value={financialCapacity}
                                onChange={(value) => {
                                    markStarted();
                                    setFinancialCapacity(value as FinancialCapacity);
                                }}
                                options={[
                                    ["comfortable", "Comfortable"],
                                    ["would-stretch", "It would stretch my budget"],
                                    ["cannot-fund", "I cannot comfortably fund it"],
                                ]}
                            />
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Service line and water
                        </p>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="The material of the water service line is unknown or still needs verification"
                                checked={serviceLineUnknown}
                                onChange={(checked) => {
                                    markStarted();
                                    setServiceLineUnknown(checked);
                                }}
                            />

                            <CheckboxField
                                label="I have a drinking-water lead concern"
                                checked={leadConcern}
                                onChange={(checked) => {
                                    markStarted();
                                    setLeadConcern(checked);
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
                            Pre-Sale Plumbing Check
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
                                label="Full repipe"
                                value={formatCurrency(result.repipe)}
                                detail="Your entered repipe quote"
                            />

                            <ResultMetric
                                label="Repair"
                                value={formatCurrency(result.repair)}
                                detail="Your entered repair quote"
                            />

                            <ResultMetric
                                label="Difference"
                                value={formatCurrency(Math.abs(result.difference))}
                                detail="Gap between repair and repiping"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Keep the service line separate
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Interior galvanized plumbing and the water service line are
                                related but different questions. Confirm the service-line
                                material separately with the water utility or an appropriate
                                professional.
                            </p>
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Before making the final decision
                            </p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>• Identify how much galvanized supply plumbing remains.</li>
                                <li>• Get the plumbing condition documented.</li>
                                <li>• Compare equivalent repair and repipe scopes.</li>
                                <li>• Verify the water service-line material separately.</li>
                                <li>• Discuss likely buyer reaction with your agent.</li>
                                <li>• Address applicable disclosure requirements.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Pre-Sale Plumbing Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your situation to compare the options.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example values above are starting assumptions. Replace them
                            with what you know about your plumbing and actual contractor
                            estimates before using the result.
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
    onChange: (value: string) => void;
};

function NumberField({
    label,
    value,
    prefix,
    suffix,
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