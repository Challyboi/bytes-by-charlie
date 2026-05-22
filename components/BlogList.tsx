"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

const TAG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-50 text-yellow-700 border-yellow-200",
  typescript: "bg-blue-50 text-blue-700 border-blue-200",
  react: "bg-cyan-50 text-cyan-700 border-cyan-200",
  nextjs: "bg-slate-100 text-slate-600 border-slate-200",
  css: "bg-pink-50 text-pink-700 border-pink-200",
  nodejs: "bg-green-50 text-green-700 border-green-200",
  git: "bg-red-50 text-red-700 border-red-200",
  ai: "bg-violet-50 text-violet-700 border-violet-200",
  automation: "bg-orange-50 text-orange-700 border-orange-200",
  tools: "bg-teal-50 text-teal-700 border-teal-200",
  career: "bg-purple-50 text-purple-700 border-purple-200",
  beginners: "bg-emerald-50 text-emerald-700 border-emerald-200",
  frontend: "bg-rose-50 text-rose-700 border-rose-200",
};

function tagColor(tag: string) {
  return (
    TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-50 text-indigo-700 border-indigo-200"
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
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all ${
            !activeTag
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
        >
          All ({posts.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all ${
              activeTag === tag
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                : `${tagColor(tag)} hover:opacity-75`
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      {(search || activeTag) && filtered.length > 0 && (
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
          Showing {filtered.length} of {posts.length} articles
        </p>
      )}

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <p className="text-4xl mb-5">🔍</p>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">
            Nothing found for that search.
          </p>
          <button
            onClick={() => { setSearch(""); setActiveTag(null); }}
            className="mt-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-8 first:pt-0">
              <article className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                {/* Left: color accent */}
                <div
                  className="hidden md:block w-1 self-stretch rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-1.5"
                  style={{ background: post.coverColor, opacity: 0.7 }}
                />

                <div className="flex-1 min-w-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                    <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center self-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
