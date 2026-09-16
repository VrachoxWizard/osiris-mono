import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { workProjects } from "@/content/work";

const baseUrl = "https://osiris.hr";

type Href =
  | "/"
  | "/work"
  | "/services"
  | "/about"
  | "/contact"
  | { pathname: "/work/[slug]"; params: { slug: string } };

function localizedUrl(href: Href, locale: (typeof routing.locales)[number]) {
  return `${baseUrl}${getPathname({ locale, href: href as never })}`;
}

function languageAlternates(href: Href) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(href, locale)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Href[] = ["/", "/work", "/services", "/about", "/contact"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: localizedUrl(path, routing.defaultLocale),
    alternates: { languages: languageAlternates(path) },
  }));

  for (const project of workProjects) {
    const href: Href = { pathname: "/work/[slug]", params: { slug: project.slug } };
    entries.push({
      url: localizedUrl(href, routing.defaultLocale),
      alternates: { languages: languageAlternates(href) },
    });
  }

  return entries;
}
