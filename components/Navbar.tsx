"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const sections = [
  {
    label: "Content",
    links: [
      { href: "/blog", label: "Blog", desc: "All articles and tutorials" },
      { href: "/resources", label: "Resources", desc: "Tools and links Charlie recommends" },
    ],
  },
  {
    label: "Topics",
    links: [
      { href: "/blog?tag=ai", label: "AI & Automation", desc: "Claude Code, n8n, agents" },
      { href: "/blog?tag=javascript", label: "JavaScript", desc: "JS tips and patterns" },
      { href: "/blog?tag=career", label: "Career", desc: "Dev career and mindset" },
      { href: "/blog?tag=tools", label: "Tools", desc: "Productivity and dev tools" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "/newsletter", label: "Newsletter", desc: "Subscribe for weekly posts" },
      { href: "/about", label: "About Charlie", desc: "Who writes this blog" },
    ],
  },
];

const desktopLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleSection = (label: string) =>
    setOpenSection((prev) => (prev === label ? null : label));

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
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

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {desktopLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel slides in from right */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl flex flex-col overflow-y-auto">

            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <Logo size={28} />
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  Bytes by Charlie
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <Link
                href="/newsletter"
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                📬 Subscribe
              </Link>
              <a
                href="mailto:charlesagboh99@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                ✉️ Contact
              </a>
            </div>

            {/* Expandable sections */}
            <div className="flex-1 px-4 py-3">
              {sections.map((section) => (
                <div key={section.label} className="mb-1">
                  <button
                    onClick={() => toggleSection(section.label)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <span>{section.label}</span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        openSection === section.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openSection === section.label && (
                    <div className="ml-2 mt-1 mb-2 space-y-0.5">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex flex-col px-4 py-3 rounded-xl transition-colors ${
                            isActive(link.href)
                              ? "bg-indigo-50 dark:bg-indigo-950"
                              : "hover:bg-slate-50 dark:hover:bg-slate-900"
                          }`}
                        >
                          <span className={`text-sm font-semibold ${
                            isActive(link.href)
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-800 dark:text-slate-200"
                          }`}>
                            {link.label}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* RSS link */}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-orange-500 font-bold text-sm hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors mt-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9h-2.83a7.07 7.07 0 00-7.07-7.07V10.1z" />
                </svg>
                RSS Feed
              </a>
            </div>

            {/* Bottom branding */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 text-center">
                Tech · AI · Automation by Charlie
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
