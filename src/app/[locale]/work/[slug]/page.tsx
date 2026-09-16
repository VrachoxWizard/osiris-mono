import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { workProjects, getWorkProject } from "@/content/work";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    workProjects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return {};
  const localeKey = locale as "hr" | "en";

  return {
    title: `${project.client} — ${project.industry[localeKey]}`,
    description: project.summary[localeKey],
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getWorkProject(slug);
  if (!project) notFound();

  const localeKey = locale as "hr" | "en";
  const t = await getTranslations("CaseStudy");

  const currentIndex = workProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    workProjects[(currentIndex + 1) % workProjects.length];

  return (
    <article>
      <div className="mx-auto max-w-360 px-4 pb-16 pt-40 md:px-8 md:pt-48">
        <Link
          href="/work"
          className="mb-10 inline-block text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
        >
          ← {t("backToWork")}
        </Link>

        <h1 className="max-w-3xl text-display-xl font-display font-bold leading-[0.98] tracking-tight text-foreground">
          {project.client}
        </h1>

        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {t("clientLabel")}
            </div>
            <div className="text-foreground">{project.client}</div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {t("industryLabel")}
            </div>
            <div className="text-foreground">{project.industry[localeKey]}</div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {t("yearLabel")}
            </div>
            <div className="text-foreground">{project.year}</div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {t("servicesLabel")}
            </div>
            <div className="text-foreground">
              {project.services
                .map((service) => t(`serviceNames.${service}`))
                .join(", ")}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="relative aspect-16/10 w-full overflow-hidden border-2 border-border md:aspect-21/9">
          <Image
            src={project.image}
            alt={`${project.client} — ${project.industry[localeKey]}`}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-360 grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            {t("challengeLabel")}
          </h2>
          <p className="text-lg text-foreground/80">{project.challenge[localeKey]}</p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            {t("solutionLabel")}
          </h2>
          <p className="text-lg text-foreground/80">{project.solution[localeKey]}</p>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 pb-16 md:px-8">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-foreground px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("visitSite")}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <Link
        href={{ pathname: "/work/[slug]", params: { slug: nextProject.slug } }}
        className="group block border-t border-border"
      >
        <div className="mx-auto max-w-360 px-4 py-16 md:px-8 md:py-24">
          <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            {t("nextProject")}
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-display-lg font-display font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {nextProject.client}
            </h2>
            <ArrowUpRight className="h-10 w-10 shrink-0 text-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-accent" />
          </div>
        </div>
      </Link>
    </article>
  );
}
