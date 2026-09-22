"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type RoofCondition =
    | "good"
    | "minor"
    | "major"
    | "unknown";

type FinancialCapacity =
    | "comfortable"
    | "would-stretch"
    | "cannot-fund";

type Recommendation =
    | "assess-first"
    | "repair-document"
    | "replace"
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

export default function RoofSaleDecisionCheck() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [roofAge, setRoofAge] = useState("15");
    const [roofCondition, setRoofCondition] =
        useState<RoofCondition>("unknown");
    const [activeLeaks, setActiveLeaks] = useState(false);
    const [repeatedRepairs, setRepeatedRepairs] = useState(false);
    const [professionalAssessment, setProfessionalAssessment] =
        useState(false);

    const [salePrice, setSalePrice] = useState("350000");
    const [replacementQuote, setReplacementQuote] = useState("12000");
    const [repairQuote, setRepairQuote] = useState("2000");
    const [buyerCredit, setBuyerCredit] = useState("10000");

    const [monthsUntilListing, setMonthsUntilListing] =
        useState("3");

    const [financialCapacity, setFinancialCapacity] =
        useState<FinancialCapacity>("would-stretch");

    const [insuranceConcern, setInsuranceConcern] = useState(false);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("roof_sale_check_started", {
                tool: "roof_before_selling",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const age = parseNumber(roofAge);
        const homeValue = parseNumber(salePrice);
        const replacement = parseNumber(replacementQuote);
        const repair = parseNumber(repairQuote);
        const credit = parseNumber(buyerCredit);
        const months = parseNumber(monthsUntilListing);

        const factors: string[] = [];

        if (roofCondition === "major") {
            factors.push(
                "The roof is reported to have significant problems",
            );
        }

        if (roofCondition === "minor") {
            factors.push(
                "The reported roof issue may be limited rather than systemic",
            );
        }

        if (roofCondition === "good") {
            factors.push(
                "The roof is reported to be in generally good condition",
            );
        }

        if (roofCondition === "unknown") {
            factors.push(
                "The roof condition has not been professionally established",
            );
        }

        if (activeLeaks) {
            factors.push("There are active leaks");
        }

        if (repeatedRepairs) {
            factors.push("The roof has a history of repeated repairs");
        }

        if (professionalAssessment) {
            factors.push(
                "A professional assessment has been completed",
            );
        } else {
            factors.push(
                "A professional roof assessment has not been completed",
            );
        }

        if (age >= 20) {
            factors.push("The roof is approximately 20 years old or older");
        } else if (age >= 15) {
            factors.push(
                "The roof is approaching an age where closer inspection is useful",
            );
        }

        if (months > 0 && months <= 2) {
            factors.push(
                "The listing timeline is relatively short",
            );
        }

        if (financialCapacity === "cannot-fund") {
            factors.push(
                "Full replacement would be difficult to fund before the sale",
            );
        }

        if (financialCapacity === "would-stretch") {
            factors.push(
                "A full replacement would put some pressure on available cash",
            );
        }

        if (insuranceConcern) {
            factors.push(
                "Insurance availability or requirements may affect the transaction",
            );
        }

        const quoteRatio =
            homeValue > 0 ? replacement / homeValue : 0;

        if (quoteRatio >= 0.04) {
            factors.push(
                "The replacement quote represents a meaningful share of the expected sale price",
            );
        }

        if (
            repair > 0 &&
            replacement > 0 &&
            replacement >= repair * 3
        ) {
            factors.push(
                "The replacement quote is substantially larger than the repair quote",
            );
        }

        let recommendation: Recommendation;
        let heading: string;
        let description: string;

        if (!professionalAssessment && roofCondition === "unknown") {
            recommendation = "assess-first";
            heading = "Get the roof assessed before deciding.";
            description =
                "The most important missing information is the roof's actual condition. A replacement quote tells you what replacement costs, but it does not tell you whether replacement is necessary before selling.";
        } else if (
            activeLeaks &&
            roofCondition === "major" &&
            financialCapacity !== "cannot-fund" &&
            replacement > 0 &&
            months > 0
        ) {
            recommendation = "replace";
            heading = "Replacement deserves serious consideration.";
            description =
                "Your answers point toward a roof that may create a meaningful transaction problem. Compare the replacement cost with likely buyer concessions, but get the condition and scope documented before committing.";
        } else if (
            repair > 0 &&
            replacement > 0 &&
            replacement >= repair * 3 &&
            !repeatedRepairs &&
            !activeLeaks
        ) {
            recommendation = "repair-document";
            heading = "Repair and document may be the better starting point.";
            description =
                "The difference between the repair and replacement quotes is substantial, while your answers do not indicate repeated or active problems. Confirm that the repair leaves the roof serviceable and document the work carefully.";
        } else if (
            credit > 0 &&
            replacement > 0 &&
            credit < replacement &&
            financialCapacity !== "comfortable"
        ) {
            recommendation = "credit-or-price";
            heading = "A buyer credit or price adjustment may be worth comparing.";
            description =
                "You may be able to transfer the repair decision to the buyer without spending the full replacement cost yourself. Compare that strategy against the likely effect on buyer interest and negotiations in your market.";
        } else {
            recommendation = "assess-first";
            heading = "Compare the options using a documented roof condition.";
            description =
                "Your answers do not establish that replacement is clearly preferable to repair, a credit, or selling with the condition disclosed. Use the actual roof condition and written costs to make the comparison.";
        }

        const repairVsReplacement =
            replacement > 0 && repair > 0
                ? replacement - repair
                : 0;

        return {
            recommendation,
            heading,
            description,
            factors,
            repairVsReplacement,
            homeValue,
            replacement,
            repair,
            credit,
        };
    }, [
        activeLeaks,
        buyerCredit,
        financialCapacity,
        insuranceConcern,
        monthsUntilListing,
        professionalAssessment,
        repeatedRepairs,
        repairQuote,
        replacementQuote,
        roofAge,
        roofCondition,
        salePrice,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("roof_sale_check_result_changed", {
            tool: "roof_before_selling",
            recommendation: result.recommendation,
        });
    }, [result.recommendation]);

    return (
        <section
            id="roof-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Pre-Sale Roof Decision Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Compare the roof problem with the sale problem.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Use your actual roof condition and written estimates to compare
                    replacement, repair, buyer credit, and selling as-is.
                </p>

                <div className="mt-10 space-y-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Roof condition
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Approximate roof age"
                                value={roofAge}
                                suffix=" years"
                                onChange={(value) => {
                                    markStarted();
                                    setRoofAge(value);
                                }}
                            />

                            <SelectField
                                label="Current roof condition"
                                value={roofCondition}
                                onChange={(value) => {
                                    markStarted();
                                    setRoofCondition(value as RoofCondition);
                                }}
                                options={[
                                    ["unknown", "Not sure"],
                                    ["good", "Generally good"],
                                    ["minor", "Minor problems"],
                                    ["major", "Major problems"],
                                ]}
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <CheckboxField
                                label="There is an active leak"
                                checked={activeLeaks}
                                onChange={(checked) => {
                                    markStarted();
                                    setActiveLeaks(checked);
                                }}
                            />

                            <CheckboxField
                                label="The roof has required repeated repairs"
                                checked={repeatedRepairs}
                                onChange={(checked) => {
                                    markStarted();
                                    setRepeatedRepairs(checked);
                                }}
                            />

                            <CheckboxField
                                label="A qualified roofing professional has assessed the roof"
                                checked={professionalAssessment}
                                onChange={(checked) => {
                                    markStarted();
                                    setProfessionalAssessment(checked);
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
                                label="Replacement quote"
                                value={replacementQuote}
                                prefix="$"
                                onChange={(value) => {
                                    markStarted();
                                    setReplacementQuote(value);
                                }}
                            />

                            <NumberField
                                label="Repair quote"
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
                        </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Seller constraints
                        </p>

                        <div className="mt-6">
                            <SelectField
                                label="How comfortable are you funding a full replacement?"
                                value={financialCapacity}
                                onChange={(value) => {
                                    markStarted();
                                    setFinancialCapacity(
                                        value as FinancialCapacity,
                                    );
                                }}
                                options={[
                                    ["comfortable", "Comfortable"],
                                    ["would-stretch", "It would stretch my budget"],
                                    ["cannot-fund", "I cannot comfortably fund it"],
                                ]}
                            />
                        </div>

                        <div className="mt-6">
                            <CheckboxField
                                label="Insurance availability or requirements may be relevant to the buyer"
                                checked={insuranceConcern}
                                onChange={(checked) => {
                                    markStarted();
                                    setInsuranceConcern(checked);
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
                            Pre-Sale Roof Check
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

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <ResultMetric
                                label="Replacement"
                                value={formatCurrency(result.replacement)}
                                detail="Your entered replacement quote"
                            />

                            <ResultMetric
                                label="Repair"
                                value={formatCurrency(result.repair)}
                                detail="Your entered repair quote"
                            />

                            <ResultMetric
                                label="Difference"
                                value={formatCurrency(
                                    Math.abs(result.repairVsReplacement),
                                )}
                                detail="Gap between repair and replacement"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Remember what this tool cannot know
                            </p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>
                                    • How buyers in your particular market will respond
                                </li>
                                <li>
                                    • Whether an insurer or lender will impose a specific
                                    requirement
                                </li>
                                <li>
                                    • Whether two roofing contractors are quoting equivalent
                                    scopes
                                </li>
                                <li>
                                    • What disclosure requirements apply to your property
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Before making the final decision
                            </p>

                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                                <li>
                                    • Get the roof condition documented by a qualified
                                    professional.
                                </li>
                                <li>
                                    • Compare written repair and replacement scopes.
                                </li>
                                <li>
                                    • Discuss pricing and buyer expectations with your agent.
                                </li>
                                <li>
                                    • Check applicable disclosure requirements.
                                </li>
                                <li>
                                    • Keep documentation for any completed work.
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Pre-Sale Roof Check
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your situation to compare the options.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The example values above are starting assumptions. Replace them
                            with your actual roof condition and contractor estimates to see
                            which factors deserve the most attention.
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