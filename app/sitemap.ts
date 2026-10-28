import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}${routes.home.fr}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          fr: `${siteUrl}${routes.home.fr}`,
          en: `${siteUrl}${routes.home.en}`,
        },
      },
    },
    {
      url: `${siteUrl}${routes.home.en}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          fr: `${siteUrl}${routes.home.fr}`,
          en: `${siteUrl}${routes.home.en}`,
        },
      },
    },
    {
      url: `${siteUrl}${routes.portage.fr}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${siteUrl}${routes.portage.fr}`,
          en: `${siteUrl}${routes.portage.en}`,
        },
      },
    },
    {
      url: `${siteUrl}${routes.portage.en}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${siteUrl}${routes.portage.fr}`,
          en: `${siteUrl}${routes.portage.en}`,
        },
      },
    },
  ];
}
