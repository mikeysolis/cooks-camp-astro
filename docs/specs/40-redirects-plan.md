# Redirects Plan

## Goal

Preserve important legacy URLs and bookmarks by redirecting old `.htm` / `.html` routes to the new site structure.

## Approach

### Phase 1 — Curated redirects (recommended for MVP)
Start with a curated set of the most important legacy URLs:

- Home page variants
- About/History
- Directions/Location
- Cottages index
- Contact
- Any “top cottages” pages that people link to externally

### Phase 2 — Expanded coverage (later)
Add more redirects once you identify what’s getting traffic (analytics or server logs).

## Implementation notes (Vercel)

- Use permanent redirects (301) for stable mappings.
- Preserve query strings where it makes sense.
- Avoid redirect chains (A → B → C). Redirect directly to final.

## Definition of done

- Top legacy URLs redirect to equivalent pages.
- No loops, no chain redirects.
- 404 page is helpful for unmatched legacy paths.

## Implemented MVP mappings

- `/index.html` -> `/`
- `/large.html` -> `/cottages`
- `/medium.html` -> `/cottages`
- `/small.html` -> `/cottages`
- `/Cones.html` -> `/cottages/cones`
- `/big_guilda.html` -> `/cottages/big-guilda`
- `/camera.html` -> `/cottages/camera`
- `/captain.html` -> `/cottages/the-captain`
- `/dunes.html` -> `/cottages/dunes`
- `/little_guilda.html` -> `/cottages/little-guilda`
- `/marconi.html` -> `/cottages/marconi`
- `/new_cabin.html` -> `/cottages/new-cabin`
- `/oversea.html` -> `/cottages/oversea`
- `/pines.html` -> `/cottages/pines`
- `/pretty_home.html` -> `/cottages/pretty-home`
- `/sands.html` -> `/cottages/sands`
- `/sandy_scott.html` -> `/cottages/sandy-scot`
- `/summer_salt.html` -> `/cottages/summer-salt`
- `/gallery_beach.html` -> `/legacy/beach`
- `/gallery_camps.html` -> `/legacy/camps`
- `/gallery_historic.html` -> `/legacy/historic`
- `/gallery_aerial.html` -> `/legacy/sky-wildlife`
- `/gallery_wild.html` -> `/legacy/sky-wildlife`

Notes:

- `/robots.txt.html` redirects to `/robots.txt`.
- `/thumbnail-gallery.css.html` is treated as a bad legacy capture path and redirects to `/legacy`.
