import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts from Bytes by Charlie — tech articles and tutorials.",
};

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
          All <span className="gradient-text">Posts</span>
        </h1>
        <p className="text-slate-500 text-lg">
          {posts.length} {posts.length === 1 ? "article" : "articles"} — and
          counting 🚀
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <p className="text-6xl mb-5">📝</p>
          <p className="text-xl font-medium">No posts yet — check back soon!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="post-card group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start">
                {/* Color dot */}
                <div
                  className="w-1.5 self-stretch rounded-full flex-shrink-0 hidden md:block"
                  style={{ background: post.coverColor }}
                />

                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>📅 {format(new Date(post.date), "MMMM d, yyyy")}</span>
                    <span>⏱ {post.readingTime}</span>
                  </div>
                </div>

                <span className="text-indigo-400 group-hover:text-indigo-600 text-2xl transition-colors self-center flex-shrink-0">
                  →
                </span>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
