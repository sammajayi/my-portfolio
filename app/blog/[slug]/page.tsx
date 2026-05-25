import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { fetchSanityPostBySlug } from "@/lib/fetchPosts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchSanityPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function SanityPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchSanityPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8">
        <Link href="/blog" className="text-sm font-semibold text-bright-marine hover:text-black">
          Back to blog
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded bg-black px-2 py-1 text-xs font-semibold text-white">Sanity</span>
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

        <div className="prose prose-neutral mt-10 max-w-none">
          {post.body?.length ? (
            <PortableText value={post.body} />
          ) : (
            <p>
              This sample post is rendering from the local fallback. Add Sanity environment values
              and publish a native post to replace it with CMS content.
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
