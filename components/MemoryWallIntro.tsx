"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"

interface MemoryWallIntroProps {
  onOpenMemoryWall: () => void
}

export default function MemoryWallIntro({ onOpenMemoryWall }: MemoryWallIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary">
          📸 Memory Wall
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-md">
          Come to view our shared memories- click to see hidden messages
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Button onClick={onOpenMemoryWall} size="lg" className="text-lg px-8 py-6">
          View the Memory Wall
        </Button>
      </motion.div>
    </motion.div>
  )
}

