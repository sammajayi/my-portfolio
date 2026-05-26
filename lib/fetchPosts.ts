import Parser from "rss-parser";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "@/sanity/client";

export type PostSource = "sanity" | "hashnode" | "devto" | "substack";

export type UnifiedPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  url: string;
  source: PostSource;
  tags: string[];
  coverImage?: string;
  readTime?: string;
  contentHtml?: string;
  body?: PortableTextBlock[];
  seo?: {
    title?: string;
    description?: string;
  };
};

type HashnodeNode = {
  id?: string;
  title?: string;
  brief?: string;
  slug?: string;
  url?: string;
  publishedAt?: string;
  readTimeInMinutes?: number;
  coverImage?: { url?: string };
  tags?: Array<{ name?: string }>;
};

type HashnodeProfilePost = {
  postId?: string;
  slug?: string;
  title?: string;
  brief?: string;
  publishedAt?: string;
  readTimeInMinutes?: number;
  coverImage?: { url?: string };
  blogUrl?: string;
};

type DevToPost = {
  id?: string | number;
  title?: string;
  description?: string;
  published_at?: string;
  slug?: string;
  url?: string;
  tag_list?: string[];
  cover_image?: string;
  social_image?: string;
  reading_time_minutes?: number;
  body_html?: string;
};

const REVALIDATE_SECONDS = 3600;
const preferredTags = ["Web3", "Tech", "Personal", "Next.js", "Sanity", "Writing"];

const fallbackPosts: UnifiedPost[] = [
  {
    id: "sample-native-post",
    title: "Designing a Better Personal Knowledge Feed",
    excerpt:
      "A short sample Sanity-style post so the blog renders while CMS and platform credentials are being added.",
    date: "2026-05-24",
    slug: "sample-native-post",
    url: "/blog/sample-native-post",
    source: "sanity",
    tags: ["Next.js", "Sanity", "Writing"],
    readTime: "4 min read",
  },
  {
    id: "sample-external-post",
    title: "Aggregating Developer Posts Across Platforms",
    excerpt:
      "A placeholder external card showing how Hashnode, Dev.to, and RSS posts appear in the unified feed.",
    date: "2026-05-23",
    slug: "sample-external-post",
    url: "https://dev.to",
    source: "devto",
    tags: ["Dev.to", "Aggregation"],
    readTime: "3 min read",
  },
];

const sanityPostQuery = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
  "id": _id,
  title,
  excerpt,
  "date": coalesce(publishedAt, _createdAt),
  "slug": slug.current,
  "url": "/blog/" + slug.current,
  "source": "sanity",
  tags,
  "coverImage": coverImage.asset->url,
  "readTime": select(
    length(pt::text(body)) > 0 => string::split(string(round(length(pt::text(body)) / 1000)), ".")[0] + " min read",
    "1 min read"
  ),
  body,
  seo
}`;

const sanityPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  "id": _id,
  title,
  excerpt,
  "date": coalesce(publishedAt, _createdAt),
  "slug": slug.current,
  "url": "/blog/" + slug.current,
  "source": "sanity",
  tags,
  "coverImage": coverImage.asset->url,
  "readTime": select(
    length(pt::text(body)) > 0 => string::split(string(round(length(pt::text(body)) / 1000)), ".")[0] + " min read",
    "1 min read"
  ),
  body,
  seo
}`;

function cleanText(value: unknown): string {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeHtml(value: unknown): string {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function normalizeDate(value: unknown): string {
  const date = value ? new Date(String(value)) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function normalizeTags(tags: Array<string | undefined>, postText = ""): string[] {
  const normalized = new Set<string>();
  const text = postText.toLowerCase();

  for (const tag of tags) {
    const cleanTag = cleanText(tag);
    if (!cleanTag) continue;

    const lower = cleanTag.toLowerCase();
    if (["web3", "blockchain", "crypto", "rootstock", "bitcoin", "ethereum", "dapp", "wallet"].includes(lower)) {
      normalized.add("Web3");
    } else if (["tech", "technology", "javascript", "typescript", "nextjs", "next.js", "react", "software"].includes(lower)) {
      normalized.add("Tech");
    } else if (["personal", "life", "career", "reflection"].includes(lower)) {
      normalized.add("Personal");
    } else {
      normalized.add(cleanTag);
    }
  }

  if (/\b(web3|blockchain|crypto|rootstock|bitcoin|ethereum|dapp|wallet|privy)\b/.test(text)) {
    normalized.add("Web3");
  }

  if (/\b(tech|software|javascript|typescript|next\.?js|react|web app|website|engineering)\b/.test(text)) {
    normalized.add("Tech");
  }

  if (/\b(personal|career|reflection|story|journey)\b/.test(text)) {
    normalized.add("Personal");
  }

  return Array.from(normalized).sort((a, b) => {
    const aIndex = preferredTags.indexOf(a);
    const bIndex = preferredTags.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? preferredTags.length : aIndex) - (bIndex === -1 ? preferredTags.length : bIndex);
    }
    return a.localeCompare(b);
  });
}

function normalizeHashnodeHost(value: string): string {
  return value
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "post";
}

function mapHashnodeNode(node: HashnodeNode): UnifiedPost {
  const postText = `${node.title || ""} ${node.brief || ""} ${node.url || ""}`;
  const title = cleanText(node.title);
  const slug = slugify(title) || String(node.slug || node.id);

  return {
    id: String(node.id),
    title,
    excerpt: cleanText(node.brief),
    date: normalizeDate(node.publishedAt),
    slug,
    url: String(node.url),
    source: "hashnode",
    tags: normalizeTags(
      (node.tags || []).map((tag) => tag.name),
      postText,
    ),
    coverImage: node.coverImage?.url,
    readTime: node.readTimeInMinutes ? `${node.readTimeInMinutes} min read` : undefined,
  };
}

function mapHashnodeProfilePost(post: HashnodeProfilePost): UnifiedPost {
  const postText = `${post.title || ""} ${post.brief || ""} ${post.blogUrl || ""}`;
  const title = cleanText(post.title);
  const slug = slugify(title) || String(post.slug || post.postId);

  return {
    id: String(post.postId || post.blogUrl || post.slug),
    title,
    excerpt: cleanText(post.brief),
    date: normalizeDate(String(post.publishedAt || "").replace(/^\$D/, "")),
    slug,
    url: String(post.blogUrl),
    source: "hashnode",
    tags: normalizeTags(["Hashnode"], postText),
    coverImage: post.coverImage?.url,
    readTime: post.readTimeInMinutes ? `${post.readTimeInMinutes} min read` : undefined,
  };
}

async function fetchSanityPosts(): Promise<UnifiedPost[]> {
  if (!sanityClient) return [];

  try {
    const posts = await sanityClient.fetch<UnifiedPost[]>(
      sanityPostQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return posts.map((post) => ({
      ...post,
      date: normalizeDate(post.date),
      tags: normalizeTags(post.tags || [], `${post.title} ${post.excerpt}`),
    }));
  } catch (error) {
    console.warn("Failed to fetch Sanity posts", error);
    return [];
  }
}

export async function fetchSanityPostBySlug(slug: string): Promise<UnifiedPost | null> {
  if (slug === "sample-native-post") return fallbackPosts[0];
  if (!sanityClient) return null;

  try {
    const post = await sanityClient.fetch<UnifiedPost | null>(
      sanityPostBySlugQuery,
      { slug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    );

    return post
      ? {
          ...post,
          date: normalizeDate(post.date),
          tags: normalizeTags(post.tags || [], `${post.title} ${post.excerpt}`),
        }
      : null;
  } catch (error) {
    console.warn("Failed to fetch Sanity post", error);
    return null;
  }
}

async function fetchHashnodePosts(): Promise<UnifiedPost[]> {
  const username = process.env.HASHNODE_USERNAME;
  const publicationHost = process.env.HASHNODE_PUBLICATION_HOST;
  if (!username && !publicationHost) return [];

  try {
    const sourceHost = publicationHost || username || "";
    const normalizedHost = normalizeHashnodeHost(sourceHost);
    const host =
      publicationHost || normalizedHost.includes(".")
        ? normalizedHost
        : `${normalizedHost}.hashnode.dev`;
    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
      body: JSON.stringify({
        query: `query Publication($host: String!) {
          publication(host: $host) {
            posts(first: 20) {
              edges {
                node {
                  id
                  title
                  brief
                  slug
                  url
                  publishedAt
                  readTimeInMinutes
                  coverImage { url }
                  tags { name }
                }
              }
            }
          }
        }`,
        variables: { host },
      }),
    });

    if (!response.ok) return username ? fetchHashnodeProfilePosts(username) : [];
    const responseText = await response.text();
    if (responseText.trim().startsWith("<")) {
      return username ? fetchHashnodeProfilePosts(username) : [];
    }

    const payload = JSON.parse(responseText);
    const edges = payload?.data?.publication?.posts?.edges || [];

    return edges.map(({ node }: { node: HashnodeNode }) => mapHashnodeNode(node));
  } catch (error) {
    console.warn("Failed to fetch Hashnode posts", error);
    return username ? fetchHashnodeProfilePosts(username) : [];
  }
}

async function fetchHashnodeProfilePosts(username: string): Promise<UnifiedPost[]> {
  try {
    const handle = username.replace(/^@/, "");
    const response = await fetch(`https://hashnode.com/@${encodeURIComponent(handle)}`, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const startMarker = 'initialPosts\\":';
    const start = html.indexOf(startMarker);
    if (start === -1) return [];

    const dataStart = start + startMarker.length;
    const dataEnd = html.indexOf(',\\"initialHasMore', dataStart);
    if (dataEnd === -1) return [];

    const rawPosts = html
      .slice(dataStart, dataEnd)
      .replace(/\\"/g, '"')
      .replace(/"\$D/g, '"');
    const posts = JSON.parse(rawPosts) as HashnodeProfilePost[];

    return posts.map(mapHashnodeProfilePost).filter((post) => post.title && post.url);
  } catch (error) {
    console.warn("Failed to fetch Hashnode profile posts", error);
    return [];
  }
}

async function fetchDevToPosts(): Promise<UnifiedPost[]> {
  const username = process.env.DEVTO_USERNAME;
  if (!username) return [];

  try {
    const response = await fetch(`https://dev.to/api/articles?username=${encodeURIComponent(username)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return [];
    const posts = await response.json();

    return posts.map((post: DevToPost) => {
      const title = cleanText(post.title);
      const slug = slugify(title) || String(post.slug || post.id);

      return {
        id: String(post.id),
        title,
        excerpt: cleanText(post.description),
        date: normalizeDate(post.published_at),
        slug,
        url: String(post.url),
        source: "devto" as const,
        tags: normalizeTags(Array.isArray(post.tag_list) ? post.tag_list : [], `${post.title || ""} ${post.description || ""}`),
        coverImage: post.cover_image || post.social_image,
        readTime: post.reading_time_minutes ? `${post.reading_time_minutes} min read` : undefined,
        contentHtml: sanitizeHtml(post.body_html),
      };
    });
  } catch (error) {
    console.warn("Failed to fetch Dev.to posts", error);
    return [];
  }
}

async function fetchSubstackPosts(): Promise<UnifiedPost[]> {
  const substackUrl = process.env.SUBSTACK_URL;
  if (!substackUrl || process.env.ENABLE_SUBSTACK !== "true") return [];

  try {
    const feedUrl = substackUrl.endsWith("/feed") ? substackUrl : `${substackUrl.replace(/\/$/, "")}/feed`;
    const response = await fetch(feedUrl, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return [];

    const parser = new Parser();
    const feed = await parser.parseString(await response.text());

    return feed.items.map((item) => {
      const title = cleanText(item.title);
      const slug = slugify(title) || String(item.guid || item.link || item.title);

      return {
        id: String(item.guid || item.link || item.title),
        title,
        excerpt: cleanText(item.contentSnippet || item.content).slice(0, 220),
        date: normalizeDate(item.isoDate || item.pubDate),
        slug,
        url: String(item.link),
        source: "substack" as const,
        tags: normalizeTags(item.categories || [], `${item.title || ""} ${item.contentSnippet || item.content || ""}`),
        contentHtml: sanitizeHtml(item.content),
      };
    });
  } catch (error) {
    console.warn("Failed to fetch Substack posts", error);
    return [];
  }
}

export async function fetchPosts(): Promise<UnifiedPost[]> {
  const sources = await Promise.all([
    fetchSanityPosts(),
    fetchHashnodePosts(),
    fetchDevToPosts(),
    fetchSubstackPosts(),
  ]);

  const posts = sources
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const seenSlugs = new Map<string, number>();
  for (const post of posts) {
    if (seenSlugs.has(post.slug)) {
      const count = seenSlugs.get(post.slug)! + 1;
      seenSlugs.set(post.slug, count);
      post.slug = `${post.slug}-${count}`;
    } else {
      seenSlugs.set(post.slug, 1);
    }
  }

  return posts.length ? posts : fallbackPosts;
}

export async function fetchPostBySlug(slug: string): Promise<UnifiedPost | null> {
  if (slug === "sample-native-post") return fallbackPosts[0];
  if (slug === "sample-external-post") return fallbackPosts[1];

  const sanityPost = await fetchSanityPostBySlug(slug);
  if (sanityPost) return sanityPost;

  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  if (post.source === "devto" && process.env.DEVTO_USERNAME) {
    try {
      const response = await fetch(
        `https://dev.to/api/articles/${post.id}`,
        { next: { revalidate: REVALIDATE_SECONDS } },
      );

      if (response.ok) {
        const article = (await response.json()) as DevToPost;
        return {
          ...post,
          contentHtml: sanitizeHtml(article.body_html),
        };
      }
    } catch (error) {
      console.warn("Failed to fetch Dev.to article body", error);
    }
  }

  return post;
}
