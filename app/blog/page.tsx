import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts from Bytes by Charlie - tech articles on AI, automation, and modern web development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Header */}
      <div className="bg-slate-950 text-white px-6 py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <p className="text-indigo-400 font-semibold text-sm mb-2 uppercase tracking-widest">
            The Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            All <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-slate-400 text-lg">
            {posts.length} {posts.length === 1 ? "article" : "articles"} on AI,
            automation, and modern web dev.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9h-2.83a7.07 7.07 0 00-7.07-7.07V10.1z" />
              </svg>
              RSS Feed
            </a>
          </div>
        </div>
      </div>

      {/* Posts with search + filter */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <BlogList posts={posts} />
      </div>

      <NewsletterSignup />
    </div>
  );
}
