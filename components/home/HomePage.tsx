import type { Locale } from "@/types";
import { HomeHero } from "./HomeHero";
import { HomeSlider } from "./HomeSlider";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { WhyUsSection } from "./WhyUsSection";
import { ClientsSection } from "./ClientsSection";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeHero locale={locale} />
      <HomeSlider locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <WhyUsSection locale={locale} />
      <ClientsSection locale={locale} />
    </>
  );
}
