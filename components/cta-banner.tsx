import { Mail, Download, ArrowRight } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/data"

export function CTABanner() {
  return (
    <section aria-label="Work together" className="relative py-6 overflow-hidden">
      <style>{`
        .cta-primary-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 11px;
          font-weight: 700; font-size: 14px; text-decoration: none; color: #fff;
          background: linear-gradient(135deg, #6d28d9, #9d5cff);
          box-shadow: 0 4px 20px rgba(109,40,217,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(109,40,217,0.55);
        }
        .cta-ghost-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 11px;
          font-weight: 700; font-size: 14px; text-decoration: none;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .cta-ghost-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="relative rounded-2xl overflow-hidden p-8 md:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(157,92,255,0.1) 50%, rgba(34,211,238,0.08) 100%)",
            border: "1px solid rgba(157,92,255,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Shimmer top line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(157,92,255,0.5), rgba(34,211,238,0.35), transparent)" }}
          />
          {/* Glow orb */}
          <div
            className="absolute -right-20 -top-20 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(157,92,255,0.15), transparent 70%)", filter: "blur(40px)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3"
                style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#67e8f9", letterSpacing: "0.1em" }}
              >
                <span
                  className="inline-block rounded-full animate-pulse-dot"
                  style={{ width: 6, height: 6, background: "#22d3ee", boxShadow: "0 0 6px rgba(34,211,238,0.8)" }}
                />
                Open to Opportunities
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">
                Let&apos;s build something{" "}
                <span style={{
                  background: "linear-gradient(90deg, #9d5cff, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>reliable and secure</span>.
              </h3>
              <p className="text-sm" style={{ color: "rgba(226,232,240,0.55)" }}>
                I take on focused projects with clear outcomes — strong defaults, measurable impact, clean hand-off.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="cta-primary-btn">
                <Mail className="w-4 h-4" />
                Email Me
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href={PERSONAL_INFO.cvLink} target="_blank" rel="noopener noreferrer" className="cta-ghost-btn">
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
