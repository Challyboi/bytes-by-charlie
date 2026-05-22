import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import NewsletterSignup from "@/components/NewsletterSignup";

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
};

function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-indigo-100 text-indigo-700 border-indigo-200";
}

const topics = [
  { label: "AI & Automation", icon: "🤖", color: "from-violet-500 to-purple-600", href: "/blog" },
  { label: "JavaScript", icon: "⚡", color: "from-yellow-400 to-orange-500", href: "/blog" },
  { label: "TypeScript", icon: "🔷", color: "from-blue-500 to-indigo-600", href: "/blog" },
  { label: "React & Next.js", icon: "⚛️", color: "from-cyan-400 to-blue-500", href: "/blog" },
  { label: "Dev Tools", icon: "🛠️", color: "from-teal-400 to-emerald-500", href: "/resources" },
  { label: "Career & Growth", icon: "📈", color: "from-pink-500 to-rose-600", href: "/blog" },
];

const SITE_URL = "https://bytes-by-charlie.vercel.app";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = allPosts.slice(0, 3);

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
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-[-120px] left-[20%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute bottom-[-80px] right-[10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 flex flex-col lg:flex-row items-center gap-14">
          {/* Left  -  text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm text-sm px-4 py-1.5 rounded-full mb-7 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Actively publishing · New posts weekly
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Tech insights
              <br />
              <span className="gradient-text">worth reading.</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              AI automation, dev tools, and coding deep-dives  -  written for
              developers who want to build smarter and move faster. By{" "}
              <span className="text-white font-semibold">Charles Agboh</span>.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/blog"
                className="btn-glow bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                Read the Blog →
              </Link>
              <Link
                href="/newsletter"
                className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-xl transition-all backdrop-blur-sm"
              >
                📬 Subscribe Free
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start mt-12 text-slate-400 text-sm">
              <div>
                <span className="block text-2xl font-extrabold text-white">{allPosts.length}</span>
                Articles
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <span className="block text-2xl font-extrabold text-white">6</span>
                Topics
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <span className="block text-2xl font-extrabold text-white">Free</span>
                Always
              </div>
            </div>
          </div>

          {/* Right  -  terminal card */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-slate-400 text-xs font-mono">bytes-by-charlie ~ latest</span>
              </div>
              {/* Terminal body */}
              <div className="p-5 font-mono text-sm space-y-2">
                <p className="text-slate-500">// Latest post</p>
                {allPosts[0] && (
                  <>
                    <p className="text-indigo-400">const <span className="text-white">post</span> = {"{"}</p>
                    <p className="pl-4 text-emerald-400">title: <span className="text-yellow-300">&quot;{allPosts[0].title.slice(0, 30)}...&quot;</span>,</p>
                    <p className="pl-4 text-emerald-400">date: <span className="text-yellow-300">&quot;{allPosts[0].date}&quot;</span>,</p>
                    <p className="pl-4 text-emerald-400">readTime: <span className="text-yellow-300">&quot;{allPosts[0].readingTime}&quot;</span>,</p>
                    <p className="text-indigo-400">{"}"}</p>
                  </>
                )}
                <p className="text-slate-500 mt-3">// Start reading</p>
                <p>
                  <span className="text-pink-400">open</span>
                  <span className="text-white">(</span>
                  <span className="text-yellow-300">&quot;bytesbycharlie.vercel.app/blog&quot;</span>
                  <span className="text-white">)</span>
                </p>
                <p className="text-emerald-400 flex items-center gap-1">
                  ✓ <span className="text-slate-300">Ready. Happy reading.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Explore by <span className="gradient-text">Topic</span>
          </h2>
          <p className="text-slate-500">Pick what interests you and dive straight in.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map((t) => (
            <Link key={t.label} href={t.href}>
              <div className={`post-card relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.color} p-6 text-white h-28 flex flex-col justify-between`}>
                <span className="text-3xl">{t.icon}</span>
                <span className="font-bold text-sm">{t.label}</span>
                <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-10 bg-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Posts ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">
                Latest <span className="gradient-text">Posts</span>
              </h2>
              <p className="text-slate-500 text-sm">Fresh bytes from the desk 🖥️</p>
            </div>
            <Link href="/blog" className="text-indigo-600 font-semibold text-sm hover:underline hidden sm:block">
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-5xl mb-4">📝</p>
              <p>Posts coming soon  -  stay tuned!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="post-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col group">
                    {/* Cover image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          background: `linear-gradient(to bottom, transparent 40%, ${post.coverColor}cc)`,
                        }}
                      />
                      {/* Tags float over image */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/60" style={{ color: post.coverColor }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug flex-1 mb-2 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-3.5">
                        <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── About strip ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-200 flex-shrink-0 shadow-lg">
            <Image src="/charlie.jpg" alt="Charles Agboh" width={96} height={96} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Written by <span className="gradient-text">Charles Agboh</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4 max-w-xl">
              Developer, learner, and automation enthusiast. I write about the tools and ideas that are reshaping how we build  -  from AI agents to n8n workflows to modern web dev.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm hover:underline">
              Read my story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSignup />
    </div>
  );
}
