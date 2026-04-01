import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exportResponsiveAsset, prepareOutputDir } from "./image-export-utils.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const legacyRoot = path.join(projectRoot, "docs/site-legacy/www.cooksbytheocean.com");
const outputRoot = path.join(projectRoot, "public/images/historic-cottages");
const generatedDir = path.join(projectRoot, "src/data/generated");
const generatedManifestPath = path.join(generatedDir, "historic-cottage-media.json");

const maxHistoricPhotos = 6;
const historicThumbWidths = [320, 480, 720];
const historicFullWidths = [960, 1280, 1600];
const mapWidths = [640, 960, 1200];
const historicFormats = {
  webp: 64,
  jpg: 68,
};
const mapFormats = {
  webp: 76,
  jpg: 80,
};

const cottageSources = [
  { slug: "big-guilda", title: "Big Guilda", htmlPage: "big_guilda.html", legacyDir: "big_guilda" },
  { slug: "camera", title: "Camera", htmlPage: "camera.html", legacyDir: "camera" },
  { slug: "cones", title: "Cones", htmlPage: "Cones.html", legacyDir: "cones" },
  { slug: "dunes", title: "Dunes", htmlPage: "dunes.html", legacyDir: "dunes" },
  { slug: "little-guilda", title: "Little Guilda", htmlPage: "little_guilda.html", legacyDir: "little_guilda" },
  { slug: "marconi", title: "Marconi", htmlPage: "marconi.html", legacyDir: "marconi" },
  { slug: "new-cabin", title: "New Cabin", htmlPage: "new_cabin.html", legacyDir: "new_cabin" },
  { slug: "oversea", title: "Oversea", htmlPage: "oversea.html", legacyDir: "oversea" },
  { slug: "pines", title: "Pines", htmlPage: "pines.html", legacyDir: "pines" },
  { slug: "pretty-home", title: "Pretty Home", htmlPage: "pretty_home.html", legacyDir: "pretty_home" },
  { slug: "sands", title: "Sands", htmlPage: "sands.html", legacyDir: "sands" },
  { slug: "sandy-scot", title: "Sandy Scot", htmlPage: "sandy_scott.html", legacyDir: "sandy_scott" },
  { slug: "summer-salt", title: "Summer Salt", htmlPage: "summer_salt.html", legacyDir: "summer_salt" },
  { slug: "the-captain", title: "The Captain", htmlPage: "captain.html", legacyDir: "captain" },
];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function parseCottageGallery(htmlPage) {
  const html = readFileSync(path.join(legacyRoot, htmlPage), "utf8");
  const anchorPattern =
    /<a class="lightbox" href="([^"]+)"\s*>[\s\S]*?<img src="([^"]+)"[^>]*>/gi;

  const items = [...html.matchAll(anchorPattern)].map((match, index, matches) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? html.length;
    const block = html.slice(start, end);
    const captionMatch = block.match(/<div class="caption">[\s\S]*?<p>([\s\S]*?)<\/p>/i);

    return {
      fullSource: match[1],
      thumbSource: match[2],
      caption: decodeEntities(stripTags(captionMatch?.[1] ?? "")),
    };
  });

  return items.slice(0, maxHistoricPhotos);
}

function findMapSource(legacyDir) {
  const fullDir = path.join(legacyRoot, "img/cottages", legacyDir);

  if (!statSync(fullDir).isDirectory()) {
    return null;
  }

  const mapFile = readdirSync(fullDir)
    .filter((entry) => /^map/i.test(entry))
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )[0];

  return mapFile ? path.join(fullDir, mapFile) : null;
}

mkdirSync(outputRoot, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

const generatedManifest = {};

for (const cottage of cottageSources) {
  const selectedItems = parseCottageGallery(cottage.htmlPage);
  const mapSource = findMapSource(cottage.legacyDir);
  const cottageOutputDir = path.join(outputRoot, cottage.slug);
  const publicBasePath = `/images/historic-cottages/${cottage.slug}`;
  prepareOutputDir(cottageOutputDir);

  const photos = [];

  for (const [index, item] of selectedItems.entries()) {
    const basename = String(index + 1).padStart(2, "0");
    const inputFull = path.join(legacyRoot, item.fullSource);
    const alt = item.caption || `Historic photo of ${cottage.title}`;
    const full = await exportResponsiveAsset({
      inputPath: inputFull,
      outputDir: cottageOutputDir,
      publicBasePath,
      baseName: `historic-${basename}-full`,
      widths: historicFullWidths,
      formats: historicFormats,
      alt,
    });
    const thumb = await exportResponsiveAsset({
      inputPath: inputFull,
      outputDir: cottageOutputDir,
      publicBasePath,
      baseName: `historic-${basename}-thumb`,
      widths: historicThumbWidths,
      formats: historicFormats,
      alt,
    });

    photos.push({
      full,
      thumb,
      alt,
      caption: item.caption,
    });
  }

  let map = null;

  if (mapSource) {
    map = await exportResponsiveAsset({
      inputPath: mapSource,
      outputDir: cottageOutputDir,
      publicBasePath,
      baseName: "map",
      widths: mapWidths,
      formats: mapFormats,
      alt: `Historic cottage map for ${cottage.title}`,
    });
  }

  generatedManifest[cottage.slug] = {
    title: cottage.title,
    totalHistoricPhotos: photos.length,
    photos,
    map,
  };

  console.log(
    `${cottage.slug}: exported ${photos.length} historic photos${map ? " + map" : ""}`,
  );
}

writeFileSync(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(projectRoot, generatedManifestPath)}`);
