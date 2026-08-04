export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-16">
      <div className="mx-auto max-w-6xl px-6">

        <h3 className="text-xl font-semibold tracking-tight">
          Northward Meridian
        </h3>

        <p className="mt-4 max-w-xl leading-8 text-[var(--muted)]">
          Helping people navigate complex decisions through practical guidance,
          thoughtful research, and useful tools.
        </p>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-8">

          <p className="text-sm text-[var(--muted)]">
            © 2026 Northward Meridian
          </p>

          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Built with clarity.
          </p>

        </div>

      </div>
    </footer>
  );
}