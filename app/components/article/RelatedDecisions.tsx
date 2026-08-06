import Link from "next/link";

import { getRelatedGuides } from "@/lib/guides";

type RelatedDecisionsProps = {
  currentSlug: string;
};

export default function RelatedDecisions({
  currentSlug,
}: RelatedDecisionsProps) {
  const relatedGuides = getRelatedGuides(currentSlug);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Related Decisions
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          You may also be deciding...
        </h2>

        {relatedGuides.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.href}
                className="group rounded-2xl border border-[var(--border)] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {guide.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight">
                  {guide.title}
                </h3>

                <p className="mt-3 leading-7 text-[var(--muted)]">
                  {guide.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
                  Read decision guide
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <Link
            href="/guides"
            className="group mt-8 block rounded-2xl border border-[var(--border)] bg-white p-8 transition hover:border-[var(--accent)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Meridian
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Browse all decision guides
            </h3>

            <p className="mt-3 leading-7 text-[var(--muted)]">
              Explore practical frameworks for home, business, technology,
              personal finance, and other consequential decisions.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
              View all guides
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}