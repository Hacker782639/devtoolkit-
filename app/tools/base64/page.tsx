"use client"

import { useState } from "react"
import { ToolWorkspace } from "@/components/tools/tool-workspace"

export default function Base64ToolPage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="inline-flex rounded-xl border border-[var(--color-border)] bg-white/70 p-1 dark:bg-slate-900/70">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "encode"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-muted-foreground)]"
            }`}
          >
            Encode
          </button>

          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "decode"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-muted-foreground)]"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <ToolWorkspace
        title="Base64 Encoder / Decoder"
        description="Encode or decode Base64 text locally without sending your content to an external service."
        tool="base64"
        mode={mode}
        downloadName="base64-output.txt"
      />
    </div>
  )
}
