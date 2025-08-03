"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { platformKit } from "@/lib/pg-meta/platform-kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Loader2, Database, Table2, Shield, Key } from "lucide-react"

interface TableInfo {
  id: number
  schema: string
  name: string
  rls_enabled: boolean
  rls_forced: boolean
  replica_identity: string
  bytes: number
  size: string
  live_rows_estimate: number
  dead_rows_estimate: number
  comment: string | null
  columns?: unknown[]
  primary_keys?: { name: string }[]
}

export function DatabaseTables() {
  const [selectedSchema, setSelectedSchema] = useState("public")
  const queryClient = useQueryClient()

  const {
    data: tables,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tables", selectedSchema],
    queryFn: async () => {
      try {
        const result = await platformKit.getTables()
        return result
      } catch (err) {
        throw err
      }
    },
  })

  const enableRLSMutation = useMutation({
    mutationFn: ({
      tableName,
      enable,
    }: {
      tableName: string
      enable: boolean
    }) =>
      enable
        ? platformKit.enableRLS(tableName)
        : platformKit.disableRLS(tableName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables", selectedSchema] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading tables...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">
          Error loading tables: {(error as Error).message}
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-left">
          <p className="text-blue-800 text-sm">
            <strong>Debug Info:</strong>
            <br />• Schema: {selectedSchema}
            <br />• Error details: {(error as Error).message}
          </p>
        </div>
      </div>
    )
  }

  if (!tables || tables.length === 0) {
    return (
      <div className="p-8 text-center">
        <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tables found
        </h3>
        <p className="text-gray-500">
          No tables found in the "{selectedSchema}" schema.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-left">
          <p className="text-blue-800 text-sm">
            <strong>Debug Info:</strong>
            <br />• Schema: {selectedSchema}
            <br />• Tables data: {JSON.stringify(tables)}
            <br />• Loading: {isLoading ? "Yes" : "No"}
            <br />• Error: {error ? (error as Error).message : "None"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Database className="mr-2 h-6 w-6" />
          Database Tables
        </h2>
        <select
          value={selectedSchema}
          onChange={(e) => setSelectedSchema(e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="public">public</option>
          <option value="auth">auth</option>
          <option value="storage">storage</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tables?.map((table: TableInfo) => (
          <Card key={table.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Table2 className="mr-2 h-4 w-4" />
                  {table.name}
                </span>
                <Badge variant={table.rls_enabled ? "default" : "secondary"}>
                  {table.rls_enabled ? "RLS ON" : "RLS OFF"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Schema: {table.schema}</span>
                <span>Size: {table.size}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Rows: ~{table.live_rows_estimate.toLocaleString()}</span>
                <span>Columns: {table.columns?.length || 0}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Row Level Security</span>
                </div>
                <Switch
                  checked={table.rls_enabled}
                  onCheckedChange={(enabled) =>
                    enableRLSMutation.mutate({
                      tableName: table.name,
                      enable: enabled,
                    })
                  }
                  disabled={enableRLSMutation.isPending}
                />
              </div>

              {table.primary_keys && table.primary_keys.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Key className="mr-1 h-3 w-3" />
                    Primary Keys:{" "}
                    {table.primary_keys
                      .map((pk: { name: string }) => pk.name)
                      .join(", ")}
                  </div>
                </div>
              )}

              {table.comment && (
                <div className="pt-2 text-xs text-gray-500 italic">
                  {table.comment}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Debug info - temporary */}
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Tables count: {tables?.length || 0}</p>
        <p>Loading: {isLoading ? "Yes" : "No"}</p>
        <p>Error: {error ? String(error) : "None"}</p>
        <details className="mt-2">
          <summary>Raw data</summary>
          <pre className="text-xs mt-2 bg-white p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(tables, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  )
}
