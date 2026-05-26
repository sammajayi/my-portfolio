# Blog Publishing Guide

## Current Setup

This project reads Sanity posts from the `post` document type in `sanity/schemas/post.ts`.
All posts (Sanity and external) open at `/blog/[slug]`.

The current project has the Sanity read client and schema, and it now includes a minimal local Sanity Studio scaffold in `sanity/`.

Use the local Studio by installing dependencies and starting it from the `sanity` folder:

```bash
cd sanity
npm install
npm run dev
```

Then open the Studio at `http://localhost:3333`.

If you prefer the root shortcut:

```bash
npm run studio
```

## Environment Variables

Set these in `.env` or `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
```

Use a real dataset name. If `NEXT_PUBLIC_SANITY_DATASET` is empty, this app falls back to `production`.

## Create a Sanity Post

1. Open your Sanity Studio.
2. Create a new document of type `Post`.
3. Fill these fields:
   - `title`: the post title.
   - `slug`: click generate from title.
   - `excerpt`: short summary shown on the blog card and SEO description.
   - `body`: the full article content.
   - `coverImage`: optional card and Open Graph image.
   - `tags`: use tags like `Web3`, `Tech`, `Personal`, `Next.js`, or `Sanity`.
   - `publishedAt`: set the publish date.
   - `seo.title` and `seo.description`: optional overrides for the post page metadata.
4. Publish the document.
5. Restart or refresh the app. The blog route revalidates every hour, so production may take up to 3600 seconds unless you add manual revalidation later.

## What Happens After Publishing

Published Sanity posts appear in `/blog` with the source badge `Sanity`.
Clicking the card opens the full in-app page at:

```text
/blog/your-post-slug
```

External posts from Hashnode, Dev.to, and Substack are aggregated into the same feed.
They open at the same `/blog/[slug]` pattern, with slugs generated from the post title.
Each external reader page includes a `View original` link for attribution and fallback.

## Important Limitation

Sanity posts are first-class content because the app owns the full Portable Text body.
External posts depend on each platform exposing full content. Dev.to usually provides full HTML through its API. Substack depends on RSS settings. Hashnode profile fallback currently provides excerpts because the public article pages can be blocked by Cloudflare from server-side fetches.
