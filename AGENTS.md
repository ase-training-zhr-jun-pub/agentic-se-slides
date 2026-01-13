# Agent Notes

## Project Overview

This is a Slidev presentation project for an "Agentic Software Engineering" workshop. It uses Slidev
(https://sli.dev/) - a markdown-based presentation framework built on Vue.

## Commands

```bash
npm install    # Install dependencies
npm dev        # Start dev server with hot reload (opens http://localhost:3030)
npm build      # Build static presentation
npm export     # Export to PDF
```

## Architecture

### Content Structure
- `docs/` - Contains the raw content and ideas we want to teach.
- `slides.md` - Main entry point, sets theme and includes chapter files via `src:` frontmatter
- `slides/chapters/` - Contains modular slide content files per chapter (e.g., `01-basics.md`) and includes topic files via `src:` frontmatter
- `slides/topics/` - Contains the actual content per topic. This enables us to easily recompose the structure

### Global Components
- `components/` - Vue components available in all slides (e.g., `Counter.vue`)
- `layouts/` - Workshop specific layout components
- Components use UnoCSS/Windi CSS attributify mode for styling
