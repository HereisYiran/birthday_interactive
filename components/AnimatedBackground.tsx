"use client"

import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50" />

      {/* Moving blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-rose-300/30 blur-3xl"
        animate={{ x: [0, 90, -40, 0], y: [0, 60, 110, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-28 h-[520px] w-[520px] rounded-full bg-fuchsia-300/25 blur-3xl"
        animate={{ x: [0, -120, 30, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 left-1/4 h-[520px] w-[520px] rounded-full bg-amber-300/20 blur-3xl"
        animate={{ x: [0, 120, -60, 0], y: [0, -70, 60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain / noise (CSS-only) */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  )
}
