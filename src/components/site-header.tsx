import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Logo />
          Plankito
        </Link>
        <nav className="flex items-center gap-1 text-sm text-muted">
          <Link href="/#index" className="rounded-md px-3 py-1.5 transition-colors hover:text-fg">
            Index
          </Link>
          <Link href="/#standards" className="rounded-md px-3 py-1.5 transition-colors hover:text-fg">
            Standards
          </Link>
        </nav>
      </div>
    </header>
  );
}
