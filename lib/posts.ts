import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  coverColor: string;
  coverImage: string;
}

/* ── Cover image selection ─────────────────────────────────────────
   Priority: 1) frontmatter `coverImage`  2) tag-based pick  3) slug-seeded default
*/
const TAG_IMAGES: Record<string, string> = {
  ai:
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  automation:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  javascript:
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80",
  typescript:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  nextjs:
    "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&q=80",
  git:
    "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80",
  tools:
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
  career:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  beginners:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
  n8n:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  css:
    "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80",
  nodejs:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  frontend:
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
  "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600&q=80",
];

function resolveCoverImage(
  tags: string[],
  slug: string,
  frontmatterImage?: string
): string {
  if (frontmatterImage) return frontmatterImage;
  for (const tag of tags) {
    const key = tag.toLowerCase();
    if (TAG_IMAGES[key]) return TAG_IMAGES[key];
  }
  // Deterministic fallback — same image every build for the same slug
  const idx =
    slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    DEFAULT_IMAGES.length;
  return DEFAULT_IMAGES[idx];
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);
      const tags: string[] = data.tags || [];

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        description: data.description || "",
        tags,
        readingTime: stats.text,
        coverColor: data.coverColor || "#6366f1",
        coverImage: resolveCoverImage(tags, slug, data.coverImage),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): PostMeta | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    const tags: string[] = data.tags || [];

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags,
      readingTime: stats.text,
      coverColor: data.coverColor || "#6366f1",
      coverImage: resolveCoverImage(tags, slug, data.coverImage),
    };
  } catch {
    return null;
  }
}
