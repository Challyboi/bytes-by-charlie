import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All posts from Bytes by Charlie - tech articles on AI, automation, and modern web development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 md:pt-20">
        <div className="flex items-center gap-2.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            The Blog
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              All articles
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {posts.length} {posts.length === 1 ? "article" : "articles"} on AI,
              automation, and modern web dev.
            </p>
          </div>

          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 text-sm font-semibold transition-colors self-start md:self-auto"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9h-2.83a7.07 7.07 0 00-7.07-7.07V10.1z" />
            </svg>
            RSS Feed
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-slate-100 dark:border-slate-800" />
      </div>

      {/* Posts with search + filter */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <BlogList posts={posts} />
      </div>

      <NewsletterSignup />
    </div>
  );
}
