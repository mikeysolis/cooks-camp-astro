import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const legacyRoot = path.join(projectRoot, "docs/site-legacy/www.cooksbytheocean.com");
const outputRoot = path.join(projectRoot, "public/images/legacy");
const generatedDir = path.join(projectRoot, "src/data/generated");
const generatedManifestPath = path.join(generatedDir, "legacy-gallery.json");

const gallerySources = [
  {
    category: "beach",
    groups: [
      {
        sourcePage: "gallery_beach.html",
      },
    ],
  },
  {
    category: "camps",
    groups: [
      {
        sourcePage: "gallery_camps.html",
      },
    ],
  },
  {
    category: "sky-wildlife",
    groups: [
      {
        sourcePage: "gallery_aerial.html",
      },
      {
        sourcePage: "gallery_wild.html",
      },
    ],
  },
  {
    category: "historic",
    groups: [
      {
        sourcePage: "gallery_historic.html",
      },
    ],
  },
];

const fullWidth = 1600;
const thumbWidth = 720;
const jpegQuality = 78;

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

function parseGalleryPage(sourcePage) {
  const filePath = path.join(legacyRoot, sourcePage);
  const html = readFileSync(filePath, "utf8");
  const titleMatch = html.match(/<h1>([\s\S]*?)<\/h1>/i);
  const descriptionMatch = html.match(/<h4[^>]*class="page-description[^"]*"[^>]*>([\s\S]*?)<\/h4>/i);
  const anchorPattern =
    /<a class="lightbox" href="([^"]+)">[\s\S]*?<img src="([^"]+)"[^>]*>/gi;

  const matches = [...html.matchAll(anchorPattern)];
  const items = matches.map((match, index) => {
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

  return {
    title: decodeEntities(stripTags(titleMatch?.[1] ?? sourcePage)),
    description: decodeEntities(stripTags(descriptionMatch?.[1] ?? "")),
    items,
  };
}

async function exportJpeg(inputPath, outputPath, width) {
  await sharp(inputPath, { animated: true })
    .rotate()
    .resize({
      width,
      height: width,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: jpegQuality,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

mkdirSync(outputRoot, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

const generatedManifest = {};

for (const categorySource of gallerySources) {
  const categoryDir = path.join(outputRoot, categorySource.category);
  mkdirSync(categoryDir, { recursive: true });

  let itemCounter = 0;
  const groups = [];

  for (const source of categorySource.groups) {
    const parsed = parseGalleryPage(source.sourcePage);
    const items = [];

    for (const item of parsed.items) {
      itemCounter += 1;
      const basename = String(itemCounter).padStart(2, "0");
      const fullOutput = path.join(categoryDir, `full-${basename}.jpg`);
      const thumbOutput = path.join(categoryDir, `thumb-${basename}.jpg`);
      const fullInput = path.join(legacyRoot, item.fullSource);

      await exportJpeg(fullInput, fullOutput, fullWidth);
      await exportJpeg(fullInput, thumbOutput, thumbWidth);

      items.push({
        full: `/images/legacy/${categorySource.category}/full-${basename}.jpg`,
        thumb: `/images/legacy/${categorySource.category}/thumb-${basename}.jpg`,
        caption: item.caption,
        alt: item.caption || `${parsed.title} archive photo ${items.length + 1}`,
      });
    }

    groups.push({
      title: parsed.title,
      description: parsed.description,
      items,
    });
  }

  const coverImage = groups[0]?.items[0]?.thumb ?? "";
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
