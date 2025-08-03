import { SupabasePlatformDashboard } from "@/components/platform-kit/dashboard"

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic'

export default function PlatformKitPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supabase Platform Kit</h1>
        <p className="text-muted-foreground">
          Comprehensive database management and monitoring tools
        </p>
      </div>
      <SupabasePlatformDashboard />
    </div>
  )
}
