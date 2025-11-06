# 🍽️ Restaurant Order Tracking System

> A modern, real-time restaurant order management system with WhatsApp integration. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=flat-square)](https://github.com/pmndrs/zustand)

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

---

## 📦 Installation

### Prerequisites
- Node.js 20+
- npm, yarn, pnpm, or bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/uusa35/resturant-order-tracking-whatsapp.git

# Navigate to project directory
cd resturant-order-tracking-whatsapp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 🚀 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (frontend)/          # 🌐 Customer-facing pages
│   │   ├── page.tsx         # Home page
│   │   ├── menu/            # Menu browsing
│   │   └── orders/          # Order tracking
│   └── dashboard/           # 🎛️ Admin dashboard
│       ├── orders/          # Order management
│       ├── customers/       # Customer management
│       └── menu/            # Menu management
│
├── components/              # ⚛️ React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── frontend/           # Customer components
│   ├── dashboard/          # Admin components
│   └── shared/             # Shared components
│
├── views/                   # 📄 Page-level views
│   ├── frontend/           # Customer views
│   └── dashboard/          # Admin views
│
├── services/               # 🔧 Business logic layer
│   ├── orders.service.ts   # Order operations
│   ├── customers.service.ts
│   └── menu.service.ts
│
├── stores/                 # 📦 Zustand state stores
│   ├── orders.store.ts     # Order state
│   ├── customers.store.ts
│   └── ui.store.ts
│
├── lib/                    # 🛠️ Utilities
│   ├── database.ts         # Database abstraction
│   ├── storage.ts          # Storage helpers
│   └── utils.ts            # General utilities
│
├── types/                  # 📝 TypeScript definitions
│   └── index.ts            # Shared types
│
└── hooks/                  # 🪝 Custom React hooks
    └── use-local-storage.ts
```

---

## 🏗️ Architecture

### Separation of Concerns

This project follows a **strict layered architecture** to maintain code quality:

```
┌─────────────┐
│    Pages    │  ← Routes (minimal logic)
└──────┬──────┘
       │
┌──────▼──────┐
│    Views    │  ← Page composition & data fetching
└──────┬──────┘
       │
┌──────▼──────┐
│ Components  │  ← Reusable UI pieces
└──────┬──────┘
       │
┌──────▼──────┐
│   Stores    │  ← Zustand state management
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │  ← Business logic & data operations
└──────┬──────┘
       │
┌──────▼──────┐
│  Database   │  ← localStorage abstraction
└─────────────┘
```

### Key Principles

1. **Frontend/Dashboard Separation** - Never mix customer and admin code
2. **Service Layer** - All business logic in services
3. **View Layer** - Compose components and manage page state
4. **Type Safety** - Everything typed with TypeScript
5. **Persistence** - Zustand stores automatically persist to localStorage

---

## 💾 Database System

### localStorage as Database

This project uses **browser localStorage** as its database - no backend required!

```typescript
// Example: Using the Database API
import { Database, Collections } from '@/lib/database'

// Insert a new order
const order = await Database.insert(Collections.ORDERS, {
  customerName: 'John Doe',
  items: [...],
  totalAmount: 50.00,
  status: 'pending'
})

// Query orders
const pendingOrders = await Database.query(
  Collections.ORDERS,
  (order) => order.status === 'pending'
)

// Update order
await Database.update(Collections.ORDERS, order.id, {
  status: 'confirmed'
})
```

### Database Features

- ✅ Type-safe operations
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ CRUD operations
- ✅ Query with filters
- ✅ Export/Import data
- ✅ Database statistics
- ✅ Migration support

---

## 🎨 Styling System

### Tailwind CSS v4 + shadcn/ui

```bash
# Add new shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card table dialog
```

### Theme Customization

Theme colors are defined in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more colors */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode colors */
}
```

---

## 🔌 Claude Code Agent

This project includes a **Next.js expert agent** for Claude Code:

```bash
# Get expert guidance anytime
/nextjs-expert
```

The agent provides:
- 📚 Architecture patterns and best practices
- 🏗️ Step-by-step feature implementation guides
- 📝 Code examples and templates
- 🎯 Decision-making guidelines
- ⚠️ Common pitfalls to avoid

---

## 🤝 Contributing

Contributions are welcome! Please follow the established architecture patterns.

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the architecture**
   - Types first (`src/types/`)
   - Then service (`src/services/`)
   - Then store (`src/stores/`)
   - Then components (`src/components/`)
   - Finally views and pages

3. **Use the Claude agent** for guidance
   ```bash
   /nextjs-expert
   ```

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Submit a pull request**

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org)** - The React Framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful UI components
- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **[Vercel](https://vercel.com)** - Hosting platform
- **[Tailwind CSS](https://tailwindcss.com)** - Styling framework

---

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

[Report Bug](https://github.com/uusa35/resturant-order-tracking-whatsapp/issues) · [Request Feature](https://github.com/uusa35/resturant-order-tracking-whatsapp/issues)

</div>
