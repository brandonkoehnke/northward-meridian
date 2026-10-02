"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number, digits = 0) {
    return new Intl.NumberFormat("es-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

function calculateMonthlyPayment(
    principal: number,
    annualRate: number,
    months: number,
) {
    if (principal <= 0 || months <= 0) return 0;
    if (annualRate <= 0) return principal / months;

    const monthlyRate = annualRate / 100 / 12;
    return (
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months))
    );
}

export default function DealerAddOnCostCalculator() {
    const [addOnCost, setAddOnCost] = useState("3500");
    const [apr, setApr] = useState("8");
    const [termMonths, setTermMonths] = useState("72");
    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            trackEvent("dealer_add_on_cost_calculator_started", {
                tool: "dealer_add_on_cost_calculator",
            });
        }
    };

    const extras = Math.max(parseNumber(addOnCost), 0);
    const annualRate = Math.max(parseNumber(apr), 0);
    const months = Math.max(Math.round(parseNumber(termMonths)), 0);

    const monthlyCost = calculateMonthlyPayment(
        extras,
        annualRate,
        months,
    );
    const totalPaid = monthlyCost * months;
    const interestPaid = Math.max(totalPaid - extras, 0);

    useEffect(() => {
        if (!hasStarted.current) return;

        trackEvent("dealer_add_on_cost_calculator_changed", {
            tool: "dealer_add_on_cost_calculator",
        });
    }, [addOnCost, apr, termMonths]);

    return (
        <section
            id="dealer-add-on-cost-calculator"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Calculadora del costo de extras financiados
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    Vea cuánto pueden costar los extras cuando los incorpora al préstamo.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Sume el precio de los productos o servicios adicionales que está considerando e ingrese el APR y el plazo del préstamo. La calculadora estima cuánto agregan al pago mensual, cuánto interés paga sobre ellos y cuánto termina pagando en total.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="grid gap-5 md:grid-cols-3">
                        <NumberField
                            label="Precio total de los extras"
                            value={addOnCost}
                            prefix="$"
                            step="100"
                            onChange={(value) => {
                                markStarted();
                                setAddOnCost(value);
                            }}
                        />
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
                                setTermMonths(value);
                            }}
                        />
                    </div>

                    <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                        <p className="font-semibold">
                            Use el precio total de los extras, no solo cuánto agregan al pago mensual.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Puede sumar GAP, contratos de servicio, protección de llantas, tratamientos, accesorios u otros productos que se incorporarían al préstamo. Impuestos u otros cargos pueden cambiar el costo real de su contrato.
                        </p>
                    </div>

                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Resultados
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Monto adicional financiado"
                                value={formatCurrency(extras)}
                                detail="El precio de los extras que está incorporando al préstamo."
                            />
                            <ResultMetric
                                label="Costo adicional por mes"
                                value={formatCurrency(monthlyCost, 2)}
                                detail="Pago mensual estimado atribuible solamente a los extras."
                            />
                            <ResultMetric
                                label="Interés estimado sobre los extras"
                                value={formatCurrency(interestPaid)}
                                detail="Interés estimado durante el plazo ingresado por financiar esos productos."
                            />
                            <ResultMetric
                                label="Total pagado por los extras"
                                value={formatCurrency(totalPaid)}
                                detail="Precio de los extras más el interés estimado durante todo el plazo."
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
                            {extras > 0
                                ? `${formatCurrency(extras)} en extras se convierten en aproximadamente ${formatCurrency(totalPaid)} pagados durante el préstamo.`
                                : "Ingrese el precio de los extras para estimar su costo financiado."}
                        </h3>
                        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                            Esta comparación no determina si un producto vale la pena. Le muestra el costo de financiarlo para que pueda evaluar por separado su cobertura, utilidad, precio y alternativas.
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
                {prefix ? <span className="text-[var(--muted)]">{prefix}</span> : null}
                <input
                    type="number"
                    min="0"
                    step={step}
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

type ResultMetricProps = {
    label: string;
    value: string;
    detail: string;
};

function ResultMetric({ label, value, detail }: ResultMetricProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>
        </div>
    );
}
