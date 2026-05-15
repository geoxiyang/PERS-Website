// Join Us page — for prospective students and postdocs.

function JoinPage({ go }) {
  return (
    <div>
      {/* Hero — text left, photo right */}
      <div className="page-hd" style={{ paddingBottom: "3rem" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="join-hero-grid">
            <div>
              <span className="eyebrow">Join us</span>
              <h1 style={{
                fontFamily: "var(--serif)", fontWeight: 350,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.08, letterSpacing: "-0.018em",
                margin: "1rem 0 0", maxWidth: "22ch", textWrap: "balance",
              }}>
                There's a place for you here if you're curious about how plants are responding to a changing world.
              </h1>
              <p className="desc" style={{ marginTop: "1.25rem", maxWidth: "52ch" }}>
                We welcome applications from prospective graduate students, postdocs, and undergraduate researchers. Below: what we look for, how to apply, and what to expect.
              </p>
            </div>
            <img
              src="uploads/groupphoto.webp"
              alt="PERS Lab team at AGU"
              style={{
                width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center 30%",
                borderRadius: 6, border: "1px solid var(--line)", display: "block",
              }}
            />
          </div>
        </div>
      </div>
      <style>{`.join-hero-grid { } @media (max-width: 800px) { .join-hero-grid { grid-template-columns: 1fr !important; } }`}</style>

      {/* What we look for */}
      <section className="block" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "var(--gap)" }} className="join-grid">
          <div>
            <span className="eyebrow">01 · Who fits here</span>
            <h2 className="section" style={{ marginTop: "1rem" }}>What we look for.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              ["Curiosity and drive over credentials", "We care more about the questions you ask and your agency than the techniques you already know. We can teach you the tools."],
              ["Quantitative comfort", "Most projects involve coding (Python, R, Matlab, Agentic AI) and statistical thinking. You don't need to be an expert — but you should be willing to grow."],
              ["Care for the field", "Many projects involve travel to remote sites in challenging conditions. We value people who are kind, careful, and supportive teammates in the field. Even for our lab members who do not need to do fieldwork, they are expected to visit the field a few times."],
              ["Open science", "We share our data, code, and ideas openly. We expect you to as well — and to help us hold ourselves to that standard."],
              ["A long view", "Scientific research is a marathon, not a sprint. We work on questions that take years and team-scale effort. We support each other across that horizon."],
            ].map(([h, p]) => (
              <div key={h} style={{
                display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.25rem",
                paddingBottom: "1.5rem", borderBottom: "1px solid var(--line)",
              }}>
                <div className="mono" style={{
                  fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em",
                  paddingTop: "0.3rem", minWidth: 24,
                }}>—</div>
                <div>
                  <div className="serif" style={{ fontSize: "1.3rem", letterSpacing: "-0.012em" }}>{h}</div>
                  <p style={{ marginTop: "0.4rem", color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "60ch" }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="block">
        <div className="wrap">
          <SectionHead
            index="02"
            eyebrow="How to apply"
            title="Before you write."
            sub="A short, specific email is more useful than a long, generic one. Here's what helps us read your message carefully."
          />
          <ol style={{
            listStyle: "none", padding: 0, margin: 0,
            display: "flex", flexDirection: "column", gap: "1.5rem",
          }}>
            {[
              "Tell us a question or two that excites you, ideally with a sentence on why.",
              "Mention one or two papers from the lab and what drew you to them.",
              "Say a little about your background — coursework, research, fieldwork, hobbies — anything that helps us see you.",
              "Attach a CV or résumé. Transcripts and writing samples are welcome but not required.",
              "Please contact us as soon as you can, and we are eager to work with you throughout the process.",
            ].map((step, i) => (
              <li key={i} style={{
                display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "start",
              }}>
                <div className="serif" style={{
                  fontSize: "2rem", fontWeight: 400, color: "var(--forest)",
                  letterSpacing: "-0.02em", lineHeight: 1, minWidth: 48,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ margin: 0, color: "var(--ink-2)", lineHeight: 1.65, fontSize: "1.05rem", maxWidth: "62ch" }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "3rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a className="btn primary" href={"mailto:" + LAB.email}>
              Email the lab <span className="arrow">→</span>
            </a>
            <button className="btn ghost" onClick={() => go("contact")}>Other contact options</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="block" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <SectionHead index="03" eyebrow="Common questions" title="A few things people ask." />
          <div className="grid-2">
            {[
              ["Do I need a remote sensing background?", "No. We've trained students who started from pure ecology, environmental sciences in general, geography, GIS, engineering, and everywhere in between. We are building a diverse lab."],
              ["Is the lab GRE-required?", "UVA does not require the GRE for our program. However, if you have taken one, you can share the information via email."],
              ["Can I visit before applying?", "Yes — and we encourage it. Email us; we can arrange a Zoom or, when feasible, an in-person visit."],
              ["Is funding guaranteed for PhD students?", "Admitted PhD students in our program receive multi-year support (stipend + tuition + health insurance) through a mix of fellowships, RAships, and TAships."],
            ].map(([q, a]) => (
              <div key={q} className="card">
                <div className="serif" style={{ fontSize: "1.15rem", letterSpacing: "-0.012em" }}>{q}</div>
                <p style={{ marginTop: "0.6rem", color: "var(--ink-2)", lineHeight: 1.6, fontSize: 14.5 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 800px) {
          .join-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function PositionCard({ role, start, status, desc, ddl }) {
  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem" }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Start · {start}
          </div>
          <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 450, letterSpacing: "-0.012em", margin: "0.4rem 0 0" }}>
            {role}
          </h3>
        </div>
        <span className="chip">{status}</span>
      </div>
      <p style={{ color: "var(--ink-2)", lineHeight: 1.6, fontSize: 14.5, margin: 0 }}>{desc}</p>
      <div className="mono" style={{
        fontSize: 12, color: "var(--ink-3)", paddingTop: "0.85rem",
        borderTop: "1px solid var(--line)", marginTop: "auto",
      }}>
        {ddl}
      </div>
    </article>
  );
}

Object.assign(window, { JoinPage });
