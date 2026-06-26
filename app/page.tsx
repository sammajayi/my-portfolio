import { GithubIcon } from "hugeicons-react";
import TypewriterEffect from "@/app/components/TypewriterEffect";
import { projects } from "@/app/data/project";

export default function Home() {
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
            I am a Frontend and Smart Contract developer using Solidity,
            JavaScript, and currently learning Anchor (Rust).
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
            <a
              href="/blog"
              className="text-bright-marine hover:underline"
            >
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
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col justify-between rounded-xl border border-alabaster-grey bg-white p-5 transition-all hover:border-bright-marine/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-black">
                    {project.name}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-bright-marine transition-colors shrink-0"
                    aria-label={`${project.name} on GitHub`}
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2 py-0.5 text-xs font-medium border border-alabaster-grey text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
