# Cottage Page Template Spec

This spec defines the cottage detail page structure and behavior so implementation is consistent and resilient.

## Goals

- Preserve “heritage brochure” tone: calm, simple, readable.
- Make the page useful even if optional content is missing.
- Make contacting / requesting dates easy.
- Keep legacy photos as an optional nostalgic accent.

## Route

- `/cottages/{slug}` rendered from the `cottages` content collection entry.

## Inputs (content fields)

Required frontmatter:
- `title`
- `description`
- `sleeps`
- `bedrooms`
- `bathrooms`
- `category` (large/medium/small)
- `amenities[]`
- `hero`
- `photos[]` (can be empty but field should exist for consistency)
- `featured`

Optional frontmatter:
- `legacyHighlights[]` (0–6)

Body:
- 1–2 paragraphs of narrative description

## Page structure (recommended section order)

1) Hero
2) Quick Facts
3) Description
4) Amenities
5) Modern Photo Gallery
6) Request Dates / Contact CTA
7) Optional: From the Archive
8) Optional: Related links (Policies, Location, Legacy Gallery)

### 1) Hero

Content:
- Hero image
- Cottage title
- One-line short description (from frontmatter `description`)

Behavior:
- Hero image should load quickly and set the tone.
- Provide a safe default alt if none is given (MVP).

### 2) Quick Facts

Always show:
- Sleeps
- Bedrooms
- Bathrooms
- Category (Large/Medium/Small) as a small label (optional but helpful)

Layout:
- Use a simple bordered panel (“facts card”) that works on mobile.

### 3) Description

- Render the Markdown body.
- Keep typography readable (use prose styles).
- Allow optional pull-quote styling for signature legacy lines if desired.

### 4) Amenities

- Render amenities as a clean list (2-column on desktop, 1-column on mobile).
- Keep phrasing consistent across cottages (owner-editing friendly).

Fallback:
- If amenities list is empty, hide the section entirely (or show a small “Amenities vary by cottage.”).

### 5) Modern Photo Gallery

- Render from `photos[]`
- Default: responsive grid of thumbnails.
- Thumbnails link to full-size image (MVP).
- Optional later: lightbox.

Fallback:
- If `photos[]` is empty:
  - show a small “Photos coming soon” message OR hide the section.
  - hero remains the primary image.

### 6) Request Dates / Contact CTA

Intent:
- Convert interest into contact without a “booking engine” feel.

Required elements:
- Primary button: Request Dates (scroll to contact form or link to Contact)
- Secondary: Call
- Secondary: Email

Microcopy:
- Preserve the human tone (e.g., friendly hours note if desired).
- Be explicit about weekly rhythm if relevant (Saturday–Saturday) on this block or nearby.

Mobile behavior:
- Optionally show a sticky CTA bar with Call + Request Dates when the user scrolls.

### 7) From the Archive (Optional)

Rules:
- Render only if `legacyHighlights` exists and has items.
- Keep it small: 1–6 images.
- Visually distinct from modern gallery:
  - label “From the Archive”
  - subtle border/frame treatment
- Optional: link to the relevant Legacy Gallery category.

Fallback:
- If no legacy highlights exist, do nothing (no empty container).

### 8) Related links (Optional)

Provide quick links:
- Policies (pets, check-in/out, parking)
- Location/Directions
- Legacy Gallery

This helps users answer common questions without forcing them to hunt the nav.

## Component responsibilities

Recommended components:
- `Hero`
- `FactsPanel`
- `AmenitiesList`
- `Gallery`
- `CottageCTA`
- `ArchiveStrip` (optional)

Keep components small and readable; prioritize clarity over abstraction.

## Acceptance criteria

- Page renders correctly with:
  - only required fields (no photos, no legacy highlights)
  - photos present but legacy highlights missing
  - legacy highlights present but photos minimal
- Layout is readable on mobile.
- CTA is obvious without scrolling excessively.
- No JS is required for basic page use.
