import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import CopyCodeButton from "@/components/CopyCodeButton";
import React from "react";

/* ── YouTube embed ─────────────────────────────────────────── */
function YoutubeEmbed({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
      <div className="bg-slate-900 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-red-400 text-sm">▶</span>
        <span className="text-slate-300 text-xs font-medium truncate">{title ?? "Watch"}</span>
      </div>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
          title={title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* ── Callout box ────────────────────────────────────────────── */
type CalloutType = "tip" | "info" | "warning" | "fire";

const CALLOUT_STYLES: Record<
  CalloutType,
  {
    bg: string; darkBg: string;
    border: string; darkBorder: string;
    text: string; darkText: string;
    icon: string; label: string;
    accent: string;
  }
> = {
  tip: {
    bg: "bg-emerald-50", darkBg: "dark:bg-emerald-950/30",
    border: "border-emerald-300", darkBorder: "dark:border-emerald-700",
    text: "text-emerald-900", darkText: "dark:text-emerald-200",
    icon: "✅", label: "Tip",
    accent: "from-emerald-400 to-emerald-600",
  },
  info: {
    bg: "bg-blue-50", darkBg: "dark:bg-blue-950/30",
    border: "border-blue-300", darkBorder: "dark:border-blue-700",
    text: "text-blue-900", darkText: "dark:text-blue-200",
    icon: "💡", label: "Good to know",
    accent: "from-blue-400 to-blue-600",
  },
  warning: {
    bg: "bg-amber-50", darkBg: "dark:bg-amber-950/30",
    border: "border-amber-300", darkBorder: "dark:border-amber-700",
    text: "text-amber-900", darkText: "dark:text-amber-200",
    icon: "⚠️", label: "Watch out",
    accent: "from-amber-400 to-amber-600",
  },
  fire: {
    bg: "bg-orange-50", darkBg: "dark:bg-orange-950/30",
    border: "border-orange-300", darkBorder: "dark:border-orange-700",
    text: "text-orange-900", darkText: "dark:text-orange-200",
    icon: "🔥", label: "Pro tip",
    accent: "from-orange-400 to-red-500",
  },
};

function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const s = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info;
  return (
    <div className={`relative overflow-hidden rounded-2xl border my-7 ${s.bg} ${s.darkBg} ${s.border} ${s.darkBorder}`}>
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${s.accent}`} />
      <div className="pl-5 pr-5 py-4">
        <p className={`font-extrabold text-xs uppercase tracking-widest mb-2 ${s.text} ${s.darkText}`}>
          {s.icon} {s.label}
        </p>
        <div className={`text-sm leading-relaxed ${s.text} ${s.darkText}`}>{children}</div>
      </div>
    </div>
  );
}

/* ── Image with caption ─────────────────────────────────────── */
function ImageCaption({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10">
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-slate-400 dark:text-slate-500 text-xs mt-3 italic leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Code block with copy button ───────────────────────────── */
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  // Extract code text from children for the copy button
  const codeText = (() => {
    try {
      const el = children as React.ReactElement<{ children: string }>;
      return typeof el?.props?.children === "string"
        ? el.props.children
        : "";
    } catch {
      return "";
    }
  })();

  return (
    <div className="relative my-8 group">
      <pre
        {...props}
        className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-2xl p-6 pt-10 overflow-x-auto text-sm font-mono leading-relaxed shadow-2xl border border-slate-700 dark:border-slate-800"
      >
        {children}
      </pre>
      {codeText && (
        <CopyCodeButton code={codeText} />
      )}
    </div>
  );
}

/* ── MDX components map ─────────────────────────────────────── */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    /* Custom components available in all MDX files */
    YoutubeEmbed,
    Callout,
    ImageCaption,
    WorkflowDiagram,

    /* Styled HTML elements */
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-12 mb-5 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-12 mb-4 leading-snug flex items-center gap-3 group">
        <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 dark:text-slate-300 leading-[1.85] mb-5 text-lg">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-indigo-600 dark:text-indigo-400 font-semibold underline decoration-indigo-300 dark:decoration-indigo-700 decoration-2 underline-offset-2 hover:decoration-indigo-600 dark:hover:decoration-indigo-400 transition-all"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 space-y-2.5 text-slate-700 dark:text-slate-300 text-lg ml-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 space-y-2.5 text-slate-700 dark:text-slate-300 text-lg ml-1 list-none counter-reset-[item]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed flex items-start gap-3">
        <span className="flex-shrink-0 mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-8 pl-6 pr-5 py-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50">
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-indigo-400 to-purple-500" />
        <div className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Block code (inside pre) - just render plainly
      if (className) {
        return <code className={`${className} text-sm`}>{children}</code>;
      }
      // Inline code
      return (
        <code className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-mono text-[0.875em] px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
          {children}
        </code>
      );
    },
    pre: Pre,
    hr: () => (
      <div className="my-12 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 dark:bg-pink-600" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
      </div>
    ),
    strong: ({ children }) => (
      <strong className="font-extrabold text-slate-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-600 dark:text-slate-400">{children}</em>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="min-w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-5 py-3.5 text-left border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
        {children}
      </td>
    ),
    ...components,
  };
}
