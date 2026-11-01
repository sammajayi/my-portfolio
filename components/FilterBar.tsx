"use client";

type FilterBarProps = {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
  onClear: () => void;
};

export default function FilterBar({
  tags,
  selectedTag,
  onTagChange,
  onClear,
}: FilterBarProps) {
  const hasFilters = Boolean(selectedTag);

  return (
    <div className="space-y-4">
      {tags.length ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onTagChange("")}
            aria-pressed={!selectedTag}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              selectedTag
                ? "border border-alabaster-grey bg-white text-black hover:border-bright-marine hover:text-bright-marine"
                : "bg-bright-marine text-white"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagChange(selectedTag === tag ? "" : tag)}
              aria-pressed={selectedTag === tag}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                selectedTag === tag
                  ? "bg-bright-marine text-white"
                  : "border border-alabaster-grey bg-white text-black hover:border-bright-marine hover:text-bright-marine"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      {hasFilters ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Active:</span>
          <button
            type="button"
            onClick={() => onTagChange("")}
            aria-label={`Remove filter ${selectedTag}`}
            className="rounded bg-black px-2 py-1 text-xs font-semibold text-white transition-colors hover:bg-bright-marine"
          >
            {selectedTag} ×
          </button>
          <button type="button" onClick={onClear} className="rounded text-xs font-semibold text-bright-marine transition-colors hover:underline">
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
