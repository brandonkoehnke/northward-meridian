import Link from "next/link";

type RelatedGuide = {
  title: string;
  description: string;
  href: string;
  category: string;
};

type ContinueExploringProps = {
  guides: RelatedGuide[];
};

export default function ContinueExploring({
  guides,
}: ContinueExploringProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Continue Exploring
        </p>

        <div className="mt-8 grid gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block rounded-2xl border border-[var(--border)] bg-white p-8 transition hover:border-[var(--accent)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                {guide.category}
              </p>

              <h3 className="mt-3 text-xl font-semibold">{guide.title}</h3>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}