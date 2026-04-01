export const SITE_ORIGIN = "https://www.cooksbytheocean.com";
export const SITE_NAME = "Cook's by the Ocean";
export const DEFAULT_DESCRIPTION = "Cook's by the Ocean in South Wellfleet.";
export const DEFAULT_SOCIAL_IMAGE = "/images/historic/cooks-property-map.jpg";
export const DEFAULT_SOCIAL_IMAGE_ALT = "Cook's by the Ocean in South Wellfleet.";
export const BUSINESS_ID = `${SITE_ORIGIN}/#lodging-business`;
export const DEFAULT_SITE_DESCRIPTION =
  "Fourteen beach cottages above the Atlantic in South Wellfleet, Cape Cod, available for weekly rental.";
export const SITEMAP_INDEX_URL = `${SITE_ORIGIN}/sitemap-index.xml`;

export type JsonLd = Record<string, unknown>;

export interface ResolvedPageSeo {
  canonicalUrl: string;
  description: string;
  openGraph: {
    description: string;
    image: string;
    imageAlt: string;
    title: string;
    type: string;
    url: string;
  };
  robots: string;
  siteName: string;
  title: string;
  twitter: {
    card: "summary_large_image";
    description: string;
    image: string;
    imageAlt: string;
    title: string;
  };
}

interface ResolvePageSeoInput {
  title: string;
  description?: string;
  pathname: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
}

const NOINDEX_DIRECTIVE = "noindex, nofollow";
const INDEX_DIRECTIVE = "index, follow";

export function buildCanonicalUrl(pathname: string) {
  return new URL(pathname, SITE_ORIGIN).toString();
}

export function buildAbsoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString();
}

export function buildPageTitle(title: string) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    return SITE_NAME;
  }

  if (
    normalizedTitle === SITE_NAME ||
    normalizedTitle.includes(SITE_NAME) ||
    normalizedTitle.endsWith(`| ${SITE_NAME}`) ||
    normalizedTitle.endsWith(`- ${SITE_NAME}`)
  ) {
    return normalizedTitle;
  }

  return `${normalizedTitle} | ${SITE_NAME}`;
}

export function resolveRobotsDirective(noindex = false) {
  if (!isProductionDeployment() || noindex) {
    return NOINDEX_DIRECTIVE;
  }

  return INDEX_DIRECTIVE;
}

export function isProductionDeployment() {
  const deploymentEnvironment = import.meta.env.VERCEL_ENV;

  if (!import.meta.env.PROD) {
    return false;
  }

  if (deploymentEnvironment && deploymentEnvironment !== "production") {
    return false;
  }

  return true;
}

export function resolveSocialImage(imagePath = DEFAULT_SOCIAL_IMAGE) {
  return buildAbsoluteUrl(imagePath);
}

export function buildAmenityFeatureList(amenities: string[]) {
  return amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  }));
}

export function buildSiteStructuredData(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: DEFAULT_SITE_DESCRIPTION,
    email: "cooksbytheocean@gmail.com",
    image: resolveSocialImage(),
    areaServed: "Cape Cod",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "South Wellfleet",
      addressRegion: "MA",
      postalCode: "02663",
      postOfficeBoxNumber: "237",
    },
    amenityFeature: buildAmenityFeatureList([
      "Full kitchen",
      "Half bath",
      "Outdoor shower",
      "WiFi",
      "Rinnai propane heater",
    ]),
  };
}

interface BuildVacationRentalStructuredDataInput {
  amenities: string[];
  bedrooms: number;
  description: string;
  image: string;
  name: string;
  pathname: string;
  sleeps: number;
}

export function buildVacationRentalStructuredData({
  amenities,
  bedrooms,
  description,
  image,
  name,
  pathname,
  sleeps,
}: BuildVacationRentalStructuredDataInput): JsonLd {
  const url = buildCanonicalUrl(pathname);

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${url}#vacation-rental`,
    name,
    url,
    description,
    image: resolveSocialImage(image),
    containedInPlace: {
      "@id": BUSINESS_ID,
    },
    numberOfBedrooms: bedrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      unitCode: "C62",
      value: sleeps,
    },
    amenityFeature: buildAmenityFeatureList(amenities),
  };
}

export function resolvePageSeo({
  title,
  description,
  pathname,
  noindex = false,
  ogImage,
  ogImageAlt,
  ogType = "website",
}: ResolvePageSeoInput) {
  const resolvedTitle = buildPageTitle(title);
  const resolvedDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const resolvedCanonicalUrl = buildCanonicalUrl(pathname);
  const resolvedImage = resolveSocialImage(ogImage);
  const resolvedImageAlt = ogImageAlt?.trim() || DEFAULT_SOCIAL_IMAGE_ALT;

  return {
    canonicalUrl: resolvedCanonicalUrl,
    description: resolvedDescription,
    openGraph: {
      description: resolvedDescription,
      image: resolvedImage,
      imageAlt: resolvedImageAlt,
      title: resolvedTitle,
      type: ogType,
      url: resolvedCanonicalUrl,
    },
    robots: resolveRobotsDirective(noindex),
    siteName: SITE_NAME,
    title: resolvedTitle,
    twitter: {
      card: "summary_large_image",
      description: resolvedDescription,
      image: resolvedImage,
      imageAlt: resolvedImageAlt,
      title: resolvedTitle,
    },
  };
}
