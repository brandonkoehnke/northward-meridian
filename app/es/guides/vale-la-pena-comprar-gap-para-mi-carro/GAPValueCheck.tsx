"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number, digits = 0) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

function formatNumber(value: number, digits = 0) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}

function calculateMonthlyPayment(
    principal: number,
    annualRate: number,
    months: number,
) {
    if (principal <= 0 || months <= 0) {
        return 0;
    }

    if (annualRate <= 0) {
        return principal / months;
    }

    const monthlyRate = annualRate / 100 / 12;

    return (
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months))
    );
}

export default function GAPValueCheck() {
    const [payoff, setPayoff] = useState("34000");
    const [insurancePayout, setInsurancePayout] = useState("29000");
    const [gapPrice, setGapPrice] = useState("900");
    const [apr, setApr] = useState("8");
    const [remainingMonths, setRemainingMonths] = useState("66");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            trackEvent("gap_value_check_started", {
                tool: "gap_value_check",
            });
        }
    };

    const loanPayoff = Math.max(parseNumber(payoff), 0);
    const estimatedInsurancePayout = Math.max(
        parseNumber(insurancePayout),
        0,
    );
    const priceOfGap = Math.max(parseNumber(gapPrice), 0);
    const annualRate = Math.max(parseNumber(apr), 0);
    const months = Math.max(
        Math.round(parseNumber(remainingMonths)),
        0,
    );

    const estimatedExposure = Math.max(
        loanPayoff - estimatedInsurancePayout,
        0,
    );

    const gapFinancedMonthlyPayment = calculateMonthlyPayment(
        priceOfGap,
        annualRate,
        months,
    );

    const gapTotalPayments =
        gapFinancedMonthlyPayment * months;

    const gapInterest = Math.max(
        gapTotalPayments - priceOfGap,
        0,
    );

    const exposureToGapRatio =
        priceOfGap > 0
            ? estimatedExposure / priceOfGap
            : null;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent("gap_value_check_changed", {
            tool: "gap_value_check",
        });
    }, [
        payoff,
        insurancePayout,
        gapPrice,
        apr,
        remainingMonths,
    ]);

    let resultHeading =
        "No hay una exposición estimada en los datos ingresados.";

    let resultDescription =
        "El pago estimado del seguro cubre el saldo para liquidar que ingresó. Revise los términos de su póliza y contrato de financiamiento.";

    if (estimatedExposure > 0) {
        resultHeading =
            `Tiene una exposición estimada de ${formatCurrency(
                estimatedExposure,
            )}.`;

        resultDescription =
            "Esta es la diferencia matemática entre el saldo para liquidar y el pago estimado del seguro. GAP podría abordar parte o toda esa diferencia, pero el contrato específico determina qué cubre realmente.";
    }

    return (
        <section
            id="gap-value-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Calculadora de valor de GAP
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Vea cuánto podría quedar pendiente después del pago del seguro.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Ingrese el monto para liquidar el préstamo, el pago estimado
                    del seguro después del deducible y el precio de GAP. La
                    calculadora estima su exposición y muestra cuánto cuesta
                    financiar GAP durante el plazo restante.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Su préstamo y posible pérdida total
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Monto para liquidar el préstamo"
                            value={payoff}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setPayoff(value);
                            }}
                        />

                        <NumberField
                            label="Pago estimado del seguro"
                            value={insurancePayout}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setInsurancePayout(value);
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use un pago estimado del seguro después del deducible.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            El pago real depende de su póliza y de la valoración
                            del vehículo en la pérdida. Esta herramienta usa el
                            monto que usted ingresa y no intenta predecir la
                            decisión de su aseguradora.
                        </p>
                    </div>

                    <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                            Exposición estimada
                        </p>

                        <p className="mt-3 text-3xl font-semibold tracking-tight">
                            {formatCurrency(estimatedExposure)}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            Saldo para liquidar menos el pago estimado del seguro.
                            Un resultado positivo no significa que GAP pagará esa
                            cantidad completa.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Costo de GAP
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <NumberField
                                label="Precio de GAP"
                                value={gapPrice}
                                prefix="$"
                                step="50"
                                onChange={(value) => {
                                    markStarted();
                                    setGapPrice(value);
                                }}
                            />

                            <NumberField
                                label="APR del préstamo"
                                value={apr}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setApr(value);
                                }}
                            />

                            <NumberField
                                label="Plazo restante"
                                value={remainingMonths}
                                suffix="meses"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setRemainingMonths(value);
                                }}
                            />
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Pago mensual atribuible a GAP"
                                value={formatCurrency(
                                    gapFinancedMonthlyPayment,
                                    2,
                                )}
                                detail="Estimación matemática si el precio de GAP se financia durante el plazo restante."
                            />

                            <ResultMetric
                                label="Interés estimado sobre GAP"
                                value={formatCurrency(gapInterest)}
                                detail="Interés adicional estimado si el precio de GAP se incorpora al préstamo."
                            />

                            <ResultMetric
                                label="Total pagado por GAP"
                                value={formatCurrency(gapTotalPayments)}
                                detail="Precio de GAP más el interés estimado durante el plazo ingresado."
                            />

                            <ResultMetric
                                label="Exposición ÷ precio de GAP"
                                value={
                                    exposureToGapRatio !== null
                                        ? `${formatNumber(
                                            exposureToGapRatio,
                                            1,
                                        )}×`
                                        : "No disponible"
                                }
                                detail="Compara el tamaño de la exposición estimada con el precio del producto; no es una probabilidad de pérdida."
                            />
                        </div>
                    </div>

                    <div
                        className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                        aria-live="polite"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Lo que muestran los números
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            {resultHeading}
                        </h3>

                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            {resultDescription}
                        </p>

                        <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                            Esta herramienta no estima la probabilidad de una
                            pérdida total ni determina si debe comprar GAP. Los
                            términos de la póliza de seguro, el contrato de GAP y
                            el contrato de financiamiento controlan el resultado
                            real.
                        </p>
                    </div>
                </div>
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
                    <span className="text-[var(--muted)]">{prefix}</span>
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
