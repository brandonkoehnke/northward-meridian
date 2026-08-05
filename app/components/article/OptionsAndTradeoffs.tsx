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
          Options &amp; Tradeoffs
        </p>

        <div className="mt-10 space-y-10">
          {options.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-8"
            >
              <h3 className="text-2xl font-semibold tracking-tight">
                {option.title}
              </h3>

              <p className="mt-4 leading-8 text-[var(--muted)]">
                {option.summary}
              </p>

              <div className="mt-8 grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Benefits
                  </p>

                  <ul className="mt-5 space-y-3">
                    {option.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                        />

                        <span className="leading-7 text-[var(--foreground)]">
                          {pro}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Things to Consider
                  </p>

                  <ul className="mt-5 space-y-3">
                    {option.cons.map((con) => (
                      <li key={con} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--muted)]"
                        />

                        <span className="leading-7 text-[var(--foreground)]">
                          {con}
                        </span>
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