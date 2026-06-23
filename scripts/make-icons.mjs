#!/usr/bin/env node
// Render the PWA icon set from assets/icon-source.svg using sharp. Produces the
// standard 192/512 icons, a maskable 512 (with safe padding so iOS/Android can
// crop it), and the iOS apple-touch-icon.

import { readFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "assets/icon-source.svg");
const OUT_DIR = resolve(ROOT, "public/icons");

const BACKGROUND = "#155263";

async function renderPlain(svg, size, file) {
  await sharp(svg).resize(size, size).png().toFile(resolve(OUT_DIR, file));
}

async function renderMaskable(svg, size, file) {
  // Maskable icons need ~20% safe padding around the artwork.
  const inner = Math.round(size * 0.78);
  const pad = Math.round((size - inner) / 2);
  const art = await sharp(svg).resize(inner, inner).png().toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BACKGROUND,
    },
  })
    .composite([{ input: art, top: pad, left: pad }])
    .png()
    .toFile(resolve(OUT_DIR, file));
}

async function main() {
  const svg = await readFile(SRC);
  await mkdir(OUT_DIR, { recursive: true });

  await renderPlain(svg, 192, "icon-192.png");
  await renderPlain(svg, 512, "icon-512.png");
  await renderPlain(svg, 180, "apple-touch-icon.png");
  await renderMaskable(svg, 512, "icon-maskable-512.png");

  console.log(`Icônes générées → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error("Échec de la génération des icônes :", err);
  process.exit(1);
});
