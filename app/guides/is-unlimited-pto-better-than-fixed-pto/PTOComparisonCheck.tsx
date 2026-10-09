
"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Answer = "yes" | "no" | "unknown";

const questions = [
  {
    key: "history",
    label:
      "Employees in comparable roles regularly take at least as many days as your fixed offer provides.",
    why: "Ask about actual days taken, not the policy headline.",
  },
  {
    key: "approval",
    label: "Your manager supports time off and approval rules are clear.",
    why: "A nominally unlimited policy can still be hard to use.",
  },
  {
    key: "minimum",
    label:
      "The policy has a minimum or actively encourages a reasonable amount of leave.",
    why: "A minimum reduces ambiguity about what is acceptable.",
  },
  {
    key: "coverage",
    label: "Your workload and team coverage make time away realistic.",
    why: "Workload is often more important than the advertised limit.",
  },
  {
    key: "separate",
    label:
      "Sick leave, holidays, and parental leave are defined separately or clearly explained.",
    why: "Know which absences count under the policy.",
  },
  {
    key: "written",
    label:
      "You have reviewed the written policy, including eligibility and restrictions.",
    why: "Verbal descriptions are not a substitute for policy terms.",
  },
] as const;

const choices: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Not sure" },
];

export default function PTOComparisonCheck() {
  const [fixedDays, setFixedDays] = useState("20");
  const [likelyDays, setLikelyDays] = useState("15");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const started = useRef(false);

  const mark = () => {
    if (!started.current) {
      started.current = true;
      trackEvent("pto_comparison_check_started", {
        tool: "pto_comparison_check",
      });
    }
  };

  const update = (key: string, answer: Answer) => {
    mark();

    setAnswers((prev) => ({
      ...prev,
      [key]: answer,
    }));

    trackEvent("pto_comparison_check_changed", {
      tool: "pto_comparison_check",
    });
  };

  const fixed = Number(fixedDays);
  const likely = Number(likelyDays);

  const valid =
    fixedDays.trim() !== "" &&
    likelyDays.trim() !== "" &&
    Number.isFinite(fixed) &&
    Number.isFinite(likely) &&
    fixed >= 0 &&
    likely >= 0 &&
    fixed <= 365 &&
    likely <= 365;

  const difference = valid ? likely - fixed : 0;

  const no = questions.filter(
    (q) => answers[q.key] === "no"
  ).length;

  const unknown = questions.filter(
    (q) =>
      !answers[q.key] ||
      answers[q.key] === "unknown"
  ).length;

  // Report both concerns and unresolved conditions.
  const investigationHeading =
    no > 0 && unknown > 0
      ? `${no} potential usability concern${no === 1 ? "" : "s"
      } · ${unknown} condition${unknown === 1 ? "" : "s"
      } to verify`
      : no > 0
        ? `${no} potential usability concern${no === 1 ? "" : "s"
        }`
        : unknown > 0
          ? `${unknown} condition${unknown === 1 ? "" : "s"
          } still to verify`
          : "No concerns flagged in your answers";

  const investigationDescription =
    no > 0 && unknown > 0
      ? "Some answers indicate potential limitations, while others still need verification. Ask for concrete examples of time-off approvals, team coverage, actual vacation usage, and the written policy."
      : no > 0
        ? "Ask for concrete examples of approvals, coverage, and actual time off before assuming unlimited PTO is more valuable."
        : unknown > 0
          ? "Get the written policy and ask comparable employees how many days they take."
          : "Your answers suggest a usable policy, but this check cannot verify employer practices or guarantee future approvals.";

  return (
    <section
      id="pto-comparison-check"
      className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
    >
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          PTO Decision Check
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          Compare time you can realistically take, not just the policy names.
        </h2>

        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          Enter the fixed annual allowance and the days you
          realistically expect to take under an unlimited policy.
          Then review the conditions that make unlimited PTO usable.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-7 md:p-9">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col justify-end gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Fixed PTO days per year
              </span>

              <input
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                type="number"
                min="0"
                max="365"
                value={fixedDays}
                onChange={(e) => {
                  mark();
                  setFixedDays(e.target.value);
                }}
              />
            </label>

            <label className="flex flex-col justify-end gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Days you expect to use with unlimited PTO
              </span>

              <input
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                type="number"
                min="0"
                max="365"
                value={likelyDays}
                onChange={(e) => {
                  mark();
                  setLikelyDays(e.target.value);
                }}
              />
            </label>
          </div>

          <div
            className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Estimated usable-day comparison
            </p>

            {valid ? (
              <>
                <p className="mt-3 text-2xl font-semibold">
                  {difference === 0
                    ? "Same number of days"
                    : `${Math.abs(difference)} ${Math.abs(difference) === 1
                      ? "day"
                      : "days"
                    } ${difference > 0
                      ? "more"
                      : "fewer"
                    } with unlimited PTO`}
                </p>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  This is a scenario comparison, not a prediction.
                  The unlimited estimate depends on approvals,
                  workload, team norms, and policy terms.
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm">
                Enter valid day counts between 0 and 365.
              </p>
            )}
          </div>

          <div className="mt-9 border-t border-[var(--border)] pt-8">
            <h3 className="text-xl font-semibold">
              Can you actually use the unlimited policy?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Choose an answer for each condition. Unknowns are
              questions to resolve, not automatic negatives.
            </p>

            <div className="mt-6 space-y-5">
              {questions.map((q) => (
                <fieldset
                  key={q.key}
                  className="rounded-xl border border-[var(--border)] p-5"
                >
                  <legend className="px-1 font-medium">
                    {q.label}
                  </legend>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {q.why}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {choices.map((choice) => (
                      <label
                        key={choice.value}
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${answers[q.key] === choice.value
                            ? "border-[var(--accent)] bg-[var(--background)] font-semibold"
                            : "border-[var(--border)]"
                          }`}
                      >
                        <input
                          className="mr-2"
                          type="radio"
                          name={q.key}
                          checked={
                            answers[q.key] === choice.value
                          }
                          onChange={() =>
                            update(q.key, choice.value)
                          }
                        />

                        {choice.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          <div
            className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              What to investigate
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              {investigationHeading}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {investigationDescription}
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Also compare carryover, accrued balances, payout
              rules, holidays, sick leave, and any transition or
              waiting periods. Rules differ by employer and
              jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
