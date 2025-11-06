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

## Notes

- This project is in early stages - most files are from create-next-app boilerplate
- No backend/API routes implemented yet
- No WhatsApp integration present yet
- No database or state management configured
