import { Github, Linkedin, Mail, Shield } from "lucide-react"
import { PERSONAL_INFO, NAV_LINKS, SITE_CONFIG } from "@/lib/data"

const SOCIALS = [
    { icon: Github, href: PERSONAL_INFO.github, label: "GitHub" },
    { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
]

export function Footer() {
    return (
        <footer
            className="relative overflow-hidden pt-16 pb-8"
            style={{
                background: "rgba(4,3,12,0.8)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
            }}
        >
            <style>{`
                .ft-social {
                    width: 36px; height: 36px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.09);
                    color: rgba(255,255,255,0.5);
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                    text-decoration: none;
                }
                .ft-social:hover {
                    background: rgba(157,92,255,0.15);
                    border-color: rgba(157,92,255,0.3);
                    color: #c4b5fd;
                }
                .ft-link {
                    font-size: 13px; color: rgba(255,255,255,0.45);
                    text-decoration: none; transition: color 0.2s;
                }
                .ft-link:hover { color: rgba(255,255,255,0.85); }
            `}</style>

            {/* Glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12), transparent 70%)", filter: "blur(30px)" }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div
                                className="flex items-center justify-center rounded-xl"
                                style={{
                                    width: 38, height: 38,
                                    background: "linear-gradient(135deg, rgba(109,40,217,0.4), rgba(157,92,255,0.25))",
                                    border: "1px solid rgba(157,92,255,0.35)",
                                }}
                            >
                                <Shield className="w-4 h-4" style={{ color: "#9d5cff" }} />
                            </div>
                            <div>
                                <div className="font-black text-white text-sm tracking-wide">{PERSONAL_INFO.name}</div>
                                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{PERSONAL_INFO.role}</div>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: "rgba(226,232,240,0.45)" }}>
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex items-center gap-2">
                            {SOCIALS.map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ft-social">
                                    <s.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3
                            className="text-xs font-bold uppercase tracking-widest mb-4"
                            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em" }}
                        >
                            Navigate
                        </h3>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="ft-link">{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact snapshot */}
                    <div>
                        <h3
                            className="text-xs font-bold uppercase tracking-widest mb-4"
                            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em" }}
                        >
                            Contact
                        </h3>
                        <ul className="space-y-2.5">
                            <li><a href={`mailto:${PERSONAL_INFO.email}`} className="ft-link">{PERSONAL_INFO.email}</a></li>
                            <li><a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="ft-link">GitHub</a></li>
                            <li><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="ft-link">LinkedIn</a></li>
                            <li>
                                <span
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mt-1"
                                    style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.18)", color: "#67e8f9" }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse-dot" />
                                    Available for work
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{SITE_CONFIG.copyright}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Built with Next.js · TypeScript · Tailwind CSS
                    </div>
                </div>
            </div>
        </footer>
    )
}
