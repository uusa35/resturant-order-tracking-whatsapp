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

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── stores/          # Zustand stores
├── lib/             # Utility functions (storage.ts, utils.ts)
├── types/           # TypeScript interfaces
└── hooks/           # Custom React hooks
```

## Claude Agent

Run `/nextjs-expert` to get expert guidance on Next.js development patterns and best practices for this project.

## Notes

- No backend - all data stored in browser localStorage
- No WhatsApp integration implemented yet (planned)
- Theme: Zinc color palette with dark mode support
- Use Server Components by default, add 'use client' only when needed
