import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { homeContent } from "@/lib/content/home";
import { siteUrl } from "@/lib/site";

const content = homeContent.fr;

export const metadata: Metadata = {
  title: { absolute: content.meta.title },
  description: content.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      "fr-LU": "/",
      en: "/en/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "AdvenSystem",
    locale: "fr_LU",
    alternateLocale: ["en_GB"],
    title: "AdvenSystem",
    description: content.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "AdvenSystem",
    description: content.meta.description,
  },
};

export default function Page() {
  return (
    <>
      <main id="main">
        <HomePage locale="fr" />
      </main>
      <OrganizationJsonLd />
    </>
  );
}
