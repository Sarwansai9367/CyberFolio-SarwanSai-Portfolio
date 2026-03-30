"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"

interface DecryptTextProps {
    text: string
    className?: string
    speed?: number
    maxIterations?: number
}

export function DecryptText({
    text,
    className = "",
    speed = 50,
    maxIterations = 15
}: DecryptTextProps) {
    const [displayText, setDisplayText] = useState(text)
    const [isHovered, setIsHovered] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout>(null!)

    const scramble = () => {
        let iteration = 0

        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        return characters[Math.floor(Math.random() * characters.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(intervalRef.current)
            }

            iteration += 1 / 3
        }, speed)
    }

    useEffect(() => {
        scramble()
        return () => clearInterval(intervalRef.current)
    }, [text])

    return (
        <motion.span
            className={`font-mono inline-block cursor-default ${className}`}
            onHoverStart={() => {
                setIsHovered(true)
                scramble()
            }}
            onHoverEnd={() => setIsHovered(false)}
        >
            {displayText}
        </motion.span>
    )
}
