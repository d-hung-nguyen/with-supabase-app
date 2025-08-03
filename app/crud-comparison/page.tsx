import { SmartCRUD } from "@/components/platform-kit/smart-crud"

export default function CRUDComparison() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          🚀 Platform Kit: CRUD Made Simple
        </h1>
        <p className="text-xl text-gray-600">
          See how Platform Kit transforms complex CRUD operations into a single
          line of code
        </p>
      </div>

      {/* Before and After Comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            😰 Before Platform Kit
          </h2>
          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">Files You Need to Create:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>📄 UserListPage.tsx (150+ lines)</li>
                <li>📄 UserCreateForm.tsx (100+ lines)</li>
                <li>📄 UserEditForm.tsx (120+ lines)</li>
                <li>📄 UserDeleteModal.tsx (50+ lines)</li>
                <li>📄 users/route.ts (80+ lines)</li>
                <li>📄 users/[id]/route.ts (60+ lines)</li>
                <li>📄 userValidation.ts (40+ lines)</li>
                <li>📄 userTypes.ts (30+ lines)</li>
              </ul>
              <p className="mt-2 font-semibold text-red-600">
                Total: 630+ lines of code
              </p>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">What You Have to Handle:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>❌ Manual form creation</li>
                <li>❌ State management</li>
                <li>❌ API endpoints</li>
                <li>❌ Validation logic</li>
                <li>❌ Error handling</li>
                <li>❌ Loading states</li>
                <li>❌ Pagination</li>
                <li>❌ Search functionality</li>
                <li>❌ CRUD operations</li>
                <li>❌ Database queries</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">Development Time:</h3>
              <p className="text-2xl font-bold text-red-600">2-3 days</p>
              <p className="text-gray-600">Per table/entity</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🎉 With Platform Kit
          </h2>
          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">Files You Need to Create:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>📄 UserManagement.tsx (3 lines)</li>
              </ul>
              <p className="mt-2 font-semibold text-green-600">
                Total: 3 lines of code
              </p>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">
                What You Get Automatically:
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>✅ Auto-generated forms</li>
                <li>✅ Smart state management</li>
                <li>✅ Built-in API calls</li>
                <li>✅ Schema-based validation</li>
                <li>✅ Comprehensive error handling</li>
                <li>✅ Beautiful loading states</li>
                <li>✅ Intelligent pagination</li>
                <li>✅ Advanced search</li>
                <li>✅ Full CRUD operations</li>
                <li>✅ Optimized database queries</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">Development Time:</h3>
              <p className="text-2xl font-bold text-green-600">30 seconds</p>
              <p className="text-gray-600">Per table/entity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Code Comparison</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-800 mb-2">
              Traditional Approach
            </h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
              {`// UserListPage.tsx (150+ lines)
import { useState, useEffect } from 'react'
import { User } from './types'

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  
  useEffect(() => {
    fetchUsers()
  }, [page, search])
  
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(\`/api/users?page=\${page}&search=\${search}\`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCreate = async (userData: Partial<User>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error('Failed to create')
      await fetchUsers()
      setShowCreateModal(false)
    } catch (err) {
      setError(err.message)
    }
  }
  
  const handleUpdate = async (id: string, userData: Partial<User>) => {
    try {
      const response = await fetch(\`/api/users/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error('Failed to update')
      await fetchUsers()
      setEditingUser(null)
    } catch (err) {
      setError(err.message)
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const response = await fetch(\`/api/users/\${id}\`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete')
      await fetchUsers()
    } catch (err) {
      setError(err.message)
    }
  }
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <div className="header">
        <h1>User Management</h1>
        <button onClick={() => setShowCreateModal(true)}>
          Add User
        </button>
      </div>
      
      <div className="search">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => setEditingUser(user)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
      
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
        />
      )}
      
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={(data) => handleUpdate(editingUser.id, data)}
        />
      )}
    </div>
  )
}

// Plus CreateUserModal.tsx (100+ lines)
// Plus EditUserModal.tsx (120+ lines)
// Plus API routes (140+ lines)
// Plus validation (40+ lines)
// Plus types (30+ lines)
// = 630+ lines total`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Platform Kit Approach
            </h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
              {`// UserManagement.tsx (3 lines)
import { SmartCRUD } from "@/components/platform-kit/smart-crud"

export default function UserManagement() {
  return (
    <SmartCRUD tableName="agents" title="Agent Management" />
  )
}

// That's it! 🎉

// You get automatically:
// ✅ Full CRUD operations
// ✅ Schema-aware forms
// ✅ Search & pagination
// ✅ Error handling
// ✅ Loading states
// ✅ Type safety
// ✅ RLS integration
// ✅ Responsive design
// ✅ Professional UI
// ✅ Accessibility

// Want multiple tables?
export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <SmartCRUD tableName="agents" title="Agents" />
      <SmartCRUD tableName="products" title="Products" />
      <SmartCRUD tableName="orders" title="Orders" />
    </div>
  )
}

// Want custom options?
export default function CustomUserManagement() {
  return (
    <SmartCRUD 
      tableName="agents" 
      title="User Management System"
      pageSize={25}
      schema="public"
    />
  )
}

// Need direct data access?
import { platformKit } from "@/lib/pg-meta/platform-kit"

const users = await platformKit.getRecords("users", {
  page: 1,
  pageSize: 10,
  search: "john",
  searchColumn: "name"
})

// Create custom UI with Platform Kit helpers
const newUser = await platformKit.createRecord("users", {
  name: "John Doe",
  email: "john@example.com"
})

// 🚀 Platform Kit = 99% less code + 100x faster development`}
            </pre>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🚀 Live Demo</h2>
        <p className="mb-4 text-blue-700">
          Here's a real Platform Kit CRUD interface for your agencies table:
        </p>
        <SmartCRUD
          tableName="agencies"
          title="Agencies Management (Live Demo)"
          pageSize={5}
        />
      </div>

      {/* Benefits Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          🎯 Why Platform Kit?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-semibold text-purple-800">99% Less Code</h3>
            <p className="text-sm text-purple-600">
              From 630+ lines to 3 lines
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="font-semibold text-purple-800">100x Faster</h3>
            <p className="text-sm text-purple-600">From days to seconds</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🎨</div>
            <h3 className="font-semibold text-purple-800">Auto-Beautiful</h3>
            <p className="text-sm text-purple-600">
              Professional UI out of the box
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
