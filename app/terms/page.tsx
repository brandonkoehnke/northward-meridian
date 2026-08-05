export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <section className="mx-auto max-w-4xl px-6 py-24">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                    Terms of Use
                </p>

                <h1 className="mt-6 text-5xl font-bold tracking-tight">
                    Terms & Disclaimer
                </h1>

                <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
                    By using Meridian, you agree to the following terms.
                </p>

                <div className="mt-16 space-y-12">

                    <section>
                        <h2 className="text-2xl font-semibold">
                            Educational Information
                        </h2>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            Meridian publishes educational information intended to help
                            readers better understand topics and evaluate decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">
                            No Professional Advice
                        </h2>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            Information published on Meridian should not be considered
                            individualized financial, legal, tax, accounting, investment, or
                            professional advice. Decisions should be made based on your own
                            circumstances and, when appropriate, in consultation with a
                            qualified professional.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">
                            Accuracy
                        </h2>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            Meridian strives to provide accurate and current information.
                            However, regulations, pricing, products, benefits, and policies
                            change over time. No guarantee is made regarding completeness,
                            accuracy, or timeliness.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">
                            External Links
                        </h2>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            Meridian may link to third-party websites for reference or
                            convenience. Meridian is not responsible for the content,
                            policies, or practices of external websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">
                            Copyright
                        </h2>

                        <p className="mt-4 leading-8 text-[var(--muted)]">
                            Unless otherwise noted, all original content published by
                            Northward Meridian is protected by copyright. Permission is
                            required before reproducing or republishing substantial portions
                            of the content.
                        </p>
                    </section>

                    <section className="rounded-2xl border border-[var(--border)] bg-white p-10">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                                Important Information
                            </p>
                        </div>

                        <p className="mt-8 text-lg leading-8 text-[var(--foreground)]">
                            Meridian provides educational information designed to help readers
                            understand options, evaluate tradeoffs, and make informed decisions.
                        </p>

                        <p className="mt-6 leading-8 text-[var(--muted)]">
                            Nothing published on this website should be interpreted as personalized
                            financial, legal, tax, accounting, or investment advice. Before making
                            important financial decisions, consider consulting a qualified
                            professional who understands your specific situation.
                        </p>
                    </section>

                </div>
            </section>
        </main>
    );
}