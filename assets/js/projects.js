/* ==========================================================================
   PROJECTS: edit this array and the Projects section updates automatically.

   Fields per project
     name     Project name
     type     Short label shown on the card
     accent   "blue" | "orange" | "yellow"  (card colour)
     problem  The situation / what needed solving
     did      What you actually did
     tools    Array of tools used
     result   The outcome. "[add result]" shows as a highlighted placeholder
     links    Optional: [{ label: "Live site", href: "https://..." }]

   DRAFT NOTE: wording for KKM Keychains, True Safety and Studio MiniMinds was
   written from the general facts you gave (four WordPress sites, SEO
   foundations done by you). Please check problem / did / tools for accuracy
   and replace each "[add result]" with real numbers.
   ========================================================================== */
window.PROJECTS = [
  {
    name: "KKM Keychains",
    type: "D2C WooCommerce store",
    accent: "orange",
    problem:
      "A D2C brand needed a store of its own: one customers could find on Google and order from directly.",
    did:
      "Built and launched the WooCommerce store on WordPress, set up the catalogue and checkout, and handled the SEO foundations myself: keyword research, on-page SEO and a Search Console + GA4 setup.",
    tools: ["WordPress", "WooCommerce", "Search Console", "GA4"],
    result: "[add result]",
    links: [],
  },
  {
    name: "True Safety",
    type: "B2B lead-generation site",
    accent: "blue",
    problem:
      "A B2B business needed a website that turns visitors into enquiries, not just a digital brochure.",
    did:
      "Built and launched the WordPress site with clear service pages and enquiry paths, then set up the SEO foundations: keyword mapping, on-page, technical checks and tracking.",
    tools: ["WordPress", "On-page SEO", "Search Console", "GA4"],
    result: "[add result]",
    links: [],
  },
  {
    name: "Studio MiniMinds",
    type: "B2B lead-generation site",
    accent: "yellow",
    problem:
      "A business that needed to be found by the right people and give them an easy way to get in touch.",
    did:
      "Built and launched the WordPress site, structured the pages around what people search for, and handled the SEO foundations and analytics setup.",
    tools: ["WordPress", "Local SEO", "Search Console", "GA4"],
    result: "[add result]",
    links: [],
  },
  {
    name: "Adorsh",
    type: "Manufacturer's product catalogue",
    accent: "orange",
    problem:
      "A leather products manufacturer in Ambur needed a proper online catalogue so buyers could browse the range and enquire.",
    did:
      "Built the responsive catalogue with React and WordPress, handled SEO for the WordPress site, and ran Meta Ads to bring buyers in.",
    tools: ["React", "WordPress", "SEO", "Meta Ads"],
    result: "[add result]",
    links: [],
  },
  {
    name: "KKM-Crafts",
    type: "Internship build · AspiraSys",
    accent: "blue",
    problem:
      "A crafts business needed a clean, responsive website that worked properly on phones.",
    did:
      "Designed and built the site from scratch during my internship at AspiraSys.",
    tools: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    result: "[add result]",
    links: [{ label: "Code on GitHub", href: "https://github.com/Ibrahim-411/kkm-crafts" }],
  },
  {
    name: "AutomotoService",
    type: "Internship build · AspiraSys",
    accent: "yellow",
    problem:
      "An auto-service business needed an online presence that explained its services clearly.",
    did:
      "Built the responsive website during my internship at AspiraSys, and started learning React on the side.",
    tools: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    result: "[add result]",
    links: [{ label: "Code on GitHub", href: "https://github.com/Ibrahim-411/AutoMotoService" }],
  },
];
