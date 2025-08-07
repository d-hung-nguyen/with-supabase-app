import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { AuthButton } from "@/components/auth-button"
import { EnvVarWarning } from "@/components/env-var-warning"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { hasEnvVars } from "@/lib/utils"
import { Provider } from "@/components/providers"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Platform Kit - Next.js Supabase CRUD Demo",
  description:
    "Auto-generated CRUD interfaces for any database table with Platform Kit",
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
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <Provider>
          <div className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>TA Incentive</Link>
                    <div className="flex items-center gap-2">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                </div>
              </nav>
            </div>
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
