"use client"

import Link from "next/link"
import {
  ArrowRight,
  Braces,
  Code2,
  FileText,
  Hash,
  Link2,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Timer,
  WandSparkles,
} from "lucide-react"
import { useMemo, useState } from "react"

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate and inspect JSON quickly.",
    href: "/tools/json",
    icon: Braces,
    category: "Format",
  },
  {
    name: "Base64",
    description: "Encode and decode Base64 strings.",
    href: "/tools/base64",
    icon: Code2,
    category: "Encode",
  },
  {
    name: "URL Encoder",
    description: "Safely encode and decode URL components.",
    href: "/tools/url",
    icon: Link2,
    category: "Encode",
  },
  {
    name: "JWT Decoder",
    description: "Inspect JWT headers and payloads locally.",
    href: "/tools/jwt",
    icon: ShieldCheck,
    category: "Security",
  },
  {
    name: "UUID Generator",
    description: "Generate unique UUID values instantly.",
    href: "/tools/uuid",
    icon: Hash,
    category: "Generate",
  },
  {
    name: "Hash Generator",
    description: "Generate SHA-256, SHA-384 and SHA-512 hashes.",
    href: "/tools/hash",
    icon: Hash,
    category: "Security",
  },
  {
    name: "Timestamp",
    description: "Convert Unix timestamps and dates.",
    href: "/tools/timestamp",
    icon: Timer,
    category: "Convert",
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions against sample text.",
    href: "/tools/regex",
    icon: WandSparkles,
    category: "Test",
  },
  {
    name: "Color Converter",
    description: "Convert common color formats.",
    href: "/tools/color",
    icon: Palette,
    category: "Design",
  },
  {
    name: "Markdown",
    description: "Preview Markdown with a clean workspace.",
    href: "/tools/markdown",
    icon: FileText,
    category: "Write",
  },
  {
    name: "Text Utilities",
    description: "Transform and analyze text quickly.",
    href: "/tools/text",
    icon: FileText,
    category: "Write",
  },
]

const categories = ["All", "Format", "Encode", "Security", "Generate", "Convert", "Test", "Design", "Write"]

export default function Home() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        category === "All" || tool.category === category

      const value = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase()

      return matchesCategory && value.includes(query.toLowerCase())
    })
  }, [query, category])

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.13),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(234,88,12,0.10),transparent_30%)]" />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20">
        <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              <Sparkles size={14} />
              Developer workspace
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your everyday{" "}
              <span className="text-[var(--color-primary)]">
                developer tools
              </span>
              , in one place.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted-foreground)] sm:text-lg">
              Format data, encode values, inspect tokens, test patterns and
              transform developer content without jumping between websites.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              >
                Explore tools
                <ArrowRight size={17} />
              </Link>

              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-primary)] px-5 py-3 text-sm font-bold text-[var(--color-primary)] transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                Browse toolkit
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--color-primary)]">
              TOOLKIT
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Find the tool you need
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">
              Focused utilities for common development tasks.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools..."
              aria-label="Search developer tools"
              className="input h-12 w-full bg-white pl-10 pr-4 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Tool categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                category === item
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-white text-[var(--color-muted-foreground)] hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const Icon = tool.icon

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="glass group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[var(--color-primary)] dark:bg-blue-950/40">
                      <Icon size={21} />
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                    />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    {tool.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold">{tool.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                    {tool.description}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="glass mt-8 rounded-2xl px-6 py-14 text-center">
            <Search
              size={28}
              className="mx-auto text-[var(--color-muted-foreground)]"
            />
            <h3 className="mt-4 font-bold">No tools found</h3>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Try another search or category.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
