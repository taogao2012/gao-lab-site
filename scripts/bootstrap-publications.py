#!/usr/bin/env python3
"""One-time bootstrap of publications.json before Node is installed.

Mirrors scripts/fetch-publications.mjs as a Python script using only stdlib.
After Node is installed, prefer `npm run fetch:publications` (the .mjs version),
which is what the GitHub Action also runs.
"""
import json
import os
import urllib.parse
import urllib.request
from pathlib import Path

ORCID = "0000-0003-0204-3269"
PI_LAST_NAME = "Gao"
PI_FIRST_INITIAL = "T"
# OpenAlex polite-pool contact. Optional — set OPENALEX_MAILTO in the environment
# if desired; left unset so no personal email is committed to the repo.
POLITE_EMAIL = os.environ.get("OPENALEX_MAILTO", "")

ROOT = Path(__file__).resolve().parent.parent
OVERRIDES = ROOT / "src/data/publications.overrides.json"
OUT = ROOT / "src/data/publications.json"

SELECT = ",".join([
    "id", "doi", "title", "display_name", "publication_year",
    "publication_date", "type", "cited_by_count",
    "authorships", "primary_location", "open_access",
    "biblio", "abstract_inverted_index", "institutions_distinct_count",
])

# OpenAlex's author.orcid filter still returns works where the ORCID isn't
# attached to any authorship record (name-only matches). Tao Gao is a
# common name, so many of those are not his. Require the PI's ORCID to
# appear on at least one authorship record.
ORCID_VARIANTS = (
    f"https://orcid.org/{ORCID}",
    f"http://orcid.org/{ORCID}",
    ORCID,
)

EXCLUDED_TYPES = {"erratum", "editorial", "letter", "retraction", "paratext"}

# Distinguish journals from conference abstracts and preprints.
CONFERENCE_VENUES = ("ECS Meeting Abstracts", "MRS Online Proceedings", "AIChE Proceedings")
PREPRINT_VENUES = ("SSRN Electronic Journal", "ChemRxiv", "arXiv", "Research Square", "bioRxiv", "ESS Open Archive")


def venue_kind(venue: str | None) -> str:
    if not venue:
        return "journal"
    for v in CONFERENCE_VENUES:
        if v in venue:
            return "conference"
    for v in PREPRINT_VENUES:
        if v in venue:
            return "preprint"
    return "journal"

# OpenAlex assigns the same ORCID to multiple "Tao Gao" author profiles
# (poor disambiguation). The PI's career path is Tsinghua → Maryland → MIT
# → Utah. Filter to authorships where his institution matches one of these.
# Skip the institution check for venues (preprints, conference abstracts)
# that don't reliably carry affiliation metadata.
PI_INSTITUTION_KEYWORDS = (
    "university of maryland",
    "massachusetts institute of technology",
    "university of utah",
    "tsinghua university",
)
SKIP_INSTITUTION_VENUES = ("ECS Meeting Abstracts", "SSRN", "ChemRxiv", "arXiv", "Research Square")


def has_pi_orcid(work):
    for a in work.get("authorships") or []:
        author_orcid = (a.get("author") or {}).get("orcid") or ""
        if any(v in author_orcid for v in ORCID_VARIANTS):
            return True
    return False


def pi_authorship(work):
    """Return the authorship record that belongs to the PI (ORCID-matched), or None."""
    for a in work.get("authorships") or []:
        author_orcid = (a.get("author") or {}).get("orcid") or ""
        if any(v in author_orcid for v in ORCID_VARIANTS):
            return a
    # ORCID not on any authorship: fall back to name match
    for a in work.get("authorships") or []:
        name = (a.get("author") or {}).get("display_name") or ""
        if name.strip() == "Tao Gao":
            return a
    return None


def is_pi_paper(work):
    """Strict filter: PI must (a) be on the paper and (b) be affiliated with one of his institutions."""
    a = pi_authorship(work)
    if not a:
        return False
    # Allow venues that don't carry good affiliation metadata.
    venue = (work.get("primary_location") or {}).get("source", {})
    venue = venue.get("display_name") if venue else None
    if venue and any(s.lower() in venue.lower() for s in SKIP_INSTITUTION_VENUES):
        return True
    insts = a.get("institutions") or []
    for inst in insts:
        name = (inst.get("display_name") or "").lower()
        if any(kw in name for kw in PI_INSTITUTION_KEYWORDS):
            return True
    # Also check raw affiliation strings (catches cases where the institution
    # link wasn't resolved but the affiliation string mentions it).
    for aff in a.get("affiliations") or []:
        raw = (aff.get("raw_affiliation_string") or "").lower()
        if any(kw in raw for kw in PI_INSTITUTION_KEYWORDS):
            return True
    return False


def fetch_all():
    works = []
    cursor = "*"
    page = 0
    while cursor:
        params = {
            "filter": f"author.orcid:{ORCID}",
            "per-page": "200",
            "cursor": cursor,
            "select": SELECT,
        }
        if POLITE_EMAIL:
            params["mailto"] = POLITE_EMAIL
        url = "https://api.openalex.org/works?" + urllib.parse.urlencode(params)
        ua = f"gao-lab-site (mailto:{POLITE_EMAIL})" if POLITE_EMAIL else "gao-lab-site"
        req = urllib.request.Request(url, headers={"User-Agent": ua})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
        results = data.get("results", [])
        works.extend(results)
        cursor = data.get("meta", {}).get("next_cursor")
        page += 1
        print(f"  page {page}: {len(results)} works (total {len(works)} / {data['meta']['count']})")
        if not results:
            break
    return works


def reconstruct_abstract(inv):
    if not inv:
        return None
    tokens = []
    max_pos = -1
    for word, positions in inv.items():
        for p in positions:
            while len(tokens) <= p:
                tokens.append("")
            tokens[p] = word
            if p > max_pos:
                max_pos = p
    out = " ".join(t for t in tokens if t)
    return out[:1200].rstrip() + "…" if len(out) > 1200 else out


def normalize(work):
    doi = work.get("doi")
    if doi:
        doi = doi.replace("https://doi.org/", "").replace("http://doi.org/", "").lower()
    venue = (work.get("primary_location") or {}).get("source", {})
    venue = venue.get("display_name") if venue else None
    kind = venue_kind(venue)
    is_journal = kind == "journal"
    authors = []
    for a in work.get("authorships") or []:
        name = (a.get("author") or {}).get("display_name") or ""
        parts = name.split()
        is_pi = bool(parts) and parts[-1] == PI_LAST_NAME and parts[0].startswith(PI_FIRST_INITIAL)
        authors.append({"name": name, "isPI": is_pi})
    return {
        "id": work.get("id"),
        "doi": doi,
        "title": work.get("title") or work.get("display_name") or "(untitled)",
        "year": work.get("publication_year"),
        "date": work.get("publication_date"),
        "type": work.get("type"),
        "citations": work.get("cited_by_count") or 0,
        "venue": venue,
        "volume": (work.get("biblio") or {}).get("volume"),
        "issue": (work.get("biblio") or {}).get("issue"),
        "firstPage": (work.get("biblio") or {}).get("first_page"),
        "lastPage": (work.get("biblio") or {}).get("last_page"),
        "oaUrl": (work.get("open_access") or {}).get("oa_url"),
        "abstract": reconstruct_abstract(work.get("abstract_inverted_index")),
        "authors": authors,
        "isJournal": is_journal,
        "kind": kind,
    }


def apply_overrides(works):
    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8")) if OVERRIDES.exists() else {}
    redact = {d.lower() for d in overrides.get("redactions", [])}
    selected = {d.lower() for d in overrides.get("selected", [])}
    by_doi = {}
    for w in works:
        if w.get("doi") and w["doi"] in redact:
            continue
        key = w.get("doi") or f"nodoi:{w['id']}"
        by_doi[key] = w
    for add in overrides.get("additions", []):
        key = (add.get("doi") or "").lower() or f"manual:{add.get('title')}"
        by_doi.setdefault(key, add)
    merged = list(by_doi.values())
    for w in merged:
        w["selected"] = bool(w.get("doi") and w["doi"] in selected)
    merged.sort(key=lambda w: ((w.get("year") or 0), (w.get("citations") or 0)), reverse=True)
    return merged


def main():
    print(f"Fetching publications for ORCID {ORCID} from OpenAlex…")
    raw = fetch_all()
    print(f"  fetched {len(raw)} candidates from OpenAlex")
    typed = [w for w in raw if (w.get("type") or "").lower() not in EXCLUDED_TYPES]
    print(f"  kept {len(typed)} after dropping erratum/editorial/letter/retraction")
    institution_filtered = [w for w in typed if is_pi_paper(w)]
    print(f"  kept {len(institution_filtered)} after institution filter (Maryland/MIT/Utah/Tsinghua)")
    normalized = [normalize(w) for w in institution_filtered]
    merged = apply_overrides(normalized)
    by_year = {}
    for w in merged:
        k = w.get("year") or "unknown"
        by_year[k] = by_year.get(k, 0) + 1
    out = {
        "$generatedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "$source": f"OpenAlex (ORCID {ORCID}) merged with publications.overrides.json (Python bootstrap)",
        "count": len(merged),
        "byYear": by_year,
        "items": merged,
    }
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nWrote {len(merged)} publications -> {OUT}")
    print(f"Selected (highlights): {sum(1 for w in merged if w.get('selected'))}")


if __name__ == "__main__":
    main()
