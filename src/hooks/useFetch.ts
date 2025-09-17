"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type FetchState<TData> = {
  data: TData | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<TData>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<TData>>({
    data: null,
    loading: true,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch(url, {
        ...(options || {}),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const json = (await response.json()) as TData;
      setState({ data: json, loading: false, error: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setState({ data: null, loading: false, error: message });
    }
  }, [url, options]);

  useEffect(() => {
    execute();
    return () => abortControllerRef.current?.abort();
  }, [execute]);

  return { ...state, refetch: execute } as const;
}
