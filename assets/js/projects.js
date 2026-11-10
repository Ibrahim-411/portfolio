/* ==========================================================================
   PROJECTS: edit this array and the Projects section updates automatically.

   Fields per project
     name     Project name
     type     Short label shown on the card
     accent   "blue" | "orange" | "yellow"  (card colour)
     badge    Optional small pill, e.g. "Built with Claude Code"
     problem  The situation / what needed solving
     did      What you actually did
     tools    Array of tools used
     result   The outcome. "[add result]" shows as a highlighted placeholder
     url      Optional live site. Adds a "Visit live site" button
     image    Optional screenshot (long, full-page) shown as a scrolling preview
     embed    true = also show a "Live preview" button that opens the site in a
              pop-up. Only works if the site allows being embedded in an iframe
              (X-Frame-Options / frame-ancestors). Studio MiniMinds does not.
     links    Optional extra links: [{ label: "Code on GitHub", href: "https://..." }]

   DRAFT NOTE: please check the wording of problem / did / tools on every card
   and replace each "[add result]" with real numbers.
   ========================================================================== */
window.PROJECTS = [
  {
    name: "Studio MiniMinds",
    type: "Kids' puzzle & activity books brand site",
    accent: "yellow",
    badge: "Built with Claude Code",
    problem:
      "A brand publishing puzzle and activity books for kids aged 3–14 (sold as paperbacks on Amazon) needed a premium, playful home of its own, where parents can browse every book by age and type.",
    did:
      "Designed and built the site with Claude Code using HTML, CSS, JavaScript and React: a React single-page app with a filterable library of 35 books (mazes, cryptograms, word search, sudoku and more), a detail page for each book, and per-page SEO tags (title, description, canonical, Open Graph) so every book can rank on its own.",
    tools: ["Claude Code", "React", "HTML", "CSS", "JavaScript", "GA4"],
    result: "[add result]",
    url: "https://studiominiminds.com",
    image: "assets/img/projects/studio-miniminds.webp",
    embed: false,
    links: [],
  },
  {
    name: "Ambur Leather",
    type: "B2B manufacturer website",
    accent: "orange",
    problem:
      "A leather bag manufacturer in Ambur needed bulk and corporate-gifting buyers across India to find it on Google and ask for quotes, not just browse.",
    did:
      "Built the WordPress site with product-category pages (genuine, PU, vegan and canvas leather, corporate gifting), clear “Get Bulk Quote”, catalogue-download and WhatsApp paths, and on-page SEO around “leather bags manufacturer India”.",
    tools: ["WordPress", "On-page SEO", "Lead-gen CTAs"],
    result: "[add result]",
    url: "https://amburleather.com",
    image: "assets/img/projects/ambur-leather.webp",
    embed: true,
    links: [],
  },
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
