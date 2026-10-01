import Link from "next/link";
import type { Metadata } from "next";

import { getGuidesByLocale } from "@/lib/guides";

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl = `${siteUrl}/es`;

export const metadata: Metadata = {
    title: "Northward Meridian en Español",
    description:
        "Guías y herramientas independientes en español para ayudarle a tomar decisiones importantes en Estados Unidos.",
    alternates: {
        canonical: canonicalUrl,
        languages: {
            es: canonicalUrl,
            en: `${siteUrl}/guides`,
        },
    },
    openGraph: {
        title: "Northward Meridian en Español",
        description:
            "Guías y herramientas independientes en español para decisiones importantes.",
        url: canonicalUrl,
        siteName: "Northward Meridian",
        locale: "es_US",
    },
};

const spanishGuides = getGuidesByLocale("es");

export default function SpanishHome() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                <div className="max-w-4xl py-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                        Northward Meridian en Español
                    </p>

                    <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                        Decisiones importantes, explicadas con claridad.
                    </h1>

                    <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
                        Guías y herramientas independientes para entender los
                        costos, riesgos y alternativas detrás de decisiones
                        importantes en Estados Unidos.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold">
                            {spanishGuides.length}{" "}
                            {spanishGuides.length === 1
                                ? "guía de decisión"
                                : "guías de decisión"}
                        </span>
                    </div>
                </div>

                <section className="border-t border-[var(--border)] pt-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Guías disponibles
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                        Explore las decisiones disponibles en español.
                    </h2>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {spanishGuides.map((guide) => (
                            <article
                                key={guide.href}
                                className="rounded-2xl border border-[var(--border)] bg-white p-7"
                            >
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                        {guide.category}
                                    </p>

                                    <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                                        {guide.tool.type === "calculator"
                                            ? "Calculadora"
                                            : "Guía de decisión"}
                                    </span>
                                </div>

                                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                                    {guide.title}
                                </h3>

                                <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                                    Incluye: {guide.tool.name}
                                </p>

                                <p className="mt-4 leading-7 text-[var(--muted)]">
                                    {guide.description}
                                </p>

                                <Link
                                    href={guide.href}
                                    className="mt-6 inline-block font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                                >
                                    Leer la guía →
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-16 rounded-2xl border border-[var(--border)] bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Sobre estas guías
                    </p>

                    <p className="mt-4 leading-8 text-[var(--muted)]">
                        Esta sección está comenzando con un pequeño número de
                        experimentos en español. El objetivo es ofrecer
                        explicaciones claras, fuentes primarias y herramientas
                        que le permitan evaluar una decisión con sus propios
                        números.
                    </p>
                </section>
            </section>
        </main>
    );
}
