"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { UnifiedPost } from "@/lib/fetchPosts";
import FilterBar from "@/components/FilterBar";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

type BlogFeedProps = {
  posts: UnifiedPost[];
};

export default function BlogFeed({ posts }: BlogFeedProps) {
  const params = useSearchParams();
  const [searchInput, setSearchInput] = useState(params.get("q") ?? "");
  const [query, setQuery] = useState((params.get("q") ?? "").trim());
  const [selectedTag, setSelectedTag] = useState(params.get("tag") ?? "");

  // Keep filters in the URL so views can be shared and survive back/forward.
  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (selectedTag) next.set("tag", selectedTag);
    const qs = next.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    if (url !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, "", url);
    }
  }, [query, selectedTag]);

  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(searchInput.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b)).slice(0, 24),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return posts.filter((post) => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesTag && matchesQuery;
    });
  }, [posts, query, selectedTag]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8">
      <div className="rounded-lg border border-alabaster-grey bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
          <SearchBar value={searchInput} onChange={setSearchInput} />
          <FilterBar
            tags={tags}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            onClear={() => {
              setSelectedTag("");
              setSearchInput("");
              setQuery("");
            }}
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={`${post.source}-${post.id}`} post={post} query={query} />
        ))}
      </div>

      {!filteredPosts.length ? (
        <div className="mt-10 rounded-lg border border-dashed border-alabaster-grey bg-white px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-black">No results found</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            Try a different keyword or tag.
          </p>
        </div>
      ) : null}
    </section>
  );
}
