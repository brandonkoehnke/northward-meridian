import Link from "next/link";

const articles = [
  {
    title: "How to Evaluate Whether a Credit Card Annual Fee Is Worth It",
    description:
      "A practical framework for comparing annual fees against the value you actually use.",
    category: "Personal Finance",
    href: "#",
  },
  {
    title: "How to Assess an AI Business Idea Before Building It",
    description:
      "A clear process for testing demand, differentiation, and monetization before investing heavily.",
    category: "Business",
    href: "#",
  },
  {
    title: "How to Start a Small Content Website Without Overbuilding",
    description:
      "The essential decisions, tools, and launch steps for a lean publishing business.",
    category: "Technology",
    href: "#",
  },
];

export default function ArticlesPage() {
  return (
    

      <main className="min-h-screen bg-white text-zinc-900">
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Articles
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Practical explanations for complex questions.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-600">
            Research-driven guides designed to help you understand your options
            and make better decisions.
          </p>

          <div className="mt-16 grid gap-8">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-2xl border border-zinc-200 p-8 transition hover:border-zinc-400"
              >
                <p className="text-sm font-medium text-zinc-500">
                  {article.category}
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {article.title}
                </h2>

                <p className="mt-4 max-w-3xl leading-8 text-zinc-600">
                  {article.description}
                </p>

                <Link
                  href={article.href}
                  className="mt-6 inline-block text-sm font-semibold text-zinc-900"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    
  );
}