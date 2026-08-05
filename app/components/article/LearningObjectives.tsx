type LearningObjectivesProps = {
  items: string[];
};

export default function LearningObjectives({
  items,
}: LearningObjectivesProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-y border-[var(--border)] py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          What You&apos;ll Learn
        </p>

        <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]"
              />

              <span className="leading-7 text-[var(--foreground)]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}