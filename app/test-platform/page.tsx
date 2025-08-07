"use client"

import { platformKit } from "@/lib/pg-meta/platform-kit"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

const queryClient = new QueryClient()

function TestComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test-tables"],
    queryFn: () => platformKit.getTables(),
  })

  return (
    <div className="container mx-auto py-8">
      <div className="glass-card p-8 mb-6">
        <h1 className="text-2xl font-bold mb-4 emerald-accent">
          Platform Kit Test
        </h1>

        <div className="space-y-4">
          <div className="glass-card p-4">
            <strong className="emerald-accent">Loading:</strong>{" "}
            <span className="text-muted-foreground">
              {isLoading ? "Yes" : "No"}
            </span>
          </div>

          <div className="glass-card p-4">
            <strong className="emerald-accent">Error:</strong>{" "}
            <span className="text-muted-foreground">
              {error ? (error as Error).message : "None"}
            </span>
          </div>

          <div className="glass-card p-4">
            <strong className="emerald-accent">Data:</strong>
            <pre className="mt-2 p-4 glass-card text-sm overflow-auto scrollable-card max-h-64 text-foreground">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  )
}
