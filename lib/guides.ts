import type { Guide } from "./guide";

export type GuideSummary = Pick<
  Guide,
  "title" | "category" | "description" | "tags"
> & {
  href: string;
  published: boolean;
};

export const guides: GuideSummary[] = [
  {
    title:
      "How to Evaluate Whether a Premium Credit Card Is Worth the Annual Fee",
    description:
      "A practical framework for deciding whether to keep, downgrade, or cancel a premium credit card.",
    category: "Personal Finance",
    href: "/guides/premium-credit-card-annual-fee",
    tags: ["credit cards", "annual fees", "travel rewards"],
    published: true,
  },
  {
    title: "How to Assess an AI Business Idea Before Building It",
    description:
      "A decision framework for evaluating demand, differentiation, and monetization before investing heavily.",
    category: "Business",
    href: "/guides/evaluate-ai-business-idea",
    tags: ["AI", "business", "validation"],
    published: false,
  },
  {
    title: "How to Start a Small Content Website Without Overbuilding",
    description:
      "The essential decisions, tools, and launch steps for a lean publishing business.",
    category: "Technology",
    href: "/guides/start-small-content-website",
    tags: ["publishing", "websites", "content"],
    published: false,
  },
];