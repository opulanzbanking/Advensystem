import type { Metadata } from "next";
import { PortagePage } from "@/components/portage/PortagePage";
import { portageContent } from "@/lib/content/portage";
import { siteUrl } from "@/lib/site";

const content = portageContent.fr;

export const metadata: Metadata = {
  title: { absolute: content.meta.title },
  description: content.meta.description,
  alternates: {
    canonical: "/portage-salarial-luxembourg/",
    languages: {
      "fr-LU": "/portage-salarial-luxembourg/",
      en: "/en/portage-salarial-luxembourg-2/",
      "x-default": "/portage-salarial-luxembourg/",
    },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/portage-salarial-luxembourg/`,
    siteName: "AdvenSystem",
    locale: "fr_LU",
    alternateLocale: ["en_GB"],
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function Page() {
  return (
    <main id="main">
      <PortagePage locale="fr" />
    </main>
  );
}
