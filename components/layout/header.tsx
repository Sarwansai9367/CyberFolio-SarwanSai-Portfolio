import Link from "next/link"
import { Github, Download, Shield } from "lucide-react"
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/data"
import { MobileMenu } from "./mobile-menu"

export function Header() {
    return (
        <>
            <style>{`
                .gn-link {
                    color: rgba(255,255,255,0.58);
                    transition: background 0.2s, color 0.2s;
                    position: relative;
                }
                .gn-link::after {
                    content: '';
                    position: absolute; bottom: -2px; left: 50%; right: 50%;
                    height: 1.5px;
                    background: linear-gradient(90deg, #9d5cff, #22d3ee);
                    border-radius: 99px;
                    transition: left 0.22s, right 0.22s;
                }
                .gn-link:hover {
                    background: rgba(255,255,255,0.07) !important;
                    color: #fff !important;
                }
                .gn-link:hover::after { left: 8px; right: 8px; }
                .gn-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.09);
                    color: rgba(255,255,255,0.58);
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                }
                .gn-btn:hover {
                    background: rgba(255,255,255,0.11) !important;
                    border-color: rgba(255,255,255,0.18) !important;
                    color: #fff !important;
                }
                .gn-btn-accent {
                    background: linear-gradient(135deg, rgba(109,40,217,0.3), rgba(157,92,255,0.2));
                    border: 1px solid rgba(157,92,255,0.4);
                    color: #c4b5fd;
                    transition: background 0.2s, box-shadow 0.2s, color 0.2s;
                }
                .gn-btn-accent:hover {
                    background: linear-gradient(135deg, rgba(109,40,217,0.5), rgba(157,92,255,0.35)) !important;
                    box-shadow: 0 0 18px rgba(157,92,255,0.3) !important;
                    color: #fff !important;
                }
                .gn-brand-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: linear-gradient(135deg, #9d5cff, #22d3ee);
                    box-shadow: 0 0 8px rgba(157,92,255,0.7);
                    animation: pulse-glow 2.2s ease-in-out infinite;
                    display: inline-block;
                }
            `}</style>

            <header
                className="sticky top-0 z-50 transition-all duration-300"
                style={{
                    background: "rgba(8,6,18,0.65)",
                    backdropFilter: "blur(22px)",
                    WebkitBackdropFilter: "blur(22px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 1px 0 0 rgba(157,92,255,0.08)",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex h-14 items-center gap-4">

                        {/* Brand */}
                        <a href="#about" className="flex items-center gap-2 mr-2 flex-shrink-0">
                            <div
                                className="flex items-center justify-center rounded-lg"
                                style={{
                                    width: 28, height: 28,
                                    background: "linear-gradient(135deg, rgba(109,40,217,0.4), rgba(157,92,255,0.25))",
                                    border: "1px solid rgba(157,92,255,0.35)",
                                }}
                            >
                                <Shield className="w-3.5 h-3.5" style={{ color: "#9d5cff" }} />
                            </div>
                            <span className="hidden sm:block text-xs font-bold text-white tracking-widest uppercase" style={{ letterSpacing: "0.12em" }}>
                                Sarwansai
                            </span>
                            <span className="gn-brand-dot" />
                        </a>

                        {/* Nav pills */}
                        <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Primary">
                            {NAV_LINKS.map((n) => (
                                <a
                                    key={n.href}
                                    href={n.href}
                                    className="gn-link px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase"
                                    style={{ letterSpacing: "0.07em" }}
                                >
                                    {n.label}
                                </a>
                            ))}
                        </nav>

                        {/* Right actions */}
                        <div className="hidden md:flex items-center gap-2 ml-auto">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gn-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                            >
                                <Github className="w-3.5 h-3.5" />
                                GitHub
                            </a>

                            <a
                                href={PERSONAL_INFO.cvLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gn-btn-accent flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold"
                                style={{ letterSpacing: "0.05em" }}
                            >
                                <Download className="w-3.5 h-3.5" />
                                Download CV
                            </a>
                        </div>

                        <MobileMenu />
                    </div>
                </div>
            </header>
        </>
    )
}
