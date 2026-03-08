import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { cottagePhotoManifest } from "./cottage-photo-manifest.mjs";

const heroWidth = 1600;
const galleryWidth = 1200;
const jpegQuality = 80;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputRoot = path.join(projectRoot, "public/images/cottages");
const generatedDir = path.join(projectRoot, "src/data/generated");
const generatedManifestPath = path.join(generatedDir, "cottage-photos.json");

function listSourceFiles(sourceDir) {
  return readdirSync(sourceDir)
    .filter((entry) => /\.(jpe?g|png)$/i.test(entry))
    .map((entry) => path.join(sourceDir, entry))
    .filter((entry) => statSync(entry).isFile())
    .sort((left, right) =>
      path.basename(left).localeCompare(path.basename(right), undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
}

async function exportJpeg(inputPath, outputPath, maxDimension) {
  return sharp(inputPath)
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
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

for (const cottage of cottagePhotoManifest) {
  const sourceDir = path.join(projectRoot, cottage.sourceDir);
  const sourceFiles = listSourceFiles(sourceDir);

  if (sourceFiles.length === 0) {
    throw new Error(`No source photos found for ${cottage.slug} in ${cottage.sourceDir}`);
  }

  const cottageOutputDir = path.join(outputRoot, cottage.slug);
  mkdirSync(cottageOutputDir, { recursive: true });

  const heroOutputPath = path.join(cottageOutputDir, "hero.jpg");
  const heroInfo = await exportJpeg(sourceFiles[0], heroOutputPath, heroWidth);

  const galleryPaths = [];

  for (const [index, inputPath] of sourceFiles.slice(1).entries()) {
    const fileName = `gallery-${String(index + 1).padStart(2, "0")}.jpg`;
    const outputPath = path.join(cottageOutputDir, fileName);
    const info = await exportJpeg(inputPath, outputPath, galleryWidth);
    galleryPaths.push({
      src: `/images/cottages/${cottage.slug}/${fileName}`,
      width: info.width,
      height: info.height,
      alt: `${cottage.title} photo ${index + 1}`,
      caption: "",
    });
  }

  generatedManifest[cottage.slug] = {
    title: cottage.title,
    hero: {
      src: `/images/cottages/${cottage.slug}/hero.jpg`,
      width: heroInfo.width,
      height: heroInfo.height,
      alt: `Exterior or interior view of ${cottage.title}`,
    },
    photos: galleryPaths,
    totalPhotos: sourceFiles.length,
  };

  console.log(
    `${cottage.slug}: exported ${sourceFiles.length} photos (${galleryPaths.length} gallery, 1 hero)`,
  );
}

writeFileSync(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(projectRoot, generatedManifestPath)}`);
