# Gao Lab — site

The taogao-echem.net rebuild. Astro 5 + Tailwind, deployed to GitHub Pages, publications auto-refreshed daily from OpenAlex.

The repo's source of truth for **PI information** (bio, education, employment, awards, grants, courses, talks, service) is the latest `CV_Tao_GAO_Academia_YYYY_MMDD.docx` in the parent Drive folder. The site reads from `src/data/cv.json` which is reconciled from the CV by hand after running `npm run parse:cv`.

The source of truth for **publications** is OpenAlex, queried by ORCID `0000-0003-0204-3269`. The fetcher writes `src/data/publications.json`, refreshed daily by a GitHub Action.

The source of truth for **lab internal documents** is the Notion workspace at `notion.so/35c58095a3ba812cb018e027060b607c` (linked from the site as "Lab Members").

---

## First run

You need Node.js 20 or newer.

```powershell
# 1. Install Node.js (one time)
winget install OpenJS.NodeJS.LTS

# 2. Install dependencies
cd "G:\My Drive\6-website\site"
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:4321 in a browser. Edits to `.astro`, `.md`, and `.css` files hot-reload.

## Refreshing publications

```powershell
npm run fetch:publications
```

The script:

1. Calls OpenAlex with the PI's ORCID.
2. Normalizes results to `{title, authors, venue, year, doi, oa_url, citations, abstract, type, ...}`.
3. Merges with `src/data/publications.overrides.json` (manual additions, redactions, and "selected" highlights).
4. Writes `src/data/publications.json`.

Two override mechanisms:

- `selected` — DOIs that should be flagged on the home page highlights row.
- `redactions` — DOIs to remove (e.g., same-name author confusion).
- `additions` — manual `{doi, title, authors, year, venue, ...}` entries OpenAlex hasn't indexed yet.

A GitHub Action (`.github/workflows/refresh-publications.yml`) runs daily at 06:00 UTC and opens a PR if anything changed.

A Python bootstrap (`scripts/bootstrap-publications.py`) does the same fetch using only the standard library, useful before Node is installed.

## Adding a news entry

Drop a new file in `src/content/news/` named `YYYY-MM-short-title.md`:

```markdown
---
title: "Headline"
date: 2026-04-01
summary: "One- or two-sentence teaser."
tags: ["paper", "award"]
link: "https://doi.org/…"   # optional
image: "/images/news-…jpg"  # optional
---

Body in Markdown.
```

Commit and push. The home page News block, the `/news/` archive, and `rss.xml` all update automatically.

## Adding a person

Drop a new file in `src/content/people/<slug>.md`:

```markdown
---
name: "Jane Doe"
role: "PhD candidate"
status: "phd"          # one of: pi, postdoc, phd, masters, undergrad, visiting, staff, alumnus
photo: "/images/people/jane.jpg"
email: "jane@…"
scholar: "https://scholar.google.com/citations?user=…"
linkedin: "https://www.linkedin.com/in/…"
orcid: "0000-0000-0000-0000"
twitter: "TwitterHandle"
joined: "2025-08"
order: 5
interests: ["batteries", "electrolytes"]
---

One- to three-paragraph bio.
```

Photos go in `public/images/people/<slug>.jpg`. The `/people/` index page reads the CV's student lists as a fallback when no Markdown profile exists yet.

## Updating the CV

1. Save the new CV as `CV_Tao_GAO_Academia_YYYY_MMDD.docx` in `G:\My Drive\6-website\` (next to the older versions).
2. Run `npm run parse:cv` — this regenerates `scripts/cv-source.md` from the latest .docx via pandoc.
3. Open `scripts/cv-source.md` and `src/data/cv.json` side-by-side. Edit the JSON to reflect any changes (new awards, grants, talks, students, etc.).
4. Bump the `asOf` field in `cv.json` to the new CV date.
5. Re-export the .docx to PDF in Word and overwrite `public/cv.pdf`. (We can't reliably auto-generate this on Windows without Word or LibreOffice.)
6. Commit `cv.json`, `cv.pdf`, and the new .docx (the .docx in the Drive parent folder).

Pandoc must be installed: `winget install JohnMacFarlane.Pandoc`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds the site on every push to `main` and deploys to GitHub Pages. Workflow expects:

- The Astro project at `site/` in the repo root.
- GitHub Pages set to "GitHub Actions" as the source (Settings → Pages).
- A `CNAME` file in `public/` pointing at `www.taogao-echem.net` (already there).
- DNS for `taogao-echem.net`:
  - Apex `taogao-echem.net` — A records to GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - `www.taogao-echem.net` — CNAME to `<your-github-username>.github.io`.

Cut DNS over to a staging subdomain first (e.g., `new.taogao-echem.net`) to verify before swapping the apex.

After launch:

- Submit `https://www.taogao-echem.net/sitemap-index.xml` to Google Search Console and Bing Webmaster Tools.
- Verify Person JSON-LD via Google's Rich Results Test.

## Project layout

```
site/
├── astro.config.mjs              # Astro + sitemap + Tailwind + MDX
├── tailwind.config.mjs           # academic palette + typography plugin
├── public/                       # static assets served as-is
│   ├── CNAME                     # custom domain
│   ├── cv.docx                   # current CV (replace with PDF when possible)
│   ├── favicon.svg
│   ├── images/                   # curated, optimized site images
│   └── robots.txt
├── scripts/
│   ├── parse-cv.mjs              # pandoc docx → markdown for manual reconciliation
│   ├── fetch-publications.mjs    # OpenAlex → publications.json
│   └── bootstrap-publications.py # standalone Python equivalent
└── src/
    ├── config.ts                 # site name, social URLs, nav
    ├── content/
    │   ├── config.ts             # collection schemas
    │   ├── news/                 # *.md, one per news item
    │   ├── people/               # *.md, one per member (PI included)
    │   └── research/             # *.md, one per research thrust
    ├── data/
    │   ├── cv.json               # canonical PI info parsed from latest CV.docx
    │   ├── publications.json     # generated, do not hand-edit
    │   └── publications.overrides.json
    ├── components/
    ├── layouts/
    ├── pages/
    └── styles/
```

## Visibility checklist (post-launch)

To maximize web visibility for the PI and the lab — the user's stated #2 goal — do these in order after the site is live:

1. **Verify ownership** in Google Search Console and Bing Webmaster Tools (DNS TXT record).
2. **Submit sitemap** to both.
3. **Test Person JSON-LD** via Google's Rich Results Test — should detect Person schema with `sameAs` links to ORCID, Scholar, LinkedIn, X.
4. **Update Google Scholar profile** with the canonical URL `https://www.taogao-echem.net`.
5. **Update LinkedIn, X, and ORCID** profiles to point at `https://www.taogao-echem.net`.
6. **Reach out to UofU comms** to update the department's faculty page (linkbacks from `.edu` domains are SEO gold).
7. **Submit a homepage URL update** to OpenAlex (it picks up homepage changes via Crossref / institutional repositories).
8. **Cross-post first news entry** to LinkedIn and X — link back to `taogao-echem.net/news/...`.
9. **Set up Google Search Console URL inspection** to manually request indexing of the most important pages (Home, Publications, People).

## What's not automated (by design)

- Cross-posting to LinkedIn and X. We deliberately do not auto-post — both APIs are rate-limited or paid, and timing/voice should be human. The plan is: write a news Markdown entry, then share manually with a link back.
- CV PDF generation. The .docx is authored, the conversion is one click in Word/Pages. Building a robust headless converter in CI is more brittle than the human step.
- Fully parsing the CV into JSON. The CV is prose; small layout changes break heuristic parsers. The two-step "pandoc to markdown, then reconcile cv.json by hand" is faster overall.

## Conventions

- Tailwind utility classes; no global CSS beyond `src/styles/globals.css`.
- Image filenames lowercase with hyphens.
- Markdown frontmatter dates in `YYYY-MM-DD`.
- Commit messages: `feat`, `fix`, `chore`, `content` for content-only changes.

## Need to change content?

| Change | Where |
|---|---|
| Add a paper (urgent, before OpenAlex picks it up) | `src/data/publications.overrides.json` → `additions[]` |
| Flag a paper as "selected" (highlights on home) | `src/data/publications.overrides.json` → `selected[]` (DOI) |
| Hide a same-name author paper | `src/data/publications.overrides.json` → `redactions[]` (DOI) |
| New award, grant, talk, service entry | `src/data/cv.json` (after updating the CV.docx) |
| New course | `src/data/cv.json` → `courses[]` |
| New news item | `src/content/news/YYYY-MM-slug.md` |
| New lab member | `src/content/people/<slug>.md` + `public/images/people/<slug>.jpg` |
| New research thrust | `src/content/research/05-…md` |
| Header/footer nav | `src/config.ts` → `nav` |
| Social URLs | `src/config.ts` → `social` |
| Intranet URL | `src/config.ts` → `intranet.url` |
```
