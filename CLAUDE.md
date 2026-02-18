# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** project using TypeScript, Tailwind CSS v4, and React 19.

**Routing:** File-based via `src/app/`. Each folder becomes a URL segment. Files named `page.tsx` render at that route. `layout.tsx` wraps child routes.

**Components:** Server Components by default (no `'use client'` directive needed). Add `'use client'` only when client-side interactivity, hooks, or browser APIs are required.

**Styling:** Tailwind CSS v4 via PostCSS. Global styles and CSS variables defined in `src/app/globals.css` using `@theme inline`. Dark mode uses `@media (prefers-color-scheme: dark)`.

**Path alias:** `@/*` resolves to `./src/*` (configured in `tsconfig.json`).

**API routes:** Add `route.ts` files inside `src/app/api/` for backend endpoints.

**SEO/Metadata:** Use Next.js `Metadata` API exported from `layout.tsx` or `page.tsx` files (not `<head>` tags directly).
