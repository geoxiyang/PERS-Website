// Home page — hero with three layout variants + lab snapshot sections.

function HomePage({ go, hero }) {
  return (
    <div>
      {hero === "cinematic" && <HeroCinematic go={go} />}
      {hero === "split" && <HeroSplit go={go} />}
      {hero === "editorial" && <HeroEditorial go={go} />}

      <SectionResearchSnapshot go={go} />
      <SectionFieldSites />
      <SectionLiDARScans />
      <SectionRecentNews go={go} />
      <SectionJoinTeaser go={go} />
    </div>);

}

/* ── Hero variant 1: Cinematic full-bleed ─────────────────────────── */
function HeroCinematic({ go }) {
  return (
    <section style={{
      position: "relative", height: "calc(100vh - 64px)", minHeight: 580,
      display: "flex", alignItems: "flex-end", overflow: "hidden",
      borderBottom: "1px solid var(--line)"
    }}>
      <video autoPlay muted loop playsInline style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover"
      }}>
        <source src="uploads/Hero-204ab402.mp4" type="video/mp4" />
      </video>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.72) 100%)"
      }} />

      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem", color: "white" }}>
        <span className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
          Plant Ecology &amp; Remote Sensing Lab
        </span>
        <h1 className="display" style={{
          marginTop: "1rem", color: "white", maxWidth: "20ch",
          textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)"
        }}>
          Reading the pulse of Earth's ecosystems —<br />
          <em style={{ fontStyle: "italic", color: "var(--lichen)" }}>from the canopy down,
          and from orbit in.</em>
        </h1>
        <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="btn primary" onClick={() => go("research")}>
            Explore our research <span className="arrow">→</span>
          </button>
          <button className="btn ghost" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
          onClick={() => go("join")}>
            Join the lab
          </button>
        </div>
      </div>
    </section>);

}

/* ── Hero variant 2: Split — video on left, statement on right ────── */
function HeroSplit({ go }) {
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", minHeight: "calc(100vh - 64px)"
      }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
          <div className="drone-bg" />
          <div className="video-tag" style={{ top: 20, left: 20 }}>
            ● drone footage placeholder
          </div>
          <div className="video-tag" style={{ bottom: 20, left: 20 }}>
            Cordillera de Talamanca · 09°23' N · 83°45' W
          </div>
        </div>
        <div style={{
          padding: "clamp(2rem, 6vw, 5rem)", display: "flex", flexDirection: "column",
          justifyContent: "center", background: "var(--paper)"
        }}>
          <span className="eyebrow">Est. 2019 · {LAB.university}</span>
          <h1 className="display" style={{ marginTop: "1rem" }}>
            We study how a changing climate is rewriting the rules of plant life.
          </h1>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            From tropical canopies to arctic tundra, we use remote sensing,
            field observations, and modeling to listen for what ecosystems are
            telling us — and to translate it into measurements the world can act on.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn primary" onClick={() => go("research")}>
              Research themes <span className="arrow">→</span>
            </button>
            <button className="btn ghost" onClick={() => go("people")}>Meet the lab</button>
          </div>
          <div style={{
            marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem",
            paddingTop: "2rem", borderTop: "1px solid var(--line)"
          }}>
            <Stat label="Active sites" value="14" sub="across 6 biomes" />
            <Stat label="Lab members" value="13" sub="2 PIs · 11 trainees" />
            <Stat label="Open datasets" value="9" sub="all CC-BY" />
          </div>
        </div>
      </div>
    </section>);

}

/* ── Hero variant 3: Editorial — windowed video inside grid ──────── */
function HeroEditorial({ go }) {
  return (
    <section style={{ paddingTop: "4rem", paddingBottom: "5rem", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--gap)", alignItems: "start"
        }} className="editorial-hero">
          <div>
            <span className="eyebrow">Plant Ecology &amp; Remote Sensing Lab</span>
            <h1 className="display" style={{ marginTop: "1.25rem" }}>
              The view from leaf to orbit.
            </h1>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              We are global change ecologists — combining satellites,
              drones, fieldwork, and machine learning to study how warming
              is reshaping plant life on Earth.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn primary" onClick={() => go("research")}>
                What we work on <span className="arrow">→</span>
              </button>
              <button className="btn ghost" onClick={() => go("publications")}>Read our papers</button>
            </div>

            <dl style={{
              marginTop: "3.5rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5rem 1.25rem",
              fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)"
            }}>
              <dt>EST.</dt><dd style={{ margin: 0, color: "var(--ink-2)" }}>2019</dd>
              <dt>HOST</dt><dd style={{ margin: 0, color: "var(--ink-2)" }}>Dept. Environmental Sciences, UVA</dd>
              <dt>SITES</dt><dd style={{ margin: 0, color: "var(--ink-2)" }}>14 active across 6 biomes</dd>
              <dt>PEOPLE</dt><dd style={{ margin: 0, color: "var(--ink-2)" }}>13 — and growing</dd>
            </dl>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: 4, border: "1px solid var(--line)" }}>
              <div className="drone-bg" />
              <div className="video-tag" style={{ top: 16, left: 16 }}>● drone reel</div>
              <div className="video-tag" style={{ bottom: 16, left: 16 }}>placeholder · upload via WP</div>
            </div>
            <div className="mono" style={{
              position: "absolute", bottom: -28, right: 0, fontSize: 11, color: "var(--ink-3)",
              letterSpacing: "0.1em", textTransform: "uppercase"
            }}>
              fig.&nbsp;1 — drone hyperspectral mosaic, in progress
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .editorial-hero { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

}

function Stat({ label, value, sub }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</div>
      <div className="serif" style={{ fontSize: "2.25rem", lineHeight: 1.05, marginTop: "0.35rem" }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: "0.25rem" }}>{sub}</div>
    </div>);

}

/* ── Section: Research snapshot ───────────────────────────────────── */
function SectionResearchSnapshot({ go }) {
  return (
    <section className="block">
      <SectionHead
        index="01"
        eyebrow="Research"
        title="Six lines of work, one question."
        sub="How is climate change reshaping the structure, function, and traits of terrestrial ecosystems — and how do we measure that change at the scales it actually happens?" />
      
      <div className="wrap">
        <div className="grid-3">
          {RESEARCH_THEMES.slice(0, 6).map((t) =>
          <article key={t.id} className="card hover" onClick={() => go("research")} style={{ display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer" }}>
              {t.image
                ? <img src={t.image} alt={t.title} style={{ width: "100%", aspectRatio: t.aspect || "4/3", objectFit: t.objectFit || "cover", borderRadius: 4, border: "1px solid var(--line)", display: "block" }} />
                : <Placeholder label={t.id + " · field imagery"} palette={t.palette} aspect="4/3" />
              }
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {t.id} · {t.site}
                </div>
                <h3 className="h3">{t.title}</h3>
                <p style={{ marginTop: "0.6rem", color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55 }}>
                  {t.blurb}
                </p>
              </div>
            </article>
          )}
        </div>
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <button className="btn ghost" onClick={() => go("research")}>
            All research themes <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>);

}

function SectionFieldSites() {
  return (
    <section className="block">
      <SectionHead
        index="02"
        eyebrow="Field sites"
        title="Research locations across the United States."
        sub="Explore the field sites our team visited with the interactive map below. Zoom in and out to discover where we conduct research, from coastal wetlands to arctic tundra. Click on the dots to see more field photos." />
      
      <div className="wrap">
        <InteractiveMapComponent />
      </div>
    </section>);

}

/* ── Section: Recent news ────────────────────────────────────────── */
function SectionRecentNews({ go }) {
  return (
    <section className="block">
      <SectionHead
        index="04"
        eyebrow="From the lab"
        title="Recent news." />
      
      <div className="wrap">
        <div className="grid-3">
          {NEWS.slice(0, 3).map((n) =>
          <article key={n.id} className="card hover" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {n.video ? (
                <video
                  src={n.video}
                  style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block", backgroundColor: "#000" }}
                  muted
                  playsInline
                  preload="metadata"
                  onMouseEnter={e => e.currentTarget.play()}
                  onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
              ) : n.image ? (
                <img src={n.image} alt={n.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
              ) : (
                <Placeholder label={n.category + " · " + n.id} palette={n.palette} aspect="16/10" />
              )}
              <div style={{ padding: "1.25rem 1.4rem 1.5rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span className="chip neutral">{n.category}</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{n.date}</span>
                </div>
                <h3 className="h3" style={{ fontSize: "1.2rem" }}>{n.title}</h3>
                <p style={{ marginTop: "0.6rem", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>
                  {n.excerpt}
                </p>
              </div>
            </article>
          )}
        </div>
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <button className="btn ghost" onClick={() => go("news")}>
            All news <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>);

}

/* ── Section: Join teaser ────────────────────────────────────────── */
function SectionJoinTeaser({ go }) {
  return (
    <section className="block" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "var(--gap)", alignItems: "center" }}>
        <div>
          <span className="eyebrow">Join us</span>
          <h2 className="section" style={{ marginTop: "1rem" }}>We're recruiting curious global change ecologists and computational thinkers.

          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>We're looking for graduate students, postdocs, and undergraduate researchers excited to combine global change ecology with cutting-edge sensing and modeling.



          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn primary" onClick={() => go("join")}>
              See open positions <span className="arrow">→</span>
            </button>
            <button className="btn ghost" onClick={() => go("contact")}>Get in touch</button>
          </div>
        </div>
        <img src="uploads/group_photo_1.webp" alt="PERS Lab team" style={{ width: "100%", aspectRatio: "5/4", objectFit: "cover", objectPosition: "top", borderRadius: 4, border: "1px solid var(--line)", display: "block" }} />
      </div>
    </section>);

}

Object.assign(window, { HomePage });