import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts from Bytes by Charlie — tech articles and tutorials.",
};

const TAG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-100 text-yellow-700 border-yellow-200",
  typescript: "bg-blue-100 text-blue-700 border-blue-200",
  react: "bg-cyan-100 text-cyan-700 border-cyan-200",
  nextjs: "bg-slate-100 text-slate-600 border-slate-200",
  css: "bg-pink-100 text-pink-700 border-pink-200",
  nodejs: "bg-green-100 text-green-700 border-green-200",
  git: "bg-red-100 text-red-700 border-red-200",
  ai: "bg-violet-100 text-violet-700 border-violet-200",
  automation: "bg-orange-100 text-orange-700 border-orange-200",
  tools: "bg-teal-100 text-teal-700 border-teal-200",
  career: "bg-purple-100 text-purple-700 border-purple-200",
  beginners: "bg-emerald-100 text-emerald-700 border-emerald-200",
  frontend: "bg-rose-100 text-rose-700 border-rose-200",
};

function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-100 text-indigo-700 border-indigo-200";
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Header */}
      <div className="bg-slate-950 text-white px-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        <div className="max-w-6xl mx-auto relative">
          <p className="text-indigo-400 font-semibold text-sm mb-2 uppercase tracking-widest">The Blog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            All <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-slate-400 text-lg">
            {posts.length} {posts.length === 1 ? "article" : "articles"} on AI, automation, and modern web dev.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        {posts.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-6xl mb-5">📝</p>
            <p className="text-xl font-medium">No posts yet — check back soon!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="post-card group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start hover:border-indigo-100">
                  {/* Number */}
                  <div className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center font-extrabold text-lg flex-shrink-0"
                    style={{ background: `${post.coverColor}18`, color: post.coverColor }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-5 text-xs text-slate-400">
                      <span>📅 {format(new Date(post.date), "MMMM d, yyyy")}</span>
                      <span>⏱ {post.readingTime}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center self-center">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-all text-lg">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <NewsletterSignup />
    </div>
  );
}
