"use client"

import { useState } from "react"
import { Copy, RotateCcw } from "lucide-react"

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim()

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    throw new Error("Enter a valid 6-digit HEX color.")
  }

  const value = Number.parseInt(clean, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  )
}

export default function ColorToolPage() {
  const [hex, setHex] = useState("#2563EB")
  const [rgb, setRgb] = useState("rgb(37, 99, 235)")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  function convertHex() {
    try {
      const { r, g, b } = hexToRgb(hex)
      setRgb(`rgb(${r}, ${g}, ${b})`)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid color.")
    }
  }

  function convertRgb() {
    const match = rgb.match(
      /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
    )

    if (!match) {
      setError("Use the format rgb(37, 99, 235).")
      return
    }

    const values = match.slice(1).map(Number)

    if (values.some((value) => value > 255)) {
      setError("RGB values must be between 0 and 255.")
      return
    }

    setHex(rgbToHex(values[0], values[1], values[2]))
    setError("")
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setHex("#2563EB")
    setRgb("rgb(37, 99, 235)")
    setError("")
    setCopied(false)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          Developer Tool
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Color Converter
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          Convert colors between HEX and RGB formats instantly.
        </p>
      </div>

      <div className="glass max-w-4xl rounded-2xl p-5 sm:p-6">
        <div
          className="h-32 rounded-2xl border border-[var(--color-border)] shadow-inner"
          style={{ backgroundColor: hex }}
          aria-label={`Color preview ${hex}`}
        />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="hex" className="text-sm font-bold">
              HEX
            </label>

            <div className="mt-2 flex gap-2">
              <input
                id="hex"
                value={hex}
                onChange={(event) => setHex(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm uppercase outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
              />

              <button
                type="button"
                onClick={() => copy(hex)}
                className="cursor-pointer rounded-xl border border-[var(--color-border)] px-3"
                aria-label="Copy HEX color"
              >
                <Copy size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={convertHex}
              className="mt-3 w-full cursor-pointer rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Convert HEX → RGB
            </button>
          </div>

          <div>
            <label htmlFor="rgb" className="text-sm font-bold">
              RGB
            </label>

            <div className="mt-2 flex gap-2">
              <input
                id="rgb"
                value={rgb}
                onChange={(event) => setRgb(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 font-mono text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]/20 dark:bg-slate-950/60"
              />

              <button
                type="button"
                onClick={() => copy(rgb)}
                className="cursor-pointer rounded-xl border border-[var(--color-border)] px-3"
                aria-label="Copy RGB color"
              >
                <Copy size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={convertRgb}
              className="mt-3 w-full cursor-pointer rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Convert RGB → HEX
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <RotateCcw size={16} />
          Reset
        </button>

        {copied && (
          <p className="mt-3 text-xs font-semibold text-[var(--color-muted-foreground)]">
            Copied to clipboard.
          </p>
        )}
      </div>
    </section>
  )
}
