import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIdea, ideas } from "@/content/ideas";
import { monthlyTotal, oneTimeTotal, overallScore, usd } from "@/content/scores";
import { BlueprintSection, BulletList } from "@/components/blueprint-section";
import { EvidenceGrid } from "@/components/evidence-grid";
import { ScoreBars } from "@/components/score-bars";
import { site } from "@/lib/site";
import { TagPill } from "@/components/tag-pill";

const SECTIONS = [
  { id: "opportunity", label: "Opportunity" },
  { id: "market", label: "Market & timing" },
  { id: "competitors", label: "Competitor gap" },
  { id: "edge", label: "Edge & risks" },
  { id: "model", label: "Business model" },
  { id: "stack", label: "Production stack" },
  { id: "schema", label: "Data model" },
  { id: "costs", label: "Costing" },
  { id: "mvp", label: "MVP scope" },
  { id: "roadmap", label: "Roadmap" },
  { id: "start", label: "Start this week" },
  { id: "sources", label: "Sources" },
];

const reviewedDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return {};
  return {
    title: `${idea.title} — ${idea.tagline}`,
    description: idea.summary,
    alternates: { canonical: `/ideas/${idea.slug}` },
    openGraph: { type: "article", title: idea.title, description: idea.tagline },
  };
}

export default function IdeaPage({ params }: PageProps<"/ideas/[slug]">) {
  // Known slugs are prerendered; awaiting params inside Suspense keeps navigations instant.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Blueprint params={params} />
    </Suspense>
  );
}

async function Blueprint({ params }: Pick<PageProps<"/ideas/[slug]">, "params">) {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) notFound();

  const stats = [
    { label: "Overall", value: `${overallScore(idea).toFixed(1)} / 5` },
    { label: "MVP timeline", value: `${idea.mvp.weeks} weeks` },
    { label: "MVP run-rate", value: `${usd(monthlyTotal(idea, "mvp"))}/mo` },
    { label: "One-time setup", value: usd(oneTimeTotal(idea)) },
  ];

  const sources = [
    ...new Map([...idea.evidence.map((e) => e.source), ...(idea.references ?? [])].map((src) => [src.url, src])).values(),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${idea.title}: ${idea.tagline}`,
    description: idea.summary,
    dateModified: idea.lastReviewed,
    url: `${site.url}/ideas/${idea.slug}`,
    publisher: { "@type": "Organization", name: site.name },
    citation: sources.map((src) => ({ "@type": "CreativeWork", name: src.title, publisher: src.publisher, url: src.url })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-14 sm:px-8 sm:pt-16">
          <Link href="/#index" className="text-sm text-muted transition-colors hover:text-fg">
            ← All blueprints
          </Link>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-faint">{idea.sector}</p>
          <h1 className="mt-4 font-serif text-6xl leading-none tracking-tight sm:text-8xl">{idea.title}</h1>
          <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug text-muted italic sm:text-3xl">{idea.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {idea.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-pretty">{idea.summary}</p>
          <p className="mt-4 text-sm text-faint">
            Launch market: <span className="text-muted">{idea.market}</span> · {sources.length} cited sources · Facts
            reviewed {reviewedDate(idea.lastReviewed)}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-4">
                <dt className="text-xs text-faint">{stat.label}</dt>
                <dd className="mt-1 text-lg font-medium tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-14 sm:px-8 lg:grid-cols-[200px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-0.5 text-sm" aria-label="Blueprint sections">
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex gap-3 rounded-md py-1.5 text-muted transition-colors hover:text-fg"
              >
                <span className="font-mono text-xs text-faint tabular-nums leading-5">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <BlueprintSection id="opportunity" index={1} title="Opportunity">
            <p className="text-lg leading-relaxed">{idea.problem}</p>
            <h3 className="mt-10 mb-4 text-sm font-medium text-faint">The evidence</h3>
            <EvidenceGrid items={idea.evidence} />
            <h3 className="mt-10 mb-4 text-sm font-medium text-faint">Why now</h3>
            <BulletList items={idea.whyNow} />
          </BlueprintSection>

          <BlueprintSection id="market" index={2} title="Market & timing" lead={`Launch in ${idea.market}. Then expand.`}>
            <div className="grid gap-10 md:grid-cols-[1fr_220px]">
              <BulletList items={idea.marketNotes} />
              <div className="rounded-2xl border border-line bg-surface p-5">
                <p className="mb-4 text-xs text-faint">Scorecard</p>
                <ScoreBars scores={idea.scores} />
              </div>
            </div>
            <h3 className="mt-10 mb-4 text-sm font-medium text-faint">Where it travels next</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {idea.expansion.map((x) => (
                <div key={x.region} className="rounded-2xl border border-line p-5">
                  <p className="font-medium">{x.region}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.why}</p>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection
            id="competitors"
            index={3}
            title="Competitor gap"
            lead="Who already plays here, and what they leave open."
          >
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {idea.competitors.map((c) => (
                <div key={c.name} className="grid gap-2 p-5 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="mt-1 text-sm text-muted">{c.what}</p>
                  </div>
                  <p className="text-sm leading-relaxed">
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-accent">Gap</span>
                    {c.gap}
                  </p>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection id="edge" index={4} title="Edge & risks">
            <h3 className="mb-4 text-sm font-medium text-faint">Where the edge comes from</h3>
            <BulletList items={idea.edge} />
            <h3 className="mt-10 mb-4 text-sm font-medium text-faint">Risks and how to handle them</h3>
            <div className="grid gap-3">
              {idea.risks.map((r) => (
                <div key={r.risk} className="rounded-2xl border border-line p-5">
                  <p className="font-medium">{r.risk}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection id="model" index={5} title="Business model">
            <div className="grid gap-3 sm:grid-cols-3">
              {idea.businessModel.map((b) => (
                <div key={b.stream} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-medium">{b.stream}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.detail}</p>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection
            id="stack"
            index={6}
            title="Production stack"
            lead="Modern, proven tools a small team can run without a DevOps hire."
          >
            <div className="divide-y divide-line border-y border-line">
              {idea.stack.map((s) => (
                <div key={s.layer} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <p className="text-sm text-faint">{s.layer}</p>
                  <div>
                    <p className="font-medium">{s.choice}</p>
                    <p className="mt-0.5 text-sm text-muted">{s.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection
            id="schema"
            index={7}
            title="Data model"
            lead="The core tables. Enough for an engineer to start the first migration."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {idea.schema.map((t) => (
                <div key={t.name} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-mono text-sm font-medium">{t.name}</p>
                  <p className="mt-1 text-sm text-muted">{t.purpose}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {t.fields.map((f) => (
                      <li key={f} className="rounded-md bg-subtle px-2 py-0.5 font-mono text-xs text-muted">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BlueprintSection>

          <BlueprintSection
            id="costs"
            index={8}
            title="Costing"
            lead="Directional monthly estimates in USD. Your numbers will differ — the structure is what matters."
          >
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-faint">
                    <th className="px-5 py-3 font-normal">Item</th>
                    <th className="px-5 py-3 text-right font-normal">MVP / month</th>
                    <th className="px-5 py-3 text-right font-normal">Scale / month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {idea.costs.map((c) => (
                    <tr key={c.item}>
                      <td className="px-5 py-3">
                        {c.item}
                        {c.note && <span className="block text-xs text-faint">{c.note}</span>}
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">{usd(c.mvp)}</td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">{usd(c.scale)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-line bg-subtle font-medium">
                    <td className="px-5 py-3">Total</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums">{usd(monthlyTotal(idea, "mvp"))}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums">{usd(monthlyTotal(idea, "scale"))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <h3 className="mt-10 mb-4 text-sm font-medium text-faint">One-time setup</h3>
            <div className="divide-y divide-line border-y border-line text-sm">
              {idea.oneTimeCosts.map((c) => (
                <div key={c.item} className="flex justify-between py-3">
                  <span>{c.item}</span>
                  <span className="font-mono tabular-nums">{usd(c.usd)}</span>
                </div>
              ))}
              <div className="flex justify-between py-3 font-medium">
                <span>Total</span>
                <span className="font-mono tabular-nums">{usd(oneTimeTotal(idea))}</span>
              </div>
            </div>
          </BlueprintSection>

          <BlueprintSection id="mvp" index={9} title="MVP scope" lead={`Shippable in about ${idea.mvp.weeks} weeks.`}>
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="mb-4 text-xs text-faint">Build</p>
                <BulletList items={idea.mvp.scope} />
              </div>
              <div className="rounded-2xl border border-dashed border-line p-6">
                <p className="mb-4 text-xs text-faint">Not yet</p>
                <ul className="space-y-2.5 text-muted">
                  {idea.mvp.notYet.map((item) => (
                    <li key={item} className="line-through decoration-faint/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BlueprintSection>

          <BlueprintSection id="roadmap" index={10} title="Roadmap to production">
            <ol className="relative space-y-10 border-l border-line pl-8">
              {idea.roadmap.map((phase) => (
                <li key={phase.name} className="relative">
                  <span className="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-accent" />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-medium">{phase.name}</h3>
                    <span className="font-mono text-xs text-faint">{phase.timeframe}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-muted">
                    {phase.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </BlueprintSection>

          <BlueprintSection id="start" index={11} title="Start this week">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-fg p-6 text-bg">
                <p className="mb-4 text-xs opacity-60">Your first three steps</p>
                <ol className="space-y-3">
                  {idea.firstSteps.map((step, i) => (
                    <li key={step} className="flex gap-3 leading-relaxed">
                      <span className="font-mono text-xs leading-6 opacity-60">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-line p-6">
                <p className="mb-4 text-xs text-faint">Metrics that prove it is working</p>
                <BulletList items={idea.metrics} />
              </div>
            </div>
          </BlueprintSection>

          <BlueprintSection
            id="sources"
            index={12}
            title="Sources"
            lead={`Every figure on this page links to its source. Facts reviewed ${reviewedDate(idea.lastReviewed)}. Costs and market notes without a citation are our estimates.`}
          >
            <ol className="space-y-3 text-sm">
              {sources.map((src, i) => (
                <li key={src.url} className="flex gap-3">
                  <span className="font-mono text-xs leading-5 text-faint tabular-nums">{i + 1}.</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
                  >
                    {src.publisher} — {src.title} ({src.year})
                  </a>
                </li>
              ))}
            </ol>
          </BlueprintSection>
        </div>
      </div>
    </article>
  );
}
