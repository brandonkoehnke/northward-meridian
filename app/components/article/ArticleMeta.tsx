type ArticleMetaProps = {
  updated: string;
  readingTime: string;
};

export default function ArticleMeta({
  updated,
  readingTime,
}: ArticleMetaProps) {
  return (
    <div className="mt-6 flex gap-4 text-sm text-[var(--muted)]">
      <span>Updated {updated}</span>

      <span>•</span>

      <span>{readingTime} read</span>
    </div>
  );
}