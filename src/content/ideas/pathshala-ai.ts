import type { Idea } from "../types";

export const pathshalaAi: Idea = {
  slug: "pathshala-ai",
  title: "Pathshala AI",
  tagline: "A patient, voice-first Bangla tutor in every student's pocket.",
  sector: "Edtech · AI",
  market: "Bangladesh",
  lastReviewed: "2026-10-14",
  tags: ["futuristic", "new", "low-investment"],
  scores: {
    novelty: 5,
    competitionGap: 3,
    capitalEfficiency: 4,
    timing: 5,
    scalability: 5,
  },
  summary:
    "An AI tutor that explains the national curriculum in spoken Bangla, checks handwritten work from a phone photo, and adapts to each student's weak topics. Priced for a family budget, not a coaching-centre budget.",

  problem:
    "Families spend heavily on private coaching because classrooms are crowded and teachers cannot give one-to-one attention. Students in smaller towns get the worst of it: fewer good tutors, the same exams.",
  whyNow: [
    "Frontier language models now handle Bangla reasoning, speech and handwriting well enough for tutoring.",
    "Model prices have fallen sharply, so a full tutoring session can cost cents rather than dollars.",
    "Video-course platforms trained families to pay for online learning; the next step is interactive help.",
    "Curriculum changes create a window where existing content libraries are out of date.",
  ],
  evidence: [
    {
      value: "70%",
      claim: "of 10-year-olds in low- and middle-income countries cannot read and understand a simple text.",
      scope: "Global",
      source: { publisher: "World Bank, UNESCO, UNICEF", title: "70% of 10-Year-Olds now in Learning Poverty", year: 2022, url: "https://www.worldbank.org/en/news/press-release/2022/06/23/70-of-10-year-olds-now-in-learning-poverty-unable-to-read-and-understand-a-simple-text" },
    },
    {
      value: "265M+",
      claim: "people speak Bengali — the world's seventh most-spoken language — with almost no AI tutoring built for them.",
      scope: "Global",
      source: { publisher: "Dhaka Tribune (citing Ethnologue, 22nd ed.)", title: "Chittagonian, Sylheti ranked among 100 most spoken", year: 2020, url: "https://www.dhakatribune.com/world/201627/chittagonian-sylheti-ranked-among-100-most-spoken" },
    },
    {
      value: "~1.85M",
      claim: "students sat Bangladesh's SSC and equivalent exams in 2026 — one predictable, deadline-driven cohort every year.",
      scope: "Launch market",
      source: { publisher: "The Business Standard (BSS)", title: "18.5 lakh candidates to appear in SSC, equivalent exams", year: 2026, url: "https://www.tbsnews.net/node/1416356" },
    },
    {
      value: "67%",
      claim: "of urban Bangladeshi households paid for private tutoring (2010 data), up from 48% a decade earlier.",
      scope: "Launch market",
      source: { publisher: "The Daily Star (citing UNESCO GEM Report 2021/22)", title: "7% of Bangladeshi families need to borrow to send children to school", year: 2021, url: "https://www.thedailystar.net/youth/education/news/7-bangladeshi-families-need-borrow-send-children-school-unesco-2918101" },
    },
  ],
  marketNotes: [
    "SSC and HSC together bring millions of students to a fixed exam date every year: a large, predictable, deadline-driven market.",
    "Parents decide, students use. Marketing must prove results to parents.",
    "Willingness to pay is proven by coaching spend; the question is price point, not whether to pay.",
    "Validate: which subjects drive coaching spend (math, physics, English are typical) and the monthly price ceiling.",
  ],
  expansion: [
    { region: "Bangla speakers worldwide", why: "West Bengal and the diaspora share the language; the voice tutor works on day one." },
    { region: "South Asia", why: "Exam-driven systems and heavy private tutoring in India, Pakistan, Nepal and Sri Lanka." },
    { region: "Africa & Southeast Asia", why: "The same curriculum-mapping engine adapts to any national exam in its local language." },
  ],
  competitors: [
    {
      name: "Video course platforms (e.g. 10 Minute School, Shikho)",
      what: "Recorded lessons, live classes, test prep.",
      gap: "One-to-many content; they do not answer the student's specific question at 11pm.",
    },
    {
      name: "Generic AI chat apps",
      what: "General assistants students already try.",
      gap: "Not curriculum-aligned, weak at progress tracking, no parent view.",
    },
    {
      name: "Local coaching centres",
      what: "In-person batches.",
      gap: "Expensive, fixed schedule, unavailable in many towns.",
    },
  ],
  edge: [
    "Voice-first in Bangla: works for students who type slowly or code-switch.",
    "Photo-of-notebook grading: matches how students actually study.",
    "Parent dashboard with weekly progress, which is what makes parents keep paying.",
    "Curriculum-mapped content built once, reused by the AI forever: content becomes a moat.",
  ],
  risks: [
    {
      risk: "AI gives a wrong answer and loses trust.",
      mitigation: "Ground answers in a vetted curriculum knowledge base, show working step by step, and let teachers review flagged answers.",
    },
    {
      risk: "Incumbents add an AI chatbot.",
      mitigation: "Compete on depth: grading, adaptivity and parent reporting, not a chat box.",
    },
    {
      risk: "Inference cost at scale.",
      mitigation: "Cache common explanations, route easy questions to smaller models, cap daily usage per plan.",
    },
  ],
  businessModel: [
    { stream: "Family subscription", detail: "Monthly plan below one coaching batch fee." },
    { stream: "Exam-season passes", detail: "Short, high-intent plans before SSC/HSC." },
    { stream: "Schools (B2B)", detail: "Teacher dashboards and homework grading for private schools." },
  ],

  stack: [
    { layer: "Web app (PWA)", choice: "Next.js 16 (App Router) + React 19", why: "Installable PWA ships to every Android phone without app-store friction." },
    { layer: "Styling", choice: "Tailwind CSS v4 + shadcn/ui", why: "Clean, accessible components in days." },
    { layer: "AI tutor", choice: "Claude API (Sonnet for tutoring, Haiku for routing and quick checks)", why: "Strong reasoning and multilingual quality; tiered models control cost." },
    { layer: "Speech", choice: "Speech-to-text and text-to-speech with Bangla support", why: "Voice is the core interface; pick by measured Bangla accuracy." },
    { layer: "Retrieval", choice: "PostgreSQL + pgvector", why: "Curriculum chunks and embeddings in the same database as users." },
    { layer: "ORM", choice: "Drizzle ORM", why: "Type-safe and fast." },
    { layer: "Auth", choice: "Better Auth (phone OTP, parent-child accounts)", why: "Families share devices; linked accounts matter." },
    { layer: "Payments", choice: "bKash / SSLCommerz subscriptions", why: "How families actually pay." },
    { layer: "Storage", choice: "Cloudflare R2", why: "Cheap storage for notebook photos and audio, no egress fees." },
    { layer: "Hosting & ops", choice: "Vercel + Sentry + PostHog", why: "Deploys, errors and learning analytics." },
  ],
  schema: [
    { name: "users", purpose: "Students, parents, teachers.", fields: ["id", "phone", "role", "name", "class_level", "parent_id"] },
    { name: "topics", purpose: "Curriculum tree.", fields: ["id", "subject", "class_level", "chapter", "title", "parent_topic_id"] },
    { name: "content_chunks", purpose: "Vetted explanations for retrieval.", fields: ["id", "topic_id", "body", "embedding (vector)", "source", "reviewed_by"] },
    { name: "sessions", purpose: "A tutoring conversation.", fields: ["id", "student_id", "topic_id", "started_at", "minutes", "tokens_used"] },
    { name: "messages", purpose: "Turns within a session.", fields: ["id", "session_id", "role", "text", "audio_url", "image_url"] },
    { name: "mastery", purpose: "Per-topic skill estimate.", fields: ["student_id", "topic_id", "score", "attempts", "updated_at"] },
    { name: "subscriptions", purpose: "Billing state.", fields: ["id", "family_id", "plan", "status", "renews_at", "provider_ref"] },
  ],
  costs: [
    { item: "Hosting (Vercel Pro)", mvp: 20, scale: 300 },
    { item: "Database with pgvector", mvp: 25, scale: 250 },
    { item: "LLM inference", mvp: 150, scale: 4000, note: "Main variable cost; cap per plan" },
    { item: "Speech (STT/TTS)", mvp: 50, scale: 1200 },
    { item: "Object storage (R2)", mvp: 5, scale: 60 },
    { item: "Content reviewers (part-time teachers)", mvp: 400, scale: 2500 },
  ],
  oneTimeCosts: [
    { item: "Curriculum mapping for 2 subjects", usd: 1200 },
    { item: "Company registration", usd: 400 },
    { item: "Launch content & brand", usd: 500 },
  ],

  mvp: {
    weeks: 6,
    scope: [
      "One subject (SSC math), one class level.",
      "Ask by text, voice or notebook photo; get step-by-step Bangla explanation.",
      "Ten-question topic check that updates mastery.",
      "Weekly parent summary over WhatsApp.",
      "bKash monthly payment with free trial.",
    ],
    notYet: [
      "All subjects",
      "Native apps",
      "School dashboards",
      "Live human tutors",
    ],
  },
  roadmap: [
    { name: "Validate", timeframe: "Weeks 0–3", goals: ["Tutor 20 students yourself using an AI prompt and WhatsApp", "Measure questions per student per week", "Test price with 10 parents"] },
    { name: "MVP", timeframe: "Weeks 4–10", goals: ["Ship PWA for SSC math", "100 paying families", "Answer accuracy above 95% on a review set"] },
    { name: "Traction", timeframe: "Months 3–8", goals: ["Add physics and English", "Exam-season pass", "Referral loop through schools"] },
    { name: "Production", timeframe: "Months 9–18", goals: ["HSC coverage", "B2B school plan", "Seed round"] },
  ],
  metrics: [
    "Weekly active students and questions per student",
    "Trial-to-paid conversion",
    "Topic mastery gain over four weeks",
    "Inference cost per active student per month",
  ],
  firstSteps: [
    "Pick one chapter and write the ten questions students get stuck on most.",
    "Tutor five students over WhatsApp with an AI model behind you.",
    "Ask their parents what they pay for coaching today.",
  ],
};
