import photoManifest from "./generated/cottage-photos.json";

const fallbackHero = "/images/placeholders/cottage-outline.svg";

type CottageHero = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type CottageGalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type CottagePhotoSet = {
  title?: string;
  hero: CottageHero;
  photos: CottageGalleryItem[];
  totalPhotos: number;
};

const photoMap = photoManifest as Record<string, CottagePhotoSet>;

export function getCottagePhotoSet(slug: string): CottagePhotoSet {
  return (
    photoMap[slug] ?? {
      hero: {
        src: fallbackHero,
        width: 640,
        height: 480,
        alt: "Placeholder image",
      },
      photos: [],
      totalPhotos: 0,
    }
  );
}
