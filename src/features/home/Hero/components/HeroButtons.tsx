"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HeroButtons() {
  const t = useTranslations("Hero");

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col gap-4 sm:flex-row"
    >
      <Link
        href="/work"
        className="flex items-center justify-center border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {t("primaryCta")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <Link
        href="/contact"
        className="flex items-center justify-center border border-border px-8 py-3 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {t("secondaryCta")}
      </Link>
    </motion.div>
  );
}
