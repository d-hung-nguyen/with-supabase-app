import { redirect } from "next/navigation"

import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps"
import { createClient } from "@/lib/supabase/server"
import { InfoIcon } from "lucide-react"

// Force dynamic rendering since this page requires authentication
export const dynamic = "force-dynamic"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect("/auth/login")
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="glass-card p-4 text-foreground flex gap-3 items-center emerald-glow">
          <InfoIcon size="16" strokeWidth={2} className="emerald-accent" />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4 emerald-accent">
          Your user details
        </h2>
        <div className="glass-card p-4 w-full">
          <pre className="text-xs font-mono text-foreground max-h-32 overflow-auto scrollable-card">
            {JSON.stringify(data.claims, null, 2)}
          </pre>
        </div>
      </div>
      <div className="glass-card p-6">
        <h2 className="font-bold text-2xl mb-4 emerald-accent">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  )
}
