# Cottage Page Template Implementation Spec

## Purpose

This document defines the implementation contract for each cottage detail page. The cottage page is the functional spine of the site: if this template works well, the rest of the site will feel coherent.

The page must support the project’s two core goals at the same time:

1. Preserve the warm, old-school, family-run feeling of the legacy site
2. Present cottage information in a clean, modern, mobile-friendly way

This spec is written so Codex Agent can implement the page with minimal ambiguity.

---

## Page goals

Each cottage page should help a visitor do four things quickly:

1. Understand what the cottage is like
2. Confirm the practical basics (sleeps, beds, baths)
3. See enough photos to imagine staying there
4. Contact the owners to request dates

The page should feel complete even when optional enhancements are missing.

---

## Route and data source

### Route
- `/cottages/{slug}`

### Primary source
- `src/content/cottages/{slug}.md`

### Rendering model
- Static page generated from Astro content collection data
- No runtime data fetching required for the basic page

---

## Data contract

### Required frontmatter
- `title`
- `description`
- `sleeps`
- `bedrooms`
- `bathrooms`
- `category` (`large | medium | small`)
- `amenities`
- `hero`
- `photos`
- `featured`

### Optional frontmatter
- `order`
- `legacyHighlights`

### Markdown body
- Narrative description of the cottage
- Recommended length: 1–3 short paragraphs
- Tone: descriptive, simple, warm, not sales-heavy

---

## Page rendering rules

### Non-negotiable rule
The page must still function if optional content is missing.

That means:
- No legacy images required
- No captions required
- No lightbox required
- No modern gallery required beyond the hero image

### Fallback priority
If content is incomplete, preserve clarity in this order:

1. Title
2. Hero image
3. Practical facts
4. Description
5. Amenities
6. CTA
7. Gallery extras
8. Legacy nostalgia extras

---

## Recommended section order

1. Hero
2. Quick Facts
3. Description
4. Amenities
5. Modern Gallery
6. Request Dates / Contact CTA
7. Optional From the Archive strip
8. Optional supporting links

This order is important. It should not be rearranged casually.

---

## Section-by-section implementation

## 1) Hero

### Purpose
Establish the mood immediately and anchor the page.

### Contents
- Hero image
- Cottage title
- Short supporting line using `description`

### Behavior
- Hero image should appear above the fold on desktop
- Title must be visually prominent
- Description should be short enough to remain readable under the title

### Technical guidance
- Use the frontmatter `hero` image path
- Provide width/height or predictable layout sizing to avoid layout shift
- If no custom alt text system exists yet, use a safe generated alt:
  - `"Exterior or interior view of {title}"`

### Fallback
If hero image is missing:
- Render a neutral placeholder block with the title and description
- Do not let the page crash
- Log or surface the missing asset in development

---

## 2) Quick Facts

### Purpose
Provide scan-friendly decision-making information.

### Required fields shown
- Sleeps
- Bedrooms
- Bathrooms

### Optional field shown
- Category: Large / Medium / Small

### Layout
- Use a compact fact panel or horizontal stat row
- Must work well on mobile without becoming cramped
- Avoid decorative icon overload; labels should be clear even without icons

### Example structure
- Sleeps: 6
- Bedrooms: 3
- Bathrooms: 1.5
- Category: Large Cottage

### Fallback
If any single value is missing:
- Render the rest of the facts
- Do not hide the whole block unless nearly all data is missing

---

## 3) Description

### Purpose
Convey character, atmosphere, and context.

### Source
- Markdown body of the cottage file

### Presentation rules
- Use readable typography with comfortable line height
- Keep paragraphs short and editorial
- Preserve the owner’s voice; do not over-polish into marketing copy

### Optional enhancement
If the copy includes a particularly strong phrase, it may be styled as a pull-quote, but this is not required for MVP

### Fallback
If the body is empty:
- Render the frontmatter `description` as a short paragraph
- Avoid leaving a blank content area

---

## 4) Amenities

### Purpose
Reassure guests about practical features without overwhelming them.

### Source
- `amenities[]`

### Layout
- Simple list or two-column list on desktop
- Single column on mobile
- Avoid pill/badge-heavy styling; keep it understated

### Content style
- Keep amenity names normalized and plainspoken
- Prefer stable naming:
  - `Ocean view`
  - `Screened porch`
  - `Pet friendly`
  - `Outdoor shower`

### Fallback
If amenities array is empty:
- Hide the section entirely
- Do not insert filler copy unless the owner requests it

---

## 5) Modern Photo Gallery

### Purpose
Show the current state of the cottage, especially with high-quality interior photography.

### Source
- `photos[]`

### MVP behavior
- Responsive thumbnail grid
- Each image opens the full-size image in a new tab or direct file view
- No lightbox required for launch

### Enhanced behavior (optional)
- Progressive enhancement lightbox
- Keyboard navigable
- Escape key closes
- Focus returns to triggering image

### Gallery rules
- Hero image should not have to repeat in the gallery unless intentionally included
- Gallery may contain interior photos now and be expanded later with exterior photos
- Keep spacing consistent with the rest of the site

### Fallback
If `photos[]` is empty:
- Either hide the gallery section
- Or show a small message such as “More photos coming soon”
- The hero image still carries the page visually

---

## 6) Request Dates / Contact CTA

### Purpose
Turn interest into a simple next step without introducing a booking-engine feel.

### Required CTA elements
- Primary: Request Dates
- Secondary: Call
- Secondary: Email

### Behavior options
The Request Dates action can:
- Link to the Contact page
- Scroll to a contact form on the same page
- Open a simple inquiry route if that exists later

### Messaging guidance
This block should reinforce the tone of the site:
- simple
- personal
- trustworthy

Optional supporting microcopy:
- Weekly rentals
- Seasonal availability
- Friendly contact preference notes

### Desktop layout
- CTA should appear naturally after the gallery or description flow
- It should not feel like a hard sales banner

### Mobile layout
- CTA block must remain easy to reach
- Optional sticky bottom CTA bar on cottage pages only

### Sticky CTA rules if implemented
- Mobile only
- Only on cottage detail pages
- Show two actions max:
  - Request Dates
  - Call
- Must not obscure important content or overlap the footer

---

## 7) From the Archive (Optional)

### Purpose
Add nostalgia and continuity without being required for the page to function.

### Source
- `legacyHighlights[]`

### Rendering rule
Only render this section if `legacyHighlights` contains one or more items.

### Content limits
- Recommended: 1–3 images
- Maximum: 6 images

### Presentation
- Section label: `From the Archive`
- Visually distinct from the modern gallery
- Smaller and quieter than the modern gallery
- Optional link to the main Legacy Gallery or relevant legacy category

### Important rule
Legacy highlights must not be mixed into the main modern gallery.

### Fallback
If no legacy highlights exist:
- Render nothing
- No empty heading
- No placeholder container

---

## 8) Optional supporting links

### Purpose
Help visitors answer adjacent questions without hunting through the nav.

### Suggested links
- Policies
- Location / Directions
- Legacy Gallery

### Placement
- Bottom of page
- Subtle and secondary

---

## Layout behavior by breakpoint

## Mobile
- Single-column layout
- Title and hero near top
- Facts stack cleanly
- Amenities single-column
- Gallery thumbnails large enough to tap comfortably
- CTA easy to reach without excessive scrolling

## Tablet
- Single-column or lightly split layout depending on available space
- Facts may sit beside description if it remains readable

## Desktop
- Main content remains restrained in width
- Facts panel may sit beside or directly beneath the hero block
- Gallery can use more columns, but avoid making thumbnails too small

---

## Component breakdown

Recommended components:
- `CottageHero`
- `CottageFacts`
- `CottageDescription`
- `AmenitiesList`
- `Gallery`
- `CottageCTA`
- `ArchiveStrip`
- `RelatedLinks`

Component rules:
- Components should remain readable and small
- Avoid over-abstraction
- Prefer clear props over deeply nested configuration

---

## Accessibility requirements

- All interactive elements must be keyboard accessible
- Hero and gallery images need alt text or safe default alt behavior
- CTA buttons/links require clear labels
- If a lightbox exists, it must:
  - trap focus
  - support Escape to close
  - restore focus after close
- Section headings should follow semantic order
- Avoid placing important text inside images

---

## SEO requirements

At minimum:
- Page `<title>` derived from cottage title
- Meta description derived from frontmatter description
- Open Graph image should use hero image if possible

Optional enhancement:
- Add `VacationRental` JSON-LD per cottage page

---

## Performance requirements

- Hero image should be optimized and sized appropriately
- Non-hero gallery images should be lazy loaded
- Avoid heavy client-side JavaScript
- Page must remain usable before any JS enhancement runs

---

## Empty state and error handling rules

### Missing hero
- Do not crash the page
- Render a visual placeholder and log warning in development

### Missing photos
- Hide gallery or show brief “coming soon” message

### Missing amenities
- Hide section

### Missing body content
- Use frontmatter description as fallback body

### Missing legacy highlights
- Hide archive section

### Broken image paths
- Page should still render text content and CTA
- Development environment should surface the problem clearly

---

## Acceptance checklist

A cottage page implementation is complete when:

- It renders correctly from Markdown content
- It works with only the required fields
- It looks complete with no legacy content attached
- It looks better, not more cluttered, when legacy highlights are present
- The CTA is obvious on mobile and desktop
- The page remains readable and calm, not crowded or app-like
- It performs well with multiple images
- It matches the “heritage brochure with modern scaffolding” direction

---

## Future-safe enhancement ideas

These are allowed later but should not shape the MVP architecture:
- Then-and-now photo pairs
- Photo captions per image
- Availability messaging
- Small seasonal notes
- Nearby attractions block
- More structured cottage comparison links

The MVP should not depend on any of these.
