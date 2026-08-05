type DecisionSnapshotProps = {
  recommendedFor: string;
  readingTime: string;
  updated: string;
  bottomLine: string;
};

export default function DecisionSnapshot({
  recommendedFor,
 readingTime,
  updated,
  bottomLine,
}: DecisionSnapshotProps) {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          Decision Snapshot
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <SnapshotItem
            label="Recommended For"
            value={recommendedFor}
          />

          <SnapshotItem
            label="Reading Time"
            value={readingTime}
          />

          <SnapshotItem
            label="Last Updated"
            value={updated}
          />
        </div>

        <div className="mt-10 rounded-xl bg-[var(--background)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Bottom Line
          </p>

          <p className="mt-4 text-lg leading-8">
            {bottomLine}
          </p>
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
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-3 text-lg font-medium">
        {value}
      </p>
    </div>
  );
}