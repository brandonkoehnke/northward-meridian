import Link from "next/link";
import LogoMark from "./LogoMark";

export default function Navigation() {
  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors hover:text-[var(--accent)]"
        >
          <LogoMark />

          <span className="text-xl font-semibold tracking-tight">
            Northward Meridian
          </span>
        </Link>

        <div className="flex gap-8 text-sm font-medium">
          <Link
            href="/articles"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Articles
          </Link>

          <Link
            href="/topics"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Topics
          </Link>

          <Link
            href="/tools"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Tools
          </Link>

          <Link
            href="/about"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}