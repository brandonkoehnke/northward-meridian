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
    relatedSlugs: ["is-service-line-coverage-worth-it"],
  },

  {
    slug: "is-service-line-coverage-worth-it",
    title: "Is Service Line Coverage Worth It?",
    description:
      "A practical guide to deciding whether coverage for buried water, sewer, gas, and utility lines is worth the cost.",
    category: "Home",
    href: "/guides/is-service-line-coverage-worth-it",
    tags: [
      "service line coverage",
      "sewer line coverage",
      "homeowners insurance",
      "homeownership",
      "insurance",
    ],
    published: true,
    relatedSlugs: ["repair-or-replace-water-heater"],
  },

  {
    slug: "should-i-buy-a-timeshare-resale",
    title: "Should I Buy a Timeshare Resale?",
    description:
      "Compare buying a timeshare from a developer with buying resale, including total ownership cost, transferable benefits, booking rules, and contract risks.",
    category: "Travel",
    href: "/guides/should-i-buy-a-timeshare-resale",
    tags: [
      "timeshares",
      "timeshare resale",
      "vacation ownership",
      "travel",
      "developer vs resale",
    ],
    published: true,
    relatedSlugs: [],
  },

  // Future guides
  {
    slug: "tank-vs-tankless-water-heater",
    title: "Should You Choose a Tank or Tankless Water Heater?",
    description:
      "Compare installed cost, hot-water demand, maintenance, efficiency, space requirements, and expected ownership period.",
    category: "Home",
    href: "/guides/tank-vs-tankless-water-heater",
    tags: ["water heaters", "tankless", "home improvement"],
    published: false,
    relatedSlugs: ["repair-or-replace-water-heater"],
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
    relatedSlugs: ["repair-or-replace-water-heater"],
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
    slug: "replace-roof-before-selling-house",
    title: "Should I Replace My Roof Before Selling My House?",
    description:
      "A practical framework for deciding whether to replace, repair, credit, or sell a house with an aging or damaged roof.",
    category: "Home",
    href: "/guides/replace-roof-before-selling-house",
    tags: [
      "roof replacement",
      "selling a house",
      "home improvement",
      "home selling",
      "roof repair",
    ],
    published: true,
    relatedSlugs: [
      "septic-inspection-before-selling-house",
      "replace-galvanized-plumbing-before-selling-house",
      "remove-underground-oil-tank-before-selling-house",
    ],
  },
  {
    slug: "septic-inspection-before-selling-house",
    title: "Should I Get a Septic Inspection Before Selling My House?",
    description:
      "A practical framework for deciding whether to inspect your septic system before listing, based on system history, warning signs, documentation, transaction requirements, and repair risk.",
    category: "Home",
    href: "/guides/septic-inspection-before-selling-house",
    tags: [
      "septic inspection",
      "selling a house",
      "septic system",
      "home selling",
      "home inspection",
    ],
    published: true,
    relatedSlugs: [
      "replace-roof-before-selling-house",
      "replace-galvanized-plumbing-before-selling-house",
      "remove-underground-oil-tank-before-selling-house",
    ],
  },
  {
    slug: "replace-galvanized-plumbing-before-selling-house",
    title: "Should I Replace Galvanized Plumbing Before Selling My House?",
    description:
      "A practical framework for deciding whether to repipe, repair, offer a credit, or sell a house with galvanized plumbing as-is.",
    category: "Home",
    href: "/guides/replace-galvanized-plumbing-before-selling-house",
    tags: [
      "galvanized plumbing",
      "selling a house",
      "repiping",
      "home selling",
      "plumbing",
    ],
    published: true,
    relatedSlugs: [
      "replace-roof-before-selling-house",
      "septic-inspection-before-selling-house",
      "remove-underground-oil-tank-before-selling-house",
    ],
  },
  {
    slug: "remove-underground-oil-tank-before-selling-house",
    title: "Should I Remove an Underground Oil Tank Before Selling My House?",
    description:
      "A practical framework for deciding whether to investigate, remove, document, or otherwise address an underground heating-oil tank before selling a house.",
    category: "Home",
    href: "/guides/remove-underground-oil-tank-before-selling-house",
    tags: [
      "underground oil tank",
      "selling a house",
      "heating oil",
      "home selling",
      "oil tank removal",
    ],
    published: true,
    relatedSlugs: [
      "replace-roof-before-selling-house",
      "septic-inspection-before-selling-house",
      "replace-galvanized-plumbing-before-selling-house",
    ],
  },
  {
    slug: "idle-or-turn-car-off-fuel-efficiency",
    title: "Is It More Fuel Efficient to Idle or Turn Your Car Off?",
    description:
      "A practical explanation of how much fuel idling uses, when shutting off can save fuel, and why automatic start-stop systems are different from manually cycling a conventional vehicle.",
    category: "Automotive",
    href: "/guides/idle-or-turn-car-off-fuel-efficiency",
    tags: [
      "idling",
      "fuel economy",
      "gas mileage",
      "start stop",
      "fuel efficiency",
    ],
    published: true,
    relatedSlugs: [
      "roof-rack-gas-mileage-cost",
      "engine-braking-automatic-transmission",
      "tonneau-cover-gas-savings-payback",
      "dirty-engine-air-filter-gas-mileage",
    ],
  },
  {
    slug: "roof-rack-gas-mileage-cost",
    title: "Does a Roof Rack Use Enough Extra Gas That You Should Remove It?",
    description:
      "Calculate how much an empty roof rack may cost in fuel and understand why the MPG penalty depends on speed, vehicle shape, and rack design.",
    category: "Automotive",
    href: "/guides/roof-rack-gas-mileage-cost",
    tags: [
      "roof rack",
      "gas mileage",
      "fuel economy",
      "crossbars",
      "aerodynamic drag",
    ],
    published: true,
    relatedSlugs: [
      "idle-or-turn-car-off-fuel-efficiency",
      "engine-braking-automatic-transmission",
      "tonneau-cover-gas-savings-payback",
      "dirty-engine-air-filter-gas-mileage",
    ],
  },
  {
    slug: "engine-braking-automatic-transmission",
    title: "Is Engine Braking Bad for an Automatic Transmission?",
    description:
      "Understand how engine braking works in an automatic transmission, when manufacturers expect you to use it, and which situations can create real transmission or traction concerns.",
    category: "Automotive",
    href: "/guides/engine-braking-automatic-transmission",
    tags: [
      "engine braking",
      "automatic transmission",
      "downshifting",
      "transmission wear",
      "driving",
    ],
    published: true,
    relatedSlugs: [
      "idle-or-turn-car-off-fuel-efficiency",
      "roof-rack-gas-mileage-cost",
      "tonneau-cover-gas-savings-payback",
      "dirty-engine-air-filter-gas-mileage",
    ],
  },
  {
    slug: "tonneau-cover-gas-savings-payback",
    title: "Does a Tonneau Cover Save Enough Gas to Pay for Itself?",
    description:
      "Calculate whether potential fuel savings from a tonneau cover are large enough to recover the purchase price, and understand what aerodynamic testing does and does not prove.",
    category: "Automotive",
    href: "/guides/tonneau-cover-gas-savings-payback",
    tags: [
      "tonneau cover",
      "truck bed cover",
      "gas mileage",
      "fuel economy",
      "pickup trucks",
    ],
    published: true,
    relatedSlugs: [
      "roof-rack-gas-mileage-cost",
      "idle-or-turn-car-off-fuel-efficiency",
      "engine-braking-automatic-transmission",
      "dirty-engine-air-filter-gas-mileage",
    ],
  },
  {
    slug: "dirty-engine-air-filter-gas-mileage",
    title: "Does a Dirty Engine Air Filter Really Hurt Gas Mileage?",
    description:
      "See what research found about clogged engine air filters, fuel economy, and acceleration in modern fuel-injected vehicles versus older carbureted cars.",
    category: "Automotive",
    href: "/guides/dirty-engine-air-filter-gas-mileage",
    tags: [
      "engine air filter",
      "gas mileage",
      "fuel economy",
      "car maintenance",
      "engine performance",
    ],
    published: true,
    relatedSlugs: [
      "idle-or-turn-car-off-fuel-efficiency",
      "roof-rack-gas-mileage-cost",
      "engine-braking-automatic-transmission",
      "tonneau-cover-gas-savings-payback",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slug: string, limit = 6) {
  const currentGuide = getGuideBySlug(slug);

  if (!currentGuide) {
    return [];
  }

  return currentGuide.relatedSlugs
    .map((relatedSlug) => getGuideBySlug(relatedSlug))
    .filter(
      (guide): guide is GuideSummary =>
        Boolean(guide && guide.published && guide.slug !== slug),
    )
    .slice(0, limit);
}