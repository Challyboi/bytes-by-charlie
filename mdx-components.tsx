import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import WorkflowDiagram from "@/components/WorkflowDiagram";

/* ── YouTube embed ─────────────────────────────────────────── */
function YoutubeEmbed({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2">
        <span className="text-red-500 text-lg">▶</span>
        <span className="text-slate-300 text-xs font-medium">{title ?? "Watch"}</span>
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
  { bg: string; border: string; text: string; icon: string; label: string }
> = {
  tip: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: "✅",
    label: "Tip",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "💡",
    label: "Good to know",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "⚠️",
    label: "Watch out",
  },
  fire: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    icon: "🔥",
    label: "Pro tip",
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
    <div className={`${s.bg} ${s.border} border-l-4 rounded-r-xl px-5 py-4 my-6`}>
      <p className={`${s.text} font-bold text-xs uppercase tracking-widest mb-1.5`}>
        {s.icon} {s.label}
      </p>
      <div className={`${s.text} text-sm leading-relaxed`}>{children}</div>
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
    <figure className="my-8">
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-slate-400 text-xs mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── MDX components map ─────────────────────────────────────── */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    /* Make custom components available in all MDX files */
    YoutubeEmbed,
    Callout,
    ImageCaption,
    WorkflowDiagram,

    /* Styled HTML elements */
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold text-slate-900 mt-10 mb-5 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-slate-800 mt-10 mb-4 leading-snug border-l-4 border-indigo-500 pl-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-slate-800 mt-7 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 leading-relaxed mb-5 text-lg">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-indigo-600 font-medium underline decoration-indigo-300 hover:decoration-indigo-600 transition-all"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-5 space-y-2 text-slate-700 text-lg ml-4 list-none">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 space-y-2 text-slate-700 text-lg ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed flex items-start gap-2">
        <span className="text-indigo-400 mt-1.5 flex-shrink-0 text-sm">›</span>
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-pink-400 bg-pink-50 pl-5 pr-4 py-4 my-6 rounded-r-xl italic text-slate-600 text-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-pink-600 font-mono text-sm px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 rounded-2xl p-6 overflow-x-auto my-7 text-sm font-mono leading-relaxed shadow-xl border border-slate-700">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    ),
    strong: ({ children }) => (
      <strong className="font-extrabold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-indigo-50 text-indigo-700 font-bold px-4 py-3 text-left border-b border-slate-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-slate-100 text-slate-700">
        {children}
      </td>
    ),
    ...components,
  };
}
