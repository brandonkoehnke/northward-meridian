export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Contact
        </p>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          We'd love to hear from you.
        </h1>

        <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
          Questions, corrections, suggestions, or feedback are always welcome.
        </p>

        <div className="mt-16 rounded-2xl border border-[var(--border)] bg-white p-10">
          <h2 className="text-2xl font-semibold">
            Email
          </h2>

          <p className="mt-4 text-lg">
            hello@northwardmeridian.com
          </p>

          <p className="mt-8 leading-8 text-[var(--muted)]">
            If you notice an error in one of our guides or have a suggestion
            for a future topic, we'd appreciate hearing from you.
          </p>
        </div>
      </section>
    </main>
  );
}