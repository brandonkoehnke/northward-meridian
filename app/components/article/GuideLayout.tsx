import type { ReactNode } from "react";

import ArticleHero from "./ArticleHero";
import DecisionSnapshot from "./DecisionSnapshot";
import GuideTableOfContents, {
  type GuideNavigationItem,
} from "./GuideTableOfContents";

type GuideLayoutProps = {
  category: string;
  title: string;
  description: string;
  updated: string;
  readingTime: string;
  recommendedFor: string;
  bottomLine: string;
  sections?: readonly GuideNavigationItem[];
  structuredData?: Record<string, unknown>;
  children: ReactNode;
};

export default function GuideLayout({
  category,
  title,
  description,
  updated,
  readingTime,
  recommendedFor,
  bottomLine,
  sections = [],
  structuredData,
  children,
}: GuideLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}

      <ArticleHero
        category={category}
        title={title}
        description={description}
        updated={updated}
        readingTime={readingTime}
      />

      <DecisionSnapshot
        recommendedFor={recommendedFor}
        readingTime={readingTime}
        updated={updated}
        bottomLine={bottomLine}
      />

      {sections.length ? (
        <GuideTableOfContents items={sections} variant="mobile" />
      ) : null}

      <div
        className={
          sections.length
            ? "mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start xl:gap-10 xl:px-6"
            : undefined
        }
      >
        <article className="min-w-0">{children}</article>

        {sections.length ? (
          <div className="pr-2 pt-16 xl:self-stretch">
            <GuideTableOfContents items={sections} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
