import type { Guide } from "./guide";

export type GuideSummary = Pick<
  Guide,
  "title" | "category" | "description" | "tags"
> & {
  slug: string;
  href: string;
  published: boolean;
  relatedSlugs: string[];
};

export const guides: GuideSummary[] = [
  {
    slug: "premium-credit-card-annual-fee",
    title:
      "How to Evaluate Whether a Premium Credit Card Is Worth the Annual Fee",
    description:
      "A practical framework for deciding whether to keep, downgrade, or cancel a premium credit card.",
    category: "Personal Finance",
    href: "/guides/premium-credit-card-annual-fee",
    tags: ["credit cards", "annual fees", "travel rewards"],
    published: true,
    relatedSlugs: [],
  },
  {
    slug: "evaluate-ai-business-idea",
    title: "How to Assess an AI Business Idea Before Building It",
    description:
      "A decision framework for evaluating demand, differentiation, and monetization before investing heavily.",
    category: "Business",
    href: "/guides/evaluate-ai-business-idea",
    tags: ["AI", "business", "validation"],
    published: false,
    relatedSlugs: ["start-small-content-website"],
  },
  {
    slug: "start-small-content-website",
    title: "How to Start a Small Content Website Without Overbuilding",
    description:
      "The essential decisions, tools, and launch steps for a lean publishing business.",
    category: "Technology",
    href: "/guides/start-small-content-website",
    tags: ["publishing", "websites", "content"],
    published: false,
    relatedSlugs: ["evaluate-ai-business-idea"],
  },
  {
    slug: "repair-or-replace-water-heater",
    title: "Should You Repair or Replace Your Water Heater?",
    description:
      "A practical framework based on safety, failure type, age, warranty, repair history, installed cost, household needs, and potential efficiency improvements.",
    category: "Home",
    href: "/guides/repair-or-replace-water-heater",
    tags: [
      "water heaters",
      "home repair",
      "homeownership",
      "energy efficiency",
      "repair or replace",
    ],
    published: true,
    relatedSlugs: [
      "tank-vs-tankless-water-heater",
      "heat-pump-water-heater",
      "home-warranty-worth-it",
    ],
  },
  {
    slug: "tank-vs-tankless-water-heater",
    title: "Should You Choose a Tank or Tankless Water Heater?",
    description:
      "Compare installed cost, hot-water demand, maintenance, efficiency, space requirements, and expected ownership period.",
    category: "Home",
    href: "/guides/tank-vs-tankless-water-heater",
    tags: ["water heaters", "tankless", "home improvement"],
    published: false,
    relatedSlugs: [
      "repair-or-replace-water-heater",
      "heat-pump-water-heater",
    ],
  },
  {
    slug: "heat-pump-water-heater",
    title: "Is a Heat-Pump Water Heater Worth It?",
    description:
      "Evaluate energy savings, installation requirements, climate, available space, noise, recovery performance, and incentives.",
    category: "Home",
    href: "/guides/heat-pump-water-heater",
    tags: ["water heaters", "heat pumps", "energy efficiency"],
    published: false,
    relatedSlugs: [
      "repair-or-replace-water-heater",
      "tank-vs-tankless-water-heater",
    ],
  },
  {
    slug: "home-warranty-worth-it",
    title: "Is a Home Warranty Worth the Cost?",
    description:
      "Compare premiums, service fees, exclusions, claim limits, equipment age, and your ability to absorb major repair costs.",
    category: "Home",
    href: "/guides/home-warranty-worth-it",
    tags: ["home warranty", "home repair", "insurance"],
    published: false,
    relatedSlugs: ["repair-or-replace-water-heater"],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slug: string, limit = 3) {
  const currentGuide = getGuideBySlug(slug);

  if (!currentGuide) {
    return [];
  }

  return currentGuide.relatedSlugs
    .map(getGuideBySlug)
    .filter(
      (guide): guide is GuideSummary =>
        Boolean(guide && guide.published && guide.slug !== slug),
    )
    .slice(0, limit);
}