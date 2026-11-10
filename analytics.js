// Visitor analytics for the lab website.
//
// Nothing loads until the values below are filled in.
//
// 1. Statcounter (private visit log: time, IP, city, organization, pages).
//    statcounter.com → add project → "Install guide" → "Default guide".
//    Copy sc_project and sc_security from the code it shows.
//
// 2. Public visitor map (ClustrMaps or MapMyVisitors), shown in the footer.
//    Copy the widget code they give you and take from its <script> tag:
//      scriptId: the id="..." value  (e.g. "clustrmaps" or "mapmyvisitors")
//      src:      the src="..." value (e.g. "//clustrmaps.com/map_v2.js?d=...")
window.SITE_ANALYTICS = {
  statcounter: {
    project: "13365914",   // sc_project
    security: "05552b5b",  // sc_security
  },
  visitorMap: {
    scriptId: "mmvst_globe",
    src: "https://mapmyvisitors.com/globe.js?d=_d9XCuTEhLwzcGz3h9kKSEW6DlchbNjPLYvB00Il-1k",
  },
};

(function () {
  var sc = window.SITE_ANALYTICS.statcounter;
  if (sc.project && sc.security) {
    window.sc_project = Number(sc.project);
    window.sc_invisible = 1;
    window.sc_security = sc.security;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.statcounter.com/counter/counter.js";
    document.head.appendChild(s);
  }

  // Record a view when the visitor switches sections (#news, #gallery, ...),
  // since those don't reload the page.
  window.trackPageview = function () {
    try {
      if (window._statcounter && window._statcounter.record_pageview) {
        window._statcounter.record_pageview();
      }
    } catch (e) { /* analytics must never break the site */ }
  };
})();
