// Data shared across pages — updated with real lab info.
const LAB = {
  name: "Plant Ecology & Remote Sensing Lab",
  shortName: "PEaRS Lab",
  tagline: "Reading the pulse of Earth's ecosystems — from the canopy down, and from orbit in.",
  intro:
    "We are global change ecologists. We use various tools — remote sensing, field observations, and modeling — to understand the impact of climate change on our ecosystems. We travel to ecosystems from tropics to the arctic. We use novel remote sensing techniques to see ecosystems in ways we couldn't before, and advanced computer science techniques to analyze geospatial products.",
  affiliation: "Department of Environmental Sciences",
  university: "University of Virginia",
  email: "xiyang [a] virginia_dot_edu",
  address: "Clark Hall · 291 McCormick Road · Charlottesville, VA 22904",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "research", label: "Research" },
  { id: "people", label: "People" },
  { id: "publications", label: "Publications" },
  { id: "news", label: "News" },
  { id: "gallery", label: "Gallery" },
  { id: "data", label: "Data & Code" },
  { id: "join", label: "Join Us" },
];

const RESEARCH_THEMES = [
  {
    id: "T-01",
    title: "Ghost forests — sea level rise & saltwater intrusion",
    blurb:
      "Understanding how rising seas and saltwater intrusion are transforming coastal forests into ghost forests, using remote sensing to track the pace and pattern of forest retreat.",
    site: "Coastal US · Eastern seaboard",
    palette: "lichen",
  },
  {
    id: "T-02",
    title: "Why trees look the way they are — terrestrial laser scanning",
    blurb:
      "Using terrestrial laser scanning to build detailed 3D reconstructions of tree architecture, revealing how leaf arrangement like leaf angle and clumping impact light absorption and remote sensing signals, and how branching patterns, crown shape, and structural allocation emerge from competition, environment, and evolutionary history.",
    site: "NEON sites · TLS · NEON AOP",
    palette: "default",
  },
  {
    id: "T-03",
    title: "Tree mortality across the United States",
    blurb:
      "Mapping and understanding individual-level tree mortality across the continent. We use very high-resolution remote sensing, LiDAR, and deep learning to understand the drivers of spatiotemporal patterns in tree mortality. With this unprecedented dataset, we will be able to test if we can predict the location and timing of tree mortality hotspots. ",
    site: "CONUS · NAIP · PLANETLAB",
    palette: "clay",
  },
  {
    id: "T-04",
    title: "Drone ecology & proximal remote sensing",
    blurb:
      "Bridging the scale gap between leaves and satellites with UAV-mounted RGB and hyperspectral payloads, plus tower-based continuous monitoring instruments like FluoSpec.",
    site: "Field campaigns, year-round",
    palette: "default",
  },
  {
    id: "T-05",
    title: "Solar-induced chlorophyll fluorescence (SIF)",
    blurb:
      "Pioneering the use of solar-induced chlorophyll fluorescence as a novel proxy for photosynthesis, from ground-based instruments to satellite applications, to track ecosystem carbon uptake.",
    site: "Tower sites · TROPOMI · OCO-2",
    palette: "lichen",
  },
  {
    id: "T-06",
    title: "Ecosystem and radiative transfer models",
    blurb:
      "Coupling process-based vegetation models with remote sensing observations to constrain projections of the terrestrial carbon sink, including CLM-SIF and radiative transfer modeling.",
    site: "CLM · FATES · radiative transfer",
    palette: "clay",
  },
];

const PEOPLE = [
  {
    role: "Principal Investigator",
    members: [
      {
        id: "pi-01",
        name: "Xi Yang",
        title: "Associate Professor · Lab Director",
        bio:
          "Global change ecologist studying vegetation-climate interactions through remote sensing, plant physiology, and modeling. Interested in forest structure and function, vegetation feedbacks to climate, and tree mortality. Develops novel approaches to quantify photosynthesis, canopy structure, and leaf traits remotely.\n\nPhD, Brown University, 2014.",
        focus: ["SIF", "Remote sensing", "Plant physiology", "Climate change"],
        email: "xiyang [a] virginia_dot_edu",
        joined: "2016–present",
      },
    ],
  },
  {
    role: "Postdoctoral Researchers",
    members: [
      {
        id: "p-01",
        name: "Yiting Fan",
        title: "Postdoctoral Researcher",
        bio:
          "Leads TLS field campaigns across NEON sites. Led the 2025 summer campaign across SERC, SCBI, HARV, and BART coinciding with NEON AOP flights. Also involved in DOE-funded MACROCOSM project TLS work in Puerto Rico.",
        focus: ["TLS", "Tree structure", "NEON"],
        joined: "2024–present",
      },
    ],
  },
  {
    role: "Graduate Students",
    members: [
      {
        id: "g-01",
        name: "Wayne Dawson",
        title: "Graduate Student · Virginia Space Grant Fellow",
        bio:
          "Department of Environmental Sciences. Supported by the Virginia Space Grant Fellowship.",
        focus: ["Remote sensing", "Ecology"],
        email: "wfd2bv@virginia.edu",
        joined: "Current",
      },
      {
        id: "g-02",
        name: "Elsie Liu",
        title: "Graduate Student",
        bio:
          "Research in plant ecology and remote sensing, contributing to the lab's work on ecosystem monitoring and vegetation traits.",
        focus: ["Plant ecology", "Remote sensing"],
        joined: "Current",
      },
      {
        id: "g-03",
        name: "Jessee Steele",
        title: "Graduate Student · NSF GRFP Fellow",
        bio:
          "NSF GRFP Fellow.",
        focus: ["Forestry", "Remote sensing"],
        joined: "Current",
      },
      {
        id: "g-04",
        name: "Zejun Wu",
        title: "Graduate Student",
        bio:
          "Conducted TLS fieldwork in Puerto Rico's El Yunque forest as part of the DOE-funded MACROCOSM project. Recently won an award (2026).",
        focus: ["TLS", "Tropical forests"],
        joined: "Current",
      },
      {
        id: "g-05",
        name: "Henry Yeung",
        title: "Graduate Student · Jefferson Fellow",
        bio:
          "Won the Jefferson Fellowship (2026), a prestigious university-wide fellowship providing a full year of stipend and research support. Works on remote sensing of vegetation structure and function. B.Sc. from the Chinese University of Hong Kong.",
        focus: ["Remote sensing", "Vegetation"],
        joined: "2022–present",
      },
    ],
  },
  {
    role: "Lab Alumni — Postdocs",
    members: [
      {
        id: "a-p01",
        name: "Jongmin Kim",
        title: "Now: Assistant Professor, Kyung Hee University, South Korea",
        bio: "Former postdoc. TLS, SIF measurements, and drone-based ecological surveys.",
        joined: "Postdoc",
      },
      {
        id: "a-p02",
        name: "Koong Yi",
        title: "Now: Ameriflux Postdoc Fellow, UC Berkeley",
        bio: "Former postdoc. Ground-based solar-induced fluorescence, thermal remote sensing, and water-use efficiency.",
        joined: "Postdoc",
      },
      {
        id: "a-p03",
        name: "Atticus Stovall",
        title: "Now: Research Assistant Professor, University of Maryland",
        bio: "Former postdoc (2018). Creator of TLSLeAF. Tree mortality analysis using remote sensing. Work featured in Science magazine.",
        joined: "Postdoc · 2018",
      },
      {
        id: "a-p04",
        name: "Elliott White",
        title: "Now: Assistant Professor, Stanford University",
        bio: "Former postdoc (2019–2021). Coastal remote sensing and the impact of sea-level rise and saltwater intrusion on forested wetlands.",
        joined: "Postdoc · 2019–2021",
      },
    ],
  },
  {
    role: "Lab Alumni — Graduate Students",
    members: [
      {
        id: "a-g01",
        name: "Andrew Jablonski",
        title: "PhD 2018–2025 · Now: Postdoc at Boise State University",
        bio: "NASA FINESST Fellow. Used remote sensing to understand tree mortality. Graduated May 2025.",
        joined: "–2025",
      },
      {
        id: "a-g02",
        name: "Rong Li",
        title: "PhD 2018–2024 · Now: Postdoc at Cornell University",
        bio: "NASA FINESST Fellow. SIF simulation, leaf-to-canopy radiative transfer in CLM5. Graduated May 2025.",
        joined: "2018–2024",
      },
      {
        id: "a-g03",
        name: "Hannah Mast",
        title: "PhD 2018–2024 · Christine Mirzayan Fellow",
        bio: "Virginia Sea Grant Fellow. Coastal wetland research in Virginia, environmental justice and changing coastal landscapes. Graduated May 2025.",
        joined: "2018–2024",
      },
      {
        id: "a-g04",
        name: "Kelsey Huelsman",
        title: "PhD 2019–2024 · NASA GESTAR Postdoc Fellow",
        bio: "Contributed to the lab's remote sensing and field research across multiple ecosystems.",
        joined: "2019–2024",
      },
    ],
  },
  {
    role: "Lab Alumni — Undergraduates",
    members: [
      {
        id: "a-u01",
        name: "Jake Smith",
        title: "UVA B.Sc. 2020 · Distinguished Major Program",
        bio: "",
        joined: "2020",
      },
      {
        id: "a-u02",
        name: "Ben Masters",
        title: "UVA B.Sc. 2020 · Distinguished Major Program · Now at NEON",
        bio: "Co-authored TLSLeAF paper in New Phytologist.",
        joined: "2020",
      },
      {
        id: "a-u03",
        name: "Carmen Petras",
        title: "UVA B.Sc. 2022 · Now at Carlyx",
        bio: "Field campaigns in Alaska.",
        joined: "2022",
      },
      {
        id: "a-u04",
        name: "Audrey Root",
        title: "UVA B.Sc. 2022",
        bio: "",
        joined: "2022",
      },
      {
        id: "a-u05",
        name: "Bailey Costello",
        title: "UVA B.Sc. 2019 · Distinguished Major Program",
        bio: "",
        joined: "2019",
      },
      {
        id: "a-u06",
        name: "Levi Helm",
        title: "UVA B.Sc. 2018 · DMP · Highest Honors · Now AAAS fellow",
        bio: "",
        joined: "2018",
      },
      {
        id: "a-u07",
        name: "Madeline Reinsel",
        title: "UVA B.Sc. 2018 · Distinguished Major Program",
        bio: "",
        joined: "2018",
      },
      {
        id: "a-u08",
        name: "Wenzheng Wang",
        title: "UVA B.Sc. 2017",
        bio: "",
        joined: "2017",
      },
    ],
  },
];

// NEWS is now loaded from news.json via fetch in src/app.jsx
let NEWS = [];

const PUBLICATIONS = [
  {
    year: 2026,
    items: [
      {
        authors: "Dawson III, W., Jablonski, A., Kim, J., Watts, J., Epstein, H., Yang, X.",
        title: "Tower-Based Visible and Near-Infrared Remote Sensing Observations at Caribou-Poker Creeks Research Watershed, Alaska (April 2023–July 2024).",
        venue: "Data publication",
        doi: "",
        tags: ["Arctic", "Proximal RS", "Data"],
      },
      {
        authors: "Wang, X., Scott, R.L., Yan, D., Dannenberg, M.P., Yang, X., Magney, T.S., Zhang, Y., Smith, W.K.",
        title: "Proximal measurements of solar-induced fluorescence and surface reflectance capture seasonal productivity and drought stress dynamics in a semiarid grassland ecosystem.",
        venue: "Journal of Remote Sensing 6: 1034",
        doi: "10.34133/remotesensing.1034",
        tags: ["SIF", "Drought", "Grassland"],
      },
    ],
  },
  {
    year: 2025,
    items: [
      {
        authors: "Pierrat, Z.A., Magney, T.S., Richardson, W.P., Runkle, B.R.K., Diehl, J.L., Yang, X., Woodgate, W., et al.",
        title: "Proximal remote sensing: an essential tool for bridging the gap between high-resolution ecosystem monitoring and global ecology.",
        venue: "New Phytologist",
        doi: "10.1111/nph.20405",
        tags: ["Proximal RS", "SIF", "Review"],
      },
      {
        authors: "Zhan, W., Yang, X., Ryu, Y., Dechant, B., Huang, Y., Goulas, Y., Kang, M., Gentine, P.",
        title: "Canopy structure exhibits linear and nonlinear links to biome-level maximum light use efficiency.",
        venue: "Remote Sensing of Environment",
        doi: "10.1016/j.rse.2025.114xxx",
        tags: ["Canopy structure", "LUE"],
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        authors: "O'Donnell, K.L., Bernhardt, E.S., Yang, X., Emanuel, R.E., Ardón, M., Lerdau, M.T., Manda, A.K., et al.",
        title: "Saltwater intrusion and sea level rise threatens US rural coastal landscapes and communities.",
        venue: "Anthropocene, 100427",
        doi: "10.1016/j.ancene.2024.100427",
        tags: ["Coastal", "Sea level rise"],
      },
      {
        authors: "Yi, K., Novick, K.A., Zhang, Q., Wang, L., Hwang, T., Yang, X., Mallick, K., Béland, M., Senay, G.B., Baldocchi, D.D.",
        title: "Responses of marginal and intrinsic water-use efficiency to changing aridity using FLUXNET observations.",
        venue: "J. Geophysical Research: Biogeosciences 129(6): e2023JG007875",
        doi: "10.1029/2023JG007875",
        tags: ["WUE", "FLUXNET"],
      },
      {
        authors: "Wu, G., Guan, K., Ainsworth, E.A., Martin, D.G., Kimm, H., Yang, X.",
        title: "Solar-induced chlorophyll fluorescence captures the effects of elevated ozone on canopy structure and acceleration of senescence in soybean.",
        venue: "Journal of Experimental Botany 75(1): 350–363",
        doi: "10.1093/jxb/erad365",
        tags: ["SIF", "Ozone"],
      },
      {
        authors: "Mast, H., Yang, X., et al.",
        title: "Unveiling the transferability of PLSR models for leaf trait estimation: lessons from a comprehensive analysis with a novel global dataset.",
        venue: "Remote Sensing of Environment",
        doi: "10.1016/j.rse.2024.114xxx",
        tags: ["Leaf traits", "Spectroscopy"],
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        authors: "Li, R., Yang, X., et al.",
        title: "Impact of atmospheric dryness on solar-induced chlorophyll fluorescence: tower-based observations at a temperate forest.",
        venue: "Agricultural and Forest Meteorology",
        doi: "10.1016/j.agrformet.2023.109xxx",
        tags: ["SIF", "VPD", "Forest"],
      },
      {
        authors: "Jablonski, A., Yang, X., et al.",
        title: "Immediate and lagged vegetation responses to dry spells revealed by continuous solar-induced chlorophyll fluorescence observations in a tall-grass prairie.",
        venue: "Global Change Biology",
        doi: "10.1111/gcb.16xxx",
        tags: ["SIF", "Drought", "Prairie"],
      },
    ],
  },
  {
    year: 2022,
    items: [
      {
        authors: "Li, R., Lombardozzi, D., Shi, M., Frankenberg, C., Parazoo, N.C., Köhler, P., Yi, K., Guan, K., Yang, X.",
        title: "Representation of leaf-to-canopy radiative transfer processes improves simulation of far-red SIF in CLM version 5.",
        venue: "J. Advances in Modeling Earth Systems 14(3): e2021MS002747",
        doi: "10.1029/2021MS002747",
        tags: ["SIF", "CLM", "Modeling"],
      },
      {
        authors: "Wu, G., Jiang, C., Kimm, H., Wang, S., Bernacchi, C., Moore, C.E., Suyker, A., Yang, X., Magney, T., Frankenberg, C.",
        title: "Difference in seasonal peak timing of soybean far-red SIF and GPP explained by canopy structure and chlorophyll content.",
        venue: "Remote Sensing of Environment 279: 113104",
        doi: "10.1016/j.rse.2022.113104",
        tags: ["SIF", "GPP", "Crops"],
      },
      {
        authors: "Zeng, Y., Chen, M., Hao, D., Damm, A., Badgley, G., Rascher, U., Johnson, J.E., et al., Yang, X.",
        title: "Combining near-infrared radiance of vegetation and fluorescence spectroscopy to detect effects of abiotic changes and stresses.",
        venue: "Remote Sensing of Environment 270: 112856",
        doi: "10.1016/j.rse.2021.112856",
        tags: ["SIF", "NIRv", "Stress"],
      },
    ],
  },
  {
    year: 2021,
    items: [
      {
        authors: "Stovall, A.E.L., Masters, B., Fatoyinbo, L., Yang, X.",
        title: "TLSLeAF: automatic leaf angle estimates from single-scan terrestrial laser scanning.",
        venue: "New Phytologist",
        doi: "10.1111/nph.17548",
        tags: ["TLS", "Leaf angle"],
      },
      {
        authors: "Ury, E.A., Yang, X., Wright, J.P., Bernhardt, E.S.",
        title: "Rapid deforestation of a coastal landscape driven by sea-level rise and extreme events.",
        venue: "Ecological Applications, e02339",
        doi: "10.1002/eap.2339",
        tags: ["Coastal", "Ghost forest"],
      },
      {
        authors: "White, E.E., Ury, E.A., Bernhardt, E.S., Yang, X.",
        title: "Climate change driving widespread loss of coastal forested wetlands throughout the North American coastal plain.",
        venue: "Ecosystems, 1–16",
        doi: "10.1007/s10021-021-00686-w",
        tags: ["Coastal", "Wetlands"],
      },
      {
        authors: "Yang, X., Xu, X., Stovall, A., Chen, M., Lee, J.-E.",
        title: "Recovery: fast and slow — vegetation response during the 2012–2016 California drought.",
        venue: "J. Geophysical Research: Biogeosciences, e2020JG005976",
        doi: "10.1029/2020JG005976",
        tags: ["Drought", "California"],
      },
      {
        authors: "Kimm, H., Guan, K., Burroughs, C.H., Peng, B., Ainsworth, E.A., Bernacchi, C.J., Moore, C.E., et al., Yang, X.",
        title: "Quantifying high-temperature stress on soybean canopy photosynthesis: the unique role of sun-induced chlorophyll fluorescence.",
        venue: "Global Change Biology",
        doi: "10.1111/gcb.15603",
        tags: ["SIF", "Heat stress", "Crops"],
      },
    ],
  },
  {
    year: 2020,
    items: [
      {
        authors: "Yi, K., Dragoni, D., Phillips, R.P., Roman, D.T., Novick, K.A., Yang, X.",
        title: "A model for estimating transpiration from remotely sensed solar-induced chlorophyll fluorescence.",
        venue: "Remote Sensing of Environment 252: 112134",
        doi: "10.1016/j.rse.2020.112134",
        tags: ["SIF", "Transpiration"],
      },
      {
        authors: "Atkins, J.W., Stovall, A.E.L., Yang, X.",
        title: "Mapping temperate forest phenology using tower, UAV, and ground-based sensors.",
        venue: "Drones 4(3): 56",
        doi: "10.3390/drones4030056",
        tags: ["Phenology", "UAV"],
      },
    ],
  },
  {
    year: 2015,
    items: [
      {
        authors: "Yang, X., Tang, J., Mustard, J.F., Lee, J.-E., Rossini, M., Joiner, J., Munger, J.W., et al.",
        title: "Solar-induced chlorophyll fluorescence that correlates with canopy photosynthesis on diurnal and seasonal scales in a temperate deciduous forest.",
        venue: "Geophysical Research Letters",
        doi: "10.1002/2015GL063201",
        tags: ["SIF", "Photosynthesis", "Forest"],
      },
    ],
  },
];

const RESOURCES = [
  {
    kind: "Algorithm",
    title: "TLSLeAF — automatic leaf angle estimates from terrestrial laser scanning",
    blurb:
      "An open-source method for automatically deriving leaf angle distributions from single-scan TLS data. Published in New Phytologist.",
    stats: [{ k: "method", v: "TLS" }, { k: "language", v: "Python" }],
    link: "github.com — Stovall et al. 2021",
    palette: "default",
  },
  {
    kind: "Instrument",
    title: "FluoSpec 3 — continuous canopy SIF monitoring",
    blurb:
      "Tower-mounted spectrometer system for automated, continuous measurement of solar-induced chlorophyll fluorescence. Deployed at multiple flux tower sites.",
    stats: [{ k: "sites", v: "3+" }, { k: "data", v: "continuous" }],
    link: "Contact lab for details",
    palette: "lichen",
  },
  {
    kind: "Dataset",
    title: "Ground far-red SIF and vegetation indices — US Midwestern agroecosystems",
    blurb:
      "Long-term ground SIF and vegetation index records from tower sites, useful for satellite SIF validation and mechanistic interpretation of fluorescence signals.",
    stats: [{ k: "region", v: "Midwest US" }, { k: "type", v: "Time series" }],
    link: "See associated publications",
    palette: "clay",
  },
  {
    kind: "Model",
    title: "CLM-SIF — SIF simulation in the Community Land Model",
    blurb:
      "Implementation of leaf-to-canopy radiative transfer processes for simulating far-red SIF in CLM version 5, improving representation of canopy-scale fluorescence.",
    stats: [{ k: "model", v: "CLM5" }, { k: "scope", v: "Global" }],
    link: "Li et al. 2022 · JAMES",
    palette: "default",
  },
  {
    kind: "Dataset",
    title: "Coastal forest change — North American coastal plain",
    blurb:
      "Remote sensing products documenting the widespread loss of coastal forested wetlands driven by sea-level rise, saltwater intrusion, and extreme events along the US eastern seaboard.",
    stats: [{ k: "extent", v: "E. US" }, { k: "years", v: "multi-decadal" }],
    link: "White et al. 2021 · Ury et al. 2021",
    palette: "lichen",
  },
  {
    kind: "Tutorial",
    title: "Advanced Remote Sensing — course materials",
    blurb:
      "Materials from the graduate-level Advanced Remote Sensing course taught at UVA since 2017, covering SIF, imaging spectroscopy, lidar, and thermal remote sensing.",
    stats: [{ k: "level", v: "Graduate" }, { k: "since", v: "2017" }],
    link: "Available on request",
    palette: "default",
  },
];

const COURSES = [
  {
    code: "EVSC",
    title: "Advanced Remote Sensing",
    cadence: "University of Virginia · 2017–present",
    blurb:
      "Graduate-level course covering modern remote sensing approaches for environmental science, including solar-induced fluorescence, imaging spectroscopy, lidar, thermal remote sensing, and data assimilation techniques.",
  },
];

Object.assign(window, {
  LAB, NAV, RESEARCH_THEMES, PEOPLE, NEWS, PUBLICATIONS, RESOURCES, COURSES,
});
