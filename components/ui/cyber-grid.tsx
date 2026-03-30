"use client"

import { useEffect, useRef } from "react"

export function CyberGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resize)
        resize()

        const draw = () => {
            time += 0.005
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const width = canvas.width
            const height = canvas.height
            const gap = 40

            ctx.strokeStyle = "rgba(99, 102, 241, 0.15)"
            ctx.lineWidth = 1

            // Perspective Grid
            for (let y = 0; y < height; y += gap) {
                // Horizontal lines moving down
                const offset = (y + time * 50) % gap

                ctx.beginPath()
                ctx.moveTo(0, y + offset)
                ctx.lineTo(width, y + offset)
                ctx.stroke()
            }

            for (let x = 0; x < width; x += gap) {
                // Vertical lines
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
        </div>
    )
}
