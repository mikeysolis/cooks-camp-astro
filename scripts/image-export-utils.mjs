import { createHash } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

export function prepareOutputDir(outputDir) {
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });
}

function hashBuffer(buffer) {
  return createHash("sha1").update(buffer).digest("hex").slice(0, 10);
}

function createPipeline(inputPath, width, animated = false) {
  return sharp(inputPath, { animated })
    .rotate()
    .resize({
      width,
      height: width,
      fit: "inside",
      withoutEnlargement: true,
    });
}

async function renderVariantBuffer(inputPath, width, formatName, quality, animated = false) {
  const pipeline = createPipeline(inputPath, width, animated);

  if (formatName === "avif") {
    return pipeline
      .avif({
        quality,
        effort: 4,
      })
      .toBuffer({ resolveWithObject: true });
  }

  if (formatName === "webp") {
    return pipeline
      .webp({
        quality,
        effort: 4,
      })
      .toBuffer({ resolveWithObject: true });
  }

  if (formatName === "jpg") {
    return pipeline
      .jpeg({
        quality,
        mozjpeg: true,
      })
      .toBuffer({ resolveWithObject: true });
  }

  throw new Error(`Unsupported format: ${formatName}`);
}

export async function exportResponsiveAsset({
  inputPath,
  outputDir,
  publicBasePath,
  baseName,
  widths,
  formats,
  alt,
  animated = false,
}) {
  const responsiveFormats = {};

  for (const [formatName, quality] of Object.entries(formats)) {
    const variants = [];
    const seenDimensions = new Set();

    for (const requestedWidth of widths) {
      const { data, info } = await renderVariantBuffer(
        inputPath,
        requestedWidth,
        formatName,
        quality,
        animated,
      );
      const dimensionKey = `${info.width}x${info.height}`;

      if (seenDimensions.has(dimensionKey)) {
        continue;
      }

      seenDimensions.add(dimensionKey);

      const hash = hashBuffer(data);
      const fileName = `${baseName}-${info.width}-${hash}.${formatName}`;
      writeFileSync(path.join(outputDir, fileName), data);

      variants.push({
        src: `${publicBasePath}/${fileName}`,
        width: info.width,
        height: info.height,
      });
    }

    responsiveFormats[formatName] = variants;
  }

  const fallback =
    responsiveFormats.jpg?.at(-1) ??
    responsiveFormats.webp?.at(-1) ??
    responsiveFormats.avif?.at(-1);

  if (!fallback) {
    throw new Error(`No fallback image generated for ${baseName}`);
  }

  return {
    fallback,
    formats: responsiveFormats,
    width: fallback.width,
    height: fallback.height,
    alt,
  };
}

export async function exportSingleJpegAsset({
  inputPath,
  outputDir,
  publicBasePath,
  baseName,
  width,
  quality,
  animated = false,
}) {
  const { data, info } = await renderVariantBuffer(inputPath, width, "jpg", quality, animated);
  const hash = hashBuffer(data);
  const fileName = `${baseName}-${info.width}-${hash}.jpg`;
  writeFileSync(path.join(outputDir, fileName), data);

  return {
    src: `${publicBasePath}/${fileName}`,
    width: info.width,
    height: info.height,
  };
}
