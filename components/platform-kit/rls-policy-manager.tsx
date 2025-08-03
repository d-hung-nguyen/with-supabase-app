"use client"

import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { platformKit } from "@/lib/pg-meta/platform-kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Shield, Plus, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const rlsPolicySchema = z.object({
  tableName: z.string().min(1, "Table name is required"),
  policyName: z.string().min(1, "Policy name is required"),
  operation: z.enum(["SELECT", "INSERT", "UPDATE", "DELETE"]),
  definition: z.string().min(1, "Policy definition is required"),
  schema: z.string().min(1),
})

type RLSPolicyForm = z.infer<typeof rlsPolicySchema>

export function RLSPolicyManager() {
  const [isCreating, setIsCreating] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RLSPolicyForm>({
    resolver: zodResolver(rlsPolicySchema),
    defaultValues: {
      schema: "public",
      operation: "SELECT" as const,
    },
  })

  const createPolicyMutation = useMutation({
    mutationFn: (data: RLSPolicyForm) => platformKit.createRLSPolicy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] })
      reset()
      setIsCreating(false)
    },
  })

  const onSubmit = (data: RLSPolicyForm) => {
    createPolicyMutation.mutate(data)
  }

  const operation = watch("operation")

  const getPolicyExample = (op: string) => {
    switch (op) {
      case "SELECT":
        return "auth.uid() = user_id"
      case "INSERT":
        return "auth.role() = 'authenticated'"
      case "UPDATE":
        return "auth.uid() = user_id"
      case "DELETE":
        return "auth.uid() = user_id AND auth.role() = 'authenticated'"
      default:
        return "true"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          Row Level Security Policies
        </h2>
        <Button onClick={() => setIsCreating(!isCreating)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Policy
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create RLS Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schema">Schema</Label>
                  <Input
                    id="schema"
                    {...register("schema")}
                    placeholder="public"
                  />
                  {errors.schema && (
                    <p className="text-sm text-red-500">
                      {errors.schema.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tableName">Table Name</Label>
                  <Input
                    id="tableName"
                    {...register("tableName")}
                    placeholder="users"
                  />
                  {errors.tableName && (
                    <p className="text-sm text-red-500">
                      {errors.tableName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policyName">Policy Name</Label>
                  <Input
                    id="policyName"
                    {...register("policyName")}
                    placeholder="Users can view own profile"
                  />
                  {errors.policyName && (
                    <p className="text-sm text-red-500">
                      {errors.policyName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operation">Operation</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "operation",
                        value as "SELECT" | "INSERT" | "UPDATE" | "DELETE"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SELECT">SELECT</SelectItem>
                      <SelectItem value="INSERT">INSERT</SelectItem>
                      <SelectItem value="UPDATE">UPDATE</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.operation && (
                    <p className="text-sm text-red-500">
                      {errors.operation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="definition">Policy Definition</Label>
                <Textarea
                  id="definition"
                  {...register("definition")}
                  placeholder={`Example: ${getPolicyExample(operation)}`}
                  rows={3}
                />
                {errors.definition && (
                  <p className="text-sm text-red-500">
                    {errors.definition.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Use PostgreSQL expressions. Common functions: auth.uid(),
                  auth.role(), auth.jwt()
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createPolicyMutation.isPending}>
                  {createPolicyMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Policy
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Common RLS Policy Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">User-specific data (SELECT)</h4>
              <code className="block text-xs bg-gray-100 p-2 rounded">
                auth.uid() = user_id
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Authenticated users only (INSERT)</h4>
              <code className="block text-xs bg-gray-100 p-2 rounded">
                auth.role() = 'authenticated'
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Admin access</h4>
              <code className="block text-xs bg-gray-100 p-2 rounded">
                auth.jwt() -&gt;&gt; 'role' = 'admin'
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Public read access</h4>
              <code className="block text-xs bg-gray-100 p-2 rounded">
                true
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
