"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export type CardProps = PropsWithChildren<{
  title?: ReactNode;
  href?: string;
  index?: number;
  className?: string;
}>;

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0, scale: 0.98 },
  show: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: i * 0.05,
    },
  }),
};

export function Card({
  title,
  href,
  index = 0,
  className,
  children,
}: CardProps) {
  const content = (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4 hover:shadow-[0_0_0_1px_var(--accent)]/20 hover:border-[var(--accent)]/40 transition-all ${
        className || ""
      }`}
    >
      {title ? (
        <div className="font-medium mb-1 line-clamp-1 text-[var(--accent)]">{title}</div>
      ) : null}
      {children}
    </motion.div>
  );
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

export default Card;
