# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Restaurant order tracking system integrated with WhatsApp. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Next.js App Router Structure
- **src/app/**: App Router directory with file-based routing
- **src/app/layout.tsx**: Root layout with Geist font configuration
- **src/app/page.tsx**: Home page component
- **src/app/globals.css**: Global styles with Tailwind directives

### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017

### Styling
Uses Tailwind CSS v4 (PostCSS-based). Configuration is in `postcss.config.mjs` (not `tailwind.config.js`).

### Font Setup
Uses Next.js `next/font` with Geist Sans and Geist Mono fonts, loaded as CSS variables:
- `--font-geist-sans`
- `--font-geist-mono`

## Key Dependencies

- **Next.js 16.0.1**: Latest Next.js with App Router
- **React 19.2.0**: Latest React version
- **Tailwind CSS v4**: New PostCSS-based version (breaking changes from v3)
- **TypeScript 5**: With strict type checking
- **Zustand 5.0.8**: State management with localStorage persistence
- **shadcn/ui**: Component library (class-variance-authority, clsx, tailwind-merge, lucide-react)
- **Framer Motion**: Animation library for smooth, professional motion

## State Management

Uses **Zustand** for global state with localStorage persistence:
- Store files in `src/stores/`
- Use `persist` middleware for automatic localStorage sync
- Example: `src/stores/example-store.ts`

## Data Persistence

Uses **localStorage** as database (no backend):
- Storage utilities in `src/lib/storage.ts` (type-safe helpers)
- Custom hook: `src/hooks/use-local-storage.ts` for React state + localStorage
- Zustand stores automatically persist via `persist` middleware

## Component System

**shadcn/ui** setup complete:
- Config: `components.json`
- UI components directory: `src/components/ui/`
- Utility function: `src/lib/utils.ts` (cn helper for class merging)
- Theme variables in `src/app/globals.css`
- Add components: `npx shadcn@latest add [component-name]`

## Animations & Motion

**Framer Motion** for all animations:
- Smooth page transitions and component animations
- Pre-built animation variants in `src/lib/animation-variants.ts`
- Use `motion` components from `framer-motion`
- React Bits components for pre-built animated UI
- Add React Bits: `npx shadcn@latest add "https://reactbits.dev/r/component-name"`

**Animation Guidelines:**
- Keep animations subtle (200-400ms duration)
- Use spring animations for natural feel
- Respect `prefers-reduced-motion`
- Animate page transitions, hover states, loading states

## Image Handling

**FoodImage Component** for all food images:
- Location: `src/components/shared/images/food-image.tsx`
- Automatic fallback to beautiful food placeholders
- 14 category-specific placeholders (pizza, burger, pasta, etc.)
- Uses Unsplash high-quality food images
- Includes loading states and error handling

**Usage:**
```tsx
import { FoodImage } from '@/components/shared/images'

<FoodImage
  src={menuItem.imageUrl}
  alt={menuItem.name}
  category="pizza" // Automatic placeholder if image fails
  fill
/>
```

## Project Structure

**Strictly organized by separation of concerns:**

```
src/
├── app/                      # Next.js App Router
│   ├── (frontend)/          # Public customer-facing pages
│   │   ├── page.tsx         # Home page
│   │   ├── menu/            # Menu browsing
│   │   └── orders/          # Order tracking
│   └── dashboard/           # Admin dashboard
│       ├── orders/          # Order management
│       ├── customers/       # Customer management
│       └── menu/            # Menu management
│
├── views/                   # Page-level view components
│   ├── frontend/            # Frontend views
│   └── dashboard/           # Dashboard views
│
├── components/              # Reusable components
│   ├── ui/                 # shadcn/ui base components
│   ├── frontend/           # Frontend-specific components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── menu/           # Menu components
│   │   └── orders/         # Order components
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── layout/         # Sidebar, DashboardNav
│   │   ├── orders/         # OrderTable, OrderFilters
│   │   └── customers/      # CustomerTable, CustomerForm
│   └── shared/             # Truly shared components
│       ├── forms/          # Form inputs
│       ├── feedback/       # Loading, errors
│       └── images/         # FoodImage component
│
├── services/               # Business logic & data operations
│   ├── orders.service.ts   # Order CRUD & business logic
│   ├── customers.service.ts
│   └── menu.service.ts
│
├── stores/                 # Zustand state management
│   ├── orders.store.ts     # Order state with persist
│   ├── customers.store.ts
│   └── ui.store.ts
│
├── lib/                    # Utility functions
│   ├── storage.ts          # localStorage helpers
│   ├── database.ts         # Database abstraction
│   ├── utils.ts            # General utilities
│   └── animation-variants.ts # Framer Motion animation presets
│
├── types/                  # TypeScript definitions
│   ├── index.ts            # Shared types
│   └── orders.types.ts     # Domain-specific types
│
└── hooks/                  # Custom React hooks
    └── use-local-storage.ts
```

## Code Organization Principles

1. **Frontend/Dashboard Separation**: Never mix frontend and dashboard code
2. **Service Layer**: All business logic and localStorage operations in services
3. **View Layer**: Page-level components that orchestrate UI
4. **Component Layer**: Reusable, domain-organized components
5. **Type Safety**: Everything properly typed with TypeScript
6. **State Management**: Zustand stores with localStorage persistence

## Claude Agent

Run `/nextjs-expert` to get expert guidance on Next.js development patterns and best practices for this project.

## Notes

- No backend - all data stored in browser localStorage
- No WhatsApp integration implemented yet (planned)
- Theme: Zinc color palette with dark mode support
- Use Server Components by default, add 'use client' only when needed
