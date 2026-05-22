import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import NewsletterSignup from "@/components/NewsletterSignup";

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
};

function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-50 text-indigo-700 border-indigo-200";
}

const topics = [
  { label: "AI & Automation", href: "/blog" },
  { label: "JavaScript", href: "/blog" },
  { label: "TypeScript", href: "/blog" },
  { label: "React & Next.js", href: "/blog" },
  { label: "Dev Tools", href: "/resources" },
  { label: "Career & Growth", href: "/blog" },
  { label: "Git", href: "/blog" },
  { label: "n8n Workflows", href: "/blog" },
];

const SITE_URL = "https://bytes-by-charlie.vercel.app";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = allPosts.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bytes by Charlie",
    description: "Tech insights, AI automation, and developer tools by Charles Agboh.",
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: "Charles Agboh",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Bytes by Charlie",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/charlie.jpg`,
      },
    },
    blogPost: allPosts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Person", name: "Charles Agboh" },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              A tech blog by Charles Agboh
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.07] tracking-tight mb-7">
            Practical tech insights
            <br />
            for developers who
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">build things.</span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl">
            Deep dives into AI automation, JavaScript, and the tools that make developers
            faster. Written with real examples, honest takes, and no fluff.
          </p>

          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Browse {allPosts.length} articles
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Get posts by email
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-slate-100 dark:border-slate-800" />
      </div>

      {/* ── Topics ── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0 mr-1">
            Topics
          </span>
          {topics.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-slate-100 dark:border-slate-800" />
      </div>

      {/* ── Latest Articles ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Latest articles
            </h2>
            <p className="text-slate-400 text-sm mt-1">Fresh bytes from the desk</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-4">📝</p>
            <p>Posts coming soon - stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featured.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article>
                  {/* Color bar - animates to full width on hover */}
                  <div
                    className="h-[3px] w-10 rounded-full mb-6 transition-all duration-300 group-hover:w-full"
                    style={{ background: post.coverColor }}
                  />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-extrabold text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-400 dark:text-slate-500">
                    <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >
            View all articles →
          </Link>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-slate-100 dark:border-slate-800" />
      </div>

      {/* ── About strip ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <Image
            src="/charlie.jpg"
            alt="Charles Agboh"
            width={80}
            height={80}
            className="rounded-full object-cover flex-shrink-0 ring-4 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              About the author
            </p>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Charles Agboh
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-xl text-[15px]">
              Developer, learner, and automation enthusiast. I write about the tools and
              ideas reshaping how we build - from AI agents to n8n workflows to modern web dev.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Read my story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSignup />
    </div>
  );
}
