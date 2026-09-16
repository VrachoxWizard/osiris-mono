import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { ServiceBlock } from "./ServiceBlock";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: `${t("heading")} ${t("headingAccent")}`,
    description: t("intro"),
  };
}

const serviceKeys = ["web", "maintenance", "seo"] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        headingAccent={t("headingAccent")}
        intro={t("intro")}
      />

      <div className="mx-auto max-w-360 px-4 pb-16 md:px-8">
        {serviceKeys.map((key) => (
          <ServiceBlock
            key={key}
            number={t(`${key}.number`)}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            includes={t.raw(`${key}.includes`) as string[]}
          />
        ))}
      </div>

      <Link href="/contact" className="group block border-t border-border">
        <div className="mx-auto max-w-360 px-4 py-16 md:px-8 md:py-24">
          <h2 className="text-display-lg font-display font-bold leading-[0.95] tracking-tight text-foreground">
            <span className="block">{t("ctaLine1")}</span>
            <span className="block transition-colors group-hover:text-accent">
              {t("ctaLine2")}
            </span>
          </h2>
          <span className="mt-8 inline-flex items-center border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            {t("ctaButton")}
          </span>
        </div>
      </Link>
    </div>
  );
}
