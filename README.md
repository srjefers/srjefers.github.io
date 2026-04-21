# srjefers.github.io

Personal portfolio for **Jeferson Stiv Argueta Hernández** — Senior Data Engineer.
Live at [srjefers.github.io](https://srjefers.github.io/).

Static site built with **Astro 5** and rendered from Markdown content files with
Zod-validated frontmatter. Deployed to GitHub Pages via GitHub Actions on every
push to `master`.

## Stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | [Astro](https://astro.build) | `^5.1.1` (runs on 5.18.1) |
| Sitemap | `@astrojs/sitemap` | `^3.2.1` |
| Runtime | Node.js | `20.x` (CI) / tested with `25.0.0` locally |
| Package manager | npm | `11.x` |
| Deploy target | GitHub Pages | via `actions/deploy-pages@v4` |
| Fonts | Roboto (Google Fonts, sans) · system Mono · Times New Roman | variable weights |
| Typography switcher | Roboto / Mono / Times — persisted in `localStorage` | — |
| Theme switcher | Light / Dark / Sepia — follows `prefers-color-scheme`, persisted | — |

No JavaScript framework runtime (no React, Vue, Svelte). Interactivity is hand-written
ES modules with zero dependencies.

## Project layout

```
srjefers.github.io/
├── .github/workflows/deploy.yml    CI/CD — builds and deploys to GitHub Pages
├── astro.config.mjs                Astro site config, sitemap integration
├── docs/
│   ├── CONTENT.md                  How to edit the portfolio content (MD frontmatter)
│   └── TROUBLESHOOTING.md          Common issues and fixes
├── package.json                    Deps and scripts
├── public/                         Static assets served as-is (favicons, PDF, og-image)
└── src/
    ├── content.config.ts           Zod schemas for each content collection
    ├── content/
    │   ├── site/site.md            Hero, about, contact, SEO (singleton)
    │   ├── experience/*.md         One file per role (sorted by `order`)
    │   ├── projects/*.md           One file per featured project
    │   ├── skills/*.md             One file per skill group
    │   └── training/*.md           One file per credential / degree
    ├── components/                 13 .astro components
    ├── layouts/BaseLayout.astro    Head, meta, FOUC theme script
    ├── pages/index.astro           Composes the single-page portfolio
    ├── scripts/                    theme.js, enhance.js, repos.js (vanilla JS)
    └── styles/global.css           All styling (CSS custom properties, per-theme tokens)
```

## Editing content

All content lives in Markdown files under `src/content/`. The whole portfolio is
driven by these files — editing a `.md` and pushing to `master` redeploys the site
within ~90 seconds.

See [`docs/CONTENT.md`](docs/CONTENT.md) for the frontmatter fields of each collection
and examples.

## Running locally

```bash
npm install      # first time only
npm run dev      # starts Astro dev server at http://localhost:4321 with HMR
npm run build    # produces static output in dist/
npm run preview  # serves dist/ for sanity checking the production build
```

`npm run build` runs the same Astro command the CI uses, so a local build passing
is a strong signal the deploy will succeed.

## Deployment

1. Push to `master` (or merge a PR into it).
2. GitHub Actions workflow `.github/workflows/deploy.yml` builds the site.
3. `actions/deploy-pages@v4` publishes the artifact to GitHub Pages.
4. Live URL: https://srjefers.github.io/

**One-time Pages setup** (only if not done yet): repository → Settings → Pages →
Source: **GitHub Actions** (not "Deploy from a branch").

## Troubleshooting

See [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) for common build errors,
schema validation failures, and deploy issues.

## Versioning

This portfolio does not follow semver — it's a personal site. Commit history on
`master` is the source of truth. Major milestones are tagged via GitHub releases
when a significant structural change ships.

| Version | Highlights |
|---------|------------|
| `2.0.0` (current) | Full Astro rewrite. Content in Markdown collections with Zod validation. Light / dark / sepia themes. Font switcher. GitHub Actions CI/CD. |
| `1.x` (legacy) | Hand-written HTML/CSS/JS, two separate pages (`/` and `/resume/`). Deprecated and removed in `2.0.0`. |
