import photoManifest from "./generated/cottage-photos.json";

const fallbackHero = "/images/placeholders/cottage-outline.svg";

type CottagePhotoSet = {
  title?: string;
  hero: string;
  photos: string[];
  totalPhotos: number;
};

const photoMap = photoManifest as Record<string, CottagePhotoSet>;

export function getCottagePhotoSet(slug: string): CottagePhotoSet {
  return (
    photoMap[slug] ?? {
      hero: fallbackHero,
      photos: [],
      totalPhotos: 0,
    }
  );
}
