"use client"

import { useMemo, useState } from "react"
import { Copy, RotateCcw } from "lucide-react"

export default function TextToolPage() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split(/\r?\n/).length : 0

    return { characters, charactersNoSpaces, words, lines }
  }, [text])

  async function transform(type: string) {
    let result = text

    if (type === "uppercase") result = text.toUpperCase()
    if (type === "lowercase") result = text.toLowerCase()
    if (type === "capitalize") {
      result = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    }
    if (type === "trim") result = text.trim()
    if (type === "remove-spaces") result = text.replace(/\s+/g, "")
    if (type === "remove-extra-spaces") result = text.replace(/\s+/g, " ").trim()
    if (type === "reverse") result = Array.from(text).reverse().join("")

    setText(result)
  }

  async function copyText() {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setText("")
    setCopied(false)
  }

  const actions = [
    ["uppercase", "UPPERCASE"],
    ["lowercase", "lowercase"],
    ["capitalize", "Capitalize"],
    ["trim", "Trim"],
    ["remove-spaces", "Remove Spaces"],
    ["remove-extra-spaces", "Clean Spaces"],
    ["reverse", "Reverse"],
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Text Utilities
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Transform text, clean whitespace, reverse content, and inspect text statistics.
        </p>
      </div>

      <div className="glass max-w-6xl rounded-2xl p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[380px] w-full resize-y rounded-xl border border-[var(--color-border)] bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map(([type, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => transform(type)}
                  className="cursor-pointer rounded-lg border border-[var(--color-border)] bg-white/70 px-3 py-2 text-xs font-semibold transition-colors hover:bg-slate-100 dark:bg-slate-900/70 dark:hover:bg-slate-800"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyText}
                disabled={!text}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Copy size={16} />
                {copied ? "Copied" : "Copy Text"}
              </button>

              <button
                type="button"
                onClick={reset}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] px-5 py-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          <aside className="rounded-xl border border-[var(--color-border)] bg-white/70 p-5 dark:bg-slate-950/60">
            <h2 className="text-lg font-bold">Statistics</h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">
                  Characters
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.characters}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">
                  Without spaces
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.charactersNoSpaces}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">
                  Words
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.words}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">
                  Lines
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.lines}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
