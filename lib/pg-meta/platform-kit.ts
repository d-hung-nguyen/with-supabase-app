import { createClient } from "@/lib/supabase/client"
import { PostgresTable, PostgresColumn, PostgresExtension } from "./types"

export class SupabasePlatformKit {
  private supabase = createClient()

  // Database Schema Operations
  async getTables(schema: string = "public"): Promise<PostgresTable[]> {
    try {
      // Try the main function first
      const { data, error } = await this.supabase.rpc("get_schema_tables", {
        schema_name: schema,
      })

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error with get_schema_tables:", error)
        
        // If function doesn't exist, try basic table query
        if (error.message?.includes('function') || error.message?.includes('does not exist')) {
          const { data: basicData, error: basicError } = await this.supabase
            .from('information_schema.tables')
            .select('*')
            .eq('table_schema', schema)
            .eq('table_type', 'BASE TABLE')
            
          if (!basicError && basicData) {
            return basicData.map((table: Record<string, unknown>, index: number) => ({
              id: index + 1,
              schema: table.table_schema as string,
              name: table.table_name as string,
              rls_enabled: false,
              rls_forced: false,
              replica_identity: 'DEFAULT' as const,
              bytes: 0,
              size: '0 bytes',
              live_rows_estimate: 0,
              dead_rows_estimate: 0,
              comment: null,
              primary_keys: [],
              relationships: []
            }))
          }
        }
        
        // Fallback: try to get tables using information_schema
        const { data: fallbackData, error: fallbackError } =
          await this.supabase.rpc("get_tables_fallback", {
            schema_name: schema,
          })

        if (fallbackError) {
          // eslint-disable-next-line no-console
          console.error("Error with get_tables_fallback:", fallbackError)
          throw new Error(`Failed to fetch tables: ${fallbackError.message}`)
        }
        return fallbackData || []
      }
      return data || []
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("getTables error:", err)
      throw err
    }
  }

  async getTableColumns(
    tableName: string,
    schema: string = "public"
  ): Promise<PostgresColumn[]> {
    const { data, error } = await this.supabase.rpc("get_table_columns", {
      table_name: tableName,
      table_schema: schema,
    })

    if (error) throw new Error(`Failed to fetch columns: ${error.message}`)
    return data || []
  }

  async getTableRelationships(tableName: string, schema: string = "public") {
    const { data, error } = await this.supabase.rpc("get_table_relationships", {
      table_name: tableName,
      table_schema: schema,
    })

    if (error)
      throw new Error(`Failed to fetch relationships: ${error.message}`)
    return data || []
  }

  // RLS (Row Level Security) Operations
  async enableRLS(tableName: string, schema: string = "public") {
    const { error } = await this.supabase.rpc("enable_rls", {
      table_name: tableName,
      table_schema: schema,
    })

    if (error) throw new Error(`Failed to enable RLS: ${error.message}`)
    return { success: true }
  }

  async disableRLS(tableName: string, schema: string = "public") {
    const { error } = await this.supabase.rpc("disable_rls", {
      table_name: tableName,
      table_schema: schema,
    })

    if (error) throw new Error(`Failed to disable RLS: ${error.message}`)
    return { success: true }
  }

  async createRLSPolicy(params: {
    tableName: string
    policyName: string
    operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE"
    definition: string
    schema?: string
  }) {
    const {
      tableName,
      policyName,
      operation,
      definition,
      schema = "public",
    } = params

    const { error } = await this.supabase.rpc("create_rls_policy", {
      table_name: tableName,
      table_schema: schema,
      policy_name: policyName,
      policy_operation: operation,
      policy_definition: definition,
    })

    if (error) throw new Error(`Failed to create RLS policy: ${error.message}`)
    return { success: true }
  }

  // Extensions Management
  async getExtensions(): Promise<PostgresExtension[]> {
    // Use RPC function to get extensions since pg_available_extensions is not accessible
    const { data, error } = await this.supabase.rpc("get_available_extensions")

    if (error) {
      // Fallback to installed extensions only
      const { data: installedData, error: installedError } =
        await this.supabase.rpc("get_installed_extensions")

      if (installedError) {
        throw new Error(`Failed to fetch extensions: ${installedError.message}`)
      }
      return installedData || []
    }
    return data || []
  }

  async enableExtension(extensionName: string) {
    const { error } = await this.supabase.rpc("enable_extension", {
      extension_name: extensionName,
    })

    if (error) throw new Error(`Failed to enable extension: ${error.message}`)
    return { success: true }
  }

  // Database Functions
  async createFunction(params: {
    functionName: string
    returnType: string
    parameters: string
    body: string
    language?: string
    schema?: string
  }) {
    const {
      functionName,
      returnType,
      parameters,
      body,
      language = "plpgsql",
      schema = "public",
    } = params

    const { error } = await this.supabase.rpc("create_function", {
      function_name: functionName,
      function_schema: schema,
      return_type: returnType,
      function_parameters: parameters,
      function_body: body,
      function_language: language,
    })

    if (error) throw new Error(`Failed to create function: ${error.message}`)
    return { success: true }
  }

  // Real-time Subscriptions
  subscribeToTable(
    tableName: string,
    callback: (_payload: {
      eventType: "INSERT" | "UPDATE" | "DELETE"
      new: Record<string, unknown>
      old: Record<string, unknown>
    }) => void,
    event: "INSERT" | "UPDATE" | "DELETE" | "*" = "*"
  ) {
    return this.supabase
      .channel(`${tableName}_changes`)
      .on(
        "postgres_changes" as "system",
        {
          event,
          schema: "public",
          table: tableName,
        },
        (payload: Record<string, unknown>) => {
          callback({
            eventType:
              (payload.eventType as "INSERT" | "UPDATE" | "DELETE") || "INSERT",
            new: (payload.new as Record<string, unknown>) || {},
            old: (payload.old as Record<string, unknown>) || {},
          })
        }
      )
      .subscribe()
  }

  // Storage Operations
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file)

    if (error) throw new Error(`Failed to upload file: ${error.message}`)
    return data
  }

  async getPublicUrl(bucket: string, path: string) {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path)

    return data.publicUrl
  }

  // Analytics & Monitoring
  async getTableStats(tableName: string, schema: string = "public") {
    const { data, error } = await this.supabase.rpc("get_table_stats", {
      table_name: tableName,
      table_schema: schema,
    })

    if (error) throw new Error(`Failed to fetch table stats: ${error.message}`)
    return data
  }

  async getDatabaseSize() {
    const { data, error } = await this.supabase.rpc("get_database_size")

    if (error)
      throw new Error(`Failed to fetch database size: ${error.message}`)
    return data
  }

  // Backup Operations
  async createBackup(
    options: {
      tables?: string[]
      schema?: string
      format?: "sql" | "csv"
    } = {}
  ) {
    const { tables, schema = "public", format = "sql" } = options

    const { data, error } = await this.supabase.rpc("create_backup", {
      backup_tables: tables,
      backup_schema: schema,
      backup_format: format,
    })

    if (error) throw new Error(`Failed to create backup: ${error.message}`)
    return data
  }

  // Advanced CRUD helpers
  async createRecord(tableName: string, data: Record<string, unknown>, _schema: string = "public") {
    const { data: result, error } = await this.supabase
      .from(tableName)
      .insert([data])
      .select()
    
    if (error) throw new Error(`Failed to create record: ${error.message}`)
    return result
  }

  async updateRecord(
    tableName: string, 
    id: string | number, 
    updates: Record<string, unknown>,
    _schema: string = "public"
  ) {
    // Get table info to find primary key
    const tables = await this.getTables(_schema)
    const _table = tables.find(t => t.name === tableName)
    
    const { data: result, error } = await this.supabase
      .from(tableName)
      .update(updates)
      .eq('id', id) // Default to 'id', could be improved to detect actual PK
      .select()
    
    if (error) throw new Error(`Failed to update record: ${error.message}`)
    return result
  }

  async deleteRecord(tableName: string, id: string | number, _schema: string = "public") {
    const { error } = await this.supabase
      .from(tableName)
      .delete()
      .eq('id', id) // Default to 'id', could be improved to detect actual PK
    
    if (error) throw new Error(`Failed to delete record: ${error.message}`)
    return { success: true }
  }

  async getRecords(
    tableName: string, 
    options: {
      _schema?: string
      page?: number
      pageSize?: number
      search?: string
      searchColumn?: string
      orderBy?: string
      orderDirection?: 'asc' | 'desc'
    } = {}
  ) {
    const {
      _schema = "public",
      page = 1,
      pageSize = 10,
      search,
      searchColumn,
      orderBy = 'id',
      orderDirection = 'desc'
    } = options

    let query = this.supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order(orderBy, { ascending: orderDirection === 'asc' })

    if (search && searchColumn) {
      query = query.ilike(searchColumn, `%${search}%`)
    }

    const { data, error, count } = await query

    if (error) throw new Error(`Failed to fetch records: ${error.message}`)
    
    return {
      data: data || [],
      count: count || 0,
      totalPages: Math.ceil((count || 0) / pageSize),
      currentPage: page,
      pageSize
    }
  }

  // Quick scaffold generator
  async generateCRUDComponent(tableName: string, schema: string = "public") {
    const tables = await this.getTables(schema)
    const table = tables.find(t => t.name === tableName)
    
    if (!table) {
      throw new Error(`Table ${tableName} not found in schema ${schema}`)
    }

    const columns = await this.getTableColumns(tableName, schema)
    
    return {
      table,
      columns,
      hasRLS: table.rls_enabled,
      primaryKey: columns.find(col => col.is_identity)?.name || 'id',
      editableColumns: columns.filter(col => !col.is_identity),
      requiredColumns: columns.filter(col => !col.is_nullable && !col.is_identity)
    }
  }
}

// Singleton instance
export const platformKit = new SupabasePlatformKit()
