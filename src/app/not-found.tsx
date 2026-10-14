import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">This blueprint doesn’t exist yet.</h1>
      <p className="mt-3 text-muted">Maybe it’s the one you should write.</p>
      <Link
        href="/#index"
        className="mt-8 inline-block rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        Browse blueprints
      </Link>
    </section>
  );
}
