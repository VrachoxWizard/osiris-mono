"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "../config";

export function DesktopNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`text-sm uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:block">
        <Link
          href="/contact"
          className="border border-foreground px-5 py-2 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("contact")}
        </Link>
      </div>
    </>
  );
}
