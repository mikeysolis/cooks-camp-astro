# Navigation and Layout Architecture Spec

## Purpose

This document defines the global layout system and navigation behavior for the site. The goal is to preserve the legacy site’s simple, old-school spirit while making the experience clean, responsive, and easy to maintain.

This is not just a visual document. It is an implementation guide for the page shell, navigation behavior, and reusable layout patterns.

---

## Core architectural goals

1. Keep the site feeling familiar and straightforward
2. Make navigation obvious on every screen size
3. Support content-heavy pages without visual clutter
4. Preserve a heritage feel without reproducing outdated usability problems
5. Keep the implementation stable, simple, and static-first

---

## Global experience principles

### 1) Navigation should feel dependable
The site should not feel clever or experimental. A guest should always understand:
- where they are
- what pages exist
- how to get back to cottages or contact

### 2) Layout should feel calm
The content should breathe. Avoid dense dashboard-style layouts, oversized card grids, or app-like controls.

### 3) The legacy influence should come from structure and tone
The “old-school” quality should come from:
- clear page hierarchy
- simple navigation
- typography
- restrained styling
not from outdated usability patterns.

---

## Final primary navigation

This order is the default recommendation:

1. Home
2. Cottages
3. Photos
4. Legacy Gallery
5. About / History
6. Location / Directions
7. Policies
8. Contact / Request Dates

### Notes
- `Legacy Gallery` is permanent in the main nav
- Legacy Gallery is categories-only; no `All Photos` view
- `Photos` may remain lightweight if cottage pages carry most modern photography
- `Contact / Request Dates` should be visually easy to find

---

## Global shell architecture

## Recommended shell structure

- Outer site wrapper
- Header / navigation region
- Main content region
- Footer region

### Desktop structure
- Left navigation column
- Right content column
- Footer below full page content

### Mobile structure
- Compact top header
- Toggleable nav panel or drawer
- Main content stacked below
- Footer at bottom

---

## Desktop layout model

### Intent
Desktop should gently echo the legacy site by using a left-side navigation column.

### Recommended behavior
- Persistent left column navigation
- Content column to the right
- Nav remains visually stable across pages
- Current page clearly highlighted

### Width behavior
- The overall page should have a comfortable max width
- The nav column should be narrow enough to feel intentional, not dominant
- The content column should remain readable for long-form text

### Sticky behavior
Optional:
- Desktop nav may be sticky within the viewport if it remains simple and does not cause overlap issues
- If implemented, test thoroughly on shorter viewports

### Avoid
- Mega menus
- Hover-only interactions
- Dense multilevel nav trees

---

## Mobile layout model

### Intent
On mobile, the site must prioritize clarity and tap comfort over strict visual similarity to the legacy site.

### Required behavior
- Show a top header with brand/site name and a menu toggle
- Menu opens in a predictable, accessible way
- Navigation items appear in the same order as desktop

### Menu implementation options
Preferred:
- Slide-down or drawer menu with large tap targets
- Clear close affordance
- No fragile animation dependency

### Accessibility rules
- Menu toggle must announce expanded/collapsed state
- Keyboard and screen-reader behavior must be correct
- Focus should move sensibly when the menu opens and closes

### Avoid
- Tiny tap targets
- Nested accordions unless truly necessary
- Hidden important pages

---

## Active states and wayfinding

### Required
- Current page link must be visually distinct
- Active link treatment should work in both desktop and mobile nav
- Links should be readable without hover

### Optional
- Small breadcrumb on deeper pages such as cottage detail pages
- Not required for MVP

### Rule
Wayfinding should be solved primarily by:
- nav order
- page titles
- consistent layout
not by UI complexity

---

## Header behavior

## Desktop
- The left nav column effectively serves as the main header/navigation area
- A compact site title or mark may appear at the top of the nav column
- Avoid oversized mastheads that push content too far down

## Mobile
- Top header includes:
  - site title or compact logo treatment
  - menu toggle
- Header should remain lightweight
- Optional sticky mobile header is acceptable if it does not crowd the viewport

---

## Footer behavior

The footer should be simple and useful.

Recommended contents:
- Contact basics
- Possibly season or location reminder
- Small legacy/historical acknowledgment if desired
- Copyright

Avoid turning the footer into a second complicated sitemap.

---

## Page container and spacing system

## General spacing intent
The layout should feel spacious and readable, not sparse or sterile.

### Rules
- Use consistent vertical rhythm between sections
- Keep paragraph width comfortable
- Preserve generous padding around major sections
- Use subtle separators when needed, not heavy borders everywhere

### Page widths
Different page types may have slightly different optimal content widths:
- long-form pages: narrower readable text width
- gallery pages: wider grid allowance
- cottage detail pages: balanced text + gallery width

This can be achieved with reusable layout utilities rather than bespoke page CSS.

---

## Page-type layout patterns

## 1) Home page
Purpose:
- Introduce the place and its tone
- Direct users into cottages and contact

Suggested layout:
- Hero
- Short intro
- Featured cottages or browse-by-size entry points
- How it works / rental rhythm
- Archive teaser
- CTA

## 2) Cottages index
Purpose:
- Help visitors browse efficiently

Suggested layout:
- Clear page title
- Optional intro paragraph
- Filter or grouped sections for Large / Medium / Small
- Uniform card grid

## 3) Cottage detail
Purpose:
- Deepen interest and convert to inquiry

Suggested layout:
- Use the dedicated Cottage Page Template Spec
- Optional mobile sticky CTA only on this page type

## 4) Legacy Gallery landing
Purpose:
- Introduce archive respectfully and route users by category

Suggested layout:
- Intro paragraph
- Category tiles or list
- No “All photos” route

## 5) Legacy category page
Purpose:
- Let users browse archival images without clutter

Suggested layout:
- Category title
- Short intro
- Image grid
- Optional back link to Legacy Gallery landing

## 6) Text pages (About, Location, Policies, Contact)
Purpose:
- Support information tasks cleanly

Suggested layout:
- Strong page title
- Readable prose width
- Minimal visual interruption
- CTA where relevant

---

## Sidebar navigation architecture

### Recommended contents
- Site title / brand
- Primary nav list
- Optional small contact callout
- Optional seasonal or “request dates” reminder

### What to avoid in sidebar
- Dense social icon groups
- Multiple competing CTA buttons
- Too many secondary links
- Decorative clutter

### Visual behavior
- The sidebar should feel like a reliable anchor
- It should not visually overpower the main content
- The nav list should be simple enough that the user always knows where to click next

---

## CTA architecture

CTAs should be globally consistent but selectively prominent.

### Site-wide CTA behavior
- Contact / Request Dates is always available in navigation
- Secondary CTA blocks can appear on Home and cottage pages

### Cottage page CTA behavior
- More prominent than on other pages
- Optional mobile sticky CTA allowed only here

### Avoid
- Multiple competing primary buttons in the same region
- Booking-engine language unless the business model changes

---

## Layout components

Recommended reusable components:
- `SiteShell`
- `SidebarNav`
- `MobileNav`
- `PageContainer`
- `PageHeader`
- `Section`
- `Footer`
- `CTABar` (mobile, cottage-only)
- `CategoryGrid`
- `ContentProse`

### Component design rule
Each component should solve one layout problem clearly.
Avoid giant “do everything” components.

---

## Responsive behavior guidelines

### Breakpoint intent
Exact breakpoint values can follow the project’s Tailwind defaults, but behavior should be guided by usability:

#### Small screens
- Single column
- Large tap targets
- Stacked content
- No side-by-side dense layouts

#### Medium screens
- Transitional spacing
- Some two-column elements allowed where helpful
- Preserve readability first

#### Large screens
- Sidebar + content layout
- Wider galleries
- Comfortable whitespace

### Rule
Do not preserve the desktop sidebar behavior so rigidly that mobile usability suffers.

---

## Accessibility requirements

- Navigation must be fully keyboard accessible
- Mobile menu toggle needs clear state announcement
- Focus styles visible on all nav items
- Current page indication must not rely on color alone
- Skip link to main content is recommended
- Menus must be usable without hover

---

## Performance and implementation rules

- Navigation should require little or no JavaScript beyond the mobile toggle
- Avoid rendering large hidden DOM trees for menus
- Use static routes and predictable structures wherever possible
- Prefer CSS layout patterns over JS layout logic

---

## Error and edge-case handling

### Very long page titles
- Wrap cleanly
- Do not overflow nav or header regions

### Empty photo sections on gallery pages
- Show “More coming soon” states
- Do not collapse layout awkwardly

### Narrow landscape mobile screens
- Test mobile header and CTA bar carefully
- Avoid overlapping controls

### Footer overlap
- Sticky mobile CTA must not cover footer content without spacing compensation

---

## Acceptance checklist

The navigation and layout architecture is complete when:

- Desktop layout consistently uses a left-nav / right-content pattern
- Mobile navigation is straightforward and accessible
- Legacy Gallery is permanently visible in the primary navigation
- Contact / Request Dates is easy to find everywhere
- The layout feels calm and readable across page types
- The shell supports text pages, gallery pages, and cottage pages without custom hacks
- The site feels old-school in spirit, but modern in usability

---

## Future-safe enhancements

These can be added later without changing the architecture:
- Breadcrumbs on deep pages
- Small seasonal notice in sidebar or header
- Then-and-now promo link from Legacy Gallery
- Compact footer archive note
- Stronger page-to-page cross-linking between cottages

The base navigation and layout should not depend on any of them.
