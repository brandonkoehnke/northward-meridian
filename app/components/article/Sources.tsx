type Source = {
  title: string;
  publisher: string;
  href: string;
};

type SourcesProps = {
  sources: Source[];
};

export default function Sources({ sources }: SourcesProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Sources
        </p>

        <ul className="mt-8 space-y-5">
          {sources.map((source) => (
            <li
              key={source.href}
              className="rounded-2xl border border-[var(--border)] bg-white p-6"
            >
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p className="text-sm uppercase tracking-[0.15em] text-[var(--muted)]">
                  {source.publisher}
                </p>

                <p className="mt-2 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
                  {source.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}