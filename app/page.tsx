import TypewriterEffect from "@/app/components/TypewriterEffect";
import { projects } from "@/app/data/project";
import { ProjectList } from "@/components/ProjectCard";
import BlogSection from "@/components/BlogSection";
import WinsSection from "@/components/WinsSection";
import { CommandPalette } from "@/components/CommandPalette";
import { fetchPosts } from "@/lib/fetchPosts";

export const revalidate = 60;

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 pb-36 sm:px-8 space-y-24">
      {/* Hero */}
      <section id="hero" className="pt-12 sm:pt-20">
        <p className="text-3xl font-bold text-muted mb-2">
          hey, I&apos;m Samuel.
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl mb-6">
          <TypewriterEffect />
        </h1>
        <div className="space-y-4 text-base leading-7 text-muted max-w-lg mt-6">
          <p>
            I am a software engineer using Solidity, JavaScript, and currently
            learning Anchor (Rust).
          </p>
          <p>
            My area of focus is in DeFi, Privacy, and the broader Web3
            ecosystem that promotes the world of possibilities and no barriers.
            I have shipped dApps and won bounties at ETHGlobal, Midnight,
            Rootstock, and Stellar.
          </p>
          <p>
            In my previous engagement, I have led Growth and marketing
            initiatives, and I bring that lens to everything I build. I have
            written and published a technical article on the Rootstock blog and
            am currently working on how to break technical stuff into smaller
            bits with my{" "}
            <a href="/blog" className="text-bright-marine hover:underline">
              blog
            </a>
            .
          </p>
          <p>Overall, I am actively learning to stay updated in this Agentic world.</p>
          <p>See you around</p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
          Projects
        </p>
        <ProjectList projects={projects} />
      </section>

      {/* Blog */}
      <BlogSection posts={posts} />

      {/* Wins */}
      <WinsSection />

      {/* Command Palette Hint */}
      <section className="flex justify-center pt-4">
        <CommandPalette />
      </section>
    </div>
  );
}
