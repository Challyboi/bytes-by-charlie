import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Curated tools, courses, and reads recommended by Charles Agboh.",
};

const sections = [
  {
    title: "AI & Automation",
    icon: "🤖",
    color: "from-violet-500 to-purple-600",
    items: [
      { name: "Claude Code", desc: "Anthropic's AI coding agent  -  terminal-native and incredibly powerful.", href: "https://claude.ai/code", badge: "🔥 Recommended" },
      { name: "n8n", desc: "Open-source workflow automation. Visual, powerful, and endlessly flexible.", href: "https://n8n.io", badge: "⭐ Essential" },
      { name: "Anthropic API", desc: "Build your own AI-powered apps using Claude models.", href: "https://anthropic.com", badge: null },
      { name: "Make (Integromat)", desc: "A powerful visual automation platform  -  great for no-code flows.", href: "https://make.com", badge: null },
    ],
  },
  {
    title: "Dev Tools",
    icon: "🛠️",
    color: "from-blue-500 to-indigo-600",
    items: [
      { name: "VS Code", desc: "The code editor that needs no introduction. Free, fast, and extensible.", href: "https://code.visualstudio.com", badge: "⭐ Essential" },
      { name: "Vercel", desc: "Deploy Next.js apps in seconds. The best way to ship to production.", href: "https://vercel.com", badge: null },
      { name: "GitHub", desc: "Version control and collaboration. Non-negotiable for any developer.", href: "https://github.com", badge: "⭐ Essential" },
      { name: "Postman", desc: "Test and explore APIs with ease. Great for learning how APIs work.", href: "https://postman.com", badge: null },
    ],
  },
  {
    title: "Learning",
    icon: "📚",
    color: "from-emerald-500 to-teal-600",
    items: [
      { name: "MDN Web Docs", desc: "The definitive reference for HTML, CSS, and JavaScript. Bookmark it.", href: "https://developer.mozilla.org", badge: "⭐ Essential" },
      { name: "freeCodeCamp", desc: "Free, structured coding curriculum. Perfect for beginners and beyond.", href: "https://freecodecamp.org", badge: null },
      { name: "The Odin Project", desc: "A free, open-source web development curriculum. Highly practical.", href: "https://theodinproject.com", badge: "🔥 Recommended" },
      { name: "JavaScript.info", desc: "The best modern JavaScript tutorial on the internet. Period.", href: "https://javascript.info", badge: null },
    ],
  },
  {
    title: "Design & UI",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    items: [
      { name: "Tailwind CSS", desc: "Utility-first CSS that makes building beautiful UIs fast and fun.", href: "https://tailwindcss.com", badge: "🔥 Recommended" },
      { name: "shadcn/ui", desc: "Beautiful, accessible React components you own and can customize.", href: "https://ui.shadcn.com", badge: null },
      { name: "Figma", desc: "The industry-standard design tool. Free for individuals.", href: "https://figma.com", badge: null },
      { name: "Coolors", desc: "Generate stunning colour palettes for your projects instantly.", href: "https://coolors.co", badge: null },
    ],
  },
  {
    title: "Productivity",
    icon: "⚡",
    color: "from-orange-500 to-amber-500",
    items: [
      { name: "Notion", desc: "All-in-one workspace for notes, docs, and project management.", href: "https://notion.so", badge: null },
      { name: "Obsidian", desc: "Local, markdown-based note-taking. Great for a personal knowledge base.", href: "https://obsidian.md", badge: "🔥 Recommended" },
      { name: "Ray.so", desc: "Create beautiful code screenshots to share on social media.", href: "https://ray.so", badge: null },
      { name: "Excalidraw", desc: "Virtual whiteboard for sketching diagrams and ideas. Surprisingly good.", href: "https://excalidraw.com", badge: null },
    ],
  },
];

const BADGE_STYLES: Record<string, string> = {
  "🔥 Recommended": "bg-orange-100 text-orange-700 border-orange-200",
  "⭐ Essential": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function ResourcesPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-slate-950 text-white px-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        <div className="max-w-6xl mx-auto relative">
          <p className="text-indigo-400 font-semibold text-sm mb-2 uppercase tracking-widest">Curated by Charlie</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Developer <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Tools, platforms, and learning resources I personally use and recommend. No fluff  -  only the good stuff.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-7">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                {section.icon}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{section.title}</h2>
            </div>

            {/* Items grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-card group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-100"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 whitespace-nowrap ${BADGE_STYLES[item.badge] ?? ""}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{item.desc}</p>
                  <span className="text-indigo-500 text-xs font-semibold group-hover:underline">Visit →</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Suggest CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Know a great resource?</h3>
          <p className="text-slate-500 mb-5 text-sm">
            This list grows over time. If you have a tool or resource you love, reach out  -  I&apos;d love to check it out.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
