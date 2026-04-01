import mediaManifest from "./generated/historic-cottage-media.json";
import type { ResponsiveImageAsset } from "./responsive-image";

type HistoricGalleryItem = {
  full: ResponsiveImageAsset;
  thumb: ResponsiveImageAsset;
  alt: string;
  caption: string;
};

type HistoricMap = ResponsiveImageAsset;

type HistoricCottageMedia = {
  title?: string;
  totalHistoricPhotos: number;
  photos: HistoricGalleryItem[];
  map: HistoricMap | null;
};

const mediaMap = mediaManifest as Record<string, HistoricCottageMedia>;

export function getHistoricCottageMedia(slug: string): HistoricCottageMedia {
  return (
    mediaMap[slug] ?? {
      totalHistoricPhotos: 0,
      photos: [],
      map: null,
    }
  );
}
