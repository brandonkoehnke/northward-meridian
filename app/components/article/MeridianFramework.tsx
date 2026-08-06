type MeridianFrameworkStep = {
  label: string;
  description: string;
  href: `#${string}`;
};

type MeridianFrameworkProps = {
  steps: readonly MeridianFrameworkStep[];
};

const stepIcons = [
  <svg
    key="secure"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />
    <path d="m9.5 12 1.7 1.7 3.6-4" />
  </svg>,

  <svg
    key="diagnose"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
    <path d="M8.5 11h5" />
    <path d="M11 8.5v5" />
  </svg>,

  <svg
    key="evaluate"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M4 19V9" />
    <path d="M10 19V5" />
    <path d="M16 19v-7" />
    <path d="M22 19H2" />
  </svg>,

  <svg
    key="decide"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>,

  <svg
    key="act"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    <path d="M7 8h5" />
    <path d="M7 16h3" />
  </svg>,
] as const;

export default function MeridianFramework({
  steps,
}: MeridianFrameworkProps) {
  return (
    <section
      aria-labelledby="meridian-framework-title"
      className="mx-auto max-w-6xl px-6 py-12"
    >
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-sm">
        <div className="border-b border-[var(--border)] px-7 py-7 md:px-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            The Meridian Framework
          </p>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2
              id="meridian-framework-title"
              className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl"
            >
              A structured path from uncertainty to action
            </h2>

            <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
              Follow the five stages in order, or select a stage to jump
              directly to that part of the guide.
            </p>
          </div>
        </div>

        <ol className="grid md:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="relative border-b border-[var(--border)] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <a
                href={step.href}
                className="group flex h-full gap-4 p-6 transition hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] md:min-h-56 md:flex-col"
              >
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--accent)] transition group-hover:border-[var(--accent)] group-hover:bg-white">
                  {stepIcons[index]}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Step {index + 1}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-[var(--accent)] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {step.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </a>

              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-8 z-20 hidden h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-white text-xs text-[var(--muted)] md:flex"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}