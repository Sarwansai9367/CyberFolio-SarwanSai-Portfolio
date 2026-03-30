import { Github, Linkedin, FileText, ArrowRight, MapPin, Mail } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/data"
import { AnimatedName } from "@/components/ui/animated-name"

export function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 py-24"
    >
      <style>{`
        .hero-cta-secondary {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.13);
          color: rgba(255,255,255,0.9);
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .hero-cta-secondary:hover {
          background: rgba(255,255,255,0.13) !important;
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 0 20px rgba(157,92,255,0.15) !important;
        }
        .hero-social-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.55);
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .hero-social-btn:hover {
          background: rgba(157,92,255,0.15) !important;
          border-color: rgba(157,92,255,0.35) !important;
          color: #c4b5fd !important;
          box-shadow: 0 0 14px rgba(157,92,255,0.2) !important;
        }
        .hero-stat-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-stat-card:hover {
          background: rgba(157,92,255,0.08) !important;
          border-color: rgba(157,92,255,0.2) !important;
        }
        .hero-shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* ── Glass Hero Card ── */}
      <div
        className="glass-card w-full max-w-lg p-8 sm:p-10 animate-scale-in"
      >
        {/* Shimmer sweep */}
        <div className="hero-shimmer" aria-hidden="true" />

        {/* ── Avatar (top-right) ── */}
        <div
          className="absolute top-7 right-7 w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            border: "2px solid rgba(157,92,255,0.35)",
            background: "rgba(109,40,217,0.2)",
            boxShadow: "0 0 0 4px rgba(109,40,217,0.12), 0 0 20px rgba(157,92,255,0.25)",
          }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sai.jpg"
            alt={PERSONAL_INFO.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Status badge ── */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase mb-5"
          style={{
            background: "rgba(34,211,238,0.1)",
            border: "1px solid rgba(34,211,238,0.25)",
            color: "#67e8f9",
            letterSpacing: "0.1em",
          }}
        >
          <span
            className="animate-pulse-dot inline-block rounded-full"
            style={{ width: 6, height: 6, background: "#22d3ee", boxShadow: "0 0 6px rgba(34,211,238,0.8)" }}
          />
          Available for Work
        </div>

        {/* ── Headline ── */}
        <div className="animate-fade-in-up">
          <AnimatedName />
        </div>

        {/* ── Role + Location ── */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up delay-100">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(157,92,255,0.12)", border: "1px solid rgba(157,92,255,0.2)", color: "#c4b5fd" }}
          >
            {PERSONAL_INFO.role}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <MapPin className="w-3 h-3" /> {PERSONAL_INFO.location}
          </span>
        </div>

        {/* ── Description ── */}
        <p
          className="text-sm leading-relaxed mb-5 animate-fade-in-up delay-150"
          style={{ color: "rgba(255,255,255,0.6)", maxWidth: "22rem" }}
        >
          {PERSONAL_INFO.bio}
        </p>

        {/* ── Philosophy block ── */}
        <div
          className="rounded-xl p-4 mb-6 animate-fade-in-up delay-200 glass-shimmer-top"
          style={{
            background: "rgba(157,92,255,0.05)",
            border: "1px solid rgba(157,92,255,0.12)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1.5"
            style={{ color: "#c4b5fd", letterSpacing: "0.08em" }}
          >
            Guiding Philosophy
          </p>
          <p
            className="text-xs leading-relaxed italic"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            &quot;Driven by the timeless wisdom of the Bhagavad Gita — Dedicated Action and Continuous Learning, without attachment to outcomes.&quot;
          </p>
        </div>

        {/* ── CTAs + Socials ── */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7 animate-fade-in-up delay-300">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="btn-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase text-white"
            style={{ letterSpacing: "0.05em" }}
          >
            View My Work
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Secondary CTA */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hero-cta-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase"
            style={{ letterSpacing: "0.05em" }}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hero-social-btn flex items-center justify-center w-9 h-9 rounded-lg"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hero-social-btn flex items-center justify-center w-9 h-9 rounded-lg"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="hero-social-btn flex items-center justify-center w-9 h-9 rounded-lg"
            >
              <FileText className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          className="grid grid-cols-4 gap-2 pt-5 animate-fade-in-up delay-400"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "4+", label: "Projects" },
            { value: "2+", label: "Years Exp." },
            { value: "6+", label: "Skills" },
            { value: "3", label: "Certs" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="hero-stat-card text-center py-2.5 px-1 rounded-xl"
            >
              <div
                className="text-base font-extrabold leading-none mb-1"
                style={{
                  background: "linear-gradient(135deg, #c4b5fd, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
