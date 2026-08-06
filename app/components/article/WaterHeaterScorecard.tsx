"use client";

import { useMemo, useState } from "react";

type HeaterType =
  | "gas-storage"
  | "electric-storage"
  | "heat-pump"
  | "tankless"
  | "other";

type AgeRange = "under-5" | "5-8" | "9-12" | "over-12" | "unknown";

type FailureType =
  | "replaceable-component"
  | "uncertain-leak"
  | "confirmed-tank-leak"
  | "no-hot-water"
  | "insufficient-capacity"
  | "other";

type RepairCostShare = "under-20" | "20-40" | "40-60" | "over-60" | "unknown";

type Recommendation =
  | "safety"
  | "repair"
  | "mixed"
  | "replace"
  | "diagnose";

export default function WaterHeaterScorecard() {
  const [heaterType, setHeaterType] = useState<HeaterType>("gas-storage");
  const [ageRange, setAgeRange] = useState<AgeRange>("unknown");
  const [failureType, setFailureType] =
    useState<FailureType>("replaceable-component");
  const [repairCostShare, setRepairCostShare] =
    useState<RepairCostShare>("unknown");

  const [underWarranty, setUnderWarranty] = useState(false);
  const [repeatRepairs, setRepeatRepairs] = useState(false);
  const [visibleCorrosion, setVisibleCorrosion] = useState(false);
  const [meetsDemand, setMeetsDemand] = useState(true);
  const [safetyConcern, setSafetyConcern] = useState(false);

  const result = useMemo(() => {
    if (safetyConcern) {
      return {
        recommendation: "safety" as Recommendation,
        heading: "Arrange immediate professional evaluation",
        description:
          "Possible gas, combustion, electrical, pressure, overheating, or carbon-monoxide hazards should be evaluated before repair-versus-replacement economics are considered.",
      };
    }

    if (failureType === "confirmed-tank-leak") {
      return {
        recommendation: "replace" as Recommendation,
        heading: "Lean strongly toward replacement",
        description:
          "A confirmed leak through the tank body or another nonserviceable pressure-vessel area generally makes replacement the practical path.",
      };
    }

    let score = 0;

    if (ageRange === "under-5") score -= 3;
    if (ageRange === "5-8") score -= 1;
    if (ageRange === "9-12") score += 2;
    if (ageRange === "over-12") score += 4;

    if (failureType === "replaceable-component") score -= 2;
    if (failureType === "uncertain-leak") score += 1;
    if (failureType === "no-hot-water") score += 0;
    if (failureType === "insufficient-capacity") score += 3;
    if (failureType === "other") score += 1;

    if (repairCostShare === "under-20") score -= 3;
    if (repairCostShare === "20-40") score -= 1;
    if (repairCostShare === "40-60") score += 2;
    if (repairCostShare === "over-60") score += 4;

    if (underWarranty) score -= 2;
    if (repeatRepairs) score += 3;
    if (visibleCorrosion) score += 3;
    if (!meetsDemand) score += 3;

    if (
      ageRange === "unknown" ||
      repairCostShare === "unknown" ||
      failureType === "uncertain-leak"
    ) {
      return {
        recommendation: "diagnose" as Recommendation,
        heading: "Get a diagnosis and itemized quotes first",
        description:
          "The missing information could materially change the decision. Confirm the failure source, warranty status, repair price, and complete installed replacement cost before choosing.",
      };
    }

    if (score <= -3) {
      return {
        recommendation: "repair" as Recommendation,
        heading: "Lean toward repair",
        description:
          "The current inputs suggest an isolated, economically reasonable repair on a unit that may still have useful service life.",
      };
    }

    if (score >= 6) {
      return {
        recommendation: "replace" as Recommendation,
        heading: "Lean toward replacement",
        description:
          "Age, condition, recurring problems, capacity, or repair economics suggest that replacement may provide better long-term value.",
      };
    }

    return {
      recommendation: "mixed" as Recommendation,
      heading: "This is a mixed decision",
      description:
        "Repair and replacement are both credible. Compare itemized costs, remaining warranty, reliability risk, expected ownership period, and possible efficiency improvements.",
    };
  }, [
    ageRange,
    failureType,
    meetsDemand,
    repairCostShare,
    repeatRepairs,
    safetyConcern,
    underWarranty,
    visibleCorrosion,
  ]);

  const resultClasses: Record<Recommendation, string> = {
    safety: "border-red-300 bg-red-50",
    repair: "border-[var(--accent)] bg-white",
    mixed: "border-[var(--border)] bg-white",
    replace: "border-[var(--accent)] bg-white",
    diagnose: "border-[var(--border)] bg-white",
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Repair-or-Replace Scorecard
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          Organize the decision before requesting work.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          This planning tool cannot diagnose equipment. Use it to identify the
          facts that should drive a conversation with a qualified professional.
        </p>

        <div className="mt-10 space-y-8 rounded-2xl border border-[var(--border)] bg-white p-8">
          <SelectField
            label="Water-heater type"
            value={heaterType}
            onChange={(value) => setHeaterType(value as HeaterType)}
            options={[
              ["gas-storage", "Gas storage tank"],
              ["electric-storage", "Electric storage tank"],
              ["heat-pump", "Heat-pump water heater"],
              ["tankless", "Tankless water heater"],
              ["other", "Other or unknown"],
            ]}
          />

          <SelectField
            label="Approximate age"
            value={ageRange}
            onChange={(value) => setAgeRange(value as AgeRange)}
            options={[
              ["unknown", "Unknown"],
              ["under-5", "Under 5 years"],
              ["5-8", "5–8 years"],
              ["9-12", "9–12 years"],
              ["over-12", "More than 12 years"],
            ]}
          />

          <SelectField
            label="Primary problem"
            value={failureType}
            onChange={(value) => setFailureType(value as FailureType)}
            options={[
              [
                "replaceable-component",
                "Confirmed replaceable component failure",
              ],
              ["uncertain-leak", "Water or moisture with an uncertain source"],
              [
                "confirmed-tank-leak",
                "Confirmed leak through the tank or nonserviceable vessel area",
              ],
              ["no-hot-water", "No hot water or inconsistent heating"],
              ["insufficient-capacity", "The system no longer meets demand"],
              ["other", "Other"],
            ]}
          />

          <SelectField
            label="Repair quote as a share of installed replacement cost"
            value={repairCostShare}
            onChange={(value) =>
              setRepairCostShare(value as RepairCostShare)
            }
            options={[
              ["unknown", "Unknown—quotes not yet available"],
              ["under-20", "Under 20%"],
              ["20-40", "20–40%"],
              ["40-60", "40–60%"],
              ["over-60", "More than 60%"],
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <CheckboxField
              label="The failed part or tank may still be under warranty"
              checked={underWarranty}
              onChange={setUnderWarranty}
            />

            <CheckboxField
              label="The unit has needed repeated repairs recently"
              checked={repeatRepairs}
              onChange={setRepeatRepairs}
            />

            <CheckboxField
              label="There is significant visible corrosion"
              checked={visibleCorrosion}
              onChange={setVisibleCorrosion}
            />

            <CheckboxField
              label="The unit currently meets household hot-water demand"
              checked={meetsDemand}
              onChange={setMeetsDemand}
            />
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <CheckboxField
              label="There may be a gas, combustion, carbon-monoxide, electrical, pressure, overheating, or active flooding hazard"
              checked={safetyConcern}
              onChange={setSafetyConcern}
            />
          </div>
        </div>

        <div
          className={`mt-8 rounded-2xl border p-8 ${resultClasses[result.recommendation]}`}
          aria-live="polite"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Planning Result
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {result.heading}
          </h3>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            {result.description}
          </p>

          <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
            This result is educational and is not a diagnosis, safety
            inspection, repair estimate, or substitute for qualified
            professional advice.
          </p>
        </div>
      </div>
    </section>
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