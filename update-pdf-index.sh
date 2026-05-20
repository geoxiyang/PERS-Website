#!/bin/bash
# Drop any PDF(s) into uploads/papers/ and run this script.
# It will:
#   1. Read each unrecognized PDF, extract its DOI, and rename it
#      to match the corresponding BibTeX key from uploads/works.bib
#   2. Regenerate uploads/papers/index.json so the website shows
#      PDF download links automatically
#
# Usage: ./update-pdf-index.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PAPERS_DIR="$SCRIPT_DIR/uploads/papers"
BIB_FILE="$SCRIPT_DIR/uploads/works.bib"
INDEX_FILE="$PAPERS_DIR/index.json"

python3 - "$BIB_FILE" "$PAPERS_DIR" "$INDEX_FILE" <<'PYEOF'
import sys, re, os, subprocess, json

bib_file, papers_dir, index_file = sys.argv[1], sys.argv[2], sys.argv[3]

# ── Parse BibTeX ──────────────────────────────────────────────────────────────

def split_entries(text):
    entries = []
    i = 0
    while i < len(text):
        at = text.find('@', i)
        if at == -1:
            break
        brace = text.find('{', at)
        if brace == -1:
            break
        depth, j = 0, brace
        while j < len(text):
            if text[j] == '{':
                depth += 1
            elif text[j] == '}':
                depth -= 1
                if depth == 0:
                    entries.append(text[at:j+1])
                    break
            j += 1
        i = j + 1
    return entries

def get_field(content, field):
    m = re.search(rf'{field}\s*=\s*\{{((?:[^{{}}]|\{{[^{{}}]*\}})*)\}}', content, re.I)
    if m:
        return m.group(1).strip()
    m = re.search(rf'{field}\s*=\s*"([^"]*)"', content, re.I)
    if m:
        return m.group(1).strip()
    m = re.search(rf'{field}\s*=\s*([^,}}\n]+)', content, re.I)
    if m:
        return m.group(1).strip()
    return ''

with open(bib_file, 'r', encoding='utf-8', errors='ignore') as f:
    bib_text = f.read()

bib_entries = []
for raw in split_entries(bib_text):
    m = re.match(r'@(\w+)\{', raw)
    if not m or m.group(1).lower() in ('preamble', 'string', 'comment'):
        continue
    inner = raw[raw.index('{')+1:raw.rindex('}')]
    comma = inner.find(',')
    key = inner[:comma].strip() if comma > -1 else inner.strip()
    content = inner[comma+1:] if comma > -1 else ''
    doi = re.sub(r'[{}\s]', '', get_field(content, 'doi')).lower()
    bib_entries.append({'key': key, 'doi': doi})

known_keys = {e['key'] for e in bib_entries}
doi_to_key = {}
for e in bib_entries:
    if e['doi'] and e['doi'] not in doi_to_key:
        doi_to_key[e['doi']] = e['key']

# ── Process PDFs ──────────────────────────────────────────────────────────────

def extract_doi(pdf_path):
    try:
        result = subprocess.run(
            ['strings', pdf_path],
            capture_output=True, text=True, errors='ignore', timeout=20
        )
        text = result.stdout
    except Exception:
        return None
    # DOI pattern — strip trailing punctuation
    m = re.search(r'(10\.\d{4,}/[^\s"\'<>{}\[\]\\]+)', text)
    if m:
        return m.group(1).rstrip('.,;)').lower()
    return None

unmatched = []
for fname in sorted(os.listdir(papers_dir)):
    if not fname.lower().endswith('.pdf'):
        continue
    stem = fname[:-4]
    fpath = os.path.join(papers_dir, fname)

    if stem in known_keys:
        print(f'  OK   {fname}')
        continue

    doi = extract_doi(fpath)
    if doi is None:
        print(f'  ?    {fname} — could not read PDF')
        unmatched.append(fname)
        continue

    key = doi_to_key.get(doi)
    if not key:
        print(f'  ?    {fname} — DOI {doi} not found in works.bib')
        unmatched.append(fname)
        continue

    new_name = key + '.pdf'
    new_path = os.path.join(papers_dir, new_name)
    if os.path.exists(new_path):
        print(f'  SKIP {fname} — target {new_name} already exists')
        unmatched.append(fname)
        continue

    os.rename(fpath, new_path)
    print(f'  →    {fname}  →  {new_name}')

if unmatched:
    print(f'\nCould not auto-match {len(unmatched)} file(s).')
    print('Rename them manually to their BibTeX key (e.g. Yang2023forest.pdf).')

# ── Regenerate index.json ─────────────────────────────────────────────────────

matched_keys = []
for fname in sorted(os.listdir(papers_dir)):
    if not fname.lower().endswith('.pdf'):
        continue
    stem = fname[:-4]
    if stem in known_keys:
        matched_keys.append(stem)

with open(index_file, 'w') as f:
    json.dump(matched_keys, f, indent=2)

print(f'\nindex.json updated — {len(matched_keys)} PDF(s) linked to publications.')

PYEOF
