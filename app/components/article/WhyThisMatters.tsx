type WhyThisMattersProps = {
  children: React.ReactNode;
};

export default function WhyThisMatters({
  children,
}: WhyThisMattersProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Why This Decision Matters
        </p>

        <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--foreground)]">
          {children}
        </div>
      </div>
    </section>
  );
}