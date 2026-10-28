import type { Metadata } from "next";
import { PortagePage } from "@/components/portage/PortagePage";
import { portageContent } from "@/lib/content/portage";
import { siteUrl } from "@/lib/site";

const content = portageContent.en;

export const metadata: Metadata = {
  title: { absolute: content.meta.title },
  description: content.meta.description,
  alternates: {
    canonical: "/en/portage-salarial-luxembourg-2/",
    languages: {
      "fr-LU": "/portage-salarial-luxembourg/",
      en: "/en/portage-salarial-luxembourg-2/",
      "x-default": "/portage-salarial-luxembourg/",
    },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/en/portage-salarial-luxembourg-2/`,
    siteName: "AdvenSystem",
    locale: "en_GB",
    alternateLocale: ["fr_LU"],
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
      <PortagePage locale="en" />
    </main>
  );
}
