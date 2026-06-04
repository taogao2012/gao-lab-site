# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo orientation

The git repository is rooted at `site/` (not the parent `gao-lab/` workspace folder). All paths below are relative to `site/`. The deploy workflow also runs with `working-directory: site`.

This is the source for **taogao-echem.net** — the SuPER-AI Lab marketing site (PI: Tao Gao, NC State). Astro 5 + Tailwind, statically built, deployed to GitHub Pages.

## Commands

The user is on **Windows / PowerShell**. Node 20+ required.

```powershell
npm install
npm run dev                 # astro dev → http://localhost:4321 (hot reload)
npm run build               # astro build && pagefind --site dist  (pagefind indexes the built site for search)
npm run preview             # serve dist/
npm run fetch:publications  # OpenAlex → src/data/publications.json (also runs daily in CI)
npm run parse:cv            # pandoc latest CV.docx → scripts/cv-source.md (requires pandoc on PATH)
```

There is no test suite, no linter, no typecheck script. Astro's build performs schema validation on content collections — that is the closest thing to a check.

A Python fallback `scripts/bootstrap-publications.py` does the same OpenAlex fetch using only the stdlib (use it when Node isn't installed).

## Architecture — sources of truth

Three categories of content come from three different places. Knowing which is which is the most important thing to internalize before editing:

1. **PI information** (bio, education, employment, awards, grants, courses, talks, service) → `src/data/cv.json`. Canonical source is `CV_Tao_GAO_Academia_YYYY_MMDD.docx` in `G:\My Drive\6-website\` (override path via `GAO_LAB_CONTENT_DIR`). `parse-cv.mjs` only produces a markdown diff at `scripts/cv-source.md`; **`cv.json` is reconciled by hand** because the CV is authored prose, not a structured form. Bump `cv.json.asOf` whenever you reconcile.
2. **Publications** → `src/data/publications.json`, **generated, do not hand-edit**. The fetcher (`scripts/fetch-publications.mjs`) queries OpenAlex by ORCID `0000-0003-0204-3269`, then requires the ORCID to actually appear in `authorships[]` (OpenAlex's ORCID filter still returns same-name false positives — "Tao Gao" is common). Manual additions/redactions/highlights live in `src/data/publications.overrides.json` (`additions[]`, `redactions[]`, `selected[]` — all keyed by DOI, case-insensitive). The daily GitHub Action `.github/workflows/refresh-publications.yml` opens a PR with the diff; review for same-name papers before merging.
3. **Lab internal docs** → Notion workspace, linked from the site as "Lab Members" via `site.intranet.url` in `src/config.ts`. Not in this repo.

## Architecture — site code

- **`src/config.ts`** — single source for site identity (name, PI, social URLs, nav with dropdown children, intranet link). Edit nav/header/footer here, not in components.
- **`src/content/`** — Astro content collections defined in `src/content/config.ts`. Only `people` and `research` are registered as collections with Zod schemas (note: news currently lives in `src/data/news.json`, not as a content collection). The `people` schema enforces `status: 'pi' | 'postdoc' | 'phd' | 'masters' | 'undergrad' | 'visiting' | 'staff' | 'alumnus'`.
- **`src/data/`** — JSON/TS data files, some generated (`publications.json`), some hand-edited (`cv.json`, `publications.overrides.json`, `news.json`, `gallery.ts`, `slideshow.ts`, etc.).
- **`src/pages/`** — Astro routes. `[...slug].astro` files render dynamic content collection entries (e.g., `people/[...slug].astro`).
- **`src/layouts/BaseLayout.astro`** — wraps every page; injects canonical URL, OG tags, Person JSON-LD (schema.org), and the BrandBar/Header/Footer. Person JSON-LD `sameAs` pulls from `site.social` — important for SEO.
- **`src/components/`** — small Astro components, no client-side framework. Tailwind utility classes only; the only global CSS is `src/styles/globals.css`.
- **`public/`** — static assets served as-is. `public/CNAME` pins the custom domain; `public/cv.pdf` is the PI's CV (manual export from Word, by design — see "What's not automated" in README).

## Build pipeline note

`npm run build` is `astro build && pagefind --site dist`. **Pagefind runs against the built `dist/`** to generate the static search index. If you skip `pagefind` (e.g., by running `astro build` directly), site search will break in preview/prod.

## Content authoring shortcuts

| Change | Where |
|---|---|
| Add a paper before OpenAlex picks it up | `src/data/publications.overrides.json` → `additions[]` |
| Flag a paper as "selected" on home page | `src/data/publications.overrides.json` → `selected[]` (DOI) |
| Hide a same-name false positive | `src/data/publications.overrides.json` → `redactions[]` (DOI) |
| New lab member | `src/content/people/<slug>.md` + `public/images/people/<slug>.jpg` |
| New research thrust | `src/content/research/0X-….md` |
| Award / grant / talk / service | `src/data/cv.json` (after reconciling from latest CV.docx) |
| Header/footer nav, social URLs, intranet URL | `src/config.ts` |

## Conventions

- Tailwind utilities; no component CSS modules.
- Image filenames lowercase-with-hyphens.
- Markdown frontmatter dates `YYYY-MM-DD`.
- Commit prefixes: `feat`, `fix`, `chore`, `content` (content-only changes).

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. Pages source must be set to "GitHub Actions" in repo settings. DNS for the apex `taogao-echem.net` points to GitHub Pages IPs; `www` is a CNAME to `<user>.github.io`. The `CNAME` file in `public/` must match the served domain.
