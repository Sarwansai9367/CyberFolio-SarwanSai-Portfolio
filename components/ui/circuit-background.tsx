"use client"

import { useEffect, useRef } from "react"

export function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let cancelled = false
    
    setTimeout(() => {
      import("animejs").then((anime) => {
        if (cancelled || !svgRef.current) return
        
        try {
          const paths = svgRef.current.querySelectorAll('.circuit-path')
          const drawables = anime.svg.createDrawable(paths)
          
          anime.animate(drawables, {
            draw: ['0 0', '0 1', '1 1'],
            ease: 'linear',
            duration: 3000,
            delay: anime.stagger(150),
            loop: false,
          })
        } catch (e) {
          console.warn('Circuit background animation failed:', e)
        }
      })
    }, 500)

    return () => { cancelled = true }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity: 0.15 }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9d5cff" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#9d5cff" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#circuitGrad)" strokeWidth="0.5" strokeLinecap="round">
          {/* Top left circuit */}
          <path className="circuit-path" d="M 50 50 L 150 50 L 170 70 L 200 70 M 170 70 L 170 100" />
          <path className="circuit-path" d="M 100 100 L 100 150 L 150 150" />
          <circle cx="170" cy="70" r="4" stroke="url(#circuitGrad)" fill="none" />
          
          {/* Top right circuit */}
          <path className="circuit-path" d="M 800 80 L 700 80 L 680 100 L 650 100 M 680 100 L 680 130" />
          <path className="circuit-path" d="M 750 130 L 750 180 L 700 180" />
          <circle cx="680" cy="100" r="4" stroke="url(#circuitGrad)" fill="none" />
          
          {/* Middle circuit */}
          <path className="circuit-path" d="M 300 400 L 400 400 L 420 380 L 500 380 M 420 380 L 420 350" />
          <path className="circuit-path" d="M 450 350 L 450 300 L 500 300" />
          <circle cx="420" cy="380" r="4" stroke="url(#circuitGrad)" fill="none" />
          
          {/* Bottom left circuit */}
          <path className="circuit-path" d="M 100 600 L 200 600 L 220 620 L 250 620 M 220 620 L 220 650" />
          <path className="circuit-path" d="M 150 650 L 150 700 L 200 700" />
          <circle cx="220" cy="620" r="4" stroke="url(#circuitGrad)" fill="none" />
          
          {/* Bottom right circuit */}
          <path className="circuit-path" d="M 700 650 L 600 650 L 580 670 L 550 670 M 580 670 L 580 700" />
          <path className="circuit-path" d="M 650 700 L 650 750 L 600 750" />
          <circle cx="580" cy="670" r="4" stroke="url(#circuitGrad)" fill="none" />
        </g>
      </svg>
    </div>
  )
}
