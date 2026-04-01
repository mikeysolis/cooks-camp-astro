import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exportResponsiveAsset, prepareOutputDir } from "./image-export-utils.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const legacyRoot = path.join(projectRoot, "docs/site-legacy/www.cooksbytheocean.com");
const liveCapturePagesRoot = path.join(projectRoot, "docs/historic/live-capture/pages");
const liveCaptureAssetsRoot = path.join(projectRoot, "docs/historic/live-capture/assets");
const outputRoot = path.join(projectRoot, "public/images/legacy");
const generatedDir = path.join(projectRoot, "src/data/generated");
const generatedManifestPath = path.join(generatedDir, "legacy-gallery.json");

const gallerySources = [
  {
    category: "beach",
    groups: [
      {
        kind: "legacy-lightbox",
        sourcePage: "gallery_beach.html",
      },
      {
        kind: "historic-live",
        sourcePage: "beach.html",
        title: "Earlier Beach Days",
        description: "Family days, surf, and older views along the beach.",
      },
    ],
  },
  {
    category: "camps",
    groups: [
      {
        kind: "legacy-lightbox",
        sourcePage: "gallery_camps.html",
      },
      {
        kind: "historic-live",
        sourcePage: "camps.html",
        title: "Around the Camps",
        description: "A broader walk around the cottages, flagpole, bluff, and compound.",
      },
    ],
  },
  {
    category: "dawn-dusk",
    groups: [
      {
        kind: "historic-live",
        sourcePage: "dawn-dusk.html",
        title: "Dawn & Dusk",
        description: "Sunrise, moonrise, sunset, beach fires, and the light at Cook's.",
      },
    ],
  },
  {
    category: "interiors",
    groups: [
      {
        kind: "historic-live",
        sourcePage: "interiors.html",
        title: "Interiors",
        description: "A few older views inside the cottages.",
      },
    ],
  },
  {
    category: "sky-wildlife",
    groups: [
      {
        kind: "legacy-lightbox",
        sourcePage: "gallery_aerial.html",
      },
      {
        kind: "legacy-lightbox",
        sourcePage: "gallery_wild.html",
      },
      {
        kind: "historic-live",
        sourcePage: "arial-view.html",
        title: "Aerial View",
        description: "A flyby view from the historic site.",
      },
    ],
  },
  {
    category: "winter",
    groups: [
      {
        kind: "historic-live",
        sourcePage: "winter.html",
        title: "Winter",
        description: "Off-season views of the cottages and bluff.",
      },
    ],
  },
  {
    category: "historic",
    groups: [
      {
        kind: "legacy-lightbox",
        sourcePage: "gallery_historic.html",
      },
    ],
  },
];

const fullWidths = [960, 1280, 1600];
const thumbWidths = [320, 480, 720];
const historicFormats = {
  webp: 64,
  jpg: 68,
};

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseLegacyLightboxPage(sourcePage) {
  const filePath = path.join(legacyRoot, sourcePage);
  const html = readFileSync(filePath, "utf8");
  const titleMatch = html.match(/<h1>([\s\S]*?)<\/h1>/i);
  const descriptionMatch = html.match(/<h4[^>]*class="page-description[^"]*"[^>]*>([\s\S]*?)<\/h4>/i);
  const anchorPattern =
    /<a class="lightbox" href="([^"]+)"\s*>[\s\S]*?<img src="([^"]+)"[^>]*>/gi;

  const matches = [...html.matchAll(anchorPattern)];
  const items = matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? html.length;
    const block = html.slice(start, end);
    const captionMatch = block.match(/<div class="caption">[\s\S]*?<p>([\s\S]*?)<\/p>/i);

    return {
      fullInput: path.join(legacyRoot, match[1]),
      caption: decodeEntities(stripTags(captionMatch?.[1] ?? "")),
      alt: "",
    };
  });

  return {
    title: decodeEntities(stripTags(titleMatch?.[1] ?? sourcePage)),
    description: decodeEntities(stripTags(descriptionMatch?.[1] ?? "")),
    items,
  };
}

function canonicalizeCapturedPath(rawPath) {
  return rawPath
    .replace(/^\.\.\//, "")
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)).replace(/'/g, "%27"))
    .join("/");
}

function humanizeFilename(rawPath) {
  const decoded = decodeURIComponent(path.basename(rawPath, path.extname(rawPath)));
  return decoded.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function parseHistoricLivePage({ sourcePage, title, description }) {
  const filePath = path.join(liveCapturePagesRoot, sourcePage);
  const html = readFileSync(filePath, "utf8");
  const imagePattern = /<img[^>]+src="([^"]+)"/gi;
  const items = [];
  const seen = new Set();

  for (const match of html.matchAll(imagePattern)) {
    const source = decodeEntities(match[1].trim());

    if (!source.startsWith("../Pictures/") && !source.startsWith("../NewBasicCutout")) {
      continue;
    }

    const localRelativePath = canonicalizeCapturedPath(source);

    if (seen.has(localRelativePath)) {
      continue;
    }

    seen.add(localRelativePath);

    const label = humanizeFilename(localRelativePath);

    items.push({
      fullInput: path.join(liveCaptureAssetsRoot, localRelativePath),
      caption: label,
      alt: label,
    });
  }

  return {
    title,
    description,
    items,
  };
}

function parseGallerySource(source) {
  if (source.kind === "legacy-lightbox") {
    return parseLegacyLightboxPage(source.sourcePage);
  }

  if (source.kind === "historic-live") {
    return parseHistoricLivePage(source);
  }

  throw new Error(`Unsupported gallery source kind: ${source.kind}`);
}

mkdirSync(outputRoot, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

const generatedManifest = {};

for (const categorySource of gallerySources) {
  const categoryDir = path.join(outputRoot, categorySource.category);
  prepareOutputDir(categoryDir);

  let itemCounter = 0;
  const groups = [];

  for (const source of categorySource.groups) {
    const parsed = parseGallerySource(source);
    const items = [];

    for (const item of parsed.items) {
      itemCounter += 1;
      const basename = String(itemCounter).padStart(2, "0");
      const publicBasePath = `/images/legacy/${categorySource.category}`;
      const full = await exportResponsiveAsset({
        inputPath: item.fullInput,
        outputDir: categoryDir,
        publicBasePath,
        baseName: `full-${basename}`,
        widths: fullWidths,
        formats: historicFormats,
        alt: item.alt || item.caption || `${parsed.title} archive photo ${items.length + 1}`,
      });
      const thumb = await exportResponsiveAsset({
        inputPath: item.fullInput,
        outputDir: categoryDir,
        publicBasePath,
        baseName: `thumb-${basename}`,
        widths: thumbWidths,
        formats: historicFormats,
        alt: item.alt || item.caption || `${parsed.title} archive photo ${items.length + 1}`,
      });

      items.push({
        full,
        thumb,
        caption: item.caption,
        alt: item.alt || item.caption || `${parsed.title} archive photo ${items.length + 1}`,
      });
    }

    groups.push({
      title: parsed.title,
      description: parsed.description,
      items,
    });
  }

  const coverImage = groups[0]?.items[0]?.thumb ?? null;
  const itemCount = groups.reduce((total, group) => total + group.items.length, 0);

  generatedManifest[categorySource.category] = {
    coverImage,
    itemCount,
    groups,
  };

  console.log(`${categorySource.category}: exported ${itemCount} archive images`);
}

writeFileSync(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(projectRoot, generatedManifestPath)}`);
