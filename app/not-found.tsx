export default function NotFoundPage() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-white px-6 py-20 text-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Not Found</h1>
        <p className="mt-2 text-slate-600">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-6 inline-flex underline underline-offset-4 hover:no-underline">
          Go home
        </a>
      </div>
    </main>
  )
}
