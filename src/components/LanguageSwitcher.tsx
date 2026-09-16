"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  return (
    <div
      className={cn("flex items-center gap-2 text-sm tracking-widest uppercase", className)}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 && <span className="text-border" aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() =>
              router.replace(
                // @ts-expect-error -- next-intl can't statically know whether the
                // current pathname requires route params (e.g. /work/[slug])
                { pathname, params },
                { locale: code }
              )
            }
            aria-current={locale === code ? "true" : undefined}
            className={cn(
              "transition-colors",
              locale === code
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
