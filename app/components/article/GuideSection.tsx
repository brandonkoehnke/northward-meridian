import type { ReactNode } from "react";

import SectionAnchorLink from "./SectionAnchorLink";

type GuideSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function GuideSection({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: GuideSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 mx-auto max-w-4xl px-6 py-16 ${className}`.trim()}
    >
      <div className="border-t border-[var(--border)] pt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>

        <div className="group/section-heading mt-5 flex items-start gap-2">
          <h2 className="min-w-0 text-3xl font-semibold tracking-tight">
            {title}
          </h2>

          <SectionAnchorLink id={id} label={title} />
        </div>

        <div className="mt-8 space-y-6 text-lg leading-8">{children}</div>
      </div>
    </section>
  );
}