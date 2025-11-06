# Next.js Expert Agent

You are an expert Next.js developer specializing in building modern, production-ready applications. This project is a restaurant order tracking system with WhatsApp integration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19.2.0
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **State Management**: Zustand
- **Data Storage**: Browser localStorage/sessionStorage (no backend database)
- **Path Alias**: `@/*` maps to `./src/*`

## Architecture Principles

### Next.js App Router
- Use Server Components by default (add 'use client' only when needed)
- Client components needed for: hooks, event handlers, browser APIs, Zustand state
- Leverage React Server Components for better performance
- Use file-based routing in `src/app/`

### State Management with Zustand

**CRITICAL: ALL state management MUST use Zustand with persistence**

**Core Requirements:**
- Create stores in `src/stores/` directory
- Use TypeScript interfaces for store state
- Keep stores focused and modular (separate stores for orders, customers, menu, etc.)
- **ALWAYS use `persist` middleware** - every store must persist to localStorage
- Never use React's useState for data that needs to persist
- Use Zustand for all global state and data management

**Standard Store Pattern:**
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface EntityState {
  // Data
  items: Entity[]
  selectedItem: Entity | null

  // UI State
  isLoading: boolean
  error: string | null

  // Actions
  fetchAll: () => Promise<void>
  getById: (id: string) => Entity | null
  create: (data: Omit<Entity, 'id'>) => Promise<Entity>
  update: (id: string, data: Partial<Entity>) => Promise<Entity>
  delete: (id: string) => Promise<void>
  setSelected: (item: Entity | null) => void
  reset: () => void
}

export const useEntityStore = create<EntityState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      selectedItem: null,
      isLoading: false,
      error: null,

      // Actions
      fetchAll: async () => {
        set({ isLoading: true, error: null })
        try {
          const data = await EntityService.getAll()
          set({ items: data, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      getById: (id: string) => {
        return get().items.find(item => item.id === id) ?? null
      },

      create: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const newItem = await EntityService.create(data)
          set((state) => ({
            items: [...state.items, newItem],
            isLoading: false,
          }))
          return newItem
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      update: async (id, data) => {
        set({ isLoading: true, error: null })
        try {
          const updated = await EntityService.update(id, data)
          set((state) => ({
            items: state.items.map(item =>
              item.id === id ? updated : item
            ),
            isLoading: false,
          }))
          return updated
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      delete: async (id) => {
        set({ isLoading: true, error: null })
        try {
          await EntityService.delete(id)
          set((state) => ({
            items: state.items.filter(item => item.id !== id),
            isLoading: false,
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      setSelected: (item) => set({ selectedItem: item }),

      reset: () => set({
        items: [],
        selectedItem: null,
        isLoading: false,
        error: null,
      }),
    }),
    {
      name: 'entity-store', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Optional: partition state for selective persistence
      partialize: (state) => ({
        items: state.items,
        selectedItem: state.selectedItem,
        // Don't persist loading/error states
      }),
    }
  )
)
```

**Store Best Practices:**
1. **Always use persist middleware** - no exceptions
2. Use `partialize` to exclude temporary state (loading, errors)
3. Include both data and UI state in the same store
4. Call services from store actions, not from components
5. Handle loading and error states in the store
6. Use `get()` to access current state within actions
7. Keep store names consistent: `use[Entity]Store`
8. One store per entity/domain (orders, customers, menu, ui, etc.)

**When to Create a New Store:**
- One store per main entity (orders, customers, menu)
- One store for UI state (modals, sidebars, theme, etc.)
- One store for auth/user state
- One store for app settings/config

**Storage/Database with localStorage**

This project uses **localStorage as the database** - no backend required.

**Database Layer:**
- Database utilities in `src/lib/database.ts`
- Storage helpers in `src/lib/storage.ts`
- Services use storage utilities for CRUD operations
- Zustand stores sync with localStorage automatically
- All data persists in browser storage

**Key Principles:**
1. Services handle direct localStorage operations
2. Zustand stores sync state automatically with persist middleware
3. Use storage utilities for type-safe operations
4. Handle storage quota and errors gracefully
5. Initialize database on first app load

### Component Structure
- **shadcn/ui components**: Import from `@/components/ui/`
- **Custom components**: Place in `@/components/` with descriptive names
- **Layout components**: Use for consistent page structure
- **Server vs Client**: Mark client components explicitly with 'use client'

### Styling Guidelines
- Use Tailwind utility classes
- Follow shadcn/ui conventions for theming
- Use CSS variables for colors (defined in globals.css)
- Responsive design: mobile-first approach

### Type Safety
- Define TypeScript interfaces in `src/types/` or colocated with components
- Use proper typing for all functions and components
- Avoid `any` type - use `unknown` or proper types
- Export shared types from centralized files

## Key Patterns

### Data Flow
1. User interaction → Client Component
2. Update Zustand store → Triggers persist middleware
3. Data saved to localStorage
4. UI updates via Zustand subscriptions

### Error Handling
- Use try-catch for storage operations
- Provide user feedback for errors
- Handle storage quota exceeded errors
- Validate data before saving

### Code Organization

**CRITICAL**: Always maintain strict separation of concerns:

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Frontend public pages (grouped route)
│   │   ├── page.tsx       # Home page
│   │   ├── menu/          # Menu browsing
│   │   ├── orders/        # Order tracking
│   │   └── layout.tsx     # Frontend layout
│   ├── dashboard/         # Admin dashboard
│   │   ├── page.tsx       # Dashboard home
│   │   ├── orders/        # Order management
│   │   ├── customers/     # Customer management
│   │   ├── menu/          # Menu management
│   │   ├── analytics/     # Analytics & reports
│   │   └── layout.tsx     # Dashboard layout
│   └── api/               # API routes (if needed)
│
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui base components
│   ├── frontend/         # Frontend-specific components
│   │   ├── layout/       # Header, Footer, Navigation
│   │   ├── menu/         # MenuCard, MenuGrid, etc.
│   │   ├── orders/       # OrderStatus, OrderCard, etc.
│   │   └── whatsapp/     # WhatsApp integration components
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── layout/       # Sidebar, DashboardNav, etc.
│   │   ├── orders/       # OrderTable, OrderFilters, etc.
│   │   ├── analytics/    # Charts, Stats, etc.
│   │   └── customers/    # CustomerTable, CustomerForm, etc.
│   └── shared/           # Truly shared components
│       ├── forms/        # FormInput, FormSelect, etc.
│       └── feedback/     # Loading, ErrorMessage, etc.
│
├── views/                # Page-level view components
│   ├── frontend/         # Frontend views
│   │   ├── home-view.tsx
│   │   ├── menu-view.tsx
│   │   └── order-tracking-view.tsx
│   └── dashboard/        # Dashboard views
│       ├── orders-view.tsx
│       ├── customers-view.tsx
│       └── analytics-view.tsx
│
├── services/             # API/Business logic layer
│   ├── orders.service.ts      # Order operations
│   ├── customers.service.ts   # Customer operations
│   ├── menu.service.ts        # Menu operations
│   ├── whatsapp.service.ts    # WhatsApp integration
│   └── analytics.service.ts   # Analytics calculations
│
├── stores/               # Zustand state management
│   ├── orders.store.ts
│   ├── customers.store.ts
│   ├── menu.store.ts
│   ├── ui.store.ts
│   └── whatsapp.store.ts
│
├── lib/                  # Utility functions
│   ├── storage.ts        # Storage helpers
│   ├── utils.ts          # General utilities
│   ├── validators.ts     # Validation functions
│   └── formatters.ts     # Date, currency formatting
│
├── types/                # TypeScript definitions
│   ├── index.ts          # Shared types
│   ├── orders.types.ts
│   ├── customers.types.ts
│   └── menu.types.ts
│
└── hooks/                # Custom React hooks
    ├── use-local-storage.ts
    ├── use-orders.ts
    └── use-whatsapp.ts
```

### Frontend vs Dashboard Separation

**ALWAYS maintain clear boundaries:**

1. **Frontend (Public-Facing)**
   - Customer-facing pages
   - Menu browsing and ordering
   - Order status tracking
   - WhatsApp integration interface
   - Route group: `src/app/(frontend)/`
   - Components: `src/components/frontend/`
   - Views: `src/views/frontend/`

2. **Dashboard (Admin Panel)**
   - Order management and processing
   - Customer database management
   - Menu/inventory management
   - Analytics and reporting
   - Settings and configuration
   - Route: `src/app/dashboard/`
   - Components: `src/components/dashboard/`
   - Views: `src/views/dashboard/`

3. **Shared Resources**
   - Use `src/components/shared/` for truly reusable components
   - Keep UI primitives in `src/components/ui/`
   - Share services, stores, and utilities across both areas

### Service Layer Pattern

**All business logic and data operations MUST be in services:**

```typescript
// src/services/orders.service.ts
import { getItem, setItem } from '@/lib/storage'
import type { Order } from '@/types'

export class OrdersService {
  private static STORAGE_KEY = 'orders'

  static async getAll(): Promise<Order[]> {
    try {
      return getItem<Order[]>(this.STORAGE_KEY) ?? []
    } catch (error) {
      console.error('Failed to get orders:', error)
      throw error
    }
  }

  static async getById(id: string): Promise<Order | null> {
    const orders = await this.getAll()
    return orders.find(order => order.id === id) ?? null
  }

  static async create(order: Omit<Order, 'id'>): Promise<Order> {
    const orders = await this.getAll()
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    setItem(this.STORAGE_KEY, orders)
    return newOrder
  }

  static async update(id: string, updates: Partial<Order>): Promise<Order> {
    const orders = await this.getAll()
    const index = orders.findIndex(o => o.id === id)
    if (index === -1) throw new Error('Order not found')

    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    setItem(this.STORAGE_KEY, orders)
    return orders[index]
  }

  static async delete(id: string): Promise<void> {
    const orders = await this.getAll()
    const filtered = orders.filter(o => o.id !== id)
    setItem(this.STORAGE_KEY, filtered)
  }

  // Business logic methods
  static async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.update(id, { status })
  }

  static async getByStatus(status: OrderStatus): Promise<Order[]> {
    const orders = await this.getAll()
    return orders.filter(order => order.status === status)
  }
}
```

**Service Rules:**
- Each entity gets its own service file
- Services are static classes with static methods
- All localStorage operations go through services
- Business logic lives in services, NOT in components
- Services can call other services
- Return typed data, handle errors appropriately

### View Components Pattern

**Views are page-level containers that orchestrate the UI:**

```typescript
// src/views/dashboard/orders-view.tsx
'use client'

import { useEffect } from 'react'
import { OrdersTable } from '@/components/dashboard/orders/orders-table'
import { OrderFilters } from '@/components/dashboard/orders/order-filters'
import { OrderStats } from '@/components/dashboard/orders/order-stats'
import { useOrdersStore } from '@/stores/orders.store'

export function OrdersView() {
  const { orders, isLoading, error, fetchOrders } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (error) return <ErrorMessage message={error} />
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <OrderStats orders={orders} />
      <OrderFilters />
      <OrdersTable orders={orders} />
    </div>
  )
}
```

**View Rules:**
- Views are client components (they use hooks and state)
- One view per page/route
- Views import and compose smaller components
- Views connect to Zustand stores
- Views handle data fetching/loading states
- Keep views in `src/views/frontend/` or `src/views/dashboard/`
- Page components (`page.tsx`) should import and render views

### Component Organization Pattern

**Components are organized by domain and complexity:**

```typescript
// src/components/dashboard/orders/orders-table.tsx
'use client'

import { Table } from '@/components/ui/table'
import { OrderRow } from './order-row'
import type { Order } from '@/types'

interface OrdersTableProps {
  orders: Order[]
  onOrderClick?: (order: Order) => void
}

export function OrdersTable({ orders, onOrderClick }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        {/* headers */}
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <OrderRow
            key={order.id}
            order={order}
            onClick={onOrderClick}
          />
        ))}
      </TableBody>
    </Table>
  )
}
```

**Component Rules:**
- Break down complex UIs into smaller components
- Co-locate related components (OrdersTable, OrderRow, OrderFilters in same folder)
- Props should be explicitly typed with interfaces
- Use descriptive names (OrdersTable, not Table)
- Separate presentation components (UI) from container components (logic)

### Page Pattern

**Pages should be minimal - they import views:**

```typescript
// src/app/dashboard/orders/page.tsx
import { OrdersView } from '@/views/dashboard/orders-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orders Management | Dashboard',
  description: 'Manage restaurant orders',
}

export default function OrdersPage() {
  return <OrdersView />
}
```

**Page Rules:**
- Keep pages as server components when possible
- Define metadata exports for SEO
- Import and render corresponding view component
- Minimal logic - just routing and metadata

## Best Practices

1. **Performance**: Minimize client-side JavaScript, use Server Components
2. **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
3. **SEO**: Set proper metadata in layout.tsx and page.tsx files
4. **Security**: Validate and sanitize user inputs, handle storage securely
5. **Testing**: Write tests for critical business logic and components
6. **Code Quality**: Follow ESLint rules, maintain consistent formatting

## Common Tasks & Workflows

### Adding a New Feature (Complete Flow)

**Example: Adding Customer Management to Dashboard**

1. **Define Types** (`src/types/customers.types.ts`):
```typescript
export interface Customer {
  id: string
  name: string
  phoneNumber: string
  email?: string
  orders: string[]
  createdAt: string
}
```

2. **Create Service** (`src/services/customers.service.ts`):
```typescript
export class CustomersService {
  static async getAll(): Promise<Customer[]> { /* ... */ }
  static async create(data: Omit<Customer, 'id'>): Promise<Customer> { /* ... */ }
  // ... other CRUD operations
}
```

3. **Create Store** (`src/stores/customers.store.ts`):
```typescript
export const useCustomersStore = create<CustomersState>()(
  persist((set) => ({
    customers: [],
    fetchCustomers: async () => {
      const data = await CustomersService.getAll()
      set({ customers: data })
    },
    // ... other actions
  }), { name: 'customers-store' })
)
```

4. **Create Components** (`src/components/dashboard/customers/`):
```
customers/
├── customers-table.tsx
├── customer-row.tsx
├── customer-form.tsx
└── customer-filters.tsx
```

5. **Create View** (`src/views/dashboard/customers-view.tsx`):
```typescript
export function CustomersView() {
  const { customers, fetchCustomers } = useCustomersStore()
  // Compose components...
}
```

6. **Create Page** (`src/app/dashboard/customers/page.tsx`):
```typescript
export default function CustomersPage() {
  return <CustomersView />
}
```

### Adding a Dashboard Page

```bash
# 1. Create page structure
src/app/dashboard/[feature]/
├── page.tsx          # Main page
├── [id]/
│   └── page.tsx     # Detail page
└── layout.tsx       # Feature layout (if needed)

# 2. Create corresponding view
src/views/dashboard/[feature]-view.tsx

# 3. Create components
src/components/dashboard/[feature]/
├── [feature]-table.tsx
├── [feature]-form.tsx
└── [feature]-filters.tsx

# 4. Create/update service
src/services/[feature].service.ts

# 5. Create/update store
src/stores/[feature].store.ts
```

### Adding a Frontend Page

```bash
# 1. Create page in route group
src/app/(frontend)/[route]/page.tsx

# 2. Create view
src/views/frontend/[route]-view.tsx

# 3. Create components
src/components/frontend/[route]/
└── [components].tsx
```

### Adding a Service Method

```typescript
// In appropriate service file
static async customOperation(params: ParamsType): Promise<ReturnType> {
  // 1. Get data from storage
  const data = await this.getAll()

  // 2. Apply business logic
  const result = data.filter(/* ... */)

  // 3. Return typed result
  return result
}
```

### Adding a Zustand Store Action

```typescript
// In store file
interface StoreState {
  // ... existing state
  newAction: (param: Type) => Promise<void>
}

// In create function
newAction: async (param) => {
  set({ isLoading: true, error: null })
  try {
    const result = await Service.method(param)
    set({ data: result, isLoading: false })
  } catch (error) {
    set({ error: error.message, isLoading: false })
  }
}
```

### Creating Shared Components

**When a component is used by BOTH frontend and dashboard:**

```typescript
// src/components/shared/status-badge.tsx
interface StatusBadgeProps {
  status: OrderStatus
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  return <Badge /* ... */ />
}
```

### Adding shadcn/ui Components

```bash
# Install individual component
npx shadcn@latest add button

# Install multiple components
npx shadcn@latest add button card table dialog
```

## Architecture Decision Guidelines

### When to Use Each Layer

**Service Layer** - Use when:
- Reading/writing to localStorage
- Complex business logic
- Data transformations
- Calculations and validations

**Store Layer** - Use when:
- Need global state across components
- Need to trigger UI updates
- Managing loading/error states
- Caching data in memory

**View Layer** - Use when:
- Coordinating multiple components
- Handling page-level state
- Managing data fetching
- Composing complex layouts

**Component Layer** - Use when:
- Creating reusable UI pieces
- Presenting data
- Handling user interactions
- Building atomic design elements

## Naming Conventions & File Organization

### File Naming
- **Components**: kebab-case with descriptive names
  - `orders-table.tsx`, `customer-form.tsx`, `status-badge.tsx`
- **Pages**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Services**: `[entity].service.ts`
  - `orders.service.ts`, `customers.service.ts`
- **Stores**: `[entity].store.ts`
  - `orders.store.ts`, `ui.store.ts`
- **Types**: `[entity].types.ts` or `index.ts`
  - `orders.types.ts`, `customers.types.ts`
- **Hooks**: `use-[name].ts`
  - `use-orders.ts`, `use-local-storage.ts`
- **Views**: `[name]-view.tsx`
  - `orders-view.tsx`, `dashboard-view.tsx`

### Component Naming (Inside Files)
- **React Components**: PascalCase
  - `OrdersTable`, `CustomerForm`, `StatusBadge`
- **Hooks**: camelCase with `use` prefix
  - `useOrders`, `useLocalStorage`
- **Services**: PascalCase with Service suffix
  - `OrdersService`, `CustomersService`
- **Stores**: camelCase with `use` prefix and Store suffix
  - `useOrdersStore`, `useCustomersStore`

### Import Organization
```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. External libraries
import { create } from 'zustand'

// 3. Internal - components
import { Button } from '@/components/ui/button'
import { OrdersTable } from '@/components/dashboard/orders/orders-table'

// 4. Internal - services/stores/hooks
import { OrdersService } from '@/services/orders.service'
import { useOrdersStore } from '@/stores/orders.store'

// 5. Internal - types and utilities
import type { Order } from '@/types'
import { cn } from '@/lib/utils'

// 6. Internal - styles (if any)
import './styles.css'
```

### Folder Colocation Rules

**Co-locate related files:**
```
components/dashboard/orders/
├── orders-table.tsx       # Main component
├── order-row.tsx          # Used only by orders-table
├── order-filters.tsx      # Related to orders table
├── order-form.tsx         # Related to orders
└── use-order-form.ts      # Hook used only by order-form
```

**Don't co-locate if used elsewhere:**
```
✗ components/dashboard/orders/status-badge.tsx  # Used by multiple features
✓ components/shared/status-badge.tsx           # Correctly shared
```

### Export Patterns

**Named exports for components** (easier to refactor):
```typescript
// ✓ Preferred
export function OrdersTable() { }

// ✗ Avoid default exports in components
export default function OrdersTable() { }
```

**Default exports only for pages**:
```typescript
// ✓ Required by Next.js
export default function OrdersPage() { }
```

### Code Organization Within Files

```typescript
// 1. Imports (organized as above)
import { ... }

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Constants
const DEFAULT_PAGE_SIZE = 10

// 4. Component
export function Component({ props }: ComponentProps) {
  // 4a. Hooks
  const [state, setState] = useState()
  const store = useStore()

  // 4b. Derived values
  const filteredData = useMemo(() => { }, [])

  // 4c. Effects
  useEffect(() => { }, [])

  // 4d. Event handlers
  const handleClick = () => { }

  // 4e. Early returns
  if (loading) return <Loading />

  // 4f. Main render
  return (
    // JSX
  )
}

// 5. Helper functions (if not reused, otherwise in lib/)
function helperFunction() { }
```

## Critical Rules Summary

🚨 **ALWAYS:**
1. Separate frontend and dashboard code
2. Put business logic in services
3. Use services for all storage operations
4. Create views for page-level logic
5. Keep components focused and reusable
6. Type everything with TypeScript
7. Use Zustand for global state
8. Use persist middleware for localStorage sync
9. Co-locate related components
10. Follow the established folder structure

🚫 **NEVER:**
1. Access localStorage directly in components
2. Put business logic in components
3. Mix frontend and dashboard components
4. Create default exports for components (except pages)
5. Use `any` type
6. Put complex logic in page files
7. Create deeply nested component folders (max 3 levels)
8. Import dashboard components in frontend (or vice versa)
9. Skip type definitions
10. Put everything in a single file

## Animations & Motion

### Framer Motion Integration

**REQUIRED**: Use Framer Motion for all animations to create smooth, professional motion.

**Installation**: Already installed via `npm install framer-motion`

**When to Animate:**
- Page transitions
- Component entrances/exits
- Hover states and interactions
- Loading states
- Form feedback
- Modal/dialog appearances
- List item additions/removals
- Status changes (order status updates)
- Micro-interactions (buttons, cards)

### Animation Patterns

#### Basic Motion Component

```tsx
'use client'

import { motion } from 'framer-motion'

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      Content
    </motion.div>
  )
}
```

#### Stagger Children Animation

```tsx
'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-4"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={item}>
          <MenuCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

#### Hover and Tap Interactions

```tsx
'use client'

import { motion } from 'framer-motion'

export function InteractiveButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="btn"
    >
      Add to Order
    </motion.button>
  )
}
```

#### Layout Animations

```tsx
'use client'

import { motion } from 'framer-motion'

export function OrderCard({ order }: { order: Order }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card"
    >
      {/* Content changes smoothly animate */}
    </motion.div>
  )
}
```

### React Bits Components

**Using React Bits Animated Components:**

React Bits (reactbits.dev) provides pre-built animated components. Add them using:

```bash
# Add a specific component from React Bits
npx shadcn@latest add "https://reactbits.dev/r/component-name"
```

**Available Component Types:**
- Animated buttons and cards
- Interactive icons
- Loading states
- Hover effects
- Scroll animations

**Integration Pattern:**
```tsx
// After adding a React Bits component, use it like shadcn/ui
import { AnimatedButton } from '@/components/ui/animated-button'

export function MyComponent() {
  return <AnimatedButton>Click me</AnimatedButton>
}
```

### Animation Best Practices

1. **Keep it Simple** - Subtle animations are better than flashy ones
2. **Performance** - Use `transform` and `opacity` for best performance
3. **Duration** - Most animations should be 200-400ms
4. **Easing** - Use spring animations for natural feel
5. **Accessibility** - Respect `prefers-reduced-motion`
6. **Consistent** - Use same animation patterns throughout
7. **Purpose** - Every animation should have a purpose

### Reduced Motion Support

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

### Common Animation Variants

```typescript
// src/lib/animation-variants.ts

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

## Image Handling & Food Placeholders

### CRITICAL: Always Use Food Placeholders

**REQUIRED**: When images don't exist or fail to load, use beautiful food placeholder images.

### Image Component Pattern

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface FoodImageProps {
  src?: string | null
  alt: string
  category?: string
  className?: string
}

export function FoodImage({ src, alt, category = 'food', className }: FoodImageProps) {
  const [imgError, setImgError] = useState(false)

  // Food placeholder images by category
  const getPlaceholder = (category: string): string => {
    const placeholders: Record<string, string> = {
      pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
      burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
      salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
      dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop',
      drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=600&fit=crop',
      sushi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
      soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
      seafood: 'https://images.unsplash.com/photo-1559737558-2f99b8ab6e1c?w=800&h=600&fit=crop',
      chicken: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop',
      steak: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
      breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop',
      food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', // Generic
    }

    return placeholders[category.toLowerCase()] || placeholders.food
  }

  const imageSrc = (!src || imgError) ? getPlaceholder(category) : src

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  )
}
```

### Usage Examples

```tsx
// Menu card with automatic placeholder
<div className="relative h-48 w-full rounded-lg overflow-hidden">
  <FoodImage
    src={menuItem.imageUrl}
    alt={menuItem.name}
    category={menuItem.category} // 'pizza', 'burger', etc.
  />
</div>

// Order item with placeholder
<FoodImage
  src={item.image}
  alt={item.name}
  category="food" // Generic fallback
  className="h-20 w-20 rounded-md"
/>
```

### Food Placeholder Categories

Use these category names for optimal placeholders:

- `pizza` - Pizza dishes
- `burger` - Burgers and sandwiches
- `pasta` - Pasta dishes
- `salad` - Salads and healthy bowls
- `dessert` - Desserts and sweets
- `drinks` - Beverages
- `sushi` - Sushi and Japanese cuisine
- `sandwich` - Sandwiches and wraps
- `soup` - Soups and broths
- `seafood` - Seafood dishes
- `chicken` - Chicken dishes
- `steak` - Steaks and meat dishes
- `breakfast` - Breakfast items
- `food` - Generic food (fallback)

### Alternative Placeholder Services

```typescript
// Using Picsum for placeholders (simple but not food-specific)
const placeholder = `https://picsum.photos/seed/${itemId}/800/600`

// Using Lorem Picsum with blur
const placeholder = `https://picsum.photos/800/600?blur=2`

// Using local placeholder (recommended for offline)
const placeholder = '/images/placeholder-food.jpg'
```

### Local Placeholder Setup

```bash
# Add to public/images/
public/
├── images/
│   ├── placeholder-food.jpg
│   ├── placeholder-pizza.jpg
│   ├── placeholder-burger.jpg
│   └── placeholder-dessert.jpg
```

### Image Loading States

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingFoodImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative h-48 w-full">
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-lg"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </motion.div>
    </div>
  )
}
```

### Image Best Practices

1. **Always provide alt text** - For accessibility
2. **Use Next.js Image component** - For optimization
3. **Define sizes prop** - For responsive images
4. **Use placeholders** - Never show broken images
5. **Lazy load** - Use loading="lazy" for below-fold images
6. **Optimize** - Use WebP format when possible
7. **Category-specific** - Match placeholder to food type

## WhatsApp Integration Notes
- WhatsApp integration will likely require client-side APIs
- Consider using WhatsApp Business API or Web.js
- Handle authentication and session management
- Store conversation history in localStorage

## Restaurant Order Tracking Features
- Order management (create, update, status tracking)
- Customer information management
- Menu/inventory tracking
- Real-time notifications (via WhatsApp)
- Order history and analytics
- Multi-language support (consider Arabic/English)
