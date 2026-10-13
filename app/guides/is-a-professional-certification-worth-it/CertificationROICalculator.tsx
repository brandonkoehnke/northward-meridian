
"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  prefix?: string;
  unit?: string;
  note?: string;
};

function Field({
  label,
  value,
  onChange,
  onBlur,
  prefix,
  unit,
  note,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </span>

      <span className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2">
        {prefix && (
          <span className="text-sm text-[var(--muted)]">
            {prefix}
          </span>
        )}

        <input
          aria-label={label}
          className="min-w-0 w-full bg-transparent py-1 outline-none"
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />

        {unit && (
          <span className="shrink-0 text-xs text-[var(--muted)]">
            {unit}
          </span>
        )}
      </span>

      {note && (
        <span className="text-xs leading-5 text-[var(--muted)]">
          {note}
        </span>
      )}
    </label>
  );
}

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const decimal = (n: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(n);

const nonnegative = (value: string) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
};

export default function CertificationROICalculator() {
  const [exam, setExam] = useState("600");
  const [training, setTraining] = useState("1200");
  const [other, setOther] = useState("200");
  const [employer, setEmployer] = useState("0");
  const [hours, setHours] = useState("80");
  const [hourValue, setHourValue] = useState("0");
  const [renewal, setRenewal] = useState("200");
  const [years, setYears] = useState("3");
  const [raise, setRaise] = useState("3000");
  const [chance, setChance] = useState("50");
  const [tax, setTax] = useState("25");

  const [started, setStarted] = useState(false);

  const update = (
    setter: (v: string) => void,
    value: string
  ) => {
    if (!started) {
      setStarted(true);
      trackEvent("certification_roi_calculator_started", {
        tool: "certification_roi_calculator",
      });
    }

    setter(value);
  };

  const initialExpenses =
    nonnegative(exam) +
    nonnegative(training) +
    nonnegative(other);

  // Allow unrestricted typing. Cap only on field blur.
  const updateReimbursement = (value: string) => {
    update(setEmployer, value);
  };

  const capReimbursement = () => {
    if (employer.trim() === "") return;

    const entered = Number(employer);

    if (!Number.isFinite(entered)) return;

    const capped = Math.min(
      Math.max(0, entered),
      initialExpenses
    );

    if (entered !== capped) {
      setEmployer(String(capped));
    }
  };

  const entries = [
    exam,
    training,
    other,
    employer,
    hours,
    hourValue,
    renewal,
    years,
    raise,
    chance,
    tax,
  ];

  const values = entries.map((v) =>
    v.trim() === "" ? NaN : Number(v)
  );

  const valid =
    values.every((v) => Number.isFinite(v) && v >= 0) &&
    values[7] >= 1 &&
    values[7] <= 40 &&
    values[9] <= 100 &&
    values[10] < 60;

  const [
    examCost,
    trainingCost,
    otherCost,
    reimbursement,
    studyHours,
    studyRate,
    renewalCost,
    horizon,
    annualRaise,
    probability,
    taxRate,
  ] = values;

  // Use the capped value for calculations even while editing.
  const effectiveReimbursement = valid
    ? Math.min(
      reimbursement,
      examCost + trainingCost + otherCost
    )
    : 0;

  const upfront = valid
    ? Math.max(
      0,
      examCost +
      trainingCost +
      otherCost -
      effectiveReimbursement
    )
    : 0;

  const timeCost = valid
    ? studyHours * studyRate
    : 0;

  const ongoing = valid
    ? renewalCost * horizon
    : 0;

  const cashCost = upfront + ongoing;
  const economicCost = cashCost + timeCost;

  const afterTaxAnnual = valid
    ? annualRaise * (1 - taxRate / 100)
    : 0;

  const weightedAnnual =
    afterTaxAnnual * probability / 100;

  const horizonGain =
    weightedAnnual * (valid ? horizon : 0);

  const net = horizonGain - cashCost;

  const requiredRaise =
    valid && probability > 0
      ? cashCost /
      (
        horizon *
        (1 - taxRate / 100) *
        (probability / 100)
      )
      : null;

  // Conditional on the full salary increase occurring.
  const simplePayback =
    valid && afterTaxAnnual > 0
      ? upfront / afterTaxAnnual
      : null;

  const fields: {
    label: string;
    value: string;
    setter: (v: string) => void;
    onBlur?: () => void;
    unit?: string;
    prefix?: string;
    note?: string;
  }[] = [
      {
        label: "Exam and application fees",
        value: exam,
        setter: (v) => update(setExam, v),
        onBlur: capReimbursement,
        prefix: "$",
      },
      {
        label: "Training and materials",
        value: training,
        setter: (v) => update(setTraining, v),
        onBlur: capReimbursement,
        prefix: "$",
      },
      {
        label: "Other initial expenses",
        value: other,
        setter: (v) => update(setOther, v),
        onBlur: capReimbursement,
        prefix: "$",
        note:
          "Include retake fees only if you expect to incur them.",
      },
      {
        label: "Employer reimbursement",
        value: employer,
        setter: updateReimbursement,
        onBlur: capReimbursement,
        prefix: "$",
        note:
          "Enter confirmed reimbursement, up to your total initial expenses.",
      },
      {
        label: "Study hours",
        value: hours,
        setter: (v) => update(setHours, v),
        unit: "hours",
      },
      {
        label: "Optional value of study time",
        value: hourValue,
        setter: (v) => update(setHourValue, v),
        prefix: "$/hr",
        note:
          "Personal time valuation is reported separately from cash cost.",
      },
      {
        label: "Average annual renewal costs",
        value: renewal,
        setter: (v) => update(setRenewal, v),
        prefix: "$",
        note:
          "Include dues, continuing education and recertification averaged annually.",
      },
      {
        label: "Evaluation horizon",
        value: years,
        setter: (v) => update(setYears, v),
        unit: "years",
      },
      {
        label: "Possible annual gross pay increase",
        value: raise,
        setter: (v) => update(setRaise, v),
        prefix: "$",
        note:
          "Use an incremental increase attributable to the credential, not a general raise.",
      },
      {
        label: "Estimated chance of that pay outcome",
        value: chance,
        setter: (v) => update(setChance, v),
        unit: "%",
        note:
          "A scenario assumption, not a measured probability.",
      },
      {
        label: "Estimated marginal tax rate",
        value: tax,
        setter: (v) => update(setTax, v),
        unit: "%",
        note:
          "Simplified combined tax estimate for additional wages.",
      },
    ];

  const cards = [
    [
      "Net upfront cash cost",
      money(upfront),
      "Initial costs less confirmed employer reimbursement, floored at zero.",
    ],
    [
      "Total cash cost over horizon",
      money(cashCost),
      "Upfront cost plus assumed annual renewal expenses.",
    ],
    [
      "Optional study-time value",
      money(timeCost),
      "Separate noncash valuation; not included in cash break-even.",
    ],
    [
      "Probability-weighted net cash outcome",
      money(net),
      "Scenario-weighted after-tax pay gains minus cash costs; not a forecast.",
    ],
    [
      "Required gross annual raise",
      requiredRaise === null
        ? "Not available"
        : money(requiredRaise),
      "Raise needed to cover cash costs over the selected horizon at your assumed probability.",
    ],
    [
      "Conditional payback if raise occurs",
      simplePayback === null
        ? "Not reached"
        : `${decimal(simplePayback * 12)} months`,
      "Initial cash cost divided by full after-tax annual raise; ignores renewal and outcome uncertainty.",
    ],
  ];

  return (
    <section
      id="certification-roi-calculator"
      className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
    >
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Certification ROI Calculator
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          What would have to happen for a certification to pay off?
        </h2>

        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          Estimate costs, ongoing requirements, and the salary
          improvement needed to recover your investment. The tool
          does not assume a certification causes a raise.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-7 md:p-9">
          <div className="space-y-9">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Costs and employer support
              </h3>

              <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
                {fields.slice(0, 4).map((f) => (
                  <Field
                    key={f.label}
                    label={f.label}
                    value={f.value}
                    prefix={f.prefix}
                    unit={f.unit}
                    note={f.note}
                    onChange={f.setter}
                    onBlur={f.onBlur}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Study time and ongoing costs
              </h3>

              <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
                {fields.slice(4, 8).map((f) => (
                  <Field
                    key={f.label}
                    label={f.label}
                    value={f.value}
                    prefix={f.prefix}
                    unit={f.unit}
                    note={f.note}
                    onChange={f.setter}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Potential compensation outcome
              </h3>

              <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
                {fields.slice(8).map((f) => (
                  <Field
                    key={f.label}
                    label={f.label}
                    value={f.value}
                    prefix={f.prefix}
                    unit={f.unit}
                    note={f.note}
                    onChange={f.setter}
                  />
                ))}
              </div>
            </div>

            <div
              className="border-t border-[var(--border)] pt-8"
              aria-live="polite"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Your results
              </h3>

              {!valid ? (
                <p className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 text-sm">
                  Enter nonnegative values, a horizon of 1–40 years,
                  a probability from 0–100%, and a marginal tax
                  rate below 60%.
                </p>
              ) : (
                <>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {cards.map(([label, value, description]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-[var(--border)] p-5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                          {label}
                        </p>
                        <p className="mt-3 text-2xl font-semibold">
                          {value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                      What the numbers suggest
                    </p>

                    <p className="mt-3 text-lg font-semibold">
                      {probability === 0
                        ? "With no assumed pay outcome, there is no salary-based cash payback."
                        : `At your assumed ${decimal(probability)}% outcome chance, the ${decimal(horizon)}-year scenario has a ${net >= 0 ? "positive" : "negative"} weighted cash result of ${money(Math.abs(net))}.`}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      The time valuation of {money(timeCost)} is
                      separate. Including it would change the
                      scenario result to{" "}
                      {money(horizonGain - economicCost)}.
                      Neither figure proves the credential will
                      cause a pay increase.
                    </p>
                  </div>
                </>
              )}
            </div>

            <p className="border-t border-[var(--border)] pt-6 text-sm leading-6 text-[var(--muted)]">
              <strong>Limitations:</strong> This simplified
              scenario assumes a constant annual raise after
              certification, uniform annual renewal costs,
              and an illustrative marginal tax rate. It does
              not model completion delays, job-search time,
              promotions with multiple outcomes, wage growth,
              discounting, or taxes on reimbursements.
              Verify employer policies and market demand
              separately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
