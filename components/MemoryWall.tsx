"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import PhotoFlipCard from "./PhotoFlipCard"
import { memories } from "@/content/memories"

interface MemoryWallProps {
  onFinish: () => void
}

export default function MemoryWall({ onFinish }: MemoryWallProps) {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set())

  const handleFlip = (id: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary"
      >
        Our Memories
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <PhotoFlipCard
              memory={memory}
              isFlipped={flippedIds.has(memory.id)}
              onFlip={() => handleFlip(memory.id)}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <Button onClick={onFinish} size="lg">
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}

