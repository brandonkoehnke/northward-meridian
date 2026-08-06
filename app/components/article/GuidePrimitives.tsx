import type { ReactNode } from "react";

type InformationCardProps = {
  title: string;
  children: ReactNode;
};

export function InformationCard({ title, children }: InformationCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-6 text-base leading-7 text-[var(--muted)]">{children}</div>
    </div>
  );
}

export function GuideBullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
      />
      <span>{children}</span>
    </li>
  );
}

type FormulaCardProps = {
  title: string;
  lines: string[];
};

export function FormulaCard({ title, lines }: FormulaCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-7">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <ul className="mt-6 space-y-3">
        {lines.map((line) => (
          <GuideBullet key={line}>{line}</GuideBullet>
        ))}
      </ul>
    </div>
  );
}

type ExampleCardProps = {
  label: string;
  title: string;
  facts: string[];
  result: string;
};

export function ExampleCard({ label, title, facts, result }: ExampleCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        {label}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
      <ul className="mt-6 space-y-3 text-base leading-7 text-[var(--muted)]">
        {facts.map((fact) => (
          <GuideBullet key={fact}>{fact}</GuideBullet>
        ))}
      </ul>
      <div className="mt-7 border-l-4 border-[var(--accent)] pl-5">
        <p className="font-semibold">Planning result</p>
        <p className="mt-2 text-base leading-7 text-[var(--muted)]">{result}</p>
      </div>
    </article>
  );
}
