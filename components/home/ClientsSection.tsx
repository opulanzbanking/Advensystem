import Image from "next/image";
import type { Locale } from "@/types";
import { clientLogos, homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ClientsSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].clients;

  return (
    <section id="clients" className="scroll-mt-24 pb-14 pt-16 lg:pb-[44px] lg:pt-[102px]">
      <Container>
        <SectionTitle className="mb-8 lg:mb-[46px]">{content.title}</SectionTitle>
        <p className="mx-auto mb-10 max-w-[980px] text-center text-[18px] leading-[1.4] text-brand-navy sm:text-[21px] lg:mb-[56px] lg:text-[25px]">
          {content.intro}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:gap-x-10 lg:gap-x-[40px] lg:gap-y-[40px]">
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-[64px] w-[calc(50%-32px)] items-center justify-center sm:h-[80px] sm:w-[calc(33.333%-40px)] lg:w-[calc(20%-40px)] lg:min-w-[140px]"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 40vw"
                className="max-h-full w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
