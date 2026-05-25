import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-bright-marine">
            Samuel Ajayi
          </p>
          <h1 className="text-5xl font-semibold leading-tight text-black sm:text-7xl">
            Building software, writing notes, and keeping the useful parts easy to find.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            A personal space for engineering projects, CMS-backed writing, and posts gathered
            from the places I publish.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-md bg-bright-marine px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[rgba(0,107,184,0.24)] transition hover:bg-black"
            >
              Read the blog
            </Link>
            <a
              href="https://github.com/sammajayi"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-alabaster-grey bg-white px-5 py-3 text-sm font-semibold text-black transition hover:border-bright-marine hover:text-bright-marine"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
