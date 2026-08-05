type RecommendationItem = {
  heading: string;
  description: string;
};

type RecommendationProps = {
  summary: string;
  items: RecommendationItem[];
};

export default function Recommendation({
  summary,
  items,
}: RecommendationProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Recommendation
        </p>

        <p className="mt-6 max-w-3xl text-xl leading-9 text-[var(--foreground)]">
          {summary}
        </p>

        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <div
              key={item.heading}
              className="rounded-2xl border border-[var(--border)] bg-white p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                {item.heading}
              </h3>

              <p className="mt-4 leading-8 text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}