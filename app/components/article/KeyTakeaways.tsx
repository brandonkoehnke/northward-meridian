type KeyTakeawaysProps = {
  items: string[];
};

export default function KeyTakeaways({
  items,
}: KeyTakeawaysProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Key Takeaways
        </p>

        <ul className="mt-8 space-y-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]"
              />

              <span className="leading-8 text-[var(--foreground)]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}