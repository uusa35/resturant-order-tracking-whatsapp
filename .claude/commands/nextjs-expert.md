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
- Create stores in `src/stores/` directory
- Use TypeScript interfaces for store state
- Keep stores focused and modular (separate stores for orders, settings, etc.)
- Example pattern:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  // state
  // actions
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // implementation
    }),
    { name: 'store-name' }
  )
)
```

### Storage/Database
- Use localStorage for persistent data (orders, customer info, settings)
- Use Zustand's persist middleware to sync state with localStorage
- Create utility functions in `src/lib/storage.ts` for direct storage operations
- Handle storage quotas and errors gracefully

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
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── stores/          # Zustand stores
├── lib/             # Utility functions
├── types/           # TypeScript types
└── hooks/           # Custom React hooks
```

## Best Practices

1. **Performance**: Minimize client-side JavaScript, use Server Components
2. **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
3. **SEO**: Set proper metadata in layout.tsx and page.tsx files
4. **Security**: Validate and sanitize user inputs, handle storage securely
5. **Testing**: Write tests for critical business logic and components
6. **Code Quality**: Follow ESLint rules, maintain consistent formatting

## Common Tasks

### Adding a New Page
1. Create file in `src/app/[route]/page.tsx`
2. Define metadata export
3. Build component (Server Component by default)

### Adding a New Component
1. Determine if client or server component
2. Create in appropriate directory
3. Use shadcn/ui components where applicable
4. Style with Tailwind classes

### Creating a Store
1. Create file in `src/stores/`
2. Define TypeScript interface
3. Use persist middleware for localStorage sync
4. Export typed hook

### Adding shadcn/ui Component
Run: `npx shadcn@latest add [component-name]`

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
