# 🚀 Platform Kit CRUD Components

The Platform Kit transforms database management into a breeze! With just a single component, you get a full-featured CRUD interface for any table in your database.

## 🎯 Quick Start

### Basic Usage

```tsx
import { SmartCRUD } from "@/components/platform-kit/smart-crud"

export default function UsersPage() {
  return <SmartCRUD tableName="users" title="User Management" />
}
```

That's it! You now have a complete CRUD interface with:

- ✅ Automatic schema detection
- ✅ Create, read, update, delete operations
- ✅ Search and pagination
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ RLS integration

## 🌟 Features

### Auto-Discovery

The Platform Kit automatically:

- Detects your table schema
- Identifies column types
- Finds primary keys
- Determines required fields
- Checks RLS status

### Smart Forms

Forms are automatically generated based on your database schema:

- Text inputs for varchar/text columns
- Number inputs for integer columns
- Required validation for non-nullable columns
- Skip identity/auto-increment columns

### Built-in Operations

- **Create**: Form-based record creation
- **Read**: Paginated table view with search
- **Update**: Edit records with pre-filled forms
- **Delete**: Confirmation dialogs for safety

### Advanced Features

- **Search**: Automatically searches text columns
- **Pagination**: Configurable page sizes
- **RLS Integration**: Shows security status
- **Error Handling**: Graceful error states
- **TypeScript**: Full type safety

## 📋 Component Props

```tsx
interface SmartCRUDProps {
  tableName: string // Required: The database table name
  schema?: string // Optional: Database schema (default: "public")
  title?: string // Optional: Custom page title
  pageSize?: number // Optional: Records per page (default: 10)
}
```

## 🎨 Customization Examples

### Basic Table Management

```tsx
<SmartCRUD tableName="products" />
```

### With Custom Options

```tsx
<SmartCRUD
  tableName="orders"
  title="Order Management System"
  schema="sales"
  pageSize={25}
/>
```

### Multiple Tables on One Page

```tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <SmartCRUD tableName="users" title="Users" pageSize={5} />
      <SmartCRUD tableName="products" title="Products" pageSize={5} />
      <SmartCRUD tableName="orders" title="Orders" pageSize={5} />
    </div>
  )
}
```

## 🔧 Platform Kit Helpers

The Platform Kit also provides helper functions for custom implementations:

### Direct CRUD Operations

```tsx
import { platformKit } from "@/lib/pg-meta/platform-kit"

// Create a record
await platformKit.createRecord("users", {
  name: "John Doe",
  email: "john@example.com",
})

// Get records with pagination
const result = await platformKit.getRecords("users", {
  page: 1,
  pageSize: 10,
  search: "john",
  searchColumn: "name",
})

// Update a record
await platformKit.updateRecord("users", 123, {
  name: "Jane Doe",
})

// Delete a record
await platformKit.deleteRecord("users", 123)
```

### Schema Introspection

```tsx
// Get table metadata
const tableInfo = await platformKit.generateCRUDComponent("users")
console.log(tableInfo.hasRLS) // true/false
console.log(tableInfo.primaryKey) // "id"
console.log(tableInfo.editableColumns) // [...columns]
```

## 🎯 Real-World Examples

### E-commerce Admin Panel

```tsx
export default function EcommerceAdmin() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <SmartCRUD tableName="products" title="Product Catalog" pageSize={20} />
      <SmartCRUD tableName="categories" title="Categories" pageSize={15} />
      <SmartCRUD tableName="orders" title="Order Management" pageSize={10} />
    </div>
  )
}
```

### User Management System

```tsx
export default function UserAdmin() {
  return (
    <SmartCRUD tableName="users" title="User Management System" pageSize={25} />
  )
}
```

### Multi-tenant Application

```tsx
export default function TenantData({ tenantId }: { tenantId: string }) {
  return (
    <div className="space-y-6">
      <SmartCRUD
        tableName="tenant_users"
        title={`Users for Tenant ${tenantId}`}
        schema="tenant_data"
      />
      <SmartCRUD
        tableName="tenant_settings"
        title="Tenant Settings"
        schema="tenant_data"
      />
    </div>
  )
}
```

## 🔒 Security Features

### Row Level Security (RLS)

- Automatically displays RLS status
- Shows security badges
- Respects RLS policies in operations

### Form Validation

- Required field validation
- Type-appropriate inputs
- Error message display

### Safe Deletions

- Confirmation dialogs
- Clear warning messages
- Prevents accidental deletions

## 🚀 Benefits

### Development Speed

- **90% less code**: One component vs hundreds of lines
- **Instant CRUD**: Working interface in seconds
- **Auto-updates**: Schema changes automatically reflected

### Maintenance

- **Single source of truth**: Database schema drives UI
- **Consistent UX**: Same interface patterns everywhere
- **Error resilience**: Built-in error handling

### Scalability

- **Easy theming**: Uses your design system
- **Configurable**: Adjust to your needs
- **Extensible**: Build on top of Platform Kit

## 🎉 Before vs After

### Before Platform Kit (Traditional Approach)

```tsx
// 200+ lines of code for basic CRUD
// Manual form creation
// Custom pagination logic
// Error handling from scratch
// State management complexity
// API endpoint creation
// Validation rules
```

### After Platform Kit

```tsx
<SmartCRUD tableName="users" title="User Management" />
// Done! 🎉
```

## 🔄 Migration Guide

### From Manual CRUD to Platform Kit

1. **Replace your existing CRUD pages**:

   ```tsx
   // Old way
   import UserListPage from "./user-list"
   import UserCreatePage from "./user-create"
   import UserEditPage from "./user-edit"

   // New way
   import { SmartCRUD } from "@/components/platform-kit/smart-crud"
   ```

2. **Update your routes**:

   ```tsx
   // Before: Multiple routes for CRUD operations
   // /users, /users/create, /users/[id]/edit

   // After: Single route with built-in CRUD
   // /users (with create/edit modals)
   ```

3. **Remove custom API endpoints** (if using Platform Kit helpers):
   ```tsx
   // Delete: /api/users/route.ts
   // Delete: /api/users/[id]/route.ts
   // Use: platformKit.getRecords(), createRecord(), etc.
   ```

## 🎯 Next Steps

1. **Try the demo**: Visit `/crud-demo` to see it in action
2. **Check your tables**: Use the Platform Kit on your existing tables
3. **Customize styling**: Adapt the components to match your design
4. **Add features**: Extend the SmartCRUD component for specific needs

The Platform Kit makes database management so simple, you'll wonder how you ever lived without it! 🚀
