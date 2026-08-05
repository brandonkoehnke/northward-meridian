type Option = {
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
};

type OptionsAndTradeoffsProps = {
  options: Option[];
};

export default function OptionsAndTradeoffs({
  options,
}: OptionsAndTradeoffsProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Options & Tradeoffs
        </p>

        <div className="mt-10 space-y-10">
          {options.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-8"
            >
              <h3 className="text-2xl font-semibold">
                {option.title}
              </h3>

              <p className="mt-4 leading-8 text-[var(--muted)]">
                {option.summary}
              </p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="font-semibold text-green-700">
                    Advantages
                  </p>

                  <ul className="mt-4 space-y-2">
                    {option.pros.map((pro) => (
                      <li key={pro} className="flex gap-3">
                        <span className="text-green-600">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-red-700">
                    Tradeoffs
                  </p>

                  <ul className="mt-4 space-y-2">
                    {option.cons.map((con) => (
                      <li key={con} className="flex gap-3">
                        <span className="text-red-600">−</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}