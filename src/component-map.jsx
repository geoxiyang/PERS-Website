// Interactive map component — Leaflet.js + OpenStreetMap tiles

const FIELD_SITES = [
  {
    id: "fs-01",
    lat: 35.9,
    lng: -76.4,
    label: "Coastal North Carolina — Ghost Forest",
    imageUrl: null,
  },
  {
    id: "fs-02",
    lat: 42.537,
    lng: -72.191,
    label: "Harvard Forest — Temperate Deciduous",
    imageUrl: null,
  },
  {
    id: "fs-03",
    lat: 44.064,
    lng: -71.701,
    label: "Bartlett Experimental Forest (BART)",
    imageUrl: null,
  },
  {
    id: "fs-04",
    lat: 38.893,
    lng: -77.027,
    label: "Smithsonian Environmental Research Center (SERC)",
    imageUrl: null,
  },
  {
    id: "fs-05",
    lat: 38.83,
    lng: -78.55,
    label: "Smithsonian Conservation Biology Institute (SCBI)",
    imageUrl: null,
  },
  {
    id: "fs-06",
    lat: 38.03,
    lng: -78.5,
    label: "University of Virginia — Charlottesville",
    imageUrl: null,
  },
  {
    id: "fs-07",
    lat: 64.8,
    lng: -146.3,
    label: "Caribou-Poker Creeks — Alaska Arctic",
    imageUrl: null,
  },
  {
    id: "fs-08",
    lat: 18.28,
    lng: -65.79,
    label: "El Yunque — Puerto Rico (MACROCOSM)",
    imageUrl: null,
  },
];

function InteractiveMapComponent({ sites }) {
  const mapDivRef = React.useRef(null);
  const leafletMapRef = React.useRef(null);
  const markersRef = React.useRef([]);

  const activeSites = sites || FIELD_SITES;

  React.useEffect(() => {
    // Leaflet must be loaded; bail if not
    if (!window.L || !mapDivRef.current) return;
    // Don't double-init
    if (leafletMapRef.current) return;

    const L = window.L;

    // Init map centered on continental US
    const map = L.map(mapDivRef.current, {
      center: [38.5, -96.0],
      zoom: 4,
      zoomControl: false,        // we supply our own buttons
      scrollWheelZoom: true,
      attributionControl: true,
    });

    leafletMapRef.current = map;

    // Esri World Topo tile layer — shows terrain + vegetation at all zoom levels, no API key
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution:
        'Tiles © <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    }).addTo(map);

    // Custom marker icon that matches the lab palette
    function makeIcon(highlighted) {
      return L.divIcon({
        className: "",
        iconAnchor: [12, 24],
        popupAnchor: [0, -26],
        html: `<div style="
          width:24px; height:24px;
          background:${highlighted ? "var(--forest-deep,#1f4a2e)" : "var(--forest,#2d6a4f)"};
          border:2.5px solid ${highlighted ? "#fff" : "rgba(255,255,255,0.85)"};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(0,0,0,0.28);
        "></div>`,
      });
    }

    // Add markers
    activeSites.forEach((site) => {
      const marker = L.marker([site.lat, site.lng], { icon: makeIcon(false) });

      // Build popup content
      let popupContent = `
        <div style="font-family:var(--sans,sans-serif);min-width:180px;max-width:260px;">
          <div style="font-size:13px;font-weight:600;line-height:1.35;margin-bottom:6px;color:#1a2e1a;">
            ${site.label}
          </div>
          <div style="font-size:11px;color:#6b7c6b;font-family:monospace;letter-spacing:0.04em;">
            ${site.lat.toFixed(4)}° N,  ${Math.abs(site.lng).toFixed(4)}° ${site.lng < 0 ? "W" : "E"}
          </div>`;

      if (site.imageUrl) {
        popupContent += `
          <img src="${site.imageUrl}"
               alt="${site.label}"
               style="display:block;width:100%;margin-top:10px;border-radius:5px;object-fit:cover;max-height:160px;" />`;
      }

      popupContent += `
          <a href="#gallery?site=${site.id}" style="display:inline-block;margin-top:10px;padding:6px 10px;background:#2d6a4f;color:#fff;border-radius:4px;font-size:12px;font-weight:500;text-decoration:none;border:none;cursor:pointer;">
            View gallery →
          </a>
        </div>`;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: "peers-popup",
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      // Clean up on unmount
      map.remove();
      leafletMapRef.current = null;
      markersRef.current = [];
    };
  }, []); // run once on mount

  // Sync site list changes (if parent passes new sites)
  React.useEffect(() => {
    const map = leafletMapRef.current;
    const L = window.L;
    if (!map || !L) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    function makeIcon() {
      return L.divIcon({
        className: "",
        iconAnchor: [12, 24],
        popupAnchor: [0, -26],
        html: `<div style="
          width:24px; height:24px;
          background:var(--forest,#2d6a4f);
          border:2.5px solid rgba(255,255,255,0.85);
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(0,0,0,0.28);
        "></div>`,
      });
    }

    activeSites.forEach((site) => {
      const marker = L.marker([site.lat, site.lng], { icon: makeIcon() });
      let popupContent = `
        <div style="font-family:var(--sans,sans-serif);min-width:180px;max-width:260px;">
          <div style="font-size:13px;font-weight:600;line-height:1.35;margin-bottom:6px;color:#1a2e1a;">
            ${site.label}
          </div>
          <div style="font-size:11px;color:#6b7c6b;font-family:monospace;letter-spacing:0.04em;">
            ${site.lat.toFixed(4)}° N,  ${Math.abs(site.lng).toFixed(4)}° ${site.lng < 0 ? "W" : "E"}
          </div>`;
      if (site.imageUrl) {
        popupContent += `<img src="${site.imageUrl}" alt="${site.label}"
          style="display:block;width:100%;margin-top:10px;border-radius:5px;object-fit:cover;max-height:160px;" />`;
      }
      popupContent += `
          <a href="#gallery?site=${site.id}" style="display:inline-block;margin-top:10px;padding:6px 10px;background:#2d6a4f;color:#fff;border-radius:4px;font-size:12px;font-weight:500;text-decoration:none;border:none;cursor:pointer;">
            View gallery →
          </a>
        </div>`;
      marker.bindPopup(popupContent, { maxWidth: 280, className: "peers-popup" });
      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [sites]);

  const zoomIn  = () => leafletMapRef.current && leafletMapRef.current.zoomIn();
  const zoomOut = () => leafletMapRef.current && leafletMapRef.current.zoomOut();

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Map div — Leaflet mounts into this */}
      <div
        ref={mapDivRef}
        style={{
          width: "100%",
          height: "520px",
          borderRadius: "8px",
          border: "1px solid var(--line)",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          background: "#d9eaf7",
        }}
      />

      {/* Custom zoom buttons — positioned over the map */}
      <div style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        zIndex: 1000,
      }}>
        <button
          onClick={zoomIn}
          aria-label="Zoom in"
          style={{
            width: "34px", height: "34px",
            background: "var(--paper)",
            border: "1px solid var(--line-2)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            color: "var(--ink)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >+</button>
        <button
          onClick={zoomOut}
          aria-label="Zoom out"
          style={{
            width: "34px", height: "34px",
            background: "var(--paper)",
            border: "1px solid var(--line-2)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "20px",
            lineHeight: 1,
            color: "var(--ink)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >−</button>
      </div>

      {/* Site count badge */}
      <div style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        zIndex: 1000,
        background: "color-mix(in srgb, var(--paper) 92%, transparent)",
        backdropFilter: "blur(6px)",
        border: "1px solid var(--line)",
        borderRadius: "5px",
        padding: "5px 10px",
        fontSize: "12px",
        fontFamily: "var(--mono)",
        color: "var(--ink-2)",
        letterSpacing: "0.05em",
      }}>
        {activeSites.length} field site{activeSites.length !== 1 ? "s" : ""}
      </div>

      {/* Popup styles injected once */}
      <style>{`
        .peers-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          border: 1px solid #c5d9c5;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          padding: 0;
        }
        .peers-popup .leaflet-popup-content {
          margin: 12px 14px;
        }
        .peers-popup .leaflet-popup-tip {
          background: #fff;
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { InteractiveMapComponent });
