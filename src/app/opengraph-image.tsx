import { ogCard, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Startup blueprints",
    title: "From first thought to production.",
    subtitle: "The opportunity, the evidence, the stack, the costs and the MVP — for founders everywhere.",
  });
}
