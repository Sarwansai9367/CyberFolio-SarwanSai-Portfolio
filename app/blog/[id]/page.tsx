import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { postsData } from "@/lib/data"
import { ReadingProgress } from "@/components/reading-progress"
import { Calendar } from "lucide-react"
import { renderContent } from "@/lib/render-content"
import Image from "next/image"

type Props = { params: { id: string } }

export function generateMetadata({ params }: Props): Metadata {
  const post = postsData.find((p) => p.id === params.id)
  if (!post) return { title: "Post — Not found" }
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = postsData.find((p) => p.id === params.id)
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <ReadingProgress />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6">
          <Link href="/blog" className="text-sm underline underline-offset-4 hover:no-underline">
            ← Back to Blog
          </Link>
        </div>

        <article>
          <header>
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center">
                <Calendar className="mr-1 size-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span aria-hidden="true">•</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">•</span>
              <span>{post.category}</span>
              {post.tags?.length ? (
                <>
                  <span aria-hidden="true">•</span>
                  <span className="flex flex-wrap gap-1">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded border border-slate-300 px-1.5 py-0.5 text-xs text-slate-700">
                        #{t}
                      </span>
                    ))}
                  </span>
                </>
              ) : null}
            </div>
          </header>

          {post.image && (
            <div className="mt-6 overflow-hidden rounded-md border">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`${post.title} cover`}
                width={1200}
                height={675}
                sizes="100vw"
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-8">{renderContent(post.content)}</div>
        </article>
      </div>
    </main>
  )
}
