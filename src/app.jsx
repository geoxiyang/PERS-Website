// App shell — routing, theme + density, Tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "hero": "cinematic",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash.replace("#", "");
    return NAV.some((n) => n.id === h) ? h : "home";
  });
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [newsLoaded, setNewsLoaded] = React.useState(false);

  // Fetch news from news.json on mount
  React.useEffect(() => {
    fetch("news.json")
      .then((res) => res.json())
      .then((data) => {
        // Mutate the global NEWS array in place so all components see the update
        NEWS.splice(0, NEWS.length, ...data);
        setNewsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load news.json:", err);
        setNewsLoaded(true);
      });
  }, []);

  const go = React.useCallback((id) => {
    setRoute(id);
    setMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Expose go() globally so non-React code (e.g. Leaflet popups) can navigate
  React.useEffect(() => {
    window.__navTo = (page, galleryFilter) => {
      if (galleryFilter) window.__galleryFilter = galleryFilter;
      go(page);
    };
    return () => { delete window.__navTo; };
  }, [go]);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (NAV.some((n) => n.id === h)) setRoute(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Apply theme + density to root.
  React.useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.density = t.density;
  }, [t.theme, t.density]);

  let page = null;
  switch (route) {
    case "home": page = <HomePage go={go} hero={t.hero} />; break;
    case "research": page = <ResearchPage go={go} />; break;
    case "people": page = <PeoplePage />; break;
    case "publications": page = <PublicationsPageV3 />; break;
    case "news": page = newsLoaded ? <NewsPage /> : <div className="wrap" style={{ padding: "4rem 0", textAlign: "center" }}>Loading news...</div>; break;
    case "gallery": page = <GalleryPage />; break;
    case "data": page = <DataPage />; break;
    case "join": page = <JoinPage go={go} />; break;
    case "contact": page = <ContactPage />; break;
    case "teaching": page = <TeachingPage />; break;
    default: page = <HomePage go={go} hero={t.hero} />;
  }

  return (
    <>
      <NavBar route={route} go={go} density={t.density}
              menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <main key={route} className="fade-up">{page}</main>
      <Footer go={go} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio label="Palette" value={t.theme}
          options={[
            { value: "default", label: "Forest" },
            { value: "moss", label: "Moss" },
            { value: "bone", label: "Bone" },
            { value: "ink", label: "Ink" },
          ]}
          onChange={(v) => setTweak("theme", v)} />

        <TweakSection label="Home hero" />
        <TweakRadio label="Layout" value={t.hero}
          options={[
            { value: "cinematic", label: "Cinematic" },
            { value: "split", label: "Split" },
            { value: "editorial", label: "Editorial" },
          ]}
          onChange={(v) => {
            setTweak("hero", v);
            if (route !== "home") go("home");
          }} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
          options={["compact", "regular", "spacious"]}
          onChange={(v) => setTweak("density", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
