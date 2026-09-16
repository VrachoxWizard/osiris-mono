"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { WorkProject } from "@/content/work";

export function WorkRow({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const locale = useLocale() as "hr" | "en";
  const t = useTranslations("WorkPage");
  const reversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="border-t border-border py-16 first:border-t-0 first:pt-0"
    >
      <Link
        href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}
        className={`group flex flex-col gap-8 md:gap-12 ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden border-2 border-border transition-colors duration-300 group-hover:border-accent/60 md:w-3/5">
          <Image
            src={project.image}
            alt={`${project.client} — ${project.industry[locale]}`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>

        <div className="flex w-full flex-col justify-center md:w-2/5">
          <div className="mb-4 text-sm text-muted-foreground">{project.year}</div>
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {project.client}
          </h2>
          <p className="mb-6 text-muted-foreground">{project.industry[locale]}</p>
          <p className="mb-8 max-w-sm text-foreground/80">
            {project.summary[locale]}
          </p>
          <span className="inline-flex w-fit items-center gap-2 border-b border-border pb-1 text-sm uppercase tracking-widest text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
            {t("viewProject")}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
