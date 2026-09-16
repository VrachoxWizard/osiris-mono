export const navLinks = [
    { href: "/work", key: "work" },
    { href: "/services", key: "services" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
] as const;

export const mobileMenuAnimationConfig = {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    exit: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
};
