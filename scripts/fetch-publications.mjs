#!/usr/bin/env node
// Fetch publications for ORCID 0000-0003-0204-3269 from OpenAlex,
// merge with src/data/publications.overrides.json,
// write src/data/publications.json.
//
// OpenAlex is free and requires no API key. We pass a polite mailto
// in the User-Agent header per their docs (faster pool).
//
// Run:
//   node scripts/fetch-publications.mjs
//
// CI: see .github/workflows/refresh-publications.yml

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const ORCID = '0000-0003-0204-3269';
const PI_LAST_NAME = 'Gao'; // for "is PI an author" detection
const PI_FIRST_INITIAL = 'T';
// OpenAlex polite-pool contact. Optional — set OPENALEX_MAILTO in the environment
// if desired; left unset so no personal email is committed to the repo.
const POLITE_EMAIL = process.env.OPENALEX_MAILTO || '';

const EXCLUDED_TYPES = new Set(['erratum', 'editorial', 'letter', 'retraction', 'paratext']);

// "Tao Gao" is a very common name. OpenAlex's author disambiguation periodically
// MERGES several distinct "Tao Gao" people into one author record and stamps our
// ORCID across the whole blob — so every merged work then carries the ORCID in
// authorships[], and a per-work ORCID check passes junk (titanium fatigue,
// lead-bismuth corrosion, cancer biology, …). See git history for the incident.
//
// The authoritative list of which works are actually the PI's is the PI's own
// ORCID record (https://pub.orcid.org), which the PI controls. So we fetch that,
// build the set of DOIs (and, as a fallback, normalized titles) claimed on ORCID,
// and keep only OpenAlex works that intersect it. OpenAlex is still the source of
// rich metadata (citations, venue, abstract); ORCID decides membership.
// Truly-new papers not yet on ORCID can be added via overrides.additions[].
function normTitle(t) {
  return (t ?? '').toLowerCase().replace(/&[a-z]+;/g, ' ').replace(/[^a-z0-9]+/g, '');
}

async function fetchOrcidWorkKeys() {
  const url = `https://pub.orcid.org/v3.0/${ORCID}/works`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`ORCID HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const dois = new Set();
  const titles = new Set();
  for (const g of data.group ?? []) {
    const s = (g['work-summary'] ?? [])[0];
    if (!s) continue;
    const t = s.title?.title?.value;
    if (t) titles.add(normTitle(t));
    for (const ext of s['external-ids']?.['external-id'] ?? []) {
      if ((ext['external-id-type'] ?? '').toLowerCase() === 'doi') {
        const v = (ext['external-id-value'] ?? '').replace(/^https?:\/\/doi\.org\//i, '').toLowerCase();
        if (v) dois.add(v);
      }
    }
  }
  return { dois, titles };
}

function isPiWork(work, keys) {
  const doi = work.doi ? work.doi.replace(/^https?:\/\/doi\.org\//i, '').toLowerCase() : null;
  if (doi && keys.dois.has(doi)) return true;
  const t = normTitle(work.title || work.display_name);
  return t.length > 8 && keys.titles.has(t);
}

const overridesPath = join(projectRoot, 'src/data/publications.overrides.json');
const outPath = join(projectRoot, 'src/data/publications.json');

const overrides = existsSync(overridesPath)
  ? JSON.parse(readFileSync(overridesPath, 'utf8'))
  : { selected: [], additions: [], redactions: [] };

async function fetchAll() {
  const works = [];
  let cursor = '*';
  let page = 0;
  while (cursor) {
    const url = new URL('https://api.openalex.org/works');
    url.searchParams.set('filter', `author.orcid:${ORCID}`);
    url.searchParams.set('per-page', '200');
    url.searchParams.set('cursor', cursor);
    url.searchParams.set('mailto', POLITE_EMAIL);
    url.searchParams.set('select', [
      'id', 'doi', 'title', 'display_name', 'publication_year',
      'publication_date', 'type', 'cited_by_count',
      'authorships', 'primary_location', 'open_access',
      'biblio', 'abstract_inverted_index',
    ].join(','));

    const res = await fetch(url, {
      headers: { 'User-Agent': POLITE_EMAIL ? `gao-lab-site (mailto:${POLITE_EMAIL})` : 'gao-lab-site' },
    });
    if (!res.ok) throw new Error(`OpenAlex HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    works.push(...data.results);
    cursor = data.meta.next_cursor;
    page++;
    console.log(`  fetched page ${page}: ${data.results.length} works (running total ${works.length} / ${data.meta.count})`);
    if (data.results.length === 0) break;
  }
  return works;
}

function reconstructAbstract(inv) {
  if (!inv) return null;
  const tokens = [];
  for (const [word, positions] of Object.entries(inv)) {
    for (const p of positions) tokens[p] = word;
  }
  const out = tokens.filter(Boolean).join(' ');
  return out.length > 1200 ? out.slice(0, 1200).trimEnd() + '…' : out;
}

function normalize(work) {
  const doi = work.doi ? work.doi.replace(/^https?:\/\/doi\.org\//, '').toLowerCase() : null;
  const venue = work.primary_location?.source?.display_name ?? null;
  const authors = (work.authorships ?? []).map((a) => {
    const name = a.author?.display_name ?? '';
    const isPI = (() => {
      const last = name.split(/\s+/).slice(-1)[0];
      const first = name.split(/\s+/)[0] ?? '';
      return last === PI_LAST_NAME && first.startsWith(PI_FIRST_INITIAL);
    })();
    return { name, isPI };
  });
  return {
    id: work.id,
    doi,
    title: work.title || work.display_name || '(untitled)',
    year: work.publication_year ?? null,
    date: work.publication_date ?? null,
    type: work.type ?? null,
    citations: work.cited_by_count ?? 0,
    venue,
    volume: work.biblio?.volume ?? null,
    issue: work.biblio?.issue ?? null,
    firstPage: work.biblio?.first_page ?? null,
    lastPage: work.biblio?.last_page ?? null,
    oaUrl: work.open_access?.oa_url ?? null,
    abstract: reconstructAbstract(work.abstract_inverted_index),
    authors,
  };
}

function applyOverrides(works) {
  const redactSet = new Set((overrides.redactions ?? []).map((d) => d.toLowerCase()));
  const selectedSet = new Set((overrides.selected ?? []).map((d) => d.toLowerCase()));
  const correspondingSet = new Set((overrides.corresponding ?? []).map((d) => d.toLowerCase()));
  const coFirstSet = new Set((overrides.coFirst ?? []).map((d) => d.toLowerCase()));
  const byDoi = new Map();
  for (const w of works) {
    if (w.doi && redactSet.has(w.doi)) continue;
    byDoi.set(w.doi ?? `nodoi:${w.id}`, w);
  }
  for (const add of overrides.additions ?? []) {
    const key = add.doi ? add.doi.toLowerCase() : `manual:${add.title}`;
    if (!byDoi.has(key)) byDoi.set(key, add);
  }
  const merged = [...byDoi.values()].map((w) => {
    const doi = w.doi ? w.doi.toLowerCase() : null;
    return {
      ...w,
      selected: doi ? selectedSet.has(doi) : false,
      isCorresponding: doi ? correspondingSet.has(doi) : false,
      isCoFirst: doi ? coFirstSet.has(doi) : false,
    };
  });
  merged.sort((a, b) => {
    if (b.year !== a.year) return (b.year ?? 0) - (a.year ?? 0);
    return (b.citations ?? 0) - (a.citations ?? 0);
  });
  return merged;
}

console.log(`Fetching publications for ORCID ${ORCID} from OpenAlex…`);
const orcidKeys = await fetchOrcidWorkKeys();
console.log(`  ORCID record claims ${orcidKeys.dois.size} DOIs / ${orcidKeys.titles.size} titles (authoritative membership list)`);

// The ORCID record is authoritative but can be INCOMPLETE (the PI hasn't claimed
// every real paper). So we also honor a CV-sourced whitelist: any DOI the PI has
// hand-curated in overrides (selected / corresponding / coFirst) is unambiguously
// theirs and is kept even if absent from ORCID. This preserves recall on real work
// while ORCID + whitelist together exclude the same-name / mis-merged contamination.
// (redactions are handled later in applyOverrides and still get dropped.)
const overrideWhitelist = new Set(
  [...(overrides.selected ?? []), ...(overrides.corresponding ?? []), ...(overrides.coFirst ?? [])]
    .map((d) => d.toLowerCase()),
);
function keep(work) {
  if (isPiWork(work, orcidKeys)) return true;
  const doi = work.doi ? work.doi.replace(/^https?:\/\/doi\.org\//i, '').toLowerCase() : null;
  return !!doi && overrideWhitelist.has(doi);
}

const raw = await fetchAll();
console.log(`  fetched ${raw.length} candidates from OpenAlex`);
const strict = raw.filter(keep);
console.log(`  kept ${strict.length} matched to ORCID record or CV whitelist (dropped ${raw.length - strict.length} same-name / mis-merged works)`);
const typed = strict.filter((w) => !EXCLUDED_TYPES.has((w.type ?? '').toLowerCase()));
console.log(`  kept ${typed.length} after dropping erratum/editorial/letter/retraction`);
const normalized = typed.map(normalize);
const merged = applyOverrides(normalized);
const byYear = merged.reduce((acc, w) => {
  acc[w.year ?? 'unknown'] = (acc[w.year ?? 'unknown'] ?? 0) + 1;
  return acc;
}, {});

const out = {
  $generatedAt: new Date().toISOString(),
  $source: `OpenAlex (ORCID ${ORCID}) merged with publications.overrides.json`,
  count: merged.length,
  byYear,
  items: merged,
};

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nWrote ${merged.length} publications → ${outPath}`);
console.log(`Selected (highlights): ${merged.filter((w) => w.selected).length}`);
