"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { ProcessStep } from "./components";

const stepKeys = ["discovery", "design", "development", "launch"] as const;

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("Process");

  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="relative z-10 mx-auto max-w-360 px-4 md:px-8">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-9.75 top-0 w-0.5 bg-border md:left-1/2"></div>

          {stepKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProcessStep
                number={t(`steps.${key}.number`)}
                title={t(`steps.${key}.title`)}
                description={t(`steps.${key}.description`)}
                isEven={index % 2 !== 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
