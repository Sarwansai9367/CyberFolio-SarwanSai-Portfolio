import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { EducationSection } from "@/components/education-section"
import { AchievementsSection } from "@/components/sections/achievements"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { ContactSection } from "@/components/sections/contact"
import { CTABanner } from "@/components/cta-banner"
import { CircuitBackground } from "@/components/ui/circuit-background"
import { AnimatedDivider } from "@/components/ui/animated-divider"

export default function Page() {
  return (
    <>
      {/* ── Circuit background animation ── */}
      <CircuitBackground />

      {/* ── Animated blob background (fixed, behind everything) ── */}
      <div className="blob-bg" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main className="min-h-screen text-foreground relative z-10">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <div id="content">
          <Hero />
          <AnimatedDivider className="my-16" />
          <About />
          <AnimatedDivider className="my-16" />
          <EducationSection />
          <AnimatedDivider className="my-16" />
          <AchievementsSection />
          <AnimatedDivider className="my-16" />
          <Skills />
          <AnimatedDivider className="my-16" />
          <Projects />
          <AnimatedDivider className="my-16" />
          <CTABanner />
          <AnimatedDivider className="my-16" />
          <ContactSection />
        </div>
        <Footer />
      </main>
    </>
  )
}
