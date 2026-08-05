type ArticleHeroProps = {
  category: string;
  title: string;
  description: string;
  updated: string;
  readingTime: string;
};

export default function ArticleHero({
  category,
  title,
  description,
  updated,
  readingTime,
}: ArticleHeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-20">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        {category}
      </p>

      <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
        {title}
      </h1>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
        <span>Updated {updated}</span>
        <span aria-hidden="true">•</span>
        <span>{readingTime} read</span>
      </div>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">
        {description}
      </p>
    </section>
  );
}