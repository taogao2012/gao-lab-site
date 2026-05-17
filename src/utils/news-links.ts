import cv from '../data/cv.json';

type PersonStatus = 'pi' | 'current' | 'alumni';
type AliasEntry = { alias: string; status: PersonStatus };

function aliasesFor(name: string): string[] {
  const parens = name.match(/\(([^)]+)\)/);
  const cleanName = name.replace(/\s*\([^)]+\)/, '').trim();
  const parts = cleanName.split(/\s+/);
  const out = new Set<string>();
  out.add(name);
  out.add(cleanName);
  if (parts[0]) out.add(parts[0]);
  if (parens) out.add(parens[1]);
  return [...out];
}

const aliases: AliasEntry[] = (() => {
  const out: AliasEntry[] = [];
  for (const a of ['Tao Gao', 'Professor Gao', 'Prof. Gao', 'Dr. Gao']) {
    out.push({ alias: a, status: 'pi' });
  }
  for (const s of cv.students.graduate) {
    for (const a of aliasesFor(s.name)) out.push({ alias: a, status: s.graduated ? 'alumni' : 'current' });
  }
  for (const s of cv.students.postdoc) {
    for (const a of aliasesFor(s.name)) out.push({ alias: a, status: s.now ? 'alumni' : 'current' });
  }
  for (const s of cv.students.undergrad) {
    const current = /present/i.test(s.period ?? '');
    for (const a of aliasesFor(s.name)) out.push({ alias: a, status: current ? 'current' : 'alumni' });
  }
  for (const s of cv.students.visiting) {
    for (const a of aliasesFor(s.name)) out.push({ alias: a, status: s.ended ? 'alumni' : 'current' });
  }
  return out;
})();

const sortedAliases = [...aliases].sort((a, b) => b.alias.length - a.alias.length);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findPersonStatus(title: string): PersonStatus | null {
  for (const { alias, status } of sortedAliases) {
    const re = new RegExp(`\\b${escapeRegExp(alias)}\\b`);
    if (re.test(title)) return status;
  }
  return null;
}

export type NewsItem = { title: string; link?: string; tags?: string[] };

export function newsLinkFor(item: NewsItem): string | undefined {
  if (item.link) return item.link;
  const tags = item.tags ?? [];
  if (tags.some((t) => t === 'talk' || t === 'seminar' || t === 'conference')) return '/talks/';
  if (tags.includes('people')) {
    const status = findPersonStatus(item.title);
    if (status === 'pi') return '/people/pi/';
    if (status === 'current') return '/people/current/';
    if (status === 'alumni') return '/people/alumni/';
    return '/people/';
  }
  return undefined;
}

export function isExternalLink(href: string): boolean {
  return /^(https?:|\/\/|mailto:)/i.test(href) || /\.(pdf|docx?|pptx?|xlsx?)$/i.test(href);
}
