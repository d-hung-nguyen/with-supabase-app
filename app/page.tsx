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
            <h2 className="font-medium text-2xl mb-4 emerald-accent">
              🚀 Platform Kit Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/platform-kit" className="group">
                <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                  <h3 className="font-semibold mb-2 emerald-accent group-hover:text-primary">
                    Platform Kit Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete database management interface with tables, RLS, and
                    extensions.
                  </p>
                </div>
              </Link>

              <Link href="/crud-demo" className="group">
                <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                  <h3 className="font-semibold mb-2 emerald-accent group-hover:text-primary">
                    CRUD Demo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Live examples of auto-generated CRUD interfaces for your
                    database tables.
                  </p>
                </div>
              </Link>

              <Link href="/crud-comparison" className="group">
                <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                  <h3 className="font-semibold mb-2 emerald-accent group-hover:text-primary">
                    Before vs After
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See how Platform Kit reduces 630+ lines of code to just 3
                    lines.
                  </p>
                </div>
              </Link>

              <Link href="/test-platform" className="group">
                <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                  <h3 className="font-semibold mb-2 emerald-accent group-hover:text-primary">
                    Test Platform
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Test and debug Platform Kit functions with your database.
                  </p>
                </div>
              </Link>
            </div>

            <div className="glass-card p-6 emerald-glow">
              <h3 className="font-semibold text-lg mb-4 emerald-accent">
                🎉 What Platform Kit gives you:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1 text-foreground">
                    <li>✅ Auto-generated CRUD interfaces</li>
                    <li>✅ Schema-aware forms</li>
                    <li>✅ Built-in search & pagination</li>
                    <li>✅ RLS management</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1 text-foreground">
                    <li>✅ Real-time monitoring</li>
                    <li>✅ Extension management</li>
                    <li>✅ 99% less code to write</li>
                    <li>✅ Professional UI out of the box</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Database Tables Overview */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-4 emerald-accent">
                📊 Your Incentive Program Database Tables:
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {/* Core Business Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold emerald-accent text-base">
                    Core Business
                  </h4>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      agencies
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, name, region_id</div>
                      <div>• status, address, city</div>
                      <div>• zip_code, country</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      agents
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, email, role</div>
                      <div>• first_name, last_name</div>
                      <div>• agency_id, telephone</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      hotels
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, name, location</div>
                      <div>• region_id, status</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>
                </div>

                {/* Incentive Program Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold emerald-accent text-base">
                    Incentive Program
                  </h4>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      bookings
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, agent_id, hotel_id</div>
                      <div>• confirmation_number</div>
                      <div>• guest_name, arrival_date</div>
                      <div>• nights, room_type, status</div>
                      <div>• points_awarded, validated_by</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      points_ledger
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, user_id, booking_id</div>
                      <div>• points, type, notes</div>
                      <div>• created_at</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      campaign
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, name, description</div>
                      <div>• start_date, end_date</div>
                      <div>• bonus_multiplier</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>
                </div>

                {/* Supporting Tables */}
                <div className="space-y-3">
                  <h4 className="font-semibold emerald-accent text-base">
                    Supporting Data
                  </h4>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      rewards
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, user_id</div>
                      <div>• points_redeemed</div>
                      <div>• voucher_code, vendor</div>
                      <div>• status, issued_by</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      regions
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>• id, name</div>
                      <div>• created_at, updated_at</div>
                    </div>
                  </div>

                  <div className="glass-card p-3">
                    <div className="font-medium emerald-accent mb-1">
                      room_types
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
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
