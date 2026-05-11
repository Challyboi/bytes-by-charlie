import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { format } from "date-fns";
import NewsletterSignup from "@/components/NewsletterSignup";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import GiscusComments from "@/components/GiscusComments";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Charles Agboh"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

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
    TAG_COLORS[tag.toLowerCase()] ??
    "bg-indigo-100 text-indigo-700 border-indigo-200"
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostBySlug(slug);
  if (!meta) notFound();

  const allPosts = getAllPosts();
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <div>
      {/* Reading progress bar - fixed at top */}
      <ReadingProgress />

      {/* Hero banner */}
      <div
        className="relative overflow-hidden text-white py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${meta.coverColor}f0 0%, ${meta.coverColor}99 100%)`,
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>{" "}
            Back to all posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-5 leading-tight">
            {meta.title}
          </h1>
          <p className="text-white/75 text-lg mb-8 max-w-2xl leading-relaxed">
            {meta.description}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0">
              <Image
                src="/charlie.jpg"
                alt="Charles Agboh"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Charles Agboh</p>
              <div className="flex items-center gap-3 text-white/60 text-xs">
                <span>{format(new Date(meta.date), "MMMM d, yyyy")}</span>
                <span>&middot;</span>
                <span>{meta.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar layout */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex gap-14 items-start">

          {/* Main article */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <article>
              <Post />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share buttons */}
            <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <ShareButtons title={meta.title} slug={slug} />
            </div>

            {/* Newsletter */}
            <NewsletterSignup variant="inline" />

            {/* Related posts */}
            <RelatedPosts
              currentSlug={slug}
              currentTags={meta.tags}
              allPosts={allPosts}
            />

            {/* Comments */}
            <GiscusComments />

            {/* Footer nav */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline text-sm group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  &larr;
                </span>{" "}
                All posts
              </Link>
              <Link
                href="/resources"
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 font-medium text-sm transition-colors"
              >
                Explore resources &rarr;
              </Link>
            </div>
          </div>

          {/* Floating Table of Contents - xl screens only */}
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
