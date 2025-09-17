"use client";
import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
}>;

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[var(--accent)]/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[92vw] max-w-lg rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {title ? (
                  <h3 className="text-lg font-semibold text-[var(--accent)]">{title}</h3>
                ) : null}
              </div>
              <button
                onClick={onClose}
                className="text-xs px-2 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
              >
                Close
              </button>
            </div>
            <div className="mt-3 text-sm">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
