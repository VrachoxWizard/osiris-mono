interface OsirisMarkProps {
  className?: string;
}

/**
 * Abstracted Djed-pillar motif (the stability/resurrection symbol
 * traditionally tied to Osiris) — a spine with three ascending crossbars.
 * Single currentColor shape so callers control color via text utilities.
 */
export function OsirisMark({ className }: OsirisMarkProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="42" y="40" width="16" height="76" fill="currentColor" />
      <rect x="30" y="28" width="40" height="12" fill="currentColor" />
      <rect x="22" y="14" width="56" height="12" fill="currentColor" />
      <rect x="14" y="0" width="72" height="12" fill="currentColor" />
    </svg>
  );
}
