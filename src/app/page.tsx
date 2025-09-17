"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground">
            Here is a quick summary of your dashboard.
          </p>
        </div>
        <Link
          href="/posts"
          className="text-sm px-3 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
        >
          Go to Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Visitors", value: "12.4k" },
          { label: "Signups", value: "1,082" },
          { label: "Revenue", value: "$24.2k" },
          { label: "Bounce", value: "32%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.05 * index,
            }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
          >
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-2xl font-semibold mt-1 text-[var(--accent)]">
              {stat.value}
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${50 + index * 10}%` }}
              transition={{ duration: 0.8, delay: 0.05 * index }}
              className="h-1 mt-3 rounded bg-[var(--accent)]/40"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
