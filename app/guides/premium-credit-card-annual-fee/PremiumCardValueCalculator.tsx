"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type Credit = {
    id: number;
    name: string;
    annualValue: string;
    utilization: string;
};

type Benefit = {
    id: number;
    name: string;
    annualValue: string;
};

const initialCredits: Credit[] = [
    {
        id: 1,
        name: "Travel credit",
        annualValue: "200",
        utilization: "75",
    },
    {
        id: 2,
        name: "Dining or entertainment credit",
        annualValue: "120",
        utilization: "75",
    },
    {
        id: 3,
        name: "Other statement credit",
        annualValue: "0",
        utilization: "0",
    },
    {
        id: 4,
        name: "Other statement credit",
        annualValue: "0",
        utilization: "0",
    },
    {
        id: 5,
        name: "Other statement credit",
        annualValue: "0",
        utilization: "0",
    },
];

const initialBenefits: Benefit[] = [
    {
        id: 1,
        name: "Lounge access",
        annualValue: "150",
    },
    {
        id: 2,
        name: "Hotel or status benefits",
        annualValue: "100",
    },
    {
        id: 3,
        name: "Travel protections",
        annualValue: "50",
    },
    {
        id: 4,
        name: "Other benefits",
        annualValue: "0",
    },
];

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
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

export default function PremiumCardValueCalculator() {
    const [hasInteracted, setHasInteracted] = useState(false);

    const [premiumAnnualFee, setPremiumAnnualFee] =
        useState("695");

    const [alternativeAnnualFee, setAlternativeAnnualFee] =
        useState("0");

    const [annualSpend, setAnnualSpend] =
        useState("30000");

    const [premiumRewardRate, setPremiumRewardRate] =
        useState("3");

    const [alternativeRewardRate, setAlternativeRewardRate] =
        useState("2");

    const [premiumRewardValue, setPremiumRewardValue] =
        useState("1");

    const [alternativeRewardValue, setAlternativeRewardValue] =
        useState("1");

    const [credits, setCredits] =
        useState<Credit[]>(initialCredits);

    const [benefits, setBenefits] =
        useState<Benefit[]>(initialBenefits);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("premium_card_value_started", {
                tool: "premium_card_value",
            });
        }

        setHasInteracted(true);
    };

    const updateCredit = (
        id: number,
        field: keyof Credit,
        value: string,
    ) => {
        markStarted();

        setCredits((current) =>
            current.map((credit) =>
                credit.id === id
                    ? { ...credit, [field]: value }
                    : credit,
            ),
        );
    };

    const updateBenefit = (
        id: number,
        field: keyof Benefit,
        value: string,
    ) => {
        markStarted();

        setBenefits((current) =>
            current.map((benefit) =>
                benefit.id === id
                    ? { ...benefit, [field]: value }
                    : benefit,
            ),
        );
    };

    const result = useMemo(() => {
        const premiumFee = Math.max(
            parseNumber(premiumAnnualFee),
            0,
        );

        const alternativeFee = Math.max(
            parseNumber(alternativeAnnualFee),
            0,
        );

        const spend = Math.max(
            parseNumber(annualSpend),
            0,
        );

        const premiumRate =
            Math.max(
                parseNumber(premiumRewardRate),
                0,
            ) / 100;

        const alternativeRate =
            Math.max(
                parseNumber(alternativeRewardRate),
                0,
            ) / 100;

        const premiumPointValue =
            Math.max(
                parseNumber(premiumRewardValue),
                0,
            ) / 100;

        const alternativePointValue =
            Math.max(
                parseNumber(alternativeRewardValue),
                0,
            ) / 100;

        const usableCredits = credits.reduce(
            (total, credit) => {
                const value = Math.max(
                    parseNumber(credit.annualValue),
                    0,
                );

                const utilization =
                    clampPercent(credit.utilization) / 100;

                return total + value * utilization;
            },
            0,
        );

        const premiumRewards =
            spend * premiumRate *
            (premiumPointValue / 0.01);

        const alternativeRewards =
            spend * alternativeRate *
            (alternativePointValue / 0.01);

        const incrementalRewards =
            premiumRewards - alternativeRewards;

        const otherBenefits = benefits.reduce(
            (total, benefit) =>
                total +
                Math.max(
                    parseNumber(benefit.annualValue),
                    0,
                ),
            0,
        );

        const feeDifference =
            premiumFee - alternativeFee;

        const netAnnualValue =
            usableCredits +
            incrementalRewards +
            otherBenefits -
            feeDifference;

        const breakEvenBenefit =
            feeDifference -
            incrementalRewards;

        const remainingValueNeeded =
            Math.max(
                breakEvenBenefit - usableCredits - otherBenefits,
                0,
            );

        const rewardRateDifference =
            premiumRate - alternativeRate;

        const incrementalRewardPerDollar =
            rewardRateDifference *
            (
                premiumPointValue / 0.01
            );

        const breakEvenSpend =
            incrementalRewardPerDollar > 0
                ? Math.max(
                    feeDifference -
                    usableCredits -
                    otherBenefits,
                    0,
                ) /
                incrementalRewardPerDollar
                : null;

        return {
            usableCredits,
            premiumRewards,
            alternativeRewards,
            incrementalRewards,
            otherBenefits,
            feeDifference,
            netAnnualValue,
            breakEvenBenefit,
            remainingValueNeeded,
            rewardRateDifference,
            breakEvenSpend,
        };
    }, [
        alternativeAnnualFee,
        alternativeRewardRate,
        alternativeRewardValue,
        annualSpend,
        benefits,
        credits,
        premiumAnnualFee,
        premiumRewardRate,
        premiumRewardValue,
    ]);

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("premium_card_value_changed", {
            tool: "premium_card_value",
        });
    }, [
        alternativeAnnualFee,
        alternativeRewardRate,
        alternativeRewardValue,
        annualSpend,
        benefits,
        credits,
        premiumAnnualFee,
        premiumRewardRate,
        premiumRewardValue,
    ]);

    return (
        <section
            id="premium-card-value-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Premium Card Value Calculator
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What is this premium card really worth to you?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Estimate the value you would realistically receive from a premium
                    card, then compare its rewards against the card you would otherwise
                    use.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Premium card annual fee"
                            value={premiumAnnualFee}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setPremiumAnnualFee(value);
                            }}
                        />

                        <NumberField
                            label="Alternative card annual fee"
                            value={alternativeAnnualFee}
                            prefix="$"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setAlternativeAnnualFee(value);
                            }}
                        />

                        <NumberField
                            label="Annual spending"
                            value={annualSpend}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAnnualSpend(value);
                            }}
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Rewards
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Premium card reward rate"
                                value={premiumRewardRate}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setPremiumRewardRate(value);
                                }}
                            />

                            <NumberField
                                label="Alternative card reward rate"
                                value={alternativeRewardRate}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setAlternativeRewardRate(value);
                                }}
                            />

                            <NumberField
                                label="Premium points value"
                                value={premiumRewardValue}
                                suffix="¢/point"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setPremiumRewardValue(value);
                                }}
                            />

                            <NumberField
                                label="Alternative points value"
                                value={alternativeRewardValue}
                                suffix="¢/point"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setAlternativeRewardValue(value);
                                }}
                            />
                        </div>

                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Use an effective reward rate, not just the headline rate
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                A 3x card does not necessarily produce 3% of travel value for
                                every purchase. Enter the reward rate that applies to the
                                spending you are actually comparing, and value points based on
                                the redemption value you realistically receive.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Statement Credits
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                            Enter the advertised annual credit and the percentage you expect
                            to use naturally. A credit you would not otherwise use should not
                            be counted at full face value.
                        </p>

                        <div className="mt-6 space-y-5">
                            {credits.map((credit) => (
                                <div
                                    key={credit.id}
                                    className="rounded-xl border border-[var(--border)] p-5"
                                >
                                    <div className="grid gap-5 md:grid-cols-3">
                                        <TextField
                                            label="Credit"
                                            value={credit.name}
                                            onChange={(value) =>
                                                updateCredit(
                                                    credit.id,
                                                    "name",
                                                    value,
                                                )
                                            }
                                        />

                                        <NumberField
                                            label="Annual credit"
                                            value={credit.annualValue}
                                            prefix="$"
                                            step="1"
                                            onChange={(value) =>
                                                updateCredit(
                                                    credit.id,
                                                    "annualValue",
                                                    value,
                                                )
                                            }
                                        />

                                        <NumberField
                                            label="Realistic usage"
                                            value={credit.utilization}
                                            suffix="%"
                                            step="5"
                                            onChange={(value) =>
                                                updateCredit(
                                                    credit.id,
                                                    "utilization",
                                                    value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Other Benefits
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                            Assign a realistic annual dollar value to benefits you would use.
                            This is your personal valuation, not the issuer&apos;s advertised
                            maximum.
                        </p>

                        <div className="mt-6 space-y-5">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit.id}
                                    className="grid gap-5 md:grid-cols-2"
                                >
                                    <TextField
                                        label="Benefit"
                                        value={benefit.name}
                                        onChange={(value) =>
                                            updateBenefit(
                                                benefit.id,
                                                "name",
                                                value,
                                            )
                                        }
                                    />

                                    <NumberField
                                        label="Realistic annual value"
                                        value={benefit.annualValue}
                                        prefix="$"
                                        step="1"
                                        onChange={(value) =>
                                            updateBenefit(
                                                benefit.id,
                                                "annualValue",
                                                value,
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {hasInteracted ? (
                    <div
                        className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Your Premium Card Value
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Usable statement credits"
                                value={formatCurrency(
                                    result.usableCredits,
                                )}
                                detail="Advertised credits adjusted for your realistic usage"
                            />

                            <ResultMetric
                                label="Incremental rewards"
                                value={formatCurrency(
                                    result.incrementalRewards,
                                )}
                                detail="Premium-card rewards minus the rewards from your alternative card"
                            />

                            <ResultMetric
                                label="Other benefits"
                                value={formatCurrency(
                                    result.otherBenefits,
                                )}
                                detail="Your personal annual value for travel and other benefits"
                            />

                            <ResultMetric
                                label="Annual fee difference"
                                value={formatCurrency(
                                    result.feeDifference,
                                )}
                                detail="Premium card fee minus the alternative card fee"
                            />

                            <ResultMetric
                                label="Estimated net annual value"
                                value={formatCurrency(
                                    result.netAnnualValue,
                                )}
                                detail={
                                    result.netAnnualValue >= 0
                                        ? "Estimated value remaining after the fee difference"
                                        : "Estimated value is below the fee difference under these assumptions"
                                }
                            />

                            <ResultMetric
                                label="Premium-card rewards"
                                value={formatCurrency(
                                    result.premiumRewards,
                                )}
                                detail="Estimated annual rewards from the premium card"
                            />
                        </div>

                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                What would you need to break even?
                            </p>

                            <p className="mt-3 leading-7 text-[var(--muted)]">
                                {result.netAnnualValue >= 0
                                    ? "Under these assumptions, the benefits and incremental rewards already cover the difference in annual fees."
                                    : `You need approximately ${formatCurrency(
                                        Math.max(
                                            -result.netAnnualValue,
                                            0,
                                        ),
                                    )} more annual value from credits, rewards, or benefits to cover the fee difference.`}
                            </p>
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Incremental rewards matter
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The calculator does not treat all premium-card rewards as new
                                value. It subtracts the rewards you could have earned with your
                                alternative card, because that is the opportunity cost of using
                                the premium card.
                            </p>
                        </div>

                        {result.breakEvenSpend !== null ? (
                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                                <p className="font-semibold">
                                    Break-even spending from rewards alone
                                </p>

                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                    After accounting for your usable credits and other benefits,
                                    approximately{" "}
                                    <strong>
                                        {formatCurrency(
                                            result.breakEvenSpend,
                                        )}
                                    </strong>{" "}
                                    of annual spending would need to run through the premium card
                                    for its incremental rewards to cover the remaining fee
                                    difference.
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
                            Premium Card Value Calculator
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Enter your real spending and benefit usage.
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            The values above are example assumptions. Change at least one
                            field before using the result for your own card.
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

type TextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function TextField({
    label,
    value,
    onChange,
}: TextFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
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