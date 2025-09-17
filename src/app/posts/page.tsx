"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";

type Post = { id: number; title: string; body: string };

export default function PostsPage() {
  const [simulateError, setSimulateError] = useState(false);
  const url = useMemo(
    () =>
      simulateError
        ? "https://jsonplaceholder.typicode.com/invalid-posts"
        : "https://jsonplaceholder.typicode.com/posts",
    [simulateError]
  );
  const { data, loading, error, refetch } = useFetch<Post[]>(url);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
         <div>
           <h1 className="text-xl font-semibold">Posts</h1>
           <p className="text-sm text-muted-foreground">
             Fetched from JSONPlaceholder
           </p>
         </div>
        <div className="flex items-center gap-2">
           <button
             className="text-xs rounded-md border border-white/15 px-2 py-1 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
            onClick={() => setSimulateError((v) => !v)}
          >
            {simulateError ? "Disable Error" : "Simulate Error"}
          </button>
           <button
             className="text-xs rounded-md border border-white/15 px-2 py-1 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
            onClick={() => refetch()}
          >
            Refetch
          </button>
        </div>
      </div>

      {loading && <div className="text-sm">Loading posts…</div>}
      {error && (
        <div className="text-sm text-red-600">
          Failed to load posts: {error}
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
         {(data || []).slice(0, 30).map((post, idx) => (
          <Card
            key={post.id}
            title={post.title}
            href={`/posts/${post.id}`}
            index={idx}
          >
            <p className="text-sm line-clamp-3 text-muted-foreground">
              {post.body}
            </p>
             <span className="text-xs underline mt-2 inline-block text-[var(--accent)]">
              Read more
            </span>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
