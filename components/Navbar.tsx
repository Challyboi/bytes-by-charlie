"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={36} />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Bytes by Charlie
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Tech · AI · Automation
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/newsletter"
            className="hidden md:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <span>📬</span> Subscribe
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/newsletter"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
            >
              📬 Subscribe to Newsletter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
