"use client"

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { platformKit } from "@/lib/pg-meta/platform-kit"

const queryClient = new QueryClient()

function TestComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test-tables"],
    queryFn: () => platformKit.getTables(),
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Platform Kit Test</h1>

      <div className="space-y-4">
        <div>
          <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
        </div>

        <div>
          <strong>Error:</strong> {error ? (error as Error).message : "None"}
        </div>

        <div>
          <strong>Data:</strong>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
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
