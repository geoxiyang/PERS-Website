// Publications page with BibTeX integration and interactive map

function PublicationsPageV2() {
  const [filter, setFilter] = React.useState("all");
  const [bibData, setBibData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showMap, setShowMap] = React.useState(false);

  React.useEffect(() => {
    // Load and parse BibTeX file
    fetch("uploads/works.bib")
      .then(r => r.text())
      .then(text => {
        const entries = parseBibTeX(text);
        setBibData(entries);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load BibTeX:", err);
        setLoading(false);
      });
  }, []);

  // Parse BibTeX entries into structured data
  const parseBibTeX = (bibtex) => {
    const entries = [];
    // Match @article{key, ... } or @misc{key, ... }
    const regex = /@(\w+)\{([^,]+),\s*([^}]+)\}/gs;
    let match;
    
    while ((match = regex.exec(bibtex)) !== null) {
      const type = match[1];
      const key = match[2].trim();
      const content = match[3];
      
      // Extract fields
      const entry = {
        key,
        type,
        title: extractField(content, "title"),
        authors: extractField(content, "author"),
        year: extractField(content, "year") || "Unknown",
        journal: extractField(content, "journal"),
        doi: extractField(content, "doi"),
        url: extractField(content, "url"),
      };
      
      if (entry.title) entries.push(entry);
    }
    
    // Sort by year descending
    return entries.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
  };

  const extractField = (content, fieldName) => {
    const regex = new RegExp(`${fieldName}\\s*=\\s*[{"]?([^,}"\n]+)[}"]?`, "i");
    const match = content.match(regex);
    if (match) {
      return match[1]
        .replace(/[{}]/g, "")
        .replace(/<\/?i>/g, "")
        .replace(/<scp>/g, "")
        .replace(/<\/scp>/g, "")
        .trim();
    }
    return "";
  };

  const allTags = ["all"];
  if (bibData) {
    const tags = new Set();
    bibData.forEach(entry => {
      const year = entry.year;
      if (year && year !== "Unknown") tags.add(year);
    });
    allTags.push(...Array.from(tags).sort((a, b) => parseInt(b) - parseInt(a)));
  }

  const filteredBib = !bibData ? [] :
    filter === "all" ? bibData : bibData.filter(p => p.year === filter);

  const groupedByYear = {};
  filteredBib.forEach(entry => {
    const year = entry.year;
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(entry);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div>
      <PageHeader
        eyebrow="Publications"
        title="Research output from the lab."
        desc="A comprehensive list of peer-reviewed publications, working papers, and datasets. See Google Scholar for a full publication record. PDFs available on request from corresponding authors."
        meta="View on Google Scholar · ORCID 0000-0002-XXXX-XXXX"
      />
      
      <section className="block">
        <div className="wrap">
          {/* Toggle buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {allTags.map((t) => (
              <button key={t}
                onClick={() => setFilter(t)}
                className="chip"
                style={{
                  cursor: "pointer", border: "none",
                  background: filter === t ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                  color: filter === t ? "white" : "var(--ink-2)",
                  fontFamily: "var(--mono)",
                }}>
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-2)" }}>Loading publications...</div>
          ) : years.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-2)" }}>No publications found.</div>
          ) : (
            years.map((year) => (
              <div key={year} style={{ marginBottom: "3rem" }}>
                <div className="serif" style={{
                  fontSize: "3rem", fontWeight: 350, letterSpacing: "-0.02em",
                  paddingBottom: "0.5rem", borderBottom: "1px solid var(--line)", marginBottom: "1.5rem",
                }}>
                  {year}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {groupedByYear[year].map((p, i) => (
                    <li key={i} style={{
                      padding: "1.5rem 0", borderBottom: "1px solid var(--line)",
                    }}>
                      <div className="serif" style={{ fontSize: "1.1rem", lineHeight: 1.4, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                        {p.title}
                      </div>
                      {p.authors && (
                        <div style={{ marginTop: "0.4rem", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
                          {p.authors}
                        </div>
                      )}
                      <div className="mono" style={{ marginTop: "0.4rem", fontSize: 12, color: "var(--ink-3)" }}>
                        {p.journal && <>{p.journal} · </>}
                        {p.doi && <>DOI: {p.doi}</>}
                        {p.url && !p.doi && <>URL: {p.url}</>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PublicationsPageV2 });
