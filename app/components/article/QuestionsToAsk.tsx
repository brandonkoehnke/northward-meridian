import type { GuideLocale } from "./GuideLocale";

type QuestionsToAskProps = {
    locale?: GuideLocale;
    id?: string;
    title?: string;
    subtitle?: string;
    questions: string[];
};

export default function QuestionsToAsk({
    locale = "en",
    id,
    title,
    subtitle,
    questions,
}: QuestionsToAskProps) {
    const resolvedTitle =
        title ?? (locale === "es" ? "Preguntas útiles" : "Questions to Ask");
    const resolvedSubtitle =
        subtitle ??
        (locale === "es"
            ? "Lleve estas preguntas antes de tomar una decisión."
            : "Bring these questions with you before making a decision.");
    const conversationTitle =
        locale === "es" ? "Tenga una conversación más clara." : "Have a better conversation.";

    return (
        <section id={id} className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {resolvedTitle}
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    {conversationTitle}
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    {resolvedSubtitle}
                </p>

                <div className="mt-10 space-y-5">
                    {questions.map((question) => (
                        <div
                            key={question}
                            className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"
                        >
                            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                                ?
                            </div>
                            <p className="text-lg leading-8">{question}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
