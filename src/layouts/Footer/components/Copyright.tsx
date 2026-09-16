"use client";

import { useTranslations } from "next-intl";

export function Copyright() {
  const t = useTranslations("Footer");

  return (
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} OSIRIS. {t("rights")}
    </p>
  );
}
