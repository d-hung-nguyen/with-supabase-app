import { Hero } from "@/components/hero"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps"
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps"
import { hasEnvVars } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />

          {/* Platform Kit Showcase */}
          <section className="flex flex-col gap-6">
            <h2 className="font-medium text-2xl mb-4">
              🚀 Platform Kit Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/platform-kit" className="group">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 group-hover:text-yellow-600">
                    Platform Kit Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Complete database management interface with tables, RLS, and
                    extensions.
                  </p>
                </div>
              </Link>

              <Link href="/crud-demo" className="group">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 group-hover:text-yellow-600">
                    CRUD Demo
                  </h3>
                  <p className="text-sm text-gray-600">
                    Live examples of auto-generated CRUD interfaces for your
                    database tables.
                  </p>
                </div>
              </Link>

              <Link href="/crud-comparison" className="group">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 group-hover:text-yellow-500">
                    Before vs After
                  </h3>
                  <p className="text-sm text-gray-600">
                    See how Platform Kit reduces 630+ lines of code to just 3
                    lines.
                  </p>
                </div>
              </Link>

              <Link href="/test-platform" className="group">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 group-hover:text-yellow-500">
                    Test Platform
                  </h3>
                  <p className="text-sm text-gray-600">
                    Test and debug Platform Kit functions with your database.
                  </p>
                </div>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">
                🎉 What Platform Kit gives you:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1">
                    <li>✅ Auto-generated CRUD interfaces</li>
                    <li>✅ Schema-aware forms</li>
                    <li>✅ Built-in search & pagination</li>
                    <li>✅ RLS management</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>✅ Real-time monitoring</li>
                    <li>✅ Extension management</li>
                    <li>✅ 99% less code to write</li>
                    <li>✅ Professional UI out of the box</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Database Tables Overview */}
            <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">
                📊 Your Incentive Program Database Tables:
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {/* Core Business Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#FFD700] text-base">
                    Core Business
                  </h4>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      agencies
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, name, region_id</div>
                      <div>• status, address, city</div>
                      <div>• zip_code, country</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      agents
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, email, role</div>
                      <div>• first_name, last_name</div>
                      <div>• agency_id, telephone</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      hotels
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, name, location</div>
                      <div>• region_id, status</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>
                </div>

                {/* Incentive Program Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#FFD700] text-base">
                    Incentive Program
                  </h4>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      bookings
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, agent_id, hotel_id</div>
                      <div>• confirmation_number</div>
                      <div>• guest_name, arrival_date</div>
                      <div>• nights, room_type, status</div>
                      <div>• points_awarded, validated_by</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      points_ledger
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, user_id, booking_id</div>
                      <div>• points, type, notes</div>
                      <div>• created_at</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      campaign
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, name, description</div>
                      <div>• start_date, end_date</div>
                      <div>• bonus_multiplier</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>
                </div>

                {/* Supporting Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#FFD700] text-base">
                    Supporting Data
                  </h4>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      rewards
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, user_id</div>
                      <div>• points_redeemed</div>
                      <div>• voucher_code, vendor</div>
                      <div>• status, issued_by</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      regions
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, name</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded border">
                    <div className="font-medium text-[#FFD700] mb-1">
                      room_types
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• id, hotel_id</div>
                      <div>• type_name</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD700]/10 rounded border border-[#FFD700]/20">
                <div className="text-sm">
                  <span className="font-medium text-[#FFD700]">
                    🚀 Platform Kit automatically generates:
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    Full CRUD interfaces for all 9 tables with forms,
                    validation, search, pagination, and role-based security
                    (RLS) - all from your database schema!
                  </span>
                </div>
              </div>
            </div>
          </section>

          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  )
}
