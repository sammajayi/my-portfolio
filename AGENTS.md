<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->



/app
  /page.tsx               ← main landing page
  /blog/page.tsx          ← full blog listing page
  /api/rss/route.ts       ← RSS feed fetcher (Substack/Medium)
/components
  Navbar.tsx, Hero.tsx, About.tsx
  Experience.tsx, Projects.tsx, Blog.tsx, Footer.tsx
/sanity
  /schemas → project.ts, post.ts, experience.ts
  client.ts, sanity.config.ts
/lib
  fetchPosts.ts           ← unified fn: merges Sanity + RSS posts
  fetchProjects.ts
/data
  experience.ts           ← fallback static data
  projects.ts             ← fallback static data