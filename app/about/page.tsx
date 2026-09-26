export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          About Northward Meridian
        </p>

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
          Helping people make better decisions.
        </h1>

        <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
          Northward Meridian exists to help people navigate complex decisions
          with practical guidance, thoughtful research, and interactive
          decision tools.
        </p>

        <section className="mt-20 space-y-8 text-lg leading-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Our philosophy
            </h2>

            <p className="mt-4">
              Most people don&apos;t need more information—they need better
              frameworks for making decisions. Northward Meridian is built
              around that idea.
            </p>

            <p className="mt-4">
              Every guide is designed to answer a specific decision, present
              the available options fairly, explain the important tradeoffs,
              and provide a practical recommendation supported by evidence.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              How we create guides
            </h2>

            <p className="mt-4">
              Northward Meridian combines careful research, structured
              analysis, and practical decision frameworks to produce guides
              that are clear, balanced, and actionable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              What you&apos;ll find here
            </h2>

            <ul className="mt-6 space-y-3">
              <li>• Decision guides for everyday and professional choices</li>
              <li>• Practical frameworks for evaluating tradeoffs</li>
              <li>• Interactive calculators and decision checks</li>
              <li>• Transparent sourcing and original analysis</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Our commitment
            </h2>

            <p className="mt-4">
              Northward Meridian is committed to publishing guides that
              respect your time. We aim to provide recommendations early,
              explain the reasoning clearly, acknowledge uncertainty when it
              exists, and help you move forward with confidence.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}