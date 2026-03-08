# Archive Photo Strategy

## Why the archive exists

- Honor the legacy site and family history
- Add depth and authenticity (place-forward storytelling)
- Allow gradual enrichment over time without changing core UX

## Locked-in decisions

- Legacy Gallery is a permanent main-menu item.
- Legacy Gallery is **categories only** (no “All Photos” view for MVP).
- Cottage pages may include a small “From the Archive” section, but it is:
  - optional
  - clearly labeled
  - never required for page completeness

## Where archive photos appear

### 1) Legacy Gallery (primary home for archival photos)
- `/legacy` landing page with categories
- `/legacy/{category}` category pages with image grids

### 2) Cottage pages (secondary, minimal)
- Optional “From the Archive” highlights block (1–3 images typical; max 6)
- A link back to the relevant legacy category page (if known)

## Categories

Start with the legacy mental model:

- beach
- camps
- dusk-dawn
- misc (fallback)

You can add more categories later without refactoring routes.

## Curation guidance (no property expertise required)

- If unsure, use `misc`.
- Keep archive “highlights” on cottages small and intentional.
- The archive should feel like a curated scrapbook, not a dump.
