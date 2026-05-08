// Gallery data — images organized by field site

const GALLERY_IMAGES = [
  // Coastal North Carolina — Ghost Forest
  {
    id: "img-nc-01",
    siteId: "fs-01",
    siteName: "Coastal North Carolina — Ghost Forest",
    title: "Saltwater intrusion impact",
    url: "images/field-sites/nc-ghost-forest-01.jpg",
    thumbnail: "images/field-sites/nc-ghost-forest-01.jpg",
    caption: "Dead cypress trees in coastal North Carolina ghost forest",
  },
  {
    id: "img-nc-02",
    siteId: "fs-01",
    siteName: "Coastal North Carolina — Ghost Forest",
    title: "Forest transition zone",
    url: "images/field-sites/nc-ghost-forest-02.jpg",
    thumbnail: "images/field-sites/nc-ghost-forest-02.jpg",
    caption: "Transition zone between healthy forest and ghost forest",
  },

  // Harvard Forest
  {
    id: "img-hf-01",
    siteId: "fs-02",
    siteName: "Harvard Forest — Temperate Deciduous",
    title: "Autumn canopy",
    url: "images/field-sites/harvard-forest-01.jpg",
    thumbnail: "images/field-sites/harvard-forest-01.jpg",
    caption: "Temperate deciduous forest canopy in autumn",
  },
  {
    id: "img-hf-02",
    siteId: "fs-02",
    siteName: "Harvard Forest — Temperate Deciduous",
    title: "Tower installation",
    url: "images/field-sites/harvard-forest-02.jpg",
    thumbnail: "images/field-sites/harvard-forest-02.jpg",
    caption: "Research tower at Harvard Forest",
  },

  // BART
  {
    id: "img-bart-01",
    siteId: "fs-03",
    siteName: "Bartlett Experimental Forest (BART)",
    title: "NEON site overview",
    url: "images/field-sites/bart-01.jpg",
    thumbnail: "images/field-sites/bart-01.jpg",
    caption: "Bartlett Experimental Forest landscape",
  },

  // SERC
  {
    id: "img-serc-01",
    siteId: "fs-04",
    siteName: "Smithsonian Environmental Research Center (SERC)",
    title: "Chesapeake Bay wetlands",
    url: "images/field-sites/serc-01.jpg",
    thumbnail: "images/field-sites/serc-01.jpg",
    caption: "SERC research area near Chesapeake Bay",
  },

  // SCBI
  {
    id: "img-scbi-01",
    siteId: "fs-05",
    siteName: "Smithsonian Conservation Biology Institute (SCBI)",
    title: "Forest plot measurement",
    url: "images/field-sites/scbi-01.jpg",
    thumbnail: "images/field-sites/scbi-01.jpg",
    caption: "Team conducting field measurements at SCBI",
  },

  // UVA Charlottesville
  {
    id: "img-uva-01",
    siteId: "fs-06",
    siteName: "University of Virginia — Charlottesville",
    title: "Campus research site",
    url: "images/field-sites/uva-campus-01.jpg",
    thumbnail: "images/field-sites/uva-campus-01.jpg",
    caption: "Research instrumentation on UVA campus",
  },

  // Alaska
  {
    id: "img-ak-01",
    siteId: "fs-07",
    siteName: "Caribou-Poker Creeks — Alaska Arctic",
    title: "Arctic tundra landscape",
    url: "images/field-sites/alaska-tundra-01.jpg",
    thumbnail: "images/field-sites/alaska-tundra-01.jpg",
    caption: "Arctic tundra at Caribou-Poker Creeks",
  },
  {
    id: "img-ak-02",
    siteId: "fs-07",
    siteName: "Caribou-Poker Creeks — Alaska Arctic",
    title: "Phenology monitoring",
    url: "images/field-sites/alaska-tundra-02.jpg",
    thumbnail: "images/field-sites/alaska-tundra-02.jpg",
    caption: "Vegetation phenology monitoring in Alaska",
  },

  // Puerto Rico
  {
    id: "img-pr-01",
    siteId: "fs-08",
    siteName: "El Yunque — Puerto Rico (MACROCOSM)",
    title: "Tropical rainforest canopy",
    url: "images/field-sites/puerto-rico-01.jpg",
    thumbnail: "images/field-sites/puerto-rico-01.jpg",
    caption: "Tropical rainforest structure in El Yunque",
  },
  {
    id: "img-pr-02",
    siteId: "fs-08",
    siteName: "El Yunque — Puerto Rico (MACROCOSM)",
    title: "TLS field campaign",
    url: "images/field-sites/puerto-rico-02.jpg",
    thumbnail: "images/field-sites/puerto-rico-02.jpg",
    caption: "TLS fieldwork in Puerto Rico rainforest",
  },
];

Object.assign(window, { GALLERY_IMAGES });
