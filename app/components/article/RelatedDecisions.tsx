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

        <div className="mt-5 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            You may also be deciding...
          </h2>

          {relatedGuides.length >= 3 ? (
            <p className="hidden shrink-0 text-sm text-[var(--muted)] sm:block">
              Scroll to explore →
            </p>
          ) : null}
        </div>

        {relatedGuides.length > 0 ? (
          <div className="-mx-6 mt-8 overflow-x-auto px-6 pb-4 pt-2">
            <div className="flex snap-x snap-mandatory gap-5">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.href}
                  className="group w-[85%] shrink-0 snap-start rounded-2xl border border-[var(--border)] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm sm:w-[60%] lg:w-[calc((100%-1.25rem)/2)]"
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
          </div>
        ) : (
          <Link
            href="/guides"
            className="group mt-8 block rounded-2xl border border-[var(--border)] bg-white p-8 transition hover:border-[var(--accent)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Northward Meridian
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