"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { GuideSummary } from "@/lib/guides";

type GuideDirectoryProps = {
    guides: GuideSummary[];
    totalCount: number;
};

const ALL_CATEGORIES = "All";

export default function GuideDirectory({
    guides,
    totalCount,
}: GuideDirectoryProps) {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState(ALL_CATEGORIES);

    const categoryOptions = useMemo(
        () => [
            ALL_CATEGORIES,
            ...Array.from(
                new Set(guides.map((guide) => guide.category)),
            ).sort((a, b) => a.localeCompare(b)),
        ],
        [guides],
    );

    useEffect(() => {
        const handleFilterRequest = (event: Event) => {
            const customEvent = event as CustomEvent<{
                category?: string;
            }>;

            const requestedCategory = customEvent.detail?.category;

            if (
                requestedCategory &&
                categoryOptions.includes(requestedCategory)
            ) {
                setSelectedCategory(requestedCategory);
            }
        };

        window.addEventListener(
            "northward-meridian:filter-guides",
            handleFilterRequest,
        );

        return () => {
            window.removeEventListener(
                "northward-meridian:filter-guides",
                handleFilterRequest,
            );
        };
    }, [categoryOptions]);

    const normalizedQuery = query.trim().toLowerCase();

    const filteredGuides = useMemo(() => {
        return guides.filter((guide) => {
            const matchesCategory =
                selectedCategory === ALL_CATEGORIES ||
                guide.category === selectedCategory;

            if (!matchesCategory) {
                return false;
            }

            if (!normalizedQuery) {
                return true;
            }

            const searchableText = [
                guide.title,
                guide.description,
                guide.category,
                guide.tool?.name ?? "",
                ...guide.tags,
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                normalizedQuery,
            );
        });
    }, [
        guides,
        normalizedQuery,
        selectedCategory,
    ]);

    const hasFilters =
        Boolean(normalizedQuery) ||
        selectedCategory !== ALL_CATEGORIES;

    const clearFilters = () => {
        setQuery("");
        setSelectedCategory(ALL_CATEGORIES);

        const url = new URL(window.location.href);
        url.searchParams.delete("category");
        window.history.replaceState(
            {},
            "",
            `${url.pathname}${url.search}`,
        );
    };

    return (
        <section
            id="all-decisions"
            className="mt-20 scroll-mt-8"
            aria-labelledby="all-decisions-heading"
        >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        All guides
                    </p>
                    <h2
                        id="all-decisions-heading"
                        className="mt-3 text-3xl font-semibold tracking-tight"
                    >
                        {totalCount} decision guides.
                    </h2>
                </div>

                <p className="text-sm text-[var(--muted)]">
                    Showing {filteredGuides.length} of {totalCount}{" "}
                    {totalCount === 1 ? "guide" : "guides"}
                </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-5">
                <label
                    htmlFor="guide-search"
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                    Search guides
                </label>

                <div className="mt-3 flex flex-col gap-3 md:flex-row">
                    <input
                        id="guide-search"
                        type="search"
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                        placeholder="Search guides, topics, or tools..."
                        className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                    />

                    {hasFilters ? (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
                        >
                            Clear filters
                        </button>
                    ) : null}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {categoryOptions.map((category) => {
                        const isSelected =
                            category === selectedCategory;

                        return (
                            <button
                                key={category}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => {
                                    setSelectedCategory(
                                        category,
                                    );

                                    const url = new URL(
                                        window.location.href,
                                    );

                                    if (
                                        category ===
                                        ALL_CATEGORIES
                                    ) {
                                        url.searchParams.delete(
                                            "category",
                                        );
                                    } else {
                                        url.searchParams.set(
                                            "category",
                                            category,
                                        );
                                    }

                                    window.history.replaceState(
                                        {},
                                        "",
                                        `${url.pathname}${url.search}`,
                                    );
                                }}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${isSelected
                                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                                    : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--accent)]"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {filteredGuides.length > 0 ? (
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {filteredGuides.map((guide) => (
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
                                        {guide.tool.type ===
                                            "calculator"
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
            ) : (
                <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-xl font-semibold">
                        No decisions match those filters.
                    </p>
                    <p className="mt-3 text-[var(--muted)]">
                        Try a broader search or clear the filters to
                        browse the full library.
                    </p>
                </div>
            )}
        </section>
    );
}
