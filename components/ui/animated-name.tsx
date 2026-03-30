"use client"

import { useEffect, useRef } from "react"

export function AnimatedName() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let cancelled = false
    import("animejs").then((anime) => {
      if (cancelled || !svgRef.current) return
      
      try {
        const paths = svgRef.current.querySelectorAll('path')
        const drawables = anime.svg.createDrawable(paths)
        
        anime.animate(drawables, {
          draw: ['0 0', '0 1', '1 1'],
          ease: 'inOutQuad',
          duration: 2000,
          delay: anime.stagger(100),
        })
      } catch (e) {
        console.warn('SVG animation failed:', e)
      }
    })
    
    return () => { cancelled = true }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 280 100"
      className="w-full h-auto mb-2"
      style={{ maxWidth: '18rem' }}
      aria-label="SECURING TOMORROW, TODAY'S INNOVATION"
    >
      <defs>
        <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9d5cff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* SECURING */}
        <path d="M10 15 Q15 10 25 15 L20 20 Q15 15 10 15 M30 10 L30 20 M35 10 L45 10 L45 15 L35 15 M45 10 L45 20 M50 10 L50 20 L60 20 M65 10 L65 20 M70 10 L80 10 L80 15 L70 15 M70 20 L80 20 M85 10 L85 20 M90 10 L100 20 M90 20 L100 10 M105 10 Q110 8 115 10 L115 20 Q110 22 105 20 Z" />
        
        {/* TOMORROW */}
        <path d="M10 35 L30 35 M20 35 L20 50 M35 35 L35 50 Q40 52 45 50 L45 35 M50 40 L50 50 M50 40 Q55 38 60 40 M60 40 L60 50 Q55 52 50 50 M65 35 L65 50 Q70 52 75 50 L75 35 M80 35 L80 50 Q85 52 90 50 L90 35 M95 35 L95 50 M100 35 L110 35" />
        
        {/* TODAY'S */}
        <path d="M10 65 L30 65 M20 65 L20 80 M35 65 L35 80 Q40 82 45 80 L45 65 M50 65 L50 80 Q55 82 60 80 Q55 78 50 80 M65 70 L75 70 M70 65 L70 80 M80 65 L90 65 Q95 65 95 75 Q90 80 80 80" stroke="url(#nameGrad)" />

        {/* INNOVATION */}
        <path d="M110 65 L110 80 M115 65 L115 80 M120 65 L120 80 M125 65 L135 80 M135 65 L125 80 M140 65 L140 80 Q145 82 150 80 L150 65 M155 65 L165 65 L155 80 M170 65 L180 65 M175 65 L175 80 M185 65 L185 80 M190 65 L200 80 M200 65 L190 80" />
      </g>
    </svg>
  )
}
