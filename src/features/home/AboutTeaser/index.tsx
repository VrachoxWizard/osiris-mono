"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function AboutTeaser() {
  const t = useTranslations("AboutTeaser");

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-accent"></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("label")}
              </div>
            </div>
            <h2 className="text-display-lg font-display font-bold tracking-tight text-foreground">
              {t("title")}
              <br />
              <span className="text-muted-foreground">{t("subtitle")}</span>
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <p className="max-w-md text-lg text-foreground/80">
              {t("description")}
            </p>
            <Link
              href="/about"
              className="group inline-flex w-fit items-center border-b border-border pb-1 text-sm uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
