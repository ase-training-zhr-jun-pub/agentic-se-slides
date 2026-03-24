# Agentic Software Engineering Workshop

This repository contains the Slidev deck for the Agentic Software Engineering workshop.

## Getting started

- `npm install`

## Working modes

### Edit slides locally

Use the dev server while actively editing slides:

- `npm run dev`
- open <http://localhost:3030>

This gives you live reload, but startup can be slow because the presentation has grown and includes many assets.

### Present from a prebuilt bundle

Before a workshop or live presentation, build once and serve the generated output locally:

- `npm run present`

`npm run present` builds the deck and then uses `vite preview` to serve the already built bundle. This avoids the long initial asset build of the dev server and is the recommended workflow right before presenting.

If you already built the deck and just want to serve it again, use `npm run preview`.

Trade-off: when you present via the preview server, slide changes are not reflected live. If you want to edit during the workshop, continue using `npm run dev` instead.

## Project structure

- `slides.md` is the main entry point and includes the chapter files
- `slides/` contains the workshop slide content
- `components/` contains reusable Vue components for slides
- `layouts/` contains custom Slidev layouts
- `public/` contains shared assets

Learn more about Slidev at the [documentation](https://sli.dev/).
