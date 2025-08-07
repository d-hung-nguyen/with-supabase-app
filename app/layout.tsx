import { AuthButton } from "@/components/auth-button"
import { EnvVarWarning } from "@/components/env-var-warning"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Providers } from "@/components/providers"
import { hasEnvVars } from "@/lib/utils"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Geist } from "next/font/google"
import "./globals.css"
import LeafyGreenNav from "@/components/leafygreen-nav"
import AtlasSidebar from "@/components/atlas-sidebar"

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen bg-background">
              {/* Top Navigation */}
              <div className="fixed top-4 right-4 z-50">
                <ThemeSwitcher />
              </div>

              <LeafyGreenNav
                projectName="Platform Kit Demo"
                tabs={[
                  { name: "Home", href: "/", active: true },
                  {
                    name: "Platform Kit",
                    href: "/platform-kit",
                    active: false,
                  },
                  { name: "CRUD Demo", href: "/crud-demo", active: false },
                  {
                    name: "Before vs After",
                    href: "/crud-comparison",
                    active: false,
                  },
                  {
                    name: "Test Platform",
                    href: "/test-platform",
                    active: false,
                  },
                ]}
              />

              {/* Main Content Area */}
              <div className="flex">
                {/* Sidebar */}
                <AtlasSidebar activeItem="Dashboard" />

                {/* Page Content */}
                <main className="flex-1 p-6 ml-64">{children}</main>
              </div>
            </div>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 ml-64">
              <p>
                Powered by{" "}
                <a
                  href="//staynergie.com"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Staynergie
                </a>
              </p>
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </footer>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
