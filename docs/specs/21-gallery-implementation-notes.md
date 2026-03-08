# Gallery Implementation Notes

This document describes the easiest, most maintainable approach to implementing modern and legacy galleries in Astro.

## Guiding principles

- Favor static generation and filesystem-driven content for galleries.
- Avoid requiring per-photo metadata to launch.
- Provide optional upgrade paths for captions/alt text later.

## Gallery types

### 1) Modern cottage galleries (per cottage)

Source:
- `photos` array in each cottage Markdown file.

Rendering:
- Responsive grid (thumbnails)
- Optional progressive enhancement lightbox (not required for MVP)

Fallback behavior:
- If `photos` is empty, do not render the gallery section (or render a “Photos coming soon” message).
- Hero image still renders.

Alt text:
- MVP: generate default alt text like “{Cottage Title} photo {n}”.
- Improve later by allowing photo objects with `alt` if desired.

### 2) Legacy Gallery (site-wide, permanent nav)

Source (MVP):
- Filesystem folders under `public/images/legacy/{category}/`

Category discovery:
- Prefer a fixed list of categories in config (stable URLs and nav labels).
- Each category page reads files from its folder at build time.

Why fixed categories:
- Predictable navigation and stable URLs
- No accidental category exposure (e.g., random folders)

Empty state:
- If a category folder has 0 images, render:
  - a short friendly “More coming soon” message
  - optionally show a few links to other categories

## Folder structure (recommended)

- `public/images/legacy/beach/`
- `public/images/legacy/camps/`
- `public/images/legacy/dusk-dawn/`
- `public/images/legacy/historic/` (optional)
- `public/images/legacy/misc/` (optional; can be hidden from nav)

Modern cottage photos:
- `public/images/cottages/{slug}/...`

## Routing strategy

- `/legacy`:
  - renders category tiles/cards (name + short description)
- `/legacy/{category}`:
  - renders category intro + image grid

No `/legacy/all` route.

## Image optimization strategy

For MVP:
- Serve from `public/` paths (simple, reliable).
- Ensure source images are appropriately sized and compressed before upload.

Optional enhancement:
- Use Astro image tooling where it integrates cleanly without adding authoring friction.

## Lightbox strategy (optional)

Keep it progressive:
- MVP: no lightbox; clicking opens the image file in a new tab.
- Enhancement: add a lightweight lightbox component that:
  - traps focus
  - closes on ESC
  - works with keyboard navigation
  - does not block page render

If lightbox is implemented, ensure:
- thumbnails remain real links (good fallback)
- JS is minimal and scoped

## Captions and archival metadata (later)

Two low-friction upgrade paths:

### A) Per-category captions file (simple)
Add `captions.json` inside each legacy category folder mapping filename → caption.
- enables captions without per-photo Markdown

### B) Archive content collection (structured)
Create `src/content/legacy/` where each entry includes:
- image path
- category
- caption
- dateApprox (optional)
- credit (optional)

This is more work but best if the archive becomes large and curated.

## Cottage “From the Archive” strip (optional)

Data source:
- `legacyHighlights` array in cottage frontmatter.

Rules:
- render only if 1+ images exist
- show small grid/strip (1–6)
- label clearly “From the Archive”
- keep visually distinct from modern gallery
- optionally link to a matching Legacy category
