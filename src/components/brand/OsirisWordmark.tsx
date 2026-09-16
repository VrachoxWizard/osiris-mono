import { cn } from "@/lib/utils";

interface OsirisWordmarkProps {
  className?: string;
}

export function OsirisWordmark({ className }: OsirisWordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 font-display font-bold tracking-tight",
        className
      )}
    >
      OSIRIS
      <span className="mb-[3px] h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
    </span>
  );
}
