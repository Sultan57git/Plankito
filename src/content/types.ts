/**
 * The Plankito blueprint format. Every idea follows the same structure so
 * readers can compare ideas side by side: why it works, where the gap is,
 * how to build it, what it costs, and how to ship.
 */

export const TAGS = {
  new: "New category",
  "low-competition": "Low competition",
  opportunistic: "Opportunistic",
  "low-investment": "Low investment",
  "long-term": "Long-term play",
  futuristic: "Futuristic",
} as const;

export type Tag = keyof typeof TAGS;

/** 1 (weak) to 5 (strong). Higher is always better for the founder. */
export type Score = 1 | 2 | 3 | 4 | 5;

export type Scores = {
  novelty: Score;
  competitionGap: Score;
  capitalEfficiency: Score;
  timing: Score;
  scalability: Score;
};

export type Competitor = {
  name: string;
  what: string;
  gap: string;
};

export type StackChoice = {
  layer: string;
  choice: string;
  why: string;
};

export type Table = {
  name: string;
  purpose: string;
  fields: string[];
};

export type CostLine = {
  item: string;
  /** Monthly USD during MVP / pilot. */
  mvp: number;
  /** Monthly USD at first meaningful scale. */
  scale: number;
  note?: string;
};

export type Phase = {
  name: string;
  timeframe: string;
  goals: string[];
};

export type Source = {
  publisher: string;
  title: string;
  year: number;
  url: string;
};

/** A single verifiable number that supports the opportunity. */
export type Evidence = {
  value: string;
  claim: string;
  scope: "Global" | "Regional" | "Launch market";
  source: Source;
};

export type Idea = {
  slug: string;
  title: string;
  tagline: string;
  sector: string;
  /** Where to launch first. */
  market: string;
  /** ISO date (YYYY-MM-DD) the blueprint's facts were last checked. */
  lastReviewed: string;
  tags: Tag[];
  scores: Scores;
  summary: string;

  problem: string;
  whyNow: string[];
  evidence: Evidence[];
  /** Sources for figures quoted in prose rather than in the evidence grid. */
  references?: Source[];
  marketNotes: string[];
  /** Other markets with the same problem, and why the model travels. */
  expansion: { region: string; why: string }[];
  competitors: Competitor[];
  edge: string[];
  risks: { risk: string; mitigation: string }[];
  businessModel: { stream: string; detail: string }[];

  stack: StackChoice[];
  schema: Table[];
  costs: CostLine[];
  oneTimeCosts: { item: string; usd: number }[];

  mvp: { weeks: number; scope: string[]; notYet: string[] };
  roadmap: Phase[];
  metrics: string[];
  firstSteps: string[];
};
