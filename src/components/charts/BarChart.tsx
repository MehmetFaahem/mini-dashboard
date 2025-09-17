"use client";
import { motion } from "framer-motion";

export type BarChartProps = {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
};

export default function BarChart({
  values,
  width = 300,
  height = 120,
  color = "var(--accent)",
}: BarChartProps) {
  const max = Math.max(...values, 1);
  const gap = 6;
  const barWidth = (width - gap * (values.length + 1)) / values.length;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="overflow-hidden w-full h-auto"
    >
      {values.map((v, i) => {
        const h = (v / max) * (height - 20);
        const x = gap + i * (barWidth + gap);
        const y = height - h;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={h}
            fill={color}
            initial={{ height: 0, y: height }}
            animate={{ height: h, y }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
              delay: i * 0.04,
            }}
            rx={4}
          />
        );
      })}
    </svg>
  );
}
