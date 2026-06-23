#!/usr/bin/env node
// Render the PWA icon set from assets/icon-source.png (a full-bleed, rounded
// Santorin app icon with transparent corners).
//
// - icon-192 / icon-512: kept as-is (purpose "any"); transparent corners are
//   fine and let the platform show the icon's own rounded shape.
// - apple-touch-icon: flattened opaque (iOS dislikes transparency and would
//   otherwise show black) and iOS applies its own rounded mask.
// - icon-maskable-512: full-bleed and flattened opaque. The icon is already an
//   edge-to-edge design with its subject centered inside the safe zone, so the
//   platform's circle/squircle crop only trims background.
// - icon.png (in assets/): a compact, committed image for the README.

import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "assets/icon-source.png");
const OUT_DIR = resolve(ROOT, "public/icons");

// Only visible in the rounded corners that the platform mask crops away.
const BACKGROUND = "#0a6cc0";

async function plain(size, file) {
  await sharp(SRC).resize(size, size).png().toFile(resolve(OUT_DIR, file));
}

async function opaque(size, file) {
  await sharp(SRC)
    .resize(size, size)
    .flatten({ background: BACKGROUND })
    .png()
    .toFile(resolve(OUT_DIR, file));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  await plain(192, "icon-192.png");
  await plain(512, "icon-512.png");
  await opaque(180, "apple-touch-icon.png");
  await opaque(512, "icon-maskable-512.png");

  // Compact README image (committed, kept light).
  await sharp(SRC)
    .resize(256, 256)
    .png({ compressionLevel: 9 })
    .toFile(resolve(ROOT, "assets/icon.png"));

  console.log(`Icônes générées → ${OUT_DIR} (+ assets/icon.png pour le README)`);
}

main().catch((err) => {
  console.error("Échec de la génération des icônes :", err);
  process.exit(1);
});
