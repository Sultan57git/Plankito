# Plankito
Launch with a plan and a kit.

Startup idea blueprints from scratch to production: opportunity, market & timing, competitor gap, edge & risks, business model, production stack, data model, costing, MVP scope and roadmap.

## Stack
Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · Tailwind CSS v4 · TypeScript · Geist + Instrument Serif

## Develop
```bash
npm install
npm run dev
```

## Add a blueprint
1. Copy a file in `src/content/ideas/` (e.g. `coldlink.ts`) and fill in every field — the `Idea` type in `src/content/types.ts` tells you what is required.
2. Register it in `src/content/ideas/index.ts`.

The page at `/ideas/<slug>` is generated statically at build time.
