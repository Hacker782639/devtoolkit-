"use client"

import Link from "next/link"
import { Search, X } from "lucide-react"
import { useState } from "react"

const tools = [
  ["JSON Formatter", "Format and validate JSON.", "/tools/json"],
  ["Base64", "Encode and decode Base64.", "/tools/base64"],
  ["URL Encoder", "Encode and decode URLs.", "/tools/url"],
  ["JWT Decoder", "Inspect JWT structure.", "/tools/jwt"],
  ["UUID Generator", "Generate UUID values.", "/tools/uuid"],
  ["Hash Generator", "Generate SHA hashes.", "/tools/hash"],
  ["Timestamp", "Convert Unix timestamps.", "/tools/timestamp"],
  ["Regex Tester", "Test regular expressions.", "/tools/regex"],
  ["Color Converter", "Convert color formats.", "/tools/color"],
  ["Markdown", "Preview Markdown.", "/tools/markdown"],
  ["Text Utilities", "Transform and analyze text.", "/tools/text"],
] as const

export function ToolSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const results = tools.filter(([name, description]) =>
    `${name} ${description}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Search tools"
        className="cursor-pointer rounded-xl p-2.5 text-[var(--color-muted-foreground)] transition-all duration-200 hover:bg-slate-100 hover:text-[var(--color-foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] dark:hover:bg-white/5"
      >
        <Search size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(90vw,380px)] rounded-2xl border border-[var(--color-border)] bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:bg-slate-950/95">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3">
            <Search size={16} className="text-[var(--color-muted-foreground)]" />

            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            />

            <button
              type="button"
              onClick={() => {
                setQuery("")
                setOpen(false)
              }}
              className="cursor-pointer rounded-md p-1 hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close search"
            >
              <X size={15} />
            </button>
          </div>

          <div className="mt-2 max-h-72 overflow-y-auto">
            {results.length > 0 ? (
              results.map(([name, description, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <p className="text-sm font-bold">{name}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                    {description}
                  </p>
                </Link>
              ))
            ) : (
              <p className="px-3 py-6 text-center text-sm text-[var(--color-muted-foreground)]">
                No tools found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
