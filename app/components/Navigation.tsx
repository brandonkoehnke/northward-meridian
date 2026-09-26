import Link from "next/link";
import LogoMark from "./LogoMark";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-5 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-colors hover:text-[var(--accent)]"
        >
          <LogoMark />

          <span className="truncate text-lg font-semibold tracking-tight sm:text-xl">
            Northward Meridian
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-5 pl-4 text-sm font-medium sm:gap-8 sm:pl-6">
          <Link
            href="/guides"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Guides
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