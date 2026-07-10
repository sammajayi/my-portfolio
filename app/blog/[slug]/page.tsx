import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { fetchPostBySlug } from "@/lib/fetchPosts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const sourceLabels: Record<string, string> = {
  sanity: "Sanity",
  hashnode: "Hashnode",
  devto: "Dev.to",
  substack: "Substack",
  medium: "Medium",
};

const sourceStyles: Record<string, string> = {
  sanity: "bg-black text-white",
  hashnode: "bg-[#2962ff] text-white",
  devto: "bg-white text-black ring-1 ring-black/10",
  substack: "bg-[#ff6719] text-white",
  medium: "bg-black text-white",
};

export const revalidate = 60;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const url = `https://sammajayi.xyz/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: "https://sammajayi.xyz/images/my-logo-2.png",
              width: 512,
              height: 512,
              alt: "Samuel Ajayi",
            },
          ],
      publishedTime: post.date,
      authors: ["Samuel Ajayi"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage
        ? [post.coverImage]
        : ["https://sammajayi.xyz/images/my-logo-2.png"],
      creator: "@sammajayi",
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) notFound();

  const isExternal = post.source !== "sanity";
  const url = `https://sammajayi.xyz/blog/${slug}`;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : ["https://sammajayi.xyz/images/my-logo-2.png"],
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: "Samuel Ajayi",
      url: "https://sammajayi.xyz",
    },
    publisher: {
      "@type": "Person",
      name: "Samuel Ajayi",
      url: "https://sammajayi.xyz",
    },
  };

  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/blog" className="text-sm font-semibold text-bright-marine hover:text-black">
            Back to blog
          </Link>
          {isExternal ? (
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-muted hover:text-bright-marine"
            >
              View original
            </a>
          ) : null}
        </div>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className={`rounded px-2 py-1 text-xs font-semibold ${sourceStyles[post.source]}`}>
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-10 w-full rounded-lg bg-alabaster-grey"
          />
        ) : null}

        {post.body?.length ? (
          <div className="prose prose-neutral mt-10 max-w-none">
            <PortableText value={post.body} />
          </div>
        ) : post.contentHtml ? (
          <div
            className="article-content mt-10 max-w-none text-base leading-8 text-black"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : isExternal ? (
          <div className="mt-10 rounded-lg border border-alabaster-grey bg-white p-6">
            <h2 className="text-xl font-semibold text-black">Full article not available here yet</h2>
            <p className="mt-3 text-muted">
              This source is not exposing a clean full article body to the app. Access the article{" "}
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
        ) : (
          <div className="prose prose-neutral mt-10 max-w-none">
            <p>
              This sample post is rendering from the local fallback. Add Sanity environment values
              and publish a native post to replace it with CMS content.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
