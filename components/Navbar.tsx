"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <Logo size={30} />
            <span className="font-extrabold text-[15px] tracking-tight text-slate-900 dark:text-white">
              Bytes by Charlie
            </span>
          </Link>

          {/* Desktop centre links */}
          <ul className="hidden md:flex items-center gap-7 flex-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {isLoaded && !isSignedIn && (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:block text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1.5"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden md:block text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}

            {isLoaded && isSignedIn && (
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-8 h-8 ring-2 ring-indigo-100 dark:ring-indigo-900" },
                }}
              />
            )}

            <Link
              href="/newsletter"
              className="hidden md:block text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Subscribe
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-slate-950 shadow-2xl flex flex-col">

            {/* Panel header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 dark:border-slate-800">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                Navigation
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-4 py-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors mt-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9h-2.83a7.07 7.07 0 00-7.07-7.07V10.1z" />
                </svg>
                RSS Feed
              </a>
            </div>

            {/* Bottom actions */}
            <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              {isLoaded && !isSignedIn && (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg"
                  >
                    Sign up
                  </Link>
                </div>
              )}
              {isLoaded && isSignedIn && (
                <div className="flex items-center gap-3 px-2 py-1">
                  <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">Your account</span>
                </div>
              )}
              <Link
                href="/newsletter"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Subscribe to newsletter
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
