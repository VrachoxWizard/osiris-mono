"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks } from "../../Navbar/config";

export function FooterNav() {
  const t = useTranslations("Nav");

  return (
    <nav className="flex flex-col gap-3">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t(link.key)}
        </Link>
      ))}
    </nav>
  );
}
