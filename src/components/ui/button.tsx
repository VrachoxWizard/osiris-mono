"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "uppercase tracking-widest transition-all duration-300 flex items-center justify-center";

    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90",
      secondary:
        "border border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
      outline: "border border-foreground hover:bg-foreground hover:text-background",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
