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
          Subscribe to get new posts straight to your inbox — no spam, just
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
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center text-white">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="text-3xl font-extrabold mb-3">
          Stay in the Loop
        </h2>
        <p className="text-indigo-100 mb-8 text-lg leading-relaxed">
          Get new posts on AI, automation, and dev tools delivered straight to
          your inbox. No spam — just bytes worth reading.
        </p>

        {status === "success" ? (
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 text-white font-medium text-lg">
            ✅ {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="flex-1 px-5 py-3 rounded-full text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-indigo-700 font-bold px-7 py-3 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-60 whitespace-nowrap shadow-lg"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-pink-200 text-sm">{message}</p>
        )}

        <p className="mt-4 text-indigo-200 text-xs">
          Join readers learning to build smarter with AI. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
