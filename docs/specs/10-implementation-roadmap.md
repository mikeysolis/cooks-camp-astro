# Implementation Roadmap

This roadmap is staged to ship a usable, respectful MVP early, then layer in features without refactoring.

## Stage 0 — Foundation

### Goals
- Astro + Tailwind working
- Global layout + navigation implemented (including Legacy Gallery nav item)
- Content collections configured

### Tasks
- Set up Astro project with Tailwind and typography plugin
- Create base layout component (Head/meta hooks, header/nav, footer)
- Implement navigation patterns:
  - desktop “sidebar-style”
  - mobile compact menu
- Configure content collections for `pages` and `cottages`
- Add placeholder pages/routes for the full sitemap

### Done when
- Local dev + Vercel preview build succeed
- Navigation works on mobile/desktop
- At least one sample cottage renders from Markdown

---

## Stage 1 — Core content pages + cottages (MVP spine)

### Goals
- Full cottages browsing experience
- Basic informational pages live

### Tasks
- Cottages index (`/cottages`) from content collection
- Cottage detail (`/cottages/{slug}`) from content collection
- Build core components: Hero, CottageCard, AmenitiesList, Gallery, CTA block
- Implement base pages: About, Location, Policies, Contact

### Done when
- Site is usable for: browse → view details → contact/request
- Cottages pages work even if some cottages have fewer photos/amenities listed
- Cottage pages do not depend on legacy data

---

## Stage 2 — Photo handling (modern photos)

### Goals
- Handle interior photos now; allow easy exterior addition later

### Tasks
- Ensure hero + gallery image flows are consistent and performant
- Optional: implement `/photos` modern gallery landing/category pages
- Confirm image sizes/compression workflow

### Done when
- Images are fast and stable (no severe layout shift)
- Adding photos doesn’t require template changes

---

## Stage 3 — Legacy Gallery (permanent nav feature)

### Goals
- `/legacy` and `/legacy/{category}` routes implemented
- Categories-only browsing
- Easy to add photos later by dropping files into folders

### Tasks
- Create `legacyCategories` config (slugs, titles, descriptions, folder paths)
- Implement pages:
  - landing page lists categories
  - category page renders image grid from folder
- Implement empty states (no photos yet) gracefully

### Done when
- Works with empty folders
- Works with many photos (pagination optional; performance acceptable)
- No “All” page exists

---

## Stage 4 — Contact / Request dates

### Goals
- Clear contact options
- Optional simple “request dates” form

### Tasks
- Contact page: phone/email, optional Formspree form
- CTA blocks on home and cottage pages

### Done when
- Form tested end-to-end
- CTA visible and clear on mobile

---

## Stage 5 — SEO + performance

### Goals
- Fast, indexable site
- Good metadata and social previews

Reference:
- `docs/specs/12-seo-implementation-checklist.md`

### Tasks
- sitemap + robots
- per-page titles/descriptions from frontmatter
- image optimization improvements (as needed)
- optional JSON-LD for cottages

### Done when
- Lighthouse targets met (aim 90+)
- Unique metadata per page

---

## Stage 6 — Redirects + launch hardening

### Goals
- Preserve key legacy URLs
- Avoid broken bookmarks

### Tasks
- Implement Vercel redirects for top legacy URLs
- Add helpful 404 page
- Final QA pass

### Done when
- Redirects validated (no loops)
- Contact flows tested
- Stakeholder signoff on tone + visuals
