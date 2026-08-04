

export default function AboutPage() {
  return (
    
      <main className="min-h-screen bg-white text-zinc-900">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            About Northward Meridian
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Clear guidance for complicated decisions.
          </h1>

          <div className="mt-12 space-y-8 text-lg leading-9 text-zinc-600">
            <p>
              Northward Meridian exists to make complex topics easier to
              understand and act on.
            </p>

            <p>
              We publish practical guides, thoughtful research, and useful tools
              designed to help readers make better decisions with more clarity
              and less noise.
            </p>

            <p>
              Our work may cover finance, business, technology, home ownership,
              productivity, and other areas where people are looking for clear,
              trustworthy explanations.
            </p>

            <p>
              Artificial intelligence may assist with research, organization,
              and drafting, but every published resource is reviewed with a
              focus on accuracy, usefulness, and transparency.
            </p>
          </div>

          <section className="mt-20 border-t border-zinc-200 pt-12">
            <h2 className="text-2xl font-semibold">Editorial principles</h2>

            <ul className="mt-6 space-y-4 text-lg leading-8 text-zinc-600">
              <li>Clarity over complexity.</li>
              <li>Usefulness over volume.</li>
              <li>Accuracy over speed.</li>
              <li>Original value over repetition.</li>
              <li>Transparency about uncertainty.</li>
            </ul>
          </section>
        </section>
      </main>
    
  );
}