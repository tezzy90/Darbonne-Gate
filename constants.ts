import { FinancialMetric, ExitStrategyMetric } from './types';

export const PASSWORD = "Legacy2026";

// Parcel Location Data
export const PARCEL_COORDINATES = {
  // Approximate center of the parcel based on legal description
  // SW SW of Sec. 31, T19N R2E + SE SE of Sec. 36, T19N R1E
  lat: 32.5234,
  lng: -92.4156,
  address: "Intersection of Hwy 552 & Hwy 15, Downsville, LA 71234"
};

export const KEY_LOCATIONS = [
  {
    name: "D'Arbonne Lake",
    lat: 32.5789,
    lng: -92.3845,
    distance: 5.2, // miles
    description: "Premier crappie and bass fishing destination"
  },
  {
    name: "D'Arbonne National Wildlife Refuge",
    lat: 32.5456,
    lng: -92.3912,
    distance: 3.1,
    description: "Thousands of waterfowl, year-round hunting"
  },
  {
    name: "Interstate 20",
    lat: 32.4523,
    lng: -92.4234,
    distance: 28.5,
    description: "Major east-west corridor"
  },
  {
    name: "Monroe, LA",
    lat: 32.5093,
    lng: -92.1193,
    distance: 24.8,
    description: "Regional hub, airport access"
  },
  {
    name: "Parish Line Store",
    lat: 32.5238,
    lng: -92.4162,
    distance: 0.1,
    description: "Local landmark, across from property"
  }
];

// Hunting Species Data
export const HUNTING_SPECIES = [
  {
    name: "White-tailed Deer",
    icon: "🦌",
    seasons: ["Firearm (Nov-Jan)", "Archery (Oct-Feb)"],
    notes: "Specific areas closed during gun season. Follow state and refuge regulations.",
    popularity: "High"
  },
  {
    name: "Waterfowl",
    icon: "🦆",
    seasons: ["Nov-Jan"],
    notes: "D'Arbonne NWR is wintering habitat for thousands of waterfowl. Hunting until noon only. No motors after certain times.",
    popularity: "Very High"
  },
  {
    name: "Squirrel",
    icon: "🐿️",
    seasons: ["Year-round tradition"],
    notes: "Dogs permitted after last refuge deer gun hunt.",
    popularity: "High"
  },
  {
    name: "Coyote & Feral Hog",
    icon: "🐗",
    seasons: ["Year-round"],
    notes: "No restrictions",
    popularity: "Medium"
  },
  {
    name: "Rabbit",
    icon: "🐰",
    seasons: ["Fall-Winter"],
    notes: "Popular local game",
    popularity: "Medium"
  }
];

// Fishing Species Data
export const FISHING_SPECIES = [
  {
    name: "Crappie",
    icon: "🐟",
    rating: "Most Popular",
    season: "Spring peak (Feb-May)",
    techniques: ["Jig fishing", "Minnows", "Spider rigging"],
    notes: "Louisiana State Parks and Lake D'Arbonne Life highlight as prime target"
  },
  {
    name: "Largemouth Bass",
    icon: "🎣",
    rating: "Very Popular",
    season: "Year-round",
    techniques: ["Bait casting", "Ledges", "Underwater creeks", "Flats"],
    notes: "Tournament-quality fishing"
  },
  {
    name: "Catfish",
    icon: "🐱",
    rating: "Popular",
    season: "Year-round",
    techniques: ["Bottom fishing", "Trotlines"],
    notes: "Abundant and accessible"
  },
  {
    name: "Bream (Bluegill)",
    icon: "🐠",
    rating: "Popular",
    season: "Spring-Summer",
    techniques: ["Cane pole fishing", "Crickets"],
    notes: "Family-friendly fishing"
  }
];

// Case Studies Data
export const CASE_STUDIES = [
  {
    name: "Jellystone Park Camp-Resorts",
    location: "80+ locations nationwide",
    focus: "Themed family camping",
    model: "Franchise system with strong brand identity",
    stats: {
      locations: "80+",
      premiumPricing: "30-50% above commodity parks",
      occupancy: "Higher guest loyalty and repeat rates"
    },
    relevance: "Demonstrates power of theming and brand experience"
  },
  {
    name: "Sun Outdoors (ELS)",
    location: "National portfolio",
    focus: "Luxury RV resorts",
    model: "Acquisition and premium positioning",
    stats: {
      valuationMultiple: "10-12x EBITDA",
      adr: "$75-150/night",
      exitStrategy: "REIT or private equity buyers"
    },
    relevance: "Proves institutional appetite for quality RV assets"
  },
  {
    name: "Lake Fork, TX",
    location: "East Texas",
    focus: "Bass fishing mecca",
    model: "Tournament-driven occupancy",
    stats: {
      occupancy: "90%+ during tournament season",
      premium: "$75-100/night vs $45-55 commodity",
      seasonality: "Spring/Fall peaks"
    },
    relevance: "Similar outdoor recreation focus, premium pricing validated"
  },
  {
    name: "Reelfoot Lake, TN",
    location: "Northwest Tennessee",
    focus: "Duck hunting destination",
    model: "Seasonal hunting lodges and RV parks",
    stats: {
      occupancy: "95%+ during waterfowl season",
      premium: "$75-100/night",
      advanceBookings: "6-12 months out"
    },
    relevance: "Waterfowl hunting parallel to D'Arbonne NWR opportunity"
  }
];

// Market Statistics
export const MARKET_STATS = {
  themedVsCommodity: {
    adrPremium: "30-50%",
    occupancyIncrease: "15-25%",
    guestLoyalty: "2-3x repeat rate"
  },
  darbonneRegion: {
    springDriver: "Crappie fishing tournaments",
    summerDriver: "Family bass fishing",
    fallDriver: "Deer archery season",
    winterDriver: "Waterfowl and deer firearm"
  },
  unionParish: {
    hunterSpending: "$2,500-5,000 per season",
    anglerSpending: "$1,500-3,000 per season",
    tournamentEconomy: "$50k-100k per major event"
  }
};

// Updated Timeline (2025-2027)
export const TIMELINE_2025 = [
  {
    phase: "Phase 1",
    milestone: "Land Acquisition",
    startDate: "2024-10-01",
    endDate: "2024-11-15",
    status: "Complete" as const,
    notes: "47 acres secured at Hwy 552 & Hwy 15 intersection"
  },
  {
    phase: "Phase 1",
    milestone: "Topographical Survey",
    startDate: "2024-11-20",
    endDate: "2024-12-15",
    status: "Complete" as const,
    notes: "Confirmed minimal grading needed"
  },
  {
    phase: "Phase 2",
    milestone: "Parish Permits",
    startDate: "2025-01-15",
    endDate: "2025-03-30",
    status: "In Progress" as const,
    notes: "Site plan submitted to Union Parish Planning Commission"
  },
  {
    phase: "Phase 2",
    milestone: "USDA/SBA Financing Approval",
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    status: "Pending" as const,
    notes: "Pre-qualification in progress"
  },
  {
    phase: "Phase 2",
    milestone: "Utility Engineering",
    startDate: "2025-03-01",
    endDate: "2025-04-30",
    status: "Upcoming" as const,
    notes: "Water, electric, sewer design"
  },
  {
    phase: "Phase 3",
    milestone: "Ground Breaking",
    startDate: "2025-05-15",
    endDate: "2025-06-01",
    status: "Upcoming" as const,
    notes: "Construction kickoff"
  },
  {
    phase: "Phase 3",
    milestone: "Infrastructure Development",
    startDate: "2025-06-01",
    endDate: "2025-10-31",
    status: "Upcoming" as const,
    notes: "Roads, utilities, grading"
  },
  {
    phase: "Phase 4",
    milestone: "RV Slips Construction (Phase 1)",
    startDate: "2025-11-01",
    endDate: "2026-03-31",
    status: "Upcoming" as const,
    notes: "100 premium slips with full hookups"
  },
  {
    phase: "Phase 4",
    milestone: "Pavilion & Amenities",
    startDate: "2025-12-01",
    endDate: "2026-04-30",
    status: "Upcoming" as const,
    notes: "3,500 sq ft pavilion, pool, bathhouse"
  },
  {
    phase: "Phase 4",
    milestone: "Soft Launch",
    startDate: "2026-05-01",
    endDate: "2026-05-15",
    status: "Upcoming" as const,
    notes: "First guest arrivals, grand opening"
  },
  {
    phase: "Phase 5",
    milestone: "Phase 2 Evaluation",
    startDate: "2026-11-01",
    endDate: "2027-01-31",
    status: "Upcoming" as const,
    notes: "Assess demand for 65-slot expansion"
  }
];

// Existing financial data
export const FINANCIAL_DATA: FinancialMetric[] = [
  { year: 'Year 1', revenue: 1.76, netProfit: 0.70 },
  { year: 'Year 2', revenue: 2.05, netProfit: 0.85 },
  { year: 'Year 3', revenue: 2.40, netProfit: 0.98 },
  { year: 'Year 4', revenue: 2.75, netProfit: 1.10 },
  { year: 'Year 5', revenue: 3.02, netProfit: 1.21 },
];

export const EXIT_STRATEGY_DATA: ExitStrategyMetric[] = [
  { year: 'Year 5', noi: 1.21, valuation: 13.4 },
  { year: 'Year 6', noi: 1.25, valuation: 13.8 },
  { year: 'Year 7', noi: 1.29, valuation: 14.3 },
  { year: 'Year 8', noi: 1.33, valuation: 14.7 },
  { year: 'Year 9', noi: 1.38, valuation: 15.3 },
  { year: 'Year 10', noi: 1.45, valuation: 16.1 },
];

export const OWNER_LETTER = `
"It's not just about the land. It's about what we leave behind.

Growing up, the concept of 'ownership' was the ultimate goal. But as I've navigated the hospitality world, from Disney to Harrah's, I've realized that true wealth isn't just in the asset—it's in the experience you create and the legacy you secure for the next generation.

D'Arbonne Gate isn't just an RV park. It is a strategic foothold in a booming outdoor economy. We are securing 47 acres of prime Louisiana soil and wedding it to the lifestyle of the modern hunter and angler. This project builds generational revenue, creates local jobs, and offers a premium sanctuary where there was once only open ground.

We are inviting you to build this legacy with us."
`;

// Calendly Link
export const CALENDLY_URL = "https://calendly.com/darbonne-gate-rv-resort/new-meeting";

// Google Drive Folder
export const GOOGLE_DRIVE_FOLDER_ID = "1ceaShYqHtOK-Kw8AIXQe-ex6kEiUIHnF";
