# Beachbird Media — marketing site (v1 draft)

Static one-page site for [Beachbird Media](https://beachbirdmedia.com) (domain not connected in this draft). Content studio by **Nick** and **P**. Channel: [@TheWaterBoyz710](https://www.youtube.com/@TheWaterBoyz710). Production partnership: **skrlr** / **skrlr GenLab**.

## Provisional brand (not final)

| Element | Draft choice |
| -------- | ------------- |
| Wordmark | Text only: “Beachbird Media” (Playfair Display + teal accent) |
| Palette | Deep navy `#070d14`, sand `#e4d9c8`, teal `#3a9a9c`, coral `#c97a62` |

Finalize logo, typography, and colors before launch.

## Local preview

```bash
npm install
npm run build
npm run preview
```

Open `http://localhost:4173` (serves the `dist/` folder).

For quick iteration without building, open `index.html` via a local static server from the repo root (paths assume root, not `dist/`):

```bash
npx --yes serve . -l 4173
```

## Build

`npm run build` copies `index.html`, `css/`, and `js/` into `dist/`, includes `public/CNAME` (`beachbirdmedia.com`) and `public/.nojekyll`, and runs basic content checks.

**Node:** use **20.x** (see `engines` in `package.json`).

## CI / GitHub Pages (workflows only)

- **`.github/workflows/build-pr.yml`** — runs `npm run build` on pull requests.
- **`.github/workflows/deploy-pages.yml`** — on push to `main` (or manual dispatch): build and deploy `dist/` via official Pages actions.

Merging to `main` still requires enabling GitHub Pages in repo settings (source: GitHub Actions); this repo does not change those settings in this PR.

## Open decisions

- **Brand colors & logo** — using provisional coastal/cinematic palette and text wordmark only
- **Final package prices** — tiers on site are marked draft / PLACEHOLDER ($200 / $750 / $1,800 reference ladder)
- **Contact email & booking flow** — `hello@example.com` and disabled form are placeholders
- **Hosting & DNS** — static-hosting ready (e.g. GitHub Pages later); no deploy or DNS for beachbirdmedia.com in this repo yet

## Embedded YouTube videos

Verified via channel RSS (`channel_id=UCDK_DBrGCONi_wBHSz5QO2w`):

| Title | Video ID |
| ----- | -------- |
| Will You Survive | `2vRBA3-c7gQ` |
| Gta 6 Type Ish | `mH4SlPQiAkk` |
| Daily. | `qIaflCDInes` |
| Trick Or Treat | `CfAxrGxDlk4` |

Embeds use `youtube-nocookie.com` and load when the user activates the thumbnail (lazy).

## Placeholders on the site

- Wordmark labeled provisional
- Domain “not yet connected” in hero meta
- Draft pricing badge and per-tier PLACEHOLDER notes
- Contact: `hello@example.com`, disabled form, disabled submit button
