// People page — photo grid with click-to-expand bio.

const ALUMNI_ROLES = ["Lab Alumni — Postdocs", "Lab Alumni — Graduate Students", "Lab Alumni — Undergraduates"];

function PeoplePage() {
  const [active, setActive] = React.useState(null);

  const currentGroups = PEOPLE.filter(g => !ALUMNI_ROLES.includes(g.role));
  const alumniGroups  = PEOPLE.filter(g => ALUMNI_ROLES.includes(g.role));

  return (
    <div>
      <PageHeader
        eyebrow="People"
        title="The lab is its people."
        desc="A small but dynamic team of global ecologists. Click any portrait to read more."
        meta={"7 current members · alumni listed below"}
      />

      {/* ── Current members ── */}
      <section className="block">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {currentGroups.map((group) => {
            return (
              <div key={group.role}>
                <GroupHeading role={group.role} count={group.members.length} />
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2rem",
                }}>
                  {group.members.map((m) => (
                    <GradCard key={m.id} m={m} onClick={() => setActive(m)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Alumni ── */}
      <section className="block" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="eyebrow">Alumni</span>
            <h2 className="serif" style={{ fontSize: "1.8rem", fontWeight: 400, letterSpacing: "-0.014em", margin: "0.5rem 0 0" }}>
              Lab alumni
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {alumniGroups.map((group) => (
              <div key={group.role}>
                <GroupHeading role={group.role.replace("Lab Alumni — ", "")} count={group.members.length} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {group.members.map((m) => (
                    <li key={m.id} style={{ display: "flex", gap: "1rem", alignItems: "baseline", paddingBottom: "0.55rem", borderBottom: "1px solid var(--line)" }}>
                      <span className="serif" style={{ fontSize: "1rem", fontWeight: 450, minWidth: 0, flexShrink: 0 }}>
                        {m.name}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--ink-3)", fontFamily: "var(--sans)", lineHeight: 1.4 }}>
                        {m.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && <PersonModal m={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function GroupHeading({ role, count }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: "0.75rem",
      paddingBottom: "0.85rem", borderBottom: "1px solid var(--line)", marginBottom: "1.75rem",
    }}>
      <h2 className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.012em", margin: 0 }}>
        {role}
      </h2>
      <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

/* Large portrait card for PI + Postdocs */
function PortraitCard({ m, onClick }) {
  const paletteClass = m.id.startsWith("p") ? "lichen" : "default";
  return (
    <article onClick={onClick} className="person-card" style={{ cursor: "pointer" }}>
      <div style={{ position: "relative" }}>
        {m.image
          ? <img src={m.image} alt={m.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top", borderRadius: 8, display: "block", border: "1px solid var(--line)" }} />
          : <Placeholder label={m.name.split(" ").map(s => s[0]).join("")} palette={paletteClass} aspect="3/4" style={{ borderRadius: 8, width: "100%", aspectRatio: "3/4" }} />
        }
        <div className="overlay" style={{
          position: "absolute", inset: 0, borderRadius: 8, opacity: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)",
          transition: "opacity 0.2s",
        }} />
      </div>
      <div style={{ padding: "1rem 0.25rem 0", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <div className="serif" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em", lineHeight: 1.2, fontWeight: 450 }}>
          {m.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--forest)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
          {m.title}
        </div>
        {m.focus && (
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5, marginTop: "0.15rem" }}>
            {m.focus.slice(0, 2).join(" · ")}
          </div>
        )}
        {m.email && (
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {m.email}
          </div>
        )}
      </div>
      <style>{`.person-card:hover .overlay { opacity: 1 !important; }`}</style>
    </article>
  );
}

/* Two-per-row grad card: large square portrait + text beside it */
function GradCard({ m, onClick }) {
  return (
    <article onClick={onClick} className="grad-card" style={{
      cursor: "pointer",
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      gap: "1.5rem",
      alignItems: "start",
      padding: "1.25rem",
      background: "var(--paper)",
      border: "1px solid var(--line)",
      borderRadius: 8,
      transition: "border-color 0.15s",
    }}>
      <div style={{ position: "relative" }}>
        {m.image
          ? <img src={m.image} alt={m.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", objectPosition: "top", borderRadius: 6, display: "block", border: "1px solid var(--line)" }} />
          : <Placeholder label={m.name.split(" ").map(s => s[0]).join("")} palette="lichen" aspect="1/1" style={{ borderRadius: 6, width: "100%", aspectRatio: "1/1" }} />
        }
        <div className="grad-overlay" style={{
          position: "absolute", inset: 0, borderRadius: 6, opacity: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)",
          transition: "opacity 0.2s",
        }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: 0 }}>
        <div className="serif" style={{ fontSize: "1.2rem", letterSpacing: "-0.01em", lineHeight: 1.2, fontWeight: 450 }}>
          {m.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--forest)", fontFamily: "var(--mono)", letterSpacing: "0.04em", lineHeight: 1.4 }}>
          {m.title}
        </div>
        {m.bio && (
          <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6, margin: "0.35rem 0 0", textWrap: "pretty" }}>
            {m.bio.split("\n\n").map((para, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "0.6rem 0 0" }}>{para}</p>
            ))}
          </div>
        )}
        {m.focus && (
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {m.focus.map((f) => <span key={f} className="chip">{f}</span>)}
          </div>
        )}
        {m.email && (
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginTop: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {m.email}
          </div>
        )}
      </div>
      <style>{`.grad-card:hover { border-color: var(--ink-3) !important; } .grad-card:hover .grad-overlay { opacity: 1 !important; }`}</style>
    </article>
  );
}

/* Responsive: grad cards go single-column on narrow screens */
const gradMediaStyle = `@media (max-width: 700px) { .grad-card { grid-template-columns: 1fr !important; } }`;

function PersonModal({ m, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "color-mix(in srgb, var(--ink) 55%, transparent)",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      animation: "fadeUp 0.25s ease both",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--paper)", maxWidth: 760, width: "100%",
        borderRadius: 8, overflow: "hidden",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
        maxHeight: "calc(100vh - 4rem)",
      }} className="person-modal">
        {m.image
          ? <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", minHeight: 360, objectFit: "cover", objectPosition: "top", display: "block" }} />
          : <Placeholder label={"portrait · " + m.name} palette="lichen" aspect="4/5" style={{ aspectRatio: "auto", height: "100%", minHeight: 360 }} />
        }
        <div style={{ padding: "2.25rem 2.25rem 2rem", overflowY: "auto" }}>
          <button onClick={onClose} style={{
            float: "right", appearance: "none", border: "1px solid var(--line-2)",
            background: "transparent", borderRadius: 999, width: 30, height: 30,
            cursor: "pointer", color: "var(--ink-2)", fontSize: 14,
          }}>✕</button>
          <span className="eyebrow">{m.title}</span>
          <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 400, letterSpacing: "-0.018em", margin: "0.6rem 0 0", lineHeight: 1.1 }}>
            {m.name}
          </h2>
          {m.pronouns && <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: "0.3rem" }}>({m.pronouns})</div>}
          <p style={{ marginTop: "1.25rem", color: "var(--ink-2)", lineHeight: 1.65 }}>{m.bio}</p>
          {m.focus && (
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {m.focus.map((f) => <span key={f} className="chip">{f}</span>)}
            </div>
          )}
          <div className="mono" style={{
            marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--line)",
            fontSize: 12, color: "var(--ink-3)", display: "grid", gap: "0.4rem",
          }}>
            {m.email && <div>EMAIL · <span style={{ color: "var(--forest)" }}>{m.email}</span></div>}
            <div>WITH THE LAB · {m.joined}</div>
            {(m.linkedin || m.bluesky || m.scholar) && (
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" style={{ color: "var(--forest)", textDecoration: "none", borderBottom: "1px solid color-mix(in srgb, var(--forest) 35%, transparent)", paddingBottom: "1px" }}>LinkedIn</a>}
                {m.bluesky && <a href={m.bluesky} target="_blank" rel="noopener" style={{ color: "var(--forest)", textDecoration: "none", borderBottom: "1px solid color-mix(in srgb, var(--forest) 35%, transparent)", paddingBottom: "1px" }}>Bluesky</a>}
                {m.scholar && <a href={m.scholar} target="_blank" rel="noopener" style={{ color: "var(--forest)", textDecoration: "none", borderBottom: "1px solid color-mix(in srgb, var(--forest) 35%, transparent)", paddingBottom: "1px" }}>Google Scholar</a>}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .person-modal { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

Object.assign(window, { PeoplePage });
