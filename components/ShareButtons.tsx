"use client";

import { useState } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const siteUrl = "https://bytes-by-charlie.vercel.app";
  const fullUrl = `${siteUrl}/blog/${slug}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
    } catch {
      /* fallback for older browsers */
      const el = document.createElement("textarea");
      el.value = fullUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        Share this post:
      </span>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-80 transition-opacity"
      >
        <span>𝕏</span> Twitter
      </a>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
      >
        <span>in</span> LinkedIn
      </a>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        {copied ? "✓ Copied!" : "🔗 Copy link"}
      </button>
    </div>
  );
}
