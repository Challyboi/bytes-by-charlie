import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 mt-0">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Logo size={34} />
              <span className="font-extrabold text-white text-lg group-hover:text-indigo-400 transition-colors">
                Bytes by Charlie
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Tech insights, AI automation, and developer tools  -  written by Charles Agboh for developers who want to build smarter.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: "/resources", label: "Resources" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors link-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Topics</h4>
            <div className="flex flex-wrap gap-2">
              {["AI", "Automation", "JavaScript", "TypeScript", "React", "Next.js", "Git", "Tools"].map((t) => (
                <Link key={t} href="/blog"
                  className="text-xs bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-300 border border-white/10 px-3 py-1.5 rounded-lg transition-all">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} Charles Agboh · Bytes by Charlie</p>
          <p>Built with Next.js, MDX &amp; Tailwind CSS · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
