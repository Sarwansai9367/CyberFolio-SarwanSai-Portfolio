import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projectsData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"

type Props = { params: { id: string } }

export function generateMetadata({ params }: Props): Metadata {
  const project = projectsData.find((p) => p.id === params.id)
  if (!project) return { title: "Project — Not found" }
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projectsData.find((p) => p.id === params.id)
  if (!project) return notFound()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6">
          <Link href="/#projects" className="text-sm underline underline-offset-4 hover:no-underline">
            ← Back to Projects
          </Link>
        </div>

        <header className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-3xl font-semibold">{project.title}</h1>
            <p className="mt-2 text-slate-600">{project.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {project.category}
              </Badge>
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {project.status}
              </Badge>
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
              >
                <Github className="mr-2 size-4" />
                View Code
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
                >
                  <ExternalLink className="mr-2 size-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </header>

        {project.image && (
          <div className="mt-8 overflow-hidden rounded-md border">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} preview`}
              width={1200}
              height={675}
              sizes="100vw"
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        <section className="mt-10 grid gap-8 md:grid-cols-3">
          <Card className="border-slate-200 md:col-span-2 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-900">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">{project.longDescription || project.description}</p>
              {project.impact && (
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <CheckCircle2 className="size-4 text-slate-900" />
                  {project.impact}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-900">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} variant="outline" className="text-xs text-slate-700">
                  {t}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>

        {(project.features?.length || project.metrics) && (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {project.features?.length ? (
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-900">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700">
                    {project.features!.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-slate-900" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {project.metrics ? (
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-900">Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} className="rounded-md border border-slate-200 p-3">
                      <div className="text-xs uppercase text-slate-500">{k.replaceAll("-", " ")}</div>
                      <div className="text-lg font-semibold text-slate-900">{v}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </section>
        )}

        <section className="mt-12">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm underline underline-offset-4 hover:no-underline"
          >
            Browse more projects <ArrowRight className="ml-1 size-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
