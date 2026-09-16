"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionHeader, Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { workProjects } from "@/content/work";
import { ProjectCard } from "./components";

export function Work() {
  const t = useTranslations("WorkTeaser");
  const featured = workProjects.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="relative z-10 mx-auto max-w-360 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-accent"></div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("label")}
            </div>
          </div>
          <div className="flex flex-col justify-between md:flex-row md:items-end">
            <h2 className="mb-4 text-display-lg font-display font-bold tracking-tight text-foreground md:mb-0">
              {t("title")}
              <br />
              <span className="text-muted-foreground">{t("subtitle")}</span>
            </h2>
            <Link href="/work">
              <Button
                variant="secondary"
                className="group border-2 border-border hover:border-accent hover:bg-transparent hover:text-accent"
              >
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
