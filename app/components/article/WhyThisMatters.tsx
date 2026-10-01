import type { ReactNode } from "react";

import type { GuideLocale } from "./GuideLocale";

type WhyThisMattersProps = {
    locale?: GuideLocale;
    id?: string;
    children: ReactNode;
};

export default function WhyThisMatters({
    locale = "en",
    id,
    children,
}: WhyThisMattersProps) {
    return (
        <section id={id} className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {locale === "es"
                        ? "Por qué importa esta decisión"
                        : "Why This Decision Matters"}
                </p>

                <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--foreground)]">
                    {children}
                </div>
            </div>
        </section>
    );
}
