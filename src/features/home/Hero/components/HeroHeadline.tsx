"use client";

import { useTranslations } from "next-intl";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";

export function HeroHeadline() {
  const t = useTranslations("Hero");

  const lines = [
    { text: t("line1"), className: "" },
    { text: t("line2"), className: "text-muted-foreground" },
    { text: t("line3"), className: "" },
  ];

  return (
    <h1 className="font-display">
      {lines.map((line, index) => (
        <TextGenerateEffect
          key={line.text}
          words={line.text}
          className={`m-0 text-display-2xl font-bold leading-[0.95] tracking-tight ${line.className}`}
          duration={0.5}
          speed={0.2}
          initialDelay={0.2 + index * 0.2}
        />
      ))}
    </h1>
  );
}
