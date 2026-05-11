import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Bytes by Charlie",
    template: "%s | Bytes by Charlie",
  },
  description:
    "Tech insights, AI automation, and developer tools — written by Charles Agboh.",
  keywords: ["tech", "AI", "automation", "n8n", "Claude Code", "web development", "blog"],
  authors: [{ name: "Charles Agboh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bytes by Charlie",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
