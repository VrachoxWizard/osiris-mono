"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { useServicesAnimation } from "./hooks";
import { ServiceCard } from "./components";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Services() {
  const { sectionRef, isInView } = useServicesAnimation();
  const t = useTranslations("Services");
  const keys = ["web", "maintenance", "seo"] as const;

  return (
    <section ref={sectionRef} className="border-t border-border py-24">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} className="mb-0" />
          <Link
            href="/services"
            className="mb-16 shrink-0 border-b border-border pb-1 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("cta")}
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {keys.map((key) => (
            <motion.div key={key} variants={itemVariants}>
              <ServiceCard
                number={t(`items.${key}.number`)}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
