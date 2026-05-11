"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const articleEls = document.querySelectorAll("article h2, article h3");
    const hs: Heading[] = [];

    articleEls.forEach((el) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") ?? "";
      }
      if (el.id) {
        hs.push({
          id: el.id,
          text: el.textContent ?? "",
          level: Number(el.tagName[1]),
        });
      }
    });

    setHeadings(hs);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 }
    );

    articleEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
          Contents
        </p>
        <nav>
          <ul className="space-y-0.5">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block text-sm leading-snug py-1.5 border-l-2 transition-all ${
                    h.level === 3 ? "pl-5" : "pl-3"
                  } ${
                    activeId === h.id
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
