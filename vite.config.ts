import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Single-page offline-first map. The service worker precaches the app shell,
// the POI seed, and (when present) the bundled vector basemap so the whole
// thing works with no network once it has been opened once.
export default defineConfig({
  // Served from a GitHub Pages project site at /santorin/. Vite rewrites asset
  // URLs accordingly; runtime fetches use import.meta.env.BASE_URL to match.
  base: "/santorin/",
  build: {
    target: "es2022",
    sourcemap: true,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png", "data/pois.json"],
      manifest: {
        name: "Santorin — Lieux d'intérêt",
        short_name: "Santorin",
        description:
          "Carte hors-ligne des lieux d'intérêt de Santorin : plages, supermarchés, restaurants, laveries, sites culturels.",
        lang: "fr",
        theme_color: "#1f6f8b",
        background_color: "#f4f1ea",
        display: "standalone",
        orientation: "portrait",
        start_url: "/santorin/",
        scope: "/santorin/",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // The basemap can be large; raise the precache ceiling so the PMTiles
        // archive and the POI seed are stored for offline use.
        maximumFileSizeToCacheInBytes: 60 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,png,svg,json,pmtiles}"],
        runtimeCaching: [
          {
            // OSM raster fallback used while online when no PMTiles is bundled.
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "osm-raster-tiles",
              expiration: { maxEntries: 800, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
