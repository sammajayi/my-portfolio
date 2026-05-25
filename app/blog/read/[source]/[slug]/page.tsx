import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchExternalPost, type PostSource } from "@/lib/fetchPosts";

type ExternalPostPageProps = {
  params: Promise<{
    source: PostSource;
    slug: string;
  }>;
};

const sourceLabels: Record<PostSource, string> = {
  sanity: "Sanity",
  hashnode: "Hashnode",
  devto: "Dev.to",
  substack: "Substack",
};

export const revalidate = 3600;

export async function generateMetadata({ params }: ExternalPostPageProps): Promise<Metadata> {
  const { source, slug } = await params;
  const post = await fetchExternalPost(source, decodeURIComponent(slug));

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function ExternalPostPage({ params }: ExternalPostPageProps) {
  const { source, slug } = await params;

  if (!["hashnode", "devto", "substack"].includes(source)) notFound();

  const post = await fetchExternalPost(source, decodeURIComponent(slug));
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/blog" className="text-sm font-semibold text-bright-marine hover:text-black">
            Back to blog
          </Link>
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-muted hover:text-bright-marine"
          >
            View original
          </a>
        </div>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded bg-black px-2 py-1 text-xs font-semibold text-white">
              {sourceLabels[post.source]}
            </span>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(
                new Date(post.date),
              )}
            </time>
            {post.readTime ? <span>{post.readTime}</span> : null}
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">{post.title}</h1>
          {post.excerpt ? <p className="mt-5 text-lg leading-8 text-muted">{post.excerpt}</p> : null}
        </header>

        {post.coverImage ? (
          <div
            className="mt-10 aspect-[16/9] rounded-lg bg-alabaster-grey bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage})` }}
            aria-hidden="true"
          />
        ) : null}

        <div className="mt-10 max-w-none text-base leading-8 text-black">
          {post.contentHtml ? (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <div className="rounded-lg border border-alabaster-grey bg-white p-6">
              <h2 className="text-xl font-semibold text-black">Full article not available here yet</h2>
              <p className="mt-3 text-muted">
                This source is not exposing a clean full article body to the app, so I am keeping
                this page tidy instead of showing broken imported text. Access the article{" "}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-bright-marine underline"
                >
                  here
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
