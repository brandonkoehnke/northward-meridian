"use client";

import { useEffect, useMemo, useState } from "react";

export type GuideNavigationItem = {
  id: string;
  label: string;
  stage?: "Secure" | "Diagnose" | "Evaluate" | "Decide" | "Act";
};

type GuideTableOfContentsProps = {
  items: readonly GuideNavigationItem[];
  variant?: "mobile" | "desktop";
};

export default function GuideTableOfContents({
  items,
  variant = "desktop",
}: GuideTableOfContentsProps) {
  const validItems = useMemo(
    () => items.filter((item) => item.id.trim() && item.label.trim()),
    [items],
  );

  const [activeId, setActiveId] = useState(validItems[0]?.id ?? "");

  useEffect(() => {
    const sections = validItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const updateActiveSection = () => {
      if (window.scrollY < 300) {
        setActiveId(validItems[0]?.id ?? "");
        return;
      }

      const activationLine = 150;
      let current = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          current = section;
        } else {
          break;
        }
      }

      setActiveId(current.id);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [validItems]);

  const activeIndex = Math.max(
    0,
    validItems.findIndex((item) => item.id === activeId),
  );

  const progress = validItems.length
    ? ((activeIndex + 1) / validItems.length) * 100
    : 0;

  const navigateTo = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    setActiveId(id);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  if (!validItems.length) return null;

  if (variant === "mobile") {
    return (
      <div className="mx-auto max-w-4xl px-6 pt-8 xl:hidden">
        <label
          htmlFor="guide-section-select"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]"
        >
          On this page
        </label>

        <select
          id="guide-section-select"
          value={activeId}
          onChange={(event) => navigateTo(event.target.value)}
          className="mt-3 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base font-medium text-[var(--foreground)] shadow-sm outline-none focus:border-[var(--accent)]"
        >
          {validItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
      <nav
        aria-label="Guide sections"
        className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            On this page
          </p>

          <span className="text-xs tabular-nums text-[var(--muted)]">
            {activeIndex + 1}/{validItems.length}
          </span>
        </div>

        <div
          className="mt-4 h-1 overflow-hidden rounded-full bg-[var(--border)]"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="mt-5 space-y-1">
          {validItems.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border-l-2 px-3 py-2 text-left transition-colors ${isActive
                    ? "border-[var(--accent)] bg-[var(--background)]"
                    : "border-transparent hover:bg-[var(--background)]"
                    }`}
                >
                  <span
                    className={`text-sm leading-5 ${isActive
                      ? "font-semibold text-[var(--foreground)]"
                      : "font-medium text-[var(--muted)]"
                      }`}
                  >
                    {item.label}
                  </span>

                  {item.stage ? (
                    <span
                      className={`shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.12em] ${isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)]"
                        }`}
                    >
                      {item.stage}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}