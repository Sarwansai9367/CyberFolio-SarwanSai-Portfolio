"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
        const xPos = event.clientX - left
        const yPos = event.clientY - top

        // Calculate rotation based on mouse position
        // Center is (0,0), range is -1 to 1
        const xPct = (xPos / width - 0.5) * 2
        const yPct = (yPos / height - 0.5) * 2

        x.set(xPct)
        y.set(yPct)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-1, 1], [5, -5])
    const rotateY = useTransform(mouseX, [-1, 1], [-5, 5])

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(20px)" }} className="h-full">
                {children}
            </div>
        </motion.div>
    )
}
