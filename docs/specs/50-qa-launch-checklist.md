# QA + Launch Checklist

## Content completeness
- Home page has final copy and at least one strong hero photo.
- Each cottage has:
  - title, sleeps, bedrooms, bathrooms
  - hero image
  - description body (even if short)
  - amenities list
- Policies are accurate (confirm details with owner).
- Contact page has correct phone/email and clear instructions.

## UX and navigation
- Desktop nav works and highlights the current page.
- Mobile menu opens/closes reliably; no scrolling traps.
- CTA blocks (Call / Request Dates) are obvious and clickable.
- Links are visually recognizable and accessible.

## Photos and performance
- Images are reasonably sized and compressed.
- Galleries lazy-load below-the-fold images.
- No severe layout shift when images load.
- Pages load fast on mobile networks.

## Accessibility
- Keyboard navigation works throughout.
- Focus states visible on links/buttons/menus.
- Headings are in correct order (H1 then H2 etc.).
- Images have alt text strategy (even if generic for MVP).

## SEO and sharing
- Unique title/description per page.
- Sitemap present (if implemented).
- robots.txt present.
- Social previews acceptable (Open Graph/Twitter tags if implemented).

## Redirects and errors
- Key legacy URLs redirect properly.
- 404 page exists and links to key routes.
- No console errors in production build.

## Smoke test (end-to-end)
- Browse cottages → open a cottage → click photos → contact/request.
- Submit contact form (if enabled) and confirm delivery.
