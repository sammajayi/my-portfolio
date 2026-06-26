import Link from "next/link";
import type { UnifiedPost } from "@/lib/fetchPosts";

const sourceStyles: Record<UnifiedPost["source"], string> = {
  sanity: "bg-black text-white",
  hashnode: "bg-[#2962ff] text-white",
  devto: "bg-white text-black ring-1 ring-black/10",
  substack: "bg-[#ff6719] text-white",
  medium: "bg-[#000000] text-white ring-1 ring-white/10",
};

const sourceLabels: Record<UnifiedPost["source"], string> = {
  sanity: "Sanity",
  hashnode: "Hashnode",
  devto: "Dev.to",
  substack: "Substack",
  medium: "Medium",
};

type PostCardProps = {
  post: UnifiedPost;
  query?: string;
};

function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query?.trim()) return text;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark key={`${part}-${index}`} className="rounded bg-bright-marine/15 px-1 text-black">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function PostCard({ post, query }: PostCardProps) {
  const href = `/blog/${encodeURIComponent(post.slug)}`;
  const cardContent = (
    <>
      <div
        className="aspect-[16/9] bg-alabaster-grey bg-cover bg-center"
        style={{
          backgroundImage: post.coverImage
            ? `url(${post.coverImage})`
            : "linear-gradient(135deg, #000000 0%, #006bb8 48%, #f6f2f8 100%)",
        }}
        aria-hidden="true"
      />
      <div className="flex h-full flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className={`rounded px-2 py-1 font-semibold ${sourceStyles[post.source]}`}>
            {sourceLabels[post.source]}
          </span>
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
              new Date(post.date),
            )}
          </time>
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>

        <div>
          <h2 className="text-xl font-semibold leading-snug text-black transition group-hover:text-bright-marine">
            <Highlight text={post.title} query={query} />
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            <Highlight text={post.excerpt} query={query} />
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded border border-alabaster-grey bg-ghost-white px-2 py-1 text-xs text-black"
            >
              <Highlight text={tag} query={query} />
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="group overflow-hidden rounded-lg border border-alabaster-grey bg-white shadow-sm transition hover:-translate-y-1 hover:border-bright-marine/40 hover:shadow-xl hover:shadow-black/5">
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    </article>
  );
}
