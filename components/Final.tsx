"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

interface FinalProps {
  onReplay: () => void
}

export default function Final({ onReplay }: FinalProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowHeight, setWindowHeight] = useState(800)

  useEffect(() => {
    setWindowHeight(typeof window !== "undefined" ? window.innerHeight : 800)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative overflow-hidden"
    >
      {/* Simple confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF6B9D", "#C44569"][
                  Math.floor(Math.random() * 5)
                ],
              }}
              animate={{
                y: windowHeight + 20,
                x: (Math.random() - 0.5) * 100,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="space-y-6 z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          🎉 <br/> Happy Birthday <br/> 
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-md">
          From Your Friend
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 z-10"
      >
        <Button onClick={onReplay} size="lg" variant="outline" className="text-lg px-8 py-6">
          Replay
        </Button>
      </motion.div>
    </motion.div>
  )
}

