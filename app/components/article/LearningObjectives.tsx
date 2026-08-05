type LearningObjectivesProps = {
  items: string[];
};

export default function LearningObjectives({
  items,
}: LearningObjectivesProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="border-y border-[var(--border)] py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          What You&apos;ll Learn
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                ✓
              </span>

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