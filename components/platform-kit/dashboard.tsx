"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Activity, Database, Edit, Puzzle, Shield } from "lucide-react"
import { DataManager } from "./data-manager"
import { DatabaseTables } from "./database-tables"
import { ExtensionsManager } from "./extensions-manager"
import { RealtimeMonitor } from "./realtime-monitor"
import { RLSPolicyManager } from "./rls-policy-manager"

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
          <h1 className="text-3xl font-bold emerald-accent">
            Incentive Program Platform Kit
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive database management with direct data manipulation
            tools and real-time monitoring
          </p>
        </div>

        <Tabs defaultValue="data" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Data Manager
            </TabsTrigger>
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

          <TabsContent value="data" className="space-y-6">
            <DataManager />
          </TabsContent>

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
