# Changelog

All notable changes to this project will be documented in this file.

## 0.0.1

### Features

- Stage 0 Astro foundation
- Tailwind setup and heritage-first site shell
- Content collections, placeholder routes, and sample cottage rendering

### Updated

- Repository root now contains the Astro app scaffold

## 0.0.2

### Features

- Added the full 14-cottage content collection with locked names, categories, and core facts
- Replaced placeholder home, cottages, contact, photos, and supporting page copy with heritage-first content
- Grouped cottages by size on the index and expanded cottage detail pages with amenities and related navigation

### Updated

- Page content now follows the current-site facts / historic-site tone rule

## 0.0.3

### Features

- Added a repeatable cottage photo export pipeline using the raw files in `docs/current_photos`
- Exported optimized hero and gallery images for all 14 cottages into `public/images/cottages`
- Wired real cottage photography into the home page, cottages index, cottage detail pages, and photos page

### Updated

- Modern photos are now rendered from a generated manifest instead of placeholder image paths

## 0.0.4

### Fixed

- Replaced the `sips` photo export path with `sharp` after discovering `sips` was producing black images from the current photo set
- Regenerated all cottage images with the corrected exporter

## 0.0.5

### Features

- Added a server-backed contact form designed for Vercel deployment
- Added validation, honeypot filtering, signed form timing checks, and a lightweight per-IP rate limiter
- Added Resend-based email delivery configuration and example environment variables

## 0.0.6

### Features

- Added a repeatable legacy archive export pipeline based on the archived gallery pages in the legacy site copy
- Exported and categorized archive images for beach, camps, sky-wildlife, and historic galleries
- Replaced archive placeholders with rendered legacy gallery index and category pages
