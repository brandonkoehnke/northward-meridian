import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Northward Meridian
        </Link>

        <div className="flex gap-8 text-sm font-medium text-zinc-600">
          <Link href="/articles">Articles</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}