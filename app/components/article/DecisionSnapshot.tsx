import type { GuideLocale } from "./GuideLocale";

type DecisionSnapshotProps = {
    locale?: GuideLocale;
    recommendedFor: string;
    readingTime: string;
    updated: string;
    bottomLine: string;
};

export default function DecisionSnapshot({
    locale = "en",
    recommendedFor,
    readingTime,
    updated,
    bottomLine,
}: DecisionSnapshotProps) {
    const labels =
        locale === "es"
            ? {
                  title: "Resumen de la decisión",
                  bottomLine: "En pocas palabras",
                  recommendedFor: "Para quién",
                  readingTime: "Lectura",
                  lastUpdated: "Actualizado",
              }
            : {
                  title: "Decision Snapshot",
                  bottomLine: "Bottom Line",
                  recommendedFor: "Recommended For",
                  readingTime: "Reading Time",
                  lastUpdated: "Last Updated",
              };

    return (
        <section className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {labels.title}
                </h2>

                <div className="mt-10 border-l-4 border-[var(--accent)] pl-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {labels.bottomLine}
                    </p>

                    <p className="mt-3 text-lg leading-8">{bottomLine}</p>
                </div>

                <div className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-3">
                    <SnapshotItem
                        label={labels.recommendedFor}
                        value={recommendedFor}
                    />
                    <SnapshotItem
                        label={labels.readingTime}
                        value={readingTime}
                    />
                    <SnapshotItem
                        label={labels.lastUpdated}
                        value={updated}
                    />
                </div>
            </div>
        </section>
    );
}

function SnapshotItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)] opacity-75">
                {label}
            </p>

            <p className="mt-3 text-lg font-medium">{value}</p>
        </div>
    );
}
