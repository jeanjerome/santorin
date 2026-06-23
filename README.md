# Santorin — Lieux d'intérêt

Carte personnelle des lieux d'intérêt de Santorin (plages, supermarchés,
restaurants, laveries, sites culturels, services), conçue pour un usage au
quotidien pendant les vacances. L'application affiche chaque lieu sur une carte
et permet d'envoyer ses coordonnées GPS vers **Apple Plans**, **Google Maps** ou
**Waze** en un tap.

C'est une **PWA** (application web installable) : pas besoin de l'App Store ni
d'un compte développeur Apple. On l'ouvre dans Safari sur l'iPhone, on l'ajoute
à l'écran d'accueil, et elle se comporte comme une app native — y compris hors
ligne une fois ouverte une première fois.

## Pile technique

- **Vite** + **TypeScript** (aucun framework UI, DOM natif)
- **Leaflet** pour la carte
- **PMTiles** + **protomaps-leaflet** pour un fond de carte vectoriel hors ligne
  (avec repli sur les tuiles raster OpenStreetMap quand le PMTiles est absent)
- **vite-plugin-pwa** (Workbox) pour le service worker et le manifeste

## Structure

```
data/        Corpus source (GeoJSON + KML)
docs/        Guides pratiques de Santorin
assets/      Source SVG de l'icône
scripts/     Génération du seed, des icônes et du fond de carte
src/
  data/      Modèle POI, chargement, catégories
  map/       Création de la carte, fond de carte, marqueurs
  ui/        Barre de filtres, fiche détail, liste
  lib/       Liens profonds de navigation (Apple/Google/Waze)
  styles/    Tokens et styles globaux
public/      Artefacts générés (pois.json, icônes, basemap) — non versionnés
```

## Démarrage

```bash
npm install
npm run seed     # data/*.geojson -> public/data/pois.json
npm run icons    # assets/icon-source.svg -> public/icons/*
npm run dev      # serveur de dev
```

`npm run seed` et `npm run icons` ne sont à relancer qu'après modification du
corpus ou de l'icône.

## Fond de carte hors ligne (optionnel)

Sans fichier PMTiles, l'app utilise les tuiles raster OpenStreetMap (nécessite
une connexion la première fois ; elles sont ensuite mises en cache). Pour un
fond de carte vectoriel entièrement hors ligne :

```bash
brew install pmtiles          # CLI Protomaps (macOS)
npm run basemap               # extrait la zone de Santorin -> public/basemap/santorini.pmtiles
```

L'app détecte automatiquement le fichier (signature PMTiles) et bascule sur le
rendu vectoriel.

## Build de production

```bash
npm run build     # vérifie les types puis produit dist/
npm run preview   # sert dist/ localement
```

## Déploiement (GitHub Pages)

L'app est hébergée sur GitHub Pages à l'adresse **https://jeanjerome.github.io/santorin/**.

Le déploiement est automatique via GitHub Actions (`.github/workflows/deploy.yml`) :
chaque `git push` sur `main` régénère le seed et les icônes, build le projet et
publie `dist/` sur Pages. Aucune étape manuelle.

> Le site est servi sous le sous-chemin `/santorin/` : c'est pourquoi `base` est
> fixé à `/santorin/` dans `vite.config.ts` et les `fetch` runtime utilisent
> `import.meta.env.BASE_URL`. Si le repo est renommé, mettre ces deux valeurs à
> jour.

## Installation sur iPhone

1. Ouvrir **https://jeanjerome.github.io/santorin/** dans **Safari**.
2. Bouton Partager → **Sur l'écran d'accueil**.
3. Lancer l'app depuis l'icône. Après la première ouverture, carte et données
   fonctionnent hors ligne (le HTTPS de Pages active le service worker).

## Données

Le corpus (`data/santorini-corpus-restreint.geojson`) contient 30 lieux, dont 16
géolocalisés. Les lieux sans coordonnées restent visibles dans la liste avec un
badge « Sans GPS » et proposent une recherche par nom dans l'app de navigation.
Pour ajouter ou corriger un lieu, éditer le GeoJSON puis relancer `npm run seed`.
