import type { Metadata } from "next"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"

export const metadata: Metadata = {
  title: {
    default: "DevToolkit — Developer Utilities",
    template: "%s | DevToolkit",
  },
  description:
    "A fast, modern workspace of practical developer tools for formatting, encoding, decoding, testing and transforming data.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "Base64",
    "JWT decoder",
    "UUID generator",
    "regex tester",
    "developer toolkit",
  ],
  openGraph: {
    title: "DevToolkit — Developer Utilities",
    description:
      "Practical developer utilities in one focused workspace.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
