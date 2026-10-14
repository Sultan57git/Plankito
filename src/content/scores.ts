import type { Idea, Scores } from "./types";

export const SCORE_LABELS: Record<keyof Scores, string> = {
  novelty: "Novelty",
  competitionGap: "Competition gap",
  capitalEfficiency: "Capital efficiency",
  timing: "Timing",
  scalability: "Scalability",
};

export function overallScore(idea: Idea): number {
  const values = Object.values(idea.scores);
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function monthlyTotal(idea: Idea, stage: "mvp" | "scale"): number {
  return idea.costs.reduce((sum, line) => sum + line[stage], 0);
}

export function oneTimeTotal(idea: Idea): number {
  return idea.oneTimeCosts.reduce((sum, line) => sum + line.usd, 0);
}

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
