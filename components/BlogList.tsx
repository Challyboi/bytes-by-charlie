"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

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
  return (
    TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-100 text-indigo-700 border-indigo-200"
  );
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const seen = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => seen.add(t)));
    return Array.from(seen).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posts.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = !activeTag || p.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [posts, search, activeTag]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
            !activeTag
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
          }`}
        >
          All ({posts.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
              activeTag === tag
                ? "bg-indigo-600 text-white border-indigo-600"
                : `${tagColor(tag)} hover:opacity-80`
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      {(search || activeTag) && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          {filtered.length === 0
            ? "No posts match your search."
            : `Showing ${filtered.length} of ${posts.length} posts`}
        </p>
      )}

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <p className="text-5xl mb-5">🔍</p>
          <p className="text-xl font-medium">Nothing found - try a different search.</p>
          <button
            onClick={() => { setSearch(""); setActiveTag(null); }}
            className="mt-4 text-indigo-600 text-sm font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="post-card group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start hover:border-indigo-100 dark:hover:border-indigo-700">
                {/* Number */}
                <div
                  className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center font-extrabold text-lg flex-shrink-0"
                  style={{
                    background: `${post.coverColor}18`,
                    color: post.coverColor,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-5 text-xs text-slate-400 dark:text-slate-500">
                    <span>📅 {format(new Date(post.date), "MMMM d, yyyy")}</span>
                    <span>⏱ {post.readingTime}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center self-center">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40 text-slate-400 group-hover:text-indigo-600 transition-all text-lg">
                    →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
