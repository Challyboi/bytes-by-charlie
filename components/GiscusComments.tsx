"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any existing script so we can re-inject with correct theme
    const existingScript = container.querySelector("script");
    if (existingScript) container.removeChild(existingScript);

    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

    if (!repoId || !categoryId) return; // Not configured yet

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "Challyboi/bytes-by-charlie");
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);
  }, [theme]);

  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;

  if (!repoId) {
    return (
      <section className="mt-14 pt-10 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
          Discussion
        </h2>
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
          <p className="text-3xl mb-3">💬</p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Comments coming soon. Enable GitHub Discussions on the repo to activate Giscus.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14 pt-10 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
        Discussion
      </h2>
      <div ref={containerRef} />
    </section>
  );
}
