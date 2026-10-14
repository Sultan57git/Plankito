import { getIdea, ideas } from "@/content/ideas";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Plankito startup blueprint";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = getIdea(slug);
  return ogCard({
    eyebrow: idea ? `Blueprint · ${idea.sector}` : "Blueprint",
    title: idea?.title ?? "Plankito",
    subtitle: idea?.tagline ?? "",
  });
}
