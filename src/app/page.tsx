import Link from "next/link";
import { ideas } from "@/content/ideas";
import { monthlyTotal, oneTimeTotal, overallScore, usd } from "@/content/scores";
import { BlueprintIndex } from "@/components/blueprint-index";
import { ScoreBars } from "@/components/score-bars";

const CONTENTS = [
  "Opportunity",
  "Evidence",
  "Market & expansion",
  "Competitor gap",
  "Edge & risks",
  "Business model",
  "Production stack",
  "Data model",
  "Costing",
  "MVP scope",
  "Roadmap",
  "Sources",
];

const STANDARDS = [
  {
    title: "Cited",
    body: "Every figure links to its primary or reporting source. Estimates are labelled as estimates. Every page shows when its facts were last checked.",
  },
  {
    title: "Comparable",
    body: "Every blueprint answers the same questions in the same order, so ideas can be judged side by side rather than by how well they are pitched.",
  },
  {
    title: "Buildable",
    body: "Real stacks, real tables, real costs. Hand any blueprint to an engineer or an investor and they know what happens on Monday.",
  },
];

const issueDate = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(
  new Date(ideas.map((i) => i.lastReviewed).sort().at(-1)!),
);

export default function Home() {
  const featured = ideas[0];
  const signals = ideas.flatMap((idea) => {
    const e = idea.evidence.find((x) => x.scope === "Global") ?? idea.evidence[0];
    return e ? [{ idea, e }] : [];
  });

  return (
    <>
      {/* Masthead */}
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>Startup blueprints</span>
          <span>
            Issue 01 · {issueDate}
          </span>
        </div>
        <h1 className="mt-14 max-w-5xl font-serif text-[3.25rem] leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl lg:text-[6.5rem]">
          Startups worth building, <span className="text-faint italic">with the evidence to prove it.</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted">
            Each Plankito blueprint takes one real problem from first thought to production: the numbers behind it, the
            gap competitors leave, the stack to build it on, what it costs, and what to ship first.
          </p>
          <Link
            href="#index"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium md:self-auto"
          >
            Read the blueprints
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </Link>
        </div>
      </section>

      {/* Problems, in numbers */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="grid border-y border-fg md:grid-cols-3">
          {signals.map(({ idea, e }, i) => (
            <Link
              key={idea.slug}
              href={`/ideas/${idea.slug}`}
              className={`group flex flex-col py-8 md:px-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : "md:pl-0"} ${i === signals.length - 1 ? "md:pr-0" : ""}`}
            >
              <p className="text-5xl font-semibold tracking-[-0.03em] tabular-nums sm:text-6xl">{e.value}</p>
              <p className="mt-4 leading-relaxed text-muted">{e.claim}</p>
              <p className="mt-auto pt-6 text-xs text-faint">{e.source.publisher}, {e.source.year}</p>
              <p className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span>
                  The startup: <span className="font-medium">{idea.title}</span>
                </span>
                <span className="text-accent transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cover story */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Featured blueprint</p>
        <Link
          href={`/ideas/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl bg-fg text-bg lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="flex flex-col p-8 sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-50">{featured.sector}</p>
            <h2 className="mt-6 font-serif text-5xl leading-none tracking-tight sm:text-6xl">{featured.title}</h2>
            <p className="mt-4 font-serif text-2xl leading-snug italic opacity-70">{featured.tagline}</p>
            <p className="mt-8 max-w-xl leading-relaxed opacity-80">{featured.summary}</p>
            <p className="mt-auto pt-10 text-sm font-medium">
              Read the full blueprint{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </p>
          </div>
          <div className="border-t border-bg/15 bg-bg/[0.04] p-8 sm:p-12 lg:border-t-0 lg:border-l">
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <Figure label="MVP" value={`${featured.mvp.weeks} weeks`} />
              <Figure label="Run-rate" value={`${usd(monthlyTotal(featured, "mvp"))}/mo`} />
              <Figure label="One-time setup" value={usd(oneTimeTotal(featured))} />
              <Figure label="Overall score" value={`${overallScore(featured).toFixed(1)} / 5`} />
            </dl>
            <div className="mt-10 [--accent:var(--bg)] [--line:color-mix(in_oklab,var(--bg)_18%,transparent)] [--muted:color-mix(in_oklab,var(--bg)_65%,transparent)]">
              <ScoreBars scores={featured.scores} />
            </div>
          </div>
        </Link>
      </section>

      {/* Index */}
      <section id="index" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">The index</h2>
          <p className="max-w-sm text-sm text-muted">
            Compare every blueprint on the same terms. Filter by the kind of bet you want to make.
          </p>
        </div>
        <BlueprintIndex ideas={ideas} />
      </section>

      {/* Standards */}
      <section id="standards" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 border-t border-fg pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <h2 className="font-serif text-4xl tracking-tight">Our standards</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">Inside every blueprint, in this order:</p>
            <ol className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
              {CONTENTS.map((c, i) => (
                <li key={c} className="whitespace-nowrap">
                  <span className="mr-1.5 font-mono text-[10px] text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {STANDARDS.map((s) => (
              <div key={s.title}>
                <h3 className="text-sm font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto mt-32 max-w-6xl px-5 sm:px-8">
        <p className="max-w-4xl font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
          Fear of starting is usually a missing plan.{" "}
          <span className="text-faint italic">Pick a blueprint, and do its first three steps this week.</span>
        </p>
      </section>
    </>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs opacity-50">{label}</dt>
      <dd className="mt-1 text-2xl font-medium tracking-tight tabular-nums">{value}</dd>
    </div>
  );
}
