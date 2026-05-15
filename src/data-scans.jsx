// TLS point cloud scan metadata — Harvard Forest, Aug 21 2025.
// potreePath points to PotreeConverter v2 output (metadata.json).

const SCANS = [
  // ── Quercus alba (White Oak) ─────────────────────────────────────────
  {
    id: "HARV-QUAL-1", name: "White Oak 1", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-1/metadata.json", thumbnail: "scans/HARV-QUAL-1/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QUAL-2", name: "White Oak 2", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-2/metadata.json", thumbnail: "scans/HARV-QUAL-2/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QUAL-3", name: "White Oak 3", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-3/metadata.json", thumbnail: "scans/HARV-QUAL-3/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QUAL-4", name: "White Oak 4", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-4/metadata.json", thumbnail: "scans/HARV-QUAL-4/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QUAL-5", name: "White Oak 5", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-5/metadata.json", thumbnail: "scans/HARV-QUAL-5/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QUAL-6", name: "White Oak 6", species: "Quercus alba",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QUAL-6/metadata.json", thumbnail: "scans/HARV-QUAL-6/thumb.jpg",
    tags: ["deciduous", "oak"],
  },

  // ── Quercus rubra (Northern Red Oak) ─────────────────────────────────
  {
    id: "HARV-QURU-1", name: "Northern Red Oak 1", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-1/metadata.json", thumbnail: "scans/HARV-QURU-1/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QURU-2", name: "Northern Red Oak 2", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-2/metadata.json", thumbnail: "scans/HARV-QURU-2/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QURU-3", name: "Northern Red Oak 3", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-3/metadata.json", thumbnail: "scans/HARV-QURU-3/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QURU-4", name: "Northern Red Oak 4", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-4/metadata.json", thumbnail: "scans/HARV-QURU-4/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QURU-5", name: "Northern Red Oak 5", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-5/metadata.json", thumbnail: "scans/HARV-QURU-5/thumb.jpg",
    tags: ["deciduous", "oak"],
  },
  {
    id: "HARV-QURU-6", name: "Northern Red Oak 6", species: "Quercus rubra",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-QURU-6/metadata.json", thumbnail: "scans/HARV-QURU-6/thumb.jpg",
    tags: ["deciduous", "oak"],
  },

  // ── Fagus grandifolia (American Beech) ───────────────────────────────
  {
    id: "HARV-FAGR-1", name: "American Beech 1", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-1/metadata.json", thumbnail: "scans/HARV-FAGR-1/thumb.jpg",
    tags: ["deciduous", "beech"],
  },
  {
    id: "HARV-FAGR-2", name: "American Beech 2", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-2/metadata.json", thumbnail: "scans/HARV-FAGR-2/thumb.jpg",
    tags: ["deciduous", "beech"],
  },
  {
    id: "HARV-FAGR-3", name: "American Beech 3", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-3/metadata.json", thumbnail: "scans/HARV-FAGR-3/thumb.jpg",
    tags: ["deciduous", "beech"],
  },
  {
    id: "HARV-FAGR-4", name: "American Beech 4", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-4/metadata.json", thumbnail: "scans/HARV-FAGR-4/thumb.jpg",
    tags: ["deciduous", "beech"],
  },
  {
    id: "HARV-FAGR-5", name: "American Beech 5", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-5/metadata.json", thumbnail: "scans/HARV-FAGR-5/thumb.jpg",
    tags: ["deciduous", "beech"],
  },
  {
    id: "HARV-FAGR-6", name: "American Beech 6", species: "Fagus grandifolia",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-FAGR-6/metadata.json", thumbnail: "scans/HARV-FAGR-6/thumb.jpg",
    tags: ["deciduous", "beech"],
  },

  // ── Acer rubrum (Red Maple) ───────────────────────────────────────────
  {
    id: "HARV-ACRU-1", name: "Red Maple 1", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-1/metadata.json", thumbnail: "scans/HARV-ACRU-1/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-2", name: "Red Maple 2", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-2/metadata.json", thumbnail: "scans/HARV-ACRU-2/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-3", name: "Red Maple 3", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-3/metadata.json", thumbnail: "scans/HARV-ACRU-3/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-4", name: "Red Maple 4", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-4/metadata.json", thumbnail: "scans/HARV-ACRU-4/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-5", name: "Red Maple 5", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-5/metadata.json", thumbnail: "scans/HARV-ACRU-5/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-6", name: "Red Maple 6", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-6/metadata.json", thumbnail: "scans/HARV-ACRU-6/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-7", name: "Red Maple 7", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-7/metadata.json", thumbnail: "scans/HARV-ACRU-7/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
  {
    id: "HARV-ACRU-8", name: "Red Maple 8", species: "Acer rubrum",
    site: "Harvard Forest", siteId: "harvard", date: "2025-08-21", description: "",
    potreePath: "scans/HARV-ACRU-8/metadata.json", thumbnail: "scans/HARV-ACRU-8/thumb.jpg",
    tags: ["deciduous", "maple"],
  },
];

Object.assign(window, { SCANS });
