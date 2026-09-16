import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { MotionConfig } from "motion/react";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { Navbar, Footer } from "@/layouts";
import { NoiseBackground, FloatingCursor, JsonLd } from "@/components";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href: "/" });
  }

  return {
    metadataBase: new URL("https://osiris.hr"),
    title: {
      default: t("title"),
      template: `%s | OSIRIS`,
    },
    description: t("description"),
    alternates: {
      canonical: getPathname({ locale, href: "/" }),
      languages,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "OSIRIS",
      locale: locale === "hr" ? "hr_HR" : "en_US",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OSIRIS" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${bricolage.variable}`}>
      <body className="mx-auto max-w-360 bg-background font-sans text-foreground antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "OSIRIS",
            url: "https://osiris.hr",
            image: "https://osiris.hr/og-image.png",
            areaServed: "HR",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zagreb",
              addressCountry: "HR",
            },
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MotionConfig
            reducedMotion={process.env.NODE_ENV === "production" ? "user" : "never"}
          >
            <NoiseBackground />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingCursor />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
