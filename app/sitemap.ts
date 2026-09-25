import type { MetadataRoute } from "next";

import { guides } from "@/lib/guides";

const baseUrl = "https://northwardmeridian.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const guideEntries = guides
        .filter((guide) => guide.published)
        .map((guide) => ({
            url: `${baseUrl}${guide.href}`,
            lastModified: new Date(guide.lastModified),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.4,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...guideEntries,
    ];
}