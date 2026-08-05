import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Meridian</h2>

            <p className="mt-4 max-w-xl leading-8 text-[var(--muted)]">
              Helping people navigate complex decisions through practical
              guidance, thoughtful research, and useful tools.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Northward Meridian</p>

          <p className="uppercase tracking-[0.2em] text-[var(--accent)]">
            Built with clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}