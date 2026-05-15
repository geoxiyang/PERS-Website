// Research, Publications, Teaching, Contact pages.

function ResearchPage({ go }) {
  return (
    <div>
      <PageHeader
        eyebrow="Research"
        title="What we work on, and why they matter."
        desc="Six interlocking themes that span scales — from leaf traits, canopy structure, to global vegetation dynamics — and use the tools of plant ecophysiology, proximal/airborne/satellite remote sensing, ecosystem/radiative transfer modeling."
        meta={"06 themes · 14 sites · 9 active projects"}
      />
      <section className="block">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {RESEARCH_THEMES.map((t, i) => (
            <article key={t.id} style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
              gap: "var(--gap)", alignItems: "center",
            }} className="research-row">
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                {t.image
                  ? <img src={t.image} alt={t.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 4, border: "1px solid var(--line)", display: "block" }} />
                  : <Placeholder label={"figure · " + t.id} palette={t.palette} aspect="4/3" />
                }
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Theme {t.id} · {t.site}
                </div>
                <h2 className="section" style={{ marginTop: "0.8rem", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}>
                  {t.title}
                </h2>
                <p className="lede" style={{ marginTop: "1rem", fontSize: "1.05rem" }}>{t.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <style>{`
        @media (max-width: 760px) {
          .research-row { grid-template-columns: 1fr !important; }
          .research-row > div { order: 0 !important; }
        }
      `}</style>
    </div>
  );
}

function PublicationsPage() {
  const [filter, setFilter] = React.useState("all");
  const allTags = ["all", ...new Set(PUBLICATIONS.flatMap((y) => y.items.flatMap((p) => p.tags)))];

  return (
    <div>
      <PageHeader
        eyebrow="Publications"
        title="Selected papers from the lab."
        desc="A reverse-chronological selection of peer-reviewed publications. PDFs available on request — please email the corresponding author."
        meta="View on Google Scholar · ORCID 0000-0002-XXXX-XXXX"
      />
      <section className="block">
        <div className="wrap">
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
          {PUBLICATIONS.map((y) => {
            const items = filter === "all" ? y.items : y.items.filter((p) => p.tags.includes(filter));
            if (items.length === 0) return null;
            return (
              <div key={y.year} style={{ marginBottom: "3rem" }}>
                <div className="serif" style={{
                  fontSize: "3rem", fontWeight: 350, letterSpacing: "-0.02em",
                  paddingBottom: "0.5rem", borderBottom: "1px solid var(--line)", marginBottom: "1.5rem",
                }}>
                  {y.year}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map((p, i) => (
                    <li key={i} style={{
                      padding: "1.25rem 0", borderBottom: "1px solid var(--line)",
                      display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start",
                    }}>
                      <div>
                        <div className="serif" style={{ fontSize: "1.2rem", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                          {p.title}
                        </div>
                        <div style={{ marginTop: "0.4rem", fontSize: 14, color: "var(--ink-2)" }}>
                          {p.authors}
                        </div>
                        <div className="mono" style={{ marginTop: "0.4rem", fontSize: 12, color: "var(--ink-3)" }}>
                          {p.venue} · DOI {p.doi}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                        {p.tags.map((tg) => <span key={tg} className="chip neutral">{tg}</span>)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function TeachingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Teaching"
        title="Courses for ecologists, geographers, and computational scientists."
        desc="We teach undergraduate and graduate courses that bridge environmental science with remote sensing and quantitative methods."
      />
      <section className="block">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {COURSES.map((c) => (
            <article key={c.code} className="card hover" style={{
              display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "start",
            }}>
              <div style={{ minWidth: 140 }}>
                <div className="mono" style={{ fontSize: 13, color: "var(--forest)", fontWeight: 500 }}>
                  {c.code}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                  {c.cadence}
                </div>
              </div>
              <div>
                <h3 className="h3">{c.title}</h3>
                <p style={{ marginTop: "0.6rem", color: "var(--ink-2)", lineHeight: 1.6 }}>{c.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Find us, write us, visit us."
      />
      <section className="block">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "var(--gap)" }}>
          <div>
            <h3 className="h3">Lab address</h3>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.7, marginTop: "0.6rem" }}>
              {LAB.affiliation}<br />
              {LAB.university}<br />
              Clark Hall, Room 312<br />
              291 McCormick Road<br />
              Charlottesville, VA 22904
            </p>
            <h3 className="h3" style={{ marginTop: "2rem" }}>Email</h3>
            <p className="mono" style={{ color: "var(--forest)", marginTop: "0.4rem" }}>{LAB.email}</p>
            <h3 className="h3" style={{ marginTop: "2rem" }}>Mailing list</h3>
            <p style={{ color: "var(--ink-2)", marginTop: "0.6rem", maxWidth: "42ch" }}>
              We send a quarterly newsletter with new papers, datasets, and recruitment notices.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", maxWidth: 420 }}>
              <input type="email" placeholder="you@institution.edu" style={{
                flex: 1, padding: "0.7rem 0.9rem", borderRadius: 6, border: "1px solid var(--line-2)",
                background: "var(--paper)", font: "inherit", color: "inherit", fontSize: 14,
              }} />
              <button className="btn primary" type="submit">Subscribe</button>
            </form>
          </div>
          <Placeholder label="Charlottesville · campus map" palette="default" aspect="4/3" />
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ResearchPage, PublicationsPage, TeachingPage, ContactPage });
