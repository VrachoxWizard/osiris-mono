"use client";

import { motion } from "motion/react";

export function ServiceBlock({
  number,
  title,
  description,
  includes,
}: {
  number: string;
  title: string;
  description: string;
  includes: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 gap-8 border-t border-border py-16 first:border-t-0 first:pt-0 md:grid-cols-[auto_1fr_1fr] md:gap-16"
    >
      <div className="text-5xl font-display font-bold text-muted-foreground/40 md:text-7xl">
        {number}
      </div>
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="max-w-md text-lg text-foreground/80">{description}</p>
      </div>
      <ul className="flex flex-col gap-3 self-start">
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
