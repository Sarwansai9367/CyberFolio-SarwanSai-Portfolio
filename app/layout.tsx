import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Maddipati Sarwansai — Cybersecurity & Software Engineer",
  description: "Security-first full-stack engineering. Practical systems with measurable impact.",
  generator: "v0.dev",
  openGraph: {
    title: "Maddipati Sarwansai — Cybersecurity & Software Engineer",
    description: "Security-first full-stack engineering. Practical systems with measurable impact.",
    images: [
      {
        url: "/sai.jpg",
        width: 1200,
        height: 630,
        alt: "Maddipati Sarwansai",
      },
    ],
  },
  // TODO: replace with your production domain when deployed
  metadataBase: new URL("http://localhost:3000"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maddipati Sarwansai",
    jobTitle: "Cybersecurity & Software Engineer",
    url: "http://localhost:3000",
    sameAs: [
      "mailto:sarwansai483@gmail.com",
      "https://github.com/sarwansai",
      "https://linkedin.com/in/maddipati-sarwansai",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable}`}>
      <head>
        <link rel="preload" as="image" href="/clean-minimal-workspace.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:border focus:border-slate-300 focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900"
            >
              Skip to content
            </a>
            {children}
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html >
  )
}
