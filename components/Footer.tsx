import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💻</span>
          <span className="font-bold gradient-text">Bytes by Charlie</span>
        </div>

        <p className="text-sm text-slate-500 text-center">
          © {year} Charles Agboh · Built with Next.js &amp; ❤️
        </p>

        <nav className="flex gap-5 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link
            href="/blog"
            className="hover:text-indigo-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
