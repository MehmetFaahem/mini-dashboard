"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/users", label: "Users" },
    { href: "/profile", label: "Profile" },
  ];
  return (
    <header className="border-b border-white/10 sticky top-0 bg-background/60 backdrop-blur-xl z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold flex items-center gap-2">
          <span className="bg-[var(--accent)]/15 text-[var(--accent)] px-2 py-1 rounded-md">
            Mini
          </span>
          <span>Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1 rounded-md hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {signedIn ? (
              <Link
                href="/api/auth/signout"
                className="px-3 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
              >
                Sign out
              </Link>
            ) : (
              <Link
                href="/api/auth/signin?callbackUrl=/profile"
                className="px-3 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
              >
                Sign in
              </Link>
            )}
          </nav>
          <button
            className="sm:hidden inline-flex items-center justify-center rounded-md border border-white/15 px-2 py-1 text-sm hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="sm:hidden border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {signedIn ? (
                <Link
                  href="/api/auth/signout"
                  className="px-3 py-2 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign out
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin?callbackUrl=/profile"
                  className="px-3 py-2 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
