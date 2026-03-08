# Heritage-First Implementation Brief

Date: 2026-03-08  
Status: Locked for MVP implementation

## Purpose

Build a new site that keeps the operational content of the current site while intentionally restoring the tone, spirit, and storytelling style of the historic site.

This is not a visual or structural clone of the current site.

## Locked decisions

1. Production domain remains `http://www.cooksbytheocean.com/`.
2. Do not publish a phone number.
3. Use the cabin name `Sandy Scot`.
4. Use bathroom wording from the current site: `half bath`.
5. Do not add policy detail that does not exist on the current site.
6. Use current site content as factual source of truth.
7. Use historic site copy and framing where it matches current facts.

## Content source precedence

1. Current site for facts:
   - contact method
   - active cabins
   - cabin grouping
   - rental cadence
   - amenity claims
2. Historic site for voice:
   - place-forward phrasing
   - family/history context
   - cottage character language
3. Conflict rule:
   - factual conflicts resolve to current site
   - stylistic conflicts resolve to historic tone

## MVP page set (content-constrained)

1. Home
2. Cottages index
3. Cottage detail pages (14)
4. Photos (modern)
5. Legacy Gallery (archive categories)
6. About / History
7. Location / Directions
8. Contact / Request Dates

`Policies` page is excluded from MVP because current site does not provide policy details.

## Current-site facts to preserve

1. 14 cottages are available.
2. Weekly rentals, Saturday to Saturday.
3. Contact email: `cooksbytheocean@gmail.com`.
4. Mailing address: `PO Box 237, South Wellfleet, MA 02663`.
5. Shared amenity claim: full kitchen, half bath, outdoor shower, WiFi, Rinnai propane heater.
6. Cottage groups:
   - Large
   - Medium
   - Small (studio)

## Cabin manifest (MVP content model)

`bathrooms` uses literal wording `half bath` for all cottages.

| slug | title | category | sleeps | bedrooms | bathrooms | notes |
|---|---|---|---:|---:|---|---|
| `big-guilda` | Big Guilda | large | 5 | 2 | half bath | fireplace, outdoor shower, private setting |
| `marconi` | Marconi | large | 7 | 2 | half bath | tower bedroom mention, fireplace |
| `pretty-home` | Pretty Home | large | 5 | 2 | half bath | fireplace |
| `cones` | Cones | large | 6 | 2 | half bath | fireplace, farther walk, privacy |
| `oversea` | Oversea | medium | 4 | 1 | half bath | near main house, deck views |
| `sandy-scot` | Sandy Scot | medium | 5 | 1 | half bath | full + twin in bedroom |
| `summer-salt` | Summer Salt | medium | 4 | 1 | half bath | center camps location |
| `dunes` | Dunes | medium | 4 | 1 | half bath | private path to dune edge |
| `pines` | Pines | medium | 4 | 1 | half bath | private, pine forest setting |
| `sands` | Sands | small | 2 | 0 | half bath | studio, strongest beach proximity copy |
| `new-cabin` | New Cabin | small | 2 | 0 | half bath | studio |
| `little-guilda` | Little Guilda | small | 2 | 0 | half bath | studio-style, strong historic lineage |
| `camera` | Camera | small | 2 | 0 | half bath | studio, shortest beach walk |
| `the-captain` | The Captain | small | 2 | 0 | half bath | studio |

Notes:

1. `Marconi` historic copy mentions three bedrooms; current copy says two separate bedrooms including tower. Use current value `2`.
2. Small category pages are treated as studio cottages in current site framing.

## Heritage copy use rules

1. Keep current factual sentence fragments intact when they contain hard facts (sleeps, bedrooms, cadence, contact).
2. Pull in historic lines that add place/history feeling but do not alter facts.
3. Avoid inventing policy, pricing, or availability claims.
4. Keep first-person/family-run warmth; avoid corporate hospitality phrasing.

## Archive taxonomy for redesigned site

Use categories that preserve current familiarity while honoring historic organization:

1. `beach`
2. `camps`
3. `sky-wildlife`
4. `historic`
5. `misc` (fallback, hidden from nav by default)

Mapping guidance:

1. Current `gallery_beach` -> `beach`
2. Current `gallery_camps` -> `camps`
3. Current `gallery_aerial` + `gallery_wild` -> `sky-wildlife`
4. Current `gallery_historic` -> `historic`
5. Historic `Beach` -> `beach`
6. Historic `Camps` + `Map of Cooks` -> `camps`
7. Historic `Arial View` + `Dawn & Dusk` -> `sky-wildlife`
8. Historic `Interiors` + `Winter` -> `historic` (or `misc` if needed)

## Photo migration plan (from docs/current_photos)

Source of truth for current cabin photos:

- `docs/current_photos/{Cabin Name}/IMG_*.jpeg`

Target layout in project:

- `public/images/cottages/{slug}/hero.jpg`
- `public/images/cottages/{slug}/gallery-01.jpg` ... `gallery-n.jpg`

Sizing targets:

1. Hero exports around 1600px wide.
2. Gallery exports around 1200px wide.
3. Keep originals untouched; web exports are separate files.

Selection targets:

1. 1 hero per cabin.
2. 8-15 gallery photos where available.
3. Include all photos for cabins with fewer than 8 current images.

## Contact model for MVP

1. Contact page includes email and mailing address.
2. Request Dates form is required.
3. No phone field display requirement on page body.
4. Form validation: required fields + email format + basic anti-spam.
5. Anti-spam baseline: honeypot + server-side rate limiting (or provider-level spam controls).

## Out of scope for MVP

1. Phone-based call CTA.
2. Expanded policy/legal pages with new content.
3. Pricing tables.
4. Booking engine.
5. New business claims not present on current site.

## Pre-build acceptance checklist

1. Every page section labeled as either `current fact` or `historic voice`.
2. All 14 cabins have manifest entries and mapped photo folders.
3. Gallery taxonomy and route slugs are fixed.
4. Contact content matches current site details exactly (email + PO box).
5. No uncited policy text appears in MVP content.
