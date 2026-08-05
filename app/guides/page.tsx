import Link from "next/link";

const guides = [
  {
    title: "How to Evaluate Whether a Premium Credit Card Is Worth the Annual Fee",
    description:
      "A practical framework for deciding whether to keep, downgrade, or cancel a premium credit card.",
    category: "Personal Finance",
    href: "/guides/premium-credit-card-annual-fee",
  },
  {
    title: "How to Assess an AI Business Idea Before Building It",
    description:
      "A decision framework for evaluating demand, differentiation, and monetization before investing heavily.",
    category: "Business",
    href: "/guides/evaluate-ai-business-idea",
  },
  {
    title: "How to Start a Small Content Website Without Overbuilding",
    description:
      "The essential decisions, tools, and launch steps for a lean publishing business.",
    category: "Technology",
    href: "/guides/start-small-content-website",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Guides
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Practical guidance for important decisions.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--muted)]">
          Decision-focused guides that help you understand your options and move
          forward with clarity.
        </p>

        <div className="mt-16 grid gap-8">
          {guides.map((guide) => (
            <article
              key={guide.href}
              className="rounded-2xl border border-[var(--border)] bg-white p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {guide.category}
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {guide.title}
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                {guide.description}
              </p>

              <Link
                href={guide.href}
                className="mt-6 inline-block font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}