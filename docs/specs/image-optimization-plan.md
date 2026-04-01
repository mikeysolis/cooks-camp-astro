# Image Optimization Plan

Implementation plan for improving image loading across desktop and mobile while preserving image quality. This plan is based on the current export scripts, image manifests, and page/component usage in the repo.

## Current state

### Current asset strategy

1. `scripts/export-cottage-photos.mjs`
   - exports JPEG only
   - 1 hero size: `1600px`
   - 1 gallery size: `1200px`

2. `scripts/export-historic-cottage-media.mjs`
   - exports JPEG only
   - historic full: `1200px`
   - historic thumbs: `720px`
   - maps: `1200px`

3. `scripts/export-legacy-archive.mjs`
   - exports JPEG only
   - archive full: `1600px`
   - archive thumbs: `720px`

### Current delivery strategy

1. Most UI images are rendered with a single `src`.
2. There is no `srcset` or `sizes` for modern cottage hero or card images.
3. The browser often downloads desktop-sized files on mobile.
4. `PhotoSwipeGallery` uses the same modern cottage image for both thumb and full lightbox display.
5. Historic gallery pages do at least distinguish thumb vs full, but still only use JPEG.

### Current footprint

Approximate current totals:

1. `public/images/cottages`: `18M`
2. `public/images/historic-cottages`: `14M`
3. `public/images/legacy`: `16M`

Observed large files:

1. modern cottage hero JPEGs: up to `412K`
2. modern cottage gallery JPEGs: commonly `150K–235K`
3. historic archive full JPEGs: commonly `160K–304K`

## Objectives

1. Reduce transferred bytes on mobile and mid-size screens.
2. Preserve visual quality for a photography-first site.
3. Keep the export pipeline deterministic and repo-local.
4. Avoid a risky rewrite away from the current Sharp-based approach.
5. Improve perceived load on index pages and cottage pages first.
6. Support aggressive immutable caching without stale-image problems after deploys.

## Core strategy

1. Continue using the existing custom Sharp export pipeline.
2. Extend it to generate:
   - `avif`
   - `webp`
   - `jpg` fallback
3. Export multiple widths per image class.
4. Update manifests to describe responsive variants.
5. Update UI components to render `<picture>`, `srcset`, and `sizes`.
6. Keep PhotoSwipe, but feed it smaller thumbnails and optimized full images.
7. Use fingerprinted output filenames so image URLs change when the exported asset changes.
8. Clear and rebuild each generated output directory during export so obsolete variants do not accumulate in `public/images`.

## Asset naming and caching

1. Exported image filenames should be fingerprinted.
2. The fingerprint should be derived from the output content or a stable source hash plus export settings.
3. Generated manifests should reference the fingerprinted paths directly.
4. This allows Vercel and the browser to cache image assets aggressively without serving stale files after later exports.
5. Stable filenames such as `hero.jpg` or `gallery-01.jpg` should not be retained for the new optimized pipeline.

## Output cleanup

1. Before writing a generated image set, remove the target output directory for that set and rebuild it.
2. This applies to:
   - `public/images/cottages/{slug}`
   - `public/images/legacy/{category}`
   - `public/images/historic-cottages/{slug}`
3. The cleanup step is required once multiple formats and widths are introduced, otherwise dead files will remain in deploy output.

## Image classes and target outputs

### 1. Card / listing images

Used by:

1. home featured cottages
2. cottages index cards
3. photos page cards
4. Historic Gallery category cards

Target widths:

1. `320`
2. `480`
3. `720`

Formats:

1. `avif`
2. `webp`
3. `jpg`

Target transfer budget:

1. `40K–90K` typical per chosen card image

### 2. Cottage hero images

Used by:

1. top hero on cottage detail pages

Target widths:

1. `640`
2. `960`
3. `1280`
4. `1600`

Formats:

1. `avif`
2. `webp`
3. `jpg`

Target transfer budget:

1. `90K–180K` typical chosen image

### 3. Modern gallery thumbnails

Used by:

1. `PhotoSwipeGallery` modern mode on cottage detail pages

Target widths:

1. `320`
2. `480`
3. `720`

Formats:

1. `avif`
2. `webp`
3. `jpg`

Target transfer budget:

1. `35K–80K` typical chosen thumbnail

### 4. Modern gallery lightbox images

Used by:

1. full-size PhotoSwipe modern gallery display

Target widths:

1. `960`
2. `1280`
3. `1600`

Formats:

1. `avif`
2. `webp`
3. `jpg`

Target transfer budget:

1. `140K–260K` typical chosen lightbox image

### 5. Historic gallery thumbnails

Used by:

1. category gallery pages
2. historic cottage photo galleries

Target widths:

1. `320`
2. `480`
3. `720`

Formats:

1. `webp`
2. `jpg`

Note:

1. `avif` is optional here if pipeline/runtime complexity grows, because historic imagery already tolerates stronger compression.

### 6. Historic gallery full images

Used by:

1. Historic Gallery lightbox
2. historic cottage lightbox

Target widths:

1. `960`
2. `1280`
3. `1600`

Formats:

1. `webp`
2. `jpg`

### 7. Maps and diagrams

Used by:

1. directions maps
2. historic cottage maps

Target widths:

1. `640`
2. `960`
3. `1200`

Formats:

1. `webp`
2. `jpg`

Rule:

1. keep these sharper than photographic images if text or fine lines are present

### 8. PhotoSwipe full-slide assets

Initial delivery strategy:

1. use responsive thumbnails in the page markup
2. use a single optimized full-image URL per slide in PhotoSwipe
3. do not attempt per-slide `srcset` inside PhotoSwipe in the first implementation pass

Format strategy:

1. modern PhotoSwipe full images should be generated in `avif`, `webp`, and `jpg`
2. historic PhotoSwipe full images should be generated in `webp` and `jpg`
3. initial lightbox implementation should point PhotoSwipe at a single optimized `webp` full image URL per slide
4. keep fallback `jpg` paths in the manifest for future fallback handling or non-lightbox usage

Reason:

1. this materially improves bandwidth without adding unnecessary lightbox complexity
2. it keeps the first performance pass stable and testable

## Manifest changes

### `src/data/generated/cottage-photos.json`

Replace single-file image entries with responsive objects.

Each hero should include:

1. `fallback`
2. `formats.avif[]`
3. `formats.webp[]`
4. `formats.jpg[]`
5. `width`
6. `height`
7. `alt`

Each gallery item should include:

1. `thumb.formats.*`
2. `full.formats.*`
3. `thumb.width`
4. `thumb.height`
5. `full.width`
6. `full.height`
6. `alt`
7. `caption`

### `src/data/generated/legacy-gallery.json`

Each item should include:

1. `thumb.formats.*`
2. `full.formats.*`
3. `thumb.width`
4. `thumb.height`
5. `full.width`
6. `full.height`
7. `alt`
8. `caption`

### `src/data/generated/historic-cottage-media.json`

Each historic photo should include the same thumb/full responsive structure.

Maps should include:

1. `formats.webp[]`
2. `formats.jpg[]`
3. `width`
4. `height`
5. `alt`

## Code changes by file

### Exporters

1. `scripts/export-cottage-photos.mjs`
   - generate card/hero/full responsive variants
   - separate thumb vs full modern gallery output
   - clear cottage output directory before writing
   - write fingerprinted variant filenames

2. `scripts/export-legacy-archive.mjs`
   - generate responsive thumb/full variants per historic item
   - optionally skip AVIF for historic assets if build time becomes excessive
   - clear category output directory before writing
   - write fingerprinted variant filenames

3. `scripts/export-historic-cottage-media.mjs`
   - generate responsive historic thumb/full variants
   - generate responsive map variants
   - clear cottage output directory before writing
   - write fingerprinted variant filenames

### Data layer

1. `src/data/cottage-photos.ts`
2. `src/data/legacy-gallery.ts`
3. `src/data/historic-cottage-media.ts`

Update types to reflect responsive image objects.

### Rendering layer

1. `src/components/CottageCard.astro`
   - switch to `<picture>` with `srcset` and `sizes`

2. `src/pages/index.astro`
   - use responsive featured cottage cards

3. `src/pages/cottages/index.astro`
   - use responsive cottage cards

4. `src/pages/photos.astro`
   - use responsive card images

5. `src/pages/cottages/[slug].astro`
   - render responsive cottage hero image
   - feed modern gallery with thumb/full distinction
   - render responsive historic map image

6. `src/components/PhotoSwipeGallery.astro`
   - accept structured `thumb` and `full` assets
   - render responsive thumbs with `picture/srcset`
   - keep PhotoSwipe full image URL targeted at a single optimized full-size asset per slide

7. `src/pages/legacy/index.astro`
   - responsive category preview images

8. `src/pages/location.astro`
   - optimize both Directions-page maps with responsive variants

## Loading policy

### Eager / high priority

Only these should be considered for eager loading:

1. primary cottage hero on cottage detail page
2. first one or two above-the-fold homepage featured cottage images if testing justifies it

### Lazy

Everything else should remain lazy:

1. card grids below the fold
2. gallery thumbnails
3. historic gallery thumbnails
4. maps lower on the page

### `sizes` guidance

1. card grids:
   - `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"`
   - tune by actual layout
2. cottage hero:
   - `sizes="(min-width: 1024px) 58vw, 100vw"`
3. full-width content images:
   - `sizes="(min-width: 1280px) 960px, (min-width: 1024px) 75vw, 100vw"`

## Compression guidance

### Modern photos

1. AVIF quality: start around `45–55`
2. WebP quality: start around `68–74`
3. JPEG fallback quality: start around `72–78`

### Historic photos

1. WebP quality: start around `60–68`
2. JPEG fallback quality: start around `64–72`

### Maps

1. WebP quality: start around `72–80`
2. JPEG fallback quality: start around `76–82`

These are starting points. Final tuning should be based on side-by-side visual checks.

## Phased implementation

### Phase 1. Modern cottage pipeline

1. update `scripts/export-cottage-photos.mjs`
2. update `src/data/generated/cottage-photos.json`
3. update `src/data/cottage-photos.ts`
4. update modern card and hero rendering
5. update `src/pages/location.astro` map delivery
6. add fingerprinted filenames
7. add cleanup logic for generated outputs

Success criteria:

1. homepage, cottages index, photos page, and cottage hero all use responsive images
2. mobile no longer downloads `1600px` hero/card assets unnecessarily
3. Directions-page maps no longer ship single large files to all viewports
4. generated output directories do not retain obsolete files between export runs

### Phase 2. Modern gallery delivery

1. split modern thumbs from full lightbox assets
2. update `PhotoSwipeGallery.astro`
3. update cottage detail modern gallery usage
4. point PhotoSwipe at a single optimized full-image asset per slide, not the thumbnail asset

Success criteria:

1. thumbnail grid loads fast
2. full images load only when opening/lightboxing
3. PhotoSwipe no longer uses the same file for both thumb and full modern gallery display

### Phase 3. Historic gallery delivery

1. update `scripts/export-legacy-archive.mjs`
2. update `src/data/generated/legacy-gallery.json`
3. update `src/data/legacy-gallery.ts`
4. update Historic Gallery index/category rendering

Success criteria:

1. Historic Gallery category pages scroll smoothly on mobile
2. archive thumbs are substantially smaller than today

### Phase 4. Historic cottage media and maps

1. update `scripts/export-historic-cottage-media.mjs`
2. update `src/data/generated/historic-cottage-media.json`
3. update cottage historic gallery and maps rendering

Success criteria:

1. historic sections on cottage pages do not dominate bandwidth
2. map images remain readable

### Phase 5. QA and tuning

1. inspect mobile and desktop in preview
2. compare quality vs transferred bytes
3. adjust quality presets if any class looks visibly degraded

## Acceptance criteria

1. card/listing images load quickly on mobile
2. cottage pages feel immediate above the fold
3. gallery thumbnails do not block the page
4. PhotoSwipe still presents good-looking full images
5. no visible quality collapse on modern cottage photography
6. historic imagery remains legible and atmospheric
7. image URLs are safe to cache long-term because exported filenames are versioned
8. repeated export runs do not leave stale assets in generated output folders

## Recommendation

Implement this plan in the exact phase order above. The first meaningful win will come from modern cottage images plus responsive delivery on the home page, cottages index, photos page, cottage hero template, and Directions-page maps. That should happen before optimizing the modern lightbox flow and the historic galleries.
