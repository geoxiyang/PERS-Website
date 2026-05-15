// Gallery data — images organized by field site

const GALLERY_IMAGES = [
  // Coastal North Carolina — Ghost Forest
  {
    id: "img-nc-01",
    siteId: "fs-01",
    siteName: "Coastal North Carolina — Ghost Forest",
    title: "Saltwater intrusion impact",
    url: "images/field-sites/nc-ghost-forest-03.jpg",
    thumbnail: "images/field-sites/nc-ghost-forest-03.jpg",
    caption: "Saltwater Intrusion Impact — dead trees amid rubble on the eroding shoreline of coastal North Carolina, a striking example of ghost forest formation driven by sea-level rise and saltwater intrusion.",
  },

  // Harvard Forest
  {
    id: "img-hf-01",
    siteId: "fs-02",
    siteName: "Harvard Forest — Temperate Deciduous",
    title: "Fish eye view of the Harvard Forest Barn Tower",
    url: "images/field-sites/DSC_0086.jpg",
    thumbnail: "images/field-sites/DSC_0086.jpg",
    caption: "Fish eye view of the Harvard Forest Barn Tower where Xi's SIF instrument was installed during 2012–2014, providing one of the first ground-based continuous observations of SIF. Photo credit: Marc Mayes.",
  },
  {
    id: "img-hf-02",
    siteId: "fs-02",
    siteName: "Harvard Forest — Temperate Deciduous",
    title: "View from the top of the Harvard Forest Walkup Tower",
    url: "uploads/HF_tower.webp",
    thumbnail: "uploads/HF_tower.webp",
    caption: "On the top of the Harvard Forest Walkup tower you can see the landscape that has been one of the centers of global change research — eddy covariance, soil warming experiment, ForestGEO plot etc.",
  },
  {
    id: "img-hf-03",
    siteId: "fs-02",
    siteName: "Harvard Forest — Temperate Deciduous",
    title: "Tree mortality (most pine trees) in Harvard Forest",
    url: "uploads/HF_deadtree.webp",
    thumbnail: "uploads/HF_deadtree.webp",
    caption: "Looking up through the canopy at Harvard Forest — bare, leafless pine snags rise among living hardwoods, documenting the ongoing pine mortality that is reshaping the composition of this iconic temperate forest.",
  },

  // BART
  {
    id: "img-bart-03",
    siteId: "fs-03",
    siteName: "Bartlett Experimental Forest (BART)",
    title: "Henry Yeung and Zejun Wu conducting TLS scans",
    url: "uploads/HenryZejun.webp",
    thumbnail: "uploads/HenryZejun.webp",
    caption: "Graduate students Henry Yeung and Zejun Wu conducting TLS scans at Bartlett Experimental Forest.",
  },
  {
    id: "img-bart-02",
    siteId: "fs-03",
    siteName: "Bartlett Experimental Forest (BART)",
    title: "Team photobombs the NEON phenocam",
    url: "uploads/BART_photobomb.webp",
    thumbnail: "uploads/BART_photobomb.webp",
    caption: "Our team photobombed the NEON phenocam while we were conducting TLS scans in 2025.",
  },



  // SERC
  {
    id: "img-serc-01",
    siteId: "fs-04",
    siteName: "Smithsonian Environmental Research Center (SERC)",
    title: "A butterfly operator of our TLS scanner",
    url: "uploads/SERC_TLS_butterfly.webp",
    thumbnail: "uploads/SERC_TLS_butterfly.webp",
    caption: "A butterfly operator of our TLS scanner at the Smithsonian Environmental Research Center (SERC). Photo credit: Elsie Liu.",
  },

  // NEON Blandy (BLAN)
  {
    id: "img-blan-01",
    siteId: "fs-blan",
    siteName: "NEON Blandy (BLAN)",
    title: "Team fieldwork at Blandy Experimental Farm",
    url: "uploads/blandy_tls.webp",
    thumbnail: "uploads/blandy_tls.webp",
    caption: "Our team (Elsie Liu, Zejun Wu, Yiting Fan, and Wayne Dawson) doing fieldwork at Blandy Experimental Farm.",
  },
  // UVA Charlottesville
  {
    id: "img-uva-01",
    siteId: "fs-06",
    siteName: "University of Virginia — Charlottesville",
    title: "Graduate students Rong Li and Andrew Jablonski measuring leaf photosynthesis",
    url: "uploads/RongandAndrew.webp",
    thumbnail: "uploads/RongandAndrew.webp",
    caption: "Graduate students Rong Li and Andrew Jablonski measuring leaf photosynthesis on UVA campus.",
  },

  {
    id: "img-ak-02",
    siteId: "fs-07",
    siteName: "Caribou-Poker Creeks — Alaska Arctic (NEON BONA)",
    title: "Team trip to Denali on July 4th",
    url: "uploads/NSFAlaska.webp",
    thumbnail: "uploads/NSFAlaska.webp",
    caption: "The team took a trip to Denali on July 4th during our field campaign.",
  },
  {
    id: "img-ak-03",
    siteId: "fs-07",
    siteName: "Caribou-Poker Creeks — Alaska Arctic (NEON BONA)",
    title: "Deciduous stand at BONA with instrument mast",
    url: "uploads/DeciduousMastFallTop.webp",
    thumbnail: "uploads/DeciduousMastFallTop.webp",
    caption: "Deciduous stand at BONA and our instrument installed on the top of a mast.",
  },
  {
    id: "img-ak-01",
    siteId: "fs-07",
    siteName: "Caribou-Poker Creeks — Alaska Arctic (NEON BONA)",
    title: "NSF-funded fieldwork at the Caribou-Poker Creeks Research Watershed",
    url: "images/field-sites/IMG_6247.JPG",
    thumbnail: "images/field-sites/IMG_6247.JPG",
    caption: "Lab team at the Caribou-Poker Creeks Research Watershed, Alaska, during NSF-funded fieldwork.",
  },

  // Puerto Rico
  {
    id: "img-pr-03",
    siteId: "fs-08",
    siteName: "El Yunque — Puerto Rico (MACROCOSM)",
    title: "TLS field campaign",
    url: "images/field-sites/puerto-rico-03.jpg",
    thumbnail: "images/field-sites/puerto-rico-03.jpg",
    caption: "TLS field campaign — team hiking through the dense tropical rainforest of El Yunque, Puerto Rico, carrying equipment for terrestrial LiDAR scanning.",
  },
  {
    id: "img-pr-04",
    siteId: "fs-08",
    siteName: "El Yunque — Puerto Rico (MACROCOSM)",
    title: "Lizard in the rainforest",
    url: "uploads/ElYunque_1.webp",
    thumbnail: "uploads/ElYunque_1.webp",
    caption: "Postdoc Yiting Fan captured this moment while doing fieldwork in the rainforest.",
  },
  // Coastal Louisiana — LUMCON
  {
    id: "img-la-01",
    siteId: "fs-09",
    siteName: "Coastal Louisiana — LUMCON Ghost Forest",
    title: "Ghost forest near Louisiana Universities Marine Consortium",
    url: "images/field-sites/IMG_4922.jpg",
    thumbnail: "images/field-sites/IMG_4922.jpg",
    caption: "Dead trees rising from the marsh near LUMCON, coastal Louisiana — a ghost forest driven by sea-level rise and saltwater intrusion.",
  },
  // Blackwater Wildlife Refuge — Maryland
  {
    id: "img-md-01",
    siteId: "fs-10",
    siteName: "Blackwater Wildlife Refuge — Coastal Maryland",
    title: "Ghost forest near coastal Maryland",
    url: "images/field-sites/IMG_3278_2.JPG",
    thumbnail: "images/field-sites/IMG_3278_2.JPG",
    caption: "Ghost forest at Blackwater National Wildlife Refuge, Maryland — dead trees at the forest-marsh transition driven by sea-level rise.",
  },
  {
    id: "img-md-02",
    siteId: "fs-10",
    siteName: "Blackwater Wildlife Refuge — Coastal Maryland",
    title: "Ghost forest near coastal Maryland",
    url: "images/field-sites/IMG_3279_2.JPG",
    thumbnail: "images/field-sites/IMG_3279_2.JPG",
    caption: "Lone dead tree standing in the marsh at Blackwater NWR, with a backdrop of ghost forest stretching across the coastal plain. Photo credit: Henry Yeung.",
  },
  // UVA Pace Tower — Virginia
  {
    id: "img-pace-01",
    siteId: "fs-11",
    siteName: "UVA Pace Tower — Virginia",
    title: "Xi and undergrad lab member Levi Helm working on the top of the Pace tower above the canopy",
    url: "images/field-sites/DJI_0062.JPG",
    thumbnail: "images/field-sites/DJI_0062.JPG",
    caption: "Drone photo of Xi Yang and undergraduate Levi Helm working atop the UVA Pace Tower above the forest canopy, Virginia.",
  },
  // UVA Pace Tower — cloudy day panorama
  {
    id: "img-pace-03",
    siteId: "fs-11",
    siteName: "UVA Pace Tower — Virginia",
    title: "A cloudy day. Enjoy our time on the top of the Pace tower",
    url: "images/field-sites/IMG_2046.JPG",
    thumbnail: "images/field-sites/IMG_2046.JPG",
    caption: "Panoramic view from the top of the UVA Pace Tower on a cloudy autumn day — early fall colors dotting the forest canopy, with the Blue Ridge Mountains visible on the horizon.",
  },
  // UVA Pace Tower — bird's eye view
  {
    id: "img-pace-02",
    siteId: "fs-11",
    siteName: "UVA Pace Tower — Virginia",
    title: "Bird's eye view of the tower and the forest",
    url: "images/field-sites/IMG_1867.jpg",
    thumbnail: "images/field-sites/IMG_1867.jpg",
    caption: "Aerial drone view looking straight down at the UVA Pace Tower, nearly hidden within the dense summer canopy of the Virginia forest.",
  },
  // Amazon Forest — Manaus, Brazil
  {
    id: "img-amz-01",
    siteId: "fs-12",
    siteName: "Amazon Forest — Manaus, Brazil (GOAmazon)",
    title: "Sunrise in the tropics!",
    url: "images/field-sites/DSC_0145.jpg",
    thumbnail: "images/field-sites/DSC_0145.jpg",
    caption: "Sunrise over the Amazon rainforest canopy near Manaus, Brazil. Taken during the DOE-funded GOAmazon field trip in 2014.",
  },
  // Toolik Station — Alaska Arctic
  {
    id: "img-toolik-01",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Cottongrass (Eriophorum) at Toolik Station, Alaska",
    url: "images/field-sites/DSC_0396.JPG",
    thumbnail: "images/field-sites/DSC_0396.JPG",
    caption: "Part of our NASA funded project is to install a SIF instrument in the arctic tundra region. Our team visited Toolik in 2017. The plant in the foreground is Cottongrass (genus Eriophorum).",
  },
  // Toolik Station — panoramic landscape
  {
    id: "img-toolik-07",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Beautiful arctic tundra landscape",
    url: "images/field-sites/IMG_1732.JPG",
    thumbnail: "images/field-sites/IMG_1732.JPG",
    caption: "A sweeping panoramic view of the arctic tundra near Toolik Station, Alaska — lush green tundra in the foreground, a braided river valley, Toolik Lake, and the snow-capped Brooks Range stretching across the horizon.",
  },
  // Toolik Station — flux tower with mosquito
  {
    id: "img-toolik-06",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Mosquitoes are always present in photos taken in the arctic tundra",
    url: "images/field-sites/IMG_1696.JPG",
    thumbnail: "images/field-sites/IMG_1696.JPG",
    caption: "The tundra flux tower and SIF instrument setup at Toolik Station — with a mosquito photobombing the shot. Mosquitoes are an ever-present companion during summer fieldwork in the arctic tundra.",
  },
  // Toolik Station — Yi Yin photosynthesis measurement
  {
    id: "img-toolik-05",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Collaborator Yi Yin (NYU) measuring photosynthesis",
    url: "images/field-sites/IMG_1690.jpeg",
    thumbnail: "images/field-sites/IMG_1690.jpeg",
    caption: "Collaborator Yi Yin (NYU) measuring photosynthesis of tundra shrubs using a leaf gas exchange instrument at Toolik Station, Alaska.",
  },
  // Toolik Station — SIF instrument installation
  {
    id: "img-toolik-04",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Installing the SIF instrument at the tundra flux tower",
    url: "images/field-sites/GOPR0724.jpg",
    thumbnail: "images/field-sites/GOPR0724.jpg",
    caption: "Undergraduate student Levi Helm installing the SIF instrument at Eugenie Euskirchen's tundra flux tower site near Toolik Station, Alaska.",
  },
  // Toolik Station — Alaska Arctic (cottongrass hillside)
  {
    id: "img-toolik-03",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Alaska tundra landscape",
    url: "images/field-sites/DSC_0518.jpg",
    thumbnail: "images/field-sites/DSC_0518.jpg",
    caption: "Cottongrass (Eriophorum) blanketing the arctic tundra hillside near Toolik Station, Alaska, backlit by the summer sun.",
  },
  // Toolik Station — Alaska Arctic (landscape)
  {
    id: "img-toolik-02",
    siteId: "fs-14",
    siteName: "Toolik Station (68° 38′ N, 149° 36′ W)",
    title: "Alaska tundra landscape",
    url: "images/field-sites/DSC_0445.jpg",
    thumbnail: "images/field-sites/DSC_0445.jpg",
    caption: "Alaska tundra landscape near Toolik Station, viewed from an elevated vantage point overlooking the Atigun River valley and the Brooks Range.",
  },
  // VCR LTER — Virginia Coast Reserve
  {
    id: "img-vcr-01",
    siteId: "fs-15",
    siteName: "VCR LTER — Virginia Coast Reserve",
    title: "Eddy covariance tower at a salt marsh",
    url: "images/field-sites/IMG_1059.JPG",
    thumbnail: "images/field-sites/IMG_1059.JPG",
    caption: "Eddy covariance measurements at a salt marsh site in Virginia (37.411033, -75.833204), part of the Virginia Coast Reserve Long-Term Ecological Research network.",
  },
  {
    id: "img-vcr-02",
    siteId: "fs-15",
    siteName: "VCR LTER — Virginia Coast Reserve",
    title: "Fowling Point tower and solar panel array",
    url: "images/field-sites/IMG_1062.JPG",
    thumbnail: "images/field-sites/IMG_1062.JPG",
    caption: "The Fowling Point tower is supported by a solar panel array, standing amid the expansive salt marsh at the Virginia Coast Reserve LTER site (37.411033, -75.833204).",
  },

  // Howland Forest — Maine
  {
    id: "img-howland-01",
    siteId: "fs-17",
    siteName: "Howland Forest — Maine",
    title: "A view from the top of the Howland Forest tower",
    url: "images/field-sites/IMG_3243.jpg",
    thumbnail: "images/field-sites/IMG_3243.jpg",
    caption: "A view from the top of the Howland Forest tower, Maine — a sweeping panorama over the boreal mixed forest canopy beneath a clear blue sky.",
  },

  // Sevilleta LTER — New Mexico
  {
    id: "img-sev-01",
    siteId: "fs-16",
    siteName: "Sevilleta LTER — New Mexico",
    title: "Installing instrument at Marcy Litvak's flux tower site",
    url: "images/field-sites/IMG_2316.JPG",
    thumbnail: "images/field-sites/IMG_2316.JPG",
    caption: "Installing instrument at the Sevilleta LTER site at Marcy Litvak's flux tower site, New Mexico.",
  },

  // La Selva Biological Station — Costa Rica
  {
    id: "img-laselva-01",
    siteId: "fs-18",
    siteName: "La Selva Biological Station — Costa Rica",
    title: "Viewing the tropical forest from the top of a research tower",
    url: "images/field-sites/IMG_3277.jpg",
    thumbnail: "images/field-sites/IMG_3277.jpg",
    caption: "Panoramic view from atop the research tower at La Selva Biological Station, Costa Rica — the dense lowland tropical rainforest canopy stretches to the foothills of the Cordillera Central under a clear blue sky.",
  },

  // Tanguro Farm — Mato Grosso, Brazil
  {
    id: "img-tang-01",
    siteId: "fs-13",
    siteName: "Tanguro Farm — Mato Grosso, Brazil (13.08°S, 52.41°W)",
    title: "Owls at Tanguro Farm before departure",
    url: "images/field-sites/DSC_0206.jpg",
    thumbnail: "images/field-sites/DSC_0206.jpg",
    caption: "Xi visited Tanguro Farm as part of the DOE-GoAmazon project with Joe Berry, Ari Kornfeld, and Gene Robinson, and the team met with colleagues who have been working there for a long time, including Paulo Brando and Sue Trumbore. Xi took this photo at the farm before departure.",
  },
  {
    id: "img-tang-02",
    siteId: "fs-13",
    siteName: "Tanguro Farm — Mato Grosso, Brazil (13.08°S, 52.41°W)",
    title: "Tanguro's research tower",
    url: "images/field-sites/DSC_0402.jpg",
    thumbnail: "images/field-sites/DSC_0402.jpg",
    caption: "Looking up Tanguro Farm's research tower, Mato Grosso, Brazil.",
  },
];

Object.assign(window, { GALLERY_IMAGES });
