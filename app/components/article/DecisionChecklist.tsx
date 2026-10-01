import type { GuideLocale } from "./GuideLocale";

type DecisionChecklistProps = {
    locale?: GuideLocale;
    id?: string;
    title?: string;
    items: string[];
};

export default function DecisionChecklist({
    locale = "en",
    id,
    title,
    items,
}: DecisionChecklistProps) {
    const resolvedTitle =
        title ??
        (locale === "es"
            ? "Antes de decidir"
            : "Before You Decide");
    const heading =
        locale === "es"
            ? "Siga estos pasos antes de tomar una decisión."
            : "Take these steps before making your decision.";

    return (
        <section id={id} className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {resolvedTitle}
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    {heading}
                </h2>

                <ul className="mt-10 space-y-5">
                    {items.map((item) => (
                        <li key={item} className="flex items-start gap-4">
                            <div className="mt-1 size-6 shrink-0 rounded border-2 border-[var(--accent)]" />
                            <span className="text-lg leading-8">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
