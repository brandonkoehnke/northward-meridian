"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const englishFooterLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

const spanishFooterLinks = [
    { label: "Acerca de", href: "/about" },
    { label: "Contacto", href: "/contact" },
    { label: "Privacidad", href: "/privacy" },
    { label: "Términos", href: "/terms" },
];

export default function Footer() {
    const pathname = usePathname();
    const spanish = pathname === "/es" || pathname.startsWith("/es/");
    const footerLinks = spanish
        ? spanishFooterLinks
        : englishFooterLinks;

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                            Northward Meridian
                        </h2>

                        <p className="mt-4 max-w-xl leading-8 text-[var(--muted)]">
                            {spanish
                                ? "Guías de decisiones y herramientas independientes para ayudarle a entender decisiones complejas con mayor claridad."
                                : "Research-backed decision guides and interactive tools for navigating complex decisions with clarity."}
                        </p>
                    </div>

                    <nav
                        aria-label={
                            spanish
                                ? "Navegación del pie de página"
                                : "Footer navigation"
                        }
                    >
                        <ul className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Northward Meridian</p>

                    <p className="uppercase tracking-[0.2em] text-[var(--accent)]">
                        {spanish
                            ? "Decisiones, más claras."
                            : "Decisions, made clearer."}
                    </p>
                </div>
            </div>
        </footer>
    );
}
