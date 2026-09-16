"use client";

import { useState } from "react";
import { useNavbarScroll } from "./hooks";
import {
  NavbarLogo,
  DesktopNav,
  MobileMenu,
  MobileMenuButton,
} from "./components";
import { LanguageSwitcher } from "@/components";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useNavbarScroll();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <NavbarLogo />
          <div className="flex items-center gap-10">
            <DesktopNav />
            <LanguageSwitcher className="hidden md:flex" />
          </div>
          <MobileMenuButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
