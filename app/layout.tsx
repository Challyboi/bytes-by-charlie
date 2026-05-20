import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingButtons from "@/components/FloatingButtons";
import ChatWidget from "@/components/ChatWidget";
import { ClerkProvider } from "@clerk/nextjs";

const SITE_URL = "https://bytes-by-charlie.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bytes by Charlie",
    template: "%s | Bytes by Charlie",
  },
  description:
    "Tech insights, AI automation, and developer tools - written by Charles Agboh.",
  keywords: [
    "tech",
    "AI",
    "automation",
    "n8n",
    "Claude Code",
    "web development",
    "blog",
    "email marketing",
    "Klaviyo",
  ],
  authors: [{ name: "Charles Agboh", url: SITE_URL }],
  creator: "Charles Agboh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bytes by Charlie",
    title: "Bytes by Charlie",
    description:
      "Tech insights, AI automation, and developer tools by Charles Agboh.",
    images: [
      {
        url: "/charlie.jpg",
        width: 800,
        height: 800,
        alt: "Bytes by Charlie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bytes by Charlie",
    description:
      "Tech insights, AI automation, and developer tools by Charles Agboh.",
    images: ["/charlie.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "CWZmlYYd0JiWOl0kaWFzGD0v53YhmMknsLu68KDb788",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingButtons />
            <ChatWidget />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
