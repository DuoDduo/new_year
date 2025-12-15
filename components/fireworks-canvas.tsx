"use client"

import { useEffect, useRef } from "react"

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w: number, h: number, particles: number
    let chars: number[][][], current: number
    const duration = 4000
    const str = ["Happy", "New", "Year", "2026"]

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = window.innerWidth < 400 ? 55 : 99
    }

    const makeChar = (c: string): number[][] => {
      const tmp = document.createElement("canvas")
      const size = (tmp.width = tmp.height = w < 400 ? 200 : 300)
      const tmpCtx = tmp.getContext("2d")!
      tmpCtx.font = "bold " + size + "px Arial"
      tmpCtx.fillStyle = "white"
      tmpCtx.textBaseline = "middle"
      tmpCtx.textAlign = "center"
      tmpCtx.fillText(c, size / 2, size / 2)
      const char2 = tmpCtx.getImageData(0, 0, size, size)
      const char2particles: number[][] = []
      for (let i = 0; char2particles.length < particles; i++) {
        const x = size * Math.random()
        const y = size * Math.random()
        const offset = Number.parseInt(String(y)) * size * 4 + Number.parseInt(String(x)) * 4
        if (char2.data[offset]) char2particles.push([x - size / 2, y - size / 2])
      }
      return char2particles
    }

    const makeChars = (t: number) => {
      const actual = Number.parseInt(String(t / duration)) % str.length
      if (current === actual) return
      current = actual
      chars = [...str[actual]].map(makeChar)
    }

    const circle = (x: number, y: number, r: number) => {
      ctx.beginPath()
      ctx.ellipse(x, y, r, r, 0, 0, 6.283)
      ctx.fill()
    }

    const rocket = (x: number, y: number, id: number, t: number) => {
      ctx.fillStyle = "white"
      const r = 2 - 2 * t + Math.pow(t, 15 * t) * 16
      y = h - y * t
      circle(x, y, r)
    }

    const explosion = (pts: number[][], x: number, y: number, id: number, t: number) => {
      const dy = t * t * t * 20
      let r = Math.sin(id) * 1 + 3
      r = t < 0.5 ? (t + 0.5) * t * r : r - t * r
      ctx.fillStyle = `hsl(${id * 55}, 55%, 55%)`
      pts.forEach((xy, i) => {
        if (i % 20 === 0) ctx.fillStyle = `hsl(${id * 55}, 55%, ${55 + t * Math.sin(t * 55 + i) * 45}%)`
        circle(t * xy[0] + x, h - y + t * xy[1] + dy, r)
      })
    }

    const firework = (t: number, i: number, pts: number[][]) => {
      t -= i * 200
      const id = i + chars.length * Number.parseInt(String(t - (t % duration)))
      t = (t % duration) / duration
      let dx = ((i + 1) * w) / (1 + chars.length)
      dx += Math.min(0.33, t) * 100 * Math.sin(id)
      let dy = h * 0.5
      dy += Math.sin(id * 4547.411) * h * 0.1
      if (t < 0.33) {
        rocket(dx, dy, id, t * 3)
      } else {
        explosion(pts, dx, dy, id, Math.min(1, Math.max(0, t - 0.33) * 2))
      }
    }

    const render = (t: number) => {
      makeChars(t)
      requestAnimationFrame(render)
      ctx.fillStyle = "#00000010"
      ctx.fillRect(0, 0, w, h)
      chars.forEach((pts, i) => firework(t, i, pts))
    }

    resize()
    window.addEventListener("resize", resize)
    requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="fireworks-canvas" className="fixed top-0 left-0 z-0 pointer-events-none" />
}
