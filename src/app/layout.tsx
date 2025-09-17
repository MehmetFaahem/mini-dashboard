import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Dashboard",
  description: "Next.js 15 dashboard test with Tailwind and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-black/5 dark:border-white/10 sticky top-0 bg-background/80 backdrop-blur z-20">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold">Mini Dashboard</Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/posts" className="hover:underline">Posts</Link>
                <Link href="/users" className="hover:underline">Users</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-8 flex-1">
            {children}
          </main>
          <footer className="border-t border-black/5 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
              Built with Next.js 15, Tailwind, and Framer Motion
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
