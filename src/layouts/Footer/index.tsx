"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OsirisMark, LanguageSwitcher } from "@/components";
import { FooterLogo, FooterNav, Copyright } from "./components";

const EMAIL = "hello@osiris.hr";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <OsirisMark className="pointer-events-none absolute -right-16 -top-10 h-104 w-80 text-foreground/5 md:-right-10 md:h-136 md:w-104" />

      <div className="relative mx-auto max-w-360 px-4 py-20 md:px-8 md:py-28">
        <Link
          href="/contact"
          className="group block max-w-3xl text-display-xl font-display font-bold leading-[0.95] tracking-tight text-foreground"
        >
          <span className="block">{t("closingLine1")}</span>
          <span className="block transition-colors group-hover:text-accent">
            {t("closingLine2")}
          </span>
        </Link>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-block border-b border-border text-lg text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {EMAIL}
        </a>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-border pt-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-sm text-muted-foreground">{t("location")}</p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {t("navHeading")}
            </p>
            <FooterNav />
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {t("contactHeading")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {EMAIL}
            </a>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {t("languageHeading")}
            </p>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
