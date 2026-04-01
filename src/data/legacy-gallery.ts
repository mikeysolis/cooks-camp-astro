import { legacyCategories } from "./legacy";
import galleryManifest from "./generated/legacy-gallery.json";
import type { ResponsiveImageAsset } from "./responsive-image";

type LegacyGalleryItem = {
  full: ResponsiveImageAsset;
  thumb: ResponsiveImageAsset;
  caption: string;
  alt: string;
};

type LegacyGalleryGroup = {
  title: string;
  description: string;
  items: LegacyGalleryItem[];
};

type LegacyGalleryCategory = {
  coverImage: ResponsiveImageAsset | null;
  itemCount: number;
  groups: LegacyGalleryGroup[];
};

const manifest = galleryManifest as Record<string, LegacyGalleryCategory>;

export function getLegacyCategoryGallery(slug: string) {
  return (
    manifest[slug] ?? {
      coverImage: null,
      itemCount: 0,
      groups: [],
    }
  );
}

export const legacyCategoriesWithGallery = legacyCategories.map((category) => ({
  ...category,
  ...getLegacyCategoryGallery(category.slug),
}));
