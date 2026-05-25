"use client";

import { useEffect, useMemo, useState } from "react";
import type { UnifiedPost } from "@/lib/fetchPosts";
import FilterBar from "@/components/FilterBar";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

type BlogFeedProps = {
  posts: UnifiedPost[];
};

export default function BlogFeed({ posts }: BlogFeedProps) {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

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
