"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { OsirisMark, LanguageSwitcher } from "@/components";
import { navLinks, mobileMenuAnimationConfig } from "../config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={mobileMenuAnimationConfig.initial}
          animate={mobileMenuAnimationConfig.animate}
          exit={mobileMenuAnimationConfig.exit}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
        >
          <OsirisMark className="pointer-events-none absolute -right-10 bottom-16 h-64 w-52 text-foreground/5" />

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`block py-3 text-5xl font-display font-bold tracking-tight ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center justify-between border-t border-border px-6 py-6">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
