"use client"

import { useActionState } from "react"
import { sendMessage, type ContactState } from "@/app/actions/send-message"
import { CONTACT_INFO, PERSONAL_INFO } from "@/lib/data"

export function ContactSection() {
    const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(sendMessage, null)

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <style>{`
                .ct-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px; padding: 28px;
                    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
                    position: relative; overflow: hidden;
                }
                .ct-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(157,92,255,0.35), rgba(34,211,238,0.25), transparent);
                }
                .ct-contact-row {
                    display: flex; align-items: flex-start; gap: 14px; padding: 12px;
                    border-radius: 10px; text-decoration: none;
                    transition: background 0.2s;
                }
                .ct-contact-row:hover { background: rgba(255,255,255,0.05); }
                .ct-icon-box {
                    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(157,92,255,0.1); border: 1px solid rgba(157,92,255,0.2);
                    transition: background 0.2s, border-color 0.2s;
                }
                .ct-contact-row:hover .ct-icon-box {
                    background: rgba(157,92,255,0.2); border-color: rgba(157,92,255,0.35);
                }
                .ct-input {
                    width: 100%; padding: 10px 14px; border-radius: 10px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; font-size: 13px; outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .ct-input::placeholder { color: rgba(255,255,255,0.3); }
                .ct-input:focus {
                    border-color: rgba(157,92,255,0.5);
                    box-shadow: 0 0 0 3px rgba(157,92,255,0.1);
                }
                .ct-textarea {
                    width: 100%; padding: 10px 14px; border-radius: 10px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; font-size: 13px; outline: none;
                    resize: vertical; min-height: 120px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .ct-textarea::placeholder { color: rgba(255,255,255,0.3); }
                .ct-textarea:focus {
                    border-color: rgba(157,92,255,0.5);
                    box-shadow: 0 0 0 3px rgba(157,92,255,0.1);
                }
                .ct-submit {
                    width: 100%; padding: 12px; border-radius: 11px; border: none;
                    font-size: 14px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer;
                    background: linear-gradient(135deg, #6d28d9, #9d5cff);
                    color: #fff;
                    box-shadow: 0 4px 20px rgba(109,40,217,0.35);
                    transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
                }
                .ct-submit:hover:not(:disabled) {
                    box-shadow: 0 8px 30px rgba(109,40,217,0.55);
                    transform: translateY(-2px);
                }
                .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .ct-label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase;
                    letter-spacing: 0.1em; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
            `}</style>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-eyebrow">Get In Touch</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.5)" }}>
                        Open to cybersecurity collaborations, internship opportunities, and interesting projects.
                    </p>
                </div>

                <div className="section-divider mb-10" />

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info Card */}
                    <div className="ct-card">
                        <h3 className="text-base font-bold text-white mb-1">Reach Out Directly</h3>
                        <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Always open to discussing cybersecurity, learning opportunities, and collaboration.
                        </p>

                        <div className="space-y-1">
                            {CONTACT_INFO.map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ct-contact-row"
                                >
                                    <div className="ct-icon-box">
                                        <c.icon className="w-4 h-4" style={{ color: "#c4b5fd" }} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">{c.label}</div>
                                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{c.value}</div>
                                        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{c.description}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Availability pill */}
                        <div
                            className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.18)", color: "#67e8f9" }}
                        >
                            <span
                                className="animate-pulse-dot inline-block rounded-full"
                                style={{ width: 7, height: 7, background: "#22d3ee", boxShadow: "0 0 6px rgba(34,211,238,0.8)", flexShrink: 0 }}
                            />
                            Currently available for freelance projects &amp; internships
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="ct-card">
                        <h3 className="text-base font-bold text-white mb-1">Send a Message</h3>
                        <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Fill out the form and I&apos;ll reply within 24 hours.
                        </p>

                        <form action={formAction} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="ct-label">Name</label>
                                    <input name="name" placeholder="Your name" required className="ct-input" />
                                </div>
                                <div>
                                    <label className="ct-label">Email</label>
                                    <input type="email" name="email" placeholder="your@email.com" required className="ct-input" />
                                </div>
                            </div>
                            <div>
                                <label className="ct-label">Subject</label>
                                <input name="subject" placeholder="What's this about?" className="ct-input" />
                            </div>
                            <div>
                                <label className="ct-label">Message</label>
                                <textarea name="message" placeholder="Tell me about your project or opportunity..." rows={5} required className="ct-textarea" />
                            </div>
                            <button type="submit" disabled={isPending} className="ct-submit">
                                {isPending ? "Sending…" : "Send Message →"}
                            </button>

                            {state && (
                                <div
                                    className="p-3 rounded-lg text-xs font-semibold"
                                    style={{
                                        background: state.ok ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)",
                                        border: `1px solid ${state.ok ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)"}`,
                                        color: state.ok ? "#34d399" : "#f87171",
                                    }}
                                >
                                    {state.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
