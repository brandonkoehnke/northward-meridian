import type { Metadata } from "next";

import PreListingInspectionDecisionCheck from "./PreListingInspectionDecisionCheck";

export const metadata: Metadata = {
    title:
        "Should I Get a Home Inspection Before Selling My House? | Northward Meridian",
    description:
        "Understand when a pre-listing home inspection can reduce uncertainty before a sale, what information it can and cannot provide, and how repair plans and disclosure requirements affect the decision.",
};

export default function HomeInspectionBeforeSellingHousePage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <section className="mx-auto max-w-4xl px-6 pt-20">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Home
                </p>

                <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                    Should I Get a Home Inspection Before Selling My House?
                </h1>

                <p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--muted)]">
                    Understand when a pre-listing home inspection can reduce
                    uncertainty before a sale, what information it can and
                    cannot provide, and how repair plans and disclosure
                    requirements affect the decision.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-6">
                    <p className="text-sm leading-7 text-[var(--muted)]">
                        This is a temporary QA page for testing the
                        Pre-Listing Inspection Decision Check. The full
                        research-backed guide will replace this shell after
                        the tool logic is validated.
                    </p>
                </div>
            </section>

            <PreListingInspectionDecisionCheck />
        </main>
    );
}