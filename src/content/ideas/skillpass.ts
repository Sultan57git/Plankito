import type { Idea } from "../types";

export const skillpass: Idea = {
  slug: "skillpass",
  title: "SkillPass",
  tagline: "A verified skills passport for workers going abroad.",
  sector: "Workforce · HR tech",
  market: "Bangladesh",
  lastReviewed: "2026-10-14",
  tags: ["new", "low-competition", "long-term"],
  scores: {
    novelty: 4,
    competitionGap: 4,
    capitalEfficiency: 4,
    timing: 4,
    scalability: 4,
  },
  summary:
    "Workers record practical skill tests on video at partner training centres, get a verifiable digital profile, and employers abroad can trust it before hiring. Better-matched workers earn more and are cheated less.",

  problem:
    "Workers going abroad are often hired on paper claims, so employers cannot tell a skilled electrician from a beginner. Skilled workers get paid as unskilled, employers face mismatches on arrival, and workers bear the risk and the debt.",
  whyNow: [
    "Remittances hit a record $35.6 billion in Bangladesh's FY2025–26, so better-paid migrant jobs move the whole economy.",
    "Saudi Arabia now requires skill verification tests for many trades, and one in five trained Bangladeshi applicants fails them.",
    "Government and development partners are funding skills programmes that need outcome tracking.",
    "Cheap video, cloud storage and AI review make remote practical assessment affordable.",
  ],
  evidence: [
    {
      value: "167.7M",
      claim: "international migrants work in their destination countries' labour forces — 4.7% of the global workforce.",
      scope: "Global",
      source: { publisher: "ILO", title: "International migrants are vital force in the global labour market", year: 2024, url: "https://www.ilo.org/resource/news/international-migrants-are-vital-force-global-labour-market" },
    },
    {
      value: "1.13M",
      claim: "Bangladeshis went abroad for work in 2025, up 12% on 2024; 90% went to just five countries.",
      scope: "Launch market",
      source: { publisher: "The Financial Express (RMMRU, BMET data)", title: "Bangladesh's overseas labour migration up 12pc in 2025", year: 2026, url: "https://thefinancialexpress.com.bd/national/bangladeshs-overseas-labour-migration-up-12pc-in-2025-rmmru" },
    },
    {
      value: "78%",
      claim: "of Bangladeshi migrant workers in 2025 were classed as less-skilled or semi-skilled; only 2.9% professional.",
      scope: "Launch market",
      source: { publisher: "The Business Standard (BMET data)", title: "Overseas employment up 11.27% in 2025", year: 2026, url: "https://www.tbsnews.net/bangladesh/migration/overseas-employment-1127-2025-boosting-remittances-reserves-1323731" },
    },
    {
      value: "~20%",
      claim: "of trained Bangladeshi applicants failed Saudi Arabia's skill verification test since mid-2023.",
      scope: "Launch market",
      source: { publisher: "The Business Standard (Ministry of Expatriates' Welfare)", title: "Skill verification test results", year: 2025, url: "https://www.tbsnews.net/node/1261736" },
    },
  ],
  references: [
    { publisher: "UNB (Bangladesh Bank data)", title: "Remittance inflows hit historic high of $35.56 billion in FY26", year: 2026, url: "https://unb.com.bd/category/Business/remittance-inflows-hit-historic-high-of-3556-billion-in-fy26/189623" },
  ],
  marketNotes: [
    "Three customers: training centres (want placement rates), employers abroad (want verified skill), workers (want better jobs).",
    "Start with two trades in high demand, such as electrical and welding.",
    "Workers must never pay the platform; revenue comes from employers and institutions.",
    "Validate: will employers pay per verified hire, and which certifications they already trust.",
  ],
  expansion: [
    { region: "Nepal, India, Pakistan, Sri Lanka", why: "Major labour-sending countries hiring into the same Gulf employers." },
    { region: "Philippines & Indonesia", why: "Large, well-organised migration systems that value skill verification." },
    { region: "East & West Africa", why: "Rapidly growing outbound labour flows to the Gulf and Europe, with few trusted skill signals." },
  ],
  competitors: [
    {
      name: "Recruiting agencies",
      what: "Licensed agencies that place workers.",
      gap: "Incentivised by volume, not verified skill; little transparency for workers.",
    },
    {
      name: "Government skills certificates",
      what: "National skills qualifications and test centres.",
      gap: "Paper-based and hard for foreign employers to verify quickly.",
    },
    {
      name: "Global job boards",
      what: "General hiring platforms.",
      gap: "Not built for blue-collar migration or practical skill proof.",
    },
  ],
  edge: [
    "Video proof of practical skill, which no paper certificate offers.",
    "Partnership with existing training centres instead of building schools.",
    "Worker-first trust: free for workers, which is rare and marketable.",
    "Data on outcomes (wages, retention) becomes valuable to governments and funders.",
  ],
  risks: [
    {
      risk: "Agencies see it as a threat.",
      mitigation: "Offer agencies a premium 'verified pool' tool rather than competing for placements.",
    },
    {
      risk: "Fraud in assessments.",
      mitigation: "Identity check at test time, assessor sign-off, and random re-tests.",
    },
    {
      risk: "Long sales cycle with employers abroad.",
      mitigation: "Start with one destination country and a few mid-size employers; use development-partner pilots for early revenue.",
    },
  ],
  businessModel: [
    { stream: "Employer fee", detail: "Per verified hire or annual subscription to the talent pool." },
    { stream: "Training centre SaaS", detail: "Assessment, cohort tracking and placement reporting." },
    { stream: "Programme contracts", detail: "Outcome tracking for government and development partners." },
  ],

  stack: [
    { layer: "Web app", choice: "Next.js 16 (App Router) + React 19", why: "Employer portal, centre dashboard and public verification pages from one codebase." },
    { layer: "Styling", choice: "Tailwind CSS v4 + shadcn/ui", why: "Professional, trustworthy UI quickly." },
    { layer: "Database", choice: "PostgreSQL (Neon or Supabase)", why: "Relational data with strict audit trails." },
    { layer: "ORM", choice: "Drizzle ORM", why: "Type-safe migrations and queries." },
    { layer: "Auth", choice: "Better Auth with organisations and roles", why: "Workers, assessors, centres and employers each see different things." },
    { layer: "Video", choice: "Mux or Cloudflare Stream", why: "Upload from low-end phones, adaptive playback for employers." },
    { layer: "AI review", choice: "Claude API for summarising assessments and translating profiles", why: "Employer-ready profiles in Arabic and English from Bangla notes." },
    { layer: "Verification", choice: "Signed QR codes on each passport", why: "Anyone can verify a profile in seconds." },
    { layer: "Hosting & ops", choice: "Vercel + Sentry + PostHog", why: "Simple, reliable operations." },
  ],
  schema: [
    { name: "workers", purpose: "Worker identity and profile.", fields: ["id", "phone", "name", "nid_hash", "district", "languages[]"] },
    { name: "trades", purpose: "Skill categories and test rubrics.", fields: ["id", "name", "rubric (json)", "level"] },
    { name: "centres", purpose: "Partner training centres.", fields: ["id", "name", "district", "accreditation", "contact"] },
    { name: "assessments", purpose: "A recorded practical test.", fields: ["id", "worker_id", "trade_id", "centre_id", "assessor_id", "video_id", "score", "passed", "taken_at"] },
    { name: "passports", purpose: "Public verified profile.", fields: ["id", "worker_id", "public_slug", "signature", "issued_at", "revoked_at"] },
    { name: "employers", purpose: "Hiring companies abroad.", fields: ["id", "name", "country", "verified", "plan"] },
    { name: "placements", purpose: "Hiring outcomes.", fields: ["id", "worker_id", "employer_id", "salary", "start_date", "retained_90d"] },
  ],
  costs: [
    { item: "Hosting (Vercel Pro)", mvp: 20, scale: 150 },
    { item: "Database", mvp: 25, scale: 200 },
    { item: "Video hosting & streaming", mvp: 30, scale: 700 },
    { item: "AI translation & summaries", mvp: 30, scale: 400 },
    { item: "Assessor fees", mvp: 300, scale: 2500, note: "Paid per assessment" },
    { item: "Monitoring & analytics", mvp: 0, scale: 100 },
  ],
  oneTimeCosts: [
    { item: "Rubric design for 2 trades", usd: 800 },
    { item: "Company registration", usd: 400 },
    { item: "Pilot filming kits for 3 centres", usd: 600 },
  ],

  mvp: {
    weeks: 8,
    scope: [
      "Two trades, three partner centres.",
      "Assessor app: record video, score with rubric, upload.",
      "Public verified passport page with QR code.",
      "Employer search with shortlist and contact request.",
      "Admin review and revocation.",
    ],
    notYet: [
      "AI skill scoring",
      "Payments from employers in-app",
      "More trades and countries",
      "Worker mobile app",
    ],
  },
  roadmap: [
    { name: "Validate", timeframe: "Weeks 0–4", goals: ["Interview 10 employers or their HR agents", "Sign 3 training centres", "Assess 30 workers manually"] },
    { name: "MVP", timeframe: "Weeks 5–12", goals: ["Ship passport and employer search", "300 verified workers", "First 10 placements"] },
    { name: "Traction", timeframe: "Months 4–9", goals: ["Employer subscription", "Second destination country", "Development-partner pilot"] },
    { name: "Production", timeframe: "Months 10–18", goals: ["10 trades", "Outcome data product", "Seed round"] },
  ],
  metrics: [
    "Verified workers and assessments per month",
    "Placement rate of verified vs unverified workers",
    "Salary uplift for verified placements",
    "90-day retention at employers",
  ],
  firstSteps: [
    "Visit one technical training centre and ask how they prove skill to employers.",
    "Find three employers abroad through people you know and ask what fails in hiring today.",
    "Draft a one-page rubric for one trade.",
  ],
};
