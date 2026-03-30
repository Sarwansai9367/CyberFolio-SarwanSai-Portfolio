import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Testimonial = {
  quote: string
  author: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Clear, security‑first implementations. We went from brittle scripts to a maintainable system without slowing down.",
    author: "A. Verma",
    role: "Lead Engineer",
  },
  {
    quote:
      "Fast, thoughtful, and reliable. His forensic approach surfaced risks we hadn’t considered and kept us launch‑ready.",
    author: "R. Iyer",
    role: "Product Manager",
  },
  {
    quote:
      "Great balance of UX and security. We shipped a clean UI with the right guardrails—no last‑minute surprises.",
    author: "S. Kumar",
    role: "Founder",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">What People Say</h2>
          <p className="mt-3 text-slate-600">Short, verifiable notes from collaborators and mentors.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.author} className="border-slate-200 bg-white">
              <CardHeader className="pb-0" />
              <CardContent className="pt-4">
                <p className="text-sm leading-6 text-slate-800">“{t.quote}”</p>
                <div className="mt-4 text-sm font-medium text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-600">{t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
