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
const POLITE_EMAIL = 'tgao9@ncsu.edu'; // for OpenAlex polite pool

// OpenAlex's author.orcid filter still returns works where the ORCID isn't
// attached to any authorship record (name-only matches). Tao Gao is common,
// so we require the ORCID to actually appear in authorships[].
const ORCID_VARIANTS = [
  `https://orcid.org/${ORCID}`,
  `http://orcid.org/${ORCID}`,
  ORCID,
];

const EXCLUDED_TYPES = new Set(['erratum', 'editorial', 'letter', 'retraction', 'paratext']);

function hasPiOrcid(work) {
  for (const a of work.authorships ?? []) {
    const o = a.author?.orcid ?? '';
    if (ORCID_VARIANTS.some((v) => o.includes(v))) return true;
  }
  return false;
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
      headers: { 'User-Agent': `gao-lab-site (mailto:${POLITE_EMAIL})` },
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
  const byDoi = new Map();
  for (const w of works) {
    if (w.doi && redactSet.has(w.doi)) continue;
    byDoi.set(w.doi ?? `nodoi:${w.id}`, w);
  }
  for (const add of overrides.additions ?? []) {
    const key = add.doi ? add.doi.toLowerCase() : `manual:${add.title}`;
    if (!byDoi.has(key)) byDoi.set(key, add);
  }
  const merged = [...byDoi.values()].map((w) => ({
    ...w,
    selected: w.doi ? selectedSet.has(w.doi.toLowerCase()) : false,
  }));
  merged.sort((a, b) => {
    if (b.year !== a.year) return (b.year ?? 0) - (a.year ?? 0);
    return (b.citations ?? 0) - (a.citations ?? 0);
  });
  return merged;
}

console.log(`Fetching publications for ORCID ${ORCID} from OpenAlex…`);
const raw = await fetchAll();
console.log(`  fetched ${raw.length} candidates from OpenAlex`);
const strict = raw.filter(hasPiOrcid);
console.log(`  kept ${strict.length} with verified ORCID match (dropped ${raw.length - strict.length} name-only matches)`);
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
