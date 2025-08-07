"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { LeafyGreenNav } from "./leafygreen-nav"
import AtlasSidebar from "./atlas-sidebar"

interface AtlasLayoutProps {
  children: React.ReactNode
  activeItem?: string
}

export function AtlasLayout({ children, activeItem }: AtlasLayoutProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <LeafyGreenNav />
        <div className="flex">
          <AtlasSidebar activeItem={activeItem} />
          <main className="flex-1 p-6 ml-0">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  )
}
