export const site = {
  name: "Karly Chavez",
  company: "Key Connections Real Estate",
  tagline: "Unlocking Your Dream Home",
  motto: "Your connection to a brighter, bolder future.",
  phone: "(619) 495-1339",
  phoneHref: "tel:+16194951339",
  email: "Karly@keyconnectionsrealty.com",
  address: "333 H Street, Chula Vista, CA 91910",
  dreAgent: "CA DRE# 01986040",
  dreOffice: "DRE# 02014153",
  broker: {
    name: "Hilary Saunders",
    role: "Broker of Record CA",
    license: "Corporate License No. 02014153",
  },
  serviceAreas: "San Diego · Riverside · Los Angeles counties",
  office: { lat: 32.634143, lng: -117.078358 },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/KeyConnectionsRealEstate/" },
    { label: "Facebook", href: "https://www.facebook.com/karlysdrealtor" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karly-chavez-2197b947/" },
    { label: "YouTube", href: "https://www.youtube.com/@KeyConnectionsRealEstate" },
    { label: "Zillow", href: "https://www.zillow.com/profile/KarlyChavezRealtor" },
  ],
};

// Core values strip — verbatim from the homepage.
export const values = [
  "Trust",
  "Honesty",
  "Excellence",
  "Knowledge",
  "Tenacity",
  "Integrity",
];

// "Our numbers" — verbatim from /about.
export const stats = [
  { value: 100, suffix: "+", label: "Houses sold" },
  { value: 200, suffix: "+", label: "Happy clients" },
  { value: 10, suffix: "+", label: "Years of business" },
  { value: 100, suffix: "+", label: "Marketing vendors & partners" },
];

// Verbatim bio from keyconnectionsrealty.com/agent/karly-chavez ("Meet Karly").
export const bio = [
  "Our top producing founder Karly Chavez was named to the San Diego Association of REALTORS® list of 40 under 40 Real Estate Agents in 2022 and 2023. Additionally, since 2020 she has ranked among their Top 3% and Top 5%. Karly has been a Featured Top Agent in Real Producers Magazine and has ranked in the Winner’s Circle Top 5% since 2020.",
  "As expert communicators, we take the time to understand your needs and provide personalized service to reach all of your real estate objectives. Our deep relationships with our clients transcend the transaction, so don't be surprised if you receive small gifts along the way, like gas cards, to aid in the house-hunting process. We strongly believe in home staging and taking care of every last detail to get your property ready to list. To that end, we offer numerous packages based on your home's needs.",
  "Utilizing expert negotiation skills, we secure the best deals for our buyers and top dollar for our sellers. Our company name speaks to the connections we build with clients through high-touch care, devotion, and a relentless work ethic. If you’re looking to buy, sell, or invest in San Diego, Riverside, or Los Angeles counties, Key Connections Real Estate is your connection to a brighter, bolder future.",
];

// Verbatim mission & vision from keyconnectionsrealty.com/about.
export const mission = {
  heading: "Empowering Dreams, Building Legacies:",
  body: "At Key Connections Realty, our mission is to empower the dreams of our clients by delivering unparalleled real estate experiences. We strive to be the catalysts for turning aspirations into tangible realities, creating not just transactions but lifelong legacies.",
};

export const vision = {
  heading: "Redefining Excellence in Real Estate:",
  body: "Our vision is to be the trailblazers of a new era in real estate—a future where personalized service, unwavering integrity, and innovative thinking converge. We aspire to set a benchmark for excellence, transforming the way individuals perceive and engage in the real estate journey. Through our commitment to quality, community, and continuous improvement, we aim to shape a legacy that resonates for generations to come.",
};

// Verbatim intro from /team.
export const teamIntro =
  "When it comes to finding the right home, or getting the best results when selling a home, our extra effort and willingness to go above and beyond for all our clients is our trademark quality. We believe that trust, honesty, and integrity are crucial in all real estate transactions and we work tirelessly with both buyers and sellers to accomplish their goals. Our clients are of utmost importance to us. We built our business on customer service, and giving our clients 100% of our energy!";

export const team = [
  {
    name: "Karly Chavez",
    role: "Founder | REALTOR®",
    license: "#01986040",
    photo: "/images/team/karly-chavez.webp",
  },
  {
    name: "Elizabeth Brumbaugh",
    role: "Transaction Coordinator",
    license: null,
    photo: "/images/team/elizabeth-brumbaugh.webp",
  },
  {
    name: "Hilary Saunders",
    role: "Broker of Record CA",
    license: "#1834648",
    photo: "/images/team/hilary-saunders.webp",
  },
  {
    name: "Jessica Partida",
    role: "REALTOR®",
    license: "#02152524",
    photo: "/images/team/jessica-partida.webp",
  },
  {
    name: "Mark Anthony Banez",
    role: "REALTOR®",
    license: "#02018020",
    photo: "/images/team/mark-anthony-banez.webp",
  },
  {
    name: "Selah Rodriguez",
    role: "REALTOR®",
    license: "#02186736",
    photo: "/images/team/selah-rodriguez.webp",
  },
];

export const credentials = [
  "SDAR 40 Under 40 — 2022 & 2023",
  "SDAR Top 3% / Top 5% since 2020",
  "Featured Top Agent, Real Producers Magazine",
  "Winner’s Circle Top 5% since 2020",
  "BBB Accredited Real Estate Agency",
];

// Verbatim MLS/IDX disclaimer from the site footer.
export const idxDisclaimer =
  "This information is deemed reliable but not guaranteed. You should rely on this information only to decide whether or not to further investigate a particular property. BEFORE MAKING ANY OTHER DECISION, YOU SHOULD PERSONALLY INVESTIGATE THE FACTS (e.g. square footage and lot size) with the assistance of an appropriate professional. You may use this information only to identify properties you may be interested in investigating further. All uses except for personal, non-commercial use in accordance with the foregoing purpose are prohibited. Redistribution or copying of this information, any photographs or video tours is strictly prohibited. This information is derived from the Internet Data Exchange (IDX) service provided by San Diego MLS. Displayed property listings may be held by a brokerage firm other than the broker and/or agent responsible for this display. The information and any photographs and video tours and the compilation from which they are derived are protected by copyright. Compilation © 2023 San Diego MLS.";

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Listings",
    children: [
      { label: "Home Search", href: "/listings" },
      { label: "Featured Properties", href: "/listings?status=for-sale" },
      { label: "Past Transactions", href: "/listings?status=sold" },
      { label: "Neighborhoods", href: "/neighborhoods" },
    ],
  },
  {
    label: "Buy",
    children: [
      { label: "Buyer’s Guide", href: "/buyers-guide" },
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
      { label: "Military Resources", href: "/military" },
    ],
  },
  {
    label: "Sell",
    children: [
      { label: "Home Valuation", href: "/home-valuation" },
      { label: "Seller’s Guide", href: "/sellers-guide" },
      { label: "Divorce & Real Estate", href: "/divorce" },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Meet the Team", href: "/team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Events", href: "/events" },
      { label: "Koffee with Karly", href: "/koffee-with-karly" },
      { label: "Podcast", href: "/podcast" },
      { label: "Join Key Connections", href: "/join" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
