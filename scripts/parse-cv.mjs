#!/usr/bin/env node
// Convert the latest CV_Tao_GAO_Academia_*.docx into a flattened markdown
// snapshot at scripts/cv-source.md, so the PI can manually reconcile changes
// into src/data/cv.json before committing.
//
// Why manual reconciliation: the CV is authored prose, not a structured form.
// Auto-parsing it into the JSON schema reliably is harder than reading the
// markdown diff and editing the JSON by hand a few times a year.
//
// Usage:
//   node scripts/parse-cv.mjs
//
// Optional: pass an explicit path: node scripts/parse-cv.mjs path/to/CV.docx

import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
// Source content (CVs, photos, papers) lives in the Drive folder.
// The site repo lives locally so npm install doesn't fight Drive sync.
// Override with GAO_LAB_CONTENT_DIR if your Drive path differs.
const repoParent = process.env.GAO_LAB_CONTENT_DIR || 'G:\\My Drive\\6-website';

function findLatestCV(dir) {
  const matches = readdirSync(dir)
    .filter((f) => /^CV_Tao_GAO_Academia_\d{4}_\d{4}\.(docx|doc)$/i.test(f))
    .filter((f) => !f.startsWith('~'))
    .map((f) => ({
      name: f,
      mtime: statSync(join(dir, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
  return matches[0] ? join(dir, matches[0].name) : null;
}

const explicit = process.argv[2];
const cvPath = explicit ? resolve(explicit) : findLatestCV(repoParent);

if (!cvPath || !existsSync(cvPath)) {
  console.error('Could not find a CV file. Looked in:', repoParent);
  console.error('Expected pattern: CV_Tao_GAO_Academia_YYYY_MMDD.docx');
  process.exit(1);
}

const outMd = join(__dirname, 'cv-source.md');
console.log(`Parsing CV: ${cvPath}`);

try {
  execSync(`pandoc -f docx -t markdown "${cvPath}" -o "${outMd}" --wrap=none`, {
    stdio: 'inherit',
  });
} catch (err) {
  console.error('pandoc failed. Install pandoc from https://pandoc.org and retry.');
  process.exit(1);
}

console.log('');
console.log(`Wrote: ${outMd}`);
console.log('');
console.log('Next: open the markdown alongside src/data/cv.json and reconcile any changes.');
console.log('Commit only the cv.json edits — cv-source.md is a working artifact.');
