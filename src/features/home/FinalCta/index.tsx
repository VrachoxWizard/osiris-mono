"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FinalCta() {
  const t = useTranslations("FinalCta");

  return (
    <section className="border-t border-border py-28 md:py-36">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/contact" className="group block">
            <h2 className="text-display-2xl font-display font-bold leading-[0.95] tracking-tight text-foreground">
              <span className="block">{t("line1")}</span>
              <span className="block transition-colors group-hover:text-accent">
                {t("line2")}
              </span>
            </h2>
            <span className="mt-10 inline-flex items-center border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              {t("button")}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
