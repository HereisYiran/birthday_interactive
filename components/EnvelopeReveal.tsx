"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"

interface EnvelopeRevealProps {
  onEnvelopeOpened: () => void
}

export default function EnvelopeReveal({ onEnvelopeOpened }: EnvelopeRevealProps) {
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true)
    }
  }

  const handleContinue = () => {
    onEnvelopeOpened()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <div className="relative w-80 h-64 cursor-pointer" onClick={handleClick}>
        {/* Envelope base */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg shadow-xl"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
          }}
        />

        {/* Envelope flap */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200 rounded-t-lg origin-top"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          animate={{
            rotateX: isOpened ? -180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        />

        {/* Letter peeking out */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -10, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-x-4 top-8 bg-white rounded shadow-lg p-4"
            >
              <div className="h-32 bg-gradient-to-br from-pink-50 to-rose-50 rounded border-2 border-dashed border-pink-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOpened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg text-muted-foreground"
        >
          Click the envelope to open
        </motion.p>
      )}

      {isOpened && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Button onClick={handleContinue} size="lg">
            Continue
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

