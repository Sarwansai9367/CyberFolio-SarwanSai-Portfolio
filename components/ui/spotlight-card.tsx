"use client"

import { useRef, useState, type MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(99, 102, 241, 0.25)",
}: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            className={cn(
                "group relative border border-white/10 bg-card/50 overflow-hidden rounded-xl",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative">{children}</div>
        </div>
    )
}
