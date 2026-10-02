import Link from "next/link";

import { getRelatedGuides } from "@/lib/guides";

import type { GuideLocale } from "./GuideLocale";

type RelatedDecisionsProps = {
    locale?: GuideLocale;
    currentSlug: string;
};

export default function RelatedDecisions({
    locale = "en",
    currentSlug,
}: RelatedDecisionsProps) {
    const relatedGuides = getRelatedGuides(currentSlug);
    const labels =
        locale === "es"
            ? {
                  eyebrow: "Decisiones relacionadas",
                  title: "También puede estar decidiendo...",
                  scroll: "Deslice para explorar →",
                  read: "Leer la guía",
                  browse: "Ver todas las guías de decisiones",
                  browseDescription:
                      "Explore marcos prácticos para decisiones importantes.",
                  view: "Ver todas las guías",
              }
            : {
                  eyebrow: "Related Decisions",
                  title: "You may also be deciding...",
                  scroll: "Scroll to explore →",
                  read: "Read decision guide",
                  browse: "Browse all decision guides",
                  browseDescription:
                      "Explore practical frameworks for home, business, technology, personal finance, and other consequential decisions.",
                  view: "View all guides",
              };

    return (
        <section className="mx-auto max-w-4xl px-6 py-16">
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {labels.eyebrow}
                </p>

                <div className="mt-5 flex items-end justify-between gap-6">
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {labels.title}
                    </h2>

                    {relatedGuides.length >= 3 ? (
                        <p className="hidden shrink-0 text-sm text-[var(--muted)] sm:block">
                            {labels.scroll}
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
                                        {labels.read}
                                        <span aria-hidden="true">→</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Link
                        href={locale === "es" ? "/es" : "/guides"}
                        className="group mt-8 block rounded-2xl border border-[var(--border)] bg-white p-8 transition hover:border-[var(--accent)]"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Northward Meridian
                        </p>
                        <h3 className="mt-3 text-xl font-semibold">
                            {labels.browse}
                        </h3>
                        <p className="mt-3 leading-7 text-[var(--muted)]">
                            {labels.browseDescription}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
                            {labels.view}
                            <span aria-hidden="true">→</span>
                        </span>
                    </Link>
                )}
            </div>
        </section>
    );
}
