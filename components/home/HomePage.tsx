import type { Locale } from "@/types";
import { HomeHero } from "./HomeHero";
import { HomeSlider } from "./HomeSlider";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { WhyUsSection } from "./WhyUsSection";
import { ClientsSection } from "./ClientsSection";
import { FeedbacksSection } from "./FeedbacksSection";
import { ContactSection } from "@/components/contact/ContactSection";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeHero locale={locale} />
      <HomeSlider locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <WhyUsSection locale={locale} />
      <ClientsSection locale={locale} />
      <FeedbacksSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
