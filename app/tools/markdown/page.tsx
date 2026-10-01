"use client"

import { useMemo, useState } from "react"
import { Copy, RotateCcw } from "lucide-react"

function renderMarkdown(markdown: string) {
  return markdown
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^\- (.*)$/gm, "<li>$1</li>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />")
}

export default function MarkdownToolPage() {
  const [markdown, setMarkdown] = useState(
    "# DevToolkit\n\nWrite **Markdown** on the left and preview it on the right.",
  )
  const [copied, setCopied] = useState(false)

  const preview = useMemo(() => renderMarkdown(markdown), [markdown])

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setMarkdown("")
    setCopied(false)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Markdown Preview
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Write Markdown and preview the rendered result instantly in your browser.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Markdown</h2>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyMarkdown}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Copy size={14} />
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                type="button"
                onClick={reset}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          <textarea
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            placeholder="# Hello world"
            className="mt-4 min-h-[420px] w-full resize-y rounded-xl border border-[var(--color-border)] bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20"
            spellCheck={false}
          />
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">Preview</h2>

          <div
            className="prose prose-slate mt-4 min-h-[420px] max-w-none rounded-xl border border-[var(--color-border)] bg-white/70 p-5 dark:prose-invert dark:bg-slate-950/60"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
    </section>
  )
}
