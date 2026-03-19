# Workshop: Agentic Software Engineering

## Project Overview

This is a Slidev presentation project for an "Agentic Software Engineering" workshop. It uses Slidev
(https://sli.dev/) - a markdown-based presentation framework built on Vue.

## Important Commands

```bash
npm install    # Install dependencies
npm start      # Start local server with hot reload (opens http://localhost:3030)
```

## Important folders and files

- `slides.md` - Main entry point for the deck; chapter order is defined here via `src:` includes
- `docs/slide-structure.md` - Source of truth for how slide content, local assets, and topic folders are organized
- `docs/` - Workshop notes, structure docs, and supporting documentation
- `components/` - Reusable Vue components available in slides
- `layouts/` - Custom Slidev layouts used by the deck
- `slides/` - Chapter and topic slide content following `docs/slide-structure.md`
- `public/` - Global reusable assets such as backgrounds, logos, shared images, and videos

Components and slides use UnoCSS/Windi CSS attributify mode for styling.
