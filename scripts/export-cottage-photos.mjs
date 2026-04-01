import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  exportResponsiveAsset,
  exportSingleJpegAsset,
  prepareOutputDir,
} from "./image-export-utils.mjs";
import { cottagePhotoManifest } from "./cottage-photo-manifest.mjs";

const cardWidths = [320, 480, 720];
const heroWidths = [640, 960, 1280, 1600];
const galleryWidth = 1200;
const responsiveFormats = {
  avif: 50,
  webp: 72,
  jpg: 76,
};
const galleryJpegQuality = 76;

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

const generatedManifest = {};

for (const cottage of cottagePhotoManifest) {
  const sourceDir = path.join(projectRoot, cottage.sourceDir);
  const sourceFiles = listSourceFiles(sourceDir);

  if (sourceFiles.length === 0) {
    throw new Error(`No source photos found for ${cottage.slug} in ${cottage.sourceDir}`);
  }

  const publicBasePath = `/images/cottages/${cottage.slug}`;
  const cottageOutputDir = path.join(outputRoot, cottage.slug);
  prepareOutputDir(cottageOutputDir);

  const coverSource = sourceFiles[0];
  const card = await exportResponsiveAsset({
    inputPath: coverSource,
    outputDir: cottageOutputDir,
    publicBasePath,
    baseName: "card",
    widths: cardWidths,
    formats: responsiveFormats,
    alt: `View of ${cottage.title} cottage`,
  });

  const hero = await exportResponsiveAsset({
    inputPath: coverSource,
    outputDir: cottageOutputDir,
    publicBasePath,
    baseName: "hero",
    widths: heroWidths,
    formats: responsiveFormats,
    alt: `View of ${cottage.title} cottage`,
  });

  const galleryPaths = [];

  for (const [index, inputPath] of sourceFiles.slice(1).entries()) {
    const asset = await exportSingleJpegAsset({
      inputPath,
      outputDir: cottageOutputDir,
      publicBasePath,
      baseName: `gallery-${String(index + 1).padStart(2, "0")}`,
      width: galleryWidth,
      quality: galleryJpegQuality,
    });

    galleryPaths.push({
      src: asset.src,
      width: asset.width,
      height: asset.height,
      alt: `Interior view of ${cottage.title} cottage`,
      caption: "",
    });
  }

  generatedManifest[cottage.slug] = {
    title: cottage.title,
    card,
    hero,
    photos: galleryPaths,
    totalPhotos: sourceFiles.length,
  };

  console.log(
    `${cottage.slug}: exported ${sourceFiles.length} photos (${galleryPaths.length} gallery, responsive card + hero)`,
  );
}

writeFileSync(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(projectRoot, generatedManifestPath)}`);
