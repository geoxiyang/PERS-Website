// News page — reverse-chronological feed with thumbnails.

function NewsPage() {
  const [filter, setFilter] = React.useState("All");
  const cats = ["All", ...new Set(NEWS.map((n) => n.category))];
  const items = filter === "All" ? NEWS : NEWS.filter((n) => n.category === filter);

  return (
    <div>
      <PageHeader
        eyebrow="News"
        title="What's happening in the lab."
        desc="New papers, awards, fieldwork, hires, and lab life — in reverse chronological order."
      />
      <section className="block">
        <div className="wrap">
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {cats.map((c) => (
              <button key={c}
                onClick={() => setFilter(c)}
                className="chip"
                style={{
                  cursor: "pointer", border: "none",
                  background: filter === c ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                  color: filter === c ? "white" : "var(--ink-2)",
                }}>
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {items.map((n, i) => (
              <article key={n.id} style={{
                display: "grid",
                gridTemplateColumns: "180px 1.5fr 1fr",
                gap: "var(--gap)",
                padding: "2rem 0",
                borderTop: i === 0 ? "1px solid var(--line)" : "none",
                borderBottom: "1px solid var(--line)",
                alignItems: "start",
              }} className="news-row">
                <div className="mono" style={{
                  fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.06em",
                  paddingTop: "0.4rem",
                }}>
                  <div style={{ color: "var(--ink-2)", fontSize: 13 }}>{formatDate(n.date)}</div>
                  <div style={{ marginTop: "0.4rem" }}>{n.category}</div>
                </div>
                <div>
                  <h3 className="serif" style={{
                    fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.014em",
                    lineHeight: 1.2, margin: 0, textWrap: "balance",
                  }}>
                    {n.title}
                  </h3>
                  <p style={{ marginTop: "0.7rem", color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "60ch" }}>
                    {n.excerpt}
                  </p>
                  <a href="#" style={{
                    display: "inline-block", marginTop: "0.85rem",
                    fontSize: 13, color: "var(--forest)", fontWeight: 500,
                  }}>
                    Read more →
                  </a>
                </div>
                {n.image ? (
                  <img src={n.image} alt={n.title} style={{ width: "100%", height: "auto", borderRadius: "8px", objectFit: "cover" }} />
                ) : (
                  <Placeholder label={n.id} palette={n.palette} aspect="4/3" />
                )}
              </article>
            ))}
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <button className="btn ghost">Load older posts</button>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 800px) {
          .news-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

Object.assign(window, { NewsPage });
