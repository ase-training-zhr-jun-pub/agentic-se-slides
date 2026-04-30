# Workshop: Agentic Software Engineering

## Project Overview

This is a Slidev presentation project for an "Agentic Software Engineering" workshop. It uses Slidev
(https://sli.dev/) - a markdown-based presentation framework built on Vue.

## Important Commands

```bash
npm install    # Install dependencies
npm run dev    # Start Slidev dev server with hot reload (opens http://localhost:3030)
npm run build  # Build the static presentation bundle
npm run preview  # Serve the built bundle locally via Vite preview
npm run present  # Build and preview the deck for presentations
```

## Important folders and files

- `slides.md` - Main entry point for the deck; chapter order is defined here via `src:` includes
- `docs/slide-structure.md` - Source of truth for how slide content, local assets, and topic folders are organized
- `docs/custom-components.md` - Primary reference for all reusable Vue components; read this before using or exploring `components/` source code
- `docs/custom-layouts.md` - Primary reference for all custom layouts; read this before using or exploring `layouts/` source code
- `docs/` - Further workshop notes and supporting documentation
- `components/` - Vue component source code (prefer `docs/custom-components.md` over reading source directly)
- `layouts/` - Custom layout source code (prefer `docs/custom-layouts.md` over reading source directly)
- `slides/` - Chapter and topic slide content following `docs/slide-structure.md`
- `public/` - Global reusable assets such as backgrounds, logos, shared images, and videos

Components and slides use UnoCSS/Windi CSS attributify mode for styling.

## Agent workflow notes

For tasks about creating or editing slides, prefer `npm run dev` because it gives fast feedback with hot reload.

If the user asks to prepare the deck for a workshop, rehearsal, or live presentation, run `npm run present`. If the deck is already built, `npm run preview` is enough.

Keep in mind that the preview server is meant for presenting the built output, not for live slide editing.
