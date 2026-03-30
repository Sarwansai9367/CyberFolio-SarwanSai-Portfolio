import React from "react"
import { educationData } from "@/lib/data"
import { GraduationCap } from "lucide-react"
// Server Component — no "use client" needed

const TL_ICONS: Record<number, string> = { 0: "🎓", 1: "📘", 2: "🏫" }
const TL_COLORS: Record<number, { accent: string; glow: string }> = {
  0: { accent: "#9d5cff", glow: "rgba(157,92,255,0.55)" },
  1: { accent: "#22d3ee", glow: "rgba(34,211,238,0.55)" },
  2: { accent: "#a78bfa", glow: "rgba(167,139,250,0.5)" },
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 overflow-hidden">
      <style>{`
        /* ── Timeline centre line ── */
        .edu-timeline { position: relative; }
        .edu-timeline::before {
          content: '';
          position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(157,92,255,0.6) 15%, rgba(34,211,238,0.5) 50%, rgba(157,92,255,0.6) 85%, transparent);
          transform: translateX(-50%);
        }

        /* ── Row grid ── */
        .edu-row {
          display: grid;
          grid-template-columns: 1fr 32px 1fr;
          column-gap: 28px;
          align-items: start;
          margin-bottom: 40px;
        }

        /* ── Dot ── */
        .edu-dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 3px solid #080612;
          margin-top: 22px; justify-self: center; position: relative; z-index: 1;
        }

        /* ── Card ── */
        .edu-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--card-accent, rgba(255,255,255,0.1));
          border-radius: 14px; padding: 18px 20px;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          position: relative; overflow: hidden;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .edu-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 28px var(--card-glow, rgba(157,92,255,0.1));
          border-color: var(--card-accent-hover, rgba(157,92,255,0.35)) !important;
        }
        .edu-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
        }

        .edu-card-empty { /* placeholder */ }

        /* ── Left/right placement ── */
        .edu-row-left  .edu-card  { grid-column: 1; }
        .edu-row-left  .edu-dot   { grid-column: 2; }
        .edu-row-left  .edu-card-empty { grid-column: 3; }

        .edu-row-right .edu-card-empty { grid-column: 1; }
        .edu-row-right .edu-dot        { grid-column: 2; }
        .edu-row-right .edu-card       { grid-column: 3; }

        /* ── Mobile collapse ── */
        @media (max-width: 640px) {
          .edu-timeline::before { left: 16px; }
          .edu-row {
            grid-template-columns: 32px 1fr;
            column-gap: 14px;
          }
          .edu-row-left  .edu-card,
          .edu-row-right .edu-card { grid-column: 2; }
          .edu-row-left  .edu-dot,
          .edu-row-right .edu-dot  { grid-column: 1; }
          .edu-card-empty { display: none; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-4xl px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Path
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Academic Journey
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.5)" }}>
            My educational path and passion for cybersecurity and technology.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-12" />

        {/* Timeline */}
        <div className="edu-timeline">
          {educationData.map((edu, index) => {
            const isRight = index % 2 === 0
            const rowClass = isRight ? "edu-row edu-row-right" : "edu-row edu-row-left"
            const icon = TL_ICONS[index] ?? "🎓"
            const color = TL_COLORS[index] ?? TL_COLORS[0]

            return (
              <div key={edu.id} className={rowClass}>
                <div className="edu-card-empty" />

                {/* Timeline dot */}
                <div
                  className="edu-dot"
                  style={{
                    background: color.accent,
                    boxShadow: `0 0 14px ${color.glow}`,
                  }}
                />

                {/* Card */}
                <div
                  className="edu-card"
                  style={{
                    /* CSS custom properties for per-entry color theming */
                    ["--card-accent" as string]: `${color.accent}22`,
                    ["--card-glow" as string]: color.glow.replace("0.55", "0.12"),
                    ["--card-accent-hover" as string]: `${color.accent}55`,
                  } as React.CSSProperties}
                >
                  {/* Top shimmer */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${color.accent}55, transparent)` }}
                  />

                  {/* Year/location */}
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"
                    style={{ color: color.accent, letterSpacing: "0.1em" }}
                  >
                    <span>{icon}</span>
                    {edu.institution} · {edu.duration}
                  </div>

                  {/* Degree */}
                  <div className="text-sm font-black text-white mb-0.5">{edu.degree}</div>

                  {/* Location pill */}
                  <div
                    className="inline-flex items-center gap-1 text-xs font-medium mb-3 px-2 py-0.5 rounded-full"
                    style={{ background: `${color.accent}12`, border: `1px solid ${color.accent}22`, color: color.accent }}
                  >
                    📍 {edu.location}
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(226,232,240,0.55)" }}>
                    {edu.description}
                  </p>

                  {/* Grade badge */}
                  {edu.grade && (
                    <div
                      className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: `${color.accent}12`,
                        border: `1px solid ${color.accent}28`,
                        color: color.accent,
                      }}
                    >
                      🏆 {edu.grade}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
