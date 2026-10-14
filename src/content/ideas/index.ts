import type { Idea } from "../types";
import { coldlink } from "./coldlink";
import { pathshalaAi } from "./pathshala-ai";
import { skillpass } from "./skillpass";

/** Add a new blueprint by creating a file in this folder and listing it here. */
export const ideas: Idea[] = [pathshalaAi, coldlink, skillpass];

export function getIdea(slug: string): Idea | undefined {
  return ideas.find((idea) => idea.slug === slug);
}
