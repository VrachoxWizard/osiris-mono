"use client";

import { Link } from "@/i18n/navigation";
import { OsirisWordmark } from "@/components";

export function FooterLogo() {
  return (
    <Link href="/" className="flex items-center text-foreground">
      <OsirisWordmark className="text-lg" />
    </Link>
  );
}
