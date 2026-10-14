export function Logo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" className="stroke-fg" strokeWidth="1.5" />
      <path d="M8 16.5V7.5h4.5a3 3 0 0 1 0 6H8" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
