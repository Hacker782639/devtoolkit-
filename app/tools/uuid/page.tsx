"use client"

import { useState } from "react"
import { Copy, RefreshCw } from "lucide-react"

function createUuid() {
  return crypto.randomUUID()
}

export default function UuidToolPage() {
  const [uuid, setUuid] = useState("")
  const [copied, setCopied] = useState(false)

  function generate() {
    setUuid(createUuid())
    setCopied(false)
  }

  async function copy() {
    if (!uuid) return
    await navigator.clipboard.writeText(uuid)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          UUID Generator
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Generate cryptographically random UUID v4 identifiers locally in your browser.
        </p>
      </div>

      <div className="glass max-w-3xl rounded-2xl p-5 sm:p-6">
        <div className="rounded-xl border border-[var(--color-border)] bg-white/70 p-5 dark:bg-slate-950/60">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">
            Generated UUID
          </p>

          <div className="mt-4 min-h-24 break-all rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
            {uuid || (
              <span className="text-slate-500">
                Click generate to create a UUID.
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generate}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              <RefreshCw size={16} />
              Generate UUID
            </button>

            <button
              type="button"
              onClick={copy}
              disabled={!uuid}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900/70 dark:hover:bg-slate-800"
            >
              <Copy size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
