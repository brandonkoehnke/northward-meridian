import Link from "next/link";

import GuideAreaExplorer from "./GuideAreaExplorer";
import GuideDirectory from "./GuideDirectory";
import { guides } from "@/lib/guides";

const publishedGuides = guides.filter((guide) => guide.published);

const preferredCategoryOrder = [
  "Home",
  "Automotive",
  "Personal Finance",
  "Technology",
  "Travel",
];

const categories = [
  ...preferredCategoryOrder.filter((category) =>
    publishedGuides.some((guide) => guide.category === category),
  ),
  ...Array.from(
    new Set(publishedGuides.map((guide) => guide.category)),
  )
    .filter((category) => !preferredCategoryOrder.includes(category))
    .sort((a, b) => a.localeCompare(b)),
].map((category) => ({
  name: category,
  count: publishedGuides.filter(
    (guide) => guide.category === category,
  ).length,
}));

const featuredSlugs = [
  "is-a-home-battery-backup-worth-it",
  "is-all-wheel-drive-worth-it",
  "is-gigabit-internet-worth-it",
];

const featuredGuides = featuredSlugs
  .map((slug) =>
    publishedGuides.find((guide) => guide.slug === slug),
  )
  .filter((guide): guide is (typeof publishedGuides)[number] =>
    Boolean(guide),
  );

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Guides
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Practical guidance for important decisions.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
          Research-backed decision guides with interactive calculators
          and decision checks that help you understand your options,
          test your situation, and move forward with clarity.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold">
            {publishedGuides.length} decision guides
          </span>
          <span className="text-sm text-[var(--muted)]">
            {categories.length} areas
          </span>
        </div>

        <GuideAreaExplorer categories={categories} />

        {featuredGuides.length > 0 ? (
          <section className="mt-20" aria-labelledby="featured-decisions">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Featured guides
            </p>
            <h2
              id="featured-decisions"
              className="mt-3 text-3xl font-semibold tracking-tight"
            >
              Start with a few of the newest decision paths.
            </h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {featuredGuides.map((guide) => (
                <article
                  key={guide.href}
                  className="rounded-2xl border border-[var(--border)] bg-white p-7"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      {guide.category}
                    </p>

                    {guide.tool ? (
                      <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        {guide.tool.type === "calculator"
                          ? "Calculator"
                          : "Decision Check"}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight">
                    {guide.title}
                  </h3>

                  {guide.tool ? (
                    <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                      Includes: {guide.tool.name}
                    </p>
                  ) : null}

                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {guide.description}
                  </p>

                  <Link
                    href={guide.href}
                    className="mt-6 inline-block text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                  >
                    Read guide →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <GuideDirectory
          guides={publishedGuides}
          totalCount={publishedGuides.length}
        />
      </section>
    </main>
  );
}
