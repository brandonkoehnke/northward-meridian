export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Northward Meridian
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Navigate complex decisions with confidence.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-600">
          Practical guides, thoughtful research, and useful tools that help you
          move forward with clarity.
        </p>

        <button className="mt-12 rounded-full bg-black px-8 py-4 text-white transition hover:bg-zinc-800">
          Explore Articles
        </button>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-32 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Practical Guidance
          </h2>

          <p className="leading-8 text-zinc-600">
            Clear explanations that help you understand complicated topics
            without unnecessary jargon.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Thoughtful Research
          </h2>

          <p className="leading-8 text-zinc-600">
            Carefully researched content focused on helping you make better
            decisions—not generating more noise.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Useful Tools
          </h2>

          <p className="leading-8 text-zinc-600">
            Downloadable resources, calculators, and templates designed to turn
            information into action.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-lg font-semibold">Northward Meridian</h3>

          <p className="mt-3 max-w-xl leading-8 text-zinc-600">
            Helping people navigate complex decisions through practical
            guidance, thoughtful research, and useful tools.
          </p>

          <p className="mt-8 text-sm text-zinc-400">
            © 2026 Northward Meridian
          </p>
        </div>
      </footer>
    </main>
  );
}