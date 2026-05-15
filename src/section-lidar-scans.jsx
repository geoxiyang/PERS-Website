// Home page section: TLS point cloud viewer with scan switcher.
// Scan switching reloads the iframe src — simplest and most reliable approach.

function SectionLiDARScans() {
  const [selected, setSelected] = React.useState(SCANS[0] || null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [filterSite, setFilterSite] = React.useState("");
  const [filterSpecies, setFilterSpecies] = React.useState("");
  const iframeRef = React.useRef(null);

  // Listen for SCAN_LOADED messages from the Potree iframe
  React.useEffect(() => {
    const onMessage = (e) => {
      if (e.data && e.data.type === "SCAN_LOADED") setLoading(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const switchScan = (scan) => {
    if (scan.id === selected?.id) return;
    setSelected(scan);
    setLoading(true);
    // Reload the iframe with the new scan path — avoids Potree's complex scene API
    if (iframeRef.current) {
      iframeRef.current.src = `potree-viewer.html?path=${encodeURIComponent(scan.potreePath)}`;
    }
  };

  // Derive unique values for filter dropdowns
  const allSites = React.useMemo(() => {
    const seen = new Map();
    SCANS.forEach(s => { if (!seen.has(s.siteId)) seen.set(s.siteId, s.site); });
    return Array.from(seen.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const allSpecies = React.useMemo(
    () => [...new Set(SCANS.map(s => s.species))].sort(),
    []
  );

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase();
    return SCANS.filter(s => {
      if (filterSite && s.siteId !== filterSite) return false;
      if (filterSpecies && s.species !== filterSpecies) return false;
      if (q && !s.name.toLowerCase().includes(q) &&
              !s.species.toLowerCase().includes(q) &&
              !s.site.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, filterSite, filterSpecies]);

  const iframeSrc = selected
    ? `potree-viewer.html?path=${encodeURIComponent(selected.potreePath)}`
    : "potree-viewer.html";

  return (
    <section className="block" style={{ borderTop: "1px solid var(--line)" }}>
      <SectionHead
        index="03"
        eyebrow="Field LiDAR"
        title="Terrestrial laser scans."
        sub="Interactive 3D point clouds captured with our TLS instruments across field sites. Rotate, zoom, and explore individual trees at millimeter resolution."
      />

      <div className="wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "var(--gap)",
          alignItems: "start",
        }} className="scan-layout">

          {/* ── Left: Potree viewer ── */}
          <div>
            <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", border: "1px solid var(--line)" }}>
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                style={{ width: "100%", height: 520, border: "none", display: "block" }}
                title="3D point cloud viewer"
                allow="fullscreen"
              />

              {/* Loading overlay */}
              {loading && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "color-mix(in srgb, var(--ink) 92%, transparent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "0.85rem",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.12)",
                    borderTopColor: "var(--lichen)",
                    animation: "scanSpin 0.9s linear infinite",
                  }} />
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                    Loading scan…
                  </span>
                </div>
              )}
            </div>

            {/* Metadata strip below viewer */}
            {selected && (
              <div style={{
                marginTop: "0.9rem", paddingBottom: "0.25rem",
                display: "flex", flexWrap: "wrap", gap: "0.4rem 1.5rem",
                borderBottom: "1px solid var(--line)",
              }}>
                <MetaItem label="Tree" value={selected.name} />
                <MetaItem label="Species" value={<em>{selected.species}</em>} />
                <MetaItem label="Site" value={selected.site} />
                <MetaItem label="Collected" value={selected.date} />
              </div>
            )}
            {selected?.description && (
              <p style={{ marginTop: "0.75rem", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: "68ch" }}>
                {selected.description}
              </p>
            )}
          </div>

          {/* ── Right: Scan list with search + filters ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>

            {/* Search */}
            <input
              type="search"
              placeholder="Search scans…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "0.5rem 0.75rem",
                border: "1px solid var(--line)", borderRadius: 4,
                background: "var(--paper)", color: "var(--ink)",
                fontFamily: "var(--mono)", fontSize: 12,
                outline: "none",
              }}
            />

            {/* Filter row */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <FilterSelect
                value={filterSite}
                onChange={setFilterSite}
                placeholder="All sites"
                options={allSites.map(([id, name]) => ({ value: id, label: name }))}
              />
              <FilterSelect
                value={filterSpecies}
                onChange={setFilterSpecies}
                placeholder="All species"
                options={allSpecies.map(sp => ({ value: sp, label: sp }))}
              />
            </div>

            {/* Scan list */}
            <div style={{
              maxHeight: 460, overflowY: "auto",
              display: "flex", flexDirection: "column", gap: "1px",
              border: "1px solid var(--line)", borderRadius: 4,
              background: "var(--line)",
            }}>
              {filtered.length === 0 ? (
                <div className="mono" style={{ padding: "1.5rem", fontSize: 12, color: "var(--ink-3)", textAlign: "center" }}>
                  No scans match
                </div>
              ) : filtered.map(scan => (
                <ScanListItem
                  key={scan.id}
                  scan={scan}
                  active={scan.id === selected?.id}
                  onClick={() => switchScan(scan)}
                />
              ))}
            </div>

            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              {filtered.length} of {SCANS.length} scans
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanSpin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          .scan-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ScanListItem({ scan, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.65rem 0.85rem",
        background: active ? "var(--bg-2)" : hover ? "color-mix(in srgb, var(--bg) 96%, var(--forest))" : "var(--paper)",
        borderLeft: `3px solid ${active ? "var(--forest)" : "transparent"}`,
        border: "none", width: "100%", cursor: "pointer", textAlign: "left",
        transition: "background 0.15s",
      }}
    >
      {/* Thumbnail */}
      <ScanThumb src={scan.thumbnail} alt={scan.name} />

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: active ? 500 : 400,
          color: active ? "var(--ink)" : "var(--ink-2)",
          lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {scan.name}
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: "0.25rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          <em style={{ fontStyle: "italic", fontFamily: "var(--serif)" }}>{scan.species}</em>
          {" · "}{scan.date}
        </div>
      </div>
    </button>
  );
}

function ScanThumb({ src, alt }) {
  const [failed, setFailed] = React.useState(false);
  if (failed || !src) {
    return (
      <div style={{
        width: 44, height: 36, flexShrink: 0, borderRadius: 3,
        background: "color-mix(in srgb, var(--forest) 18%, var(--bg))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16,
      }}>
        ⬡
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt}
      onError={() => setFailed(true)}
      style={{ width: 44, height: 36, flexShrink: 0, borderRadius: 3, objectFit: "cover" }}
    />
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        {label}{" "}
      </span>
      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{value}</span>
    </div>
  );
}

function FilterSelect({ value, onChange, placeholder, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        flex: 1, padding: "0.45rem 0.6rem",
        border: "1px solid var(--line)", borderRadius: 4,
        background: "var(--paper)", color: value ? "var(--ink)" : "var(--ink-3)",
        fontFamily: "var(--mono)", fontSize: 11,
        cursor: "pointer", outline: "none",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

Object.assign(window, { SectionLiDARScans });
