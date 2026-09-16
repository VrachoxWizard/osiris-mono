"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  heading: ReactNode;
  headingAccent?: ReactNode;
  intro?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  heading,
  headingAccent,
  intro,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("mx-auto max-w-360 px-4 pb-16 pt-40 md:px-8 md:pt-48", className)}
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px w-12 bg-accent"></div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </div>
      </div>
      <h1 className="max-w-3xl text-display-xl font-display font-bold leading-[0.98] tracking-tight text-foreground">
        {heading}
        {headingAccent && (
          <>
            <br />
            <span className="text-muted-foreground">{headingAccent}</span>
          </>
        )}
      </h1>
      {intro && (
        <p className="mt-8 max-w-lg text-lg text-foreground/80">{intro}</p>
      )}
    </motion.div>
  );
}
