"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui";
import { useHeroMouseEffect } from "./hooks";
import {
  HeroHeadline,
  HeroButtons,
  HeroShape,
  HeroScrollIndicator,
} from "./components";

export function Hero() {
  const { shapeRef } = useHeroMouseEffect();
  const t = useTranslations("Hero");

  return (
    <section className="relative flex items-center overflow-hidden px-4 py-24 sm:px-10 sm:py-28 md:py-32">
      <div className="relative z-10 mx-auto w-full max-w-360 px-0 md:px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="outline">{t("badge")}</Badge>
            </motion.div>

            <HeroHeadline />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 mt-6 max-w-md text-lg text-muted-foreground"
            >
              {t("description")}
            </motion.p>

            <HeroButtons />
          </div>

          <HeroShape ref={shapeRef} />
        </div>

        <HeroScrollIndicator />
      </div>
    </section>
  );
}
