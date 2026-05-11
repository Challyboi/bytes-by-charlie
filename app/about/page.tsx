import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Charles Agboh — the developer behind Bytes by Charlie.",
};

const skills = [
  { name: "JavaScript", color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: "⚡" },
  { name: "TypeScript", color: "bg-blue-50 text-blue-700 border-blue-200", icon: "🔷" },
  { name: "React", color: "bg-cyan-50 text-cyan-700 border-cyan-200", icon: "⚛️" },
  { name: "Next.js", color: "bg-slate-50 text-slate-700 border-slate-200", icon: "▲" },
  { name: "Node.js", color: "bg-green-50 text-green-700 border-green-200", icon: "🟢" },
  { name: "Tailwind CSS", color: "bg-sky-50 text-sky-700 border-sky-200", icon: "🎨" },
  { name: "n8n Automation", color: "bg-orange-50 text-orange-700 border-orange-200", icon: "🔧" },
  { name: "AI & Claude", color: "bg-violet-50 text-violet-700 border-violet-200", icon: "🤖" },
  { name: "Git & GitHub", color: "bg-red-50 text-red-700 border-red-200", icon: "🔀" },
  { name: "REST APIs", color: "bg-purple-50 text-purple-700 border-purple-200", icon: "🔌" },
];

const values = [
  { emoji: "📖", title: "Always Learning", desc: "Tech moves fast. I stay curious and keep pace — one byte at a time." },
  { emoji: "🤝", title: "Community First", desc: "The best growth happens when we share knowledge and lift each other up." },
  { emoji: "🛠️", title: "Builder Mentality", desc: "I love shipping ideas. Done and shipped beats perfect and unpublished." },
  { emoji: "✍️", title: "Write to Understand", desc: "Writing forces clarity. This blog exists because of that belief." },
];

const timeline = [
  { year: "2024", title: "Discovered AI automation", desc: "Started exploring n8n, AI agents, and how they change what developers can build." },
  { year: "2024", title: "Built first automation workflows", desc: "Connected APIs, built bots, and fell in love with the power of no-code + code hybrid thinking." },
  { year: "2025", title: "Launched Bytes by Charlie", desc: "Started documenting my journey to help others learn faster and build smarter." },
  { year: "Now", title: "Writing & building", desc: "Sharing everything I know — AI, automation, web dev, and the mindset behind it all." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-950 text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row items-center gap-10">
          <div className="w-36 h-36 rounded-2xl overflow-hidden ring-4 ring-indigo-500/40 flex-shrink-0 shadow-2xl">
            <Image src="/charlie.jpg" alt="Charles Agboh" width={144} height={144} className="w-full h-full object-cover" priority />
          </div>
          <div>
            <p className="text-indigo-400 font-semibold text-sm mb-2 uppercase tracking-widest">About the author</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
              Charles <span className="gradient-text">Agboh</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-widest">
              Also known as Challyboi · Charlie
            </p>
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Developer, automation builder, and the human behind Bytes by Charlie. I build things with modern web tech and share everything I learn.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* Story */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-lg">📖</span>
            My Story
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-100 rounded-2xl p-8 space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>I started my journey in tech with a simple question: <em className="text-slate-800 font-medium">&quot;How does any of this actually work?&quot;</em> What began as curiosity about how websites were built turned into a full-on passion for software, automation, and the tools shaping the future.</p>
            <p>Today, I sit at the intersection of traditional web development and modern AI automation. I use tools like n8n, Claude Code, and Next.js — and I firmly believe that developers who understand both worlds will have a serious edge in the years ahead.</p>
            <p>Bytes by Charlie is my digital notebook. A place where I document what I learn, break down complex topics, and write the articles I wish had existed when I was figuring things out.</p>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-lg">🗓️</span>
            Journey So Far
          </h2>
          <div className="relative pl-8 border-l-2 border-indigo-100 space-y-8">
            {timeline.map((item) => (
              <div key={item.title} className="relative">
                <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow" />
                <span className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-2">{item.year}</span>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-lg">🛠️</span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill.name} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border ${skill.color}`}>
                <span>{skill.icon}</span> {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-lg">💡</span>
            What I Believe In
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-950 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />
          <div className="relative">
            <h2 className="text-3xl font-extrabold mb-3">Let&apos;s Connect</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              Got a question, want to collaborate, or just want to say hi? The blog&apos;s always open — and so am I.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/blog" className="btn-glow bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all">
                Read the Blog →
              </Link>
              <Link href="/newsletter" className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
                📬 Subscribe
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
