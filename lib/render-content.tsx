import type React from "react"

/**
 * Tiny, dependency-free renderer for simple rich text:
 * - Headings: lines starting with "# ", "## ", "### "
 * - Bulleted lists: consecutive lines starting with "- "
 * - Paragraphs: everything else
 */
export function renderContent(content: string): React.ReactNode {
  const blocks = splitIntoBlocks(content.trim())

  return blocks.map((block, i) => {
    if (block.type === "heading") {
      if (block.level === 1)
        return (
          <h2 key={i} className="mt-8 text-2xl font-semibold text-slate-900">
            {block.text}
          </h2>
        )
      if (block.level === 2)
        return (
          <h3 key={i} className="mt-6 text-xl font-semibold text-slate-900">
            {block.text}
          </h3>
        )
      return (
        <h4 key={i} className="mt-4 text-lg font-semibold text-slate-900">
          {block.text}
        </h4>
      )
    }
    if (block.type === "list") {
      return (
        <ul key={i} className="ml-5 list-disc space-y-1 text-slate-700">
          {block.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )
    }
    return (
      <p key={i} className="mt-4 leading-7 text-slate-700">
        {block.text}
      </p>
    )
  })
}

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string }

function splitIntoBlocks(input: string): Block[] {
  const lines = input.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // Skip empty lines
    if (!line) {
      i++
      continue
    }

    // Headings
    if (line.startsWith("# ")) {
      blocks.push({ type: "heading", level: 1, text: line.replace(/^# /, "").trim() })
      i++
      continue
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.replace(/^## /, "").trim() })
      i++
      continue
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.replace(/^### /, "").trim() })
      i++
      continue
    }

    // Lists: collect consecutive "- " lines
    if (line.startsWith("- ")) {
      const items: string[] = [line.replace(/^- /, "").trim()]
      i++
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().replace(/^- /, "").trim())
        i++
      }
      blocks.push({ type: "list", items })
      continue
    }

    // Paragraph: collect until blank line
    const paragraph: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("- ")) {
      paragraph.push(lines[i])
      i++
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() })
  }

  return blocks
}
