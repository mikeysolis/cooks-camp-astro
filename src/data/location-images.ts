import locationMapManifest from "./generated/location-maps.json";
import type { ResponsiveImageAsset } from "./responsive-image";

const fallbackMaps = {
  property: {
    fallback: {
      src: "/images/historic/cooks-property-map.jpg",
      width: 600,
      height: 456,
    },
    formats: {
      jpg: [
        {
          src: "/images/historic/cooks-property-map.jpg",
          width: 600,
          height: 456,
        },
      ],
    },
    width: 600,
    height: 456,
    alt: "Historic map of Cook's by the Ocean showing the cottages and the layout of the property.",
  },
  capeCod: {
    fallback: {
      src: "/images/historic/cape-cod-map.png",
      width: 700,
      height: 467,
    },
    formats: {
      jpg: [
        {
          src: "/images/historic/cape-cod-map.png",
          width: 700,
          height: 467,
        },
      ],
    },
    width: 700,
    height: 467,
    alt: "Regional map of Cape Cod for orientation before following the directions to Cook's by the Ocean.",
  },
} satisfies Record<"property" | "capeCod", ResponsiveImageAsset>;

const mapManifest = locationMapManifest as Partial<Record<"property" | "capeCod", ResponsiveImageAsset>>;

export function getLocationImage(key: "property" | "capeCod"): ResponsiveImageAsset {
  return mapManifest[key] ?? fallbackMaps[key];
}
