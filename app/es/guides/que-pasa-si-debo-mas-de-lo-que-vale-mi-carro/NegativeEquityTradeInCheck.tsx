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

function formatPercentage(value: number) {
    return `${formatNumber(value, 0)}%`;
}

export default function NegativeEquityTradeInCheck() {
    const [currentPayoff, setCurrentPayoff] =
        useState("28000");
    const [tradeInValue, setTradeInValue] =
        useState("23000");
    const [newVehiclePrice, setNewVehiclePrice] =
        useState("32000");
    const [downPayment, setDownPayment] =
        useState("3000");
    const [apr, setApr] = useState("7");
    const [termMonths, setTermMonths] =
        useState("72");

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent(
                "negative_equity_trade_in_check_started",
                {
                    tool: "negative_equity_trade_in_check",
                },
            );
        }
    };

    const payoff = Math.max(
        parseNumber(currentPayoff),
        0,
    );

    const tradeValue = Math.max(
        parseNumber(tradeInValue),
        0,
    );

    const vehiclePrice = Math.max(
        parseNumber(newVehiclePrice),
        0,
    );

    const down = Math.max(
        parseNumber(downPayment),
        0,
    );

    const annualRate = Math.max(
        parseNumber(apr),
        0,
    );

    const months = Math.max(
        Math.round(parseNumber(termMonths)),
        0,
    );

    const equity = tradeValue - payoff;
    const positiveEquity = Math.max(equity, 0);
    const negativeEquity = Math.max(-equity, 0);

    const financedWithoutOldBalance = Math.max(
        vehiclePrice - down,
        0,
    );

    const financedWithTrade = Math.max(
        vehiclePrice +
            negativeEquity -
            down -
            positiveEquity,
        0,
    );

    const additionalFinancedAmount =
        financedWithTrade -
        financedWithoutOldBalance;

    const paymentWithoutOldBalance =
        calculateMonthlyPayment(
            financedWithoutOldBalance,
            annualRate,
            months,
        );

    const paymentWithTrade =
        calculateMonthlyPayment(
            financedWithTrade,
            annualRate,
            months,
        );

    const totalPaymentsWithoutOldBalance =
        paymentWithoutOldBalance * months;

    const totalPaymentsWithTrade =
        paymentWithTrade * months;

    const interestWithoutOldBalance =
        Math.max(
            totalPaymentsWithoutOldBalance -
                financedWithoutOldBalance,
            0,
        );

    const interestWithTrade =
        Math.max(
            totalPaymentsWithTrade -
                financedWithTrade,
            0,
        );

    const additionalMonthlyPayment =
        paymentWithTrade -
        paymentWithoutOldBalance;

    const additionalInterest =
        interestWithTrade -
        interestWithoutOldBalance;

    const additionalTotalPayments =
        totalPaymentsWithTrade -
        totalPaymentsWithoutOldBalance;

    const ltv =
        vehiclePrice > 0
            ? (financedWithTrade / vehiclePrice) * 100
            : null;

    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }

        trackEvent(
            "negative_equity_trade_in_check_changed",
            {
                tool: "negative_equity_trade_in_check",
            },
        );
    }, [
        currentPayoff,
        tradeInValue,
        newVehiclePrice,
        downPayment,
        apr,
        termMonths,
    ]);

    let equityLabel =
        "Valor neto del carro actual";

    let equityDescription =
        "La diferencia entre el valor de canje y el saldo necesario para liquidar el préstamo actual.";

    if (negativeEquity > 0) {
        equityLabel =
            "Valor neto negativo";

        equityDescription =
            "Usted debe más para liquidar el préstamo de lo que vale el carro según el valor de canje ingresado.";
    } else if (positiveEquity > 0) {
        equityLabel =
            "Valor neto positivo";

        equityDescription =
            "El valor de canje ingresado supera el saldo necesario para liquidar el préstamo actual.";
    }

    let resultHeading =
        "No hay valor neto negativo en los datos ingresados.";

    let resultDescription =
        "El valor de canje es suficiente para cubrir el saldo del préstamo actual. Puede comparar el efecto del valor neto positivo en el monto que financiaría por el carro nuevo.";

    if (negativeEquity > 0) {
        resultHeading =
            `Tiene ${formatCurrency(
                negativeEquity,
            )} de valor neto negativo.`;

        resultDescription =
            "Si esa diferencia se incorpora al próximo préstamo, el monto financiado aumenta. El efecto sobre su pago y el interés total depende de la tasa y del plazo que ingrese.";
    } else if (positiveEquity > 0) {
        resultHeading =
            `Tiene ${formatCurrency(
                positiveEquity,
            )} de valor neto positivo.`;

        resultDescription =
            "En este modelo, ese valor reduce el monto que tendría que financiar por el vehículo nuevo.";
    }

    return (
        <section
            id="negative-equity-trade-in-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Calculadora de valor neto negativo y canje
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Vea qué pasa con la deuda anterior al cambiar de carro.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Ingrese el saldo para liquidar su préstamo, el valor de
                    canje, el precio del carro nuevo y los términos del nuevo
                    préstamo para estimar cómo el valor neto de su carro actual
                    puede cambiar el monto financiado, el pago mensual y el
                    interés total.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Su carro actual
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <NumberField
                            label="Saldo para liquidar el préstamo"
                            value={currentPayoff}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setCurrentPayoff(value);
                            }}
                        />

                        <NumberField
                            label="Valor de canje"
                            value={tradeInValue}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setTradeInValue(value);
                            }}
                        />
                    </div>

                    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Ingrese el monto de liquidación, no solo el saldo de su estado de cuenta.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            El monto necesario para liquidar el préstamo puede
                            diferir del saldo que aparece en un estado de
                            cuenta. Use el monto de liquidación que le
                            proporcione su prestamista cuando sea posible.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <ResultMetric
                            label={equityLabel}
                            value={
                                equity === 0
                                    ? "$0"
                                    : formatCurrency(
                                          Math.abs(equity),
                                      )
                            }
                            detail={equityDescription}
                        />

                        <ResultMetric
                            label="Monto financiado por el carro nuevo sin el valor neto anterior"
                            value={formatCurrency(
                                financedWithoutOldBalance,
                            )}
                            detail="Precio negociado menos el pago inicial. Se muestra para aislar el efecto del carro que entrega."
                        />
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            El carro que quiere comprar
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="Precio negociado"
                                value={newVehiclePrice}
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setNewVehiclePrice(
                                        value,
                                    );
                                }}
                            />

                            <NumberField
                                label="Pago inicial"
                                value={downPayment}
                                prefix="$"
                                step="100"
                                onChange={(value) => {
                                    markStarted();
                                    setDownPayment(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Préstamo nuevo
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="APR"
                                value={apr}
                                suffix="%"
                                step="0.1"
                                onChange={(value) => {
                                    markStarted();
                                    setApr(value);
                                }}
                            />

                            <NumberField
                                label="Plazo"
                                value={termMonths}
                                suffix="meses"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setTermMonths(
                                        value,
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Resultados
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Valor neto negativo que se incorpora"
                                value={
                                    negativeEquity > 0
                                        ? formatCurrency(
                                              negativeEquity,
                                          )
                                        : "$0"
                                }
                                detail="La parte del préstamo anterior que supera el valor de canje ingresado."
                            />

                            <ResultMetric
                                label="Monto financiado con el canje"
                                value={formatCurrency(
                                    financedWithTrade,
                                )}
                                detail="Precio del vehículo más el valor neto negativo, menos el pago inicial y cualquier valor neto positivo."
                            />

                            <ResultMetric
                                label="Diferencia en el monto financiado"
                                value={formatSignedCurrency(
                                    additionalFinancedAmount,
                                )}
                                detail={
                                    additionalFinancedAmount > 0
                                        ? "La deuda o el ajuste del carro anterior aumenta el monto financiado en esta cantidad."
                                        : additionalFinancedAmount < 0
                                            ? "El valor neto positivo reduce el monto financiado en esta cantidad."
                                            : "El valor neto del carro anterior no cambia el monto financiado en este modelo."
                                }
                            />

                            <ResultMetric
                                label="Pago mensual sin el carro anterior"
                                value={formatCurrency(
                                    paymentWithoutOldBalance,
                                )}
                                detail="Pago mensual estimado para financiar solo el precio del carro nuevo después del pago inicial."
                            />

                            <ResultMetric
                                label="Pago mensual con el canje"
                                value={formatCurrency(
                                    paymentWithTrade,
                                )}
                                detail="Pago mensual estimado después de incorporar el valor neto del carro anterior."
                            />

                            <ResultMetric
                                label="Diferencia mensual"
                                value={formatSignedCurrency(
                                    additionalMonthlyPayment,
                                )}
                                detail={
                                    additionalMonthlyPayment > 0
                                        ? "Pago mensual adicional causado por el efecto del carro anterior en este modelo."
                                        : additionalMonthlyPayment < 0
                                            ? "Reducción estimada del pago mensual por el valor neto positivo del carro anterior."
                                            : "El valor neto del carro anterior no cambia el pago mensual en este modelo."
                                }
                            />

                            <ResultMetric
                                label="Interés total sin el carro anterior"
                                value={formatCurrency(
                                    interestWithoutOldBalance,
                                )}
                                detail="Interés total estimado durante el plazo del préstamo nuevo."
                            />

                            <ResultMetric
                                label="Interés total con el canje"
                                value={formatCurrency(
                                    interestWithTrade,
                                )}
                                detail="Interés total estimado después de incorporar el valor neto del carro anterior."
                            />

                            <ResultMetric
                                label="Diferencia en el interés total"
                                value={formatSignedCurrency(
                                    additionalInterest,
                                )}
                                detail={
                                    additionalInterest > 0
                                        ? "Interés adicional estimado debido al monto mayor financiado."
                                        : additionalInterest < 0
                                            ? "Reducción estimada del interés total debido al valor neto positivo."
                                            : "No hay diferencia estimada en el interés total."
                                }
                            />

                            <ResultMetric
                                label="Total de pagos sin el carro anterior"
                                value={formatCurrency(
                                    totalPaymentsWithoutOldBalance,
                                )}
                                detail="Suma de los pagos mensuales durante todo el plazo."
                            />

                            <ResultMetric
                                label="Total de pagos con el canje"
                                value={formatCurrency(
                                    totalPaymentsWithTrade,
                                )}
                                detail="Suma de los pagos mensuales durante todo el plazo después de incorporar el canje."
                            />

                            <ResultMetric
                                label="Diferencia en pagos totales"
                                value={formatSignedCurrency(
                                    additionalTotalPayments,
                                )}
                                detail={
                                    additionalTotalPayments > 0
                                        ? "Monto adicional estimado pagado durante el plazo del préstamo."
                                        : additionalTotalPayments < 0
                                            ? "Reducción estimada de los pagos totales por el valor neto positivo."
                                            : "No hay diferencia estimada en los pagos totales."
                                }
                            />

                            <ResultMetric
                                label="Relación préstamo-valor inicial aproximada"
                                value={
                                    ltv !== null
                                        ? formatPercentage(ltv)
                                        : "No disponible"
                                }
                                detail={
                                    ltv !== null
                                        ? "Monto financiado con el canje dividido por el precio negociado del vehículo nuevo. Una cifra superior a 100% significa que el monto financiado supera ese precio en esta comparación."
                                        : "El precio del vehículo nuevo debe ser mayor que cero para calcular este valor."
                                }
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
                            Este cálculo es una comparación matemática basada
                            en los datos que ingresa. No determina si debe
                            comprar otro vehículo ni cómo su prestamista o
                            concesionario manejará el saldo anterior. Revise
                            el contrato y la documentación de financiamiento
                            para confirmar los montos reales.
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

function formatSignedCurrency(value: number) {
    if (value > 0) {
        return `+${formatCurrency(value)}`;
    }

    if (value < 0) {
        return `-${formatCurrency(Math.abs(value))}`;
    }

    return "$0";
}
