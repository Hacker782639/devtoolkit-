"use client"

import { useState } from "react"
import { Copy, RotateCcw } from "lucide-react"

const algorithms = ["SHA-256", "SHA-384", "SHA-512"] as const

export default function HashToolPage() {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] =
    useState<(typeof algorithms)[number]>("SHA-256")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  async function generateHash() {
    if (!input.trim()) return

    const data = new TextEncoder().encode(input)
    const buffer = await crypto.subtle.digest(algorithm, data)

    const hash = Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")

    setOutput(hash)
    setCopied(false)
  }

  async function copyHash() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setInput("")
    setOutput("")
    setCopied(false)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Security
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Hash Generator
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Generate SHA-256, SHA-384, and SHA-512 hashes locally in your browser.
        </p>
      </div>

      <div className="glass max-w-4xl rounded-2xl p-5 sm:p-6">
        <label
          htmlFor="hash-input"
          className="text-sm font-bold"
        >
          Text to hash
        </label>

        <textarea
          id="hash-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter text to hash..."
          rows={7}
          className="mt-3 w-full resize-y rounded-xl border border-[var(--color-border)] bg-white/70 p-4 font-mono text-sm outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="hash-algorithm"
              className="text-sm font-bold"
            >
              Algorithm
            </label>

            <select
              id="hash-algorithm"
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(
                  event.target.value as (typeof algorithms)[number],
                )
              }
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
            >
              {algorithms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={generateHash}
            className="cursor-pointer rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            Generate Hash
          </button>

          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-5 py-3 text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-bold">
              Hash output
            </label>

            <button
              type="button"
              onClick={copyHash}
              disabled={!output}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Copy size={14} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-3 min-h-24 break-all rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
            {output || (
              <span className="text-slate-500">
                Your generated hash will appear here.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
