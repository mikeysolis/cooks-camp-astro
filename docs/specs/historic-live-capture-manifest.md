# Historic Live Capture Manifest

Local snapshot of live-only historic pages and assets captured from `https://cookscampshistoric.com/` so future import work can run from repository files instead of the live site.

## Captured pages

Stored in `docs/historic/live-capture/pages/`:

1. `cottages.html`
2. `interiors.html`
3. `map-of-cooks.html`
4. `winter.html`
5. `dawn-dusk.html`
6. `arial-view.html`
7. `camps.html`
8. `beach.html`

## Captured assets

Stored in `docs/historic/live-capture/assets/`:

1. `NewBasicCutout%20ofCooks%20aa.jpg`
   - source page: `map-of-cooks.html`
   - intended use: directions/property map support and possible historic gallery map group

2. `Pictures/Interiors/*`
   - 5 images
   - source page: `interiors.html`
   - intended use: new `interiors` historic gallery group

3. `Pictures/Winter/*`
   - 9 images
   - source page: `winter.html`
   - intended use: new `winter` historic gallery group

4. `Pictures/Flyby.gif`
   - source page: `arial-view.html`
   - intended use: fold into `sky-wildlife` or a dedicated aerial subgroup

5. `Pictures/*` referenced by `dawn-dusk.html`
   - 15 images
   - intended use: new `dawn-dusk` historic gallery group

6. `Pictures/*` referenced by `camps.html`
   - 14 images
   - intended use: reconcile against existing local `camps` import and add any missing material

7. `Pictures/*` referenced by `beach.html`
   - 12 images
   - intended use: reconcile against existing local `beach` import and add any missing material

## Capture totals

1. 8 HTML pages
2. 57 assets total
3. 56 image assets under `Pictures/`
4. 1 property map image at asset root

## Next import work

1. Extend the historic archive importer to read from `docs/historic/live-capture/pages/` and `docs/historic/live-capture/assets/`.
2. Decide final taxonomy for the new groups:
   - `dawn-dusk`
   - `interiors`
   - `winter`
   - `sky-wildlife` should absorb `arial-view` unless a dedicated aerial category is preferred.
3. Reconcile duplicate coverage between the local legacy snapshot and the live capture for `beach` and `camps`.
4. Export the approved new groups into `public/images/legacy/` and update the historic gallery navigation/content.
