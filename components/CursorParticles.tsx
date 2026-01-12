"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
}

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const particles: Particle[] = []

    // ⭐⭐⭐ 核心调参区 ⭐⭐⭐
    const DENSITY = 0.00018 // 每像素粒子密度（越大越密）
    const COUNT = Math.floor(width * height * DENSITY) // 自适应屏幕
    const ATTRACT_RADIUS = 180
    const ATTRACT_STRENGTH = 10
    const RETURN_FORCE = 0.0018
    const FRICTION = 0.90

    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("mousemove", onMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < ATTRACT_RADIUS) {
          const force = Math.min(
            ATTRACT_STRENGTH / (dist + 12),
            2.5
          )
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // 回到原位（“弹性”）
        p.vx += (p.ox - p.x) * RETURN_FORCE
        p.vy += (p.oy - p.y) * RETURN_FORCE

        // 阻尼
        p.vx *= FRICTION
        p.vy *= FRICTION

        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.9, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 120, 160, 0.28)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  )
}

