import type { Idea } from "../types";

export const coldlink: Idea = {
  slug: "coldlink",
  title: "ColdLink",
  tagline: "Book cold storage and reefer trucks the way you book a ride.",
  sector: "Agritech · Logistics",
  market: "Bangladesh",
  lastReviewed: "2026-10-14",
  tags: ["low-competition", "opportunistic", "long-term"],
  scores: {
    novelty: 4,
    competitionGap: 5,
    capitalEfficiency: 3,
    timing: 4,
    scalability: 4,
  },
  summary:
    "A booking and visibility layer for the existing, fragmented cold chain. Farmers and traders find free capacity in nearby cold stores and refrigerated trucks, reserve it, and get a digital receipt they can borrow against.",

  problem:
    "Perishables lose a large share of their value between farm and market because cold capacity is hard to find, booked through middlemen, and invisible to anyone outside a phone network. Cold store owners, meanwhile, sit on idle capacity outside peak potato season and have no channel to sell it.",
  whyNow: [
    "Bangladesh had 239 million registered mobile money accounts by January 2025, so deposits and booking fees can be collected digitally.",
    "Smartphone and WhatsApp use among traders and younger farmers has crossed the threshold where a booking app is realistic.",
    "Food security and post-harvest loss are policy priorities, which opens doors to development-agency pilots and grants.",
    "Cheap IoT temperature sensors make it possible to prove storage quality, which was not affordable five years ago.",
  ],
  evidence: [
    {
      value: "13.3%",
      claim: "of the world's food is lost between harvest and retail every year — 1.31 billion tonnes.",
      scope: "Global",
      source: { publisher: "FAO", title: "International Day of Awareness of Food Loss and Waste (2023 data)", year: 2025, url: "https://www.fao.org/statistics/highlights-archive/highlights-detail/on-the-international-day-of-awareness-of-food-loss-and-waste--learn-how-fao-is-leveraging-data-to-save-food-and-advance-the-2030-agenda/en" },
    },
    {
      value: "12%",
      claim: "of global food production — 526 million tonnes — is lost because there is no effective refrigeration.",
      scope: "Global",
      source: { publisher: "UNEP & FAO", title: "Sustainable Food Cold Chains", year: 2022, url: "https://www.unep.org/news-and-stories/press-release/amid-food-and-climate-crises-investing-sustainable-food-cold-chains" },
    },
    {
      value: "144 Mt",
      claim: "of food a year could be saved if developing countries had developed-country cold-chain infrastructure.",
      scope: "Global",
      source: { publisher: "UNEP & FAO", title: "Sustainable Food Cold Chains", year: 2022, url: "https://www.unep.org/news-and-stories/press-release/amid-food-and-climate-crises-investing-sustainable-food-cold-chains" },
    },
    {
      value: "11 Mt vs 3 Mt",
      claim: "Bangladesh grows about 11 million tonnes of potatoes a year but has cold storage for only about 3 million.",
      scope: "Launch market",
      source: { publisher: "The Financial Express (citing Dept. of Agricultural Marketing)", title: "Govt doubles allocation for potato preservation amid market volatility", year: 2024, url: "https://thefinancialexpress.com.bd/trade/govt-doubles-allocation-for-potato-preservation-amid-market-volatility" },
    },
  ],
  references: [
    { publisher: "The Financial Express (Bangladesh Bank data)", title: "Bangladesh MFS accounts surge by 20 million in a year", year: 2025, url: "https://thefinancialexpress.com.bd/economy/bangladesh-mfs-accounts-surge-by-20-million-in-a-year-transactions-up-32pc" },
  ],
  marketNotes: [
    "Most existing cold stores are concentrated in the north and built for potatoes; fruit, fish and vegetables are underserved.",
    "Supply side is a few hundred owner-operated facilities: small enough to onboard by hand, big enough to matter.",
    "Demand side is traders and aggregators first (they move volume), individual farmers second.",
    "Validate locally: capacity utilisation by month, booking fee tolerance, and how warehouse receipts are treated by lenders.",
  ],
  expansion: [
    { region: "India & Pakistan", why: "Same fragmented, owner-operated cold stores and trader-led supply chains at far larger scale." },
    { region: "Sub-Saharan Africa", why: "Highest post-harvest losses, fast mobile-money adoption, and donor appetite for cold-chain pilots." },
    { region: "Southeast Asia", why: "Fruit, fish and seafood exporters need proof of cold storage to reach premium buyers." },
  ],
  competitors: [
    {
      name: "Informal brokers",
      what: "Phone-based middlemen who know which store has space.",
      gap: "Opaque pricing, no records, no proof of quality.",
    },
    {
      name: "Agri marketplaces",
      what: "Platforms that buy from farmers and sell to retailers.",
      gap: "They own the trade, not the storage; capacity booking is not their product.",
    },
    {
      name: "Cold-chain hardware players (e.g. Ecozen in India)",
      what: "Solar cold rooms and cold-chain logistics.",
      gap: "Hardware-heavy and not present in this market; ColdLink starts asset-light.",
    },
  ],
  edge: [
    "Asset-light: no warehouses owned, only the booking and trust layer.",
    "Digital storage receipts create a data trail that banks and MFIs can lend against: a second revenue line competitors cannot copy quickly.",
    "Off-season capacity is nearly free inventory for store owners, so supply-side onboarding has an obvious win.",
    "Founders who speak the local trade language and can sit in a haat outcompete any foreign entrant on onboarding.",
  ],
  risks: [
    {
      risk: "Store owners bypass the platform after the first booking.",
      mitigation:
        "Charge the store, not the farmer; give owners free inventory software they rely on daily.",
    },
    {
      risk: "Low digital literacy among farmers.",
      mitigation: "Agent model at union level plus WhatsApp booking flow before a full app.",
    },
    {
      risk: "Seasonality of demand.",
      mitigation: "Diversify crops (fruit, fish, dairy) and sell off-season capacity to pharma/FMCG.",
    },
  ],
  businessModel: [
    { stream: "Booking commission", detail: "5–8% of storage fee, paid by the facility." },
    { stream: "SaaS for facilities", detail: "Monthly plan for inventory, billing and sensor dashboards." },
    { stream: "Receipt financing", detail: "Referral fee from lenders for loans against digital storage receipts." },
  ],

  stack: [
    { layer: "Web app", choice: "Next.js 16 (App Router) + React 19", why: "One codebase for public pages, dashboards and APIs; server components keep phones fast on 3G." },
    { layer: "Styling", choice: "Tailwind CSS v4 + shadcn/ui", why: "Fast, consistent UI without a design team." },
    { layer: "Database", choice: "PostgreSQL (Neon or Supabase) + PostGIS", why: "Relational bookings plus geo queries for 'nearest store with space'." },
    { layer: "ORM", choice: "Drizzle ORM", why: "Type-safe SQL, lightweight, works on the edge." },
    { layer: "Auth", choice: "Better Auth with phone OTP", why: "Phone numbers are the identity layer for this audience." },
    { layer: "Messaging", choice: "WhatsApp Business Cloud API + SMS fallback", why: "Meet users where they already are." },
    { layer: "Payments", choice: "bKash / SSLCommerz", why: "Local mobile money for deposits and fees." },
    { layer: "IoT", choice: "LoRaWAN or GSM temperature sensors → MQTT → Postgres", why: "Proof of storage quality; enables financing." },
    { layer: "Background jobs", choice: "Inngest or Trigger.dev", why: "Reminders, sensor alerts and settlement without managing queues." },
    { layer: "Hosting & ops", choice: "Vercel + Sentry + PostHog", why: "Zero-ops deploys, error tracking and product analytics from day one." },
  ],
  schema: [
    { name: "users", purpose: "Farmers, traders, facility staff, agents.", fields: ["id", "phone", "name", "role", "district", "created_at"] },
    { name: "facilities", purpose: "Cold stores and their capabilities.", fields: ["id", "owner_id", "name", "location (geography)", "capacity_tonnes", "temp_range", "crops[]"] },
    { name: "capacity_slots", purpose: "Available space per facility per period.", fields: ["id", "facility_id", "start_date", "end_date", "tonnes_free", "price_per_tonne"] },
    { name: "bookings", purpose: "A reservation of space.", fields: ["id", "slot_id", "customer_id", "tonnes", "status", "deposit_paid", "created_at"] },
    { name: "receipts", purpose: "Digital warehouse receipts.", fields: ["id", "booking_id", "commodity", "grade", "weight", "issued_at", "lien_holder_id"] },
    { name: "sensor_readings", purpose: "Temperature/humidity time series.", fields: ["facility_id", "sensor_id", "recorded_at", "temp_c", "humidity"] },
    { name: "payments", purpose: "Mobile money transactions.", fields: ["id", "booking_id", "provider", "amount", "status", "provider_ref"] },
  ],
  costs: [
    { item: "Hosting (Vercel Pro)", mvp: 20, scale: 150 },
    { item: "Database (Neon / Supabase)", mvp: 25, scale: 200 },
    { item: "WhatsApp + SMS", mvp: 40, scale: 600, note: "Per-conversation pricing" },
    { item: "Monitoring & analytics", mvp: 0, scale: 100, note: "Free tiers cover MVP" },
    { item: "Field agents (stipend)", mvp: 300, scale: 3000, note: "Biggest real cost" },
    { item: "Sensors (amortised)", mvp: 50, scale: 800 },
  ],
  oneTimeCosts: [
    { item: "Company registration & trade licence", usd: 400 },
    { item: "Pilot sensor kits (10 facilities)", usd: 1500 },
    { item: "Brand, domain, legal templates", usd: 300 },
  ],

  mvp: {
    weeks: 8,
    scope: [
      "Facility onboarding form and capacity calendar (operated by your team at first).",
      "Search nearest facility with free space by crop and district.",
      "Booking request via web or WhatsApp, confirmed by facility.",
      "Deposit via bKash and a PDF/SMS digital receipt.",
      "Simple admin dashboard: bookings, utilisation, revenue.",
    ],
    notYet: [
      "Native mobile apps",
      "Reefer truck dispatch",
      "Lender integrations",
      "Automated pricing",
    ],
  },
  roadmap: [
    { name: "Validate", timeframe: "Weeks 0–4", goals: ["Interview 30 traders and 15 store owners", "Sign 5 facilities for a free pilot", "Run 10 bookings manually over WhatsApp"] },
    { name: "MVP", timeframe: "Weeks 5–12", goals: ["Ship booking flow and receipts", "Process first 100 bookings", "Install sensors in 3 facilities"] },
    { name: "Traction", timeframe: "Months 4–9", goals: ["30 facilities across 3 districts", "Facility SaaS plan launched", "First lender partnership for receipt financing"] },
    { name: "Production", timeframe: "Months 10–18", goals: ["Reefer truck marketplace", "Mobile app for agents", "Seed round or development grant"] },
  ],
  metrics: [
    "Tonnes booked per month",
    "Facility capacity utilisation (off-season vs peak)",
    "Repeat booking rate per trader",
    "Take rate and gross margin per booking",
  ],
  firstSteps: [
    "Visit three cold stores this week and ask how they fill off-season space.",
    "List 20 traders and call them about storage pain.",
    "Build a Google Sheet of capacity before writing any code.",
  ],
};
