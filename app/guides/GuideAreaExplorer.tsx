"use client";

import { useEffect, useRef } from "react";

type GuideAreaExplorerProps = {
    categories: {
        name: string;
        count: number;
    }[];
};

export default function GuideAreaExplorer({
    categories,
}: GuideAreaExplorerProps) {
    const handledInitialRequest = useRef(false);

    useEffect(() => {
        if (handledInitialRequest.current) {
            return;
        }

        const requestedCategory =
            new URLSearchParams(window.location.search).get(
                "category",
            );

        if (!requestedCategory) {
            return;
        }

        if (
            categories.some(
                (category) =>
                    category.name === requestedCategory,
            )
        ) {
            window.dispatchEvent(
                new CustomEvent(
                    "northward-meridian:filter-guides",
                    {
                        detail: {
                            category: requestedCategory,
                        },
                    },
                ),
            );

            requestAnimationFrame(() => {
                document
                    .getElementById("all-decisions")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            });
        }

        handledInitialRequest.current = true;
    }, [categories]);

    const handleCategoryClick = (category: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("category", category);
        window.history.replaceState(
            {},
            "",
            `${url.pathname}${url.search}`,
        );

        window.dispatchEvent(
            new CustomEvent(
                "northward-meridian:filter-guides",
                {
                    detail: {
                        category,
                    },
                },
            ),
        );

        document
            .getElementById("all-decisions")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <section
            className="mt-10"
            aria-labelledby="explore-by-area"
        >
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Explore by area
                </p>
                <h2
                    id="explore-by-area"
                    className="mt-3 text-3xl font-semibold tracking-tight"
                >
                    Find decisions by subject.
                </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        type="button"
                        onClick={() =>
                            handleCategoryClick(
                                category.name,
                            )
                        }
                        className="group rounded-2xl border border-[var(--border)] bg-white p-6 text-left transition-transform hover:-translate-y-0.5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold">
                                    {category.name}
                                </p>
                                <p className="mt-2 text-sm text-[var(--muted)]">
                                    {category.count}{" "}
                                    {category.count === 1
                                        ? "decision guide"
                                        : "decision guides"}
                                </p>
                            </div>

                            <span className="text-lg text-[var(--accent)] transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold text-[var(--accent)]">
                            Explore {category.name.toLowerCase()}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    );
}
