"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type CoverageStatus = "yes" | "no" | "unknown";

type AgeRange =
  | "under-20"
  | "20-40"
  | "40-60"
  | "over-60"
  | "unknown";

type PipeMaterial =
  | "modern-plastic"
  | "cast-iron"
  | "clay"
  | "other"
  | "unknown";

type FinancialResilience = "yes" | "would-hurt" | "no";

type Recommendation =
  | "review-existing"
  | "serious-consideration"
  | "may-be-useful"
  | "lower-priority";

export default function ServiceLineCoverageCheck() {
  const [existingCoverage, setExistingCoverage] =
    useState<CoverageStatus>("unknown");

  const [waterBackupCoverage, setWaterBackupCoverage] =
    useState<CoverageStatus>("unknown");

  const [ageRange, setAgeRange] = useState<AgeRange>("unknown");

  const [pipeMaterial, setPipeMaterial] =
    useState<PipeMaterial>("unknown");

  const [matureTrees, setMatureTrees] = useState(false);
  const [hardscape, setHardscape] = useState(false);
  const [previousProblems, setPreviousProblems] = useState(false);

  const [financialResilience, setFinancialResilience] =
    useState<FinancialResilience>("would-hurt");

  const [annualPremium, setAnnualPremium] = useState("");
  const [deductible, setDeductible] = useState("");
  const [coverageLimit, setCoverageLimit] = useState("");

  const [hasInteracted, setHasInteracted] = useState(false);

  const hasStarted = useRef(false);
  const previousRecommendation = useRef<Recommendation | null>(null);

  const markStarted = () => {
    if (!hasStarted.current) {
      hasStarted.current = true;

      trackEvent("service_line_check_started", {
        tool: "service_line_coverage",
      });
    }

    setHasInteracted(true);
  };

  const result = useMemo(() => {
    if (existingCoverage === "yes") {
      return {
        recommendation: "review-existing" as Recommendation,
        heading: "Review your existing coverage first",
        description:
          "You may already have service-line protection. Before adding another product, compare the existing endorsement's covered lines, causes of damage, deductible, coverage limit, and restoration provisions with the risk you are trying to transfer.",
        factors: [
          "Existing service-line coverage is already indicated",
          waterBackupCoverage === "yes"
            ? "You also have water-backup coverage to review separately"
            : "Water-backup coverage should still be checked separately",
        ],
      };
    }

    let score = 0;
    const factors: string[] = [];

    if (ageRange === "20-40") {
      score += 1;
      factors.push("The property has older-than-new infrastructure");
    }

    if (ageRange === "40-60") {
      score += 2;
      factors.push("The buried infrastructure may be relatively old");
    }

    if (ageRange === "over-60") {
      score += 3;
      factors.push("The buried infrastructure may be substantially aged");
    }

    if (pipeMaterial === "cast-iron" || pipeMaterial === "clay") {
      score += 1;
      factors.push("The known pipe material deserves closer review");
    }

    if (pipeMaterial === "unknown") {
      factors.push("The service-line material is unknown");
    }

    if (matureTrees) {
      score += 2;
      factors.push(
        "Mature trees increase the importance of checking line exposure",
      );
    }

    if (hardscape) {
      score += 2;
      factors.push(
        "Excavation beneath hardscape could increase restoration costs",
      );
    }

    if (previousProblems) {
      score += 2;
      factors.push(
        "Previous service-line problems suggest meaningful exposure",
      );
    }

    if (financialResilience === "would-hurt") {
      score += 1;
      factors.push(
        "A large unexpected repair would put pressure on your budget",
      );
    }

    if (financialResilience === "no") {
      score += 2;
      factors.push(
        "A large unexpected repair would be difficult to absorb",
      );
    }

    const premium = Number(annualPremium);
    const deductibleValue = Number(deductible);
    const limit = Number(coverageLimit);

    if (premium > 0 && premium <= 100) {
      factors.push("The stated annual premium is relatively modest");
    }

    if (deductibleValue > 0 && deductibleValue <= 500) {
      factors.push("The stated deductible is relatively low");
    }

    if (limit > 0 && limit < 5000) {
      factors.push(
        "The stated coverage limit may be low for a difficult repair",
      );
    }

    if (limit >= 10000) {
      factors.push(
        "The stated coverage limit provides more meaningful protection",
      );
    }

    if (score >= 8) {
      return {
        recommendation: "serious-consideration" as Recommendation,
        heading: "Coverage deserves serious consideration",
        description:
          "Your answers indicate a combination of property exposure and financial exposure that could make transferring some of the risk worthwhile. The policy still needs to match the specific causes and costs you are concerned about.",
        factors,
      };
    }

    if (score >= 4) {
      return {
        recommendation: "may-be-useful" as Recommendation,
        heading: "Coverage may be useful",
        description:
          "Your situation has some factors that increase the potential value of service-line coverage, but the decision depends heavily on the actual endorsement, deductible, coverage limit, and your ability to handle the loss yourself.",
        factors,
      };
    }

    return {
      recommendation: "lower-priority" as Recommendation,
      heading: "Coverage may be a lower priority",
      description:
        "Your answers do not show a strong combination of property and financial exposure. You can still choose to transfer the risk, but the case for paying an additional premium appears less urgent unless the policy provides unusually valuable protection.",
      factors,
    };
  }, [
    ageRange,
    annualPremium,
    coverageLimit,
    deductible,
    existingCoverage,
    financialResilience,
    hardscape,
    matureTrees,
    pipeMaterial,
    previousProblems,
    waterBackupCoverage,
  ]);

  useEffect(() => {
    if (!hasStarted.current) {
      previousRecommendation.current = result.recommendation;
      return;
    }

    if (previousRecommendation.current === result.recommendation) {
      return;
    }

    trackEvent("service_line_check_result_changed", {
      tool: "service_line_coverage",
      recommendation: result.recommendation,
      result_heading: result.heading,
    });

    previousRecommendation.current = result.recommendation;
  }, [result]);

  const resultClasses: Record<Recommendation, string> = {
    "review-existing":
      "border-[var(--border)] bg-[var(--background)]",
    "serious-consideration":
      "border-[var(--accent)] bg-white",
    "may-be-useful":
      "border-[var(--border)] bg-white",
    "lower-priority":
      "border-[var(--border)] bg-white",
  };

  return (
    <section
      id="coverage-check"
      className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
    >
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Service Line Coverage Check
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          Compare the risk you&apos;re carrying with the protection
          you&apos;re being offered.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          This tool does not predict whether a line will fail or determine
          whether a specific policy will pay a claim. Use it to identify the
          factors worth reviewing before you buy coverage.
        </p>

        <div className="mt-10 space-y-8 rounded-2xl border border-[var(--border)] bg-white p-8">
          <SelectField
            label="Do you already have service-line coverage?"
            value={existingCoverage}
            onChange={(value) => {
              markStarted();
              setExistingCoverage(value as CoverageStatus);
            }}
            options={[
              ["unknown", "Not sure"],
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <SelectField
            label="Do you have water-backup or sewer-backup coverage?"
            value={waterBackupCoverage}
            onChange={(value) => {
              markStarted();
              setWaterBackupCoverage(value as CoverageStatus);
            }}
            options={[
              ["unknown", "Not sure"],
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <SelectField
            label="Approximate age of the home or service line"
            value={ageRange}
            onChange={(value) => {
              markStarted();
              setAgeRange(value as AgeRange);
            }}
            options={[
              ["unknown", "Unknown"],
              ["under-20", "Under 20 years"],
              ["20-40", "20–40 years"],
              ["40-60", "40–60 years"],
              ["over-60", "More than 60 years"],
            ]}
          />

          <SelectField
            label="Known pipe or service-line material"
            value={pipeMaterial}
            onChange={(value) => {
              markStarted();
              setPipeMaterial(value as PipeMaterial);
            }}
            options={[
              ["unknown", "Unknown"],
              ["modern-plastic", "Modern plastic / PVC"],
              ["cast-iron", "Cast iron"],
              ["clay", "Clay"],
              ["other", "Other"],
            ]}
          />

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Property exposure
            </p>

            <div className="mt-4 space-y-4">
              <CheckboxField
                label="Mature trees are near the likely service-line route"
                checked={matureTrees}
                onChange={(checked) => {
                  markStarted();
                  setMatureTrees(checked);
                }}
              />

              <CheckboxField
                label="The line may run beneath a driveway, patio, sidewalk, or other hardscape"
                checked={hardscape}
                onChange={(checked) => {
                  markStarted();
                  setHardscape(checked);
                }}
              />

              <CheckboxField
                label="The property has had previous sewer, water-line, or service-line problems"
                checked={previousProblems}
                onChange={(checked) => {
                  markStarted();
                  setPreviousProblems(checked);
                }}
              />
            </div>
          </div>

          <SelectField
            label="Could you comfortably absorb an unexpected $5,000+ repair?"
            value={financialResilience}
            onChange={(value) => {
              markStarted();
              setFinancialResilience(value as FinancialResilience);
            }}
            options={[
              ["would-hurt", "It would hurt financially"],
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <div className="border-t border-[var(--border)] pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Coverage terms
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              These numbers are optional. Use the actual terms of the policy
              or service plan you are considering.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <NumberField
                label="Annual premium"
                value={annualPremium}
                prefix="$"
                onChange={(value) => {
                  markStarted();
                  setAnnualPremium(value);
                }}
              />

              <NumberField
                label="Deductible"
                value={deductible}
                prefix="$"
                onChange={(value) => {
                  markStarted();
                  setDeductible(value);
                }}
              />

              <NumberField
                label="Coverage limit"
                value={coverageLimit}
                prefix="$"
                onChange={(value) => {
                  markStarted();
                  setCoverageLimit(value);
                }}
              />
            </div>
          </div>
        </div>

        {hasInteracted ? (
          <div
            className={`mt-8 rounded-2xl border p-8 ${
              resultClasses[result.recommendation]
            }`}
            aria-live="polite"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Coverage Check
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
                  Factors worth reviewing
                </p>

                <ul className="mt-4 space-y-3">
                  {result.factors.slice(0, 6).map((factor) => (
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

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white/70 p-5">
              <p className="font-semibold">Before you buy</p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                <li>• Check for overlapping coverage first.</li>
                <li>
                  • Confirm the lines and causes of damage that qualify.
                </li>
                <li>
                  • Compare the deductible with the likely repair exposure.
                </li>
                <li>• Check the maximum coverage limit.</li>
                <li>
                  • Ask whether excavation and surface restoration are
                  included.
                </li>
                <li>• Review water-backup coverage separately.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8"
            aria-live="polite"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Coverage Check
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Complete the check to see what deserves your attention.
            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
              Answer the questions above to identify the factors that could
              make service-line coverage more or less useful for your
              situation.
            </p>
          </div>
        )}
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

type NumberFieldProps = {
  label: string;
  value: string;
  prefix?: string;
  onChange: (value: string) => void;
};

function NumberField({
  label,
  value,
  prefix,
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
      </div>
    </label>
  );
}