import Link from "next/link"
import {
  ArrowRight,
  Braces,
  Code2,
  FileText,
  Hash,
  Link2,
  Palette,
  ShieldCheck,
  Timer,
  WandSparkles,
} from "lucide-react"

const tools = [
  ["JSON Formatter", "Format and validate JSON.", "/tools/json", Braces],
  ["Base64", "Encode and decode Base64.", "/tools/base64", Code2],
  ["URL Encoder", "Encode and decode URL values.", "/tools/url", Link2],
  ["JWT Decoder", "Inspect JWT structure locally.", "/tools/jwt", ShieldCheck],
  ["UUID Generator", "Generate UUID values.", "/tools/uuid", Hash],
  ["Hash Generator", "Generate SHA-256, SHA-384, and SHA-512 hashes.", "/tools/hash", Hash],
  ["Timestamp", "Convert dates and Unix timestamps.", "/tools/timestamp", Timer],
  ["Regex Tester", "Test regular expressions.", "/tools/regex", WandSparkles],
  ["Color Converter", "Convert common color formats.", "/tools/color", Palette],
  ["Markdown", "Preview Markdown content.", "/tools/markdown", FileText],
  ["Text Utilities", "Transform and analyze text.", "/tools/text", FileText],
] as const

export default function ToolsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-bold text-[var(--color-primary)]">
          DEVTOOLKIT
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          All developer tools
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
          A growing collection of focused utilities for everyday development.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(([name, description, href, Icon]) => (
          <Link
            key={href}
            href={href}
            className="glass group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[var(--color-primary)] dark:bg-blue-950/40">
                <Icon size={21} />
              </span>
              <ArrowRight
                size={18}
                className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
              />
            </div>

            <h2 className="mt-6 font-bold">{name}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
