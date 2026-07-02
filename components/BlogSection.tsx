"use client";

import Link from "next/link";
import type { UnifiedPost } from "@/lib/fetchPosts";
import BlurFade from "@/components/BlurFade";
import { ArrowRight02Icon } from "hugeicons-react";

const sourceStyles: Record<string, string> = {
  sanity: "bg-black text-white",
  hashnode: "bg-[#2962ff] text-white",
  devto: "bg-white text-black ring-1 ring-black/10",
  substack: "bg-[#ff6719] text-white",
  medium: "bg-[#000000] text-white ring-1 ring-white/10",
};

const sourceLabels: Record<string, string> = {
  sanity: "Sanity",
  hashnode: "Hashnode",
  devto: "Dev.to",
  substack: "Substack",
  medium: "Medium",
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogSection({ posts }: { posts: UnifiedPost[] }) {
  const recentPosts = posts.slice(0, 4);
  if (!recentPosts.length) return null;

  return (
    <section id="blog" className="scroll-mt-24">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
            Blog
          </div>
          <p className="text-muted text-sm max-w-md">
            My thoughts on everything.
          </p>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-y-2 border-t border-alabaster-grey pt-4">
        {recentPosts.map((post, id) => (
          <BlurFade key={`${post.source}-${post.id}`} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <Link
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="group flex items-center justify-between rounded-lg border border-alabaster-grey bg-white p-4 transition-all hover:border-bright-marine/40 hover:bg-surface-soft"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className={`rounded px-1.5 py-0.5 font-semibold text-[10px] ${sourceStyles[post.source]}`}>
                    {sourceLabels[post.source]}
                  </span>
                  <time dateTime={post.date}>
                    {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.date))}
                  </time>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-bright-marine transition-colors truncate">
                  {post.title}
                </h3>
              </div>
              <ArrowRight02Icon size={16} className="shrink-0 text-muted group-hover:text-bright-marine transition-all group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={BLUR_FADE_DELAY * 12}>
        <div className="flex justify-center mt-6">
          <Link href="/blog" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/80">
            View All Posts
            <ArrowRight02Icon size={14} className="transform -rotate-45" />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
