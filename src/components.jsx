// Shared UI components.

function NavBar({ route, go, density, onToggleMenu, menuOpen }) {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <img src="assets/lab-logo.png" alt="PERS Lab" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          <span>Plant Ecology &amp; Remote Sensing Lab</span>
        </a>
        <button className="menu-btn" onClick={onToggleMenu}>{menuOpen ? "Close" : "Menu"}</button>
        <nav className={"nav" + (menuOpen ? " open" : "")}>
          {NAV.map((n) =>
            <a key={n.id}
              href={"#" + n.id}
              className={route === n.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(n.id); }}>
              {n.label}
            </a>
          )}
        </nav>
      </div>
    </header>);

}

function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="brand" style={{ marginBottom: "0.85rem" }}>
              <img src="assets/lab-logo.png" alt="PERS Lab" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <span>Plant Ecology &amp; Remote Sensing Lab</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: "32ch", lineHeight: 1.55 }}>
              {LAB.affiliation}<br />
              {LAB.university}<br />
              {LAB.address}
            </div>
          </div>
          <div>
            <h4>Research</h4>
            <ul>
              <li><a href="#research" onClick={(e) => { e.preventDefault(); go("research"); }}>Themes</a></li>
              <li><a href="#publications" onClick={(e) => { e.preventDefault(); go("publications"); }}>Publications</a></li>
              <li><a href="#data" onClick={(e) => { e.preventDefault(); go("data"); }}>Data &amp; code</a></li>
            </ul>
          </div>
          <div>
            <h4>Lab</h4>
            <ul>
              <li><a href="#people" onClick={(e) => { e.preventDefault(); go("people"); }}>People</a></li>
              <li><a href="#news" onClick={(e) => { e.preventDefault(); go("news"); }}>News</a></li>
              <li><a href="#teaching" onClick={(e) => { e.preventDefault(); go("teaching"); }}>Teaching</a></li>
              <li><a href="#join" onClick={(e) => { e.preventDefault(); go("join"); }}>Join us</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href={"mailto:" + LAB.email}>{LAB.email}</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>Contact</a></li>
              <li><a href="https://www.linkedin.com/in/xi-yang-8154349/" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://bsky.app/profile/xiyang.bsky.social" target="_blank" rel="noopener">Bluesky</a></li>
              <li><a href="https://scholar.google.com/citations?user=90Z4IKYAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 {LAB.shortName} · {LAB.university}</span>
          <span>v.2026.04 · last updated April 18</span>
        </div>
      </div>
    </footer>);

}

function PageHeader({ eyebrow, title, desc, meta }) {
  return (
    <section className="page-hd">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {desc && <p className="desc">{desc}</p>}
        {meta &&
          <div className="mono" style={{ marginTop: "1.25rem", fontSize: 12, color: "var(--ink-3)" }}>
            {meta}
          </div>
        }
      </div>
    </section>);

}

function SectionHead({ index, eyebrow, title, sub }) {
  return (
    <div className="section-head wrap">
      <div>
        <div className="meta">{index} · {eyebrow}</div>
      </div>
      <div>
        <h2 className="section">{title}</h2>
        {sub && <p className="lede" style={{ marginTop: "0.6rem" }}>{sub}</p>}
      </div>
    </div>);

}

function Placeholder({ label, palette = "default", aspect = "16/9", style }) {
  const cls = "ph " + (palette === "clay" ? "clay" : palette === "lichen" ? "lichen" : "");
  return (
    <div className={cls} style={{ aspectRatio: aspect, ...style }}>
      <span className="lbl">{label}</span>
    </div>);

}

Object.assign(window, { NavBar, Footer, PageHeader, SectionHead, Placeholder });