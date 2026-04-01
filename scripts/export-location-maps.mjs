import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exportResponsiveAsset, prepareOutputDir } from "./image-export-utils.mjs";

const mapWidths = [640, 960, 1200];
const mapFormats = {
  webp: 78,
  jpg: 80,
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputRoot = path.join(projectRoot, "public/images/historic/maps");
const generatedDir = path.join(projectRoot, "src/data/generated");
const generatedManifestPath = path.join(generatedDir, "location-maps.json");

const mapSources = [
  {
    key: "property",
    inputPath: path.join(
      projectRoot,
      "docs/historic/live-capture/assets/NewBasicCutout%20ofCooks%20aa.jpg",
    ),
    alt: "Historic map of Cook's by the Ocean showing the cottages and the layout of the property.",
    baseName: "property-map",
  },
  {
    key: "capeCod",
    inputPath: path.join(
      projectRoot,
      "docs/site-legacy/www.cooksbytheocean.com/img/map-image.png",
    ),
    alt: "Regional map of Cape Cod for orientation before following the directions to Cook's by the Ocean.",
    baseName: "cape-cod-map",
  },
];

prepareOutputDir(outputRoot);

const generatedManifest = {};

for (const mapSource of mapSources) {
  generatedManifest[mapSource.key] = await exportResponsiveAsset({
    inputPath: mapSource.inputPath,
    outputDir: outputRoot,
    publicBasePath: "/images/historic/maps",
    baseName: mapSource.baseName,
    widths: mapWidths,
    formats: mapFormats,
    alt: mapSource.alt,
  });

  console.log(`${mapSource.key}: exported responsive map variants`);
}

writeFileSync(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(projectRoot, generatedManifestPath)}`);
