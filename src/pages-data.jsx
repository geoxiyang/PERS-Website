// Data & Algorithms page.

function DataPage() {
  const [filter, setFilter] = React.useState("All");
  const kinds = ["All", ...new Set(RESOURCES.map((r) => r.kind))];
  const items = filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.kind === filter);

  return (
    <div>
      <PageHeader
        eyebrow="Data & code"
        title="Open datasets, algorithms, and tools."
        desc="We release the products of our research as openly as possible. All datasets are licensed CC-BY 4.0; code is released under permissive open-source licenses."
        meta={"DOI-tagged datasets · pinned model weights · reproducible pipelines"}
      />
      <section className="block">
        <div className="wrap">
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {kinds.map((k) => (
              <button key={k}
                onClick={() => setFilter(k)}
                className="chip"
                style={{
                  cursor: "pointer", border: "none",
                  background: filter === k ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                  color: filter === k ? "white" : "var(--ink-2)",
                }}>
                {k}
              </button>
            ))}
          </div>

          <div className="grid-2" style={{ gap: "var(--gap)" }}>
            {items.map((r, i) => (
              <article key={i} className="card hover" style={{
                padding: 0, overflow: "hidden",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ position: "relative" }}>
                  <Placeholder label={r.kind + " · figure"} palette={r.palette} aspect="16/9" />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span className="chip" style={{
                      background: "var(--paper)", borderColor: "var(--line)",
                      color: "var(--ink-2)",
                    }}>{r.kind}</span>
                  </div>
                </div>
                <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
                  <h3 className="serif" style={{
                    fontSize: "1.35rem", fontWeight: 450, letterSpacing: "-0.012em",
                    lineHeight: 1.25, margin: 0,
                  }}>
                    {r.title}
                  </h3>
                  <p style={{ marginTop: "0.7rem", color: "var(--ink-2)", lineHeight: 1.6, fontSize: 14.5 }}>
                    {r.blurb}
                  </p>
                  <div style={{
                    marginTop: "1.25rem",
                    display: "grid", gridTemplateColumns: `repeat(${r.stats.length}, 1fr)`,
                    gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid var(--line)",
                  }}>
                    {r.stats.map((s) => (
                      <div key={s.k}>
                        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.k}</div>
                        <div className="serif" style={{ fontSize: "1.4rem", marginTop: "0.2rem", letterSpacing: "-0.01em" }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    marginTop: "1.25rem", paddingTop: "1.25rem",
                    borderTop: "1px solid var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                      {r.link}
                    </div>
                    <a href="#" style={{ color: "var(--forest)", fontSize: 13, fontWeight: 500 }}>
                      Access →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <SectionHead
            index="—"
            eyebrow="Citation"
            title="If you use our data or code, please cite us."
          />
          <pre style={{
            background: "var(--paper)", border: "1px solid var(--line)",
            padding: "1.5rem 1.75rem", borderRadius: 6,
            fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.7,
            overflowX: "auto", color: "var(--ink-2)", margin: 0,
          }}>
{`@dataset{pears_lab_speclib_2026,
  author       = {Plant Ecology and Remote Sensing Lab},
  title        = {speclib: a Python toolkit for imaging spectroscopy},
  year         = {2026},
  publisher    = {Zenodo},
  version      = {0.9.4},
  doi          = {10.5281/zenodo.10212344},
  url          = {https://github.com/pears-lab/speclib}
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { DataPage });
