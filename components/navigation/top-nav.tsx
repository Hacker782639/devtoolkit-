'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Braces,
  Code2,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
]

export function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)

  function toggleTheme() {
    setDark((current) => !current)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md">
            <Braces size={19} strokeWidth={2.5} />
          </span>

          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Dev<span className="text-[#2563EB]">Toolkit</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
                  active
                    ? 'bg-[#2563EB]/10 text-[#2563EB]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Search tools"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/tools"
            className="ml-1 flex cursor-pointer items-center gap-2 rounded-lg bg-[#EA580C] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          >
            <Sparkles size={16} />
            Open Toolkit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-white/10"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-950/90">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200',
                    active
                      ? 'bg-[#2563EB]/10 text-[#2563EB]'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/tools"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#EA580C] px-4 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
            >
              <Code2 size={16} />
              Open Toolkit
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
