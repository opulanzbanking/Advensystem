import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { btnPrimary } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactButton } from "@/components/contact/ContactButton";
import { AnimatedCounter } from "./AnimatedCounter";

export function WhyUsSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].why;

  return (
    <section id="whyus" className="scroll-mt-24 pt-16 lg:pt-[91px]">
      <Container>
        <SectionTitle className="mb-6 lg:mb-[43px]">{content.title}</SectionTitle>
        <p className="mx-auto max-w-[875px] text-center text-[18px] leading-[1.4] text-brand-navy sm:text-[21px] lg:text-[25px]">
          {content.intro}
        </p>
      </Container>

      <div className="mt-10 shadow-panel">
        <div className="bg-[#003ABD] bg-[url('/images/theme/BG5.svg')] bg-cover bg-center">
          <Container>
            <div className="grid gap-5 py-12 md:grid-cols-2 lg:py-[81px] xl:grid-cols-12 xl:gap-x-[30px]">
              {content.stats.map((stat, index) => {
                const isWide = index >= 2;
                const isLast = index === 4;
                return (
                  <div
                    key={stat.text}
                    className={cn(
                      "relative flex min-h-[150px] items-center overflow-hidden rounded-[2px] bg-white px-7 py-6 shadow-card lg:min-h-[180px]",
                      index === 0 && "xl:col-span-3 xl:pl-[50px]",
                      index === 1 && "xl:col-span-3 xl:pl-[40px]",
                      index === 2 && "xl:col-span-6 xl:px-[70px]",
                      index === 3 && "xl:col-span-7 xl:px-[70px]",
                      index === 4 && "xl:col-span-5 xl:pl-[35px]",
                      index === 3 && "md:col-span-2 xl:col-span-7",
                    )}
                  >
                    {isLast ? (
                      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
                        <span className="page-gradient-text whitespace-nowrap text-[56px] font-bold leading-[1.05] lg:text-[80px] xl:text-[90px]">
                          {stat.value}
                          {stat.suffix}
                        </span>
                        <p className="text-[17px] leading-[1.35] text-brand-navy lg:text-[20px]">
                          {stat.text}
                        </p>
                      </div>
                    ) : stat.value !== undefined ? (
                      <div>
                        <span className="page-gradient-text mb-1 block text-[64px] font-bold leading-[1] lg:text-[80px] xl:text-[100px]">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                          />
                        </span>
                        <p className="text-[18px] leading-[1.35] text-brand-navy lg:text-[20px]">
                          {stat.text}
                        </p>
                      </div>
                    ) : (
                      <p
                        className={cn(
                          "text-[17px] leading-[1.4] text-brand-navy lg:text-[19px]",
                          isWide && "max-w-[600px]",
                        )}
                      >
                        {stat.text}
                      </p>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-br from-gold to-coral"
                    />
                  </div>
                );
              })}
            </div>

            <div className="pb-10 lg:pb-[61px]">
              <ContactButton
                source={`${locale.toUpperCase()} why choose us`}
                className={btnPrimary}
              >
                {content.cta}
              </ContactButton>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
