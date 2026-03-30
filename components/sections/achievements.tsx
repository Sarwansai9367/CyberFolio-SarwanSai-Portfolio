import React from "react"
import { achievementsData } from "@/lib/data"
import { Award, ExternalLink } from "lucide-react"

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 overflow-hidden">
      <style>{`
        /* ── Achievement Grid ── */
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        /* ── Card ── */
        .ach-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--card-accent, rgba(255,255,255,0.1));
          border-radius: 14px; 
          padding: 22px 24px;
          backdrop-filter: blur(16px); 
          -webkit-backdrop-filter: blur(16px);
          position: relative; 
          overflow: hidden;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .ach-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 32px var(--card-glow, rgba(157,92,255,0.15));
          border-color: var(--card-accent-hover, rgba(157,92,255,0.4)) !important;
        }

        /* ── Icon container ── */
        .ach-icon {
          width: 48px; 
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 24px;
          margin-bottom: 14px;
          transition: transform 0.2s ease;
        }
        .ach-card:hover .ach-icon {
          transform: scale(1.1);
        }

        /* ── Category badge ── */
        .ach-category {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        /* ── Link button ── */
        .ach-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          margin-top: 12px;
        }
        .ach-link:hover {
          transform: translateX(3px);
        }

        /* ── Mobile adjustments ── */
        @media (max-width: 640px) {
          .ach-grid {
            grid-template-columns: 1fr;
          }
          .ach-card {
            padding: 18px 20px;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">
            <Award className="w-3.5 h-3.5" />
            Recognition & Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Achievements
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.5)" }}>
            Certifications, awards, and recognitions that mark my journey in cybersecurity.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-12" />

        {/* Achievements Grid */}
        <div className="ach-grid">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="ach-card"
              style={{
                ["--card-accent" as string]: `${achievement.accent}22`,
                ["--card-glow" as string]: `${achievement.accent}20`,
                ["--card-accent-hover" as string]: `${achievement.accent}55`,
              } as React.CSSProperties}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${achievement.accent}55, transparent)` }}
              />

              {/* Icon */}
              <div
                className="ach-icon"
                style={{
                  background: `${achievement.accent}15`,
                  border: `1px solid ${achievement.accent}30`,
                }}
              >
                {achievement.icon}
              </div>

              {/* Category badge */}
              <div
                className="ach-category"
                style={{
                  background: `${achievement.accent}12`,
                  border: `1px solid ${achievement.accent}25`,
                  color: achievement.accent,
                }}
              >
                {achievement.category}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-1">
                {achievement.title}
              </h3>

              {/* Issuer & Date */}
              <div
                className="text-xs font-medium mb-3 flex items-center gap-2"
                style={{ color: achievement.accent }}
              >
                <span>{achievement.issuer}</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>{achievement.date}</span>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(226,232,240,0.6)" }}
              >
                {achievement.description}
              </p>

              {/* Link (if available) */}
              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ach-link"
                  style={{
                    background: `${achievement.accent}15`,
                    border: `1px solid ${achievement.accent}30`,
                    color: achievement.accent,
                  }}
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Certifications", value: "3+", icon: "📜" },
            { label: "Awards Won", value: "2+", icon: "🏆" },
            { label: "CTF Competitions", value: "5+", icon: "🎯" },
            { label: "Active Memberships", value: "2+", icon: "🎖️" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs" style={{ color: "rgba(226,232,240,0.5)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
