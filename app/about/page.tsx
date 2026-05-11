import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Charles Agboh — the dev behind Bytes by Charlie.",
};

const skills = [
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-700", icon: "⚡" },
  { name: "TypeScript", color: "bg-blue-100 text-blue-700", icon: "🔷" },
  { name: "React", color: "bg-cyan-100 text-cyan-700", icon: "⚛️" },
  { name: "Next.js", color: "bg-slate-100 text-slate-700", icon: "▲" },
  { name: "Node.js", color: "bg-green-100 text-green-700", icon: "🟢" },
  { name: "CSS / Tailwind", color: "bg-pink-100 text-pink-700", icon: "🎨" },
  { name: "Git", color: "bg-red-100 text-red-700", icon: "🔀" },
  { name: "REST APIs", color: "bg-purple-100 text-purple-700", icon: "🔌" },
];

const values = [
  {
    emoji: "📖",
    title: "Always Learning",
    desc: "Tech moves fast. I stay curious and keep pace, one byte at a time.",
  },
  {
    emoji: "🤝",
    title: "Community First",
    desc: "The best growth happens when we share knowledge and lift others up.",
  },
  {
    emoji: "🛠️",
    title: "Builder Mentality",
    desc: "I love taking ideas from zero to working product — shipping beats perfecting.",
  },
  {
    emoji: "✍️",
    title: "Write to Understand",
    desc: "Writing forces clarity. This blog exists because of that belief.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="w-36 h-36 rounded-full overflow-hidden shadow-xl flex-shrink-0 ring-4 ring-indigo-200">
          <Image
            src="/charlie.jpg"
            alt="Charles Agboh"
            width={144}
            height={144}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Hey, I&apos;m{" "}
            <span className="gradient-text">Charles Agboh</span> 👋
          </h1>
          <p className="text-slate-500 text-sm font-medium mb-3 uppercase tracking-wide">
            Also known as Challyboi · Charlie
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            I&apos;m a developer, learner, and tech enthusiast. I created
            Bytes by Charlie as a place to document everything I explore in the
            world of software — from foundational concepts to cutting-edge
            tools.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📖</span> My Story
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-7 space-y-4 text-slate-600 leading-relaxed text-lg">
          <p>
            I started my journey in tech with a burning curiosity about how
            websites and apps actually work behind the scenes. What began as
            tinkering with HTML and CSS turned into a full-on love affair with
            software development.
          </p>
          <p>
            Today, I build things with modern web technologies and love sharing
            what I learn. Bytes by Charlie is my digital notebook — a place
            where I break down complex topics into digestible, practical
            articles that I wish had existed when I was starting out.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me reading, exploring
            new ideas, or connecting with other developers who are on the same
            journey.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span>🛠️</span> Tech I Work With
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm shadow-sm ${skill.color}`}
            >
              <span>{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span>💡</span> What I Believe In
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{v.emoji}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-extrabold mb-3">Let&apos;s Connect!</h2>
        <p className="text-indigo-100 mb-6 max-w-md mx-auto">
          Got a question, want to collaborate, or just want to say hi? The blog
          is always open and so am I.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
        >
          Read the Blog →
        </Link>
      </section>
    </div>
  );
}
