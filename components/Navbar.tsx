"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";

/* ── Desktop dropdown groups ───────────────────────────────── */
const dropdowns = [
  {
    label: "Content",
    links: [
      { href: "/blog", label: "Blog", desc: "All articles and tutorials", icon: "📝" },
      { href: "/resources", label: "Resources", desc: "Tools Charlie recommends", icon: "🔧" },
    ],
  },
  {
    label: "Topics",
    links: [
      { href: "/blog", label: "AI & Automation", desc: "Claude Code, n8n, agents", icon: "🤖" },
      { href: "/blog", label: "JavaScript", desc: "JS tips and patterns", icon: "⚡" },
      { href: "/blog", label: "Career", desc: "Dev career and mindset", icon: "🚀" },
      { href: "/blog", label: "Tools", desc: "Productivity and dev tools", icon: "🛠️" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "/newsletter", label: "Newsletter", desc: "Subscribe for weekly posts", icon: "📬" },
      { href: "/about", label: "About Charlie", desc: "Who writes this blog", icon: "👤" },
    ],
  },
];

/* ── Mobile accordion sections ─────────────────────────────── */
const sections = dropdowns;

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleSection = (label: string) =>
    setOpenSection((prev) => (prev === label ? null : label));

  const openDrop = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <Logo size={36} />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Bytes by Charlie
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Tech · AI · Automation
              </span>
            </div>
          </Link>

          {/* Desktop Nav with dropdowns */}
          <ul className="hidden md:flex items-center gap-1">
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/")
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Home
              </Link>
            </li>

            {/* Dropdown groups */}
            {dropdowns.map((group) => (
              <li key={group.label} className="relative"
                onMouseEnter={() => openDrop(group.label)}
                onMouseLeave={closeDrop}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeDropdown === group.label
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === group.label ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {activeDropdown === group.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    onMouseEnter={() => openDrop(group.label)}
                    onMouseLeave={closeDrop}
                  >
                    <div className="p-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item"
                        >
                          <span className="text-lg mt-0.5 flex-shrink-0">{link.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                              {link.label}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                              {link.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Bottom accent */}
                    <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Auth - desktop */}
            {isLoaded && !isSignedIn && (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden md:inline-flex items-center gap-1.5 bg-slate-900 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
            {isLoaded && isSignedIn && (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-indigo-200 dark:ring-indigo-800",
                  },
                }}
              />
            )}

            <Link
              href="/newsletter"
              className="hidden md:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <span>📬</span> Subscribe
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl flex flex-col overflow-y-auto">

            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <Logo size={28} />
                <span className="font-extrabold text-slate-900 dark:text-white text-base">Bytes by Charlie</span>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <Link href="/newsletter" onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                📬 Subscribe
              </Link>
              <a href="mailto:charlesagboh99@gmail.com" onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl">
                ✉️ Contact
              </a>
            </div>

            {/* Auth - mobile */}
            {isLoaded && !isSignedIn && (
              <div className="flex gap-3 px-6 py-3 border-b border-slate-100 dark:border-slate-800">
                <Link href="/sign-in" onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl">
                  Sign in
                </Link>
                <Link href="/sign-up" onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl">
                  Sign up
                </Link>
              </div>
            )}
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-100 dark:border-slate-800">
                <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Your account</span>
              </div>
            )}

            {/* Home link */}
            <div className="px-4 pt-3">
              <Link href="/" onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/" ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}>
                🏠 Home
              </Link>
            </div>

            {/* Expandable sections */}
            <div className="flex-1 px-4 py-2">
              {sections.map((section) => (
                <div key={section.label} className="mb-1">
                  <button
                    onClick={() => toggleSection(section.label)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <span>{section.label}</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === section.label ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openSection === section.label && (
                    <div className="ml-2 mt-1 mb-2 space-y-0.5">
                      {section.links.map((link) => (
                        <Link key={link.href + link.label} href={link.href} onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <span className="text-base">{link.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{link.label}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{link.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* RSS */}
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-orange-500 font-bold text-sm hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9h-2.83a7.07 7.07 0 00-7.07-7.07V10.1z" />
                </svg>
                RSS Feed
              </a>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 text-center">Tech · AI · Automation by Charlie</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
