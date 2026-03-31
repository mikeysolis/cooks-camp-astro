# Changelog

All notable changes to this project will be documented in this file.

## 0.0.1

### Added

- Astro application scaffold at the repository root
- Tailwind setup and a heritage-first site shell with desktop sidebar and mobile navigation
- Content collections for page content and all 14 cottages
- Core site pages for home, cottages, photos, legacy gallery, about, location, and contact
- A repeatable cottage photo export pipeline using the raw files in `docs/current_photos`
- Optimized cottage hero and gallery images in `public/images/cottages`
- A server-backed contact form for Vercel deployment using Resend
- Validation, honeypot filtering, signed form timing checks, and lightweight per-IP rate limiting
- A repeatable legacy archive export pipeline based on the archived gallery pages in the legacy site copy
- Categorized legacy archive galleries for beach, camps, sky-wildlife, and historic imagery
- PhotoSwipe lightbox galleries for cottage photos and legacy archive pages

### Changed

- Replaced placeholder page content with heritage-first copy that follows the current-site facts / historic-site tone rule
- Grouped cottages by size on the index and expanded cottage detail pages with amenities and related navigation
- Wired modern cottage photography into the home page, cottages index, cottage detail pages, and photos page
- Upgraded generated image manifests to include the dimensions required by PhotoSwipe
- Restored archive lightbox captions while removing low-value numbered captions from cottage slides
- Updated cottage detail pages so they point to the working request form
- Corrected the photos page copy to reflect the current live gallery state

### Fixed

- Replaced the original `sips` export path with `sharp` after discovering `sips` was producing black images from the current photo set
- Made the PhotoSwipe initializer idempotent and switched caption rendering to a text-safe DOM path
