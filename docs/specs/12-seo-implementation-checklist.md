# SEO Implementation Checklist

Date: 2026-04-01  
Status: Implementation complete through section 11; section 12 pending post-launch

## Current status

- Sections 1 through 10 have been implemented in the codebase.
- Section 11 pre-launch QA has been completed against the production build output and the built Vercel deployment artifacts.
- The remaining work in section 12 requires a live deployed site and Google Search Console access.

## Purpose

Provide a concrete SEO checklist for the new Cook's by the Ocean site so implementation stays aligned with:

1. current production facts
2. historic tone and search phrasing where still accurate
3. MVP content constraints in `AGENTS.md`

## Working rules

- Use the current production site for facts.
- Use the historic site for phrasing only when it remains accurate and natural.
- Do not publish a phone number in metadata or schema.
- Do not invent policy, pricing, availability, occupancy, or booking claims.
- Use the cabin name `Sandy Scot`.
- Keep bathroom wording `half bath`.

## 1. Foundation

- [ ] Confirm the final canonical origin for launch and use one origin everywhere.
  - `http://www.cooksbytheocean.com/` is the current production source of truth.
  - If launch uses HTTPS, switch all canonicals, sitemap URLs, and redirects to that single HTTPS origin.
- [ ] Set Astro `site` in `astro.config.mjs`.
- [ ] Add Astro sitemap support.
- [ ] Decide how preview deployments should behave.
  - Preferred: preview and branch deployments should send `noindex, nofollow`.
- [ ] Add a single SEO helper module for URL building, title templating, and fallbacks.

## 2. Content model

- [ ] Extend `src/content.config.ts` with optional SEO fields for content collections.
- [ ] Add these optional fields to `pages` entries:
  - `seoTitle`
  - `seoDescription`
  - `ogImage`
  - `noindex`
- [ ] Add these optional fields to `cottages` entries:
  - `seoTitle`
  - `seoDescription`
  - `ogImage`
  - `noindex`
- [ ] Keep `title` and `description` as the default fallback so most content remains easy to manage.
- [ ] Use overrides only where search intent and on-page copy should differ.

## 3. Shared head implementation

- [ ] Replace the current minimal head output in `src/layouts/Layout.astro` with a reusable SEO head pattern.
- [ ] Support:
  - canonical URL
  - title template
  - meta description
  - `robots`
  - Open Graph tags
  - Twitter tags
  - default social image
  - optional JSON-LD injection
- [ ] Ensure titles are plain and specific, not decorative.
- [ ] Ensure canonical URLs are generated from the current pathname only, without query strings.
- [ ] Ensure every indexable page emits exactly one canonical tag.
- [ ] Keep defaults lightweight so pages can opt in with minimal props.

## 4. Page metadata checklist

### Home (`/`)

- [ ] Keep the brand in the title.
- [ ] Include search-relevant place terms in the title or description:
  - Wellfleet
  - South Wellfleet
  - Cape Cod
  - beach cottages
- [ ] Keep the homepage description factual:
  - 14 cottages
  - Atlantic location
  - weekly rentals
- [ ] Remove or hide non-search copy from the primary production H1.
  - `Happy Birthday Dad!` should not remain in the main crawl-facing heading.
- [ ] Draft title target:
  - `Cook's by the Ocean | Wellfleet Beach Cottages`
- [ ] Draft description target:
  - `Fourteen beach cottages above the Atlantic in South Wellfleet, Cape Cod, available for weekly rental.`

### Cottages index (`/cottages`)

- [ ] Use a descriptive title, not just `Cottages`.
- [ ] Mention the three cottage sizes in body copy, not necessarily in the title.
- [ ] Draft title target:
  - `Cottages | Cook's by the Ocean, South Wellfleet`
- [ ] Draft description target:
  - `Browse the 14 cottages at Cook's by the Ocean, from large cottages to studio cottages in South Wellfleet.`

### Cottage detail pages (`/cottages/{slug}`)

- [ ] Generate unique titles for all 14 cottages.
- [ ] Include:
  - cottage name
  - cottage type or size cue
  - brand or location
- [ ] Use the frontmatter description as the baseline meta description, then refine where needed.
- [ ] Use the cottage hero image as `og:image` when available.
- [ ] Add schema only from known facts already in content.
- [ ] Draft title pattern:
  - `{Cottage Name} | Cook's by the Ocean`
- [ ] Draft extended title pattern if needed:
  - `{Cottage Name} Cottage in South Wellfleet | Cook's by the Ocean`

### Photos (`/photos`)

- [ ] Make clear that this page contains current photography.
- [ ] Draft title target:
  - `Current Cottage Photos | Cook's by the Ocean`
- [ ] Draft description target:
  - `Current photographs of the cottages and grounds at Cook's by the Ocean in South Wellfleet.`

### Legacy gallery landing (`/legacy`)

- [ ] Make clear that the page contains historic or archive photography.
- [ ] Draft title target:
  - `Historic Gallery | Cook's by the Ocean`
- [ ] Draft description target:
  - `Historic photographs of Cook's, the camps, the beach, and earlier years in South Wellfleet.`

### Legacy category pages (`/legacy/{category}`)

- [ ] Give each category a unique title and description.
- [ ] Keep category titles human-readable.
- [ ] Make sure archive pages are indexable only if they contain meaningful gallery content.
- [ ] Use category cover images as social images where available.

### About (`/about`)

- [ ] Keep family history and longevity in the description if supported by current content.
- [ ] Draft title target:
  - `About Cook's by the Ocean`
- [ ] Draft description target:
  - `The history of Cook's by the Ocean, a family-run group of cottages in South Wellfleet.`

### Directions (`/location`)

- [ ] Include South Wellfleet and LeCount Hollow context in the description.
- [ ] Draft title target:
  - `Directions | Cook's by the Ocean`
- [ ] Draft description target:
  - `Directions to Cook's by the Ocean in South Wellfleet, near LeCount Hollow Beach.`

### Contact / Request Dates (`/contact`)

- [ ] Make clear that this page is for email contact and date requests.
- [ ] Do not add phone language.
- [ ] Draft title target:
  - `Contact and Request Dates | Cook's by the Ocean`
- [ ] Draft description target:
  - `Email Cook's by the Ocean or send a request for dates for a weekly cottage stay in South Wellfleet.`

### 404

- [ ] Add a helpful custom 404 page if one does not already exist.
- [ ] Return a proper 404 status.
- [ ] Mark the 404 page `noindex`.
- [ ] Link back to:
  - home
  - cottages
  - contact

## 5. On-page copy and heading alignment

- [ ] Audit all H1s and hero copy so visible page headings support the intended search topic.
- [ ] Avoid decorative headings that omit location and page purpose.
- [ ] Make sure internal links use meaningful anchor text.
- [ ] Keep legacy phrasing natural; do not stuff old keyword lists into modern copy.

## 6. Open Graph and social sharing

- [ ] Create a default sitewide social image for non-cottage pages.
- [ ] Use cottage hero images for cottage detail pages.
- [ ] Add:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:image`
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
- [ ] Use `summary_large_image` for pages with strong hero imagery.
- [ ] Verify image dimensions and file size are reasonable for sharing cards.

## 7. Structured data

### Sitewide

- [ ] Add one sitewide schema block for the business or lodging entity.
- [ ] Preferred shape:
  - `LodgingBusiness` or closely related type
- [ ] Include only confirmed data:
  - name
  - URL
  - email
  - mailing address
  - representative image
  - geographic place name
- [ ] Do not include phone, pricing, review scores, or unsupported amenities.

### Cottage detail pages

- [ ] Add optional `VacationRental` JSON-LD on cottage pages.
- [ ] Populate only known fields:
  - name
  - description
  - image
  - number of bedrooms
  - occupancy where already supported by `sleeps`
  - amenity summary if already present in content
- [ ] Omit `offers` unless pricing and booking details become officially available.
- [ ] Keep `half bath` wording consistent with site content.

## 8. Crawl, sitemap, and robots

- [ ] Generate a sitemap that includes all public MVP routes:
  - home
  - cottages index
  - 14 cottage detail pages
  - photos
  - legacy landing
  - legacy category pages
  - about
  - location
  - contact
- [ ] Exclude any preview-only or `noindex` routes from the sitemap.
- [ ] Add `robots.txt`.
- [ ] Reference the sitemap from `robots.txt`.
- [ ] Use restrictive robots rules for preview environments if they are publicly accessible.

## 9. Redirects and legacy preservation

- [ ] Update the redirect plan with the final SEO-critical mappings.
- [ ] Add 301 redirects for the highest-value current-site URLs:
  - `/index.html` -> `/`
  - `/large.html` -> `/cottages`
  - `/medium.html` -> `/cottages`
  - `/small.html` -> `/cottages`
  - cottage HTML pages -> matching `/cottages/{slug}`
  - gallery HTML pages -> matching `/legacy/{category}` or `/legacy`
- [ ] Confirm the final mapping for:
  - `Cones.html`
  - `big_guilda.html`
  - `little_guilda.html`
  - `sandy_scott.html`
  - `gallery_beach.html`
  - `gallery_camps.html`
  - `gallery_historic.html`
  - `gallery_aerial.html`
  - `gallery_wild.html`
- [ ] Avoid redirect chains.
- [ ] Avoid splitting authority between multiple live domains if the historic site remains online.

## 10. Internal linking

- [ ] Ensure every cottage page links back to the cottages index.
- [ ] Keep home, cottages, photos, legacy, directions, and contact in crawlable site navigation.
- [ ] Link related archive content from cottage pages where it helps users and search engines.
- [ ] Use descriptive anchor text instead of generic `click here` language.

## 11. Validation and launch QA

- [ ] Run a production build and inspect the rendered head tags on representative pages.
- [ ] Confirm unique title and description output for:
  - home
  - cottages index
  - at least 3 cottage pages
  - legacy landing
  - one legacy category page
  - contact
- [ ] Validate structured data on:
  - one sitewide page
  - one cottage page
- [ ] Test social cards with representative URLs.
- [ ] Confirm the sitemap renders valid URLs on the production origin.
- [ ] Confirm `robots.txt` references the correct sitemap URL.
- [ ] Confirm 404 status handling and `noindex` behavior.
- [ ] Confirm no phone number appears in:
  - metadata
  - structured data
  - social tags

## 12. Post-launch checks

- [ ] Add the final site to Google Search Console.
- [ ] Submit the sitemap.
- [ ] Monitor coverage and indexing.
- [ ] Check for title rewrites on branded and cottage-specific searches.
- [ ] Watch for missing-description or duplicate-title warnings.
- [ ] Review which legacy URLs receive traffic and expand redirects if needed.

### Launch-day runbook

1. Confirm the production deployment is live on `https://www.cooksbytheocean.com/`.
2. Open and verify:
   - `/`
   - `/cottages/`
   - `/cottages/sandy-scot/`
   - `/legacy/`
   - `/contact/`
   - `/robots.txt`
   - `/sitemap-index.xml`
3. Confirm `robots.txt` contains:
   - `User-agent: *`
   - `Allow: /`
   - `Sitemap: https://www.cooksbytheocean.com/sitemap-index.xml`
4. Confirm the sitemap resolves on the production host and includes:
   - home
   - cottages index
   - cottage detail pages
   - legacy pages
   - `contact`
5. Spot-check one old current-site URL and confirm it 301s directly to the intended destination.
   - Example: `/sandy_scott.html` -> `/cottages/sandy-scot`

### Search Console follow-through

1. Add the canonical production property for `https://www.cooksbytheocean.com/`.
2. Submit `https://www.cooksbytheocean.com/sitemap-index.xml`.
3. Request indexing for:
   - `/`
   - `/cottages/`
   - `/cottages/sandy-scot/`
   - `/legacy/`
   - `/contact/`
4. Re-check coverage after Google has crawled the sitemap.

### First-week monitoring

1. Watch for:
   - duplicate title warnings
   - missing description warnings
   - blocked-by-robots warnings
   - soft 404 reports
2. Search for brand and page-intent queries and note whether Google rewrites:
   - homepage title
   - cottage detail titles
   - legacy gallery titles
3. Review legacy URL traffic and 404 reports, then add redirects for any missed high-value current-site URLs.

### Completion criteria for section 12

- [ ] Search Console property added for the production origin.
- [ ] Sitemap submitted successfully.
- [ ] Key pages requested for indexing.
- [ ] No unexpected robots, canonical, or coverage issues after launch.
- [ ] Any missed legacy URLs found in traffic or 404 logs have a redirect plan.

## File targets

- `astro.config.mjs`
- `src/layouts/Layout.astro`
- `src/content.config.ts`
- `src/pages/index.astro`
- `src/pages/cottages/index.astro`
- `src/pages/cottages/[slug].astro`
- `src/pages/photos.astro`
- `src/pages/legacy/index.astro`
- `src/pages/legacy/[category].astro`
- `src/pages/about.astro`
- `src/pages/location.astro`
- `src/pages/contact.astro`
- redirect config and deployment config files

## Definition of done

- [ ] Every public page has a unique title and description.
- [ ] Every public page has a canonical URL.
- [ ] Every shareable page has acceptable social tags and image behavior.
- [ ] Sitemap and `robots.txt` are live and correct.
- [ ] Core legacy URLs 301 to their new destinations.
- [ ] Structured data exists where intended and contains only verified facts.
- [ ] The site does not publish a phone number or unsupported policy details.
