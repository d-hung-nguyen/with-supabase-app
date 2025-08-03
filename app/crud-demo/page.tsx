import { SmartCRUD } from "@/components/platform-kit/smart-crud"
import {
  Database,
  Shield,
  Zap,
  Eye,
  Edit,
  Building,
  Users,
  TrendingUp,
} from "lucide-react"

export default function CRUDDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-[#FFD700]">
          Platform Kit CRUD Demo
        </h1>
        <p className="text-lg text-gray-600">
          This demonstrates how the Platform Kit makes it incredibly easy to
          create full CRUD interfaces for any table in your database. Below are
          live examples showing the actual tables in your Incentive Program
          database.
        </p>
      </div>

      {/* Core Business Tables Section */}
      <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 p-8 rounded-lg border border-[#FFD700]/20">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-6 flex items-center">
          <Building className="mr-3" size={28} />
          Core Business Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">agencies</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, name, region_id, status, address,
                  zip_code, city, country, created_at, updated_at
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to regions, has many
                  agents
                </div>
                <div>
                  <strong>RLS:</strong> Role-based access control enabled
                </div>
              </div>
              <SmartCRUD tableName="agencies" />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">agents</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, email, role, agency_id,
                  first_name, last_name, telephone, created_at, updated_at
                </div>
                <div>
                  <strong>Roles:</strong> agent, hotel_admin, regional_admin,
                  global_admin
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to agencies, has many
                  bookings & rewards
                </div>
              </div>
              <SmartCRUD tableName="agents" />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">hotels</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, name, location, region_id,
                  status, created_at, updated_at
                </div>
                <div>
                  <strong>Status:</strong> active, inactive
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to regions, has many
                  bookings & room_types
                </div>
              </div>
              <SmartCRUD tableName="hotels" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">regions</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, name, created_at, updated_at
                </div>
                <div>
                  <strong>Relations:</strong> Has many agencies & hotels
                </div>
              </div>
              <SmartCRUD tableName="regions" />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">bookings</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, agent_id, hotel_id,
                  confirmation_number, guest_name, arrival_date, nights,
                  room_type, status, points_awarded, validated_by, created_at,
                  updated_at
                </div>
                <div>
                  <strong>Status:</strong> pending, approved, declined, mixed
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to agents (agent), hotels,
                  has points_ledger entries
                </div>
              </div>
              <SmartCRUD tableName="bookings" />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">room_types</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, hotel_id, type_name
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to hotels
                </div>
              </div>
              <SmartCRUD tableName="room_types" />
            </div>
          </div>
        </div>
      </div>

      {/* Incentive Program Tables Section */}
      <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 p-8 rounded-lg border border-[#FFD700]/20">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-6 flex items-center">
          <Users className="mr-3" size={28} />
          Incentive Program Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">campaign</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, name, description, start_date,
                  end_date, bonus_multiplier, created_at, updated_at
                </div>
                <div>
                  <strong>Purpose:</strong> Marketing campaigns with bonus point
                  multipliers
                </div>
                <div>
                  <strong>Multiplier:</strong> Numeric(3,2) - e.g., 1.25 for 25%
                  bonus
                </div>
              </div>
              <SmartCRUD tableName="campaign" />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">
                points_ledger
              </h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, user_id, booking_id, points,
                  type, notes, created_at
                </div>
                <div>
                  <strong>Types:</strong> booking, bonus, redemption
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to agents & bookings
                </div>
                <div>
                  <strong>Purpose:</strong> Track all point transactions and
                  history
                </div>
              </div>
              <SmartCRUD tableName="points_ledger" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/50 p-4 rounded-lg border">
              <h3 className="font-semibold text-[#FFD700] mb-2">rewards</h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <div>
                  <strong>Fields:</strong> id, user_id, points_redeemed,
                  voucher_code, vendor, status, issued_by, created_at,
                  updated_at
                </div>
                <div>
                  <strong>Status:</strong> issued, redeemed, expired
                </div>
                <div>
                  <strong>Relations:</strong> Belongs to agents, issued_by
                  references agents
                </div>
                <div>
                  <strong>Purpose:</strong> Reward vouchers and redemption
                  tracking
                </div>
              </div>
              <SmartCRUD tableName="rewards" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-[#FFD700] flex items-center">
          <TrendingUp className="mr-2" size={24} />
          🎉 What you get out of the box:
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-[#FFD700]">Core Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Database className="mr-2 text-[#FFD700]" size={16} />
                <strong>Auto-discovery:</strong> Automatically detects table
                schema and columns
              </li>
              <li className="flex items-center">
                <Edit className="mr-2 text-[#FFD700]" size={16} />
                <strong>Full CRUD:</strong> Create, Read, Update, Delete
                operations
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 text-[#FFD700]" size={16} />
                <strong>Smart Forms:</strong> Auto-generates forms based on
                column types
              </li>
              <li className="flex items-center">
                <Eye className="mr-2 text-[#FFD700]" size={16} />
                <strong>Search & Filter:</strong> Built-in search functionality
              </li>
              <li className="flex items-center">
                <Database className="mr-2 text-[#FFD700]" size={16} />
                <strong>Pagination:</strong> Configurable page sizes
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#FFD700]">
              Advanced Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Shield className="mr-2 text-[#FFD700]" size={16} />
                <strong>RLS Integration:</strong> Shows RLS status for each
                table
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 text-[#FFD700]" size={16} />
                <strong>Type Safety:</strong> Full TypeScript support
              </li>
              <li className="flex items-center">
                <Eye className="mr-2 text-[#FFD700]" size={16} />
                <strong>Error Handling:</strong> Graceful error states
              </li>
              <li className="flex items-center">
                <Edit className="mr-2 text-[#FFD700]" size={16} />
                <strong>Loading States:</strong> Smooth loading indicators
              </li>
              <li className="flex items-center">
                <Database className="mr-2 text-[#FFD700]" size={16} />
                <strong>Responsive Design:</strong> Works on all devices
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-[#FFD700]">
          🚀 Usage is incredibly simple:
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-[#FFD700]">Basic Usage</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {`// Just one line to get a full CRUD interface!
<SmartCRUD tableName="agencies" title="Agency Management" />
<SmartCRUD tableName="bookings" title="Booking Management" />
<SmartCRUD tableName="rewards" title="Reward Management" />`}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#FFD700]">
              Advanced Configuration
            </h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {`// Customize page size and title
<SmartCRUD 
  tableName="points_ledger" 
  title="Points Tracking"
  pageSize={20} 
/>

// Incentive campaigns with custom settings
<SmartCRUD 
  tableName="campaign" 
  title="Campaign Management"
  pageSize={10} 
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Statistics */}
      <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-[#FFD700]">
          📈 Incentive Program Database Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-white rounded-lg border border-[#FFD700]/20">
            <div className="text-2xl font-bold text-[#FFD700]">9</div>
            <div>Core Tables</div>
            <div className="text-xs text-gray-500 mt-1">
              agencies • agents • hotels • bookings • campaign • points_ledger •
              rewards • regions • room_types
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-[#FFD700]/20">
            <div className="text-2xl font-bold text-[#FFD700]">12+</div>
            <div>RLS Policies</div>
            <div className="text-xs text-gray-500 mt-1">
              Role-based security for agents, hotel admins, regional admins, and
              global admins
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-[#FFD700]/20">
            <div className="text-2xl font-bold text-[#FFD700]">100%</div>
            <div>Auto-Generated</div>
            <div className="text-xs text-gray-500 mt-1">
              All CRUD interfaces generated automatically from schema
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
