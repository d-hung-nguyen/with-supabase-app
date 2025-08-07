"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Database,
  Download,
  Edit,
  Filter,
  RefreshCw,
  Upload,
} from "lucide-react"
import React, { useState } from "react"
import { SmartCRUD } from "./smart-crud"

export function DataManager() {
  const [selectedTable, setSelectedTable] = useState("agencies")
  const [isExporting, setIsExporting] = useState(false)
  const queryClient = useQueryClient()
  const supabase = createClient()

  // Bulk operations
  const exportData = useMutation({
    mutationFn: async (tableName: string) => {
      setIsExporting(true)
      const { data, error } = await supabase.from(tableName).select("*")

      if (error) throw error

      // Create CSV content
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]).join(",")
        const rows = data.map((row: Record<string, unknown>) =>
          Object.values(row)
            .map((val) =>
              typeof val === "string" && val.includes(",") ? `"${val}"` : val
            )
            .join(",")
        )
        const csv = [headers, ...rows].join("\n")

        // Download file
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${tableName}_export.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      setIsExporting(false)
    },
    onSuccess: () => {
      // Show success message
    },
  })

  const refreshStats = () => {
    queryClient.invalidateQueries({ queryKey: ["table-stats"] })
    queryClient.invalidateQueries({ queryKey: ["sidebar-table-stats"] })
  }

  // Available tables for selection
  const availableTables = [
    { name: "agencies", label: "Agencies" },
    { name: "agents", label: "Agents" },
    { name: "hotels", label: "Hotels" },
    { name: "regions", label: "Regions" },
    { name: "bookings", label: "Bookings" },
    { name: "campaign", label: "Campaign" },
    { name: "points_ledger", label: "Points Ledger" },
    { name: "rewards", label: "Rewards" },
    { name: "room_types", label: "Room Types" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 emerald-glow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold emerald-accent flex items-center gap-2">
              Data Manager
            </h2>
            <p className="text-muted-foreground mt-1">
              Comprehensive data management for your Incentive Program database
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={refreshStats}
              variant="outline"
              size="sm"
              className="glass-button"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Data Management Tabs */}
      <Tabs defaultValue="crud" className="space-y-4">
        <TabsList className="glass-card">
          <TabsTrigger value="crud" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            CRUD Operations
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Bulk Operations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Data Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crud" className="space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold emerald-accent">
                  {selectedTable.charAt(0).toUpperCase() +
                    selectedTable.slice(1)}{" "}
                  Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Full CRUD operations for the {selectedTable} table
                </p>
              </div>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger className="w-48 glass-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-modal">
                  {availableTables.map((table) => (
                    <SelectItem key={table.name} value={table.name}>
                      {table.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SmartCRUD Component */}
            <SmartCRUD tableName={selectedTable} />
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold emerald-accent mb-4 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Data
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Export table data as CSV files for backup or analysis
              </p>
              <div className="space-y-3">
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="glass-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-modal">
                    {availableTables.map((table) => (
                      <SelectItem key={table.name} value={table.name}>
                        {table.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => exportData.mutate(selectedTable)}
                  disabled={isExporting}
                  className="w-full glass-button"
                >
                  {isExporting ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export {selectedTable}
                </Button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold emerald-accent mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Data
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Import CSV data into your tables (coming soon)
              </p>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm">
                    CSV import functionality will be available soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold emerald-accent mb-4">
              Data Analytics Dashboard
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Advanced analytics and insights for your data (coming soon)
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <h4 className="font-medium emerald-accent mb-2">
                  Available Tables
                </h4>
                <p className="text-2xl font-bold">{availableTables.length}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <h4 className="font-medium emerald-accent mb-2">
                  Current Table
                </h4>
                <p className="text-2xl font-bold">
                  {availableTables.find((t) => t.name === selectedTable)
                    ?.label || selectedTable}
                </p>
              </div>
              <div className="glass-card p-4 text-center">
                <h4 className="font-medium emerald-accent mb-2">
                  Database Type
                </h4>
                <p className="text-2xl font-bold">Supabase</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
