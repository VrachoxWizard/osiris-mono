import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hr", "en"],
  defaultLocale: "hr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/work": {
      hr: "/radovi",
      en: "/work",
    },
    "/work/[slug]": {
      hr: "/radovi/[slug]",
      en: "/work/[slug]",
    },
    "/services": {
      hr: "/usluge",
      en: "/services",
    },
    "/about": {
      hr: "/o-nama",
      en: "/about",
    },
    "/contact": {
      hr: "/kontakt",
      en: "/contact",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
