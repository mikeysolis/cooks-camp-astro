# Feature Specs

This document defines feature behavior and acceptance criteria.

## Global Layout + Navigation

### Intent
A calm, dependable site structure that nods to the legacy sidebar-nav vibe.

### Requirements
- Desktop layout supports “sidebar-style” nav.
- Mobile layout uses a compact top nav.
- Current page indication is obvious.
- Navigation is accessible (keyboard, focus states, ARIA where needed).

### Acceptance criteria
- Tab order is logical.
- Visible focus rings.
- No layout shift when opening mobile menu.

---

## Cottages Index (`/cottages`)

### Content source
Cottages content collection.

### Requirements
- Responsive grid of CottageCard components.
- Filters by category: large / medium / small.
  - Implementation can be:
    - no-JS: separate filter links (query param or route segment)
    - or minimal JS: client-side filter toggle

### Card fields
- hero image
- title
- sleeps, bedrooms, bathrooms
- short description/teaser

### Acceptance criteria
- Renders even if photos array is empty (use hero only).
- Filters are usable on mobile without precision tapping.
- Cards are scannable; text doesn’t overflow.

---

## Cottage Detail (`/cottages/{slug}`)

### Sections (recommended order)
1. Hero
2. Quick Facts (sleeps / beds / baths)
3. Description
4. Amenities
5. Modern Gallery (optional if no photos beyond hero)
6. CTA block (call/email/request dates)
7. Optional “From the Archive” highlights
8. Link to Policies

### Optional legacy highlights
- Render only if `legacyHighlights` exists and has items.
- Keep small: 1–3 typical, max 6.
- Provide a link to the Legacy Gallery category (if known).

### Acceptance criteria
- Page is complete with zero legacy photos.
- CTA is visible without excessive scrolling on mobile.
- Gallery is performant (lazy loading, stable layout).

---

## Gallery Component (modern + legacy)

### Inputs
- list of image paths
- optional caption data (future)
- variant: `modern` | `legacy` (controls labeling and styling)

### Behavior
- Responsive grid
- Clicking an image opens a larger version
  - MVP simplest: open image in new tab
  - Later: add lightbox as progressive enhancement

### Acceptance criteria
- Known dimensions to reduce CLS.
- Images lazy-load (except hero / first row).
- Works without JS.

---

## Legacy Gallery (permanent main menu)

### Routes
- `/legacy` landing page
- `/legacy/{category}` pages
- **No “All” page**

### Categories
Initial:
- beach
- camps
- dusk-dawn
- misc (optional; can be hidden from the landing if desired)

### Acceptance criteria
- Empty category shows friendly empty state.
- Category pages remain usable with large sets (consider pagination later).
- Adding images later does not require code changes.

---

## Contact / Request Dates

### Requirements
- Clear phone/email links
- Optional request form (Formspree)
- Form fields minimal and friendly:
  - name
  - email/phone
  - desired dates
  - message

### Acceptance criteria
- Form can be submitted without JS.
- Success message is clear.
- Accessible labels and error messaging.
