# Tech Decisions

## Stack

- Framework: Astro (static-first)
- Styling: Tailwind CSS + @tailwindcss/typography
- Content: Markdown via Astro Content Collections
- Hosting: Vercel
- Forms: Formspree (or comparable static form provider)

## Reasons

- Static output is fast and “old web” friendly
- Markdown is maintainable for non-developers
- Astro’s component model keeps templates clean
- Tailwind + typography reduces design burden

## Implementation principles

- Minimal JS by default
- Accessibility: semantic HTML, good focus states, adequate contrast
- Performance: optimize and lazy-load images; keep pages lightweight
- SEO: per-page metadata, sitemap, robots.txt
- Maintainability: small components, clear content schemas

## Optional later improvements

- JSON-LD “VacationRental” per cottage
- Captions + dates for legacy gallery via content collection
- Then & Now pairs after exterior photo shoot
