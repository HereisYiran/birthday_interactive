"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"

interface LandingProps {
  onOpen: () => void
}

export default function Landing({ onOpen }: LandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          一周年快乐 🎉
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          点开这封为你准备的信
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onOpen}
          size="lg"
          className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          打开
        </Button>
      </motion.div>
    </motion.div>
  )
}

