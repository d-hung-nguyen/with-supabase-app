import type { Metadata } from "next"
import { Geist } from "next/font/google"
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
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <Link href={"/"}>Travel Agent Incentive Program</Link>
            </div>
          </nav>
        </div>
        {children}
      </body>
    </html>
  )
}
