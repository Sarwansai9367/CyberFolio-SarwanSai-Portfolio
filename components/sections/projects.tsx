"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { projectsData, type Project } from "@/lib/data"
import { ArrowRight, Github, X, ChevronRight, LayoutGrid, List } from "lucide-react"

const PROJECT_EMOJIS: Record<string, string> = {
  "CyberTrapX — Advanced Honeypot System": "🪤",
  "Wi-Fi Security Assessment Tool": "📡",
  "Team Healthcare Portal": "🏥",
  "IoT Security — Smart Device Attack Detection": "🌐",
  "Library Management System": "📚",
  "Faculty & Student Management System": "🎓",
  "Portfolio Website (Next.js)": "🌟",
  "Cyber Course — Educational Platform": "🎯",
  "Next.js Boilerplate": "⚡",
  "Java Academic Projects": "☕",
  "Deeptap — Android Data Collection APK": "📱",
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const emoji = PROJECT_EMOJIS[project.title] ?? "🛡️"

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="pm-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <style>{`
        .pm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(5,3,18,0.82);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: pm-fadein 0.2s ease;
        }
        @keyframes pm-fadein { from { opacity: 0 } to { opacity: 1 } }
        .pm-panel {
          background: rgba(15,10,40,0.98);
          border: 1px solid rgba(157,92,255,0.25);
          border-radius: 20px;
          width: 100%; max-width: 680px;
          max-height: 88vh;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(109,40,217,0.25), 0 0 120px rgba(34,211,238,0.06);
          animation: pm-slidein 0.22s cubic-bezier(.16,1,.3,1);
        }
        @keyframes pm-slidein { from { opacity:0; transform: translateY(24px) scale(0.97) } to { opacity:1; transform: none } }
        .pm-header {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 22px 24px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .pm-emoji-box {
          width: 52px; height: 52px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg, #0d0a22, #160930);
          border: 1px solid rgba(157,92,255,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 1.6rem;
        }
        .pm-close {
          margin-left: auto; flex-shrink: 0;
          width: 32px; height: 32px; cursor: pointer; border-radius: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.45); transition: background 0.15s, color 0.15s;
        }
        .pm-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .pm-body { overflow-y: auto; padding: 20px 24px 24px; flex: 1; }
        .pm-body::-webkit-scrollbar { width: 5px; }
        .pm-body::-webkit-scrollbar-track { background: transparent; }
        .pm-body::-webkit-scrollbar-thumb { background: rgba(157,92,255,0.3); border-radius: 3px; }
        .pm-section-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 10px; margin-top: 20px;
          display: flex; align-items: center; gap: 6px;
        }
        .pm-section-title:first-of-type { margin-top: 0; }
        .pm-list { display: flex; flex-direction: column; gap: 7px; margin: 0; padding: 0; list-style: none; }
        .pm-list li {
          display: flex; gap: 8px; align-items: flex-start;
          font-size: 12.5px; line-height: 1.6; color: rgba(226,232,240,0.72);
        }
        .pm-list li .pm-dot { flex-shrink: 0; margin-top: 5px; width: 5px; height: 5px; border-radius: 50%; }
        .pm-tag {
          display: inline-block; padding: 2px 9px; border-radius: 5px;
          font-size: 10px; font-weight: 600; font-family: monospace;
          background: rgba(157,92,255,0.12); border: 1px solid rgba(157,92,255,0.2); color: #c4b5fd;
        }
        .pm-impact {
          font-size: 12px; font-weight: 600; padding: 8px 14px; border-radius: 9px;
          background: rgba(34,211,238,0.07); border: 1px solid rgba(34,211,238,0.14); color: #67e8f9;
          margin-bottom: 20px;
        }
        .pm-footer {
          display: flex; gap: 10px; padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .pm-btn-gh {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 16px; border-radius: 10px; font-size: 12px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none;
          background: rgba(157,92,255,0.15); border: 1px solid rgba(157,92,255,0.3); color: #c4b5fd;
          transition: background 0.18s, box-shadow 0.18s;
        }
        .pm-btn-gh:hover { background: rgba(157,92,255,0.28); box-shadow: 0 0 18px rgba(157,92,255,0.25); }
        .pm-btn-close-footer {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 10px 16px; border-radius: 10px; font-size: 12px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45); transition: background 0.18s, color 0.18s;
        }
        .pm-btn-close-footer:hover { background: rgba(255,255,255,0.09); color: #fff; }
        .pm-role-badge {
          font-size: 11px; padding: 5px 11px; border-radius: 20px; display: inline-block;
          background: rgba(34,211,238,0.07); border: 1px solid rgba(34,211,238,0.14);
          color: rgba(226,232,240,0.6); margin-bottom: 14px;
        }
        @media (max-width: 640px) {
          .pm-panel { border-radius: 16px; }
          .pm-header { padding: 16px 16px 12px; }
          .pm-body { padding: 14px 16px 16px; }
          .pm-footer { padding: 12px 16px; }
        }
      `}</style>

      <div className="pm-panel">
        {/* Header */}
        <div className="pm-header">
          <div className="pm-emoji-box">{emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>{project.title}</div>
            <div style={{ fontSize: "12px", color: "#a78bfa", marginTop: 3 }}>{project.subtitle}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "10px", fontWeight: 600, padding: "2px 9px", borderRadius: 20,
                  background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)", color: "#67e8f9"
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: "10px", fontWeight: 600, padding: "2px 9px", borderRadius: 20,
                  background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", color: "#86efac"
                }}
              >
                📅 {project.duration}
              </span>
            </div>
          </div>
          <button className="pm-close" onClick={onClose} aria-label="Close modal">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="pm-body">
          {/* Role */}
          <div className="pm-role-badge">👤 {project.role}</div>

          {/* Impact */}
          <div className="pm-impact">✦ {project.impact}</div>

          {/* Tech Stack */}
          <div className="pm-section-title" style={{ color: "#a78bfa" }}>
            <ChevronRight size={12} /> Tech Stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {project.technologies.map((t) => <span key={t} className="pm-tag">{t}</span>)}
          </div>

          {/* Problem */}
          <div className="pm-section-title" style={{ color: "#f87171" }}>
            🔴 The Problem
          </div>
          <ul className="pm-list" style={{ marginBottom: 0 }}>
            {project.problem.map((p, i) => (
              <li key={i}>
                <span className="pm-dot" style={{ background: "#f87171" }} />
                {p}
              </li>
            ))}
          </ul>

          {/* Outcome */}
          <div className="pm-section-title" style={{ color: "#4ade80" }}>
            🟢 The Outcome
          </div>
          <ul className="pm-list" style={{ marginBottom: 0 }}>
            {project.outcome.map((o, i) => (
              <li key={i}>
                <span className="pm-dot" style={{ background: "#4ade80" }} />
                {o}
              </li>
            ))}
          </ul>

          {/* Key Contributions */}
          <div className="pm-section-title" style={{ color: "#67e8f9" }}>
            ⚡ Key Contributions
          </div>
          <ul className="pm-list">
            {project.keyContributions.map((k, i) => (
              <li key={i}>
                <span className="pm-dot" style={{ background: "#67e8f9" }} />
                {k}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pm-footer">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pm-btn-gh"
          >
            <Github size={14} /> View on GitHub
          </a>
          <button className="pm-btn-close-footer" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const closeModal = useCallback(() => setActiveProject(null), [])
  const [isListView, setIsListView] = useState(false)
  const layoutRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const animeRef = useRef<any>(null)
  const cardsAnimatedRef = useRef(false)

  // Dynamically import animejs (client-only, avoids SSR errors)
  useEffect(() => {
    let cancelled = false
    import("animejs").then((anime) => {
      if (cancelled) return
      animeRef.current = anime

      // Initialize layout animation
      try {
        if (containerRef.current) {
          layoutRef.current = anime.createLayout(containerRef.current, {
            children: '.gp-card',
            duration: 800,
          })
        }
      } catch (e) {
        console.warn('Layout animation init failed:', e)
      }

      // One-time heading fade-in (no loop, no aggressive bounce)
      try {
        if (headingRef.current) {
          const { chars } = anime.splitText(headingRef.current, { words: false, chars: true })
          anime.animate(chars, {
            opacity: [0, 1],
            translateY: [15, 0],
            delay: anime.stagger(20),
            duration: 400,
            ease: 'outExpo',
          })
        }
      } catch (e) {
        console.warn('Text animation init failed:', e)
      }
    }).catch((e) => {
      console.warn('Failed to load animejs:', e)
    })

    return () => {
      cancelled = true
      try { layoutRef.current?.revert() } catch { /* noop */ }
      layoutRef.current = null
    }
  }, [])

  // Scroll-triggered card animations
  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.gp-card')
    
    // Set initial state only if anime is available, otherwise keep visible
    if (animeRef.current && cards.length > 0) {
      cards.forEach((card) => {
        (card as HTMLElement).style.opacity = '0'
        ;(card as HTMLElement).style.transform = 'translateY(40px)'
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !cardsAnimatedRef.current) {
            cardsAnimatedRef.current = true
            
            if (animeRef.current && cards.length > 0) {
              try {
                animeRef.current.animate(cards, {
                  opacity: [0, 1],
                  translateY: [40, 0],
                  delay: animeRef.current.stagger(80),
                  duration: 600,
                  ease: 'outExpo',
                })
              } catch (e) {
                console.warn('Card animation failed:', e)
                // Fallback: show cards if animation fails
                cards.forEach((card) => {
                  (card as HTMLElement).style.opacity = '1'
                  ;(card as HTMLElement).style.transform = 'none'
                })
              }
            } else {
              // No anime.js available, just show cards
              cards.forEach((card) => {
                (card as HTMLElement).style.opacity = '1'
                ;(card as HTMLElement).style.transform = 'none'
              })
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animeRef.current])

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 overflow-hidden">
      <style>{`
        .gp-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 15px; padding: 18px;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          position: relative; overflow: hidden;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
          display: flex; flex-direction: column;
        }
        .gp-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(157,92,255,0.3), rgba(34,211,238,0.2), transparent);
        }
        .gp-card:hover {
          border-color: rgba(157,92,255,0.3);
          box-shadow: 0 0 30px rgba(109,40,217,0.1);
          transform: translateY(-4px);
        }
        .gp-thumb {
          width: 100%; aspect-ratio: 16/8; border-radius: 10px;
          background: linear-gradient(135deg, #0d0a22, #160930);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.75rem; margin-bottom: 14px; position: relative; overflow: hidden;
        }
        .gp-thumb::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(157,92,255,0.12), transparent 70%);
        }
        .gp-tag {
          display: inline-block; padding: 2px 9px; border-radius: 5px;
          font-size: 10px; font-weight: 600; font-family: monospace;
          background: rgba(157,92,255,0.12); border: 1px solid rgba(157,92,255,0.2); color: #c4b5fd;
        }
        .gp-impact {
          font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 8px;
          background: rgba(34,211,238,0.07); border: 1px solid rgba(34,211,238,0.14); color: #67e8f9;
          margin-bottom: 12px;
        }
        .gp-btn-p {
          flex: 1; text-align: center; padding: 8px 10px; border-radius: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; cursor: pointer; border: none; outline: none;
          background: rgba(157,92,255,0.15); border: 1px solid rgba(157,92,255,0.25); color: #c4b5fd;
          transition: background 0.18s, box-shadow 0.18s;
        }
        .gp-btn-p:hover { background: rgba(157,92,255,0.28); box-shadow: 0 0 14px rgba(157,92,255,0.25); }
        .gp-btn-s {
          flex: 1; text-align: center; padding: 8px 10px; border-radius: 8px;
          font-size: 11px; font-weight: 700; text-decoration: none; letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5); transition: background 0.18s, color 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .gp-btn-s:hover { background: rgba(255,255,255,0.09); color: #fff; }
        .gp-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 13px; font-size: 14px; font-weight: 700;
          letter-spacing: 0.03em; text-decoration: none; color: #fff;
          background: linear-gradient(135deg, #6d28d9, #9d5cff, #22d3ee);
          background-size: 200% 200%; animation: gradient-shift 4s ease infinite;
          box-shadow: 0 4px 24px rgba(109,40,217,0.38);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .gp-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(109,40,217,0.55); }
        @keyframes gradient-shift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        /* Layout view modes */
        .gp-grid.list-view {
          grid-template-columns: 1fr !important;
        }
        .gp-grid.list-view .gp-card {
          flex-direction: row; align-items: center; gap: 16px;
        }
        .gp-grid.list-view .gp-thumb {
          width: 80px; min-width: 80px; aspect-ratio: 1; margin-bottom: 0;
          font-size: 2rem; border-radius: 12px;
        }
        .gp-grid.list-view .gp-impact { margin-bottom: 0; }
        .gp-toggle-group {
          display: inline-flex; gap: 4px; padding: 3px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .gp-toggle-btn {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 6px 14px; border-radius: 8px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer;
          background: transparent; border: none; outline: none;
          color: rgba(255,255,255,0.4); transition: background 0.2s, color 0.2s;
        }
        .gp-toggle-btn.active {
          background: rgba(157,92,255,0.18); color: #c4b5fd;
          box-shadow: 0 0 12px rgba(157,92,255,0.15);
        }
        .gp-toggle-btn:hover:not(.active) {
          background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);
        }
        @media (max-width: 600px) {
          .gp-grid { grid-template-columns: 1fr !important; }
          .gp-grid.list-view .gp-card { flex-direction: column; }
          .gp-grid.list-view .gp-thumb { width: 100%; aspect-ratio: 16/8; }
        }
      `}</style>

      {/* Modal */}
      {activeProject && <ProjectModal project={activeProject} onClose={closeModal} />}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-eyebrow">Portfolio</span>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight"
            style={{ letterSpacing: '0.06em' }}
            suppressHydrationWarning
          >
            Building Through Experience
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(226,232,240,0.5)" }}>
            Real-world projects demonstrating expertise in cybersecurity, IoT, full-stack development, and mobile security.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-10" />

        {/* View Toggle Controls */}
        <div className="flex justify-end mb-5">
          <div className="gp-toggle-group">
            <button
              className={`gp-toggle-btn ${!isListView ? "active" : ""}`}
              onClick={() => {
                if (isListView) {
                  animeRef.current && layoutRef.current?.update(
                    ({ root }: { root: HTMLElement }) => root.classList.remove("list-view"),
                    { swapAt: { opacity: 0 } }
                  )
                  setIsListView(false)
                }
              }}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} /> Grid
            </button>
            <button
              className={`gp-toggle-btn ${isListView ? "active" : ""}`}
              onClick={() => {
                if (!isListView) {
                  animeRef.current && layoutRef.current?.update(
                    ({ root }: { root: HTMLElement }) => root.classList.add("list-view"),
                    { swapAt: { opacity: 0 } }
                  )
                  setIsListView(true)
                }
              }}
              aria-label="List view"
            >
              <List size={14} /> List
            </button>
          </div>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 gp-grid">
          {projectsData.map((project) => {
            const emoji = PROJECT_EMOJIS[project.title] ?? "🛡️"
            return (
              <div key={project.id} className="gp-card">
                <div className="gp-thumb">{emoji}</div>

                <div className="flex items-start justify-between mb-1">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="text-sm font-bold text-white leading-snug">{project.title}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: "#a78bfa" }}>{project.subtitle}</div>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                    style={{
                      background: "rgba(34,211,238,0.08)",
                      border: "1px solid rgba(34,211,238,0.15)",
                      color: "#67e8f9",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <p className="text-xs mt-2 mb-3" style={{ color: "rgba(226,232,240,0.52)", lineHeight: 1.65, flex: 1 }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((t) => <span key={t} className="gp-tag">{t}</span>)}
                </div>

                {/* Impact */}
                <div className="gp-impact">✦ {project.impact}</div>

                {/* Duration */}
                <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                  📅 {project.duration}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    className="gp-btn-p"
                    onClick={() => setActiveProject(project)}
                  >
                    View Details
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gp-btn-s"
                  >
                    <Github className="w-3 h-3" /> GitHub
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://github.com/sarwansai8"
            target="_blank"
            rel="noopener noreferrer"
            className="gp-cta-btn"
          >
            View All Projects on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
