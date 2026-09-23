"use client";

import { useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type OfferType = "true-zero-apr" | "deferred-interest";

type SimulationResult = {
    retainedCashEarnings: number;
    endingRetainedCash: number;
    cashShortfall: number;
    financingEconomicCost: number;
    netAdvantage: number;
};

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function clampNonNegative(value: number) {
    return Math.max(value, 0);
}

function clampPercent(value: string) {
    return Math.min(Math.max(parseNumber(value), 0), 100);
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatPercent(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    }).format(value);
}

function simulateFinancing({
    cashPrice,
    financedPrice,
    financingFees,
    downPayment,
    promoMonths,
    annualReturn,
}: {
    cashPrice: number;
    financedPrice: number;
    financingFees: number;
    downPayment: number;
    promoMonths: number;
    annualReturn: number;
}): SimulationResult {
    const amountFinanced = Math.max(
        financedPrice - downPayment,
        0,
    );

    const monthlyPayment =
        promoMonths > 0
            ? amountFinanced / promoMonths
            : 0;

    const monthlyRate = Math.pow(
        1 + annualReturn,
        1 / 12,
    ) - 1;

    // The cash that remains available after the down payment.
    let retainedCash = Math.max(
        cashPrice - downPayment,
        0,
    );

    let retainedCashEarnings = 0;
    let cashShortfall = 0;

    for (let month = 0; month < promoMonths; month++) {
        const monthlyEarnings =
            retainedCash * monthlyRate;

        retainedCashEarnings += monthlyEarnings;

        retainedCash += monthlyEarnings;

        if (retainedCash >= monthlyPayment) {
            retainedCash -= monthlyPayment;
        } else {
            cashShortfall +=
                monthlyPayment - retainedCash;

            retainedCash = 0;
        }
    }

    /*
     * Economic cost of financing:
     *
     * financed purchase price
     * + financing fees
     * - earnings produced by retained cash
     * + any additional cash required because the retained cash
     *   was insufficient to cover the scheduled payments.
     *
     * The additional cash requirement is surfaced separately so
     * the user can see that the promotion could not be funded
     * solely from the cash they initially retained.
     */
    const financingEconomicCost =
        financedPrice +
        financingFees -
        retainedCashEarnings;

    const cashEconomicCost = cashPrice;

    const netAdvantage =
        cashEconomicCost - financingEconomicCost;

    return {
        retainedCashEarnings,
        endingRetainedCash: retainedCash,
        cashShortfall,
        financingEconomicCost,
        netAdvantage,
    };
}

function calculateBreakEvenReturn({
    cashPrice,
    financedPrice,
    financingFees,
    downPayment,
    promoMonths,
}: {
    cashPrice: number;
    financedPrice: number;
    financingFees: number;
    downPayment: number;
    promoMonths: number;
}) {
    const priceAndFeeDifference =
        financedPrice +
        financingFees -
        cashPrice;

    if (priceAndFeeDifference <= 0) {
        return 0;
    }

    const maxSearchReturn = 100;

    const resultAtMaxReturn =
        simulateFinancing({
            cashPrice,
            financedPrice,
            financingFees,
            downPayment,
            promoMonths,
            annualReturn: maxSearchReturn,
        });

    if (
        resultAtMaxReturn.retainedCashEarnings <
        priceAndFeeDifference ||
        resultAtMaxReturn.cashShortfall > 0
    ) {
        return null;
    }

    let low = 0;
    let high = maxSearchReturn;

    for (let iteration = 0; iteration < 80; iteration++) {
        const mid = (low + high) / 2;

        const result = simulateFinancing({
            cashPrice,
            financedPrice,
            financingFees,
            downPayment,
            promoMonths,
            annualReturn: mid,
        });

        const earnings =
            result.retainedCashEarnings;

        const hasShortfall =
            result.cashShortfall > 0;

        if (
            earnings >= priceAndFeeDifference &&
            !hasShortfall
        ) {
            high = mid;
        } else {
            low = mid;
        }
    }

    return high;
}

export default function CashVsZeroPercentCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [cashPrice, setCashPrice] = useState("5000");
    const [financedPrice, setFinancedPrice] =
        useState("5000");
    const [financingFees, setFinancingFees] =
        useState("0");
    const [downPayment, setDownPayment] =
        useState("0");
    const [promoMonths, setPromoMonths] =
        useState("12");

    const [annualReturn, setAnnualReturn] =
        useState("4");
    const [taxRate, setTaxRate] = useState("0");

    const [offerType, setOfferType] =
        useState<OfferType>("true-zero-apr");

    const [postPromoApr, setPostPromoApr] =
        useState("24");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("cash_vs_zero_apr_started", {
                tool: "cash_vs_zero_apr",
            });
        }

        setHasInteracted(true);
    };

    const result = useMemo(() => {
        const cash = clampNonNegative(
            parseNumber(cashPrice),
        );

        const financed = clampNonNegative(
            parseNumber(financedPrice),
        );

        const fees = clampNonNegative(
            parseNumber(financingFees),
        );

        const initialDownPayment = Math.min(
            clampNonNegative(parseNumber(downPayment)),
            financed,
        );

        const months = Math.max(
            Math.round(parseNumber(promoMonths)),
            1,
        );

        const grossReturn = clampNonNegative(
            parseNumber(annualReturn) / 100,
        );

        const taxRateDecimal =
            clampPercent(taxRate) / 100;

        const afterTaxReturn =
            grossReturn *
            (1 - taxRateDecimal);

        const simulation = simulateFinancing({
            cashPrice: cash,
            financedPrice: financed,
            financingFees: fees,
            downPayment: initialDownPayment,
            promoMonths: months,
            annualReturn: afterTaxReturn,
        });

        const monthlyPayment =
            Math.max(
                financed - initialDownPayment,
                0,
            ) / months;

        const breakEvenReturn =
            calculateBreakEvenReturn({
                cashPrice: cash,
                financedPrice: financed,
                financingFees: fees,
                downPayment: initialDownPayment,
                promoMonths: months,
            });

        const priceAndFeeDifference =
            financed +
            fees -
            cash;

        const financingIsMoreExpensive =
            priceAndFeeDifference > 0;

        const deferredInterestWarning =
            offerType === "deferred-interest";

        return {
            ...simulation,
            cashEconomicCost: cash,
            monthlyPayment,
            breakEvenReturn,
            priceAndFeeDifference,
            financingIsMoreExpensive,
            deferredInterestWarning,
            postPromoApr: clampNonNegative(
                parseNumber(postPromoApr),
            ),
            promoMonths: months,
            afterTaxReturn,
        };
    }, [
        annualReturn,
        cashPrice,
        downPayment,
        financedPrice,
        financingFees,
        offerType,
        postPromoApr,
        promoMonths,
        taxRate,
    ]);

    return (
        <section
            id="cash-vs-zero-percent-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Cash vs. 0% Financing Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Is keeping your cash worth using the financing offer?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare paying cash with using a promotional financing offer and
                    keeping your money available or invested during the promotional
                    period.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Cash price"
                            value={cashPrice}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setCashPrice(value);
                            }}
                        />

                        <NumberField
                            label="Financed purchase price"
                            value={financedPrice}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setFinancedPrice(value);
                            }}
                        />

                        <NumberField
                            label="Financing fees"
                            value={financingFees}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setFinancingFees(value);
                            }}
                        />

                        <NumberField
                            label="Down payment"
                            value={downPayment}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setDownPayment(value);
                            }}
                        />

                        <NumberField
                            label="Promotional period"
                            value={promoMonths}
                            suffix="months"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setPromoMonths(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Retained cash
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Estimate what the cash you keep could earn during the
                            promotional period. Enter an after-tax return when possible.
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Annual return on retained cash"
                                value={annualReturn}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setAnnualReturn(value);
                                }}
                            />

                            <NumberField
                                label="Tax rate on that return"
                                value={taxRate}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setTaxRate(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Offer type
                        </p>

                        <div className="mt-6 space-y-4">
                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] p-4">
                                <input
                                    type="radio"
                                    name="offer-type"
                                    checked={
                                        offerType === "true-zero-apr"
                                    }
                                    onChange={() => {
                                        markStarted();
                                        setOfferType(
                                            "true-zero-apr",
                                        );
                                    }}
                                    className="mt-1"
                                />

                                <span>
                                    <span className="block font-semibold">
                                        True 0% APR
                                    </span>

                                    <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">
                                        No interest is charged during the promotional period,
                                        subject to the offer terms.
                                    </span>
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] p-4">
                                <input
                                    type="radio"
                                    name="offer-type"
                                    checked={
                                        offerType ===
                                        "deferred-interest"
                                    }
                                    onChange={() => {
                                        markStarted();
                                        setOfferType(
                                            "deferred-interest",
                                        );
                                    }}
                                    className="mt-1"
                                />

                                <span>
                                    <span className="block font-semibold">
                                        Deferred interest
                                    </span>

                                    <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">
                                        Interest may be assessed according to the promotion&apos;s
                                        specific terms if the required conditions are not met.
                                    </span>
                                </span>
                            </label>
                        </div>

                        {offerType === "true-zero-apr" ? (
                            <div className="mt-6">
                                <NumberField
                                    label="APR after the promotional period"
                                    value={postPromoApr}
                                    suffix="%"
                                    step="0.1"
                                    onChange={(value) => {
                                        markStarted();
                                        setPostPromoApr(value);
                                    }}
                                />

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    The post-promotional APR is shown for context. This
                                    calculator assumes the promotional balance is fully paid
                                    during the stated period.
                                </p>
                            </div>
                        ) : (
                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Deferred-interest warning
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    Deferred-interest promotions can have materially different
                                    terms from true 0% APR offers. This calculator does not
                                    estimate retroactive interest. Read the actual promotion
                                    before relying on the comparison.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Comparison
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Cash economic cost"
                                value={formatCurrency(
                                    result.cashEconomicCost,
                                )}
                                detail="Cost of paying the cash price now"
                            />

                            <ResultMetric
                                label="Financing economic cost"
                                value={formatCurrency(
                                    result.financingEconomicCost,
                                )}
                                detail="Financed purchase cost plus fees, less modeled earnings on retained cash"
                            />

                            <ResultMetric
                                label="Retained-cash earnings"
                                value={formatCurrency(
                                    result.retainedCashEarnings,
                                )}
                                detail={`Modeled earnings during the ${result.promoMonths}-month promotional period`}
                            />

                            <ResultMetric
                                label="Monthly payment"
                                value={formatCurrency(
                                    result.monthlyPayment,
                                )}
                                detail="Payment required to eliminate the promotional balance evenly"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                What does the comparison imply?
                            </p>

                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                {result.netAdvantage > 0
                                    ? `Under these assumptions, financing leaves you approximately ${formatCurrency(
                                        result.netAdvantage,
                                    )} ahead of paying cash.`
                                    : result.netAdvantage < 0
                                        ? `Under these assumptions, paying cash leaves you approximately ${formatCurrency(
                                            Math.abs(
                                                result.netAdvantage,
                                            ),
                                        )} ahead of financing.`
                                        : "Under these assumptions, the two approaches are approximately equal in economic cost."}
                            </p>
                        </div>

                        {result.cashShortfall > 0 ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Additional cash required during the promotion
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    After using the initially retained cash and its modeled
                                    earnings toward the scheduled payments, you would still need
                                    approximately{" "}
                                    <strong>
                                        {formatCurrency(
                                            result.cashShortfall,
                                        )}
                                    </strong>{" "}
                                    from other cash flow during the promotional period.
                                </p>
                            </div>
                        ) : null}

                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Break-even return
                            </p>

                            {result.priceAndFeeDifference <=
                                0 ? (
                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    No positive return is required to overcome the modeled price
                                    and fee difference. The financed price and fees are already
                                    equal to or below the cash price under these assumptions.
                                </p>
                            ) : result.breakEvenReturn ===
                                null ? (
                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    The modeled break-even return is above 100% annually or cannot
                                    be reached without the retained cash running out. Recheck
                                    your cash price, financing price, fees, down payment, and
                                    promotional period.
                                </p>
                            ) : (
                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    The retained cash would need to earn approximately{" "}
                                    <strong>
                                        {formatPercent(
                                            result.breakEvenReturn * 100,
                                        )}
                                        %
                                    </strong>{" "}
                                    per year after tax for its modeled earnings to overcome the
                                    additional purchase-price and fee cost of financing.
                                </p>
                            )}
                        </div>

                        {result.deferredInterestWarning ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Deferred-interest terms still matter
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    The economic comparison above does not estimate retroactive
                                    interest that could apply under a deferred-interest
                                    promotion. Treat this result as a comparison of the basic
                                    financing economics, not a prediction of your final balance.
                                </p>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Cash vs. 0% Financing Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your purchase and financing assumptions.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change them to model
                            your own purchase before relying on the result.
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