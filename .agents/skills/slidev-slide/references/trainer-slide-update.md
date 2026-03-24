# Trainer Slide Update

Use this reference when the user asks to update the trainer slide, for example:
- "Aktualisiere die Trainer auf Roman und Joy"
- "Setze die Trainer:innen auf ..."
- "Update the trainer slide to ..."

## Goal

Update the existing trainer slide in `slides.md` with trainer data from `trainers.csv`.

Do not redesign the slide.
Do not change the layout structure unless the user explicitly asks for it.
Only replace the trainer-specific content in the existing `Person` blocks.

## Data Source

Read trainer data from:

- `trainers.csv`

The CSV columns are:

- `last_name`
- `first_name`
- `role`
- `status`
- `image_url`

## Target Slide

Update the trainer slide in:

- `slides.md`

The displayed trainer entries are rendered with `Person` components.

## Matching Rules

Match the trainers named by the user against rows in `trainers.csv`.

Preferred matching order:

1. Exact match on full displayed name
2. Exact match on `first_name`
3. Exact match on `last_name`

Use the CSV row only if the match is unambiguous.

If the user gives only a first name such as `Roman` or `Joy`, use the unique matching CSV row.

If multiple rows could match, ask a brief clarifying question instead of guessing.

If no row matches, ask a brief clarifying question instead of inventing data.

## Status Rule

By default, only use trainers with:

- `status = aktiv`

If the user explicitly names a trainer with a different status, you may use that trainer.

## Field Mapping

Map CSV values to the slide like this:

- displayed `name` = `first_name + " " + last_name`
- displayed role text = `role`
- `image` = `image_url`

Example:

- CSV: `first_name=Joy`, `last_name=Heron`
- Slide name: `Joy Heron`

## Update Behavior

When updating the slide:

- keep the existing slide layout unchanged
- keep the existing number and order of requested trainers
- replace only the trainer-specific values in the existing `Person` blocks
- preserve surrounding markup, spacing style, and non-trainer content

## Safety Rules

- Do not invent trainer names, roles, or images
- Do not use data from any source other than `trainers.csv`
- If the request is ambiguous, ask one targeted question
- If the user names two trainers, update the two existing `Person` entries accordingly
