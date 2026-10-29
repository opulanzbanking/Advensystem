import type { Locale, NavItem } from "@/types";

export const siteUrl = "https://advensystem.lu";

export const routes = {
  home: {
    fr: "/",
    en: "/en/",
  },
  portage: {
    fr: "/portage-salarial-luxembourg/",
    en: "/en/portage-salarial-luxembourg-2/",
  },
} as const;

export const company = {
  name: "AdvenSystem",
  legalName: "AdvenSystem SARL",
  yearsInBusiness: 19,
  businessType: "IT services business",
  founder: {
    name: "Irvin Dulberg",
    role: "Founder & Chairman of the board",
    titleFr: "Fondateur & Président du conseil d’administration",
    phone: "+352 28 79 76 26",
    phoneHref: "tel:+35228797626",
    whatsapp: "+352 661 11 22 60",
    whatsappHref: "https://api.whatsapp.com/send?phone=352661112260",
    website: "www.advensystem.lu",
    office: "53 Boulevard Royal L-2449 Luxembourg",
  },
  phone: "+352 661 11 22 60",
  phoneHref: "tel:+352661112260",
  phoneSecondary: "+352 28 79 76 26",
  phoneSecondaryHref: "tel:+35228797626",
  email: "contact@advensystem.lu",
  emailHref: "mailto:contact@advensystem.lu",
  website: "https://www.advensystem.lu",
  websiteDisplay: "www.advensystem.lu",
  whatsapp: "https://api.whatsapp.com/send?phone=352661112260",
  facebook: "https://www.facebook.com/AdvenSystem/",
  headOffice: "49 Duarrefstrooss L-9964 Huldange Luxembourg",
  businessCenter: "34 Grand rue L-9710 Clervaux Luxembourg",
  executiveOffice: "53 Boulevard Royal L-2449 Luxembourg",
  registry: "B176203",
  authorization: "10036042 / 0",
};

export const navLabels: Record<Locale, { home: string; portage: string }> = {
  fr: { home: "Accueil", portage: "Portage Salarial" },
  en: { home: "Home", portage: "Portage Salarial" },
};

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function isPortagePath(pathname: string): boolean {
  return (
    pathname.startsWith(routes.portage.fr) || pathname.startsWith(routes.portage.en)
  );
}

export function languageHref(pathname: string, target: Locale): string {
  if (isPortagePath(pathname)) {
    return routes.portage[target];
  }
  return routes.home[target];
}

export function navItems(locale: Locale): NavItem[] {
  const home = routes.home[locale];
  if (locale === "fr") {
    return [
      { label: "Accueil", href: home },
      { label: "A propos", href: `${home}#about` },
      { label: "Nos services", href: `${home}#services` },
      { label: "Pourquoi nous", href: `${home}#whyus` },
      { label: "Portage Salarial", href: routes.portage.fr },
      { label: "Nos clients", href: `${home}#clients` },
      { label: "Contact", href: `${home}#contacts` },
    ];
  }
  return [
    { label: "Home", href: home },
    { label: "About", href: `${home}#about` },
    { label: "Services", href: `${home}#services` },
    { label: "Why us", href: `${home}#whyus` },
    { label: "Portage Salarial", href: routes.portage.en },
    { label: "Clients", href: `${home}#clients` },
    { label: "Contact", href: `${home}#contacts` },
  ];
}

export function pageTitle(page: string): string {
  return page === "home" ? company.name : `${page} – ${company.name}`;
}
