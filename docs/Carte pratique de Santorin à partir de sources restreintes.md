# Carte pratique de Santorin à partir d’un corpus restreint

## Résumé exécutif

Le corpus imposé — **routard.com, generationvoyage.fr, lonelyplanet.fr, monblogvoyage.fr, thehappytraveler.ca, wikivoyage.org** — permet de cartographier correctement les **plages**, les **sites culturels**, quelques **restaurants** et un point de **transport**, mais il documente très mal les **supermarchés**, les **laveries**, les **pharmacies** et les **ATM**. En pratique, la couche cartographique peut donc être rendue proprement pour les lieux touristiques et patrimoniaux, tandis que les lieux logistiques devront souvent rester au statut **non précisé** pour l’adresse exacte et le GPS.

Dans ce jeu de données, **30 lieux** sont repris depuis la recherche précédente. Sur ces 30 lieux, **16** disposent d’une coordonnée confirmée directement dans les sources autorisées ; **14** restent avec `gps:null` parce qu’aucune coordonnée exploitable n’a été trouvée dans le corpus autorisé. Les lacunes portent presque entièrement sur les supermarchés, les laveries, **Perivolos Beach**, **Monolithos Beach** et **Metaxi Mas**.

La méthode suivie est stricte. Quand une source mieux classée dans votre ordre de préférence mentionnait un lieu **sans** coordonnée exploitable, j’ai retenu la **première source autorisée qui donnait effectivement un point cartographiable**, tout en le signalant. Quand seule une localisation textuelle existait, l’adresse et le GPS sont indiqués **non précisé**.

## Sources retenues et méthode

J’ai utilisé uniquement les pages suivantes dans le corpus autorisé. Elles servent à la fois de base de confirmation et de clé de lecture pour les codes source du tableau principal.

```text
S1 = https://nl.wikivoyage.org/wiki/Santorini
S2 = https://en.wikivoyage.org/wiki/Akrotiri
S3 = https://en.wikivoyage.org/wiki/Fira
S4 = https://en.wikivoyage.org/wiki/Imerovigli
S5 = https://en.wikivoyage.org/wiki/Vlychada
S6 = https://en.wikivoyage.org/wiki/Perissa
S7 = https://www.lonelyplanet.fr/article/8-des-plus-belles-plages-de-santorin
S8 = https://www.routard.com/forums/t/entre-ciel-et-mer-une-semaine-magnifique-a-santorin/350120
```

Les trois autres domaines autorisés — **generationvoyage.fr**, **monblogvoyage.fr** et **thehappytraveler.ca** — n’ont pas apporté, dans le matériau déjà recueilli, de coordonnées exploitables supplémentaires pour les lieux de la liste antérieure. Les points les mieux documentés se concentrent autour de entity["city","Fira","santorini, greece"], entity["place","Akrotiri","santorini, greece"], entity["city","Imerovigli","santorini, greece"], Kamari, Perissa et Vlychada.

## Tableau des lieux

| Lieu | Catégorie | Label court | Adresse confirmée | GPS confirmé | Source | Note |
|---|---|---|---|---|---|---|
| AB Vassilopoulos | Supermarché | AB Fira | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Lidl Hellas | Supermarché | Lidl Fira | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Masoutis Pyrgos | Supermarché | Masoutis Pyrgos | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Masoutis Emporio | Supermarché | Masoutis Emporio | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Sklavenitis Mesaria | Supermarché | Sklavenitis Mesaria | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Kritikos Mesaria | Supermarché | Kritikos Mesaria | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Smart Wash Santorini | Laverie | Smart Wash | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| AD Laundry | Laverie | AD Laundry | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Pro Laundry Santorini | Laverie | Pro Laundry | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Crystal Bee Santorini | Laverie | Crystal Bee | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Santorini Laundry | Laverie | Santorini Laundry | non précisé | non précisé | — | introuvable dans le corpus autorisé |
| Red Beach | Plage | Red Beach | Akrotiri, Santorin | 36.348878, 25.393090 | S1 | coordonnée exploitable |
| White Beach | Plage | White Beach | Akrotiri, Santorin | 36.350470, 25.382370 | S2 | coordonnée exploitable |
| Kamari Beach | Plage | Kamari Beach | Kamari, Santorin | 36.373093, 25.483102 | S1 | coordonnée exploitable |
| Perissa Beach | Plage | Perissa Beach | Perissa, Santorin | 36.356700, 25.476000 | S6 | coordonnée exploitable |
| Perivolos Beach | Plage | Perivolos Beach | Perivolos, Santorin | non précisé | S7 | plage citée, pas de géocode exploitable |
| Vlychada Beach | Plage | Vlychada Beach | Vlychada, Santorin | 36.339393, 25.431821 | S1 | coordonnée exploitable |
| Monolithos Beach | Plage | Monolithos Beach | Monolithos, Santorin | non précisé | S1 | le corpus repère Monolithos, pas un point plage exact |
| Site archéologique d’Akrotiri | Site culturel | Akrotiri site | Akrotiri, Santorin | 36.351000, 25.402710 | S1 | coordonnée exploitable |
| Musée de la Préhistoire de Théra | Site culturel | Musée préhistoire | Fira, Santorin | 36.418500, 25.437000 | S3 | coordonnée exploitable |
| Ancient Thera | Site culturel | Ancient Thera | Mesa Vouno, Kamari, Santorin | 36.364400, 25.477600 | S1 | coordonnée exploitable |
| Musée archéologique de Théra | Site culturel | Musée archéo | Fira, Santorin | 36.417800, 25.431700 | S3 | coordonnée exploitable |
| Skaros Rock | Site culturel | Skaros Rock | Imerovigli, Santorin | 36.431703, 25.417523 | S4 | coordonnée exploitable |
| Phare d’Akrotiri | Site culturel | Phare Akrotiri | Akrotiri, Santorin | 36.357790, 25.357060 | S2 | coordonnée exploitable |
| Monastère de Profitis Ilias | Site culturel | Profitis Ilias | près de Pyrgos, Santorin | 36.368214, 25.463546 | S1 | coordonnée exploitable |
| Selene | Restaurant | Selene | Fira, Santorin | 36.421470, 25.430780 | S3 | coordonnée exploitable |
| The Athenian House | Restaurant | Athenian House | Imerovigli, Santorin | 36.432974, 25.421376 | S4 | coordonnée exploitable |
| To Psaraki | Restaurant | To Psaraki | Vlychada, Santorin | 36.337935, 25.434910 | S5 | géocode exploitable ; nom aussi corroboré par S8 |
| Metaxi Mas | Restaurant | Metaxi Mas | Exo Gonia, Santorin | non précisé | S8 | restaurant situé textuellement, sans géocode exploitable |
| Gare routière de Fira | Service pratique | Bus Fira | Fira, Santorin | 36.416546, 25.433430 | S1 | coordonnée exploitable |

## Légende et comptage

| Catégorie | Pictogramme | Nom d’icône simple | Total lieux | GPS confirmé | GPS non précisé |
|---|---|---|---:|---:|---:|
| Supermarché | 🛒 | shopping-cart | 6 | 0 | 6 |
| Laverie | 🫧 | bubbles | 5 | 0 | 5 |
| Plage | 🏖️ | beach | 7 | 5 | 2 |
| Site culturel | 🏛️ | landmark | 7 | 7 | 0 |
| Restaurant | 🍽️ | restaurant | 4 | 3 | 1 |
| Service pratique | 🚌 | bus | 1 | 1 | 0 |
| **Total** |  |  | **30** | **16** | **14** |

La légende recommandée est simple : **🛒 Supermarché**, **🫧 Laverie**, **🏖️ Plage**, **🏛️ Site culturel**, **🍽️ Restaurant**, **🚌 Service pratique**. Cette séparation fonctionne très bien dans Google My Maps comme dans QGIS.

## GeoJSON et téléchargement

Le bloc ci-dessous est un **GeoJSON `FeatureCollection` complet** reprenant tous les lieux. Quand le GPS n’est pas confirmé dans le corpus autorisé, `gps` vaut `null`, `geometry` vaut `null` et `source_note` explicite la limite.

```json
{
  "type": "FeatureCollection",
  "name": "santorini_corpus_restreint",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "AB Vassilopoulos",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "AB Fira"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Lidl Hellas",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "Lidl Fira"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Masoutis Pyrgos",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "Masoutis Pyrgos"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Masoutis Emporio",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "Masoutis Emporio"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Sklavenitis Mesaria",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "Sklavenitis Mesaria"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Kritikos Mesaria",
        "category": "Supermarché",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "shopping-cart",
        "label": "Kritikos Mesaria"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Smart Wash Santorini",
        "category": "Laverie",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "bubbles",
        "label": "Smart Wash"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "AD Laundry",
        "category": "Laverie",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "bubbles",
        "label": "AD Laundry"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Pro Laundry Santorini",
        "category": "Laverie",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "bubbles",
        "label": "Pro Laundry"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Crystal Bee Santorini",
        "category": "Laverie",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "bubbles",
        "label": "Crystal Bee"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Santorini Laundry",
        "category": "Laverie",
        "address": "non précisé",
        "gps": null,
        "source": null,
        "source_note": "Introuvable dans les six sources autorisées.",
        "pictogram": "bubbles",
        "label": "Santorini Laundry"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Red Beach",
        "category": "Plage",
        "address": "Akrotiri, Santorin",
        "gps": {
          "lat": 36.348878,
          "lon": 25.39309
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "beach",
        "label": "Red Beach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.39309, 36.348878]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "White Beach",
        "category": "Plage",
        "address": "Akrotiri, Santorin",
        "gps": {
          "lat": 36.35047,
          "lon": 25.38237
        },
        "source": "https://en.wikivoyage.org/wiki/Akrotiri",
        "pictogram": "beach",
        "label": "White Beach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.38237, 36.35047]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Kamari Beach",
        "category": "Plage",
        "address": "Kamari, Santorin",
        "gps": {
          "lat": 36.373093,
          "lon": 25.483102
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "beach",
        "label": "Kamari Beach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.483102, 36.373093]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Perissa Beach",
        "category": "Plage",
        "address": "Perissa, Santorin",
        "gps": {
          "lat": 36.3567,
          "lon": 25.476
        },
        "source": "https://en.wikivoyage.org/wiki/Perissa",
        "pictogram": "beach",
        "label": "Perissa Beach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.476, 36.3567]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Perivolos Beach",
        "category": "Plage",
        "address": "Perivolos, Santorin",
        "gps": null,
        "source": "https://www.lonelyplanet.fr/article/8-des-plus-belles-plages-de-santorin",
        "source_note": "Plage mentionnée sans coordonnées exploitables.",
        "pictogram": "beach",
        "label": "Perivolos Beach"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Vlychada Beach",
        "category": "Plage",
        "address": "Vlychada, Santorin",
        "gps": {
          "lat": 36.339393,
          "lon": 25.431821
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "beach",
        "label": "Vlychada Beach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.431821, 36.339393]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Monolithos Beach",
        "category": "Plage",
        "address": "Monolithos, Santorin",
        "gps": null,
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "source_note": "Le corpus repère Monolithos, pas un point plage exact.",
        "pictogram": "beach",
        "label": "Monolithos Beach"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Site archéologique d’Akrotiri",
        "category": "Site culturel",
        "address": "Akrotiri, Santorin",
        "gps": {
          "lat": 36.351,
          "lon": 25.40271
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "landmark",
        "label": "Akrotiri site"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.40271, 36.351]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Musée de la Préhistoire de Théra",
        "category": "Site culturel",
        "address": "Fira, Santorin",
        "gps": {
          "lat": 36.4185,
          "lon": 25.437
        },
        "source": "https://en.wikivoyage.org/wiki/Fira",
        "pictogram": "landmark",
        "label": "Musée préhistoire"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.437, 36.4185]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Ancient Thera",
        "category": "Site culturel",
        "address": "Mesa Vouno, Kamari, Santorin",
        "gps": {
          "lat": 36.3644,
          "lon": 25.4776
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "landmark",
        "label": "Ancient Thera"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.4776, 36.3644]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Musée archéologique de Théra",
        "category": "Site culturel",
        "address": "Fira, Santorin",
        "gps": {
          "lat": 36.4178,
          "lon": 25.4317
        },
        "source": "https://en.wikivoyage.org/wiki/Fira",
        "pictogram": "landmark",
        "label": "Musée archéo"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.4317, 36.4178]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Skaros Rock",
        "category": "Site culturel",
        "address": "Imerovigli, Santorin",
        "gps": {
          "lat": 36.431703,
          "lon": 25.417523
        },
        "source": "https://en.wikivoyage.org/wiki/Imerovigli",
        "pictogram": "landmark",
        "label": "Skaros Rock"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.417523, 36.431703]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Phare d’Akrotiri",
        "category": "Site culturel",
        "address": "Akrotiri, Santorin",
        "gps": {
          "lat": 36.35779,
          "lon": 25.35706
        },
        "source": "https://en.wikivoyage.org/wiki/Akrotiri",
        "pictogram": "landmark",
        "label": "Phare Akrotiri"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.35706, 36.35779]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Monastère de Profitis Ilias",
        "category": "Site culturel",
        "address": "près de Pyrgos, Santorin",
        "gps": {
          "lat": 36.368214,
          "lon": 25.463546
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "landmark",
        "label": "Profitis Ilias"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.463546, 36.368214]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Selene",
        "category": "Restaurant",
        "address": "Fira, Santorin",
        "gps": {
          "lat": 36.42147,
          "lon": 25.43078
        },
        "source": "https://en.wikivoyage.org/wiki/Fira",
        "pictogram": "restaurant",
        "label": "Selene"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.43078, 36.42147]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "The Athenian House",
        "category": "Restaurant",
        "address": "Imerovigli, Santorin",
        "gps": {
          "lat": 36.432974,
          "lon": 25.421376
        },
        "source": "https://en.wikivoyage.org/wiki/Imerovigli",
        "pictogram": "restaurant",
        "label": "Athenian House"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.421376, 36.432974]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "To Psaraki",
        "category": "Restaurant",
        "address": "Vlychada, Santorin",
        "gps": {
          "lat": 36.337935,
          "lon": 25.43491
        },
        "source": "https://en.wikivoyage.org/wiki/Vlychada",
        "pictogram": "restaurant",
        "label": "To Psaraki"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.43491, 36.337935]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Metaxi Mas",
        "category": "Restaurant",
        "address": "Exo Gonia, Santorin",
        "gps": null,
        "source": "https://www.routard.com/forums/t/entre-ciel-et-mer-une-semaine-magnifique-a-santorin/350120",
        "source_note": "Restaurant situé textuellement à Exo Gonia, sans coordonnées exploitables.",
        "pictogram": "restaurant",
        "label": "Metaxi Mas"
      },
      "geometry": null
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Gare routière de Fira",
        "category": "Service pratique",
        "address": "Fira, Santorin",
        "gps": {
          "lat": 36.416546,
          "lon": 25.43343
        },
        "source": "https://nl.wikivoyage.org/wiki/Santorini",
        "pictogram": "bus",
        "label": "Bus Fira"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.43343, 36.416546]
      }
    }
  ]
}
```

Pour un téléchargement local fiable, la méthode la plus robuste est d’enregistrer ce bloc dans un fichier nommé `santorini-corpus-restreint.geojson`. Si vous voulez malgré tout une **data URI**, le gabarit exact est :

```text
data:application/geo+json;charset=utf-8, + encodeURIComponent(<contenu GeoJSON>)
```

## KML et téléchargement

Le bloc ci-dessous est le **KML complet** du même jeu de données. Les lieux sans coordonnées sont conservés comme placemarks descriptifs sans géométrie.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Santorin corpus restreint</name>

    <Folder>
      <name>Supermarché</name>
      <Placemark><name>AB Fira</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Lidl Fira</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Masoutis Pyrgos</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Masoutis Emporio</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Sklavenitis Mesaria</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Kritikos Mesaria</name><description><![CDATA[Catégorie: Supermarché<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
    </Folder>

    <Folder>
      <name>Laverie</name>
      <Placemark><name>Smart Wash</name><description><![CDATA[Catégorie: Laverie<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>AD Laundry</name><description><![CDATA[Catégorie: Laverie<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Pro Laundry</name><description><![CDATA[Catégorie: Laverie<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Crystal Bee</name><description><![CDATA[Catégorie: Laverie<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
      <Placemark><name>Santorini Laundry</name><description><![CDATA[Catégorie: Laverie<br/>Adresse: non précisé<br/>GPS: non précisé<br/>Note: Introuvable dans les six sources autorisées.]]></description></Placemark>
    </Folder>

    <Folder>
      <name>Plage</name>
      <Placemark><name>Red Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Akrotiri, Santorin<br/>GPS: 36.348878, 25.393090<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.39309,36.348878,0</coordinates></Point></Placemark>
      <Placemark><name>White Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Akrotiri, Santorin<br/>GPS: 36.350470, 25.382370<br/>Source: https://en.wikivoyage.org/wiki/Akrotiri]]></description><Point><coordinates>25.38237,36.35047,0</coordinates></Point></Placemark>
      <Placemark><name>Kamari Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Kamari, Santorin<br/>GPS: 36.373093, 25.483102<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.483102,36.373093,0</coordinates></Point></Placemark>
      <Placemark><name>Perissa Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Perissa, Santorin<br/>GPS: 36.356700, 25.476000<br/>Source: https://en.wikivoyage.org/wiki/Perissa]]></description><Point><coordinates>25.476,36.3567,0</coordinates></Point></Placemark>
      <Placemark><name>Perivolos Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Perivolos, Santorin<br/>GPS: non précisé<br/>Source: https://www.lonelyplanet.fr/article/8-des-plus-belles-plages-de-santorin<br/>Note: plage mentionnée sans coordonnées exploitables.]]></description></Placemark>
      <Placemark><name>Vlychada Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Vlychada, Santorin<br/>GPS: 36.339393, 25.431821<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.431821,36.339393,0</coordinates></Point></Placemark>
      <Placemark><name>Monolithos Beach</name><description><![CDATA[Catégorie: Plage<br/>Adresse: Monolithos, Santorin<br/>GPS: non précisé<br/>Source: https://nl.wikivoyage.org/wiki/Santorini<br/>Note: le corpus repère Monolithos, pas un point plage exact.]]></description></Placemark>
    </Folder>

    <Folder>
      <name>Site culturel</name>
      <Placemark><name>Akrotiri site</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Akrotiri, Santorin<br/>GPS: 36.351000, 25.402710<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.40271,36.351,0</coordinates></Point></Placemark>
      <Placemark><name>Musée préhistoire</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Fira, Santorin<br/>GPS: 36.418500, 25.437000<br/>Source: https://en.wikivoyage.org/wiki/Fira]]></description><Point><coordinates>25.437,36.4185,0</coordinates></Point></Placemark>
      <Placemark><name>Ancient Thera</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Mesa Vouno, Kamari, Santorin<br/>GPS: 36.364400, 25.477600<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.4776,36.3644,0</coordinates></Point></Placemark>
      <Placemark><name>Musée archéo</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Fira, Santorin<br/>GPS: 36.417800, 25.431700<br/>Source: https://en.wikivoyage.org/wiki/Fira]]></description><Point><coordinates>25.4317,36.4178,0</coordinates></Point></Placemark>
      <Placemark><name>Skaros Rock</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Imerovigli, Santorin<br/>GPS: 36.431703, 25.417523<br/>Source: https://en.wikivoyage.org/wiki/Imerovigli]]></description><Point><coordinates>25.417523,36.431703,0</coordinates></Point></Placemark>
      <Placemark><name>Phare Akrotiri</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: Akrotiri, Santorin<br/>GPS: 36.357790, 25.357060<br/>Source: https://en.wikivoyage.org/wiki/Akrotiri]]></description><Point><coordinates>25.35706,36.35779,0</coordinates></Point></Placemark>
      <Placemark><name>Profitis Ilias</name><description><![CDATA[Catégorie: Site culturel<br/>Adresse: près de Pyrgos, Santorin<br/>GPS: 36.368214, 25.463546<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.463546,36.368214,0</coordinates></Point></Placemark>
    </Folder>

    <Folder>
      <name>Restaurant</name>
      <Placemark><name>Selene</name><description><![CDATA[Catégorie: Restaurant<br/>Adresse: Fira, Santorin<br/>GPS: 36.421470, 25.430780<br/>Source: https://en.wikivoyage.org/wiki/Fira]]></description><Point><coordinates>25.43078,36.42147,0</coordinates></Point></Placemark>
      <Placemark><name>Athenian House</name><description><![CDATA[Catégorie: Restaurant<br/>Adresse: Imerovigli, Santorin<br/>GPS: 36.432974, 25.421376<br/>Source: https://en.wikivoyage.org/wiki/Imerovigli]]></description><Point><coordinates>25.421376,36.432974,0</coordinates></Point></Placemark>
      <Placemark><name>To Psaraki</name><description><![CDATA[Catégorie: Restaurant<br/>Adresse: Vlychada, Santorin<br/>GPS: 36.337935, 25.434910<br/>Source: https://en.wikivoyage.org/wiki/Vlychada]]></description><Point><coordinates>25.43491,36.337935,0</coordinates></Point></Placemark>
      <Placemark><name>Metaxi Mas</name><description><![CDATA[Catégorie: Restaurant<br/>Adresse: Exo Gonia, Santorin<br/>GPS: non précisé<br/>Source: https://www.routard.com/forums/t/entre-ciel-et-mer-une-semaine-magnifique-a-santorin/350120<br/>Note: restaurant localisé textuellement sans coordonnées exploitables.]]></description></Placemark>
    </Folder>

    <Folder>
      <name>Service pratique</name>
      <Placemark><name>Bus Fira</name><description><![CDATA[Catégorie: Service pratique<br/>Adresse: Fira, Santorin<br/>GPS: 36.416546, 25.433430<br/>Source: https://nl.wikivoyage.org/wiki/Santorini]]></description><Point><coordinates>25.43343,36.416546,0</coordinates></Point></Placemark>
    </Folder>
  </Document>
</kml>
```

Pour un téléchargement local fiable, enregistrez ce bloc sous `santorini-corpus-restreint.kml`. Le gabarit de **data URI** est :

```text
data:application/vnd.google-earth.kml+xml;charset=utf-8, + encodeURIComponent(<contenu KML>)
```

## Aperçu PNG et import

Je ne joins pas ici de **PNG binaire** prêt à télécharger, car la génération d’image n’a pas été exécutée dans cette réponse. En revanche, vous pouvez produire un aperçu haute résolution très propre en quelques minutes.

Pour les lieux sans coordonnées confirmées, placez-les **au centre du bourg** correspondant et ajoutez dans l’étiquette ou la description la mention **approx.**. La règle pratique la plus propre est la suivante :

| Lieux à placer approximativement | Centre à utiliser |
|---|---|
| AB Vassilopoulos, Lidl Hellas, Smart Wash Santorini, AD Laundry | Fira-centre |
| Sklavenitis Mesaria, Kritikos Mesaria, Pro Laundry Santorini | Mesaria-centre |
| Masoutis Pyrgos, Crystal Bee Santorini | Pyrgos-centre |
| Masoutis Emporio | Emporio-centre |
| Santorini Laundry, Monolithos Beach | Monolithos-centre |
| Metaxi Mas | Exo Gonia-centre |
| Perivolos Beach | extrémité sud de Perissa |

Dans **Google My Maps**, créez une carte, importez d’abord le GeoJSON ou le KML, puis créez ensuite, si vous le souhaitez, une seconde couche manuelle appelée **Approx.** pour les lieux à `gps:null`. Stylisez la couche par le champ `category`, puis utilisez les pictogrammes de la légende. Affichez le champ `label` comme nom principal. Pour exporter une image, utilisez l’impression du navigateur ou une capture haute résolution à l’échelle souhaitée.

Dans **QGIS**, chargez le GeoJSON ou le KML, laissez le projet en **EPSG:4326** ou reprojetez si vous préférez. Dans la symbologie, choisissez **Catégorisé** sur `category`. Activez l’étiquetage sur `label`. Créez ensuite, si nécessaire, une couche de points manuelle nommée **Approx.** pour les lieux non géocodés, avec la mention `approx.` dans le nom ou la description. Ouvrez ensuite une **Mise en page**, ajoutez la carte, réglez la résolution à **300 dpi** ou **600 dpi**, puis exportez en PNG. Si vous souhaitez rester strictement dans le périmètre des sources, travaillez sans fond de carte et avec une grille longitude/latitude ; si vous acceptez un simple fond de visualisation local, vous pouvez en ajouter un séparément sans l’utiliser comme source de géocodage.

## Limites

Les éléments sans coordonnées confirmées dans le corpus autorisé sont : **AB Vassilopoulos**, **Lidl Hellas**, **Masoutis Pyrgos**, **Masoutis Emporio**, **Sklavenitis Mesaria**, **Kritikos Mesaria**, **Smart Wash Santorini**, **AD Laundry**, **Pro Laundry Santorini**, **Crystal Bee Santorini**, **Santorini Laundry**, **Perivolos Beach**, **Monolithos Beach** et **Metaxi Mas**. Les éléments réellement **introuvables** comme entrées exploitables dans les six domaines imposés sont surtout tous les **supermarchés** et toutes les **laveries**. Deux autres points demandent prudence : **Perivolos Beach** n’est décrite que textuellement dans le matériau retenu, sans géocode exploitable, et **Monolithos Beach** n’est pas isolée comme point plage exact dans le corpus, seulement à travers le repère général de Monolithos. Enfin, beaucoup d’« adresses » issues du corpus autorisé ne sont pas des adresses postales complètes mais de simples localisations de bourg ou de secteur ; elles doivent donc être lues comme des **localisations pratiques**, pas comme des adresses normalisées.