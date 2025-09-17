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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-white/10 sticky top-0 bg-background/60 backdrop-blur-xl z-20">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold">
                <span className="bg-[var(--accent)]/15 text-[var(--accent)] px-2 py-1 rounded-md">Mini</span> Dashboard
              </Link>
              <nav className="flex items-center gap-1 text-sm">
                {[
                  { href: "/", label: "Home" },
                  { href: "/posts", label: "Posts" },
                  { href: "/users", label: "Users" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1 rounded-md hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-8 flex-1">
            {children}
          </main>
          <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
              Built with Next.js 15, Tailwind, and Framer Motion
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
