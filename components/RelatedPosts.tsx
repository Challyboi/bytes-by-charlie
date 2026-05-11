import Link from "next/link";
import { format } from "date-fns";
import { PostMeta } from "@/lib/posts";

interface Props {
  currentSlug: string;
  currentTags: string[];
  allPosts: PostMeta[];
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
  allPosts,
}: Props) {
  const related = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all h-full">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg"
                style={{
                  background: `${post.coverColor}18`,
                  color: post.coverColor,
                }}
              >
                📄
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm leading-snug mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {format(new Date(post.date), "MMM d, yyyy")} &middot;{" "}
                {post.readingTime}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
