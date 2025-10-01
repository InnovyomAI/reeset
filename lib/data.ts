export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  bullets: string[];
};

export type Brand = {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  blurb: string;
};

export const SERVICES: Service[] = [
  {
    slug: "engine-repair",
    title: "Engine Repair & Overhaul",
    excerpt: "Complete diagnostics and overhaul for heavy-duty diesel engines.",
    heroImage: "/gallery/placeholder-1.jpg",
    bullets: [
      "Computer diagnostics",
      "In-frame & out-of-frame overhauls",
      "Cooling & fuel systems",
    ],
  },
  {
    slug: "aftertreatment",
    title: "Aftertreatment & Emissions",
    excerpt: "DPF, DEF, SCR systems serviced for performance and compliance.",
    heroImage: "/gallery/placeholder-2.jpg",
    bullets: ["DPF clean/regens", "DEF dosing & sensors", "SCR troubleshooting"],
  },
  {
    slug: "transmission",
    title: "Transmission Services",
    excerpt: "Manual/auto transmissions serviced and rebuilt.",
    heroImage: "/gallery/placeholder-3.jpg",
    bullets: ["Clutches & flywheels", "Seals & bearings", "Calibrations"],
  },
  {
    slug: "brake-systems",
    title: "Brake Systems",
    excerpt: "Air & hydraulic brake inspection and repair.",
    heroImage: "/gallery/placeholder-4.jpg",
    bullets: ["Air lines & valves", "Drums/rotors/pads", "ABS diagnostics"],
  },
  {
    slug: "electrical",
    title: "Electrical & Lighting",
    excerpt: "Wiring, starters, alternators, lighting and more.",
    heroImage: "/gallery/placeholder-5.jpg",
    bullets: ["Harness & connectors", "Charging systems", "LED retrofits"],
  },
  {
    slug: "suspension-steering",
    title: "Suspension & Steering",
    excerpt: "Ride, stability, and alignment issues resolved.",
    heroImage: "/gallery/placeholder-6.jpg",
    bullets: [
      "Shocks, bushings, airbags",
      "Tie rods & boxes",
      "Axle alignment (referral if needed)",
    ],
  },
  {
    slug: "diagnostics-pmi",
    title: "Diagnostics & Preventive Maintenance",
    excerpt: "Keep downtime low with scheduled service.",
    heroImage: "/gallery/placeholder-3.jpg",
    bullets: ["Full inspections", "Fluids & filters", "Service schedules"],
  },
  {
    slug: "mobile-roadside",
    title: "Mobile / Roadside Assistance",
    excerpt: "Field repair support when you can’t make the shop.",
    heroImage: "/gallery/placeholder-2.jpg",
    bullets: ["Jump starts & air leaks", "Minor repairs on-site", "Tow coordination"],
  },
];

export const BRANDS: Brand[] = [
  {
    slug: "freightliner",
    name: "Freightliner",
    logo: "/public-not-required/freightliner.png",
    heroImage: "/gallery/placeholder-4.jpg",
    blurb: "Service and maintenance for Freightliner highway tractors and vocational units.",
  },
  {
    slug: "kenworth",
    name: "Kenworth",
    logo: "/public-not-required/kenworth.png",
    heroImage: "/gallery/placeholder-5.jpg",
    blurb: "Kenworth powertrain, chassis, and electrical diagnostics.",
  },
  {
    slug: "peterbilt",
    name: "Peterbilt",
    logo: "/public-not-required/peterbilt.png",
    heroImage: "/gallery/placeholder-6.jpg",
    blurb: "Peterbilt repair and maintenance solutions for fleets and owner-operators.",
  },
  {
    slug: "volvo",
    name: "Volvo",
    logo: "/public-not-required/volvo.png",
    heroImage: "/gallery/placeholder-1.jpg",
    blurb: "Volvo engine, aftertreatment, and electronics expertise.",
  },
  {
    slug: "western-star",
    name: "Western Star",
    logo: "/public-not-required/western-star.png",
    heroImage: "/gallery/placeholder-2.jpg",
    blurb: "Western Star diagnostics, brakes, and chassis service.",
  },
  {
    slug: "mack",
    name: "Mack",
    logo: "/public-not-required/mack.png",
    heroImage: "/gallery/placeholder-3.jpg",
    blurb: "Mack powertrain, emissions, and preventive maintenance.",
  },
  {
    slug: "international",
    name: "International",
    logo: "/public-not-required/international.png",
    heroImage: "/gallery/placeholder-4.jpg",
    blurb: "International trucks—engine, electrical, and driveline.",
  },
  {
    slug: "hino",
    name: "Hino",
    logo: "/public-not-required/hino.png",
    heroImage: "/gallery/placeholder-5.jpg",
    blurb: "Hino medium/heavy-duty service and PM programs.",
  },
];
