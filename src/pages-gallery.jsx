// Gallery page — filtered by field site with lightbox modal

function GalleryPage() {
  const [activeSite, setActiveSite] = React.useState(null);
  const [lightboxImage, setLightboxImage] = React.useState(null);

  // Get unique sites from gallery images (using Map to preserve uniqueness by siteId)
  const sitesMap = new Map();
  GALLERY_IMAGES.forEach((img) => {
    if (!sitesMap.has(img.siteId)) {
      sitesMap.set(img.siteId, { id: img.siteId, name: img.siteName });
    }
  });
  const sites = Array.from(sitesMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  // Filter images by active site
  const displayedImages = activeSite
    ? GALLERY_IMAGES.filter((img) => img.siteId === activeSite)
    : GALLERY_IMAGES;

  // Find current image index for navigation
  const currentImageIndex = displayedImages.findIndex((img) => img.id === lightboxImage?.id);
  const prevImage = () => {
    if (currentImageIndex > 0) setLightboxImage(displayedImages[currentImageIndex - 1]);
  };
  const nextImage = () => {
    if (currentImageIndex < displayedImages.length - 1) setLightboxImage(displayedImages[currentImageIndex + 1]);
  };

  React.useEffect(() => {
    // Check for site filter set by map popup navigation
    if (window.__galleryFilter) {
      setActiveSite(window.__galleryFilter);
      delete window.__galleryFilter;
    }
  }, []);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxImage, currentImageIndex, displayedImages]);

  return (
    <div>
      <PageHeader
        eyebrow="Image Gallery"
        title="Field site photography."
        desc="Explore photos from our research locations across the United States, from coastal wetlands to arctic tundra. Click any image to view at full size."
      />

      <section className="block">
        <div className="wrap">
          {/* Site filter buttons */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <button
              onClick={() => {
                setActiveSite(null);
                window.history.replaceState({}, "", "#gallery");
              }}
              className="chip"
              style={{
                cursor: "pointer",
                border: "none",
                background: !activeSite ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                color: !activeSite ? "white" : "var(--ink-2)",
              }}
            >
              All sites ({GALLERY_IMAGES.length})
            </button>
            {sites.map((site) => {
              const count = GALLERY_IMAGES.filter((img) => img.siteId === site.id).length;
              return (
                <button
                  key={site.id}
                  onClick={() => {
                    setActiveSite(site.id);
                    window.history.replaceState({}, "", `#gallery?site=${site.id}`);
                  }}
                  className="chip"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: activeSite === site.id ? "var(--forest)" : "color-mix(in srgb, var(--ink) 5%, transparent)",
                    color: activeSite === site.id ? "white" : "var(--ink-2)",
                  }}
                >
                  {site.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Image grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}>
            {displayedImages.map((img) => (
              <button
                key={img.id}
                onClick={() => setLightboxImage(img)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  background: "var(--bg-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-3)",
                  fontSize: "12px",
                  fontFamily: "var(--mono)",
                  textAlign: "center",
                  padding: "1rem",
                  overflow: "hidden",
                }}>
                  <img
                    src={img.thumbnail}
                    alt={img.caption}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  {/* Fallback if image fails to load */}
                  <span style={{ display: "none" }}>Placeholder</span>
                </div>
                <div style={{ padding: "0.8rem", background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
                  <div className="mono" style={{ fontSize: "11px", color: "var(--ink-3)", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                    {img.siteName.split(" —")[0]}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--ink)", lineHeight: 1.35 }}>
                    {img.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {lightboxImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              lineHeight: 1,
              zIndex: 10000,
            }}
            title="Close"
          >
            ×
          </button>

          <div
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0 1rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
              onError={(e) => {
                e.target.innerHTML = '<div style="color:white;padding:2rem;text-align:center;">Image not found</div>';
              }}
            />

            {/* Caption and metadata */}
            <div style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "6px",
              padding: "1rem 1.5rem",
              color: "white",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>
                {lightboxImage.siteName}
              </div>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "16px", fontWeight: "600" }}>
                {lightboxImage.title}
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                {lightboxImage.caption}
              </p>
              <div style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.6)",
              }}>
                {currentImageIndex + 1} of {displayedImages.length}
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{
              display: "flex",
              gap: "0.8rem",
              justifyContent: "center",
            }}>
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                style={{
                  background: currentImageIndex === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  padding: "0.6rem 1rem",
                  borderRadius: "6px",
                  cursor: currentImageIndex === 0 ? "default" : "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  opacity: currentImageIndex === 0 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>
              <button
                onClick={nextImage}
                disabled={currentImageIndex === displayedImages.length - 1}
                style={{
                  background: currentImageIndex === displayedImages.length - 1 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  padding: "0.6rem 1rem",
                  borderRadius: "6px",
                  cursor: currentImageIndex === displayedImages.length - 1 ? "default" : "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  opacity: currentImageIndex === displayedImages.length - 1 ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { GalleryPage });
