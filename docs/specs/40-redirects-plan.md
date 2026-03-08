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
