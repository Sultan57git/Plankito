import type { Evidence } from "@/content/types";

export function EvidenceGrid({ items }: { items: Evidence[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {items.map((e) => (
        <figure key={e.claim} className="flex flex-col bg-surface p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-4xl font-semibold tracking-tight tabular-nums">{e.value}</p>
            <span className="mt-1 shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] text-accent">{e.scope}</span>
          </div>
          <p className="mt-2 leading-relaxed text-muted">{e.claim}</p>
          <figcaption className="mt-auto pt-5 text-xs text-faint">
            <a
              href={e.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-fg/40"
            >
              {e.source.publisher}, {e.source.title} ({e.source.year}) ↗
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
