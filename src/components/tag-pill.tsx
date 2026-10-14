import { TAGS, type Tag } from "@/content/types";

export function TagPill({ tag }: { tag: Tag }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
      {TAGS[tag]}
    </span>
  );
}
