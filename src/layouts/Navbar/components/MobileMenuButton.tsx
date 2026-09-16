"use client";

import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      className="z-50 text-foreground md:hidden"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
}
