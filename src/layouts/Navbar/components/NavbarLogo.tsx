"use client";

import { Link } from "@/i18n/navigation";
import { OsirisMark, OsirisWordmark } from "@/components";

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-foreground">
      <OsirisMark className="h-6 w-5 text-foreground" />
      <OsirisWordmark className="text-lg" />
    </Link>
  );
}
