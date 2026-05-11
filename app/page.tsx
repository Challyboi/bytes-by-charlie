import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";

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

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = allPosts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-6">
        {/* Decorative blobs */}
        <div
          className="absolute top-[-60px] right-[-80px] w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f0abfc, transparent)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #67e8f9, transparent)" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="text-base">👋</span>
            Hey there, welcome!
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            Bytes by{" "}
            <span className="underline decoration-pink-300 decoration-4 underline-offset-4">
              Charlie
            </span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            A space where I share what I learn — code, tools, ideas, and
            everything in between. Written by Charles Agboh.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-indigo-700 font-semibold px-7 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Read the Blog →
            </Link>
            <Link
              href="/about"
              className="bg-white/10 border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Latest{" "}
              <span className="gradient-text">Posts</span>
            </h2>
            <p className="text-slate-500 mt-1">Fresh bytes from the desk 🖥️</p>
          </div>
          <Link
            href="/blog"
            className="text-indigo-600 font-semibold text-sm hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-lg">Posts coming soon — stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="post-card bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
                  {/* Color accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: post.coverColor }}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-50">
                      <span>
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="text-indigo-600 font-semibold text-sm hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* About teaser */}
      <section className="bg-gradient-to-r from-teal-50 to-indigo-50 py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Avatar placeholder */}
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg flex-shrink-0 ring-4 ring-indigo-200">
            <Image
              src="/charlie.jpg"
              alt="Charles Agboh"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Hi, I&apos;m Charlie 👋
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-xl">
              I&apos;m a tech enthusiast and developer who loves learning and
              sharing. Bytes by Charlie is where I document my journey — from
              beginner pitfalls to pro tips. Whether you&apos;re just starting
              out or levelling up, there&apos;s something here for you.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block text-indigo-600 font-semibold hover:underline"
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
