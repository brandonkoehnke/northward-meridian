type FrameworkStep = {
  title: string;
  description: string;
};

type DecisionFrameworkProps = {
  introduction?: string;
  steps: FrameworkStep[];
};

export default function DecisionFramework({
  introduction,
  steps,
}: DecisionFrameworkProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Decision Framework
        </p>

        {introduction && (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {introduction}
          </p>
        )}

        <ol className="mt-10 space-y-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-5 rounded-2xl border border-[var(--border)] bg-white p-8 md:grid-cols-[auto_1fr]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                {index + 1}
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 leading-8 text-[var(--muted)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}