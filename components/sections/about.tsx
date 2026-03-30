import Image from "next/image"
import { Shield, Code, Wifi, Target, BookOpen, Users } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/data"

const PILLARS = [
  {
    title: "Network & Cyber Defence",
    description: "Specializing in penetration testing, intrusion detection, malware analysis, and hardening complex systems.",
    icon: Shield,
    accent: "#9d5cff",
    glow: "rgba(157,92,255,0.15)",
  },
  {
    title: "Full-Stack Development",
    description: "Building secure, performant web applications with React, Next.js, Node.js and security-first architecture.",
    icon: Code,
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
  },
  {
    title: "IoT Security Research",
    description: "Designing intrusion detection systems and secure firmware for smart devices and embedded systems.",
    icon: Wifi,
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.12)",
  },
  {
    title: "Creative Problem Solving",
    description: "Approaching complex security challenges with systematic thinking, root-cause analysis, and clean solutions.",
    icon: Target,
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.1)",
  },
  {
    title: "Continuous Learning",
    description: "Staying ahead of emerging threats, CVEs, and evolving attack vectors through daily study and practice.",
    icon: BookOpen,
    accent: "#34d399",
    glow: "rgba(52,211,153,0.1)",
  },
  {
    title: "Community & Collaboration",
    description: "Actively contributing to open-source tooling and engaging with CTF communities to sharpen skills.",
    icon: Users,
    accent: "#fbbf24",
    glow: "rgba(251,191,36,0.1)",
  },
]

export function About() {
  return (
    <section id="about-detail" className="relative py-24 overflow-hidden">
      <style>{`
        .ab-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 13px;
          padding: 18px;
          backdrop-filter: blur(14px);
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
          position: relative; overflow: hidden;
        }
        .ab-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }
        .ab-card:hover { transform: translateY(-3px); }

        .ab-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 14px 10px; text-align: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .ab-stat:hover { background: rgba(157,92,255,0.08); border-color: rgba(157,92,255,0.25); }

        .ab-img-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 0 80px rgba(109,40,217,0.2);
        }
        .ab-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(8,6,18,0.7));
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .ab-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">Who I Am</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">About Me</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.5)" }}>
            Cybersecurity student building a safer digital future one system at a time.
          </p>
        </div>

        <div className="section-divider mb-12" />

        <div className="grid lg:grid-cols-2 gap-16 items-start ab-grid">
          {/* LEFT — Photo + bio + stats */}
          <div>
            {/* Portrait */}
            <div className="ab-img-wrap mb-8">
              <Image
                src="/sai.jpg"
                alt={`${PERSONAL_INFO.name} portrait`}
                width={640} height={640}
                sizes="(max-width: 768px) 100vw, 480px"
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed mb-8" style={{ color: "rgba(226,232,240,0.62)" }}>
              <p>
                I&apos;m <strong className="text-white">{PERSONAL_INFO.name}</strong>, a final-year B.Tech Cybersecurity
                student at KL University, Vijayawada. I&apos;m passionate about ethical hacking, digital forensics, and
                building software that is secure from the ground up.
              </p>
              <p>
                My journey in cybersecurity is driven by <strong className="text-white">curiosity, persistence, and the belief
                  that secure technology is the backbone of a safer digital future</strong>. I combine offensive security skills
                with full-stack development to build and harden complex systems.
              </p>
              <p>
                I see myself as a <strong className="text-white">problem solver, fast learner, and builder</strong> — always
                pushing boundaries in penetration testing, IoT security, and AI-driven cybersecurity tooling.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Academic Year", value: "Final Year", icon: "🎓" },
                { label: "Security Projects", value: "4+", icon: "🔐" },
                { label: "Years Learning", value: "3+", icon: "📅" },
              ].map((s) => (
                <div key={s.label} className="ab-stat">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div
                    className="text-lg font-extrabold leading-none mb-1"
                    style={{
                      background: "linear-gradient(135deg, #c4b5fd, #67e8f9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pillar cards */}
          <div className="grid grid-cols-1 gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="ab-card"
                style={{
                  borderColor: `${p.accent}18`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 42, height: 42,
                      background: `${p.accent}14`,
                      border: `1px solid ${p.accent}22`,
                    }}
                  >
                    <p.icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.55)" }}>{p.description}</p>
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
