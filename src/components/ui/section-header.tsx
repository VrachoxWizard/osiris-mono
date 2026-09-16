"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  animate?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  className,
  animate = true,
}: SectionHeaderProps) {
  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Wrapper className={cn("mb-16", className)} {...wrapperProps}>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px w-12 bg-accent"></div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
      </div>
      <h2 className="text-display-lg font-display font-bold tracking-tight text-foreground">
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-muted-foreground">{subtitle}</span>
          </>
        )}
      </h2>
    </Wrapper>
  );
}
