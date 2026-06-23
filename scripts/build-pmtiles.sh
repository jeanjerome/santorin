#!/usr/bin/env bash
# Build the offline vector basemap for Santorin.
#
# Downloads only the tiles inside the Santorin bounding box from the public
# Protomaps daily build using HTTP range requests (no full-planet download),
# producing a small PMTiles archive the app serves for offline use.
#
# Requires the `pmtiles` CLI: https://github.com/protomaps/go-pmtiles/releases
#   brew install pmtiles      # macOS
#
# Usage: bash scripts/build-pmtiles.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUT_DIR="$ROOT_DIR/public/basemap"
OUT_FILE="$OUT_DIR/santorini.pmtiles"

# Santorin bounding box: min_lon,min_lat,max_lon,max_lat
BBOX="25.30,36.30,25.54,36.50"

# Latest public Protomaps basemap build (full planet, read via range requests).
SOURCE_URL="${PROTOMAPS_SOURCE:-https://build.protomaps.com/20240101.pmtiles}"

if ! command -v pmtiles >/dev/null 2>&1; then
  echo "Erreur : la CLI 'pmtiles' est introuvable." >&2
  echo "Installez-la : brew install pmtiles (macOS)" >&2
  echo "ou téléchargez-la depuis https://github.com/protomaps/go-pmtiles/releases" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "Extraction de la zone de Santorin depuis $SOURCE_URL ..."
pmtiles extract "$SOURCE_URL" "$OUT_FILE" --bbox="$BBOX"

echo "Basemap hors-ligne écrite : $OUT_FILE"
ls -lh "$OUT_FILE"
