import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import { EnvVarWarning } from "@/components/env-var-warning"
import { AuthButton } from "@/components/auth-button"
import { hasEnvVars } from "@/lib/utils"
import "./globals.css"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"}>Incentive Program Platform</Link>
                <div className="flex items-center gap-4 text-sm font-normal">
                  <Link href={"/platform-kit"} className="hover:underline">
                    Platform Kit
                  </Link>
                  <Link href={"/crud-demo"} className="hover:underline">
                    CRUD Demo
                  </Link>
                  <Link href={"/crud-comparison"} className="hover:underline">
                    CRUD Comparison
                  </Link>
                  <Link href={"/test-platform"} className="hover:underline">
                    Test Platform
                  </Link>
                  <Link href={"/protected"} className="hover:underline">
                    Protected
                  </Link>
                </div>
              </div>
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
