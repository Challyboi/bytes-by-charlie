import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to Bytes by Charlie — tech, AI automation, and dev insights in your inbox.",
};

const perks = [
  { icon: "🤖", title: "AI & Automation", desc: "First to know about AI tools, workflows, and how to use them as a developer." },
  { icon: "🛠️", title: "Dev Tools & Tips", desc: "Practical tips, tools, and resources that actually make your workflow better." },
  { icon: "📝", title: "New Posts First", desc: "Every new article lands in your inbox before it spreads anywhere else." },
  { icon: "🚀", title: "Career Insights", desc: "How to grow, what to learn next, and how to stand out as a developer." },
];

export default function NewsletterPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-950 text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        <div className="absolute top-[-60px] right-[-40px] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">📬</div>
          <p className="text-indigo-400 font-semibold text-sm mb-3 uppercase tracking-widest">Free Newsletter</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Bytes worth{" "}
            <span className="gradient-text">reading.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-xl mx-auto">
            Join developers getting weekly insights on AI, automation, and modern web development — straight to their inbox.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
          What you&apos;ll get
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {perks.map((p) => (
            <div key={p.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-extrabold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Signup form */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <span>✅</span>
            <span>No spam. Unsubscribe anytime. Free forever.</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <span>🔒</span>
            <span>Your email stays private — never shared or sold.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
