import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: `${t("heading")} ${t("headingAccent")}`,
    description: t("paragraph1"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        headingAccent={t("headingAccent")}
      />

      <div className="relative mx-auto max-w-360 px-4 pb-24 md:px-8">
        <div className="relative flex max-w-xl flex-col gap-6 text-lg text-foreground/80">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
        </div>

        <Link
          href="/contact"
          className="relative mt-10 inline-flex w-fit items-center border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
