"useimport { platformKit } from '@/lib/pg-meta/platform-kit'client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { platformKit } from "@/lib/pg-meta/platform-kit"
import { PostgresExtension } from "@/lib/pg-meta/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Puzzle, Check, X } from "lucide-react"

export function ExtensionsManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const queryClient = useQueryClient()

  const {
    data: extensions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["extensions"],
    queryFn: () => platformKit.getExtensions(),
  })

  const enableExtensionMutation = useMutation({
    mutationFn: (extensionName: string) =>
      platformKit.enableExtension(extensionName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extensions"] })
    },
  })

  const filteredExtensions = extensions?.filter(
    (ext: PostgresExtension) =>
      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ext.comment &&
        ext.comment.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading extensions...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">
          Error loading extensions: {(error as Error).message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Puzzle className="mr-2 h-6 w-6" />
          PostgreSQL Extensions
        </h2>
        <Input
          placeholder="Search extensions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExtensions?.map((extension: PostgresExtension) => (
          <Card
            key={extension.name}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-base">{extension.name}</span>
                <Badge
                  variant={
                    extension.installed_version ? "default" : "secondary"
                  }
                >
                  {extension.installed_version ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <X className="mr-1 h-3 w-3" />
                  )}
                  {extension.installed_version ? "Enabled" : "Disabled"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <div>Schema: {extension.schema || "N/A"}</div>
                <div>Default Version: {extension.default_version}</div>
                {extension.installed_version && (
                  <div>Installed Version: {extension.installed_version}</div>
                )}
              </div>

              {extension.comment && (
                <p className="text-xs text-gray-500 italic">
                  {extension.comment}
                </p>
              )}

              <div className="pt-2">
                {!extension.installed_version ? (
                  <Button
                    onClick={() =>
                      enableExtensionMutation.mutate(extension.name)
                    }
                    disabled={enableExtensionMutation.isPending}
                    size="sm"
                    className="w-full"
                  >
                    {enableExtensionMutation.isPending ? (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    ) : null}
                    Enable Extension
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled
                  >
                    Extension Enabled
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExtensions?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No extensions found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
