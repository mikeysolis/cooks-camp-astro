# AGENTS.md

Project instructions for Codex agents working in this repository.

## Primary objective

Build a modern static site for Cook's by the Ocean that preserves the spirit of the historic site while keeping facts aligned to the current production site.

## Source-of-truth rules

1. Current production site (`http://www.cooksbytheocean.com/`) is the factual source of truth.
2. Historic site (`https://cookscampshistoric.com/Index.htm`) is the tone and storytelling reference.
3. If facts conflict between current and historic sources, current site wins.
4. If tone differs, prefer historic tone.

## Locked MVP content constraints

1. Do not publish a phone number.
2. Use cabin name `Sandy Scot`.
3. Use bathroom wording `half bath`.
4. Do not invent policy details not present on the current site.
5. Do not add booking engine, checkout, or payments.

## Required page scope (MVP)

1. Home
2. Cottages index
3. Cottage detail pages (14 cabins)
4. Photos (modern)
5. Legacy Gallery (category-based)
6. About / History
7. Location / Directions
8. Contact / Request Dates

Notes:

1. Legacy gallery is categories only; no all-photos route.
2. Contact should be email + request form only.

## Design and tone guidance

1. Heritage-first, calm, text-forward presentation.
2. Avoid generic template look and app-like UI clutter.
3. Keep copy warm and place-forward, not corporate hospitality language.
4. Preserve signature lines where accurate.

## Cabin data expectations

1. Keep cabin roster aligned to current site.
2. Categories: `large`, `medium`, `small`.
3. Small category cabins may be studios (`bedrooms: 0`) where appropriate.
4. No fabricated amenities, occupancy, or operational claims.

## Photos and assets

Source assets:

- `docs/current_photos/{Cabin Name}/`

Target layout:

- `public/images/cottages/{slug}/hero.jpg`
- `public/images/cottages/{slug}/gallery-*.jpg`

Rules:

1. Keep originals untouched.
2. Export web-ready derivatives for site use.
3. Hero around 1600px wide; gallery around 1200px wide.
4. Prefer curated sets over dumping all photos.

## Form requirements

1. Request Dates form is required for MVP.
2. Include basic validation and anti-spam protections.
3. Form must work without client-side JavaScript.

## Implementation defaults

1. Use Astro + Tailwind with minimal JavaScript.
2. Prioritize accessibility, performance, and clear semantics.
3. Keep components small and maintainable.
4. Prefer explicit, readable code over clever abstractions.

## Key planning references

1. `docs/specs/11-heritage-first-implementation-brief.md` (primary)
2. `docs/specs/10-implementation-roadmap.md`
3. `docs/specs/20-feature-specs.md`
4. `docs/specs/navigation-layout-architecture-spec.md`
5. `docs/specs/cottage-page-template-implementation-spec.md`
