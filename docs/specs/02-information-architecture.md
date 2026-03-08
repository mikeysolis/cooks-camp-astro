# Information Architecture

## Primary user tasks

1. Browse cottages and narrow down by size/vibe
2. View a cottage page to confirm sleeps / bed / bath + see photos
3. Understand how rentals work (weekly rhythm, season, policies)
4. Contact / request dates easily

## Sitemap

- Home (`/`)
- Cottages index (`/cottages`)
  - Filters: Large / Medium / Small (UI filters; may map to URLs later)
- Cottage detail (`/cottages/{slug}`)
- Photos (modern) (`/photos`) *(optional MVP — can be added early for trust)*
- Legacy Gallery (`/legacy`)
  - Category pages (`/legacy/{category}`) — **categories only**
- About / History (`/about`)
- Location / Directions (`/location`)
- Policies / FAQs (`/policies`)
- Contact / Request Dates (`/contact`)

## Navigation strategy

### Desktop
- “Sidebar-style” nav (legacy nod): nav column + main content panel.
- Current page clearly highlighted.

### Mobile
- Simple top nav (hamburger or compact list).
- Optional sticky CTA on cottage pages (Call / Request Dates).

## Content hierarchy

The site should always prioritize:

1) Cottages (browsing + details)  
2) Request dates / contact  
3) Photos (modern and legacy)  
4) History and context
