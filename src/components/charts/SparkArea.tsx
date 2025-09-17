"use client";
import { motion } from "framer-motion";

export type SparkAreaProps = {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

export default function SparkArea({
  values,
  width = 220,
  height = 64,
  stroke = "var(--accent)",
  fill = "color-mix(in oklab, var(--accent) 30%, transparent)",
}: SparkAreaProps) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const pad = 6;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w + pad;
    const y = height - pad - ((v - min) / (max - min || 1)) * h;
    return [x, y] as const;
  });
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`)
    .join(" ");
  const area = `${path} L${pad},${height - pad} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <motion.path
        d={area}
        fill={fill}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}
