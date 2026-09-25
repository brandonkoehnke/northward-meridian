"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(
        value.replace(/[^0-9.-]/g, ""),
    );

    return Number.isFinite(parsed) ? parsed : 0;
}

function clampPercent(value: string) {
    return Math.min(
        Math.max(parseNumber(value), 0),
        100,
    );
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
    return `${value.toFixed(value < 10 ? 1 : 0)}%`;
}

function formatYears(years: number) {
    if (years === 0) {
        return "0 years";
    }

    if (years === 1) {
        return "1 year";
    }

    return `${years} years`;
}

type ExistingCoverageStatus =
    | "unknown"
    | "none"
    | "confirmed";

type DeductibleMode =
    | "per-claim"
    | "none";

type ResultTone =
    | "positive"
    | "negative"
    | "neutral"
    | "warning";

export default function ExtendedWarrantyValueCalculator() {
    const [hasInteracted, setHasInteracted] =
        useState(false);

    const [productPrice, setProductPrice] =
        useState("1000");

    const [ownershipYears, setOwnershipYears] =
        useState("5");

    const [
        manufacturerWarrantyYears,
        setManufacturerWarrantyYears,
    ] = useState("1");

    const [existingCoverage, setExistingCoverage] =
        useState<ExistingCoverageStatus>("unknown");

    const [planPrice, setPlanPrice] =
        useState("150");

    const [
        additionalCoverageYears,
        setAdditionalCoverageYears,
    ] = useState("3");

    const [deductible, setDeductible] =
        useState("0");

    const [deductibleMode, setDeductibleMode] =
        useState<DeductibleMode>("per-claim");

    const [coverageLimit, setCoverageLimit] =
        useState("1000");

    const [
        failureProbability,
        setFailureProbability,
    ] = useState("20");

    const [repairCost, setRepairCost] =
        useState("500");

    const [canAbsorbRepair, setCanAbsorbRepair] =
        useState(true);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "extended_warranty_value_started",
                {
                    tool: "extended_warranty_value",
                },
            );
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const price = Math.max(
            parseNumber(productPrice),
            0,
        );

        const ownershipPeriod = Math.min(
            Math.max(
                Math.round(
                    parseNumber(ownershipYears),
                ),
                1,
            ),
            30,
        );

        const manufacturerYears = Math.min(
            Math.max(
                parseNumber(
                    manufacturerWarrantyYears,
                ),
                0,
            ),
            20,
        );

        const planCost = Math.max(
            parseNumber(planPrice),
            0,
        );

        const planYears = Math.min(
            Math.max(
                parseNumber(
                    additionalCoverageYears,
                ),
                0,
            ),
            20,
        );

        const claimFee = Math.max(
            parseNumber(deductible),
            0,
        );

        const limit = Math.max(
            parseNumber(coverageLimit),
            0,
        );

        const probability =
            clampPercent(
                failureProbability,
            ) / 100;

        const typicalRepairCost =
            Math.max(
                parseNumber(repairCost),
                0,
            );

        /*
         * The calculator treats the manufacturer's
         * warranty as existing coverage. Only the
         * remaining ownership period after that warranty
         * can count as genuinely additional coverage.
         */
        const yearsRemainingAfterManufacturerWarranty =
            Math.max(
                ownershipPeriod -
                manufacturerYears,
                0,
            );

        const incrementalCoverageYears =
            Math.min(
                planYears,
                yearsRemainingAfterManufacturerWarranty,
            );

        /*
         * The model assumes one representative covered
         * repair. Claim value is capped by the plan limit
         * and reduced by the applicable deductible.
         */
        const coveredClaimValue =
            Math.max(
                Math.min(
                    typicalRepairCost,
                    limit,
                ) -
                (deductibleMode ===
                    "per-claim"
                    ? claimFee
                    : 0),
                0,
            );

        const effectiveProbability =
            incrementalCoverageYears > 0
                ? probability
                : 0;

        const expectedClaimBenefit =
            effectiveProbability *
            coveredClaimValue;

        const expectedNetValue =
            expectedClaimBenefit -
            planCost;

        const breakEvenProbability =
            incrementalCoverageYears > 0 &&
                coveredClaimValue > 0
                ? planCost /
                coveredClaimValue
                : null;

        const planPriceAsShareOfProduct =
            price > 0
                ? (planCost / price) *
                100
                : null;

        let tone: ResultTone =
            "neutral";

        let headline =
            "The math is roughly even under these assumptions.";

        if (incrementalCoverageYears === 0) {
            tone = "warning";

            headline =
                "The plan provides no additional coverage during your expected ownership period under these assumptions.";
        } else if (coveredClaimValue === 0) {
            tone = "warning";

            headline =
                "The modeled claim would provide little or no financial benefit.";
        } else if (expectedNetValue > 0) {
            tone = "positive";

            headline =
                "The warranty has positive expected value under these assumptions.";
        } else if (expectedNetValue < 0) {
            tone = "negative";

            headline =
                "The warranty has negative expected value under these assumptions.";
        }

        return {
            price,
            ownershipPeriod,
            manufacturerYears,
            planCost,
            planYears,
            incrementalCoverageYears,
            coveredClaimValue,
            expectedClaimBenefit,
            expectedNetValue,
            breakEvenProbability,
            planPriceAsShareOfProduct,
            headline,
            tone,
        };
    }, [
        additionalCoverageYears,
        coverageLimit,
        deductible,
        deductibleMode,
        failureProbability,
        manufacturerWarrantyYears,
        ownershipYears,
        planPrice,
        productPrice,
        repairCost,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "extended_warranty_value_changed",
            {
                tool: "extended_warranty_value",
            },
        );
    }, [
        additionalCoverageYears,
        canAbsorbRepair,
        coverageLimit,
        deductible,
        deductibleMode,
        existingCoverage,
        failureProbability,
        manufacturerWarrantyYears,
        ownershipYears,
        planPrice,
        productPrice,
        repairCost,
    ]);

    const resultClasses: Record<
        ResultTone,
        string
    > = {
        positive:
            "border-[var(--accent)] bg-white",
        negative:
            "border-[var(--border)] bg-white",
        neutral:
            "border-[var(--border)] bg-white",
        warning:
            "border-amber-300 bg-amber-50",
    };

    return (
        <section
            id="extended-warranty-value-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Extended Warranty Value Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What would have to happen for this warranty to pay off?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Estimate the financial value of an extended warranty or
                    service contract based on the additional coverage period,
                    deductible, coverage limit, repair cost, and your estimate
                    of the chance of a covered failure.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Product purchase price"
                            value={productPrice}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setProductPrice(value);
                            }}
                        />

                        <NumberField
                            label="Expected ownership period"
                            value={ownershipYears}
                            suffix="year(s)"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setOwnershipYears(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Existing Coverage
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Manufacturer warranty"
                                value={
                                    manufacturerWarrantyYears
                                }
                                suffix="year(s)"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setManufacturerWarrantyYears(
                                        value,
                                    );
                                }}
                            />

                            <SelectField
                                label="Other existing coverage"
                                value={
                                    existingCoverage
                                }
                                onChange={(value) => {
                                    markStarted();
                                    setExistingCoverage(
                                        value as ExistingCoverageStatus,
                                    );
                                }}
                                options={[
                                    [
                                        "unknown",
                                        "Not sure",
                                    ],
                                    [
                                        "none",
                                        "No other coverage",
                                    ],
                                    [
                                        "confirmed",
                                        "Yes, other coverage applies",
                                    ],
                                ]}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Only count genuinely additional coverage
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The calculator treats the manufacturer warranty
                                period as existing coverage. If another policy,
                                credit-card benefit, retailer plan, or other
                                protection already covers the product, verify
                                the overlap before relying on the result.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Extended Plan
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Warranty or service-plan price"
                                value={planPrice}
                                prefix="$"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setPlanPrice(value);
                                }}
                            />

                            <NumberField
                                label="Additional coverage offered"
                                value={
                                    additionalCoverageYears
                                }
                                suffix="year(s)"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setAdditionalCoverageYears(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Deductible or service fee"
                                value={deductible}
                                prefix="$"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setDeductible(value);
                                }}
                            />

                            <SelectField
                                label="Deductible structure"
                                value={deductibleMode}
                                onChange={(value) => {
                                    markStarted();
                                    setDeductibleMode(
                                        value as DeductibleMode,
                                    );
                                }}
                                options={[
                                    [
                                        "per-claim",
                                        "Per covered claim",
                                    ],
                                    [
                                        "none",
                                        "No deductible / fee",
                                    ],
                                ]}
                            />

                            <NumberField
                                label="Coverage limit"
                                value={coverageLimit}
                                prefix="$"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setCoverageLimit(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Failure Assumption
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                            This is the hardest number to know. Use a conservative
                            estimate for the chance of a covered failure during
                            the genuinely additional coverage period. Do not use
                            the chance of any failure if many failures would be
                            excluded by the plan.
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Estimated chance of a covered failure"
                                value={
                                    failureProbability
                                }
                                suffix="%"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setFailureProbability(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Typical covered repair cost"
                                value={repairCost}
                                prefix="$"
                                step="25"
                                onChange={(value) => {
                                    markStarted();
                                    setRepairCost(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Use the covered repair, not the full product price
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                If a product costs $1,000 but the plan would only
                                reimburse a qualifying $450 repair, use the
                                covered repair amount rather than assuming a
                                $1,000 claim.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Risk Context
                        </p>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <CheckboxField
                                label="A surprise repair would be difficult for me to absorb"
                                checked={!canAbsorbRepair}
                                onChange={(checked) => {
                                    markStarted();
                                    setCanAbsorbRepair(
                                        !checked,
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className={`mt-8 rounded-2xl border p-8 ${resultClasses[result.tone]}`}
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Warranty Value
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            {result.headline}
                        </h3>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Additional coverage period"
                                value={formatYears(
                                    result.incrementalCoverageYears,
                                )}
                                detail={
                                    result.incrementalCoverageYears >
                                        0
                                        ? `After approximately ${formatYears(
                                            result.manufacturerYears,
                                        )} of existing manufacturer coverage`
                                        : "No additional coverage remains under these assumptions"
                                }
                            />

                            <ResultMetric
                                label="Modeled covered claim value"
                                value={formatCurrency(
                                    result.coveredClaimValue,
                                )}
                                detail="Typical covered repair limited by the plan coverage limit and reduced by the applicable claim fee"
                            />

                            <ResultMetric
                                label="Expected claim benefit"
                                value={formatCurrency(
                                    result.expectedClaimBenefit,
                                )}
                                detail="Estimated covered claim value multiplied by your assumed covered-failure probability"
                            />

                            <ResultMetric
                                label="Warranty price"
                                value={formatCurrency(
                                    result.planCost,
                                )}
                                detail="What you would pay for the extended plan"
                            />

                            <ResultMetric
                                label="Expected net value"
                                value={formatCurrency(
                                    result.expectedNetValue,
                                )}
                                detail={
                                    result.expectedNetValue >=
                                        0
                                        ? "Expected claim benefit minus the warranty price"
                                        : "Expected claim benefit is below the warranty price"
                                }
                            />

                            <ResultMetric
                                label="Warranty price as share of product price"
                                value={
                                    result.planPriceAsShareOfProduct ===
                                        null
                                        ? "N/A"
                                        : formatPercent(
                                            result.planPriceAsShareOfProduct,
                                        )
                                }
                                detail="A reference metric only; purchase-price percentage is not a break-even rule"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Break-even failure probability
                            </p>

                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                {result.incrementalCoverageYears === 0
                                    ? "A break-even probability is not applicable because the plan provides no additional coverage during your expected ownership period."
                                    : result.breakEvenProbability === null ||
                                        !Number.isFinite(
                                            result.breakEvenProbability,
                                        )
                                        ? "A break-even probability cannot be calculated because the modeled covered claim value is zero."
                                        : result.breakEvenProbability > 1
                                            ? "The plan would require more than a 100% chance of the modeled covered claim to break even financially. Under these assumptions, that is not achievable through the modeled claim alone."
                                            : `The plan would need roughly ${formatPercent(
                                                result.breakEvenProbability *
                                                100,
                                            )} probability of the modeled covered claim during the additional coverage period to break even financially.`}
                            </p>
                        </div>

                        {result.tone === "negative" &&
                            !canAbsorbRepair ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Expected value and risk are different questions
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    The plan has negative expected value under
                                    these assumptions, but risk transfer may
                                    still have practical value if an uncovered
                                    repair would be difficult for you to absorb.
                                    Treat that as a separate consideration rather
                                    than changing the expected-value math.
                                </p>
                            </div>
                        ) : null}

                        {existingCoverage === "confirmed" ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Verify overlapping coverage
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    You indicated that other existing coverage
                                    applies. Make sure the failure you are
                                    modeling is not already covered before
                                    treating the extended plan price as an
                                    incremental cost.
                                </p>
                            </div>
                        ) : null}

                        {existingCoverage === "unknown" ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Check for existing coverage
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    Before buying the plan, verify whether a
                                    credit-card benefit, retailer benefit,
                                    insurance policy, manufacturer warranty,
                                    or another protection already covers the
                                    same loss.
                                </p>
                            </div>
                        ) : null}

                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Coverage quality still matters
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                This result assumes the modeled repair is
                                genuinely covered and that the plan terms
                                behave as entered. Exclusions, waiting periods,
                                service fees, claim limits, provider restrictions,
                                and coverage overlap can make the real value
                                materially different.
                            </p>
                        </div>

                        <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
                            This calculator assumes one representative covered
                            repair and does not model multiple claims, product
                            replacement, time value of money, or the probability
                            distribution of different repair costs.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Educational estimate only. This calculator does not
                            predict product failure, determine whether a claim
                            will be approved, or substitute for reading the
                            actual warranty or service-contract terms.
                        </p>
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Extended Warranty Value Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your warranty and repair assumptions.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at
                            least one field before using the result for your own
                            purchase.
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
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            >
                {options.map(
                    ([optionValue, optionLabel]) => (
                        <option
                            key={optionValue}
                            value={optionValue}
                        >
                            {optionLabel}
                        </option>
                    ),
                )}
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
                onChange={(event) =>
                    onChange(event.target.checked)
                }
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