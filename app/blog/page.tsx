import type { Metadata } from "next";
import Link from "next/link";
import BlogFeed from "@/components/BlogFeed";
import { fetchPosts } from "@/lib/fetchPosts";

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog about personal notes, software, decentralised systems, leadership, and more",
  openGraph: {
    title: "Blog | Samuel Ajayi",
    description: "A blog about personal notes, software, decentralised systems, leadership, and more",
    url: "https://sammajayi.xyz/blog",
    type: "website",
    images: [
      {
        url: "https://sammajayi.xyz/images/my-logo-2.png",
        width: 512,
        height: 512,
        alt: "Samuel Ajayi Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Samuel Ajayi",
    description: "A blog about personal notes, software, decentralised systems, leadership, and more",
    images: ["https://sammajayi.xyz/images/my-logo-2.png"],
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <header className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-8 sm:pt-16">
        <nav className="mb-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-black hover:text-bright-marine">
            Samuel Ajayi
          </Link>
          <a
            href="https://github.com/sammajayi"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-muted hover:text-bright-marine"
          >
            GitHub
          </a>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bright-marine">Blog</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight sm:text-7xl">
          Notes from ME.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Welcome to my blog, a unified feed of my posts from different platforms. Here, I share insights, tutorials, and stories about software development, engineering, and the tech industry. Whether you&apos;re a fellow developer or just curious about the world of coding, there&apos;s something here for everyone. Dive in and explore my latest thoughts and projects!
        </p>
      </header>
      <BlogFeed posts={posts} />
    </main>
  );
}
