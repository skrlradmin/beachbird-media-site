# Beachbird Media — marketing site (v1 draft)

Static one-page site for [Beachbird Media](https://beachbirdmedia.com) (domain not connected in this draft). Content studio by **Nick** and **P**. Channel: [@TheWaterBoyz710](https://www.youtube.com/@TheWaterBoyz710). Production partnership: **skrlr** / **skrlr GenLab**.

## Design: "Ink & Voltage"

AI-first video and animation studio, open for third-party contract work. The look borrows from TheWaterBoyz710 (googly-eyes mark, funk-yellow and alien-green, a western slab for Hash Cowboy) inside a dark AI-studio frame: glowing aurora background, film grain, glass cards with a cursor spotlight, a filmstrip of real work in the hero, and scroll reveals. All static HTML/CSS/JS, so it deploys to GitHub Pages as-is.

| Element | Choice |
| -------- | ------- |
| Mark | Googly eyes (pupils follow the pointer) + "BeachbirdMedia" wordmark |
| Type | Bricolage Grotesque (display/body), JetBrains Mono (labels), Rye (Hash Cowboy title only) |
| Palette | Ink `#08070b`, paper `#f3eedf`, yellow `#ffd60a`, green `#7bff3c`, purple `#8b4dff`, orange `#ff6a1f` |

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
- **Pricing** — starting prices on site: $500 minimum (product images, short clips), $1,000 for 1 minute, $2,000 for 3 minutes (longest listed); cartoons and longer work are quote-only
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
- Contact: `hello@example.com`, disabled form, disabled submit button
