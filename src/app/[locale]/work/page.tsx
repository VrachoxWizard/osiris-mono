import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { workProjects } from "@/content/work";
import { WorkRow } from "./WorkRow";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  return {
    title: t("heading"),
    description: t("intro"),
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WorkPage");

  return (
    <div>
      <PageHeader eyebrow={t("eyebrow")} heading={t("heading")} intro={t("intro")} />
      <div className="mx-auto max-w-360 px-4 pb-24 md:px-8">
        {workProjects.map((project, index) => (
          <WorkRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
