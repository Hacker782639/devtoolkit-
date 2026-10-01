"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  Home,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { ToolSearch } from "@/components/tools/tool-search"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/tools", label: "All Tools", icon: Wrench },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("devtoolkit-theme")
    const isDark = saved === "dark"

    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("devtoolkit-theme", next ? "dark" : "light")
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/70 bg-white/75 backdrop-blur-xl dark:bg-slate-950/75">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-md">
              <Code2 size={20} aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm font-bold tracking-tight">DevToolkit</p>
              <p className="hidden text-[11px] text-[var(--color-muted-foreground)] sm:block">
                Developer utilities
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] ${
                    active
                      ? "bg-blue-50 text-[var(--color-primary)] dark:bg-blue-950/40"
                      : "text-[var(--color-muted-foreground)] hover:bg-slate-100 hover:text-[var(--color-foreground)] dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ToolSearch />

            <button
              type="button"
              onClick={toggleTheme}
              className="cursor-pointer rounded-xl p-2.5 text-[var(--color-muted-foreground)] transition-all duration-200 hover:bg-slate-100 hover:text-[var(--color-foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] dark:hover:bg-white/5"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="cursor-pointer rounded-xl p-2.5 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--color-border)]/70 bg-white/90 px-4 py-4 backdrop-blur-xl dark:bg-slate-950/90 md:hidden">
            <nav className="space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-blue-50 text-[var(--color-primary)] dark:bg-blue-950/40"
                        : "text-[var(--color-muted-foreground)] hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}

              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--color-muted-foreground)] hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
                {dark ? "Light mode" : "Dark mode"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-white/60 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-[var(--color-muted-foreground)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles size={15} />
            <span>DevToolkit</span>
          </div>
          <span>Built for developers.</span>
        </div>
      </footer>
    </div>
  )
}
