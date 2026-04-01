import mediaManifest from "./generated/historic-cottage-media.json";

type HistoricGalleryItem = {
  full: string;
  fullWidth: number;
  fullHeight: number;
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  alt: string;
  caption: string;
};

type HistoricMap = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

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
