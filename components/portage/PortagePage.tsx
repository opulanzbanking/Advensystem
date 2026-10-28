import type { Locale } from "@/types";
import { PortageHero } from "./PortageHero";
import { PortageUnderstanding } from "./PortageUnderstanding";
import { PortageWhy } from "./PortageWhy";
import { PortageApproach } from "./PortageApproach";
import { PortageCta } from "./PortageCta";

export function PortagePage({ locale }: { locale: Locale }) {
  return (
    <>
      <PortageHero locale={locale} />
      <PortageUnderstanding locale={locale} />
      <PortageWhy locale={locale} />
      <PortageApproach locale={locale} />
      <PortageCta locale={locale} />
    </>
  );
}
