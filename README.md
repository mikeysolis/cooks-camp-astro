# Cook's Camps Website Rebuild

Planning and implementation workspace for rebuilding Cook's by the Ocean as a modern static site that keeps the historic spirit.

## Live reference sites

- Historic reference: `https://cookscampshistoric.com/Index.htm`
- Current production domain: `http://www.cooksbytheocean.com/`

## Start here

Read this first before implementation:

- `docs/specs/11-heritage-first-implementation-brief.md`

This brief locks the MVP implementation approach:

1. Current site is the factual source of truth.
2. Historic site is the tone/voice reference.
3. No phone number on the new site.
4. Use `Sandy Scot` naming.
5. Use bathroom wording `half bath`.
6. Do not invent policy details not present on the current site.

## Spec index

All planning docs live under `docs/specs/`.

### Vision and foundations

- `docs/specs/01-vision.md`
- `docs/specs/02-information-architecture.md`
- `docs/specs/03-design-direction.md`
- `docs/specs/04-content-model.md`
- `docs/specs/05-photo-guidelines.md`
- `docs/specs/06-tech-decisions.md`
- `docs/specs/08-archive-photo-strategy.md`

### Delivery and implementation

- `docs/specs/10-implementation-roadmap.md`
- `docs/specs/20-feature-specs.md`
- `docs/specs/21-gallery-implementation-notes.md`
- `docs/specs/22-cottage-page-template-spec.md`
- `docs/specs/cottage-page-template-implementation-spec.md`
- `docs/specs/navigation-layout-architecture-spec.md`

### Content and launch

- `docs/specs/30-content-authoring-guide.md`
- `docs/specs/40-redirects-plan.md`
- `docs/specs/50-qa-launch-checklist.md`

## Current planning status

- Planning is complete for MVP scope and content constraints.
- Next phase is implementation (Astro + Tailwind + Markdown collections).
- Photos in `docs/current_photos/*` are source assets and must be resized/migrated into web-ready paths during implementation.
