"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

type Variant = "banner" | "inline";

export default function NewsletterSignup({
  variant = "banner",
}: {
  variant?: Variant;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setMessage("You're in! 🎉 Check your inbox to confirm your subscription.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (variant === "inline") {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8 my-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📬</span>
          <h3 className="text-xl font-bold text-slate-900">
            Enjoyed this post?
          </h3>
        </div>
        <p className="text-slate-500 mb-5 text-sm leading-relaxed">
          Subscribe to get new posts straight to your inbox  -  no spam, just
          bytes.
        </p>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span>✅</span> {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe →"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-red-500 text-xs">{message}</p>
        )}
      </div>
    );
  }

  // Banner variant (used on Home & Blog pages)
  return (
    <section className="bg-slate-950 dark:bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Left: text */}
          <div className="max-w-lg">
            <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
              Newsletter
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Get bytes worth reading.
            </h2>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              New posts on AI, automation, and dev tools delivered straight to
              your inbox. No spam - just ideas that make you a better developer.
            </p>
          </div>

          {/* Right: form */}
          <div className="md:min-w-[380px]">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-4 text-emerald-400 font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe free"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-red-400 text-xs">{message}</p>
            )}

            <p className="mt-3 text-slate-600 text-xs">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
