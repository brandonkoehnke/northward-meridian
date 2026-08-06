"use client";

import { useEffect, useState } from "react";

type SectionAnchorLinkProps = {
  id: string;
  label: string;
};

export default function SectionAnchorLink({
  id,
  label,
}: SectionAnchorLinkProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copySectionLink = async () => {
    const url = new URL(window.location.href);
    url.hash = id;

    window.history.replaceState(null, "", url);

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
    } catch {
      // Clipboard access can be blocked in some browsers or non-secure contexts.
      // The URL still updates so it can be copied from the address bar.
      setCopied(false);
    }
  };

  return (
    <span className="relative inline-flex shrink-0 items-center">
      <button
        type="button"
        onClick={copySectionLink}
        aria-label={`Copy link to ${label}`}
        title={`Copy link to ${label}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] opacity-70 transition hover:bg-white hover:text-[var(--accent)] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:opacity-0 md:group-hover/section-heading:opacity-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.15-1.15" />
        </svg>
      </button>

      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2 py-1 text-xs font-medium text-white shadow-md transition ${
          copied
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 opacity-0"
        }`}
      >
        Link copied
      </span>
    </span>
  );
}