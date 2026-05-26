import Link from "next/link";
import { GithubIcon } from "hugeicons-react";
import ContactForm from "@/app/components/ContactForm";
import { projects } from "@/app/data/project";

export default function Home() {

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 space-y-28">
      {/* 1. Hero Section */}
      <section id="hero" className="py-12 sm:py-20 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bright-marine mb-4">
          Samuel Ajayi
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
          Blockchain Developer / Web3 Builder / Product Manager
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          I design, engineer, and ship decentralized applications and robust products that solve real-world problems. Confident, lightweight development focused on excellent execution and user experience.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded bg-bright-marine px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="rounded border border-alabaster-grey bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:border-bright-marine hover:text-bright-marine"
          >
            Contact
          </a>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="scroll-mt-24 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-black mb-6">About</h2>
        <div className="space-y-4 text-base leading-7 text-muted">
          <p>
            I am a self-taught developer and final-year Political Science student at the University of Ibadan, based in Lagos, Nigeria. Bridging the gap between code, politics, and product management, I design products with a unique perspective on user behavior and systems architecture.
          </p>
          <p>
            My core expertise lies in blockchain and Web3 development, product management, growth hacking, and digital marketing. I am passionate about constructing decentralized solutions that empower local and global communities alike.
          </p>
          <p>
            Through my journey, I have completed the Blockchain Developer program from Rootstock and volunteered at Devconnect in Buenos Aires, Argentina, interacting with global builders and staying on the cutting edge of protocols.
          </p>
        </div>
      </section>

      {/* 3. Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-black mb-6">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col justify-between rounded-lg border border-alabaster-grey bg-white p-6 transition-all hover:border-bright-marine"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-black">{project.name}</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-bright-marine transition-colors"
                    aria-label={`${project.name} GitHub Repository`}
                  >
                    <GithubIcon size={20} />
                  </a>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.tags && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        idx % 2 === 0
                          ? "bg-ghost-white text-muted"
                          : "bg-bright-marine text-white"
                      }`}
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

      {/* 4. Contact Section */}
      <section id="contact" className="scroll-mt-24 max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight text-black mb-6">Contact</h2>
        <p className="text-base text-muted mb-6">
          Have an idea or project you want to build? Feel free to reach out. You can also find me on{" "}
          <a
            href="https://github.com/sammajayi"
            target="_blank"
            rel="noreferrer"
            className="text-bright-marine hover:underline font-medium"
          >
            GitHub
          </a>
          .
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
