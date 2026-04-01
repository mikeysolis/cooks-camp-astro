# Historic Media Import Manifest

This document locks the current state of historic media and defines the next import phases.

## Scope

Historic media sources currently exist in two places:

1. Local legacy snapshot:
   - `docs/site-legacy/www.cooksbytheocean.com`
2. Live historic site references not yet captured into the repo:
   - `https://cookscampshistoric.com/`

The goal is to distinguish:

1. Assets already imported into the new site
2. Assets available locally but not yet imported
3. Assets only available on the live historic site and still needing capture

## Already Imported

Current historic gallery export is driven by:

- [scripts/export-legacy-archive.mjs](/Users/mike/Code/cookscamps/scripts/export-legacy-archive.mjs)

Current generated manifest:

- [src/data/generated/legacy-gallery.json](/Users/mike/Code/cookscamps/src/data/generated/legacy-gallery.json)

Current exported assets:

- [public/images/legacy](/Users/mike/Code/cookscamps/public/images/legacy)

Imported gallery groups and counts:

1. `beach`: 19
2. `camps`: 10
3. `sky-wildlife`
   - `The camps from above`: 10
   - `The ocean from above`: 9
4. `historic`: 24

Current user-facing destinations:

1. `/legacy`
2. `/legacy/beach`
3. `/legacy/camps`
4. `/legacy/sky-wildlife`
5. `/legacy/historic`

## Confirmed Import Gaps

### Gap 1: Missing Beach Image

Local source page:

- [gallery_beach.html](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/gallery_beach.html)

The source page links 20 lightbox images, but the generated export only contains 19.

Confirmed missing source file:

- `img/beach/image_54.jpg`

Proposed target:

- add to `/legacy/beach`

Priority:

- `P0`

### Gap 2: Unused Historic Image In Local Snapshot

This image exists in the local historic folder but is not linked by the local gallery page, so it never enters the export:

- `img/historic/image_0.jpg`

Proposed target:

1. review for inclusion in `/legacy/historic`
2. if weak or redundant, leave unused

Priority:

- `P2`

## Local Historic Assets Not Yet Imported

### 1. Cottage Historic Photos

Local source root:

- [img/cottages](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/img/cottages)

These are not part of the current historic gallery export.

They are better suited for individual cottage pages than the general Historic Gallery.

Per-cottage full-size image counts and map availability:

1. `big_guilda`: 14 images, map `mapf.jpg`
2. `camera`: 7 images, map `map_2f.jpg`
3. `captain`: 6 images, map `map_3f.jpg`
4. `cones`: 7 images, map `mapf.jpg`
5. `dunes`: 4 images, map `mapf.jpg`
6. `little_guilda`: 8 images, map `map_7f.jpg`
7. `marconi`: 15 images, map `mapf.jpg`
8. `new_cabin`: 9 images, map `map_9f.jpg`
9. `oversea`: 8 images, map `mapf.jpg`
10. `pines`: 6 images, map `mapf.jpg`
11. `pretty_home`: 17 images, map `mapf.jpg`
12. `sands`: 7 images, map `map_13f.jpg`
13. `sandy_scott`: 8 images, map `mapf.jpg`
14. `summer_salt`: 4 images, map `mapf.jpg`

Notes:

1. Every cottage except none has at least one full-size historic image.
2. Every cottage listed above has a map/floorplan image available.
3. These should be curated in small sets, not imported wholesale.

Proposed targets:

1. add `Historic Photos` section to each cottage detail page
2. add per-cottage map/floorplan image below or beside the historic photos

Priority:

- `P1`

### 2. Root Carousel Images

Local files:

1. [carousel1.JPG](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/carousel1.JPG)
2. [carousel2.JPG](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/carousel2.JPG)
3. [carousel3.JPG](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/carousel3.JPG)
4. [carousel4.JPG](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/carousel4.JPG)
5. [carousel5.jpg](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/carousel5.jpg)

These are not used anywhere in the new site.

Proposed targets:

1. optional home-page supporting imagery
2. optional addition to Historic Gallery if we want to preserve them without changing the home page

Priority:

- `P2`

### 3. Directions Map Asset

Local file:

- [img/map-image.png](/Users/mike/Code/cookscamps/docs/site-legacy/www.cooksbytheocean.com/img/map-image.png)

Important note:

1. This is a Cape Cod satellite image.
2. It is not the same thing as a hand-drawn or labeled `Map of Cooks`.

Proposed target:

1. add to `/location` only if we want a regional orientation image
2. replace or supplement later if the live historic site has a better `Map of Cooks` asset

Priority:

- `P1`

## Local Gallery Coverage Summary

Local gallery source buckets in the legacy snapshot:

1. `img/beach`: 18 non-thumbnail source images linked plus 2 ladder images
2. `img/camps`: 10 source images
3. `img/aerial`: 10 source images
4. `img/drone_wildlife`: 9 source images
5. `img/historic`: 25 source images in folder, 24 linked by local gallery page
6. `img/ladder`: 2 source images

Status:

1. These buckets are mostly imported already.
2. Only the beach bucket has a confirmed linked-image miss in the current export.

## Live Historic Site Assets Still Needing Capture

These are referenced by the live historic site but are not present in the local repo snapshot and therefore are not yet importable by script.

Target pages to capture:

1. `Dusk/Dawn`
2. `Interiors`
3. `Maps to Cooks` / `Map of Cooks`
4. `Winter` if it exists

Why this matters:

1. These likely contain the exact additional historic images the current site is still missing.
2. The current repo snapshot does not include them, so no local import script can pull them yet.

Proposed repo landing area after capture:

1. `docs/historic/live-capture/...`

Priority:

- `P1`

## Proposed Destination Map

### Directions Page

Use:

1. regional map image from `img/map-image.png`
2. later replace or supplement with live `Map of Cooks` asset if better

Destination:

1. `/location`

### Historic Gallery

Use:

1. missing beach image `image_54.jpg`
2. current local gallery groups already imported
3. future live-only groups:
   - `dusk-dawn`
   - `interiors`
   - `winter` if approved

Destination:

1. `/legacy`

### Cottage Detail Pages

Use:

1. curated historic images from each cottage folder
2. one map/floorplan image per cottage where useful

Destination:

1. `/cottages/[slug]`

### Home Page

Optional use:

1. selected root carousel images if a later design pass needs them

Destination:

1. `/`

## Recommended Execution Order

1. Fix missing beach import
2. Add regional map to Directions page
3. Add per-cottage historic photo and map support
4. Capture live-only historic pages and assets into `docs/`
5. Expand Historic Gallery taxonomy and importer
6. Final curation pass

## Acceptance Criteria For Next Phase

Before Phase 2 begins, this manifest should be treated as locked on these points:

1. Historic Gallery remains category-based
2. Cottage-specific historic media belongs on cottage pages, not dumped into the general gallery
3. `img/map-image.png` is a regional orientation image, not a substitute for a true `Map of Cooks`
4. Live-only historic pages must be captured into the repo before they can be included in a deterministic import pipeline
