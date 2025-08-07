import { AuthButton } from "@/components/auth-button"
import { EnvVarWarning } from "@/components/env-var-warning"
import { Providers } from "@/components/providers"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { hasEnvVars } from "@/lib/utils"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

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
        <Providers>
          {/* Background Image */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/l2.jpg"
              alt="Background"
              className="absolute inset-0 object-cover w-full h-full -z-10"
              fill
              quality={100}
              priority
            />

            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 z-0">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold text-primary">
                    <Link href={"/"}>TA Incentive</Link>
                    <div className="flex items-center gap-2">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                </div>
              </nav>
            </div>
            <div className="absolute inset-0 bg-black/30 -z-30" />
            <main>{children}</main>
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 ">
              <Link
                href="https://staynergie.com"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Powered by Staynergie
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
