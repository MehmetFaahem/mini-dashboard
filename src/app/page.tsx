"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SparkArea from "@/components/charts/SparkArea";
import BarChart from "@/components/charts/BarChart";

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
            <motion.div className="mt-3">
              <SparkArea values={[8, 12, 10, 14, 18, 16, 22, 20, 24]} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
        >
          <div className="text-sm font-medium">Weekly Signups</div>
          <div className="text-xs text-muted-foreground">Performance over time</div>
          <div className="mt-2">
            <BarChart values={[3, 5, 2, 6, 8, 5, 7, 9, 6, 10, 8, 12]} />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
        >
          <div className="text-sm font-medium">Revenue Trend</div>
          <div className="text-xs text-muted-foreground">Last 30 days</div>
          <div className="mt-2">
            <SparkArea values={[120, 140, 135, 150, 170, 180, 210, 200, 230, 260, 250, 290]} width={360} />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
        >
          <div className="text-sm font-medium">Engagement</div>
          <div className="text-xs text-muted-foreground">CTR vs. Sessions</div>
          <div className="mt-2">
            <BarChart values={[12, 10, 14, 9, 16, 13, 18, 15]} width={360} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
