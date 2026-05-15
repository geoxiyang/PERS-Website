// Data & Code page — mirrors uva.theopenscholar.com/plant-ecology-lab/resources

function DataPage() {
  const [filter, setFilter] = React.useState("All");
  const kinds = ["All", ...Array.from(new Set(RESOURCES.map((r) => r.kind)))];
  const items = filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.kind === filter);

  return (
    <div>
      <PageHeader
        eyebrow="Data & code"
        title="Open datasets, algorithms, and tools."
        desc="We release the products of our research as openly as possible. Data and code accompanying our publications."
      />

      <section className="block">
        <div className="wrap">
          {/* Kind filter */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {kinds.map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className="chip"
                style={{
                  cursor: "pointer", border: "none",
                  background: filter === k ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                  color: filter === k ? "white" : "var(--ink-2)",
                }}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Resource list */}
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0" }}>
            {items.map((r, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "0 1.5rem",
                  padding: "1.75rem 0",
                  borderBottom: "1px solid var(--line)",
                  alignItems: "start",
                }}
              >
                {/* Index number */}
                <span
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--ink-3)",
                    letterSpacing: "0.08em",
                    paddingTop: "0.25rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  {/* Kind badge */}
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span className="chip">{r.kind}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 450,
                      lineHeight: 1.35,
                      letterSpacing: "-0.01em",
                      margin: "0 0 0.35rem",
                      color: "var(--ink)",
                    }}
                  >
                    {r.title}
                  </h3>

                  {/* Citation */}
                  {r.citation && (
                    <p
                      className="mono"
                      style={{ fontSize: "12px", color: "var(--ink-3)", margin: "0 0 0.75rem" }}
                    >
                      {r.citation}
                    </p>
                  )}

                  {/* Links */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        color: "var(--forest)",
                        fontSize: "13px",
                        fontWeight: 500,
                        fontFamily: "var(--mono)",
                        textDecoration: "none",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 2h8v8M2 10l8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {r.urlLabel}
                    </a>
                    {r.url2 && (
                      <a
                        href={r.url2}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          color: "var(--forest)",
                          fontSize: "13px",
                          fontWeight: 500,
                          fontFamily: "var(--mono)",
                          textDecoration: "none",
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M2 2h8v8M2 10l8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {r.urlLabel2}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { DataPage });
