"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DatabaseTables } from "./database-tables"
import { RealtimeMonitor } from "./realtime-monitor"
import { ExtensionsManager } from "./extensions-manager"
import { RLSPolicyManager } from "./rls-policy-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Activity, Puzzle, Shield } from "lucide-react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

export function SupabasePlatformDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Supabase Platform Kit</h1>
          <p className="text-gray-600 mt-2">
            Manage your Supabase database with advanced tools and real-time
            monitoring
          </p>
        </div>

        <Tabs defaultValue="tables" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="extensions" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              Extensions
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-6">
            <DatabaseTables />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RealtimeMonitor />
          </TabsContent>

          <TabsContent value="extensions" className="space-y-6">
            <ExtensionsManager />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <RLSPolicyManager />
          </TabsContent>
        </Tabs>
      </div>
    </QueryClientProvider>
  )
}
