"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export type GuidedEntryScenario = {
  id: string;
  title: string;
  summary: string;
  guidance: string;
  destinationId: string;
  destinationLabel: string;
};

type GuidedEntryProps = {
  scenarios: readonly GuidedEntryScenario[];
};

export default function GuidedEntry({ scenarios }: GuidedEntryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedId) ?? null;

  const goToSection = () => {
    if (!selectedScenario) return;

    const section = document.getElementById(
      selectedScenario.destinationId,
    );

    if (!section) return;

    trackEvent("guided_entry_destination_clicked", {
      scenario_id: selectedScenario.id,
      scenario_title: selectedScenario.title,
      destination_id: selectedScenario.destinationId,
      destination_label: selectedScenario.destinationLabel,
    });

    window.history.replaceState(
      null,
      "",
      `#${selectedScenario.destinationId}`,
    );

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    section.classList.remove("guide-destination-highlight");

    requestAnimationFrame(() => {
      section.classList.add("guide-destination-highlight");
    });

    window.setTimeout(() => {
      section.classList.remove("guide-destination-highlight");
    }, 1800);
  };

  return (
    <section
      aria-labelledby="guided-entry-title"
      className="mx-auto max-w-4xl px-6 py-12"
    >
      <div className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-sm md:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Start here
        </p>

        <h2
          id="guided-entry-title"
          className="mt-3 text-3xl font-semibold tracking-tight"
        >
          What&apos;s happening today?
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Choose the situation that best matches yours. We&apos;ll point you
          to the most relevant part of this guide.
        </p>

        <div className="mt-7 grid gap-3">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === selectedId;

            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setSelectedId(scenario.id);

                  trackEvent("guided_entry_selected", {
                    scenario_id: scenario.id,
                    scenario_title: scenario.title,
                    destination_id: scenario.destinationId,
                  });
                }}
                aria-pressed={isSelected}
                className={`rounded-2xl border p-5 text-left transition ${isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--border)] bg-white hover:border-[var(--accent)] hover:bg-[var(--background)]"
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold">
                      {scenario.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                      {scenario.summary}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`mt-1 shrink-0 transition ${isSelected
                      ? "rotate-90 text-[var(--accent)]"
                      : "text-[var(--muted)]"
                      }`}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedScenario ? (
          <div
            aria-live="polite"
            className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Start with this
            </p>

            <p className="mt-3 leading-7">
              {selectedScenario.guidance}
            </p>

            <button
              type="button"
              onClick={goToSection}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Go to {selectedScenario.destinationLabel}
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}