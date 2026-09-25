"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

function parseNumber(value: string) {
  const parsed = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatGallons(value: number) {
  if (value < 0.01) {
    return `${value.toFixed(4)} gal`;
  }

  return `${value.toFixed(2)} gal`;
}

export default function IdleVsShutdownCalculator() {
  const [hasInteracted, setHasInteracted] = useState(false);

  const [idleFuelRate, setIdleFuelRate] = useState("0.30");
  const [stopMinutes, setStopMinutes] = useState("5");
  const [stopsPerDay, setStopsPerDay] = useState("2");
  const [daysPerYear, setDaysPerYear] = useState("250");
  const [fuelPrice, setFuelPrice] = useState("3.50");

  const hasStarted = useRef(false);

  const markStarted = () => {
    if (!hasStarted.current) {
      hasStarted.current = true;

      trackEvent("idle_shutdown_calculator_started", {
        tool: "idle_vs_shutdown",
      });
    }

    setHasInteracted(true);
  };

  const result = useMemo(() => {
    const rate = parseNumber(idleFuelRate);
    const minutes = parseNumber(stopMinutes);
    const stops = parseNumber(stopsPerDay);
    const days = parseNumber(daysPerYear);
    const price = parseNumber(fuelPrice);

    const gallonsPerStop = rate * (minutes / 60);
    const costPerStop = gallonsPerStop * price;

    const annualIdleMinutes = minutes * stops * days;
    const annualGallons = rate * (annualIdleMinutes / 60);
    const annualCost = annualGallons * price;

    const fiveYearGallons = annualGallons * 5;
    const fiveYearCost = annualCost * 5;

    return {
      gallonsPerStop,
      costPerStop,
      annualIdleMinutes,
      annualGallons,
      annualCost,
      fiveYearGallons,
      fiveYearCost,
    };
  }, [
    daysPerYear,
    fuelPrice,
    idleFuelRate,
    stopMinutes,
    stopsPerDay,
  ]);

  useEffect(() => {
    if (!hasStarted.current) {
      return;
    }

    trackEvent("idle_shutdown_calculator_changed", {
      tool: "idle_vs_shutdown",
    });
  }, [
    daysPerYear,
    fuelPrice,
    idleFuelRate,
    stopMinutes,
    stopsPerDay,
  ]);

  return (
    <section
      id="idle-calculator"
      className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
    >
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Idle Fuel Calculator
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          How much fuel are your stops actually using?
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Enter an estimated idle fuel-consumption rate and your typical
          stopping habits. The calculator shows the fuel and money associated
          with idling for that amount of time.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <NumberField
              label="Idle fuel use"
              value={idleFuelRate}
              suffix=" gal/hour"
              step="0.01"
              onChange={(value) => {
                markStarted();
                setIdleFuelRate(value);
              }}
            />

            <NumberField
              label="Length of each stop"
              value={stopMinutes}
              suffix=" minutes"
              step="0.5"
              onChange={(value) => {
                markStarted();
                setStopMinutes(value);
              }}
            />

            <NumberField
              label="Stops per day"
              value={stopsPerDay}
              step="1"
              onChange={(value) => {
                markStarted();
                setStopsPerDay(value);
              }}
            />

            <NumberField
              label="Days per year"
              value={daysPerYear}
              step="1"
              onChange={(value) => {
                markStarted();
                setDaysPerYear(value);
              }}
            />

            <NumberField
              label="Fuel price"
              value={fuelPrice}
              prefix="$"
              suffix="/gal"
              step="0.01"
              onChange={(value) => {
                markStarted();
                setFuelPrice(value);
              }}
            />
          </div>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="font-semibold">
              Why do you enter the idle rate yourself?
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Idle fuel consumption varies with engine size, temperature,
              accessory load, air-conditioning demand, and vehicle design.
              Using an adjustable assumption is more useful than pretending
              every vehicle burns fuel at the same rate.
            </p>
          </div>
        </div>

        {hasInteracted ? (
          <div
            className="mt-8 rounded-2xl border border-[var(--accent)] bg-white p-8"
            aria-live="polite"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Your Idling Estimate
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ResultMetric
                label="Fuel per stop"
                value={formatGallons(result.gallonsPerStop)}
                detail={`${formatCurrency(
                  result.costPerStop,
                )} of fuel at your entered price`}
              />

              <ResultMetric
                label="Annual idle time"
                value={`${Math.round(result.annualIdleMinutes / 60)} hr`}
                detail="Based on your entered stops and schedule"
              />

              <ResultMetric
                label="Annual fuel"
                value={formatGallons(result.annualGallons)}
                detail={`${formatCurrency(
                  result.annualCost,
                )} per year`}
              />

              <ResultMetric
                label="Five-year fuel"
                value={formatGallons(result.fiveYearGallons)}
                detail={`${formatCurrency(
                  result.fiveYearCost,
                )} over five years`}
              />
            </div>

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="font-semibold">
                This is an idling-cost calculation, not a universal
                shutoff threshold
              </p>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Whether you should shut the engine off also depends on the
                vehicle, engine temperature, battery and starter system,
                HVAC needs, traffic conditions, manufacturer guidance, and
                whether the vehicle was designed with automatic start-stop.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
            aria-live="polite"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Idle Fuel Calculator
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Enter your situation to calculate the cost of idling.
            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
              The values above are example assumptions. Change at least one
              field to calculate the fuel and cost associated with your own
              scenario.
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
          <span className="text-[var(--muted)]">{prefix}</span>
        ) : null}

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