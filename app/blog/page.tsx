import Link from "next/link"
import { postsData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export default function BlogIndexPage() {
  const categories = Array.from(new Set(postsData.map((p) => p.category)))

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Knowledge Base</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Practical, concise notes on security, development, and AI.</p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700">
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {postsData.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-md border border-slate-200 bg-white">
              {post.image && (
                <Link href={`/blog/${post.id}`}>
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=400&query=blog%20cover"}
                    alt={`${post.title} cover`}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </Link>
              )}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="text-base font-semibold text-slate-900">
                    <Link href={`/blog/${post.id}`} className="underline underline-offset-4 hover:no-underline">
                      {post.title}
                    </Link>
                  </h2>
                  <Badge variant="outline" className="text-xs text-slate-700">
                    {post.category}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center">
                    <Calendar className="mr-1 size-3.5" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
