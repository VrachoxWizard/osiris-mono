import { cn } from "@/lib/utils";

interface OsirisWordmarkProps {
  className?: string;
}

export function OsirisWordmark({ className }: OsirisWordmarkProps) {
  return (
    <span className={cn("font-display font-extrabold tracking-tighter", className)}>
      OSIRIS
    </span>
  );
}
