"use server"

import { Resend } from "resend"

export type ContactState = { ok: true; message: string } | { ok: false; message: string }

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMessage(_: ContactState | null, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in name, email, and message." }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    // If RESEND_API_KEY is not set, fall back to console logging for development
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (no API key):", { name, email, subject, message })
      return { ok: true, message: "Thanks! Your message has been received. (Development mode)" }
    }

    // Send email using Resend
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
      to: ["sarwansai483@gmail.com"],
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "No subject"}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    })

    return { ok: true, message: "Thanks! Your message has been sent successfully." }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { ok: false, message: "Sorry, there was an error sending your message. Please try again later." }
  }
}
