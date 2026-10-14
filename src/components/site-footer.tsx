import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 text-muted">
          <Logo className="size-4" />
          Plankito · Launch with a plan and a kit
        </div>
        <p className="max-w-md sm:text-right">
          Blueprints are starting points, not guarantees. Market notes and costs are directional estimates — validate them on the ground.
        </p>
      </div>
    </footer>
  );
}
