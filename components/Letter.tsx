"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { letterText } from "@/content/letter"

interface LetterProps {
  onNext: () => void
}

export default function Letter({ onNext }: LetterProps) {
  const paragraphs = letterText.split(new RegExp("\n\\s*\n"))


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-amber-100"
      >
        <div className="space-y-4 text-foreground">
          {paragraphs.map((paragraphs, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="text-base md:text-lg leading-relaxed whitespace-pre-wrap"
            >
              {paragraphs}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Button onClick={onNext} size="lg">
          Next
        </Button>
      </motion.div>
    </motion.div>
  )
}

