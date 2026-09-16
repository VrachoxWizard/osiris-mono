import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { FloatingCursor } from "@/components";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://osiris.hr"),
  title: "Mono - MINIMAL BRUTALIST DESIGN",
  description:
    "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
  generator: "Mohamed Djoudir",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mono - MINIMAL BRUTALIST DESIGN",
    description:
      "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    url: "https://your-website-url.com",
    siteName: "Mono",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Mono Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mono - MINIMAL BRUTALIST DESIGN",
    description:
      "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background mx-auto max-w-360`}>
        {children}
        <FloatingCursor />
      </body>
    </html>
  );
}
