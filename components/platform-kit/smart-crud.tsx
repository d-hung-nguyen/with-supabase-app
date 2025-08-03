"use client"

import React, { useState } from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { platformKit } from "@/lib/pg-meta/platform-kit"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Database, RefreshCw, Search } from "lucide-react"

// Create a QueryClient instance
const queryClient = new QueryClient()

// Types for better TypeScript support
interface TableRecord {
  [key: string]: string | number | boolean | null | undefined
}

interface ColumnInfo {
  name: string
  data_type: string
  is_nullable: boolean
  is_identity?: boolean
}

interface SmartCRUDProps {
  tableName: string
  schema?: string
  title?: string
  pageSize?: number
}

function SmartCRUDInner({
  tableName,
  schema = "public",
  title,
  pageSize = 10,
}: SmartCRUDProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TableRecord | null>(null)
  const [deleteItem, setDeleteItem] = useState<TableRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()
  const supabase = createClient()

  // Get table metadata
  const { data: tableInfo } = useQuery({
    queryKey: ["table-info", tableName, schema],
    queryFn: async () => {
      const tables = await platformKit.getTables(schema)
      return tables.find((t) => t.name === tableName)
    },
  })

  // Get table columns
  const { data: columns } = useQuery({
    queryKey: ["table-columns", tableName, schema],
    queryFn: async () => {
      try {
        const result = await platformKit.getTableColumns(tableName, schema)
        return result
      } catch {
        // Enhanced fallback based on known table schemas
        if (tableName === "agencies") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "name",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "region_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "status",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "address",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "zip_code",
              data_type: "character varying",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "city",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "country",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "agents") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "email",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "role",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "agency_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "first_name",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "last_name",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "telephone",
              data_type: "character varying",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "hotels") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "name",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "location",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "region_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "status",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "bookings") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "agent_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "hotel_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "confirmation_number",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "guest_name",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "arrival_date",
              data_type: "date",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "nights",
              data_type: "integer",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "room_type",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "status",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "points_awarded",
              data_type: "integer",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "validated_by",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "campaign") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "name",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "description",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "start_date",
              data_type: "date",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "end_date",
              data_type: "date",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "bonus_multiplier",
              data_type: "numeric",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "points_ledger") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "user_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "booking_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "points",
              data_type: "integer",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "type",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "notes",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "rewards") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "user_id",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "points_redeemed",
              data_type: "integer",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "voucher_code",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "vendor",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "status",
              data_type: "text",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "issued_by",
              data_type: "uuid",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "regions") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "name",
              data_type: "text",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "created_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
            {
              name: "updated_at",
              data_type: "timestamp with time zone",
              is_nullable: true,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        if (tableName === "room_types") {
          return [
            {
              name: "id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: true,
            },
            {
              name: "hotel_id",
              data_type: "uuid",
              is_nullable: false,
              is_identity: false,
            },
            {
              name: "type_name",
              data_type: "character varying",
              is_nullable: false,
              is_identity: false,
            },
          ] as ColumnInfo[]
        }

        // Generic fallback for unknown tables
        return [
          {
            name: "id",
            data_type: "integer",
            is_nullable: false,
            is_identity: true,
          },
          {
            name: "name",
            data_type: "text",
            is_nullable: true,
            is_identity: false,
          },
          {
            name: "created_at",
            data_type: "timestamp",
            is_nullable: true,
            is_identity: false,
          },
        ] as ColumnInfo[]
      }
    },
  })

  // Get table data with pagination and search
  const {
    data: tableData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["table-data", tableName, schema, currentPage, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

      // Add search functionality if searchTerm exists
      if (searchTerm && columns) {
        const textColumns = columns.filter(
          (col) =>
            col.data_type === "text" ||
            col.data_type === "varchar" ||
            col.data_type === "character varying"
        )

        if (textColumns.length > 0) {
          const searchColumn = textColumns[0].name
          query = query.ilike(searchColumn, `%${searchTerm}%`)
        }
      }

      const { data, error, count } = await query
      if (error) throw error

      return { data, count }
    },
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newItem: Record<string, unknown>) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert([newItem])
        .select()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-data", tableName] })
      setIsCreateOpen(false)
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string | number
      updates: Record<string, unknown>
    }) => {
      const primaryKey = columns?.find((col) => col.is_identity) || columns?.[0]
      if (!primaryKey) throw new Error("No primary key found")

      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(primaryKey.name, id)
        .select()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-data", tableName] })
      setEditingItem(null)
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const primaryKey = columns?.find((col) => col.is_identity) || columns?.[0]
      if (!primaryKey) throw new Error("No primary key found")

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(primaryKey.name, id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-data", tableName] })
    },
  })

  const handleCreate = (formData: FormData) => {
    const newItem: Record<string, unknown> = {}
    columns?.forEach((col) => {
      if (!col.is_identity) {
        // Skip auto-generated columns
        const value = formData.get(col.name)
        if (value) newItem[col.name] = value
      }
    })
    createMutation.mutate(newItem)
  }

  const handleUpdate = (formData: FormData) => {
    if (!editingItem || !columns) return

    const primaryKey = columns.find((col) => col.is_identity) || columns[0]
    const updates: Record<string, unknown> = {}

    columns.forEach((col) => {
      if (!col.is_identity) {
        const value = formData.get(col.name)
        if (value !== null) updates[col.name] = value
      }
    })

    updateMutation.mutate({
      id: editingItem[primaryKey.name] as string | number,
      updates,
    })
  }

  const handleDelete = (item: TableRecord) => {
    if (!columns) return
    const primaryKey = columns.find((col) => col.is_identity) || columns[0]
    deleteMutation.mutate(item[primaryKey.name] as string | number)
  }

  const getItemId = (item: TableRecord) => {
    if (!columns) return null
    const primaryKey = columns.find((col) => col.is_identity) || columns[0]
    return item[primaryKey.name] as string | number
  }

  const totalPages = Math.ceil((tableData?.count || 0) / pageSize)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading {tableName}...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">
          Error loading {tableName}: {String(error)}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Database className="mr-2 h-8 w-8" />
            {title || `${tableName} Management`}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage {tableName} records • {tableData?.count || 0} total records
            {tableInfo && (
              <Badge variant="outline" className="ml-2">
                {tableInfo.rls_enabled ? "RLS ON" : "RLS OFF"}
              </Badge>
            )}
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New {tableName} Record</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              {columns
                ?.filter((col) => !col.is_identity)
                .map((column) => {
                  const getInputType = () => {
                    if (column.data_type === "integer") return "number"
                    if (column.data_type === "date") return "date"
                    if (column.data_type === "timestamp with time zone")
                      return "datetime-local"
                    if (column.data_type === "numeric") return "number"
                    if (column.name.includes("email")) return "email"
                    if (
                      column.name.includes("telephone") ||
                      column.name.includes("phone")
                    )
                      return "tel"
                    return "text"
                  }

                  return (
                    <div key={column.name}>
                      <Label htmlFor={column.name}>
                        {column.name
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        {!column.is_nullable && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        id={column.name}
                        name={column.name}
                        type={getInputType()}
                        required={!column.is_nullable}
                        step={
                          column.data_type === "numeric" ? "0.01" : undefined
                        }
                        placeholder={
                          column.data_type === "uuid"
                            ? "Auto-generated UUID"
                            : column.name === "status"
                              ? "e.g., pending, active, inactive"
                              : column.name === "role"
                                ? "e.g., agent, hotel_admin, regional_admin, global_admin"
                                : column.name === "type"
                                  ? "e.g., booking, bonus, redemption"
                                  : `Enter ${column.name.replace(/_/g, " ")}`
                        }
                      />
                      {column.data_type === "uuid" &&
                        column.name.endsWith("_id") && (
                          <p className="text-xs text-gray-500 mt-1">
                            Foreign key reference - enter valid UUID
                          </p>
                        )}
                    </div>
                  )
                })}
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${tableName}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {columns?.map((column) => (
                  <TableHead key={column.name}>
                    {column.name}
                    {column.is_identity && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        PK
                      </Badge>
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.data?.map((item, index) => (
                <TableRow key={index}>
                  {columns?.map((column) => (
                    <TableCell key={column.name}>
                      {String(item[column.name] || "—")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit {tableName} Record</DialogTitle>
                          </DialogHeader>
                          {editingItem && (
                            <form action={handleUpdate} className="space-y-4">
                              {columns
                                ?.filter((col) => !col.is_identity)
                                .map((column) => {
                                  const getInputType = () => {
                                    if (column.data_type === "integer")
                                      return "number"
                                    if (column.data_type === "date")
                                      return "date"
                                    if (
                                      column.data_type ===
                                      "timestamp with time zone"
                                    )
                                      return "datetime-local"
                                    if (column.data_type === "numeric")
                                      return "number"
                                    if (column.name.includes("email"))
                                      return "email"
                                    if (
                                      column.name.includes("telephone") ||
                                      column.name.includes("phone")
                                    )
                                      return "tel"
                                    return "text"
                                  }

                                  const formatValue = (value: unknown) => {
                                    if (!value) return ""
                                    if (
                                      column.data_type === "date" &&
                                      typeof value === "string"
                                    ) {
                                      return value.split("T")[0] // Extract date part
                                    }
                                    if (
                                      column.data_type ===
                                        "timestamp with time zone" &&
                                      typeof value === "string"
                                    ) {
                                      return value.slice(0, 16) // Format for datetime-local
                                    }
                                    return String(value)
                                  }

                                  return (
                                    <div key={column.name}>
                                      <Label htmlFor={column.name}>
                                        {column.name
                                          .replace(/_/g, " ")
                                          .replace(/\b\w/g, (l) =>
                                            l.toUpperCase()
                                          )}
                                        {!column.is_nullable && (
                                          <span className="text-red-500 ml-1">
                                            *
                                          </span>
                                        )}
                                      </Label>
                                      <Input
                                        id={column.name}
                                        name={column.name}
                                        defaultValue={formatValue(
                                          editingItem[column.name]
                                        )}
                                        type={getInputType()}
                                        required={!column.is_nullable}
                                        step={
                                          column.data_type === "numeric"
                                            ? "0.01"
                                            : undefined
                                        }
                                      />
                                      {column.data_type === "uuid" &&
                                        column.name.endsWith("_id") && (
                                          <p className="text-xs text-gray-500 mt-1">
                                            Foreign key reference - enter valid
                                            UUID
                                          </p>
                                        )}
                                    </div>
                                  )
                                })}
                              <Button
                                type="submit"
                                disabled={updateMutation.isPending}
                              >
                                {updateMutation.isPending
                                  ? "Updating..."
                                  : "Update"}
                              </Button>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={
                          !!(
                            deleteItem &&
                            getItemId(deleteItem) === getItemId(item)
                          )
                        }
                        onOpenChange={(open) => {
                          if (!open) setDeleteItem(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteItem(item)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm text-muted-foreground mb-4">
                            This action cannot be undone. This will permanently
                            delete this record.
                          </p>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setDeleteItem(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                handleDelete(item)
                                setDeleteItem(null)
                              }}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, tableData?.count || 0)} of{" "}
            {tableData?.count || 0} results
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function SmartCRUD(props: SmartCRUDProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SmartCRUDInner {...props} />
    </QueryClientProvider>
  )
}
