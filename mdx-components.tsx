import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-slate-900 mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3 leading-snug border-l-4 border-indigo-500 pl-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 leading-relaxed mb-5 text-lg">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-indigo-600 font-medium underline decoration-indigo-300 hover:decoration-indigo-600 transition-all"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-5 space-y-2 text-slate-700 text-lg ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 space-y-2 text-slate-700 text-lg ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-pink-400 bg-pink-50 pl-5 pr-4 py-3 my-6 rounded-r-lg italic text-slate-600">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-pink-600 font-mono text-sm px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono leading-relaxed shadow-lg">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-600">{children}</em>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden text-sm">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-indigo-50 text-indigo-700 font-semibold px-4 py-3 text-left border-b border-slate-200">
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
