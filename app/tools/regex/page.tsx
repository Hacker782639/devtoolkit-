"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"

export default function RegexToolPage() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [text, setText] = useState("")
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState("")

  function testRegex() {
    setError("")
    setMatches([])

    if (!pattern) return

    try {
      const regex = new RegExp(pattern, flags)
      const found = text.match(regex)

      if (found) {
        setMatches(found)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regular expression.")
    }
  }

  function reset() {
    setPattern("")
    setFlags("g")
    setText("")
    setMatches([])
    setError("")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Regex Tester
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Test JavaScript regular expressions against text directly in your browser.
        </p>
      </div>

      <div className="glass max-w-5xl rounded-2xl p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_180px]">
          <div>
            <label htmlFor="regex-pattern" className="text-sm font-bold">
              Regular Expression
            </label>

            <input
              id="regex-pattern"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              placeholder="\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
            />
          </div>

          <div>
            <label htmlFor="regex-flags" className="text-sm font-bold">
              Flags
            </label>

            <input
              id="regex-flags"
              value={flags}
              onChange={(event) => setFlags(event.target.value)}
              placeholder="gim"
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="regex-text" className="text-sm font-bold">
            Test Text
          </label>

          <textarea
            id="regex-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste text to test..."
            rows={8}
            className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-white/70 p-4 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={testRegex}
            className="cursor-pointer rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Test Regex
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

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Matches</h2>
            <span className="text-sm text-[var(--color-muted-foreground)]">
              {matches.length} match{matches.length === 1 ? "" : "es"}
            </span>
          </div>

          <div className="mt-3 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <div key={`${match}-${index}`} className="border-b border-slate-800 py-1 last:border-0">
                  {match}
                </div>
              ))
            ) : (
              <span className="text-slate-500">
                No matches yet.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
