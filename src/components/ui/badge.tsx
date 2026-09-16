"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-background/60 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest text-foreground/90 border border-border",
    outline:
      "border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground",
  };

  return (
    <div
      className={cn("inline-block", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
