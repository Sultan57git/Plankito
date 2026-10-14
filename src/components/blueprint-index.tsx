"use client";

import Link from "next/link";
import { useState } from "react";
import { TAGS, type Idea, type Tag } from "@/content/types";
import { monthlyTotal, overallScore, usd } from "@/content/scores";

/** Editorial index of blueprints, built for side-by-side comparison. */
export function BlueprintIndex({ ideas }: { ideas: Idea[] }) {
  const [active, setActive] = useState<Tag | null>(null);
  const visible = active ? ideas.filter((idea) => idea.tags.includes(active)) : ideas;
  const usedTags = (Object.keys(TAGS) as Tag[]).filter((tag) => ideas.some((idea) => idea.tags.includes(tag)));

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter blueprints">
        <Filter selected={active === null} onClick={() => setActive(null)}>
          All {ideas.length}
        </Filter>
        {usedTags.map((tag) => (
          <Filter key={tag} selected={active === tag} onClick={() => setActive(active === tag ? null : tag)}>
            {TAGS[tag]}
          </Filter>
        ))}
      </div>

      <div className="mt-8 border-t border-fg">
        <div className="hidden grid-cols-[2.5rem_1.7fr_1.6fr_6rem_6rem_4rem] gap-6 border-b border-line py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint md:grid">
          <span>No.</span>
          <span>Blueprint</span>
          <span>Key signal</span>
          <span className="text-right">MVP</span>
          <span className="text-right">Run-rate</span>
          <span className="text-right">Score</span>
        </div>
        <ul>
          {visible.map((idea) => {
            const signal = idea.evidence[0];
            const n = ideas.indexOf(idea) + 1;
            return (
              <li key={idea.slug} className="border-b border-line">
                <Link
                  href={`/ideas/${idea.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-6 gap-y-3 py-7 transition-colors md:grid-cols-[2.5rem_1.7fr_1.6fr_6rem_6rem_4rem] md:items-baseline"
                >
                  <span className="font-mono text-xs text-faint tabular-nums md:pt-1">{String(n).padStart(2, "0")}</span>
                  <div>
                    <p className="font-serif text-3xl leading-none tracking-tight transition-colors group-hover:text-accent">
                      {idea.title}
                    </p>
                    <p className="mt-2 text-sm text-muted">{idea.tagline}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{idea.sector}</p>
                  </div>
                  <div className="col-start-2 md:col-start-auto">
                    {signal && (
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="mr-1.5 font-medium text-fg tabular-nums">{signal.value}</span>
                        {signal.claim}
                      </p>
                    )}
                  </div>
                  <dl className="col-start-2 flex gap-6 text-sm tabular-nums md:col-start-auto md:contents">
                    <Stat label="MVP" value={`${idea.mvp.weeks} wks`} />
                    <Stat label="Run-rate" value={`${usd(monthlyTotal(idea, "mvp"))}/mo`} />
                    <Stat label="Score" value={overallScore(idea).toFixed(1)} />
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="md:text-right">
      <dt className="text-xs text-faint md:sr-only">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Filter({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border-b pb-1 transition-colors ${
        selected ? "border-fg text-fg" : "border-transparent text-faint hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
