import { legacyCategories } from "./legacy";
import galleryManifest from "./generated/legacy-gallery.json";

type LegacyGalleryItem = {
  full: string;
  thumb: string;
  fullWidth: number;
  fullHeight: number;
  thumbWidth: number;
  thumbHeight: number;
  caption: string;
  alt: string;
};

type LegacyGalleryGroup = {
  title: string;
  description: string;
  items: LegacyGalleryItem[];
};

type LegacyGalleryCategory = {
  coverImage: string;
  itemCount: number;
  groups: LegacyGalleryGroup[];
};

const manifest = galleryManifest as Record<string, LegacyGalleryCategory>;

export function getLegacyCategoryGallery(slug: string) {
  return (
    manifest[slug] ?? {
      coverImage: "",
      itemCount: 0,
      groups: [],
    }
  );
}

export const legacyCategoriesWithGallery = legacyCategories.map((category) => ({
  ...category,
  ...getLegacyCategoryGallery(category.slug),
}));
