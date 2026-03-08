# Content Model

This model aims for:

- simple authoring in Markdown
- consistent templates
- minimal required fields for MVP
- room to grow (pricing, captions, structured data) later

## Cottages

Stored as Markdown in a `cottages` content collection.

### Required frontmatter fields
- `title` (string)
- `description` (string) — short teaser for cards/meta
- `sleeps` (number)
- `bedrooms` (number)
- `bathrooms` (number|string) — allow “1.5”
- `category` ("large" | "medium" | "small")
- `amenities` (string[]) — short list
- `hero` (string) — path to hero image
- `photos` (string[]) — modern gallery images (0+)
- `featured` (boolean)

### Optional frontmatter fields
- `order` (number) — for manual sorting
- `priceFrom` (number) — optional, not required for MVP
- `legacyHighlights` (string[]) — 0–6 legacy image paths; optional “nostalgia flavor”

### Body
A short narrative paragraph (or a few) describing the vibe, setting, and uniqueness.

## Pages

Stored as Markdown/MDX in a `pages` content collection.

### Recommended frontmatter
- `title` (string)
- `description` (string) — meta description

### Body
Markdown content with headings. Keep paragraphs short and readable.

## Legacy gallery

MVP is folder-driven (no per-photo Markdown required).

Later upgrade options:
- captions JSON per category
- or a `legacy` content collection for captions/dateApprox/credit
