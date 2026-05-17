# Images

Curated assets used by the site. Source originals live one level up in the Drive folder under `home-gallery/`, `Gallery/`, `SLC/`, `equipment/`, `people/`, and `logo/`.

## Optimization

For best Lighthouse scores, run images through Squoosh (https://squoosh.app) before committing — target ~150–250 KB for hero photos, ~30–80 KB for thumbnails. WebP or AVIF preferred. Astro's `<Image>` component handles further optimization at build time.

## Naming

- `hero-*.jpg` — hero/banner photos
- `lab-*.jpg` — lab + equipment shots
- `people/<slug>.jpg` — member portraits (square crop, 600px)
- `award-*.jpg` — award ceremony photos
- `logo-*.png` — institutional logos (transparent background)
- `og-*.svg|png` — OpenGraph share images (1200x630)

## Currently in this folder

| File | Source | Use |
|---|---|---|
| `hero-slc.jpg` | `SLC/1.jpg` | Home hero candidate |
| `lab-photo.png` | `home-gallery/Picture1.png` | Lab photo for Research/People |
| `award-rising-star.jpg` | `home-gallery/Rising Start of Science 2022.jpg` | Awards page |
| `logo-utah.png` | `logo/Picture1.png` | Footer / header lock-up |
| `og-default.svg` | generated | OG share card |

Add more curated copies here when needed.
