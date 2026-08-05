type ArticleHeroProps = {
  category: string;
  title: string;
  description: string;
};

export default function ArticleHero({
  category,
  title,
  description,
}: ArticleHeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        {category}
      </p>

      <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
        {title}
      </h1>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">
        {description}
      </p>
    </section>
  );
}