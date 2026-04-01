export type ResponsiveImageSource = {
  src: string;
  width: number;
  height: number;
};

export type ResponsiveImageFormats = Partial<{
  avif: ResponsiveImageSource[];
  webp: ResponsiveImageSource[];
  jpg: ResponsiveImageSource[];
}>;

export type ResponsiveImageAsset = {
  fallback: ResponsiveImageSource;
  formats: ResponsiveImageFormats;
  width: number;
  height: number;
  alt: string;
};
