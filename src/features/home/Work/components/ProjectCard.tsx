"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui";
import type { WorkProject } from "@/content/work";

interface ProjectCardProps {
  project: WorkProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as "hr" | "en";
  const t = useTranslations("WorkTeaser");

  return (
    <Link
      href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}
      className="group block"
    >
      <div className="relative mb-4 aspect-4/3 overflow-hidden border-2 border-border transition-all duration-300 group-hover:border-accent/60">
        <Image
          src={project.image}
          alt={`${project.client} — ${project.industry[locale]}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="transform object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-background/40 transition-colors group-hover:bg-background/20"></div>

        <div className="absolute top-4 right-4">
          <Badge>{project.year}</Badge>
        </div>

        <div className="absolute bottom-0 left-0 w-full translate-y-full bg-background/60 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
          <div className="mb-1 text-xs uppercase tracking-widest text-accent">
            {t("cta")}
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-2">
        {project.client}
      </h3>
      <p className="text-muted-foreground transition-colors group-hover:text-foreground/90">
        {project.industry[locale]}
      </p>

      <div className="mt-2 h-px w-0 bg-accent transition-all duration-300 group-hover:w-20"></div>
    </Link>
  );
}
