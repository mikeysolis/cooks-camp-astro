# Content Authoring Guide

This guide is intended for editing in GitHub (Markdown-first).

## Editing pages

Pages live in `src/content/pages/`.

Each page has frontmatter:
- `title`
- `description`

Body content:
- Use headings (`##`) to break up long copy.
- Prefer shorter paragraphs and occasional bullet lists.

## Adding or editing a cottage

Cottages live in `src/content/cottages/`.

Required:
- title, description, sleeps, bedrooms, bathrooms
- category (large/medium/small)
- hero image path
- amenities list

Recommended:
- 8–15 modern photos, not dozens
- a short narrative in the body

Optional:
- `legacyHighlights` (0–6 image paths)

Rules:
- If `legacyHighlights` is missing, the cottage page still works.
- Keep amenities consistent (avoid duplicates like “WiFi” vs “wifi”).

## Adding legacy photos over time

Legacy photos are folder-driven for MVP.

Add images into:
- `public/images/legacy/beach/`
- `public/images/legacy/camps/`
- `public/images/legacy/dusk-dawn/`
- `public/images/legacy/misc/`

No captions required for MVP.

## Naming conventions

- Use hyphens, not spaces.
- Avoid special characters.
- Prefer stable, descriptive names:
  - `legacy-beach-001.jpg`
  - `legacy-camps-1950s-01.jpg` (if known)
  - `cottage-shell-hero.jpg`

## Keeping copy “in the spirit”

- Keep signature lines and the human voice.
- Tighten only for clarity.
- Avoid “corporate hospitality” language.
