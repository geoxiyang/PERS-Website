#!/usr/bin/env python3
"""
bib_to_publications.py
======================
Converts a BibTeX (.bib) file exported from Google Scholar, Zotero, or
any reference manager into the PUBLICATIONS array format used by src/data.jsx,
then patches it in-place.

Usage
-----
  python bib_to_publications.py my_papers.bib
  python bib_to_publications.py my_papers.bib --preview   # print JS, don't write
  python bib_to_publications.py my_papers.bib --out src/data.jsx

Requirements: Python 3.8+, no third-party packages needed.
"""

import re
import sys
import json
import argparse
from collections import defaultdict
from pathlib import Path


# ── Auto-tagging rules ───────────────────────────────────────────────────────
# Each rule is (regex pattern, tag label). Matched against title + journal/venue.
# Earlier rules take priority. Add or edit freely.

TAG_RULES = [
    (r"\bSIF\b|solar.induced.chlorophyll.fluorescence", "SIF"),
    (r"\bfluorescence\b", "SIF"),
    (r"\bGPP\b|gross.primary.product", "GPP"),
    (r"\bLiDAR\b|lidar|terrestrial.laser.scan|TLS\b|TLSLeAF", "TLS"),
    (r"\bhyperspectral\b", "Hyperspectral"),
    (r"\bUAV\b|\bdrone\b|\bproximal.remote.sens", "Proximal RS"),
    (r"\bcoastal\b|sea.level.rise|ghost.forest|saltwater.intrusion|wetland", "Coastal"),
    (r"\bdrought\b|water.stress|VPD\b|aridity", "Drought"),
    (r"\bdeep.learning\b|machine.learning\b|neural.net|random.forest", "ML"),
    (r"\btree.mortality\b|forest.mortality\b|tree.die.off", "Tree mortality"),
    (r"\bleaf.trait\b|leaf.angle\b|leaf.area\b|spectroscop", "Leaf traits"),
    (r"\bcanopy.structure\b|canopy.architecture\b|crown", "Canopy structure"),
    (r"\bcarbon.sink\b|carbon.uptake\b|NEE\b|net.ecosystem", "Carbon"),
    (r"\bphotosynthes", "Photosynthesis"),
    (r"\barctic\b|tundra\b|boreal\b|permafrost", "Arctic"),
    (r"\btropical\b|tropics\b|rainforest", "Tropical"),
    (r"\bgrassland\b|prairie\b|savanna", "Grassland"),
    (r"\bcrop\b|soybean\b|maize\b|corn\b|agriculture\b", "Crops"),
    (r"\bCLM\b|FATES\b|SCOPE\b|radiative.transfer.model", "Modeling"),
    (r"\breview\b|synthesis\b|meta.analy", "Review"),
    (r"\bdata\b|dataset\b|data.publication", "Data"),
]

MAX_TAGS = 3  # cap per entry


def auto_tag(title: str, venue: str) -> list[str]:
    text = (title + " " + venue).lower()
    tags = []
    for pattern, label in TAG_RULES:
        if re.search(pattern, text, re.IGNORECASE) and label not in tags:
            tags.append(label)
        if len(tags) >= MAX_TAGS:
            break
    return tags or ["Remote sensing"]


# ── BibTeX parser ────────────────────────────────────────────────────────────

def strip_latex(s: str) -> str:
    """Remove common LaTeX markup and braces."""
    # Accented characters
    accents = {
        r"\'a": "á", r"\'e": "é", r"\'i": "í", r"\'o": "ó", r"\'u": "ú",
        r"\`a": "à", r"\`e": "è", r"\`i": "ì", r"\`o": "ò", r"\`u": "ù",
        r"\^a": "â", r"\^e": "ê", r"\^i": "î", r"\^o": "ô", r"\^u": "û",
        r'\"a': "ä", r'\"e': "ë", r'\"i': "ï", r'\"o': "ö", r'\"u': "ü",
        r"\~n": "ñ", r"\~a": "ã", r"\~o": "õ",
        r"\c{c}": "ç", r"\ss": "ß",
        r"\&": "&", r"\%": "%", r"\$": "$", r"\#": "#",
    }
    for latex, char in accents.items():
        s = s.replace(latex, char)
    # Commands like \textit{...} → ...
    s = re.sub(r"\\text\w+\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\emph\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\{([^}]*)\}", r"\1", s)  # bare braces
    s = re.sub(r"\\[a-zA-Z]+\s*", "", s)  # remaining commands
    return s.strip()


def format_authors(raw: str) -> str:
    """
    Convert BibTeX author string to 'Last, F., Last, F., ...' format.
    Handles both 'Last, First' and 'First Last' styles, and 'and' separators.
    Replaces trailing authors with 'et al.' if >8 authors.
    """
    parts = re.split(r"\s+and\s+", raw, flags=re.IGNORECASE)
    formatted = []
    for part in parts:
        part = strip_latex(part.strip())
        if not part:
            continue
        if "," in part:
            # "Last, First Middle" form
            last, *rest = part.split(",", 1)
            first = rest[0].strip() if rest else ""
        else:
            # "First Middle Last" form
            tokens = part.split()
            last = tokens[-1] if tokens else part
            first = " ".join(tokens[:-1])
        # Abbreviate first name(s)
        initials = "".join(w[0] + "." for w in first.split() if w)
        formatted.append(f"{last.strip()}, {initials}" if initials else last.strip())
    if len(formatted) > 8:
        formatted = formatted[:6] + ["et al."]
    return ", ".join(formatted)


def parse_bibtex(text: str) -> list[dict]:
    """
    Minimal BibTeX parser. Returns list of dicts with keys:
    type, key, title, authors, year, venue, doi, keywords, pages, volume, number.
    """
    entries = []
    # Find each @type{key, ...} block
    pattern = re.compile(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", re.IGNORECASE)
    starts = [(m.start(), m.group(1), m.group(2)) for m in pattern.finditer(text)]

    for i, (start, etype, key) in enumerate(starts):
        # Extract the block up to the next entry (or end of file)
        end = starts[i + 1][0] if i + 1 < len(starts) else len(text)
        block = text[start:end]

        # Parse fields with a tolerant regex
        # Matches:  fieldname = {value}  or  fieldname = "value"  or  fieldname = 1234
        field_re = re.compile(
            r"(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|\"([^\"]*)\"|(\d+))",
            re.DOTALL,
        )
        fields: dict[str, str] = {}
        for fm in field_re.finditer(block):
            fname = fm.group(1).lower()
            fval = fm.group(2) or fm.group(3) or fm.group(4) or ""
            fields[fname] = fval.strip()

        if etype.lower() == "phdthesis" or not fields.get("year"):
            continue  # skip theses and incomplete entries

        # Venue: prefer journal, then booktitle, then publisher
        venue_parts = []
        journal = strip_latex(fields.get("journal", "") or fields.get("booktitle", ""))
        if journal:
            venue_parts.append(journal)
        vol = fields.get("volume", "")
        num = fields.get("number", "")
        pages = fields.get("pages", "").replace("--", "–")
        if vol:
            venue_parts.append(f"{vol}{'(' + num + ')' if num else ''}")
        if pages:
            venue_parts.append(pages)

        entries.append({
            "type": etype.lower(),
            "key": key,
            "title": strip_latex(fields.get("title", "Untitled")),
            "authors": format_authors(fields.get("author", "")),
            "year": int(fields.get("year", 0)),
            "venue": ": ".join(venue_parts) if venue_parts else "Preprint",
            "doi": fields.get("doi", ""),
            "keywords": fields.get("keywords", ""),
        })

    return entries


# ── JS serialiser ────────────────────────────────────────────────────────────

def entries_to_js(entries: list[dict]) -> str:
    """Return the full PUBLICATIONS = [...] JS block."""
    by_year: dict[int, list[dict]] = defaultdict(list)
    for e in entries:
        by_year[e["year"]].append(e)

    lines = ["const PUBLICATIONS = ["]
    for year in sorted(by_year.keys(), reverse=True):
        lines.append(f"  {{")
        lines.append(f"    year: {year},")
        lines.append(f"    items: [")
        for e in by_year[year]:
            tags = auto_tag(e["title"], e["venue"])
            tags_js = json.dumps(tags)
            lines.append(f"      {{")
            lines.append(f'        authors: {json.dumps(e["authors"])},')
            lines.append(f'        title: {json.dumps(e["title"])},')
            lines.append(f'        venue: {json.dumps(e["venue"])},')
            lines.append(f'        doi: {json.dumps(e["doi"])},')
            lines.append(f"        tags: {tags_js},")
            lines.append(f"      }},")
        lines.append(f"    ],")
        lines.append(f"  }},")
    lines.append("];")
    return "\n".join(lines)


# ── Patch src/data.jsx ───────────────────────────────────────────────────────

BLOCK_START = re.compile(r"^const PUBLICATIONS\s*=\s*\[", re.MULTILINE)
BLOCK_END   = re.compile(r"^\];", re.MULTILINE)


def patch_data_jsx(jsx_path: Path, new_block: str) -> str:
    """Replace the PUBLICATIONS block in data.jsx and return the new content."""
    src = jsx_path.read_text(encoding="utf-8")

    m_start = BLOCK_START.search(src)
    if not m_start:
        raise ValueError("Could not find 'const PUBLICATIONS = [' in " + str(jsx_path))

    # Find the matching closing ]; after the block start
    search_from = m_start.end()
    m_end = BLOCK_END.search(src, search_from)
    if not m_end:
        raise ValueError("Could not find closing ']; for PUBLICATIONS in " + str(jsx_path))

    before = src[: m_start.start()]
    after  = src[m_end.end():]
    return before + new_block + after


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Convert .bib → PUBLICATIONS in src/data.jsx")
    parser.add_argument("bib", help="Path to your .bib file")
    parser.add_argument("--out", default="src/data.jsx",
                        help="Target JS file to patch (default: src/data.jsx)")
    parser.add_argument("--preview", action="store_true",
                        help="Print the generated JS block without writing anything")
    args = parser.parse_args()

    bib_path = Path(args.bib)
    if not bib_path.exists():
        sys.exit(f"Error: {bib_path} not found.")

    raw = bib_path.read_text(encoding="utf-8", errors="replace")
    entries = parse_bibtex(raw)

    if not entries:
        sys.exit("No valid BibTeX entries found. Check your .bib file.")

    print(f"Parsed {len(entries)} entries across "
          f"{len({e['year'] for e in entries})} years.")

    js_block = entries_to_js(entries)

    if args.preview:
        print("\n" + js_block)
        return

    out_path = Path(args.out)
    if not out_path.exists():
        sys.exit(f"Error: {out_path} not found.")

    new_src = patch_data_jsx(out_path, js_block)
    out_path.write_text(new_src, encoding="utf-8")
    print(f"✓ Patched {out_path} successfully.")
    print("  Refresh the browser to see the updated publication list.")


if __name__ == "__main__":
    main()
