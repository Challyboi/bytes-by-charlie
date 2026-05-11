import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { format } from "date-fns";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

const TAG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-100 text-yellow-700",
  typescript: "bg-blue-100 text-blue-700",
  react: "bg-cyan-100 text-cyan-700",
  nextjs: "bg-slate-100 text-slate-700",
  css: "bg-pink-100 text-pink-700",
  html: "bg-orange-100 text-orange-700",
  nodejs: "bg-green-100 text-green-700",
  git: "bg-red-100 text-red-700",
  career: "bg-purple-100 text-purple-700",
  tools: "bg-teal-100 text-teal-700",
};

function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-100 text-indigo-700";
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostBySlug(slug);

  if (!meta) notFound();

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <div>
      {/* Post header banner */}
      <div
        className="py-16 px-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${meta.coverColor}dd, ${meta.coverColor}99)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl mx-auto relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Back to all posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {meta.title}
          </h1>
          <p className="text-white/80 text-lg mb-6">{meta.description}</p>

          <div className="flex items-center gap-5 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                C
              </span>
              Charles Agboh
            </span>
            <span>📅 {format(new Date(meta.date), "MMMM d, yyyy")}</span>
            <span>⏱ {meta.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <article>
          <Post />
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-indigo-600 font-semibold hover:underline text-sm"
          >
            ← All posts
          </Link>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
