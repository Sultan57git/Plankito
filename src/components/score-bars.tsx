import type { Scores } from "@/content/types";
import { SCORE_LABELS } from "@/content/scores";

export function ScoreBars({ scores }: { scores: Scores }) {
  return (
    <dl className="space-y-4">
      {(Object.keys(SCORE_LABELS) as (keyof Scores)[]).map((key) => (
        <div key={key}>
          <div className="flex justify-between text-sm">
            <dt className="text-muted">{SCORE_LABELS[key]}</dt>
            <dd className="font-mono tabular-nums">{scores[key]}/5</dd>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`h-1.5 rounded-full ${n <= scores[key] ? "bg-accent" : "bg-line"}`} />
            ))}
          </div>
        </div>
      ))}
    </dl>
  );
}
