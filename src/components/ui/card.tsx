"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "bordered";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "border-2 border-border bg-foreground/5 backdrop-blur-sm p-8",
      hover:
        "border-2 border-border bg-foreground/5 backdrop-blur-sm p-8 hover:border-accent/60 hover:bg-foreground/10 transition-all duration-300",
      bordered: "border-2 border-border p-8",
    };

    return (
      <div ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
