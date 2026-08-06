type DecisionChecklistProps = {
  id?: string;
  title?: string;
  items: string[];
};

export default function DecisionChecklist({
  id,
  title = "Before You Decide",
  items,
}: DecisionChecklistProps) {
  return (
    <section id={id} className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {title}
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Take these steps before making your decision.
        </h2>

        <ul className="mt-10 space-y-5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4"
            >
              <div className="mt-1 h-6 w-6 rounded border-2 border-[var(--accent)]" />

              <span className="text-lg leading-8">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}