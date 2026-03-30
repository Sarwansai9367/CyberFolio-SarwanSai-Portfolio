"use client"

import { useState } from "react"
import { Menu, X, Github, Download } from "lucide-react"
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/data"

export function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <style>{`
                .mm-nav-link {
                    display: block; padding: 11px 16px; border-radius: 10px;
                    font-size: 13px; font-weight: 600; text-decoration: none;
                    color: rgba(255,255,255,0.6);
                    transition: background 0.2s, color 0.2s;
                }
                .mm-nav-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
                .mm-btn {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    width: 100%; padding: 11px; border-radius: 10px;
                    font-size: 13px; font-weight: 700; text-decoration: none;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.09);
                    color: rgba(255,255,255,0.6);
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                }
                .mm-btn:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.16); }
                .mm-btn-primary {
                    background: linear-gradient(135deg, #6d28d9, #9d5cff);
                    border: none; color: #fff;
                    box-shadow: 0 4px 16px rgba(109,40,217,0.35);
                    transition: opacity 0.2s, box-shadow 0.2s;
                }
                .mm-btn-primary:hover { opacity: 0.88; box-shadow: 0 6px 22px rgba(109,40,217,0.5); }
            `}</style>

            {/* Hamburger trigger */}
            <button
                className="md:hidden flex items-center justify-center rounded-lg p-2 text-white transition-colors"
                style={{ background: open ? "rgba(255,255,255,0.08)" : "transparent" }}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen(!open)}
            >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Dropdown panel */}
            {open && (
                <div
                    className="md:hidden absolute top-14 left-0 right-0 z-50 px-4 py-4"
                    style={{
                        background: "rgba(8,6,18,0.96)",
                        backdropFilter: "blur(22px)",
                        WebkitBackdropFilter: "blur(22px)",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Divider line */}
                    <div
                        className="h-px mb-4"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(157,92,255,0.3), rgba(34,211,238,0.2), transparent)" }}
                    />

                    {/* Nav links */}
                    <nav className="mb-4">
                        {NAV_LINKS.map((n) => (
                            <a
                                key={n.href}
                                href={n.href}
                                onClick={() => setOpen(false)}
                                className="mm-nav-link"
                            >
                                {n.label}
                            </a>
                        ))}
                    </nav>

                    {/* Action buttons */}
                    <div className="space-y-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="mm-btn">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a href={PERSONAL_INFO.cvLink} target="_blank" rel="noopener noreferrer" className="mm-btn mm-btn-primary">
                            <Download className="w-4 h-4" /> Download CV
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
