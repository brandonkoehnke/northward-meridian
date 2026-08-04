import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Northward Meridian
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Navigate complex decisions with confidence.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-600">
          Practical guides, thoughtful research, and useful tools that help you
          move forward with clarity.
        </p>

        <Link
          href="/articles"
          className="mt-12 rounded-full bg-[var(--accent)] px-8 py-4 text-white transition hover:bg-[var(--accent-hover)]"
        >
          Explore Articles
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-32 md:grid-cols-3">

        <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--accent)]"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Guide
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-semibold">
            Practical Guidance
          </h2>

          <p className="leading-8 text-[var(--muted)]">
            Clear explanations that help you understand complicated topics without
            unnecessary jargon.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--accent)]"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Research
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-semibold">
            Thoughtful Research
          </h2>

          <p className="leading-8 text-[var(--muted)]">
            Carefully researched content focused on helping you make better
            decisions—not generating more noise.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--accent)]"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Tools
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-semibold">
            Useful Tools
          </h2>

          <p className="leading-8 text-[var(--muted)]">
            Downloadable resources, calculators, and templates designed to turn
            information into action.
          </p>
        </div>

      </section>
    </main>
  );
}