"use client";

import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user_name: string;
  user_image: string | null;
  body: string;
  created_at: string;
}

export default function Comments({ slug }: { slug: string }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post comment");
      setComments((prev) => [...prev, data.comment]);
      setBody("");
      textareaRef.current?.blur();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteComment(id: string) {
    if (!confirm("Delete this comment?")) return;
    const res = await fetch(`/api/comments?id=${id}`, { method: "DELETE" });
    if (res.ok) setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <section className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Discussion
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {fetching ? "Loading..." : `${comments.length} comment${comments.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>

      {/* Comment form */}
      {!isLoaded ? null : isSignedIn ? (
        <form onSubmit={submit} className="mb-10">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 mt-0.5">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName ?? "You"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-200 dark:ring-indigo-800 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  {(user.fullName ?? user.firstName ?? "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1.5">{error}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{body.length}/2000</span>
                <button
                  type="submit"
                  disabled={loading || !body.trim()}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>Post comment</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Sign-in prompt */
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/50 text-center">
          <div className="text-3xl mb-3">💬</div>
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Join the discussion
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Sign in to leave a comment and connect with other readers
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/sign-in"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Sign in to comment
            </a>
            <a
              href="/sign-up"
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
            >
              Create account
            </a>
          </div>
        </div>
      )}

      {/* Comments list */}
      {fetching ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-600">
          <div className="text-4xl mb-3">🌱</div>
          <p className="font-medium">No comments yet</p>
          <p className="text-sm mt-1">Be the first to start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3 group">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {c.user_image ? (
                  <Image
                    src={c.user_image}
                    alt={c.user_name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {c.user_name[0].toUpperCase()}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl rounded-tl-sm px-4 py-3 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {c.user_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs flex-shrink-0">
                        {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                      </span>
                      {/* Delete button - only shown if it's the current user's comment */}
                      {isSignedIn && (
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 hover:text-red-400 text-xs"
                          title="Delete"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {c.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
