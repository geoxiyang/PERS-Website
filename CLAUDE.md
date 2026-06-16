# CLAUDE.md

Guidance for AI assistants (Claude Code) working in this repository.

## What this is

The public website for the **Plant Ecology and Remote Sensing (PERS) Lab**
at the University of Virginia (PI: Xi Yang). It is a **static site with no
build step** — plain HTML/CSS/JS served as-is (e.g. via GitHub Pages or any
static host). There is no `package.json`, no bundler, no Node toolchain, and
no test suite.

## Entry points — two HTML files

- `index.html` — a minimal splash/landing page (looping background video,
  title, "ENTER THE PERS LAB" link). Self-contained, no React.
- `Lab Website.html` — **the actual application**. This is what
  `index.html` links to. It loads React 18 (UMD build), ReactDOM, and
  **Babel Standalone** from `unpkg.com` via `<script>` tags, then loads every
  page module as `<script type="text/babel" src="...">`. Babel transpiles
  the JSX in-browser at page load — there is no compile/build step to run.

Because of this, **script load order in `Lab Website.html` matters**: data
files must load before the components/pages that consume them, and
`src/app.jsx` (which calls `ReactDOM.createRoot(...).render(<App/>)`) must
load last. If you add a new `.jsx` file, add a corresponding
`<script type="text/babel" src="...">` tag in `Lab Website.html` in the
correct position.

All `src/*.jsx` files declare plain global `function`s/`const`s (no ES
modules, no `import`/`export`). Page/component files attach what they need
to `window` via `Object.assign(window, {...})` at the bottom (see
`src/component-map.jsx`, `src/data.jsx`) when other files need to reference
them — but most simply rely on functions being hoisted into global scope
since every file shares one execution context.

## Directory structure

```
index.html                 Splash page (entry point #1)
Lab Website.html            Main app shell + global CSS (entry point #2)
potree-viewer.html          Standalone iframe page that boots a Potree LiDAR viewer
news.json                   Lab news items, fetched at runtime (see below)
src/                        All JSX "modules" (no imports — load order is manual, see Lab Website.html)
  data.jsx                  LAB info, NAV, RESEARCH_THEMES, PEOPLE, PUBLICATIONS*, RESOURCES, COURSES
  gallery-data.jsx           GALLERY_IMAGES (photo gallery, grouped by field site)
  data-scans.jsx             SCANS (TLS/LiDAR point-cloud scan metadata)
  components.jsx              Shared chrome: NavBar, Footer, PageHeader, SectionHead, Placeholder...
  component-map.jsx           InteractiveMapComponent (Leaflet field-site map)
  section-lidar-scans.jsx     Home-page Potree viewer + scan switcher/filter UI
  pages-home.jsx               HomePage + 3 hero variants (cinematic/split/editorial)
  pages-research.jsx           ResearchPage + (legacy/unused) PublicationsPage, TeachingPage, ContactPage
  pages-people.jsx             PeoplePage
  pages-publications-v3.jsx    PublicationsPageV3 — THE LIVE publications page (see gotcha below)
  pages-publications.jsx       Empty stub — not used
  pages-publications-v2.jsx    Older implementation — not used
  pages-gallery.jsx            GalleryPage (filterable by field site)
  pages-data.jsx                DataPage (renders RESOURCES — datasets/code/apps)
  pages-join.jsx                 JoinPage
  pages-news.jsx                  NewsPage (renders NEWS, populated from news.json)
  pages-contact.jsx, pages-teaching.jsx   Empty stubs — real components live in pages-research.jsx
  app.jsx                       App shell: hash router, theme/density state, renders <App/>
tweaks-panel.jsx              Generic "Tweaks" floating panel + useTweaks() hook (dev/theming UI)
assets/                       Site logo etc.
images/                       Photos used by gallery/site (field-sites, people, news, research, general)
uploads/                      Larger media (videos, webp/jpg assets referenced by data.jsx/gallery-data.jsx)
uploads/works.bib             BibTeX library — source of truth for the live Publications page
uploads/papers/                 PDF reprints, named to match BibTeX keys, plus index.json (generated)
scans/<SCAN-ID>/                 PotreeConverter v2 output per scanned tree (metadata.json, octree.bin, hierarchy.bin)
libs/                          Vendored third-party JS libs (potree, leaflet via CDN instead, jquery, d3, proj4, three.js, etc.) — do not "npm install" these, they're committed as static files
bib_to_publications.py        Standalone script: BibTeX → PUBLICATIONS array in src/data.jsx (legacy path, see below)
update-pdf-index.sh           Admin script: matches uploads/papers/*.pdf to BibTeX keys, rewrites uploads/papers/index.json
neon_hyper_viz.py             Unrelated one-off script for NEON hyperspectral image compositing; not wired into the site
```

`*` See **Publications: two parallel systems** below — `PUBLICATIONS` in
`data.jsx` is legacy and not what's currently rendered.

## Routing

`src/app.jsx` implements a tiny hash-based router (no React Router):

- Route state is a string (`"home"`, `"research"`, `"people"`, ...) kept in
  `window.location.hash` and `React.useState`.
- The `NAV` array in `src/data.jsx` is the single source of truth for nav
  links — `{ id, label }`. Adding a page means: add a `NAV` entry, add a
  `case` in the `switch (route)` block in `app.jsx`, and add the page
  component's `<script>` tag in `Lab Website.html`.
- `window.__navTo(page, filter)` is exposed globally so non-React code
  (Leaflet popup HTML strings in `component-map.jsx`) can trigger navigation.

## Theming / "Tweaks" panel

`tweaks-panel.jsx` provides a generic floating dev panel (`useTweaks`,
`TweaksPanel`, `TweakRadio`, etc.) backed by `localStorage`. `app.jsx` uses it
to let you live-switch:
- **Theme palette**: `default` / `moss` / `bone` / `ink` — sets
  `document.documentElement.dataset.theme`, which selects CSS variable
  overrides defined in `Lab Website.html` (`[data-theme="..."]` blocks).
- **Home hero layout**: `cinematic` / `split` / `editorial` — picks which
  component in `pages-home.jsx` renders.
- **Density**: `compact` / `regular` / `spacious` — sets
  `data-density`, adjusting `--gap`/`--pad-y` CSS variables.

This panel is visible in production (bottom-right floating widget) — it's
intentionally part of the live site, not a dev-only tool to strip out.

## Content/data conventions

Most page content is plain JS data arrays in `src/data.jsx` and
`src/gallery-data.jsx` — editing the site usually means editing these arrays,
not the page components. Conventions to preserve when adding entries:

- **`PEOPLE`** (`data.jsx`): array of `{ role, members: [...] }` groups
  (PI, Postdocs, Grad Students, Alumni...). Each member has `id, name,
  title, bio, image, focus[], joined`, optional `email/linkedin/bluesky/scholar`.
- **`RESEARCH_THEMES`**: each theme has an `id` (`T-0N`), `title`, `blurb`,
  `site`, `palette` (`default`/`clay`/`lichen` — controls accent color/`Placeholder`
  styling), and optional `image`/`objectFit`/`aspect`.
- **Field sites** live in `src/component-map.jsx` as `FIELD_SITES`
  (`id: "fs-NN"`, `lat`, `lng`, `label`, `imageUrl`). `GALLERY_IMAGES` in
  `gallery-data.jsx` reference sites by matching `siteId` to a `FIELD_SITES.id`
  — keep these in sync when adding a new field site or gallery photos for it.
- **`RESOURCES`** (`data.jsx`): datasets/code/apps shown on the Data & Code
  page (`kind`, `title`, `citation`, `url`, `urlLabel`, optional `url2/urlLabel2`).

## News (`news.json`)

`NEWS` starts as an empty array in `data.jsx`; `app.jsx` fetches
`news.json` on mount and mutates the array in place (`NEWS.splice(...)`) so
all components see the update without prop drilling. **To add a news item,
edit `news.json` directly** (not `data.jsx`). Each item: `id, date, category,
title, excerpt, palette, image`.

## Publications: two parallel systems (important gotcha)

There are **three** publications page implementations in the repo, but only
one is live:

| Component | File | Status |
|---|---|---|
| `PublicationsPageV3` | `src/pages-publications-v3.jsx` | **Live** — wired in `app.jsx`. Fetches `uploads/works.bib` and parses BibTeX client-side; cross-references `uploads/papers/index.json` to show PDF download links. |
| `PublicationsPage` | `src/pages-research.jsx` | Unused — reads the static `PUBLICATIONS` array from `data.jsx`. Not referenced by the router. |
| (empty stub) | `src/pages-publications.jsx`, `src/pages-publications-v2.jsx` | Unused legacy files. |

**Implication:** `uploads/works.bib` is the actual source of truth for the
publications list shown on the site. The `PUBLICATIONS` array in
`data.jsx` and `bib_to_publications.py` (which patches that array) are
**legacy and currently have no effect on the rendered site** — don't assume
editing `PUBLICATIONS` changes what visitors see. If asked to add a
publication, edit `uploads/works.bib`.

### Adding a publication
1. Append a BibTeX entry to `uploads/works.bib` (any standard reference
   manager export format works — Google Scholar, Zotero, etc.).
2. If a PDF reprint should be linked, drop it into `uploads/papers/` named
   to match the BibTeX key (e.g. `Yang_2026.pdf`), or run
   `./update-pdf-index.sh`, which auto-renames PDFs by extracting their DOI
   and matching it against `works.bib`, then regenerates
   `uploads/papers/index.json`. The publications page fetches that JSON on
   load to decide which entries get a download link.

## LiDAR / Potree point-cloud viewer

- `scans/<SCAN-ID>/` directories each hold one PotreeConverter v2 output
  (`metadata.json`, `hierarchy.bin`, `octree.bin`, `log.txt`) for a single
  scanned tree. `SCAN-ID` convention: `<SITE>-<SPECIES-CODE>-<N>`, e.g.
  `HARV-QUAL-3` (Harvard Forest, *Quercus alba*, scan 3).
- `src/data-scans.jsx` (`SCANS` array) is the metadata catalog — each entry
  needs `id, name, species, site, siteId, date, description, potreePath`
  (pointing at that scan's `metadata.json`), `thumbnail`, `tags`. Adding a new
  scan means: drop the converted point cloud into `scans/<ID>/`, generate a
  thumbnail, and append an entry to `SCANS`.
- `potree-viewer.html` is a standalone page loaded **inside an `<iframe>`**
  by `src/section-lidar-scans.jsx` (`potree-viewer.html?path=<potreePath>`).
  Switching scans reloads the iframe `src` rather than calling into Potree's
  scene-management API directly — this was a deliberate simplicity tradeoff
  (see comment at the top of `section-lidar-scans.jsx`).
- `libs/potree/`, `libs/plasio/`, `libs/jquery*`, `libs/d3`, `libs/proj4`,
  `libs/openlayers3`, etc. are **vendored, committed third-party libraries**
  required by Potree — they are not managed by any package manager. Don't try
  to `npm install` or upgrade them casually; treat them as static assets.
- The field-site map (`InteractiveMapComponent` in `src/component-map.jsx`)
  uses **Leaflet** (loaded from CDN in `Lab Website.html`, not vendored)
  with Esri World Topo tiles — unrelated to the Potree/LiDAR stack.

## Working in this repo

- **No install/build/lint/test commands exist.** To preview changes, serve
  the directory with any static file server and open `Lab Website.html`
  (e.g. `python3 -m http.server` then visit `/Lab%20Website.html`). Opening
  the file directly via `file://` may break `fetch()` calls (`news.json`,
  `uploads/works.bib`, `uploads/papers/index.json`) due to CORS — use a
  local server.
- Babel Standalone in the browser means **syntax errors in any `.jsx` file
  surface only at runtime** (browser console), not at "compile time" — there
  is nothing to run to catch them ahead of time. Check the browser console
  after editing.
- `scans/`, `images/`, and `uploads/` contain large binary media (the repo
  includes ~1.8 GB of LiDAR scan data and ~350 MB of images/video). Avoid
  bulk-regenerating or re-encoding these casually.
- Respect the existing JSX style in this codebase: inline `style={{...}}`
  objects and a handful of global utility classes from `Lab Website.html`
  (`.wrap`, `.chip`, `.card`, `.btn`, `.ph`, CSS variables like `var(--forest)`,
  `var(--ink-2)`) rather than a CSS framework or CSS modules.
- When a page "doesn't seem to do anything" when edited, check `app.jsx`'s
  `switch` and `Lab Website.html`'s script tags first — there are several
  known-dead/legacy files in `src/` (see Publications table above, plus
  `pages-contact.jsx`/`pages-teaching.jsx`, which are stub comments pointing
  at the real implementations in `pages-research.jsx`).
