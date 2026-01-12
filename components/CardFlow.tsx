"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Landing from "./Landing"
import EnvelopeReveal from "./EnvelopeReveal"
import Letter from "./Letter"
import MemoryWallIntro from "./MemoryWallIntro"
import MemoryWall from "./MemoryWall"
import Final from "./Final"
import AnimatedBackground from "./AnimatedBackground"
import CursorParticles from "./CursorParticles"



type Step = 0 | 1 | 2 | 3 | 4 | 5

export default function CardFlow() {
  const [step, setStep] = useState<Step>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleTransition = (nextStep: Step) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setStep(nextStep)
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const handleReplay = () => {
    handleTransition(0)
  }

  return (
 <div className="relative min-h-screen flex items-center justify-center p-4">
    {/* 最底层：渐变 / aurora */}
    <AnimatedBackground />

    {/* 中间层：光点粒子 */}
    <CursorParticles />

    {/* 最上层：卡片内容 */}
    <div className="relative z-10 w-full max-w-md md:max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8">
      {/* CardFlow 内容 */}
      <AnimatePresence mode="wait">
          {step === 0 && (
            <Landing key="landing" onOpen={() => handleTransition(1)} />
          )}
          {step === 1 && (
            <EnvelopeReveal
              key="envelope"
              onEnvelopeOpened={() => handleTransition(2)}
            />
          )}
          {step === 2 && (
            <Letter key="letter" onNext={() => handleTransition(3)} />
          )}
          {step === 3 && (
            <MemoryWallIntro
              key="memory-intro"
              onOpenMemoryWall={() => handleTransition(4)}
            />
          )}
          {step === 4 && (
            <MemoryWall key="memory-wall" onFinish={() => handleTransition(5)} />
          )}
          {step === 5 && <Final key="final" onReplay={handleReplay} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

