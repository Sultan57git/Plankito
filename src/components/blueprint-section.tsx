export function BlueprintSection({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: number;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-14 first:border-t-0 first:pt-0">
      <p className="font-mono text-xs text-accent tabular-nums">{String(index).padStart(2, "0")}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      {lead && <p className="mt-2 max-w-2xl text-muted">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
