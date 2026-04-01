import photoManifest from "./generated/cottage-photos.json";
import type { ResponsiveImageAsset } from "./responsive-image";

const fallbackHero = "/images/placeholders/cottage-outline.svg";

type CottageGalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type CottagePhotoSet = {
  title?: string;
  card: ResponsiveImageAsset;
  hero: ResponsiveImageAsset;
  photos: CottageGalleryItem[];
  totalPhotos: number;
};

const photoMap = photoManifest as Record<string, CottagePhotoSet>;
const fallbackResponsiveImage: ResponsiveImageAsset = {
  fallback: {
    src: fallbackHero,
    width: 640,
    height: 480,
  },
  formats: {
    jpg: [
      {
        src: fallbackHero,
        width: 640,
        height: 480,
      },
    ],
  },
  width: 640,
  height: 480,
  alt: "Placeholder image",
};

export function getCottagePhotoSet(slug: string): CottagePhotoSet {
  return (
    photoMap[slug] ?? {
      card: fallbackResponsiveImage,
      hero: fallbackResponsiveImage,
      photos: [],
      totalPhotos: 0,
    }
  );
}
