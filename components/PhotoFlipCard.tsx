"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Memory } from "@/content/memories"

interface PhotoFlipCardProps {
  memory: Memory
  isFlipped: boolean
  onFlip: () => void
}

export default function PhotoFlipCard({ memory, isFlipped, onFlip }: PhotoFlipCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className="w-full aspect-square cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front - Photo */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 flex items-center justify-center">
              <span className="text-4xl">📷</span>
            </div>
          ) : (
            <img
              src={memory.imgSrc}
              alt={`Memory ${memory.id}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Back - Text */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-sm md:text-base text-foreground text-center leading-relaxed">
            {memory.backText}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

