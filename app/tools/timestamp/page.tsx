"use client"

import { useState } from "react"
import { Copy, RotateCcw } from "lucide-react"

export default function TimestampToolPage() {
  const [timestamp, setTimestamp] = useState("")
  const [date, setDate] = useState("")
  const [copied, setCopied] = useState(false)

  function timestampToDate() {
    if (!timestamp.trim()) return

    const value = Number(timestamp)
    if (!Number.isFinite(value)) return

    const milliseconds = timestamp.length >= 13 ? value : value * 1000
    const result = new Date(milliseconds)

    if (Number.isNaN(result.getTime())) return

    setDate(result.toISOString())
    setCopied(false)
  }

  function dateToTimestamp() {
    if (!date.trim()) return

    const result = new Date(date)
    if (Number.isNaN(result.getTime())) return

    setTimestamp(Math.floor(result.getTime() / 1000).toString())
    setCopied(false)
  }

  async function copy(value: string) {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setTimestamp("")
    setDate("")
    setCopied(false)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Timestamp Converter
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Convert Unix timestamps to readable dates and dates back to Unix timestamps.
        </p>
      </div>

      <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">Unix Timestamp</h2>

          <input
            value={timestamp}
            onChange={(event) => setTimestamp(event.target.value)}
            placeholder="1750000000"
            inputMode="numeric"
            className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
          />

          <button
            type="button"
            onClick={timestampToDate}
            className="mt-4 w-full cursor-pointer rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Convert to Date
          </button>
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">Date / ISO 8601</h2>

          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="2025-06-15T12:00:00.000Z"
            className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
          />

          <button
            type="button"
            onClick={dateToTimestamp}
            className="mt-4 w-full cursor-pointer rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Convert to Timestamp
          </button>
        </div>
      </div>

      <div className="glass mt-6 max-w-5xl rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Current Result</h2>

          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        <div className="mt-4 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 break-all">
          {date || timestamp || (
            <span className="text-slate-500">
              Conversion result will appear here.
            </span>
          )}
        </div>

        {(date || timestamp) && (
          <button
            type="button"
            onClick={() => copy(date || timestamp)}
            className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold"
          >
            <Copy size={15} />
            {copied ? "Copied" : "Copy Result"}
          </button>
        )}
      </div>
    </section>
  )
}
