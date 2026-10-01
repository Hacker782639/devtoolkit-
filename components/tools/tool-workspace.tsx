"use client"

import {
  Clipboard,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

type ToolId = "json" | "base64" | "url" | "jwt"

interface ToolWorkspaceProps {
  title: string
  description: string
  inputLabel?: string
  outputLabel?: string
  inputPlaceholder?: string
  initialInput?: string
  tool: ToolId
  mode?: "encode" | "decode"
  downloadName?: string
}

function processTool(tool: ToolId, input: string, mode: "encode" | "decode") {
  if (!input.trim()) {
    throw new Error("Please provide a value.")
  }

  if (tool === "json") {
    try {
      const parsed: unknown = JSON.parse(input)
      return JSON.stringify(parsed, null, 2)
    } catch {
      throw new Error("Invalid JSON. Please check your syntax.")
    }
  }

  if (tool === "base64") {
    try {
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)))
      }

      return decodeURIComponent(escape(atob(input)))
    } catch {
      throw new Error("Invalid Base64 input.")
    }
  }

  if (tool === "url") {
    try {
      return mode === "encode"
        ? encodeURIComponent(input)
        : decodeURIComponent(input)
    } catch {
      throw new Error("Invalid encoded URL value.")
    }
  }

  if (tool === "jwt") {
    const parts = input.trim().split(".")

    if (parts.length !== 3) {
      throw new Error("Invalid JWT. A JWT must contain three parts.")
    }

    try {
      const decode = (value: string) => {
        const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
        const padded = normalized.padEnd(
          normalized.length + ((4 - (normalized.length % 4)) % 4),
          "=",
        )

        return JSON.parse(atob(padded))
      }

      return JSON.stringify(
        {
          header: decode(parts[0]),
          payload: decode(parts[1]),
          signature: parts[2],
        },
        null,
        2,
      )
    } catch {
      throw new Error("Invalid JWT encoding or payload.")
    }
  }

  throw new Error("Unsupported tool.")
}

export function ToolWorkspace({
  title,
  description,
  inputLabel = "Input",
  outputLabel = "Output",
  inputPlaceholder = "Paste or type your content here...",
  initialInput = "",
  tool,
  mode = "encode",
  downloadName = "devtoolkit-output.txt",
}: ToolWorkspaceProps) {
  const [input, setInput] = useState(initialInput)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  function run() {
    try {
      setError("")
      setOutput(processTool(tool, input, mode))
    } catch (err) {
      setOutput("")
      setError(err instanceof Error ? err.message : "Unable to process input.")
    }
  }

  function reset() {
    setInput(initialInput)
    setOutput("")
    setError("")
    setCopied(false)
  }

  async function copyOutput() {
    if (!output) return

    await navigator.clipboard.writeText(output)
    setCopied(true)

    window.setTimeout(() => setCopied(false), 1500)
  }

  function downloadOutput() {
    if (!output) return

    const blob = new Blob([output], {
      type: "text/plain;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")

    anchor.href = url
    anchor.download = downloadName
    anchor.click()

    URL.revokeObjectURL(url)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <Sparkles size={14} aria-hidden="true" />
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <label htmlFor="tool-input" className="text-sm font-bold">
              {inputLabel}
            </label>

            <span className="text-xs text-[var(--color-muted-foreground)]">
              {input.length.toLocaleString()} chars
            </span>
          </div>

          <textarea
            id="tool-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={inputPlaceholder}
            spellCheck={false}
            className="min-h-[360px] w-full resize-y rounded-xl border border-[var(--color-border)] bg-white/70 p-4 font-mono text-sm leading-6 text-[var(--color-foreground)] transition-colors duration-200 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-950/60"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={run}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              <Sparkles size={16} aria-hidden="true" />
              Run tool
            </button>

            <button
              type="button"
              onClick={reset}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] dark:bg-slate-900/70 dark:hover:bg-slate-800"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-sm font-bold">{outputLabel}</span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-slate-100 hover:text-[var(--color-foreground)] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800"
                aria-label="Copy output"
              >
                <Clipboard size={15} aria-hidden="true" />
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                type="button"
                onClick={downloadOutput}
                disabled={!output}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-slate-100 hover:text-[var(--color-foreground)] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800"
                aria-label="Download output"
              >
                <Download size={15} aria-hidden="true" />
                Download
              </button>
            </div>
          </div>

          <div
            className="min-h-[360px] overflow-auto rounded-xl border border-[var(--color-border)] bg-slate-950 p-4"
            aria-live="polite"
          >
            {error ? (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-slate-100">
                {output}
              </pre>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-center">
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Your output will appear here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Enter content and run the tool.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
