import type { MetadataRoute } from "next";

const baseUrl = "https://northwardmeridian.com";

export default function sitemap(): MetadataRoute.Sitemap {
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
            url: `${baseUrl}/guides/repair-or-replace-water-heater`,
            lastModified: new Date("2026-08-06"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/premium-credit-card-annual-fee`,
            lastModified: new Date("2026-08-06"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/is-service-line-coverage-worth-it`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.8,
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
        {
            url: `${baseUrl}/guides/should-i-buy-a-timeshare-resale`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/replace-roof-before-selling-house`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/septic-inspection-before-selling-house`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/replace-galvanized-plumbing-before-selling-house`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/remove-underground-oil-tank-before-selling-house`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/idle-or-turn-car-off-fuel-efficiency`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/roof-rack-gas-mileage-cost`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/engine-braking-automatic-transmission`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/tonneau-cover-gas-savings-payback`,
            lastModified: new Date("2026-09-22"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/dirty-engine-air-filter-gas-mileage`,
            lastModified: new Date("2026-09-23"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}