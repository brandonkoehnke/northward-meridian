export default function Navigation() {
  return (
    <nav className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight">
          Northward Meridian
        </h1>

        <div className="flex gap-8 text-sm font-medium text-zinc-600">
          <a href="#">Articles</a>
          <a href="#">Topics</a>
          <a href="#">Tools</a>
          <a href="#">About</a>
        </div>
      </div>
    </nav>
  );
}