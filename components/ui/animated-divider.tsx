"use client"

import { useEffect, useRef } from "react"

interface AnimatedDividerProps {
  className?: string
}

export function AnimatedDivider({ className = "" }: AnimatedDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let cancelled = false
    
    // Intersection observer to animate when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !cancelled) {
            import("animejs").then((anime) => {
              if (cancelled || !svgRef.current) return
              
              try {
                const paths = svgRef.current.querySelectorAll('path')
                const drawables = anime.svg.createDrawable(paths)
                
                anime.animate(drawables, {
                  draw: ['0 0', '0 1', '1 1'],
                  ease: 'outExpo',
                  duration: 1500,
                  delay: anime.stagger(80),
                })
              } catch (e) {
                console.warn('Divider animation failed:', e)
              }
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 40"
      className={`w-full h-auto ${className}`}
      style={{ maxWidth: '800px', margin: '0 auto' }}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(157,92,255,0.3)" />
          <stop offset="50%" stopColor="rgba(34,211,238,0.5)" />
          <stop offset="100%" stopColor="rgba(157,92,255,0.3)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#dividerGrad)" strokeWidth="1.5" strokeLinecap="round">
        {/* Main circuit line */}
        <path d="M 0 20 L 180 20 L 200 10 L 220 20 L 280 20 M 280 20 L 300 25 L 320 20 L 520 20 M 520 20 L 540 15 L 560 20 L 620 20 L 640 30 L 660 20 L 800 20" />
        
        {/* Node circles */}
        <circle cx="200" cy="10" r="3" stroke="url(#dividerGrad)" fill="rgba(157,92,255,0.2)" />
        <circle cx="300" cy="25" r="3" stroke="url(#dividerGrad)" fill="rgba(34,211,238,0.2)" />
        <circle cx="540" cy="15" r="3" stroke="url(#dividerGrad)" fill="rgba(157,92,255,0.2)" />
        <circle cx="640" cy="30" r="3" stroke="url(#dividerGrad)" fill="rgba(34,211,238,0.2)" />
        
        {/* Branch lines */}
        <path d="M 200 10 L 200 5 M 300 25 L 300 30 M 540 15 L 540 10 M 640 30 L 640 35" />
      </g>
    </svg>
  )
}
