# 🍽️ Restaurant Order Tracking System

> A modern, real-time restaurant order management system with WhatsApp integration. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=flat-square)](https://github.com/pmndrs/zustand)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Architecture](#️-architecture)
- [Database System](#-database-system)
- [Design System](#-design-system)
- [Development Guide](#-development-guide)
- [Claude Code Agent](#-claude-code-agent)
- [Contributing](#-contributing)

---

## ✨ Features

### 🎯 Core Features
- **Real-time Order Tracking** - Track orders from placement to delivery
- **WhatsApp Integration** - Receive and manage orders via WhatsApp
- **Customer Management** - Comprehensive customer database
- **Menu Management** - Dynamic menu and inventory control
- **Analytics Dashboard** - Insights and reporting
- **Multi-language Support** - English and Arabic support

### 🚀 Technical Features
- **Zero Backend** - Runs entirely in the browser with localStorage
- **Offline First** - Works without internet connection
- **Type Safe** - Full TypeScript coverage
- **Modern UI** - shadcn/ui components with Tailwind CSS
- **State Management** - Zustand with automatic persistence
- **Responsive Design** - Mobile-first approach

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org)** - Type safety and better DX
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful UI components

### State & Data
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **localStorage** - Browser storage as database
- **Custom Database Layer** - Structured data access

### Developer Experience
- **ESLint** - Code linting
- **Strict TypeScript** - Maximum type safety
- **Path Aliases** - Clean imports with `@/*`
- **Geist Font** - Modern font family

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

| Software | Version | Check Command | Download |
|----------|---------|---------------|----------|
| **Node.js** | 20.x or higher | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | 10.x or higher | `npm --version` | Included with Node.js |
| **Git** | Latest | `git --version` | [git-scm.com](https://git-scm.com) |

**Alternative Package Managers** (optional):
- [yarn](https://yarnpkg.com) - `npm install -g yarn`
- [pnpm](https://pnpm.io) - `npm install -g pnpm`
- [bun](https://bun.sh) - Ultra-fast JavaScript runtime

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/uusa35/resturant-order-tracking-whatsapp.git

# OR using SSH
git clone git@github.com:uusa35/resturant-order-tracking-whatsapp.git

# Navigate to project directory
cd resturant-order-tracking-whatsapp
```

#### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm (default)
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install

# OR using bun
bun install
```

**Installation Time**: Approximately 2-3 minutes depending on your internet speed.

#### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
# Check Next.js installation
npx next --version

# Check TypeScript
npx tsc --version

# Verify project structure
ls -la src/
```

#### 4. Start Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev

# OR using pnpm
pnpm dev

# OR using bun
bun dev
```

The development server will start at **[http://localhost:3000](http://localhost:3000)**

#### 5. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Troubleshooting

<details>
<summary><strong>Port 3000 already in use</strong></summary>

```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```
</details>

<details>
<summary><strong>Node version issues</strong></summary>

```bash
# Check Node version
node --version

# Use nvm to install correct version
nvm install 20
nvm use 20
```
</details>

<details>
<summary><strong>Module not found errors</strong></summary>

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```
</details>

<details>
<summary><strong>TypeScript errors</strong></summary>

```bash
# Restart TypeScript server (VS Code)
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"

# Or check TypeScript configuration
npx tsc --noEmit
```
</details>

---

## 🚀 Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server on port 3000 | Development |
| `npm run build` | Build production bundle | Production |
| `npm start` | Start production server | Production |
| `npm run lint` | Run ESLint for code quality | Quality Check |

### Additional Commands

```bash
# Run linter with auto-fix
npm run lint -- --fix

# Build and analyze bundle size
npm run build && npm run analyze

# Clear Next.js cache
rm -rf .next
```

---

## 📁 Project Structure

### Complete Directory Tree

```
resturant-order-tracking-whatsapp/
│
├── .claude/                          # Claude Code configuration
│   └── commands/                     # Custom Claude commands
│       └── nextjs-expert.md         # Next.js expert agent
│
├── public/                           # Static assets
│   ├── next.svg                     # Next.js logo
│   ├── vercel.svg                   # Vercel logo
│   └── ...                          # Other public assets
│
├── src/                              # Source code
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── (frontend)/             # 🌐 Customer-facing pages (route group)
│   │   │   ├── layout.tsx          # Frontend layout
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── menu/               # Menu browsing
│   │   │   │   ├── page.tsx        # Menu listing
│   │   │   │   └── [id]/           # Menu item details
│   │   │   │       └── page.tsx
│   │   │   └── orders/             # Order tracking
│   │   │       ├── page.tsx        # Orders list
│   │   │       └── [id]/           # Order details
│   │   │           └── page.tsx
│   │   │
│   │   ├── dashboard/              # 🎛️ Admin dashboard
│   │   │   ├── layout.tsx          # Dashboard layout
│   │   │   ├── page.tsx            # Dashboard home
│   │   │   ├── orders/             # Order management
│   │   │   │   ├── page.tsx        # Orders table
│   │   │   │   └── [id]/           # Order detail/edit
│   │   │   │       └── page.tsx
│   │   │   ├── customers/          # Customer management
│   │   │   │   ├── page.tsx        # Customers table
│   │   │   │   └── [id]/           # Customer detail/edit
│   │   │   │       └── page.tsx
│   │   │   ├── menu/               # Menu management
│   │   │   │   ├── page.tsx        # Menu items table
│   │   │   │   └── [id]/           # Menu item edit
│   │   │   │       └── page.tsx
│   │   │   └── analytics/          # Analytics & reports
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   └── favicon.ico             # Favicon
│   │
│   ├── components/                  # ⚛️ React components
│   │   │
│   │   ├── ui/                     # shadcn/ui base components
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── dialog.tsx          # Dialog component
│   │   │   ├── input.tsx           # Input component
│   │   │   ├── table.tsx           # Table component
│   │   │   └── ...                 # More UI components
│   │   │
│   │   ├── frontend/               # Customer-facing components
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── header.tsx      # Site header
│   │   │   │   ├── footer.tsx      # Site footer
│   │   │   │   └── navigation.tsx  # Main navigation
│   │   │   ├── menu/               # Menu components
│   │   │   │   ├── menu-card.tsx   # Menu item card
│   │   │   │   ├── menu-grid.tsx   # Menu grid layout
│   │   │   │   └── menu-filters.tsx # Menu filters
│   │   │   ├── orders/             # Order components
│   │   │   │   ├── order-card.tsx  # Order card
│   │   │   │   ├── order-status.tsx # Order status badge
│   │   │   │   └── order-tracking.tsx # Order tracking
│   │   │   └── whatsapp/           # WhatsApp components
│   │   │       └── whatsapp-button.tsx
│   │   │
│   │   ├── dashboard/              # Admin dashboard components
│   │   │   ├── layout/             # Dashboard layout
│   │   │   │   ├── sidebar.tsx     # Dashboard sidebar
│   │   │   │   ├── dashboard-nav.tsx # Dashboard navigation
│   │   │   │   └── top-bar.tsx     # Top bar
│   │   │   ├── orders/             # Order management components
│   │   │   │   ├── orders-table.tsx # Orders data table
│   │   │   │   ├── order-row.tsx   # Table row
│   │   │   │   ├── order-form.tsx  # Order form
│   │   │   │   ├── order-filters.tsx # Order filters
│   │   │   │   └── order-stats.tsx # Order statistics
│   │   │   ├── customers/          # Customer components
│   │   │   │   ├── customers-table.tsx
│   │   │   │   ├── customer-form.tsx
│   │   │   │   └── customer-filters.tsx
│   │   │   └── analytics/          # Analytics components
│   │   │       ├── charts.tsx      # Charts
│   │   │       ├── stats-card.tsx  # Statistics card
│   │   │       └── reports.tsx     # Reports
│   │   │
│   │   ├── shared/                 # Shared components
│   │   │   ├── forms/              # Form components
│   │   │   │   ├── form-input.tsx  # Form input
│   │   │   │   ├── form-select.tsx # Form select
│   │   │   │   └── form-textarea.tsx # Form textarea
│   │   │   └── feedback/           # Feedback components
│   │   │       ├── loading-spinner.tsx
│   │   │       ├── error-message.tsx
│   │   │       └── toast.tsx
│   │   │
│   │   └── README.md               # Components documentation
│   │
│   ├── views/                       # 📄 Page-level view components
│   │   ├── frontend/               # Customer views
│   │   │   ├── home-view.tsx       # Home page view
│   │   │   ├── menu-view.tsx       # Menu page view
│   │   │   └── order-tracking-view.tsx
│   │   ├── dashboard/              # Dashboard views
│   │   │   ├── orders-view.tsx     # Orders management view
│   │   │   ├── customers-view.tsx  # Customers view
│   │   │   ├── menu-view.tsx       # Menu management view
│   │   │   └── analytics-view.tsx  # Analytics view
│   │   └── README.md               # Views documentation
│   │
│   ├── services/                    # 🔧 Business logic layer
│   │   ├── orders.service.ts       # Order operations
│   │   ├── customers.service.ts    # Customer operations
│   │   ├── menu.service.ts         # Menu operations
│   │   ├── whatsapp.service.ts     # WhatsApp integration
│   │   ├── analytics.service.ts    # Analytics calculations
│   │   └── README.md               # Services documentation
│   │
│   ├── stores/                      # 📦 Zustand state stores
│   │   ├── orders.store.ts         # Order state management
│   │   ├── customers.store.ts      # Customer state
│   │   ├── menu.store.ts           # Menu state
│   │   ├── ui.store.ts             # UI state (modals, sidebar)
│   │   ├── whatsapp.store.ts       # WhatsApp state
│   │   └── example-store.ts        # Example store pattern
│   │
│   ├── lib/                         # 🛠️ Utility functions
│   │   ├── database.ts             # Database abstraction layer
│   │   ├── storage.ts              # Storage helpers
│   │   ├── utils.ts                # General utilities (cn helper)
│   │   ├── validators.ts           # Validation functions
│   │   └── formatters.ts           # Date/currency formatters
│   │
│   ├── types/                       # 📝 TypeScript definitions
│   │   ├── index.ts                # Shared types
│   │   ├── orders.types.ts         # Order types
│   │   ├── customers.types.ts      # Customer types
│   │   └── menu.types.ts           # Menu types
│   │
│   └── hooks/                       # 🪝 Custom React hooks
│       ├── use-local-storage.ts    # localStorage hook
│       ├── use-orders.ts           # Orders hook
│       └── use-whatsapp.ts         # WhatsApp hook
│
├── .gitignore                       # Git ignore file
├── components.json                  # shadcn/ui configuration
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies & scripts
├── postcss.config.mjs              # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── CLAUDE.md                        # Claude Code documentation
└── README.md                        # This file
```

### Directory Explanations

#### 📂 `src/app/`
Next.js App Router directory with file-based routing.
- **(frontend)/** - Route group for customer pages (doesn't affect URL)
- **dashboard/** - Admin panel routes
- **layout.tsx** - Shared layouts
- **page.tsx** - Page components

#### 📂 `src/components/`
Reusable React components organized by domain.
- **ui/** - shadcn/ui primitives (Button, Card, Dialog, etc.)
- **frontend/** - Customer-facing components
- **dashboard/** - Admin components
- **shared/** - Components used by both frontend and dashboard

#### 📂 `src/views/`
Page-level view components that orchestrate UI composition.
- Views connect to Zustand stores
- Handle data fetching and loading states
- Compose smaller components

#### 📂 `src/services/`
Business logic and data operations layer.
- All localStorage operations
- CRUD operations for entities
- Business logic and calculations

#### 📂 `src/stores/`
Zustand state management stores.
- One store per entity (orders, customers, menu)
- Automatic localStorage persistence
- Include both data and UI state

#### 📂 `src/lib/`
Utility functions and helpers.
- Database abstraction layer
- Storage utilities
- Common helper functions

#### 📂 `src/types/`
TypeScript type definitions.
- Shared interfaces and types
- Domain-specific types

#### 📂 `src/hooks/`
Custom React hooks.
- Reusable stateful logic
- Hook composition

---

## 🏗️ Architecture

### Layered Architecture

This project follows a **strict layered architecture** to maintain code quality and separation of concerns:

```
┌─────────────────────┐
│      Pages          │  ← Next.js routes (minimal logic)
│   (src/app/)        │     - Define metadata
└──────────┬──────────┘     - Import and render views
           │
┌──────────▼──────────┐
│      Views          │  ← Page-level composition
│   (src/views/)      │     - Connect to stores
└──────────┬──────────┘     - Manage loading states
           │                 - Compose components
┌──────────▼──────────┐
│    Components       │  ← Reusable UI pieces
│  (src/components/)  │     - Presentational
└──────────┬──────────┘     - Domain-organized
           │                 - Type-safe props
┌──────────▼──────────┐
│      Stores         │  ← State management
│   (src/stores/)     │     - Zustand + persist
└──────────┬──────────┘     - Global state
           │                 - UI state
┌──────────▼──────────┐
│     Services        │  ← Business logic
│  (src/services/)    │     - CRUD operations
└──────────┬──────────┘     - Data validation
           │                 - Business rules
┌──────────▼──────────┐
│     Database        │  ← Data persistence
│   (src/lib/)        │     - localStorage API
└──────────┬──────────┘     - Type-safe storage
           │
┌──────────▼──────────┐
│   localStorage      │  ← Browser storage
└─────────────────────┘
```

### Key Principles

1. **Frontend/Dashboard Separation** - Never mix customer and admin code
2. **Service Layer** - All business logic in services, not in components
3. **View Layer** - Compose components and manage page-level state
4. **Type Safety** - Everything typed with TypeScript
5. **Persistence** - Zustand stores automatically persist to localStorage
6. **Single Responsibility** - Each layer has one clear purpose

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Store Action (Zustand)
    ↓
Service Method
    ↓
Database Operation
    ↓
localStorage
    ↓
Store Update (via persist)
    ↓
Component Re-render
```

---

## 💾 Database System

### localStorage as Database

This project uses **browser localStorage** as its database - no backend required!

#### Database Collections

```typescript
export const Collections = {
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  MENU_ITEMS: 'menu_items',
  MENU_CATEGORIES: 'menu_categories',
  WHATSAPP_MESSAGES: 'whatsapp_messages',
  SETTINGS: 'settings',
}
```

#### Usage Examples

```typescript
import { Database, Collections } from '@/lib/database'

// Initialize database (call once on app start)
await Database.initialize()

// INSERT - Create new order
const order = await Database.insert(Collections.ORDERS, {
  customerName: 'John Doe',
  phoneNumber: '+1234567890',
  items: [
    { id: '1', name: 'Pizza', quantity: 2, price: 15.99 }
  ],
  totalAmount: 31.98,
  status: 'pending'
})

// READ - Get all orders
const orders = await Database.getAll(Collections.ORDERS)

// READ - Get single order
const order = await Database.getById(Collections.ORDERS, orderId)

// QUERY - Filter orders
const pendingOrders = await Database.query(
  Collections.ORDERS,
  (order) => order.status === 'pending'
)

// UPDATE - Update order status
await Database.update(Collections.ORDERS, orderId, {
  status: 'confirmed'
})

// DELETE - Remove order
await Database.delete(Collections.ORDERS, orderId)

// STATISTICS - Get database stats
const stats = await Database.getStats()
console.log(stats.collections) // { orders: 10, customers: 5, ... }

// EXPORT - Backup database
const backup = await Database.export()
localStorage.setItem('backup', backup)

// IMPORT - Restore database
const backup = localStorage.getItem('backup')
await Database.import(backup)
```

### Database Features

- ✅ Type-safe operations with TypeScript
- ✅ Automatic UUID generation for IDs
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Advanced querying with filter functions
- ✅ Batch operations (insertMany, deleteMany)
- ✅ Export/Import for backup/restore
- ✅ Database statistics and sizing
- ✅ Migration support for schema changes
- ✅ Seeding utilities for development

---

## 🎨 Design System

### Color Palette

Our design system uses **HSL color space** for better color manipulation and dark mode support.

#### Light Mode Colors

```css
:root {
  --background: 0 0% 100%;           /* #FFFFFF - Pure white */
  --foreground: 240 10% 3.9%;        /* #09090B - Near black */

  --card: 0 0% 100%;                 /* #FFFFFF - Card background */
  --card-foreground: 240 10% 3.9%;  /* #09090B - Card text */

  --popover: 0 0% 100%;              /* #FFFFFF - Popover background */
  --popover-foreground: 240 10% 3.9%; /* #09090B - Popover text */

  --primary: 240 5.9% 10%;           /* #18181B - Primary brand */
  --primary-foreground: 0 0% 98%;    /* #FAFAFA - Text on primary */

  --secondary: 240 4.8% 95.9%;       /* #F4F4F5 - Secondary brand */
  --secondary-foreground: 240 5.9% 10%; /* #18181B - Text on secondary */

  --muted: 240 4.8% 95.9%;           /* #F4F4F5 - Muted background */
  --muted-foreground: 240 3.8% 46.1%; /* #71717A - Muted text */

  --accent: 240 4.8% 95.9%;          /* #F4F4F5 - Accent background */
  --accent-foreground: 240 5.9% 10%; /* #18181B - Accent text */

  --destructive: 0 84.2% 60.2%;      /* #EF4444 - Error/destructive */
  --destructive-foreground: 0 0% 98%; /* #FAFAFA - Text on destructive */

  --border: 240 5.9% 90%;            /* #E4E4E7 - Border color */
  --input: 240 5.9% 90%;             /* #E4E4E7 - Input border */
  --ring: 240 5.9% 10%;              /* #18181B - Focus ring */

  --radius: 0.5rem;                  /* 8px - Border radius */
}
```

#### Dark Mode Colors

```css
.dark {
  --background: 240 10% 3.9%;        /* #09090B - Dark background */
  --foreground: 0 0% 98%;            /* #FAFAFA - Light text */

  --card: 240 10% 3.9%;              /* #09090B - Dark card */
  --card-foreground: 0 0% 98%;       /* #FAFAFA - Light card text */

  --popover: 240 10% 3.9%;           /* #09090B - Dark popover */
  --popover-foreground: 0 0% 98%;    /* #FAFAFA - Light popover text */

  --primary: 0 0% 98%;               /* #FAFAFA - Primary in dark */
  --primary-foreground: 240 5.9% 10%; /* #18181B - Text on primary */

  --secondary: 240 3.7% 15.9%;       /* #27272A - Secondary in dark */
  --secondary-foreground: 0 0% 98%;  /* #FAFAFA - Text on secondary */

  --muted: 240 3.7% 15.9%;           /* #27272A - Muted in dark */
  --muted-foreground: 240 5% 64.9%;  /* #A1A1AA - Muted text */

  --accent: 240 3.7% 15.9%;          /* #27272A - Accent in dark */
  --accent-foreground: 0 0% 98%;     /* #FAFAFA - Accent text */

  --destructive: 0 62.8% 30.6%;      /* #991B1B - Destructive in dark */
  --destructive-foreground: 0 0% 98%; /* #FAFAFA - Text on destructive */

  --border: 240 3.7% 15.9%;          /* #27272A - Border in dark */
  --input: 240 3.7% 15.9%;           /* #27272A - Input border */
  --ring: 240 4.9% 83.9%;            /* #D4D4D8 - Focus ring */
}
```

### Typography

#### Font Families

```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
```

#### Font Usage

```css
/* Default font (Geist Sans) */
body {
  font-family: var(--font-geist-sans);
}

/* Monospace font (Geist Mono) */
code, pre {
  font-family: var(--font-geist-mono);
}
```

#### Typography Scale

```tsx
// Headings
<h1 className="text-4xl font-bold">Page Title</h1>
<h2 className="text-3xl font-semibold">Section Title</h2>
<h3 className="text-2xl font-semibold">Subsection</h3>
<h4 className="text-xl font-medium">Card Title</h4>

// Body text
<p className="text-base">Default body text</p>
<p className="text-sm">Small text</p>
<p className="text-xs">Extra small text</p>
<p className="text-lg">Large text</p>

// Font weights
<p className="font-light">Light (300)</p>
<p className="font-normal">Normal (400)</p>
<p className="font-medium">Medium (500)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-bold">Bold (700)</p>
```

### Spacing System

Based on Tailwind's default spacing scale:

```tsx
// Padding
<div className="p-4">    {/* 16px */}
<div className="p-6">    {/* 24px */}
<div className="p-8">    {/* 32px */}

// Margin
<div className="m-4">    {/* 16px */}
<div className="mt-6">   {/* margin-top: 24px */}
<div className="mb-8">   {/* margin-bottom: 32px */}

// Gap (for flexbox/grid)
<div className="flex gap-4">     {/* 16px gap */}
<div className="grid gap-6">     {/* 24px gap */}

// Space between
<div className="space-y-4">      {/* 16px vertical spacing */}
<div className="space-x-6">      {/* 24px horizontal spacing */}
```

### Component Patterns

#### Button Variants

```tsx
import { Button } from '@/components/ui/button'

// Default button
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

#### Card Pattern

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Form Pattern

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>

  <Button className="w-full">Submit</Button>
</div>
```

### Responsive Design

Mobile-first approach using Tailwind breakpoints:

```tsx
<div className="
  p-4              /* Mobile: 16px padding */
  md:p-6           /* Tablet: 24px padding */
  lg:p-8           /* Desktop: 32px padding */

  grid             /* All: grid layout */
  grid-cols-1      /* Mobile: 1 column */
  md:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */

  gap-4            /* Mobile: 16px gap */
  lg:gap-6         /* Desktop: 24px gap */
">
  {/* Content */}
</div>
```

#### Breakpoints

| Breakpoint | Min Width | CSS |
|------------|-----------|-----|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `2xl` | 1536px | `@media (min-width: 1536px)` |

### Adding shadcn/ui Components

```bash
# Add individual component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add card table dialog form

# List available components
npx shadcn@latest add
```

### Design Best Practices

1. **Consistency** - Use defined colors, spacing, and typography
2. **Accessibility** - Maintain proper contrast ratios (WCAG AA)
3. **Mobile-First** - Design for mobile, enhance for desktop
4. **Dark Mode** - Support both light and dark themes
5. **Performance** - Use proper image optimization
6. **Semantic HTML** - Use correct HTML elements
7. **Component Reuse** - Build reusable, composable components

---

## 👨‍💻 Development Guide

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Create a New Feature**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   ```

3. **Follow Architecture**
   - Define types in `src/types/`
   - Create service in `src/services/`
   - Create store in `src/stores/`
   - Create components in `src/components/`
   - Create view in `src/views/`
   - Create page in `src/app/`

4. **Run Linter**
   ```bash
   npm run lint
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

### Code Style Guidelines

```typescript
// ✅ Good: Named exports for components
export function OrdersTable() { }

// ❌ Bad: Default exports for components
export default function OrdersTable() { }

// ✅ Good: Type everything
interface OrderProps {
  order: Order
  onUpdate: (id: string) => void
}

// ❌ Bad: Using any
function updateOrder(data: any) { }

// ✅ Good: Use services for data operations
const orders = await OrdersService.getAll()

// ❌ Bad: Direct localStorage access in components
const orders = JSON.parse(localStorage.getItem('orders'))
```

### Environment Variables

Create `.env.local` for local environment variables:

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Restaurant Order Tracking"
NEXT_PUBLIC_WHATSAPP_NUMBER="+1234567890"
```

---

## 🔌 Claude Code Agent

This project includes a **Next.js expert agent** for Claude Code:

```bash
# Get expert guidance anytime
/nextjs-expert
```

### What the Agent Provides

- 📚 **Architecture Patterns** - Complete architectural guidelines
- 🏗️ **Implementation Guides** - Step-by-step feature implementation
- 📝 **Code Examples** - Ready-to-use code templates
- 🎯 **Decision Guidelines** - When to use each pattern
- ⚠️ **Best Practices** - Common pitfalls to avoid
- 🔧 **Service Patterns** - Complete CRUD service examples
- 📦 **Store Patterns** - Zustand store with persistence
- 🎨 **Component Patterns** - Reusable component examples

---

## 🤝 Contributing

Contributions are welcome! Please follow the established architecture patterns.

### Contributing Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow the architecture** (Types → Services → Stores → Components → Views → Pages)
4. **Use the Claude agent** for guidance (`/nextjs-expert`)
5. **Run linting** (`npm run lint`)
6. **Commit changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
7. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org)** - The React Framework for Production
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful UI components
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Vercel](https://vercel.com)** - Deployment and hosting platform
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - JavaScript with syntax for types

---

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

**Useful Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

[Report Bug](https://github.com/uusa35/resturant-order-tracking-whatsapp/issues) · [Request Feature](https://github.com/uusa35/resturant-order-tracking-whatsapp/issues) · [Documentation](https://github.com/uusa35/resturant-order-tracking-whatsapp/wiki)

</div>
