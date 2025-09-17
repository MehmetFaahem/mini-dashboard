"use client";
import { use, useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import Card from "@/components/Card";
import Link from "next/link";

type Post = { id: number; title: string; body: string };

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const url = useMemo(
    () => `https://jsonplaceholder.typicode.com/posts/${id}`,
    [id]
  );
  const { data, loading, error, refetch } = useFetch<Post>(url);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Post #{id}</h1>
        <div className="flex items-center gap-2">
          <Link href="/posts" className="text-xs underline">
            Back to Posts
          </Link>
          <button
            className="text-xs rounded border px-2 py-1 hover:bg-foreground/5"
            onClick={() => refetch()}
          >
            Refetch
          </button>
        </div>
      </div>
      {loading && <div className="text-sm">Loading…</div>}
      {error && (
        <div className="text-sm text-red-600">Failed to load post: {error}</div>
      )}
      {data && (
        <Card title={data.title}>
          <p className="text-sm whitespace-pre-line">{data.body}</p>
        </Card>
      )}
    </div>
  );
}
