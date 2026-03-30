"use client"

import { useState } from "react"
import { skillsData } from "@/lib/data"

const SKILL_ICONS: Record<string, string> = {
  "Network Security": "🕸️",
  "Web Development": "🌐",
  "Ethical Hacking": "🔒",
  "Cloud Security": "☁️",
  "Application Security": "🛡️",
  "DevSecOps & Containers": "🐳",
}

const FEATURED_PROJECTS = [
  {
    id: "1", emoji: "🪤",
    name: "CyberTrapX — Advanced Honeypot System",
    sub: "Cybersecurity · Threat Intelligence",
    desc: "Deployed decoy servers to lure and log attackers; achieved 95% accurate attack classification using ML models trained on real-world threat data.",
    tags: ["Python", "Flask", "ML", "Threat Intel", "Logging"],
    github: "https://github.com/sarwansai8/Advanced-Multi-Layered-Honeypot-System",
  },
  {
    id: "2", emoji: "📡",
    name: "Wi-Fi Security Assessment Tool",
    sub: "Network Security · Ethical Hacking",
    desc: "Automated Wi-Fi vulnerability scanner detecting WEP/WPA weaknesses, rogue APs, and de-auth attacks with a real-time visual dashboard.",
    tags: ["Python", "Scapy", "Wireshark", "Kali Linux"],
    github: "https://github.com/sarwansai8/wifi-security-tool",
  },
  {
    id: "3", emoji: "📱",
    name: "Deeptap — Android Data Collection APK",
    sub: "Mobile Security · Android",
    desc: "Stealth APK for ethical data collection and security research, with encrypted local storage and secure C2 communication.",
    tags: ["Java", "Android SDK", "AES", "SQLite"],
    github: "https://github.com/sarwansai8/deeptap_stealth_android_data_collection_apk",
  },
  {
    id: "4", emoji: "🏥",
    name: "Team Healthcare Portal",
    sub: "Full-Stack · Healthcare",
    desc: "HIPAA-compliant portal enabling secure patient–doctor communication, appointment scheduling, and encrypted medical record management.",
    tags: ["React", "Node.js", "MongoDB", "JWT", "HTTPS"],
    github: "https://github.com/sarwansai8/Team",
  },
]

export function Skills() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <style>{`
        /* ── Scanline overlay ── */
        .skills-tint::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(0deg,rgba(0,0,0,0.045) 0px,rgba(0,0,0,0.045) 1px,transparent 1px,transparent 2px);
        }

        /* ── Section title bar ── */
        .sk-section-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: #22d3ee; margin-bottom: 18px;
        }
        .sk-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(34,211,238,0.2); }

        /* ── Skill card ── */
        .sk-card {
          background: rgba(8,20,38,0.65);
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 11px; padding: 14px 16px; margin-bottom: 10px;
          backdrop-filter: blur(12px);
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .sk-card:hover {
          border-color: rgba(34,211,238,0.4);
          box-shadow: 0 0 22px rgba(34,211,238,0.07);
          transform: translateX(3px);
        }
        .sk-bar-bg {
          height: 4px; border-radius: 99px;
          background: rgba(34,211,238,0.08); overflow: hidden; margin: 8px 0;
        }
        .sk-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #22d3ee, #9d5cff);
          box-shadow: 0 0 10px rgba(34,211,238,0.5);
          transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .sk-toggle {
          display: inline-block; padding: 3px 11px; border-radius: 5px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #22d3ee; border: 1px solid rgba(34,211,238,0.2);
          background: transparent; cursor: pointer; transition: background 0.18s, box-shadow 0.18s;
        }
        .sk-toggle:hover { background: rgba(34,211,238,0.08); box-shadow: 0 0 8px rgba(34,211,238,0.15); }
        .sk-tool-tag {
          display: inline-block; padding: 2px 8px; border-radius: 4px;
          font-size: 10px; font-weight: 600; font-family: monospace;
          background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.18); color: #67e8f9;
        }

        /* ── Project card ── */
        .feat-card {
          background: rgba(8,20,38,0.65);
          border: 1px solid rgba(34,211,238,0.1);
          border-radius: 11px; padding: 14px;
          margin-bottom: 11px; display: grid;
          grid-template-columns: 100px 1fr; gap: 12px;
          backdrop-filter: blur(12px);
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .feat-card:hover { border-color: rgba(34,211,238,0.38); box-shadow: 0 0 20px rgba(34,211,238,0.06); }
        .feat-thumb {
          border-radius: 7px; aspect-ratio: 16/10;
          background: linear-gradient(135deg, #0a1628, #0e2244);
          border: 1px solid rgba(34,211,238,0.12);
          display: flex; align-items: center; justify-content: center; font-size: 24px;
        }
        .feat-tag {
          display: inline-block; padding: 2px 7px; border-radius: 4px;
          font-size: 10px; font-weight: 600; font-family: monospace;
          background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.18); color: #67e8f9;
        }
        .feat-btn-p {
          padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none;
          color: #080612; background: #22d3ee;
          transition: box-shadow 0.18s, opacity 0.18s;
        }
        .feat-btn-p:hover { box-shadow: 0 0 14px rgba(34,211,238,0.5); opacity: 0.9; }
        .feat-btn-s {
          padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none;
          color: #22d3ee; border: 1px solid rgba(34,211,238,0.2); transition: background 0.18s;
        }
        .feat-btn-s:hover { background: rgba(34,211,238,0.09); }

        @media (max-width: 720px) {
          .skills-two-col { grid-template-columns: 1fr !important; }
          .feat-card { grid-template-columns: 1fr; }
          .feat-thumb { aspect-ratio: 16/6; font-size: 2rem; }
        }
      `}</style>

      {/* Tint overlay */}
      <div className="absolute inset-0 skills-tint" style={{ background: "rgba(4,8,18,0.6)", zIndex: 0 }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-eyebrow">Technical Arsenal</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Skills &amp; Expertise
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(207,232,255,0.5)" }}>
            A comprehensive toolkit built through hands-on projects in cybersecurity, full-stack development, and cloud infrastructure.
          </p>
        </div>

        {/* Section divider */}
        <div className="section-divider mb-10" />

        {/* Two-column grid */}
        <div className="grid gap-8 skills-two-col" style={{ gridTemplateColumns: "1fr 1.35fr" }}>

          {/* LEFT — Skills */}
          <div>
            <div className="sk-section-title">Skills &amp; Expertise</div>
            {skillsData.map((skill) => (
              <div key={skill.id} className="sk-card">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center rounded-lg text-sm"
                      style={{ width: 32, height: 32, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.18)" }}
                    >
                      {SKILL_ICONS[skill.name] ?? "⚙️"}
                    </div>
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold font-mono" style={{ color: "#22d3ee" }}>{skill.level}%</span>
                </div>
                <div className="sk-bar-bg">
                  <div className="sk-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <button className="sk-toggle" onClick={() => setExpanded(expanded === skill.id ? null : skill.id)}>
                    {expanded === skill.id ? "▲ Close" : "▼ Details"}
                  </button>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{skill.category}</span>
                </div>
                {expanded === skill.id && (
                  <div className="mt-3 pt-3 animate-fade-in-up" style={{ borderTop: "1px solid rgba(34,211,238,0.1)" }}>
                    <p className="text-xs mb-2" style={{ color: "rgba(207,232,255,0.55)", lineHeight: 1.6 }}>{skill.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tools.map((t) => <span key={t} className="sk-tool-tag">{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — Featured Projects */}
          <div>
            <div className="sk-section-title">Featured Projects</div>
            {FEATURED_PROJECTS.map((p) => (
              <div key={p.id} className="feat-card">
                <div className="feat-thumb">{p.emoji}</div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">{p.name}</div>
                    <div className="text-xs font-semibold mb-1.5" style={{ color: "#22d3ee" }}>{p.sub}</div>
                    <p className="text-xs mb-2" style={{ color: "rgba(207,232,255,0.5)", lineHeight: 1.55 }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {p.tags.map((t) => <span key={t} className="feat-tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="#projects" className="feat-btn-p">View Project</a>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="feat-btn-s">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
