"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const current = el.scrollTop
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60]">
      <div className="h-[2px] w-full bg-slate-200" />
      <div className="h-[2px] bg-slate-900" style={{ width: `${progress}%`, transition: "width 120ms linear" }} />
    </div>
  )
}
