# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** project using **React 19**, **TypeScript**, and **Tailwind CSS v4**.

- `src/app/` — App Router root. `layout.tsx` is the root layout wrapping all pages; `page.tsx` is the home route (`/`).
- New routes are created as folders under `src/app/` with a `page.tsx` file inside (e.g. `src/app/workouts/page.tsx` becomes `/workouts`).
- API routes go in `src/app/api/` as `route.ts` files.
- The `@/*` path alias maps to `src/*` (e.g. `import Foo from "@/components/Foo"`).
- Fonts are loaded via `next/font/google` in `layout.tsx` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
- Global styles are in `src/app/globals.css`. Tailwind is configured via PostCSS (`postcss.config.mjs`).

## Key conventions

- All components default to **React Server Components**. Add `"use client"` only when browser APIs or interactivity (hooks, event handlers) are needed.
- TypeScript strict mode is enabled — avoid `any` and ensure all types are explicit.
- No test framework is configured yet.
