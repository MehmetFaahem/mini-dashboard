import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { auth } from "@/lib/auth";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header signedIn={!!session?.user} />
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
