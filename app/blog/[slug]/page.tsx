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
import BackToTop from "@/components/BackToTop";
import AuthorCard from "@/components/AuthorCard";
import PostNavigation from "@/components/PostNavigation";
import Comments from "@/components/Comments";

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

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  javascript: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400" },
  typescript: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  react:       { bg: "bg-cyan-100 dark:bg-cyan-900/30",  text: "text-cyan-700 dark:text-cyan-400" },
  nextjs:      { bg: "bg-slate-100 dark:bg-slate-800",   text: "text-slate-600 dark:text-slate-300" },
  git:         { bg: "bg-red-100 dark:bg-red-900/30",    text: "text-red-700 dark:text-red-400" },
  ai:          { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-400" },
  automation:  { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" },
  tools:       { bg: "bg-teal-100 dark:bg-teal-900/30",  text: "text-teal-700 dark:text-teal-400" },
  career:      { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400" },
  beginners:   { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
  frontend:    { bg: "bg-rose-100 dark:bg-rose-900/30",  text: "text-rose-700 dark:text-rose-400" },
  n8n:         { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" },
};

function TagPill({ tag }: { tag: string }) {
  const colors = TAG_COLORS[tag.toLowerCase()] ?? {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-400",
  };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      {tag}
    </span>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostBySlug(slug);
  if (!meta) notFound();

  const allPosts = getAllPosts();
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <div className="relative">
      {/* Fixed UI */}
      <ReadingProgress />
      <BackToTop />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-white"
        style={{
          background: `linear-gradient(135deg, ${meta.coverColor}ee 0%, ${meta.coverColor}bb 50%, ${meta.coverColor}88 100%)`,
        }}
      >
        {/* Layered decorative backgrounds */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, white, transparent)" }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, white, transparent)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-10 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight mb-5 tracking-tight">
            {meta.title}
          </h1>

          {/* Description */}
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl">
            {meta.description}
          </p>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
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
                <div className="flex items-center gap-2 text-white/55 text-xs">
                  <span>{format(new Date(meta.date), "MMM d, yyyy")}</span>
                  <span>&middot;</span>
                  <span>{meta.readingTime}</span>
                </div>
              </div>
            </div>

            {/* Share pill in hero */}
            <div className="ml-auto flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-white/70 text-xs font-medium">Share</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT LAYOUT ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex gap-12 xl:gap-16 items-start">

          {/* ── MAIN ARTICLE ── */}
          <div className="flex-1 min-w-0">

            {/* Article body */}
            <article className="prose-custom max-w-none">
              <Post />
            </article>

            {/* ── TAGS ── */}
            <div className="mt-12 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>

            {/* ── SHARE ── */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                Found this helpful? Share it.
              </p>
              <ShareButtons title={meta.title} slug={slug} />
            </div>

            {/* ── AUTHOR CARD ── */}
            <AuthorCard />

            {/* ── NEWSLETTER ── */}
            <NewsletterSignup variant="inline" />

            {/* ── RELATED POSTS ── */}
            <RelatedPosts
              currentSlug={slug}
              currentTags={meta.tags}
              allPosts={allPosts}
            />

            {/* ── COMMENTS ── */}
            <Comments slug={slug} />

            {/* ── POST NAV ── */}
            <PostNavigation allPosts={allPosts} currentSlug={slug} />
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="hidden xl:flex flex-col gap-6 w-64 flex-shrink-0 sticky top-28 self-start">
            {/* Table of contents */}
            <TableOfContents />

            {/* Article info card */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                About this post
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="text-base">⏱️</span>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">Reading time</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{meta.readingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="text-base">📅</span>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">Published</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      {format(new Date(meta.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="text-base">✍️</span>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">Author</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Charles Agboh</p>
                  </div>
                </div>
              </div>

              {/* Tags in sidebar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {meta.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </div>

            {/* Share in sidebar */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                Share
              </p>
              <ShareButtons title={meta.title} slug={slug} compact />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
