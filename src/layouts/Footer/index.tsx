"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components";
import { FooterLogo, FooterNav, Copyright } from "./components";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="relative overflow-hidden border-t border-border">
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
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav("contact")}
            </Link>
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
