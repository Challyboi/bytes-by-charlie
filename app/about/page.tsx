import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Charles Agboh is an Email Marketing Specialist, Virtual Assistant, and automation builder based in Ibadan, Nigeria.",
};

const skills = [
  { name: "Klaviyo", color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: "📧" },
  { name: "Email Marketing", color: "bg-orange-50 text-orange-700 border-orange-200", icon: "📨" },
  { name: "Figma", color: "bg-violet-50 text-violet-700 border-violet-200", icon: "🎨" },
  { name: "n8n Automation", color: "bg-green-50 text-green-700 border-green-200", icon: "🔧" },
  { name: "AI & Claude Code", color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: "🤖" },
  { name: "HubSpot / CRM", color: "bg-red-50 text-red-700 border-red-200", icon: "🗂️" },
  { name: "Google Workspace", color: "bg-blue-50 text-blue-700 border-blue-200", icon: "💼" },
  { name: "Notion / Asana", color: "bg-slate-50 text-slate-700 border-slate-200", icon: "📋" },
  { name: "Canva", color: "bg-pink-50 text-pink-700 border-pink-200", icon: "✏️" },
  { name: "Mailchimp", color: "bg-teal-50 text-teal-700 border-teal-200", icon: "🐵" },
];

const experience = [
  {
    role: "Administrative & Research Support Specialist",
    company: "International Institute of Tropical Agriculture (IITA)",
    period: "Feb 2025 - Present",
    location: "Ibadan, Nigeria",
    color: "border-indigo-400",
    badge: "bg-indigo-50 text-indigo-600 border-indigo-200",
    points: [
      "Managing daily operations and documentation for international research teams",
      "Maintaining databases of 500+ records with 100% accuracy",
      "Coordinating meetings across multiple time zones for global stakeholders",
    ],
  },
  {
    role: "Email Marketing Specialist",
    company: "Kaizen Marketing",
    period: "Mar 2024 - Dec 2025",
    location: "Remote",
    color: "border-violet-400",
    badge: "bg-violet-50 text-violet-600 border-violet-200",
    points: [
      "Built and optimized Klaviyo automation flows: welcome series, abandoned cart, win-back, and post-purchase",
      "Designed pixel-perfect, mobile-responsive email templates in Figma",
      "Conducted advanced segmentation and A/B testing to improve open and click-through rates",
    ],
  },
  {
    role: "Virtual Assistant & Email Marketing Specialist",
    company: "Freelance - E-commerce & Real Estate Clients",
    period: "Jan 2024 - Present",
    location: "Remote",
    color: "border-emerald-400",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    points: [
      "Serving 5+ active clients with a 98% satisfaction rating across feedback and renewals",
      "Reduced daily admin workload for clients by 3-4 hours through optimized systems",
      "Building Klaviyo flows and pixel-perfect email templates with full brand consistency",
    ],
  },
  {
    role: "Program Coordinator & Administrative Manager",
    company: "Educational Services (Self-Employed)",
    period: "2021 - 2024",
    location: "Akure, Nigeria",
    color: "border-amber-400",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    points: [
      "Independently ran an educational program for 20+ clients weekly",
      "Maintained 100% client retention over 3 years through strong systems and communication",
    ],
  },
];

const achievements = [
  { stat: "98%", label: "Client satisfaction rating", icon: "⭐" },
  { stat: "5+", label: "Active freelance clients", icon: "🤝" },
  { stat: "3-4hrs", label: "Admin time saved per client daily", icon: "⚡" },
  { stat: "500+", label: "Database records at 99% accuracy", icon: "🗄️" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-950 text-white px-6 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-[-60px] right-[-40px] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

        <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-indigo-500/40 flex-shrink-0 shadow-2xl">
            <Image
              src="/charlie.jpg"
              alt="Charles Agboh"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-indigo-400 font-semibold text-sm mb-2 uppercase tracking-widest">
              About the author
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              Charles <span className="gradient-text">Agboh</span>
            </h1>
            <p className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-widest">
              Challyboi · Charlie · Ibadan, Nigeria
            </p>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              Email Marketing Specialist, Virtual Assistant, and automation builder with 3+ years of
              experience helping businesses grow through smart systems, high-converting email campaigns,
              and clean design. Now exploring AI and building in public through Bytes by Charlie.
            </p>

            {/* Role badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["Email Marketing", "Klaviyo Expert", "VA", "Automation Builder", "First Class Graduate"].map((b) => (
                <span key={b} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-300">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* Achievements */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {achievements.map((a) => (
            <div key={a.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center hover:shadow-md hover:border-indigo-100 transition-all">
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1 gradient-text">{a.stat}</div>
              <div className="text-slate-500 text-xs leading-snug">{a.label}</div>
            </div>
          ))}
        </section>

        {/* Story */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-lg">📖</span>
            My Story
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-100 rounded-2xl p-8 space-y-5 text-slate-600 leading-relaxed text-lg">
            <p>
              I graduated from the <span className="font-bold text-slate-800">Federal University of Technology, Akure (FUTA)</span> with
              a First Class Honours in Microbiology (GPA: 4.69/5.00). Not the typical path into tech - but it gave me something
              most people underestimate: the discipline to learn anything from scratch and the analytical mindset to actually understand it.
            </p>
            <p>
              I started my professional journey coordinating educational programs and administrative operations, then found
              my stride in <span className="font-bold text-slate-800">email marketing and automation</span>. Building Klaviyo flows,
              designing pixel-perfect templates in Figma, running A/B tests, managing client campaigns across
              e-commerce and real estate - this is where I built my core expertise.
            </p>
            <p>
              Today I work as an Email Marketing Specialist and VA for clients globally, while also serving as
              Administrative and Research Support Specialist at the <span className="font-bold text-slate-800">International Institute of
              Tropical Agriculture (IITA)</span> in Ibadan. And on the side, I am expanding into AI automation, n8n,
              and the broader tech world.
            </p>
            <p>
              Bytes by Charlie is where I document all of it - the marketing systems, the AI tools, the
              automation workflows, and the mindset shifts that come from being a builder at this particular moment
              in tech history.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-lg">💼</span>
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.role} className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm border-l-4 ${job.color} hover:shadow-md transition-all`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{job.role}</h3>
                    <p className="text-indigo-600 font-semibold text-sm">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${job.badge}`}>
                      {job.period}
                    </span>
                    <span className="text-xs text-slate-400">{job.location}</span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {job.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-500 text-sm leading-relaxed">
                      <span className="text-indigo-400 mt-0.5 flex-shrink-0">›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-lg">🎓</span>
            Education
          </h2>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-xl mb-1">
                B.Sc. Microbiology
              </h3>
              <p className="text-indigo-600 font-semibold">Federal University of Technology, Akure (FUTA)</p>
              <p className="text-slate-500 text-sm mt-1">2018 - 2024 · Akure, Nigeria</p>
            </div>
            <div className="flex flex-col items-center bg-white border border-indigo-200 rounded-2xl px-6 py-4 shadow-sm text-center">
              <span className="text-3xl font-extrabold gradient-text">4.69</span>
              <span className="text-slate-500 text-xs font-medium">GPA / 5.00</span>
              <span className="mt-2 text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                First Class Honours
              </span>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-lg">🛠️</span>
            Tools and Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border ${skill.color}`}
              >
                <span>{skill.icon}</span> {skill.name}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-sm mt-4">
            Also proficient in: ActiveCampaign, ConvertKit, Shopify, HubSpot, Salesforce, Zendesk,
            Slack, Trello, ClickUp, Monday.com, Zoom, Adobe Express
          </p>
        </section>

        {/* CTA */}
        <section className="bg-slate-950 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-extrabold mb-3">Let&apos;s Work Together</h2>
            <p className="text-slate-400 mb-2 max-w-md mx-auto leading-relaxed">
              Need a reliable Email Marketing Specialist or Virtual Assistant? I am open to remote opportunities.
            </p>
            <p className="text-slate-500 text-sm mb-8">
              charlesagboh99@gmail.com &nbsp;|&nbsp; +234 813 150 5041
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/blog"
                className="btn-glow bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                Read the Blog
              </Link>
              <Link
                href="/newsletter"
                className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
              >
                📬 Subscribe
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
