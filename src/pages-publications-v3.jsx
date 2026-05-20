// Publications page with BibTeX parsing, year grouping, and tag filtering

function PublicationsPageV3() {
  const [filter, setFilter] = React.useState("all");
  const [bibData, setBibData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [pdfKeys, setPdfKeys] = React.useState(new Set());

  React.useEffect(() => {
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

    fetch("uploads/papers/index.json")
      .then(r => r.json())
      .then(keys => setPdfKeys(new Set(keys)))
      .catch(() => {});
  }, []);

  // Parse BibTeX entries into structured data
  const parseBibTeX = (bibtex) => {
    const entries = [];

    // Split into individual entries by finding @ markers
    // Each entry is everything from @type{ to the matching closing }
    const entryStrings = [];
    let i = 0;
    while (i < bibtex.length) {
      const start = bibtex.indexOf("@", i);
      if (start === -1) break;
      // Find the opening brace
      const braceOpen = bibtex.indexOf("{", start);
      if (braceOpen === -1) break;
      // Walk forward counting brace depth to find the closing brace
      let depth = 0;
      let j = braceOpen;
      while (j < bibtex.length) {
        if (bibtex[j] === "{") depth++;
        else if (bibtex[j] === "}") {
          depth--;
          if (depth === 0) { entryStrings.push(bibtex.slice(start, j + 1)); break; }
        }
        j++;
      }
      i = j + 1;
    }

    entryStrings.forEach(raw => {
      const typeMatch = raw.match(/^@(\w+)\{/);
      if (!typeMatch) return;
      const type = typeMatch[1].toLowerCase();
      if (type === "preamble" || type === "string" || type === "comment") return;

      // Content between first { and last }
      const inner = raw.slice(raw.indexOf("{") + 1, raw.lastIndexOf("}"));
      // Key is everything before the first comma
      const keyEnd = inner.indexOf(",");
      const key = keyEnd > -1 ? inner.slice(0, keyEnd).trim() : inner.trim();
      const content = keyEnd > -1 ? inner.slice(keyEnd + 1) : "";

      const entry = {
        key,
        type,
        title:   cleanText(extractField(content, "title")),
        authors: formatAuthors(cleanText(extractField(content, "author"))),
        year:    extractField(content, "year") || "Unknown",
        journal: cleanText(extractField(content, "journal")),
        doi:     cleanText(extractField(content, "doi")),
        url:     extractField(content, "url"),
      };

      entry.tags = generateTags(entry.journal, entry.title);
      if (entry.title && entry.authors) entries.push(entry);
    });

    // Deduplicate by DOI (keep first occurrence)
    const seen = new Set();
    const deduped = entries.filter(e => {
      const key = e.doi || e.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by year descending, then by title
    return deduped.sort((a, b) => {
      const yearDiff = (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
      if (yearDiff !== 0) return yearDiff;
      return a.title.localeCompare(b.title);
    });
  };

  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/[{}]/g, "")
      .replace(/<\/?i>/g, "")
      .replace(/<\/?em>/g, "")
      .replace(/<scp>/g, "")
      .replace(/<\/scp>/g, "")
      .replace(/\\textit\{([^}]*)\}/g, "$1")
      .replace(/\\emph\{([^}]*)\}/g, "$1")
      .replace(/\\'e/g, "é").replace(/\\'a/g, "á").replace(/\\'o/g, "ó")
      .replace(/\\'{([^}]*)}/g, "$1").replace(/\\`{([^}]*)}/g, "$1")
      .replace(/\\"u/g, "ü").replace(/\\"o/g, "ö").replace(/\\"a/g, "ä")
      .replace(/--/g, "–")
      .replace(/\s+/g, " ")
      .trim();
  };

  const formatAuthors = (raw) => {
    if (!raw) return "";
    // Split on " and " (BibTeX separator)
    const parts = raw.split(/\s+and\s+/i).map(a => {
      a = a.trim();
      // "Last, First" → "First Last"
      if (a.includes(",")) {
        const [last, first] = a.split(",").map(s => s.trim());
        return first ? `${first} ${last}` : last;
      }
      return a;
    });
    if (parts.length <= 2) return parts.join(" and ");
    return parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];
  };

  const extractField = (content, fieldName) => {
    // Match field = { ... } (handles multi-line, nested braces one level deep)
    const braceRegex = new RegExp(`${fieldName}\\s*=\\s*\\{((?:[^{}]|\\{[^{}]*\\})*)\\}`, "is");
    const braceMatch = content.match(braceRegex);
    if (braceMatch) return braceMatch[1].trim();
    // Fallback: field = "..."
    const quoteRegex = new RegExp(`${fieldName}\\s*=\\s*"([^"]*)"`, "is");
    const quoteMatch = content.match(quoteRegex);
    if (quoteMatch) return quoteMatch[1].trim();
    // Fallback: bare value (year, etc.)
    const bareRegex = new RegExp(`${fieldName}\\s*=\\s*([^,}\n]+)`, "i");
    const bareMatch = content.match(bareRegex);
    if (bareMatch) return bareMatch[1].trim();
    return "";
  };

  const generateTags = (journal, title) => {
    const tags = [];
    
    // Add journal/type tags
    if (journal) {
      if (journal.includes("Remote Sensing")) tags.push("Remote Sensing");
      if (journal.includes("New Phytologist")) tags.push("Plant Biology");
      if (journal.includes("Global Change Biology")) tags.push("Climate Change");
      if (journal.includes("Geophysical Research")) tags.push("Biogeosciences");
      if (journal.includes("Agricultural")) tags.push("Agriculture");
      if (journal.includes("Ecology")) tags.push("Ecology");
      if (journal.includes("Nature")) tags.push("Nature");
    }
    
    // Add topic tags from title
    const titleLower = title.toLowerCase();
    if (titleLower.includes("fluorescence") || titleLower.includes("sif")) tags.push("SIF");
    if (titleLower.includes("photosynthesis") || titleLower.includes("gpp")) tags.push("Photosynthesis");
    if (titleLower.includes("drought")) tags.push("Drought");
    if (titleLower.includes("forest") || titleLower.includes("woodland")) tags.push("Forest");
    if (titleLower.includes("coastal") || titleLower.includes("wetland")) tags.push("Coastal");
    if (titleLower.includes("arctic") || titleLower.includes("tundra")) tags.push("Arctic");
    if (titleLower.includes("phenology")) tags.push("Phenology");
    if (titleLower.includes("leaf") || titleLower.includes("canopy")) tags.push("Canopy");
    if (titleLower.includes("spectral") || titleLower.includes("spectroscopy")) tags.push("Spectroscopy");
    if (titleLower.includes("lidar") || titleLower.includes("tls")) tags.push("LiDAR");
    if (titleLower.includes("drone") || titleLower.includes("uav")) tags.push("UAV");
    if (titleLower.includes("model")) tags.push("Modeling");
    if (titleLower.includes("water") || titleLower.includes("transpiration")) tags.push("Water");
    if (titleLower.includes("temperature")) tags.push("Temperature");
    
    return [...new Set(tags)]; // Remove duplicates
  };

  // Build filter options
  const allTags = ["all"];
  const tagSet = new Set();
  const yearSet = new Set();
  
  if (bibData) {
    bibData.forEach(entry => {
      const year = entry.year;
      if (year && year !== "Unknown") yearSet.add(year);
      entry.tags.forEach(tag => tagSet.add(tag));
    });
    
    // Add years first, then other tags
    const sortedYears = Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a));
    allTags.push(...sortedYears);
    allTags.push(...Array.from(tagSet).sort());
  }

  // Filter publications
  const filteredBib = !bibData ? [] :
    filter === "all" ? bibData :
    filter.match(/^\d{4}$/) ? // Year filter
      bibData.filter(p => p.year === filter) :
    bibData.filter(p => p.tags.includes(filter)); // Tag filter

  // Group by year
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
        desc="A comprehensive list of peer-reviewed publications. Filter by year or research topic. PDFs available on request from corresponding authors."
        meta={<>
          <a href="https://scholar.google.com/citations?user=90Z4IKYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}>View on Google Scholar</a>
          {" · "}
          <a href="https://orcid.org/0000-0002-5095-6735" target="_blank" rel="noopener noreferrer" style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}>ORCID 0000-0002-5095-6735</a>
        </>}
      />
      
      <section className="block">
        <div className="wrap">
          {/* Filter buttons */}
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
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start" }}>
                        <div>
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
                            {p.doi && (
                              <a
                                href={"https://doi.org/" + p.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                              >
                                {p.doi}
                              </a>
                            )}
                            {p.url && !p.doi && (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                              >
                                {p.url}
                              </a>
                            )}
                            {pdfKeys.has(p.key) && (
                              <>
                                {" · "}
                                <a
                                  href={"uploads/papers/" + p.key + ".pdf"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                                >
                                  PDF
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                        {p.tags.length > 0 && (
                          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                            {p.tags.map((tg) => <span key={tg} className="chip neutral">{tg}</span>)}
                          </div>
                        )}
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

Object.assign(window, { PublicationsPageV3 });
