import Link from "next/link";
import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ServicesSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].services;

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-white pb-[60px] pt-[60px] text-center shadow-panel lg:pb-[93px] lg:pt-[90px]"
    >
      <Container>
        <SectionTitle className="mb-8 lg:mb-[42px]">{content.title}</SectionTitle>
        <p className="mx-auto mb-10 max-w-[1040px] text-[18px] leading-[1.4] text-brand-navy sm:text-[21px] lg:mb-[48px] lg:text-[25px]">
          {content.intro}
        </p>

        <div className="flex flex-col items-center gap-10 sm:grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-row xl:flex-nowrap xl:items-start xl:justify-between xl:gap-3">
          {content.items.map((item, index) => (
            <div
              key={item.icon}
              className={cn(
                "w-full max-w-[230px] sm:w-auto",
                index % 2 === 1 && "xl:translate-y-[141px]",
              )}
            >
              <div className="mx-auto mb-5 h-[120px] w-[120px] rounded-full bg-gradient-to-br from-gold to-coral p-[5px] lg:h-[144px] lg:w-[144px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-navy">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    width={84}
                    height={93}
                    loading="lazy"
                    className="h-[58%] w-[58%] object-contain"
                  />
                </div>
              </div>
              <h3 className="text-[19px] font-normal leading-[1.25] text-brand-navy lg:text-[23px]">
                {item.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
          ))}
        </div>

        <div className="xl:h-[141px]" aria-hidden="true" />

        {/* Portage Salarial Feature Banner */}
        <div className="mt-12 rounded-[6px] border border-brand/15 bg-gradient-to-r from-brand/5 via-brand/10 to-accent/10 p-6 text-left sm:p-8 lg:mt-16 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[850px]">
              <span className="inline-block rounded-[3px] bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-white">
                {content.portageBanner.badge}
              </span>
              <h3 className="mt-3 text-[22px] font-bold text-brand-navy sm:text-[26px]">
                {content.portageBanner.title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-brand-navy/85 sm:text-[18px]">
                {content.portageBanner.text}
              </p>
            </div>
            <Link
              href={content.portageBanner.href}
              className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-brand px-6 py-3.5 text-[16px] font-semibold text-white shadow-card transition hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {content.portageBanner.cta} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
